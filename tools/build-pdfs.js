#!/usr/bin/env node
/* Prints every job aid HTML page to PDF (US Letter) with Playwright's Chromium.
   Output: fall-protection-cp/jobaids/pdf/<name>.pdf and deliverables/job-aids/<name>.pdf */
'use strict';
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'fall-protection-cp', 'jobaids');
const OUT = path.join(SRC, 'pdf');
const DELIV = path.join(ROOT, 'deliverables', 'job-aids');

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  fs.mkdirSync(DELIV, { recursive: true });
  const pages = fs.readdirSync(SRC).filter(f => f.endsWith('.html')).sort();
  const browser = await chromium.launch();
  const ctx = await browser.newContext();
  for (const f of pages) {
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('file://' + path.join(SRC, f), { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    const name = f.replace(/\.html$/, '.pdf');
    await page.pdf({ path: path.join(OUT, name), format: 'Letter', printBackground: true, preferCSSPageSize: true,
                     margin: { top: '0.5in', bottom: '0.5in', left: '0.5in', right: '0.5in' } });
    fs.copyFileSync(path.join(OUT, name), path.join(DELIV, name));
    console.log(`${name}${errors.length ? '  (page errors: ' + errors.join('; ') + ')' : ''}`);
    await page.close();
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
