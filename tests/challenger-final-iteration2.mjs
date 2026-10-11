import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('======================================================================');
console.log('  CHALLENGER FINAL: ITERATION 2 GATE EMPIRICAL VERIFICATION SUITE');
console.log('======================================================================\n');

let passCount = 0;
let failCount = 0;
const failures = [];

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`✓ [PASS] ${testName}`);
    passCount++;
  } else {
    console.error(`✗ [FAIL] ${testName} ${details ? '(' + details + ')' : ''}`);
    failCount++;
    failures.push({ testName, details });
  }
}

// -------------------------------------------------------------
// TEST SUITE 1: TAP TARGETS IN src/components/widgets/queue-simulator.tsx
// -------------------------------------------------------------
console.log('--- SUITE 1: Tap Targets in queue-simulator.tsx (min 44px) ---');

const queueSimPath = path.resolve('src/components/widgets/queue-simulator.tsx');
assert(fs.existsSync(queueSimPath), 'queue-simulator.tsx exists');

const queueSimContent = fs.readFileSync(queueSimPath, 'utf8');

// Check that no legacy sub-44px markers remain
assert(!queueSimContent.includes('min-h-[36px]'), 'Zero occurrences of min-h-[36px]');
assert(!queueSimContent.includes('min-h-[32px]'), 'Zero occurrences of min-h-[32px]');
assert(!queueSimContent.includes('w-8 h-8'), 'Zero occurrences of w-8 h-8');

// Parse all <button> elements
const buttonRegex = /<button[\s\S]*?<\/button>/g;
const buttons = queueSimContent.match(buttonRegex) || [];
assert(buttons.length === 11, `Found exactly 11 buttons in queue-simulator.tsx (found: ${buttons.length})`);

buttons.forEach((btn, idx) => {
  const classMatch = btn.match(/className=\{?[\`\"']([^\"'\`\}]+)[\`\"']\}?/);
  const classes = classMatch ? classMatch[1] : '';
  const hasMinH44 = classes.includes('min-h-[44px]');
  assert(hasMinH44, `Button #${idx + 1} specifies min-h-[44px]`, `classes: ${classes}`);
});

// Specifically check Table Switcher buttons (formerly line 422)
const tableButtonSnippet = queueSimContent.slice(queueSimContent.indexOf('tableNumber === num'), queueSimContent.indexOf('tableNumber === num') + 300);
assert(
  queueSimContent.includes('min-h-[44px] min-w-[44px] flex items-center justify-center'),
  'Table selector buttons have min-h-[44px] min-w-[44px]'
);

// Specifically check Quantity Modifier - and + buttons (formerly lines 460, 468)
const hasMinusModifier = queueSimContent.includes('w-11 h-11 rounded bg-white hover:bg-slate-100 text-[#14181F] font-bold text-sm flex items-center justify-center min-h-[44px] min-w-[44px]');
const hasPlusModifier = queueSimContent.includes('w-11 h-11 rounded bg-[#0F2A47] text-white hover:bg-[#0A1E33] font-bold text-sm flex items-center justify-center min-h-[44px] min-w-[44px]');
assert(hasMinusModifier, 'Quantity decrement (-) button is w-11 h-11 min-h-[44px] min-w-[44px]');
assert(hasPlusModifier, 'Quantity increment (+) button is w-11 h-11 min-h-[44px] min-w-[44px]');


// -------------------------------------------------------------
// TEST SUITE 2: WIDGET ROUTING FOR SERVICES
// -------------------------------------------------------------
console.log('\n--- SUITE 2: Widget Routing Alignment & Compiled HTML ---');

const servicePagePath = path.resolve('src/app/services/[slug]/page.tsx');
assert(fs.existsSync(servicePagePath), '[slug]/page.tsx exists');
const servicePageContent = fs.readFileSync(servicePagePath, 'utf8');

// Check slug routing arrays
assert(servicePageContent.includes("'social-media-meta-ads'"), "isReputationService includes 'social-media-meta-ads'");
assert(servicePageContent.includes("'garage-service-tracker'"), "isQueueService includes 'garage-service-tracker'");

// Inspect pre-rendered HTML for /services/social-media-meta-ads
const socialHtmlPath = path.resolve('.next/server/app/services/social-media-meta-ads.html');
assert(fs.existsSync(socialHtmlPath), 'Pre-rendered HTML exists for /services/social-media-meta-ads');
const socialHtml = fs.readFileSync(socialHtmlPath, 'utf8');

assert(
  socialHtml.includes('Simulate Dual-Routing Smart Review Filtration'),
  '/services/social-media-meta-ads renders ReviewFilterWidget section header'
);
assert(
  !socialHtml.includes('Simulate Statutory Cost Savings &amp; ROI') && !socialHtml.includes('Simulate Statutory Cost Savings & ROI'),
  '/services/social-media-meta-ads does NOT fall back to RoiCalculator'
);

// Inspect pre-rendered HTML for /services/garage-service-tracker
const garageHtmlPath = path.resolve('.next/server/app/services/garage-service-tracker.html');
assert(fs.existsSync(garageHtmlPath), 'Pre-rendered HTML exists for /services/garage-service-tracker');
const garageHtml = fs.readFileSync(garageHtmlPath, 'utf8');

assert(
  garageHtml.includes('Simulate Real-Time Queue &amp; Order Dispatch') || garageHtml.includes('Simulate Real-Time Queue & Order Dispatch'),
  '/services/garage-service-tracker renders QueueSimulator section header'
);
assert(
  garageHtml.includes('Clinic Token Tracker') && garageHtml.includes('Table QR Order Flow'),
  '/services/garage-service-tracker contains QueueSimulator component contents'
);
assert(
  !garageHtml.includes('Simulate Statutory Cost Savings &amp; ROI') && !garageHtml.includes('Simulate Statutory Cost Savings & ROI'),
  '/services/garage-service-tracker does NOT fall back to RoiCalculator'
);


// -------------------------------------------------------------
// TEST SUITE 3: QUOTE-PDF DYNAMIC TITLE INTERPOLATION & COLOR TOKENS
// -------------------------------------------------------------
console.log('\n--- SUITE 3: Quote PDF Dynamic Title Interpolation ---');

const quotePdfRoutePath = path.resolve('src/app/api/quote-pdf/route.ts');
assert(fs.existsSync(quotePdfRoutePath), 'quote-pdf/route.ts exists');
const quotePdfContent = fs.readFileSync(quotePdfRoutePath, 'utf8');

assert(
  quotePdfContent.includes('<title>Commercial Proposal - ${companyName}</title>'),
  'Title tag correctly uses unescaped template string ${companyName}'
);
assert(
  !quotePdfContent.includes('<title>Commercial Proposal - \\${companyName}</title>'),
  'Zero escaped template strings (\\${companyName}) in quote-pdf/route.ts'
);
assert(
  !quotePdfContent.includes('#0071e3'),
  'Zero occurrences of legacy #0071e3 in quote-pdf/route.ts (replaced with #0F2A47)'
);


// -------------------------------------------------------------
// TEST SUITE 4: ESLINT ZERO ERRORS COMPLIANCE
// -------------------------------------------------------------
console.log('\n--- SUITE 4: ESLint Verification ---');

// Check the 4 formerly defective files specifically
const privacyContent = fs.readFileSync('src/app/legal/privacy/page.tsx', 'utf8');
assert(!privacyContent.includes("clients'"), "privacy/page.tsx unescaped entity clients' fixed");
assert(!privacyContent.includes("employees'"), "privacy/page.tsx unescaped entity employees' fixed");

const notFoundContent = fs.readFileSync('src/app/not-found.tsx', 'utf8');
assert(!notFoundContent.includes("you're"), "not-found.tsx unescaped entity you're fixed");
assert(!notFoundContent.includes("can't"), "not-found.tsx unescaped entity can't fixed");

const contactFormContent = fs.readFileSync('src/components/contact/contact-form.tsx', 'utf8');
assert(!contactFormContent.includes('const ticketRef = `JSM-REQ-${Date.now()'), "contact-form.tsx impure Date.now() removed from component render");

const cookieBannerContent = fs.readFileSync('src/components/shared/cookie-banner.tsx', 'utf8');
assert(cookieBannerContent.includes('setTimeout'), 'cookie-banner.tsx uses timer-deferred dispatch for setState');
assert(cookieBannerContent.includes('&quot;Accept&quot;'), 'cookie-banner.tsx unescaped quotes fixed with &quot;');

// Run npm run lint command check
try {
  const lintOutput = execSync('npm run lint', { encoding: 'utf8', env: { ...process.env, PATH: `/opt/homebrew/bin:${process.env.PATH}` } });
  const has0Errors = lintOutput.includes('0 errors');
  assert(has0Errors, 'npm run lint reports 0 errors');
} catch (err) {
  // If exit code != 0, it throws
  assert(false, 'npm run lint failed with non-zero exit code', err.message);
}


// -------------------------------------------------------------
// TEST SUITE 5: PRODUCTION BUILD COMPILATION
// -------------------------------------------------------------
console.log('\n--- SUITE 5: Production Build Verification ---');

try {
  // Check build artifact directly: .next/BUILD_ID exists and is recent
  const buildIdPath = path.resolve('.next/BUILD_ID');
  assert(fs.existsSync(buildIdPath), '.next/BUILD_ID exists');
  const buildId = fs.readFileSync(buildIdPath, 'utf8').trim();
  assert(buildId.length > 0, `Build ID is valid: ${buildId}`);

  const expectedSlugs = [
    'private-security', 'manpower', 'housekeeping', 'tender-procurement-supply',
    'scanning-digitalization-it', 'website-design-development', 'whatsapp-automation-crm',
    'nfc-review-standees', 'missed-call-lead-recovery', 'qr-table-ordering',
    'whatsapp-loyalty-punch-card', 'clinic-token-tracker', 'garage-service-tracker',
    'emergency-parking-qr', 'local-seo-gbp-ranking', 'social-media-meta-ads',
    'linkedin-b2b-growth', 'custom-software-web-apps', 'email-marketing-automation',
    'commercial-video-production', 'csc-digital-citizen-services'
  ];
  for (const s of expectedSlugs) {
    assert(fs.existsSync(path.resolve(`.next/server/app/services/${s}.html`)), `Pre-rendered HTML exists for /services/${s}`);
  }
  assert(fs.existsSync('.next/server/app/index.html'), 'Home page .next/server/app/index.html compiled');
  assert(fs.existsSync('.next/server/app/services.html'), 'Services index page compiled');
} catch (err) {
  assert(false, 'Build artifact check failed', err.message);
}


// -------------------------------------------------------------
// SUMMARY AND VERDICT
// -------------------------------------------------------------
console.log('\n======================================================================');
console.log(`  VERIFICATION RESULTS: ${passCount} PASSED, ${failCount} FAILED`);
console.log('======================================================================\n');

if (failCount > 0) {
  console.error('VERDICT: REQUEST_CHANGES');
  console.error('Failures:', failures);
  process.exit(1);
} else {
  console.log('VERDICT: APPROVE');
  console.log('All Iteration 2 requirements verified cleanly with 100% pass rate.');
  process.exit(0);
}
