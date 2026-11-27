#!/usr/bin/env node
/* Loads the course content files in a sandbox and returns the COURSE object.
   Used by validate.js, build-storyboard.js, build-pptx, build-jobaids.
   Course = tools/courses.json profile named by env COURSE_ID (default fall-protection-cp). */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = require('./profile').COURSE_DIR;

function loadCourse(opts) {
  opts = opts || {};
  const sandbox = { console, Math, JSON, Date, Object, Array, String, Number };
  sandbox.window = sandbox; sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  const loaded = [], missing = [], errors = [];
  const run = f => {
    const p = path.join(ROOT, f);
    if (!fs.existsSync(p)) { missing.push(f); return; }
    try { vm.runInContext(fs.readFileSync(p, 'utf8'), sandbox, { filename: f }); loaded.push(f); }
    catch (e) { errors.push(`${f}: ${e.message}`); }
  };
  ['js/core.js', 'content/course.js'].forEach(run);
  const order = (sandbox.COURSE && sandbox.COURSE.order) || ['m0', 'm1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9'];
  ['content/media.js', 'content/scenes.js'].concat(order.map(m => `content/${m}.js`))
    .concat(['content/exam.js', 'content/audio.js']).forEach(run);
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
