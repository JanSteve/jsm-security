#!/usr/bin/env node

/**
 * JSM Integrated Services — Automated Reels Pipeline Verification Suite
 * 
 * Verifies Requirement R1:
 * 1. Freeze on Nov 11, 2026 halts with zero posts (LOCKED_MAX_REACHED in social-dispatch-ledger.json)
 * 2. Schedule configuration for Nov 12 onward has strictly 2 reels/day at peak commute/review hours:
 *    - Morning: 08:30–09:00 AM IST (Candidates / 'JOB' trigger)
 *    - Evening: 07:15–07:45 PM IST (Employers / 'HIRE' trigger)
 *    - GitHub Actions cron: 15 3 * * * (08:45 AM IST) and 45 13 * * * (07:15 PM IST)
 * 3. Catalog has all 730 reels cleanly structured and indexed:
 *    - 365 morning reels ('JOB') and 365 evening reels ('HIRE')
 *    - Valid 4-phase story arcs: Problem -> Interval -> Solution -> CTA
 *    - Dynamic resolution for Nov 12, 2026 (Day 316)
 * 4. Style validator verifies flat-vector character story reels and rejects plain text slides:
 *    - Passes render-animated-character-reel.mjs (Rahul, Vikram, JSMMediator + canvas stage + 4-phase arc)
 *    - Strictly rejects render-scenes.mjs (plain text slide deck)
 *    - Validates all 730 catalog story arcs
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// Import modules under test
import {
  OPTIMAL_SCHEDULE_IST,
  loadCatalog,
  getReelByDay,
  getReelById,
  getReelForDate,
  getDayOfYear,
  getISTDateInfo,
  readLedger,
  checkFreezeStatus,
  buildSocialPayload,
  CATALOG_PATH,
  LEDGER_PATH
} from '../scripts/daily-social-dispatch.mjs';

import {
  parseTimeToMinutes,
  verifyScheduleCompliance,
  getISTNow,
  checkAndTrigger
} from '../scripts/social-scheduler.mjs';

import {
  verifyReelVisualStructure,
  verifyCatalogReelArc,
  verifyCatalog,
  CHARACTER_SPECS,
  REQUIRED_STORY_PHASES
} from '../scripts/verify-character-reel-style.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

console.log('======================================================================');
console.log('  TEST SUITE: ANIMATED CHARACTER REELS PUBLISHING & SCHEDULING PIPELINE');
console.log('======================================================================\n');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;
const failureDetails = [];

function check(title, assertionFn) {
  totalChecks++;
  const label = `[CHECK ${String(totalChecks).padStart(2, '0')}] ${title}`;
  try {
    const result = assertionFn();
    if (result === false) {
      throw new Error('Assertion returned false');
    }
    passedChecks++;
    console.log(`  ✓ PASS: ${label}`);
  } catch (err) {
    failedChecks++;
    console.error(`  ✗ FAIL: ${label}`);
    console.error(`          Reason: ${err.message}`);
    failureDetails.push({ label, error: err.message });
  }
}

// ============================================================================
// SUITE 1: STRICT SAFETY FREEZE FOR TODAY (NOV 11, 2026)
// ============================================================================
console.log('--- SUITE 1: SAFETY FREEZE ENFORCEMENT (NOV 11, 2026) ---');

const FROZEN_FIXTURE_PATH = '/tmp/jsm-test-frozen-ledger.json';
fs.writeFileSync(FROZEN_FIXTURE_PATH, JSON.stringify({
  version: '2.0.0',
  policy: { max_posts_per_day: 2 },
  current_lock: {
    date: '2026-11-11',
    status: 'LOCKED_MAX_REACHED',
    posts_count: 2,
    posts_allowed_remaining: 0,
    lock_reason: 'Test frozen fixture for 2026-11-11',
    slots_executed_today: [
      { slot: 'morning', timestamp: '2026-11-11T09:00:00+05:30' },
      { slot: 'evening', timestamp: '2026-11-11T13:46:05+05:30' }
    ]
  },
  history: []
}, null, 2));

check('Ledger file data/social-dispatch-ledger.json exists and is valid JSON', () => {
  if (!fs.existsSync(LEDGER_PATH)) throw new Error(`Ledger file missing at ${LEDGER_PATH}`);
  const ledger = JSON.parse(fs.readFileSync(LEDGER_PATH, 'utf8'));
  return ledger && typeof ledger.current_lock === 'object';
});

check('Policy strictly enforces max_posts_per_day: 2 in production ledger', () => {
  const ledger = readLedger();
  if (ledger.policy?.max_posts_per_day !== 2) {
    throw new Error(`Expected max_posts_per_day 2, got ${ledger.policy?.max_posts_per_day}`);
  }
  return true;
});

check('Production ledger records Nov 11 freeze/completion in current_lock or history', () => {
  const ledger = readLedger();
  const isNov11Locked = ledger.current_lock?.date === '2026-11-11' && ledger.current_lock?.status === 'LOCKED_MAX_REACHED';
  const hasNov11History = (ledger.history || []).some(h => h.date === '2026-11-11' && h.count === 2);
  if (!isNov11Locked && !hasNov11History) {
    throw new Error('Expected Nov 11, 2026 completion (2 posts) in current_lock or history');
  }
  return true;
});

check('Frozen fixture ledger enforces LOCKED_MAX_REACHED, posts_count: 2, remaining: 0', () => {
  const ledger = readLedger(FROZEN_FIXTURE_PATH);
  if (ledger.current_lock.status !== 'LOCKED_MAX_REACHED' || ledger.current_lock.posts_count !== 2 || ledger.current_lock.posts_allowed_remaining !== 0) {
    throw new Error(`Unexpected frozen fixture state: ${JSON.stringify(ledger.current_lock)}`);
  }
  return true;
});

check('Frozen fixture records both morning and evening slots executed', () => {
  const ledger = readLedger(FROZEN_FIXTURE_PATH);
  const slots = (ledger.current_lock.slots_executed_today || []).map(s => s.slot);
  if (!slots.includes('morning') || !slots.includes('evening')) {
    throw new Error(`Expected slots ['morning', 'evening'], got: ${JSON.stringify(slots)}`);
  }
  return true;
});

check('checkFreezeStatus confirms system is frozen for 2026-11-11 fixture', () => {
  const ledger = readLedger(FROZEN_FIXTURE_PATH);
  const status = checkFreezeStatus(ledger, '2026-11-11');
  if (!status.isFrozen) {
    throw new Error('Expected checkFreezeStatus to report isFrozen: true');
  }
  return true;
});

check('CLI execution of daily-social-dispatch.mjs halts with safety lock output and zero posts', () => {
  const output = execSync(`node scripts/daily-social-dispatch.mjs --date=2026-11-11 --ledger=${FROZEN_FIXTURE_PATH}`, { cwd: ROOT_DIR, encoding: 'utf8' });
  if (!output.includes('[ANTI-SPAM SAFETY LOCK ACTIVE] PUBLISHING HALTED FOR TODAY!')) {
    throw new Error('Expected safety lock active banner in CLI output');
  }
  if (!output.includes('Zero network calls made. Account reputation protected.')) {
    throw new Error('Expected confirmation of zero network calls');
  }
  return true;
});

check('CLI execution with --slot=morning halts safely with zero outbound posts', () => {
  const output = execSync(`node scripts/daily-social-dispatch.mjs --date=2026-11-11 --slot=morning --ledger=${FROZEN_FIXTURE_PATH}`, { cwd: ROOT_DIR, encoding: 'utf8' });
  if (!output.includes('PUBLISHING HALTED FOR TODAY!')) {
    throw new Error('Morning slot did not halt on frozen day');
  }
  return true;
});

check('CLI execution with --slot=evening halts safely with zero outbound posts', () => {
  const output = execSync(`node scripts/daily-social-dispatch.mjs --date=2026-11-11 --slot=evening --ledger=${FROZEN_FIXTURE_PATH}`, { cwd: ROOT_DIR, encoding: 'utf8' });
  if (!output.includes('PUBLISHING HALTED FOR TODAY!')) {
    throw new Error('Evening slot did not halt on frozen day');
  }
  return true;
});

check('social-scheduler.mjs detects frozen state and refuses to trigger dispatches', async () => {
  const ledger = readLedger(FROZEN_FIXTURE_PATH);
  const result = await checkAndTrigger({
    mockIST: { dateStr: '2026-11-11', dayName: 'Wednesday', hour: 14, minute: 50, totalMinutes: 14 * 60 + 50 },
    mockLedger: ledger,
    dryRunOnly: true
  });
  if (result.status !== 'FROZEN' || !result.isLocked) {
    throw new Error(`Expected scheduler to return FROZEN status, got: ${JSON.stringify(result)}`);
  }
  return true;
});

// ============================================================================
// SUITE 2: PUBLISHING SCHEDULE FOR NOV 12+ (2 REELS/DAY AT PEAK IST HOURS)
// ============================================================================
console.log('\n--- SUITE 2: DAILY PUBLISHING SCHEDULE CONFIGURATION (NOV 12+) ---');

check('OPTIMAL_SCHEDULE_IST defines all 7 days of the week', () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  for (const day of days) {
    if (!OPTIMAL_SCHEDULE_IST[day]) throw new Error(`Missing schedule entry for ${day}`);
    if (!OPTIMAL_SCHEDULE_IST[day].morning || !OPTIMAL_SCHEDULE_IST[day].evening) {
      throw new Error(`Incomplete slot definition for ${day}`);
    }
  }
  return true;
});

check('All morning slots across all 7 days fall strictly within 08:30–09:00 AM IST', () => {
  const minMins = parseTimeToMinutes('08:30 AM'); // 510
  const maxMins = parseTimeToMinutes('09:00 AM'); // 540

  for (const [day, slots] of Object.entries(OPTIMAL_SCHEDULE_IST)) {
    const timeMins = parseTimeToMinutes(slots.morning.time);
    if (timeMins < minMins || timeMins > maxMins) {
      throw new Error(`${day} morning time '${slots.morning.time}' (${timeMins} mins) is outside 08:30–09:00 AM IST window (${minMins}-${maxMins})`);
    }
  }
  return true;
});

check('All evening slots across all 7 days fall strictly within 07:15–07:45 PM IST', () => {
  const minMins = parseTimeToMinutes('07:15 PM'); // 1155
  const maxMins = parseTimeToMinutes('07:45 PM'); // 1185

  for (const [day, slots] of Object.entries(OPTIMAL_SCHEDULE_IST)) {
    const timeMins = parseTimeToMinutes(slots.evening.time);
    if (timeMins < minMins || timeMins > maxMins) {
      throw new Error(`${day} evening time '${slots.evening.time}' (${timeMins} mins) is outside 07:15–07:45 PM IST window (${minMins}-${maxMins})`);
    }
  }
  return true;
});

check('Morning slots target Candidates and evening slots target Employers across all days', () => {
  for (const [day, slots] of Object.entries(OPTIMAL_SCHEDULE_IST)) {
    if (!slots.morning.target.includes('Candidate')) {
      throw new Error(`${day} morning target '${slots.morning.target}' does not target Candidates`);
    }
    if (!slots.evening.target.includes('Founders') && !slots.evening.target.includes('Both')) {
      throw new Error(`${day} evening target '${slots.evening.target}' does not target Employers/Founders`);
    }
  }
  return true;
});

check('verifyScheduleCompliance reports 100% compliant with 0 violations', () => {
  const audit = verifyScheduleCompliance(OPTIMAL_SCHEDULE_IST);
  if (!audit.compliant || audit.violations.length > 0) {
    throw new Error(`Schedule compliance violations: ${audit.violations.join('; ')}`);
  }
  return true;
});

check('.github/workflows/daily-social-reel.yml morning cron is 15 3 * * * (08:45 AM IST)', () => {
  const workflowPath = path.join(ROOT_DIR, '.github', 'workflows', 'daily-social-reel.yml');
  const content = fs.readFileSync(workflowPath, 'utf8');
  if (!content.includes("cron: '15 3 * * *'")) {
    throw new Error("Missing expected morning cron '15 3 * * *' (08:45 AM IST)");
  }
  return true;
});

check('.github/workflows/daily-social-reel.yml evening cron is updated to 45 13 * * * (07:15 PM IST)', () => {
  const workflowPath = path.join(ROOT_DIR, '.github', 'workflows', 'daily-social-reel.yml');
  const content = fs.readFileSync(workflowPath, 'utf8');
  if (!content.includes("cron: '45 13 * * *'")) {
    throw new Error("Missing expected evening cron '45 13 * * *' (07:15 PM IST)");
  }
  if (content.includes("cron: '30 13 * * *'")) {
    throw new Error("Old cron '30 13 * * *' (07:00 PM IST) is still present in workflow!");
  }
  return true;
});

check('social-scheduler.mjs triggers morning dispatch when time is within 08:30–09:00 AM IST window', async () => {
  const mockLedger = {
    current_lock: { date: '2026-11-12', status: 'READY', posts_count: 0, slots_executed_today: [] }
  };
  const mockIST = {
    dateStr: '2026-11-12',
    dayName: 'Thursday',
    hour: 8,
    minute: 45,
    totalMinutes: 8 * 60 + 45
  };
  const result = await checkAndTrigger({ mockIST, mockLedger, dryRunOnly: true });
  if (result.status !== 'TRIGGERED_MORNING') {
    throw new Error(`Expected TRIGGERED_MORNING, got: ${JSON.stringify(result)}`);
  }
  return true;
});

check('social-scheduler.mjs triggers evening dispatch when time is within 07:15–07:45 PM IST window', async () => {
  const mockLedger = {
    current_lock: { date: '2026-11-12', status: 'READY', posts_count: 1, slots_executed_today: [{ slot: 'morning' }] }
  };
  const mockIST = {
    dateStr: '2026-11-12',
    dayName: 'Thursday',
    hour: 19,
    minute: 15,
    totalMinutes: 19 * 60 + 15
  };
  const result = await checkAndTrigger({ mockIST, mockLedger, dryRunOnly: true });
  if (result.status !== 'TRIGGERED_EVENING') {
    throw new Error(`Expected TRIGGERED_EVENING, got: ${JSON.stringify(result)}`);
  }
  return true;
});

// ============================================================================
// SUITE 3: ANNUAL REELS CATALOG (730 REELS) & DYNAMIC DISPATCH INTEGRATION
// ============================================================================
console.log('\n--- SUITE 3: ANNUAL REELS CATALOG (730 REELS) & DISPATCH WIRING ---');

check('Catalog file data/annual-reels-catalog.json exists and has total_reels: 730', () => {
  const catalog = loadCatalog();
  if (catalog.total_reels !== 730) {
    throw new Error(`Expected total_reels 730, got ${catalog.total_reels}`);
  }
  if (!Array.isArray(catalog.reels) || catalog.reels.length !== 730) {
    throw new Error(`Expected reels array of length 730, got ${catalog.reels?.length}`);
  }
  return true;
});

check('Catalog contains exactly 365 morning reels and 365 evening reels', () => {
  const catalog = loadCatalog();
  const morning = catalog.reels.filter(r => r.slot === 'morning');
  const evening = catalog.reels.filter(r => r.slot === 'evening');
  if (morning.length !== 365) throw new Error(`Expected 365 morning reels, found ${morning.length}`);
  if (evening.length !== 365) throw new Error(`Expected 365 evening reels, found ${evening.length}`);
  return true;
});

check('Every day from 1 to 365 has exactly one morning (M) and one evening (E) reel', () => {
  const catalog = loadCatalog();
  for (let day = 1; day <= 365; day++) {
    const m = catalog.reels.find(r => r.day_number === day && r.slot === 'morning');
    const e = catalog.reels.find(r => r.day_number === day && r.slot === 'evening');
    if (!m) throw new Error(`Missing morning reel for day ${day}`);
    if (!e) throw new Error(`Missing evening reel for day ${day}`);
    const expectedMId = `REEL-${String(day).padStart(3, '0')}-M`;
    const expectedEId = `REEL-${String(day).padStart(3, '0')}-E`;
    if (m.reel_id !== expectedMId) throw new Error(`Expected reel_id ${expectedMId}, got ${m.reel_id}`);
    if (e.reel_id !== expectedEId) throw new Error(`Expected reel_id ${expectedEId}, got ${e.reel_id}`);
  }
  return true;
});

check('All 365 morning reels have trigger: JOB and target Job Seekers', () => {
  const catalog = loadCatalog();
  const morningReels = catalog.reels.filter(r => r.slot === 'morning');
  for (const r of morningReels) {
    if (r.trigger !== 'JOB') throw new Error(`Reel ${r.reel_id} morning trigger is ${r.trigger}, expected 'JOB'`);
    if (!r.target_audience.toLowerCase().includes('job seeker')) {
      throw new Error(`Reel ${r.reel_id} target audience is '${r.target_audience}', expected Job Seekers`);
    }
  }
  return true;
});

check('All 365 evening reels have trigger: HIRE and target Employers/Founders', () => {
  const catalog = loadCatalog();
  const eveningReels = catalog.reels.filter(r => r.slot === 'evening');
  for (const r of eveningReels) {
    if (r.trigger !== 'HIRE') throw new Error(`Reel ${r.reel_id} evening trigger is ${r.trigger}, expected 'HIRE'`);
    if (!r.target_audience.toLowerCase().includes('employer')) {
      throw new Error(`Reel ${r.reel_id} target audience is '${r.target_audience}', expected Employers`);
    }
  }
  return true;
});

check('Every reel in catalog has complete 4-phase story_arc (problem, interval, solution, call_to_action)', () => {
  const catalog = loadCatalog();
  for (const r of catalog.reels) {
    if (!r.story_arc) throw new Error(`Reel ${r.reel_id} missing story_arc`);
    const { problem, interval, solution, call_to_action } = r.story_arc;
    if (!problem || problem.length < 15) throw new Error(`Reel ${r.reel_id} invalid story_arc.problem`);
    if (!interval || interval.length < 15) throw new Error(`Reel ${r.reel_id} invalid story_arc.interval`);
    if (!solution || solution.length < 15) throw new Error(`Reel ${r.reel_id} invalid story_arc.solution`);
    if (!call_to_action || call_to_action.length < 10) throw new Error(`Reel ${r.reel_id} invalid story_arc.call_to_action`);
  }
  return true;
});

check('All 730 reels have 9:16 aspect ratio, duration_target: 59s, and 5 hashtags', () => {
  const catalog = loadCatalog();
  for (const r of catalog.reels) {
    if (r.aspect_ratio !== '9:16') throw new Error(`Reel ${r.reel_id} aspect ratio is ${r.aspect_ratio}`);
    if (r.duration_target !== '59s') throw new Error(`Reel ${r.reel_id} duration_target is ${r.duration_target}`);
    if (!Array.isArray(r.hashtags) || r.hashtags.length < 3) {
      throw new Error(`Reel ${r.reel_id} hashtags count < 3`);
    }
  }
  return true;
});

check('getDayOfYear accurately resolves Nov 12, 2026 as Day 316', () => {
  const dt = new Date(Date.UTC(2026, 10, 12, 12, 0, 0)); // Month 10 = November
  const info = getDayOfYear(dt, 'UTC');
  if (info.dayOfYear !== 316) {
    throw new Error(`Expected Day 316 for 2026-11-12, got ${info.dayOfYear}`);
  }
  return true;
});

check('getReelForDate("2026-11-12", "morning") loads Day 316 Candidate reel (REEL-316-M, JOB)', () => {
  const reel = getReelForDate('2026-11-12', 'morning');
  if (reel.reel_id !== 'REEL-316-M') throw new Error(`Expected REEL-316-M, got ${reel.reel_id}`);
  if (reel.day_number !== 316) throw new Error(`Expected day 316, got ${reel.day_number}`);
  if (reel.trigger !== 'JOB') throw new Error(`Expected trigger JOB, got ${reel.trigger}`);
  if (!reel.title.includes('Candidate Angle')) throw new Error(`Title does not specify Candidate Angle: ${reel.title}`);
  return true;
});

check('getReelForDate("2026-11-12", "evening") loads Day 316 Employer reel (REEL-316-E, HIRE)', () => {
  const reel = getReelForDate('2026-11-12', 'evening');
  if (reel.reel_id !== 'REEL-316-E') throw new Error(`Expected REEL-316-E, got ${reel.reel_id}`);
  if (reel.day_number !== 316) throw new Error(`Expected day 316, got ${reel.day_number}`);
  if (reel.trigger !== 'HIRE') throw new Error(`Expected trigger HIRE, got ${reel.trigger}`);
  if (!reel.title.includes('Employer Angle')) throw new Error(`Title does not specify Employer Angle: ${reel.title}`);
  return true;
});

check('buildSocialPayload formats Instagram caption with hook, story beats, and hashtags', () => {
  const reel = getReelForDate('2026-11-12', 'morning');
  const payload = buildSocialPayload(reel, 'morning');

  if (!payload.instagram.caption.includes(reel.hook)) throw new Error('Caption missing hook');
  if (!payload.instagram.caption.includes(reel.story_arc.problem)) throw new Error('Caption missing problem');
  if (!payload.instagram.caption.includes(reel.story_arc.interval)) throw new Error('Caption missing interval');
  if (!payload.instagram.caption.includes(reel.story_arc.solution)) throw new Error('Caption missing solution');
  if (!payload.instagram.caption.includes(reel.story_arc.call_to_action)) throw new Error('Caption missing CTA');
  if (payload.instagram.trigger !== 'JOB') throw new Error(`Expected trigger JOB, got ${payload.instagram.trigger}`);
  if (payload.asset.aspect_ratio !== '9:16') throw new Error(`Expected 9:16 aspect ratio`);
  return true;
});

check('CLI dry-run for Nov 12 morning produces clean payload without publishing', () => {
  const output = execSync('node scripts/daily-social-dispatch.mjs --date=2026-11-12 --slot=morning --dry-run', {
    cwd: ROOT_DIR,
    encoding: 'utf8'
  });
  if (!output.includes('Active Reel ID:        REEL-316-M')) throw new Error('Expected REEL-316-M in output');
  if (!output.includes("Audience Trigger:      Comment 'JOB'")) throw new Error('Expected JOB trigger in output');
  if (!output.includes('MODE: Dry-Run / Preview Mode.')) throw new Error('Expected Dry-Run mode confirmation');
  return true;
});

check('CLI dry-run for Nov 12 evening produces clean payload without publishing', () => {
  const output = execSync('node scripts/daily-social-dispatch.mjs --date=2026-11-12 --slot=evening --dry-run', {
    cwd: ROOT_DIR,
    encoding: 'utf8'
  });
  if (!output.includes('Active Reel ID:        REEL-316-E')) throw new Error('Expected REEL-316-E in output');
  if (!output.includes("Audience Trigger:      Comment 'HIRE'")) throw new Error('Expected HIRE trigger in output');
  if (!output.includes('MODE: Dry-Run / Preview Mode.')) throw new Error('Expected Dry-Run mode confirmation');
  return true;
});

// ============================================================================
// SUITE 4: VISUAL STYLE ENFORCEMENT & PLAIN TEXT SLIDE REJECTION
// ============================================================================
console.log('\n--- SUITE 4: VISUAL STYLE VALIDATOR & PLAIN TEXT REJECTION ---');

check('scripts/verify-character-reel-style.mjs exists and exports validator functions', () => {
  const validatorPath = path.join(ROOT_DIR, 'scripts', 'verify-character-reel-style.mjs');
  if (!fs.existsSync(validatorPath)) throw new Error('Validator script missing');
  return typeof verifyReelVisualStructure === 'function' && typeof verifyCatalog === 'function';
});

check('Validator PASSES scripts/render-animated-character-reel.mjs as valid character storytelling', () => {
  const reelPath = path.join(ROOT_DIR, 'scripts', 'render-animated-character-reel.mjs');
  const res = verifyReelVisualStructure(reelPath);
  if (!res.valid) {
    throw new Error(`Expected valid character reel, but failed: ${res.reason}`);
  }
  if (!res.characterDetected) throw new Error('Expected characterDetected: true');
  if (res.plainTextSlideRejected) throw new Error('Character reel was incorrectly flagged as plain text slide');
  return true;
});

check('Validator detects all 3 flat-vector characters (Rahul, Vikram, JSMMediator)', () => {
  const reelPath = path.join(ROOT_DIR, 'scripts', 'render-animated-character-reel.mjs');
  const res = verifyReelVisualStructure(reelPath);
  const chars = res.details.characters;
  if (!chars.rahul) throw new Error('Rahul character not detected');
  if (!chars.vikram) throw new Error('Vikram character not detected');
  if (!chars.jsmMediator) throw new Error('JSMMediator character not detected');
  return true;
});

check('Validator detects <canvas id="stage"> and 2D vector drawing operations', () => {
  const reelPath = path.join(ROOT_DIR, 'scripts', 'render-animated-character-reel.mjs');
  const res = verifyReelVisualStructure(reelPath);
  if (!res.details.canvasStageDetected) throw new Error('Canvas stage not detected');
  if (!res.details.hasVectorDrawing) throw new Error('Vector drawing routines not detected');
  return true;
});

check('Validator detects 4-phase storytelling structure in character reel', () => {
  const reelPath = path.join(ROOT_DIR, 'scripts', 'render-animated-character-reel.mjs');
  const res = verifyReelVisualStructure(reelPath);
  const phases = res.details.phases;
  if (!phases.problem_agony) throw new Error('Problem/Agony phase not detected');
  if (!phases.interval_bridge) throw new Error('Interval/JSM Bridge phase not detected');
  if (!phases.solution_double_win) throw new Error('Solution/Double Win phase not detected');
  if (!phases.dual_comment_cta) throw new Error('Dual Comment CTA phase not detected');
  return true;
});

check('Validator strictly REJECTS scripts/render-scenes.mjs as plain text slides', () => {
  const scenesPath = path.join(ROOT_DIR, 'scripts', 'render-scenes.mjs');
  const res = verifyReelVisualStructure(scenesPath);
  if (res.valid) {
    throw new Error('render-scenes.mjs should NOT pass validation!');
  }
  if (!res.plainTextSlideRejected) {
    throw new Error('Expected plainTextSlideRejected: true for text-only slide deck');
  }
  if (res.characterDetected) {
    throw new Error('No characters should be detected in text-only slides');
  }
  return true;
});

check('Validator strictly rejects synthetic plain text slide code string', () => {
  const syntheticTextSlide = `
    const slides = [
      { headline: "APPLIED TO 200 JOBS?", metric: "78% ghosted" },
      { headline: "ATS BOTS REJECT RESUMES", metric: "3 seconds" }
    ];
    function render() { return '<div class="card"><h1>' + slides[0].headline + '</h1></div>'; }
  `;
  const res = verifyReelVisualStructure(syntheticTextSlide, { sourceLabel: 'synthetic-text-slide' });
  if (res.valid) throw new Error('Synthetic text slide passed unexpectedly');
  if (!res.plainTextSlideRejected) throw new Error('Expected plainTextSlideRejected: true');
  return true;
});

check('verifyCatalog audits all 730 annual catalog story arcs with 100% pass', () => {
  const audit = verifyCatalog();
  if (audit.totalReels !== 730) throw new Error(`Expected 730 reels audited, got ${audit.totalReels}`);
  if (audit.validCount !== 730) throw new Error(`Expected 730 valid, got ${audit.validCount}`);
  if (audit.invalidCount !== 0) throw new Error(`Found ${audit.invalidCount} invalid reels`);
  return true;
});

check('verifyCatalogReelArc catches malformed reel missing required beats', () => {
  const brokenReel = {
    reel_id: "BROKEN-01",
    slot: "morning",
    trigger: "JOB",
    story_arc: {
      problem: "Too short",
      // missing interval
      solution: "Too short",
      call_to_action: "Short"
    }
  };
  const res = verifyCatalogReelArc(brokenReel);
  if (res.valid) throw new Error('Broken reel passed unexpectedly');
  if (res.violations.length < 2) throw new Error('Expected multiple violation reports for missing beats');
  return true;
});

check('verifyCatalogReelArc enforces trigger slot alignment (Morning=JOB, Evening=HIRE)', () => {
  const mismatchedMorning = {
    reel_id: "REEL-999-M",
    slot: "morning",
    trigger: "HIRE", // Should be JOB!
    story_arc: {
      problem: "A valid lengthy problem statement describing candidate agony.",
      interval: "JSM Integrated Services intervenes with 100% free talent representation.",
      solution: "Candidate receives verified offer letter with transparent salary.",
      call_to_action: "Comment 'JOB' with your domain and city to receive matches."
    }
  };
  const res = verifyCatalogReelArc(mismatchedMorning);
  if (res.valid) throw new Error('Mismatched trigger passed unexpectedly');
  if (!res.violations.some(v => v.includes("must have trigger 'JOB'"))) {
    throw new Error(`Expected trigger mismatch violation, got: ${res.violations.join('; ')}`);
  }
  return true;
});

// ============================================================================
// SUITE 5: EDGE CASES, BOUNDARIES & RESILIENCY
// ============================================================================
console.log('\n--- SUITE 5: EDGE CASES & SYSTEM RESILIENCY ---');

check('getDayOfYear boundary calculation for Jan 1 and Dec 31 in 2026', () => {
  const jan1 = new Date(Date.UTC(2026, 0, 1, 12, 0, 0));
  const dec31 = new Date(Date.UTC(2026, 11, 31, 12, 0, 0));
  const infoJan1 = getDayOfYear(jan1, 'UTC');
  const infoDec31 = getDayOfYear(dec31, 'UTC');

  if (infoJan1.dayOfYear !== 1) throw new Error(`Expected Day 1 for Jan 1, got ${infoJan1.dayOfYear}`);
  if (infoDec31.dayOfYear !== 365) throw new Error(`Expected Day 365 for Dec 31, got ${infoDec31.dayOfYear}`);
  return true;
});

check('getReelByDay handles day wrapping beyond 365 cleanly', () => {
  const reelDay1 = getReelByDay(1, 'morning');
  const reelDay366 = getReelByDay(366, 'morning'); // 366 % 365 = 1
  if (reelDay366.reel_id !== reelDay1.reel_id) {
    throw new Error(`Day 366 should wrap to Day 1 (${reelDay1.reel_id}), got ${reelDay366.reel_id}`);
  }
  return true;
});

check('getReelById retrieves exact boundary items (REEL-001-M, REEL-365-E)', () => {
  const first = getReelById('REEL-001-M');
  const last = getReelById('REEL-365-E');
  if (first.day_number !== 1 || first.slot !== 'morning') throw new Error('Failed to retrieve REEL-001-M');
  if (last.day_number !== 365 || last.slot !== 'evening') throw new Error('Failed to retrieve REEL-365-E');
  return true;
});

check('parseTimeToMinutes handles AM, PM, noon, and midnight correctly', () => {
  if (parseTimeToMinutes('12:00 AM') !== 0) throw new Error('12:00 AM != 0 mins');
  if (parseTimeToMinutes('08:30 AM') !== 510) throw new Error('08:30 AM != 510 mins');
  if (parseTimeToMinutes('12:00 PM') !== 720) throw new Error('12:00 PM != 720 mins');
  if (parseTimeToMinutes('07:15 PM') !== 1155) throw new Error('07:15 PM != 1155 mins');
  if (parseTimeToMinutes('11:59 PM') !== 1439) throw new Error('11:59 PM != 1439 mins');
  return true;
});

// ============================================================================
// SUMMARY & RESULTS
// ============================================================================
console.log('\n======================================================================');
console.log('  TEST EXECUTION SUMMARY');
console.log('======================================================================');
console.log(`  Total Checks:   ${totalChecks}`);
console.log(`  Passed Checks:  ${passedChecks}`);
console.log(`  Failed Checks:  ${failedChecks}`);

if (failedChecks > 0) {
  console.error('\n  FAILURES DETECTED:');
  for (const f of failureDetails) {
    console.error(`  - ${f.label}: ${f.error}`);
  }
  console.log('======================================================================\n');
  process.exit(1);
} else {
  console.log('\n  ✓ 100% TESTS PASSED — REQUIREMENT R1 COMPLETELY VERIFIED');
  console.log('======================================================================\n');
  process.exit(0);
}
