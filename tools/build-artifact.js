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
  brand: { name: 'UPCHURCH', tagline: 'Safety Training', logo: null }
};
`);
fs.writeFileSync(path.join(OUT, 'files.json'), JSON.stringify(files, null, 0));
let bytes = 0; files.concat(['index.html']).forEach(f => { bytes += fs.statSync(path.join(OUT, f)).size; });
console.log(`artifact build: ${files.length + 1} files, ${(bytes / 1048576).toFixed(1)} MB → ${OUT}`);
