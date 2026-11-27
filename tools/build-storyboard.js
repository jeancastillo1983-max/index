#!/usr/bin/env node
/* Master storyboard (.docx) generated from the course content — the single source for
   Rise 360, Storyline 360, PowerPoint and the HTML5/SCORM build.
   Output: deliverables/FallProtection-CP_Storyboard.docx */
'use strict';
const fs = require('fs');
const path = require('path');
const docx = require('docx');
const { loadCourse } = require('./load-content');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle,
  AlignmentType, HeadingLevel, PageBreak, Header, Footer, PageNumber, TableOfContents, LevelFormat, VerticalAlign, ImageRun
} = docx;
let sizeOf = null; try { const m = require('image-size'); sizeOf = m.imageSize || m; } catch (e) { /* thumbnails without size */ }
const THUMBS = path.join(path.resolve(__dirname, '..'), 'dist', 'thumbs');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'deliverables', 'FallProtection-CP_Storyboard.docx');
const { COURSE, FP } = loadCourse({ quiet: true });

/* ---------- palette / type ---------- */
const NAVY = '10161C', ORANGE = '0074E4', INK = '14202B', MUTED = '4F5D6A', SOFT = 'F1F4F6', LINE = 'C9D2DA', BLUE = '1F5FAE', GOOD = '008200', BAD = 'C23A2E', AMBER = 'A86A00';
const FONT = 'Arial', MONO = 'Consolas';
const PAGE_W = 12240, MARGIN = 1080, CONTENT_W = PAGE_W - 2 * MARGIN; // 10080
const LABEL_W = 1900, VALUE_W = CONTENT_W - LABEL_W;

/* ---------- inline HTML → TextRuns ---------- */
function runs(html, base = {}) {
  const out = [];
  const s = String(html == null ? '' : html).replace(/<br\s*\/?>/gi, ' ').replace(/&nbsp;/g, ' ');
  const re = /<(\/?)(b|strong|em|i|cite|span)[^>]*>|<[^>]+>/gi;
  let last = 0, m, st = { b: 0, i: 0, c: 0 };
  const push = t => {
    if (!t) return;
    t = t.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
    out.push(new TextRun(Object.assign({ text: t, font: st.c ? MONO : FONT, bold: !!st.b || base.bold, italics: !!st.i || base.italics,
      color: st.c ? BLUE : (base.color || INK), size: st.c ? (base.size || 20) - 2 : (base.size || 20) })));
  };
  while ((m = re.exec(s))) {
    push(s.slice(last, m.index)); last = re.lastIndex;
    const close = m[1] === '/', tag = (m[2] || '').toLowerCase();
    if (tag === 'b' || tag === 'strong') st.b += close ? -1 : 1;
    else if (tag === 'em' || tag === 'i') st.i += close ? -1 : 1;
    else if (tag === 'cite') st.c += close ? -1 : 1;
  }
  push(s.slice(last));
  return out.length ? out : [new TextRun({ text: '', font: FONT })];
}
const P = (html, opt = {}) => new Paragraph({ children: runs(html, opt.run || {}), spacing: { after: opt.after == null ? 80 : opt.after, before: opt.before || 0 }, alignment: opt.align, numbering: opt.bullet ? { reference: 'bullets', level: opt.level || 0 } : undefined, keepNext: opt.keepNext });
const paras = body => (Array.isArray(body) ? body : String(body || '').split(/\n\n+/)).filter(Boolean);
const bullets = (list, run) => list.map(t => P(t, { bullet: true, run, after: 40 }));
const H1 = t => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: t })] });
const H2 = t => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: t })] });
const H3 = t => new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: t })] });
const pageBreak = () => new Paragraph({ children: [new PageBreak()] });

const border = { style: BorderStyle.SINGLE, size: 4, color: LINE };
const borders = { top: border, bottom: border, left: border, right: border };
function cell(children, width, opt = {}) {
  return new TableCell({ children: Array.isArray(children) ? children : [children], width: { size: width, type: WidthType.DXA }, borders,
    shading: opt.fill ? { type: ShadingType.CLEAR, color: 'auto', fill: opt.fill } : undefined,
    margins: { top: 70, bottom: 70, left: 110, right: 110 }, columnSpan: opt.span, verticalAlign: opt.vAlign || VerticalAlign.TOP });
}
function grid(headers, rows, widths) {
  const total = widths.reduce((a, b) => a + b, 0);
  const head = new TableRow({ tableHeader: true, children: headers.map((h, i) => cell(P(h, { run: { bold: true, color: 'FFFFFF', size: 18 }, after: 0 }), widths[i], { fill: NAVY })) });
  const body = rows.map((r, ri) => new TableRow({ cantSplit: true, children: r.map((c, i) => cell((Array.isArray(c) ? c : [c]).map(x => x instanceof Paragraph ? x : P(String(x), { run: { size: 18 }, after: 30 })), widths[i], { fill: ri % 2 ? SOFT : undefined })) }));
  return new Table({ width: { size: total, type: WidthType.DXA }, columnWidths: widths, rows: [head].concat(body) });
}

/* ---------- block → storyboard screen ---------- */
const RISE = 'Rise 360', SL = 'Storyline 360 (embedded as a Storyline block in Rise)';
const BUILD = {
  hero: `${RISE}: Lesson banner — Image & Text / Statement block`, text: `${RISE}: Text block (heading + paragraph)`,
  quote: `${RISE}: Quote block (Quote on image) with character photo`, dialogue: `${SL}: dialogue sim — one slide, a layer per line, Next button`,
  image: `${RISE}: Image block`, art: `${RISE}: Image block (SVG illustration exported to PNG)`, video: `${RISE}: Multimedia › Embed (YouTube URL)`,
  callout: `${RISE}: Note / Statement block`, stats: `${RISE}: Statement block (numbers) or Image & Text grid`,
  cards: `${RISE}: Interactive › Flashcard grid (front = belief, back = Myth/Field truth + why)`, accordion: `${RISE}: Interactive › Accordion`,
  tabs: `${RISE}: Interactive › Tabs`, process: `${RISE}: Interactive › Process`, timeline: `${RISE}: Interactive › Timeline`,
  labeled: `${RISE}: Interactive › Labeled graphic`, table: `${RISE}: Table block`, pyramid: `${SL}: pyramid built in shapes, click each tier for a layer`,
  poll: `${SL}: survey question (pick one) + results layer with static peer bars`, reflect: `${SL}: short-answer survey, text-entry variable, not scored, not reported`,
  mcq: `${RISE}: Knowledge check (multiple choice / multiple response), feedback per choice`, testout: `${SL}: 3-question test-out; on pass jump ahead and set lessons complete`,
  story: `${SL}: one slide per chapter; choice layer after each chapter; no scoring`, charintro: `${RISE}: Image & Text grid (character cards)`,
  coursemap: `${RISE}: Process/Timeline block (Riverside building, floor per module)`, checklist: `${RISE}: Checklist (Text block with checkboxes) or Storyline checkbox slide`,
  download: `${RISE}: Attachment block (PDF job aid)`, continue: `${RISE}: Continue block — "Complete block above" (gates the interaction)`,
  scenario: `${SL}: branching scenario — one slide per decision node, feedback layer per choice, end slides per outcome`,
  hotspot: `${SL}: hotspot interaction on scene art; hazards as hotspots, decoys as hotspots with "not a hazard" layer`,
  sort: `${SL}: freeform drag-and-drop (drop targets = buckets), per-item feedback layers`, anchorjudge: `${SL}: freeform drag-and-drop (Approve / Reject / Ask a qualified person)`,
  sequence: `${SL}: sequence drag-drop question`, match: `${SL}: drag-and-drop tags onto diagram drop targets`,
  clearance: `${SL}: number variables + calculation triggers + motion-path fall animation`, swing: `${SL}: slider interaction (variable d) driving swing animation`,
  checkreview: `${SL}: hotspot rows on a filled-in form; counter variable for errors found`, toolbox: `${SL}: three choice sets → script assembled with %variable% references`,
  commitment: `${SL}: text entry → commitment card slide; Print/Email; Rise text-entry not available`
};
const LABEL = { hero: 'Lesson banner', text: 'Text', quote: 'Character quote', dialogue: 'Dialogue', image: 'Photo', art: 'Illustration', video: 'Video',
  callout: 'Callout', stats: 'Numbers', cards: 'Flashcards', accordion: 'Accordion', tabs: 'Tabs', process: 'Process', timeline: 'Timeline', labeled: 'Labeled graphic',
  table: 'Table', pyramid: 'Hierarchy', poll: 'Self-check poll', reflect: 'Gut check', mcq: 'Practice question', testout: 'Test-out', story: 'Story chapters',
  charintro: 'Characters', coursemap: 'Course map', checklist: 'Checklist', download: 'Job aid', continue: 'Continue gate', scenario: 'Branching scenario',
  hotspot: 'Spot the hazard', sort: 'Drag & drop sort', anchorjudge: 'Anchor or not', sequence: 'Sequence', match: 'Drag tags to diagram', clearance: 'Clearance math',
  swing: 'Swing fall', checkreview: 'Find the errors', toolbox: 'Toolbox talk builder', commitment: 'Commitment card' };
const toneTxt = t => ({ good: 'BEST', ok: 'PARTIAL', bad: 'POOR' }[t] || '');

function mcqLines(q) {
  const lines = [`<b>Q:</b> ${q.question || q.stem}${q.multi ? ' <em>(select all that apply)</em>' : ''}`];
  (q.options || []).forEach((o, i) => lines.push(`${o.correct ? '✔' : '○'} ${String.fromCharCode(65 + i)}. ${o.text}${o.fb ? ` — <em>${o.fb}</em>` : ''}`));
  if (q.explain) lines.push(`<b>Explain:</b> ${q.explain}`);
  if (q.cite) lines.push(`<b>Cite:</b> <cite>${q.cite}</cite>`);
  return lines;
}

function describe(b) {
  const on = [], logic = [];
  const add = (arr, x) => paras(x).forEach(p => arr.push(p));
  switch (b.type) {
    case 'hero': if (b.kicker) on.push(`<b>${b.kicker}</b>`); on.push(`<b>${b.title}</b>`); add(on, b.text); break;
    case 'text': if (b.heading) on.push(`<b>${b.heading}</b>`); add(on, b.body); break;
    case 'quote': on.push(`<b>${FP.char(b.speaker).name}:</b> “${b.text}”`); break;
    case 'dialogue': if (b.title) on.push(`<b>${b.title}</b>`); b.lines.forEach(l => on.push(`<b>${FP.char(l.speaker).name}:</b> ${l.text}`)); logic.push('Lines reveal one at a time on Next. Block completes on the last line.'); break;
    case 'image': case 'art': if (b.caption) on.push(b.caption); break;
    case 'video': { const m = FP.media(b.media); if (m) on.push(`<b>${m.title}</b> — ${m.channel || ''} ${m.duration ? '(' + m.duration + ')' : ''}`, m.url || ''); if (b.caption) on.push(b.caption); if (b.watchFor || (m && m.why)) on.push(`<b>Watch for:</b> ${String(b.watchFor || m.why).replace(/^watch for:?\s*/i, '')}`); break; }
    case 'callout': on.push(`<b>[${b.variant.toUpperCase()}]${b.title ? ' ' + b.title : ''}</b>`); add(on, b.body); if (b.cite) on.push(`<cite>${b.cite}</cite>`); if (b.input) logic.push('Private text box (stored on this device only, not reported).'); break;
    case 'stats': b.items.forEach(i => on.push(`<b>${i.value}</b> — ${i.label}${i.source ? ` <em>(${i.source})</em>` : ''}`)); if (b.note) on.push(b.note); break;
    case 'cards': if (b.title) on.push(`<b>${b.title}</b>`); b.cards.forEach((c, i) => on.push(`<b>Card ${i + 1} front:</b> ${c.front}  ·  <b>Back${c.verdict ? ' (' + c.verdict.toUpperCase() + ')' : ''}:</b> ${c.back}${c.cite ? ' <cite>' + c.cite + '</cite>' : ''}`)); logic.push('Tap to flip. Completes when every card has been flipped.'); break;
    case 'accordion': case 'tabs': b.items.forEach(i => { on.push(`<b>${i.title}</b>`); add(on, i.body); }); break;
    case 'process': if (b.title) on.push(`<b>${b.title}</b>`); b.steps.forEach((s, i) => { on.push(`<b>Step ${i + 1}: ${s.title}</b>`); add(on, s.body); }); break;
    case 'timeline': b.items.forEach(i => { on.push(`<b>${i.label} — ${i.title}</b>`); add(on, i.body); }); break;
    case 'labeled': b.markers.forEach((mk, i) => on.push(`<b>Marker ${i + 1} (${mk.x}%, ${mk.y}%): ${mk.title}</b> — ${FP.strip(Array.isArray(mk.body) ? mk.body.join(' ') : mk.body)}`)); break;
    case 'table': if (b.title) on.push(`<b>${b.title}</b>`); on.push(`<b>${b.headers.join(' | ')}</b>`); b.rows.forEach(r => on.push(r.join(' | '))); if (b.note) on.push(b.note); break;
    case 'pyramid': if (b.title) on.push(`<b>${b.title}</b>`); b.levels.forEach((l, i) => on.push(`<b>${i + 1}. ${l.title}</b> — ${FP.strip(l.body)}`)); logic.push('Top tier = most effective. Click each tier for detail.'); break;
    case 'poll': on.push(`<b>${b.question}</b>`); b.options.forEach(o => on.push(`○ ${o.label} — peers: ${o.pct}%`)); if (b.note) on.push(b.note); logic.push('Learner picks one; results layer shows static peer percentages. Not scored.'); break;
    case 'reflect': on.push(`<b>Gut check:</b> ${b.prompt}`); logic.push('Private text entry; stored locally; never reported to the LMS.'); break;
    case 'mcq': mcqLines(b).forEach(x => on.push(x)); logic.push('Practice only (not scored). Feedback per choice; retry allowed.'); break;
    case 'testout': on.push(`<b>${b.title || 'You probably already know this'}</b>`); add(on, b.text); b.questions.forEach(q => mcqLines(q).forEach(x => on.push(x))); logic.push(`Pass all → mark complete and skip: ${b.skips.join(', ')}. Any miss → continue normally.`); break;
    case 'story': b.chapters.forEach((c, i) => { on.push(`<b>Chapter ${i + 1}: ${c.title}</b>`); add(on, c.text); if (c.choice) { on.push(`<b>${c.choice.question}</b>`); c.choice.options.forEach(o => on.push(`${o.best ? '★' : '○'} ${o.text} — <em>${o.fb || ''}</em>`)); } }); logic.push('Chapter → choice layer → next chapter. ★ = best stopping point. Not scored.'); break;
    case 'charintro': b.characters.forEach(id => { const c = FP.char(id); on.push(`<b>${c.name}</b> — ${c.role}. ${c.carries || ''}`); }); break;
    case 'coursemap': COURSE.outline.forEach(o => on.push(`${o.num === 'Exam' ? 'Exam' : 'Module ' + o.num}: ${o.title} (${o.minutes} min)`)); break;
    case 'checklist': if (b.title) on.push(`<b>${b.title}</b>`); b.items.forEach(i => on.push(`☐ ${i}`)); break;
    case 'download': on.push(`<b>${b.title}</b>${b.desc ? ' — ' + b.desc : ''}`); on.push(`File: ${b.pdf || b.file}`); break;
    case 'continue': on.push(`[ ${b.label || 'Continue'} ]`); logic.push('Gate: content below unlocks when the interactions above are complete.'); break;
    case 'scenario': {
      if (b.title) on.push(`<b>${b.title}</b>`); add(on, b.intro);
      if (b.clock) logic.push(`Clock: "${b.clock.label}" in ${b.clock.unit}; warning at ${b.clock.warnAt}, limit ${b.clock.limit}. Each choice adds its time cost.`);
      if (b.scored) logic.push('Scored debrief: scorecard lists every decision with its score, area and citation.');
      logic.push(`Start node: ${b.start}`);
      Object.entries(b.nodes).forEach(([k, n]) => {
        if (n.end) { logic.push(`<b>END ${k} [${n.outcome.toUpperCase()}] ${n.title || ''}</b> — ${FP.strip(Array.isArray(n.text) ? n.text.join(' ') : n.text)}${n.cite ? ' <cite>' + n.cite + '</cite>' : ''}`); return; }
        logic.push(`<b>NODE ${k}</b>${n.speaker ? ' (' + FP.char(n.speaker).name + ')' : ''}: ${FP.strip(Array.isArray(n.text) ? n.text.join(' ') : n.text)}`);
        (n.choices || []).forEach((c, i) => logic.push(`   ${String.fromCharCode(65 + i)}. ${c.text} → ${c.next} [${toneTxt(c.tone)}${c.time ? ', +' + c.time + ' ' + (b.clock ? b.clock.unit : '') : ''}${c.score != null ? ', score ' + c.score : ''}${c.area ? ', ' + c.area : ''}] ${c.fb ? '— <em>' + c.fb + '</em>' : ''}${c.cite ? ' <cite>' + c.cite + '</cite>' : ''}`));
      });
      break;
    }
    case 'hotspot': {
      const sc = FP.scene(b.scene);
      if (b.title) on.push(`<b>${b.title}</b>`); add(on, b.intro);
      if (sc) {
        on.push(`Scene: ${sc.title || b.scene} (${sc.src})`);
        const want = b.hazards && b.hazards.length ? sc.hazards.filter(h => b.hazards.includes(h.id)) : sc.hazards;
        want.forEach(h => logic.push(`<b>HAZARD ${h.id}</b> [sev ${h.severity}] region x${h.x}% y${h.y}% w${h.w}% h${h.h}% — <b>${h.label}.</b> Why: ${h.why} Fix: ${h.fix} <cite>${h.cite}</cite>`));
        (sc.decoys || []).forEach(d => logic.push(`<b>DECOY ${d.id}</b> region x${d.x}% y${d.y}% — ${d.label}: ${d.why}`));
      }
      if (b.timeLimit) logic.push(`Soft timer ${b.timeLimit}s (shows target, never fails). "Show me what I missed" after time or 3 misses.`);
      if (b.rank) logic.push('Rank step: learner orders the top 3 hazards found by severity; compare with scene severity.');
      logic.push('Storyline variables: HazardsFound (number), Misses (number); hotspot per hazard sets a found state + feedback layer.');
      break;
    }
    case 'sort': case 'anchorjudge':
      if (b.title) on.push(`<b>${b.title}</b>`); if (b.prompt) add(on, b.prompt);
      on.push(`Buckets: ${b.buckets.map(x => x.label).join(' / ')}`);
      b.items.forEach(it => logic.push(`• ${FP.strip(it.text)}${it.art ? ' [art: ' + it.art + ']' : ''} → <b>${(b.buckets.find(x => x.id === it.bucket) || {}).label}</b>${it.fb ? ' — <em>' + it.fb + '</em>' : ''}`));
      break;
    case 'sequence': if (b.title) on.push(`<b>${b.title}</b>`); if (b.prompt) add(on, b.prompt); b.items.forEach((it, i) => logic.push(`${i + 1}. ${FP.strip(it)}`)); if (b.fb) logic.push(`Feedback: ${b.fb}`); logic.push('Items shuffled; learner orders them; Check shows the correct order.'); break;
    case 'match': if (b.title) on.push(`<b>${b.title}</b>`); on.push(`Diagram: ${b.src}`); b.tags.forEach(t => { const tg = b.targets.find(x => x.id === t.target) || {}; logic.push(`Tag "${t.text}" → target ${t.target} (${tg.x}%, ${tg.y}%)${t.fb ? ' — <em>' + t.fb + '</em>' : ''}`); }); break;
    case 'clearance': {
      if (b.title) on.push(`<b>${b.title}</b>`); add(on, b.intro);
      const r = FP.clearance(b.setup);
      logic.push(`Setup: ${Object.entries(b.setup).map(([k, v]) => k + '=' + v).join(', ')}`);
      logic.push(`Result: free fall ${r.freeFall} ft (${r.freeFallOk ? 'OK' : 'exceeds 6 ft'}), feet drop ${r.feet} ft, required clearance ${r.required} ft vs ${r.available} ft available → <b>${r.hits ? 'HITS' : 'CLEARS'}</b>`);
      (b.fixes || []).forEach(f => { const fr = FP.clearance(Object.assign({}, b.setup, f.set)); logic.push(`Fix "${f.label}": ${Object.entries(f.set).map(([k, v]) => k + '=' + v).join(', ')} → required ${fr.required} ft → ${fr.hits ? 'HITS' : 'CLEARS'}. ${f.text || ''}`); });
      if (b.explain) add(logic, b.explain);
      logic.push('Storyline variables: L, A, DD (3.5), HS (1), H (5), SM (2), Available; FF = L+H−A; F = L+DD+HS+H−A (SRL: 2+DD+HS); RC = F+SM. Learner predicts first, then animation reveals.');
      break;
    }
    case 'swing': if (b.title) on.push(`<b>${b.title}</b>`); add(on, b.intro); logic.push(`Slider d (horizontal offset). Extra drop = R − √(R² − d²)${b.R ? ', R = ' + b.R + ' ft' : ''}.`); break;
    case 'checkreview':
      if (b.title) on.push(`<b>${b.title}</b>`); add(on, b.intro);
      if (b.columns) on.push(`<b>${b.columns.join(' | ')}</b>`);
      b.rows.forEach(r => on.push(`${r.cells.join(' | ')}${r.error ? '  ⟵ <b>ERROR:</b> ' + r.error.text + (r.error.cite ? ' <cite>' + r.error.cite + '</cite>' : '') : ''}`));
      logic.push(`Learner flags rows; target ${b.findCount || b.rows.filter(r => r.error).length} errors; Check reveals all.`);
      break;
    case 'toolbox': ['stories', 'hazards', 'commitments'].forEach(k => { on.push(`<b>${k[0].toUpperCase() + k.slice(1)}:</b>`); b[k].forEach(x => on.push(`○ ${x.label} — ${FP.strip(x.text)}`)); }); logic.push('One pick from each set → 5-minute talk script assembled (open, story, hazard, fix, commitment, close).'); break;
    case 'commitment': on.push(`<b>${b.title || 'Commitment card'}</b>`); on.push(b.prompt); (b.examples || []).forEach(e => on.push(`e.g. ${e}`)); logic.push('Text entry → card with name, date, course; downloadable image.'); break;
    default: on.push(`[${b.type}]`);
  }
  return { on, logic };
}


/* ---------- thumbnails (dist/thumbs, from tools/make-thumbs.py) ---------- */
function thumbFor(b) {
  const t = n => { const p = path.join(THUMBS, n + '.jpg'); return fs.existsSync(p) ? p : null; };
  const base = f => path.basename(String(f || '')).replace(/\.[a-z0-9]+$/i, '');
  if (b.type === 'hotspot' && b.scene) return t('scene-' + b.scene + '-reveal') || t('scene-' + b.scene);
  if (b.type === 'video') { const m = FP.media(b.media); return m && m.youtube ? t(m.youtube) : null; }
  if (b.media) { const m = FP.media(b.media); if (m && m.src) return t(base(m.src)); }
  if (b.src) return t(base(b.src));
  if (b.type === 'scenario') { const n = Object.values(b.nodes).find(x => x.art || x.media); if (n) { if (n.art) return t(base(n.art)); const m = FP.media(n.media); if (m && m.src) return t(base(m.src)); } }
  return null;
}
function thumbPara(file, maxW = 300) {
  let w = 520, h = 293;
  try { const d = sizeOf(fs.readFileSync(file)); w = d.width; h = d.height; } catch (e) { /* default */ }
  const W2 = Math.min(maxW, w), H2 = Math.round(h * W2 / w);
  return new Paragraph({ children: [new ImageRun({ type: 'jpg', data: fs.readFileSync(file), transformation: { width: W2, height: H2 } })], spacing: { after: 40 } });
}

/* Audio clips per screen (tools/build-audio.py); named as in the narration MP3 package */
let CAST = {}; try { CAST = JSON.parse(fs.readFileSync(path.join(__dirname, 'voices.json'), 'utf8')); } catch (e) { /* no casting */ }
function voiceLines(segs, code) {
  return segs.map((s, i) => {
    const clip = (COURSE.audio || {})[FP.clipKey(s.who, s.text)];
    const c = FP.char(s.who), v = (CAST[s.who] || CAST.tasha || {}).voice || '';
    return `${i + 1}. <b>${c.name}</b>${v ? ' (' + v + ')' : ''}${clip ? ' — ' + code + '_' + (i + 1) + '_' + s.who + '.mp3, ' + clip[1] + ' s' : ' — not generated'}`;
  });
}
function screenTable(code, b) {
  const { on, logic } = describe(b);
  const media = b.media ? FP.media(b.media) : null;
  const sb = b.sb || {};
  const visual = [];
  if (sb.visual) visual.push(sb.visual);
  if (media && media.type === 'image') visual.push(`Photo: ${media.alt || ''} — ${media.credit || ''} (${media.license || ''})`);
  if (b.src) visual.push(`Art: ${b.src}${b.alt ? ' — ' + b.alt : ''}`);
  if (b.speaker) visual.push(`Character: ${FP.char(b.speaker).name} (${FP.char(b.speaker).role})`);
  const rows = [
    ['On-screen text', on.length ? on : ['—']],
    ['Narration (VO)', b.narration ? paras(b.narration) : ['— (no narration)']],
  ];
  const voiced = voiceLines(FP.blockScript(b), code);
  if (voiced.length) rows.push(['Voice / audio', voiced]);
  if (logic.length) rows.push(['Interaction / branching logic', logic]);
  if (visual.length) rows.push(['Visual', visual]);
  const th = thumbFor(b);
  if (th) rows.push(['Thumbnail', [thumbPara(th)]]);
  if (sb.search) rows.push(['Content Library search', [sb.search]]);
  rows.push(['Build', [sb.build || BUILD[b.type] || b.type]]);
  if (sb.notes) rows.push(['Notes', [sb.notes]]);
  const header = new TableRow({ tableHeader: false, cantSplit: true, children: [
    cell(P(`${code}`, { run: { bold: true, color: 'FFFFFF', size: 18 }, after: 0 }), LABEL_W, { fill: NAVY }),
    cell(P(`${(LABEL[b.type] || b.type).toUpperCase()}${b.id ? '  ·  id ' + b.id : ''}${b.required === false ? '  ·  optional' : ''}`, { run: { bold: true, color: 'FFFFFF', size: 18 }, after: 0 }), VALUE_W, { fill: NAVY })
  ] });
  const body = rows.map(([k, v]) => new TableRow({ children: [
    cell(P(k, { run: { bold: true, size: 17, color: MUTED }, after: 0 }), LABEL_W, { fill: SOFT }),
    cell(v.map(x => x instanceof Paragraph ? x : P(x, { run: { size: 19 }, after: 50 })), VALUE_W)
  ] }));
  return [new Table({ width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: [LABEL_W, VALUE_W], rows: [header].concat(body) }), P('', { after: 120 })];
}

/* ---------- document sections ---------- */
const children = [];
const meta = COURSE.meta;

// Title page
const LOGO = path.join(ROOT, 'fall-protection-cp', 'assets', 'img', 'upchurch-logo.png');
children.push(new Paragraph({ spacing: { before: 2000, after: 240 }, children: [fs.existsSync(LOGO)
  ? new ImageRun({ type: 'png', data: fs.readFileSync(LOGO), transformation: { width: 236, height: 53 } })
  : new TextRun({ text: 'Upchurch', font: FONT, bold: true, size: 28, color: ORANGE })] }));
children.push(new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: meta.title, font: FONT, bold: true, size: 64, color: NAVY })] }));
children.push(new Paragraph({ spacing: { after: 360 }, children: [new TextRun({ text: 'Master Storyboard', font: FONT, size: 40, color: INK })] }));
children.push(P(meta.subtitle, { run: { italics: true, size: 24, color: MUTED }, after: 360 }));
children.push(grid(['Item', 'Plan'], [
  ['Version', meta.version], ['Audience', meta.audience], ['Total time', `${meta.minutes} minutes (orientation, 9 modules, final exam), self-paced, bookmarked`],
  ['Delivery', 'Rise 360 narrative modules + Storyline 360 blocks for branching and calculations; SCORM 1.2; PowerPoint facilitator version; HTML5 reference build'],
  ['Standards basis', meta.standards.join('; ')], ['Pass rule', meta.passRule + '; field verification sign-off by the safety manager before designation'],
  ['Source of truth', 'fall-protection-cp/content/*.js — this storyboard, the deck, the job aids and the SCORM build are generated from it']
], [2400, CONTENT_W - 2400]));
children.push(P(meta.disclaimer, { run: { italics: true, size: 18, color: MUTED }, before: 240 }));
children.push(pageBreak());

// TOC
children.push(H1('Contents'));
children.push(new TableOfContents('Contents', { hyperlink: true, headingStyleRange: '1-2' }));
children.push(P('<em>Right-click the table and choose Update Field if page numbers are blank.</em>', { run: { size: 18, color: MUTED } }));
children.push(pageBreak());

// How to read
children.push(H1('How to read this storyboard'));
children.push(P('Every screen of the course appears below as one table. Screen codes read <b>M5-L2-03</b> = Module 5, Lesson 2, screen 3. The <b>Build</b> row says whether the screen is a native Rise 360 block or a Storyline 360 interaction embedded as a Storyline block, with the variables and triggers to use. <b>Narration</b> is the voice-over script (text-to-speech in Storyline or recorded later; captions on every screen). Citations appear as <cite>1926.502(d)(16)</cite> receipts in feedback, never as on-screen headlines.'));
children.push(H2('Course map'));
let run = 0;
children.push(grid(['#', 'Module', 'Min', 'Running', 'Main build'], COURSE.outline.map(o => { run += o.minutes; return [String(o.num), o.title, String(o.minutes), String(run), o.build]; }), [800, 5280, 900, 1100, 2000]));
children.push(H2('Recurring characters (fictional composites)'));
children.push(grid(['Character', 'Role', 'What they carry'], Object.values(COURSE.characters).filter(c => c.id !== 'narrator').map(c => [c.name, c.role, c.carries]), [1500, 3000, CONTENT_W - 4500]));
children.push(H2('The project: ' + COURSE.project.name));
children.push(grid(['Fact', 'Detail'], COURSE.project.facts, [2000, CONTENT_W - 2000]));

// Build guide
children.push(pageBreak());
children.push(H1('Rise 360 and Storyline 360 build guide'));
children.push(H2('Block mapping'));
children.push(grid(['Storyboard element', 'Build as'], Object.keys(BUILD).map(k => [LABEL[k] || k, BUILD[k]]), [2600, CONTENT_W - 2600]));
children.push(H2('Storyline conventions'));
bullets([
  'Slide size 16:9 (1280 × 720) for blocks embedded in Rise; player: no sidebar, no seekbar on decision slides, captions on, Modern player, accent #F26B1D.',
  'One Storyline file per module (e.g. FPCP_M5_Interactions.story); each interaction is its own scene so it can be published as a separate Storyline block.',
  'Variables are named by activity: M3_HazardsFound, M3_Misses, M5_L, M5_A, M5_DD, M5_HS, M5_H, M5_SM, M5_Avail, M5_RC, M7_Clock, M9_Score. Completion: a "Complete" trigger at the end slide (Rise: "Complete block above" Continue).',
  'Branching: a slide per decision node, feedback on a layer, Next jumps per the node map in the Interaction row. End slides colored by outcome: good #1D7F52, partial #A86A00, poor #C23A2E.',
  'Clearance math: adjust variable triggers set the inputs; a JavaScript-free calculation uses "Adjust variable" steps: RC = L + DD + HS + H − A + SM. Motion path for the fall uses the same numbers scaled 20 px per foot.',
  'Accessibility: alt text on every image; focus order set; keyboard-operable drag-drop alternatives (click-to-place); no information by color alone; narration captions (closed captions from the Narration row).',
  'Exam: Storyline quiz with question banks (one bank per exam slot, draw 1 of 3), results slide at 80%, plus a critical-items variable (all 8 must be correct) checked before "Pass" is reported. SCORM 1.2 reports one score and passed/failed.',
].concat([]), {}).forEach(p => children.push(p));
children.push(H2('Rise 360 conventions'));
bullets([
  'One Rise lesson per storyboard lesson; lesson banner from the Lesson banner screen; theme font Public Sans (body) / Barlow Condensed (headings) if custom fonts are enabled, otherwise Lato/Oswald.',
  'Navigation: restricted (sequential) for the LMS build; Continue blocks set to "Complete block above" before every Storyline block.',
  'Job aids are Attachment blocks (PDF). Videos use Multimedia › Embed with the YouTube URL in the Video screen.',
  'Character photos: Content Library 360 characters in construction PPE (search terms in each screen) or the illustrated avatars from the HTML5 build exported as PNG.',
  'Publish: LMS › SCORM 1.2, report "Passed/Incomplete", tracking by Storyline block (final exam) at 80%.',
]).forEach(p => children.push(p));

// Modules
COURSE.modules.forEach(m => {
  children.push(pageBreak());
  children.push(H1(`Module ${m.num}. ${m.title} (${m.minutes} min)`));
  if (m.tagline) children.push(P(`<em>${m.tagline}</em>`, { run: { size: 22, color: MUTED } }));
  children.push(grid(['Item', 'Detail'], [
    ['Main build', m.build || (COURSE.outline.find(o => o.id === m.id) || {}).build || ''],
    ['Objectives', (m.objectives || []).map((o, i) => `${i + 1}. ${o}`)],
    ['Citations', (m.citations || []).join('; ')],
    ['Lessons', m.lessons.map(l => `${l.title} (${l.minutes || '?'} min)`)],
    ['Job aids', (m.jobAids || []).map(j => `${j.title} — ${j.pdf || j.file}`).concat((m.jobAids || []).length ? [] : ['—'])],
    ['Hero image', m.hero && FP.media(m.hero) ? `${FP.media(m.hero).alt} — ${FP.media(m.hero).credit}` : '—']
  ], [2000, CONTENT_W - 2000]));
  m.lessons.forEach((l, li) => {
    children.push(H2(`Lesson ${li + 1}: ${l.title}${l.minutes ? ' (' + l.minutes + ' min)' : ''}`));
    l.blocks.forEach((b, bi) => {
      const code = `M${m.num}-L${li + 1}-${String(bi + 1).padStart(2, '0')}`;
      screenTable(code, b).forEach(x => children.push(x));
    });
  });
  if (m.kc && m.kc.questions) {
    children.push(H2(`Knowledge check (${m.kc.questions.length} questions, practice, not graded)`));
    m.kc.questions.forEach((q, qi) => {
      screenTable(`M${m.num}-KC-${qi + 1}`, Object.assign({ type: 'mcq', id: q.id || `m${m.num}-kc-${qi + 1}`, sb: { build: `${RISE}: Knowledge check block (end of module), feedback + citation` } }, q)).forEach(x => children.push(x));
    });
  }
});

// Exam
if (COURSE.exam) {
  const ex = COURSE.exam;
  children.push(pageBreak());
  children.push(H1('Final exam (25 min)'));
  children.push(P(`40 questions drawn one per slot from pools of 3 (${ex.slots.reduce((s, x) => s + x.pool.length, 0)} questions total). Pass = 80% (32/40) <b>and</b> all 8 critical items correct. 3 attempts; after a failed attempt the modules tied to missed items reopen for review before the next attempt. Feedback names the right answer, the reason and the citation. <b>Have a qualified person at your company review every item before launch.</b>`));
  const areas = {};
  ex.slots.forEach(s => { areas[s.area] = areas[s.area] || { n: 0, crit: [] }; areas[s.area].n++; if (s.critical) areas[s.area].crit.push(s.tag || s.id); });
  children.push(grid(['Area', 'Questions', 'Critical items'], Object.entries(areas).map(([a, v]) => [`${a.toUpperCase()} — ${(COURSE.outline.find(o => o.id === a) || {}).title || ''}`, String(v.n), v.crit.length ? `${v.crit.length} (${v.crit.join(', ')})` : '0']).concat([['Total', String(ex.slots.length), String(ex.slots.filter(s => s.critical).length)]]), [5600, 1600, CONTENT_W - 7200]));
  ex.slots.forEach(s => {
    children.push(H3(`Slot ${s.id} · ${s.area.toUpperCase()}${s.critical ? ' · CRITICAL (' + (s.tag || '') + ')' : ''}`));
    s.pool.forEach((q, qi) => {
      const lines = [`<b>${String.fromCharCode(97 + qi)}) [${q.type}]</b> ${q.stem}`];
      if (q.options) q.options.forEach((o, i) => lines.push(`${o.correct ? '✔' : '○'} ${String.fromCharCode(65 + i)}. ${o.text}`));
      if (q.type === 'numeric') lines.push(`Answer: <b>${q.answer} ${q.unit || ''}</b> (± ${q.tolerance || 0})`);
      if (q.type === 'sequence') q.items.forEach((it, i) => lines.push(`${i + 1}. ${it}`));
      if (q.type === 'hotspot') lines.push(`Scene: ${q.scene}; correct regions: ${(q.correct || []).join(', ')}`);
      lines.push(`<b>Explain:</b> ${q.explain}  <cite>${q.cite}</cite>`);
      lines.forEach(t => children.push(P(t, { run: { size: 19 }, after: 30 })));
      children.push(P('', { after: 60 }));
    });
  });
}

// Field verification + certificate
children.push(pageBreak());
children.push(H1('Field verification and certificate'));
children.push(P('A one-page checklist the safety manager completes on a live site. Each item is marked observed, pass or redo, with date and signature. The learner is not designated until it is signed and the employer grants authority.'));
children.push(grid(['#', 'Field verification item', 'Observed', 'Pass', 'Redo'], [
  'Walks an active work area and identifies existing and predictable fall hazards', 'Selects a compliant system for two real tasks and explains why',
  'Inspects a harness, lanyard or SRL, and an anchor, and correctly tags one item', 'Calculates fall clearance for an actual tie-off point',
  'Inspects a guardrail run and a hole cover against spec', 'Walks through the site rescue plan and confirms equipment is on hand',
  'Demonstrates a stop-work conversation (role-play with the safety manager is acceptable)', 'Reviews a worker training certification record for completeness'
].map((t, i) => [String(i + 1), t, '☐', '☐', '☐']), [500, CONTENT_W - 500 - 3 * 900, 900, 900, 900]));
children.push(H2('Certificate wording'));
children.push(P(`“${meta.certificate}”`, { run: { italics: true } }));

// Media credits
const media = Object.entries(COURSE.media || {}).filter(([, m]) => m);
if (media.length) {
  children.push(pageBreak());
  children.push(H1('Media sources and licenses'));
  children.push(grid(['Id', 'Asset', 'Credit / license', 'Source'], media.map(([k, m]) => [k, m.type === 'video' ? `${m.title} (${m.channel || ''})` : (m.alt || ''), m.type === 'video' ? 'YouTube embed (standard YouTube license; embedded, not downloaded)' : `${m.credit || ''} — ${m.license || ''}`, m.source || m.url || '']), [1700, 3300, 2700, CONTENT_W - 7700]));
}

/* ---------- document ---------- */
const doc = new Document({
  creator: 'Upchurch Training', title: `${meta.title} — Master Storyboard`, description: 'Generated from fall-protection-cp/content',
  features: { updateFields: true },
  styles: {
    default: { document: { run: { font: FONT, size: 20, color: INK } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 34, bold: true, color: NAVY }, paragraph: { spacing: { before: 240, after: 160 }, keepNext: true, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 26, bold: true, color: ORANGE }, paragraph: { spacing: { before: 280, after: 120 }, keepNext: true, outlineLevel: 1 } },
      { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 21, bold: true, color: NAVY }, paragraph: { spacing: { before: 200, after: 80 }, keepNext: true, outlineLevel: 2 } }
    ]
  },
  numbering: { config: [{ reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 270 } } } }] }] },
  sections: [{
    properties: { page: { size: { width: PAGE_W, height: 15840 }, margin: { top: 1080, bottom: 1080, left: MARGIN, right: MARGIN } } },
    headers: { default: new Header({ children: [new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ORANGE, space: 4 } }, children: [new TextRun({ text: `${meta.title} · Master Storyboard · ${meta.version}`, font: FONT, size: 16, color: MUTED })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: 'Page ', font: FONT, size: 16, color: MUTED }), new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 16, color: MUTED }), new TextRun({ text: ' · Fictional composites; review by a qualified person before launch', font: FONT, size: 16, color: MUTED })] })] }) },
    children
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, buf);
  const screens = COURSE.modules.reduce((s, m) => s + m.lessons.reduce((a, l) => a + l.blocks.length, 0), 0);
  console.log(`storyboard: ${COURSE.modules.length} modules, ${screens} screens, ${(buf.length / 1024).toFixed(0)} KB → ${path.relative(ROOT, OUT)}`);
});
