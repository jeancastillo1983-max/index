// node build.js [names...] → writes SVGs to assets/art and renders PNG previews (+debug overlays) in scratch/out
'use strict';
const fs = require('fs'), path = require('path');
const ART = path.resolve(__dirname, '..', '..', 'fall-protection-cp', 'assets', 'art');
const OUT = path.resolve(__dirname, '..', '..', 'dist', 'scene-previews');
fs.mkdirSync(OUT, { recursive: true });
const deck = require('./deck');
let roof = {}, shaft = {};
try { roof = require('./roof'); } catch (e) { if (!/Cannot find module/.test(e.message)) throw e; }
try { shaft = require('./shaft'); } catch (e) { if (!/Cannot find module/.test(e.message)) throw e; }
const jobs = {
  'scene-deck': deck.deck, 'scene-deck-tomorrow': deck.deckTomorrow,
  'scene-roof': roof.roof, 'scene-roof-tomorrow': roof.roofTomorrow, 'scene-shaft': shaft.shaft
};
const want = process.argv.slice(2);
(async () => {
  const { chromium } = require('playwright');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  // scene registry for debug overlays
  const sandbox = { window: {} }; sandbox.window = sandbox;
  try {
    const vm = require('vm'); vm.createContext(sandbox);
    vm.runInContext(fs.readFileSync(path.join(ART, '..', '..', 'content', 'course.js'), 'utf8'), sandbox);
    if (fs.existsSync(path.join(ART, '..', '..', 'content', 'scenes.js'))) vm.runInContext(fs.readFileSync(path.join(ART, '..', '..', 'content', 'scenes.js'), 'utf8'), sandbox);
  } catch (e) { console.error('scenes.js', e.message); }
  const scenes = (sandbox.COURSE && sandbox.COURSE.scenes) || {};
  for (const [name, fn] of Object.entries(jobs)) {
    if (!fn || (want.length && !want.includes(name))) continue;
    const svg = fn();
    fs.writeFileSync(path.join(ART, name + '.svg'), svg);
    await page.setContent(`<html><body style="margin:0">${svg}</body></html>`);
    await page.screenshot({ path: path.join(OUT, name + '.png') });
    const key = name.replace('scene-', '');
    const sc = scenes[key];
    if (sc) {
      const boxes = (sc.hazards || []).map(h => `<div style="position:absolute;left:${h.x}%;top:${h.y}%;width:${h.w}%;height:${h.h}%;border:3px solid red;background:rgba(255,0,0,.12)"><span style="background:red;color:#fff;font:12px Arial;padding:1px 3px">${h.id}</span></div>`).join('')
        + (sc.decoys || []).map(h => `<div style="position:absolute;left:${h.x}%;top:${h.y}%;width:${h.w}%;height:${h.h}%;border:3px dashed #0a0;background:rgba(0,160,0,.12)"><span style="background:#0a0;color:#fff;font:12px Arial;padding:1px 3px">${h.id}</span></div>`).join('');
      await page.setContent(`<html><body style="margin:0"><div style="position:relative;width:1600px;height:900px">${svg}<div style="position:absolute;inset:0">${boxes}</div></div></body></html>`);
      await page.screenshot({ path: path.join(OUT, name + '-debug.png') });
    }
    console.log('built', name, (svg.length / 1024).toFixed(1) + ' KB');
  }
  await browser.close();
})();
