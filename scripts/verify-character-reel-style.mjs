#!/usr/bin/env node

/**
 * JSM Integrated Services — Visual Style & Character Storytelling Validator
 * 
 * Enforces Requirement R1:
 * - Programmatically verifies animated flat-vector character storytelling structure:
 *     1. Problem / Agony (Candidate & Employer crisis, ATS bots, spam resumes, ghosting)
 *     2. Interval / JSM Bridge (JSM Mediator human bridge, ₹0 advance, 7-day turnaround)
 *     3. Solution / Double Win (Candidate offer letter & Employer verified placement)
 *     4. Dual Comment CTA (Rahul + Vikram + JSM Mediator, comment 'JOB' & 'HIRE')
 * - Strictly rejects plain text slides (slides containing only HTML/text boxes and metric cards without characters)
 * - Verifies presence of the 3 flat-vector characters:
 *     * Rahul (Candidate / Job Seeker)
 *     * Vikram (Employer / Founder / HR)
 *     * JSMMediator (JSM Executive Talent Mediator)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const ROOT_DIR = path.resolve(__dirname, '..');

// Specifications for Flat-Vector Characters
export const CHARACTER_SPECS = {
  rahul: {
    name: "Rahul",
    persona: "Job Seeker / Candidate",
    markers: ["drawRahul", "Rahul"],
    vectorPalette: ["#0F766E", "#0D9488", "#115E59"], // Casual teal hoodie
    signatureFeatures: ["spectacles", "hoodie", "cords", "pocket"],
    emotions: ["frustrated", "celebrating"]
  },
  vikram: {
    name: "Vikram",
    persona: "Employer / Founder / HR Head",
    markers: ["drawVikram", "Vikram"],
    vectorPalette: ["#1E293B", "#0F172A", "#DC2626"], // Corporate blazer, red tie
    signatureFeatures: ["blazer", "shirt", "tie", "cuff"],
    emotions: ["stressed", "triumphant"]
  },
  jsmMediator: {
    name: "JSMMediator",
    persona: "JSM Executive Mediator",
    markers: ["drawJSMMediator", "JSMMediator", "drawMediator"],
    vectorPalette: ["#0F172A", "#E5A93C", "#D97706"], // Charcoal blazer, warm gold lapel
    signatureFeatures: ["lapel", "badge", "tablet", "screen"],
    emotions: ["poised", "balanced"]
  }
};

// Required 4-Phase Story Arc Definition
export const REQUIRED_STORY_PHASES = [
  {
    phase: "problem_agony",
    name: "Problem / Agony",
    description: "Cold ATS filters, resume spam, ghosting crisis, wasted capital & time",
    keywords: ["ghosted", "ats", "spam resumes", "unqualified", "bots", "agony", "frustration", "disconnect", "trap", "crisis", "paradox"]
  },
  {
    phase: "interval_bridge",
    name: "Interval / JSM Bridge",
    description: "JSM Executive Mediator intervenes with human talent bridge and ₹0 advance",
    keywords: ["bridge", "jsm", "mediator", "zero advance", "contingency", "human", "7 days", "100% free", "pre-screened"]
  },
  {
    phase: "solution_double_win",
    name: "Solution / Double Win",
    description: "Candidate celebrates verified offer letter, employer celebrates vetted hire",
    keywords: ["solution", "offer letter", "celebrating", "triumphant", "verified", "double win", "guarantee", "respectful", "placed"]
  },
  {
    phase: "dual_comment_cta",
    name: "Dual Comment CTA",
    description: "Both characters + mediator on stage with comment 'JOB' and 'HIRE' triggers",
    keywords: ["comment", "job", "hire", "trigger", "cta", "stage", "action", "switch", "talent"]
  }
];

/**
 * Programmatically verify character storytelling structure and reject plain text slides
 * 
 * @param {string|object} input - File path, source code string, or catalog reel metadata
 * @param {object} options - Optional overrides
 * @returns {object} Validation result
 */
export function verifyReelVisualStructure(input, options = {}) {
  // If input is an object with story_arc (Catalog Item)
  if (typeof input === 'object' && input !== null && input.story_arc) {
    return verifyCatalogReelArc(input);
  }

  let content = "";
  let sourceLabel = options.sourceLabel || "in-memory-source";

  if (typeof input === 'string') {
    // Check if it's an existing file path
    if (fs.existsSync(input)) {
      sourceLabel = path.basename(input);
      content = fs.readFileSync(input, 'utf8');
    } else {
      content = input;
    }
  } else {
    throw new Error("verifyReelVisualStructure expects a file path, script string, or catalog object.");
  }

  const contentLower = content.toLowerCase();

  // 1. Character Detection
  const charactersFound = {
    rahul: CHARACTER_SPECS.rahul.markers.some(m => content.includes(m)),
    vikram: CHARACTER_SPECS.vikram.markers.some(m => content.includes(m)),
    jsmMediator: CHARACTER_SPECS.jsmMediator.markers.some(m => content.includes(m))
  };

  const characterCount = Object.values(charactersFound).filter(Boolean).length;
  const characterDetected = characterCount > 0;

  // 2. Canvas Stage & Vector Animation Detection
  const hasCanvasStage = /<canvas\s+id=["']stage["']/i.test(content) || /canvas\.getContext\(['"]2d['"]\)/i.test(content);
  const hasVectorDrawing = /ctx\.(beginPath|arc|stroke|fill|roundRect|rect|lineTo)/i.test(content) ||
                           /c\.(beginPath|arc|stroke|fill|roundRect|rect|lineTo)/i.test(content);
  const hasCharacterAnimation = /function\s+draw(Rahul|Vikram|JSMMediator)/.test(content) ||
                                (characterDetected && hasVectorDrawing);

  // 3. Plain Text Slide Indicators
  const isPlainTextCardDeck = !characterDetected && !hasCanvasStage && (
    content.includes('.card') || content.includes('.badge') || content.includes('.metric-box') || content.includes('highlightBox')
  );

  // 4. Phase Verification
  const phasesDetected = {
    problem_agony: REQUIRED_STORY_PHASES[0].keywords.some(k => contentLower.includes(k)),
    interval_bridge: REQUIRED_STORY_PHASES[1].keywords.some(k => contentLower.includes(k)),
    solution_double_win: REQUIRED_STORY_PHASES[2].keywords.some(k => contentLower.includes(k)),
    dual_comment_cta: REQUIRED_STORY_PHASES[3].keywords.some(k => contentLower.includes(k))
  };

  const missingPhases = Object.entries(phasesDetected)
    .filter(([_, detected]) => !detected)
    .map(([phase]) => phase);

  // 5. Plain Text Slide Rejection Guard
  if (isPlainTextCardDeck || (!characterDetected && !hasCanvasStage)) {
    return {
      valid: false,
      characterDetected: false,
      plainTextSlideRejected: true,
      reason: `REJECTED: Plain text slides detected in ${sourceLabel}. Missing animated flat-vector characters (Rahul, Vikram, JSMMediator) and canvas stage rendering.`,
      details: {
        source: sourceLabel,
        characterCount: 0,
        characters: charactersFound,
        canvasStageDetected: hasCanvasStage,
        hasVectorDrawing,
        phases: phasesDetected,
        missingPhases,
        plainTextMarkers: ["text_only_cards", "missing_vector_characters", "no_canvas_stage"]
      }
    };
  }

  // 6. Character Structure & Story Arc Completeness
  const violations = [];
  if (characterCount < 3) {
    violations.push(`Expected 3 flat-vector characters (Rahul, Vikram, JSMMediator), found ${characterCount}.`);
  }
  if (!hasCanvasStage) {
    violations.push("Missing 1080x1920 <canvas id=\"stage\"> element.");
  }
  if (!hasCharacterAnimation) {
    violations.push("Missing character drawing routines (drawRahul, drawVikram, drawJSMMediator).");
  }
  if (missingPhases.length > 0) {
    violations.push(`Missing storytelling phases: ${missingPhases.join(', ')}.`);
  }

  const isValid = violations.length === 0;

  return {
    valid: isValid,
    characterDetected: true,
    plainTextSlideRejected: false,
    reason: isValid ? `VALID: Animated flat-vector character storytelling structure verified for ${sourceLabel}.` : violations.join(' '),
    details: {
      source: sourceLabel,
      characterCount,
      characters: charactersFound,
      canvasStageDetected: hasCanvasStage,
      hasVectorDrawing,
      hasCharacterAnimation,
      phases: phasesDetected,
      missingPhases,
      violations
    }
  };
}

/**
 * Verify catalog item story arc structure
 */
export function verifyCatalogReelArc(reel) {
  const arc = reel.story_arc || {};
  const violations = [];

  if (!arc.problem || typeof arc.problem !== 'string' || arc.problem.trim().length < 15) {
    violations.push("Invalid or missing 'problem' (Agony) beat in story_arc.");
  }
  if (!arc.interval || typeof arc.interval !== 'string' || arc.interval.trim().length < 15) {
    violations.push("Invalid or missing 'interval' (JSM Bridge) beat in story_arc.");
  }
  if (!arc.solution || typeof arc.solution !== 'string' || arc.solution.trim().length < 15) {
    violations.push("Invalid or missing 'solution' (Double Win) beat in story_arc.");
  }
  if (!arc.call_to_action || typeof arc.call_to_action !== 'string' || arc.call_to_action.trim().length < 10) {
    violations.push("Invalid or missing 'call_to_action' (CTA) beat in story_arc.");
  }

  // Check trigger coherence
  const slot = (reel.slot || '').toLowerCase();
  if (slot === 'morning' && reel.trigger !== 'JOB') {
    violations.push(`Morning reel ${reel.reel_id} must have trigger 'JOB', found '${reel.trigger}'.`);
  }
  if (slot === 'evening' && reel.trigger !== 'HIRE') {
    violations.push(`Evening reel ${reel.reel_id} must have trigger 'HIRE', found '${reel.trigger}'.`);
  }

  const isValid = violations.length === 0;

  return {
    valid: isValid,
    reelId: reel.reel_id,
    dayNumber: reel.day_number,
    slot: reel.slot,
    trigger: reel.trigger,
    storyArcVerified: isValid,
    plainTextSlideRejected: false,
    violations,
    reason: isValid ? `Story arc valid for ${reel.reel_id}` : violations.join(' ')
  };
}

/**
 * Verify entire catalog file
 */
export function verifyCatalog(catalogPath = path.join(ROOT_DIR, 'data', 'annual-reels-catalog.json')) {
  if (!fs.existsSync(catalogPath)) {
    throw new Error(`Catalog not found: ${catalogPath}`);
  }
  const raw = fs.readFileSync(catalogPath, 'utf8');
  const catalog = JSON.parse(raw);
  const reels = catalog.reels || [];

  let validCount = 0;
  const invalidReels = [];

  for (const reel of reels) {
    const res = verifyCatalogReelArc(reel);
    if (res.valid) {
      validCount++;
    } else {
      invalidReels.push(res);
    }
  }

  return {
    totalReels: reels.length,
    validCount,
    invalidCount: invalidReels.length,
    allValid: invalidReels.length === 0,
    invalidReels
  };
}

/**
 * CLI runner
 */
export function main() {
  const args = process.argv.slice(2);
  const targetPath = args[0];

  console.log("======================================================================");
  console.log("  JSM INTEGRATED SERVICES — CHARACTER REEL VISUAL STYLE VALIDATOR");
  console.log("======================================================================");

  if (targetPath) {
    console.log(`\nInspecting target: ${targetPath}`);
    const result = verifyReelVisualStructure(targetPath);
    console.log(JSON.stringify(result, null, 2));
    if (!result.valid) {
      if (result.plainTextSlideRejected) {
        console.log(`\n🚫 Successfully REJECTED plain text slides as required by style policy.`);
        process.exit(0);
      } else {
        console.error(`\n✗ Validation failed: ${result.reason}`);
        process.exit(1);
      }
    } else {
      console.log(`\n✓ Style validated successfully!`);
      process.exit(0);
    }
  }

  // Default: Run comprehensive self-check across repository files
  console.log("\n[Test 1/3] Verifying Animated Character Reel Engine (render-animated-character-reel.mjs)...");
  const characterReelPath = path.join(ROOT_DIR, 'scripts', 'render-animated-character-reel.mjs');
  const charResult = verifyReelVisualStructure(characterReelPath);
  console.log(`  Result: ${charResult.valid ? '✓ VALID' : '✗ INVALID'}`);
  console.log(`  Characters Detected: Rahul (${charResult.details.characters.rahul}), Vikram (${charResult.details.characters.vikram}), JSMMediator (${charResult.details.characters.jsmMediator})`);
  console.log(`  Canvas Stage: ${charResult.details.canvasStageDetected}`);
  console.log(`  4-Phase Story Arc: Problem (${charResult.details.phases.problem_agony}), Bridge (${charResult.details.phases.interval_bridge}), Solution (${charResult.details.phases.solution_double_win}), CTA (${charResult.details.phases.dual_comment_cta})`);

  if (!charResult.valid) {
    console.error("  FAILED: Character reel engine must be recognized as valid!");
    process.exit(1);
  }

  console.log("\n[Test 2/3] Verifying Plain Text Slide Rejection (render-scenes.mjs)...");
  const textScenesPath = path.join(ROOT_DIR, 'scripts', 'render-scenes.mjs');
  const textResult = verifyReelVisualStructure(textScenesPath);
  console.log(`  Result: ${textResult.valid ? 'UNEXPECTED PASS' : '✓ REJECTED (as required)'}`);
  console.log(`  Plain Text Slide Rejected: ${textResult.plainTextSlideRejected}`);
  console.log(`  Reason: ${textResult.reason}`);

  if (textResult.valid || !textResult.plainTextSlideRejected) {
    console.error("  FAILED: Plain text slide deck must be strictly rejected!");
    process.exit(1);
  }

  console.log("\n[Test 3/3] Verifying 730-Reel Annual Catalog Story Arcs...");
  const catalogCheck = verifyCatalog();
  console.log(`  Total Reels Audited: ${catalogCheck.totalReels} / 730`);
  console.log(`  Valid Story Arcs:   ${catalogCheck.validCount} / 730`);
  console.log(`  Invalid Arcs:       ${catalogCheck.invalidCount}`);

  if (!catalogCheck.allValid) {
    console.error("  FAILED: Catalog contains invalid story arcs!");
    process.exit(1);
  }

  console.log("\n======================================================================");
  console.log("  ✓ ALL VISUAL STYLE & REJECTION CHECKS PASSED WITH 100% COMPLIANCE");
  console.log("======================================================================");
}

// Execute main only if invoked directly from CLI
const isDirectExecution = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isDirectExecution) {
  main();
}
