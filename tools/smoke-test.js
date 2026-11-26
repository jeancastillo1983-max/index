#!/usr/bin/env node
/* Integration smoke test: loads every lesson, knowledge check and the special routes in
   review mode, at desktop and phone width; reports console errors, page errors, missing
   blocks, failed requests and horizontal overflow. Screenshots go to dist/smoke/.
   Usage: node tools/smoke-test.js [--shots] [m3 m5 ...]                                   */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const { chromium } = require('playwright');
const { loadCourse } = require('./load-content');

const ROOT = path.resolve(__dirname, '..');
const CD = path.join(ROOT, 'fall-protection-cp');
const SHOTS = path.join(ROOT, 'dist', 'smoke');
const args = process.argv.slice(2);
const wantShots = args.includes('--shots');
const only = args.filter(a => !a.startsWith('--'));
const { COURSE } = loadCourse({ quiet: true });

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2', '.json': 'application/json', '.pdf': 'application/pdf' };
const server = http.createServer((req, res) => {
  const u = decodeURIComponent(req.url.split('?')[0].split('#')[0]);
  let p = path.join(CD, u === '/' ? 'index.html' : u);
  if (u === '/js/config.js') { res.writeHead(200, { 'content-type': 'text/javascript' }); return res.end("window.FP_CONFIG={videoMode:'embed',reviewMode:true,sequential:false,narration:true,brand:{name:'UPCHURCH',tagline:'Safety Training',logo:null}};"); }
  if (!p.startsWith(CD) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end('nf'); }
  res.writeHead(200, { 'content-type': TYPES[path.extname(p)] || 'application/octet-stream' });
  fs.createReadStream(p).pipe(res);
});

(async () => {
  await new Promise(r => server.listen(0, r));
  const base = `http://127.0.0.1:${server.address().port}/`;
  if (wantShots) fs.mkdirSync(SHOTS, { recursive: true });
  const browser = await chromium.launch();
  const routes = [];
  COURSE.modules.forEach(m => {
    if (only.length && !only.includes(m.id)) return;
    routes.push(`#${m.id}`);
    m.lessons.forEach(l => routes.push(`#${l.id}`));
    if (m.kc) routes.push(`#${m.id}-kc`);
  });
  if (!only.length) routes.unshift('#home'), routes.push('#exam', '#certificate', '#verification', '#resources', '#credits');
  const problems = [];
  for (const vp of [{ name: 'desktop', width: 1280, height: 900 }, { name: 'phone', width: 390, height: 844 }]) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, colorScheme: vp.name === 'phone' ? 'dark' : 'light' });
    const page = await ctx.newPage();
    let errs = [];
    page.on('console', msg => { if (msg.type() === 'error') errs.push('console: ' + msg.text()); });
    page.on('pageerror', e => errs.push('pageerror: ' + e.message));
    page.on('requestfailed', r => errs.push('requestfailed: ' + r.url().replace(base, '')));
    page.on('response', r => { if (r.status() >= 400 && !/youtube|ytimg|fonts\.g/.test(r.url())) errs.push(`HTTP ${r.status()}: ${r.url().replace(base, '')}`); });
    await page.goto(base + 'index.html#home', { waitUntil: 'networkidle' });
    for (const r of routes) {
      errs = [];
      await page.evaluate(h => { location.hash = h; }, r);
      await page.waitForTimeout(350);
      await page.waitForLoadState('networkidle').catch(() => {});
      const info = await page.evaluate(() => ({
        missing: Array.from(document.querySelectorAll('.blk-missing')).map(e => e.textContent.trim()),
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        blocks: document.querySelectorAll('.blk').length,
        text: (document.querySelector('main') || document.body).innerText.length,
        brokenImgs: Array.from(document.images).filter(i => i.complete && i.naturalWidth === 0 && i.src && !/ytimg/.test(i.src)).map(i => i.getAttribute('src'))
      }));
      const issues = [];
      if (errs.length) issues.push(...errs.slice(0, 6));
      if (info.missing.length) issues.push('missing blocks: ' + info.missing.join(' | '));
      if (info.overflow > 1) issues.push(`horizontal overflow ${info.overflow}px`);
      if (info.brokenImgs.length) issues.push('broken images: ' + info.brokenImgs.join(', '));
      if (info.text < 80) issues.push(`almost no text rendered (${info.text} chars)`);
      if (issues.length) problems.push(`[${vp.name}] ${r} (${info.blocks} blocks)\n    ` + issues.join('\n    '));
      if (wantShots && vp.name === 'desktop') await page.screenshot({ path: path.join(SHOTS, r.slice(1) + '.png'), fullPage: false });
    }
    await ctx.close();
  }
  await browser.close();
  server.close();
  console.log(`checked ${routes.length} routes × 2 viewports`);
  if (problems.length) { console.log(`\n${problems.length} route(s) with issues:\n` + problems.join('\n')); process.exitCode = 1; }
  else console.log('OK — no console errors, missing blocks, broken images or overflow');
})().catch(e => { console.error(e); server.close(); process.exit(1); });
