import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const ROOT_DIR = process.cwd();
const BLOG_DIR = path.join(ROOT_DIR, 'content', 'blog');
const NEXT_APP_DIR = path.join(ROOT_DIR, '.next', 'server', 'app');

console.log('============================================================');
console.log('   MILESTONE 3: TECHNICAL SEO & SCHEMA VERIFICATION SUITE   ');
console.log('============================================================\n');

let failedTests = 0;
let passedTests = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failedTests++;
  }
}

// -------------------------------------------------------------
// Test Suite 1: Markdown Frontmatter Audit (content/blog/*.md)
// -------------------------------------------------------------
console.log('--- Test Suite 1: Markdown Frontmatter Audit ---');
const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'));
assert(files.length >= 10, `Found ${files.length} markdown articles in content/blog/ (expected >= 10)`);

let titleViolations = 0;
let descViolations = 0;

for (const file of files) {
  const filePath = path.join(BLOG_DIR, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(content);

  const title = data.metaTitle || data.title || '';
  const desc = data.metaDescription || data.excerpt || '';

  if (title.length > 58) {
    titleViolations++;
    console.error(`    Violation in ${file}: metaTitle is ${title.length} chars (>58): "${title}"`);
  }
  if (desc.length > 155) {
    descViolations++;
    console.error(`    Violation in ${file}: metaDescription is ${desc.length} chars (>155): "${desc}"`);
  }
}

assert(titleViolations === 0, `All ${files.length} posts have metaTitle <= 58 chars (found ${titleViolations} violations)`);
assert(descViolations === 0, `All ${files.length} posts have metaDescription <= 155 chars (found ${descViolations} violations)`);

// -------------------------------------------------------------
// Test Suite 2: Built Sitemap XML Verification (.next/server/app/sitemap.xml.body)
// -------------------------------------------------------------
console.log('\n--- Test Suite 2: Sitemap XML Production Verification ---');
const sitemapPath = path.join(NEXT_APP_DIR, 'sitemap.xml.body');
assert(fs.existsSync(sitemapPath), 'Production sitemap.xml exists');

const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');
assert(sitemapXml.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'), 'Sitemap has valid urlset namespace');

// Count <url> blocks
const urlMatches = sitemapXml.match(/<url>/g) || [];
assert(urlMatches.length >= 40, `Sitemap contains ${urlMatches.length} indexed URLs (>= 40)`);

// Verify /blog in sitemap
const hasBlogIndex = sitemapXml.includes('<loc>https://jsmintegratedservices.com/blog</loc>') ||
  sitemapXml.includes('<loc>https://www.jsmintegratedservices.com/blog</loc>');
assert(hasBlogIndex, 'Sitemap includes /blog listing route');

// Verify changefreq and priority for /blog
assert(sitemapXml.includes('<changefreq>daily</changefreq>'), 'Sitemap includes changefreq daily');
assert(sitemapXml.includes('<priority>0.9</priority>'), 'Sitemap includes priority 0.9');

// Verify all blog posts appear with valid ISO <lastmod>
let publishedCountInSitemap = 0;
for (const file of files) {
  const slug = file.replace('.md', '');
  if (sitemapXml.includes(`/blog/${slug}`)) {
    publishedCountInSitemap++;
  }
}
assert(publishedCountInSitemap === files.length, `All ${files.length} published blog articles are indexed in sitemap (found ${publishedCountInSitemap})`);

// Verify every <url> has valid ISO <lastmod>
const lastmodRegex = /<lastmod>([^<]+)<\/lastmod>/g;
let lastmodMatch;
let invalidLastmodCount = 0;
let totalLastmods = 0;
while ((lastmodMatch = lastmodRegex.exec(sitemapXml)) !== null) {
  totalLastmods++;
  const dateStr = lastmodMatch[1];
  const parsed = new Date(dateStr);
  if (isNaN(parsed.getTime())) {
    invalidLastmodCount++;
  }
}
assert(totalLastmods === urlMatches.length, `Every <url> has a <lastmod> tag (${totalLastmods}/${urlMatches.length})`);
assert(invalidLastmodCount === 0, `All <lastmod> tags contain valid ISO 8601 dates (found ${invalidLastmodCount} invalid)`);

// -------------------------------------------------------------
// Test Suite 3: Robots Crawlability Directives (.next/server/app/robots.txt.body)
// -------------------------------------------------------------
console.log('\n--- Test Suite 3: Robots Crawlability Production Verification ---');
const robotsPath = path.join(NEXT_APP_DIR, 'robots.txt.body');
assert(fs.existsSync(robotsPath), 'Production robots.txt exists');

const robotsTxt = fs.readFileSync(robotsPath, 'utf8');

assert(robotsTxt.includes('Sitemap: https://jsmintegratedservices.com/sitemap.xml'), 'robots.txt specifies canonical sitemap: https://jsmintegratedservices.com/sitemap.xml');
assert(robotsTxt.includes('User-Agent: *'), 'robots.txt contains default wildcard User-Agent: *');
assert(robotsTxt.includes('User-Agent: Googlebot'), 'robots.txt contains User-Agent: Googlebot');
assert(robotsTxt.includes('User-Agent: Bingbot'), 'robots.txt contains User-Agent: Bingbot');
assert(robotsTxt.includes('User-Agent: GPTBot'), 'robots.txt contains User-Agent: GPTBot');
assert(robotsTxt.includes('User-Agent: PerplexityBot'), 'robots.txt contains User-Agent: PerplexityBot');
assert(robotsTxt.includes('User-Agent: ClaudeBot'), 'robots.txt contains User-Agent: ClaudeBot');

// Check that /blog/, /locations/, and /feed.xml are explicitly allowed
const blogAllowMatches = robotsTxt.match(/Allow: \/blog\//g) || [];
const locationsAllowMatches = robotsTxt.match(/Allow: \/locations\//g) || [];
const feedAllowMatches = robotsTxt.match(/Allow: \/feed\.xml/g) || [];

assert(blogAllowMatches.length >= 3, `robots.txt allows /blog/ across all 3 crawler groupings (${blogAllowMatches.length} rules)`);
assert(locationsAllowMatches.length >= 3, `robots.txt allows /locations/ across all 3 crawler groupings (${locationsAllowMatches.length} rules)`);
assert(feedAllowMatches.length >= 3, `robots.txt allows /feed.xml across all 3 crawler groupings (${feedAllowMatches.length} rules)`);

// -------------------------------------------------------------
// Test Suite 4: RSS 2.0 Feed Production Verification (.next/server/app/feed.xml.body)
// -------------------------------------------------------------
console.log('\n--- Test Suite 4: RSS 2.0 Feed Production Verification ---');
const feedPath = path.join(NEXT_APP_DIR, 'feed.xml.body');
assert(fs.existsSync(feedPath), 'Production feed.xml exists');

const feedXml = fs.readFileSync(feedPath, 'utf8');
assert(feedXml.includes('<?xml version="1.0" encoding="UTF-8" ?>'), 'feed.xml has XML declaration');
assert(feedXml.includes('<rss version="2.0"'), 'feed.xml specifies RSS version 2.0');
assert(feedXml.includes('xmlns:atom="http://www.w3.org/2005/Atom"'), 'feed.xml includes atom namespace');
assert(feedXml.includes('xmlns:dc="http://purl.org/dc/elements/1.1/"'), 'feed.xml includes Dublin Core dc namespace');
assert(feedXml.includes('<title>JSM Integrated Services | Official Blog</title>'), 'feed.xml channel title matches brand');
assert(feedXml.includes('<atom:link href="https://jsmintegratedservices.com/feed.xml" rel="self" type="application/rss+xml" />'), 'feed.xml has self atom:link');

const itemMatches = feedXml.match(/<item>/g) || [];
assert(itemMatches.length === files.length, `feed.xml contains all ${files.length} published blog items (found ${itemMatches.length})`);

// Verify no empty descriptions in feed
const emptyDescMatches = feedXml.match(/<description><!\[CDATA\[\]\]><\/description>/g) || [];
assert(emptyDescMatches.length === 0, `feed.xml has 0 empty description tags (found ${emptyDescMatches.length})`);

// -------------------------------------------------------------
// Test Suite 5: HTML Render & Rich Results Schemas Verification
// -------------------------------------------------------------
console.log('\n--- Test Suite 5: HTML Metadata & Schema.org Rich Results Verification ---');
const blogHtmlDir = path.join(NEXT_APP_DIR, 'blog');
const htmlFiles = fs.readdirSync(blogHtmlDir).filter((f) => f.endsWith('.html'));
assert(htmlFiles.length >= 10, `Found ${htmlFiles.length} rendered blog HTML pages in .next/server/app/blog/`);

let invalidTitles = 0;
let invalidDescriptions = 0;
let missingCanonicals = 0;
let missingBlogPostingSchemas = 0;
let missingBreadcrumbSchemas = 0;
let missingPublisherId = 0;

for (const htmlFile of htmlFiles) {
  const filePath = path.join(blogHtmlDir, htmlFile);
  const html = fs.readFileSync(filePath, 'utf8');

  // 1. Title verification
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  if (!titleMatch) {
    invalidTitles++;
    console.error(`Missing <title> in ${htmlFile}`);
  } else {
    // Unescape &amp; to & for accurate length measurement
    const rawTitle = titleMatch[1].replace(/&amp;/g, '&');
    if (rawTitle.length > 60) {
      invalidTitles++;
      console.error(`Title in ${htmlFile} exceeds 60 chars (${rawTitle.length}): "${rawTitle}"`);
    }
  }

  // 2. Meta description verification
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/);
  if (!descMatch) {
    invalidDescriptions++;
    console.error(`Missing meta description in ${htmlFile}`);
  } else {
    const rawDesc = descMatch[1].replace(/&amp;/g, '&');
    if (rawDesc.length > 160) {
      invalidDescriptions++;
      console.error(`Description in ${htmlFile} exceeds 160 chars (${rawDesc.length}): "${rawDesc}"`);
    }
  }

  // 3. Canonical tag verification
  const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/);
  if (!canonicalMatch) {
    missingCanonicals++;
    console.error(`Missing canonical link in ${htmlFile}`);
  }

  // 4. Schema verification
  if (!html.includes('"@type":"BlogPosting"')) {
    missingBlogPostingSchemas++;
    console.error(`Missing BlogPosting schema in ${htmlFile}`);
  }
  if (!html.includes('"@type":"BreadcrumbList"')) {
    missingBreadcrumbSchemas++;
    console.error(`Missing BreadcrumbList schema in ${htmlFile}`);
  }
  if (!html.includes('https://jsmintegratedservices.com/#localbusiness')) {
    missingPublisherId++;
    console.error(`Missing LocalBusiness @id link in ${htmlFile}`);
  }
}

assert(invalidTitles === 0, `All ${htmlFiles.length} blog pages have meta titles strictly <= 60 chars (found ${invalidTitles} invalid)`);
assert(invalidDescriptions === 0, `All ${htmlFiles.length} blog pages have meta descriptions strictly <= 160 chars (found ${invalidDescriptions} invalid)`);
assert(missingCanonicals === 0, `All ${htmlFiles.length} blog pages have valid <link rel="canonical"> tags (found ${missingCanonicals} missing)`);
assert(missingBlogPostingSchemas === 0, `All ${htmlFiles.length} blog pages render valid Google-compliant BlogPosting schema (found ${missingBlogPostingSchemas} missing)`);
assert(missingBreadcrumbSchemas === 0, `All ${htmlFiles.length} blog pages render valid BreadcrumbList schema (found ${missingBreadcrumbSchemas} missing)`);
assert(missingPublisherId === 0, `All ${htmlFiles.length} blog pages link publisher to #localbusiness (found ${missingPublisherId} missing)`);

// Check layout.tsx RSS autodiscovery
const layoutPath = path.join(ROOT_DIR, 'src', 'app', 'layout.tsx');
const layoutContent = fs.readFileSync(layoutPath, 'utf8');
assert(
  layoutContent.includes('rel="alternate"') &&
  layoutContent.includes('type="application/rss+xml"') &&
  layoutContent.includes('/feed.xml'),
  'layout.tsx has RSS 2.0 autodiscovery link in <head>'
);

// -------------------------------------------------------------
// Final Summary
// -------------------------------------------------------------
console.log('\n============================================================');
console.log(`TOTAL TESTS: ${passedTests + failedTests} | PASSED: ${passedTests} | FAILED: ${failedTests}`);
console.log('============================================================');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('\n✅ ALL MILESTONE 3 AUDIT & VERIFICATION CRITERIA SATISFIED (100% PASS)');
  process.exit(0);
}
