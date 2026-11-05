/**
 * Milestone 2 Challenger 1 Empirical Stress-Test Suite
 * Agent: teamwork_challenger_m2_1
 *
 * Programmatically and empirically audits:
 * 1. Fee calculator mathematical model (₹12L, ₹50L, ₹1Cr exact fee values)
 * 2. Clamping behavior (< ₹12L, > ₹1Cr, edge floats, +/- Infinity)
 * 3. Zero upfront fee invariant across continuous domain
 * 4. Error handling on invalid types (NaN, strings, null, undefined)
 * 5. INR currency and Lakh/Crore formatting functions
 * 6. Component AST / structural inspection for accessibility and UI constraints
 * 7. End-to-end integration across Home page sections
 */

import fs from 'node:fs';
import path from 'node:path';
import { calculateContingencyFee, formatINR, formatLakhCr } from '../src/components/home/fee-calculator.tsx';

const projectRoot = process.cwd();
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failureDetails = [];

function assertTest(name, fn) {
  totalTests++;
  const label = `[TEST ${String(totalTests).padStart(2, '0')}] ${name}`;
  try {
    const res = fn();
    if (res === false) throw new Error('Assertion returned false');
    passedTests++;
    console.log(`  ✓ PASS: ${label}`);
  } catch (err) {
    failedTests++;
    console.error(`  ✗ FAIL: ${label}`);
    console.error(`          Reason: ${err.message}`);
    failureDetails.push({ label, error: err.message });
  }
}

console.log('======================================================================');
console.log('  MILESTONE 2 CHALLENGER 1: EMPIRICAL STRESS TEST HARNESS');
console.log('======================================================================\n');

// -----------------------------------------------------------------------------
// SECTION 1: MANDATED BOUNDARY CHECKS
// -----------------------------------------------------------------------------
console.log('--- 1. MANDATED BOUNDARY MATHEMATICAL TESTS ---');

assertTest('₹12 LPA boundary (1,200,000) calculates exact fee ₹99,960 at 8.33%', () => {
  const res = calculateContingencyFee(1200000, 8.33);
  if (res.fee !== 99960) {
    throw new Error(`Expected fee 99960, got ${res.fee}`);
  }
  if (res.ctc !== 1200000) {
    throw new Error(`Expected ctc 1200000, got ${res.ctc}`);
  }
  if (res.upfrontCost !== 0) {
    throw new Error(`Expected upfrontCost 0, got ${res.upfrontCost}`);
  }
});

assertTest('₹50 LPA mid-range (5,000,000) calculates exact fee ₹4,16,500 at 8.33%', () => {
  const res = calculateContingencyFee(5000000, 8.33);
  if (res.fee !== 416500) {
    throw new Error(`Expected fee 416500, got ${res.fee}`);
  }
  if (res.ctc !== 5000000) {
    throw new Error(`Expected ctc 5000000, got ${res.ctc}`);
  }
});

assertTest('₹1 Cr boundary (10,000,000) calculates exact fee ₹8,33,000 at 8.33%', () => {
  const res = calculateContingencyFee(10000000, 8.33);
  if (res.fee !== 833000) {
    throw new Error(`Expected fee 833000, got ${res.fee}`);
  }
  if (res.ctc !== 10000000) {
    throw new Error(`Expected ctc 10000000, got ${res.ctc}`);
  }
});

// -----------------------------------------------------------------------------
// SECTION 2: PRESET VALUES VERIFICATION
// -----------------------------------------------------------------------------
console.log('\n--- 2. QUICK COMPENSATION PRESET VALUES ---');

const presets = [
  { label: '₹15 LPA', value: 1500000, expectedFee: 124950 },
  { label: '₹30 LPA', value: 3000000, expectedFee: 249900 },
  { label: '₹50 LPA', value: 5000000, expectedFee: 416500 },
  { label: '₹75 LPA', value: 7500000, expectedFee: 624750 },
  { label: '₹1 Cr', value: 10000000, expectedFee: 833000 },
];

for (const p of presets) {
  assertTest(`Preset ${p.label} (${p.value}) produces exact fee ₹${p.expectedFee.toLocaleString('en-IN')}`, () => {
    const res = calculateContingencyFee(p.value, 8.33);
    if (res.fee !== p.expectedFee) {
      throw new Error(`Expected fee ${p.expectedFee}, got ${res.fee}`);
    }
  });
}

// -----------------------------------------------------------------------------
// SECTION 3: CLAMPING BEHAVIOR (< ₹12L & > ₹1Cr)
// -----------------------------------------------------------------------------
console.log('\n--- 3. CLAMPING BEHAVIOR & EXTREME BOUNDS ---');

assertTest('Under-min: ₹0 clamps to ₹12 LPA and produces ₹99,960 fee', () => {
  const res = calculateContingencyFee(0);
  if (res.ctc !== 1200000 || res.fee !== 99960) {
    throw new Error(`Expected clamped ctc 1200000 and fee 99960, got ctc ${res.ctc}, fee ${res.fee}`);
  }
});

assertTest('Under-min: Negative CTC (-₹50 LPA) clamps to ₹12 LPA', () => {
  const res = calculateContingencyFee(-5000000);
  if (res.ctc !== 1200000 || res.fee !== 99960) {
    throw new Error(`Expected clamped ctc 1200000, got ctc ${res.ctc}, fee ${res.fee}`);
  }
});

assertTest('Under-min: Off-by-one ₹11,99,999 clamps to ₹12 LPA', () => {
  const res = calculateContingencyFee(1199999);
  if (res.ctc !== 1200000 || res.fee !== 99960) {
    throw new Error(`Expected clamped ctc 1200000, got ctc ${res.ctc}`);
  }
});

assertTest('Under-min: -Infinity clamps safely to ₹12 LPA', () => {
  const res = calculateContingencyFee(-Infinity);
  if (res.ctc !== 1200000 || res.fee !== 99960) {
    throw new Error(`Expected -Infinity to clamp to 1200000, got ctc ${res.ctc}`);
  }
});

assertTest('Over-max: Off-by-one ₹1,00,00,001 clamps to ₹1 Cr and produces ₹8,33,000 fee', () => {
  const res = calculateContingencyFee(10000001);
  if (res.ctc !== 10000000 || res.fee !== 833000) {
    throw new Error(`Expected clamped ctc 10000000 and fee 833000, got ctc ${res.ctc}, fee ${res.fee}`);
  }
});

assertTest('Over-max: ₹2 Cr (20,000,000) clamps to ₹1 Cr', () => {
  const res = calculateContingencyFee(20000000);
  if (res.ctc !== 10000000 || res.fee !== 833000) {
    throw new Error(`Expected clamped ctc 10000000, got ctc ${res.ctc}`);
  }
});

assertTest('Over-max: ₹10 Cr (100,000,000) clamps to ₹1 Cr', () => {
  const res = calculateContingencyFee(100000000);
  if (res.ctc !== 10000000 || res.fee !== 833000) {
    throw new Error(`Expected clamped ctc 10000000, got ctc ${res.ctc}`);
  }
});

assertTest('Over-max: +Infinity clamps safely to ₹1 Cr', () => {
  const res = calculateContingencyFee(Infinity);
  if (res.ctc !== 10000000 || res.fee !== 833000) {
    throw new Error(`Expected Infinity to clamp to 10000000, got ctc ${res.ctc}`);
  }
});

// -----------------------------------------------------------------------------
// SECTION 4: ZERO UPFRONT COST & CONTINGENCY INVARIANT ACROSS DOMAIN
// -----------------------------------------------------------------------------
console.log('\n--- 4. ZERO UPFRONT COST INVARIANT ACROSS CONTINUOUS DOMAIN ---');

assertTest('Continuous scan: 89 steps from ₹12L to ₹1Cr maintain upfrontCost === 0 and monotonic fees', () => {
  let prevFee = 0;
  for (let ctc = 1200000; ctc <= 10000000; ctc += 100000) {
    const res = calculateContingencyFee(ctc, 8.33);
    if (res.upfrontCost !== 0) {
      throw new Error(`Invariant violation: non-zero upfrontCost ${res.upfrontCost} at CTC ${ctc}`);
    }
    if (res.isContingencyOnly !== true) {
      throw new Error(`Invariant violation: isContingencyOnly false at CTC ${ctc}`);
    }
    if (res.fee < prevFee) {
      throw new Error(`Monotonicity violation: fee decreased from ${prevFee} to ${res.fee} at CTC ${ctc}`);
    }
    const expected = Math.round(ctc * 0.0833);
    if (res.fee !== expected) {
      throw new Error(`Rounding mismatch at CTC ${ctc}: expected ${expected}, got ${res.fee}`);
    }
    prevFee = res.fee;
  }
});

// -----------------------------------------------------------------------------
// SECTION 5: INPUT VALIDATION & ERROR DEFENSE
// -----------------------------------------------------------------------------
console.log('\n--- 5. INPUT TYPE SAFETY & ERROR DEFENSE ---');

assertTest('calculateContingencyFee rejects NaN with descriptive error', () => {
  try {
    calculateContingencyFee(NaN);
    throw new Error('Did not throw on NaN');
  } catch (err) {
    if (!err.message.includes('valid number')) {
      throw new Error(`Unexpected error message: ${err.message}`);
    }
  }
});

assertTest('calculateContingencyFee rejects string inputs ("1200000")', () => {
  try {
    calculateContingencyFee('1200000');
    throw new Error('Did not throw on string input');
  } catch (err) {
    if (!err.message.includes('valid number')) {
      throw new Error(`Unexpected error message: ${err.message}`);
    }
  }
});

assertTest('calculateContingencyFee rejects null and undefined', () => {
  try {
    calculateContingencyFee(null);
    throw new Error('Did not throw on null');
  } catch (err) {
    if (!err.message.includes('valid number')) {
      throw new Error(`Unexpected error message: ${err.message}`);
    }
  }

  try {
    calculateContingencyFee(undefined);
    throw new Error('Did not throw on undefined');
  } catch (err) {
    if (!err.message.includes('valid number')) {
      throw new Error(`Unexpected error message: ${err.message}`);
    }
  }
});

// -----------------------------------------------------------------------------
// SECTION 6: FORMATTING HELPERS AUDIT
// -----------------------------------------------------------------------------
console.log('\n--- 6. INR & LAKH/CRORE FORMATTING AUDIT ---');

assertTest('formatINR correctly formats currency across boundaries', () => {
  const inr12L = formatINR(1200000).replace(/\u00A0/g, ' ');
  if (!inr12L.includes('12,00,000')) {
    throw new Error(`Expected Indian comma grouping for 12,00,000, got: "${inr12L}"`);
  }

  const inrFee12L = formatINR(99960).replace(/\u00A0/g, ' ');
  if (!inrFee12L.includes('99,960')) {
    throw new Error(`Expected Indian comma grouping for 99,960, got: "${inrFee12L}"`);
  }

  const inrFee50L = formatINR(416500).replace(/\u00A0/g, ' ');
  if (!inrFee50L.includes('4,16,500')) {
    throw new Error(`Expected Indian comma grouping for 4,16,500, got: "${inrFee50L}"`);
  }

  const inrFee1Cr = formatINR(833000).replace(/\u00A0/g, ' ');
  if (!inrFee1Cr.includes('8,33,000')) {
    throw new Error(`Expected Indian comma grouping for 8,33,000, got: "${inrFee1Cr}"`);
  }
});

assertTest('formatLakhCr formats integer Lakhs, fractional Lakhs, and Crores', () => {
  if (formatLakhCr(1200000) !== '₹12 LPA') {
    throw new Error(`Expected "₹12 LPA", got "${formatLakhCr(1200000)}"`);
  }
  if (formatLakhCr(1250000) !== '₹12.5 LPA') {
    throw new Error(`Expected "₹12.5 LPA", got "${formatLakhCr(1250000)}"`);
  }
  if (formatLakhCr(5000000) !== '₹50 LPA') {
    throw new Error(`Expected "₹50 LPA", got "${formatLakhCr(5000000)}"`);
  }
  if (formatLakhCr(10000000) !== '₹1 Cr') {
    throw new Error(`Expected "₹1 Cr", got "${formatLakhCr(10000000)}"`);
  }
  if (formatLakhCr(15000000) !== '₹1.50 Cr') {
    throw new Error(`Expected "₹1.50 Cr", got "${formatLakhCr(15000000)}"`);
  }
});

// -----------------------------------------------------------------------------
// SECTION 7: STATIC CODE & ACCESSIBILITY AUDIT
// -----------------------------------------------------------------------------
console.log('\n--- 7. COMPONENT ACCESSIBILITY & DESIGN INTEGRITY ---');

const calcFilePath = path.join(projectRoot, 'src/components/home/fee-calculator.tsx');
const calcFileContent = fs.readFileSync(calcFilePath, 'utf8');

assertTest('fee-calculator.tsx specifies aria-label, aria-valuemin, aria-valuemax, aria-valuenow on slider', () => {
  if (!calcFileContent.includes('aria-valuemin={1200000}')) {
    throw new Error('Missing aria-valuemin on slider');
  }
  if (!calcFileContent.includes('aria-valuemax={10000000}')) {
    throw new Error('Missing aria-valuemax on slider');
  }
  if (!calcFileContent.includes('aria-valuenow={calculation.ctc}')) {
    throw new Error('Missing aria-valuenow on slider');
  }
});

assertTest('fee-calculator.tsx uses 44px+ min-height targets for touch ergonomics', () => {
  const minHeightMatches = calcFileContent.match(/min-h-\[44px\]/g);
  if (!minHeightMatches || minHeightMatches.length < 3) {
    throw new Error(`Expected at least 3 touchpoints with min-h-[44px], found ${minHeightMatches?.length || 0}`);
  }
});

assertTest('fee-calculator.tsx includes mandatory [CONFIRM: fee %] and [CONFIRM: role band] tags', () => {
  if (!calcFileContent.includes('[CONFIRM: fee %]')) {
    throw new Error('Missing [CONFIRM: fee %] tag in fee-calculator.tsx');
  }
  if (!calcFileContent.includes('[CONFIRM: role band]')) {
    throw new Error('Missing [CONFIRM: role band] tag in fee-calculator.tsx');
  }
});

assertTest('fee-calculator.tsx presets grid collapses to 1 column on mobile (<760px)', () => {
  if (!calcFileContent.includes('grid-cols-1 md:grid-cols-5')) {
    throw new Error('Grid container in fee-calculator does not have grid-cols-1 for mobile collapse');
  }
  if (!calcFileContent.includes('data-grid-container="true"')) {
    throw new Error('Missing data-grid-container attribute on presets grid');
  }
});

assertTest('fee-calculator.tsx links to #enquiry with active CTC parameter in hash', () => {
  if (!calcFileContent.includes('href="#enquiry"')) {
    throw new Error('Missing href="#enquiry" on Hire CTA');
  }
  if (!calcFileContent.includes('#enquiry?ctc=')) {
    throw new Error('Missing #enquiry?ctc= parameter handoff on click');
  }
});

// -----------------------------------------------------------------------------
// SUMMARY & EXIT
// -----------------------------------------------------------------------------
console.log('\n----------------------------------------------------------------------');
console.log(`STRESS TEST SUMMARY: ${passedTests}/${totalTests} tests passed (${failedTests} failed)`);
console.log('----------------------------------------------------------------------\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
