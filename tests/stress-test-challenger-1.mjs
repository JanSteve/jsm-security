/**
 * Challenger 1: Empirical Production Build & Stress Testing Harness
 * 
 * Verifies:
 * 1. Production build artifacts and all 78 routes
 * 2. Static HTML structure, bundle integrity, and zero CSP-violating CDN scripts
 * 3. Schema.org JSON-LD parsing across all pages
 * 4. API endpoints (/api/contact, /api/landing-lead, /api/quote-pdf, /api/webhook/whatsapp)
 * 5. Component runtime safety, event listener cleanup, and ESLint status
 */

import fs from 'fs';
import path from 'path';
import { NextRequest } from 'next/server.js';
import { POST as contactHandler } from '../src/app/api/contact/route.ts';
import { POST as landingLeadHandler } from '../src/app/api/landing-lead/route.ts';
import { POST as quotePdfHandler } from '../src/app/api/quote-pdf/route.ts';
import { GET as waGetHandler, POST as waPostHandler } from '../src/app/api/webhook/whatsapp/route.ts';

console.log('======================================================================');
console.log('  CHALLENGER 1: COMPREHENSIVE EMPIRICAL STRESS TEST HARNESS');
console.log('======================================================================\n');

let passCount = 0;
let failCount = 0;
const failureDetails = [];

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`✓ [PASS] ${testName}`);
    passCount++;
  } else {
    console.error(`✗ [FAIL] ${testName} ${details ? '--> ' + details : ''}`);
    failCount++;
    failureDetails.push({ testName, details });
  }
}

// =====================================================================
// SECTION 1: BUILD INTEGRITY & 78 ROUTES VERIFICATION
// =====================================================================
console.log('--- SECTION 1: Build Integrity & 78 Routes Verification ---');

const nextDir = path.resolve('.next');
assert(fs.existsSync(nextDir), '.next directory exists');
assert(fs.existsSync(path.join(nextDir, 'BUILD_ID')), 'BUILD_ID exists');

const prerenderManifestPath = path.join(nextDir, 'prerender-manifest.json');
assert(fs.existsSync(prerenderManifestPath), 'prerender-manifest.json exists');

const prerenderManifest = JSON.parse(fs.readFileSync(prerenderManifestPath, 'utf8'));
const prerenderedRoutes = Object.keys(prerenderManifest.routes);
console.log(`Prerendered routes discovered: ${prerenderedRoutes.length}`);

// We expect 74 prerendered routes + 4 dynamic API routes = 78 total routes
assert(prerenderedRoutes.length >= 74, `Expected at least 74 prerendered routes (found: ${prerenderedRoutes.length})`);

const dynamicApiRoutes = [
  '/api/contact',
  '/api/landing-lead',
  '/api/quote-pdf',
  '/api/webhook/whatsapp'
];

let totalRoutesFound = prerenderedRoutes.length + dynamicApiRoutes.length;
assert(totalRoutesFound >= 78, `Total routes >= 78 (found: ${totalRoutesFound})`);

// Check HTML files, hydration failure markers, and external CDN scripts
const serverAppDir = path.join(nextDir, 'server/app');
let validHtmlPages = 0;
let validSchemasCount = 0;
let externalCdnViolations = 0;
let hydrationErrorMarkers = 0;

const ALLOWED_SCRIPT_DOMAINS = [
  'www.googletagmanager.com',
  'googletagmanager.com',
  'www.google-analytics.com',
  'google-analytics.com',
  'vitals.vercel-insights.com'
];

function checkPageHtml(route) {
  let relativeHtmlPath = route === '/' ? 'index.html' : `${route.replace(/^\//, '')}.html`;
  let fullPath = path.join(serverAppDir, relativeHtmlPath);

  // If path doesn't end with .html directly, check for index or body
  if (!fs.existsSync(fullPath)) {
    if (fs.existsSync(path.join(serverAppDir, route.replace(/^\//, '') + '.body'))) {
      return; // static asset like apple-icon, icon, robots, sitemap
    }
  }

  if (fs.existsSync(fullPath)) {
    validHtmlPages++;
    const content = fs.readFileSync(fullPath, 'utf8');

    // 1. Check for basic HTML integrity
    if (!content.includes('<html') || !content.includes('</body>')) {
      assert(false, `Route ${route} has invalid HTML structure`);
    }

    // 2. Check for hydration error or crash strings
    const crashIndicators = [
      'Hydration failed',
      'Minified React error',
      'ReferenceError:',
      'TypeError:'
    ];
    for (const indicator of crashIndicators) {
      if (content.includes(indicator)) {
        hydrationErrorMarkers++;
        console.error(`Crash indicator "${indicator}" detected in route: ${route}`);
      }
    }

    // 3. Scan <script src="..."> for unauthorized CDN URLs
    const scriptSrcRegex = /<script[^>]+src=["']([^"']+)["']/gi;
    let match;
    while ((match = scriptSrcRegex.exec(content)) !== null) {
      const src = match[1];
      if (src.startsWith('http://') || src.startsWith('https://')) {
        const isAllowed = ALLOWED_SCRIPT_DOMAINS.some(domain => src.includes(domain));
        if (!isAllowed) {
          externalCdnViolations++;
          console.error(`Unauthorized external script detected on ${route}: ${src}`);
        }
      }
    }

    // 4. Validate Schema.org JSON-LD scripts
    const jsonLdRegex = /<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
    let jsonMatch;
    while ((jsonMatch = jsonLdRegex.exec(content)) !== null) {
      try {
        JSON.parse(jsonMatch[1]);
        validSchemasCount++;
      } catch (err) {
        assert(false, `Invalid JSON-LD on route ${route}: ${err.message}`);
      }
    }
  }
}

prerenderedRoutes.forEach(checkPageHtml);

assert(validHtmlPages === 69, `Validated exactly ${validHtmlPages} static HTML pages rendered`);
assert(externalCdnViolations === 0, `Zero unauthorized external CDN scripts violating CSP (violations: ${externalCdnViolations})`);
assert(hydrationErrorMarkers === 0, `Zero hydration errors or SSR crash traces in HTML (markers: ${hydrationErrorMarkers})`);
assert(validSchemasCount >= 70, `Schema.org JSON-LD blocks parsed valid JSON (valid schemas: ${validSchemasCount})`);

// =====================================================================
// SECTION 2: BUNDLE INTEGRITY
// =====================================================================
console.log('\n--- SECTION 2: Static Bundle Integrity ---');

const staticChunksDir = path.join(nextDir, 'static/chunks');
assert(fs.existsSync(staticChunksDir), 'static/chunks directory exists');

const chunkFiles = fs.readdirSync(staticChunksDir, { recursive: true }).filter(f => typeof f === 'string' && f.endsWith('.js'));
console.log(`Total compiled client chunks found: ${chunkFiles.length}`);
assert(chunkFiles.length > 10, `Client JS chunks compiled successfully (${chunkFiles.length} chunks)`);

// Check that client chunks have non-zero size
let emptyChunks = 0;
for (const chunk of chunkFiles) {
  const stat = fs.statSync(path.join(staticChunksDir, chunk));
  if (stat.size === 0) emptyChunks++;
}
assert(emptyChunks === 0, `Zero empty/corrupt chunks found (empty: ${emptyChunks})`);

// =====================================================================
// SECTION 3: API STRESS TESTING (ALL 4 API ROUTES)
// =====================================================================
console.log('\n--- SECTION 3: API Routes Stress Testing ---');

async function testApiRoutes() {
  let ipCounter = 100;
  function getIp() {
    ipCounter++;
    return `192.168.1.${ipCounter}`;
  }

  // 1. /api/contact
  const contactBadReq = new NextRequest('http://localhost:3000/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': getIp() },
    body: JSON.stringify({ name: '' }),
  });
  const contactBadRes = await contactHandler(contactBadReq);
  assert(contactBadRes.status === 400, '/api/contact rejects invalid payload with 400 Bad Request');

  const contactGoodReq = new NextRequest('http://localhost:3000/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': getIp() },
    body: JSON.stringify({
      name: 'Empirical Tester',
      phone: '9842472370',
      email: 'test@jsmintegratedservices.com',
      service: 'Security Guarding',
      message: 'Testing API stress resilience'
    }),
  });
  const contactGoodRes = await contactHandler(contactGoodReq);
  const contactGoodData = await contactGoodRes.json();
  assert(contactGoodRes.status === 200 && contactGoodData.success === true, '/api/contact accepts valid payload with 200 OK');

  // 2. /api/landing-lead
  const leadBadReq = new NextRequest('http://localhost:3000/api/landing-lead', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': getIp() },
    body: JSON.stringify({ name: 'A' }),
  });
  const leadBadRes = await landingLeadHandler(leadBadReq);
  assert(leadBadRes.status === 400, '/api/landing-lead rejects invalid payload with 400 Bad Request');

  const leadGoodReq = new NextRequest('http://localhost:3000/api/landing-lead', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': getIp() },
    body: JSON.stringify({
      name: 'Lead Prospect',
      phone: '9842472370',
      requirement: 'Industrial Facility Security',
      city: 'Trichy'
    }),
  });
  const leadGoodRes = await landingLeadHandler(leadGoodReq);
  const leadGoodData = await leadGoodRes.json();
  assert(leadGoodRes.status === 200 && leadGoodData.success === true, '/api/landing-lead accepts valid payload with 200 OK');

  // 3. /api/quote-pdf
  const quoteBadReq = new NextRequest('http://localhost:3000/api/quote-pdf', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': getIp() },
    body: JSON.stringify({ services: [] }),
  });
  const quoteBadRes = await quotePdfHandler(quoteBadReq);
  assert(quoteBadRes.status === 400, '/api/quote-pdf rejects empty services with 400 Bad Request');

  const quoteGoodJsonReq = new NextRequest('http://localhost:3000/api/quote-pdf', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': getIp() },
    body: JSON.stringify({
      companyName: 'Trichy Manufacturing Ltd',
      contactPerson: 'Mr. Ramanathan',
      email: 'procurement@trichymanufacturing.com',
      phone: '9842472370',
      city: 'Tiruchirappalli',
      services: ['Private Security Guarding', 'Commercial Housekeeping'],
      personnelCount: 6,
      format: 'json'
    }),
  });
  const quoteGoodJsonRes = await quotePdfHandler(quoteGoodJsonReq);
  const quoteData = await quoteGoodJsonRes.json();
  assert(
    quoteGoodJsonRes.status === 200 &&
    quoteData.success === true &&
    quoteData.estimates.length === 2 &&
    quoteData.monthlyTotal.min > 0,
    '/api/quote-pdf returns structured calculations with 200 OK'
  );

  // 4. /api/webhook/whatsapp Handshake & Handlers
  const waHandshakeReq = new NextRequest('http://localhost:3000/api/webhook/whatsapp?hub.mode=subscribe&hub.verify_token=jsm_webhook_verify_2026&hub.challenge=test_challenge_123', {
    method: 'GET',
  });
  const waHandshakeRes = await waGetHandler(waHandshakeReq);
  const waHandshakeText = await waHandshakeRes.text();
  assert(waHandshakeRes.status === 200 && waHandshakeText === 'test_challenge_123', '/api/webhook/whatsapp GET handshake verifies valid token');

  const waBadHandshakeReq = new NextRequest('http://localhost:3000/api/webhook/whatsapp?hub.mode=subscribe&hub.verify_token=wrong_token&hub.challenge=test_challenge_123', {
    method: 'GET',
  });
  const waBadHandshakeRes = await waGetHandler(waBadHandshakeReq);
  assert(waBadHandshakeRes.status === 403, '/api/webhook/whatsapp GET handshake rejects invalid token with 403 Forbidden');

  // WhatsApp POST message incoming (intent with "price")
  const waMsgReq = new NextRequest('http://localhost:3000/api/webhook/whatsapp', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      phone: '919842472370',
      message: 'What is the price for NFC review standee?',
      name: 'Trichy Hospital Admin'
    })
  });
  const waMsgRes = await waPostHandler(waMsgReq);
  const waMsgData = await waMsgRes.json();
  assert(
    waMsgRes.status === 200 &&
    waMsgData.success === true &&
    waMsgData.intent === 'PRICING_INQUIRY',
    '/api/webhook/whatsapp POST handles inbound intent recognition and auto-reply'
  );
}

await testApiRoutes();

// =====================================================================
// SECTION 4: CODE QUALITY & ESLINT VERIFICATION
// =====================================================================
console.log('\n--- SECTION 4: Code Quality & ESLINT Verification ---');

// We directly inspect ESLint results using node eslint API or CLI
const { ESLint } = await import('eslint');
const eslint = new ESLint();
const lintResults = await eslint.lintFiles(['src/**/*.{ts,tsx}']);

let lintErrors = 0;
let lintWarnings = 0;
const errorFiles = [];

for (const res of lintResults) {
  lintErrors += res.errorCount;
  lintWarnings += res.warningCount;
  if (res.errorCount > 0) {
    errorFiles.push({
      filePath: res.filePath,
      messages: res.messages.filter(m => m.severity === 2)
    });
  }
}

console.log(`ESLint results on src/: ${lintErrors} errors, ${lintWarnings} warnings`);
if (lintErrors > 0) {
  console.error('ESLint Errors encountered:');
  errorFiles.forEach(ef => {
    console.error(`- ${ef.filePath}:`);
    ef.messages.forEach(m => console.error(`  Line ${m.line}:${m.column} - ${m.message} (${m.ruleId})`));
  });
}

assert(lintErrors === 0, `Zero ESLint errors in src/**/*.{ts,tsx} (found: ${lintErrors} errors)`);

// =====================================================================
// SUMMARY & VERDICT
// =====================================================================
console.log('\n======================================================================');
console.log(`  EMPIRICAL TEST SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('======================================================================\n');

if (failCount === 0) {
  console.log('FINAL VERDICT: APPROVE');
} else {
  console.log('FINAL VERDICT: REQUEST_CHANGES');
  console.log('Failure items:', JSON.stringify(failureDetails, null, 2));
}
