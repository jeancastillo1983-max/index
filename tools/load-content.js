#!/usr/bin/env node
/* Loads the course content files in a sandbox and returns the COURSE object.
   Used by validate.js, build-storyboard.js, build-pptx, build-jobaids. */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..', 'fall-protection-cp');

function loadCourse(opts) {
  opts = opts || {};
  const sandbox = { console, Math, JSON, Date, Object, Array, String, Number };
  sandbox.window = sandbox; sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  const files = ['js/core.js', 'content/course.js', 'content/media.js', 'content/scenes.js']
    .concat(['m0', 'm1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9'].map(m => `content/${m}.js`))
    .concat(['content/exam.js', 'content/audio.js']);
  const loaded = [], missing = [], errors = [];
  for (const f of files) {
    const p = path.join(ROOT, f);
    if (!fs.existsSync(p)) { missing.push(f); continue; }
    try { vm.runInContext(fs.readFileSync(p, 'utf8'), sandbox, { filename: f }); loaded.push(f); }
    catch (e) { errors.push(`${f}: ${e.message}`); }
  }
  const COURSE = sandbox.COURSE;
  if (!opts.quiet) {
    if (missing.length) console.error('missing:', missing.join(', '));
    if (errors.length) console.error('LOAD ERRORS:\n  ' + errors.join('\n  '));
  }
  return { COURSE, FP: sandbox.FP, loaded, missing, errors, ROOT };
}

module.exports = { loadCourse, ROOT };
if (require.main === module) {
  const { COURSE, loaded } = loadCourse();
  console.log('loaded', loaded.length, 'files;', COURSE.modules.length, 'modules');
}
