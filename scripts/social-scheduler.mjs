#!/usr/bin/env node

/**
 * JSM Integrated Services — Automated Time-Triggered Social Scheduler
 * 
 * Rules:
 * - Decouples video generation from social publishing.
 * - Adheres strictly to the Indian Market Optimal Posting Windows (IST).
 *     * Morning commute: 08:30–09:00 AM IST (Candidates / Job Seekers)
 *     * Evening review: 07:15–07:45 PM IST (Employers / Founders / HR Heads)
 * - Enforces the 2-reels-per-day rate limit via `social-dispatch-ledger.json`.
 * - Prevents all accidental duplicate dispatches or spamming.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn, execSync } from 'node:child_process';
import { OPTIMAL_SCHEDULE_IST, loadLocalEnv } from './daily-social-dispatch.mjs';

loadLocalEnv();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const ROOT_DIR = path.resolve(__dirname, '..');
export const LEDGER_PATH = path.join(ROOT_DIR, 'data', 'social-dispatch-ledger.json');
export const DISPATCH_SCRIPT = path.join(__dirname, 'daily-social-dispatch.mjs');

// Get current IST time details
export function getISTNow(now = new Date()) {
  const dateStr = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
  const dayName = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', weekday: 'long' }).format(now);
  
  const hourParts = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false }).formatToParts(now);
  const hour = parseInt(hourParts.find(p => p.type === 'hour')?.value || '0', 10);
  const minute = parseInt(hourParts.find(p => p.type === 'minute')?.value || '0', 10);
  const second = parseInt(hourParts.find(p => p.type === 'second')?.value || '0', 10);

  return { dateStr, dayName, hour, minute, second, totalMinutes: hour * 60 + minute };
}

// Convert "08:30 AM" or "07:15 PM" to total minutes from midnight
export function parseTimeToMinutes(timeStr) {
  const [time, period] = timeStr.trim().split(' ');
  let [hours, mins] = time.split(':').map(Number);
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  return hours * 60 + mins;
}

// Check schedule compliance against requirements (Morning 08:30-09:00 AM, Evening 07:15-07:45 PM)
export function verifyScheduleCompliance(schedule = OPTIMAL_SCHEDULE_IST) {
  const morningMin = parseTimeToMinutes("08:30 AM"); // 510
  const morningMax = parseTimeToMinutes("09:00 AM"); // 540
  const eveningMin = parseTimeToMinutes("07:15 PM"); // 1155
  const eveningMax = parseTimeToMinutes("07:45 PM"); // 1185

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const violations = [];

  for (const day of days) {
    const entry = schedule[day];
    if (!entry) {
      violations.push(`Missing schedule entry for ${day}`);
      continue;
    }
    const mMin = parseTimeToMinutes(entry.morning.time);
    if (mMin < morningMin || mMin > morningMax) {
      violations.push(`${day} morning time ${entry.morning.time} is outside 08:30–09:00 AM IST window`);
    }
    const eMin = parseTimeToMinutes(entry.evening.time);
    if (eMin < eveningMin || eMin > eveningMax) {
      violations.push(`${day} evening time ${entry.evening.time} is outside 07:15–07:45 PM IST window`);
    }
  }

  return {
    compliant: violations.length === 0,
    violations,
    daysChecked: days.length
  };
}

// Read ledger
export function getLedger(ledgerPath = LEDGER_PATH) {
  try {
    if (fs.existsSync(ledgerPath)) {
      return JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));
    }
  } catch (err) {
    console.error("Ledger read error:", err.message);
  }
  return { current_lock: { date: "", posts_count: 0, slots_executed_today: [] } };
}

// Execute dispatch script in child process
export function executeDispatch(slot, extraArgs = []) {
  return new Promise((resolve) => {
    console.log(`\n⏰ [TIME TRIGGER MATCHED] Launching ${slot.toUpperCase()} dispatch...`);
    const child = spawn(process.execPath, [DISPATCH_SCRIPT, `--slot=${slot}`, ...extraArgs], {
      stdio: 'inherit',
      env: process.env
    });
    child.on('close', (code) => {
      resolve(code);
    });
  });
}

export async function checkAndTrigger(options = {}) {
  const ist = options.mockIST || getISTNow();
  const ledger = options.mockLedger || getLedger(options.ledgerPath || LEDGER_PATH);
  const scheduleToday = OPTIMAL_SCHEDULE_IST[ist.dayName];

  if (!scheduleToday) {
    console.log(`⚠️ No schedule definition found for ${ist.dayName}`);
    return { status: 'NO_SCHEDULE_FOR_DAY' };
  }

  const morningMinutes = parseTimeToMinutes(scheduleToday.morning.time);
  const eveningMinutes = parseTimeToMinutes(scheduleToday.evening.time);

  const isLockedToday = ledger.current_lock?.date === ist.dateStr && (
    ledger.current_lock?.status === 'LOCKED_MAX_REACHED' ||
    (ledger.current_lock?.posts_count || 0) >= 2
  );
  const slotsExecuted = (ledger.current_lock?.date === ist.dateStr ? ledger.current_lock?.slots_executed_today : []) || [];
  const morningDone = slotsExecuted.some(s => s.slot === 'morning');
  const eveningDone = slotsExecuted.some(s => s.slot === 'evening');

  console.log(`[SCHEDULER STATUS] ${ist.dateStr} (${ist.dayName}) ${String(ist.hour).padStart(2, '0')}:${String(ist.minute).padStart(2, '0')} IST`);
  console.log(`  Today's Slots: Morning ${scheduleToday.morning.time} (${morningDone ? '✓ DONE' : 'PENDING'}) | Evening ${scheduleToday.evening.time} (${eveningDone ? '✓ DONE' : 'PENDING'})`);
  console.log(`  Today's Posts: ${ledger.current_lock?.date === ist.dateStr ? ledger.current_lock.posts_count : 0} / 2 (Locked: ${isLockedToday ? 'YES' : 'NO'})`);

  // Sync ledger from remote before deciding (only when --sync-git passed)
  const shouldSyncGit = Boolean(options.syncGit);
  if (shouldSyncGit && !options.dryRunOnly) {
    try {
      execSync('git pull --rebase --autostash origin main', { cwd: ROOT_DIR, stdio: 'pipe' });
    } catch (err) {
      console.warn(`⚠️ git pull skipped/warn: ${err.message}`);
    }
  }

  // Re-read ledger after potential git pull
  const freshLedger = options.mockLedger || getLedger(options.ledgerPath || LEDGER_PATH);
  const effectiveLocked = freshLedger.current_lock?.date === ist.dateStr && (
    freshLedger.current_lock?.status === 'LOCKED_MAX_REACHED' ||
    (freshLedger.current_lock?.posts_count || 0) >= 2
  );
  const effectiveSlots = (freshLedger.current_lock?.date === ist.dateStr ? freshLedger.current_lock?.slots_executed_today : []) || [];
  const morningDoneFinal = effectiveSlots.some(s => s.slot === 'morning');
  const eveningDoneFinal = effectiveSlots.some(s => s.slot === 'evening');

  if (effectiveLocked) {
    console.log(`  🔒 Notice: Today has reached the 2-reel limit. System is in protection freeze.`);
    return { status: 'FROZEN', isLocked: true, postsCount: freshLedger.current_lock.posts_count };
  }

  // Asymmetric catchup window: -15m before slot up to +60m after slot (absorbs jitter without skipping the day)
  const PRE_WINDOW_MINUTES = 15;
  const POST_WINDOW_MINUTES = 60;

  const syncLedgerBack = (slotName) => {
    if (!shouldSyncGit) return;
    try {
      execSync('git add data/social-dispatch-ledger.json', { cwd: ROOT_DIR, stdio: 'pipe' });
      const status = execSync('git status --porcelain data/social-dispatch-ledger.json', { cwd: ROOT_DIR, encoding: 'utf8' }).trim();
      if (status) {
        execSync(`git commit -m "chore(social): record ${ist.dateStr} ${slotName} dispatch [skip ci]"`, { cwd: ROOT_DIR, stdio: 'pipe' });
        execSync('git pull --rebase --autostash origin main || true', { cwd: ROOT_DIR, stdio: 'pipe' });
        execSync('git push origin main', { cwd: ROOT_DIR, stdio: 'pipe' });
        console.log('✓ Synced updated dispatch ledger back to origin/main.');
      }
    } catch (err) {
      console.warn(`⚠️ Failed to sync ledger to origin/main: ${err.message}`);
    }
  };

  // Check Morning Slot
  const morningDiff = ist.totalMinutes - morningMinutes;
  if (!morningDoneFinal && morningDiff >= -PRE_WINDOW_MINUTES && morningDiff <= POST_WINDOW_MINUTES) {
    if (!options.dryRunOnly) {
      await executeDispatch('morning');
      syncLedgerBack('morning');
    }
    return { status: 'TRIGGERED_MORNING', slot: 'morning' };
  }

  // Check Evening Slot
  const eveningDiff = ist.totalMinutes - eveningMinutes;
  if (!eveningDoneFinal && eveningDiff >= -PRE_WINDOW_MINUTES && eveningDiff <= POST_WINDOW_MINUTES) {
    if (!options.dryRunOnly) {
      await executeDispatch('evening');
      syncLedgerBack('evening');
    }
    return { status: 'TRIGGERED_EVENING', slot: 'evening' };
  }

  // Calculate next slot
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayIdx = daysOfWeek.indexOf(ist.dayName);
  const tomorrowName = daysOfWeek[(todayIdx + 1) % 7];
  const tomorrowMorningTime = OPTIMAL_SCHEDULE_IST[tomorrowName]?.morning?.time || "08:45 AM";

  let nextSlot = "";
  let minutesUntil = 0;
  if (!morningDoneFinal && ist.totalMinutes < morningMinutes) {
    nextSlot = `Morning (${scheduleToday.morning.time})`;
    minutesUntil = morningMinutes - ist.totalMinutes;
  } else if (!eveningDoneFinal && ist.totalMinutes < eveningMinutes) {
    nextSlot = `Evening (${scheduleToday.evening.time})`;
    minutesUntil = eveningMinutes - ist.totalMinutes;
  } else {
    nextSlot = `Tomorrow Morning (${tomorrowMorningTime})`;
    minutesUntil = (24 * 60 - ist.totalMinutes) + parseTimeToMinutes(tomorrowMorningTime);
  }

  console.log(`  ⏳ Next Eligible Trigger: ${nextSlot} (in ~${Math.floor(minutesUntil / 60)}h ${minutesUntil % 60}m)`);
  return { status: 'WAITING', nextSlot, minutesUntil };
}

export async function main() {
  const isDaemon = process.argv.includes('--daemon');
  const syncGit = process.argv.includes('--sync-git');
  const dryRunOnly = process.argv.includes('--dry-run');

  console.log("======================================================================");
  console.log("  JSM INTEGRATED SERVICES — TIME-TRIGGERED SOCIAL SCHEDULER");
  console.log("======================================================================");

  const opts = { syncGit, dryRunOnly };

  if (isDaemon) {
    console.log("🔄 Running in Daemon Mode (Checks every 60 seconds)...");
    await checkAndTrigger(opts);
    setInterval(async () => {
      await checkAndTrigger(opts);
    }, 60 * 1000);
  } else {
    await checkAndTrigger(opts);
  }
}

// Execute main only if invoked directly from CLI
const isDirectExecution = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isDirectExecution) {
  main().catch((err) => {
    console.error("Scheduler error:", err);
    process.exit(1);
  });
}
