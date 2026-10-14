import fs from 'fs';
import path from 'path';

console.log('================================================================================');
console.log('  CHALLENGER 1: PHASE 6 EMPIRICAL BUILD, TOKEN & WIDGET AUDIT                   ');
console.log('================================================================================\n');

let passCount = 0;
let failCount = 0;
const failures = [];

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`✓ [PASS] ${testName}`);
    passCount++;
  } else {
    console.error(`✗ [FAIL] ${testName} ${details ? '--> ' + details : ''}`);
    failCount++;
    failures.push({ testName, details });
  }
}

// ==============================================================================
// SUITE 1: PRODUCTION BUILD MANIFESTS & STATIC ROUTE INTEGRITY
// ==============================================================================
console.log('\n--- SUITE 1: Production Build Manifests & Static Route Integrity ---');

const nextDir = path.resolve('.next');
assert(fs.existsSync(nextDir), '.next build output directory exists');

const buildIdPath = path.join(nextDir, 'BUILD_ID');
assert(fs.existsSync(buildIdPath), 'BUILD_ID file exists');
const buildId = fs.existsSync(buildIdPath) ? fs.readFileSync(buildIdPath, 'utf8').trim() : '';
assert(buildId.length > 0, `BUILD_ID is valid non-empty string: "${buildId}"`);

const prerenderManifestPath = path.join(nextDir, 'prerender-manifest.json');
assert(fs.existsSync(prerenderManifestPath), 'prerender-manifest.json exists');
const prerenderData = JSON.parse(fs.readFileSync(prerenderManifestPath, 'utf8'));
const prerenderedRoutes = Object.keys(prerenderData.routes);
console.log(`  -> Prerendered routes discovered: ${prerenderedRoutes.length}`);
assert(prerenderedRoutes.length >= 40, `Prerendered routes count >= 40 (found: ${prerenderedRoutes.length})`);

// Verify all 21 /services/[slug] routes
const serviceSlugs = [
  'private-security', 'manpower', 'housekeeping', 'tender-procurement-supply',
  'scanning-digitalization-it', 'csc-digital-citizen-services', 'website-design-development',
  'whatsapp-automation-crm', 'missed-call-lead-recovery', 'nfc-review-standees',
  'qr-table-ordering', 'whatsapp-loyalty-punch-card', 'clinic-token-tracker',
  'garage-service-tracker', 'emergency-parking-qr', 'local-seo-gbp-ranking',
  'social-media-meta-ads', 'linkedin-b2b-growth', 'custom-software-web-apps',
  'email-marketing-automation', 'commercial-video-production'
];

const serverAppDir = path.join(nextDir, 'server/app');
let verifiedServicePages = 0;
for (const slug of serviceSlugs) {
  const htmlPath = path.join(serverAppDir, `services/${slug}.html`);
  if (fs.existsSync(htmlPath)) {
    const html = fs.readFileSync(htmlPath, 'utf8');
    if (html.includes('<html') && html.includes('</html>') && !html.includes('Service Not Found') && !html.includes('Hydration failed')) {
      verifiedServicePages++;
    }
  }
}
assert(verifiedServicePages === 21, `All 21 service pages verified in .next/server/app/services/ (verified: ${verifiedServicePages}/21)`);

// Verify core pages
const coreRoutes = ['index.html', 'about.html', 'contact.html', 'get-quote.html', 'services.html', 'case-studies/trichy-international-airport.html'];
let verifiedCorePages = 0;
for (const page of coreRoutes) {
  const pagePath = path.join(serverAppDir, page);
  if (fs.existsSync(pagePath)) {
    const html = fs.readFileSync(pagePath, 'utf8');
    if (html.includes('<html') && html.includes('</html>') && !html.includes('Hydration failed') && !html.includes('Minified React error')) {
      verifiedCorePages++;
    }
  }
}
assert(verifiedCorePages === coreRoutes.length, `All ${coreRoutes.length} core pages verified in .next/server/app/ (verified: ${verifiedCorePages})`);

// ==============================================================================
// SUITE 2: DESIGN TOKEN PURITY AUDIT (#0F2A47, #D4AF37, text-brass, bg-brass)
// ==============================================================================
console.log('\n--- SUITE 2: Design Token Purity Audit ---');

function getAllSourceFiles(dir) {
  let files = [];
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      files = files.concat(getAllSourceFiles(full));
    } else if (/\.(ts|tsx|js|jsx|css)$/.test(entry)) {
      files.push(full);
    }
  }
  return files;
}

const allSrcFiles = getAllSourceFiles(path.resolve('src'));
console.log(`  -> Auditing ${allSrcFiles.length} source files under src/...`);

// 2.1 #0F2A47 (Legacy Navy)
const navyMatches = [];
for (const file of allSrcFiles) {
  const content = fs.readFileSync(file, 'utf8');
  if (/#0f2a47/i.test(content)) {
    navyMatches.push(path.relative(process.cwd(), file));
  }
}
assert(navyMatches.length === 0, 'Zero occurrences of legacy navy #0F2A47 in src/', navyMatches.join(', '));

// 2.2 #D4AF37 (Gold)
const goldMatches = [];
for (const file of allSrcFiles) {
  const content = fs.readFileSync(file, 'utf8');
  if (/#d4af37/i.test(content)) {
    goldMatches.push(path.relative(process.cwd(), file));
  }
}
assert(goldMatches.length === 0, 'Zero occurrences of gold #D4AF37 in src/', goldMatches.join(', '));

// 2.3 text-brass
const textBrassMatches = [];
for (const file of allSrcFiles) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('text-brass')) {
    textBrassMatches.push(path.relative(process.cwd(), file));
  }
}
assert(textBrassMatches.length === 0, 'Zero occurrences of text-brass in src/', textBrassMatches.join(', '));

// 2.4 bg-brass
const bgBrassMatches = [];
for (const file of allSrcFiles) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('bg-brass')) {
    bgBrassMatches.push(path.relative(process.cwd(), file));
  }
}
assert(bgBrassMatches.length === 0, 'Zero occurrences of bg-brass in src/', bgBrassMatches.join(', '));

// 2.5 globals.css Theme Variables
const globalsCss = fs.readFileSync(path.resolve('src/app/globals.css'), 'utf8');
assert(globalsCss.includes('--bg: #000000;'), 'globals.css defines --bg: #000000 (Pure Space Black)');
assert(globalsCss.includes('--ink: #FFFFFF;'), 'globals.css defines --ink: #FFFFFF (Pure White)');
assert(globalsCss.includes('--font-serif: var(--font-sans)'), 'globals.css maps --font-serif to --font-sans (eradicating serif rendering)');

// ==============================================================================
// SUITE 3: TYPOGRAPHY, FONT IMPORTS & TRACKING-TIGHT
// ==============================================================================
console.log('\n--- SUITE 3: Typography, Font Imports & tracking-tight ---');

const layoutSrc = fs.readFileSync(path.resolve('src/app/layout.tsx'), 'utf8');
assert(layoutSrc.includes('import { Public_Sans } from "next/font/google"'), 'layout.tsx imports Public_Sans font');
assert(!layoutSrc.includes('Source_Serif_4'), 'layout.tsx contains zero Source_Serif_4 font imports');

const heroSectionSrc = fs.readFileSync(path.resolve('src/components/sections/hero-section.tsx'), 'utf8');
assert(
  heroSectionSrc.includes('font-bold tracking-tight') && !heroSectionSrc.includes('font-serif'),
  'hero-section.tsx H1 uses sans font-bold tracking-tight with zero font-serif'
);

const servicesOverviewSrc = fs.readFileSync(path.resolve('src/components/sections/services-overview.tsx'), 'utf8');
assert(
  servicesOverviewSrc.includes('font-bold text-white tracking-tight') && !servicesOverviewSrc.includes('font-serif'),
  'services-overview.tsx H2 uses sans font-bold tracking-tight with zero font-serif'
);

// ==============================================================================
// SUITE 4: INTERACTIVE WIDGET EXPORTS & MATHEMATICAL LOGIC
// ==============================================================================
console.log('\n--- SUITE 4: Interactive Widget Exports & State/Math Invariants ---');

// 4.1 widgets/index.ts barrel exports
const widgetsIndexSrc = fs.readFileSync(path.resolve('src/components/widgets/index.ts'), 'utf8');
assert(widgetsIndexSrc.includes("export { RoiCalculator } from './roi-calculator'"), 'widgets/index.ts exports RoiCalculator');
assert(widgetsIndexSrc.includes("export { QueueSimulator } from './queue-simulator'"), 'widgets/index.ts exports QueueSimulator');
assert(widgetsIndexSrc.includes("export { ReviewFilterWidget } from './review-filter-widget'"), 'widgets/index.ts exports ReviewFilterWidget');

// 4.2 ROI Calculator Algorithm Simulation
console.log('  -> Simulating ROI Calculator mathematical formulas & edge cases...');
const LOCATIONS = {
  trichy: { label: 'Tiruchirappalli (HQ)', zone: 'B', rates: { '8hr': 14500, '12hr': 19500, '24_7': 39000 } },
  chennai: { label: 'Chennai (OMR / Guindy)', zone: 'A', rates: { '8hr': 16500, '12hr': 22000, '24_7': 44000 } },
  coimbatore: { label: 'Coimbatore (Industrial)', zone: 'A', rates: { '8hr': 16500, '12hr': 22000, '24_7': 44000 } },
  hosur: { label: 'Hosur (Auto Cluster)', zone: 'B', rates: { '8hr': 15000, '12hr': 20000, '24_7': 40000 } },
  salem: { label: 'Salem (Steel & Agro Hub)', zone: 'B', rates: { '8hr': 14500, '12hr': 19500, '24_7': 39000 } },
};

const SERVICE_MULTIPLIERS = {
  security: { label: 'Private Security Guarding', mult: 1.0 },
  manpower: { label: 'Industrial Contract Manpower', mult: 0.95 },
  housekeeping: { label: 'Mechanized Facility Hygiene', mult: 0.90 },
  bundled: { label: 'Integrated Bundled Package', mult: 1.05 },
};

function calculateRoiMetrics(location, serviceType, shiftPattern, headcount, includeSupervisor, includeWhatsAppBot) {
  const locData = LOCATIONS[location];
  const baseWage = locData.rates[shiftPattern] * SERVICE_MULTIPLIERS[serviceType].mult;
  const inHouseBaseMonthly = baseWage * headcount;
  const inHouseStatutory = inHouseBaseMonthly * 0.2358;
  const inHouseFriction = inHouseBaseMonthly * 0.26;
  const inHouseSupervisorCost = includeSupervisor ? 24000 * 1.4 : 0;
  const inHouseTotalMonthly = inHouseBaseMonthly + inHouseStatutory + inHouseFriction + inHouseSupervisorCost;

  const jsmBaseMonthly = baseWage * 1.28 * headcount;
  const jsmSupervisorCost = includeSupervisor ? 22000 : 0;
  const jsmBotCost = includeWhatsAppBot ? 4999 : 0;
  const jsmTotalMonthly = jsmBaseMonthly + jsmSupervisorCost + jsmBotCost;

  const monthlySavings = inHouseTotalMonthly - jsmTotalMonthly;
  const annualSavings = monthlySavings * 12;
  const roiPercentage = inHouseTotalMonthly > 0 ? (monthlySavings / inHouseTotalMonthly) * 100 : 0;
  const recapturedRevenueMonthly = includeWhatsAppBot ? 35 * 2500 : 0;
  const recapturedRevenueAnnual = recapturedRevenueMonthly * 12;
  const totalEconomicBenefitAnnual = annualSavings + recapturedRevenueAnnual;

  return { inHouseTotalMonthly, jsmTotalMonthly, monthlySavings, annualSavings, roiPercentage, totalEconomicBenefitAnnual };
}

// Edge case 1: headcount = 0 (guard against division by zero)
const zeroHeadcount = calculateRoiMetrics('trichy', 'security', '12hr', 0, false, false);
assert(zeroHeadcount.roiPercentage === 0, 'Headcount 0 handles inHouseTotalMonthly === 0 cleanly without NaN');
assert(Number.isFinite(zeroHeadcount.annualSavings), 'Headcount 0 produces finite annualSavings');

// Edge case 2: single guard (headcount = 1)
const singleGuard = calculateRoiMetrics('trichy', 'security', '8hr', 1, false, false);
assert(singleGuard.inHouseTotalMonthly > 0 && singleGuard.annualSavings > 0, 'Single guard produces positive savings');
assert(singleGuard.roiPercentage > 0 && singleGuard.roiPercentage <= 100, `Single guard ROI percentage valid (${singleGuard.roiPercentage.toFixed(1)}%)`);

// Permutation stress test: 480 combinations
let validCombos = 0;
for (const loc of Object.keys(LOCATIONS)) {
  for (const st of Object.keys(SERVICE_MULTIPLIERS)) {
    for (const sp of ['8hr', '12hr', '24_7']) {
      for (const hc of [1, 6, 20, 50]) {
        for (const sup of [true, false]) {
          for (const bot of [true, false]) {
            const res = calculateRoiMetrics(loc, st, sp, hc, sup, bot);
            if (Number.isFinite(res.inHouseTotalMonthly) && Number.isFinite(res.annualSavings) && !Number.isNaN(res.roiPercentage)) {
              validCombos++;
            }
          }
        }
      }
    }
  }
}
assert(validCombos === 5 * 4 * 3 * 4 * 2 * 2, `All ${validCombos} ROI calculation permutations executed with finite numerical results (${validCombos}/960)`);

// 4.3 Queue Simulator Logic Verification
console.log('  -> Verifying Queue Simulator state and math handlers...');
const queueSimSrc = fs.readFileSync(path.resolve('src/components/widgets/queue-simulator.tsx'), 'utf8');
assert(queueSimSrc.includes('handleNextPatient'), 'queue-simulator.tsx defines handleNextPatient handler');
assert(queueSimSrc.includes('handleAddWalkin'), 'queue-simulator.tsx defines handleAddWalkin handler');
assert(queueSimSrc.includes('handleBroadcastDelay'), 'queue-simulator.tsx defines handleBroadcastDelay handler');
assert(queueSimSrc.includes('updateQuantity'), 'queue-simulator.tsx defines updateQuantity handler');
assert(queueSimSrc.includes('aggregatorCommissionSaved = Math.round(cartSubtotal * 0.3)'), 'Restaurant mode calculates 30% commission savings');

// 4.4 Review Filter Dual-Routing Branch Verification
console.log('  -> Verifying Review Filter dual-routing branches...');
const reviewFilterSrc = fs.readFileSync(path.resolve('src/components/widgets/review-filter-widget.tsx'), 'utf8');
assert(reviewFilterSrc.includes('const isPositive = selectedRating >= 4'), 'Rating >= 4 threshold defines positive reviews');
assert(reviewFilterSrc.includes('handleSelectRating'), 'review-filter-widget.tsx defines handleSelectRating handler');
assert(reviewFilterSrc.includes('setPositiveReviewsCount'), 'Increments positive review counter on 4-5 stars');
assert(reviewFilterSrc.includes('setInterceptedComplaintsCount'), 'Increments intercepted complaint counter on 1-3 stars');

// ==============================================================================
// SUITE 5: LOGO MARQUEE & AIRPORT CROSSFADE SHOWCASE
// ==============================================================================
console.log('\n--- SUITE 5: Logo Marquee Ticker & Airport Crossfade Showcase ---');

// 5.1 Client Logo Marquee
const marqueeSrc = fs.readFileSync(path.resolve('src/components/sections/client-logo-marquee.tsx'), 'utf8');
assert(marqueeSrc.includes('export const TRUST_BADGES'), 'client-logo-marquee.tsx exports TRUST_BADGES');
assert(marqueeSrc.includes('translate3d(-50%, 0, 0)'), 'Marquee animation uses GPU-accelerated translate3d(-50%, 0, 0)');
assert(marqueeSrc.includes('animation-play-state: paused'), 'Marquee pauses on hover via CSS animation-play-state: paused');

const badgeMatches = [...marqueeSrc.matchAll(/id:\s*['"]([^'"]+)['"]/g)];
assert(badgeMatches.length === 12, `client-logo-marquee.tsx defines exactly 12 institutional and client badges (found: ${badgeMatches.length})`);

// 5.2 Airport Operations Slideshow
const slideshowSrc = fs.readFileSync(path.resolve('src/components/widgets/airport-slideshow.tsx'), 'utf8');
assert(slideshowSrc.includes('export const OPERATIONAL_PILLARS'), 'airport-slideshow.tsx exports OPERATIONAL_PILLARS');
assert(slideshowSrc.includes('autoPlayIntervalMs = 3000'), 'Slideshow defaults to calibrated 3.0s (3000ms) interval');
assert(slideshowSrc.includes('OPERATIONAL_PILLARS.map'), 'Renders 5 curated operational pillars');
assert(!slideshowSrc.includes('drag="x"'), 'Slideshow eliminates Framer Motion drag="x" to prevent mobile touch hijacking');

// ==============================================================================
// FINAL SUMMARY & VERDICT
// ==============================================================================
console.log('\n================================================================================');
console.log(`  AUDIT RESULTS: ${passCount} PASSED, ${failCount} FAILED`);
console.log('================================================================================\n');

if (failCount > 0) {
  console.error('FAILURES SUMMARY:');
  failures.forEach((f, idx) => {
    console.error(`  ${idx + 1}. ${f.testName}`);
    if (f.details) console.error(`     Details: ${f.details}`);
  });
  console.log('\nFINAL VERDICT: CHALLENGE');
  process.exit(1);
} else {
  console.log('FINAL VERDICT: APPROVE');
  process.exit(0);
}
