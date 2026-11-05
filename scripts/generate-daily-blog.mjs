#!/usr/bin/env node

/**
 * JSM Integrated Services - Daily Blog Publishing Automation Engine
 * Generates 1,200+ word technical B2B articles targeting South Indian commercial intent.
 * 
 * Usage:
 *   node scripts/generate-daily-blog.mjs [options]
 * 
 * Options:
 *   --test               Generate 1 verified test article (1,200+ words), validate frontmatter, and exit 0
 *   --cluster=<name>     Force keyword cluster: cctv | security | facility | automation
 *   --location=<slug>    Force location: trichy | chennai | coimbatore | hosur | madurai | bangalore | salem | erode
 *   --date=YYYY-MM-DD    Override publication date
 *   --dry-run            Simulate generation without writing files or updating manifest
 *   --force              Bypass same-day collision protection
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { synthesizeArticle, advanceRotationState } from "./lib/blog-synthesizer.mjs";
import { CLUSTERS, LOCATIONS, VERTICALS } from "./lib/blog-knowledge-bank.mjs";

const ROOT_DIR = process.cwd();
const BLOG_DIR = path.join(ROOT_DIR, "content", "blog");
const MANIFEST_PATH = path.join(BLOG_DIR, "posts-manifest.json");

const CLUSTER_KEYS = Object.keys(CLUSTERS);
const LOCATION_KEYS = Object.keys(LOCATIONS);

/**
 * Parses CLI arguments into an options object.
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    test: false,
    cluster: process.env.TARGET_CLUSTER || null,
    location: process.env.TARGET_LOCATION || null,
    date: null,
    dryRun: false,
    force: false,
  };

  for (const arg of args) {
    if (arg === "--test") options.test = true;
    else if (arg === "--dry-run") options.dryRun = true;
    else if (arg === "--force") options.force = true;
    else if (arg.startsWith("--cluster=")) options.cluster = arg.split("=")[1].trim().toLowerCase();
    else if (arg.startsWith("--location=")) options.location = arg.split("=")[1].trim().toLowerCase();
    else if (arg.startsWith("--date=")) options.date = arg.split("=")[1].trim();
  }

  return options;
}

/**
 * Reads or initializes the posts manifest.
 */
function getOrInitManifest() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }

  if (fs.existsSync(MANIFEST_PATH)) {
    try {
      const raw = fs.readFileSync(MANIFEST_PATH, "utf8");
      return JSON.parse(raw);
    } catch (e) {
      console.warn("⚠️ Warning: Failed to parse existing posts-manifest.json, reconstructing...", e.message);
    }
  }

  // Bootstrap manifest by scanning content/blog/*.md files
  console.log("ℹ️ Initializing posts-manifest.json from existing blog directory...");
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  const posts = [];

  for (const file of files) {
    try {
      const fullPath = path.join(BLOG_DIR, file);
      const content = fs.readFileSync(fullPath, "utf8");
      const parsed = matter(content);
      const words = parsed.content.trim().split(/\s+/).filter(Boolean).length;
      posts.push({
        slug: parsed.data.slug || path.basename(file, ".md"),
        title: parsed.data.title || file,
        date: parsed.data.date ? String(parsed.data.date) : "2024-01-01",
        category: parsed.data.category || "Commercial Security",
        wordCount: words,
        filePath: path.relative(ROOT_DIR, fullPath),
        published: parsed.data.published !== false,
      });
    } catch (err) {
      console.warn(`Could not parse ${file}:`, err.message);
    }
  }

  const manifest = {
    version: "1.0.0",
    lastUpdated: new Date().toISOString(),
    totalPosts: posts.length,
    rotationState: {
      nextClusterIndex: 0,
      nextLocationIndex: 0,
      nextVerticalIndex: 0,
    },
    posts,
  };

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf8");
  return manifest;
}

/**
 * Validates that an article meets all strict architectural and SEO rules.
 */
function validateArticle(articleResult) {
  const issues = [];
  const content = articleResult.fullFileContent;

  // 1. Parse frontmatter
  let parsed;
  try {
    parsed = matter(content);
  } catch (err) {
    issues.push(`Frontmatter YAML parsing failed: ${err.message}`);
    return issues;
  }

  const data = parsed.data;

  // 2. Frontmatter required fields
  const requiredFields = ["title", "slug", "date", "author", "category", "tags", "readTime", "metaTitle", "metaDescription", "keywords", "faqs", "published"];
  for (const field of requiredFields) {
    if (data[field] === undefined || data[field] === null || data[field] === "") {
      issues.push(`Missing required frontmatter field: "${field}"`);
    }
  }

  // 3. Word Count Guarantee (>= 1,200 words)
  const bodyWords = parsed.content.trim().split(/\s+/).filter(Boolean).length;
  if (bodyWords < 1200) {
    issues.push(`Word count too low: ${bodyWords} words (Mandatory requirement is >= 1,200 words)`);
  }

  // 4. Five Mandatory Structural Blocks
  const structuralChecklist = [
    { name: "Executive Hook & Challenge", regex: /Operating commercial and industrial facilities/i },
    { name: "Deep Technical Architecture", regex: /## Deep Technical Architecture & Operational Protocols/i },
    { name: "Regional Statutory Compliance", regex: /## Regional South Indian Statutory Compliance & Legal Framework/i },
    { name: "Real-World Operational Safeguards", regex: /## Real-World Operational Safeguards: Active Night Audits & 2-Hour SLA/i },
    { name: "Structured FAQ Section", regex: /## Frequently Asked Questions/i },
    { name: "High-Conversion CTA Section", regex: /## Deploy Military-Grade Security/i },
  ];

  for (const block of structuralChecklist) {
    if (!block.regex.test(parsed.content)) {
      issues.push(`Missing mandatory structural block: "${block.name}"`);
    }
  }

  // 5. Verification Anchors
  if (!parsed.content.includes("+91 90808 63448")) {
    issues.push("Missing official phone hotline: +91 90808 63448");
  }
  if (!parsed.content.includes("/services/")) {
    issues.push("Missing internal link to /services/[slug]");
  }
  if (!parsed.content.includes("/locations/")) {
    issues.push("Missing internal link to /locations/[slug]");
  }
  if (!parsed.content.includes("/case-studies/trichy-international-airport")) {
    issues.push("Missing internal link to /case-studies/trichy-international-airport");
  }
  if (!parsed.content.includes("/get-quote")) {
    issues.push("Missing internal link to /get-quote");
  }

  // 6. Meta Length Constraints (Strict SERP budget: Title <= 58 chars, Desc <= 155 chars)
  if (data.metaTitle && data.metaTitle.length > 58) {
    issues.push(`Meta title exceeds 58 characters: "${data.metaTitle}" (${data.metaTitle.length} chars)`);
  }
  if (data.metaDescription && data.metaDescription.length > 155) {
    issues.push(`Meta description exceeds 155 characters: (${data.metaDescription.length} chars)`);
  }

  return issues;
}

/**
 * Main execution routine.
 */
async function main() {
  console.log("============================================================");
  console.log("   JSM INTEGRATED SERVICES — DAILY BLOG GENERATOR ENGINE    ");
  console.log("============================================================");

  const options = parseArgs();
  const manifest = getOrInitManifest();

  // Resolve target date (YYYY-MM-DD)
  const targetDate = options.date || new Date().toISOString().split("T")[0];

  // Resolve cluster
  let clusterKey = options.cluster;
  if (!clusterKey || !CLUSTERS[clusterKey]) {
    const cIdx = manifest.rotationState.nextClusterIndex % CLUSTER_KEYS.length;
    clusterKey = CLUSTER_KEYS[cIdx];
  }

  // Resolve location
  let locationKey = options.location;
  if (!locationKey || !LOCATIONS[locationKey]) {
    const lIdx = manifest.rotationState.nextLocationIndex % LOCATION_KEYS.length;
    locationKey = LOCATION_KEYS[lIdx];
  }

  // Resolve vertical
  const vIdx = manifest.rotationState.nextVerticalIndex % VERTICALS.length;

  console.log(`🎯 Target Parameters:`);
  console.log(`   - Mode:     ${options.test ? "TEST VERIFICATION" : options.dryRun ? "DRY RUN" : "PRODUCTION DAILY GENERATION"}`);
  console.log(`   - Date:     ${targetDate}`);
  console.log(`   - Cluster:  ${clusterKey} (${CLUSTERS[clusterKey].name})`);
  console.log(`   - Location: ${locationKey} (${LOCATIONS[locationKey].city})`);
  console.log(`   - Vertical: ${VERTICALS[vIdx].title}`);

  // Collision check for normal mode: check if this specific slug already exists, or allow multiple posts per day
  if (!options.test && !options.force && !options.dryRun) {
    const existingSlugPost = manifest.posts.find((p) => p.slug === `${clusterKey}-${VERTICALS[vIdx].id}-${locationKey}-operations-guide`);
    if (existingSlugPost) {
      console.log(`ℹ️ Article with slug ${existingSlugPost.slug} already published. Advancing rotation...`);
      // Advance to next rotation slot
      manifest.rotationState = advanceRotationState(
        manifest.rotationState,
        CLUSTER_KEYS.length,
        LOCATION_KEYS.length,
        VERTICALS.length
      );
      fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf8");
    }
  }

  // Synthesize article
  const article = synthesizeArticle({
    clusterKey,
    locationKey,
    verticalIndex: vIdx,
    targetDate,
    isTest: options.test,
  });

  const fileName = `${article.slug}.md`;
  const targetFilePath = path.join(BLOG_DIR, fileName);

  console.log(`\n📝 Generated Article Overview:`);
  console.log(`   - Slug:       ${article.slug}`);
  console.log(`   - Title:      ${article.title}`);
  console.log(`   - Word Count: ${article.wordCount} words (Requirement: >= 1,200 words)`);
  console.log(`   - File:       ${path.relative(ROOT_DIR, targetFilePath)}`);

  // Run architectural validation
  const validationIssues = validateArticle(article);

  if (validationIssues.length > 0) {
    console.error(`\n❌ Validation Failed with ${validationIssues.length} issues:`);
    for (const issue of validationIssues) {
      console.error(`   - ${issue}`);
    }
    process.exit(1);
  }

  console.log(`\n✅ All Validation Checks PASSED cleanly:`);
  console.log(`   [✓] Guaranteed 1,200+ Words (${article.wordCount} words verified)`);
  console.log(`   [✓] Frontmatter Schema & YAML Serialization valid`);
  console.log(`   [✓] All 5 Mandatory Structural Blocks present`);
  console.log(`   [✓] Direct Operations Hotline (+91 90808 63448) present`);
  console.log(`   [✓] Internal Linking Matrix (/services/, /locations/, /case-studies/) verified`);
  console.log(`   [✓] SEO Meta Constraints (Title <= 58 chars, Desc <= 155 chars) compliant`);

  if (options.dryRun) {
    console.log(`\n[DRY RUN] File write skipped.`);
    process.exit(0);
  }

  // Write file to content/blog/
  fs.writeFileSync(targetFilePath, article.fullFileContent, "utf8");
  console.log(`\n💾 Saved article to ${path.relative(ROOT_DIR, targetFilePath)}`);

  // Update manifest
  const existingIndex = manifest.posts.findIndex((p) => p.slug === article.slug);
  const postEntry = {
    slug: article.slug,
    title: article.title,
    date: targetDate,
    category: article.category,
    cluster: article.cluster,
    location: article.location,
    wordCount: article.wordCount,
    filePath: path.relative(ROOT_DIR, targetFilePath),
    published: true,
  };

  if (existingIndex >= 0) {
    manifest.posts[existingIndex] = postEntry;
  } else {
    manifest.posts.push(postEntry);
  }

  manifest.totalPosts = manifest.posts.length;
  manifest.lastUpdated = new Date().toISOString();

  // Rotate indices if not in test mode
  if (!options.test) {
    manifest.rotationState = advanceRotationState(
      manifest.rotationState,
      CLUSTER_KEYS.length,
      LOCATION_KEYS.length,
      VERTICALS.length
    );
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf8");
  console.log(`📊 Updated posts-manifest.json (Total Posts: ${manifest.totalPosts})`);

  console.log("\n🚀 Blog generation routine completed successfully (Exit Code 0).\n");
  process.exit(0);
}

main().catch((err) => {
  console.error("Fatal generator error:", err);
  process.exit(1);
});
