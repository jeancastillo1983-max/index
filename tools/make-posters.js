#!/usr/bin/env node
/* Branded poster cards for every YouTube video in content/media.js (used when the real
   YouTube thumbnail can't be downloaded, and as a consistent look across the course).
   Output: <course>/assets/video/<youtubeId>.jpg (960×540). Skips ids that already have a
   poster unless --force. Usage: COURSE_ID=silica-cp node tools/make-posters.js [--force] */
'use strict';
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const PF = require('./profile');
const { loadCourse } = require('./load-content');
const { COURSE } = loadCourse({ quiet: true });

const force = process.argv.includes('--force');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
// pick a piece of course art that fits the video topic
function artFor(v) {
  const t = (v.title + ' ' + (v.why || '')).toLowerCase();
  const A = n => path.join(PF.COURSE_DIR, 'assets', 'art', n + '.svg');
  const pick = [[/masonry saw/, 'eq-tank-dry'], [/handheld power saw/, 'eq-saw-wet-good'], [/drill/, 'eq-grinder-shroud-good'], [/jackhammer|chipping/, 'eq-low-water'],
    [/tuckpoint/, 'eq-shroud-cracked'], [/grinder/, 'eq-grinder-shroud-good'], [/cab/, 'eq-cab-good'], [/fit test/, 'eq-vac-clogged'], [/drywall/, 'eq-vac-clogged']]
    .find(([re]) => re.test(t));
  const f = pick ? A(pick[1]) : A('dg-particles');
  return fs.existsSync(f) ? 'file://' + f : '';
}

(async () => {
  const dir = path.join(PF.COURSE_DIR, 'assets', 'video');
  fs.mkdirSync(dir, { recursive: true });
  const vids = Object.values(COURSE.media).filter(m => m.type === 'video' && m.youtube);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
  const logo = 'file://' + path.join(PF.COURSE_DIR, 'assets', 'img', 'upchurch-logo-white.png');
  const font = n => 'file://' + path.join(PF.COURSE_DIR, 'assets', 'fonts', n);
  const TMP = path.join(PF.DIST, '_poster.html');
  fs.mkdirSync(PF.DIST, { recursive: true });
  let n = 0;
  for (const v of vids) {
    const out = path.join(dir, `${v.youtube}.jpg`);
    if (fs.existsSync(out) && !force) continue;
    const official = /Department ?of ?Labor|CPWR/i.test(v.channel);
    const html = `<html><head><style>
@font-face{font-family:B;src:url(${font('barlow-condensed-800.woff2')})}@font-face{font-family:P;src:url(${font('public-sans-var.woff2')})}
body{margin:0;width:960px;height:540px;background:#10161C;color:#fff;font-family:P;overflow:hidden;position:relative}
.band{position:absolute;inset:0;background:radial-gradient(circle at 78% 55%,#22303C 0,#10161C 62%)}
.art{position:absolute;right:30px;top:120px;width:420px;height:315px;border-radius:18px;background:#EEF1F3 url('${artFor(v)}') center/cover no-repeat;box-shadow:0 18px 40px rgba(0,0,0,.45)}
.k{position:absolute;left:48px;top:46px;font:700 18px P;letter-spacing:.14em;text-transform:uppercase;color:#7FB8FF}
.t{position:absolute;left:48px;top:86px;width:440px;font:800 44px/1.02 B;letter-spacing:.005em}
.c{position:absolute;left:48px;bottom:92px;font:600 19px P;color:#C9D3DC}
.d{position:absolute;left:48px;bottom:56px;font:500 17px P;color:#8FA0AF}
.play{position:absolute;left:640px;top:240px;width:96px;height:96px;border-radius:50%;background:#0074E4;box-shadow:0 0 0 8px rgba(0,116,228,.28)}
.play:after{content:'';position:absolute;left:38px;top:28px;border-left:30px solid #fff;border-top:20px solid transparent;border-bottom:20px solid transparent}
.logo{position:absolute;right:30px;top:36px;height:44px}
.bar{position:absolute;left:0;bottom:0;width:100%;height:10px;background:linear-gradient(90deg,#0082FF 0 70%,#009500 70%)}
</style></head><body><div class="band"></div><div class="art"></div><div class="play"></div>
<img class="logo" src="${logo}"><div class="k">${official ? 'Official video' : 'Video'} · ${esc(COURSE.meta.title)}</div>
<div class="t">${esc(v.title.replace(/^Controlling Respirable Crystalline Silica( in Construction)?:\s*/i, 'Table 1: ').replace(/\s+\d{8}$/, '').replace(/\.wmv$/, ''))}</div>
<div class="c">${esc(v.channel)}</div><div class="d">${esc(v.duration || '')} · YouTube</div><div class="bar"></div></body></html>`;
    fs.writeFileSync(TMP, html);
    await page.goto('file://' + TMP);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: out, type: 'jpeg', quality: 82 });
    n++;
  }
  await browser.close();
  try { fs.unlinkSync(TMP); } catch (e) { /* */ }
  console.log(`posters: ${n} written → ${path.relative(PF.ROOT, dir)}`);
})().catch(e => { console.error(e); process.exit(1); });
