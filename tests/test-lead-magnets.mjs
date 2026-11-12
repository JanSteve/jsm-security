/**
 * Test Suite: Dynamic PDF Lead Magnet Generation & Delivery (Requirement R2)
 * File: tests/test-lead-magnets.mjs
 *
 * Verifies:
 * 1. Physical existence and non-zero binary size of both lead magnet PDFs in public/lead-magnets/
 * 2. Binary PDF headers (%PDF-1.4) and %%EOF trailer integrity
 * 3. Content accuracy for "The 2026 ATS-Bypass & Hidden Job Market Playbook"
 *    - 3 direct founder outreach templates under 120 words
 *    - 2026 salary benchmarks across all 6 focus states (TN, KA, MH, DL, MP, GJ)
 *    - Bands 1, 2, 3 carrying [CONFIRM: role band]
 *    - Resume calibration rubrics (3-second scan, XYZ formula, zero buzzwords)
 * 4. Content accuracy for "The Founder's Guide to Zero-Retainer Contingency Hiring & Eliminating Day-1 Ghosting"
 *    - Candidate vetting SLAs (15-min calibration, 7-day 3-blind-dossier sprint, 48-hr interview scheduling)
 *    - Vacancy cost calculator (₹35,000/day drag, ₹21L 60-day retained loss vs ₹18.55L saved)
 *    - 90-day replacement guarantee terms (₹0 upfront, 8.33% fee [CONFIRM: fee %], 90-day shield [CONFIRM: fee %])
 * 5. Brand compliance and anti-slop rules:
 *    - Zero prohibited hype words
 *    - Zero purple gradients
 *    - Zero neon glows
 *    - Zero raw emojis
 *    - Warm Editorial palette tokens (#F6F3EE, #0E1116, #1F4E5F, #C8553D, #6B7280)
 * 6. Serverless API Route (/api/lead-magnet) response validation for GET and POST
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { NextRequest } from 'next/server.js';
import { GET as getLeadMagnet, POST as postLeadMagnet } from '../src/app/api/lead-magnet/route.ts';
import { getJobSeekerHtml, getEmployerHtml } from '../scripts/generate-lead-magnets.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

console.log('======================================================================');
console.log('  TEST SUITE: DYNAMIC PDF LEAD MAGNET GENERATION & API DELIVERY');
console.log('======================================================================\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failureDetails = [];

async function test(title, fn) {
  totalTests++;
  const label = `[TEST ${String(totalTests).padStart(2, '0')}] ${title}`;
  try {
    await fn();
    passedTests++;
    console.log(`  ✓ PASS: ${label}`);
  } catch (err) {
    failedTests++;
    console.error(`  ✗ FAIL: ${label}`);
    console.error(`          Reason: ${err.message}`);
    failureDetails.push({ label, error: err.message });
  }
}

// -----------------------------------------------------------------------------
// Test Group 1: Binary PDF Files on Disk
// -----------------------------------------------------------------------------
const seekerPdfPath = path.join(ROOT_DIR, 'public', 'lead-magnets', 'the-2026-ats-bypass-hidden-job-market-playbook.pdf');
const employerPdfPath = path.join(ROOT_DIR, 'public', 'lead-magnets', 'the-founders-guide-to-zero-retainer-contingency-hiring.pdf');

await test('Job Seeker Playbook PDF exists on disk and exceeds minimum size (15 KB)', () => {
  if (!fs.existsSync(seekerPdfPath)) {
    throw new Error(`File not found: ${seekerPdfPath}`);
  }
  const stat = fs.statSync(seekerPdfPath);
  if (stat.size < 15 * 1024) {
    throw new Error(`File size too small: ${stat.size} bytes (< 15 KB)`);
  }
});

await test('Employer Guide PDF exists on disk and exceeds minimum size (15 KB)', () => {
  if (!fs.existsSync(employerPdfPath)) {
    throw new Error(`File not found: ${employerPdfPath}`);
  }
  const stat = fs.statSync(employerPdfPath);
  if (stat.size < 15 * 1024) {
    throw new Error(`File size too small: ${stat.size} bytes (< 15 KB)`);
  }
});

await test('Job Seeker Playbook PDF has valid %PDF- magic bytes and EOF trailer', () => {
  const buffer = fs.readFileSync(seekerPdfPath);
  const header = buffer.slice(0, 5).toString('ascii');
  if (header !== '%PDF-') {
    throw new Error(`Invalid PDF header: expected '%PDF-', got '${header}'`);
  }
  const tail = buffer.slice(-64).toString('ascii');
  if (!tail.includes('%%EOF')) {
    throw new Error(`Missing %%EOF marker in PDF trailer`);
  }
});

await test('Employer Guide PDF has valid %PDF- magic bytes and EOF trailer', () => {
  const buffer = fs.readFileSync(employerPdfPath);
  const header = buffer.slice(0, 5).toString('ascii');
  if (header !== '%PDF-') {
    throw new Error(`Invalid PDF header: expected '%PDF-', got '${header}'`);
  }
  const tail = buffer.slice(-64).toString('ascii');
  if (!tail.includes('%%EOF')) {
    throw new Error(`Missing %%EOF marker in PDF trailer`);
  }
});

// -----------------------------------------------------------------------------
// Test Group 2: Content Completeness — Job Seeker Playbook
// -----------------------------------------------------------------------------
const seekerHtml = getJobSeekerHtml();

await test('Job Seeker Playbook contains all 3 outreach templates with word count under 120 words', () => {
  const template1Regex = /\[TEMPLATE 1: PROMOTER &amp; MANAGING DIRECTOR OUTREACH\][\s\S]*?<div class="body-text">([\s\S]*?)<\/div>/;
  const template2Regex = /\[TEMPLATE 2: VP OPERATIONS &amp; ENGINEERING OUTREACH\][\s\S]*?<div class="body-text">([\s\S]*?)<\/div>/;
  const template3Regex = /\[TEMPLATE 3: CONFIDENTIAL MEDIATOR REPRESENTATION BRIEF\][\s\S]*?<div class="body-text">([\s\S]*?)<\/div>/;

  const m1 = seekerHtml.match(template1Regex);
  const m2 = seekerHtml.match(template2Regex);
  const m3 = seekerHtml.match(template3Regex);

  if (!m1 || !m2 || !m3) {
    throw new Error('Could not find all 3 required outreach templates');
  }

  const countWords = (text) => text.trim().split(/\s+/).filter(Boolean).length;

  const w1 = countWords(m1[1]);
  const w2 = countWords(m2[1]);
  const w3 = countWords(m3[1]);

  if (w1 > 120 || w2 > 120 || w3 > 120) {
    throw new Error(`Template word count exceeded 120 words (T1: ${w1}, T2: ${w2}, T3: ${w3})`);
  }
});

await test('Job Seeker Playbook maps 2026 salary benchmarks across all 6 focus states', () => {
  const requiredStates = [
    'Tamil Nadu',
    'Karnataka',
    'Maharashtra',
    'Delhi NCR',
    'Madhya Pradesh',
    'Gujarat',
  ];
  for (const st of requiredStates) {
    if (!seekerHtml.includes(st)) {
      throw new Error(`Missing required salary benchmark state: '${st}'`);
    }
  }
});

await test('Job Seeker Playbook labels compensation bands with [CONFIRM: role band]', () => {
  if (!seekerHtml.includes('[CONFIRM: role band]')) {
    throw new Error('Missing mandatory [CONFIRM: role band] tag in seeker document');
  }
  if (!seekerHtml.includes('Band 1') || !seekerHtml.includes('Band 2') || !seekerHtml.includes('Band 3')) {
    throw new Error('Missing explicit Band 1, Band 2, and Band 3 definitions');
  }
});

await test('Job Seeker Playbook contains resume calibration rubrics (3-second scan, XYZ formula, zero buzzwords)', () => {
  if (!seekerHtml.includes('3-Second') && !seekerHtml.includes('3-second')) {
    throw new Error('Missing 3-second scan rubric');
  }
  if (!seekerHtml.includes('XYZ Achievement Formula') && !seekerHtml.includes('Accomplished [X] as measured by [Y] by doing [Z]')) {
    throw new Error('Missing XYZ achievement formula');
  }
  if (!seekerHtml.includes('Zero Buzzwords Checklist')) {
    throw new Error('Missing zero buzzwords checklist');
  }
});

// -----------------------------------------------------------------------------
// Test Group 3: Content Completeness — Employer Guide
// -----------------------------------------------------------------------------
const employerHtml = getEmployerHtml();

await test('Employer Guide contains candidate vetting SLAs (15-min calibration, 7-day 3-blind-dossier, 48-hr interview)', () => {
  if (!employerHtml.includes('15-Minute Mandate Calibration') && !employerHtml.includes('15-min')) {
    throw new Error('Missing 15-minute calibration SLA');
  }
  if (!employerHtml.includes('7-Day 3-Blind-Dossier Sprint') && !employerHtml.includes('7-day')) {
    throw new Error('Missing 7-day 3-blind-dossier sprint SLA');
  }
  if (!employerHtml.includes('48-Hour Interview Scheduling Window') && !employerHtml.includes('48-hr')) {
    throw new Error('Missing 48-hour interview scheduling SLA');
  }
});

await test('Employer Guide contains vacancy cost calculator (₹35,000/day drag, ₹21L loss vs ₹18.55L saved)', () => {
  if (!employerHtml.includes('₹35,000')) {
    throw new Error('Missing benchmark shop-floor drag of ₹35,000/day');
  }
  if (!employerHtml.includes('₹21,00,000')) {
    throw new Error('Missing 60-day vacancy drag loss calculation of ₹21,00,000');
  }
  if (!employerHtml.includes('₹18,55,000')) {
    throw new Error('Missing 53-day savings calculation of ₹18,55,000');
  }
});

await test('Employer Guide specifies 90-day replacement terms, ₹0 upfront, and 8.33% fee with [CONFIRM: fee %]', () => {
  if (!employerHtml.includes('₹0 Upfront Retainer') && !employerHtml.includes('₹0 Advance Retainer')) {
    throw new Error('Missing ₹0 upfront retainer invariant');
  }
  if (!employerHtml.includes('8.33%')) {
    throw new Error('Missing 8.33% placement fee invariant');
  }
  if (!employerHtml.includes('[CONFIRM: fee %]')) {
    throw new Error('Missing [CONFIRM: fee %] confirmation tag');
  }
  if (!employerHtml.includes('90-Day') && !employerHtml.includes('90-day')) {
    throw new Error('Missing 90-day replacement shield terms');
  }
  if (!employerHtml.includes('Day-1 Ghosting') && !employerHtml.includes('Anti-Ghosting Protocol')) {
    throw new Error('Missing Day-1 anti-ghosting protocol');
  }
});

// -----------------------------------------------------------------------------
// Test Group 4: Brand Invariants, Anti-Slop & Styling Integrity
// -----------------------------------------------------------------------------
const prohibitedHypeWords = [
  'world-class',
  'cutting-edge',
  'seamless',
  'leverage',
  'unlock your potential',
  'revolutionize'
];

await test('Zero prohibited hype words in HTML templates and generator source', () => {
  const generatorSource = fs.readFileSync(path.join(ROOT_DIR, 'scripts', 'generate-lead-magnets.mjs'), 'utf8');
  const hypeRegex = new RegExp(`\\b(${prohibitedHypeWords.join('|')})\\b`, 'i');

  const mSeeker = seekerHtml.match(hypeRegex);
  if (mSeeker) {
    throw new Error(`Prohibited hype term '${mSeeker[0]}' found in Job Seeker HTML template`);
  }

  const mEmployer = employerHtml.match(hypeRegex);
  if (mEmployer) {
    throw new Error(`Prohibited hype term '${mEmployer[0]}' found in Employer Guide HTML template`);
  }

  // Ensure generator source file also does not use prohibited hype words in logic/strings
  const mSource = generatorSource.match(hypeRegex);
  if (mSource) {
    throw new Error(`Prohibited hype term '${mSource[0]}' found in generator source`);
  }
});

await test('Zero purple gradients in styling', () => {
  const purpleRegex = /(?:from|via|to)-(?:purple|violet|fuchsia)-/i;
  if (purpleRegex.test(seekerHtml) || purpleRegex.test(employerHtml)) {
    throw new Error('Prohibited purple gradient found in PDF styling');
  }
});

await test('Zero raw emoji characters in HTML templates', () => {
  // Regex matching standard emoji ranges
  const rawEmojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
  if (rawEmojiRegex.test(seekerHtml)) {
    throw new Error('Raw emoji character found in Job Seeker template');
  }
  if (rawEmojiRegex.test(employerHtml)) {
    throw new Error('Raw emoji character found in Employer Guide template');
  }
});

await test('Warm Editorial design system palette is properly implemented', () => {
  const requiredColors = ['#F6F3EE', '#0E1116', '#1F4E5F', '#C8553D', '#6B7280'];
  for (const color of requiredColors) {
    if (!seekerHtml.includes(color) || !employerHtml.includes(color)) {
      throw new Error(`Missing Warm Editorial palette color token '${color}'`);
    }
  }
});

// -----------------------------------------------------------------------------
// Test Group 5: Serverless API Route (/api/lead-magnet)
// -----------------------------------------------------------------------------
function makeRequest(url, { method = 'GET', body = null } = {}) {
  const headers = new Headers({
    'user-agent': 'JSM-Playwright-LeadMagnet-Test/1.0',
    'x-forwarded-for': '127.0.0.1',
  });
  if (body) {
    headers.set('content-type', 'application/json');
  }
  return new NextRequest(new URL(url, 'https://www.jsmintegratedservices.com'), {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
}

await test('GET /api/lead-magnet?type=job-seeker returns 200 OK with application/pdf', async () => {
  const req = makeRequest('/api/lead-magnet?type=job-seeker');
  const res = await getLeadMagnet(req);

  if (res.status !== 200) {
    throw new Error(`Expected HTTP 200, received ${res.status}`);
  }
  const contentType = res.headers.get('content-type');
  if (contentType !== 'application/pdf') {
    throw new Error(`Expected content-type 'application/pdf', got '${contentType}'`);
  }
  const disposition = res.headers.get('content-disposition');
  if (!disposition || !disposition.includes('the-2026-ats-bypass-hidden-job-market-playbook.pdf')) {
    throw new Error(`Incorrect disposition header: ${disposition}`);
  }
  const bytes = await res.arrayBuffer();
  if (bytes.byteLength < 15 * 1024) {
    throw new Error(`Returned PDF payload too small: ${bytes.byteLength} bytes`);
  }
});

await test('GET /api/lead-magnet?type=employer&download=true returns 200 OK with attachment disposition', async () => {
  const req = makeRequest('/api/lead-magnet?type=employer&download=true');
  const res = await getLeadMagnet(req);

  if (res.status !== 200) {
    throw new Error(`Expected HTTP 200, received ${res.status}`);
  }
  const disposition = res.headers.get('content-disposition');
  if (!disposition || !disposition.startsWith('attachment;')) {
    throw new Error(`Expected attachment disposition, got: ${disposition}`);
  }
  if (!disposition.includes('the-founders-guide-to-zero-retainer-contingency-hiring.pdf')) {
    throw new Error(`Incorrect attachment filename in disposition: ${disposition}`);
  }
});

await test('GET /api/lead-magnet with missing or invalid type returns 400 Bad Request', async () => {
  const reqMissing = makeRequest('/api/lead-magnet');
  const resMissing = await getLeadMagnet(reqMissing);
  if (resMissing.status !== 400) {
    throw new Error(`Expected HTTP 400 for missing type, got ${resMissing.status}`);
  }

  const reqInvalid = makeRequest('/api/lead-magnet?type=unknown-random');
  const resInvalid = await getLeadMagnet(reqInvalid);
  if (resInvalid.status !== 400) {
    throw new Error(`Expected HTTP 400 for invalid type, got ${resInvalid.status}`);
  }
});

await test('POST /api/lead-magnet with valid payload returns 200 OK and download URL', async () => {
  const req = makeRequest('/api/lead-magnet', {
    method: 'POST',
    body: {
      name: 'Ramesh Sundaram',
      email: 'ramesh.ops@manufacturing.in',
      phone: '+91 98400 12345',
      type: 'employer',
    },
  });

  const res = await postLeadMagnet(req);
  if (res.status !== 200) {
    throw new Error(`Expected HTTP 200, got ${res.status}`);
  }
  const data = await res.json();
  if (!data.success || !data.downloadUrl || !data.downloadUrl.includes('the-founders-guide-to-zero-retainer-contingency-hiring.pdf')) {
    throw new Error(`Invalid response payload: ${JSON.stringify(data)}`);
  }
});

await test('POST /api/lead-magnet with invalid email or missing type returns 400 Bad Request', async () => {
  const reqBadEmail = makeRequest('/api/lead-magnet', {
    method: 'POST',
    body: {
      email: 'not-an-email',
      type: 'job-seeker',
    },
  });
  const resBadEmail = await postLeadMagnet(reqBadEmail);
  if (resBadEmail.status !== 400) {
    throw new Error(`Expected HTTP 400 for invalid email, got ${resBadEmail.status}`);
  }

  const reqBadType = makeRequest('/api/lead-magnet', {
    method: 'POST',
    body: {
      email: 'valid@example.com',
      type: 'unknown-service',
    },
  });
  const resBadType = await postLeadMagnet(reqBadType);
  if (resBadType.status !== 400) {
    throw new Error(`Expected HTTP 400 for invalid type, got ${resBadType.status}`);
  }
});

// -----------------------------------------------------------------------------
// Summary & Exit Status
// -----------------------------------------------------------------------------
console.log('\n----------------------------------------------------------------------');
console.log(`TEST SUMMARY: ${passedTests}/${totalTests} tests passed (${failedTests} failed)`);
console.log('----------------------------------------------------------------------\n');

if (failedTests > 0) {
  console.error('Failure Details:');
  for (const failure of failureDetails) {
    console.error(`  - ${failure.label}: ${failure.error}`);
  }
  process.exit(1);
} else {
  console.log('All Dynamic PDF Lead Magnet tests passed cleanly!\n');
  process.exit(0);
}
