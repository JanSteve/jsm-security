import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const SCENE_DURATIONS = [
  { id: 1, dur: 6.95 },
  { id: 2, dur: 6.95 },
  { id: 3, dur: 8.25 },
  { id: 4, dur: 4.53 },
  { id: 5, dur: 7.97 },
  { id: 6, dur: 7.75 },
  { id: 7, dur: 7.46 },
  { id: 8, dur: 9.35 }
];

const SCENES_DIR = '/tmp/jsm_bridge_scenes';
const AUDIO_FILE = '/tmp/jsm_bridge_mix.wav';
const CONCAT_LIST = '/tmp/concat_scenes.txt';
const FINAL_MP4 = path.resolve('public/videos/jsm-talent-bridge-reel.mp4');
const POSTER_JPG = path.resolve('public/videos/poster-bridge.jpg');

// 1. Build concat demuxer file for ffmpeg
let concatContent = '';
for (const s of SCENE_DURATIONS) {
  const imgPath = path.join(SCENES_DIR, `scene_${s.id}.png`);
  concatContent += `file '${imgPath}'\nduration ${s.dur}\n`;
}
// Repeat last image to prevent premature EOF
const lastImg = path.join(SCENES_DIR, `scene_${SCENE_DURATIONS[SCENE_DURATIONS.length - 1].id}.png`);
concatContent += `file '${lastImg}'\n`;

fs.writeFileSync(CONCAT_LIST, concatContent);

console.log("Compiling 59s vertical 1080x1920 video with ffmpeg...");

// 2. Run ffmpeg muxing
const cmd = `ffmpeg -y -f concat -safe 0 -i ${CONCAT_LIST} -i ${AUDIO_FILE} ` +
  `-c:v libx264 -preset fast -crf 18 -pix_fmt yuv420p -r 24 ` +
  `-c:a aac -b:a 192k -shortest ` +
  `"${FINAL_MP4}"`;

console.log("Running ffmpeg command...");
execSync(cmd, { stdio: 'inherit' });

// 3. Extract poster frame
console.log("Extracting poster from scene 1...");
execSync(`ffmpeg -y -i "${FINAL_MP4}" -ss 00:00:03 -vframes 1 -q:v 2 "${POSTER_JPG}"`, { stdio: 'inherit' });

console.log("✓ Video successfully generated at:", FINAL_MP4);
console.log("✓ Poster saved at:", POSTER_JPG);
