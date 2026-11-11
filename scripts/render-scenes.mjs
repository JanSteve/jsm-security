import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { execSync } from 'node:child_process';

const OUT_DIR = '/tmp/jsm_bridge_scenes';
fs.mkdirSync(OUT_DIR, { recursive: true });

const SCENES = [
  {
    id: 1,
    badge: "THE HIRING PARADOX",
    badgeColor: "#F43F5E",
    headline: "APPLIED TO 200 JOBS & GOT GHOSTED?",
    subheadline: "While companies say they can't find good people...",
    cardTitle: "THE GREAT WORKPLACE DISCONNECT",
    metrics: [
      { label: "Job Seekers Ghosted", val: "78%", color: "#F43F5E" },
      { label: "Unfilled Positions", val: "4.2 Lakhs", color: "#E5A93C" }
    ],
    highlightBox: "Why does landing a role feel like shouting into the void, while founders struggle for months to hire?",
    subtitle: "Why does finding a job feel like shouting into the void, while companies say they cannot find good people?"
  },
  {
    id: 2,
    badge: "THE CANDIDATE TRAP",
    badgeColor: "#EF4444",
    headline: "SWALLOWED BY AUTOMATED RESUME BOTS",
    subheadline: "No human ever saw your hard-earned experience",
    cardTitle: "THE COLD ATS ALGORITHM",
    metrics: [
      { label: "Resumes Auto-Rejected", val: "75%+", color: "#EF4444" },
      { label: "Average Human Review Time", val: "6 Seconds", color: "#94A3B8" }
    ],
    highlightBox: "You spend hours tailoring your resume, only for an automated keyword bot to reject it in 3 seconds.",
    subtitle: "You apply to hundreds of openings, spend hours on your resume, and get swallowed by automated robot filters."
  },
  {
    id: 3,
    badge: "THE EMPLOYER NIGHTMARE",
    badgeColor: "#F59E0B",
    headline: "1,200 SPAM RESUMES IN 48 HOURS",
    subheadline: "Founders & HR teams drowning in irrelevant applications",
    cardTitle: "HIRING PIPELINE COLLAPSE",
    metrics: [
      { label: "Unqualified Applicants", val: "92%", color: "#F59E0B" },
      { label: "Time Lost to Screening", val: "45 Days", color: "#F43F5E" }
    ],
    highlightBox: "Companies wait months to find one honest, dependable person. Projects stall, teams get burned out.",
    subtitle: "Meanwhile, business owners and managers are drowning in a thousand fake resumes, waiting months to find one honest worker."
  },
  {
    id: 4,
    badge: "THE CRITICAL FAILURE",
    badgeColor: "#DC2626",
    headline: "THE DAY-ONE GHOSTING CRISIS",
    subheadline: "Offer accepted. Notice period waited. Monday morning: GHOSTED.",
    cardTitle: "BROKEN HIRING TRUST",
    metrics: [
      { label: "Offer Shopping Rate", val: "38%", color: "#DC2626" },
      { label: "Wasted Notice Period", val: "60 Days", color: "#F59E0B" }
    ],
    highlightBox: "When a candidate doesn't show up on Day 1, the business loses months of momentum and revenue.",
    subtitle: "And when they finally hire someone? The candidate ghosts them on day one."
  },
  {
    id: 5,
    badge: "THE HUMAN TALENT BRIDGE",
    badgeColor: "#E5A93C",
    headline: "WE DON'T USE BOTS. WE BUILD BRIDGES.",
    subheadline: "JSM Integrated Services — Pure Talent Mediation",
    cardTitle: "REAL HUMAN CONNECTIONS",
    metrics: [
      { label: "Client Retainer Fee", val: "₹0 Upfront", color: "#10B981" },
      { label: "Candidate Placement Cost", val: "100% Free", color: "#38BDF8" }
    ],
    highlightBox: "We connect motivated candidates directly with verified companies. Fair, transparent, and accountability-driven.",
    subtitle: "The entire hiring system is broken. That is why JSM Integrated Services exists: to be the human bridge."
  },
  {
    id: 6,
    badge: "FOR TALENT & PROFESSIONALS",
    badgeColor: "#10B981",
    headline: "DIRECT ACCESS TO HIRING DECISION-MAKERS",
    subheadline: "No ATS robots. No ghosting. 100% Free.",
    cardTitle: "CANDIDATE ADVOCACY",
    metrics: [
      { label: "Direct MD/CEO Access", val: "100%", color: "#10B981" },
      { label: "Verified CTC & Culture", val: "Audited", color: "#E5A93C" }
    ],
    highlightBox: "We review your real achievements and present you directly to leaders who value and pay for talent.",
    subtitle: "For job seekers: zero fees, real human representation, and direct introductions to verified employers."
  },
  {
    id: 7,
    badge: "FOR GROWING COMPANIES",
    badgeColor: "#38BDF8",
    headline: "PRE-SCREENED TALENT IN 7 DAYS",
    subheadline: "Zero upfront risk. Pay strictly on verified success.",
    cardTitle: "CONTINGENCY SEARCH DESK",
    metrics: [
      { label: "Time-to-Shortlist", val: "7 Days", color: "#38BDF8" },
      { label: "Replacement Shield", val: "90 Days", color: "#10B981" }
    ],
    highlightBox: "No advance fees. Three verified, interview-ready candidates delivered in 168 hours. You only pay when you hire.",
    subtitle: "For companies: pre-screened, dependable talent in seven business days with zero upfront retainer fees."
  },
  {
    id: 8,
    badge: "JOIN THE TALENT NETWORK",
    badgeColor: "#E5A93C",
    headline: "DROP YOUR COMMENT BELOW",
    subheadline: "Let's connect talent with opportunity today",
    cardTitle: "HOW TO CONNECT WITH JSM",
    metrics: [
      { label: "Job Seekers", val: 'Comment "JOB"', color: "#10B981" },
      { label: "Companies", val: 'Comment "HIRE"', color: "#38BDF8" }
    ],
    highlightBox: "Job seekers: Comment 'JOB' + your city. Companies: Comment 'HIRE' to get verified profiles this week.",
    subtitle: "If you are looking for a job, comment JOB with your city. If you are a company hiring, comment HIRE to get talent this week."
  }
];

function generateHtml(scene) {
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
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 90px 70px 100px;
      position: relative;
      overflow: hidden;
    }
    /* Subtle background grid & glow */
    .glow-circle {
      position: absolute;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      background: radial-gradient(circle, ${scene.badgeColor}22 0%, transparent 70%);
      top: 300px;
      left: 140px;
      pointer-events: none;
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
    .logo-container {
      display: flex;
      align-items: center;
      gap: 18px;
    }
    .logo-badge {
      width: 64px;
      height: 64px;
      background: #151C2C;
      border: 2px solid #E5A93C;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 900;
      font-size: 24px;
      color: #E5A93C;
      letter-spacing: 1px;
    }
    .brand-title {
      font-size: 28px;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #FFFFFF;
    }
    .brand-sub {
      font-size: 16px;
      font-weight: 600;
      color: #94A3B8;
      letter-spacing: 1px;
    }
    .scene-pill {
      background: #151C2C;
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 30px;
      padding: 10px 24px;
      font-size: 16px;
      font-weight: 700;
      letter-spacing: 1px;
      color: #94A3B8;
    }
    .content {
      position: relative;
      z-index: 10;
      margin-top: 40px;
    }
    .badge-tag {
      display: inline-block;
      background: ${scene.badgeColor}20;
      border: 2px solid ${scene.badgeColor};
      color: ${scene.badgeColor};
      padding: 12px 28px;
      border-radius: 40px;
      font-size: 20px;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 35px;
    }
    .headline {
      font-size: 64px;
      font-weight: 900;
      line-height: 1.15;
      letter-spacing: -0.5px;
      margin-bottom: 25px;
      text-transform: uppercase;
      color: #FFFFFF;
    }
    .subheadline {
      font-size: 28px;
      color: #94A3B8;
      font-weight: 500;
      line-height: 1.4;
      margin-bottom: 50px;
    }
    .card {
      background: #111827;
      border: 2px solid rgba(255,255,255,0.1);
      border-radius: 32px;
      padding: 45px 50px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
      margin-bottom: 45px;
    }
    .card-title {
      font-size: 20px;
      font-weight: 800;
      letter-spacing: 2px;
      color: #94A3B8;
      text-transform: uppercase;
      margin-bottom: 35px;
    }
    .metrics-row {
      display: flex;
      justify-content: space-between;
      gap: 30px;
      margin-bottom: 35px;
    }
    .metric-item {
      flex: 1;
      background: #1F2937;
      border-radius: 20px;
      padding: 25px;
      border: 1px solid rgba(255,255,255,0.05);
    }
    .metric-val {
      font-size: 48px;
      font-weight: 900;
      margin-bottom: 8px;
    }
    .metric-label {
      font-size: 18px;
      color: #94A3B8;
      font-weight: 600;
    }
    .highlight-box {
      background: rgba(229, 169, 60, 0.08);
      border-left: 6px solid #E5A93C;
      border-radius: 0 16px 16px 0;
      padding: 25px 30px;
      font-size: 24px;
      line-height: 1.5;
      font-weight: 600;
      color: #F1F5F9;
    }
    .cta-banner {
      background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%);
      border: 2px solid #E5A93C88;
      border-radius: 28px;
      padding: 30px 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
    }
    .cta-text {
      font-size: 24px;
      font-weight: 800;
      color: #FFFFFF;
    }
    .cta-pill {
      background: #E5A93C;
      color: #000000;
      font-weight: 900;
      font-size: 22px;
      padding: 14px 32px;
      border-radius: 50px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .footer {
      position: relative;
      z-index: 10;
      border-top: 2px solid rgba(255,255,255,0.08);
      padding-top: 35px;
    }
    .subtitle-bar {
      background: #1E293B;
      border-radius: 20px;
      padding: 24px 35px;
      font-size: 24px;
      font-weight: 700;
      line-height: 1.4;
      color: #F8FAFC;
      border-left: 6px solid ${scene.badgeColor};
    }
    .contact-info {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      font-size: 18px;
      color: #64748B;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="glow-circle"></div>
  <div class="grid-lines"></div>

  <div class="header">
    <div class="logo-container">
      <div class="logo-badge">JSM</div>
      <div>
        <div class="brand-title">JSM Integrated Services</div>
        <div class="brand-sub">Talent Acquisition & Career Mediation</div>
      </div>
    </div>
    <div class="scene-pill">0${scene.id} / 08</div>
  </div>

  <div class="content">
    <div class="badge-tag">${scene.badge}</div>
    <div class="headline">${scene.headline}</div>
    <div class="subheadline">${scene.subheadline}</div>

    <div class="card">
      <div class="card-title">${scene.cardTitle}</div>
      <div class="metrics-row">
        <div class="metric-item">
          <div class="metric-val" style="color: ${scene.metrics[0].color};">${scene.metrics[0].val}</div>
          <div class="metric-label">${scene.metrics[0].label}</div>
        </div>
        <div class="metric-item">
          <div class="metric-val" style="color: ${scene.metrics[1].color};">${scene.metrics[1].val}</div>
          <div class="metric-label">${scene.metrics[1].label}</div>
        </div>
      </div>
      <div class="highlight-box">
        ${scene.highlightBox}
      </div>
    </div>

    <div class="cta-banner">
      <div class="cta-text">Looking for Jobs or Hiring Talent?</div>
      <div class="cta-pill">Comment Below</div>
    </div>
  </div>

  <div class="footer">
    <div class="subtitle-bar">"${scene.subtitle}"</div>
    <div class="contact-info">
      <span>🌐 jsmintegratedservices.com</span>
      <span>📞 +91 90808 63448</span>
      <span>📍 Tamil Nadu · Karnataka · India</span>
    </div>
  </div>
</body>
</html>`;
}

async function run() {
  console.log("Launching Playwright to render 8 high-resolution 1080x1920 scene cards...");
  const browser = await chromium.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true
  });
  const page = await browser.newPage({
    viewport: { width: 1080, height: 1920 }
  });

  for (const scene of SCENES) {
    const html = generateHtml(scene);
    await page.setContent(html, { waitUntil: 'load' });
    const imgPath = path.join(OUT_DIR, `scene_${scene.id}.png`);
    await page.screenshot({ path: imgPath, type: 'png' });
    console.log(`✓ Rendered scene ${scene.id} -> ${imgPath}`);
  }

  await browser.close();
  console.log("✓ All 8 scene cards rendered successfully!");
}

run().catch(err => {
  console.error("Error rendering scenes:", err);
  process.exit(1);
});
