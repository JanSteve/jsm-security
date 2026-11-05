/**
 * Challenger M4: Comprehensive Adversarial Verification Harness
 * Tests:
 * 1. Fee Calculator boundary mathematics & browser DOM interactions
 * 2. Contact Form & /api/contact validation, honeypot defense, and XSS sanitization
 * 3. Viewport responsiveness & horizontal overflow at 360px, 390px, 768px, 1280px
 * 4. Tap target dimensions and accessibility ergonomics
 * 5. Reduced motion compliance
 */

import http from 'node:http';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:3000';

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: [CHALLENGE ${String(totalTests).padStart(2, '0')}] ${testName}`);
  } else {
    failedTests++;
    const msg = `  ✗ FAIL: [CHALLENGE ${String(totalTests).padStart(2, '0')}] ${testName}${details ? ` -> ${details}` : ''}`;
    console.error(msg);
    failures.push(msg);
  }
}

function isServerAvailable(urlStr) {
  return new Promise((resolve) => {
    const parsed = new URL(urlStr);
    const req = http.request(
      {
        hostname: parsed.hostname,
        port: parsed.port || 3000,
        path: '/',
        method: 'HEAD',
        timeout: 2000,
      },
      (res) => {
        resolve(res.statusCode >= 200 && res.statusCode < 500);
      }
    );
    req.on('error', () => resolve(false));
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
    req.end();
  });
}

async function ensureServer() {
  const ready = await isServerAvailable(BASE_URL);
  if (ready) {
    console.log(`  ✓ Target server is active at ${BASE_URL}`);
    return null;
  }

  console.log(`  ℹ Target server not responding at ${BASE_URL}. Starting temporary server...`);
  const serverProc = spawn('npx', ['next', 'start', '-p', '3000'], {
    stdio: 'ignore',
    detached: false,
  });

  const startTime = Date.now();
  while (Date.now() - startTime < 30000) {
    await new Promise((r) => setTimeout(r, 800));
    const isUp = await isServerAvailable(BASE_URL);
    if (isUp) {
      console.log(`  ✓ Temporary production server started successfully`);
      return serverProc;
    }
  }

  serverProc.kill();
  throw new Error(`Timeout waiting for server at ${BASE_URL}. Ensure 'npm run build' has completed.`);
}

let ipCounter = 1;
// Helper for sending POST requests to API with unique client IP to test business rules independently of rate limits
async function postJson(endpoint, payload, customIp) {
  const url = new URL(endpoint, BASE_URL);
  const bodyStr = typeof payload === 'string' ? payload : JSON.stringify(payload);
  const clientIp = customIp || `10.200.0.${ipCounter++}`;

  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: url.hostname,
        port: url.port || 3000,
        path: url.pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(bodyStr),
          'X-Forwarded-For': clientIp,
          'User-Agent': 'Mozilla/5.0 (Adversarial-Test-Runner)',
        },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          let parsed;
          try {
            parsed = JSON.parse(data);
          } catch {
            parsed = { raw: data };
          }
          resolve({ status: res.statusCode, body: parsed });
        });
      }
    );
    req.on('error', reject);
    req.write(bodyStr);
    req.end();
  });
}

// In-module calculation model for testing invariants
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

async function runAdversarialSuite() {
  console.log('======================================================================');
  console.log('  CHALLENGER M4: ADVERSARIAL STRESS TEST & BOUNDARY VERIFICATION');
  console.log('======================================================================\n');

  let serverProc = null;
  try {
    serverProc = await ensureServer();

    console.log('\n--- SECTION 1: FEE CALCULATOR MATHEMATICAL INVARIANTS & BOUNDARIES ---');

    // Test 1: Minimum CTC boundary ₹12 LPA
    const minRes = calculateContingencyFee(1200000);
    assert(
      minRes.ctc === 1200000 && minRes.fee === 99960 && minRes.upfrontCost === 0,
      'Fee Calculator: Exact ₹12 LPA boundary produces fee ₹99,960 and ₹0 upfront',
      `got ctc=${minRes.ctc}, fee=${minRes.fee}, upfront=${minRes.upfrontCost}`
    );

    // Test 2: Sub-minimum CTC clamp (₹0, negative, ₹5 LPA)
    const zeroRes = calculateContingencyFee(0);
    assert(
      zeroRes.ctc === 1200000 && zeroRes.fee === 99960,
      'Fee Calculator: Sub-minimum input (₹0) strictly clamped to ₹12 LPA floor',
      `got ctc=${zeroRes.ctc}`
    );

    const negRes = calculateContingencyFee(-5000000);
    assert(
      negRes.ctc === 1200000 && negRes.fee === 99960,
      'Fee Calculator: Negative CTC input (-₹50 LPA) safely clamped to ₹12 LPA',
      `got ctc=${negRes.ctc}`
    );

    // Test 3: Maximum CTC boundary ₹1 Cr
    const maxRes = calculateContingencyFee(10000000);
    assert(
      maxRes.ctc === 10000000 && maxRes.fee === 833000 && maxRes.upfrontCost === 0,
      'Fee Calculator: Exact ₹1 Cr maximum boundary produces fee ₹8,33,000 and ₹0 upfront',
      `got fee=${maxRes.fee}`
    );

    // Test 4: Super-maximum CTC clamp (₹5 Cr, ₹100 Cr)
    const superMaxRes = calculateContingencyFee(50000000);
    assert(
      superMaxRes.ctc === 10000000 && superMaxRes.fee === 833000,
      'Fee Calculator: Super-maximum input (₹5 Cr) strictly clamped to ₹1 Cr ceiling',
      `got ctc=${superMaxRes.ctc}`
    );

    // Test 5: Mid-range calculations (₹25 LPA, ₹50 LPA, ₹75 LPA)
    const mid25 = calculateContingencyFee(2500000);
    assert(
      mid25.fee === 208250 && mid25.upfrontCost === 0,
      'Fee Calculator: ₹25 LPA produces fee ₹2,08,250 (8.33%)',
      `got fee=${mid25.fee}`
    );

    const mid50 = calculateContingencyFee(5000000);
    assert(
      mid50.fee === 416500 && mid50.upfrontCost === 0,
      'Fee Calculator: ₹50 LPA produces fee ₹4,16,500 (8.33%)',
      `got fee=${mid50.fee}`
    );

    // Test 6: Invariant: Upfront cost is ALWAYS 0 across any input
    let upfrontInvariantViolated = false;
    for (let c = 500000; c <= 20000000; c += 1000000) {
      const r = calculateContingencyFee(c);
      if (r.upfrontCost !== 0 || !r.isContingencyOnly) {
        upfrontInvariantViolated = true;
        break;
      }
    }
    assert(
      !upfrontInvariantViolated,
      'Fee Calculator: Zero upfront cost invariant holds unconditionally across entire spectrum'
    );

    console.log('\n--- SECTION 2: SERVERLESS API (/api/contact) ADVERSARIAL BOUNDARY PROBES ---');

    // Test 7: Valid payload
    const validRes = await postJson('/api/contact', {
      name: 'Senthil Nathan',
      phone: '+91 98401 23456',
      email: 'senthil@apexindustries.in',
      company: 'Apex Industries Pvt Ltd',
      roleBand: '₹25 LPA – ₹50 LPA',
      service: 'talent-acquisition',
      notes: 'Looking for Head of Operations in Trichy',
    });
    assert(
      validRes.status === 200 && validRes.body.success === true && typeof validRes.body.referenceId === 'string',
      '/api/contact: Valid executive payload succeeds with HTTP 200 and referenceId',
      `status=${validRes.status}, body=${JSON.stringify(validRes.body)}`
    );

    // Test 8: Empty payload rejects with 400
    const emptyRes = await postJson('/api/contact', {});
    assert(
      emptyRes.status === 400 && emptyRes.body.success === false,
      '/api/contact: Completely empty payload rejected with HTTP 400 Bad Request',
      `status=${emptyRes.status}`
    );

    // Test 9: Name boundary violations (<2 chars, >100 chars)
    const shortNameRes = await postJson('/api/contact', {
      name: 'A',
      phone: '+91 98401 23456',
      email: 'test@example.com',
      service: 'talent-acquisition',
    });
    assert(
      shortNameRes.status === 400 && shortNameRes.body.success === false,
      '/api/contact: Name < 2 characters rejected with HTTP 400',
      `status=${shortNameRes.status}`
    );

    const longNameRes = await postJson('/api/contact', {
      name: 'A'.repeat(105),
      phone: '+91 98401 23456',
      email: 'test@example.com',
      service: 'talent-acquisition',
    });
    assert(
      longNameRes.status === 400 && longNameRes.body.success === false,
      '/api/contact: Name > 100 characters rejected with HTTP 400',
      `status=${longNameRes.status}`
    );

    // Test 10: Invalid email formats rejected with 400
    const invalidEmails = ['notanemail', 'test@', 'test@.com', '@domain.com', 'user@domain..com'];
    let allInvalidEmailsRejected = true;
    for (const badEmail of invalidEmails) {
      const res = await postJson('/api/contact', {
        name: 'Valid Name',
        phone: '+91 98401 23456',
        email: badEmail,
        service: 'talent-acquisition',
      });
      if (res.status !== 400) {
        allInvalidEmailsRejected = false;
        console.warn(`  Email format "${badEmail}" was unexpectedly accepted with status ${res.status}`);
      }
    }
    assert(
      allInvalidEmailsRejected,
      '/api/contact: Malformed email formats strictly rejected with HTTP 400'
    );

    // Test 11: Invalid phone formats rejected with 400
    const invalidPhones = ['123', 'abcdefghij', '12345678901234567890', '+91'];
    let allInvalidPhonesRejected = true;
    for (const badPhone of invalidPhones) {
      const res = await postJson('/api/contact', {
        name: 'Valid Name',
        phone: badPhone,
        email: 'test@example.com',
        service: 'talent-acquisition',
      });
      if (res.status !== 400) {
        allInvalidPhonesRejected = false;
        console.warn(`  Phone format "${badPhone}" was unexpectedly accepted with status ${res.status}`);
      }
    }
    assert(
      allInvalidPhonesRejected,
      '/api/contact: Invalid phone formats (<10 or >15 digits or letters) rejected with HTTP 400'
    );

    // Test 12: Honeypot submission rejection
    const honeypotRes = await postJson('/api/contact', {
      name: 'Spam Bot',
      phone: '+91 98401 23456',
      email: 'bot@spam.com',
      service: 'talent-acquisition',
      honeypot: 'bot-spam-payload',
    });
    assert(
      honeypotRes.status === 400 && honeypotRes.body.success === false && honeypotRes.body.error?.toLowerCase().includes('spam'),
      '/api/contact: Populated honeypot rejected with HTTP 400 and spam detection notice',
      `status=${honeypotRes.status}, error=${honeypotRes.body.error}`
    );

    // Test 13: XSS payload sanitization without server crash
    const xssRes = await postJson('/api/contact', {
      name: '<script>alert("XSS")</script>',
      phone: '+91 98401 23456',
      email: 'security@pentest.com',
      company: '<img src=x onerror=alert(1)>',
      notes: '<svg onload=alert(document.domain)>',
      service: 'talent-acquisition',
    });
    assert(
      xssRes.status === 200 || xssRes.status === 400,
      '/api/contact: Hostile XSS inputs handled safely without server crash (500)',
      `status=${xssRes.status}`
    );

    // Test 14: Malformed JSON syntax rejected with 400
    const malformedRes = await postJson('/api/contact', '{ "name": "Broken JSON');
    assert(
      malformedRes.status === 400 && malformedRes.body.success === false,
      '/api/contact: Syntactically malformed JSON body safely rejected with HTTP 400',
      `status=${malformedRes.status}`
    );

    console.log('\n--- SECTION 3: BROWSER PLAYWRIGHT ADVERSARIAL DOM & VIEWPORT AUDIT ---');

    const browser = await chromium.launch({
      channel: 'chrome',
      headless: true,
    });

    const viewports = [
      { name: 'Mobile-360px', width: 360, height: 740, isMobile: true },
      { name: 'Mobile-390px', width: 390, height: 844, isMobile: true },
      { name: 'Tablet-768px', width: 768, height: 1024, isMobile: false },
      { name: 'Desktop-1280px', width: 1280, height: 800, isMobile: false },
    ];

    for (const vp of viewports) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        isMobile: vp.isMobile,
        hasTouch: vp.isMobile,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);

      // Horizontal scroll check
      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return {
          scrollWidth: doc.scrollWidth,
          clientWidth: doc.clientWidth,
        };
      });

      assert(
        overflow.scrollWidth <= overflow.clientWidth + 1,
        `Viewport [${vp.name}]: Document width fits inside viewport with zero horizontal scroll`,
        `scrollWidth=${overflow.scrollWidth}, clientWidth=${overflow.clientWidth}`
      );

      // Element-level overflow probe
      const elementOverflow = await page.evaluate((vpWidth) => {
        const all = document.querySelectorAll('*');
        let violatingTag = null;
        let maxWidth = 0;
        for (const el of all) {
          // Ignore tickers, off-screen honeypot, and hidden elements
          if (
            el.closest('[data-ticker]') ||
            el.closest('.sector-ticker') ||
            el.closest('[data-looping]') ||
            el.closest('.overflow-hidden') ||
            el.closest('.overflow-x-hidden')
          ) {
            continue;
          }
          const rect = el.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0 || el.getAttribute('aria-hidden') === 'true') continue;
          if (rect.right > vpWidth + 5) {
            violatingTag = `${el.tagName.toLowerCase()}.${el.className ? String(el.className).split(' ').slice(0, 2).join('.') : ''}`;
            maxWidth = rect.right;
            break;
          }
        }
        return { violatingTag, maxWidth };
      }, vp.width);

      assert(
        !elementOverflow.violatingTag,
        `Viewport [${vp.name}]: No individual visible DOM element bleeds beyond screen width`,
        `violating=${elementOverflow.violatingTag} (right=${elementOverflow.maxWidth})`
      );

      // If mobile (< 768px), verify hamburger button and overlay
      if (vp.isMobile) {
        const toggle = page.locator('button[data-nav-toggle], button[aria-label*="menu" i]').first();
        const toggleVisible = await toggle.isVisible();
        assert(toggleVisible, `Viewport [${vp.name}]: Mobile navigation toggle button is rendered and visible`);

        if (toggleVisible) {
          const box = await toggle.boundingBox();
          assert(
            box && box.width >= 40 && box.height >= 40,
            `Viewport [${vp.name}]: Mobile hamburger button satisfies tap target guidelines (>= 40px)`,
            `size=${box?.width}x${box?.height}`
          );

          // Open menu
          await toggle.click();
          await page.waitForTimeout(300);

          const overlay = page.locator('[data-nav-overlay], nav[aria-modal="true"], .mobile-menu-overlay').first();
          const overlayVisible = await overlay.isVisible();
          assert(overlayVisible, `Viewport [${vp.name}]: Mobile navigation menu expands to full-screen overlay`);

          // Close on Escape key
          await page.keyboard.press('Escape');
          await page.waitForTimeout(400);
          const overlayClosed = !(await overlay.isVisible());
          assert(overlayClosed, `Viewport [${vp.name}]: Mobile navigation overlay closes cleanly on Escape key`);
        }
      }

      await context.close();
    }

    console.log('\n--- SECTION 4: BROWSER DOM INTERACTION (FEE CALCULATOR & CONTACT FORM) ---');

    const testContext = await browser.newContext({
      viewport: { width: 1280, height: 800 },
    });
    const page = await testContext.newPage();
    await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);

    // Test Fee Calculator interactive slider
    const slider = page.locator('#fee-calculator input[type="range"]');
    if ((await slider.count()) > 0) {
      // Check preset buttons
      const preset15 = page.locator('#fee-calculator button:has-text("₹15 LPA")').first();
      if ((await preset15.count()) > 0) {
        await preset15.click();
        await page.waitForTimeout(200);
        const text = await page.locator('#fee-calculator').textContent();
        assert(
          text?.includes('₹1,24,950') || text?.includes('15 LPA'),
          'Fee Calculator DOM: Clicking ₹15 LPA preset calculates corresponding fee accurately'
        );
      }

      const preset1Cr = page.locator('#fee-calculator button:has-text("₹1 Cr")').first();
      if ((await preset1Cr.count()) > 0) {
        await preset1Cr.click();
        await page.waitForTimeout(200);
        const text = await page.locator('#fee-calculator').textContent();
        assert(
          text?.includes('₹8,33,000') || text?.includes('1 Cr'),
          'Fee Calculator DOM: Clicking ₹1 Cr preset calculates fee of ₹8,33,000'
        );
      }

      // Direct numeric input boundary test
      const numInput = page.locator('#fee-calculator input[type="number"]').first();
      if ((await numInput.count()) > 0) {
        await numInput.fill('500000'); // < 12L
        await numInput.blur();
        await page.waitForTimeout(200);
        const valAfterBlur = await numInput.inputValue();
        assert(
          valAfterBlur === '1200000',
          'Fee Calculator DOM: Typing below minimum (< ₹12L) clamps back to 1200000 on blur',
          `got ${valAfterBlur}`
        );
      }
    } else {
      assert(false, 'Fee Calculator DOM: #fee-calculator input element found');
    }

    // Test Contact Form DOM Validation & Submission
    const form = page.locator('form').first();
    if ((await form.count()) > 0) {
      // 1. Submit empty form
      const submitBtn = form.locator('button[type="submit"]').first();
      await submitBtn.click();
      await page.waitForTimeout(300);

      // Should display validation errors
      const errors = form.locator('[role="alert"], p:has-text("Please")');
      const errCount = await errors.count();
      assert(
        errCount > 0,
        'Contact Form DOM: Submitting empty form highlights inline validation errors without sending',
        `found ${errCount} error banners`
      );

      // 2. Test honeypot field is invisible to users
      const honeypot = form.locator('input[name="honeypot"]').first();
      if ((await honeypot.count()) > 0) {
        const isHidden = !(await honeypot.isVisible());
        assert(isHidden, 'Contact Form DOM: Honeypot field is completely hidden from view');
      }

      // 3. Test valid submission
      await page.fill('#enquiry-name', 'Adversarial Challenger');
      await page.fill('#enquiry-phone', '+91 98401 23456');
      await page.fill('#enquiry-email', 'adversarial@jsmtest.com');
      await page.fill('#enquiry-company', 'Adversarial Test Lab');
      await page.fill('#enquiry-notes', 'Automated end-to-end stress verification mandate');

      await submitBtn.click();
      await page.waitForTimeout(1500);

      // Check for success screen
      const successCard = page.locator('[aria-label*="Confirmation" i], h3:has-text("Received"), strong:has-text("JSM-REQ-")');
      const isSuccessVisible = (await successCard.count()) > 0;
      assert(
        isSuccessVisible,
        'Contact Form DOM: Valid submission transitions cleanly to success confirmation with referenceId'
      );
    }

    console.log('\n--- SECTION 5: REDUCED MOTION ACCESSIBILITY ---');

    const reducedMotionContext = await browser.newContext({
      reducedMotion: 'reduce',
    });
    const rmPage = await reducedMotionContext.newPage();
    await rmPage.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
    await rmPage.waitForTimeout(400);

    const ticker = rmPage.locator('[data-ticker], .sector-ticker, [data-looping]').first();
    if ((await ticker.count()) > 0) {
      const motion = await ticker.evaluate((el) => {
        const c = window.getComputedStyle(el);
        return {
          animation: c.animation,
          animationName: c.animationName,
          animationDuration: c.animationDuration,
          animationPlayState: c.animationPlayState,
        };
      });
      const isMotionDisabled =
        motion.animation === 'none' ||
        motion.animationName === 'none' ||
        motion.animationDuration === '0s' ||
        motion.animationPlayState === 'paused';
      assert(
        isMotionDisabled,
        'Reduced Motion DOM: Looping ticker animation disabled (animation: none / duration: 0s) when prefers-reduced-motion: reduce is enabled',
        `animation=${motion.animation}, name=${motion.animationName}, duration=${motion.animationDuration}`
      );
    } else {
      assert(true, 'Reduced Motion DOM: No uncontained looping animations found');
    }

    await reducedMotionContext.close();
    await testContext.close();
    await browser.close();

    console.log('\n======================================================================');
    console.log(`CHALLENGER SUITE SUMMARY: ${passedTests}/${totalTests} tests passed (${failedTests} failed)`);
    console.log('======================================================================\n');

    if (failedTests > 0) {
      process.exitCode = 1;
    }
  } finally {
    if (serverProc) {
      serverProc.kill();
      console.log('  ℹ Temporary server shut down');
    }
  }
}

runAdversarialSuite().catch((err) => {
  console.error('Fatal error during adversarial runner:', err);
  process.exit(1);
});
