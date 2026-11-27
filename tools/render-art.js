#!/usr/bin/env node
/* Renders course art to PNG for PowerPoint / Word (which can't rely on SVG):
   - every assets/art/*.svg            → dist/png/art/<name>.png  (2x)
   - each character avatar (art.js)    → dist/png/avatars/<id>.png
   - each hotspot scene with numbered hazard boxes → dist/png/scenes/<id>-reveal.png */
'use strict';
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { loadCourse } = require('./load-content');

const ROOT = path.resolve(__dirname, '..');
const PF = require('./profile');
const COURSE_DIR = PF.COURSE_DIR;
const OUT = path.join(PF.DIST, 'png');
const { COURSE } = loadCourse({ quiet: true });

(async () => {
  ['art', 'avatars', 'scenes'].forEach(d => fs.mkdirSync(path.join(OUT, d), { recursive: true }));
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 2 });
  const TMP = path.join(OUT, '_tmp.html');
  page.setContent = async (html) => { fs.writeFileSync(TMP, html); await page.goto('file://' + TMP); };

  // 1. SVG art
  const artDir = path.join(COURSE_DIR, 'assets', 'art');
  const svgs = fs.existsSync(artDir) ? fs.readdirSync(artDir).filter(f => f.endsWith('.svg')) : [];
  for (const f of svgs) {
    const svg = fs.readFileSync(path.join(artDir, f), 'utf8');
    const vb = (svg.match(/viewBox="([^"]+)"/) || [])[1];
    let [w, h] = vb ? vb.split(/[\s,]+/).slice(2).map(Number) : [800, 600];
    const scale = Math.min(1, 1600 / w); w = Math.round(w * scale); h = Math.round(h * scale);
    await page.setViewportSize({ width: w, height: h });
    await page.setContent(`<html><body style="margin:0;background:transparent"><img src="file://${path.join(artDir, f)}" style="width:${w}px;height:${h}px;display:block"></body></html>`);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(OUT, 'art', f.replace(/\.svg$/, '.png')), omitBackground: true });
  }

  // 2. Avatars
  const artJs = path.join(COURSE_DIR, 'js', 'art.js');
  if (fs.existsSync(artJs)) {
    await page.setViewportSize({ width: 400, height: 400 });
    const scripts = ['js/core.js', 'content/course.js', 'js/art.js'].map(s => `<script src="file://${path.join(COURSE_DIR, s)}"></script>`).join('');
    await page.setContent(`<html><head><link rel="stylesheet" href="file://${path.join(COURSE_DIR, 'css/tokens.css')}"></head><body style="margin:0;background:transparent">${scripts}<div id="a"></div></body></html>`);
    await page.waitForLoadState('networkidle');
    for (const id of Object.keys(COURSE.characters)) {
      const ok = await page.evaluate(id => {
        const host = document.getElementById('a'); host.innerHTML = '';
        try { const el = window.FP.avatar(id, 400); if (!el) return false; host.appendChild(el); el.style.width = '400px'; el.style.height = '400px'; el.style.display = 'block'; return true; } catch (e) { return false; }
      }, id);
      if (ok) await page.locator('#a').screenshot({ path: path.join(OUT, 'avatars', `${id}.png`), omitBackground: true });
    }
  }

  // 3. Scene reveal images (numbered hazard boxes)
  for (const [id, sc] of Object.entries(COURSE.scenes || {})) {
    const src = path.join(COURSE_DIR, sc.src);
    if (!fs.existsSync(src)) continue;
    const W = 1600, H = Math.round(1600 * (sc.h || 900) / (sc.w || 1600));
    await page.setViewportSize({ width: W, height: H });
    const boxes = (sc.hazards || []).map((hz, i) => `<div style="position:absolute;left:${hz.x}%;top:${hz.y}%;width:${hz.w}%;height:${hz.h}%;border:5px solid #F26B1D;border-radius:10px;box-shadow:0 0 0 3px #fff"><span style="position:absolute;left:-18px;top:-18px;width:40px;height:40px;border-radius:50%;background:#F26B1D;color:#fff;font:800 22px Arial;display:flex;align-items:center;justify-content:center;border:3px solid #fff">${i + 1}</span></div>`).join('');
    await page.setContent(`<html><body style="margin:0"><div style="position:relative;width:${W}px;height:${H}px"><img src="file://${src}" style="width:100%;height:100%;display:block">${boxes}</div></body></html>`);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(OUT, 'scenes', `${id}-reveal.png`) });
    await page.setContent(`<html><body style="margin:0"><img src="file://${src}" style="width:${W}px;height:${H}px;display:block"></body></html>`);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(OUT, 'scenes', `${id}.png`) });
  }
  await browser.close();
  try { fs.unlinkSync(TMP); } catch (e) { /* */ }
  console.log(`rendered ${svgs.length} art files, avatars, ${Object.keys(COURSE.scenes || {}).length} scenes → ${path.relative(ROOT, OUT)}`);
})().catch(e => { console.error(e); process.exit(1); });
