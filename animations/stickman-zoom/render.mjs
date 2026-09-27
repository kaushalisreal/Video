// Renders scene.html frame by frame, then muxes frames + voice into an MP4.
// Usage: node render.mjs            -> stickman-zoom.mp4
//        node render.mjs 0 1.5 2.9  -> preview PNGs at those times
import { createRequire } from 'module';
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || '/opt/node22/lib/node_modules/playwright');
const dir = path.dirname(fileURLToPath(import.meta.url));
const FPS = 30, DUR = 3, AUDIO_DELAY_MS = 80;
const ffmpeg = execFileSync('python3', ['-c', 'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())']).toString().trim();

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto('file://' + path.join(dir, 'scene.html'));
await page.evaluate(m => window.setMouth(m), JSON.parse(fs.readFileSync(path.join(dir, 'mouth.json'))));
const shot = async (t, file) => {
  await page.evaluate(t => window.renderFrame(t), t);
  await page.locator('#c').screenshot({ path: file });
};

const previews = process.argv.slice(2).map(Number);
if (previews.length) {
  for (const t of previews) await shot(t, path.join(dir, `preview-${t}.png`));
  await browser.close();
  process.exit(0);
}

const frames = path.join(dir, 'frames');
fs.rmSync(frames, { recursive: true, force: true });
fs.mkdirSync(frames);
for (let i = 0; i < FPS * DUR; i++) await shot(i / FPS, path.join(frames, `${String(i).padStart(4, '0')}.png`));
await browser.close();

execFileSync(ffmpeg, ['-y', '-v', 'error', '-framerate', String(FPS), '-i', path.join(frames, '%04d.png'),
  '-i', path.join(dir, 'speech.mp3'),
  '-filter_complex', `[1:a]adelay=${AUDIO_DELAY_MS}|${AUDIO_DELAY_MS},apad,atrim=0:${DUR},afade=t=out:st=${DUR - 0.12}:d=0.12[a]`,
  '-map', '0:v', '-map', '[a]', '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p',
  '-c:a', 'aac', '-b:a', '160k', '-t', String(DUR), '-movflags', '+faststart', path.join(dir, 'stickman-zoom.mp4')]);
fs.rmSync(frames, { recursive: true, force: true });
console.log('wrote stickman-zoom.mp4');
