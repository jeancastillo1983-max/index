// Riverside roof (low-slope TPO) and the "tomorrow" variant
'use strict';
const { C, poly, polyNS, line, rect, circ, path, worker, post, flag, cable, plywood, svgDoc, scaleAt, r } = require('./lib');
const W = 1600, H = 900;
const edgeX = y => 470 - (y - 360) * 0.86;        // west (left) roof edge — open
const eastX = y => 1430 + (y - 360) * 0.3;        // east edge — 24 in parapet

function sky() {
  let s = `<rect width="${W}" height="${H}" fill="url(#rsky)"/>`;
  [[30, 210, 60, 130], [100, 170, 44, 170], [160, 230, 70, 110], [250, 190, 40, 150], [1500, 220, 60, 120]].forEach(([x, y, w, h]) => { s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#B9CADA"/>`; });
  s += `<path d="M0 330 Q120 300 240 320 T520 330 L520 900 L0 900 Z" fill="#A9BDA3"/>`;
  // ground far below on the west side
  s += `<path d="M0 420 L480 360 L480 900 L0 900 Z" fill="${C.ground}"/>`;
  s += `<path d="M0 520 L480 420 L480 470 L0 600 Z" fill="#80878E"/><path d="M0 562 L480 446" stroke="#F3F1E6" stroke-width="2.5" stroke-dasharray="12 12"/>`;
  s += `<path d="M0 640 L480 520 L480 900 L0 900 Z" fill="#8FA083"/>`;
  for (let i = 0; i < 6; i++) { const x = 30 + i * 70, y = 650 - i * 16; s += `<circle cx="${x}" cy="${y}" r="16" fill="#6F8F62"/>`; }
  s += `<g transform="translate(120 520) scale(.38)"><rect width="90" height="34" rx="6" fill="#C8574A" stroke="${C.ink}" stroke-width="3"/><circle cx="20" cy="38" r="9" fill="${C.dark}"/><circle cx="72" cy="38" r="9" fill="${C.dark}"/></g>`;
  s += `<g transform="translate(300 470) scale(.36)"><rect width="90" height="34" rx="6" fill="#EDEDED" stroke="${C.ink}" stroke-width="3"/><circle cx="20" cy="38" r="9" fill="${C.dark}"/><circle cx="72" cy="38" r="9" fill="${C.dark}"/></g>`;
  return s;
}

function roofSurface() {
  let s = '';
  // west edge fascia (roof edge thickness)
  s += poly([[edgeX(360), 360], [edgeX(900), 900], [edgeX(900) - 18, 900], [edgeX(360) - 18, 364]], '#D9DEE2');
  // membrane
  s += poly([[edgeX(360), 360], [eastX(360), 360], [eastX(900), 900], [edgeX(900), 900]], C.tpo);
  // seams
  for (let y = 400; y < 900; y += 46) s += `<line x1="${edgeX(y) + 6}" y1="${y}" x2="${eastX(y) - 6}" y2="${y}" stroke="${C.tpoD}" stroke-width="2"/>`;
  // east parapet beyond + void past it
  s += polyNS([[eastX(360), 330], [W, 330], [W, H], [eastX(900), H]], '#C9D7E3');
  // 24 in parapet: inner face, cap, outer edge
  s += poly([[eastX(360), 360], [eastX(900), 900], [eastX(900) + 6, 900 - 50], [eastX(360) + 4, 360 - 26]], '#C3CAD0');
  s += poly([[eastX(360) + 4, 334], [eastX(900) + 6, 850], [eastX(900) + 26, 842], [eastX(360) + 16, 330]], '#9AA3AB');
  for (let y = 380; y < 900; y += 36) s += `<line x1="${r(eastX(y) + 2)}" y1="${y}" x2="${r(eastX(y) + 4)}" y2="${r(y - 26 - (y - 360) * 0.045)}" stroke="#A9B1B8" stroke-width="1.5"/>`;
  // back edge: distant roof edge with existing perimeter guardrail (complete)
  for (let x = edgeX(360) + 40; x < eastX(360) - 10; x += 70) s += post(x, 360, 44, '#F2B230');
  s += cable(edgeX(360) + 40, 316, eastX(360) - 20, 316, 2) + cable(edgeX(360) + 40, 338, eastX(360) - 20, 338, 2);
  return s;
}

function warningLine(points) {
  // stanchions (weighted bases) with flagged rope 34–39 in high
  let s = '';
  const P = points.map(([x, y]) => ({ x, y, h: 58 * scaleAt(y, 360, 900, 0.62, 1.12) }));
  for (let i = 0; i < P.length - 1; i++) {
    const a = P[i], b = P[i + 1];
    s += `<path d="M${r(a.x)} ${r(a.y - a.h)} Q${r((a.x + b.x) / 2)} ${r((a.y + b.y) / 2 - (a.h + b.h) / 2 + 6)} ${r(b.x)} ${r(b.y - b.h)}" fill="none" stroke="#1C2228" stroke-width="3.2"/>`;
    for (let t = 0.25; t < 1; t += 0.25) { const x = a.x + (b.x - a.x) * t, y = a.y + (b.y - a.y) * t - (a.h + (b.h - a.h) * t) + 4; s += `<path d="M${r(x)} ${r(y)} l-5 10 l10 0 z" fill="${C.orange}" stroke="${C.ink}" stroke-width="1"/>`; }
  }
  P.forEach(p => { s += `<ellipse cx="${r(p.x)}" cy="${r(p.y)}" rx="${r(16 * p.h / 58)}" ry="${r(6 * p.h / 58)}" fill="${C.dark}" stroke="${C.ink}" stroke-width="2"/>` + `<rect x="${r(p.x - 3)}" y="${r(p.y - p.h)}" width="6" height="${r(p.h)}" fill="${C.orange}" stroke="${C.ink}" stroke-width="1.5"/>`; });
  return s;
}

function skylight(x, y, w, d, screened, open) {
  // raised curb + acrylic dome; screened = steel mesh guard
  let s = '';
  const sk = 0.25;
  s += poly([[x, y], [x + w, y], [x + w - d * sk, y + d], [x - d * sk, y + d]], '#8E979F');                                                     // curb top/outline
  s += poly([[x - d * sk, y + d], [x + w - d * sk, y + d], [x + w - d * sk, y + d + 16], [x - d * sk, y + d + 16]], '#A7AFB6');                    // curb face
  if (open) {
    s += poly([[x + 6, y + 4], [x + w - 6, y + 4], [x + w - 6 - (d - 8) * sk, y + d - 4], [x + 6 - (d - 8) * sk, y + d - 4]], '#2A333C');        // open hole
  } else {
    s += `<path d="M${x + 4} ${y + d - 2} Q${x + w / 2 - d * sk / 2} ${y - 30} ${x + w - 4 - d * sk} ${y + d - 2} Z" fill="${C.glass}" stroke="${C.ink}" stroke-width="2.5" opacity=".95"/>`;
    s += `<path d="M${x + 24} ${y + d - 10} Q${x + w / 2 - 10} ${y - 10} ${x + w / 2 + 30} ${y + 2}" fill="none" stroke="#E8F4FC" stroke-width="4" opacity=".8"/>`;
  }
  if (screened) {
    const top = y - 18;
    s += polyNS([[x - 6, top], [x + w + 6, top], [x + w + 6 - (d + 8) * sk, top + d + 8], [x - 6 - (d + 8) * sk, top + d + 8]], 'none', `stroke="${C.ink}" stroke-width="3"`);
    for (let i = 1; i < 9; i++) { const xx = x - 6 + (w + 12) * i / 9; s += `<line x1="${r(xx)}" y1="${top}" x2="${r(xx - (d + 8) * sk)}" y2="${top + d + 8}" stroke="#56616B" stroke-width="1.6"/>`; }
    for (let j = 1; j < 4; j++) { const yy = top + (d + 8) * j / 4; s += `<line x1="${r(x - 6 - (yy - top) * sk)}" y1="${r(yy)}" x2="${r(x + w + 6 - (yy - top) * sk)}" y2="${r(yy)}" stroke="#56616B" stroke-width="1.6"/>`; }
    [[x - 6, top], [x + w + 6, top]].forEach(([px, py]) => { s += line(px, py, px, py + 26, '#56616B', 3); });
  }
  return s;
}

function rtu(x, y, w, h, d) {
  let s = poly([[x, y], [x + w, y], [x + w + d, y - d * 0.6], [x + d, y - d * 0.6]], '#C9CFD4');
  s += poly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], '#B3BAC0');
  s += poly([[x + w, y], [x + w + d, y - d * 0.6], [x + w + d, y + h - d * 0.6], [x + w, y + h]], '#9EA6AD');
  for (let i = 1; i < 6; i++) s += line(x + 10, y + i * h / 6, x + w * 0.55, y + i * h / 6, '#8C959D', 2);
  s += circ(x + w * 0.78, y + h * 0.45, h * 0.28, '#8C959D');
  return s;
}

function hatch(x, y, w, d, open) {
  const sk = 0.25;
  let s = poly([[x, y], [x + w, y], [x + w - d * sk, y + d], [x - d * sk, y + d]], '#8E979F');
  s += poly([[x - d * sk, y + d], [x + w - d * sk, y + d], [x + w - d * sk, y + d + 14], [x - d * sk, y + d + 14]], '#A7AFB6');
  if (open) {
    s += poly([[x + 5, y + 4], [x + w - 5, y + 4], [x + w - 5 - (d - 8) * sk, y + d - 4], [x + 5 - (d - 8) * sk, y + d - 4]], '#1E262E');
    // ladder top rails
    s += line(x + w * 0.35, y + d - 6, x + w * 0.33, y - 26, '#D8B24A', 5) + line(x + w * 0.62, y + d - 6, x + w * 0.6, y - 26, '#D8B24A', 5);
    // lid standing open
    s += poly([[x, y], [x + w, y], [x + w + 6, y - d * 1.3], [x + 6, y - d * 1.3]], '#7E878F');
  } else {
    s += poly([[x + 2, y - 6], [x + w + 2, y - 6], [x + w - d * sk + 2, y + d - 6], [x - d * sk + 2, y + d - 6]], '#7E878F');
  }
  return s;
}

function hoist(tomorrow) {
  // material hoist landing at the west edge (back): mast outside the edge, platform at roof level
  let s = '';
  const mx = edgeX(400) - 70;
  s += rect(mx - 8, 120, 16, 340, '#E0A526') + Array.from({ length: 11 }, (_, i) => line(mx - 8, 130 + i * 30, mx + 8, 150 + i * 30, C.ink, 2)).join('');
  // platform with TPO rolls
  s += poly([[mx - 40, 404], [edgeX(404) + 4, 400], [edgeX(440) + 4, 436], [mx - 64, 440]], '#C7CDD2');
  s += rect(mx - 30, 386, 64, 18, '#F2F2EE', 'rx="8"') + rect(mx - 20, 370, 64, 18, '#F2F2EE', 'rx="8"');
  // gate posts beside the opening — rail removed (pieces lying)
  s += post(edgeX(386) + 26, 386, 40, '#F2B230') + post(edgeX(452) + 26, 452, 46, '#F2B230');
  s += line(edgeX(470) + 60, 470, edgeX(470) + 150, 462, '#F2B230', 5);
  return s;
}

function roofScene(tomorrow) {
  let s = sky();
  s += roofSurface();
  if (!tomorrow) s += hoist(false); else s += hoist(true);
  // RTUs at back
  s += rtu(1080, 392, 150, 58, 40) + rtu(1260, 392, 110, 50, 34);
  // warning line along the west edge: correct (≥6 ft) at the back, too close at the front
  if (!tomorrow) {
    s += warningLine([[edgeX(470) + 170, 470], [edgeX(560) + 170, 560], [edgeX(650) + 160, 650], [edgeX(720) + 60, 720], [edgeX(800) + 44, 800], [edgeX(880) + 40, 880]]);
  } else {
    // tomorrow: the work moved; line still where it was yesterday
    s += warningLine([[edgeX(470) + 170, 470], [edgeX(560) + 170, 560], [edgeX(650) + 160, 650], [edgeX(720) + 160, 720], [edgeX(800) + 160, 800], [edgeX(880) + 160, 880]]);
  }
  // skylights
  s += skylight(610, 556, 150, 54, false, false);            // skylight-open (no screen)
  s += skylight(930, 470, 150, 50, !tomorrow, false);        // screened (tomorrow: screen pulled for flashing)
  if (tomorrow) s += `<g>${polyNS([[1110, 540], [1270, 540], [1256, 596], [1096, 596]], 'none', `stroke="${C.ink}" stroke-width="3"`)}${line(1110, 540, 1096, 596, '#56616B', 2)}${line(1150, 540, 1136, 596, '#56616B', 2)}${line(1190, 540, 1176, 596, '#56616B', 2)}${line(1230, 540, 1216, 596, '#56616B', 2)}</g>`;
  // roof hatch
  s += hatch(1150, 706, 110, 56, !tomorrow ? true : false);
  // drains/vents
  s += `<ellipse cx="560" cy="470" rx="14" ry="6" fill="#59616A"/><rect x="820" y="410" width="12" height="26" fill="#9AA3AB" stroke="${C.ink}" stroke-width="2"/>`;

  if (!tomorrow) {
    // hoist-gap worker: reaching out to pull a roll off the hoist platform, no PFAS, rail removed
    s += worker(edgeX(420) + 40, 420, 0.7, { dir: -1, pose: 'step', arms: 'reach', lean: -16, hat: C.white, shirt: '#6A5D8C', skin: C.skinA }).svg;
    // worker between the warning line and the edge, carrying insulation board
    s += worker(edgeX(600) + 70, 600, 0.88, { dir: 1, arms: 'carry', tool: 'box', hat: C.yellow, shirt: '#4F7A6B', skin: C.skinB }).svg;
    // worker walking backward toward the unscreened skylight, unrolling membrane
    s += worker(790, 620, 0.9, { dir: 1, arms: 'hold', hat: C.white, shirt: '#8A5F4A', skin: C.skinC, lean: 6 }).svg;
    s += `<path d="M818 612 L980 650 L960 690 L800 650 Z" fill="#F5F7F8" stroke="${C.ink}" stroke-width="2"/>`;
    // inside-line-ok: roofer heat-welding seams well inside the line
    s += worker(880, 820, 1.0, { dir: -1, pose: 'kneel', arms: 'kneel', tool: 'welder', hat: C.white, shirt: '#5E7FA3', skin: C.skinD }).svg;
    // parapet-low: worker leaning over the 24 in parapet to look down
    s += worker(eastX(560) - 30, 560, 0.86, { dir: 1, pose: 'step', arms: 'reach', lean: 22, hat: C.yellow, shirt: '#7C5D49', skin: C.skinA }).svg;
    // worker near the open hatch carrying a box (backing up)
    s += worker(1300, 760, 0.95, { dir: -1, arms: 'carry', tool: 'box', hat: C.white, shirt: '#55708C', skin: C.skinC }).svg;
  } else {
    // tomorrow: crew working the back-west section beyond the old line, no protection
    s += worker(edgeX(440) + 90, 440, 0.7, { dir: -1, pose: 'kneel', arms: 'kneel', tool: 'welder', hat: C.white, shirt: '#6A5D8C', skin: C.skinA }).svg;
    s += worker(edgeX(520) + 60, 520, 0.8, { dir: 1, arms: 'carry', tool: 'box', hat: C.yellow, shirt: '#4F7A6B', skin: C.skinB }).svg;
    // flashing crew at the skylight with the screen pulled
    s += worker(1010, 560, 0.84, { dir: -1, pose: 'kneel', arms: 'kneel', hat: C.white, shirt: '#8A5F4A', skin: C.skinC }).svg;
    // RTU being set by crane near the east parapet; tagline worker on the parapet side
    s += line(1460, 0, 1460, 470, '#2F3740', 3) + rtu(1400, 480, 110, 50, 30);
    s += worker(eastX(640) - 40, 640, 0.92, { dir: 1, pose: 'step', arms: 'reach', lean: 20, hat: C.white, shirt: '#55708C', skin: C.skinD }).svg;
    s += worker(880, 820, 1.0, { dir: -1, pose: 'kneel', arms: 'kneel', tool: 'welder', hat: C.white, shirt: '#5E7FA3', skin: C.skinD }).svg;
  }
  return s;
}

const defs = `<linearGradient id="rsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BFD6EC"/><stop offset="1" stop-color="#EAF1F7"/></linearGradient>`;
module.exports = {
  roof: () => svgDoc(W, H, defs, roofScene(false), 'Riverside roof, low-slope TPO'),
  roofTomorrow: () => svgDoc(W, H, defs, roofScene(true), 'Riverside roof, the next morning'),
  edgeX, eastX
};
