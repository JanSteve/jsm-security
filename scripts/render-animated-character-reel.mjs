#!/usr/bin/env node

/**
 * JSM Integrated Services — Motion Animated Character Reel Renderer
 *
 * Generates bespoke 1080x1920 vertical animated character reels from
 * `data/annual-reels-catalog.json` using:
 *   - Procedural 2D flat-vector canvas animation (Rahul, Vikram, JSMMediator)
 *   - Multi-frame motion loops (breathing, arm gestures, sweat drops, pulsing tablet)
 *   - Kokoro neural TTS voiceover synthesized per scene & mixed with warm ambient pad
 *   - Strictly NEVER calls publishing webhooks (generation is decoupled from dispatch)
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { getReelById, getReelByDay, CATALOG_PATH } from './daily-social-dispatch.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const KOKORO_BIN = fs.existsSync('/Library/Frameworks/Python.framework/Versions/3.11/bin/kokoro')
  ? '/Library/Frameworks/Python.framework/Versions/3.11/bin/kokoro'
  : 'kokoro';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const FRAMES_PER_LOOP = 12;
const ANIM_FPS = 8; // 1.5s seamless loop per cycle

/**
 * Safely escape text for embedding inside HTML template literals
 */
function esc(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Derive an 8-scene visual & spoken script tailored to the catalog reel slot.
 */
export function buildSceneDeckForReel(reel) {
  const isEvening = (reel?.slot || '').toLowerCase() === 'evening';
  const theme = reel?.weekly_theme || 'The Broken Hiring System & Zero-Retainer Mediation';
  const storyArc = reel?.story_arc || {
    problem: 'Candidates are ghosted by automated ATS filters while companies drown in unqualified resumes.',
    interval: 'JSM Integrated Services steps in as the trusted human bridge with verified alignment.',
    solution: 'Stamping real offer letters with zero candidate fees and a 90-day employer replacement shield.',
    call_to_action: "Comment 'JOB' or 'HIRE' to unlock the 2026 Playbook PDF in your DMs."
  };

  if (isEvening) {
    return [
      {
        id: 1,
        badge: 'EMPLOYER REALITY CHECK',
        badgeColor: '#F43F5E',
        headline: 'LOSING ₹35,000 EVERY SINGLE DAY A SEAT STAYS OPEN?',
        subheadline: theme,
        cardTitle: 'THE HIDDEN VACANCY TAX',
        cardBody: 'Every week your key role stays empty stalls output, burns lead time, and forces costly rushed hires.',
        subtitle: 'Why founders regret fast unvetted hires while reliable desks stay empty?',
        speech: `Are you losing thirty five thousand rupees every day a critical seat stays empty, only to regret a rushed unvetted hire?`,
        cast: [{ type: 'vikram', x: 540, y: 800, scale: 1.5, emotion: 'stressed' }]
      },
      {
        id: 2,
        badge: 'THE SPAM INBOX TRAP',
        badgeColor: '#F59E0B',
        headline: '1,200 RESUMES. ZERO DEPENDABLE FINALISTS.',
        subheadline: 'Founders & plant heads waste weeks filtering noisy portals.',
        stats: [
          { val: '92%', label: 'Irrelevant Applicants', color: '#F59E0B' },
          { val: '40 Hrs', label: 'Wasted Screening', color: '#EF4444' }
        ],
        cardBody: storyArc.problem,
        subtitle: 'Twelve hundred spam resumes arrive overnight, hiding the two honest performers you actually need.',
        speech: `Twelve hundred spam resumes flood your inbox overnight, burying the honest performers while operations stall.`,
        cast: [{ type: 'vikram', x: 540, y: 800, scale: 1.5, emotion: 'stressed' }]
      },
      {
        id: 3,
        badge: 'UPFRONT RETAINER SCAM',
        badgeColor: '#EF4444',
        headline: 'WHY PAY AGENCIES BEFORE PROOF OF PERFORMANCE?',
        subheadline: 'Traditional recruiters take ₹1–3 Lakhs upfront and vanish.',
        cardTitle: 'THE OLD AGENCY BROKEN PROMISE',
        cardBody: 'Generic keyword-matched CVs forwarded from public boards with zero culture or commitment vetting.',
        subtitle: 'Traditional headhunters demand heavy advance fees with zero accountability if hires fail.',
        speech: `Worse, traditional agencies charge heavy upfront retainers just to forward unvetted resumes with zero accountability.`,
        cast: [
          { type: 'vikram', x: 300, y: 800, scale: 1.35, emotion: 'stressed' },
          { type: 'rahul', x: 780, y: 800, scale: 1.35, emotion: 'frustrated' }
        ]
      },
      {
        id: 4,
        badge: 'THE DAY-1 GHOSTING CRISIS',
        badgeColor: '#DC2626',
        headline: 'OFFER SIGNED. MONDAY MORNING: NO SHOW.',
        subheadline: '60 days of notice period waited, laptop ready, phone switched off.',
        cardTitle: 'WHY DAY-1 DROPOUTS HAPPEN',
        cardBody: 'Without transparent human mediation, candidates shop counter-offers silently until Monday morning.',
        subtitle: 'And when you finally extend an offer, the candidate ghosts you on day one.',
        speech: `You wait sixty days of notice period, prepare their onboarding, and on Monday morning, their phone is switched off.`,
        cast: [{ type: 'vikram', x: 540, y: 800, scale: 1.5, emotion: 'stressed' }]
      },
      {
        id: 5,
        badge: 'THE INTERVAL · JSM ENTERS',
        badgeColor: '#E5A93C',
        headline: 'ENTER JSM INTEGRATED SERVICES',
        subheadline: 'Pure Contingency Mediation — ₹0 Advance Fees',
        cardTitle: '7-DAY VERIFIED SPRINT',
        cardBody: storyArc.interval,
        subtitle: 'Enter JSM Integrated Services: the human talent bridge protecting employers with zero advance risk.',
        speech: `That stops at the interval. JSM Integrated Services steps in as your dedicated contingency bridge with zero advance fees.`,
        cast: [{ type: 'mediator', x: 540, y: 780, scale: 1.55, emotion: 'poised' }]
      },
      {
        id: 6,
        badge: 'FOUNDER PROTECTION SLA',
        badgeColor: '#38BDF8',
        headline: '3 CALIBRATED FINALISTS IN 7 BUSINESS DAYS',
        subheadline: 'Joining intent verified. Counter-offer risk neutralized.',
        checklist: [
          { text: '✓ ₹0 Upfront Retainers — Pay Strictly Post-Joining', color: '#38BDF8' },
          { text: '✓ 3 Pre-Vetted Finalists Delivered in 7 Days', color: '#10B981' },
          { text: '✓ 90-Day Free Placement Replacement Shield', color: '#E5A93C' }
        ],
        subtitle: 'Three calibrated blind profiles in seven days, backed by our ninety day free replacement shield.',
        speech: `We deliver three pre-vetted finalists in seven business days, backed by a ninety day free replacement guarantee.`,
        cast: [
          { type: 'mediator', x: 320, y: 780, scale: 1.4, emotion: 'poised' },
          { type: 'vikram', x: 760, y: 780, scale: 1.4, emotion: 'triumphant' }
        ]
      },
      {
        id: 7,
        badge: 'CANDIDATE ALIGNMENT WIN',
        badgeColor: '#10B981',
        headline: 'WORKERS STAY WHEN HIRED HONESTLY',
        subheadline: '100% Free for Candidates · Clear Pay & Culture Fit',
        checklist: [
          { text: '✓ Pre-Aligned Salary & Shift Expectations', color: '#10B981' },
          { text: '✓ Verified Work Ethic & Reference Integrity', color: '#F1F5F9' },
          { text: '✓ Long-Term Operational Retention', color: '#38BDF8' }
        ],
        subtitle: 'Both founder and talent win together through transparent expectation alignment.',
        speech: `Because candidates never pay us a single rupee, expectations stay honest and new hires actually show up and stay.`,
        cast: [
          { type: 'rahul', x: 320, y: 780, scale: 1.4, emotion: 'celebrating' },
          { type: 'mediator', x: 760, y: 780, scale: 1.4, emotion: 'poised' }
        ]
      },
      {
        id: 8,
        badge: 'UNLOCK FREE PLAYBOOK PDF',
        badgeColor: '#E5A93C',
        headline: 'COMMENT "HIRE" FOR OUR FOUNDER PDF',
        subheadline: 'Follow @jsmintegratedservices & get our Zero-Retainer Guide in DM!',
        ctaLeft: { label: 'COMPANIES', cmd: 'Comment "HIRE"', sub: 'Free Zero-Retainer PDF', color: '#38BDF8' },
        ctaRight: { label: 'JOB SEEKERS', cmd: 'Comment "JOB"', sub: 'Free ATS-Bypass PDF', color: '#10B981' },
        subtitle: 'Follow and comment HIRE right now to receive our Founder Zero-Retainer Hiring Playbook in your DMs.',
        speech: `Follow us and comment HIRE right now to unlock our Zero-Retainer Hiring Playbook PDF straight in your direct messages.`,
        cast: [
          { type: 'rahul', x: 230, y: 800, scale: 1.25, emotion: 'celebrating' },
          { type: 'mediator', x: 540, y: 770, scale: 1.4, emotion: 'poised' },
          { type: 'vikram', x: 850, y: 800, scale: 1.25, emotion: 'triumphant' }
        ]
      }
    ];
  }

  // Morning Slot: Candidate-Focused Character Story Arc
  return [
    {
      id: 1,
      badge: 'THE MORNING REALITY CHECK',
      badgeColor: '#F43F5E',
      headline: 'APPLIED TO 50+ JOBS & STILL HEARD NOTHING?',
      subheadline: theme,
      cardTitle: 'THE SILENT PARADOX',
      cardBody: 'Skilled professionals wait weeks in silence while growing companies claim they cannot find reliable people.',
      subtitle: 'Still waiting for an interview call after fifty applications? Here is why.',
      speech: `Still waiting in silence after sending out fifty resumes, while companies complain they cannot find good talent?`,
      cast: [
        { type: 'rahul', x: 280, y: 800, scale: 1.35, emotion: 'frustrated' },
        { type: 'vikram', x: 800, y: 800, scale: 1.35, emotion: 'stressed' }
      ]
    },
    {
      id: 2,
      badge: 'CANDIDATE AGONY',
      badgeColor: '#EF4444',
      headline: 'DELETED BY AUTOMATED RESUME BOTS',
      subheadline: 'Robots scan keywords for 3 seconds and ghost real human talent.',
      stats: [
        { val: '75%+', label: 'Auto-Rejected by Bots', color: '#EF4444' },
        { val: '3 Sec', label: 'Average Portal Scan', color: '#F59E0B' }
      ],
      cardBody: storyArc.problem,
      subtitle: 'Automated resume filters discard qualified workers before a single hiring manager sees their name.',
      speech: `Automated resume robots discard over seventy five percent of real professionals in three seconds before any human reads them.`,
      cast: [{ type: 'rahul', x: 540, y: 800, scale: 1.5, emotion: 'frustrated' }]
    },
    {
      id: 3,
      badge: 'THE EMPLOYER FLIP SIDE',
      badgeColor: '#F59E0B',
      headline: 'WHY FOUNDERS REGRET RUSHED BAD HIRES',
      subheadline: 'Overwhelmed by 1,200 spam applications, good jobs stay hidden.',
      stats: [
        { val: '1,200', label: 'Spam Applications', color: '#F59E0B' },
        { val: '₹35K', label: 'Daily Vacancy Loss', color: '#EF4444' }
      ],
      cardBody: 'Decision-makers freeze public portals and hire privately through trusted human networks instead.',
      subtitle: 'Founders get buried in fake resumes, so they avoid job boards and ask human mediators instead.',
      speech: `Because founders are overwhelmed by spam applications, they stop checking job portals and rely strictly on human talent desks.`,
      cast: [{ type: 'vikram', x: 540, y: 800, scale: 1.5, emotion: 'stressed' }]
    },
    {
      id: 4,
      badge: 'ZERO TRANSPARENCY CRISIS',
      badgeColor: '#DC2626',
      headline: 'NO REPLY. FAKE RANGES. WASTED TIME.',
      subheadline: 'Five interview rounds followed by two weeks of total silence.',
      cardTitle: 'BOTH SIDES EXHAUSTED',
      cardBody: 'Job seekers lose confidence while companies lose top talent to ghosting and toxic agency middlemen.',
      subtitle: 'You deserve direct human advocacy, real salary transparency, and honest feedback.',
      speech: `No human feedback, hidden salary bands, and weeks of anxiety leave hardworking talent stuck.`,
      cast: [{ type: 'rahul', x: 540, y: 800, scale: 1.5, emotion: 'frustrated' }]
    },
    {
      id: 5,
      badge: 'THE INTERVAL · JSM ENTERS',
      badgeColor: '#E5A93C',
      headline: 'WE BYPASS ROBOTS. WE BUILD BRIDGES.',
      subheadline: 'JSM Integrated Services — Human Career & Talent Mediation',
      cardTitle: 'THE HIDDEN JOB BRIDGE',
      cardBody: storyArc.interval,
      subtitle: 'At the interval, JSM Integrated Services steps in to pitch your real track record directly to founders.',
      speech: `Enter JSM Integrated Services at the interval. We bypass robot portals and pitch your skills directly to founders and HR heads.`,
      cast: [{ type: 'mediator', x: 540, y: 780, scale: 1.55, emotion: 'poised' }]
    },
    {
      id: 6,
      badge: '100% FREE FOR CANDIDATES',
      badgeColor: '#10B981',
      headline: 'DIRECT CEO INTROS. ZERO CANDIDATE FEE.',
      subheadline: 'We never charge job seekers a single rupee — ever.',
      checklist: [
        { text: '✓ ₹0 Fee Charged to Job Seekers Forever', color: '#10B981' },
        { text: '✓ Direct Pitch to Verified Decision Makers', color: '#F1F5F9' },
        { text: '✓ Clear Pay Bands & Real Offer Letters', color: '#38BDF8' }
      ],
      subtitle: 'Verified interviews, clear salary terms, and stamped offer letters without paying a rupee.',
      speech: `For job seekers it is one hundred percent free forever, unlocking direct interviews and stamped offer letters.`,
      cast: [
        { type: 'rahul', x: 320, y: 780, scale: 1.4, emotion: 'celebrating' },
        { type: 'mediator', x: 760, y: 780, scale: 1.4, emotion: 'poised' }
      ]
    },
    {
      id: 7,
      badge: 'FOR COMPANIES TOO',
      badgeColor: '#38BDF8',
      headline: 'CONTINGENCY SEARCH WITH ₹0 ADVANCE',
      subheadline: '3 Pre-Vetted Finalists in 7 Days · 90-Day Shield',
      checklist: [
        { text: '✓ ₹0 Upfront Retainers for Employers', color: '#38BDF8' },
        { text: '✓ Thorough Commitment & Skill Vetting', color: '#10B981' },
        { text: '✓ 90-Day Replacement Guarantee', color: '#E5A93C' }
      ],
      subtitle: 'Companies hire with zero advance risk, while serious professionals gain real career velocity.',
      speech: `And companies get three calibrated finalists in seven days on pure contingency with a ninety day shield.`,
      cast: [
        { type: 'mediator', x: 320, y: 780, scale: 1.4, emotion: 'poised' },
        { type: 'vikram', x: 760, y: 780, scale: 1.4, emotion: 'triumphant' }
      ]
    },
    {
      id: 8,
      badge: 'UNLOCK YOUR FREE PDF GUIDE',
      badgeColor: '#E5A93C',
      headline: 'COMMENT "JOB" TO GET OUR PLAYBOOK PDF',
      subheadline: 'Follow @jsmintegratedservices & get the ATS-Bypass Guide in your DM!',
      ctaLeft: { label: 'JOB SEEKERS', cmd: 'Comment "JOB"', sub: 'Free ATS-Bypass PDF', color: '#10B981' },
      ctaRight: { label: 'COMPANIES', cmd: 'Comment "HIRE"', sub: 'Free Hiring Guide PDF', color: '#38BDF8' },
      subtitle: 'Follow us and comment JOB to receive the 2026 ATS-Bypass Playbook PDF straight in your DMs.',
      speech: `Follow us and comment JOB below to unlock our 2026 ATS Bypass Playbook PDF directly in your DMs.`,
      cast: [
        { type: 'rahul', x: 230, y: 800, scale: 1.25, emotion: 'celebrating' },
        { type: 'mediator', x: 540, y: 770, scale: 1.4, emotion: 'poised' },
        { type: 'vikram', x: 850, y: 800, scale: 1.25, emotion: 'triumphant' }
      ]
    }
  ];
}

/**
 * Render clean HTML stage template containing animated flat-vector characters
 */
function buildStageHtml(deck, reelLabel = 'STORY REEL') {
  const deckJson = JSON.stringify(deck);

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1080px;
      height: 1920px;
      background: #090D16;
      color: #FFFFFF;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 90px 70px 100px;
    }
    .grid-lines {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
      background-size: 60px 60px;
      pointer-events: none;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      z-index: 10;
      border-bottom: 2px solid rgba(255,255,255,0.08);
      padding-bottom: 30px;
    }
    .logo-container { display: flex; align-items: center; gap: 18px; }
    .logo-badge {
      width: 64px; height: 64px; background: #151C2C;
      border: 2px solid #E5A93C; border-radius: 16px;
      display: flex; align-items: center; justify-content: center;
      font-weight: 900; font-size: 24px; color: #E5A93C;
    }
    .brand-title { font-size: 28px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #FFFFFF; }
    .brand-sub { font-size: 16px; font-weight: 600; color: #94A3B8; }
    .scene-pill {
      background: #151C2C; border: 1px solid rgba(255,255,255,0.15);
      border-radius: 30px; padding: 10px 24px; font-size: 16px; font-weight: 700; color: #94A3B8;
    }
    #stage {
      position: absolute; top: 0; left: 0; width: 1080px; height: 1920px;
      pointer-events: none; z-index: 5;
    }
    .content { position: relative; z-index: 10; margin-top: 20px; }
    .badge-tag {
      display: inline-block; padding: 12px 28px; border-radius: 40px;
      font-size: 20px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 24px;
    }
    .headline {
      font-size: 54px; font-weight: 900; line-height: 1.15; text-transform: uppercase;
      color: #FFFFFF; margin-bottom: 18px; max-width: 940px;
    }
    .subheadline { font-size: 26px; font-weight: 500; color: #94A3B8; line-height: 1.35; max-width: 880px; }
    .floating-card {
      background: rgba(21, 28, 44, 0.9);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 28px; padding: 36px; margin-top: 660px;
      box-shadow: 0 24px 60px rgba(0,0,0,0.45);
    }
    .footer { position: relative; z-index: 10; margin-top: auto; }
    .subtitle-bar {
      background: rgba(15, 23, 42, 0.92);
      border-radius: 20px; padding: 26px 32px;
      font-size: 27px; font-weight: 700; line-height: 1.4; color: #F8FAFC;
      box-shadow: 0 16px 40px rgba(0,0,0,0.5);
    }
    .contact-info {
      display: flex; justify-content: space-between; align-items: center;
      margin-top: 24px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.08);
      font-size: 18px; font-weight: 700; color: #94A3B8;
    }
  </style>
</head>
<body>
  <div class="grid-lines"></div>
  <canvas id="stage" width="1080" height="1920"></canvas>

  <div class="header">
    <div class="logo-container">
      <div class="logo-badge">JSM</div>
      <div>
        <div class="brand-title">JSM INTEGRATED SERVICES</div>
        <div class="brand-sub">HUMAN TALENT MEDIATION DESK · ${esc(reelLabel)}</div>
      </div>
    </div>
    <div class="scene-pill" id="scene-pill">01 / 08</div>
  </div>

  <div class="content" id="ui-content"></div>
  <div class="footer" id="ui-footer"></div>

  <script>
    const SCENE_DECK = ${deckJson};
    const canvas = document.getElementById("stage");
    const ctx = canvas.getContext("2d");
    const uiContent = document.getElementById("ui-content");
    const uiFooter = document.getElementById("ui-footer");
    const scenePill = document.getElementById("scene-pill");

    // =========================================================================
    // ANIMATED FLAT-VECTOR CHARACTER RENDERERS (WITH MOTION PHASE t)
    // =========================================================================

    function drawRahul(c, x, y, scale = 1.0, emotion = "frustrated", t = 0) {
      const bob = Math.sin(t) * 8;
      const armWave = Math.sin(t * 2) * 10;
      const sweatDrop = ((t / (Math.PI * 2)) * 22) % 22;

      c.save();
      c.translate(x, y + bob);
      c.scale(scale, scale);

      // Subtle Shadow Glow behind character
      c.fillStyle = emotion === "celebrating" ? "rgba(16, 185, 129, 0.14)" : "rgba(244, 63, 94, 0.12)";
      c.beginPath(); c.arc(0, 40, 125, 0, Math.PI * 2); c.fill();

      // Hoodie Torso
      c.fillStyle = "#0F766E";
      c.strokeStyle = "#0E1116";
      c.lineWidth = 4;
      c.beginPath();
      c.roundRect(-50, 50, 100, 120, 20);
      c.fill(); c.stroke();

      // Pocket
      c.fillStyle = "#115E59";
      c.beginPath();
      c.roundRect(-30, 110, 60, 45, 10);
      c.fill(); c.stroke();

      // Cords
      c.strokeStyle = "#FFFFFF";
      c.lineWidth = 3;
      c.beginPath();
      c.moveTo(-10, 55); c.lineTo(-10 + Math.sin(t) * 2, 85);
      c.moveTo(10, 55); c.lineTo(10 - Math.sin(t) * 2, 85);
      c.stroke();

      // Arms
      c.strokeStyle = "#0E1116";
      c.fillStyle = "#0F766E";
      c.lineWidth = 4;

      if (emotion === "frustrated") {
        const shake = Math.sin(t * 3) * 4;
        c.beginPath();
        c.moveTo(-45, 65); c.lineTo(-75, 20 + shake); c.lineTo(-38, -5 + shake); c.stroke();
        c.beginPath();
        c.moveTo(45, 65); c.lineTo(75, 20 - shake); c.lineTo(38, -5 - shake); c.stroke();
        c.fillStyle = "#FAD9B5";
        c.beginPath(); c.arc(-38, -5 + shake, 14, 0, Math.PI * 2); c.fill(); c.stroke();
        c.beginPath(); c.arc(38, -5 - shake, 14, 0, Math.PI * 2); c.fill(); c.stroke();
      } else if (emotion === "celebrating") {
        c.beginPath();
        c.moveTo(-45, 65); c.lineTo(-85, armWave); c.lineTo(-75, -50 + armWave); c.stroke();
        c.beginPath();
        c.moveTo(45, 65); c.lineTo(85, -armWave); c.lineTo(75, -50 - armWave); c.stroke();
        c.fillStyle = "#FAD9B5";
        c.beginPath(); c.arc(-75, -50 + armWave, 14, 0, Math.PI * 2); c.fill(); c.stroke();
        c.beginPath(); c.arc(75, -50 - armWave, 14, 0, Math.PI * 2); c.fill(); c.stroke();

        // Offer Letter
        c.save();
        c.translate(85, -60 - armWave);
        c.rotate(0.18 + Math.sin(t * 2) * 0.08);
        c.fillStyle = "#FFFFFF";
        c.strokeStyle = "#E5A93C";
        c.lineWidth = 3;
        c.fillRect(-22, -32, 44, 60);
        c.strokeRect(-22, -32, 44, 60);
        c.fillStyle = "#10B981";
        c.font = "bold 10px sans-serif";
        c.textAlign = "center";
        c.fillText("OFFER", 0, -12);
        c.fillText("LETTER", 0, 2);
        c.fillStyle = "#E5A93C";
        c.beginPath(); c.arc(0, 16, 7, 0, Math.PI * 2); c.fill();
        c.restore();
      } else {
        c.beginPath();
        c.moveTo(-45, 65); c.lineTo(-70, 110); c.lineTo(-30, 120); c.stroke();
        c.beginPath();
        c.moveTo(45, 65); c.lineTo(70, 110); c.lineTo(30, 120); c.stroke();
      }

      // Neck & Head
      c.fillStyle = "#FAD9B5";
      c.strokeStyle = "#0E1116";
      c.lineWidth = 4;
      c.beginPath(); c.rect(-15, 30, 30, 25); c.fill(); c.stroke();
      c.beginPath(); c.roundRect(-40, -40, 80, 75, 22); c.fill(); c.stroke();

      // Hair
      c.fillStyle = "#1E293B";
      c.beginPath();
      c.moveTo(-42, -20);
      c.quadraticCurveTo(-45, -55, 0, -58);
      c.quadraticCurveTo(45, -55, 42, -20);
      c.quadraticCurveTo(20, -40, 0, -38);
      c.quadraticCurveTo(-20, -40, -42, -20);
      c.fill(); c.stroke();

      // Glasses
      c.strokeStyle = "#0E1116";
      c.lineWidth = 3;
      c.strokeRect(-32, -15, 26, 20);
      c.strokeRect(6, -15, 26, 20);
      c.beginPath(); c.moveTo(-6, -5); c.lineTo(6, -5); c.stroke();

      if (emotion === "frustrated") {
        c.beginPath();
        c.moveTo(-25, -5); c.lineTo(-13, -5);
        c.moveTo(13, -5); c.lineTo(25, -5);
        c.stroke();
        c.beginPath(); c.arc(0, 22, 12, Math.PI * 1.2, Math.PI * 1.8); c.stroke();
        // Animated sweat drop
        c.fillStyle = "#38BDF8";
        c.beginPath();
        c.moveTo(35, -24 + sweatDrop); c.quadraticCurveTo(41, -14 + sweatDrop, 35, -9 + sweatDrop); c.quadraticCurveTo(29, -14 + sweatDrop, 35, -24 + sweatDrop);
        c.fill();
      } else if (emotion === "celebrating") {
        c.beginPath(); c.arc(-19, -5, 7, Math.PI * 1.1, Math.PI * 1.9); c.stroke();
        c.beginPath(); c.arc(19, -5, 7, Math.PI * 1.1, Math.PI * 1.9); c.stroke();
        c.fillStyle = "#DC2626";
        c.beginPath(); c.arc(0, 10, 16, 0, Math.PI); c.fill(); c.stroke();
        c.fillStyle = "#FFFFFF"; c.fillRect(-10, 10, 20, 6);
      }
      c.restore();
    }

    function drawVikram(c, x, y, scale = 1.0, emotion = "stressed", t = 0) {
      const bob = Math.sin(t + 1.2) * 7;
      const thumbBob = Math.sin(t * 2) * 8;

      c.save();
      c.translate(x, y + bob);
      c.scale(scale, scale);

      c.fillStyle = emotion === "triumphant" ? "rgba(56, 189, 248, 0.14)" : "rgba(245, 158, 11, 0.12)";
      c.beginPath(); c.arc(0, 40, 130, 0, Math.PI * 2); c.fill();

      // Blazer Torso
      c.fillStyle = "#1E293B";
      c.strokeStyle = "#0E1116";
      c.lineWidth = 4;
      c.beginPath(); c.roundRect(-55, 50, 110, 130, 16); c.fill(); c.stroke();

      // Shirt & Red Tie
      c.fillStyle = "#FFFFFF";
      c.beginPath(); c.moveTo(-20, 50); c.lineTo(0, 75); c.lineTo(20, 50); c.fill(); c.stroke();

      c.fillStyle = "#DC2626";
      c.beginPath();
      c.moveTo(-7, 70); c.lineTo(7, 70); c.lineTo(10, 130); c.lineTo(0, 145); c.lineTo(-10, 130);
      c.fill(); c.stroke();

      c.strokeStyle = "#0E1116";
      c.fillStyle = "#1E293B";
      c.lineWidth = 4;

      if (emotion === "stressed") {
        const rub = Math.sin(t * 3) * 4;
        c.beginPath(); c.moveTo(-48, 65); c.lineTo(-80, 20 + rub); c.lineTo(-42, -5 + rub); c.stroke();
        c.beginPath(); c.moveTo(48, 65); c.lineTo(80, 20 - rub); c.lineTo(42, -5 - rub); c.stroke();
        c.fillStyle = "#E7C19B";
        c.beginPath(); c.arc(-42, -5 + rub, 14, 0, Math.PI * 2); c.fill(); c.stroke();
        c.beginPath(); c.arc(42, -5 - rub, 14, 0, Math.PI * 2); c.fill(); c.stroke();
      } else if (emotion === "triumphant") {
        c.beginPath(); c.moveTo(-48, 65); c.lineTo(-85, 45 + thumbBob); c.lineTo(-80, 10 + thumbBob); c.stroke();
        c.beginPath(); c.moveTo(48, 65); c.lineTo(85, 45 - thumbBob); c.lineTo(80, 10 - thumbBob); c.stroke();
        c.fillStyle = "#E7C19B";
        c.beginPath(); c.arc(-80, 10 + thumbBob, 14, 0, Math.PI * 2); c.fill(); c.stroke();
        c.beginPath(); c.arc(80, 10 - thumbBob, 14, 0, Math.PI * 2); c.fill(); c.stroke();
        c.beginPath(); c.moveTo(-80, 5 + thumbBob); c.lineTo(-80, -10 + thumbBob); c.stroke();
        c.beginPath(); c.moveTo(80, 5 - thumbBob); c.lineTo(80, -10 - thumbBob); c.stroke();
      }

      // Head
      c.fillStyle = "#E7C19B";
      c.strokeStyle = "#0E1116";
      c.lineWidth = 4;
      c.beginPath(); c.rect(-16, 30, 32, 25); c.fill(); c.stroke();
      c.beginPath(); c.roundRect(-44, -40, 88, 75, 20); c.fill(); c.stroke();

      // Hair
      c.fillStyle = "#334155";
      c.beginPath();
      c.moveTo(-46, -15);
      c.quadraticCurveTo(-46, -55, 0, -55);
      c.quadraticCurveTo(46, -55, 46, -15);
      c.quadraticCurveTo(20, -35, 0, -35);
      c.quadraticCurveTo(-20, -35, -46, -15);
      c.fill(); c.stroke();

      if (emotion === "stressed") {
        c.strokeStyle = "#0E1116";
        c.lineWidth = 3.5;
        c.beginPath(); c.moveTo(-30, -22); c.lineTo(-12, -15); c.stroke();
        c.beginPath(); c.moveTo(30, -22); c.lineTo(12, -15); c.stroke();
        c.fillStyle = "#0E1116";
        c.beginPath(); c.arc(-20, -5, 4, 0, Math.PI * 2); c.fill();
        c.beginPath(); c.arc(20, -5, 4, 0, Math.PI * 2); c.fill();
        c.beginPath(); c.moveTo(-15, 18); c.lineTo(15, 18); c.stroke();
      } else if (emotion === "triumphant") {
        c.strokeStyle = "#0E1116";
        c.lineWidth = 3;
        c.beginPath(); c.arc(-20, -5, 7, Math.PI * 1.1, Math.PI * 1.9); c.stroke();
        c.beginPath(); c.arc(20, -5, 7, Math.PI * 1.1, Math.PI * 1.9); c.stroke();
        c.fillStyle = "#0E1116";
        c.beginPath(); c.arc(0, 10, 16, 0, Math.PI); c.fill(); c.stroke();
        c.fillStyle = "#FFFFFF"; c.fillRect(-10, 10, 20, 5);
      }
      c.restore();
    }

    function drawJSMMediator(c, x, y, scale = 1.0, t = 0) {
      const bob = Math.sin(t + 0.5) * 6;
      const glowAlpha = 0.14 + 0.08 * Math.sin(t * 2);

      c.save();
      c.translate(x, y + bob);
      c.scale(scale, scale);

      // Pulsing golden JSM aura
      c.fillStyle = \`rgba(229, 169, 60, \${glowAlpha})\`;
      c.beginPath(); c.arc(0, 45, 145, 0, Math.PI * 2); c.fill();

      // Charcoal Blazer
      c.fillStyle = "#0F172A";
      c.strokeStyle = "#0E1116";
      c.lineWidth = 4;
      c.beginPath(); c.roundRect(-60, 50, 120, 135, 18); c.fill(); c.stroke();

      // Gold Lapel
      c.strokeStyle = "#E5A93C";
      c.lineWidth = 3;
      c.beginPath();
      c.moveTo(-25, 50); c.lineTo(-10, 110);
      c.moveTo(25, 50); c.lineTo(10, 110);
      c.stroke();

      // Pin
      c.fillStyle = "#E5A93C";
      c.beginPath(); c.arc(-35, 75, 12, 0, Math.PI * 2); c.fill();
      c.fillStyle = "#0F172A";
      c.font = "bold 9px sans-serif";
      c.textAlign = "center";
      c.fillText("JSM", -35, 78);

      // Arms with Tablet
      c.strokeStyle = "#0E1116";
      c.lineWidth = 4;
      c.beginPath(); c.moveTo(-50, 65); c.lineTo(-75, 115); c.lineTo(-25, 125); c.stroke();
      c.beginPath(); c.moveTo(50, 65); c.lineTo(75, 115); c.lineTo(25, 125); c.stroke();

      // Tablet
      c.fillStyle = "#1E293B";
      c.strokeStyle = "#38BDF8";
      c.lineWidth = 3;
      c.fillRect(-45, 110, 90, 65);
      c.strokeRect(-45, 110, 90, 65);

      c.fillStyle = "#10B981";
      c.font = "bold 11px sans-serif";
      c.textAlign = "center";
      c.fillText("MATCH 100%", 0, 135);
      c.fillStyle = "#38BDF8";
      c.font = "9px sans-serif";
      c.fillText("₹0 ADVANCE", 0, 152);

      // Hands
      c.fillStyle = "#F5D0A9";
      c.beginPath(); c.arc(-35, 140, 12, 0, Math.PI * 2); c.fill(); c.stroke();
      c.beginPath(); c.arc(35, 140, 12, 0, Math.PI * 2); c.fill(); c.stroke();

      // Head
      c.fillStyle = "#F5D0A9";
      c.strokeStyle = "#0E1116";
      c.lineWidth = 4;
      c.beginPath(); c.rect(-16, 30, 32, 25); c.fill(); c.stroke();
      c.beginPath(); c.roundRect(-42, -40, 84, 75, 22); c.fill(); c.stroke();

      // Hair
      c.fillStyle = "#1E293B";
      c.beginPath();
      c.moveTo(-44, -18);
      c.quadraticCurveTo(-44, -58, 0, -58);
      c.quadraticCurveTo(44, -58, 44, -18);
      c.quadraticCurveTo(20, -38, 0, -38);
      c.quadraticCurveTo(-20, -38, -44, -18);
      c.fill(); c.stroke();

      // Face
      c.fillStyle = "#0E1116";
      c.beginPath(); c.arc(-18, -4, 4, 0, Math.PI * 2); c.fill();
      c.beginPath(); c.arc(18, -4, 4, 0, Math.PI * 2); c.fill();

      c.strokeStyle = "#0E1116";
      c.lineWidth = 3.5;
      c.beginPath(); c.arc(0, 10, 14, 0.1 * Math.PI, 0.9 * Math.PI); c.stroke();

      c.restore();
    }

    function escapeHtml(txt) {
      return String(txt || "")
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }

    // Exposed frame render function controlled cleanly by Playwright
    window.renderFrame = function(sceneIdx, tPhase) {
      const sc = SCENE_DECK[sceneIdx];
      if (!sc) return;

      scenePill.textContent = \`0\${sc.id} / 08\`;

      // Update UI Card only on first frame of scene (or whenever scene changes)
      if (window.__lastSceneIdx !== sceneIdx) {
        window.__lastSceneIdx = sceneIdx;

        let midCardHtml = "";
        if (sc.stats) {
          midCardHtml = \`
            <div class="floating-card">
              <div style="display: flex; justify-content: space-between; margin-bottom: 18px;">
                \${sc.stats.map(st => \`
                  <div>
                    <div style="font-size: 46px; font-weight: 900; color: \${st.color};">\${escapeHtml(st.val)}</div>
                    <div style="font-size: 18px; color: #94A3B8;">\${escapeHtml(st.label)}</div>
                  </div>
                \`).join("")}
              </div>
              <div style="font-size: 24px; color: #CBD5E1; line-height: 1.4;">\${escapeHtml(sc.cardBody)}</div>
            </div>
          \`;
        } else if (sc.checklist) {
          midCardHtml = \`
            <div class="floating-card">
              <div style="display: flex; flex-direction: column; gap: 16px;">
                \${sc.checklist.map(item => \`
                  <div style="font-size: 24px; color: \${item.color}; font-weight: 700;">\${escapeHtml(item.text)}</div>
                \`).join("")}
              </div>
            </div>
          \`;
        } else if (sc.ctaLeft && sc.ctaRight) {
          midCardHtml = \`
            <div style="display: flex; gap: 26px; margin-top: 660px;">
              <div class="floating-card" style="flex: 1; margin-top: 0; border-color: \${sc.ctaLeft.color};">
                <div style="font-size: 20px; font-weight: 800; color: \${sc.ctaLeft.color}; margin-bottom: 8px;">\${escapeHtml(sc.ctaLeft.label)}</div>
                <div style="font-size: 30px; font-weight: 900; color: #FFFFFF;">\${escapeHtml(sc.ctaLeft.cmd)}</div>
                <div style="font-size: 18px; color: #94A3B8; margin-top: 6px;">\${escapeHtml(sc.ctaLeft.sub)}</div>
              </div>
              <div class="floating-card" style="flex: 1; margin-top: 0; border-color: \${sc.ctaRight.color};">
                <div style="font-size: 20px; font-weight: 800; color: \${sc.ctaRight.color}; margin-bottom: 8px;">\${escapeHtml(sc.ctaRight.label)}</div>
                <div style="font-size: 30px; font-weight: 900; color: #FFFFFF;">\${escapeHtml(sc.ctaRight.cmd)}</div>
                <div style="font-size: 18px; color: #94A3B8; margin-top: 6px;">\${escapeHtml(sc.ctaRight.sub)}</div>
              </div>
            </div>
          \`;
        } else {
          midCardHtml = \`
            <div class="floating-card">
              <div style="font-size: 22px; font-weight: 800; color: \${sc.badgeColor}; margin-bottom: 14px;">\${escapeHtml(sc.cardTitle)}</div>
              <div style="font-size: 25px; line-height: 1.42; color: #E2E8F0;">\${escapeHtml(sc.cardBody)}</div>
            </div>
          \`;
        }

        uiContent.innerHTML = \`
          <div class="badge-tag" style="background: \${sc.badgeColor}20; border: 2px solid \${sc.badgeColor}; color: \${sc.badgeColor};">\${escapeHtml(sc.badge)}</div>
          <div class="headline">\${escapeHtml(sc.headline)}</div>
          <div class="subheadline">\${escapeHtml(sc.subheadline)}</div>
          \${midCardHtml}
        \`;

        uiFooter.innerHTML = \`
          <div class="subtitle-bar" style="border-left: 6px solid \${sc.badgeColor};">
            "\${escapeHtml(sc.subtitle)}"
          </div>
          <div class="contact-info">
            <span>🌐 jsmintegratedservices.com</span>
            <span>📞 +91 90808 63448</span>
            <span>📍 India Talent Desk</span>
          </div>
        \`;
      }

      // Clear & redraw animated character canvas on every frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const actor of (sc.cast || [])) {
        if (actor.type === "rahul") {
          drawRahul(ctx, actor.x, actor.y, actor.scale, actor.emotion, tPhase);
        } else if (actor.type === "vikram") {
          drawVikram(ctx, actor.x, actor.y, actor.scale, actor.emotion, tPhase);
        } else if (actor.type === "mediator") {
          drawJSMMediator(ctx, actor.x, actor.y, actor.scale, tPhase);
        }
      }
    };
  </script>
</body>
</html>`;
}

/**
 * Generate voiceover clips for 8 scenes via Kokoro TTS & measure exact durations
 */
function synthesizeAudioForDeck(deck, workDir) {
  const voiceDir = path.join(workDir, 'voices');
  fs.mkdirSync(voiceDir, { recursive: true });

  const sceneDurations = [];
  const wavFiles = [];

  console.log(`Generating 8 neural Kokoro voice tracks into ${voiceDir}...`);

  for (const sc of deck) {
    const outWav = path.join(voiceDir, `s${sc.id}.wav`);
    const safeSpeech = sc.speech.replace(/"/g, "'");
    execSync(`"${KOKORO_BIN}" -m af_bella -l a -t "${safeSpeech}" -o "${outWav}"`, {
      stdio: 'pipe'
    });

    // Measure exact clip duration + add 0.55s breath pause between scenes
    const rawDurStr = execSync(
      `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${outWav}"`,
      { encoding: 'utf8' }
    ).trim();
    const rawDur = Math.max(2.5, parseFloat(rawDurStr) || 5.0);
    const paddedWav = path.join(voiceDir, `s${sc.id}_pad.wav`);
    const padDur = rawDur + 0.45;
    execSync(
      `ffmpeg -y -i "${outWav}" -af "apad=pad_dur=0.45" -ar 48000 -ac 2 -t ${padDur.toFixed(3)} "${paddedWav}"`,
      { stdio: 'pipe' }
    );

    wavFiles.push(paddedWav);
    sceneDurations.push({ id: sc.id, dur: Number(padDur.toFixed(3)) });
  }

  // Concatenate voice tracks
  const voiceListPath = path.join(voiceDir, 'voice_concat.txt');
  fs.writeFileSync(voiceListPath, wavFiles.map(f => `file '${f}'`).join('\n') + '\n');

  const combinedVoice = path.join(workDir, 'voice_full.wav');
  execSync(`ffmpeg -y -f concat -safe 0 -i "${voiceListPath}" -c copy "${combinedVoice}"`, {
    stdio: 'pipe'
  });

  const totalDur = sceneDurations.reduce((acc, s) => acc + s.dur, 0);
  const cappedTotal = Math.min(58.5, totalDur);

  // Mix voiceover over subtle warm low-frequency studio pad
  const finalMix = path.join(workDir, 'audio_mix.wav');
  execSync(
    `ffmpeg -y -i "${combinedVoice}" -f lavfi -i "sine=frequency=110:duration=${cappedTotal.toFixed(2)}" -f lavfi -i "sine=frequency=164.81:duration=${cappedTotal.toFixed(2)}" ` +
    `-filter_complex "[1:a][2:a]amix=inputs=2:duration=shortest,lowpass=f=240,volume=0.035[bg];[0:a]volume=1.35,acompressor=threshold=0.12:ratio=3[vo];[vo][bg]amix=inputs=2:duration=first:normalize=0" ` +
    `-ar 48000 -ac 2 -t ${cappedTotal.toFixed(2)} "${finalMix}"`,
    { stdio: 'pipe' }
  );

  return { finalMix, sceneDurations, totalDuration: cappedTotal };
}

async function run() {
  const args = process.argv.slice(2);
  const reelIdArg = args.find(a => a.startsWith('--reel-id='))?.split('=')[1];
  const dayArg = args.find(a => a.startsWith('--day='))?.split('=')[1];
  const slotArg = args.find(a => a.startsWith('--slot='))?.split('=')[1] || 'morning';

  let targetReel;
  let outMp4;
  let outPoster;
  let workDir;
  let reelLabel;

  if (reelIdArg) {
    targetReel = getReelById(reelIdArg, CATALOG_PATH);
  } else if (dayArg) {
    targetReel = getReelByDay(parseInt(dayArg, 10), slotArg, CATALOG_PATH);
  }

  if (targetReel) {
    const dailyDir = path.join(ROOT_DIR, 'public', 'videos', 'daily');
    fs.mkdirSync(dailyDir, { recursive: true });
    outMp4 = path.join(dailyDir, `${targetReel.reel_id}.mp4`);
    outPoster = path.join(dailyDir, `${targetReel.reel_id}.jpg`);
    workDir = `/tmp/jsm_render_${targetReel.reel_id}`;
    reelLabel = `${targetReel.reel_id} · DAY ${targetReel.day_number}`;
  } else {
    targetReel = getReelByDay(1, 'morning', CATALOG_PATH);
    outMp4 = path.join(ROOT_DIR, 'public', 'videos', 'jsm-talent-bridge-reel.mp4');
    outPoster = path.join(ROOT_DIR, 'public', 'videos', 'poster-bridge.jpg');
    workDir = '/tmp/jsm_render_default';
    reelLabel = 'TALENT BRIDGE SERIES';
  }

  fs.mkdirSync(workDir, { recursive: true });
  const framesDir = path.join(workDir, 'frames');
  fs.mkdirSync(framesDir, { recursive: true });

  console.log('======================================================================');
  console.log(`  RENDERING ANIMATED CHARACTER REEL: ${reelLabel}`);
  console.log('  Mode: Generation Only (Decoupled — Zero Social Posting)');
  console.log('======================================================================');

  const deck = buildSceneDeckForReel(targetReel);
  const { finalMix, sceneDurations, totalDuration } = synthesizeAudioForDeck(deck, workDir);
  console.log(`✓ Audio synthesized (${totalDuration.toFixed(2)}s across 8 scenes).`);

  console.log(`Launching Chrome headless to capture ${deck.length * FRAMES_PER_LOOP} animated frames...`);
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true
  });

  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.setContent(buildStageHtml(deck, reelLabel), { waitUntil: 'load' });

  const sceneVideos = [];

  for (let sIdx = 0; sIdx < deck.length; sIdx++) {
    const sc = deck[sIdx];
    const targetDur = sceneDurations[sIdx].dur;
    const scFrameDir = path.join(framesDir, `s${sc.id}`);
    fs.mkdirSync(scFrameDir, { recursive: true });

    for (let f = 0; f < FRAMES_PER_LOOP; f++) {
      const phase = (f / FRAMES_PER_LOOP) * Math.PI * 2;
      await page.evaluate(([idx, t]) => window.renderFrame(idx, t), [sIdx, phase]);
      if (f === 0) await page.waitForTimeout(40);
      const framePath = path.join(scFrameDir, `f_${String(f).padStart(2, '0')}.png`);
      await page.screenshot({ path: framePath, type: 'png' });
    }

    // Encode seamless looping animated segment for exact scene audio duration
    const segMp4 = path.join(workDir, `seg_${sc.id}.mp4`);
    execSync(
      `ffmpeg -y -stream_loop -1 -framerate ${ANIM_FPS} -i "${scFrameDir}/f_%02d.png" ` +
      `-t ${targetDur.toFixed(3)} -c:v libx264 -preset fast -crf 19 -pix_fmt yuv420p -r 24 "${segMp4}"`,
      { stdio: 'pipe' }
    );
    sceneVideos.push(segMp4);
    console.log(`  ✓ Animated Scene ${sc.id}/8 (${FRAMES_PER_LOOP} motion frames, ${targetDur.toFixed(2)}s)`);
  }

  await page.close();
  await browser.close();

  // Concatenate animated segments and mux synthesized voice mix
  const vidConcatPath = path.join(workDir, 'vid_concat.txt');
  fs.writeFileSync(vidConcatPath, sceneVideos.map(v => `file '${v}'`).join('\n') + '\n');

  console.log(`Muxing final 1080x1920 vertical animated MP4 -> ${outMp4}...`);
  execSync(
    `ffmpeg -y -f concat -safe 0 -i "${vidConcatPath}" -i "${finalMix}" ` +
    `-c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart "${outMp4}"`,
    { stdio: 'pipe' }
  );

  // Extract poster cover image from Scene 1
  execSync(`ffmpeg -y -i "${outMp4}" -ss 00:00:01 -vframes 1 -q:v 2 "${outPoster}"`, { stdio: 'pipe' });

  console.log(`✓ Character Reel ready at: ${outMp4}`);
  console.log(`✓ Poster cover saved at:   ${outPoster}`);
  console.log('✓ Note: Generation complete. Zero webhooks or posts triggered.');
}

const isDirectExecution = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isDirectExecution) {
  run().catch((err) => {
    console.error('✗ Renderer failed:', err);
    process.exit(1);
  });
}
