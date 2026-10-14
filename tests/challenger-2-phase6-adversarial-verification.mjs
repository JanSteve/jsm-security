import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    failedTests++;
    console.error(`  ✗ FAIL: ${testName} - ${details}`);
    failures.push({ testName, details });
  }
}

console.log('================================================================');
console.log('CHALLENGER 2: EMPIRICAL ADVERSARIAL VERIFICATION SUITE');
console.log('Project Root:', projectRoot);
console.log('================================================================\n');

// -----------------------------------------------------------------------------
// TEST SUITE 1: Airport Operations Slideshow (airport-slideshow.tsx)
// -----------------------------------------------------------------------------
console.log('[TEST SUITE 1] Inspecting src/components/widgets/airport-slideshow.tsx');
const slideshowPath = path.join(projectRoot, 'src/components/widgets/airport-slideshow.tsx');
assert(fs.existsSync(slideshowPath), 'Slideshow file exists', slideshowPath);

const slideshowCode = fs.readFileSync(slideshowPath, 'utf8');

// 1.1 Complete absence of drag listeners and drag attributes
const dragKeywords = [
  'drag="x"',
  'dragConstraints',
  'dragElastic',
  'onDragStart',
  'onDragEnd',
  'cursor-grab',
  'active:cursor-grabbing',
];
let foundDrag = [];
for (const kw of dragKeywords) {
  if (slideshowCode.includes(kw)) {
    foundDrag.push(kw);
  }
}
assert(
  foundDrag.length === 0,
  'Complete absence of drag attributes & grab cursor',
  `Found drag remnants: ${foundDrag.join(', ')}`
);

// 1.2 Confirm 5 operational pillars
const pillarRegex = /export const OPERATIONAL_PILLARS: OperationalPillar\[\] = \[([\s\S]*?)\];/;
const pillarMatch = slideshowCode.match(pillarRegex);
assert(pillarMatch !== null, 'OPERATIONAL_PILLARS array is exported');

let pillarCount = 0;
const pillarIds = [];
const imageSrcs = [];
if (pillarMatch) {
  const idMatches = [...pillarMatch[1].matchAll(/id:\s*['"]([^'"]+)['"]/g)];
  pillarCount = idMatches.length;
  idMatches.forEach(m => pillarIds.push(m[1]));
  
  const srcMatches = [...pillarMatch[1].matchAll(/src:\s*['"]([^'"]+)['"]/g)];
  srcMatches.forEach(m => imageSrcs.push(m[1]));
}
assert(pillarCount === 5, 'Exact 5 operational pillars configured', `Found ${pillarCount} pillars: ${pillarIds.join(', ')}`);

// Verify all image assets exist in public/
for (const imgSrc of imageSrcs) {
  const diskPath = path.join(projectRoot, 'public', imgSrc.replace(/^\//, ''));
  assert(fs.existsSync(diskPath), `Pillar image asset exists: ${imgSrc}`, `Not found at ${diskPath}`);
}

// 1.3 Confirm 5 segmented progress pills navigation
assert(
  slideshowCode.includes('grid-cols-5'),
  'Progress pills navigation uses 5-column grid (grid-cols-5)'
);
assert(
  slideshowCode.includes('OPERATIONAL_PILLARS.map'),
  'Progress pills mapped over OPERATIONAL_PILLARS'
);
assert(
  slideshowCode.includes('min-h-[48px]'),
  'Progress pills enforce >= 44px tap target (min-h-[48px])'
);
assert(
  slideshowCode.includes('onClick={() => goToSlide(idx)}'),
  'Pills have instant tap switching handler (goToSlide)'
);

// 1.4 Confirm 3.0s auto-crossfade & timing
assert(
  slideshowCode.includes('autoPlayIntervalMs = 3000'),
  'Default autoPlayIntervalMs is calibrated to 3000ms (3.0s)'
);
assert(
  slideshowCode.includes('duration: isPaused ? 0 : 3.0'),
  'Active progress pill animation duration is 3.0s'
);
assert(
  slideshowCode.includes('AnimatePresence'),
  'Crossfade uses AnimatePresence for smooth transitions'
);
assert(
  slideshowCode.includes('initial={{ opacity: 0, scale: 1.02 }}'),
  'Crossfade transition includes opacity dissolve and subtle 1.02 scale'
);

// 1.5 Pause on hover and touch
assert(
  slideshowCode.includes('onMouseEnter={() => setIsPaused(true)}'),
  'Slideshow pauses auto-advance on mouse hover'
);
assert(
  slideshowCode.includes('onMouseLeave={() => setIsPaused(false)}'),
  'Slideshow resumes auto-advance on mouse leave'
);

// -----------------------------------------------------------------------------
// TEST SUITE 2: Client Logo Marquee (client-logo-marquee.tsx)
// -----------------------------------------------------------------------------
console.log('\n[TEST SUITE 2] Inspecting src/components/sections/client-logo-marquee.tsx');
const marqueePath = path.join(projectRoot, 'src/components/sections/client-logo-marquee.tsx');
assert(fs.existsSync(marqueePath), 'ClientLogoMarquee file exists', marqueePath);

const marqueeCode = fs.readFileSync(marqueePath, 'utf8');

// 2.1 Confirm 12 badges in TRUST_BADGES
const badgeRegex = /export const TRUST_BADGES: TrustBadgeItem\[\] = \[([\s\S]*?)\];/;
const badgeMatch = marqueeCode.match(badgeRegex);
assert(badgeMatch !== null, 'TRUST_BADGES array is exported');

let badgeCount = 0;
const badgeIds = [];
const badgeLogos = [];
if (badgeMatch) {
  const bMatches = [...badgeMatch[1].matchAll(/id:\s*['"]([^'"]+)['"]/g)];
  badgeCount = bMatches.length;
  bMatches.forEach(m => badgeIds.push(m[1]));
  
  const logoMatches = [...badgeMatch[1].matchAll(/logoSrc:\s*['"]([^'"]+)['"]/g)];
  logoMatches.forEach(m => badgeLogos.push(m[1]));
}
assert(badgeCount === 12, 'Exact 12 badges in TRUST_BADGES', `Found ${badgeCount} badges: ${badgeIds.join(', ')}`);

// Verify any referenced logos exist
for (const logo of badgeLogos) {
  const diskPath = path.join(projectRoot, 'public', logo.replace(/^\//, ''));
  assert(fs.existsSync(diskPath), `Badge logo asset exists: ${logo}`, `Not found at ${diskPath}`);
}

// 2.2 Continuous CSS keyframe animation
assert(
  marqueeCode.includes('@keyframes jsm-marquee-scroll'),
  'Declares custom @keyframes jsm-marquee-scroll'
);
assert(
  marqueeCode.includes('translate3d(-50%, 0, 0)'),
  'Keyframes wrap seamlessly at -50% for duplicated array infinite scrolling'
);
assert(
  marqueeCode.includes('[...TRUST_BADGES, ...TRUST_BADGES]'),
  'Array is duplicated for seamless continuous wrapping'
);
assert(
  marqueeCode.includes('will-change: transform'),
  'Uses GPU compositor hint will-change: transform'
);

// 2.3 Bilateral gradient masks
assert(
  marqueeCode.includes('bg-gradient-to-r from-black via-black/80 to-transparent'),
  'Left bilateral feathering mask present'
);
assert(
  marqueeCode.includes('bg-gradient-to-l from-black via-black/80 to-transparent'),
  'Right bilateral feathering mask present'
);

// 2.4 Pause on hover and touch ergonomics
assert(
  marqueeCode.includes('animation-play-state: paused'),
  'CSS rule pauses animation on hover'
);
assert(
  marqueeCode.includes('onTouchStart={() => setIsInteracting(true)}'),
  'Touch start interaction pauses marquee for mobile ergonomics'
);
assert(
  marqueeCode.includes('prefers-reduced-motion'),
  'Accessibility fallback for prefers-reduced-motion present'
);

// 2.5 Integration check in TrustBar & Page
const trustBarPath = path.join(projectRoot, 'src/components/sections/trust-bar.tsx');
const trustBarCode = fs.readFileSync(trustBarPath, 'utf8');
assert(
  trustBarCode.includes('ClientLogoMarquee'),
  'ClientLogoMarquee is mounted inside trust-bar.tsx'
);

const pagePath = path.join(projectRoot, 'src/app/page.tsx');
const pageCode = fs.readFileSync(pagePath, 'utf8');
assert(
  pageCode.includes('<TrustBar />') && pageCode.includes('<AirportOperationsSlideshow />'),
  'Homepage mounts both TrustBar (with Marquee) and AirportOperationsSlideshow'
);

// -----------------------------------------------------------------------------
// TEST SUITE 3: Copy Length Reduction & Touch Target Verification
// -----------------------------------------------------------------------------
console.log('\n[TEST SUITE 3] Copy Length Reduction & Touch Targets Verification');

// 3.1 HeroSection Copy & Touch Targets
const heroPath = path.join(projectRoot, 'src/components/sections/hero-section.tsx');
assert(fs.existsSync(heroPath), 'HeroSection file exists', heroPath);
const heroCode = fs.readFileSync(heroPath, 'utf8');

// Subheadline check
const heroParagraphRegex = /<motion\.p[\s\S]*?>([\s\S]*?)<\/motion\.p>/;
const heroP = heroCode.match(heroParagraphRegex);
assert(heroP !== null, 'Hero subheadline paragraph located');
if (heroP) {
  const pText = heroP[1].trim().replace(/\s+/g, ' ');
  const wordCount = pText.split(' ').length;
  const sentenceCount = (pText.match(/[.!?](\s|$)/g) || []).length;
  console.log(`    Hero Subheadline (${wordCount} words, ${sentenceCount} sentence(s)): "${pText}"`);
  assert(sentenceCount === 1, 'Hero subheadline is exactly 1 sentence', `Found ${sentenceCount} sentences`);
  assert(wordCount <= 25, 'Hero subheadline is lean (<= 25 words)', `Found ${wordCount} words`);
}

// Hero CTAs Touch Target Compliance
// Action 1: 2-Minute Commercial Proposal generator
assert(
  heroCode.includes('h-[46px] sm:h-[48px]') && heroCode.includes('min-touch-target'),
  'Hero CTA 1 (Proposal Generator) enforces >= 44px height (h-[46px] sm:h-[48px])'
);
// Action 2: WhatsApp Quick Deploy
assert(
  heroCode.includes('WhatsApp Quick Deploy') && heroCode.includes('h-[46px] sm:h-[48px]'),
  'Hero CTA 2 (WhatsApp Quick Deploy) enforces >= 44px height (h-[46px] sm:h-[48px])'
);
// Action 3: Direct Phone Call
assert(
  heroCode.includes('tel:+919080863448') && heroCode.includes('h-[46px] sm:h-[48px]'),
  'Hero CTA 3 (Direct Phone Call) enforces >= 44px height (h-[46px] sm:h-[48px])'
);

// 3.2 Locations Page Copy & Touch Targets
const locationsPagePath = path.join(projectRoot, 'src/app/locations/page.tsx');
assert(fs.existsSync(locationsPagePath), 'Locations page exists', locationsPagePath);
const locationsPageCode = fs.readFileSync(locationsPagePath, 'utf8');

// Check Locations hero description
const locHeroRegex = /<p className="text-base sm:text-lg text-neutral-300 leading-relaxed">([\s\S]*?)<\/p>/;
const locHeroMatch = locationsPageCode.match(locHeroRegex);
assert(locHeroMatch !== null, 'Locations page hero paragraph located');
if (locHeroMatch) {
  const locP = locHeroMatch[1].trim().replace(/\s+/g, ' ');
  const wordCount = locP.split(' ').length;
  const sentenceCount = (locP.match(/[.!?](\s|$)/g) || []).length;
  console.log(`    Locations Subheadline (${wordCount} words, ${sentenceCount} sentence(s)): "${locP}"`);
  assert(sentenceCount === 1, 'Locations hero copy is exactly 1 sentence', `Found ${sentenceCount} sentences`);
  assert(wordCount <= 30, 'Locations hero copy is lean (<= 30 words)', `Found ${wordCount} words`);
}

// Check Locations CTAs touch target
assert(
  locationsPageCode.includes('min-h-[44px]'),
  'Locations action triggers enforce min-h-[44px] touch target'
);

// 3.3 Locations Data operationalOverview Sentence Lengths
const locationsDataPath = path.join(projectRoot, 'src/data/locations.ts');
assert(fs.existsSync(locationsDataPath), 'Locations data exists', locationsDataPath);
const locationsDataCode = fs.readFileSync(locationsDataPath, 'utf8');

const overviews = [...locationsDataCode.matchAll(/operationalOverview:\s*["']([^"']+)["']/g)];
assert(overviews.length === 8, 'All 8 locations have operationalOverview', `Found ${overviews.length}`);

let allSingleSentence = true;
overviews.forEach((m, i) => {
  const text = m[1].trim();
  const sentences = (text.match(/[.!?](\s|$)/g) || []).length;
  const words = text.split(/\s+/).length;
  if (sentences > 1 || words > 35) {
    allSingleSentence = false;
    console.error(`    Location ${i + 1} overview is too long (${words} words, ${sentences} sentences): "${text}"`);
  }
});
assert(allSingleSentence, 'All location operationalOverview fields are crisp single sentences (<= 35 words)');

// -----------------------------------------------------------------------------
// SUMMARY & RESULTS
// -----------------------------------------------------------------------------
console.log('\n================================================================');
console.log(`TEST RESULTS: ${passedTests}/${totalTests} PASSED`);
if (failedTests > 0) {
  console.error(`FAILED TESTS (${failedTests}):`);
  failures.forEach(f => console.error(`  - ${f.testName}: ${f.details}`));
} else {
  console.log('ALL EMPIRICAL CODE-LEVEL CHECKS PASSED WITH ZERO ERRORS.');
}
console.log('================================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
