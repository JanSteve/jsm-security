/**
 * Milestone 1 Empirical Challenger Audit Suite
 * Agent: teamwork_challenger_m1_1
 *
 * Programmatically and empirically audits:
 * 1. Tier 1 Static Integrity test runner and failure analysis
 * 2. globals.css token cleanliness (zero legacy/prohibited tokens, all Warm Editorial tokens present)
 * 3. CONFIRM_ITEMS.md integrity and completeness
 * 4. MobileNav & Header accessibility and touch target validation
 * 5. Font pairing and theme locking integrity
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const projectRoot = process.cwd();
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const issues = [];

function assertTest(name, fn) {
  totalTests++;
  try {
    const res = fn();
    if (res === false) throw new Error('Assertion returned false');
    passedTests++;
    console.log(`  [PASS] Test ${totalTests}: ${name}`);
  } catch (err) {
    failedTests++;
    console.log(`  [FAIL] Test ${totalTests}: ${name}`);
    console.log(`         Error: ${err.message}`);
    issues.push({ test: name, error: err.message });
  }
}

console.log('======================================================================');
console.log('  MILESTONE 1 EMPIRICAL CHALLENGER AUDIT SUITE');
console.log('======================================================================\n');

// -----------------------------------------------------------------------------
// 1. TIER 1 STATIC INTEGRITY TEST RUN
// -----------------------------------------------------------------------------
console.log('--- 1. TIER 1 TEST HARNESS EXECUTION ---');

assertTest('npm run test:tier1 exit code and check results', () => {
  let output = '';
  let exitCode = 0;
  try {
    output = execSync('node tests/tier1-static-integrity.mjs', {
      cwd: projectRoot,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe']
    });
  } catch (err) {
    exitCode = err.status || 1;
    output = (err.stdout || '') + (err.stderr || '');
  }

  console.log(`         Command exit code: ${exitCode}`);
  if (exitCode !== 0) {
    const failureMatch = output.match(/✗ FAIL: ([^\n]+)\n\s+Reason: ([^\n]+)/);
    const reason = failureMatch ? `${failureMatch[1]} -> ${failureMatch[2]}` : 'Non-zero exit';
    throw new Error(`test:tier1 failed with exit code ${exitCode}. Details: ${reason}`);
  }
  return true;
});

// -----------------------------------------------------------------------------
// 2. GLOBALS.CSS PROHIBITED TOKENS & REQUIRED WARM EDITORIAL TOKENS
// -----------------------------------------------------------------------------
console.log('\n--- 2. CSS TOKEN INTEGRITY & PURGE VERIFICATION ---');

const cssPath = path.join(projectRoot, 'src/app/globals.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');

assertTest('Zero legacy tactical tokens in globals.css (obsidian, cyan, emerald, titanium, border-beam, security-grid)', () => {
  const prohibitedTerms = ['obsidian', 'cyan', 'emerald', 'titanium', 'border-beam', 'security-grid'];
  const found = [];
  for (const term of prohibitedTerms) {
    const regex = new RegExp(`\\b${term}\\b`, 'i');
    if (regex.test(cssContent)) {
      found.push(term);
    }
  }
  if (found.length > 0) {
    throw new Error(`Found prohibited terms in globals.css: ${found.join(', ')}`);
  }
  return true;
});

assertTest('Zero purple or violet gradient utility classes in globals.css', () => {
  const purpleRegex = /(?:from|via|to)-(?:purple|violet|fuchsia)-/i;
  if (purpleRegex.test(cssContent)) {
    throw new Error('Found prohibited purple/violet gradients in globals.css');
  }
  return true;
});

assertTest('All mandatory Warm Editorial design tokens defined in globals.css :root', () => {
  const mandatoryTokens = [
    '--paper: #F6F3EE',
    '--ink: #0E1116',
    '--card: #FFFFFF',
    '--accent: #C8553D',
    '--deep-teal: #1F4E5F',
    '--muted: #6B7280',
    '--radius-interactive: 12px',
    '--radius-card: 24px',
    '--container-max: 1180px'
  ];
  const missing = [];
  for (const token of mandatoryTokens) {
    const [name, val] = token.split(':').map(s => s.trim());
    const tokenRegex = new RegExp(`${name}\\s*:\\s*${val.replace('#', '#?')}`, 'i');
    if (!tokenRegex.test(cssContent)) {
      missing.push(token);
    }
  }
  if (missing.length > 0) {
    throw new Error(`Missing mandatory tokens in globals.css: ${missing.join(', ')}`);
  }
  return true;
});

// -----------------------------------------------------------------------------
// 3. CONFIRM_ITEMS.MD REGISTER VERIFICATION
// -----------------------------------------------------------------------------
console.log('\n--- 3. CONFIRM_ITEMS.MD FACT INTEGRITY AUDIT ---');

const confirmPath = path.join(projectRoot, 'CONFIRM_ITEMS.md');
assertTest('CONFIRM_ITEMS.md exists at project root', () => {
  if (!fs.existsSync(confirmPath)) {
    throw new Error('CONFIRM_ITEMS.md not found at project root');
  }
  return true;
});

const confirmContent = fs.existsSync(confirmPath) ? fs.readFileSync(confirmPath, 'utf8') : '';

assertTest('CONFIRM_ITEMS.md contains required [CONFIRM: role band] tag with >= 3 occurrences', () => {
  const count = (confirmContent.match(/\[CONFIRM: role band\]/g) || []).length;
  if (count < 3) {
    throw new Error(`Expected at least 3 occurrences of [CONFIRM: role band], found ${count}`);
  }
  return true;
});

assertTest('CONFIRM_ITEMS.md contains required [CONFIRM: fee %] tag with >= 3 occurrences', () => {
  const count = (confirmContent.match(/\[CONFIRM: fee %\]/g) || []).length;
  if (count < 3) {
    throw new Error(`Expected at least 3 occurrences of [CONFIRM: fee %], found ${count}`);
  }
  return true;
});

assertTest('CONFIRM_ITEMS.md contains required [CONFIRM: team credential] tag with >= 2 occurrences', () => {
  const count = (confirmContent.match(/\[CONFIRM: team credential\]/g) || []).length;
  if (count < 2) {
    throw new Error(`Expected at least 2 occurrences of [CONFIRM: team credential], found ${count}`);
  }
  return true;
});

assertTest('CONFIRM_ITEMS.md contains all 6 operating focus states', () => {
  const states = ['Tamil Nadu', 'Karnataka', 'Maharashtra', 'Delhi', 'Madhya Pradesh', 'Gujarat'];
  const missing = states.filter(s => !confirmContent.includes(s));
  if (missing.length > 0) {
    throw new Error(`CONFIRM_ITEMS.md missing focus states: ${missing.join(', ')}`);
  }
  return true;
});

assertTest('CONFIRM_ITEMS.md contains verified corporate phone, email, and Kottapattu address', () => {
  if (!confirmContent.includes('contact@jsmintegratedservices.com')) {
    throw new Error('Missing verified email in CONFIRM_ITEMS.md');
  }
  if (!confirmContent.includes('+91 90808 63448')) {
    throw new Error('Missing verified phone in CONFIRM_ITEMS.md');
  }
  if (!confirmContent.includes('Kottapattu') || !confirmContent.includes('620021')) {
    throw new Error('Missing verified Kottapattu address in CONFIRM_ITEMS.md');
  }
  return true;
});

// -----------------------------------------------------------------------------
// 4. MOBILE NAV & HEADER ACCESSIBILITY / TOUCH TARGET AUDIT
// -----------------------------------------------------------------------------
console.log('\n--- 4. MOBILE NAVIGATION & HEADER ADVERSARIAL STRESS TEST ---');

const mobileNavPath = path.join(projectRoot, 'src/components/layout/mobile-nav.tsx');
const mobileNavContent = fs.readFileSync(mobileNavPath, 'utf8');

assertTest('MobileNav implements Escape key listener and body scroll lock', () => {
  if (!mobileNavContent.includes('event.key === "Escape"')) {
    throw new Error('MobileNav missing Escape key event check');
  }
  if (!mobileNavContent.includes('document.body.style.overflow = "hidden"')) {
    throw new Error('MobileNav missing body scroll lock assignment');
  }
  if (!mobileNavContent.includes('document.body.style.overflow = originalOverflow')) {
    throw new Error('MobileNav missing body scroll lock restore on cleanup');
  }
  return true;
});

assertTest('MobileNav hamburger trigger button satisfies minimum 44px touch target requirement', () => {
  if (!mobileNavContent.includes('min-w-[44px]') || !mobileNavContent.includes('min-h-[44px]')) {
    throw new Error('MobileNav hamburger trigger missing explicit min-w-[44px] min-h-[44px]');
  }
  return true;
});

assertTest('MobileNav close button satisfies minimum 44px touch target requirement', () => {
  // Look at close button markup
  const closeBtnMatch = mobileNavContent.match(/aria-label="Close navigation menu"[\s\S]*?className="([^"]+)"/);
  if (!closeBtnMatch) {
    throw new Error('Close button with aria-label not found');
  }
  const cls = closeBtnMatch[1];
  if (!cls.includes('min-w-[44px]') || !cls.includes('min-h-[44px]')) {
    throw new Error(`Close button missing 44px target minimums: ${cls}`);
  }
  return true;
});

assertTest('MobileNav menu links satisfy minimum 44px touch target requirement', () => {
  if (!mobileNavContent.includes('min-h-[48px]')) {
    throw new Error('MobileNav links missing min-h-[48px] target height');
  }
  return true;
});

// ADVERSARIAL CHALLENGE: Focus trap in MobileNav dialog
assertTest('MobileNav dialog implements keyboard focus trapping (Tab key trap)', () => {
  // A modal dialog should prevent keyboard focus from leaving while open
  const hasFocusTrap = mobileNavContent.includes('focus-trap') ||
                       mobileNavContent.includes('FocusLock') ||
                       (mobileNavContent.includes('Tab') && mobileNavContent.includes('preventDefault'));
  if (!hasFocusTrap) {
    throw new Error('MobileNav dialog does NOT trap Tab key focus inside the modal dialog; focus can escape to background elements behind the overlay');
  }
  return true;
});

// ADVERSARIAL CHALLENGE: Target size on inline email link in MobileNav info card
assertTest('MobileNav contact email link satisfies minimum touch target (44x44px)', () => {
  const emailLinkMatch = mobileNavContent.match(/href="mailto:contact@jsmintegratedservices\.com"[\s\S]*?className="([^"]*)"/);
  if (!emailLinkMatch) {
    throw new Error('Email link not found in MobileNav');
  }
  const cls = emailLinkMatch[1];
  const hasMinTarget = cls.includes('min-h-[44px]') || cls.includes('p-') || cls.includes('py-');
  if (!hasMinTarget) {
    throw new Error(`Email link in MobileNav info card has no minimum touch target padding or dimensions (className="${cls}")`);
  }
  return true;
});

// -----------------------------------------------------------------------------
// 5. HEADER & LAYOUT AUDIT
// -----------------------------------------------------------------------------
console.log('\n--- 5. HEADER & LAYOUT ARCHITECTURE ---');

const headerPath = path.join(projectRoot, 'src/components/layout/header.tsx');
const headerContent = fs.readFileSync(headerPath, 'utf8');

assertTest('Header features 3px scroll progress bar bound to scrollYProgress', () => {
  if (!headerContent.includes('h-[3px] bg-[#C8553D]') || !headerContent.includes('scaleX: scrollYProgress')) {
    throw new Error('3px top scroll progress bar not found in header.tsx');
  }
  return true;
});

assertTest('Header implements 40px scroll transition with backdrop blur', () => {
  if (!headerContent.includes('latest > 40') || !headerContent.includes('backdrop-blur-md')) {
    throw new Error('Header missing 40px scroll transition or backdrop-blur-md');
  }
  return true;
});

const layoutPath = path.join(projectRoot, 'src/app/layout.tsx');
const layoutContent = fs.readFileSync(layoutPath, 'utf8');

assertTest('layout.tsx imports Fraunces and Inter with variable bindings and purges prohibited elements', () => {
  if (!layoutContent.includes('Fraunces') || !layoutContent.includes('Inter')) {
    throw new Error('layout.tsx missing Fraunces or Inter font configuration');
  }
  if (!layoutContent.includes('--font-heading') || !layoutContent.includes('--font-body')) {
    throw new Error('layout.tsx missing --font-heading or --font-body variables');
  }
  if (layoutContent.includes('<CookieBanner') || layoutContent.includes('<MobileDock')) {
    throw new Error('layout.tsx still renders prohibited CookieBanner or MobileDock components');
  }
  return true;
});

const providersPath = path.join(projectRoot, 'src/components/providers.tsx');
const providersContent = fs.readFileSync(providersPath, 'utf8');

assertTest('providers.tsx locks NextThemesProvider to forced light theme with system disabled', () => {
  if (!providersContent.includes('defaultTheme="light"') ||
      !providersContent.includes('forcedTheme="light"') ||
      !providersContent.includes('enableSystem={false}')) {
    throw new Error('providers.tsx does not properly lock light theme');
  }
  return true;
});

// -----------------------------------------------------------------------------
// SUMMARY & EXIT
// -----------------------------------------------------------------------------
console.log('\n======================================================================');
console.log(`AUDIT RESULTS: ${passedTests}/${totalTests} PASSED, ${failedTests} FAILED`);
console.log('======================================================================');

if (issues.length > 0) {
  console.log('\nDetailed Issues:');
  issues.forEach((iss, idx) => {
    console.log(`  ${idx + 1}. [${iss.test}]: ${iss.error}`);
  });
}

process.exit(failedTests > 0 ? 1 : 0);
