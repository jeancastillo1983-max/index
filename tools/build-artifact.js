#!/usr/bin/env node
/* Builds the claude.ai preview (review mode) of the course into <out>/ (default dist/artifact):
   - index.html becomes a fragment (no doctype/html/head/body; the artifact host adds the skeleton)
   - js/config.js swapped: videoMode 'link' (iframes are not allowed in artifacts), reviewMode true
   - everything else copied as-is (dev/ excluded)
   Prints the list of supporting files (relative paths) as JSON to <out>/files.json. */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'fall-protection-cp');
const OUT = path.resolve(process.argv[2] || path.join(ROOT, 'dist', 'artifact'));

function copyDir(src, dst, rel = '') {
  const list = [];
  fs.mkdirSync(dst, { recursive: true });
  for (const f of fs.readdirSync(src)) {
    if (f === 'dev' || f.startsWith('.') || f === 'imsmanifest.xml') continue;
    const s = path.join(src, f), d = path.join(dst, f), r = rel ? `${rel}/${f}` : f;
    if (fs.statSync(s).isDirectory()) list.push(...copyDir(s, d, r));
    else { fs.copyFileSync(s, d); list.push(r); }
  }
  return list;
}

fs.rmSync(OUT, { recursive: true, force: true });
const files = copyDir(SRC, OUT).filter(f => f !== 'index.html');

// Fragment: keep <title>, <meta name=...> (not charset/viewport), <link>, <style>, <script> and body content.
const html = fs.readFileSync(path.join(SRC, 'index.html'), 'utf8');
const head = (html.match(/<head[^>]*>([\s\S]*?)<\/head>/i) || [, ''])[1]
  .replace(/<meta[^>]+(charset|viewport)[^>]*>\s*/gi, '');
const bodyMatch = html.match(/<body([^>]*)>([\s\S]*?)<\/body>/i) || [, '', html];
const bodyAttrs = bodyMatch[1].trim();
let frag = head.trim() + '\n' + (bodyAttrs ? `<div ${bodyAttrs}>\n${bodyMatch[2].trim()}\n</div>` : bodyMatch[2].trim()) + '\n';
// <title> must be within the first 8KB
const t = frag.match(/<title>[\s\S]*?<\/title>/i);
if (t) frag = t[0] + '\n' + frag.replace(t[0], '');
fs.writeFileSync(path.join(OUT, 'index.html'), frag);

fs.writeFileSync(path.join(OUT, 'js', 'config.js'), `/* Preview (artifact) build: review mode, videos open on YouTube. */
window.FP_CONFIG = {
  videoMode: 'link',
  reviewMode: true,
  sequential: false,
  narration: true,
  preview: true,
  allowPrint: false,
  brand: { name: 'Upchurch', tagline: 'Safety Training', logo: 'assets/img/upchurch-logo.png', logoDark: 'assets/img/upchurch-logo-white.png' }
};
`);
// Voice clips → 16 sprite files for the preview (an artifact holds at most 511 files). The LMS build keeps one file per clip.
const audioDir = path.join(OUT, 'assets', 'audio');
if (fs.existsSync(audioDir)) {
  const { execSync } = require('child_process');
  const manifest = fs.readFileSync(path.join(OUT, 'content', 'audio.js'), 'utf8');
  const entries = [...manifest.matchAll(/"([0-9a-f]{8})":\s*\["([^"]+)",\s*([\d.]+)\]/g)].map(m => ({ key: m[1], src: m[2], dur: +m[3] }));
  const spriteDir = path.join(OUT, 'assets', 'voice');
  fs.mkdirSync(spriteDir, { recursive: true });
  const gap = path.join(spriteDir, '_gap.mp3');
  execSync(`ffmpeg -y -loglevel error -f lavfi -i anullsrc=r=24000:cl=mono -t 0.4 -codec:a libmp3lame -b:a 48k "${gap}"`);
  const probe = f => parseFloat(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 "${f}"`).toString().trim());
  const gapDur = probe(gap);
  const groups = {};
  entries.forEach(e => { (groups[e.key[0]] = groups[e.key[0]] || []).push(e); });
  const out = {};
  Object.keys(groups).sort().forEach(g => {
    const list = [], spriteName = `voice-${g}.mp3`;
    let t = 0;
    groups[g].forEach(e => {
      const f = path.join(OUT, e.src), d = probe(f);
      list.push(`file '${gap}'`); t += gapDur;
      list.push(`file '${f}'`);
      out[e.key] = [`assets/voice/${spriteName}#t=${t.toFixed(3)},${(t + d - 0.03).toFixed(3)}`, e.dur];
      t += d;
    });
    list.push(`file '${gap}'`);
    const listFile = path.join(spriteDir, `_${g}.txt`);
    fs.writeFileSync(listFile, list.join('\n'));
    execSync(`ffmpeg -y -loglevel error -f concat -safe 0 -i "${listFile}" -ac 1 -codec:a libmp3lame -b:a 48k "${path.join(spriteDir, spriteName)}"`);
    fs.unlinkSync(listFile);
  });
  fs.unlinkSync(gap);
  fs.writeFileSync(path.join(OUT, 'content', 'audio.js'), '/* Preview build: voice clips packed into sprites (file#t=start,end). */\nCOURSE.addAudio({\n' +
    Object.entries(out).map(([k, v]) => `  "${k}": ["${v[0]}", ${v[1]}]`).join(',\n') + '\n});\n');
  fs.rmSync(audioDir, { recursive: true, force: true });
  for (let i = files.length - 1; i >= 0; i--) if (files[i].startsWith('assets/audio/')) files.splice(i, 1);
  fs.readdirSync(spriteDir).forEach(f => files.push(`assets/voice/${f}`));
}
fs.writeFileSync(path.join(OUT, 'files.json'), JSON.stringify(files, null, 0));
let bytes = 0; files.concat(['index.html']).forEach(f => { bytes += fs.statSync(path.join(OUT, f)).size; });
console.log(`artifact build: ${files.length + 1} files, ${(bytes / 1048576).toFixed(1)} MB → ${OUT}`);
