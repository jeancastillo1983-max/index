#!/usr/bin/env node
/* Facilitator / review decks (.pptx), one per module, generated from the course content.
   Branching is shown as decision slides; answers, feedback and narration live in speaker notes.
   Prereq: node tools/render-art.js (PNG versions of SVG art, avatars and scene reveals).
   Output: deliverables/powerpoint/FPCP_M<n>_<slug>.pptx                                    */
'use strict';
const fs = require('fs');
const path = require('path');
const pptxgen = require('pptxgenjs');
const sizeOf = require('image-size').imageSize || require('image-size');
const { loadCourse } = require('./load-content');

const ROOT = path.resolve(__dirname, '..');
const PF = require('./profile');
const CD = PF.COURSE_DIR;
const PNG = path.join(PF.DIST, 'png');
const OUTDIR = path.join(PF.DELIV, 'powerpoint');
const LOGO = path.join(CD, 'assets', 'img', 'upchurch-logo.png'), LOGO_W = path.join(CD, 'assets', 'img', 'upchurch-logo-white.png');
const LOGO_AR = 314 / 70;
const { COURSE, FP } = loadCourse({ quiet: true });
let applyTheme = null;
try { applyTheme = require('/root/.claude/skills/synced/7188c531-f13d-41cb-aa3e-e251cd17c622_960771d7-669e-4856-ab27-fc22c257c366/pptx/scripts/apply_theme.js').applyTheme; } catch (e) { /* optional */ }

const THEME = {
  name: `Upchurch ${PF.SHORT}`,
  headFontFace: 'Arial', bodyFontFace: 'Calibri',
  colors: { dk1: '14202B', lt1: 'FFFFFF', dk2: '10161C', lt2: 'EEF1F3', accent1: '0074E4', accent2: 'FFC629', accent3: '1F5FAE', accent4: '008200', accent5: 'C23A2E', accent6: 'A86A00', hlink: '1F5FAE', folHlink: '4F5D6A' }
};
const HEX = { ink: '14202B', navy: '10161C', soft: 'EEF1F3', orange: '0074E4', caution: 'FFC629', blue: '1F5FAE', good: '008200', bad: 'C23A2E', amber: 'A86A00', muted: '4F5D6A', line: 'C9D2DA', white: 'FFFFFF', blueSoft: 'E2ECF8' };
const W = 13.333, H = 7.5, M = 0.55;

const strip = s => FP.strip(Array.isArray(s) ? s.join(' ') : s);
const paras = b => (Array.isArray(b) ? b : String(b || '').split(/\n\n+/)).filter(Boolean).map(x => FP.strip(x));
const clip = (s, n) => { s = strip(s); return s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…' : s; };
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
const exists = p => p && fs.existsSync(p);
function mediaPath(id) { const m = FP.media(id); if (!m || m.type !== 'image') return null; if (/\.svg$/i.test(m.src)) { const j = path.join(PF.DIST, 'deck', 'art-' + path.basename(m.src).replace(/\.svg$/i, '.jpg')); if (exists(j)) return j; const p = path.join(PNG, 'art', path.basename(m.src).replace(/\.svg$/i, '.png')); return exists(p) ? p : null; } return exists(path.join(CD, m.src)) ? path.join(CD, m.src) : null; }
function artPng(src) { if (!src) return null; const bn = path.basename(src).replace(/\.svg$/, ''); const sj = path.join(PF.DIST, 'deck', bn.replace(/^scene-/, '') + '.jpg'), aj = path.join(PF.DIST, 'deck', 'art-' + bn + '.jpg'); if (/^scene-/.test(bn) && exists(sj)) return sj; if (/\.svg$/.test(src) && exists(aj)) return aj; const p = path.join(PNG, 'art', path.basename(src).replace(/\.svg$/, '.png')); return exists(p) ? p : (/\.(png|jpe?g)$/i.test(src) && exists(path.join(CD, src)) ? path.join(CD, src) : null); }
function avatarPng(id) { const p = path.join(PNG, 'avatars', `${id}.png`); return exists(p) ? p : null; }
function posterPath(id) { const m = FP.media(id); return m && m.poster && exists(path.join(CD, m.poster)) ? path.join(CD, m.poster) : null; }

/* Image placed to cover / contain a box, aspect kept */
function addImg(slide, file, x, y, w, h, mode = 'cover', extra = {}) {
  let iw = 16, ih = 9;
  try { const d = sizeOf(fs.readFileSync(file)); iw = d.width; ih = d.height; } catch (e) { /* default */ }
  if (mode === 'contain') {
    const s = Math.min(w / iw, h / ih); const dw = iw * s, dh = ih * s;
    slide.addImage(Object.assign({ path: file, x: x + (w - dw) / 2, y: y + (h - dh) / 2, w: dw, h: dh }, extra));
  } else {
    slide.addImage(Object.assign({ path: file, x, y, w: iw / 100, h: ih / 100, sizing: { type: 'cover', w, h } }, extra));
  }
}

function buildDeck(mod) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE';
  pres.author = 'Upchurch Training';
  pres.company = 'Upchurch';
  pres.title = `Module ${mod.num}: ${mod.title}`;
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  const C = pres.SchemeColor;

  const footerLogo = dark => ({ image: { path: dark ? LOGO_W : LOGO, x: M, y: H - 0.44, w: 0.26 * LOGO_AR, h: 0.26 } });
  const footer = (dark) => ({ text: { text: COURSE.meta.title, options: { x: M + 0.26 * LOGO_AR + 0.2, y: H - 0.42, w: 6, h: 0.3, fontSize: 10, color: dark ? 'B8C4CF' : HEX.muted, charSpacing: 1, isTextBox: true, margin: 0 } } });
  const slideNum = dark => ({ x: W - 1.0, y: H - 0.42, w: 0.6, h: 0.3, fontSize: 10, color: dark ? 'B8C4CF' : HEX.muted, align: 'right' });

  pres.defineSlideMaster({ title: 'FP_TITLE', background: { color: HEX.navy }, objects: [
    { image: { path: LOGO_W, x: M, y: 0.55, w: 0.5 * LOGO_AR, h: 0.5 } },
    { placeholder: { options: { name: 'title', type: 'title', x: M, y: 2.2, w: 8.2, h: 2.2, fontSize: 44, bold: true, color: C.background1, valign: 'bottom', align: 'left', fontFace: 'Arial' }, text: '' } },
    { placeholder: { options: { name: 'body', type: 'body', x: M, y: 4.55, w: 8.2, h: 1.6, fontSize: 18, color: 'CFDAE4', valign: 'top', align: 'left' }, text: '' } }
  ] });
  pres.defineSlideMaster({ title: 'FP_CONTENT', background: { color: HEX.white }, objects: [
    footerLogo(false), footer(false), { placeholder: { options: { name: 'title', type: 'title', x: M, y: 0.38, w: W - 2 * M, h: 0.9, fontSize: 30, bold: true, color: C.text2, valign: 'middle', align: 'left', fontFace: 'Arial' }, text: '' } }
  ], slideNumber: slideNum(false) });
  pres.defineSlideMaster({ title: 'FP_DARK', background: { color: HEX.navy }, objects: [
    footerLogo(true), footer(true), { placeholder: { options: { name: 'title', type: 'title', x: M, y: 0.38, w: W - 2 * M, h: 0.9, fontSize: 30, bold: true, color: C.background1, valign: 'middle', align: 'left', fontFace: 'Arial' }, text: '' } }
  ], slideNumber: slideNum(true) });
  pres.defineSlideMaster({ title: 'FP_SECTION', background: { color: '0B0F14' }, objects: [
    footerLogo(true), footer(true), { placeholder: { options: { name: 'title', type: 'title', x: M, y: 2.0, w: 8.6, h: 1.6, fontSize: 40, bold: true, color: C.background1, valign: 'bottom', align: 'left', fontFace: 'Arial' }, text: '' } },
    { placeholder: { options: { name: 'body', type: 'body', x: M, y: 3.75, w: 8.6, h: 2.6, fontSize: 16, color: 'CFDAE4', valign: 'top', align: 'left' }, text: '' } }
  ], slideNumber: slideNum(true) });

  let section = 'Module';
  const declared = new Set();
  const add = (master, title, notes) => {
    if (!declared.has(section)) { pres.addSection({ title: section }); declared.add(section); }
    const s = pres.addSlide({ masterName: master, sectionTitle: section });
    if (title) s.addText(title, { placeholder: 'title' });
    if (notes) s.addNotes(notes);
    return s;
  };
  const text = (s, t, o) => s.addText(t, Object.assign({ isTextBox: true, fontFace: 'Calibri', color: HEX.ink, fontSize: 16, valign: 'top', margin: 0.05 }, o));
  const card = (s, x, y, w, h, fill = HEX.soft) => s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: fill }, line: { color: fill }, rectRadius: 0.08 });
  const circleIcon = (s, x, y, d, label, fill = HEX.orange) => { s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { color: fill } }); text(s, label, { x, y, w: d, h: d, align: 'center', valign: 'middle', fontSize: d * 22, bold: true, color: HEX.white, fontFace: 'Arial' }); };
  const citeChip = (s, cite, x, y) => { if (!cite) return; const w = Math.min(5, 0.6 + String(cite).length * 0.09); s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h: 0.34, fill: { color: HEX.blueSoft }, line: { color: HEX.blueSoft }, rectRadius: 0.05 }); text(s, cite, { x: x + 0.08, y, w: w - 0.1, h: 0.34, fontSize: 11, color: HEX.blue, fontFace: 'Courier New', bold: true, valign: 'middle' }); };
  const avatar = (s, id, x, y, d) => { const p = avatarPng(id); if (p) s.addImage({ path: p, x, y, w: d, h: d, rounding: true }); else circleIcon(s, x, y, d, (FP.char(id).name || '?')[0], HEX.navy); };
  const bulletsRuns = (list, size = 16, color = HEX.ink) => list.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < list.length - 1, paraSpaceAfter: 6, fontSize: size, color } }));
  const notesOf = (b, extra) => [b.narration ? 'NARRATION: ' + strip(b.narration) : '', extra || ''].filter(Boolean).join('\n\n');
  // Photo pool for text-only slides: this module's photos first, then course-wide ones (rotated, no repeats back to back)
  const pool = [];
  const pushPool = id => { const p = mediaPath(id); if (p && !pool.includes(p)) pool.push(p); };
  pushPool(mod.hero);
  mod.lessons.forEach(l => l.blocks.forEach(b => { if (b.media) pushPool(b.media); }));
  const own = pool.length;
  Object.keys(COURSE.media || {}).filter(k => /^img_/.test(k) && !/hero$/.test(k)).forEach(pushPool);
  let poolI = 0;
  const nextPhoto = () => pool.length ? pool[(poolI++) % Math.max(1, Math.min(pool.length, own + 6))] : null;
  const right = (s, b, allowPool) => { // right-hand visual for statement slides
    const img = mediaPath(b.media) || artPng(b.src) || (allowPool ? nextPhoto() : null);
    if (img) { addImg(s, img, 7.7, 1.45, W - 7.7 - M, 5.2, b.src ? 'contain' : 'cover'); return true; }
    return false;
  };

  /* ---------- title + module divider ---------- */
  const t = add('FP_TITLE');
  t.addText(mod.num === 0 ? COURSE.meta.title : `Module ${mod.num}`, { placeholder: 'title' });
  t.addText(mod.num === 0 ? COURSE.meta.subtitle : mod.title, { placeholder: 'body' });
  const heroImg = mediaPath(mod.hero) || mediaPath('img_course_hero');
  if (heroImg) addImg(t, heroImg, 9.0, 0, W - 9.0, H, 'cover');
  t.addNotes(`Facilitator version of Module ${mod.num} (${mod.minutes} min online). Same content as the Rise/Storyline build; decision slides stand in for branching. Ask the room before you advance any decision slide.`);

  section = 'Overview';
  const ov = add('FP_SECTION', mod.title, `Objectives for Module ${mod.num}. Read them aloud, then ask: which of these do you already do on your site?`);
  ov.addText(bulletsRuns((mod.objectives || []).map(o => FP.strip(o)), 16, 'E3EAF0'), { placeholder: 'body' });
  text(ov, String(mod.num), { x: 9.6, y: 1.2, w: 3.2, h: 3.6, fontSize: 200, bold: true, color: HEX.orange, align: 'center', fontFace: 'Arial', valign: 'middle' });
  text(ov, `${mod.minutes} MIN  ·  ${(mod.build || '').toUpperCase()}`, { x: 9.6, y: 4.9, w: 3.2, h: 0.4, fontSize: 13, color: 'B8C4CF', align: 'center', charSpacing: 2 });

  /* ---------- blocks ---------- */
  const render = (b) => {
    switch (b.type) {
      case 'hero': {
        const s = add('FP_DARK', b.title, notesOf(b));
        if (b.kicker) text(s, b.kicker.toUpperCase(), { x: M, y: 1.35, w: 6.5, h: 0.4, fontSize: 13, color: HEX.orange, bold: true, charSpacing: 2 });
        if (b.text) text(s, strip(b.text), { x: M, y: 1.9, w: 6.6, h: 3.5, fontSize: 22, color: 'E3EAF0' });
        const img = mediaPath(b.media);
        if (img) addImg(s, img, 7.6, 1.45, W - 7.6 - M, 5.2, 'cover');
        break;
      }
      case 'text': case 'callout': {
        const isCall = b.type === 'callout';
        const label = isCall ? ({ 'field-check': 'FIELD CHECK — ASK THE ROOM', receipt: 'THE RECEIPT', warning: 'WATCH OUT', tip: 'FIELD TIP', skip: 'YOU PROBABLY KNOW THIS', note: 'NOTE', monday: 'USE IT MONDAY' }[b.variant] || 'NOTE') : null;
        const s = add('FP_CONTENT', b.heading || b.title || (isCall ? label : ''), notesOf(b, isCall && b.variant === 'field-check' ? 'FACILITATE: take two or three answers from the room before moving on.' : ''));
        const hasImg = right(s, b, true);
        const w = hasImg ? 6.6 : W - 2 * M;
        let y = 1.5;
        const bodyP = paras(b.body), chars = bodyP.join(' ').length;
        const estH = Math.min(4.2, Math.ceil(chars / ((w - 0.6) * 8.5)) * 0.42 + bodyP.length * 0.17 + 0.2);
        if (isCall) {
          const ch = Math.min(4.9, estH + 0.75 + (b.cite ? 0.6 : 0.25));
          card(s, M, y, w, ch, b.variant === 'warning' ? 'E1EEFF' : b.variant === 'monday' ? 'DFF3DF' : HEX.soft);
          text(s, label, { x: M + 0.3, y: y + 0.25, w: w - 0.6, h: 0.4, fontSize: 13, bold: true, color: HEX.orange, charSpacing: 2 });
          if (b.cite) citeChip(s, b.cite, M + 0.3, y + ch - 0.5);
          y += 0.75;
        }
        text(s, bodyP.map((p, i, a) => ({ text: p, options: { breakLine: i < a.length - 1, paraSpaceAfter: 12 } })), { x: M + (isCall ? 0.3 : 0), y, w: w - (isCall ? 0.6 : 0), h: isCall ? estH : 4.2, fontSize: 20 });
        if (b.cite && !isCall) citeChip(s, b.cite, M, 6.15);
        break;
      }
      case 'quote': {
        const s = add('FP_CONTENT', null, notesOf(b));
        avatar(s, b.speaker, 1.0, 1.6, 3.4);
        text(s, `“${strip(b.text)}”`, { x: 5.0, y: 1.4, w: 7.6, h: 3.6, fontSize: 32, italic: true, color: HEX.navy, valign: 'middle', fontFace: 'Arial' });
        const c = FP.char(b.speaker);
        text(s, `${c.name.toUpperCase()}  ·  ${c.role}`, { x: 5.0, y: 5.2, w: 7.6, h: 0.5, fontSize: 15, bold: true, color: HEX.orange, charSpacing: 1 });
        break;
      }
      case 'dialogue': {
        const chunks = []; for (let i = 0; i < b.lines.length; i += 5) chunks.push(b.lines.slice(i, i + 5));
        chunks.forEach((lines, ci) => {
          const s = add('FP_CONTENT', (b.title || 'On the deck') + (chunks.length > 1 ? ` (${ci + 1}/${chunks.length})` : ''), notesOf(ci === 0 ? b : {}, 'FACILITATE: read the lines aloud with two volunteers. Ask: what would you say next?'));
          lines.forEach((l, i) => {
            const y = 1.45 + i * 1.08, left = i % 2 === 0;
            avatar(s, l.speaker, left ? M : W - M - 0.8, y, 0.8);
            card(s, left ? M + 1.0 : M + 2.2, y, W - 2 * M - 3.2, 0.9, left ? HEX.soft : 'E1EEFF');
            text(s, [{ text: FP.char(l.speaker).name + ': ', options: { bold: true, color: HEX.navy } }, { text: clip(l.text, 170) }], { x: (left ? M + 1.0 : M + 2.2) + 0.2, y, w: W - 2 * M - 3.6, h: 0.9, fontSize: 15, valign: 'middle' });
          });
        });
        break;
      }
      case 'image': case 'art': {
        const img = b.type === 'image' ? mediaPath(b.media) : artPng(b.src);
        if (!img) break;
        const m = FP.media(b.media);
        const s = add('FP_CONTENT', b.caption ? clip(b.caption, 80) : (m ? clip(m.alt, 80) : b.alt ? clip(b.alt, 80) : ''), notesOf(b, m ? `Image: ${m.credit} (${m.license})` : ''));
        addImg(s, img, M, 1.4, W - 2 * M, 5.35, b.type === 'art' ? 'contain' : 'cover');
        if (m && m.credit) text(s, m.credit + (m.license ? ' · ' + m.license : ''), { x: M, y: 6.78, w: 9, h: 0.25, fontSize: 9, color: HEX.muted });
        break;
      }
      case 'video': {
        const m = FP.media(b.media); if (!m) break;
        const s = add('FP_DARK', 'Watch: ' + clip(m.title, 70), notesOf(b, `Play from: ${m.url}${m.duration ? ' (' + m.duration + ')' : ''}. Watch for: ${strip(b.watchFor || m.why || '').replace(/^watch for:?\s*/i, '')}`));
        const p = posterPath(b.media);
        if (p) { addImg(s, p, M, 1.45, 7.6, 4.275, 'cover', { hyperlink: { url: m.url, tooltip: 'Open on YouTube' } }); s.addShape(pres.shapes.OVAL, { x: M + 3.3, y: 3.08, w: 1.0, h: 1.0, fill: { color: HEX.orange }, line: { color: HEX.white, width: 2 } }); s.addShape(pres.shapes.RIGHT_TRIANGLE, { x: M + 3.66, y: 3.33, w: 0.4, h: 0.5, rotate: 90, fill: { color: HEX.white }, line: { color: HEX.white } }); }
        text(s, [{ text: (m.channel || '') + (m.duration ? '  ·  ' + m.duration : ''), options: { breakLine: true, color: HEX.orange, bold: true, fontSize: 14 } }, { text: 'Watch for: ' + strip(b.watchFor || m.why || '').replace(/^watch for:?\s*/i, ''), options: { fontSize: 18, color: 'E3EAF0' } }], { x: 8.5, y: 1.5, w: 4.3, h: 3.6 });
        text(s, [{ text: 'Open on YouTube', options: { hyperlink: { url: m.url }, color: HEX.caution, fontSize: 14 } }], { x: 8.5, y: 5.3, w: 4.3, h: 0.4 });
        break;
      }
      case 'stats': {
        const s = add('FP_CONTENT', 'The numbers', notesOf(b, (b.items || []).map(i => `${i.value}: ${i.label} — ${i.source}`).join('\n')));
        const n = b.items.length, gw = (W - 2 * M - (n - 1) * 0.35) / n;
        b.items.forEach((it, i) => { const x = M + i * (gw + 0.35); card(s, x, 1.55, gw, 3.9); text(s, String(it.value), { x: x + 0.25, y: 1.75, w: gw - 0.5, h: 1.4, fontSize: String(it.value).length > 6 ? 36 : String(it.value).length > 4 ? 46 : 60, bold: true, color: HEX.orange, fontFace: 'Arial' }); text(s, FP.strip(it.label), { x: x + 0.25, y: 3.2, w: gw - 0.5, h: 1.5, fontSize: 16 }); text(s, FP.strip(it.source || ''), { x: x + 0.25, y: 4.7, w: gw - 0.5, h: 0.6, fontSize: 10, color: HEX.muted }); });
        if (b.note) text(s, strip(b.note), { x: M, y: 5.7, w: W - 2 * M, h: 0.9, fontSize: 16, italic: true, color: HEX.navy });
        break;
      }
      case 'cards': {
        const cards = b.cards; const per = 4;
        for (let i = 0; i < cards.length; i += per) {
          const set = cards.slice(i, i + per);
          const q = add('FP_CONTENT', b.mode === 'myth' ? 'Myth or field truth?' : (b.title || 'Flip it'), 'FACILITATE: read each card. Hands up for myth, hands down for field truth. Then advance for the answers.\n\n' + set.map(c => `${strip(c.front)} → ${c.verdict ? c.verdict.toUpperCase() + ': ' : ''}${strip(c.back)}`).join('\n'));
          const a = add('FP_CONTENT', b.mode === 'myth' ? 'Myth or field truth: the answers' : (b.title || 'Flip it') + ': answers', notesOf(i === 0 ? b : {}));
          set.forEach((c, j) => {
            const x = M + (j % 2) * 6.2, y = 1.5 + Math.floor(j / 2) * 2.6;
            card(q, x, y, 5.95, 2.35); text(q, `“${strip(c.front)}”`, { x: x + 0.3, y: y + 0.2, w: 5.35, h: 1.95, fontSize: 20, bold: true, color: HEX.navy, valign: 'middle' });
            const myth = c.verdict === 'myth';
            card(a, x, y, 5.95, 2.35, c.verdict ? (myth ? 'FBE1DE' : 'DFF3DF') : HEX.soft);
            text(a, [{ text: (c.verdict ? c.verdict.toUpperCase() : 'ANSWER') + '  ', options: { bold: true, color: myth ? HEX.bad : HEX.good, fontSize: 14 } }, { text: clip(c.front, 70), options: { bold: true, fontSize: 14, color: HEX.navy, breakLine: true } }, { text: clip(c.back, 210), options: { fontSize: 14 } }], { x: x + 0.3, y: y + 0.15, w: 5.35, h: 2.05 });
          });
        }
        break;
      }
      case 'accordion': case 'tabs': case 'timeline': case 'process': {
        const items = b.type === 'process' ? b.steps : b.items;
        const per = b.type === 'process' ? 4 : 4;
        for (let i = 0; i < items.length; i += per) {
          const set = items.slice(i, i + per);
          const s = add('FP_CONTENT', (b.title || b.heading || ({ process: 'Step by step', timeline: 'How it unfolded', tabs: 'Side by side', accordion: 'Break it down' })[b.type]) + (items.length > per ? ` (${i / per + 1}/${Math.ceil(items.length / per)})` : ''), notesOf(i === 0 ? b : {}, set.map(x => `${x.label ? x.label + ' — ' : ''}${x.title}: ${strip(x.body)}`).join('\n')));
          const n = set.length, gw = (W - 2 * M - (n - 1) * 0.3) / n;
          set.forEach((it, j) => {
            const x = M + j * (gw + 0.3);
            card(s, x, 1.55, gw, 5.0);
            circleIcon(s, x + 0.25, 1.8, 0.6, b.type === 'timeline' ? '•' : String(i + j + 1), b.type === 'tabs' || b.type === 'accordion' ? HEX.navy : HEX.orange);
            if (it.label) text(s, FP.strip(it.label).toUpperCase(), { x: x + 1.0, y: 1.85, w: gw - 1.2, h: 0.5, fontSize: 12, bold: true, color: HEX.orange });
            const tl = FP.strip(it.title).length, tlong = tl > gw * 9;
            text(s, FP.strip(it.title), { x: x + 0.25, y: 2.55, w: gw - 0.5, h: tlong ? 1.2 : 0.9, fontSize: tlong ? 15 : 18, bold: true, color: HEX.navy, fontFace: 'Arial' });
            text(s, clip(it.body, n >= 4 ? (tlong ? 170 : 200) : 330), { x: x + 0.25, y: tlong ? 3.8 : 3.45, w: gw - 0.5, h: tlong ? 2.65 : 3.0, fontSize: n >= 4 ? 14 : 15 });
          });
        }
        break;
      }
      case 'labeled': {
        const img = artPng(b.src) || mediaPath(b.media); if (!img) break;
        const s = add('FP_CONTENT', b.title || clip(b.alt || 'Take a closer look', 70), notesOf(b, b.markers.map((m, i) => `${i + 1}. ${m.title}: ${strip(m.body)}`).join('\n')));
        const bw = 7.6, bh = 5.2; addImg(s, img, M, 1.45, bw, bh, 'contain');
        let iw = 16, ih = 9; try { const d = sizeOf(fs.readFileSync(img)); iw = d.width; ih = d.height; } catch (e) { /* */ }
        const sc = Math.min(bw / iw, bh / ih), dw = iw * sc, dh = ih * sc, ox = M + (bw - dw) / 2, oy = 1.45 + (bh - dh) / 2;
        b.markers.forEach((mk, i) => circleIcon(s, ox + dw * mk.x / 100 - 0.2, oy + dh * mk.y / 100 - 0.2, 0.4, String(i + 1)));
        text(s, b.markers.map((mk, i, a) => ({ text: `${i + 1}  ${FP.strip(mk.title)}`, options: { bold: true, breakLine: i < a.length - 1, paraSpaceAfter: 8, color: HEX.navy } })), { x: 8.5, y: 1.5, w: 4.3, h: 5.1, fontSize: 15 });
        break;
      }
      case 'table': {
        const s = add('FP_CONTENT', b.title || 'At a glance', notesOf(b, b.note ? strip(b.note) : ''));
        const rows = [b.headers.map(h => ({ text: FP.strip(h), options: { bold: true, color: HEX.white, fill: { color: HEX.navy }, fontSize: 13 } }))].concat(b.rows.map((r, i) => r.map(c => ({ text: clip(c, 160), options: { fontSize: b.rows.length > 6 ? 11 : 13, fill: { color: i % 2 ? HEX.soft : HEX.white } } }))));
        s.addTable(rows, { x: M, y: 1.45, w: W - 2 * M, colW: b.headers.map(() => (W - 2 * M) / b.headers.length), border: { type: 'solid', color: HEX.line, pt: 0.75 }, fontFace: 'Calibri', color: HEX.ink, valign: 'middle', margin: 0.06 });
        break;
      }
      case 'pyramid': {
        const s = add('FP_CONTENT', b.title || 'Hierarchy of fall protection', notesOf(b, b.levels.map((l, i) => `${i + 1}. ${l.title}: ${strip(l.body)}`).join('\n')));
        const n = b.levels.length, lh = 5.0 / n;
        b.levels.forEach((l, i) => {
          const w = 2.2 + (i + 1) * (5.2 / n), x = M + (7.6 - w) / 2, y = 1.5 + i * lh;
          s.addShape(pres.shapes.TRAPEZOID, { x, y, w, h: lh - 0.08, fill: { color: i === 0 ? HEX.good : i === n - 1 ? HEX.amber : HEX.navy }, line: { color: HEX.white } });
          text(s, FP.strip(l.title), { x, y, w, h: lh - 0.08, align: 'center', valign: 'middle', fontSize: 14, bold: true, color: HEX.white });
          text(s, clip(l.body, 120), { x: 8.4, y, w: 4.4, h: lh - 0.08, fontSize: 12, valign: 'middle' });
        });
        break;
      }
      case 'poll': {
        const s = add('FP_CONTENT', 'Show of hands', notesOf(b, 'FACILITATE: ask for a show of hands for each option, then compare with the peer results.\n' + (b.note ? strip(b.note) : '')));
        text(s, strip(b.question), { x: M, y: 1.45, w: 5.6, h: 3, fontSize: 24, bold: true, color: HEX.navy });
        s.addChart(pres.charts.BAR, [{ name: 'Peers', labels: b.options.map(o => FP.strip(o.label)), values: b.options.map(o => o.pct) }], { x: 6.5, y: 1.4, w: 6.3, h: 5.0, barDir: 'bar', chartColors: [HEX.orange], showValue: true, dataLabelFormatCode: '0"%"', dataLabelPosition: 'outEnd', dataLabelColor: HEX.ink, catAxisLabelColor: HEX.ink, valAxisHidden: true, valGridLine: { style: 'none' }, catGridLine: { style: 'none' }, showLegend: false, showTitle: true, title: 'Peer results (scripted)', titleFontSize: 12, titleColor: HEX.muted, catAxisLabelFontFace: '+mn-lt', dataLabelFontFace: '+mn-lt', titleFontFace: '+mn-lt', valAxisMaxVal: 100 });
        break;
      }
      case 'reflect': case 'commitment': {
        const s = add('FP_DARK', b.type === 'reflect' ? 'Gut check' : (b.title || 'Your commitment'), notesOf(b, 'FACILITATE: one minute of quiet writing. Nobody has to share.'));
        text(s, strip(b.prompt), { x: M, y: 1.8, w: 9.5, h: 3, fontSize: 34, bold: true, color: HEX.white, fontFace: 'Arial' });
        if (b.examples) text(s, b.examples.map((e, i, a) => ({ text: '“' + FP.strip(e) + '”', options: { breakLine: i < a.length - 1, paraSpaceAfter: 6 } })), { x: M, y: 4.9, w: 11, h: 1.6, fontSize: 15, italic: true, color: 'B8C4CF' });
        break;
      }
      case 'mcq': renderQuestion(b, 'Your call'); break;
      case 'testout': {
        const s = add('FP_CONTENT', b.title || 'You probably already know this', notesOf(b, 'FACILITATE: quick-fire these. If the room gets them all, skip ahead: ' + b.skips.join(', ')));
        text(s, strip(b.text || ''), { x: M, y: 1.5, w: W - 2 * M, h: 1.2, fontSize: 18 });
        b.questions.forEach(q => renderQuestion(q, 'Quick check'));
        break;
      }
      case 'story': {
        b.chapters.forEach((c, i) => {
          const s = add('FP_CONTENT', `${FP.char(b.speaker).name}'s story — ${i + 1}. ${FP.strip(c.title)}`, notesOf({ narration: c.text }, c.choice ? 'FACILITATE: ' + strip(c.choice.question) + '\n' + c.choice.options.map(o => `${o.best ? '[BEST] ' : ''}${strip(o.text)} — ${strip(o.fb || '')}`).join('\n') : ''));
          avatar(s, b.speaker, M, 1.55, 1.6);
          text(s, paras(c.text).map((p, k, a) => ({ text: p, options: { breakLine: k < a.length - 1, paraSpaceAfter: 10 } })), { x: 2.6, y: 1.5, w: c.choice ? 5.4 : 10, h: 5, fontSize: 17 });
          if (c.choice) { card(s, 8.3, 1.5, 4.5, 5.0, 'E1EEFF'); text(s, [{ text: strip(c.choice.question), options: { bold: true, color: HEX.navy, breakLine: true, paraSpaceAfter: 8 } }].concat(c.choice.options.map((o, k, a) => ({ text: `${String.fromCharCode(65 + k)}. ${clip(o.text, 90)}`, options: { breakLine: k < a.length - 1, paraSpaceAfter: 6 } }))), { x: 8.55, y: 1.7, w: 4.0, h: 4.6, fontSize: 14 }); }
        });
        break;
      }
      case 'charintro': {
        const s = add('FP_CONTENT', 'The crew at Riverside', notesOf(b));
        const n = b.characters.length, gw = (W - 2 * M - (n - 1) * 0.3) / n;
        b.characters.forEach((id, i) => { const c = FP.char(id), x = M + i * (gw + 0.3); card(s, x, 1.5, gw, 5.1); avatar(s, id, x + (gw - 1.8) / 2, 1.75, 1.8); text(s, c.name, { x: x + 0.2, y: 3.7, w: gw - 0.4, h: 0.5, fontSize: 22, bold: true, align: 'center', color: HEX.navy, fontFace: 'Arial' }); text(s, c.role, { x: x + 0.2, y: 4.2, w: gw - 0.4, h: 0.6, fontSize: 13, align: 'center', color: HEX.orange, bold: true }); text(s, clip(c.carries, 140), { x: x + 0.2, y: 4.85, w: gw - 0.4, h: 1.6, fontSize: 12, align: 'center' }); });
        break;
      }
      case 'coursemap': {
        const s = add('FP_CONTENT', 'The course: one job, ten floors of decisions', notesOf(b));
        const rows = [['#', 'Module', 'Min'].map(h => ({ text: h, options: { bold: true, color: HEX.white, fill: { color: HEX.navy } } }))].concat(COURSE.outline.map((o, i) => [String(o.num), o.title, String(o.minutes)].map(v => ({ text: v, options: { fill: { color: i % 2 ? HEX.soft : HEX.white } } }))));
        s.addTable(rows, { x: M, y: 1.45, w: 8.4, colW: [0.8, 6.6, 1.0], fontSize: 12, fontFace: 'Calibri', color: HEX.ink, border: { type: 'solid', color: HEX.line, pt: 0.5 }, margin: 0.05 });
        const img = artPng('assets/art/riverside-elevation.svg'); if (img) addImg(s, img, 9.2, 1.45, W - 9.2 - M, 5.2, 'contain');
        break;
      }
      case 'checklist': {
        const s = add('FP_CONTENT', b.title || 'Checklist', notesOf(b));
        text(s, b.items.map((it, i, a) => ({ text: '☐  ' + FP.strip(it), options: { breakLine: i < a.length - 1, paraSpaceAfter: 8 } })), { x: M, y: 1.5, w: W - 2 * M, h: 5, fontSize: b.items.length > 8 ? 14 : 17 });
        break;
      }
      case 'download': {
        const s = add('FP_CONTENT', 'Job aid: ' + FP.strip(b.title), notesOf(b, `Hand out the printed job aid: ${b.pdf || b.file}`));
        card(s, M, 1.5, W - 2 * M, 2.2); circleIcon(s, M + 0.35, 1.95, 1.2, 'PDF', HEX.navy);
        text(s, [{ text: FP.strip(b.title), options: { bold: true, fontSize: 24, color: HEX.navy, breakLine: true } }, { text: FP.strip(b.desc || ''), options: { fontSize: 16 } }], { x: M + 1.9, y: 1.7, w: 9.8, h: 1.8 });
        break;
      }
      case 'continue': break;
      case 'scenario': renderScenario(b); break;
      case 'hotspot': {
        const sc = FP.scene(b.scene); if (!sc) break;
        const DK = path.join(PF.DIST, 'deck'); const pick = n => exists(path.join(DK, n + '.jpg')) ? path.join(DK, n + '.jpg') : path.join(PNG, 'scenes', n + '.png');
        const plain = pick(b.scene), rev = pick(`${b.scene}-reveal`);
        const hz = b.hazards && b.hazards.length ? sc.hazards.filter(h => b.hazards.includes(h.id)) : sc.hazards;
        const s = add('FP_CONTENT', b.title || 'Spot the hazard', notesOf(b, `FACILITATE: give the room ${b.timeLimit ? Math.round(b.timeLimit / 10) * 10 + ' seconds' : 'a minute'} to call out every ${PF.SHORT === 'Silica' ? 'silica' : 'fall'} hazard they see. ${hz.length} to find. Then advance for the reveal.`));
        if (exists(plain)) addImg(s, plain, M, 1.4, W - 2 * M, 5.35, 'contain');
        const r = add('FP_CONTENT', (b.title || 'Spot the hazard') + ': the reveal', 'HAZARDS (numbered as on the slide):\n' + sc.hazards.map((h, i) => `${i + 1}. ${h.label} [severity ${h.severity}] — ${h.why} FIX: ${h.fix} (${h.cite})`).join('\n') + ((sc.decoys || []).length ? '\n\nNOT HAZARDS: ' + sc.decoys.map(d => `${d.label}: ${d.why}`).join(' | ') : ''));
        if (exists(rev)) addImg(r, rev, M, 1.4, 8.6, 5.35, 'contain');
        r.addText(sc.hazards.map((h, i, a) => ({ text: `${i + 1}  ${FP.strip(h.label)}`, options: { breakLine: i < a.length - 1, paraSpaceAfter: 5, bold: hz.includes(h), color: HEX.navy } })), { x: 9.35, y: 1.45, w: 3.45, h: 5.3, fontSize: 12, isTextBox: true, fontFace: 'Calibri', valign: 'top', margin: 0.05 });
        break;
      }
      case 'sort': case 'anchorjudge': {
        const items = b.items;
        const q = add('FP_CONTENT', b.title || 'Sort it', 'FACILITATE: call each item; the room picks a bucket. Then advance.\n' + (b.prompt ? strip(b.prompt) : ''));
        const withArt = items.filter(it => artPng(it.art)).length === items.length && items.length <= 12;
        if (withArt) {
          const cols = items.length > 8 ? 6 : 4, cw = (W - 2 * M - (cols - 1) * 0.2) / cols, ch = cw * 0.75;
          items.forEach((it, i) => { const x = M + (i % cols) * (cw + 0.2), y = 1.45 + Math.floor(i / cols) * (ch + 0.45); addImg(q, artPng(it.art), x, y, cw, ch, 'contain'); text(q, `${i + 1}. ${clip(it.text, 50)}`, { x, y: y + ch, w: cw, h: 0.4, fontSize: 11 }); });
        } else {
          text(q, items.map((it, i, a) => ({ text: `${i + 1}. ${clip(it.text, 110)}`, options: { breakLine: i < a.length - 1, paraSpaceAfter: 5 } })), { x: M, y: 1.45, w: 7.4, h: 5.2, fontSize: items.length > 8 ? 13 : 16 });
          b.buckets.forEach((bk, i) => { card(q, 8.3, 1.45 + i * (5.2 / b.buckets.length), 4.5, 5.2 / b.buckets.length - 0.2, i % 2 ? 'E1EEFF' : HEX.soft); text(q, FP.strip(bk.label), { x: 8.5, y: 1.45 + i * (5.2 / b.buckets.length), w: 4.1, h: 5.2 / b.buckets.length - 0.2, fontSize: 18, bold: true, color: HEX.navy, valign: 'middle', align: 'center' }); });
        }
        const a = add('FP_CONTENT', (b.title || 'Sort it') + ': answers', items.map((it, i) => `${i + 1}. ${strip(it.text)} → ${(b.buckets.find(x => x.id === it.bucket) || {}).label}: ${strip(it.fb || '')}`).join('\n'));
        const n = b.buckets.length, gw = (W - 2 * M - (n - 1) * 0.3) / n;
        b.buckets.forEach((bk, i) => {
          const x = M + i * (gw + 0.3);
          card(a, x, 1.45, gw, 5.2);
          const list = items.map((it, k) => ({ it, k })).filter(o => o.it.bucket === bk.id);
          a.addText([{ text: FP.strip(bk.label).toUpperCase(), options: { bold: true, color: HEX.orange, breakLine: true, paraSpaceAfter: 8, fontSize: 14 } }].concat(list.map((o, j) => ({ text: `${o.k + 1}. ${clip(o.it.text, 70)}`, options: { breakLine: j < list.length - 1, paraSpaceAfter: 5 } }))), { x: x + 0.2, y: 1.6, w: gw - 0.4, h: 4.9, fontSize: list.length > 6 ? 12 : 14, isTextBox: true, fontFace: 'Calibri', color: HEX.ink, valign: 'top', margin: 0.05 });
        });
        break;
      }
      case 'sequence': {
        const idx = b.items.map((_, i) => i); const order = idx.filter(i => i % 2 === 1).concat(idx.filter(i => i % 2 === 0).reverse()); const shuffled = order.map(i => ({ t: b.items[i], i }));
        const q = add('FP_CONTENT', b.title || 'Put it in order', 'FACILITATE: have the room put these in order. Then advance.\n' + (b.prompt ? strip(b.prompt) : ''));
        text(q, shuffled.map((o, i, a) => ({ text: `${String.fromCharCode(65 + i)}. ${clip(o.t, 120)}`, options: { breakLine: i < a.length - 1, paraSpaceAfter: 8 } })), { x: M, y: 1.5, w: W - 2 * M, h: 5, fontSize: b.items.length > 7 ? 15 : 18 });
        const a = add('FP_CONTENT', (b.title || 'Put it in order') + ': the right order', strip(b.fb || ''));
        b.items.forEach((t, i) => { const y = 1.45 + i * (5.2 / b.items.length); circleIcon(a, M, y + 0.02, Math.min(0.55, 5.2 / b.items.length - 0.1), String(i + 1)); text(a, clip(t, 130), { x: M + 0.8, y, w: W - 2 * M - 0.8, h: 5.2 / b.items.length, fontSize: b.items.length > 7 ? 13 : 16, valign: 'middle' }); });
        break;
      }
      case 'match': {
        const img = artPng(b.src); if (!img) break;
        const s = add('FP_CONTENT', b.title || 'Label the diagram', b.tags.map(t => `${t.text} → ${t.target}: ${strip(t.fb || '')}`).join('\n'));
        addImg(s, img, M, 1.45, 8.0, 5.2, 'contain');
        text(s, b.tags.map((t, i, a) => ({ text: FP.strip(t.text), options: { breakLine: i < a.length - 1, paraSpaceAfter: 8, bold: true, color: HEX.navy } })), { x: 9.0, y: 1.5, w: 3.8, h: 5, fontSize: 16 });
        break;
      }
      case 'clearance': {
        const r = FP.clearance(b.setup), st = b.setup;
        const s = add('FP_CONTENT', b.title || 'Clearance math', notesOf(b, 'FACILITATE: have everyone work it on paper before you show the answer. ' + paras(b.explain).join(' ')));
        text(s, paras(b.intro).join(' '), { x: M, y: 1.45, w: 6.2, h: 1.6, fontSize: 16 });
        const rows = st.connector === 'srl'
          ? [['Free fall (SRL, overhead)', `${r.freeFall} ft`], ['Deceleration (DD)', `${st.DD == null ? 3.5 : st.DD} ft`], ['Harness stretch (HS)', `${st.HS == null ? 1 : st.HS} ft`], ['Safety margin (SM)', `${st.SM == null ? 2 : st.SM} ft`]]
          : [['Lanyard (L)', `${st.L} ft`], ['Anchor height (A)', `${st.A} ft`], ['Free fall = L + H − A', `${r.freeFall} ft ${r.freeFallOk ? '✔' : '✘ over 6 ft'}`], ['Deceleration (DD)', `${st.DD == null ? 3.5 : st.DD} ft`], ['Harness stretch (HS)', `${st.HS == null ? 1 : st.HS} ft`], ['D-ring to feet (H)', `${st.H == null ? 5 : st.H} ft`], ['Safety margin (SM)', `${st.SM == null ? 2 : st.SM} ft`]];
        rows.push(['Required clearance', `${r.required} ft`], ['Available', `${r.available} ft`]);
        s.addTable(rows.map((rw, i) => rw.map((c, j) => ({ text: c, options: { bold: i >= rows.length - 2, fill: { color: i >= rows.length - 2 ? HEX.soft : HEX.white }, align: j ? 'right' : 'left' } }))), { x: M, y: 3.2, w: 6.2, colW: [4.2, 2.0], fontSize: 14, fontFace: 'Calibri', color: HEX.ink, border: { type: 'solid', color: HEX.line, pt: 0.5 }, margin: 0.06 });
        card(s, 7.2, 1.45, W - 7.2 - M, 1.6, r.hits ? 'FBE1DE' : 'DFF3DF');
        text(s, r.hits ? `HITS — needs ${r.required} ft, has ${r.available} ft` : `CLEARS — needs ${r.required} ft, has ${r.available} ft`, { x: 7.45, y: 1.45, w: W - 7.7 - M, h: 1.6, fontSize: 24, bold: true, color: r.hits ? HEX.bad : HEX.good, valign: 'middle', fontFace: 'Arial' });
        (b.fixes || []).forEach((f, i) => { const fr = FP.clearance(Object.assign({}, st, f.set)); card(s, 7.2, 3.3 + i * 1.3, W - 7.2 - M, 1.15); text(s, [{ text: `FIX ${i + 1}: ${FP.strip(f.label).replace(/^fix\s*\d+\s*[:.\-–]\s*/i, '')}  →  ${fr.required} ft ${fr.hits ? '(still hits)' : '(clears)'}`, options: { bold: true, color: fr.hits ? HEX.bad : HEX.good, breakLine: true } }, { text: clip(f.text || '', 140), options: { fontSize: 12 } }], { x: 7.4, y: 3.35 + i * 1.3, w: W - 7.6 - M, h: 1.05, fontSize: 14 }); });
        break;
      }
      case 'swing': {
        const s = add('FP_CONTENT', b.title || 'Swing fall', notesOf(b));
        text(s, paras(b.intro).join(' '), { x: M, y: 1.45, w: 6.2, h: 2.2, fontSize: 17 });
        const R = b.R || 10; const rows = (b.offsets || [2, 4, 6, 8]).map(d => [`${d} ft`, `${FP.swingDrop(R, d).toFixed(1)} ft`]);
        s.addTable([[{ text: 'Offset from anchor', options: { bold: true, color: HEX.white, fill: { color: HEX.navy } } }, { text: `Extra drop (line ${R} ft)`, options: { bold: true, color: HEX.white, fill: { color: HEX.navy } } }]].concat(rows), { x: M, y: 3.8, w: 6.2, colW: [3.1, 3.1], fontSize: 14, fontFace: 'Calibri', color: HEX.ink, border: { type: 'solid', color: HEX.line, pt: 0.5 } });
        card(s, 7.2, 1.45, W - 7.2 - M, 5.1); text(s, 'Extra drop = R − √(R² − d²)\n\nWork as close to directly under the anchor as you can. Every foot sideways is a foot of swing into a column, the building, or the floor below.', { x: 7.45, y: 1.7, w: W - 7.7 - M, h: 4.6, fontSize: 18, color: HEX.navy });
        break;
      }
      case 'checkreview': {
        const mk = (reveal) => {
          const s = add('FP_CONTENT', (b.title || 'Find the errors') + (reveal ? ': the errors' : ''), reveal ? b.rows.filter(r => r.error).map(r => `${r.cells[0]}: ${strip(r.error.text)} (${r.error.cite || ''})`).join('\n') : 'FACILITATE: give the room two minutes to find ' + (b.findCount || b.rows.filter(r => r.error).length) + ' problems. ' + strip(b.intro || ''));
          const cols = b.columns || b.rows[0].cells.map((_, i) => 'Col ' + (i + 1));
          const rows = [cols.map(c => ({ text: FP.strip(c), options: { bold: true, color: HEX.white, fill: { color: HEX.navy } } }))].concat(b.rows.map((r, i) => r.cells.map(c => ({ text: clip(c, 80), options: { fill: { color: reveal && r.error ? 'FBE1DE' : (i % 2 ? HEX.soft : HEX.white) }, bold: !!(reveal && r.error) } }))));
          s.addTable(rows, { x: M, y: 1.45, w: W - 2 * M, colW: cols.map(() => (W - 2 * M) / cols.length), fontSize: b.rows.length > 8 ? 10 : 12, fontFace: 'Calibri', color: HEX.ink, border: { type: 'solid', color: HEX.line, pt: 0.5 }, margin: 0.05 });
        };
        mk(false); mk(true);
        break;
      }
      case 'table1': {
        const RL = { none: 'None', apf10: 'APF 10', apf25: 'APF 25' };
        const ctl = id => FP.strip((b.controls.find(c => c.id === id) || {}).label || id);
        const q = add('FP_CONTENT', b.title || 'Table 1 in the field', 'FACILITATE: take each task in turn. Ask the room for the control first, then the respirator for the hours and location. Then advance for the answers.\n' + strip(b.intro || ''));
        const hdr = ['#', 'Task', 'Hours', 'Where'].map(c => ({ text: c, options: { bold: true, color: HEX.white, fill: { color: HEX.navy } } }));
        q.addTable([hdr].concat(b.tasks.map((t, i) => [String(i + 1), clip(FP.strip(t.task), 90), String(t.hours), t.indoor ? 'Indoors' : 'Outdoors'].map(c => ({ text: c, options: { fill: { color: i % 2 ? HEX.soft : HEX.white } } })))), { x: M, y: 1.45, w: W - 2 * M, colW: [0.5, 8.6, 1.2, W - 2 * M - 10.3], fontSize: b.tasks.length > 8 ? 11 : 13, fontFace: 'Calibri', color: HEX.ink, border: { type: 'solid', color: HEX.line, pt: 0.5 }, margin: 0.05 });
        const a = add('FP_CONTENT', (b.title || 'Table 1') + ': answers', b.tasks.map((t, i) => `${i + 1}. ${strip(t.task)} → ${ctl(t.control)}; respirator ${RL[t.resp] || t.resp}. ${strip(t.fb || '')} (${t.cite || ''})`).join('\n'));
        const hdr2 = ['#', 'Task', 'Control', 'Respirator'].map(c => ({ text: c, options: { bold: true, color: HEX.white, fill: { color: HEX.navy } } }));
        a.addTable([hdr2].concat(b.tasks.map((t, i) => [String(i + 1), clip(FP.strip(t.task), 60), clip(ctl(t.control), 60), RL[t.resp] || t.resp].map((c, j) => ({ text: c, options: { bold: j === 3, color: j === 3 ? (t.resp === 'none' ? HEX.good : HEX.navy) : HEX.ink, fill: { color: i % 2 ? HEX.soft : HEX.white } } })))), { x: M, y: 1.45, w: W - 2 * M, colW: [0.5, 5.6, 4.6, W - 2 * M - 10.7], fontSize: b.tasks.length > 8 ? 11 : 13, fontFace: 'Calibri', color: HEX.ink, border: { type: 'solid', color: HEX.line, pt: 0.5 }, margin: 0.05 });
        break;
      }
      case 'shift': {
        const RL = { none: 'None', apf10: 'APF 10', apf25: 'APF 25' };
        const total = b.tasks.filter(t => !b.preset || b.preset.includes(t.id)).reduce((s, t) => s + (+t.hours || 0), 0);
        const q = add('FP_CONTENT', b.title || 'Build the shift', 'FACILITATE: ask the prediction question and take a show of hands. Then add the tasks one at a time and watch the total cross 4 hours.\n' + strip(b.question || ''));
        text(q, strip(b.question || ''), { x: M, y: 1.45, w: W - 2 * M, h: 1.1, fontSize: 22, bold: true, color: HEX.navy });
        const hdr = ['Task', 'Hours', 'Alone (≤ 4 h)', 'In a > 4 h shift'].map(c => ({ text: c, options: { bold: true, color: HEX.white, fill: { color: HEX.navy } } }));
        q.addTable([hdr].concat(b.tasks.map((t, i) => [clip(FP.strip(t.label), 70), String(t.hours), RL[t.resp.le4] || t.resp.le4, RL[t.resp.gt4] || t.resp.gt4].map(c => ({ text: c, options: { fill: { color: i % 2 ? HEX.soft : HEX.white } } })))), { x: M, y: 2.7, w: W - 2 * M, colW: [6.2, 1.2, 2.3, W - 2 * M - 9.7], fontSize: 14, fontFace: 'Calibri', color: HEX.ink, border: { type: 'solid', color: HEX.line, pt: 0.5 }, margin: 0.06 });
        const a = add('FP_CONTENT', (b.title || 'Build the shift') + ': the answer', strip(b.explain || '') + (b.cite ? '\nCITE: ' + b.cite : ''));
        text(a, `All tasks together: ${total} hours. Over 4 hours in total means the > 4 h respirator column applies to every task.`, { x: M, y: 1.45, w: W - 2 * M, h: 1.2, fontSize: 22, bold: true, color: HEX.navy });
        text(a, strip(b.explain || ''), { x: M, y: 2.8, w: W - 2 * M, h: 3.6, fontSize: 18 });
        break;
      }
      case 'toolbox': {
        const s = add('FP_CONTENT', b.title || 'Build a 5-minute toolbox talk', notesOf(b, 'FACILITATE: in pairs, pick one from each column and talk it through for five minutes.'));
        [['Story', b.stories], ['Hazard', b.hazards], ['Commitment', b.commitments]].forEach(([lab, list], i) => {
          const x = M + i * 4.15; card(s, x, 1.45, 3.95, 5.2);
          s.addText([{ text: lab.toUpperCase(), options: { bold: true, color: HEX.orange, breakLine: true, paraSpaceAfter: 8, fontSize: 14 } }].concat(list.map((o, j) => ({ text: FP.strip(o.label), options: { breakLine: j < list.length - 1, paraSpaceAfter: 6, bullet: true } }))), { x: x + 0.2, y: 1.6, w: 3.55, h: 4.9, fontSize: 14, isTextBox: true, fontFace: 'Calibri', color: HEX.ink, valign: 'top', margin: 0.05 });
        });
        break;
      }
      default: break;
    }
  };

  function renderQuestion(q, label) {
    const opts = q.options || [];
    const fbNotes = opts.map((o, i) => `${String.fromCharCode(65 + i)}${o.correct ? ' [CORRECT]' : ''}: ${strip(o.text)}${o.fb ? ' — ' + strip(o.fb) : ''}`).join('\n');
    const s = add('FP_CONTENT', label, `FACILITATE: read the question; get a show of hands for each answer before revealing.\n${fbNotes}\n${q.explain ? 'WHY: ' + strip(q.explain) : ''}${q.cite ? '\nCITE: ' + q.cite : ''}`);
    text(s, strip(q.question || q.stem) + (q.multi ? '  (select all that apply)' : ''), { x: M, y: 1.45, w: W - 2 * M, h: 1.5, fontSize: 22, bold: true, color: HEX.navy });
    const drawOpts = (sl, reveal) => opts.forEach((o, i) => {
      const y = 3.05 + i * (3.55 / opts.length);
      const fill = reveal ? (o.correct ? 'DFF3DF' : HEX.soft) : HEX.soft;
      card(sl, M, y, W - 2 * M, 3.55 / opts.length - 0.12, fill);
      circleIcon(sl, M + 0.15, y + (3.55 / opts.length - 0.12 - 0.5) / 2, 0.5, String.fromCharCode(65 + i), reveal && o.correct ? HEX.good : HEX.navy);
      text(sl, clip(o.text, 150), { x: M + 0.85, y, w: W - 2 * M - 1.0, h: 3.55 / opts.length - 0.12, fontSize: opts.length > 4 ? 14 : 16, valign: 'middle', bold: !!(reveal && o.correct) });
    });
    drawOpts(s, false);
    const a = add('FP_CONTENT', label + ': answer', `${q.explain ? strip(q.explain) : ''}${q.cite ? '\nCITE: ' + q.cite : ''}`);
    text(a, strip(q.question || q.stem), { x: M, y: 1.45, w: W - 2 * M, h: 1.5, fontSize: 18, bold: true, color: HEX.navy });
    drawOpts(a, true);
    if (q.cite) citeChip(a, q.cite, W - M - 3.0, 6.75);
  }

  function renderScenario(b) {
    const keys = Object.keys(b.nodes);
    const letter = {}; keys.forEach((k, i) => { letter[k] = i + 1; });
    const intro = add('FP_DARK', b.title || 'Decision time', notesOf(b, `DECISION SLIDES: each slide is one decision point. Read the situation, let the room choose, then jump to the slide named in the notes (or use the hyperlinked choice labels). Node map: ${keys.map(k => `${letter[k]}=${k}`).join(', ')}${b.clock ? `\nCLOCK: ${b.clock.label}; warn at ${b.clock.warnAt} ${b.clock.unit}, limit ${b.clock.limit} ${b.clock.unit}. Add each choice's time cost on the whiteboard.` : ''}`));
    text(intro, paras(b.intro || 'Make the call. Every choice has consequences.').join(' '), { x: M, y: 1.6, w: 8.5, h: 3.5, fontSize: 24, color: 'E3EAF0' });
    if (b.clock) text(intro, `⏱ ${b.clock.label}`, { x: M, y: 5.3, w: 8, h: 0.6, fontSize: 20, bold: true, color: HEX.caution });
    keys.forEach(k => {
      const n = b.nodes[k];
      if (n.end) {
        const col = n.outcome === 'good' ? HEX.good : n.outcome === 'ok' ? HEX.amber : HEX.bad;
        const s = add('FP_CONTENT', `${letter[k]}. ${n.title || ({ good: 'Good outcome', ok: 'Partial outcome', bad: 'Bad outcome' })[n.outcome]}`, `END (${n.outcome.toUpperCase()}). ${strip(n.text)}${n.cite ? ' CITE: ' + n.cite : ''}\n\nFACILITATE: ask what decision changed the outcome.`);
        card(s, M, 1.45, W - 2 * M, 4.9, n.outcome === 'good' ? 'DFF3DF' : n.outcome === 'ok' ? 'FBEFD5' : 'FBE1DE');
        text(s, ({ good: 'GOOD OUTCOME', ok: 'PARTIAL OUTCOME', bad: 'BAD OUTCOME' })[n.outcome], { x: M + 0.35, y: 1.65, w: 6, h: 0.5, fontSize: 15, bold: true, color: col, charSpacing: 2 });
        text(s, paras(n.text).map((p, i, a) => ({ text: p, options: { breakLine: i < a.length - 1, paraSpaceAfter: 10 } })), { x: M + 0.35, y: 2.25, w: W - 2 * M - 0.7, h: 3.6, fontSize: 19 });
        if (n.cite) citeChip(s, n.cite, M + 0.35, 5.85);
        return;
      }
      const s = add('FP_CONTENT', `${letter[k]}. Decision`, (b.nodes[k].speaker ? FP.char(n.speaker).name + ': ' : '') + strip(n.text) + '\n\nCHOICES:\n' + n.choices.map((c, i) => `${String.fromCharCode(65 + i)} (${({ good: 'best', ok: 'partial', bad: 'poor' })[c.tone] || c.tone}${c.time ? ', +' + c.time + ' ' + (b.clock ? b.clock.unit : '') : ''}${c.score != null ? ', score ' + c.score : ''}) → go to slide "${letter[c.next]}". ${strip(c.fb || '')}${c.cite ? ' [' + c.cite + ']' : ''}`).join('\n'));
      const img = mediaPath(n.media) || artPng(n.art);
      let tx = M;
      if (n.speaker) { avatar(s, n.speaker, M, 1.5, 1.3); tx = M + 1.55; }
      const tw = (img ? 7.2 : W - M) - tx, chars = strip(n.text).length, est = Math.max(1.3, Math.ceil(chars / (tw * 11)) * 0.34 + 0.3);
      const top = img ? 4.05 : Math.min(4.05, 1.45 + est + 0.25), span = 6.7 - top;
      text(s, paras(n.text).map((p, i, a) => ({ text: p, options: { breakLine: i < a.length - 1, paraSpaceAfter: 8 } })), { x: tx, y: 1.45, w: tw, h: top - 1.6, fontSize: 18 });
      if (img) addImg(s, img, 7.5, 1.45, W - 7.5 - M, 2.4, n.art ? 'contain' : 'cover');
      n.choices.forEach((c, i) => {
        const y = top + i * (span / n.choices.length), h = Math.min(1.1, span / n.choices.length - 0.1);
        card(s, M, y, W - 2 * M, h, HEX.soft);
        circleIcon(s, M + 0.12, y + (h - 0.45) / 2, 0.45, String.fromCharCode(65 + i), HEX.orange);
        text(s, clip(c.text, 160), { x: M + 0.75, y, w: W - 2 * M - 2.2, h, fontSize: n.choices.length > 3 ? 13 : 15, valign: 'middle' });
        text(s, `→ ${letter[c.next]}`, { x: W - M - 1.3, y, w: 1.2, h, fontSize: 14, bold: true, color: HEX.navy, align: 'right', valign: 'middle' });
      });
    });
  }

  mod.lessons.forEach((l, li) => {
    section = `L${li + 1} ${l.title}`.slice(0, 60);
    const d = add('FP_SECTION', l.title, `Lesson ${li + 1} of Module ${mod.num} (${l.minutes || '?'} min online).`);
    d.addText(`LESSON ${li + 1}  ·  ${l.minutes || ''} MIN`, { placeholder: 'body' });
    l.blocks.forEach(b => { try { render(b); } catch (e) { console.error(`  ! ${mod.id}/${l.id} ${b.type}: ${e.message}`); } });
  });

  if (mod.kc && mod.kc.questions && mod.kc.questions.length) {
    section = 'Knowledge check';
    const d = add('FP_SECTION', 'Knowledge check', 'Practice only. Use these as a quick round-the-room quiz.');
    d.addText(`${mod.kc.questions.length} QUESTIONS  ·  PRACTICE`, { placeholder: 'body' });
    mod.kc.questions.forEach((q, i) => renderQuestion(q, `Check ${i + 1}`));
  }
  section = 'Wrap';
  const end = add('FP_SECTION', 'Use it Monday', 'Close: ask each person to name one thing they will do differently on their next shift.');
  end.addText(bulletsRuns(((mod.jobAids || []).map(j => 'Job aid: ' + j.title)).concat(['Citations: ' + (mod.citations || []).join('; ')]), 15, 'E3EAF0'), { placeholder: 'body' });
  return pres;
}

(async () => {
  fs.mkdirSync(OUTDIR, { recursive: true });
  const only = process.argv.slice(2);
  for (const mod of COURSE.modules) {
    if (only.length && !only.includes(mod.id)) continue;
    const pres = buildDeck(mod);
    const file = path.join(OUTDIR, `${PF.DECK}_M${mod.num}_${slug(mod.title)}.pptx`);
    await pres.writeFile({ fileName: file });
    if (applyTheme) { try { await applyTheme(file, THEME); } catch (e) { console.error('theme:', e.message); } }
    console.log(`${path.relative(ROOT, file)}  (${pres.slides.length} slides)`);
  }
})().catch(e => { console.error(e); process.exit(1); });
