#!/usr/bin/env node

/**
 * JSM Integrated Services - Scheduled Blog Post Publisher
 * Scans content/blog/*.md for scheduled posts whose publish date has arrived
 * and flips `published: true`.
 * 
 * Usage:
 *   node scripts/publish-scheduled.mjs [options]
 * 
 * Options:
 *   --date=YYYY-MM-DD    Override today's date for testing
 *   --dry-run            Simulate publishing without writing changes
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ROOT_DIR = process.cwd();
const BLOG_DIR = path.join(ROOT_DIR, "content", "blog");
const MANIFEST_PATH = path.join(BLOG_DIR, "posts-manifest.json");

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    date: null,
    dryRun: false,
  };

  for (const arg of args) {
    if (arg === "--dry-run") options.dryRun = true;
    else if (arg.startsWith("--date=")) options.date = arg.split("=")[1].trim();
  }

  return options;
}

function normalizeDate(rawDate) {
  if (!rawDate) return "";
  if (rawDate instanceof Date) {
    return rawDate.toISOString().split("T")[0];
  }
  return String(rawDate).trim();
}

async function main() {
  console.log("============================================================");
  console.log("   JSM INTEGRATED SERVICES — SCHEDULED POST PUBLISHER       ");
  console.log("============================================================");

  const options = parseArgs();
  const today = options.date || new Date().toISOString().split("T")[0];
  console.log(`📅 Target Check Date: ${today}`);
  console.log(`🔍 Mode: ${options.dryRun ? "DRY RUN" : "ACTIVE PUBLISH"}\n`);

  if (!fs.existsSync(BLOG_DIR)) {
    console.log("ℹ️ No content/blog directory found. Nothing to publish.");
    process.exit(0);
  }

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  let publishedCount = 0;
  const publishedSlugs = [];

  // Load manifest if exists
  let manifest = null;
  if (fs.existsSync(MANIFEST_PATH)) {
    try {
      manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
    } catch (e) {
      console.warn("⚠️ Warning: Could not parse posts-manifest.json:", e.message);
    }
  }

  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file);
    try {
      const fileContent = fs.readFileSync(filePath, "utf8");
      const parsed = matter(fileContent);
      const data = parsed.data;

      // Check if post is unpublished / scheduled
      const isUnpublished = data.published === false;
      const scheduledDate = normalizeDate(data.scheduledDate || data.date);

      if (isUnpublished && scheduledDate && scheduledDate <= today) {
        console.log(`🚀 Promoting scheduled post: "${data.title || file}"`);
        console.log(`   - File: ${file}`);
        console.log(`   - Scheduled: ${scheduledDate} <= Today: ${today}`);

        if (!options.dryRun) {
          data.published = true;
          delete data.scheduledDate; // Clear scheduled marker
          data.lastModified = today;

          // Re-serialize file preserving body
          const updatedContent = matter.stringify(parsed.content, data);
          fs.writeFileSync(filePath, updatedContent, "utf8");

          // Update manifest entry if available
          if (manifest && Array.isArray(manifest.posts)) {
            const slug = data.slug || path.basename(file, ".md");
            const entry = manifest.posts.find((p) => p.slug === slug);
            if (entry) {
              entry.published = true;
              entry.date = scheduledDate;
            }
          }
        }

        publishedCount++;
        publishedSlugs.push(data.slug || file);
      }
    } catch (err) {
      console.warn(`⚠️ Error checking file ${file}:`, err.message);
    }
  }

  if (manifest && !options.dryRun && publishedCount > 0) {
    manifest.lastUpdated = new Date().toISOString();
    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf8");
    console.log(`📊 Updated posts-manifest.json with ${publishedCount} newly published posts.`);
  }

  console.log("------------------------------------------------------------");
  if (publishedCount > 0) {
    console.log(`✅ Successfully published ${publishedCount} scheduled post(s):`);
    for (const slug of publishedSlugs) {
      console.log(`   + ${slug}`);
    }
  } else {
    console.log("ℹ️ No scheduled posts met the publication criteria for today.");
  }
  console.log("------------------------------------------------------------\n");
  process.exit(0);
}

main().catch((err) => {
  console.error("Fatal scheduler error:", err);
  process.exit(1);
});
