#!/usr/bin/env node

/**
 * JSM Integrated Services - Telegram Broadcast & Community Engagement Engine
 * 
 * Automatically posts daily executive talent briefings, market hiring benchmarks,
 * and latest blog articles to Telegram Channels & Groups to attract senior candidates
 * and hiring employers for JSM Integrated Services.
 * 
 * Usage:
 *   node scripts/telegram-broadcast.mjs [options]
 * 
 * Options:
 *   --latest-article    Broadcast the most recent published blog post
 *   --spotlight         Broadcast executive role spotlight (₹12L–₹1Cr)
 *   --commercials       Broadcast 100% contingency fee model guarantee
 *   --dry-run           Preview formatted broadcast message without sending to Telegram
 */

import fs from "fs";
import path from "path";

const ROOT_DIR = process.cwd();
const MANIFEST_PATH = path.join(ROOT_DIR, "content", "blog", "posts-manifest.json");
const TELEGRAM_API = "https://api.telegram.org";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
// Target can be a channel (e.g., @jsm_careers or -100xxxxxxxxxx) or a group ID
const TARGET_CHAT_ID =
  process.env.TELEGRAM_CHANNEL_ID ||
  process.env.TELEGRAM_GROUP_ID ||
  process.env.TELEGRAM_CHAT_ID;

const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");
const forceLatest = args.includes("--latest-article");
const forceSpotlight = args.includes("--spotlight");
const forceCommercials = args.includes("--commercials");

/**
 * Rotation topics for daily broadcasts
 */
const BROADCAST_TEMPLATES = [
  {
    title: "🎯 Executive Talent Spotlight: VP Operations & Plant Leadership (₹25L–₹50L)",
    text: `*🎯 Executive Talent Spotlight: Operations & Plant Leadership*\n\n` +
      `Manufacturing and engineering plants across *Tamil Nadu, Karnataka, and Maharashtra* are actively securing high-impact leadership for facility expansions.\n\n` +
      `*Positions currently in demand:*\n` +
      `• Vice President Operations & Plant Directors\n` +
      `• Head of Precision Engineering & Quality Assurance\n` +
      `• Supply Chain & Multi-State Logistics Heads\n\n` +
      `*Why Enterprise Employers Partner with JSM Integrated Services:*\n` +
      `✅ *Zero Upfront Retainers* — 100% pure contingency success model\n` +
      `✅ *3 Vetted Finalists* delivered within 7 business days\n` +
      `✅ *90-Day Free Replacement Policy*\n` +
      `✅ Confidential talent mapping across South & West India\n\n` +
      `Are you hiring leadership or exploring confidential career transitions? Connect with our executive desk below.`,
    buttons: [
      [
        { text: "💼 Hire Senior Talent", url: "https://www.jsmintegratedservices.com/#enquiry" },
        { text: "📄 Submit Profile", url: "https://www.jsmintegratedservices.com/#enquiry" }
      ],
      [
        { text: "🌐 Visit JSM Website", url: "https://www.jsmintegratedservices.com" },
        { text: "📞 Direct Desk Hotline", url: "https://wa.me/919080863448?text=Hello%20JSM%20Talent%20Desk" }
      ]
    ]
  },
  {
    title: "📊 The Contingency Mediation Model: Zero Upfront Retainers for Executive Hiring",
    text: `*📊 Traditional Executive Retainers vs. JSM Pure Mediation*\n\n` +
      `Why pay 30% to 50% non-refundable retainers before seeing a single verified candidate?\n\n` +
      `At *JSM Integrated Services*, we align 100% with your hiring success:\n\n` +
      `1️⃣ *Advance Retainer:* ₹0 (Zero financial risk during sourcing)\n` +
      `2️⃣ *Placement Fee:* Standard percentage invoiced strictly on Day 1 of candidate onboarding\n` +
      `3️⃣ *Replacement Warranty:* 90-day free candidate replacement guarantee\n` +
      `4️⃣ *Focus Band:* ₹12 LPA to ₹1 Cr leadership roles\n` +
      `5️⃣ *State Footprint:* Tamil Nadu, Karnataka, Maharashtra, Delhi NCR, Gujarat, Madhya Pradesh\n\n` +
      `Calculate your placement fee with our interactive simulator:`,
    buttons: [
      [
        { text: "💰 Calculate Placement Fee", url: "https://www.jsmintegratedservices.com/#fee-calculator" },
        { text: "💼 Submit Hiring Brief", url: "https://www.jsmintegratedservices.com/#enquiry" }
      ],
      [
        { text: "🌐 Explore Practice Areas", url: "https://www.jsmintegratedservices.com/#services" }
      ]
    ]
  },
  {
    title: "🚀 Technical & Engineering Leadership in ₹12 LPA to ₹1 Cr Bands",
    text: `*🚀 Sourcing High-Caliber Technical & CXO Talent*\n\n` +
      `Finding proven leadership talent in enterprise technology, automotive systems, and advanced manufacturing requires discrete, specialized mediation.\n\n` +
      `*Leadership Bands Brokered by JSM:*\n` +
      `• *Mid-Senior (₹12L–₹25L):* Technical Architects, Plant Managers, Finance Controllers\n` +
      `• *Functional Heads (₹25L–₹50L):* CTOs, VP Engineering, Legal Heads, CHROs\n` +
      `• *C-Suite (₹50L–₹1 Cr):* Managing Directors, COOs, Chief Executives\n\n` +
      `Join our growing network of senior executives and enterprise hiring managers:`,
    buttons: [
      [
        { text: "📄 Submit Candidate Resume", url: "https://www.jsmintegratedservices.com/#enquiry" },
        { text: "💼 Hire Leadership", url: "https://www.jsmintegratedservices.com/#enquiry" }
      ],
      [
        { text: "📞 Contact Desk (+91 90808 63448)", url: "https://wa.me/919080863448" }
      ]
    ]
  }
];

/**
 * Resolves content to broadcast
 */
function resolveBroadcastContent() {
  // If latest article requested or exists in manifest
  if (forceLatest || (!forceSpotlight && !forceCommercials && fs.existsSync(MANIFEST_PATH))) {
    try {
      const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
      if (manifest.posts && manifest.posts.length > 0) {
        const latest = manifest.posts[manifest.posts.length - 1];
        return {
          title: latest.title,
          text: `📰 *NEW INDUSTRY INTELLIGENCE & TALENT BRIEFING*\n\n` +
            `*${latest.title}*\n\n` +
            `${latest.excerpt || "Read our latest operational briefing on executive talent mediation, statutory compliance, and leadership sourcing across India's industrial corridors."}\n\n` +
            `*Key Focus:* ${latest.category} &bull; ${latest.readTime || "5 min read"}\n` +
            `*Target Corridors:* South & Western Industrial Belts\n\n` +
            `Read the complete publication and connect with our recruitment desk:`,
          buttons: [
            [
              { text: "📖 Read Full Article", url: `https://www.jsmintegratedservices.com/blog/${latest.slug}` },
              { text: "💼 Hire Senior Talent", url: "https://www.jsmintegratedservices.com/#enquiry" }
            ],
            [
              { text: "🌐 Visit JSM Website", url: "https://www.jsmintegratedservices.com" },
              { text: "📞 Call +91 90808 63448", url: "https://wa.me/919080863448" }
            ]
          ]
        };
      }
    } catch (e) {
      console.warn("Could not parse manifest, falling back to template:", e.message);
    }
  }

  if (forceCommercials) {
    return BROADCAST_TEMPLATES[1];
  }

  // Rotate based on day of month
  const day = new Date().getDate();
  return BROADCAST_TEMPLATES[day % BROADCAST_TEMPLATES.length];
}

async function main() {
  console.log("============================================================");
  console.log("   JSM INTEGRATED SERVICES — TELEGRAM BROADCAST ENGINE     ");
  console.log("============================================================");

  const content = resolveBroadcastContent();

  console.log("\n📝 Broadcast Message Preview:");
  console.log("------------------------------------------------------------");
  console.log(content.text);
  console.log("------------------------------------------------------------");

  if (isDryRun) {
    console.log("\n[DRY RUN] Skipping actual Telegram API dispatch.");
    process.exit(0);
  }

  if (!BOT_TOKEN) {
    console.warn("\n⚠️ TELEGRAM_BOT_TOKEN is not set in environment.");
    console.log("   Please set TELEGRAM_BOT_TOKEN to broadcast live messages.");
    process.exit(0);
  }

  if (!TARGET_CHAT_ID) {
    console.warn("\n⚠️ Neither TELEGRAM_CHANNEL_ID nor TELEGRAM_CHAT_ID is set.");
    console.log("   Please set your Telegram channel username or group ID.");
    process.exit(0);
  }

  try {
    console.log(`\n🚀 Dispatching broadcast to target chat ID: ${TARGET_CHAT_ID}...`);
    const res = await fetch(`${TELEGRAM_API}/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TARGET_CHAT_ID,
        text: content.text,
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: content.buttons,
        },
      }),
    });

    const data = await res.json();
    if (data.ok) {
      console.log("✅ Broadcast message published successfully to Telegram!");
      console.log(`   Message ID: ${data.result.message_id}`);
    } else {
      console.error("❌ Telegram API returned an error:", data.description);
    }
  } catch (err) {
    console.error("❌ Network error connecting to Telegram API:", err.message);
  }
}

main();
