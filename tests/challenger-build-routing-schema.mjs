/**
 * Challenger 1: Empirical Verification Harness
 * Focus: Build Compilation, Static Route Integrity (41+ pages),
 * Schema JSON-LD Unified Knowledge Graph, Component Import/Export Integrity,
 * and Adversarial Resource Integrity.
 */

import fs from 'fs';
import path from 'path';

console.log('================================================================================');
console.log('  CHALLENGER 1: BUILD COMPILATION, ROUTING INTEGRITY & SCHEMA STRESS HARNESS    ');
console.log('================================================================================\n');

let passCount = 0;
let failCount = 0;
const failureList = [];

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`✓ [PASS] ${testName}`);
    passCount++;
  } else {
    console.error(`✗ [FAIL] ${testName} ${details ? '--> ' + details : ''}`);
    failCount++;
    failureList.push({ testName, details });
  }
}

// ==============================================================================
// 1. NEXT.JS BUILD ARTIFACTS & MANIFEST VERIFICATION
// ==============================================================================
console.log('\n--- SUITE 1: Next.js Production Build Artifacts & Manifests ---');

const nextDir = path.resolve('.next');
assert(fs.existsSync(nextDir), '.next output directory exists');

const buildIdPath = path.join(nextDir, 'BUILD_ID');
assert(fs.existsSync(buildIdPath), 'BUILD_ID exists');
const buildId = fs.existsSync(buildIdPath) ? fs.readFileSync(buildIdPath, 'utf8').trim() : '';
assert(buildId.length > 0, `BUILD_ID is valid: "${buildId}"`);

const buildManifestPath = path.join(nextDir, 'build-manifest.json');
assert(fs.existsSync(buildManifestPath), 'build-manifest.json exists');

const prerenderManifestPath = path.join(nextDir, 'prerender-manifest.json');
assert(fs.existsSync(prerenderManifestPath), 'prerender-manifest.json exists');

const prerenderData = JSON.parse(fs.readFileSync(prerenderManifestPath, 'utf8'));
const prerenderedRoutes = Object.keys(prerenderData.routes);
console.log(`Discovered prerendered routes count in manifest: ${prerenderedRoutes.length}`);

// ==============================================================================
// 2. ROUTE GENERATION INTEGRITY ACROSS 41+ PAGES
// ==============================================================================
console.log('\n--- SUITE 2: Route Generation Integrity Across 41+ Pages ---');

const expectedCoreRoutes = [
  '/',
  '/about',
  '/contact',
  '/get-quote',
  '/services',
  '/case-studies/trichy-international-airport',
  '/legal/privacy',
  '/legal/terms',
  '/legal/cookies'
];

const expectedServiceSlugs = [
  'private-security',
  'manpower',
  'housekeeping',
  'tender-procurement-supply',
  'scanning-digitalization-it',
  'csc-digital-citizen-services',
  'website-design-development',
  'whatsapp-automation-crm',
  'missed-call-lead-recovery',
  'nfc-review-standees',
  'qr-table-ordering',
  'whatsapp-loyalty-punch-card',
  'clinic-token-tracker',
  'garage-service-tracker',
  'emergency-parking-qr',
  'local-seo-gbp-ranking',
  'social-media-meta-ads',
  'linkedin-b2b-growth',
  'custom-software-web-apps',
  'email-marketing-automation',
  'commercial-video-production'
];

assert(expectedServiceSlugs.length === 21, `Expected exactly 21 service slugs (found: ${expectedServiceSlugs.length})`);

const serverAppDir = path.join(nextDir, 'server/app');
assert(fs.existsSync(serverAppDir), `server/app directory exists at ${serverAppDir}`);

// Check core pages
for (const route of expectedCoreRoutes) {
  const relPath = route === '/' ? 'index.html' : `${route.replace(/^\//, '')}.html`;
  const fullHtmlPath = path.join(serverAppDir, relPath);
  const exists = fs.existsSync(fullHtmlPath);
  assert(exists, `Core route prerendered HTML exists: ${route}`);
  if (exists) {
    const html = fs.readFileSync(fullHtmlPath, 'utf8');
    assert(html.includes('<html') && html.includes('</html>'), `${route} contains valid <html> structure`);
    assert(!html.includes('Hydration failed'), `${route} has zero hydration failure strings`);
    assert(!html.includes('Minified React error'), `${route} has zero SSR minified React errors`);
    assert(!html.includes('ReferenceError:'), `${route} has zero ReferenceError strings`);
    assert(!html.includes('TypeError:'), `${route} has zero TypeError strings`);
  }
}

// Check all 21 /services/[slug] pages
let verifiedServicePages = 0;
for (const slug of expectedServiceSlugs) {
  const route = `/services/${slug}`;
  const fullHtmlPath = path.join(serverAppDir, `services/${slug}.html`);
  const exists = fs.existsSync(fullHtmlPath);
  assert(exists, `Service route prerendered HTML exists: ${route}`);
  if (exists) {
    verifiedServicePages++;
    const html = fs.readFileSync(fullHtmlPath, 'utf8');
    assert(html.includes('<html') && html.includes('</html>'), `${route} contains valid <html> structure`);
    assert(!html.includes('Service Not Found'), `${route} renders service without "Service Not Found"`);
    assert(!html.includes('Hydration failed'), `${route} has zero hydration error strings`);
    assert(!html.includes('Minified React error'), `${route} has zero SSR minified React errors`);
  }
}
assert(verifiedServicePages === 21, `All 21 service pages verified in .next/server/app/services/`);

// Check API endpoints routes
const apiRoutes = [
  'src/app/api/contact/route.ts',
  'src/app/api/landing-lead/route.ts',
  'src/app/api/quote-pdf/route.ts',
  'src/app/api/webhook/whatsapp/route.ts'
];
for (const apiFile of apiRoutes) {
  assert(fs.existsSync(apiFile), `API route source file exists: ${apiFile}`);
}

// Total static pages in build manifest: 37 prerendered + special assets
assert(prerenderedRoutes.length >= 37, `Prerendered routes in prerender-manifest.json >= 37 (found: ${prerenderedRoutes.length})`);

// ==============================================================================
// 3. SCHEMA JSON-LD PARSING & UNIFIED KNOWLEDGE GRAPH VALIDATION
// ==============================================================================
console.log('\n--- SUITE 3: Schema JSON-LD & Unified Knowledge Graph Validation ---');

// Validate getUnifiedKnowledgeGraph() implementation in schema.ts
const schemaFilePath = path.resolve('src/lib/schema.ts');
assert(fs.existsSync(schemaFilePath), 'src/lib/schema.ts exists');
const schemaSrc = fs.readFileSync(schemaFilePath, 'utf8');

assert(schemaSrc.includes('export function getUnifiedKnowledgeGraph()'), 'getUnifiedKnowledgeGraph is exported');
assert(schemaSrc.includes('"@context": "https://schema.org"'), 'Schema defines @context: "https://schema.org"');
assert(schemaSrc.includes('"@graph": ['), 'Schema defines @graph root array');
assert(schemaSrc.includes('"@type": "Organization"'), 'Schema includes Organization entity');
assert(schemaSrc.includes('"@type": ["LocalBusiness"'), 'Schema includes LocalBusiness entity');
assert(schemaSrc.includes('"@type": "WebSite"'), 'Schema includes WebSite entity');
assert(schemaSrc.includes('"alternateName": ['), 'Schema declares alternateName array');
assert(schemaSrc.includes('"JSM"'), 'alternateName includes "JSM"');
assert(schemaSrc.includes('"JSM Security"'), 'alternateName includes "JSM Security"');
assert(schemaSrc.includes('"JSM Manpower"'), 'alternateName includes "JSM Manpower"');
assert(schemaSrc.includes('"JSMMANPOWER"'), 'alternateName includes "JSMMANPOWER"');
assert(schemaSrc.includes('"disambiguatingDescription":'), 'Schema declares disambiguatingDescription');
assert(schemaSrc.includes('"geo": {'), 'Schema declares geo block');
assert(schemaSrc.includes('"latitude": 10.7905'), 'geo declares latitude: 10.7905');
assert(schemaSrc.includes('"longitude": 78.7047'), 'geo declares longitude: 78.7047');

// Parse Schema JSON-LD across all static HTML files
console.log('\n  -> Parsing embedded JSON-LD scripts across all generated HTML pages...');
let totalJsonLdBlocks = 0;
let jsonLdParseErrors = 0;
let hasUnifiedGraphInRoot = false;

function scanDirForHtml(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      scanDirForHtml(full);
    } else if (f.endsWith('.html')) {
      const content = fs.readFileSync(full, 'utf8');
      const jsonLdRegex = /<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
      let match;
      while ((match = jsonLdRegex.exec(content)) !== null) {
        totalJsonLdBlocks++;
        try {
          const parsed = JSON.parse(match[1]);
          if (parsed['@graph'] && Array.isArray(parsed['@graph'])) {
            hasUnifiedGraphInRoot = true;
            // Verify entities in graph
            const types = parsed['@graph'].map(e => Array.isArray(e['@type']) ? e['@type'].join(',') : e['@type']);
            const hasOrg = types.some(t => t.includes('Organization'));
            const hasLocal = types.some(t => t.includes('LocalBusiness'));
            const hasWeb = types.some(t => t.includes('WebSite'));
            if (!hasOrg || !hasLocal || !hasWeb) {
              console.error(`Incomplete @graph in ${f}: types=${types}`);
            }
          }
        } catch (err) {
          jsonLdParseErrors++;
          console.error(`Failed to parse JSON-LD in ${f}: ${err.message}`);
        }
      }
    }
  }
}

scanDirForHtml(serverAppDir);
assert(jsonLdParseErrors === 0, `All embedded JSON-LD parsed syntactically valid JSON (errors: ${jsonLdParseErrors})`);
assert(totalJsonLdBlocks >= 100, `Total JSON-LD blocks parsed >= 100 (found: ${totalJsonLdBlocks})`);
assert(hasUnifiedGraphInRoot, 'Unified @graph Knowledge Graph successfully detected in rendered pages');

// ==============================================================================
// 4. COMPONENT IMPORTS AND BARREL EXPORTS INTEGRITY
// ==============================================================================
console.log('\n--- SUITE 4: Component Imports and Barrel Exports Integrity ---');

// Contract 1: magnetic-cursor.tsx must export useIsFinePointer
const magCursorPath = path.resolve('src/components/motion/magnetic-cursor.tsx');
assert(fs.existsSync(magCursorPath), 'src/components/motion/magnetic-cursor.tsx exists');
const magCursorSrc = fs.readFileSync(magCursorPath, 'utf8');
assert(magCursorSrc.includes('export function useIsFinePointer'), 'magnetic-cursor.tsx exports useIsFinePointer()');
assert(!magCursorSrc.includes('export function AmbientMagneticCursor'), 'AmbientMagneticCursor is retired');

// Contract 2: widgets/index.ts barrel exports
const widgetsIndexPath = path.resolve('src/components/widgets/index.ts');
assert(fs.existsSync(widgetsIndexPath), 'src/components/widgets/index.ts exists');
const widgetsIndexSrc = fs.readFileSync(widgetsIndexPath, 'utf8');
assert(widgetsIndexSrc.includes("export { RoiCalculator } from './roi-calculator'"), 'Exports RoiCalculator');
assert(widgetsIndexSrc.includes("export { QueueSimulator } from './queue-simulator'"), 'Exports QueueSimulator');
assert(widgetsIndexSrc.includes("export { ReviewFilterWidget } from './review-filter-widget'"), 'Exports ReviewFilterWidget');

// Contract 3: lib/seo.ts exports constructMetadata
const seoPath = path.resolve('src/lib/seo.ts');
assert(fs.existsSync(seoPath), 'src/lib/seo.ts exists');
const seoSrc = fs.readFileSync(seoPath, 'utf8');
assert(seoSrc.includes('export function constructMetadata'), 'seo.ts exports constructMetadata');

// Scan all TypeScript/TSX source files for internal unresolved imports
console.log('  -> Scanning all src/**/*.{ts,tsx} for broken relative or @/ imports...');
let brokenImports = 0;
const brokenImportDetails = [];

function checkImportsInDir(dir) {
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      checkImportsInDir(full);
    } else if (entry.endsWith('.ts') || entry.endsWith('.tsx')) {
      const code = fs.readFileSync(full, 'utf8');
      const importRegex = /(?:import|export)\s+(?:[\w*\s{},]*\s+from\s+)?['"](@\/[^'"]+|\.[^'"]+)['"]/g;
      let match;
      while ((match = importRegex.exec(code)) !== null) {
        const importSpecifier = match[1];
        let resolvedPath = null;

        if (importSpecifier.startsWith('@/')) {
          const relToSrc = importSpecifier.slice(2);
          const base = path.resolve('src', relToSrc);
          for (const ext of ['', '.ts', '.tsx', '.js', '.mjs', '/index.ts', '/index.tsx', '/index.js']) {
            if (fs.existsSync(base + ext) && !fs.statSync(base + ext).isDirectory()) {
              resolvedPath = base + ext;
              break;
            }
          }
        } else if (importSpecifier.startsWith('.')) {
          const base = path.resolve(path.dirname(full), importSpecifier);
          for (const ext of ['', '.ts', '.tsx', '.js', '.mjs', '/index.ts', '/index.tsx', '/index.js']) {
            if (fs.existsSync(base + ext) && !fs.statSync(base + ext).isDirectory()) {
              resolvedPath = base + ext;
              break;
            }
          }
        }

        if (!resolvedPath) {
          brokenImports++;
          brokenImportDetails.push({ file: full, specifier: importSpecifier });
        }
      }
    }
  }
}

checkImportsInDir(path.resolve('src'));
assert(brokenImports === 0, `Zero broken relative or @/ imports in src/**/*.{ts,tsx} (broken: ${brokenImports})`, JSON.stringify(brokenImportDetails));

// ==============================================================================
// 5. ADVERSARIAL ASSET INTEGRITY (AIRPORT SLIDESHOW & PUBLIC IMAGES)
// ==============================================================================
console.log('\n--- SUITE 5: Adversarial Asset Integrity Verification ---');

// Inspect airport-slideshow.tsx slides array
const slideshowPath = path.resolve('src/components/widgets/airport-slideshow.tsx');
assert(fs.existsSync(slideshowPath), 'airport-slideshow.tsx exists');
const slideshowSrc = fs.readFileSync(slideshowPath, 'utf8');

// Extract all src: '/images/...' paths
const imgSrcRegex = /src:\s*['"](\/images\/[^'"]+)['"]/g;
let match;
const slideshowImages = [];
while ((match = imgSrcRegex.exec(slideshowSrc)) !== null) {
  slideshowImages.push(match[1]);
}
console.log(`Discovered ${slideshowImages.length} image paths in airport-slideshow.tsx`);

let missingSlideshowImages = 0;
const missingImageList = [];
for (const imgPath of slideshowImages) {
  const onDisk = path.resolve('public' + imgPath);
  if (!fs.existsSync(onDisk)) {
    missingSlideshowImages++;
    missingImageList.push(imgPath);
  }
}

assert(
  missingSlideshowImages === 0,
  `All images referenced in airport-slideshow.tsx exist in public/ (missing: ${missingSlideshowImages})`,
  `Missing image files: ${missingImageList.join(', ')}`
);

// ==============================================================================
// 6. ESLINT STATUS VERIFICATION
// ==============================================================================
console.log('\n--- SUITE 6: ESLint Verification ---');
try {
  const { ESLint } = await import('eslint');
  const eslint = new ESLint();
  const lintResults = await eslint.lintFiles(['src/**/*.{ts,tsx}']);

  let lintErrors = 0;
  let lintWarnings = 0;
  const errorItems = [];

  for (const r of lintResults) {
    lintErrors += r.errorCount;
    lintWarnings += r.warningCount;
    if (r.errorCount > 0) {
      errorItems.push({
        file: r.filePath,
        errors: r.messages.filter(m => m.severity === 2).map(m => `L${m.line}: ${m.message} (${m.ruleId})`)
      });
    }
  }

  assert(lintErrors === 0, `ESLint reported 0 errors (found: ${lintErrors} errors, ${lintWarnings} warnings)`, JSON.stringify(errorItems, null, 2));
} catch (err) {
  assert(false, `ESLint execution failed: ${err.message}`);
}

// ==============================================================================
// FINAL SUMMARY & VERDICT
// ==============================================================================
console.log('\n================================================================================');
console.log(`  CHALLENGER 1 RESULTS: ${passCount} PASSED, ${failCount} FAILED`);
console.log('================================================================================\n');

if (failCount > 0) {
  console.error('FAILURES SUMMARY:');
  failureList.forEach((f, idx) => {
    console.error(`  ${idx + 1}. ${f.testName}`);
    if (f.details) console.error(`     Details: ${f.details}`);
  });
  console.log('\nFINAL VERDICT: REQUEST_CHANGES');
  process.exit(1);
} else {
  console.log('\nFINAL VERDICT: APPROVE');
  process.exit(0);
}
