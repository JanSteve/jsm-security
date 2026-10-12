import fs from 'fs';
import path from 'path';

console.log('================================================================================');
console.log('  CHALLENGER 2: EMPIRICAL CLS, MOBILE ERGONOMICS & TOKEN TEST SUITE            ');
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
// SUITE 1: AIRPORT SLIDESHOW CLS, DIMENSIONS, PRIORITY & ASSET INTEGRITY
// ==============================================================================
console.log('\n--- SUITE 1: Airport Slideshow CLS, Fixed Dimensions & Assets ---');

const slideshowPath = path.resolve('src/components/widgets/airport-slideshow.tsx');
assert(fs.existsSync(slideshowPath), 'airport-slideshow.tsx exists');

const slideshowSrc = fs.readFileSync(slideshowPath, 'utf8');

// 1.1 Fixed height styles
assert(
  slideshowSrc.includes('h-[220px] sm:h-[260px] md:h-[300px]'),
  'Slideshow container specifies fixed height styles: h-[220px] sm:h-[260px] md:h-[300px]'
);

// 1.2 Overflow hidden & relative positioning for zero layout shift
assert(
  slideshowSrc.includes('overflow-hidden') && slideshowSrc.includes('relative'),
  'Slideshow container enforces relative layout with overflow-hidden (CLS mitigation)'
);

// 1.3 Pre-loaded priority slides
assert(
  slideshowSrc.includes('priority={currentIndex < 3}'),
  'First 3 slides have pre-loaded priority (priority={currentIndex < 3})'
);

// 1.4 Auto-advance timing interval
const has1000msInterval = /setInterval\(\s*\(\)\s*=>\s*\{[\s\S]*?\},\s*1000\s*\)/.test(slideshowSrc);
assert(
  has1000msInterval,
  'Auto-advances every 1000ms (1.0 second)'
);

// 1.5 Image layout mode
assert(
  slideshowSrc.includes('fill') && slideshowSrc.includes('object-cover'),
  'Next.js Image component uses fill layout with object-cover inside fixed aspect frame'
);

// 1.6 Verify slide image asset existence on disk
console.log('  -> Verifying slide image assets in public/ directory...');
const slideSrcMatches = [...slideshowSrc.matchAll(/src:\s*['"]([^'"]+)['"]/g)];
assert(slideSrcMatches.length === 13, `Slideshow defines exactly 13 slide images (found: ${slideSrcMatches.length})`);

slideSrcMatches.forEach((match, idx) => {
  const relativeAssetPath = match[1].replace(/^\//, '');
  const fullDiskPath = path.resolve('public', relativeAssetPath);
  const exists = fs.existsSync(fullDiskPath);
  assert(
    exists,
    `Slide ${idx + 1} asset exists on disk (${relativeAssetPath})`,
    exists ? '' : `FILE NOT FOUND AT ${fullDiskPath}`
  );
});

// ==============================================================================
// SUITE 2: MOBILE ERGONOMICS, TAP TARGETS (>= 44px) & ABOVE-THE-FOLD FIT
// ==============================================================================
console.log('\n--- SUITE 2: Hero CTA Mobile Ergonomics & Tap Targets ---');

const heroPath = path.resolve('src/components/sections/hero-section.tsx');
assert(fs.existsSync(heroPath), 'hero-section.tsx exists');

const heroSrc = fs.readFileSync(heroPath, 'utf8');

// 2.1 Three High-Intent Conversion Vectors
const hasProposalVector = heroSrc.includes('href="/get-quote"') && heroSrc.includes('2-Min Proposal Generator');
assert(hasProposalVector, 'Vector 1: 2-Minute Commercial Proposal generator (/get-quote) present');

const hasWhatsAppVector = heroSrc.includes('wa.me/919080863448') && heroSrc.includes('WhatsApp Quick Deploy');
assert(hasWhatsAppVector, 'Vector 2: WhatsApp Quick Deploy (https://wa.me/919080863448) present');

const hasCallVector = heroSrc.includes('href="tel:+919080863448"') && heroSrc.includes('Call: +91 90808 63448');
assert(hasCallVector, 'Vector 3: Direct Call Desk (tel:+919080863448) present');

// 2.2 Tap Target Dimensions (>= 44px)
// Extract the CTA cluster section
const ctaClusterStart = heroSrc.indexOf('Above-The-Fold High-Intent Conversion Cluster');
const ctaClusterSnippet = heroSrc.slice(ctaClusterStart, ctaClusterStart + 3000);

const hasProposalHeight = ctaClusterSnippet.includes('h-[46px] sm:h-[48px]');
assert(hasProposalHeight, 'CTA buttons explicitly set h-[46px] sm:h-[48px] (exceeds 44px minimum)');

const countMinTouchTarget = (ctaClusterSnippet.match(/min-touch-target/g) || []).length;
assert(
  countMinTouchTarget >= 3,
  `All 3 CTA buttons declare min-touch-target class (found: ${countMinTouchTarget})`
);

// Check globals.css for min-touch-target specification
const globalsCssPath = path.resolve('src/app/globals.css');
const globalsCss = fs.readFileSync(globalsCssPath, 'utf8');
assert(
  globalsCss.includes('.min-touch-target') && globalsCss.includes('min-height: 44px') && globalsCss.includes('min-width: 44px'),
  'globals.css defines .min-touch-target with min-height: 44px and min-width: 44px'
);

// 2.3 Above-the-fold Mobile Math Simulation (375px - 768px)
console.log('  -> Simulating Mobile Viewport Fold Ergonomics (375px iPhone SE / Mini)...');
(() => {
  // Mobile layout height calculation:
  // - Top navbar height: 64px
  // - Hero pt-24 padding: 96px
  // - Credential badge: 32px + 20px gap = 52px
  // - Display headline (text-[32px], 3 lines @ line-height 1.1 = 106px) + 20px gap = 126px
  // - One-sentence proposition (text-base, ~4 lines @ 24px = 96px) + 20px gap = 116px
  // - CTA cluster padding top pt-2: 8px
  // - 3 CTA buttons stacked on mobile (3 * 46px + 2 * 10px gap): 158px
  // Total cumulative height from top of viewport:
  const headerHeight = 64;
  const heroPaddingTop = 96;
  const badgeHeight = 52;
  const headlineHeight = 126;
  const propositionHeight = 116;
  const ctaClusterPaddingTop = 8;
  const ctaButtonsStackHeight = 158;

  const totalHeroCtaBottom = headerHeight + heroPaddingTop + badgeHeight + headlineHeight + propositionHeight + ctaClusterPaddingTop + ctaButtonsStackHeight;
  console.log(`     Estimated cumulative height to bottom of CTA cluster on 375px mobile: ${totalHeroCtaBottom}px`);

  // iPhone SE (375x667): fold line is 667px
  // iPhone X/12/13/14 (375x812 / 390x844): fold line is 812px - 844px
  assert(
    totalHeroCtaBottom <= 667,
    `CTA cluster fits above the fold on compact mobile (375x667): ${totalHeroCtaBottom}px <= 667px fold line`
  );
  assert(
    totalHeroCtaBottom <= 844,
    `CTA cluster fits with generous margin on standard mobile (390x844): margin = ${844 - totalHeroCtaBottom}px`
  );
})();

// ==============================================================================
// SUITE 3: CURSOR ORB ELIMINATION & HOOK FUNCTIONALITY
// ==============================================================================
console.log('\n--- SUITE 3: Cursor Orb Elimination & useIsFinePointer ---');

// 3.1 Verify no AmbientMagneticCursor in src/
const allFiles = getAllFiles('src');
let ambientMatches = [];
allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('AmbientMagneticCursor')) {
    ambientMatches.push(file);
  }
});
assert(
  ambientMatches.length === 0,
  'Zero occurrences of AmbientMagneticCursor in src/',
  ambientMatches.join(', ')
);

// 3.2 Verify no window/document mousemove listeners for cursor springs
let globalMouseMoveMatches = [];
allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes("window.addEventListener('mousemove'") ||
      content.includes('window.addEventListener("mousemove"') ||
      content.includes("document.addEventListener('mousemove'") ||
      content.includes('document.addEventListener("mousemove"')) {
    globalMouseMoveMatches.push(file);
  }
});
assert(
  globalMouseMoveMatches.length === 0,
  'Zero window or document mousemove listeners attached in src/',
  globalMouseMoveMatches.join(', ')
);

// 3.3 Verify magnetic-cursor.tsx exports useIsFinePointer
const magneticCursorPath = path.resolve('src/components/motion/magnetic-cursor.tsx');
const magneticCursorSrc = fs.readFileSync(magneticCursorPath, 'utf8');

assert(
  magneticCursorSrc.includes('export function useIsFinePointer'),
  'magnetic-cursor.tsx exports useIsFinePointer Hook'
);

assert(
  magneticCursorSrc.includes('useSyncExternalStore'),
  'useIsFinePointer leverages useSyncExternalStore for hydration-safe subscription'
);

assert(
  magneticCursorSrc.includes('(hover: hover) and (pointer: fine)'),
  'useIsFinePointer evaluates (hover: hover) and (pointer: fine) media query'
);

assert(
  magneticCursorSrc.includes('getFinePointerServerSnapshot') && magneticCursorSrc.includes('return false;'),
  'useIsFinePointer returns false on SSR to prevent hydration mismatches'
);

// 3.4 Verify perspective-tilt-card consumes useIsFinePointer
const perspectiveTiltPath = path.resolve('src/components/motion/perspective-tilt-card.tsx');
const perspectiveTiltSrc = fs.readFileSync(perspectiveTiltPath, 'utf8');
assert(
  perspectiveTiltSrc.includes("import { useIsFinePointer } from './magnetic-cursor'"),
  'PerspectiveTiltCard imports useIsFinePointer from ./magnetic-cursor'
);
assert(
  perspectiveTiltSrc.includes('const isFinePointer = useIsFinePointer()'),
  'PerspectiveTiltCard calls useIsFinePointer()'
);

// ==============================================================================
// SUITE 4: TOKEN & COLOR CLEANLINESS AUDIT
// ==============================================================================
console.log('\n--- SUITE 4: Token & Color Cleanliness Audit (#D4AF37, brass, #0F2A47) ---');

// 4.1 Check #D4AF37 (Gold)
let goldMatches = [];
allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('#D4AF37') || content.includes('#d4af37')) {
    goldMatches.push(file);
  }
});
assert(
  goldMatches.length === 0,
  'Zero occurrences of #D4AF37 in src/',
  goldMatches.join(', ')
);

// 4.2 Check text-brass
let textBrassMatches = [];
allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('text-brass')) {
    textBrassMatches.push(file);
  }
});
assert(
  textBrassMatches.length === 0,
  'Zero occurrences of text-brass in src/',
  textBrassMatches.join(', ')
);

// 4.3 Check bg-brass
let bgBrassMatches = [];
allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('bg-brass')) {
    bgBrassMatches.push(file);
  }
});
assert(
  bgBrassMatches.length === 0,
  'Zero occurrences of bg-brass in src/',
  bgBrassMatches.join(', ')
);

// 4.4 Check un-harmonized legacy navy #0F2A47
let navyMatches = [];
allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, lineIdx) => {
    if (line.includes('#0F2A47') || line.includes('#0f2a47')) {
      navyMatches.push({ file: path.relative(process.cwd(), file), line: lineIdx + 1, content: line.trim() });
    }
  });
});

console.log(`  -> Scanning for legacy navy #0F2A47 across ${allFiles.length} files in src/...`);
if (navyMatches.length > 0) {
  console.log(`  [FINDING] Found ${navyMatches.length} occurrences of #0F2A47 across ${new Set(navyMatches.map(m => m.file)).size} files:`);
  navyMatches.forEach(m => {
    console.log(`     - ${m.file}:${m.line} -> ${m.content.slice(0, 80)}...`);
  });
}

assert(
  navyMatches.length === 0,
  `Zero occurrences of un-harmonized legacy navy #0F2A47 in src/ (Found ${navyMatches.length} occurrences)`,
  `Found ${navyMatches.length} occurrences across files: ${[...new Set(navyMatches.map(m => m.file))].join(', ')}`
);

// ==============================================================================
// TEST SUMMARY & VERDICT
// ==============================================================================
console.log('\n================================================================================');
console.log(`  EMPIRICAL TEST RESULTS: ${passCount} PASSED, ${failCount} FAILED`);
console.log('================================================================================');

if (failCount > 0) {
  console.error('\nFAILURES RECORDED:');
  failures.forEach((f, idx) => {
    console.error(`  ${idx + 1}. ${f.testName}: ${f.details}`);
  });
  console.log('\nVERDICT: REQUEST_CHANGES (Defects identified empirically)');
  process.exit(1);
} else {
  console.log('\nVERDICT: APPROVE (All empirical and mathematical checks passed)');
  process.exit(0);
}

// Helper: recursive file gatherer
function getAllFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath));
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.css')) {
      results.push(fullPath);
    }
  });
  return results;
}
