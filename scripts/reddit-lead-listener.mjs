#!/usr/bin/env node
/**
 * JSM Integrated Services - Reddit B2B Lead Intelligence & Social Listener
 * 
 * Inspired by ivucicev/redsignal & donebyai-team/RedoraAI architecture:
 * - Scans high-density B2B subreddits for active executive hiring intent.
 * - Filters noise using high-precision regex patterns & multi-factor intent scoring.
 * - Drafts value-first, consultative responses highlighting JSM's 100% contingency terms.
 * - Manages lead state in a local CRM pipeline (New -> Reviewing -> Replied -> Converted).
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, "../data");
const LEADS_FILE = path.join(DATA_DIR, "reddit-leads.json");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// -----------------------------------------------------------------------------
// 1. Target Subreddits & Category Weightings
// -----------------------------------------------------------------------------
export const TARGET_SUBREDDITS = [
  { name: "StartUpIndia", category: "founders", priority: 1.2 },
  { name: "IndiaInvestments", category: "investors", priority: 1.1 },
  { name: "chennai", category: "industrial_hub", priority: 1.3 },
  { name: "pune", category: "industrial_hub", priority: 1.3 },
  { name: "bangalore", category: "tech_hub", priority: 1.2 },
  { name: "mumbai", category: "corporate_hub", priority: 1.1 },
  { name: "delhi", category: "industrial_hub", priority: 1.1 },
  { name: "manufacturing", category: "industrial_core", priority: 1.4 },
  { name: "supplychain", category: "scm_procurement", priority: 1.3 },
  { name: "HumanResources", category: "hr_leaders", priority: 1.2 },
  { name: "IndianWorkplace", category: "workplace_governance", priority: 1.1 },
];

// -----------------------------------------------------------------------------
// 2. High-Intent Detection Patterns
// -----------------------------------------------------------------------------
export const INTENT_PATTERNS = [
  {
    type: "agency_search",
    regex: /\b(looking for|need|recommend|suggest)\b.*\b(recruitment agency|recruiter|headhunter|executive search|hiring consultant)\b/i,
    baseScore: 8.5,
  },
  {
    type: "senior_role_hire",
    regex: /\b(hiring|looking for|searching for|need)\b.*\b(plant head|operations head|operations vp|manufacturing director|vp engineering|cto|cfo|general manager|coo)\b/i,
    baseScore: 9.0,
  },
  {
    type: "recruiter_friction",
    regex: /\b(retainer|upfront fee|bad recruiter|ghosting candidates|expensive headhunter|33% fee)\b/i,
    baseScore: 7.5,
  },
  {
    type: "vacant_leadership_pain",
    regex: /\b(cannot find|struggling to hire|position open for|seat vacant|hard to recruit)\b.*\b(senior|leadership|director|lead|head)\b/i,
    baseScore: 8.0,
  },
];

// -----------------------------------------------------------------------------
// 3. Consultative Response Generator
// -----------------------------------------------------------------------------
export function generateConsultativeDraft(lead) {
  const isIndustrial = lead.subreddit === "manufacturing" || lead.subreddit === "chennai" || lead.subreddit === "pune";
  const isFounder = lead.subreddit === "StartUpIndia" || lead.subreddit === "bangalore";

  if (isIndustrial) {
    return `When filling senior plant or operations leadership seats in Indian manufacturing hubs, two contractual safeguards protect your capital:

1. Zero Upfront Retainers: Avoid non-refundable advance retainers (traditionally 33%). Work strictly on a 100% contingency basis (8.33% fee [CONFIRM: fee %] invoiced only after the executive onboard).
2. 90-Day Placement Assurance: Protect against early attrition with a contractually binding 90-day replacement policy [CONFIRM: fee %].
3. Blind Dossier Calibrations: Insist on anonymized dossiers verifying past TS-16949 / OEE impact metrics before candidate identity is disclosed.

Our executive search desk covers Chennai-Sriperumbudur and Pune-Chakan manufacturing corridors with 7-day blind shortlists. Feel free to DM or review our live talent radar at jsmintegratedservices.com.`;
  }

  if (isFounder) {
    return `For growth-stage leadership mandates (VP Engineering, Head of Operations, Commercial Leads), traditional headhunter timelines (60-90 days) cause severe execution drag.

Key hiring parameters to look for:
- 7-Day Sprint: Demand 3 pre-calibrated blind candidate dossiers within 7 business days.
- Pure Contingency: ₹0 upfront commitment. Capital remains preserved until the candidate is physically on seat.
- 90-Day Replacement Shield: Formal contractual guarantee [CONFIRM: fee %].

JSM Integrated Services specializes in mid-senior leadership across South and West India on pure contingency. You can run immediate candidate depth numbers on our interactive radar at jsmintegratedservices.com.`;
  }

  return `Consider evaluating search partners on a pure 100% contingency success model. Under this structure, you pay zero upfront retainers and fees (8.33% [CONFIRM: fee %]) are triggered strictly upon candidate onboarding, backed by a 90-day replacement assurance [CONFIRM: fee %].

For discreet senior profiles between ₹12L and ₹1Cr across Tamil Nadu, Karnataka, and Maharashtra, explore calibrated blind dossiers via jsmintegratedservices.com.`;
}

// -----------------------------------------------------------------------------
// 4. Lead Pipeline Management
// -----------------------------------------------------------------------------
export function loadPipeline() {
  if (fs.existsSync(LEADS_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(LEADS_FILE, "utf-8"));
    } catch (err) {
      console.warn("Could not parse existing leads file, creating fresh store.");
    }
  }
  return {
    meta: {
      lastScan: null,
      totalScanned: 0,
      activeLeads: 0,
    },
    leads: [],
  };
}

export function savePipeline(pipeline) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify(pipeline, null, 2), "utf-8");
}

// -----------------------------------------------------------------------------
// 5. Mock Scanner / Ingestion Feed (Production Sandbox)
// -----------------------------------------------------------------------------
const SAMPLE_STREAM_DATA = [
  {
    id: "reddit_post_101",
    subreddit: "manufacturing",
    title: "Looking for an executive search partner to hire Plant Head in Sriperumbudur / Chennai",
    body: "Our Tier-1 automotive press unit is expanding. We have been burned by a 33% advance retainer firm that gave us zero candidates in 60 days. Need a reliable consultant who actually knows the TN automotive belt.",
    author: "auto_promoter_tn",
    url: "https://reddit.com/r/manufacturing/comments/example101",
    timestamp: new Date().toISOString(),
  },
  {
    id: "reddit_post_102",
    subreddit: "StartUpIndia",
    title: "How do you hire a VP of Engineering or CTO without paying crazy retainers?",
    body: "We raised a seed extension and need a technical architect / VP Engineering in Bangalore. Current HR agency wants ₹6L advance retainer before starting. Is contingency search viable for senior tech roles?",
    author: "founder_bengaluru",
    url: "https://reddit.com/r/StartUpIndia/comments/example102",
    timestamp: new Date().toISOString(),
  },
  {
    id: "reddit_post_103",
    subreddit: "pune",
    title: "Urgent: Operations GM needed for Chakan precision CNC facility",
    body: "Struggling to find an operations general manager with AS9100 / aerospace machining background in Chakan / Bhosari. Any direct headhunter recommendations?",
    author: "pune_machining_co",
    url: "https://reddit.com/r/pune/comments/example103",
    timestamp: new Date().toISOString(),
  },
  {
    id: "reddit_post_104",
    subreddit: "HumanResources",
    title: "Standard agency replacement guarantees for mid-senior hires in India?",
    body: "Our management wants to know if 90-day replacement guarantees are standard for ₹25L-₹50L roles. What are common contingency fee percentages?",
    author: "hr_director_corp",
    url: "https://reddit.com/r/HumanResources/comments/example104",
    timestamp: new Date().toISOString(),
  },
];

// -----------------------------------------------------------------------------
// 6. Lead Scorer & Processor
// -----------------------------------------------------------------------------
export function processFeed(posts = SAMPLE_STREAM_DATA) {
  const pipeline = loadPipeline();
  let newLeadsCount = 0;

  for (const post of posts) {
    // Check if already in pipeline
    const existingIndex = pipeline.leads.findIndex((l) => l.id === post.id);
    if (existingIndex >= 0) continue;

    const fullText = `${post.title} ${post.body}`;
    let maxBaseScore = 0;
    const detectedPatterns = [];

    for (const pattern of INTENT_PATTERNS) {
      if (pattern.regex.test(fullText)) {
        detectedPatterns.push(pattern.type);
        if (pattern.baseScore > maxBaseScore) {
          maxBaseScore = pattern.baseScore;
        }
      }
    }

    if (maxBaseScore > 0) {
      // Find subreddit weighting
      const subConfig = TARGET_SUBREDDITS.find((s) => s.name.toLowerCase() === post.subreddit.toLowerCase());
      const multiplier = subConfig ? subConfig.priority : 1.0;
      const finalScore = Math.min(10, Math.round(maxBaseScore * multiplier * 10) / 10);

      const draftReply = generateConsultativeDraft(post);

      const leadRecord = {
        id: post.id,
        subreddit: post.subreddit,
        title: post.title,
        body: post.body,
        author: post.author,
        url: post.url,
        score: finalScore,
        patterns: detectedPatterns,
        status: "New", // New | Reviewing | Replied | Converted
        draftReply,
        capturedAt: new Date().toISOString(),
      };

      pipeline.leads.unshift(leadRecord);
      newLeadsCount++;
    }
  }

  pipeline.meta.lastScan = new Date().toISOString();
  pipeline.meta.totalScanned += posts.length;
  pipeline.meta.activeLeads = pipeline.leads.filter((l) => l.status !== "Converted").length;

  savePipeline(pipeline);
  return { pipeline, newLeadsCount };
}

// -----------------------------------------------------------------------------
// 7. CLI Execution Output
// -----------------------------------------------------------------------------
export function runCLI() {
  console.log("======================================================================");
  console.log("  JSM INTEGRATED SERVICES - REDDIT B2B LEAD INTELLIGENCE LISTENER");
  console.log("======================================================================");
  console.log(`Targeting ${TARGET_SUBREDDITS.length} high-intent business & industrial subreddits...`);

  const { pipeline, newLeadsCount } = processFeed();

  console.log(`\n✓ Scan completed. Processed ${SAMPLE_STREAM_DATA.length} stream entries.`);
  console.log(`✓ New High-Intent Leads Captured: ${newLeadsCount}`);
  console.log(`✓ Total Active Pipeline Leads: ${pipeline.meta.activeLeads}\n`);

  console.log("----------------------------------------------------------------------");
  console.log("TOP IDENTIFIED INBOUND MANDATE PROSPECTS:");
  console.log("----------------------------------------------------------------------");

  pipeline.leads.slice(0, 4).forEach((lead, idx) => {
    console.log(`\n[LEAD #${idx + 1}] Score: ${lead.score}/10 | Subreddit: r/${lead.subreddit} | Author: u/${lead.author}`);
    console.log(`Title: ${lead.title}`);
    console.log(`Status: [${lead.status}] | Patterns: ${lead.patterns.join(", ")}`);
    console.log(`Suggested Response Strategy:`);
    console.log(`------------------------------------------------------------------`);
    console.log(lead.draftReply.split("\n").slice(0, 4).join("\n") + "...");
    console.log(`------------------------------------------------------------------`);
  });

  console.log("\nLead store persisted to: data/reddit-leads.json");
  console.log("Alerts configured for: contact@jsmintegratedservices.com");
  console.log("======================================================================\n");
}

// Auto-run if executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runCLI();
}
