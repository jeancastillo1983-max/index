#!/usr/bin/env node
/* Lists every voice clip the course needs: block narration (+ quote/dialogue lines in the
   character's voice), story chapters, and scenario cards (narrator + quoted speech).
   Output: JSON array of { key, who, text, refs:[screen codes] } on stdout (deduplicated by key). */
'use strict';
const { loadCourse } = require('./load-content');
const { COURSE, FP } = loadCourse({ quiet: true });

const clips = new Map();
function add(segs, ref) {
  segs.forEach(s => {
    if (!s.text) return;
    const key = FP.clipKey(s.who, s.text);
    if (!clips.has(key)) clips.set(key, { key, who: s.who, text: s.text, refs: [] });
    const c = clips.get(key); if (!c.refs.includes(ref)) c.refs.push(ref);
  });
}
COURSE.modules.forEach(m => m.lessons.forEach((l, li) => l.blocks.forEach((b, bi) => {
  const code = `M${m.num}-L${li + 1}-${String(bi + 1).padStart(2, '0')}`;
  add(FP.blockScript(b), code);
  if (b.type === 'story') (b.chapters || []).forEach((ch, ci) => add(FP.chapterScript(b, ch), `${code}-ch${ci + 1}`));
  if (b.type === 'scenario') Object.entries(b.nodes || {}).forEach(([k, n]) => add(FP.nodeScript(n), `${code}-${k}`));
})));
process.stdout.write(JSON.stringify(Array.from(clips.values())));
