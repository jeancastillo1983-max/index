#!/usr/bin/env node
/* Packages the narration clips for Rise 360 / Storyline 360 developers:
   deliverables/FallProtection-CP_Narration-MP3.zip with files named by storyboard screen code
   (M5-L3-04_1_tasha.mp3 …) plus narration-index.csv (screen, order, character, voice, seconds, file, script). */
'use strict';
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { loadCourse } = require('./load-content');

const ROOT = path.resolve(__dirname, '..');
const CD = path.join(ROOT, 'fall-protection-cp');
const OUT = path.join(ROOT, 'deliverables', 'FallProtection-CP_Narration-MP3.zip');
const STAGE = path.join(ROOT, 'dist', 'narration-mp3');
const { COURSE, FP } = loadCourse({ quiet: true });
const cast = JSON.parse(fs.readFileSync(path.join(__dirname, 'voices.json'), 'utf8'));

fs.rmSync(STAGE, { recursive: true, force: true });
fs.mkdirSync(STAGE, { recursive: true });
const rows = [['screen', 'order', 'character', 'voice', 'seconds', 'file', 'script']];
let n = 0, missing = 0;
const csv = v => '"' + String(v).replace(/"/g, '""') + '"';
function emit(code, segs) {
  segs.forEach((s, i) => {
    const clip = COURSE.audio[FP.clipKey(s.who, s.text)];
    if (!clip) { missing++; return; }
    const name = `${code}_${i + 1}_${s.who}.mp3`;
    fs.copyFileSync(path.join(CD, clip[0]), path.join(STAGE, name));
    rows.push([code, i + 1, FP.char(s.who).name, (cast[s.who] || cast.tasha).voice, clip[1], name, s.text]);
    n++;
  });
}
COURSE.modules.forEach(m => m.lessons.forEach((l, li) => l.blocks.forEach((b, bi) => {
  const code = `M${m.num}-L${li + 1}-${String(bi + 1).padStart(2, '0')}`;
  emit(code, FP.blockScript(b));
  if (b.type === 'story') (b.chapters || []).forEach((ch, ci) => emit(`${code}-ch${ci + 1}`, FP.chapterScript(b, ch)));
  if (b.type === 'scenario') Object.entries(b.nodes || {}).forEach(([k, nd]) => emit(`${code}-${k}`, FP.nodeScript(nd)));
})));
fs.writeFileSync(path.join(STAGE, 'narration-index.csv'), rows.map(r => r.map(csv).join(',')).join('\n'));
fs.writeFileSync(path.join(STAGE, 'README.txt'),
`Fall Protection Competent Person — narration audio
Files are named <storyboard screen code>_<order>_<character>.mp3 and match the storyboard's Narration rows.
narration-index.csv lists every file with its character, voice, length and script.
Voices: Kokoro-82M neural TTS (Apache-2.0), generated offline; casting in tools/voices.json.
Storyline 360: Insert > Audio > Audio from File (one clip per slide/layer). Rise 360: Multimedia > Audio block.
`);
fs.mkdirSync(path.dirname(OUT), { recursive: true });
if (fs.existsSync(OUT)) fs.unlinkSync(OUT);
execSync(`cd "${STAGE}" && zip -q -r -X "${OUT}" .`);
console.log(`narration package: ${n} files${missing ? ` (${missing} clips not generated yet)` : ''}, ${(fs.statSync(OUT).size / 1048576).toFixed(1)} MB → ${path.relative(ROOT, OUT)}`);
