#!/usr/bin/env node
/* Content validator — the contract every content builder runs before handing off.
   Usage: node tools/validate.js [m3 m4 ...]   (no args = everything)            */
'use strict';
const fs = require('fs');
const path = require('path');
const { loadCourse, ROOT } = require('./load-content');

const only = process.argv.slice(2);
const { COURSE, errors: loadErrors } = loadCourse();
const errs = [], warns = [];
const E = (where, msg) => errs.push(`${where}: ${msg}`);
const W = (where, msg) => warns.push(`${where}: ${msg}`);
loadErrors.forEach(e => errs.push('load ' + e));

const SPEC = {
  hero: ['title'], text: ['body'], quote: ['speaker', 'text'], dialogue: ['lines'], image: ['media'],
  art: ['src', 'alt'], video: ['media'], callout: ['variant', 'body'], stats: ['items'], cards: ['cards'],
  accordion: ['items'], tabs: ['items'], process: ['steps'], timeline: ['items'], labeled: ['markers'],
  table: ['headers', 'rows'], pyramid: ['levels'], poll: ['id', 'question', 'options'], reflect: ['id', 'prompt'],
  mcq: ['id', 'question', 'options'], testout: ['id', 'questions', 'skips'], story: ['id', 'chapters'],
  charintro: ['characters'], coursemap: [], checklist: ['id', 'items'], download: ['title', 'file'], continue: [],
  scenario: ['id', 'start', 'nodes'], hotspot: ['id'], sort: ['id', 'buckets', 'items'], anchorjudge: ['id', 'buckets', 'items'],
  sequence: ['id', 'items'], match: ['id', 'src', 'targets', 'tags'], clearance: ['id', 'setup'], swing: ['id'],
  checkreview: ['id', 'rows'], toolbox: ['id', 'stories', 'hazards', 'commitments'], commitment: ['id', 'prompt']
};
const CALLOUTS = ['field-check', 'receipt', 'warning', 'tip', 'skip', 'note', 'monday'];
const CHARS = Object.keys(COURSE.characters);
const ids = new Map();

function fileExists(rel) { return fs.existsSync(path.join(ROOT, rel)); }
function words(s) { return String(s || '').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length; }
function checkMcq(q, where) {
  if (!q.question && !q.stem) E(where, 'mcq needs question');
  if (!Array.isArray(q.options) || q.options.length < 2) return E(where, 'mcq needs ≥2 options');
  const c = q.options.filter(o => o.correct).length;
  if (c === 0) E(where, 'mcq has no correct option');
  if (c > 1 && !q.multi) E(where, 'mcq has several correct options but multi is not set');
}

function checkBlock(b, where, mod) {
  if (!b || !b.type) return E(where, 'block without type');
  const req = SPEC[b.type];
  if (!req) return E(where, `unknown block type "${b.type}"`);
  req.forEach(f => { if (b[f] === undefined) E(where, `${b.type} missing "${f}"`); });
  if (b.id) { if (ids.has(b.id)) E(where, `duplicate id ${b.id} (also ${ids.get(b.id)})`); ids.set(b.id, where); }
  if (b.speaker && !CHARS.includes(b.speaker)) E(where, `unknown speaker ${b.speaker}`);
  if (b.media && !COURSE.media[b.media]) W(where, `media id ${b.media} not in media.js (renders nothing)`);
  if (b.src && /^assets\//.test(b.src) && !fileExists(b.src)) E(where, `file missing ${b.src}`);
  if (b.body && words(Array.isArray(b.body) ? b.body.join(' ') : b.body) > 120) W(where, `${b.type} body is ${words(b.body)} words (aim ≤60)`);
  switch (b.type) {
    case 'callout': if (!CALLOUTS.includes(b.variant)) E(where, `callout variant ${b.variant}`); break;
    case 'dialogue': b.lines.forEach((l, i) => { if (!CHARS.includes(l.speaker)) E(where, `line ${i} speaker ${l.speaker}`); }); break;
    case 'mcq': checkMcq(b, where); break;
    case 'testout': b.questions.forEach((q, i) => checkMcq(q, `${where} q${i}`)); break;
    case 'charintro': b.characters.forEach(c => { if (!CHARS.includes(c)) E(where, `charintro ${c}`); }); break;
    case 'download': if (!fileExists(b.file)) W(where, `job aid not built yet: ${b.file}`); break;
    case 'scenario': {
      if (!b.nodes[b.start]) E(where, `start node ${b.start} missing`);
      let ends = 0;
      Object.entries(b.nodes).forEach(([k, n]) => {
        if (n.end) { ends++; if (!['good', 'ok', 'bad'].includes(n.outcome)) E(where, `end ${k} outcome`); return; }
        if (n.speaker && !CHARS.includes(n.speaker)) E(where, `node ${k} speaker ${n.speaker}`);
        if (!n.choices || !n.choices.length) E(where, `node ${k} has no choices and is not an end`);
        (n.choices || []).forEach((c, i) => { if (!b.nodes[c.next]) E(where, `node ${k} choice ${i} → missing ${c.next}`); });
      });
      if (!ends) E(where, 'scenario has no end node');
      break;
    }
    case 'hotspot': {
      const sc = b.scene ? COURSE.scenes[b.scene] : null;
      if (b.scene && !sc) E(where, `scene ${b.scene} not registered`);
      if (sc && b.hazards) b.hazards.forEach(hz => { if (!sc.hazards.find(x => x.id === hz)) E(where, `hazard ${hz} not in scene ${b.scene}`); });
      break;
    }
    case 'sort': case 'anchorjudge': {
      const bk = b.buckets.map(x => x.id);
      b.items.forEach((it, i) => { if (!bk.includes(it.bucket)) E(where, `item ${i} bucket ${it.bucket}`); if (it.art && !fileExists(it.art)) E(where, `item art missing ${it.art}`); });
      break;
    }
    case 'match': { const t = b.targets.map(x => x.id); b.tags.forEach((g, i) => { if (!t.includes(g.target)) E(where, `tag ${i} target ${g.target}`); }); break; }
    case 'clearance': ['L', 'A', 'available'].forEach(f => { if (b.setup[f] === undefined && b.setup.connector !== 'srl') E(where, `clearance setup.${f}`); }); break;
    case 'checkreview': if (!b.rows.some(r => r.error)) E(where, 'checkreview has no error rows'); break;
  }
}

COURSE.modules.forEach(m => {
  if (only.length && !only.includes(m.id)) return;
  const w = m.id;
  ['id', 'num', 'title', 'minutes', 'objectives', 'lessons'].forEach(f => { if (m[f] === undefined) E(w, `module missing ${f}`); });
  if (m.hero && !COURSE.media[m.hero]) W(w, `hero ${m.hero} not in media.js`);
  const lessonMin = (m.lessons || []).reduce((s, l) => s + (l.minutes || 0), 0);
  if (Math.abs(lessonMin - m.minutes) > 3) W(w, `lesson minutes sum ${lessonMin} vs module ${m.minutes}`);
  (m.lessons || []).forEach((l, li) => {
    const lw = `${w}/${l.id || 'lesson' + li}`;
    if (!/^m\d-l\d+$/.test(l.id || '')) E(lw, 'lesson id must be mN-lK');
    if (!l.blocks || !l.blocks.length) E(lw, 'lesson has no blocks');
    (l.blocks || []).forEach((b, bi) => checkBlock(b, `${lw}#${bi}(${b && b.type})`, m));
  });
  if (m.num >= 1 && m.num <= 8) {
    if (!m.kc || !m.kc.questions || m.kc.questions.length < 3) E(w, 'modules 1–8 need kc with 3–5 questions');
    else m.kc.questions.forEach((q, i) => checkMcq(q, `${w}/kc q${i}`));
  }
  (m.jobAids || []).forEach(j => { if (!fileExists(j.file)) W(w, `job aid file not found ${j.file}`); });
  // every testout skip must be a real lesson
  (m.lessons || []).forEach(l => (l.blocks || []).filter(b => b.type === 'testout').forEach(b => b.skips.forEach(s => { if (!m.lessons.find(x => x.id === s)) E(w, `testout skips unknown lesson ${s}`); })));
});

Object.entries(COURSE.scenes || {}).forEach(([k, s]) => {
  if (!fileExists(s.src)) E(`scene ${k}`, `src missing ${s.src}`);
  (s.hazards || []).forEach(hz => ['id', 'x', 'y', 'w', 'h', 'label', 'why', 'fix', 'cite', 'severity'].forEach(f => { if (hz[f] === undefined) E(`scene ${k}/${hz.id}`, `hazard missing ${f}`); }));
});

Object.entries(COURSE.media || {}).forEach(([k, m]) => {
  if (!m) return;
  if (m.type === 'image' && !fileExists(m.src)) E(`media ${k}`, `file missing ${m.src}`);
  if (m.type === 'video' && m.poster && !fileExists(m.poster)) W(`media ${k}`, `poster missing ${m.poster}`);
  if (!m.credit && m.type === 'image') W(`media ${k}`, 'no credit');
});

if (COURSE.exam && (!only.length || only.includes('exam'))) {
  const ex = COURSE.exam; const slots = ex.slots || [];
  if (slots.length !== 40) E('exam', `expected 40 slots, got ${slots.length}`);
  const crit = slots.filter(s => s.critical).length;
  if (crit !== 8) E('exam', `expected 8 critical slots, got ${crit}`);
  const per = {}; slots.forEach(s => { per[s.area] = (per[s.area] || 0) + 1; });
  const want = { m2: 4, m3: 6, m4: 7, m5: 7, m6: 6, m7: 4, m8: 6 };
  Object.entries(want).forEach(([a, n]) => { if (per[a] !== n) E('exam', `area ${a} has ${per[a] || 0} slots, blueprint says ${n}`); });
  slots.forEach(s => {
    if (!s.pool || s.pool.length < 3) E(`exam ${s.id}`, 'pool needs 3 questions');
    (s.pool || []).forEach((q, i) => {
      const w = `exam ${s.id}[${i}]`;
      if (!q.stem) E(w, 'stem'); if (!q.explain) E(w, 'explain'); if (!q.cite) E(w, 'cite');
      if (q.type === 'mc' || q.type === 'multi') checkMcq(Object.assign({ multi: q.type === 'multi' }, q), w);
      else if (q.type === 'numeric') { if (typeof q.answer !== 'number') E(w, 'numeric answer'); }
      else if (q.type === 'sequence') { if (!q.items || q.items.length < 3) E(w, 'sequence items'); }
      else if (q.type === 'hotspot') { const sc = COURSE.scenes[q.scene]; if (!sc) E(w, `scene ${q.scene}`); else (q.correct || []).forEach(c => { if (!sc.hazards.find(x => x.id === c)) E(w, `hazard ${c}`); }); }
      else E(w, `unknown exam type ${q.type}`);
    });
  });
}

const total = COURSE.modules.reduce((s, m) => s + (m.minutes || 0), 0) + 25;
console.log(`modules: ${COURSE.modules.map(m => m.id).join(' ')} | minutes incl. exam: ${total} | media: ${Object.keys(COURSE.media).length} | scenes: ${Object.keys(COURSE.scenes).length} | exam slots: ${COURSE.exam ? COURSE.exam.slots.length : 0}`);
if (warns.length) console.log(`\n${warns.length} warning(s):\n  ` + warns.join('\n  '));
if (errs.length) { console.log(`\n${errs.length} ERROR(S):\n  ` + errs.join('\n  ')); process.exit(1); }
console.log('\nOK — no errors');
