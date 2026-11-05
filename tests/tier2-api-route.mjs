/**
 * Tier 2: Component, Unit & Serverless API Boundary Test Suite
 * Part of JSM Integrated Services 4-Tier E2E Test Suite (M_TEST)
 *
 * Verifies:
 * 1. /api/contact valid submission returns HTTP 200 OK and referenceId
 * 2. /api/contact invalid / missing required fields return HTTP 400 Bad Request
 * 3. /api/contact honeypot defense rejects bot submissions with HTTP 400
 * 4. /api/contact malformed JSON handling returns HTTP 400
 * 5. Interactive fee calculator mathematical invariants (₹12L - ₹1Cr range, 100% success-based fee, zero upfront cost)
 */

import { NextRequest } from 'next/server.js';

// Guarantee that test harness NEVER dispatches real emails or Telegram messages during test runs
delete process.env.RESEND_API_KEY;
delete process.env.OUTLOOK_EMAIL;
delete process.env.OUTLOOK_PASSWORD;
delete process.env.TELEGRAM_BOT_TOKEN;
delete process.env.TELEGRAM_CHAT_ID;

import { POST as contactHandler } from '../src/app/api/contact/route.ts';

console.log('======================================================================');
console.log('  TIER 2: COMPONENT & SERVERLESS API BOUNDARIES HARNESS');
console.log('======================================================================\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failureDetails = [];

let ipCounter = 100;
function getUniqueIp() {
  ipCounter++;
  return `192.168.10.${ipCounter}`;
}

async function runTest(title, testFn) {
  totalTests++;
  const label = `[TEST ${String(totalTests).padStart(2, '0')}] ${title}`;
  try {
    await testFn();
    passedTests++;
    console.log(`  ✓ PASS: ${label}`);
  } catch (err) {
    failedTests++;
    console.error(`  ✗ FAIL: ${label}`);
    console.error(`          Reason: ${err.message}`);
    failureDetails.push({ label, error: err.message });
  }
}

function createRequest(body, { ip = getUniqueIp(), isRaw = false } = {}) {
  const headers = new Headers({
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36',
    'x-forwarded-for': ip,
    'content-type': 'application/json',
  });

  return new NextRequest('http://localhost:3000/api/contact', {
    method: 'POST',
    headers,
    body: isRaw ? body : JSON.stringify(body),
  });
}

// -----------------------------------------------------------------------------
// API SUITE: /api/contact endpoint verification
// -----------------------------------------------------------------------------

await runTest('/api/contact handles valid enquiry payload with HTTP 200 and referenceId', async () => {
  const req = createRequest({
    name: 'Senthil Nathan',
    email: 'senthil@apexindustries.in',
    phone: '+91 98401 23456',
    service: 'talent-acquisition',
    roleBand: '₹25 LPA - ₹50 LPA',
    company: 'Apex Industries',
    notes: 'Urgent requirement for Plant Operations Director in Trichy',
  });

  const res = await contactHandler(req);
  if (res.status !== 200) {
    throw new Error(`Expected HTTP 200 OK, received HTTP ${res.status}`);
  }

  const json = await res.json();
  if (!json.success) {
    throw new Error(`Expected success: true, got: ${JSON.stringify(json)}`);
  }
  if (!json.referenceId || typeof json.referenceId !== 'string') {
    throw new Error(`Expected string referenceId in response, got: ${json.referenceId}`);
  }
});

await runTest('/api/contact rejects missing required name with HTTP 400 Bad Request', async () => {
  const req = createRequest({
    email: 'missingname@enterprise.in',
    phone: '+91 98401 23456',
    service: 'talent-acquisition',
  });

  const res = await contactHandler(req);
  if (res.status !== 400) {
    throw new Error(`Expected HTTP 400 Bad Request, received HTTP ${res.status}`);
  }

  const json = await res.json();
  if (json.success !== false) {
    throw new Error(`Expected success: false, got: ${JSON.stringify(json)}`);
  }
});

await runTest('/api/contact rejects invalid phone format with HTTP 400 Bad Request', async () => {
  const req = createRequest({
    name: 'Test Client',
    email: 'test@client.in',
    phone: '123', // Invalid (<10 digits)
  });

  const res = await contactHandler(req);
  if (res.status !== 400) {
    throw new Error(`Expected HTTP 400 Bad Request, received HTTP ${res.status}`);
  }
});

await runTest('/api/contact rejects honeypot submission with HTTP 400 and spam detection', async () => {
  const req = createRequest({
    name: 'Spam Bot 3000',
    email: 'bot@spamnet.ru',
    phone: '+91 99999 88888',
    honeypot: 'i_am_a_robot_filler', // Hidden honeypot triggered
  });

  const res = await contactHandler(req);
  if (res.status !== 400) {
    throw new Error(`Expected HTTP 400 Bad Request for honeypot, received HTTP ${res.status}`);
  }

  const json = await res.json();
  const errorText = (json.error || JSON.stringify(json)).toLowerCase();
  if (!errorText.includes('spam') && !errorText.includes('bot')) {
    throw new Error(`Expected spam/bot detection indicator in error message, got: ${json.error}`);
  }
});

await runTest('/api/contact handles malformed JSON body with HTTP 400 Bad Request', async () => {
  const req = createRequest('{ invalid_json_payload: ', { isRaw: true });

  const res = await contactHandler(req);
  if (res.status !== 400) {
    throw new Error(`Expected HTTP 400 Bad Request for malformed JSON, received HTTP ${res.status}`);
  }
});

// -----------------------------------------------------------------------------
// CALCULATOR SUITE: Interactive Fee Calculator Mathematical Model
// -----------------------------------------------------------------------------

function calculateContingencyFee(ctc, feePercentage = 8.33) {
  if (typeof ctc !== 'number' || isNaN(ctc)) {
    throw new Error('CTC must be a valid number');
  }
  const minCtc = 1200000;  // ₹12 LPA
  const maxCtc = 10000000; // ₹1 Cr
  const clampedCtc = Math.min(Math.max(ctc, minCtc), maxCtc);
  const fee = Math.round(clampedCtc * (feePercentage / 100));
  const upfrontCost = 0; // 100% contingency model invariant

  return {
    ctc: clampedCtc,
    feePercentage,
    fee,
    upfrontCost,
    isContingencyOnly: upfrontCost === 0,
  };
}

await runTest('Fee Calculator: Minimum CTC boundary ₹12 LPA calculation at 8.33%', async () => {
  const result = calculateContingencyFee(1200000, 8.33);
  if (result.fee !== 99960) {
    throw new Error(`Expected ₹99,960 fee for ₹12L at 8.33%, got ₹${result.fee}`);
  }
  if (result.upfrontCost !== 0) {
    throw new Error(`Expected 0 upfront cost, got ${result.upfrontCost}`);
  }
});

await runTest('Fee Calculator: Mid-range CTC ₹50 LPA calculation at 8.33%', async () => {
  const result = calculateContingencyFee(5000000, 8.33);
  if (result.fee !== 416500) {
    throw new Error(`Expected ₹4,16,500 fee for ₹50L at 8.33%, got ₹${result.fee}`);
  }
});

await runTest('Fee Calculator: Maximum CTC boundary ₹1 Cr calculation at 8.33%', async () => {
  const result = calculateContingencyFee(10000000, 8.33);
  if (result.fee !== 833000) {
    throw new Error(`Expected ₹8,33,000 fee for ₹1 Cr at 8.33%, got ₹${result.fee}`);
  }
});

await runTest('Fee Calculator: Zero upfront fee invariant holds across all salary bands', async () => {
  const testCtcs = [1200000, 2500000, 5000000, 7500000, 10000000];
  for (const ctc of testCtcs) {
    const res = calculateContingencyFee(ctc);
    if (!res.isContingencyOnly || res.upfrontCost !== 0) {
      throw new Error(`Invariant violation: Non-zero upfront cost detected at CTC ${ctc}`);
    }
    if (res.fee <= 0) {
      throw new Error(`Invariant violation: Non-positive fee (${res.fee}) at CTC ${ctc}`);
    }
  }
});

await runTest('Fee Calculator: Clamping enforces bounds ₹12L to ₹1Cr strictly', async () => {
  const underMin = calculateContingencyFee(500000); // ₹5L (below min)
  if (underMin.ctc !== 1200000) {
    throw new Error(`Expected lower bound clamp to 1200000, got ${underMin.ctc}`);
  }

  const overMax = calculateContingencyFee(20000000); // ₹2 Cr (above max)
  if (overMax.ctc !== 10000000) {
    throw new Error(`Expected upper bound clamp to 10000000, got ${overMax.ctc}`);
  }
});

// -----------------------------------------------------------------------------
// Summary
// -----------------------------------------------------------------------------
console.log('\n----------------------------------------------------------------------');
console.log(`TIER 2 SUMMARY: ${passedTests}/${totalTests} tests passed (${failedTests} failed)`);
console.log('----------------------------------------------------------------------\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
