#!/usr/bin/env node

/**
 * JSM Integrated Services — Automated Daily Social Media Dispatch Engine
 * 
 * Prepares and dispatches multi-platform viral Reel payloads:
 * - Instagram Reels (Hook within 125 chars, SEO keywords, 'Comment RETAINER' trigger, 5 hashtags)
 * - Facebook Reels (Full narrative format, executive contact, clickable links)
 * - YouTube Shorts (High CTR title, chapter breakdown, search tags)
 * 
 * Sends payload to Make.com Webhook (or multi-platform social publisher endpoint).
 */

import https from 'node:https';
import http from 'node:http';
import { URL } from 'node:url';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jsmintegratedservices.com';
const WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL || process.env.SOCIAL_WEBHOOK_URL;

// Algorithmic Viral Distribution Copy
const SOCIAL_PAYLOAD = {
  service: "JSM Integrated Services",
  brand: "Executive Talent Acquisition Desk",
  asset: {
    video_url: `${BASE_URL}/videos/jsm-contingency-reel.mp4`,
    poster_url: `${BASE_URL}/videos/poster.jpg`,
    aspect_ratio: "9:16",
    duration_seconds: 52.0,
    title: "Never Pay 33% Upfront: The Executive Search Retainer Trap"
  },
  
  // 1. INSTAGRAM REELS COPY (Strictly formatted per ig-caption & ig-reel rules)
  // - First 125 chars: Hook visible before the "... more" tap
  // - Body: Search terms for IG SEO (plant head recruitment, automotive manufacturing, Sriperumbudur)
  // - Single Ask: One keyword comment trigger ("Comment RETAINER") to boost algorithmic velocity
  // - Max 5 tags (platform limit compliance)
  instagram: {
    caption: `Never pay a 33% upfront retainer before candidate proof. Here is what happened to an auto plant in Tamil Nadu when they did:

When Rajesh's Plant Head resigned unexpectedly, his Tier-1 auto-components factory began losing ₹35,000 every single day in unrecovered throughput.

A traditional executive search agency demanded a ₹10 Lakh advance retainer. 60 days passed. Zero interview-ready shortlists. Capital trapped.

Then Rajesh shifted to JSM Integrated Services:
• Pure Contingency — ₹0 Upfront Retainer
• 168-Hour Calibrated Candidate Sprint
• Audited Telemetry — +28% OEE & -14% Scrap Rate Track Record
• 90-Day Executive Replacement Shield [CONFIRM: fee %]

His new Plant Head was verified, interviewed, and onboarded within 30 days.

Comment 'RETAINER' below and we'll DM you our 2026 Executive Search Risk Audit Checklist.

#ExecutiveSearch #ManufacturingIndia #PlantHead #LeadershipHiring #AutoComponents`,
    share_to_feed: true,
    audio_name: "Original Audio - JSM Executive Search"
  },

  // 2. FACEBOOK REELS & PAGE POST COPY
  facebook: {
    title: "Why an Automotive Plant in Sriperumbudur Lost ₹35,000/Day to a Headhunter Trap",
    description: `Never pay a 33% upfront non-refundable retainer before candidate verification.

When an automotive Tier-1 supplier loses its Plant Head, the factory bleeds operating capital every single hour. In this case study, see how Rajesh avoided the 60-day retained search trap and onboarded a verified operational leader in 30 days with JSM Integrated Services.

100% Success-Based Contingency Search Desk:
• Zero Upfront Retainer Fees
• 7 Business Day Candidate Shortlist
• 90-Day Placement Replacement Shield [CONFIRM: fee %]

Mandate Inquiries & Executive Intake:
📞 Direct Desk: +91 90808 63448
🌐 Official Portal: https://www.jsmintegratedservices.com
📍 Focus States: Tamil Nadu · Karnataka · Maharashtra · Gujarat · Delhi NCR · Madhya Pradesh`,
  },

  // 3. YOUTUBE SHORTS COPY
  youtube: {
    title: "Never Pay 33% Upfront to Headhunters! (The Auto Plant Crisis) #Shorts",
    description: `What happens when an automotive plant loses its Plant Head and gets trapped by a 33% upfront retainer firm? 

Discover how JSM Integrated Services deployed an executive contingency sprint to onboard a verified Plant Head in 30 days with zero upfront risk.

📊 Key Highlights:
0:00 The 33% Upfront Retainer Trap
0:06 Meet Rajesh (Tier-1 Auto Plant MD)
0:11 The ₹35,000/Day Throughput Bleed
0:20 60 Days Trapped with Traditional Agencies
0:27 The JSM Pure Contingency Pivot
0:33 3 Calibrated Dossiers (+28% OEE Verified)
0:40 Onboarded in 30 Days & 90-Day Shield
0:46 Calibrate Your Executive Search

🔗 Official Website: https://www.jsmintegratedservices.com
📞 Executive Desk: +91 90808 63448
🏢 JSM Integrated Services — Executive Talent Acquisition Desk

#Shorts #ExecutiveSearch #Manufacturing #Recruitment #Leadership #FactoryOperations`,
    tags: [
      "Executive Search",
      "Plant Head Recruitment",
      "Manufacturing India",
      "Automotive Components",
      "Leadership Hiring",
      "JSM Integrated Services",
      "Recruitment Agency"
    ],
    category_id: "27", // Education / Business
    privacy_status: "public"
  },

  timestamp: new Date().toISOString()
};

function postToWebhook(urlStr, data) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(urlStr);
    const postData = JSON.stringify(data);
    const client = parsed.protocol === 'https:' ? https : http;

    const req = client.request(parsed, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'JSM-Social-Dispatch-Bot/1.0'
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ status: res.statusCode, body });
        } else {
          reject(new Error(`Webhook returned HTTP ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function main() {
  console.log("======================================================================");
  console.log("  JSM INTEGRATED SERVICES — DAILY SOCIAL REEL DISPATCH ENGINE");
  console.log("======================================================================");
  console.log(`Target Video CDN:   ${SOCIAL_PAYLOAD.asset.video_url}`);
  console.log(`Target Poster CDN:  ${SOCIAL_PAYLOAD.asset.poster_url}`);
  console.log(`Instagram Hook:     "${SOCIAL_PAYLOAD.instagram.caption.slice(0, 118)}..."`);
  console.log(`YouTube Title:      "${SOCIAL_PAYLOAD.youtube.title}"`);
  console.log("----------------------------------------------------------------------");

  if (!WEBHOOK_URL) {
    console.log("ℹ️  NOTICE: MAKE_WEBHOOK_URL is not set yet in environment.");
    console.log("    Displaying ready-to-dispatch payload preview (Dry-Run Mode).");
    console.log("\n[Sample Payload]:");
    console.log(JSON.stringify(SOCIAL_PAYLOAD, null, 2));
    console.log("\n✓ To activate live auto-posting, set MAKE_WEBHOOK_URL in your repo secrets.");
    return;
  }

  console.log(`🚀 Dispatching viral payload to Make.com Webhook...`);
  try {
    const result = await postToWebhook(WEBHOOK_URL, SOCIAL_PAYLOAD);
    console.log(`✓ Webhook Accepted Payload! Status: ${result.status}`);
    console.log(`  Response: ${result.body || "OK"}`);
    console.log("✓ Successfully triggered Instagram, Facebook, and YouTube publishing sequence.");
  } catch (err) {
    console.error(`✗ Failed to dispatch to webhook: ${err.message}`);
    process.exit(1);
  }
}

main();
