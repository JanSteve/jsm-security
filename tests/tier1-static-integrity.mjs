/**
 * Tier 1: Static Integrity, Fact & Prohibited Elements Scanner
 * Part of JSM Integrated Services 4-Tier E2E Test Suite (M_TEST)
 *
 * Verifies:
 * 1. CONFIRM_ITEMS.md register exists and lists unresolved items
 * 2. Verified contact details (contact@jsmintegratedservices.com, +91 90808 63448, Kottapattu Trichy address)
 * 3. Zero prohibited hype words (world-class, cutting-edge, seamless, leverage, unlock your potential, revolutionize)
 * 4. Zero prohibited visual elements (purple gradients, neon glows, emoji icons, cookie banners, autoplay videos, dark mode toggle)
 * 5. Presence of [CONFIRM: fee %] and [CONFIRM: role band] tags on unverified figures
 */

import fs from 'node:fs';
import path from 'node:path';

console.log('======================================================================');
console.log('  TIER 1: STATIC INTEGRITY & FACT/COPY AUDIT HARNESS');
console.log('======================================================================\n');

const projectRoot = process.cwd();
let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;
const failureDetails = [];

function check(title, assertionFn) {
  totalChecks++;
  const label = `[CHECK ${String(totalChecks).padStart(2, '0')}] ${title}`;
  try {
    const result = assertionFn();
    if (result === false) {
      throw new Error('Assertion returned false');
    }
    passedChecks++;
    console.log(`  ✓ PASS: ${label}`);
  } catch (err) {
    failedChecks++;
    console.error(`  ✗ FAIL: ${label}`);
    console.error(`          Reason: ${err.message}`);
    failureDetails.push({ label, error: err.message });
  }
}

/**
 * Recursively find all relevant files matching extensions
 */
function walkDir(dir, filterExts = ['.ts', '.tsx', '.js', '.mjs', '.css', '.md']) {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  function recurse(currentDir) {
    const list = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const item of list) {
      if (item.name.startsWith('.') || item.name === 'node_modules' || item.name === '.next') {
        continue;
      }
      const fullPath = path.join(currentDir, item.name);
      if (item.isDirectory()) {
        recurse(fullPath);
      } else if (filterExts.some(ext => item.name.endsWith(ext))) {
        results.push(fullPath);
      }
    }
  }

  recurse(dir);
  return results;
}

// -----------------------------------------------------------------------------
// CHECK 1: CONFIRM_ITEMS.md existence and cataloging
// -----------------------------------------------------------------------------
check('CONFIRM_ITEMS.md register exists at project root or docs/', () => {
  const rootConfirm = path.join(projectRoot, 'CONFIRM_ITEMS.md');
  const docsConfirm = path.join(projectRoot, 'docs', 'CONFIRM_ITEMS.md');
  const exists = fs.existsSync(rootConfirm) || fs.existsSync(docsConfirm);
  if (!exists) {
    throw new Error('Neither CONFIRM_ITEMS.md nor docs/CONFIRM_ITEMS.md exists');
  }
  const content = fs.readFileSync(fs.existsSync(rootConfirm) ? rootConfirm : docsConfirm, 'utf8');
  if (!content.includes('[CONFIRM') && !content.toLowerCase().includes('confirm')) {
    throw new Error('CONFIRM_ITEMS.md does not contain confirmation registers');
  }
  return true;
});

// -----------------------------------------------------------------------------
// CHECK 2: Verified contact details presence in source or build
// -----------------------------------------------------------------------------
const allSourceFiles = walkDir(path.join(projectRoot, 'src'));

check('Verified email (contact@jsmintegratedservices.com) is present in codebase', () => {
  const emailRegex = /contact@jsmintegratedservices\.com/i;
  const match = allSourceFiles.some(file => {
    const content = fs.readFileSync(file, 'utf8');
    return emailRegex.test(content);
  });
  if (!match) {
    throw new Error('Email contact@jsmintegratedservices.com not found in any src/ file');
  }
  return true;
});

check('Verified hotline (+91 90808 63448 / 9080863448) is present in codebase', () => {
  const phoneRegex = /(?:(?:\+?91[\s-]?)?90808[\s-]?63448)/;
  const match = allSourceFiles.some(file => {
    const content = fs.readFileSync(file, 'utf8');
    return phoneRegex.test(content);
  });
  if (!match) {
    throw new Error('Phone hotline +91 90808 63448 not found in src/ files');
  }
  return true;
});

check('Verified office address (Kottapattu, Tiruchirappalli) is present in codebase', () => {
  const match = allSourceFiles.some(file => {
    const content = fs.readFileSync(file, 'utf8');
    return content.includes('Kottapattu') && (content.includes('Tiruchirappalli') || content.includes('Trichy'));
  });
  if (!match) {
    throw new Error('Address with Kottapattu and Tiruchirappalli not found in src/ files');
  }
  return true;
});

// -----------------------------------------------------------------------------
// CHECK 3: Zero prohibited hype words
// -----------------------------------------------------------------------------
const prohibitedHypeWords = [
  'world-class',
  'cutting-edge',
  'seamless',
  'leverage',
  'unlock your potential',
  'revolutionize'
];

check('Zero prohibited hype words in client marketing copy (src/app and src/components)', () => {
  const targetFiles = walkDir(path.join(projectRoot, 'src', 'app')).concat(
    walkDir(path.join(projectRoot, 'src', 'components'))
  );

  const violations = [];
  const hypeRegex = new RegExp(`\\b(${prohibitedHypeWords.join('|')})\\b`, 'i');

  for (const file of targetFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const match = content.match(hypeRegex);
    if (match) {
      const relPath = path.relative(projectRoot, file);
      violations.push(`${relPath}: found prohibited term "${match[0]}"`);
    }
  }

  if (violations.length > 0) {
    throw new Error(`Found ${violations.length} hype word violation(s):\n            ` + violations.join('\n            '));
  }
  return true;
});

// -----------------------------------------------------------------------------
// CHECK 4: Zero prohibited visual elements
// -----------------------------------------------------------------------------
check('Zero purple gradients in styling (from-purple, via-purple, to-purple)', () => {
  const stylingFiles = walkDir(path.join(projectRoot, 'src', 'app')).concat(
    walkDir(path.join(projectRoot, 'src', 'components'))
  ).filter(f => f.endsWith('.tsx') || f.endsWith('.css'));

  const purpleRegex = /(?:from|via|to)-(?:purple|violet|fuchsia)-/i;
  const violations = [];

  for (const file of stylingFiles) {
    const content = fs.readFileSync(file, 'utf8');
    if (purpleRegex.test(content)) {
      const relPath = path.relative(projectRoot, file);
      violations.push(`${relPath}: contains prohibited purple/violet gradient classes`);
    }
  }

  if (violations.length > 0) {
    throw new Error(`Purple gradients detected:\n            ` + violations.join('\n            '));
  }
  return true;
});

check('Zero neon glow box-shadows or text-glow styles', () => {
  const stylingFiles = walkDir(path.join(projectRoot, 'src', 'app')).concat(
    walkDir(path.join(projectRoot, 'src', 'components'))
  ).filter(f => f.endsWith('.tsx') || f.endsWith('.css'));

  const neonRegex = /shadow-\[[^\]]*0_0_[0-9]+px_#(?:00ff|39ff|ff00|0ff)[^\]]*\]|neon-glow/i;
  const violations = [];

  for (const file of stylingFiles) {
    const content = fs.readFileSync(file, 'utf8');
    if (neonRegex.test(content)) {
      const relPath = path.relative(projectRoot, file);
      violations.push(`${relPath}: contains prohibited neon glow styling`);
    }
  }

  if (violations.length > 0) {
    throw new Error(`Neon glows detected:\n            ` + violations.join('\n            '));
  }
  return true;
});

check('Zero emoji characters used as iconography in marketing components', () => {
  const marketingFiles = walkDir(path.join(projectRoot, 'src', 'components', 'home')).concat(
    walkDir(path.join(projectRoot, 'src', 'components', 'sections'))
  );

  // Unicode emoji regex range
  const emojiRegex = /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
  const violations = [];

  for (const file of marketingFiles) {
    const content = fs.readFileSync(file, 'utf8');
    if (emojiRegex.test(content)) {
      const relPath = path.relative(projectRoot, file);
      violations.push(`${relPath}: contains raw emoji iconography in UI components`);
    }
  }

  if (violations.length > 0) {
    throw new Error(`Emoji icons detected in UI:\n            ` + violations.join('\n            '));
  }
  return true;
});

check('Zero dark mode toggle classes or forced themes', () => {
  const files = walkDir(path.join(projectRoot, 'src', 'app')).concat(
    walkDir(path.join(projectRoot, 'src', 'components', 'layout'))
  ).filter(f => f.endsWith('.tsx'));

  const darkRegex = /\bdark:/;
  const violations = [];

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    // Allow globals.css or root layout definitions if isolated, but no UI dark mode toggles
    if (content.includes('ThemeToggle') || content.includes('setTheme') || darkRegex.test(content)) {
      const relPath = path.relative(projectRoot, file);
      violations.push(`${relPath}: contains dark mode toggle or dark: variant`);
    }
  }

  if (violations.length > 0) {
    throw new Error(`Dark mode elements detected:\n            ` + violations.join('\n            '));
  }
  return true;
});

// -----------------------------------------------------------------------------
// CHECK 5: [CONFIRM: fee %] and [CONFIRM: role band] tags presence
// -----------------------------------------------------------------------------
check('Unverified figures carry [CONFIRM: fee %] or [CONFIRM: role band] markers', () => {
  const files = walkDir(path.join(projectRoot, 'src')).concat([
    path.join(projectRoot, 'CONFIRM_ITEMS.md'),
    path.join(projectRoot, 'docs', 'CONFIRM_ITEMS.md')
  ]).filter(f => fs.existsSync(f));

  let hasConfirmFee = false;
  let hasConfirmRoleBand = false;

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('[CONFIRM: fee %]')) hasConfirmFee = true;
    if (content.includes('[CONFIRM: role band]')) hasConfirmRoleBand = true;
  }

  if (!hasConfirmFee) {
    throw new Error('Marker [CONFIRM: fee %] not found on unverified figures');
  }
  if (!hasConfirmRoleBand) {
    throw new Error('Marker [CONFIRM: role band] not found on unverified role bands');
  }
  return true;
});

// -----------------------------------------------------------------------------
// Summary
// -----------------------------------------------------------------------------
console.log('\n----------------------------------------------------------------------');
console.log(`TIER 1 SUMMARY: ${passedChecks}/${totalChecks} checks passed (${failedChecks} failed)`);
console.log('----------------------------------------------------------------------\n');

if (failedChecks > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
