/* Resolves the course this build targets (env COURSE_ID, default fall-protection-cp) → absolute paths.
   One set of tools builds every course in the repo; profiles live in tools/courses.json. */
'use strict';
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const ALL = require('./courses.json');
const ID = process.env.COURSE_ID || 'fall-protection-cp';
const p = ALL[ID];
if (!p) { console.error(`Unknown COURSE_ID "${ID}". Known: ${Object.keys(ALL).filter(k => k[0] !== '_').join(', ')}`); process.exit(1); }
module.exports = {
  ID, ROOT,
  COURSE_DIR: path.join(ROOT, p.dir),
  DELIV: path.join(ROOT, p.deliverables),
  DIST: path.join(ROOT, p.dist),
  PREFIX: p.prefix, DECK: p.deck, SHORT: p.short, DIR: p.dir,
  VOICES: path.join(ROOT, p.voices)
};
