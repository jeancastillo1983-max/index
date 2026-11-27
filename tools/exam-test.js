#!/usr/bin/env node
/* Functional exam test through the real UI.
   node tools/exam-test.js pass|fail [screenshot.png]   (course served on :8199)
   pass: answers every question correctly (mc, multi, numeric, sequence, hotspot) and expects a pass.
   fail: picks the first option everywhere and expects a fail + review flags.                        */
'use strict';
const { chromium } = require('playwright');
const mode = process.argv[2] || 'pass';
const strip = s => String(s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.route('**/js/config.js', r => r.fulfill({ contentType: 'text/javascript', body: "window.FP_CONFIG={reviewMode:true,sequential:false,brand:{name:'Upchurch',tagline:'Safety Training',logo:'assets/img/upchurch-logo.png',logoDark:'assets/img/upchurch-logo-white.png'}};" }));
  await p.goto('http://127.0.0.1:8199/index.html#exam', { waitUntil: 'networkidle' });
  await p.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await p.reload({ waitUntil: 'networkidle' });
  await p.click('.exam-actions .btn-primary');
  const stats = { mc: 0, multi: 0, numeric: 0, sequence: 0, hotspot: 0, unmatched: 0 };
  for (let i = 0; i < 40; i++) {
    const stem = strip(await p.locator('.exam-stem').innerText());
    const shown = (await p.locator('.exam-answer .opt-text').allInnerTexts()).map(strip);
    const info = await p.evaluate(([stem, shown]) => {
      const S = s => FP.strip(String(s || '')).replace(/\s+/g, ' ').trim();
      for (const sl of COURSE.exam.slots) for (const q of sl.pool) if (S(q.stem) === stem && (!shown.length || (q.options || []).every(o => shown.includes(S(o.text))))) {
        let regions = null;
        if (q.type === 'hotspot') { const sc = COURSE.scenes[q.scene]; const all = sc.hazards.concat(sc.decoys || []); regions = (q.regions ? all.filter(r => q.regions.includes(r.id)) : all).slice().sort((a, b) => (a.y + a.h / 2) - (b.y + b.h / 2) || (a.x - b.x)).map(r => r.id); }
        return { type: q.type, correct: (q.options || []).filter(o => o.correct).map(o => S(o.text)), answer: q.answer, items: (q.items || []).map(S), hot: q.correct || [], regions };
      }
      return null;
    }, [stem, shown]);
    if (!info) { stats.unmatched++; }
    else {
      stats[info.type] = (stats[info.type] || 0) + 1;
      if (info.type === 'mc' || info.type === 'multi') {
        const opts = p.locator('.exam-answer .opt');
        const n = await opts.count();
        for (let k = 0; k < n; k++) {
          const t = strip(await opts.nth(k).locator('.opt-text').innerText());
          if (mode === 'pass' ? info.correct.includes(t) : k === 0) await opts.nth(k).click();
        }
      } else if (info.type === 'numeric') {
        await p.fill('.field-num', String(mode === 'pass' ? info.answer : 1));
      } else if (info.type === 'sequence') {
        if (mode === 'pass') {
          for (let target = 0; target < info.items.length; target++) {
            let cur = (await p.locator('.seq-t').allInnerTexts()).map(strip).indexOf(info.items[target]);
            while (cur > target) { await p.locator('.seq-item').nth(cur).locator('button[aria-label="Move up"]').click(); cur--; }
          }
        }
        await p.locator('.exam-answer .btn-link').click();
      } else if (info.type === 'hotspot') {
        const marks = p.locator('.hs-pick');
        if (mode === 'pass') { for (const id of info.hot) { const k = info.regions.indexOf(id); if (k >= 0) await marks.nth(k).click(); } }
        else await marks.nth(0).click();
      }
    }
    const next = p.locator('.exam-nav .btn-primary');
    await next.click();
  }
  await p.locator('button:has-text("Submit attempt")').click();
  await p.waitForTimeout(400);
  const wrong = await p.evaluate(() => Array.from(document.querySelectorAll('.rv-item')).filter(e => !/is-ok|is-right|is-good/.test((e.querySelector('.rv-ico')||{}).className||'')).concat([]).map(e => e.innerText.replace(/\s+/g, ' ').slice(0, 160)));
  if (mode === 'pass' && wrong.length) console.log('WRONG:\n  ' + wrong.join('\n  '));
  const result = await p.evaluate(() => ({ score: (document.querySelector('.result-score b') || {}).textContent, head: (document.querySelector('.result-hero .h2') || {}).textContent, flags: document.querySelectorAll('.badge-review, .is-review, [data-review]').length }));
  if (process.argv[3]) await p.screenshot({ path: process.argv[3], fullPage: false });
  console.log(mode, JSON.stringify(stats), JSON.stringify(result), 'errors:', errs.length ? errs.slice(0, 4) : 'none');
  await b.close();
  const ok = mode === 'pass' ? /Passed/.test(result.head || '') : /Not this time/.test(result.head || '');
  process.exitCode = ok && !errs.length && !stats.unmatched ? 0 : 1;
})().catch(e => { console.error(e.message); process.exit(1); });
