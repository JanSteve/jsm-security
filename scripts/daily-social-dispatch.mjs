#!/usr/bin/env node

/**
 * JSM Integrated Services — Universal Talent & Company Mediation Engine
 * 
 * Features:
 * - 2x Daily Automated Publishing (Morning: 08:45 AM IST | Evening: 07:00 PM IST)
 * - 7-Story Relatable Career & Hiring Crisis Matrix (Candidates + Companies)
 * - Double-Action Inbound Lead Capture:
 *     * Job Seekers comment: 'JOB', 'RESUME', 'SWITCH', 'CAREER'
 *     * Hiring Companies comment: 'HIRE', 'TALENT', 'MEDIATOR', 'URGENT'
 * - High-Engagement Algorithm SEO: First 125 chars hook before the fold
 * - Strict 5 Trending Hashtags per Instagram Post (Zero spam penalties)
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
const ROOT_DIR = path.resolve(__dirname, '..');
const LEDGER_PATH = path.join(ROOT_DIR, 'data', 'social-dispatch-ledger.json');

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jsmintegratedservices.com';
const WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL || process.env.SOCIAL_WEBHOOK_URL;

// Parse CLI flags: --slot=morning|evening, --story=0..6, --dry-run, --status, --force
const args = process.argv.slice(2);
const slotArg = args.find(a => a.startsWith('--slot='))?.split('=')[1];
const storyArg = args.find(a => a.startsWith('--story='))?.split('=')[1];
const isDryRun = args.includes('--dry-run');
const isStatusOnly = args.includes('--status') || args.includes('--schedule');
const forceBypass = args.includes('--force');

// Day-of-Week Optimal Posting Schedule for Indian Market (IST: UTC + 5:30)
// Research basis: Peak commute times (Candidates) & Founder/HR morning planning + evening review
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
    evening: { time: "06:15 PM", target: "Founders / HR", theme: "Closing Hiring Mandates Before Weekend" }
  },
  Saturday: {
    morning: { time: "10:30 AM", target: "Candidates", theme: "Resume Rebuilding & Salary Negotiation Mastery" },
    evening: { time: "06:00 PM", target: "Founders / HR", theme: "Strategic Headcount Planning for Next Quarter" }
  },
  Sunday: {
    morning: { time: "11:00 AM", target: "Candidates", theme: "Mindset Reset & Long-Term Career Vision" },
    evening: { time: "07:45 PM", target: "Both (Peak)", theme: "Sunday Scaries Peak: Taking Action for Monday" }
  }
};

// Helper: Get Current IST Date & Day
function getISTDateInfo() {
  const now = new Date();
  // Format in IST
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  const dateStr = formatter.format(now); // YYYY-MM-DD
  
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

  return { dateStr, dayName, hour, minute, raw: now };
}

// Determine current IST slot
function getCurrentSlot(istHour) {
  if (slotArg) return slotArg.toLowerCase();
  return istHour >= 14 ? 'evening' : 'morning';
}

const IST_INFO = getISTDateInfo();
const CURRENT_SLOT = getCurrentSlot(IST_INFO.hour);

// Read Ledger State
function readLedger() {
  try {
    if (fs.existsSync(LEDGER_PATH)) {
      return JSON.parse(fs.readFileSync(LEDGER_PATH, 'utf8'));
    }
  } catch (err) {
    console.warn("⚠️ Could not parse ledger file, initializing new one.");
  }
  return {
    version: "2.0.0",
    policy: { max_posts_per_day: 2 },
    current_lock: { date: IST_INFO.dateStr, status: "READY", posts_count: 0, slots_executed_today: [] },
    history: []
  };
}

// Write Ledger State
function writeLedger(ledger) {
  try {
    fs.mkdirSync(path.dirname(LEDGER_PATH), { recursive: true });
    fs.writeFileSync(LEDGER_PATH, JSON.stringify(ledger, null, 2), 'utf8');
  } catch (err) {
    console.error("✗ Failed to write ledger:", err.message);
  }
}

// 7-Story Relatable Talent Mediation Matrix
const STORY_MATRIX = [
  {
    id: "applied-200-jobs-ghosted",
    topic: "Applied to 200 Jobs and Got Ghosted by Bots vs Companies Desperate to Hire",
    video_title: "Why Finding a Job & Hiring Talent Are Both Broken in 2026",
    trigger_candidate: "JOB",
    trigger_company: "HIRE",
    instagram_hook: "Applied to 200 jobs this month and heard nothing? Meanwhile great companies say they can't find good people. Here is why:",
    instagram_body: `You spend hours tailoring your resume, clicking 'Easy Apply', only for automated ATS robots to reject it in 3 seconds.

Meanwhile, business owners and founders are drowning in 1,200 spam resumes, waiting months to find one honest, dependable worker.

The system is broken. That's why JSM Integrated Services exists as the human talent bridge.

For Job Seekers:
• 100% Free Forever — We never charge candidates a single rupee
• No ATS bots — Direct human representation to CEOs, Founders & HR Directors
• Transparent salary & verified company culture

For Companies & Employers:
• Pure Contingency — ₹0 Upfront Retainer Fees
• 3 Verified, interview-ready finalists delivered in 7 days
• 90-Day Placement Replacement Shield [CONFIRM: fee %]

👉 If you're looking for a job: Comment 'JOB' + your role & city.
👉 If you're a company hiring: Comment 'HIRE' to receive pre-screened profiles this week.`,
    instagram_tags: [
      "#JobSearchIndia",
      "#HiringNow",
      "#CareerAdvice",
      "#TalentAcquisition",
      "#JobsInIndia"
    ],
    facebook_title: "Why Finding a Job and Hiring Talent Are Both Broken (And How JSM Bridges Both)",
    facebook_description: `Applied to hundreds of jobs and got ghosted by automated bots? Or are you a business owner drowning in spam resumes, unable to find one dependable hire?

JSM Integrated Services is the human talent bridge:
• For Candidates: 100% Free placement assistance, zero fees, direct access to founders and hiring managers.
• For Employers: Pure success-based contingency search. Zero advance retainers. 3 pre-vetted finalists in 7 days backed by a 90-day guarantee.

Drop your comment below:
👉 Candidates: Comment 'JOB' with your domain and city.
👉 Employers: Comment 'HIRE' to get pre-screened talent delivered this week.

Direct Talent Desk:
📞 Call / WhatsApp: +91 90808 63448
🌐 Official Portal: https://www.jsmintegratedservices.com
📍 Connecting Talent Across India: Tamil Nadu · Karnataka · Maharashtra · Gujarat · Delhi NCR`,
    youtube_title: "Applied to 200 Jobs & Got Ghosted? The Hiring System is Broken! #Shorts"
  },

  {
    id: "day-one-ghosting-crisis",
    topic: "The Day-One Ghosting Nightmare for Employers & Serious Candidates",
    video_title: "How to Stop Day-1 Candidate Ghosting & Bad Hiring Agencies",
    trigger_candidate: "JOIN",
    trigger_company: "TALENT",
    instagram_hook: "You waited 60 days of notice period for a candidate to join. On Monday morning, their phone is switched off. Fix it today:",
    instagram_body: `Every business owner and HR head knows this pain:
You issue an offer letter, prepare their laptop, and on Day 1: GHOSTED. The candidate shopped your offer around.

Meanwhile, hundreds of serious, hardworking professionals are waiting for a real opportunity and cannot get an interview.

JSM Integrated Services changes the game:
• We pre-screen candidates for genuine joining commitment & counter-offer risks.
• We mediate transparent salary expectations on both sides.
• Backed by our 90-day replacement guarantee with ₹0 upfront retainer.

👉 Companies looking for committed staff: Comment 'TALENT' below.
👉 Serious professionals ready for real roles: Comment 'JOIN' below.`,
    instagram_tags: [
      "#Recruitment",
      "#HiringTips",
      "#HumanResources",
      "#TalentAcquisition",
      "#IndiaJobs"
    ],
    facebook_title: "The Day-One Ghosting Crisis: Why Employers Lose Months and How JSM Solves It",
    facebook_description: `Waiting 60 days for a candidate to join only for them to switch off their phone on Monday morning is every employer's worst nightmare.

JSM Integrated Services acts as the dedicated mediator:
• We thoroughly vet joining intent and offer stability.
• ₹0 Capital Risk: 100% contingency success model.
• 90-Day Free Replacement Shield on all placements.

Looking to build a reliable team or step into a verified career?
👉 Companies: Comment 'TALENT'
👉 Job Seekers: Comment 'JOIN'

📞 Direct Desk: +91 90808 63448
🌐 Visit: https://www.jsmintegratedservices.com`,
    youtube_title: "Candidate Ghosted on Day 1? How Employers Fix Hiring Forever #Shorts"
  },

  {
    id: "underpaid-overworked-switch",
    topic: "Underpaid & Overworked: The Confidential Career Upgrade",
    video_title: "Doing the Work of 3 People for a 4% Appraisal? Time to Switch",
    trigger_candidate: "SWITCH",
    trigger_company: "GROW",
    instagram_hook: "You did the work of three people this year, and they offered you a 4% appraisal. It is time for a confidential upgrade:",
    instagram_body: `Most high-performing professionals stay trapped in low-paying or dead-end roles because applying publicly puts their current job at risk.

JSM Integrated Services acts as your confidential career agent:
• 100% Confidential Representation — your current employer will never know.
• We match your real achievements with companies paying top market rates.
• ₹0 Fee to candidates — our mediation is completely free for job seekers.

For Employers: Access motivated, top-tier active and passive performers ready to drive immediate revenue and operational growth.

👉 Professionals ready to switch: Comment 'SWITCH' below.
👉 Companies scaling their team: Comment 'GROW' below.`,
    instagram_tags: [
      "#CareerGrowth",
      "#SalaryNegotiation",
      "#JobSwitch",
      "#HiringNow",
      "#TalentAcquisition"
    ],
    facebook_title: "Tired of Low Appraisals? How JSM Confidentially Bridges Top Talent with High-Paying Employers",
    facebook_description: `Doing the work of three people and getting a 4% appraisal? You deserve a team that values your real contribution.

JSM Integrated Services provides confidential career mediation:
• For Candidates: We privately represent your portfolio to verified employers who pay true market value. Never pay any fee.
• For Companies: Get introduced to high-performing talent who actually care about delivering results.

👉 Want to upgrade your career? Comment 'SWITCH'
👉 Looking to scale your business? Comment 'GROW'

📞 Executive Desk: +91 90808 63448
🌐 Official Site: https://www.jsmintegratedservices.com`,
    youtube_title: "Work Like a Hero, Paid Like an Intern? Time to Switch! #Shorts"
  },

  {
    id: "upfront-recruiter-scam",
    topic: "Why Businesses Should Never Pay Upfront Advance Retainers to Agencies",
    video_title: "Never Pay Advance Fees to Recruitment Agencies: The JSM Model",
    trigger_candidate: "OPPORTUNITY",
    trigger_company: "MEDIATOR",
    instagram_hook: "Never pay an advance retainer to a recruitment agency. Here is why the traditional recruitment model is broken:",
    instagram_body: `Traditional recruitment agencies take ₹1 to ₹3 Lakhs upfront, forward 50 generic resumes downloaded from job portals, and disappear when candidates fail interviews.

JSM Integrated Services operates on 100% Pure Contingency:
• Zero Advance Fees — you pay absolutely nothing upfront.
• 7 Business Days to 3 Calibrated, interview-ready candidates.
• Invoiced strictly 30 days post-onboarding [CONFIRM: fee %].
• 90-Day Placement Replacement Guarantee.

We only win when you win.

👉 Business Owners & HR Leaders: Comment 'MEDIATOR' to initiate your search with ₹0 upfront risk.
👉 Motivated Candidates: Comment 'OPPORTUNITY' to enter our active placement pipeline.`,
    instagram_tags: [
      "#StartupIndia",
      "#BusinessOwner",
      "#Recruitment",
      "#HiringSolutions",
      "#TalentSearch"
    ],
    facebook_title: "Why Startups & SMEs Should Never Pay Upfront Recruitment Retainers",
    facebook_description: `Paying upfront fees to headhunters with zero guarantee of a successful hire is a major drain on business cash flow.

Discover the JSM Contingency Model:
• ₹0 Upfront Fee — Zero financial risk.
• Fast 7-day candidate shortlist.
• 90-Day Free Replacement Guarantee.

👉 Hiring for your company? Comment 'MEDIATOR'
👉 Looking for your next career step? Comment 'OPPORTUNITY'

📞 Call Desk: +91 90808 63448
🌐 https://www.jsmintegratedservices.com`,
    youtube_title: "Stop Paying Upfront Fees to Headhunters! (The Smarter Way) #Shorts"
  },

  {
    id: "endless-interview-loop",
    topic: "The 5-Round Interview Circus: Cutting Hiring Time from 90 Days to 14 Days",
    video_title: "5 Interview Rounds, a 10-Page Assignment, Then Silence? Fix It",
    trigger_candidate: "RESUME",
    trigger_company: "SPEED",
    instagram_hook: "Five interview rounds, a 10-page take-home assignment, and then two weeks of dead silence. Why is hiring so toxic?",
    instagram_body: `Both sides are exhausted:
Great candidates drop out of endless, disorganized interview loops. Meanwhile, companies lose their top picks to faster competitors while wasting 40 hours of manager time.

JSM Integrated Services fixes the process through calibrated mediation:
• Pre-aligned salary and joining timelines before the first interview.
• Verified technical skills and cultural suitability.
• Fast-track 14-day hiring turnaround from intake to offer letter.

👉 Candidates looking for clean, respectful hiring: Comment 'RESUME'.
👉 Companies needing fast, decisive talent acquisition: Comment 'SPEED'.`,
    instagram_tags: [
      "#InterviewTips",
      "#Recruitment",
      "#CareerAdvice",
      "#HiringNow",
      "#TalentAcquisition"
    ],
    facebook_title: "Tired of 5-Round Interview Loops? How JSM Cuts Hiring Time to 14 Days",
    facebook_description: `Prolonged interview loops cause companies to lose top talent and leave candidates feeling frustrated and disrespected.

JSM Integrated Services pre-aligns compensation, technical competencies, and culture fit in advance:
• Cut time-to-hire by over 60%.
• ₹0 advance fees for companies.
• 100% free placement for candidates.

👉 Looking for a job? Comment 'RESUME'
👉 Need to hire quickly? Comment 'SPEED'

📞 Desk: +91 90808 63448 | 🌐 https://www.jsmintegratedservices.com`,
    youtube_title: "5 Interview Rounds Then Ghosted? Why Hiring is Broken #Shorts"
  },

  {
    id: "emergency-resignation-panic",
    topic: "Emergency Resignation: What to Do When a Key Person Leaves Tomorrow",
    video_title: "When a Key Employee Leaves Suddenly: The 168-Hour Talent Sprint",
    trigger_candidate: "READY",
    trigger_company: "URGENT",
    instagram_hook: "Your key manager or engineer just handed in their resignation. Your major project is due in 30 days. Do this immediately:",
    instagram_body: `When an unexpected vacancy hits, job boards take 4 to 8 weeks to produce a viable candidate. Every vacant day stalls client deliverables and burns team morale.

JSM Integrated Services deploys our 168-Hour Emergency Talent Sprint:
• Rapid access to pre-screened, immediate-joiner talent benches.
• 3 Interview-ready dossiers delivered within 7 business days.
• Complete background verification and salary calibration.
• ₹0 Upfront Retainer — you only pay upon successful hire.

👉 Companies facing urgent vacancies: Comment 'URGENT' below.
👉 Immediate joiners available for fast-track roles: Comment 'READY' below.`,
    instagram_tags: [
      "#ImmediateJoiner",
      "#HiringNow",
      "#JobsInIndia",
      "#Recruitment",
      "#TalentHunt"
    ],
    facebook_title: "Key Person Just Resigned? How JSM Fills Critical Roles in 7 Days",
    facebook_description: `Don't let an unexpected resignation derail your operational momentum.

JSM's 168-Hour Rapid Talent Sprint delivers 3 verified, interview-ready candidates in 7 business days with zero upfront capital risk.

👉 Facing an urgent vacancy? Comment 'URGENT'
👉 Available to join immediately? Comment 'READY'

📞 Emergency Hiring Hotline: +91 90808 63448
🌐 Portal: https://www.jsmintegratedservices.com`,
    youtube_title: "Key Employee Just Quit? Fill Critical Roles in 7 Days #Shorts"
  },

  {
    id: "mediator-that-cares",
    topic: "The Human Talent Mediator: Bridging Real People with Real Companies",
    video_title: "No Bots. No Spam. Real Human Talent Mediation with JSM",
    trigger_candidate: "CAREER",
    trigger_company: "PARTNER",
    instagram_hook: "Job seekers are tired of ghosting. Companies are tired of no-shows. JSM is the human bridge that connects both:",
    instagram_body: `Job portals are cold, automated algorithms. Headhunters who demand upfront retainers don't care about the final outcome.

JSM Integrated Services is built on mutual accountability and human mediation:
• For Candidates: We guide your career, review your achievements, and connect you with verified companies that treat people right. 100% Free.
• For Employers: We deliver screened, dependable team members who show up, perform, and stay. Zero upfront fees, 90-day guarantee.

Let's build better workplaces together.

👉 Looking for your dream role? Comment 'CAREER'.
👉 Looking to partner for hiring? Comment 'PARTNER'.`,
    instagram_tags: [
      "#TalentAcquisition",
      "#JobSearchIndia",
      "#HiringSolutions",
      "#RecruitmentAgency",
      "#Jobs2026"
    ],
    facebook_title: "The Human Talent Bridge: How JSM Connects Job Seekers with Great Employers",
    facebook_description: `Say goodbye to black-hole job applications and unreliable agency promises. JSM Integrated Services is the dedicated talent mediator bridging job seekers with reputable employers across India.

• Zero fees for job seekers.
• Zero advance fees for employers (100% contingency).
• 90-day placement replacement guarantee.

Drop your comment below to connect:
👉 Job Seekers: Comment 'CAREER'
👉 Employers: Comment 'PARTNER'

📞 Executive Desk: +91 90808 63448
🌐 https://www.jsmintegratedservices.com`,
    youtube_title: "The Human Talent Bridge: Real Jobs, Real Companies, Zero Fees #Shorts"
  }
];

// Determine active story based on day of year & slot
function getActiveStory() {
  if (storyArg !== undefined && !isNaN(parseInt(storyArg, 10))) {
    const idx = parseInt(storyArg, 10) % STORY_MATRIX.length;
    return STORY_MATRIX[idx];
  }
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now - startOfYear;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  const isEvening = CURRENT_SLOT === 'evening';
  const index = (dayOfYear * 2 + (isEvening ? 1 : 0)) % STORY_MATRIX.length;
  return STORY_MATRIX[index];
}

const ACTIVE_STORY = getActiveStory();

// Construct Social Payload
const SOCIAL_PAYLOAD = {
  service: "JSM Integrated Services",
  brand: "Talent Acquisition & Career Mediation Desk",
  schedule_slot: CURRENT_SLOT,
  story_id: ACTIVE_STORY.id,
  topic: ACTIVE_STORY.topic,
  asset: {
    video_url: `${BASE_URL}/videos/jsm-talent-bridge-reel.mp4`,
    poster_url: `${BASE_URL}/videos/poster-bridge.jpg`,
    aspect_ratio: "9:16",
    duration_seconds: 59.2,
    title: ACTIVE_STORY.video_title
  },

  // 1. INSTAGRAM REELS COPY
  instagram: {
    caption: `${ACTIVE_STORY.instagram_hook}\n\n${ACTIVE_STORY.instagram_body}\n\n${ACTIVE_STORY.instagram_tags.slice(0, 5).join(' ')}`,
    share_to_feed: true,
    audio_name: "Original Audio - JSM Talent Bridge"
  },

  // 2. FACEBOOK REELS & PAGE POST COPY
  facebook: {
    title: ACTIVE_STORY.facebook_title,
    description: ACTIVE_STORY.facebook_description
  },

  // 3. YOUTUBE SHORTS COPY
  youtube: {
    title: `${ACTIVE_STORY.youtube_title}`,
    description: `${ACTIVE_STORY.facebook_description}\n\n${ACTIVE_STORY.instagram_tags.join(' ')}`,
    tags: ACTIVE_STORY.instagram_tags.map(t => t.replace('#', '')),
    category_id: "27",
    privacy_status: "public"
  },

  timestamp: new Date().toISOString()
};

function postToWebhook(urlStr, data) {
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
        'User-Agent': 'JSM-Social-Dispatch-Engine/2.0'
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

async function main() {
  console.log("======================================================================");
  console.log("  JSM INTEGRATED SERVICES — 2X DAILY TALENT MEDIATION DISPATCH (v2.1)");
  console.log("======================================================================");
  console.log(`Current IST Time:      ${IST_INFO.dateStr} (${IST_INFO.dayName}) at ${String(IST_INFO.hour).padStart(2, '0')}:${String(IST_INFO.minute).padStart(2, '0')} IST`);
  console.log(`Publishing Slot:       ${CURRENT_SLOT.toUpperCase()} DISPATCH`);
  console.log(`Active Story Topic:    ${ACTIVE_STORY.topic}`);
  console.log(`Job Seeker Trigger:    Comment '${ACTIVE_STORY.trigger_candidate}'`);
  console.log(`Company Trigger:       Comment '${ACTIVE_STORY.trigger_company}'`);
  console.log(`Target Video CDN:      ${SOCIAL_PAYLOAD.asset.video_url}`);
  console.log(`Instagram Hook:        "${ACTIVE_STORY.instagram_hook.slice(0, 100)}..."`);
  console.log(`Instagram Tags (5):    ${ACTIVE_STORY.instagram_tags.slice(0, 5).join(' ')}`);
  console.log("----------------------------------------------------------------------");

  // Read current ledger
  const ledger = readLedger();

  // Print schedule / status mode
  if (isStatusOnly) {
    console.log("\n📊 OPTIMAL WEEKLY POSTING SCHEDULE (INDIA MARKET RESEARCH):");
    for (const [day, slots] of Object.entries(OPTIMAL_SCHEDULE_IST)) {
      const isToday = day === IST_INFO.dayName ? "👉 " : "   ";
      console.log(`${isToday}${day.padEnd(10)}: Morning: ${slots.morning.time} (${slots.morning.theme}) | Evening: ${slots.evening.time} (${slots.evening.theme})`);
    }
    console.log("\n🔒 CURRENT DISPATCH LEDGER STATUS:");
    console.log(`   Date:                  ${ledger.current_lock.date}`);
    console.log(`   Status:                ${ledger.current_lock.status}`);
    console.log(`   Posts Count Today:     ${ledger.current_lock.posts_count} / ${ledger.policy.max_posts_per_day}`);
    console.log(`   Slots Executed Today:  ${(ledger.current_lock.slots_executed_today || []).map(s => s.slot).join(', ') || 'None'}`);
    if (ledger.current_lock.lock_reason) {
      console.log(`   Notice:                ${ledger.current_lock.lock_reason}`);
    }
    return;
  }

  // Check if date rolled over to a new day in IST
  if (ledger.current_lock.date !== IST_INFO.dateStr) {
    // Archive previous day in history
    if (ledger.current_lock.posts_count > 0) {
      ledger.history.push({
        date: ledger.current_lock.date,
        count: ledger.current_lock.posts_count,
        slots: ledger.current_lock.slots_executed_today
      });
    }
    // Initialize new day
    ledger.current_lock = {
      date: IST_INFO.dateStr,
      status: "READY",
      posts_count: 0,
      posts_allowed_remaining: ledger.policy.max_posts_per_day,
      slots_executed_today: []
    };
    writeLedger(ledger);
  }

  // STRICT SAFETY ENFORCEMENT: 2 POSTS PER DAY CEILING
  const maxAllowed = ledger.policy?.max_posts_per_day || 2;
  const isLockedToday = ledger.current_lock.status === 'LOCKED_MAX_REACHED' || ledger.current_lock.posts_count >= maxAllowed;

  if (isLockedToday && !forceBypass) {
    console.log("\n🛑 [ANTI-SPAM SAFETY LOCK ACTIVE] PUBLISHING HALTED FOR TODAY!");
    console.log("----------------------------------------------------------------------");
    console.log(`   • Reason:               Daily maximum cap of ${maxAllowed} reels already reached for today (${IST_INFO.dateStr}).`);
    console.log(`   • Posts Completed Today: ${ledger.current_lock.posts_count} / ${maxAllowed}`);
    console.log(`   • Safety Protocol:     Posting more than 2x per day triggers Meta algorithmic spam flags.`);
    console.log(`   • Schedule Directive:   No evening post or ad-hoc test posts permitted for the rest of today.`);
    console.log(`   • Next Eligible Slot:  Tomorrow morning (${OPTIMAL_SCHEDULE_IST[IST_INFO.dayName]?.morning?.time || '08:45 AM'} IST).`);
    console.log("----------------------------------------------------------------------");
    console.log("✓ Zero network calls made. Account reputation protected.\n");
    return;
  }

  // Check if this specific slot was already published today
  const slotAlreadyRan = (ledger.current_lock.slots_executed_today || []).some(s => s.slot === CURRENT_SLOT);
  if (slotAlreadyRan && !forceBypass) {
    console.log(`\n⚠️  [SLOT DUPLICATE PREVENTED] The '${CURRENT_SLOT.toUpperCase()}' slot has already been published today.`);
    console.log(`   To prevent duplicate content on Facebook & Instagram, this run is skipped.`);
    console.log(`   Next slot will trigger according to the optimal schedule.`);
    return;
  }

  if (!WEBHOOK_URL || isDryRun) {
    console.log("ℹ️  MODE: Dry-Run / Preview Mode.");
    console.log("\n[Payload Preview]:");
    console.log(JSON.stringify(SOCIAL_PAYLOAD, null, 2));
    return;
  }

  console.log(`🚀 Transmitting to Make.com Webhook (${WEBHOOK_URL})...`);
  try {
    const result = await postToWebhook(WEBHOOK_URL, SOCIAL_PAYLOAD);
    console.log(`✓ Webhook Accepted! Status: ${result.status} (${result.body || "OK"})`);
    console.log("✓ Successfully triggered Instagram & Facebook live publishing.");

    // Update Ledger State Atomically
    ledger.current_lock.posts_count = (ledger.current_lock.posts_count || 0) + 1;
    ledger.current_lock.slots_executed_today = ledger.current_lock.slots_executed_today || [];
    ledger.current_lock.slots_executed_today.push({
      slot: CURRENT_SLOT,
      timestamp: new Date().toISOString(),
      story_id: ACTIVE_STORY.id,
      platforms: ["Facebook", "Instagram"]
    });

    if (ledger.current_lock.posts_count >= maxAllowed) {
      ledger.current_lock.status = "LOCKED_MAX_REACHED";
      ledger.current_lock.posts_allowed_remaining = 0;
      ledger.current_lock.lock_reason = `Daily quota of ${maxAllowed} reels completed for ${IST_INFO.dateStr}. Further dispatches locked until tomorrow.`;
    } else {
      ledger.current_lock.posts_allowed_remaining = maxAllowed - ledger.current_lock.posts_count;
    }

    writeLedger(ledger);
    console.log(`✓ Dispatch Ledger updated: ${ledger.current_lock.posts_count} / ${maxAllowed} completed for today.`);
  } catch (err) {
    console.error(`✗ Failed to dispatch to webhook: ${err.message}`);
    process.exit(1);
  }
}

main();
