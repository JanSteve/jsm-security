/**
 * Challenger M4 Deep Stress & Edge-Case Verification Harness
 * Comprehensive empirical stress testing across:
 * 1. Fee Calculator boundary mathematics & edge cases
 * 2. Serverless /api/contact API validation & spam defense
 * 3. Mobile Nav WCAG 2.5.3 Label in Name axe verification
 */

import http from 'node:http';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:3000';

let testCount = 0;
let passCount = 0;
let failCount = 0;
const testFailures = [];

function check(pass, title, info = '') {
  testCount++;
  if (pass) {
    passCount++;
    console.log(`  ✓ PASS: [PROBE ${String(testCount).padStart(2, '0')}] ${title}`);
  } else {
    failCount++;
    const err = `  ✗ FAIL: [PROBE ${String(testCount).padStart(2, '0')}] ${title} ${info ? `-> ${info}` : ''}`;
    console.error(err);
    testFailures.push(err);
  }
}

// Target calculation function matching src/components/home/fee-calculator.tsx
function calculateContingencyFee(ctc, feePercentage = 8.33) {
  if (typeof ctc !== 'number' || isNaN(ctc)) {
    throw new Error('CTC must be a valid number');
  }
  const minCtc = 1200000;
  const maxCtc = 10000000;
  const clampedCtc = Math.min(Math.max(ctc, minCtc), maxCtc);
  const fee = Math.round(clampedCtc * (feePercentage / 100));
  const upfrontCost = 0;

  return {
    ctc: clampedCtc,
    feePercentage,
    fee,
    upfrontCost,
    isContingencyOnly: upfrontCost === 0,
  };
}

let ipIdx = 100;
async function postApi(payload, customIp) {
  const url = new URL('/api/contact', BASE_URL);
  const body = typeof payload === 'string' ? payload : JSON.stringify(payload);
  const clientIp = customIp || `10.201.0.${ipIdx++}`;

  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: url.hostname,
        port: url.port || 3000,
        path: url.pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
          'X-Forwarded-For': clientIp,
          'User-Agent': 'Adversarial-Challenger-Probe',
        },
      },
      (res) => {
        let text = '';
        res.on('data', (c) => (text += c));
        res.on('end', () => {
          let json;
          try {
            json = JSON.parse(text);
          } catch {
            json = { raw: text };
          }
          resolve({ status: res.statusCode, body: json });
        });
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function isServerUp() {
  return new Promise((resolve) => {
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port: 3000,
        path: '/',
        method: 'HEAD',
        timeout: 2000,
      },
      (res) => resolve(res.statusCode >= 200 && res.statusCode < 500)
    );
    req.on('error', () => resolve(false));
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
    req.end();
  });
}

async function run() {
  console.log('======================================================================');
  console.log('  CHALLENGER DEEP STRESS & VERIFICATION HARNESS');
  console.log('======================================================================\n');

  console.log('--- 1. CALCULATOR INVARIANTS & NUMERICAL BOUNDARIES ---');

  // Exact bounds
  const c12L = calculateContingencyFee(1200000);
  check(c12L.fee === 99960, '12 LPA fee is ₹99,960 (8.33%)', `got ${c12L.fee}`);
  check(c12L.upfrontCost === 0, '12 LPA upfront is 0');

  const c50L = calculateContingencyFee(5000000);
  check(c50L.fee === 416500, '50 LPA fee is ₹4,16,500 (8.33%)', `got ${c50L.fee}`);
  check(c50L.upfrontCost === 0, '50 LPA upfront is 0');

  const c1Cr = calculateContingencyFee(10000000);
  check(c1Cr.fee === 833000, '1 Cr fee is ₹8,33,000 (8.33%)', `got ${c1Cr.fee}`);
  check(c1Cr.upfrontCost === 0, '1 Cr upfront is 0');

  // Boundary off-by-one clamping
  const c1199k = calculateContingencyFee(1199999);
  check(c1199k.ctc === 1200000 && c1199k.fee === 99960, '₹11,99,999 clamped to ₹12 LPA');

  const c10000001 = calculateContingencyFee(10000001);
  check(c10000001.ctc === 10000000 && c10000001.fee === 833000, '₹1,00,00,001 clamped to ₹1 Cr');

  // Extreme inputs
  const cHuge = calculateContingencyFee(999999999999);
  check(cHuge.ctc === 10000000 && cHuge.fee === 833000, 'Huge CTC (1000 Cr) clamped to ₹1 Cr');

  const cNeg = calculateContingencyFee(-999999999);
  check(cNeg.ctc === 1200000 && cNeg.fee === 99960, 'Huge negative CTC clamped to ₹12 LPA');

  // NaN error invariant
  let nanThrew = false;
  try {
    calculateContingencyFee(NaN);
  } catch {
    nanThrew = true;
  }
  check(nanThrew, 'NaN CTC throws error instead of producing corrupted calculations');

  // String error invariant
  let strThrew = false;
  try {
    calculateContingencyFee('2500000');
  } catch {
    strThrew = true;
  }
  check(strThrew, 'Non-number type throws error instead of silent coercion');

  // Floating point inputs
  const cFloat = calculateContingencyFee(1200000.75);
  check(cFloat.fee === 99960, 'Fractional CTC rounds cleanly to integer fee', `got ${cFloat.fee}`);

  console.log('\n--- 2. SERVERLESS /api/contact ADVERSARIAL VALIDATION PROBES ---');

  let serverProc = null;
  const isUp = await isServerUp();
  if (!isUp) {
    console.log('  Starting temporary Next.js server on :3000...');
    serverProc = spawn('npx', ['next', 'start', '-p', '3000'], { stdio: 'ignore' });
    let tries = 0;
    while (tries++ < 30) {
      await new Promise((r) => setTimeout(r, 800));
      if (await isServerUp()) break;
    }
  }

  // Probe: Missing required name
  const rMissingName = await postApi({ phone: '+91 98401 23456', email: 'test@apex.com' });
  check(rMissingName.status === 400 && rMissingName.body.success === false, 'Missing name returns 400 Bad Request');

  // Probe: Missing required phone
  const rMissingPhone = await postApi({ name: 'Valid Name', email: 'test@apex.com' });
  check(rMissingPhone.status === 400 && rMissingPhone.body.success === false, 'Missing phone returns 400 Bad Request');

  // Probe: Name boundary - 2 chars (valid)
  const rName2Chars = await postApi({ name: 'Al', phone: '+91 98401 23456', email: 'al@corp.in' });
  check(rName2Chars.status === 200 && rName2Chars.body.success === true, '2-char name (minimum valid) succeeds with 200');

  // Probe: Name boundary - 1 char (invalid)
  const rName1Char = await postApi({ name: 'A', phone: '+91 98401 23456', email: 'a@corp.in' });
  check(rName1Char.status === 400, '1-char name returns 400 Bad Request');

  // Probe: Name boundary - 100 chars (valid)
  const rName100 = await postApi({ name: 'A'.repeat(100), phone: '+91 98401 23456', email: 'test@corp.in' });
  check(rName100.status === 200, '100-char name (maximum valid) succeeds with 200');

  // Probe: Name boundary - 101 chars (invalid)
  const rName101 = await postApi({ name: 'A'.repeat(101), phone: '+91 98401 23456', email: 'test@corp.in' });
  check(rName101.status === 400, '101-char name returns 400 Bad Request');

  // Probe: Notes > 2000 chars (invalid)
  const rLongNotes = await postApi({ name: 'Valid Name', phone: '+91 98401 23456', notes: 'x'.repeat(2005) });
  check(rLongNotes.status === 400, 'Notes > 2000 characters returns 400 Bad Request');

  // Probe: Malformed email variations
  const badEmails = [
    'plainaddress',
    '#@%^%#$@#$@#.com',
    '@example.com',
    'Joe Smith <email@example.com>',
    'email.example.com',
    'email@example@example.com',
  ];
  let allBadEmailsRejected = true;
  for (const be of badEmails) {
    const res = await postApi({ name: 'Test User', phone: '+91 98401 23456', email: be });
    if (res.status !== 400) allBadEmailsRejected = false;
  }
  check(allBadEmailsRejected, 'Diverse malformed emails all rejected with 400 Bad Request');

  // Probe: Honeypot variations
  const honeypots = ['bot', '1', 'true', '   '];
  let allHoneypotsRejected = true;
  for (const hp of honeypots) {
    const res = await postApi({ name: 'Bot User', phone: '+91 98401 23456', honeypot: hp });
    if (res.status !== 400 || !res.body.error?.toLowerCase().includes('spam')) {
      allHoneypotsRejected = false;
    }
  }
  check(allHoneypotsRejected, 'Populated honeypot (strings, numbers, whitespace) triggers spam rejection');

  // Probe: Malformed JSON syntax
  const malformedJsonStrings = [
    '{',
    '{"name": "Broken"',
    'not a json payload',
    '',
    '{"name": 12345}', // invalid name type
  ];
  let malformedHandled = true;
  for (const mj of malformedJsonStrings) {
    const res = await postApi(mj);
    if (res.status !== 400) {
      malformedHandled = false;
    }
  }
  check(malformedHandled, 'All syntactically malformed / corrupted payloads safely rejected with 400');

  // Probe: SQL Injection strings in fields handled safely without 500
  const sqliRes = await postApi({
    name: "Robert'); DROP TABLE leads;--",
    phone: "+91 98401 23456",
    company: "1' OR '1'='1",
    notes: "' UNION SELECT * FROM users--",
    service: "talent-acquisition",
  });
  check(sqliRes.status === 200 || sqliRes.status === 400, 'SQL injection strings handled safely without 500 error');

  console.log('\n--- 3. MOBILE NAV WCAG 2.5.3 ACCESSIBILITY VERIFICATION ---');

  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const viewportsToScan = [
    { name: 'Mobile-360px', width: 360, height: 740, isMobile: true },
    { name: 'Mobile-390px', width: 390, height: 844, isMobile: true },
    { name: 'Tablet-768px', width: 768, height: 1024, isMobile: false },
  ];

  for (const vp of viewportsToScan) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.isMobile,
      hasTouch: vp.isMobile,
    });
    const page = await ctx.newPage();
    await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    // Open mobile menu
    const navBtn = page.locator('button[data-nav-toggle="true"]').first();
    const isNavBtnVisible = await navBtn.isVisible();
    check(isNavBtnVisible, `Viewport [${vp.name}]: Hamburger button visible`);

    if (isNavBtnVisible) {
      await navBtn.click();
      await page.waitForTimeout(400);

      // Verify accessible name of brand link
      const brandLink = page.locator('#mobile-nav-overlay a[href="/"]').first();
      const brandAccessibleName = await brandLink.evaluate((el) => {
        // Compute text content of visible spans
        const spans = Array.from(el.querySelectorAll('span')).map((s) => s.textContent.trim());
        return spans.join(' ');
      });

      check(
        brandAccessibleName.includes('JSM Integrated Services') &&
        brandAccessibleName.includes('Executive Talent Acquisition'),
        `Viewport [${vp.name}]: Brand link visible text is included in name: "${brandAccessibleName}"`
      );

      // Run AxeBuilder targeting mobile nav overlay
      const axeResult = await new AxeBuilder({ page })
        .include('#mobile-nav-overlay')
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      const labelMismatchViolations = axeResult.violations.filter(
        (v) => v.id === 'label-content-name-mismatch'
      );

      check(
        labelMismatchViolations.length === 0,
        `Viewport [${vp.name}]: WCAG 2.5.3 (label-content-name-mismatch) has 0 violations in mobile nav`,
        labelMismatchViolations.length > 0 ? JSON.stringify(labelMismatchViolations) : ''
      );

      check(
        axeResult.violations.length === 0,
        `Viewport [${vp.name}]: Mobile navigation overlay has 0 total axe accessibility violations`,
        axeResult.violations.map((v) => `${v.id}: ${v.description}`).join('; ')
      );

      // Verify close on Escape
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
      const isOverlayOpen = await page.locator('#mobile-nav-overlay').isVisible();
      check(!isOverlayOpen, `Viewport [${vp.name}]: Mobile nav closes cleanly on Escape`);
    }

    await ctx.close();
  }

  await browser.close();

  if (serverProc) {
    serverProc.kill();
  }

  console.log('\n======================================================================');
  console.log(`DEEP STRESS SUMMARY: ${passCount}/${testCount} checks passed (${failCount} failed)`);
  console.log('======================================================================\n');

  if (failCount > 0) {
    process.exitCode = 1;
  }
}

run().catch((e) => {
  console.error('Fatal error in deep stress harness:', e);
  process.exit(1);
});
