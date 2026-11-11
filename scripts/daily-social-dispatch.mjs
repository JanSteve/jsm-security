#!/usr/bin/env node

/**
 * JSM Integrated Services — Automated Multi-Story Social Dispatch Engine
 * 
 * Features:
 * - 2x Daily Publishing (Morning: 08:45 AM IST | Evening: 07:00 PM IST)
 * - Rotating 7-Story Industrial Crisis & Resolution Matrix
 * - Meta Recommendation Engine SEO Optimization (First 125 chars hook)
 * - Algorithmic Lead Velocity: Specific keyword comment triggers ('RETAINER', 'SCRAP', etc.)
 * - Strict 5-Hashtag rule using top-reach manufacturing and executive tags
 * - Multi-Platform Output: Instagram Reels, Facebook Reels & Page Posts, YouTube Shorts
 */

import https from 'node:https';
import http from 'node:http';
import { URL } from 'node:url';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jsmintegratedservices.com';
const WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL || process.env.SOCIAL_WEBHOOK_URL;

// Parse CLI flags: --slot=morning|evening, --story=0..6, --dry-run
const args = process.argv.slice(2);
const slotArg = args.find(a => a.startsWith('--slot='))?.split('=')[1];
const storyArg = args.find(a => a.startsWith('--story='))?.split('=')[1];
const isDryRun = args.includes('--dry-run');

// Determine current IST hour to choose slot if not specified
function getCurrentSlot() {
  if (slotArg) return slotArg.toLowerCase();
  const now = new Date();
  // IST is UTC + 5:30
  const istHours = (now.getUTCHours() + 5.5) % 24;
  return istHours >= 14 ? 'evening' : 'morning';
}

const CURRENT_SLOT = getCurrentSlot();

// 7-Story Dynamic Industrial Content Matrix
const STORY_MATRIX = [
  {
    id: "auto-plant-bleed",
    topic: "The ₹35,000/Day Unrecovered Throughput Bleed (Sriperumbudur Auto Cluster)",
    video_title: "Never Pay 33% Upfront: The Executive Search Retainer Trap",
    trigger_keyword: "RETAINER",
    instagram_hook: "Never pay a 33% upfront retainer before candidate proof. Here is what happened to an auto plant in Tamil Nadu when they did:",
    instagram_body: `When Rajesh's Plant Head resigned unexpectedly, his Tier-1 auto-components factory in Sriperumbudur began losing ₹35,000 every single day in unrecovered throughput.

A traditional executive search agency demanded a ₹10 Lakh advance retainer. 60 days passed. Zero interview-ready shortlists. Capital trapped.

Then Rajesh shifted to JSM Integrated Services:
• Pure Contingency — ₹0 Upfront Retainer
• 168-Hour Calibrated Candidate Sprint
• Audited Telemetry — +28% OEE & -14% Scrap Rate Track Record
• 90-Day Executive Replacement Shield [CONFIRM: fee %]

His new Plant Head was verified, interviewed, and onboarded within 30 days.

Comment 'RETAINER' below and we'll DM you our 2026 Executive Search Risk Audit Checklist.`,
    instagram_tags: [
      "#ManufacturingIndia",
      "#PlantHead",
      "#ExecutiveSearch",
      "#LeadershipHiring",
      "#AutoComponents"
    ],
    facebook_title: "Why an Automotive Plant in Sriperumbudur Lost ₹35,000/Day to a Headhunter Trap",
    facebook_description: `Never pay a 33% upfront non-refundable retainer before candidate verification.

When an automotive Tier-1 supplier loses its Plant Head, the factory bleeds operating capital every single hour. In this case study, see how Rajesh avoided the 60-day retained search trap and onboarded a verified operational leader in 30 days with JSM Integrated Services.

100% Success-Based Contingency Search Desk:
• Zero Upfront Retainer Fees
• 7 Business Day Candidate Shortlist
• 90-Day Placement Replacement Shield [CONFIRM: fee %]

Mandate Inquiries & Executive Intake:
📞 Direct Desk: +91 90808 63448
🌐 Official Portal: https://www.jsmintegratedservices.com
📍 Focus States: Tamil Nadu · Karnataka · Maharashtra · Gujarat · Delhi NCR · Madhya Pradesh`,
    youtube_title: "Never Pay 33% Upfront to Headhunters! (The Auto Plant Crisis) #Shorts"
  },

  {
    id: "cnc-scrap-rate-crisis",
    topic: "The 14% CNC Scrap Rate & Calibration Crisis (Coimbatore Precision Cluster)",
    video_title: "How a 14% Scrap Rate Spike Threatened a Tier-1 Precision Contract",
    trigger_keyword: "SCRAP",
    instagram_hook: "When scrap rate spikes to 14%, standard recruiters send paper resumes. Here is how a Coimbatore factory fixed it in 30 days:",
    instagram_body: `A precision automotive machining plant in Coimbatore faced an OEM quality audit penalty after scrap rates climbed past 14% on high-speed CNC lines.

Traditional recruiters forwarded 40 generic resumes with zero shop-floor validation. Three weeks lost.

JSM Integrated Services deployed an operational talent calibration sprint:
• Zero Upfront Retainer Fees
• Six Sigma Black Belt Operations Director identified with powertrain telemetry expertise
• Candidate verified on actual past line performance: -11.9% scrap reduction track record
• Fast-track intake & placement within 30 business days

Result: Line scrap rate dropped to 2.1% in the first quarter post-onboarding.

Comment 'SCRAP' below and we'll send our Shop-Floor Leadership Calibration Framework directly to your inbox.`,
    instagram_tags: [
      "#OperationsManagement",
      "#ManufacturingIndia",
      "#IndustrialEngineering",
      "#SmartManufacturing",
      "#IndiaManufacturing"
    ],
    facebook_title: "How a Coimbatore Precision Machining Plant Resolved a 14% Scrap Rate Crisis",
    facebook_description: `When component scrap rates hit double digits, the issue is rarely machinery — it is operational leadership calibration.

Discover how a Tier-1 precision component manufacturer in Coimbatore partnered with JSM Integrated Services to onboard an audited Operations Director who reduced line scrap from 14% to 2.1%.

JSM Executive Contingency Search:
• ₹0 Capital Risk — Pure Success-Based Retainer
• 168-Hour Initial Calibrated Shortlist
• 90-Day Executive Replacement Shield [CONFIRM: fee %]

Executive Hiring Intake:
📞 Call Desk: +91 90808 63448
🌐 Official Portal: https://www.jsmintegratedservices.com
📍 Serving Industrial Hubs across India`,
    youtube_title: "How to Fix a 14% Scrap Rate Crisis with Calibrated Leadership #Shorts"
  },

  {
    id: "ev-expansion-deadline",
    topic: "The 168-Hour EV Powertrain Launch Sprint (Hosur-Bangalore Industrial Belt)",
    video_title: "45 Days to EV Plant Launch: When the VP Manufacturing Resigns",
    trigger_keyword: "EXPANSION",
    instagram_hook: "45 days before a major EV plant launch, the VP Manufacturing resigned. Here is how the MD avoided a production shutdown:",
    instagram_body: `An electric vehicle battery and powertrain manufacturer in Hosur faced a severe crisis: their VP Manufacturing resigned right before commercial commissioning.

A traditional 90-day search cycle meant missing the OEM SOP deadline and incurring steep contractual penalties.

They mandated JSM Integrated Services' Executive Contingency Desk:
• Active mapped executive network across EV & automotive manufacturing corridors
• 3 interview-ready calibrated candidate dossiers delivered in 168 hours
• Full telemetry background check (+32% line throughput record)
• Immediate offer release and joining negotiated in 21 days

Commercial line commissioning launched on schedule with zero downtime.

Comment 'EXPANSION' below to receive our 2026 Industrial Expansion Hiring Playbook.`,
    instagram_tags: [
      "#Tier1Supplier",
      "#EVManufacturing",
      "#ManufacturingLeadership",
      "#CXOHiring",
      "#ExecutiveSearch"
    ],
    facebook_title: "Case Study: 45 Days to EV Plant Launch — The 168-Hour Leadership Sprint",
    facebook_description: `Missing a commercial production SOP in automotive manufacturing can cost Crores in OEM contract penalties.

When an EV battery plant in the Hosur-Bangalore corridor lost its manufacturing head 45 days before launch, JSM Integrated Services delivered 3 fully calibrated executive dossiers within 7 days on 100% contingency.

Executive Search Built for Manufacturing:
• 168-Hour Candidate Sprint
• Zero Upfront Retainer Fees
• 90-Day Replacement Guarantee [CONFIRM: fee %]

Direct Inquiries:
📞 Phone: +91 90808 63448
🌐 Web: https://www.jsmintegratedservices.com`,
    youtube_title: "45 Days to EV Plant Launch: The Emergency Leadership Sprint #Shorts"
  },

  {
    id: "placement-guarantee-shield",
    topic: "The 90-Day Shield vs The ₹12L Ghosting Trap (Pune Automotive Belt)",
    video_title: "Why Traditional Headhunter Retainers Leave Manufacturing MDs Trapped",
    trigger_keyword: "GUARANTEE",
    instagram_hook: "A Pune factory paid a ₹12 Lakh upfront retainer. The candidate quit in 40 days, and the recruiter ghosted. Here is the shield:",
    instagram_body: `Paying a 33% upfront retainer is one of the highest financial risks in manufacturing recruitment.

An automotive chassis manufacturer in Pune paid ₹12 Lakhs to a retained search firm. Their newly hired General Manager resigned after just 40 days. The agency refused to replace the candidate without an additional search fee.

JSM Integrated Services operates on a fundamentally different standard:
• 100% Pure Contingency — You pay zero until candidate verification and offer acceptance
• Legally Binding 90-Day Executive Replacement Shield [CONFIRM: fee %]
• Continuous retention monitoring during the critical first 90 days on-site

Never put company capital at risk for unverified candidate promises.

Comment 'GUARANTEE' below and we'll DM you our Retained vs Contingency Search Risk Comparison.`,
    instagram_tags: [
      "#LeadershipHiring",
      "#ExecutiveSearch",
      "#IndiaBusiness",
      "#PlantHead",
      "#ManufacturingIndia"
    ],
    facebook_title: "Why Manufacturing MDs are Replacing Retained Headhunters with JSM Contingency",
    facebook_description: `Why should an industrial enterprise pay 33% of an executive's salary before seeing a single verified candidate?

Learn how JSM Integrated Services protects manufacturing enterprises with our 100% Success-Based Contingency Search Desk and comprehensive 90-Day Placement Replacement Shield.

Our Commitment:
• ₹0 Advance Invoices
• 7-Day Candidate Delivery
• 90-Day Shield on All Placements [CONFIRM: fee %]

Mandate Intake:
📞 Direct Line: +91 90808 63448
🌐 Visit: https://www.jsmintegratedservices.com`,
    youtube_title: "Why 33% Upfront Headhunter Retainers Are a Trap for Manufacturing #Shorts"
  },

  {
    id: "maintenance-reliability-crisis",
    topic: "The Night-Shift Breakdown & Unscheduled Downtime Trap (Gujarat Chemical & Heavy Engineering)",
    video_title: "How Unplanned Night-Shift Downtime Cost an Industrial Plant ₹1.2 Cr/Month",
    trigger_keyword: "DOWNTIME",
    instagram_hook: "Three unpredicted plant trips per week were costing ₹1.2 Cr/month. Here is how a certified Reliability Head solved it:",
    instagram_body: `Unscheduled equipment breakdowns during the third shift are the silent killer of factory margins.

A continuous-process chemical manufacturing plant in Gujarat suffered repeated line stoppages due to reactive maintenance protocols, resulting in ₹1.2 Crore per month in unrecovered production losses.

JSM Integrated Services executed a targeted talent search:
• Sourced a veteran Head of Maintenance & Reliability from high-reliability automotive powertrain
• Candidate verified in predictive vibration telemetry & TPM protocols
• Zero upfront placement retainer
• Successfully onboarded within 35 days

Result: Zero unplanned line trips in the subsequent 90 days, recovering ₹3.6 Crore in operational uptime.

Comment 'DOWNTIME' below to get our Plant Maintenance Leadership Assessment Framework.`,
    instagram_tags: [
      "#IndustrialLeadership",
      "#PlantMaintenance",
      "#SmartManufacturing",
      "#ManufacturingIndia",
      "#OperationsManagement"
    ],
    facebook_title: "Recovering ₹1.2 Crore/Month: The Impact of Certified Plant Reliability Leadership",
    facebook_description: `Unplanned factory downtime is an operational failure that starts at the leadership level.

See how JSM Integrated Services sourced a certified Reliability & Plant Maintenance Director who transformed a high-downtime continuous process plant into a zero-unplanned-stoppage facility.

100% Contingency Industrial Recruitment:
• ₹0 Upfront Search Fees
• Pre-Vetted Plant Operations Candidates
• 90-Day Placement Replacement Guarantee [CONFIRM: fee %]

Executive Intake:
📞 Direct Desk: +91 90808 63448
🌐 Portal: https://www.jsmintegratedservices.com`,
    youtube_title: "How to Stop ₹1.2 Cr/Month in Unplanned Factory Downtime #Shorts"
  },

  {
    id: "salary-benchmarking-retention",
    topic: "The Executive Poaching Defense & Compensation Calibration (Oragadam Corridor)",
    video_title: "Why Tier-1 Factories Lose Their Best Plant Leaders to Poaching",
    trigger_keyword: "BENCHMARK",
    instagram_hook: "Losing your best Plant Managers to competitor poaching? Here is the salary calibration strategy that stops executive turnover:",
    instagram_body: `When high-performing operational leaders resign unexpectedly, companies often discover their compensation bands were 20% below industrial market reality.

In the fast-growing Oragadam industrial corridor, Tier-1 component makers were bleeding key operations managers to multinational competitors offering misaligned retention packages.

JSM Integrated Services provides enterprise talent calibration:
• Granular regional compensation intelligence across Tamil Nadu, Karnataka & Maharashtra
• Calibrated role bands tailored to OEE accountability and plant scale [CONFIRM: role band]
• Rapid replacement pipelines with verified candidates ready on 30-day notice
• 100% success-based contingency fees

Protect your factory's operational stability with verified leadership benchmarking.

Comment 'BENCHMARK' below and we'll send our 2026 Manufacturing Leadership Salary Index.`,
    instagram_tags: [
      "#CXOHiring",
      "#ManufacturingLeadership",
      "#AutoComponents",
      "#LeadershipHiring",
      "#ExecutiveSearch"
    ],
    facebook_title: "How Tier-1 Industrial Plants Protect Against Competitor Executive Poaching",
    facebook_description: `Operational turnover at the Plant Head or GM Operations level costs up to 150% of the executive's annual salary in lost momentum and line downtime.

Learn how JSM Integrated Services delivers market-calibrated salary benchmarking and rapid contingency executive replacement for manufacturing leaders across India.

Executive Hiring Desk:
• Zero Advance Fees
• 168-Hour Candidate Shortlist
• 90-Day Placement Protection Shield [CONFIRM: fee %]

Inquiries:
📞 Call: +91 90808 63448
🌐 Web: https://www.jsmintegratedservices.com`,
    youtube_title: "Stop Competitors From Poaching Your Best Factory Leaders #Shorts"
  },

  {
    id: "cfo-hiring-roi-math",
    topic: "33% Upfront Retainer vs 100% Pure Contingency — The CFO's Math (Chennai Belt)",
    video_title: "The CFO's Cost Breakdown: Upfront Retainers vs JSM Contingency",
    trigger_keyword: "AUDIT",
    instagram_hook: "A CFO discovered they paid ₹45 Lakhs in upfront retainers for only 1 successful hire. Here is how contingency math protects capital:",
    instagram_body: `A CFO at an automotive Tier-1 supplier audited their 2-year leadership recruitment spend:
• ₹45 Lakhs paid in non-refundable upfront retainers across 3 search agencies
• Only 1 candidate completed probation
• Effective cost-per-hire: ₹45 Lakhs with 6 months of empty leadership seats

They switched their entire industrial talent desk to JSM Integrated Services:
• Capital at Risk: Exactly ₹0
• Fee Structure: 100% Success-Based Contingency [CONFIRM: fee %]
• Quality Check: Candidate interviewed, verified, and onboarded before final fee release
• Safety Shield: 90-day replacement guarantee

Align executive recruitment risk where it belongs: on performance, not promises.

Comment 'AUDIT' below to get our Executive Search Cost & Risk Calculator.`,
    instagram_tags: [
      "#ManufacturingIndia",
      "#ExecutiveSearch",
      "#PlantHead",
      "#Tier1Supplier",
      "#LeadershipHiring"
    ],
    facebook_title: "The CFO's Guide to Eliminating Upfront Executive Search Retainer Waste",
    facebook_description: `Why should an enterprise finance a headhunting agency's search costs upfront?

In this executive financial analysis, see why manufacturing CFOs are shifting to JSM Integrated Services' 100% contingency model — zero capital risk, verified candidate delivery, and a full 90-day placement shield.

JSM Contingency Advantage:
• ₹0 Advance Capital Risk
• 7-Day Candidate Delivery Sprint
• 90-Day Placement Shield [CONFIRM: fee %]

Contact Executive Search Desk:
📞 Call: +91 90808 63448
🌐 Portal: https://www.jsmintegratedservices.com`,
    youtube_title: "The CFO's Hiring Analysis: Stop Paying 33% Upfront Retainers #Shorts"
  }
];

// Select active story based on day of year + slot
function selectStory() {
  if (storyArg !== undefined) {
    const idx = parseInt(storyArg, 10);
    if (!isNaN(idx) && idx >= 0 && idx < STORY_MATRIX.length) {
      return STORY_MATRIX[idx];
    }
  }

  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now - startOfYear;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  // Morning slot gets even index, Evening slot gets odd index -> guaranteed alternating rotation
  const isEvening = CURRENT_SLOT === 'evening';
  const index = (dayOfYear * 2 + (isEvening ? 1 : 0)) % STORY_MATRIX.length;
  return STORY_MATRIX[index];
}

const ACTIVE_STORY = selectStory();

// Build native payload
const SOCIAL_PAYLOAD = {
  service: "JSM Integrated Services",
  brand: "Executive Talent Acquisition Desk",
  schedule_slot: CURRENT_SLOT,
  story_id: ACTIVE_STORY.id,
  topic: ACTIVE_STORY.topic,
  asset: {
    video_url: `${BASE_URL}/videos/jsm-contingency-reel.mp4`,
    poster_url: `${BASE_URL}/videos/poster.jpg`,
    aspect_ratio: "9:16",
    duration_seconds: 52.0,
    title: ACTIVE_STORY.video_title
  },

  // 1. INSTAGRAM REELS COPY
  // - First 125 chars: Scroll-stopping hook visible before "... more"
  // - Body: High-intent manufacturing search terms (Tier-1, Plant Head, OEE, CNC)
  // - Single Conversion Ask: Keyword comment trigger (boosts algorithmic velocity)
  // - Strict 5-Hashtag rule using top-reach niche hashtags
  instagram: {
    caption: `${ACTIVE_STORY.instagram_hook}\n\n${ACTIVE_STORY.instagram_body}\n\n${ACTIVE_STORY.instagram_tags.slice(0, 5).join(' ')}`,
    share_to_feed: true,
    audio_name: "Original Audio - JSM Executive Search"
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
    const postData = JSON.stringify(data);
    const client = parsed.protocol === 'https:' ? https : http;

    const req = client.request(parsed, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'JSM-Social-Dispatch-Engine/2.0'
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
  console.log("  JSM INTEGRATED SERVICES — 2X DAILY SOCIAL ENGINE (v2.0)");
  console.log("======================================================================");
  console.log(`Publishing Slot:     ${CURRENT_SLOT.toUpperCase()} DISPATCH`);
  console.log(`Active Story Topic:  ${ACTIVE_STORY.topic}`);
  console.log(`Lead Trigger Word:   Comment '${ACTIVE_STORY.trigger_keyword}'`);
  console.log(`Target Video CDN:    ${SOCIAL_PAYLOAD.asset.video_url}`);
  console.log(`Instagram Hook:      "${ACTIVE_STORY.instagram_hook.slice(0, 110)}..."`);
  console.log(`Instagram Tags (5):  ${ACTIVE_STORY.instagram_tags.slice(0, 5).join(' ')}`);
  console.log(`Facebook Title:      "${ACTIVE_STORY.facebook_title}"`);
  console.log("----------------------------------------------------------------------");

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
  } catch (err) {
    console.error(`✗ Failed to dispatch to webhook: ${err.message}`);
    process.exit(1);
  }
}

main();
