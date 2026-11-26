#!/usr/bin/env node
/* Screenshots of chosen routes (optionally scrolled to a block type) for visual QA.
   Usage: node tools/shots.js <outdir> route[@blocktype][:phone|:dark] ...  (server on :8199) */
'use strict';
const path = require('path'); const fs = require('fs');
const { chromium } = require('playwright');
const [out, ...routes] = process.argv.slice(2);
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  for (const spec of routes) {
    const [rt, mode] = spec.split(':'); const [route, type] = rt.split('@');
    const phone = mode === 'phone';
    const ctx = await b.newContext({ viewport: phone ? { width: 390, height: 844 } : { width: 1280, height: 860 }, colorScheme: mode === 'dark' || phone ? 'dark' : 'light' });
    const p = await ctx.newPage();
    await p.route('**/js/config.js', r => r.fulfill({ contentType: 'text/javascript', body: "window.FP_CONFIG={videoMode:'embed',reviewMode:true,sequential:false,narration:true,brand:{name:'UPCHURCH',tagline:'Safety Training',logo:null}};" }));
    await p.goto('http://127.0.0.1:8199/index.html#' + route, { waitUntil: 'networkidle' });
    await p.waitForTimeout(500);
    if (type) await p.evaluate(t => { const el = document.querySelector('.blk--' + t); if (el) el.scrollIntoView({ block: 'start' }); window.scrollBy(0, -70); }, type);
    await p.waitForTimeout(400);
    await p.screenshot({ path: path.join(out, spec.replace(/[^a-z0-9-]+/gi, '_') + '.png') });
    await ctx.close();
  }
  await b.close();
})();
