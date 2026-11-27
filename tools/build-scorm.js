#!/usr/bin/env node
/* Writes imsmanifest.xml (SCORM 1.2, single SCO) and zips the course into
   deliverables/FallProtection-CP_SCORM12.zip. Excludes dev/ and source-only files. */
'use strict';
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { loadCourse } = require('./load-content');

const ROOT = path.resolve(__dirname, '..');
const PF = require('./profile');
const COURSE_DIR = PF.COURSE_DIR;
const OUT = path.join(PF.DELIV, `${PF.PREFIX}_SCORM12.zip`);
const { COURSE } = loadCourse({ quiet: true });

function walk(dir, base = '') {
  let out = [];
  for (const f of fs.readdirSync(dir)) {
    const rel = base ? `${base}/${f}` : f;
    if (/^(dev|node_modules)$/.test(f) || f.startsWith('.') || f === 'imsmanifest.xml') continue;
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) out = out.concat(walk(p, rel)); else out.push(rel);
  }
  return out;
}
const xmlEsc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const files = walk(COURSE_DIR).sort();
const title = `${COURSE.meta.title} (${COURSE.meta.version})`;
const manifest = `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="${COURSE.meta.id}" version="1.0"
  xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>
  <organizations default="ORG-${COURSE.meta.id}">
    <organization identifier="ORG-${COURSE.meta.id}">
      <title>${xmlEsc(title)}</title>
      <item identifier="ITEM-1" identifierref="RES-1" isvisible="true">
        <title>${xmlEsc(COURSE.meta.title)}</title>
        <adlcp:masteryscore>80</adlcp:masteryscore>
        <adlcp:maxtimeallowed></adlcp:maxtimeallowed>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="RES-1" type="webcontent" adlcp:scormtype="sco" href="index.html">
${files.map(f => `      <file href="${xmlEsc(f)}"/>`).join('\n')}
    </resource>
  </resources>
</manifest>
`;
fs.writeFileSync(path.join(COURSE_DIR, 'imsmanifest.xml'), manifest);
fs.mkdirSync(path.dirname(OUT), { recursive: true });
if (fs.existsSync(OUT)) fs.unlinkSync(OUT);
execSync(`cd "${COURSE_DIR}" && zip -q -r -X "${OUT}" imsmanifest.xml ${files.map(f => `"${f}"`).join(' ')}`, { maxBuffer: 1 << 26 });
const kb = Math.round(fs.statSync(OUT).size / 1024);
console.log(`imsmanifest.xml: ${files.length} files · ${path.relative(ROOT, OUT)} ${kb} KB`);
