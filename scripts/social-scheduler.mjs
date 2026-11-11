#!/usr/bin/env node

/**
 * JSM Integrated Services — Automated Time-Triggered Social Scheduler
 * 
 * Rules:
 * - Decouples video generation from social publishing.
 * - Adheres strictly to the Indian Market Optimal Posting Windows (IST).
 * - Enforces the 2-reels-per-day rate limit via `social-dispatch-ledger.json`.
 * - Prevents all accidental duplicate dispatches or spamming.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { OPTIMAL_SCHEDULE_IST } from './daily-social-dispatch.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const LEDGER_PATH = path.join(ROOT_DIR, 'data', 'social-dispatch-ledger.json');
const DISPATCH_SCRIPT = path.join(__dirname, 'daily-social-dispatch.mjs');

const isDaemon = process.argv.includes('--daemon');

// Get current IST time details
function getISTNow() {
  const now = new Date();
  const dateStr = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
  const dayName = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', weekday: 'long' }).format(now);
  
  const hourParts = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false }).formatToParts(now);
  const hour = parseInt(hourParts.find(p => p.type === 'hour')?.value || '0', 10);
  const minute = parseInt(hourParts.find(p => p.type === 'minute')?.value || '0', 10);
  const second = parseInt(hourParts.find(p => p.type === 'second')?.value || '0', 10);

  return { dateStr, dayName, hour, minute, second, totalMinutes: hour * 60 + minute };
}

// Convert "08:30 AM" or "07:15 PM" to total minutes from midnight
function parseTimeToMinutes(timeStr) {
  const [time, period] = timeStr.split(' ');
  let [hours, mins] = time.split(':').map(Number);
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  return hours * 60 + mins;
}

// Read ledger
function getLedger() {
  try {
    if (fs.existsSync(LEDGER_PATH)) {
      return JSON.parse(fs.readFileSync(LEDGER_PATH, 'utf8'));
    }
  } catch (err) {
    console.error("Ledger read error:", err.message);
  }
  return { current_lock: { date: "", posts_count: 0, slots_executed_today: [] } };
}

// Execute dispatch script in child process
function executeDispatch(slot) {
  return new Promise((resolve) => {
    console.log(`\n⏰ [TIME TRIGGER MATCHED] Launching ${slot.toUpperCase()} dispatch...`);
    const child = spawn(process.execPath, [DISPATCH_SCRIPT, `--slot=${slot}`], {
      stdio: 'inherit',
      env: process.env
    });
    child.on('close', (code) => {
      resolve(code);
    });
  });
}

async function checkAndTrigger() {
  const ist = getISTNow();
  const ledger = getLedger();
  const scheduleToday = OPTIMAL_SCHEDULE_IST[ist.dayName];

  if (!scheduleToday) {
    console.log(`⚠️ No schedule definition found for ${ist.dayName}`);
    return;
  }

  const morningMinutes = parseTimeToMinutes(scheduleToday.morning.time);
  const eveningMinutes = parseTimeToMinutes(scheduleToday.evening.time);

  const isLockedToday = ledger.current_lock.date === ist.dateStr && (ledger.current_lock.status === 'LOCKED_MAX_REACHED' || ledger.current_lock.posts_count >= 2);
  const slotsExecuted = (ledger.current_lock.date === ist.dateStr ? ledger.current_lock.slots_executed_today : []) || [];
  const morningDone = slotsExecuted.some(s => s.slot === 'morning');
  const eveningDone = slotsExecuted.some(s => s.slot === 'evening');

  console.log(`[SCHEDULER STATUS] ${ist.dateStr} (${ist.dayName}) ${String(ist.hour).padStart(2, '0')}:${String(ist.minute).padStart(2, '0')} IST`);
  console.log(`  Today's Slots: Morning ${scheduleToday.morning.time} (${morningDone ? '✓ DONE' : 'PENDING'}) | Evening ${scheduleToday.evening.time} (${eveningDone ? '✓ DONE' : 'PENDING'})`);
  console.log(`  Today's Posts: ${ledger.current_lock.date === ist.dateStr ? ledger.current_lock.posts_count : 0} / 2 (Locked: ${isLockedToday ? 'YES' : 'NO'})`);

  if (isLockedToday) {
    console.log(`  🔒 Notice: Today has reached the 2-reel limit. System is in protection freeze.`);
    return;
  }

  // Window check (+/- 10 minutes of scheduled time)
  const WINDOW_MINUTES = 10;

  // Check Morning Slot
  if (!morningDone && Math.abs(ist.totalMinutes - morningMinutes) <= WINDOW_MINUTES) {
    await executeDispatch('morning');
    return;
  }

  // Check Evening Slot
  if (!eveningDone && Math.abs(ist.totalMinutes - eveningMinutes) <= WINDOW_MINUTES) {
    await executeDispatch('evening');
    return;
  }

  // If outside windows, report time until next eligible slot
  let nextSlot = "";
  let minutesUntil = 0;
  if (!morningDone && ist.totalMinutes < morningMinutes) {
    nextSlot = `Morning (${scheduleToday.morning.time})`;
    minutesUntil = morningMinutes - ist.totalMinutes;
  } else if (!eveningDone && ist.totalMinutes < eveningMinutes) {
    nextSlot = `Evening (${scheduleToday.evening.time})`;
    minutesUntil = eveningMinutes - ist.totalMinutes;
  } else {
    nextSlot = `Tomorrow Morning (08:45 AM)`;
    minutesUntil = (24 * 60 - ist.totalMinutes) + parseTimeToMinutes("08:45 AM");
  }

  console.log(`  ⏳ Next Eligible Trigger: ${nextSlot} (in ~${Math.floor(minutesUntil / 60)}h ${minutesUntil % 60}m)`);
}

async function main() {
  console.log("======================================================================");
  console.log("  JSM INTEGRATED SERVICES — TIME-TRIGGERED SOCIAL SCHEDULER");
  console.log("======================================================================");

  if (isDaemon) {
    console.log("🔄 Running in Daemon Mode (Checks every 60 seconds)...");
    await checkAndTrigger();
    setInterval(async () => {
      await checkAndTrigger();
    }, 60 * 1000);
  } else {
    await checkAndTrigger();
  }
}

main();
