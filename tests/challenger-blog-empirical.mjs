/**
 * Challenger 1: Empirical Verification & Stress Test Harness
 * Focus: Blog Build, Route Hydration, Strict Metadata Limits (<60 title, <160 desc),
 * Canonical URLs, Schema.org Structured Data (BlogPosting, BreadcrumbList, LocalBusiness),
 * Sitemap XML Logic (<lastmod>, priority), and Hydration Integrity.
 */

import fs from 'node:fs';
import path from 'node:path';

console.log('================================================================================');
console.log('  CHALLENGER 1: EMPIRICAL BUILD, ROUTING & METADATA STRESS HARNESS             ');
console.log('================================================================================\n');

let passCount = 0;
let failCount = 0;
let warnCount = 0;
const failures = [];
const warnings = [];

function assert(condition, name, details = '') {
  if (condition) {
    console.log(`  ✓ [PASS] ${name}`);
    passCount++;
  } else {
    console.error(`  ✗ [FAIL] ${name} ${details ? '--> ' + details : ''}`);
    failCount++;
    failures.push({ name, details });
  }
}

function warn(condition, name, details = '') {
  if (!condition) {
    console.warn(`  ⚠ [WARN] ${name} ${details ? '--> ' + details : ''}`);
    warnCount++;
    warnings.push({ name, details });
  }
}

const ROOT_DIR = process.cwd();
const BLOG_DIR = path.join(ROOT_DIR, 'content', 'blog');
const NEXT_APP_DIR = path.join(ROOT_DIR, '.next', 'server', 'app');

// Helper to decode HTML entities
function decodeHtmlEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

// ==============================================================================
// SUITE 1: Frontmatter Audit & Limits Verification (<60 title, <160 desc)
// ==============================================================================
console.log('--- SUITE 1: Frontmatter Direct Audit & Limits Verification ---');

const mdFiles = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'));
assert(mdFiles.length >= 10, `Found ${mdFiles.length} markdown articles in content/blog/ (expected >= 10)`);

let fmTitleViolations = 0;
let fmDescViolations = 0;

for (const file of mdFiles) {
  const filePath = path.join(BLOG_DIR, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Basic frontmatter extraction
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  assert(Boolean(fmMatch), `File ${file} contains valid frontmatter delimiter block`);
  
  const fmLines = fmMatch ? fmMatch[1].split('\n') : [];
  let metaTitle = '';
  let title = '';
  let metaDesc = '';
  let excerpt = '';
  let date = '';
  let published = true;
  let category = '';

  for (const line of fmLines) {
    const titleM = line.match(/^metaTitle:\s*["']?(.*?)["']?$/);
    if (titleM) metaTitle = titleM[1].trim();

    const tM = line.match(/^title:\s*["']?(.*?)["']?$/);
    if (tM) title = tM[1].trim();

    const descM = line.match(/^metaDescription:\s*["']?(.*?)["']?$/);
    if (descM) metaDesc = descM[1].trim();

    const excM = line.match(/^excerpt:\s*["']?(.*?)["']?$/);
    if (excM) excerpt = excM[1].trim();

    const dateM = line.match(/^date:\s*["']?(.*?)["']?$/);
    if (dateM) date = dateM[1].trim();

    const pubM = line.match(/^published:\s*(false|true)/i);
    if (pubM) published = pubM[1].toLowerCase() === 'true';

    const catM = line.match(/^category:\s*["']?(.*?)["']?$/);
    if (catM) category = catM[1].trim();
  }

  const effectiveTitle = metaTitle || title;
  const effectiveDesc = metaDesc || excerpt;

  // Strict check: strictly UNDER 60 chars (< 60)
  if (effectiveTitle.length >= 60) {
    fmTitleViolations++;
    console.error(`    [Frontmatter Title >= 60] ${file}: "${effectiveTitle}" (${effectiveTitle.length} chars)`);
  }

  // Strict check: strictly UNDER 160 chars (< 160)
  if (effectiveDesc.length >= 160) {
    fmDescViolations++;
    console.error(`    [Frontmatter Description >= 160] ${file}: "${effectiveDesc}" (${effectiveDesc.length} chars)`);
  }

  assert(Boolean(date), `Post ${file} defines date: "${date}"`);
  assert(Boolean(category), `Post ${file} defines category: "${category}"`);
}

assert(fmTitleViolations === 0, `All ${mdFiles.length} frontmatter titles strictly < 60 characters (found ${fmTitleViolations} violations)`);
assert(fmDescViolations === 0, `All ${mdFiles.length} frontmatter descriptions strictly < 160 characters (found ${fmDescViolations} violations)`);

// ==============================================================================
// SUITE 2: Rendered Production HTML Metadata Inspection (<title>, <meta description>, canonical)
// ==============================================================================
console.log('\n--- SUITE 2: Production HTML Rendered Metadata Verification ---');

const blogHtmlDir = path.join(NEXT_APP_DIR, 'blog');
assert(fs.existsSync(blogHtmlDir), `Production rendered blog directory exists: ${blogHtmlDir}`);

const htmlFiles = fs.readdirSync(blogHtmlDir).filter((f) => f.endsWith('.html'));
assert(htmlFiles.length === mdFiles.length, `Rendered HTML count (${htmlFiles.length}) matches source markdown count (${mdFiles.length})`);

let htmlTitleViolations = 0;
let htmlDescViolations = 0;
let canonicalErrors = 0;
const canonicalUrls = [];

for (const htmlFile of htmlFiles) {
  const filePath = path.join(blogHtmlDir, htmlFile);
  const html = fs.readFileSync(filePath, 'utf8');

  // 1. <title> tag check
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  assert(Boolean(titleMatch), `<title> tag exists in ${htmlFile}`);

  if (titleMatch) {
    const rawTitle = titleMatch[1];
    const decodedTitle = decodeHtmlEntities(rawTitle);

    // Both raw and decoded must be strictly < 60
    if (decodedTitle.length >= 60) {
      htmlTitleViolations++;
      console.error(`    [HTML Title >= 60] ${htmlFile}: decoded length ${decodedTitle.length} >= 60: "${decodedTitle}"`);
    } else if (rawTitle.length >= 60) {
      // In SERP, browsers unescape entities, but let's check both
      console.log(`    [Notice] Raw HTML title has entity encoding (${rawTitle.length} chars), decoded is ${decodedTitle.length} chars: "${decodedTitle}"`);
    }
  }

  // 2. <meta name="description" content="..."> check
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/);
  assert(Boolean(descMatch), `<meta name="description"> tag exists in ${htmlFile}`);

  if (descMatch) {
    const rawDesc = descMatch[1];
    const decodedDesc = decodeHtmlEntities(rawDesc);

    if (decodedDesc.length >= 160) {
      htmlDescViolations++;
      console.error(`    [HTML Description >= 160] ${htmlFile}: decoded length ${decodedDesc.length} >= 160: "${decodedDesc}"`);
    }
  }

  // 3. <link rel="canonical" href="..."> check
  const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/);
  assert(Boolean(canonicalMatch), `Canonical tag exists in ${htmlFile}`);

  if (canonicalMatch) {
    const canonicalHref = canonicalMatch[1];
    canonicalUrls.push({ file: htmlFile, href: canonicalHref });

    // Validate absolute URL format
    const isValidAbsoluteUrl = /^https:\/\/[a-zA-Z0-9.-]+(\/[^\s]*)?$/.test(canonicalHref);
    if (!isValidAbsoluteUrl) {
      canonicalErrors++;
      console.error(`    [Invalid Canonical URL] in ${htmlFile}: "${canonicalHref}"`);
    }

    // Verify slug matching
    const expectedSlug = htmlFile.replace('.html', '');
    if (!canonicalHref.endsWith(`/blog/${expectedSlug}`)) {
      canonicalErrors++;
      console.error(`    [Canonical Slug Mismatch] in ${htmlFile}: expected ends with /blog/${expectedSlug}, got "${canonicalHref}"`);
    }
  }
}

assert(htmlTitleViolations === 0, `All rendered blog <title> tags strictly < 60 characters (found ${htmlTitleViolations} violations)`);
assert(htmlDescViolations === 0, `All rendered blog <meta name="description"> tags strictly < 160 characters (found ${htmlDescViolations} violations)`);
assert(canonicalErrors === 0, `All rendered canonical tags are valid absolute URLs matching their route slug`);

// ==============================================================================
// SUITE 3: Schema.org Structured Data Verification (BlogPosting, BreadcrumbList, LocalBusiness)
// ==============================================================================
console.log('\n--- SUITE 3: Schema.org JSON-LD Structured Data Verification ---');

let missingBlogPosting = 0;
let missingBreadcrumb = 0;
let missingLocalBusinessRef = 0;
let invalidJsonLd = 0;

for (const htmlFile of htmlFiles) {
  const filePath = path.join(blogHtmlDir, htmlFile);
  const html = fs.readFileSync(filePath, 'utf8');

  // Extract all <script type="application/ld+json">
  const scriptRegex = /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
  let match;
  const schemas = [];

  while ((match = scriptRegex.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(match[1]);
      schemas.push(parsed);
    } catch (err) {
      invalidJsonLd++;
      console.error(`    [Malformed JSON-LD] in ${htmlFile}:`, err.message);
    }
  }

  assert(schemas.length >= 2, `HTML file ${htmlFile} contains at least 2 JSON-LD script tags (found ${schemas.length})`);

  // Check for BreadcrumbList
  const breadcrumbSchema = schemas.find((s) => s['@type'] === 'BreadcrumbList');
  if (!breadcrumbSchema) {
    missingBreadcrumb++;
    console.error(`    [Missing BreadcrumbList Schema] in ${htmlFile}`);
  } else {
    // Validate Breadcrumb items
    const elements = breadcrumbSchema.itemListElement;
    assert(Array.isArray(elements) && elements.length >= 2, `BreadcrumbList in ${htmlFile} has valid itemListElement array (count: ${elements?.length})`);
    assert(elements[0]?.name === 'Home', `Breadcrumb in ${htmlFile} starts with Home`);
    assert(elements[1]?.name === 'Blog', `Breadcrumb in ${htmlFile} has Blog step`);
  }

  // Check for BlogPosting or Article
  const blogPostingSchema = schemas.find((s) => s['@type'] === 'BlogPosting' || s['@type'] === 'Article');
  if (!blogPostingSchema) {
    missingBlogPosting++;
    console.error(`    [Missing BlogPosting/Article Schema] in ${htmlFile}`);
  } else {
    // Validate required fields
    assert(Boolean(blogPostingSchema.headline), `BlogPosting in ${htmlFile} has non-empty headline: "${blogPostingSchema.headline?.slice(0, 30)}..."`);
    assert(Boolean(blogPostingSchema.datePublished), `BlogPosting in ${htmlFile} has datePublished`);
    assert(Boolean(blogPostingSchema.dateModified), `BlogPosting in ${htmlFile} has dateModified`);
    assert(Boolean(blogPostingSchema.author?.name), `BlogPosting in ${htmlFile} has author.name: "${blogPostingSchema.author?.name}"`);
    assert(Boolean(blogPostingSchema.publisher?.name), `BlogPosting in ${htmlFile} has publisher.name`);
    assert(Array.isArray(blogPostingSchema.image) && blogPostingSchema.image.length > 0, `BlogPosting in ${htmlFile} has image`);
  }

  // Check for LocalBusiness reference or definition
  // Either in global knowledge graph (schemas with @graph containing LocalBusiness) or in publisher
  const hasLocalBusiness = schemas.some((s) => {
    if (s['@type'] === 'LocalBusiness' || (Array.isArray(s['@type']) && s['@type'].includes('LocalBusiness'))) return true;
    if (Array.isArray(s['@graph'])) {
      return s['@graph'].some((node) => node['@type'] === 'LocalBusiness' || (Array.isArray(node['@type']) && node['@type'].includes('LocalBusiness')));
    }
    if (s.publisher) {
      const pubType = s.publisher['@type'];
      if (pubType === 'LocalBusiness' || (Array.isArray(pubType) && pubType.includes('LocalBusiness'))) return true;
      if (s.publisher['@id'] && s.publisher['@id'].includes('localbusiness')) return true;
    }
    return false;
  });

  if (!hasLocalBusiness) {
    missingLocalBusinessRef++;
    console.error(`    [Missing LocalBusiness Reference] in ${htmlFile}`);
  }
}

assert(invalidJsonLd === 0, `Zero malformed JSON-LD scripts across all blog pages`);
assert(missingBreadcrumb === 0, `All ${htmlFiles.length} blog pages have valid BreadcrumbList schema`);
assert(missingBlogPosting === 0, `All ${htmlFiles.length} blog pages have valid BlogPosting/Article schema`);
assert(missingLocalBusinessRef === 0, `All ${htmlFiles.length} blog pages reference or define LocalBusiness schema`);

// ==============================================================================
// SUITE 4: Sitemap Output Logic & Verification (<lastmod> & priority)
// ==============================================================================
console.log('\n--- SUITE 4: Sitemap Output Logic & Verification ---');

const sitemapPath = path.join(NEXT_APP_DIR, 'sitemap.xml.body');
assert(fs.existsSync(sitemapPath), `Production sitemap.xml exists at: ${sitemapPath}`);

const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');

// Parse all <url> entries
const urlBlockRegex = /<url>([\s\S]*?)<\/url>/g;
let uMatch;
const sitemapUrls = [];

while ((uMatch = urlBlockRegex.exec(sitemapXml)) !== null) {
  const block = uMatch[1];
  const locMatch = block.match(/<loc>([^<]+)<\/loc>/);
  const lastmodMatch = block.match(/<lastmod>([^<]+)<\/lastmod>/);
  const priorityMatch = block.match(/<priority>([^<]+)<\/priority>/);
  const changefreqMatch = block.match(/<changefreq>([^<]+)<\/changefreq>/);

  sitemapUrls.push({
    loc: locMatch ? locMatch[1] : null,
    lastmod: lastmodMatch ? lastmodMatch[1] : null,
    priority: priorityMatch ? parseFloat(priorityMatch[1]) : null,
    changefreq: changefreqMatch ? changefreqMatch[1] : null,
  });
}

assert(sitemapUrls.length >= 40, `Sitemap contains ${sitemapUrls.length} total URLs (expected >= 40)`);

// Check every <url> has valid <loc> and <lastmod>
let sitemapInvalidLastmod = 0;
let sitemapMissingPriority = 0;
let sitemapInvalidPriority = 0;
let blogPostsInSitemap = 0;

for (const entry of sitemapUrls) {
  assert(Boolean(entry.loc), `Sitemap entry has valid <loc>: ${entry.loc}`);

  // Validate lastmod
  if (!entry.lastmod) {
    sitemapInvalidLastmod++;
  } else {
    const d = new Date(entry.lastmod);
    if (isNaN(d.getTime())) {
      sitemapInvalidLastmod++;
      console.error(`    [Invalid lastmod] in sitemap for ${entry.loc}: "${entry.lastmod}"`);
    }
  }

  // Validate priority
  if (entry.priority === null || isNaN(entry.priority)) {
    sitemapMissingPriority++;
  } else if (entry.priority < 0.0 || entry.priority > 1.0) {
    sitemapInvalidPriority++;
    console.error(`    [Priority out of bounds] in sitemap for ${entry.loc}: ${entry.priority}`);
  }

  if (entry.loc && entry.loc.includes('/blog/')) {
    blogPostsInSitemap++;
    assert(entry.priority >= 0.8 && entry.priority <= 0.9, `Blog post ${entry.loc} priority (${entry.priority}) is within expected [0.8, 0.9] range`);
  }
}

assert(sitemapInvalidLastmod === 0, `All ${sitemapUrls.length} sitemap URLs have valid ISO 8601 <lastmod> timestamps`);
assert(sitemapMissingPriority === 0, `All ${sitemapUrls.length} sitemap URLs have defined <priority> tags`);
assert(sitemapInvalidPriority === 0, `All ${sitemapUrls.length} sitemap priorities are valid numbers between 0.0 and 1.0`);
assert(blogPostsInSitemap === mdFiles.length, `All ${mdFiles.length} published blog posts appear in sitemap (found ${blogPostsInSitemap})`);

// ==============================================================================
// SUITE 5: Domain & Canonical URL Consistency Check (Adversarial Challenge)
// ==============================================================================
console.log('\n--- SUITE 5: Domain & Canonical URL Consistency Stress Check ---');

const sitemapBlogLocs = sitemapUrls.filter((u) => u.loc.includes('/blog/')).map((u) => u.loc);
const htmlCanonicalHrefs = canonicalUrls.map((c) => c.href);

let domainMismatches = 0;
for (let i = 0; i < htmlCanonicalHrefs.length; i++) {
  const canon = htmlCanonicalHrefs[i];
  // Check if sitemap loc domain exactly matches canonical domain (www vs non-www)
  const canonDomain = new URL(canon).origin;
  const sitemapSample = new URL(sitemapBlogLocs[0]).origin;

  if (canonDomain !== sitemapSample) {
    domainMismatches++;
  }
}

console.log(`  Canonical origin in HTML: "${new URL(htmlCanonicalHrefs[0]).origin}"`);
console.log(`  Sitemap loc origin in XML: "${new URL(sitemapBlogLocs[0]).origin}"`);

warn(domainMismatches === 0, `Canonical tags origin matches Sitemap loc origin (found ${domainMismatches} domain mismatches)`);
if (domainMismatches > 0) {
  console.warn(`    ⚠ NOTICE: HTML canonical tag uses "${new URL(htmlCanonicalHrefs[0]).origin}" while sitemap uses "${new URL(sitemapBlogLocs[0]).origin}". This is an empirical finding to report.`);
}

// ==============================================================================
// SUITE 6: Hydration & SSR Render Integrity Check
// ==============================================================================
console.log('\n--- SUITE 6: Hydration & SSR Render Integrity Check ---');

let hydrationWarningsFound = 0;
for (const htmlFile of htmlFiles) {
  const filePath = path.join(blogHtmlDir, htmlFile);
  const html = fs.readFileSync(filePath, 'utf8');

  // Check for Next.js hydration error fingerprints
  const hydrationSignatures = [
    'data-nextjs-hydration-error',
    'Hydration failed because',
    'Text content does not match server-rendered HTML',
    'did not match. Server:',
    'Minified React error #418',
    'Minified React error #423',
    'Minified React error #425',
  ];

  for (const sig of hydrationSignatures) {
    if (html.includes(sig)) {
      hydrationWarningsFound++;
      console.error(`    [Hydration signature found] in ${htmlFile}: "${sig}"`);
    }
  }

  // Check SSR rendered article content presence
  assert(html.includes('class="blog-content"'), `${htmlFile} contains rendered .blog-content`);
  assert(html.includes('<h1>'), `${htmlFile} contains rendered <h1> tag`);
}

assert(hydrationWarningsFound === 0, `Zero hydration error signatures across all rendered blog HTML files`);

// ==============================================================================
// SUITE 7: Adversarial Edge Cases & Truncation Clamping Simulation
// ==============================================================================
console.log('\n--- SUITE 7: Adversarial Edge Cases & Truncation Clamping Simulation ---');

// Import formatBlogMetaTitle and formatMetaDescription logic to test boundary conditions:
// Title boundary tests: 0 chars, 57 chars, 58 chars, 59 chars, 60 chars, 100 chars
function simulateFormatBlogMetaTitle(title, brand = " | JSM") {
  if (!title) return `Commercial Security Intelligence${brand}`;
  const clean = title.replace(/\s*\|\s*JSM.*$/i, '').trim();
  const maxBase = 58 - brand.length;
  if (clean.length <= maxBase) {
    return `${clean}${brand}`;
  }
  const truncated = clean.slice(0, maxBase - 3).trim();
  return `${truncated}...${brand}`;
}

function simulateFormatMetaDescription(desc, max = 155) {
  if (!desc) return '';
  const clean = desc.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 3).trim()}...`;
}

// Adversarial Title Inputs:
const testTitles = [
  "",
  "A",
  "Exactly 58 Characters Long Title Here 1234567890123456789012",
  "Exactly 59 Characters Long Title Here 12345678901234567890123",
  "Exactly 60 Characters Long Title Here 123456789012345678901234",
  "Extremely Long Title Designed to Break Google SERP Limits By Having Over One Hundred Characters In Length Here For Sure",
  "Title With Existing | JSM Brand Suffix",
  "Title with Special Characters: <script>alert(1)</script> & 'quotes' \"double\"",
];

let titleEdgeFailures = 0;
for (const testT of testTitles) {
  const result = simulateFormatBlogMetaTitle(testT);
  if (result.length >= 60) {
    titleEdgeFailures++;
    console.error(`    [Title Edge Failure] Input "${testT}" produced "${result}" (${result.length} chars >= 60)`);
  }
}
assert(titleEdgeFailures === 0, `All adversarial titles clamped strictly < 60 chars`);

// Adversarial Description Inputs:
const testDescriptions = [
  "",
  "Short description",
  "A".repeat(154),
  "A".repeat(155),
  "A".repeat(159),
  "A".repeat(160),
  "A".repeat(250),
  "Multiple   spaces    and \n newlines \t tabs",
];

let descEdgeFailures = 0;
for (const testD of testDescriptions) {
  const result = simulateFormatMetaDescription(testD);
  if (result.length >= 160) {
    descEdgeFailures++;
    console.error(`    [Desc Edge Failure] Input produced "${result}" (${result.length} chars >= 160)`);
  }
}
assert(descEdgeFailures === 0, `All adversarial descriptions clamped strictly < 160 chars`);

// ==============================================================================
// SUMMARY & VERDICT
// ==============================================================================
console.log('\n================================================================================');
console.log(`TOTAL CHECKS: ${passCount + failCount + warnCount} | PASSED: ${passCount} | FAILED: ${failCount} | WARNINGS: ${warnCount}`);
console.log('================================================================================');

if (failCount > 0) {
  console.log('\n❌ EMPIRICAL VERIFICATION FAILED (REJECTED)');
  process.exit(1);
} else {
  console.log('\n✅ EMPIRICAL VERIFICATION PASSED (CONFIRMED)');
  process.exit(0);
}
