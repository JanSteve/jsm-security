import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { execSync } from 'node:child_process';

const OUT_DIR = '/tmp/jsm_character_scenes';
fs.mkdirSync(OUT_DIR, { recursive: true });

function getSceneHtml(sceneNum) {
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
    }
    .scene-pill {
      background: #151C2C;
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 30px;
      padding: 10px 24px;
      font-size: 16px;
      font-weight: 700;
      color: #94A3B8;
    }
    #stage {
      position: absolute;
      top: 0;
      left: 0;
      width: 1080px;
      height: 1920px;
      pointer-events: none;
      z-index: 5;
    }
    .content {
      position: relative;
      z-index: 10;
      margin-top: 20px;
    }
    .badge-tag {
      display: inline-block;
      padding: 12px 28px;
      border-radius: 40px;
      font-size: 20px;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 25px;
    }
    .headline {
      font-size: 58px;
      font-weight: 900;
      line-height: 1.15;
      text-transform: uppercase;
      color: #FFFFFF;
      margin-bottom: 20px;
      max-width: 940px;
    }
    .subheadline {
      font-size: 26px;
      color: #94A3B8;
      font-weight: 500;
      line-height: 1.4;
      margin-bottom: 30px;
    }
    .floating-card {
      background: rgba(17, 24, 39, 0.94);
      border: 2px solid rgba(255, 255, 255, 0.12);
      backdrop-filter: blur(10px);
      border-radius: 28px;
      padding: 35px 40px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
      max-width: 940px;
    }
    .footer {
      position: relative;
      z-index: 10;
      border-top: 2px solid rgba(255,255,255,0.08);
      padding-top: 30px;
    }
    .subtitle-bar {
      background: #1E293B;
      border-radius: 20px;
      padding: 22px 35px;
      font-size: 24px;
      font-weight: 700;
      line-height: 1.4;
      color: #F8FAFC;
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
  <div class="grid-lines"></div>
  <canvas id="stage" width="1080" height="1920"></canvas>

  <div class="header">
    <div class="logo-container">
      <div class="logo-badge">JSM</div>
      <div>
        <div class="brand-title">JSM Integrated Services</div>
        <div class="brand-sub">Talent Acquisition & Career Mediation</div>
      </div>
    </div>
    <div class="scene-pill">0${sceneNum} / 08</div>
  </div>

  <div class="content" id="ui-content"></div>
  <div class="footer" id="ui-footer"></div>

  <script>
    const canvas = document.getElementById("stage");
    const ctx = canvas.getContext("2d");
    const uiContent = document.getElementById("ui-content");
    const uiFooter = document.getElementById("ui-footer");

    // =========================================================================
    // CHARACTER RENDERERS
    // =========================================================================

    function drawRahul(c, x, y, scale = 1.0, emotion = "frustrated", t = 0) {
      c.save();
      c.translate(x, y);
      c.scale(scale, scale);

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
      c.moveTo(-10, 55); c.lineTo(-10, 85);
      c.moveTo(10, 55); c.lineTo(10, 85);
      c.stroke();

      // Arms
      c.strokeStyle = "#0E1116";
      c.fillStyle = "#0F766E";
      c.lineWidth = 4;

      if (emotion === "frustrated") {
        c.beginPath();
        c.moveTo(-45, 65); c.lineTo(-75, 20); c.lineTo(-38, -5); c.stroke();
        c.beginPath();
        c.moveTo(45, 65); c.lineTo(75, 20); c.lineTo(38, -5); c.stroke();
        c.fillStyle = "#FAD9B5";
        c.beginPath(); c.arc(-38, -5, 14, 0, Math.PI * 2); c.fill(); c.stroke();
        c.beginPath(); c.arc(38, -5, 14, 0, Math.PI * 2); c.fill(); c.stroke();
      } else if (emotion === "celebrating") {
        c.beginPath();
        c.moveTo(-45, 65); c.lineTo(-85, 0); c.lineTo(-75, -50); c.stroke();
        c.beginPath();
        c.moveTo(45, 65); c.lineTo(85, 0); c.lineTo(75, -50); c.stroke();
        c.fillStyle = "#FAD9B5";
        c.beginPath(); c.arc(-75, -50, 14, 0, Math.PI * 2); c.fill(); c.stroke();
        c.beginPath(); c.arc(75, -50, 14, 0, Math.PI * 2); c.fill(); c.stroke();

        // Offer Letter
        c.save();
        c.translate(85, -60);
        c.rotate(0.2);
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
        // Sweat drop
        c.fillStyle = "#38BDF8";
        c.beginPath();
        c.moveTo(35, -20); c.quadraticCurveTo(40, -10, 35, -5); c.quadraticCurveTo(30, -10, 35, -20);
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
      c.save();
      c.translate(x, y);
      c.scale(scale, scale);

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
        c.beginPath(); c.moveTo(-48, 65); c.lineTo(-80, 20); c.lineTo(-42, -5); c.stroke();
        c.beginPath(); c.moveTo(48, 65); c.lineTo(80, 20); c.lineTo(42, -5); c.stroke();
        c.fillStyle = "#E7C19B";
        c.beginPath(); c.arc(-42, -5, 14, 0, Math.PI * 2); c.fill(); c.stroke();
        c.beginPath(); c.arc(42, -5, 14, 0, Math.PI * 2); c.fill(); c.stroke();
      } else if (emotion === "triumphant") {
        c.beginPath(); c.moveTo(-48, 65); c.lineTo(-85, 45); c.lineTo(-80, 10); c.stroke();
        c.beginPath(); c.moveTo(48, 65); c.lineTo(85, 45); c.lineTo(80, 10); c.stroke();
        c.fillStyle = "#E7C19B";
        c.beginPath(); c.arc(-80, 10, 14, 0, Math.PI * 2); c.fill(); c.stroke();
        c.beginPath(); c.arc(80, 10, 14, 0, Math.PI * 2); c.fill(); c.stroke();
        c.beginPath(); c.moveTo(-80, 5); c.lineTo(-80, -10); c.stroke();
        c.beginPath(); c.moveTo(80, 5); c.lineTo(80, -10); c.stroke();
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
      c.save();
      c.translate(x, y);
      c.scale(scale, scale);

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

    // =========================================================================
    // SCENE LOGIC WITH OPTIMIZED POSITIONING
    // =========================================================================
    const s = ${sceneNum};

    if (s === 1) {
      uiContent.innerHTML = \`
        <div class="badge-tag" style="background: #F43F5E20; border: 2px solid #F43F5E; color: #F43F5E;">THE PARADOX HOOK</div>
        <div class="headline">APPLIED TO 200 JOBS & GOT GHOSTED?</div>
        <div class="subheadline">While companies say they can't find good people...</div>
        <div class="floating-card" style="margin-top: 680px;">
          <div style="font-size: 22px; font-weight: 800; color: #F43F5E; margin-bottom: 15px;">THE WORKPLACE CRISIS</div>
          <div style="font-size: 26px; line-height: 1.4; color: #E2E8F0;">
            Candidates send hundreds of applications and get ghosted. Meanwhile, companies search for months with empty desks.
          </div>
        </div>
      \`;
      uiFooter.innerHTML = \`
        <div class="subtitle-bar" style="border-left: 6px solid #F43F5E;">
          "Why does finding a job feel like shouting into the void, while companies say they cannot find good people?"
        </div>
        <div class="contact-info">
          <span>🌐 jsmintegratedservices.com</span>
          <span>📞 +91 90808 63448</span>
          <span>📍 Tamil Nadu · Karnataka · India</span>
        </div>
      \`;
      drawRahul(ctx, 280, 800, 1.35, "frustrated", 0);
      drawVikram(ctx, 800, 800, 1.35, "stressed", 0);
    } 
    else if (s === 2) {
      uiContent.innerHTML = \`
        <div class="badge-tag" style="background: #EF444420; border: 2px solid #EF4444; color: #EF4444;">CANDIDATE AGONY</div>
        <div class="headline">SWALLOWED BY COLD ROBOT RESUME BOTS</div>
        <div class="subheadline">No human ever saw your hard-earned experience.</div>
        <div class="floating-card" style="margin-top: 680px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
            <div>
              <div style="font-size: 48px; font-weight: 900; color: #EF4444;">75%+</div>
              <div style="font-size: 18px; color: #94A3B8;">Resumes Auto-Discarded</div>
            </div>
            <div>
              <div style="font-size: 48px; font-weight: 900; color: #F59E0B;">3 Sec</div>
              <div style="font-size: 18px; color: #94A3B8;">Time ATS Takes to Reject</div>
            </div>
          </div>
          <div style="font-size: 24px; color: #CBD5E1; line-height: 1.4;">
            You spend weeks tailoring your resume, only for an algorithm to delete it before an interview.
          </div>
        </div>
      \`;
      uiFooter.innerHTML = \`
        <div class="subtitle-bar" style="border-left: 6px solid #EF4444;">
          "You apply to hundreds of openings, spend hours on your resume, and get swallowed by automated robot filters."
        </div>
        <div class="contact-info">
          <span>🌐 jsmintegratedservices.com</span>
          <span>📞 +91 90808 63448</span>
        </div>
      \`;
      drawRahul(ctx, 540, 800, 1.5, "frustrated", 0);
    }
    else if (s === 3) {
      uiContent.innerHTML = \`
        <div class="badge-tag" style="background: #F59E0B20; border: 2px solid #F59E0B; color: #F59E0B;">EMPLOYER NIGHTMARE</div>
        <div class="headline">1,200 SPAM RESUMES IN 48 HOURS</div>
        <div class="subheadline">Founders & managers drowning in irrelevant applications.</div>
        <div class="floating-card" style="margin-top: 680px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
            <div>
              <div style="font-size: 48px; font-weight: 900; color: #F59E0B;">92%</div>
              <div style="font-size: 18px; color: #94A3B8;">Unqualified Applicants</div>
            </div>
            <div>
              <div style="font-size: 48px; font-weight: 900; color: #EF4444;">3 Months</div>
              <div style="font-size: 18px; color: #94A3B8;">Wasted Searching</div>
            </div>
          </div>
          <div style="font-size: 24px; color: #CBD5E1; line-height: 1.4;">
            Projects freeze and deadlines slip because finding one dependable, skilled person feels impossible.
          </div>
        </div>
      \`;
      uiFooter.innerHTML = \`
        <div class="subtitle-bar" style="border-left: 6px solid #F59E0B;">
          "Meanwhile, business owners and managers are drowning in a thousand fake resumes, waiting months to find one honest worker."
        </div>
        <div class="contact-info">
          <span>🌐 jsmintegratedservices.com</span>
          <span>📞 +91 90808 63448</span>
        </div>
      \`;
      drawVikram(ctx, 540, 800, 1.5, "stressed", 0);
    }
    else if (s === 4) {
      uiContent.innerHTML = \`
        <div class="badge-tag" style="background: #DC262620; border: 2px solid #DC2626; color: #DC2626;">THE CRITICAL BREAKDOWN</div>
        <div class="headline">DAY 1 GHOSTING: PHONE SWITCHED OFF</div>
        <div class="subheadline">Offer accepted. Notice period waited. Monday morning: NO SHOW.</div>
        <div class="floating-card" style="margin-top: 680px;">
          <div style="font-size: 24px; font-weight: 800; color: #DC2626; margin-bottom: 12px;">CRITICAL REVENUE & TIME LOSS</div>
          <div style="font-size: 26px; color: #CBD5E1; line-height: 1.4;">
            Traditional agencies take advance retainers and shrug when candidates don't show up. Zero accountability.
          </div>
        </div>
      \`;
      uiFooter.innerHTML = \`
        <div class="subtitle-bar" style="border-left: 6px solid #DC2626;">
          "And when they finally hire someone? The candidate ghosts them on day one."
        </div>
        <div class="contact-info">
          <span>🌐 jsmintegratedservices.com</span>
          <span>📞 +91 90808 63448</span>
        </div>
      \`;
      drawVikram(ctx, 540, 800, 1.5, "stressed", 0);
    }
    else if (s === 5) {
      uiContent.innerHTML = \`
        <div class="badge-tag" style="background: #E5A93C20; border: 2px solid #E5A93C; color: #E5A93C;">THE INTERVAL RESOLUTION</div>
        <div class="headline">WE DON'T USE BOTS. WE BUILD BRIDGES.</div>
        <div class="subheadline">JSM Integrated Services — Dedicated Human Talent Mediation</div>
        <div class="floating-card" style="margin-top: 680px;">
          <div style="font-size: 24px; font-weight: 800; color: #E5A93C; margin-bottom: 15px;">THE CONTINGENCY TALENT DESK</div>
          <div style="font-size: 26px; color: #F1F5F9; line-height: 1.5;">
            We personally vet every candidate and company. No upfront retainers, no robot filters, pure mutual success.
          </div>
        </div>
      \`;
      uiFooter.innerHTML = \`
        <div class="subtitle-bar" style="border-left: 6px solid #E5A93C;">
          "The entire hiring system is broken. That is why JSM Integrated Services exists: to be the human bridge."
        </div>
        <div class="contact-info">
          <span>🌐 jsmintegratedservices.com</span>
          <span>📞 +91 90808 63448</span>
        </div>
      \`;
      drawJSMMediator(ctx, 540, 780, 1.55, 0);
    }
    else if (s === 6) {
      uiContent.innerHTML = \`
        <div class="badge-tag" style="background: #10B98120; border: 2px solid #10B981; color: #10B981;">FOR JOB SEEKERS & TALENT</div>
        <div class="headline">DIRECT ACCESS TO DECISION MAKERS</div>
        <div class="subheadline">100% Free Forever. Verified CTC. Direct CEO Representation.</div>
        <div class="floating-card" style="margin-top: 680px;">
          <div style="display: flex; flex-direction: column; gap: 15px;">
            <div style="font-size: 24px; color: #10B981; font-weight: 700;">✓ ₹0 Charged to Candidates Forever</div>
            <div style="font-size: 24px; color: #F1F5F9; font-weight: 700;">✓ Pitched Directly to Founders & Plant Heads</div>
            <div style="font-size: 24px; color: #38BDF8; font-weight: 700;">✓ 100% Salary & Workplace Culture Transparency</div>
          </div>
        </div>
      \`;
      uiFooter.innerHTML = \`
        <div class="subtitle-bar" style="border-left: 6px solid #10B981;">
          "For job seekers: zero fees, real human representation, and direct introductions to verified employers."
        </div>
        <div class="contact-info">
          <span>🌐 jsmintegratedservices.com</span>
          <span>📞 +91 90808 63448</span>
        </div>
      \`;
      drawRahul(ctx, 320, 780, 1.4, "celebrating", 0);
      drawJSMMediator(ctx, 760, 780, 1.4, 0);
    }
    else if (s === 7) {
      uiContent.innerHTML = \`
        <div class="badge-tag" style="background: #38BDF820; border: 2px solid #38BDF8; color: #38BDF8;">FOR GROWING COMPANIES</div>
        <div class="headline">PRE-SCREENED TALENT IN 7 DAYS</div>
        <div class="subheadline">Zero Upfront Risk. Pay Strictly Upon Verified Joining.</div>
        <div class="floating-card" style="margin-top: 680px;">
          <div style="display: flex; flex-direction: column; gap: 15px;">
            <div style="font-size: 24px; color: #38BDF8; font-weight: 700;">✓ Pure Contingency — ₹0 Upfront Retainers</div>
            <div style="font-size: 24px; color: #10B981; font-weight: 700;">✓ 3 Interview-Ready Finalists in 7 Days</div>
            <div style="font-size: 24px; color: #E5A93C; font-weight: 700;">✓ 90-Day Placement Replacement Shield</div>
          </div>
        </div>
      \`;
      uiFooter.innerHTML = \`
        <div class="subtitle-bar" style="border-left: 6px solid #38BDF8;">
          "For companies: pre-screened, dependable talent in seven business days with zero upfront retainer fees."
        </div>
        <div class="contact-info">
          <span>🌐 jsmintegratedservices.com</span>
          <span>📞 +91 90808 63448</span>
        </div>
      \`;
      drawVikram(ctx, 760, 780, 1.4, "triumphant", 0);
      drawJSMMediator(ctx, 320, 780, 1.4, 0);
    }
    else if (s === 8) {
      uiContent.innerHTML = \`
        <div class="badge-tag" style="background: #E5A93C20; border: 2px solid #E5A93C; color: #E5A93C;">CONNECT WITH JSM TODAY</div>
        <div class="headline">DROP YOUR COMMENT BELOW</div>
        <div class="subheadline">Connecting talent with growing companies across India.</div>
        <div style="display: flex; gap: 30px; margin-top: 680px;">
          <div class="floating-card" style="flex: 1; border-color: #10B981;">
            <div style="font-size: 22px; font-weight: 800; color: #10B981; margin-bottom: 8px;">JOB SEEKERS</div>
            <div style="font-size: 34px; font-weight: 900; color: #FFFFFF;">Comment "JOB"</div>
            <div style="font-size: 18px; color: #94A3B8; margin-top: 5px;">+ your role & city</div>
          </div>
          <div class="floating-card" style="flex: 1; border-color: #38BDF8;">
            <div style="font-size: 22px; font-weight: 800; color: #38BDF8; margin-bottom: 8px;">COMPANIES</div>
            <div style="font-size: 34px; font-weight: 900; color: #FFFFFF;">Comment "HIRE"</div>
            <div style="font-size: 18px; color: #94A3B8; margin-top: 5px;">Get candidates in 7 days</div>
          </div>
        </div>
      \`;
      uiFooter.innerHTML = \`
        <div class="subtitle-bar" style="border-left: 6px solid #E5A93C;">
          "If you are looking for a job, comment JOB with your city. If you are a company hiring, comment HIRE to get talent this week."
        </div>
        <div class="contact-info">
          <span>🌐 jsmintegratedservices.com</span>
          <span>📞 +91 90808 63448</span>
          <span>📍 Tamil Nadu · Karnataka · India</span>
        </div>
      \`;
      // All three characters together!
      drawRahul(ctx, 230, 800, 1.25, "celebrating", 0);
      drawJSMMediator(ctx, 540, 770, 1.4, 0);
      drawVikram(ctx, 850, 800, 1.25, "triumphant", 0);
    }
  </script>
</body>
</html>`;
}

async function run() {
  console.log("Launching Chromium to render all 8 animated character story scenes...");
  const browser = await chromium.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true
  });
  for (let i = 1; i <= 8; i++) {
    const page = await browser.newPage({
      viewport: { width: 1080, height: 1920 }
    });
    const html = getSceneHtml(i);
    await page.setContent(html, { waitUntil: 'load' });
    await page.waitForTimeout(200);
    const imgPath = path.join(OUT_DIR, `scene_${i}.png`);
    await page.screenshot({ path: imgPath, type: 'png' });
    await page.close();
    console.log(`✓ Rendered Scene ${i} with animated character cast -> ${imgPath}`);
  }

  // Compile with ffmpeg
  const SCENE_DURATIONS = [
    { id: 1, dur: 6.95 },
    { id: 2, dur: 6.95 },
    { id: 3, dur: 8.25 },
    { id: 4, dur: 4.53 },
    { id: 5, dur: 7.97 },
    { id: 6, dur: 7.75 },
    { id: 7, dur: 7.46 },
    { id: 8, dur: 9.35 }
  ];

  const AUDIO_FILE = '/tmp/jsm_bridge_mix.wav';
  const CONCAT_LIST = '/tmp/concat_character_scenes.txt';
  const FINAL_MP4 = path.resolve('public/videos/jsm-talent-bridge-reel.mp4');
  const POSTER_JPG = path.resolve('public/videos/poster-bridge.jpg');

  let concatContent = '';
  for (const s of SCENE_DURATIONS) {
    const imgPath = path.join(OUT_DIR, `scene_${s.id}.png`);
    concatContent += `file '${imgPath}'\nduration ${s.dur}\n`;
  }
  const lastImg = path.join(OUT_DIR, `scene_${SCENE_DURATIONS[SCENE_DURATIONS.length - 1].id}.png`);
  concatContent += `file '${lastImg}'\n`;

  fs.writeFileSync(CONCAT_LIST, concatContent);

  console.log("Encoding video with character animations & audio mix via ffmpeg...");
  const cmd = `ffmpeg -y -f concat -safe 0 -i ${CONCAT_LIST} -i ${AUDIO_FILE} ` +
    `-c:v libx264 -preset fast -crf 18 -pix_fmt yuv420p -r 24 ` +
    `-c:a aac -b:a 192k -shortest ` +
    `"${FINAL_MP4}"`;

  execSync(cmd, { stdio: 'inherit' });

  // Extract poster from Scene 1
  execSync(`ffmpeg -y -i "${FINAL_MP4}" -ss 00:00:03 -vframes 1 -q:v 2 "${POSTER_JPG}"`, { stdio: 'inherit' });

  console.log("✓ Character Reel successfully generated at:", FINAL_MP4);
  console.log("✓ Poster saved at:", POSTER_JPG);
}

run().catch(console.error);
