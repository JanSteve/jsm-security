#!/usr/bin/env node

/**
 * JSM Integrated Services — Universal Talent & Company Mediation Engine
 * 
 * Features:
 * - 2x Daily Automated Publishing (Morning: 08:30–09:00 AM IST | Evening: 07:15–07:45 PM IST)
 * - 730-Reel Annual Curriculum (data/annual-reels-catalog.json)
 *     * Morning slot: Candidate Focus ('JOB' trigger, Job Seekers & Career Professionals)
 *     * Evening slot: Employer Focus ('HIRE' trigger, Employers, Founders & Plant Managers)
 * - Double-Action Inbound Lead Capture:
 *     * Job Seekers comment: 'JOB', 'SWITCH'
 *     * Hiring Companies comment: 'HIRE', 'TALENT'
 * - High-Engagement Algorithm SEO: First 125 chars hook before the fold
 * - Strict 5 Trending Hashtags per Instagram Post (Zero spam penalties)
 * - Anti-Spam Safety Ledger & Protection Freeze (Strict 2 posts/day max)
 * - Multi-Platform Output: Instagram Reels, Facebook Reels & Page Posts, YouTube Shorts
 */

import https from 'node:https';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { URL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const ROOT_DIR = path.resolve(__dirname, '..');
export const CATALOG_PATH = path.join(ROOT_DIR, 'data', 'annual-reels-catalog.json');
export const LEDGER_PATH = path.join(ROOT_DIR, 'data', 'social-dispatch-ledger.json');

/**
 * Load environment overrides from .env.local without external dependencies
 */
export function loadLocalEnv(envPath = path.join(ROOT_DIR, '.env.local')) {
  try {
    if (!fs.existsSync(envPath)) return;
    const raw = fs.readFileSync(envPath, 'utf8');
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx <= 0) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  } catch {
    // Non-fatal if .env.local unreadable
  }
}

loadLocalEnv();

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jsmintegratedservices.com';
export const WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL || process.env.SOCIAL_WEBHOOK_URL;

// Day-of-Week Optimal Posting Schedule for Indian Market (IST: UTC + 5:30)
// Research basis: Peak commute times (Candidates 08:30–09:00 AM IST) & Founder/HR evening review (07:15–07:45 PM IST)
export const OPTIMAL_SCHEDULE_IST = {
  Monday: {
    morning: { time: "08:30 AM", target: "Candidates", theme: "Monday Career Urgency / Escape Bad Jobs" },
    evening: { time: "07:15 PM", target: "Founders / HR", theme: "Monday Empty Desks / Week Headcount Crisis" }
  },
  Tuesday: {
    morning: { time: "08:45 AM", target: "Candidates", theme: "Skill Valuation / Underpaid Reality Check" },
    evening: { time: "07:30 PM", target: "Founders / HR", theme: "Talent Bottlenecks / Cost of Open Roles" }
  },
  Wednesday: {
    morning: { time: "09:00 AM", target: "Candidates", theme: "Mid-Week Burnout & Career Switching" },
    evening: { time: "07:30 PM", target: "Founders / HR", theme: "Agency Frustrations & Contingency Sourcing" }
  },
  Thursday: {
    morning: { time: "08:45 AM", target: "Candidates", theme: "Interview Traps & Notice Period Rights" },
    evening: { time: "07:15 PM", target: "Founders / HR", theme: "Candidate Ghosting Solutions & Vetting" }
  },
  Friday: {
    morning: { time: "08:30 AM", target: "Candidates", theme: "Weekend Career Reflection & Goal Setting" },
    evening: { time: "07:15 PM", target: "Founders / HR", theme: "Closing Hiring Mandates Before Weekend" }
  },
  Saturday: {
    morning: { time: "08:45 AM", target: "Candidates", theme: "Resume Rebuilding & Salary Negotiation Mastery" },
    evening: { time: "07:30 PM", target: "Founders / HR", theme: "Strategic Headcount Planning for Next Quarter" }
  },
  Sunday: {
    morning: { time: "09:00 AM", target: "Candidates", theme: "Mindset Reset & Long-Term Career Vision" },
    evening: { time: "07:45 PM", target: "Both (Peak)", theme: "Sunday Scaries Peak: Taking Action for Monday" }
  }
};

/**
 * Calculate Day of Year (1..365) in specified timezone
 */
export function getDayOfYear(date = new Date(), timeZone = 'Asia/Kolkata') {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  const dateStr = formatter.format(date); // YYYY-MM-DD
  const [yearStr, monthStr, dayStr] = dateStr.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  const daysInMonths = [31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  let dayOfYear = 0;
  for (let i = 0; i < month - 1; i++) {
    dayOfYear += daysInMonths[i];
  }
  dayOfYear += day;

  return { year, month, day, dateStr, dayOfYear, isLeap };
}

/**
 * Get Current IST Date & Time Info
 */
export function getISTDateInfo(now = new Date()) {
  const dayInfo = getDayOfYear(now, 'Asia/Kolkata');
  
  const dayFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    weekday: 'long'
  });
  const dayName = dayFormatter.format(now);

  const hourFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  });
  const parts = hourFormatter.formatToParts(now);
  const hour = parseInt(parts.find(p => p.type === 'hour')?.value || '12', 10);
  const minute = parseInt(parts.find(p => p.type === 'minute')?.value || '0', 10);

  return {
    dateStr: dayInfo.dateStr,
    dayName,
    hour,
    minute,
    dayOfYear: dayInfo.dayOfYear,
    year: dayInfo.year,
    raw: now
  };
}

/**
 * Determine default slot based on current hour in IST
 */
export function getCurrentSlot(istHour) {
  return istHour >= 14 ? 'evening' : 'morning';
}

/**
 * Load master 730-reel annual catalog
 */
let _cachedCatalog = null;
export function loadCatalog(catalogPath = CATALOG_PATH) {
  if (_cachedCatalog && catalogPath === CATALOG_PATH) {
    return _cachedCatalog;
  }
  if (!fs.existsSync(catalogPath)) {
    throw new Error(`Annual reels catalog file not found at: ${catalogPath}`);
  }
  const raw = fs.readFileSync(catalogPath, 'utf8');
  const catalog = JSON.parse(raw);
  if (!catalog || !Array.isArray(catalog.reels)) {
    throw new Error(`Invalid catalog structure in ${catalogPath}: missing reels array`);
  }
  if (catalogPath === CATALOG_PATH) {
    _cachedCatalog = catalog;
  }
  return catalog;
}

/**
 * Get reel by 1-based day number (1..365) and slot ('morning' | 'evening')
 */
export function getReelByDay(dayNumber, slot = 'morning', catalogPath = CATALOG_PATH) {
  const catalog = loadCatalog(catalogPath);
  const normalizedDay = ((parseInt(dayNumber, 10) - 1) % 365) + 1;
  const targetSlot = slot.toLowerCase() === 'evening' ? 'evening' : 'morning';

  const reel = catalog.reels.find(
    r => r.day_number === normalizedDay && r.slot.toLowerCase() === targetSlot
  );
  if (!reel) {
    throw new Error(`Reel not found for Day ${normalizedDay}, Slot: ${targetSlot}`);
  }
  return reel;
}

/**
 * Get reel by exact reel ID (e.g. 'REEL-316-M')
 */
export function getReelById(reelId, catalogPath = CATALOG_PATH) {
  const catalog = loadCatalog(catalogPath);
  const reel = catalog.reels.find(
    r => r.reel_id.toUpperCase() === reelId.toUpperCase()
  );
  if (!reel) {
    throw new Error(`Reel not found with ID: ${reelId}`);
  }
  return reel;
}

/**
 * Get reel for a given calendar date and slot
 * Input can be 'YYYY-MM-DD', Date instance, or undefined (defaults to current IST date)
 */
export function getReelForDate(dateInput, slot = 'morning', catalogPath = CATALOG_PATH) {
  let dayNum;
  if (typeof dateInput === 'number') {
    dayNum = dateInput;
  } else if (typeof dateInput === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
    const [y, m, d] = dateInput.split('-').map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
    dayNum = getDayOfYear(dt, 'UTC').dayOfYear;
  } else {
    const dt = dateInput instanceof Date ? dateInput : new Date();
    dayNum = getDayOfYear(dt, 'Asia/Kolkata').dayOfYear;
  }

  return getReelByDay(dayNum, slot, catalogPath);
}

/**
 * Read Ledger State
 */
export function readLedger(ledgerPath = LEDGER_PATH) {
  try {
    if (fs.existsSync(ledgerPath)) {
      return JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));
    }
  } catch (err) {
    console.warn("⚠️ Could not parse ledger file, initializing new one.");
  }
  const ist = getISTDateInfo();
  return {
    version: "2.0.0",
    policy: { max_posts_per_day: 2 },
    current_lock: { date: ist.dateStr, status: "READY", posts_count: 0, posts_allowed_remaining: 2, slots_executed_today: [] },
    history: []
  };
}

/**
 * Write Ledger State
 */
export function writeLedger(ledger, ledgerPath = LEDGER_PATH) {
  try {
    fs.mkdirSync(path.dirname(ledgerPath), { recursive: true });
    fs.writeFileSync(ledgerPath, JSON.stringify(ledger, null, 2), 'utf8');
  } catch (err) {
    console.error("✗ Failed to write ledger:", err.message);
  }
}

/**
 * Check Safety Freeze & Rate-Limit Status
 */
export function checkFreezeStatus(ledger, dateStr, force = false) {
  const maxAllowed = ledger.policy?.max_posts_per_day || 2;
  const isLockedDate = ledger.current_lock?.date === dateStr;
  const isStatusLocked = ledger.current_lock?.status === 'LOCKED_MAX_REACHED';
  const isCountMaxed = (ledger.current_lock?.posts_count || 0) >= maxAllowed;

  const isFrozen = isLockedDate && (isStatusLocked || isCountMaxed) && !force;

  return {
    isFrozen,
    maxAllowed,
    postsCount: isLockedDate ? (ledger.current_lock?.posts_count || 0) : 0,
    lockReason: ledger.current_lock?.lock_reason || `Daily cap reached for ${dateStr}`
  };
}

/**
 * Construct Social Payload for Meta & YouTube distribution
 */
export function buildSocialPayload(reel, slot, baseUrl = BASE_URL) {
  const targetSlot = slot.toLowerCase() === 'evening' ? 'evening' : 'morning';
  const isMorning = targetSlot === 'morning';
  const trigger = reel.trigger || (isMorning ? 'JOB' : 'HIRE');
  const hashtags = reel.hashtags || reel.instagram_tags || [
    '#JobSearchIndia', '#CareerAdvice', '#HiringNow', '#TalentAcquisition', '#JobsInIndia'
  ];

  const storyArc = reel.story_arc || {
    problem: reel.hook || "Workplace challenge",
    interval: "JSM Integrated Services human talent bridge",
    solution: "100% contingency and verified results",
    call_to_action: `Comment '${trigger}' to get started.`
  };

  const instagramBody = `Problem:\n${storyArc.problem}\n\nThe JSM Bridge:\n${storyArc.interval}\n\nOutcome:\n${storyArc.solution}\n\n👉 ${storyArc.call_to_action}`;

  // Prefer bespoke animated character video if rendered in public/videos/daily/{reel_id}.mp4
  const bespokeMp4Rel = `/videos/daily/${reel.reel_id}.mp4`;
  const bespokePosterRel = `/videos/daily/${reel.reel_id}.jpg`;
  const bespokeMp4Abs = path.join(ROOT_DIR, 'public', 'videos', 'daily', `${reel.reel_id}.mp4`);
  const bespokePosterAbs = path.join(ROOT_DIR, 'public', 'videos', 'daily', `${reel.reel_id}.jpg`);

  const hasBespokeVideo = fs.existsSync(bespokeMp4Abs);
  const videoUrl = hasBespokeVideo ? `${baseUrl}${bespokeMp4Rel}` : `${baseUrl}/videos/jsm-talent-bridge-reel.mp4`;
  const posterUrl = (hasBespokeVideo && fs.existsSync(bespokePosterAbs))
    ? `${baseUrl}${bespokePosterRel}`
    : `${baseUrl}/videos/poster-bridge.jpg`;

  return {
    service: "JSM Integrated Services",
    brand: "Talent Acquisition & Career Mediation Desk",
    schedule_slot: targetSlot,
    reel_id: reel.reel_id,
    day_number: reel.day_number,
    target_audience: reel.target_audience,
    weekly_theme: reel.weekly_theme,
    story_id: reel.reel_id,
    topic: reel.title,
    trigger: trigger,
    asset: {
      video_url: videoUrl,
      poster_url: posterUrl,
      aspect_ratio: reel.aspect_ratio || "9:16",
      duration_seconds: 59.2,
      duration_target: reel.duration_target || "59s",
      title: reel.title
    },

    // 1. INSTAGRAM REELS COPY
    instagram: {
      hook: reel.hook,
      caption: `${reel.hook}\n\n${instagramBody}\n\n${hashtags.slice(0, 5).join(' ')}`,
      share_to_feed: true,
      audio_name: "Original Audio - JSM Talent Bridge",
      trigger: trigger,
      hashtags: hashtags.slice(0, 5)
    },

    // 2. FACEBOOK REELS & PAGE POST COPY
    facebook: {
      title: reel.title,
      description: `${reel.hook}\n\n${storyArc.problem}\n\n${storyArc.interval}\n\n${storyArc.solution}\n\n${storyArc.call_to_action}`,
      trigger: trigger
    },

    // 3. YOUTUBE SHORTS COPY
    youtube: {
      title: reel.title.length <= 100 ? reel.title : `${reel.title.slice(0, 96)}...`,
      description: `${reel.hook}\n\n${storyArc.problem}\n\n${storyArc.interval}\n\n${storyArc.solution}\n\n${hashtags.join(' ')}`,
      tags: hashtags.map(t => t.replace('#', '')),
      category_id: "27",
      privacy_status: "public",
      trigger: trigger
    },

    story_arc: storyArc,
    timestamp: new Date().toISOString()
  };
}

/**
 * Webhook transport
 */
export function postToWebhook(urlStr, data) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(urlStr);
    const transport = parsed.protocol === 'https:' ? https : http;
    const postData = JSON.stringify(data);

    const req = transport.request({
      hostname: parsed.hostname,
      port: parsed.port || (parsed.protocol === 'https:' ? 443 : 80),
      path: parsed.pathname + (parsed.search || ''),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'JSM-Social-Dispatch-Engine/2.1'
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ status: res.statusCode, body });
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body || res.statusMessage}`));
        }
      });
    });

    req.on('error', err => reject(err));
    req.write(postData);
    req.end();
  });
}

/**
 * Main Dispatch Runner
 */
export async function main(cliArgs = process.argv.slice(2)) {
  const slotArg = cliArgs.find(a => a.startsWith('--slot='))?.split('=')[1];
  const storyArg = cliArgs.find(a => a.startsWith('--story='))?.split('=')[1];
  const dayArg = cliArgs.find(a => a.startsWith('--day='))?.split('=')[1];
  const reelIdArg = cliArgs.find(a => a.startsWith('--reel-id='))?.split('=')[1];
  const dateArg = cliArgs.find(a => a.startsWith('--date='))?.split('=')[1];
  const ledgerArg = cliArgs.find(a => a.startsWith('--ledger='))?.split('=')[1];
  const isDryRun = cliArgs.includes('--dry-run');
  const isStatusOnly = cliArgs.includes('--status') || cliArgs.includes('--schedule');
  const forceBypass = cliArgs.includes('--force');

  const ledgerPath = ledgerArg ? path.resolve(ledgerArg) : LEDGER_PATH;
  const activeWebhookUrl = process.env.MAKE_WEBHOOK_URL || process.env.SOCIAL_WEBHOOK_URL || WEBHOOK_URL;

  const istInfo = getISTDateInfo();
  const targetDate = dateArg || istInfo.dateStr;
  const currentSlot = slotArg ? slotArg.toLowerCase() : getCurrentSlot(istInfo.hour);

  // Resolve Active Reel from Catalog
  let activeReel;
  if (reelIdArg) {
    activeReel = getReelById(reelIdArg);
  } else if (dayArg) {
    activeReel = getReelByDay(parseInt(dayArg, 10), currentSlot);
  } else if (storyArg && !isNaN(parseInt(storyArg, 10))) {
    const num = parseInt(storyArg, 10);
    const day = num > 6 ? num : (num + 1);
    activeReel = getReelByDay(day, currentSlot);
  } else if (dateArg) {
    activeReel = getReelForDate(dateArg, currentSlot);
  } else {
    activeReel = getReelForDate(targetDate, currentSlot);
  }

  const socialPayload = buildSocialPayload(activeReel, currentSlot, BASE_URL);

  console.log("======================================================================");
  console.log("  JSM INTEGRATED SERVICES — 2X DAILY TALENT MEDIATION DISPATCH (v2.3)");
  console.log("======================================================================");
  console.log(`Current IST Time:      ${istInfo.dateStr} (${istInfo.dayName}) at ${String(istInfo.hour).padStart(2, '0')}:${String(istInfo.minute).padStart(2, '0')} IST (Day of Year: ${istInfo.dayOfYear})`);
  console.log(`Publishing Slot:       ${currentSlot.toUpperCase()} DISPATCH`);
  console.log(`Active Reel ID:        ${activeReel.reel_id} (Day ${activeReel.day_number})`);
  console.log(`Active Story Topic:    ${activeReel.title}`);
  console.log(`Target Audience:       ${activeReel.target_audience}`);
  console.log(`Audience Trigger:      Comment '${activeReel.trigger}'`);
  console.log(`Target Video CDN:      ${socialPayload.asset.video_url}`);
  console.log(`Instagram Hook:        "${activeReel.hook.slice(0, 100)}..."`);
  console.log(`Instagram Tags (5):    ${(activeReel.hashtags || []).slice(0, 5).join(' ')}`);
  console.log("----------------------------------------------------------------------");

  const ledger = readLedger(ledgerPath);

  // Print schedule / status mode
  if (isStatusOnly) {
    console.log("\n📊 OPTIMAL WEEKLY POSTING SCHEDULE (INDIA MARKET RESEARCH):");
    for (const [day, slots] of Object.entries(OPTIMAL_SCHEDULE_IST)) {
      const isToday = day === istInfo.dayName ? "👉 " : "   ";
      console.log(`${isToday}${day.padEnd(10)}: Morning: ${slots.morning.time} (${slots.morning.theme}) | Evening: ${slots.evening.time} (${slots.evening.theme})`);
    }
    console.log("\n🔒 CURRENT DISPATCH LEDGER STATUS:");
    console.log(`   Date:                  ${ledger.current_lock?.date}`);
    console.log(`   Status:                ${ledger.current_lock?.status}`);
    console.log(`   Posts Count Today:     ${ledger.current_lock?.posts_count} / ${ledger.policy?.max_posts_per_day || 2}`);
    console.log(`   Slots Executed Today:  ${(ledger.current_lock?.slots_executed_today || []).map(s => s.slot).join(', ') || 'None'}`);
    if (ledger.current_lock?.lock_reason) {
      console.log(`   Notice:                ${ledger.current_lock?.lock_reason}`);
    }
    return { success: true, mode: 'status', ledger };
  }

  // Check if date rolled over to a new day in IST (skip rollover during dry-run)
  if (ledger.current_lock && ledger.current_lock.date !== targetDate && !isDryRun) {
    if (ledger.current_lock.posts_count > 0) {
      ledger.history = ledger.history || [];
      ledger.history.push({
        date: ledger.current_lock.date,
        count: ledger.current_lock.posts_count,
        slots: ledger.current_lock.slots_executed_today
      });
    }
    ledger.current_lock = {
      date: targetDate,
      status: "READY",
      posts_count: 0,
      posts_allowed_remaining: ledger.policy?.max_posts_per_day || 2,
      slots_executed_today: []
    };
    writeLedger(ledger, ledgerPath);
  }

  // STRICT SAFETY ENFORCEMENT: 2 POSTS PER DAY CEILING & TODAY'S FREEZE
  const freezeStatus = checkFreezeStatus(ledger, targetDate, forceBypass);

  if (freezeStatus.isFrozen) {
    console.log("\n🛑 [ANTI-SPAM SAFETY LOCK ACTIVE] PUBLISHING HALTED FOR TODAY!");
    console.log("----------------------------------------------------------------------");
    console.log(`   • Reason:               Daily maximum cap of ${freezeStatus.maxAllowed} reels already reached for today (${targetDate}).`);
    console.log(`   • Posts Completed Today: ${freezeStatus.postsCount} / ${freezeStatus.maxAllowed}`);
    console.log(`   • Safety Protocol:     Posting more than 2x per day triggers Meta algorithmic spam flags.`);
    console.log(`   • Schedule Directive:   No evening post or ad-hoc test posts permitted for the rest of today.`);
    console.log(`   • Next Eligible Slot:  Tomorrow morning (${OPTIMAL_SCHEDULE_IST[istInfo.dayName]?.morning?.time || '08:45 AM'} IST).`);
    console.log("----------------------------------------------------------------------");
    console.log("✓ Zero network calls made. Account reputation protected.\n");
    return { success: false, halted: true, reason: 'SAFETY_FREEZE_ACTIVE', postsCount: freezeStatus.postsCount };
  }

  // Check if this specific slot was already published for target date
  const slotAlreadyRan = (ledger.current_lock?.date === targetDate) &&
                         (ledger.current_lock?.slots_executed_today || []).some(s => s.slot === currentSlot);
  if (slotAlreadyRan && !forceBypass && !isDryRun) {
    console.log(`\n⚠️  [SLOT DUPLICATE PREVENTED] The '${currentSlot.toUpperCase()}' slot has already been published today.`);
    console.log(`   To prevent duplicate content on Facebook & Instagram, this run is skipped.`);
    console.log(`   Next slot will trigger according to the optimal schedule.`);
    return { success: false, skipped: true, reason: 'SLOT_ALREADY_PUBLISHED' };
  }

  if (!activeWebhookUrl || isDryRun) {
    console.log("ℹ️  MODE: Dry-Run / Preview Mode.");
    console.log("\n[Payload Preview]:");
    console.log(JSON.stringify(socialPayload, null, 2));
    return { success: true, mode: 'dry-run', payload: socialPayload };
  }

  console.log(`🚀 Transmitting to Make.com Webhook (${activeWebhookUrl})...`);
  try {
    const result = await postToWebhook(activeWebhookUrl, socialPayload);
    console.log(`✓ Webhook Accepted! Status: ${result.status} (${result.body || "OK"})`);
    console.log("✓ Successfully triggered Instagram & Facebook live publishing.");

    // Update Ledger State Atomically
    ledger.current_lock.posts_count = (ledger.current_lock.posts_count || 0) + 1;
    ledger.current_lock.slots_executed_today = ledger.current_lock.slots_executed_today || [];
    ledger.current_lock.slots_executed_today.push({
      slot: currentSlot,
      timestamp: new Date().toISOString(),
      story_id: activeReel.reel_id,
      video_url: socialPayload.asset.video_url,
      platforms: ["Facebook", "Instagram"]
    });

    const maxAllowed = ledger.policy?.max_posts_per_day || 2;
    if (ledger.current_lock.posts_count >= maxAllowed) {
      ledger.current_lock.status = "LOCKED_MAX_REACHED";
      ledger.current_lock.posts_allowed_remaining = 0;
      ledger.current_lock.lock_reason = `Daily quota of ${maxAllowed} reels completed for ${targetDate}. Further dispatches locked until tomorrow.`;
    } else {
      ledger.current_lock.posts_allowed_remaining = maxAllowed - ledger.current_lock.posts_count;
    }

    writeLedger(ledger, ledgerPath);
    console.log(`✓ Dispatch Ledger updated: ${ledger.current_lock.posts_count} / ${maxAllowed} completed for today.`);
    return { success: true, published: true, slot: currentSlot, reelId: activeReel.reel_id, videoUrl: socialPayload.asset.video_url };
  } catch (err) {
    console.error(`✗ Failed to dispatch to webhook: ${err.message}`);
    process.exit(1);
  }
}

// Execute main only if invoked directly from CLI
const isDirectExecution = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isDirectExecution) {
  main().catch((err) => {
    console.error("Fatal dispatch error:", err);
    process.exit(1);
  });
}
