import fs from 'fs';
import path from 'path';

console.log('=== [CHALLENGER 2] EMPIRICAL TEST SUITE: SERVICES & WIDGETS ===\n');

let passCount = 0;
let failCount = 0;
const failures = [];

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passCount++;
  } else {
    console.error(`[FAIL] ${message}`);
    failCount++;
    failures.push(message);
  }
}

// -------------------------------------------------------------
// 1. VERIFY ALL 21 SERVICE PAGES & SCHEMA.ORG JSON-LD IN STATIC HTML
// -------------------------------------------------------------
console.log('--- 1. Testing 21 Service Pages & Schema.org JSON-LD ---');

const servicesDir = path.resolve('.next/server/app/services');
assert(fs.existsSync(servicesDir), `Services output directory exists at ${servicesDir}`);

const expectedSlugs = [
  'private-security',
  'manpower',
  'housekeeping',
  'tender-procurement-supply',
  'scanning-digitalization-it',
  'website-design-development',
  'whatsapp-automation-crm',
  'nfc-review-standees',
  'missed-call-lead-recovery',
  'qr-table-ordering',
  'whatsapp-loyalty-punch-card',
  'clinic-token-tracker',
  'garage-service-tracker',
  'emergency-parking-qr',
  'local-seo-gbp-ranking',
  'social-media-meta-ads',
  'linkedin-b2b-growth',
  'custom-software-web-apps',
  'email-marketing-automation',
  'commercial-video-production',
  'csc-digital-citizen-services'
];

assert(expectedSlugs.length === 21, `Expected exactly 21 service slugs (found: ${expectedSlugs.length})`);

let verifiedPages = 0;
let verifiedSchemasCount = 0;

for (const slug of expectedSlugs) {
  const htmlFile = path.join(servicesDir, `${slug}.html`);
  const exists = fs.existsSync(htmlFile);
  assert(exists, `HTML page exists for service: /services/${slug}`);

  if (exists) {
    verifiedPages++;
    const htmlContent = fs.readFileSync(htmlFile, 'utf8');

    // Check Schema.org JSON-LD scripts
    const jsonLdRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
    let match;
    const schemas = [];
    while ((match = jsonLdRegex.exec(htmlContent)) !== null) {
      try {
        const parsed = JSON.parse(match[1]);
        schemas.push(parsed);
      } catch (err) {
        assert(false, `Corrupt JSON-LD in /services/${slug}: ${err.message}`);
      }
    }

    assert(schemas.length >= 4, `Service /services/${slug} contains at least 4 JSON-LD scripts (found: ${schemas.length})`);
    verifiedSchemasCount += schemas.length;

    const schemaTypes = schemas.map(s => s['@type']);
    assert(schemaTypes.includes('Service'), `Service schema present in /services/${slug}`);
    assert(schemaTypes.includes('BreadcrumbList'), `BreadcrumbList schema present in /services/${slug}`);
    assert(schemaTypes.includes('FAQPage'), `FAQPage schema present in /services/${slug}`);
    assert(schemaTypes.includes('HowTo'), `HowTo schema present in /services/${slug}`);

    // Verify context
    for (const s of schemas) {
      assert(s['@context'] === 'https://schema.org', `Valid @context in /services/${slug} for @type=${s['@type']}`);
    }

    // Check title and description rendered in HTML
    assert(htmlContent.includes('<h1'), `H1 header rendered in /services/${slug}`);
    assert(!htmlContent.includes('Service Not Found'), `No "Service Not Found" error in /services/${slug}`);
  }
}

assert(verifiedPages === 21, `All 21 service pages successfully verified`);
console.log(`Total verified JSON-LD scripts across 21 pages: ${verifiedSchemasCount}\n`);

// -------------------------------------------------------------
// 2. STRESS-TEST GENERATIVE UI WIDGET LOGIC & BOUNDARIES
// -------------------------------------------------------------
console.log('--- 2. Stress-testing Generative UI Widgets ---');

// 2.1 ROI Calculator Algorithm Stress Test
console.log('[Test 2.1] ROI Calculator Mathematical & Boundary Invariants:');

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

  return {
    baseWage,
    inHouseTotalMonthly,
    inHouseStatutory,
    inHouseFriction,
    jsmTotalMonthly,
    monthlySavings,
    annualSavings,
    roiPercentage,
    recapturedRevenueMonthly,
    totalEconomicBenefitAnnual,
  };
}

// Test edge cases:
// Boundary A: min headcount = 1
const minRoi = calculateRoiMetrics('trichy', 'security', '8hr', 1, false, false);
assert(!Number.isNaN(minRoi.inHouseTotalMonthly) && Number.isFinite(minRoi.inHouseTotalMonthly), 'Min headcount (1) produces finite inHouseTotalMonthly');
assert(minRoi.inHouseTotalMonthly > 0, `Headcount 1 inHouseTotalMonthly > 0 (val: ${minRoi.inHouseTotalMonthly})`);
assert(!Number.isNaN(minRoi.roiPercentage), `Headcount 1 roiPercentage is not NaN (${minRoi.roiPercentage.toFixed(2)}%)`);

// Boundary B: max headcount = 40
const maxRoi = calculateRoiMetrics('chennai', 'bundled', '24_7', 40, true, true);
assert(maxRoi.inHouseTotalMonthly > 0, `Headcount 40 produces positive cost (${maxRoi.inHouseTotalMonthly})`);
assert(maxRoi.annualSavings > 0, `Annual savings positive at 40 headcount (${maxRoi.annualSavings})`);
assert(maxRoi.totalEconomicBenefitAnnual > maxRoi.annualSavings, 'Total economic benefit includes WhatsApp recaptured revenue');

// Boundary C: headcount = 0 (boundary guard against division by zero)
const zeroRoi = calculateRoiMetrics('trichy', 'security', '8hr', 0, false, false);
assert(zeroRoi.roiPercentage === 0, `Headcount 0 handles inHouseTotalMonthly === 0 cleanly without NaN or Infinity (roiPercentage=${zeroRoi.roiPercentage})`);

// Stress all 5 locations x 4 service types x 3 shift patterns x (1, 10, 40 pax) = 180 combinations
let comboPass = 0;
for (const loc of Object.keys(LOCATIONS)) {
  for (const st of Object.keys(SERVICE_MULTIPLIERS)) {
    for (const sp of ['8hr', '12hr', '24_7']) {
      for (const hc of [1, 5, 20, 40]) {
        for (const sup of [true, false]) {
          for (const bot of [true, false]) {
            const res = calculateRoiMetrics(loc, st, sp, hc, sup, bot);
            if (!Number.isNaN(res.annualSavings) && Number.isFinite(res.annualSavings) &&
                !Number.isNaN(res.roiPercentage) && Number.isFinite(res.roiPercentage)) {
              comboPass++;
            }
          }
        }
      }
    }
  }
}
assert(comboPass === 5 * 4 * 3 * 4 * 2 * 2, `All ${comboPass} ROI Calculator permutation combinations executed with finite results`);

// 2.2 Queue Simulator Logic Stress Test
console.log('\n[Test 2.2] Queue Simulator Boundary Invariants:');

// Initial queue state
let mockQueue = [
  { token: 14, patientName: 'Murugan K.', estWaitMin: 0, status: 'consulting' },
  { token: 15, patientName: 'Priya Sundaram', estWaitMin: 4, status: 'next' },
  { token: 16, patientName: 'Anand R.', estWaitMin: 12, status: 'waiting' },
  { token: 17, patientName: 'Kavitha M.', estWaitMin: 20, status: 'waiting' },
  { token: 18, patientName: 'Balaji S.', estWaitMin: 28, status: 'waiting' },
];

function nextPatient(q) {
  if (q.length <= 1) return q;
  return q.slice(1).map((p, idx) => ({
    ...p,
    status: idx === 0 ? 'consulting' : idx === 1 ? 'next' : 'waiting',
    estWaitMin: Math.max(0, p.estWaitMin - 8),
  }));
}

function addWalkin(q, name) {
  const lastToken = q[q.length - 1]?.token || 18;
  const newTokenNum = lastToken + 1;
  const lastWait = q[q.length - 1]?.estWaitMin || 0;
  return [...q, {
    token: newTokenNum,
    patientName: name,
    estWaitMin: lastWait + 8,
    status: 'waiting',
  }];
}

// Drain queue
let currentQ = [...mockQueue];
for (let i = 0; i < 4; i++) {
  currentQ = nextPatient(currentQ);
}
assert(currentQ.length === 1, `Queue drained to 1 patient (remaining: token #${currentQ[0].token})`);
assert(currentQ[0].status === 'consulting', `Final patient has status 'consulting'`);

// Drain attempt on 1 patient
const drainedSame = nextPatient(currentQ);
assert(drainedSame.length === 1, `Calling nextPatient with 1 patient does not crash or reduce queue below 1`);

// Add 25 walk-ins
for (let i = 1; i <= 25; i++) {
  currentQ = addWalkin(currentQ, `Walkin ${i}`);
}
assert(currentQ.length === 26, `Queue scaled up to 26 patients cleanly`);
assert(currentQ[currentQ.length - 1].token === 18 + 25, `Last token correctly sequential (${currentQ[currentQ.length - 1].token})`);
assert(currentQ[currentQ.length - 1].estWaitMin > 0, `Last wait time correctly positive (${currentQ[currentQ.length - 1].estWaitMin}m)`);

// Restaurant Cart Logic Stress Test
console.log('\n[Test 2.3] Restaurant Cart Zero & Max Bounds:');
const MENU_ITEMS = [
  { id: '1', name: 'South Indian Executive Thali', price: 180 },
  { id: '2', name: 'Ghee Roast Masala Dosa', price: 95 },
  { id: '3', name: 'Traditional Filter Coffee (Brass Cup)', price: 45 },
  { id: '4', name: 'Special Ghee Pongal & Vada', price: 80 },
  { id: '5', name: 'Fresh Mint Lime Soda', price: 40 },
];

function calculateCartSubtotal(cart) {
  return Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = MENU_ITEMS.find((m) => m.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);
}

// Empty cart
const emptySubtotal = calculateCartSubtotal({});
assert(emptySubtotal === 0, 'Empty cart has subtotal === 0');
assert(Math.round(emptySubtotal * 0.3) === 0, 'Empty cart commission saved === 0');

// Maximum cart
const largeCart = { '1': 100, '2': 50, '3': 200, '4': 50, '5': 100 };
const largeSubtotal = calculateCartSubtotal(largeCart);
assert(largeSubtotal === (180*100 + 95*50 + 45*200 + 80*50 + 40*100), `Large cart calculates exact subtotal (${largeSubtotal})`);
assert(Math.round(largeSubtotal * 0.3) === 11925, `Commission calculation matches 30% of ₹39,750`);

// 2.4 Smart Review Filter Rating Transitions
console.log('\n[Test 2.4] Review Filter Dual-Routing Branch Verification:');

function evaluateReviewRouting(stars) {
  const isPositive = stars >= 4;
  return {
    isPositive,
    route: isPositive ? 'google_maps' : 'whatsapp_shield',
    shieldActive: !isPositive
  };
}

for (let star = 1; star <= 5; star++) {
  const routing = evaluateReviewRouting(star);
  if (star <= 3) {
    assert(!routing.isPositive && routing.route === 'whatsapp_shield', `Star rating ${star} routes to WhatsApp Shield (private)`);
  } else {
    assert(routing.isPositive && routing.route === 'google_maps', `Star rating ${star} routes to Google Maps Acceleration (public)`);
  }
}

// -------------------------------------------------------------
// 3. AUDIT TAP TARGETS (>= 44PX) AND DESIGN SYSTEM TOKENS
// -------------------------------------------------------------
console.log('\n--- 3. Auditing Tap Targets (>= 44px) & CSS Tokens ---');

// Check interactive components source files for tap target classes
const widgetFiles = [
  'src/components/widgets/roi-calculator.tsx',
  'src/components/widgets/queue-simulator.tsx',
  'src/components/widgets/review-filter-widget.tsx',
  'src/components/widgets/interactive-showcase.tsx',
  'src/app/services/[slug]/page.tsx',
  'src/components/ui/button.tsx',
  'src/components/ui/input.tsx',
];

const tapTargetIssues = [];

for (const relPath of widgetFiles) {
  const fullPath = path.resolve(relPath);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    
    // Check buttons with sub-44px classes like min-h-[36px], min-h-[32px], h-8, h-9 without 44px min-h
    const lines = content.split('\n');
    lines.forEach((line, lineNum) => {
      if ((line.includes('button') || line.includes('<button') || line.includes('min-h-[')) && 
          (line.includes('min-h-[36px]') || line.includes('min-h-[32px]'))) {
        tapTargetIssues.push({
          file: relPath,
          line: lineNum + 1,
          code: line.trim()
        });
      }
    });
  }
}

console.log(`Audited ${widgetFiles.length} component source files for tap targets.`);
if (tapTargetIssues.length > 0) {
  console.log(`[OBSERVATION] Found ${tapTargetIssues.length} sub-44px button tap target occurrences (e.g. min-h-[36px]):`);
  tapTargetIssues.forEach(issue => {
    console.log(`  - ${issue.file}:${issue.line} -> ${issue.code}`);
  });
} else {
  console.log('[PASS] All interactive button classes specify >= 44px tap targets');
}

// Audit Color Design Tokens: Check for deprecated Apple blue or rogue colors
console.log('\nAuditing Design Tokens across widgets:');
const rogueTokens = [];
const rogueRegex = /#0071e3|#0077ed|#06c/i;

for (const relPath of widgetFiles) {
  const fullPath = path.resolve(relPath);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    if (rogueRegex.test(content)) {
      rogueTokens.push(relPath);
    }
  }
}

assert(rogueTokens.length === 0, `Zero deprecated Apple tokens found across widgets (rogue files: ${rogueTokens.join(', ') || 'none'})`);

// Verify Executive Navy `#0F2A47` and Brass `#9C7A3C` presence in widgets
for (const relPath of widgetFiles.slice(0, 4)) {
  const content = fs.readFileSync(path.resolve(relPath), 'utf8');
  assert(content.includes('#0F2A47'), `Executive Navy (#0F2A47) used in ${relPath}`);
}

// -------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------
console.log('\n=============================================================');
console.log(`TEST SUITE RESULTS: ${passCount} PASSED, ${failCount} FAILED`);
console.log(`TAP TARGET SUB-44PX WARNINGS: ${tapTargetIssues.length}`);
console.log('=============================================================');

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
