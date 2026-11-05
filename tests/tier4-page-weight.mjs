/**
 * Tier 4: Production Page Weight & Transfer Budget Audit
 * Part of JSM Integrated Services 4-Tier E2E Test Suite (M_TEST)
 *
 * Verifies:
 * - Net page transfer weight < 500KB (512,000 bytes), excluding web fonts.
 * - Tracks breakdown across HTML (document), scripts, stylesheets, media, and fonts.
 */

import http from 'node:http';
import { spawn } from 'node:child_process';
import { chromium } from '@playwright/test';

console.log('======================================================================');
console.log('  TIER 4: PAGE WEIGHT TRANSFER BUDGET AUDIT HARNESS');
console.log('======================================================================\n');

const TARGET_URL = process.env.AUDIT_URL || 'http://127.0.0.1:3000';
const MAX_ALLOWED_BYTES = 500 * 1024; // 500 KB (excluding fonts)

/**
 * Checks if target server is responding
 */
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

/**
 * Ensures server is up or spawns temporary instance
 */
async function ensureServer() {
  const ready = await isServerAvailable(TARGET_URL);
  if (ready) {
    console.log(`  ✓ Target server is active at ${TARGET_URL}`);
    return null;
  }

  console.log(`  ℹ Target server not responding at ${TARGET_URL}. Starting temporary server...`);
  const serverProc = spawn('npx', ['next', 'start', '-p', '3000'], {
    stdio: 'ignore',
    detached: false,
  });

  const startTime = Date.now();
  while (Date.now() - startTime < 30000) {
    await new Promise((r) => setTimeout(r, 800));
    const isUp = await isServerAvailable(TARGET_URL);
    if (isUp) {
      console.log(`  ✓ Temporary production server started successfully`);
      return serverProc;
    }
  }

  serverProc.kill();
  throw new Error(`Timeout waiting for server at ${TARGET_URL}. Ensure 'npm run build' has completed.`);
}

async function runPageWeightAudit() {
  let serverProc = null;
  let browser = null;

  try {
    serverProc = await ensureServer();

    browser = await chromium.launch({
      channel: 'chrome',
      headless: true,
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    let totalTransferBytes = 0;
    let fontTransferBytes = 0;

    const breakdown = {
      document: 0,
      script: 0,
      stylesheet: 0,
      image: 0,
      font: 0,
      other: 0,
    };

    const trackedResources = [];

    page.on('response', async (response) => {
      const url = response.url();
      const request = response.request();
      const resourceType = request.resourceType();

      let size = 0;
      try {
        const sizes = await request.sizes();
        if (sizes && typeof sizes.responseBodySize === 'number' && sizes.responseBodySize > 0) {
          size = sizes.responseBodySize;
        } else {
          const body = await response.body();
          size = body.length;
        }
      } catch {
        const headers = response.headers();
        size = parseInt(headers['content-length'] || '0', 10);
      }

      const isFont =
        resourceType === 'font' ||
        url.match(/\.(woff2?|ttf|otf|eot)($|\?)/i) ||
        url.includes('fonts.gstatic.com');

      if (isFont) {
        fontTransferBytes += size;
        breakdown.font += size;
      } else {
        totalTransferBytes += size;
        if (breakdown[resourceType] !== undefined) {
          breakdown[resourceType] += size;
        } else {
          breakdown.other += size;
        }
      }

      trackedResources.push({
        url: url.length > 80 ? url.slice(0, 77) + '...' : url,
        type: isFont ? 'font' : resourceType,
        sizeKb: (size / 1024).toFixed(2),
      });
    });

    await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const totalKb = (totalTransferBytes / 1024).toFixed(2);
    const fontKb = (fontTransferBytes / 1024).toFixed(2);
    const grossTotalKb = ((totalTransferBytes + fontTransferBytes) / 1024).toFixed(2);

    console.log('Resource Transfer Breakdown:');
    console.log(`  - HTML Document:     ${(breakdown.document / 1024).toFixed(2)} KB`);
    console.log(`  - JavaScript:        ${(breakdown.script / 1024).toFixed(2)} KB`);
    console.log(`  - Stylesheets (CSS): ${(breakdown.stylesheet / 1024).toFixed(2)} KB`);
    console.log(`  - Images & Media:    ${(breakdown.image / 1024).toFixed(2)} KB`);
    console.log(`  - Other Resources:   ${(breakdown.other / 1024).toFixed(2)} KB`);
    console.log(`  -----------------------------------------`);
    console.log(`  * NET PAGE WEIGHT:   ${totalKb} KB (Budget: < 500 KB)`);
    console.log(`  * Fonts (excluded):  ${fontKb} KB`);
    console.log(`  * Gross Transfer:    ${grossTotalKb} KB\n`);

    if (totalTransferBytes >= MAX_ALLOWED_BYTES) {
      console.error(
        `  ✗ FAIL: Page weight exceeds 500KB budget! Actual: ${totalKb} KB (${totalTransferBytes} bytes)`
      );
      process.exitCode = 1;
    } else {
      console.log(`  ✓ PASS: Page weight is within 500KB budget (${totalKb} KB < 500 KB)`);
      process.exitCode = 0;
    }
  } catch (err) {
    console.error(`  ✗ FAIL: Error during page weight audit: ${err.message}`);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
    if (serverProc) {
      serverProc.kill();
      console.log('  ℹ Temporary server shut down');
    }
  }
}

runPageWeightAudit();
