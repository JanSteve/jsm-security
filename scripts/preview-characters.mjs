import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const OUT_DIR = '/tmp/jsm_animated_chars';
fs.mkdirSync(OUT_DIR, { recursive: true });

function generateCharacterHtml() {
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
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;
    }
    #canvas {
      width: 1080px;
      height: 1920px;
      display: block;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="1080" height="1920"></canvas>
  <script>
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // =========================================================================
    // 1. CHARACTER: RAHUL (JOB SEEKER)
    // =========================================================================
    function drawRahul(c, x, y, scale = 1.0, emotion = "frustrated", t = 0) {
      c.save();
      c.translate(x, y);
      c.scale(scale, scale);

      const breathe = Math.sin(t * 4) * 3;
      c.translate(0, breathe);

      // Torso - Casual Teal Hoodie
      c.fillStyle = "#0F766E";
      c.strokeStyle = "#0E1116";
      c.lineWidth = 4;
      c.beginPath();
      c.roundRect(-50, 50, 100, 120, 20);
      c.fill(); c.stroke();

      // Hoodie Pocket & Cords
      c.fillStyle = "#115E59";
      c.beginPath();
      c.roundRect(-30, 110, 60, 45, 10);
      c.fill(); c.stroke();

      c.strokeStyle = "#FFFFFF";
      c.lineWidth = 3;
      c.beginPath();
      c.moveTo(-10, 55); c.lineTo(-10, 85);
      c.moveTo(10, 55); c.lineTo(10, 85);
      c.stroke();

      // Arms based on emotion
      c.strokeStyle = "#0E1116";
      c.fillStyle = "#0F766E";
      c.lineWidth = 4;

      if (emotion === "frustrated") {
        // Hands holding head in despair
        c.beginPath();
        c.moveTo(-45, 65); c.lineTo(-75, 20); c.lineTo(-38, -5);
        c.stroke();
        c.beginPath();
        c.moveTo(45, 65); c.lineTo(75, 20); c.lineTo(38, -5);
        c.stroke();
        c.fillStyle = "#FAD9B5";
        c.beginPath(); c.arc(-38, -5, 14, 0, Math.PI * 2); c.fill(); c.stroke();
        c.beginPath(); c.arc(38, -5, 14, 0, Math.PI * 2); c.fill(); c.stroke();
      } else if (emotion === "celebrating") {
        // Arms high up celebrating with offer letter!
        c.beginPath();
        c.moveTo(-45, 65); c.lineTo(-85, 0); c.lineTo(-75, -50);
        c.stroke();
        c.beginPath();
        c.moveTo(45, 65); c.lineTo(85, 0); c.lineTo(75, -50);
        c.stroke();
        c.fillStyle = "#FAD9B5";
        c.beginPath(); c.arc(-75, -50, 14, 0, Math.PI * 2); c.fill(); c.stroke();
        c.beginPath(); c.arc(75, -50, 14, 0, Math.PI * 2); c.fill(); c.stroke();

        // Offer Letter in hand
        c.save();
        c.translate(85, -60);
        c.rotate(0.2);
        c.fillStyle = "#FFFFFF";
        c.strokeStyle = "#E5A93C";
        c.lineWidth = 3;
        c.fillRect(-20, -30, 40, 55);
        c.strokeRect(-20, -30, 40, 55);
        c.fillStyle = "#10B981";
        c.font = "bold 9px sans-serif";
        c.textAlign = "center";
        c.fillText("OFFER", 0, -12);
        c.fillText("LETTER", 0, 0);
        c.fillStyle = "#E5A93C";
        c.beginPath(); c.arc(0, 14, 6, 0, Math.PI * 2); c.fill();
        c.restore();
      } else {
        // Holding laptop
        c.beginPath();
        c.moveTo(-45, 65); c.lineTo(-70, 110); c.lineTo(-30, 120);
        c.stroke();
        c.beginPath();
        c.moveTo(45, 65); c.lineTo(70, 110); c.lineTo(30, 120);
        c.stroke();
      }

      // Neck
      c.fillStyle = "#FAD9B5";
      c.strokeStyle = "#0E1116";
      c.lineWidth = 4;
      c.beginPath(); c.rect(-15, 30, 30, 25); c.fill(); c.stroke();

      // Head
      c.beginPath();
      c.roundRect(-40, -40, 80, 75, 22);
      c.fill(); c.stroke();

      // Modern stylish hair
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

      // Eyes & Mouth based on emotion
      if (emotion === "frustrated") {
        // Sad squinting eyes
        c.strokeStyle = "#0E1116";
        c.lineWidth = 3;
        c.beginPath();
        c.moveTo(-25, -5); c.lineTo(-13, -5);
        c.moveTo(13, -5); c.lineTo(25, -5);
        c.stroke();

        // Downward curved mouth
        c.beginPath();
        c.arc(0, 22, 12, Math.PI * 1.2, Math.PI * 1.8);
        c.stroke();

        // Sweat droplet of frustration
        c.fillStyle = "#38BDF8";
        c.beginPath();
        c.moveTo(35, -20);
        c.quadraticCurveTo(40, -10, 35, -5);
        c.quadraticCurveTo(30, -10, 35, -20);
        c.fill();
      } else if (emotion === "celebrating") {
        // Big happy smiling eyes
        c.strokeStyle = "#0E1116";
        c.lineWidth = 3;
        c.beginPath();
        c.arc(-19, -5, 7, Math.PI * 1.1, Math.PI * 1.9); c.stroke();
        c.beginPath();
        c.arc(19, -5, 7, Math.PI * 1.1, Math.PI * 1.9); c.stroke();

        // Big joyful smile
        c.fillStyle = "#DC2626";
        c.beginPath();
        c.arc(0, 10, 16, 0, Math.PI);
        c.fill(); c.stroke();
        c.fillStyle = "#FFFFFF";
        c.fillRect(-10, 10, 20, 6);
      }
      c.restore();
    }

    // =========================================================================
    // 2. CHARACTER: VIKRAM (FOUNDER / BUSINESS OWNER)
    // =========================================================================
    function drawVikram(c, x, y, scale = 1.0, emotion = "stressed", t = 0) {
      c.save();
      c.translate(x, y);
      c.scale(scale, scale);

      const breathe = Math.sin(t * 3.5) * 3;
      c.translate(0, breathe);

      // Torso - Executive Blazer & Tie
      c.fillStyle = "#1E293B"; // Dark Navy Suit
      c.strokeStyle = "#0E1116";
      c.lineWidth = 4;
      c.beginPath();
      c.roundRect(-55, 50, 110, 130, 16);
      c.fill(); c.stroke();

      // White Shirt & Red Executive Tie
      c.fillStyle = "#FFFFFF";
      c.beginPath();
      c.moveTo(-20, 50); c.lineTo(0, 75); c.lineTo(20, 50);
      c.fill(); c.stroke();

      c.fillStyle = "#DC2626";
      c.beginPath();
      c.moveTo(-7, 70); c.lineTo(7, 70); c.lineTo(10, 130); c.lineTo(0, 145); c.lineTo(-10, 130);
      c.fill(); c.stroke();

      // Arms based on emotion
      c.strokeStyle = "#0E1116";
      c.fillStyle = "#1E293B";
      c.lineWidth = 4;

      if (emotion === "stressed") {
        // Holding temples in stress
        c.beginPath();
        c.moveTo(-48, 65); c.lineTo(-80, 20); c.lineTo(-42, -5);
        c.stroke();
        c.beginPath();
        c.moveTo(48, 65); c.lineTo(80, 20); c.lineTo(42, -5);
        c.stroke();
        c.fillStyle = "#E7C19B";
        c.beginPath(); c.arc(-42, -5, 14, 0, Math.PI * 2); c.fill(); c.stroke();
        c.beginPath(); c.arc(42, -5, 14, 0, Math.PI * 2); c.fill(); c.stroke();
      } else if (emotion === "triumphant") {
        // Double thumbs up!
        c.beginPath();
        c.moveTo(-48, 65); c.lineTo(-85, 45); c.lineTo(-80, 10);
        c.stroke();
        c.beginPath();
        c.moveTo(48, 65); c.lineTo(85, 45); c.lineTo(80, 10);
        c.stroke();
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

      c.beginPath();
      c.roundRect(-44, -40, 88, 75, 20);
      c.fill(); c.stroke();

      // Neat side-part hair
      c.fillStyle = "#334155";
      c.beginPath();
      c.moveTo(-46, -15);
      c.quadraticCurveTo(-46, -55, 0, -55);
      c.quadraticCurveTo(46, -55, 46, -15);
      c.quadraticCurveTo(20, -35, 0, -35);
      c.quadraticCurveTo(-20, -35, -46, -15);
      c.fill(); c.stroke();

      // Eyes & Expression
      if (emotion === "stressed") {
        // Angled worried brows
        c.strokeStyle = "#0E1116";
        c.lineWidth = 3.5;
        c.beginPath(); c.moveTo(-30, -22); c.lineTo(-12, -15); c.stroke();
        c.beginPath(); c.moveTo(30, -22); c.lineTo(12, -15); c.stroke();

        c.fillStyle = "#0E1116";
        c.beginPath(); c.arc(-20, -5, 4, 0, Math.PI * 2); c.fill();
        c.beginPath(); c.arc(20, -5, 4, 0, Math.PI * 2); c.fill();

        // Stressed tight mouth
        c.beginPath(); c.moveTo(-15, 18); c.lineTo(15, 18); c.stroke();
      } else if (emotion === "triumphant") {
        // Confident happy eyes
        c.strokeStyle = "#0E1116";
        c.lineWidth = 3;
        c.beginPath(); c.arc(-20, -5, 7, Math.PI * 1.1, Math.PI * 1.9); c.stroke();
        c.beginPath(); c.arc(20, -5, 7, Math.PI * 1.1, Math.PI * 1.9); c.stroke();

        // Big confident smile
        c.fillStyle = "#0E1116";
        c.beginPath(); c.arc(0, 10, 16, 0, Math.PI); c.fill(); c.stroke();
        c.fillStyle = "#FFFFFF";
        c.fillRect(-10, 10, 20, 5);
      }
      c.restore();
    }

    // =========================================================================
    // 3. CHARACTER: JSM MEDIATOR (THE HERO & BRIDGE)
    // =========================================================================
    function drawJSMMediator(c, x, y, scale = 1.0, t = 0) {
      c.save();
      c.translate(x, y);
      c.scale(scale, scale);

      const breathe = Math.sin(t * 3.0) * 3;
      c.translate(0, breathe);

      // Torso - Sleek Charcoal Blazer with Gold Lapel
      c.fillStyle = "#0F172A";
      c.strokeStyle = "#0E1116";
      c.lineWidth = 4;
      c.beginPath();
      c.roundRect(-60, 50, 120, 135, 18);
      c.fill(); c.stroke();

      // Gold Lapel Piping
      c.strokeStyle = "#E5A93C";
      c.lineWidth = 3;
      c.beginPath();
      c.moveTo(-25, 50); c.lineTo(-10, 110);
      c.moveTo(25, 50); c.lineTo(10, 110);
      c.stroke();

      // JSM Eagle Gold Shield Pin
      c.fillStyle = "#E5A93C";
      c.beginPath();
      c.arc(-35, 75, 12, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = "#0F172A";
      c.font = "bold 9px sans-serif";
      c.textAlign = "center";
      c.fillText("JSM", -35, 78);

      // Arms - Holding glowing digital tablet (The Bridge)
      c.strokeStyle = "#0E1116";
      c.lineWidth = 4;
      c.beginPath();
      c.moveTo(-50, 65); c.lineTo(-75, 115); c.lineTo(-25, 125);
      c.stroke();
      c.beginPath();
      c.moveTo(50, 65); c.lineTo(75, 115); c.lineTo(25, 125);
      c.stroke();

      // Glowing Tablet
      c.fillStyle = "#1E293B";
      c.strokeStyle = "#38BDF8";
      c.lineWidth = 3;
      c.fillRect(-45, 110, 90, 65);
      c.strokeRect(-45, 110, 90, 65);

      // Tablet Screen Content (Radar + Match)
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

      c.beginPath();
      c.roundRect(-42, -40, 84, 75, 22);
      c.fill(); c.stroke();

      // Sharp Professional Haircut
      c.fillStyle = "#1E293B";
      c.beginPath();
      c.moveTo(-44, -18);
      c.quadraticCurveTo(-44, -58, 0, -58);
      c.quadraticCurveTo(44, -58, 44, -18);
      c.quadraticCurveTo(20, -38, 0, -38);
      c.quadraticCurveTo(-20, -38, -44, -18);
      c.fill(); c.stroke();

      // Confident, Empathetic Friendly Face
      c.fillStyle = "#0E1116";
      c.beginPath(); c.arc(-18, -4, 4, 0, Math.PI * 2); c.fill();
      c.beginPath(); c.arc(18, -4, 4, 0, Math.PI * 2); c.fill();

      // Warm Smile
      c.strokeStyle = "#0E1116";
      c.lineWidth = 3.5;
      c.beginPath();
      c.arc(0, 10, 14, 0.1 * Math.PI, 0.9 * Math.PI);
      c.stroke();

      c.restore();
    }

    // Render Preview Showcase
    // Scene Title
    ctx.fillStyle = "#E5A93C";
    ctx.font = "bold 32px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("JSM ANIMATED CHARACTER CAST", 540, 200);

    ctx.fillStyle = "#94A3B8";
    ctx.font = "20px sans-serif";
    ctx.fillText("Problem Story Arc: Candidate Struggle vs Employer Crisis -> JSM Solution", 540, 250);

    // Left: Rahul (Frustrated Job Seeker)
    drawRahul(ctx, 240, 600, 1.3, "frustrated", 0);
    ctx.fillStyle = "#EF4444";
    ctx.font = "bold 24px sans-serif";
    ctx.fillText("RAHUL (Job Seeker)", 240, 850);
    ctx.fillStyle = "#94A3B8";
    ctx.font = "18px sans-serif";
    ctx.fillText("Ghosted by 200 Bots", 240, 885);

    // Right: Vikram (Stressed Founder)
    drawVikram(ctx, 840, 600, 1.3, "stressed", 0);
    ctx.fillStyle = "#F59E0B";
    ctx.font = "bold 24px sans-serif";
    ctx.fillText("VIKRAM (Employer)", 840, 850);
    ctx.fillStyle = "#94A3B8";
    ctx.font = "18px sans-serif";
    ctx.fillText("Day-1 Ghosting Nightmare", 840, 885);

    // Center: JSM Mediator
    drawJSMMediator(ctx, 540, 1250, 1.5, 0);
    ctx.fillStyle = "#E5A93C";
    ctx.font = "bold 28px sans-serif";
    ctx.fillText("JSM MEDIATOR", 540, 1550);
    ctx.fillStyle = "#10B981";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText("The Human Bridge · ₹0 Advance Fee", 540, 1590);
  </script>
</body>
</html>`;
}

async function run() {
  console.log("Generating character showcase preview...");
  const browser = await chromium.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true
  });
  const page = await browser.newPage({
    viewport: { width: 1080, height: 1920 }
  });

  const html = generateCharacterHtml();
  await page.setContent(html, { waitUntil: 'load' });
  const previewPath = path.join(OUT_DIR, 'characters_showcase.png');
  await page.screenshot({ path: previewPath, type: 'png' });
  await browser.close();

  console.log("✓ Character showcase rendered to:", previewPath);
}

run().catch(console.error);
