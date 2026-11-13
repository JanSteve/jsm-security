#!/usr/bin/env node
/**
 * JSM Integrated Services — Pre-Render Queue Manager
 * Ensures the next N days of bespoke animated character reels
 * are pre-rendered into public/videos/daily/ so cloud schedulers
 * (GitHub Actions) can post without requiring local GPU/Chrome.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getReelForDate } from './daily-social-dispatch.mjs';
import { renderReel } from './render-animated-character-reel.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const VIDEOS_DIR = path.join(ROOT_DIR, 'public', 'videos', 'daily');

export async function preRenderNextDays(daysAhead = 3) {
  if (!fs.existsSync(VIDEOS_DIR)) {
    fs.mkdirSync(VIDEOS_DIR, { recursive: true });
  }

  const now = new Date();
  const results = [];

  for (let i = 0; i < daysAhead; i++) {
    const targetDate = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
    const dateStr = targetDate.toISOString().split('T')[0];

    for (const slot of ['morning', 'evening']) {
      const reel = getReelForDate(dateStr, slot);
      const mp4Path = path.join(VIDEOS_DIR, `${reel.reel_id}.mp4`);
      const jpgPath = path.join(VIDEOS_DIR, `${reel.reel_id}.jpg`);

      if (fs.existsSync(mp4Path) && fs.existsSync(jpgPath)) {
        console.log(`✓ Reel ${reel.reel_id} (${dateStr} ${slot}) already exists on disk.`);
        results.push({ reel_id: reel.reel_id, date: dateStr, slot, status: 'EXISTS' });
      } else {
        console.log(`⚙️ Pre-rendering missing reel: ${reel.reel_id} (${dateStr} ${slot})...`);
        try {
          await renderReel(reel);
          results.push({ reel_id: reel.reel_id, date: dateStr, slot, status: 'RENDERED' });
        } catch (err) {
          console.error(`✗ Failed to pre-render ${reel.reel_id}: ${err.message}`);
          results.push({ reel_id: reel.reel_id, date: dateStr, slot, status: 'FAILED', error: err.message });
        }
      }
    }
  }

  return results;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const days = parseInt(process.argv[2] || '3', 10);
  preRenderNextDays(days)
    .then(res => {
      console.log(`\nPre-render queue complete: ${res.length} reels checked.`);
      process.exit(0);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}
