// Silica Competent Person course — Riverside scenes and equipment art (flat style, BUILD-SPEC §8 palette).
// node tools/scene-gen/silica.js  → writes silica-cp/assets/art/*.svg, previews to dist/silica-cp/scene-previews,
// and prints hotspot boxes (% of 1600×900) for content/scenes.js.
'use strict';
const fs = require('fs'), path = require('path');
const L = require('./lib');
const { C, poly, polyNS, line, rect, circ, worker, column, svgDoc, scaleAt, r } = L;

const ART = path.resolve(__dirname, '..', '..', 'silica-cp', 'assets', 'art');
const OUT = path.resolve(__dirname, '..', '..', 'dist', 'silica-cp', 'scene-previews');

/* ------------------------------------------------------------------ shared bits */
const DUST = '#CFC4AE', DUSTD = '#A89C84', WATER = '#5FA8D9', SLURRY = '#8E969C', HOSEB = '#2F6DB5', HOSEY = '#E2B92C';
const DEFS = `
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CFE0EE"/><stop offset="1" stop-color="#EEF3F7"/></linearGradient>
<linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A7AFB6"/><stop offset="1" stop-color="#C3C9CE"/></linearGradient>
<linearGradient id="ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B9B4A6"/><stop offset="1" stop-color="#CFC9BA"/></linearGradient>
<filter id="soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="4"/></filter>
<filter id="soft2" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2.5"/></filter>
<radialGradient id="puff"><stop offset="0" stop-color="${DUST}" stop-opacity="1"/><stop offset=".65" stop-color="${DUST}" stop-opacity=".8"/><stop offset="1" stop-color="${DUST}" stop-opacity="0"/></radialGradient>`;

// deterministic pseudo-random
let seed = 7; const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };

/** Dust plume from (x,y) drifting toward (dx,dy). size ≈ radius of the biggest puff. */
function dust(x, y, dx, dy, size = 60, n = 9, opacity = 0.85) {
  let s = `<g opacity="${opacity}" filter="url(#soft)">`;
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1), rr = size * (0.45 + 0.8 * t) * (0.8 + rnd() * 0.4);
    const px = x + dx * t + (rnd() - 0.5) * size * 0.6, py = y + dy * t + (rnd() - 0.5) * size * 0.5;
    s += `<circle cx="${r(px)}" cy="${r(py)}" r="${r(rr)}" fill="url(#puff)"/>`;
  }
  s += '</g>';
  // a few visible specks
  for (let i = 0; i < 14; i++) { const t = rnd(); s += `<circle cx="${r(x + dx * t + (rnd() - 0.5) * size)}" cy="${r(y + dy * t + (rnd() - 0.5) * size * 0.6)}" r="${r(1 + rnd() * 2)}" fill="${DUSTD}" opacity=".8"/>`; }
  return s;
}
/** Fine water spray from (x,y) in direction (dx,dy). */
function spray(x, y, dx, dy, n = 16) {
  let s = '';
  for (let i = 0; i < n; i++) { const t = rnd(); s += `<circle cx="${r(x + dx * t + (rnd() - 0.5) * 18 * t)}" cy="${r(y + dy * t + (rnd() - 0.5) * 14 * t)}" r="${r(2 + rnd() * 2.6)}" fill="${WATER}" stroke="#2F6DB5" stroke-width=".8" opacity=".9"/>`; }
  return s;
}
const hose = (d, color = HOSEB, w = 6) => `<path d="${d}" fill="none" stroke="${C.ink}" stroke-width="${w + 3}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const shadow = (cx, cy, rx, ry = rx * 0.22) => `<ellipse cx="${r(cx)}" cy="${r(cy)}" rx="${r(rx)}" ry="${r(ry)}" fill="#000" opacity=".13"/>`;

/** Handheld cut-off saw held at hand point h, blade at the cut point (bx,by). */
function cutoffSaw(h, bx, by, s = 1, opts = {}) {
  const k = s;
  let g = line(h[0], h[1], bx - 4 * k, by - 22 * k, C.ink, 9 * k) + line(h[0], h[1], bx - 4 * k, by - 22 * k, '#3A3F45', 6 * k);
  g += `<rect x="${r(h[0] - 30 * k)}" y="${r(h[1] - 18 * k)}" width="${r(42 * k)}" height="${r(26 * k)}" rx="${r(6 * k)}" fill="${C.orange}" stroke="${C.ink}" stroke-width="2.5"/>`;
  g += `<circle cx="${r(bx)}" cy="${r(by)}" r="${r(24 * k)}" fill="#C9CED3" stroke="${C.ink}" stroke-width="2.5"/><circle cx="${r(bx)}" cy="${r(by)}" r="${r(5 * k)}" fill="${C.ink}"/>`;
  g += `<path d="M${r(bx - 26 * k)} ${r(by - 2 * k)} A${r(26 * k)} ${r(26 * k)} 0 0 1 ${r(bx + 24 * k)} ${r(by - 8 * k)}" fill="none" stroke="${C.orange}" stroke-width="${r(8 * k)}"/>`;
  if (opts.water) g += hose(`M${r(bx - 10 * k)} ${r(by - 24 * k)} q-40 -10 -70 30 t-90 60`, HOSEB, 4) + spray(bx + 10 * k, by + 6 * k, 40 * k, 6 * k, 18);
  return g;
}
function jackhammer(x, y, s = 1) { // chisel tip at x,y (on the floor)
  return `<g transform="translate(${r(x)} ${r(y)}) scale(${s})">` + line(0, 0, 0, -26, '#6D757C', 5) +
    `<rect x="-9" y="-92" width="18" height="66" rx="4" fill="#4F5963" stroke="${C.ink}" stroke-width="2.5"/>` +
    `<rect x="-26" y="-104" width="52" height="12" rx="5" fill="#2E3740" stroke="${C.ink}" stroke-width="2.5"/>` +
    `<rect x="-6" y="-84" width="12" height="14" fill="${C.yellow}" stroke="${C.ink}" stroke-width="1.5"/></g>`;
}
function broom(h, x, y) { // handle from hand to head at (x,y)
  return line(h[0] - 8, h[1] - 40, x, y - 4, C.ink, 7) + line(h[0] - 8, h[1] - 40, x, y - 4, '#B5813F', 4) +
    `<rect x="${r(x - 34)}" y="${r(y - 8)}" width="68" height="10" rx="2" fill="#3B3F44" stroke="${C.ink}" stroke-width="2"/>` +
    `<path d="M${r(x - 32)} ${r(y + 2)} l0 8 M${r(x - 20)} ${r(y + 2)} l0 8 M${r(x - 8)} ${r(y + 2)} l0 8 M${r(x + 4)} ${r(y + 2)} l0 8 M${r(x + 16)} ${r(y + 2)} l0 8 M${r(x + 28)} ${r(y + 2)} l0 8" stroke="#6B5A3E" stroke-width="2.5"/>`;
}
function grinder(h, s = 1, shroud = false) {
  const [x, y] = h, k = s;
  let g = `<rect x="${r(x - 4 * k)}" y="${r(y - 8 * k)}" width="${r(34 * k)}" height="${r(14 * k)}" rx="${r(5 * k)}" fill="#2F6DB5" stroke="${C.ink}" stroke-width="2.2"/>`;
  g += `<rect x="${r(x + 26 * k)}" y="${r(y - 22 * k)}" width="${r(5 * k)}" height="${r(36 * k)}" fill="#9AA2A9" stroke="${C.ink}" stroke-width="2"/>`;
  if (shroud) g += `<path d="M${r(x + 22 * k)} ${r(y - 24 * k)} h${r(14 * k)} v${r(42 * k)} h${r(-14 * k)} z" fill="#2E3740" stroke="${C.ink}" stroke-width="2"/>`;
  return g;
}

/* ------------------------------------------------------------------ boxes collector */
let BOX = {};
const box = (id, x0, y0, x1, y1) => { BOX[id] = [x0, y0, x1, y1]; };
const pct = () => Object.fromEntries(Object.entries(BOX).map(([k, [x0, y0, x1, y1]]) =>
  [k, { x: +(x0 / 16).toFixed(1), y: +(y0 / 9).toFixed(1), w: +((x1 - x0) / 16).toFixed(1), h: +((y1 - y0) / 9).toFixed(1) }]));

/* ================================================================== SCENE: Level 2 slab */
function slab() {
  BOX = {}; seed = 11;
  const W = 1600, H = 900, FY = 430; // floor line
  let s = `<rect width="${W}" height="${H}" fill="url(#floor)"/>`;
  // ceiling: underside of metal deck + beams
  s += `<rect x="0" y="0" width="${W}" height="170" fill="#9AA5AF"/>`;
  for (let x = 0; x < W; x += 22) s += `<line x1="${x}" y1="0" x2="${x}" y2="170" stroke="#8994A0" stroke-width="5"/>`;
  s += rect(-5, 150, W + 10, 24, C.steel) + rect(-5, 40, W + 10, 16, C.steelL);
  // back wall with window openings (exterior) + CMU core at left
  s += rect(-5, 172, W + 10, FY - 172, '#C9CDC9');
  [[420, 640], [880, 1100], [1160, 1330]].forEach(([a, b]) => { s += rect(a, 200, b - a, 160, 'url(#sky)') + `<path d="M${a} 330 Q${(a + b) / 2} 300 ${b} 325 L${b} 360 L${a} 360 Z" fill="#A9BCA2" opacity=".8"/>` + line(a, 280, b, 280, '#9FB0BE', 3); });
  s += rect(-5, 172, 330, FY - 172, C.cmu);
  for (let y = 186; y < FY; y += 16) s += line(-5, y, 325, y, '#949CA3', 1.5);
  // stud wall (drywall sub) at back right
  s += rect(1340, 220, 260, FY - 220, '#D5D9DD');
  for (let x = 1350; x < 1600; x += 26) s += line(x, 222, x, FY, '#A6AEB6', 4);
  s += rect(1480, 226, 120, FY - 226, '#ECEBE4') + rect(1420, 226, 56, FY - 226, '#ECEBE4');
  // columns
  [330, 820, 1340].forEach(x => { s += column(x, FY, 172, 28); });
  // floor perspective lines + saw-cut joints
  s += line(0, FY, W, FY, C.ink, 3);
  for (let i = -6; i <= 14; i++) { const x0 = 800 + i * 110; s += `<line x1="${x0}" y1="${FY}" x2="${800 + (x0 - 800) * 2.6}" y2="${H}" stroke="#9AA2A9" stroke-width="2" opacity=".55"/>`; }
  [520, 640, 790].forEach(y => { s += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="#9AA2A9" stroke-width="2" opacity=".45"/>`; });

  // ---- drywall crew (other employer), back right, no barrier ----
  let dw = '';
  const g1 = worker(1440, 470, scaleAt(470, FY, 900), { dir: -1, arms: 'reachup', hat: C.yellow, vest: '#F7893B', shirt: '#6A6F78', skin: C.skinB });
  const g2 = worker(1540, 476, scaleAt(476, FY, 900), { dir: -1, arms: 'carry', hat: C.yellow, vest: '#F7893B', shirt: '#8B8F95', skin: C.skinC, tool: 'box' });
  dw += shadow(1440, 472, 30) + g1.svg + shadow(1540, 478, 30) + g2.svg;
  dw += `<rect x="1366" y="270" width="54" height="120" fill="#F1F0EA" stroke="${C.ink}" stroke-width="2.5"/>`;
  box('drywall-crew-exposed', 1350, 270, 1600, 500);

  // ---- HEPA vac drill (decoy, good): rotary hammer with shroud into CMU, hose to vac ----
  let hv = '';
  const vw = worker(190, 500, scaleAt(500, FY, 900), { arms: 'reach', resp: 'n95', shirt: '#5E7FA3' });
  hv += shadow(190, 502, 30) + vw.svg;
  hv += `<rect x="${r(vw.hand[0] - 6)}" y="${r(vw.hand[1] - 10)}" width="44" height="18" rx="5" fill="${C.orange}" stroke="${C.ink}" stroke-width="2.2"/>`;
  hv += `<circle cx="${r(vw.hand[0] + 46)}" cy="${r(vw.hand[1])}" r="10" fill="#2E3740" stroke="${C.ink}" stroke-width="2"/>`;
  hv += hose(`M${r(vw.hand[0] + 46)} ${r(vw.hand[1] + 8)} C ${r(vw.hand[0] + 60)} ${r(vw.hand[1] + 90)}, 300 520, 270 540`, '#3B3F44', 5);
  hv += `<rect x="236" y="500" width="62" height="58" rx="10" fill="#E2B92C" stroke="${C.ink}" stroke-width="2.5"/><rect x="242" y="490" width="50" height="14" rx="4" fill="#3B3F44" stroke="${C.ink}" stroke-width="2"/><text x="267" y="536" text-anchor="middle" font-family="Arial Black,Arial" font-size="12" fill="${C.ink}">HEPA</text>`;
  box('hepa-drill-good', 140, 340, 310, 570);

  // ---- compressed air (hazard) ----
  let ca = '';
  const aw = worker(560, 540, scaleAt(540, FY, 900), { arms: 'point', shirt: '#7B5E8F', skin: C.skinD });
  ca += shadow(560, 542, 30) + aw.svg;
  ca += hose(`M${r(aw.hand2[0])} ${r(aw.hand2[1])} C 520 600, 470 620, 420 640`, HOSEY, 4);
  ca += line(aw.hand[0], aw.hand[1], aw.hand[0] + 26, aw.hand[1] + 22, C.ink, 5);
  ca += dust(aw.hand[0] + 40, aw.hand[1] + 40, 90, -10, 34, 7);
  box('compressed-air', 470, 400, 700, 600);

  // ---- jackhammer indoors, no water (hazard) ----
  let jh = '';
  const jx = 760, jy = 585, js = scaleAt(jy, FY, 900);
  const jw = worker(jx - 6, jy, js, { arms: 'hold', shirt: '#5D6B3E' });
  jh += shadow(jx, jy + 2, 34) + jw.svg + jackhammer(jx + 28 * js, jy + 6, js) + dust(jx + 30 * js, jy - 8, 40, -50, 30, 7);
  jh += `<path d="M${jx + 6} ${jy + 8} l60 -4 l10 10 l-64 6 z" fill="#7E878F" opacity=".7"/>`;
  box('jackhammer-dry', 700, 430, 860, 620);

  // ---- core rig without water (hazard) ----
  let cr = '';
  const cx = 1140, cy = 600, cs = scaleAt(cy, FY, 900);
  cr += shadow(cx, cy + 2, 60);
  cr += `<rect x="${cx - 46}" y="${cy - 12}" width="92" height="14" rx="3" fill="#59626B" stroke="${C.ink}" stroke-width="2.5"/>`;
  cr += rect(cx - 30, cy - 170, 12, 160, '#9AA2A9') + rect(cx - 46, cy - 178, 44, 12, '#59626B');
  cr += `<rect x="${cx - 20}" y="${cy - 130}" width="56" height="42" rx="6" fill="#C0392B" stroke="${C.ink}" stroke-width="2.5"/>`;
  cr += rect(cx - 4, cy - 88, 24, 74, '#B9C0C6') + `<circle cx="${cx + 30}" cy="${cy - 112}" r="7" fill="#DDE1E4" stroke="${C.ink}" stroke-width="2"/>`;
  cr += hose(`M${cx + 70} ${cy + 20} C ${cx + 110} ${cy + 10}, ${cx + 120} ${cy - 30}, ${cx + 150} ${cy - 20}`, HOSEB, 5) + `<circle cx="${cx + 150}" cy="${cy - 20}" r="5" fill="${HOSEB}" stroke="${C.ink}" stroke-width="2"/>`;
  cr += dust(cx + 10, cy - 10, -50, -60, 26, 6, .8);
  const cw = worker(cx + 70, cy - 10, cs, { dir: -1, arms: 'reach', shirt: '#A23F35', skin: C.skinC });
  cr += cw.svg;
  box('core-drill-dry', 1060, 400, 1300, 630);

  // ---- walk-behind saw with water (decoy, good) ----
  let wb = '';
  const wx = 930, wy = 770, ws = scaleAt(wy, FY, 900);
  wb += `<ellipse cx="${wx + 120}" cy="${wy + 10}" rx="120" ry="18" fill="${SLURRY}" opacity=".75"/>`;
  wb += `<rect x="${wx + 40}" y="${wy - 50}" width="130" height="46" rx="8" fill="${C.yellow}" stroke="${C.ink}" stroke-width="2.5"/>`;
  wb += `<rect x="${wx + 150}" y="${wy - 44}" width="50" height="42" rx="6" fill="#59626B" stroke="${C.ink}" stroke-width="2.5"/>`;
  wb += circ(wx + 60, wy, 13, C.dark) + circ(wx + 150, wy, 13, C.dark);
  wb += line(wx + 40, wy - 40, wx - 10, wy - 110, C.ink, 7) + line(wx + 40, wy - 40, wx - 10, wy - 110, '#3B3F44', 4);
  wb += spray(wx + 200, wy - 4, 50, 8, 22);
  wb += hose(`M${wx + 170} ${wy - 46} C ${wx + 220} ${wy - 120}, ${wx + 330} ${wy - 60}, ${wx + 400} ${wy - 110}`, HOSEB, 5);
  const ww = worker(wx - 26, wy + 4, ws, { arms: 'hold', shirt: '#5E7FA3', skin: C.skinB });
  wb += shadow(wx + 80, wy + 6, 110) + ww.svg;
  box('walkbehind-wet-good', 840, 590, 1160, 810);

  // ---- dry sweeping (hazard) ----
  let sw = '';
  const sx = 1400, sy = 840, ss = scaleAt(sy, FY, 900);
  const swk = worker(sx, sy, ss, { dir: -1, arms: 'hold', shirt: '#4A6B8A', skin: C.skinA });
  sw += shadow(sx, sy + 2, 36) + swk.svg + broom(swk.hand, sx - 120, sy + 6) + dust(sx - 130, sy - 10, -60, -60, 46, 8);
  box('dry-sweep', 1220, 640, 1500, 890);

  // ---- Dee dry-cutting with a handheld saw, front left (hazard) ----
  let dc = '';
  const dx = 330, dy = 820, ds = scaleAt(dy, FY, 900);
  const dee = worker(dx, dy, ds, { pose: 'kneel', hat: '#3DAA4F', shirt: C.orange, skin: '#C98E62' });
  dc += shadow(dx + 10, dy + 2, 60) + dee.svg + cutoffSaw(dee.hand, dee.hand[0] + 70, dy - 6, ds);
  dc += `<path d="M${dx + 40} ${dy + 2} L${dx + 260} ${dy - 6}" stroke="${C.ink}" stroke-width="3" opacity=".6"/>`;
  dc += dust(dee.hand[0] + 80, dy - 30, 170, -180, 76, 14, .97);
  box('dry-cut-saw', 200, 560, 640, 880);

  s += dw + hv + ca + jh + cr + wb + sw + dc;
  return svgDoc(W, H, DEFS, s, 'Riverside Level 2 slab, 7:20 a.m.: saw cutting, core drilling, chipping and cleanup inside the building, with a drywall crew working the same floor.');
}

/* ================================================================== SCENE: main entrance (masonry) */
function entrance() {
  BOX = {}; seed = 23;
  const W = 1600, H = 900, GY = 520;
  let s = `<rect width="${W}" height="${H}" fill="url(#sky)"/>`;
  // building facade (brick) with entrance canopy
  s += rect(-5, 90, W + 10, GY - 90, '#B4664A');
  for (let y = 100; y < GY; y += 12) s += line(-5, y, W + 5, y, '#9C553C', 1.4);
  for (let y = 90, k = 0; y < GY; y += 12, k++) for (let x = (k % 2 ? 14 : 0); x < W; x += 28) s += line(x, y, x, y + 12, '#9C553C', 1);
  [[60, 240], [300, 480], [1500, 1600]].forEach(([a, b]) => { s += rect(a, 140, b - a, 120, '#7FA9C9') + line(a, 200, b, 200, '#5E7E99', 3); });
  s += rect(560, 260, 300, GY - 260, '#3D4752') + rect(530, 230, 360, 34, '#D6D9DC') + rect(600, 300, 100, GY - 300, '#7FA9C9') + rect(720, 300, 100, GY - 300, '#7FA9C9');
  // ground: paving + dirt
  s += `<rect x="0" y="${GY}" width="${W}" height="${H - GY}" fill="url(#ground)"/>`;
  s += line(0, GY, W, GY, C.ink, 3);
  for (let i = 0; i < 12; i++) s += `<line x1="${i * 160}" y1="${GY}" x2="${i * 160 - 120}" y2="${H}" stroke="#A9A394" stroke-width="2" opacity=".6"/>`;

  // ---- scaffold on the right with two tuckpointers ----
  let sc = '';
  const sx0 = 1040, sx1 = 1560, deck1 = 330, deck0 = GY;
  for (let x = sx0; x <= sx1; x += 130) sc += line(x, 120, x, deck0 + 4, '#3E6FA8', 6);
  [deck1].forEach(y => { sc += rect(sx0 - 10, y, sx1 - sx0 + 20, 12, C.wood); });
  for (let x = sx0; x < sx1; x += 130) sc += `<path d="M${x} ${deck1 + 12} L${x + 130} ${deck0}" stroke="#3E6FA8" stroke-width="3" opacity=".8"/>`;
  sc += line(sx0 - 10, deck1 - 60, sx1 + 10, deck1 - 60, '#3E6FA8', 5) + line(sx0 - 10, deck1 - 30, sx1 + 10, deck1 - 30, '#3E6FA8', 4);
  // tuckpointer 1: no shroud, dust cloud
  const t1 = worker(1160, deck1, 0.82, { arms: 'reach', dir: 1, shirt: '#5D6B3E', skin: C.skinB });
  sc += t1.svg + grinder(t1.hand, 0.8, false) + dust(t1.hand[0] + 34, t1.hand[1] - 6, 60, -60, 34, 8);
  box('tuckpoint-no-shroud', 1100, 150, 1290, 345);
  // tuckpointer 2: shroud + vac (control OK) but full beard under a half mask
  const t2 = worker(1400, deck1, 0.82, { arms: 'reach', dir: 1, beard: true, resp: 'half', shirt: '#6E5A8F', skin: C.skinC });
  sc += t2.svg + grinder(t2.hand, 0.8, true) + hose(`M${r(t2.hand[0] + 26)} ${r(t2.hand[1] + 12)} C 1460 380, 1480 430, 1500 470`, '#3B3F44', 4);
  sc += `<rect x="1478" y="${GY - 58}" width="54" height="52" rx="9" fill="#E2B92C" stroke="${C.ink}" stroke-width="2.5"/><text x="1505" y="${GY - 27}" text-anchor="middle" font-family="Arial Black,Arial" font-size="11" fill="${C.ink}">HEPA</text>`;
  box('beard-half-mask', 1340, 150, 1480, 345);

  // ---- mason laying block (decoy: no cutting, no grinding) ----
  let lb = '';
  const wallY = GY + 30;
  for (let row = 0; row < 3; row++) for (let i = 0; i < 4; i++) lb += rect(940 + i * 44 + (row % 2 ? 22 : 0), wallY - 22 * (row + 1), 44, 22, '#C2C7CB');
  const ms = worker(905, wallY + 20, scaleAt(wallY + 20, GY, 900), { arms: 'carry', shirt: '#4A6B8A', tool: 'box' });
  lb += shadow(905, wallY + 22, 30) + ms.svg;
  box('laying-block-ok', 860, 430, 1130, 580);

  // ---- skid steer with breaker, cab door propped open, laborer next to it ----
  let sk = '';
  const kx = 690, ky = 680;
  sk += shadow(kx + 40, ky + 6, 120);
  sk += `<rect x="${kx - 60}" y="${ky - 70}" width="170" height="66" rx="10" fill="${C.yellow}" stroke="${C.ink}" stroke-width="3"/>`;
  sk += `<rect x="${kx - 30}" y="${ky - 160}" width="100" height="94" rx="8" fill="#2E3740" stroke="${C.ink}" stroke-width="3"/>`;
  sk += `<rect x="${kx - 20}" y="${ky - 150}" width="78" height="70" rx="4" fill="#7FA9C9" opacity=".8"/>`;
  sk += `<path d="M${kx - 30} ${ky - 158} L${kx - 92} ${ky - 132} L${kx - 92} ${ky - 60} L${kx - 30} ${ky - 72} Z" fill="#9CC3E0" stroke="${C.ink}" stroke-width="3" opacity=".9"/>`; // door swung open
  sk += `<rect x="${kx - 104}" y="${ky - 58}" width="22" height="24" fill="#C89B5C" stroke="${C.ink}" stroke-width="2"/>`; // block propping door
  sk += circ(kx - 30, ky, 24, C.dark) + circ(kx + 80, ky, 24, C.dark);
  sk += line(kx + 100, ky - 60, kx + 200, ky - 110, C.ink, 16) + line(kx + 100, ky - 60, kx + 200, ky - 110, C.yellow, 11);
  sk += line(kx + 200, ky - 110, kx + 236, ky - 20, C.ink, 14) + line(kx + 200, ky - 110, kx + 236, ky - 20, '#4F5963', 9);
  sk += line(kx + 236, ky - 20, kx + 240, ky + 10, '#6D757C', 6);
  sk += `<path d="M${kx + 190} ${ky + 18} l40 -14 l30 6 l10 14 l-60 8 z" fill="#A3ABB2" stroke="${C.ink}" stroke-width="2"/>`;
  sk += dust(kx + 236, ky + 8, -70, -60, 40, 9);
  const op = worker(kx + 10, ky - 74, 0.62, { arms: 'hold', shirt: '#5E7FA3' });
  sk += `<g clip-path="url(#cabclip)">${op.svg}</g>`;
  box('cab-door-open', 560, 500, 860, 720);

  // ---- stationary masonry saw, tank dry, big plume ----
  let ms2 = '';
  const mx = 300, my = 740;
  ms2 += shadow(mx + 20, my + 4, 110);
  ms2 += line(mx - 70, my - 70, mx - 80, my, C.ink, 6) + line(mx + 110, my - 70, mx + 120, my, C.ink, 6);
  ms2 += `<rect x="${mx - 90}" y="${my - 92}" width="220" height="24" rx="4" fill="#C0392B" stroke="${C.ink}" stroke-width="2.5"/>`;
  ms2 += `<rect x="${mx - 60}" y="${my - 56}" width="160" height="40" rx="4" fill="#59626B" stroke="${C.ink}" stroke-width="2.5"/><text x="${mx + 20}" y="${my - 31}" text-anchor="middle" font-family="Arial Black,Arial" font-size="13" fill="#E9EDEF">WATER</text>`;
  ms2 += `<path d="M${mx - 50} ${my - 22} h140" stroke="#DDE1E4" stroke-width="3" stroke-dasharray="6 6"/>`; // empty tank, no waterline
  ms2 += `<circle cx="${mx + 10}" cy="${my - 116}" r="34" fill="#C9CED3" stroke="${C.ink}" stroke-width="2.5"/><path d="M${mx - 26} ${my - 116} A36 36 0 0 1 ${mx + 46} ${my - 116} Z" fill="#C0392B" stroke="${C.ink}" stroke-width="2.5"/>`;
  ms2 += rect(mx - 40, my - 112, 70, 22, '#C2C7CB');
  const so = worker(mx - 130, my + 10, scaleAt(my + 10, GY, 900), { arms: 'reach', shirt: '#7B5E8F', skin: C.skinA });
  ms2 += so.svg + dust(mx + 30, my - 120, 160, -150, 66, 11, .9);
  box('masonry-saw-dry', 150, 450, 450, 760);

  // ---- lunch next to the saw ----
  let lu = '';
  for (let i = 0; i < 3; i++) lu += rect(470 + i * 46, 800, 46, 26, '#C2C7CB') + rect(470 + i * 46, 774, 46, 26, '#C2C7CB');
  const e1 = worker(500, 800, 0.95, { pose: 'kneel', arms: 'carry', shirt: '#A23F35', skin: C.skinD });
  const e2 = worker(590, 800, 0.95, { pose: 'kneel', arms: 'carry', dir: -1, shirt: '#4A6B8A', skin: C.skinC });
  lu += e1.svg + e2.svg + `<rect x="${r(e1.hand[0] - 6)}" y="${r(e1.hand[1] - 10)}" width="22" height="12" rx="3" fill="#F3EFE2" stroke="${C.ink}" stroke-width="1.5"/>`;
  lu += `<rect x="636" y="814" width="30" height="22" rx="4" fill="#C0392B" stroke="${C.ink}" stroke-width="2"/><rect x="636" y="808" width="30" height="8" rx="3" fill="#F3EFE2" stroke="${C.ink}" stroke-width="1.5"/>`;
  lu += dust(560, 700, 60, 40, 40, 6, .55);
  box('lunch-in-dust', 450, 680, 690, 880);

  // ---- quartz countertop dry cut on sawhorses ----
  let qz = '';
  const qx = 1250, qy = 830;
  qz += line(qx - 120, qy - 60, qx - 130, qy, C.ink, 6) + line(qx - 90, qy - 60, qx - 80, qy, C.ink, 6) + line(qx + 80, qy - 60, qx + 70, qy, C.ink, 6) + line(qx + 110, qy - 60, qx + 120, qy, C.ink, 6);
  qz += `<path d="M${qx - 160} ${qy - 78} L${qx + 150} ${qy - 78} L${qx + 170} ${qy - 58} L${qx - 140} ${qy - 58} Z" fill="#EDEBE6" stroke="${C.ink}" stroke-width="2.5"/>`;
  qz += `<path d="M${qx - 120} ${qy - 72} q40 6 80 -2 M${qx + 20} ${qy - 66} q40 -6 90 4" stroke="#C9C4B9" stroke-width="2" fill="none"/>`;
  const qw = worker(qx + 215, qy + 10, scaleAt(qy + 10, GY, 900), { dir: -1, arms: 'reach', shirt: '#2B3A4A', skin: C.skinA });
  qz += shadow(qx + 30, qy + 4, 160) + qw.svg + line(qw.hand[0], qw.hand[1], qx + 150, qy - 92, C.ink, 4) + grinder([qx + 112, qy - 92], 1, false) + dust(qx + 140, qy - 100, -120, -110, 52, 10, .95);
  box('quartz-dry-cut', 1080, 600, 1480, 860);

  // ---- painter on the canopy column (decoy: not a silica task) ----
  let pt = '';
  const pw = worker(80, 600, scaleAt(600, GY, 900), { arms: 'reachup', shirt: '#F3EFE2', hat: C.white });
  pt += rect(110, 380, 30, 220, '#DCDCD6') + shadow(80, 602, 30) + pw.svg + line(pw.hand[0], pw.hand[1], pw.hand[0] + 10, pw.hand[1] - 60, '#B5813F', 5) + `<rect x="${r(pw.hand[0] + 2)}" y="${r(pw.hand[1] - 76)}" width="26" height="16" rx="4" fill="#3E6FA8" stroke="${C.ink}" stroke-width="2"/>`;
  box('painter-ok', 30, 370, 160, 620);

  s += sc + lb + pt + ms2 + sk + lu + qz;
  const defs = DEFS + `<clipPath id="cabclip"><rect x="${kx - 20}" y="${ky - 150}" width="78" height="70"/></clipPath>`;
  return svgDoc(W, H, defs, s, 'Riverside main entrance, 10:40 a.m.: a stationary masonry saw, tuckpointing from a scaffold, a skid steer breaking out a curb, quartz countertops being cut and a crew at lunch.');
}

/* ================================================================== equipment close-ups (400×300) */
const EQ_DEFS = DEFS;
function eq(title, body, bg = '#EEF1F3') { return svgDoc(400, 300, EQ_DEFS, `<rect width="400" height="300" rx="18" fill="${bg}"/>` + body, title); }
function vacUnit(x, y, gauge) { // gauge: 'ok' | 'red'
  return `<rect x="${x}" y="${y}" width="120" height="130" rx="18" fill="#E2B92C" stroke="${C.ink}" stroke-width="3"/>` +
    `<rect x="${x + 8}" y="${y - 22}" width="104" height="28" rx="8" fill="#3B3F44" stroke="${C.ink}" stroke-width="3"/>` +
    `<text x="${x + 60}" y="${y + 50}" text-anchor="middle" font-family="Arial Black,Arial" font-size="16" fill="${C.ink}">HEPA</text>` +
    `<circle cx="${x + 60}" cy="${y + 90}" r="22" fill="#fff" stroke="${C.ink}" stroke-width="3"/>` +
    `<path d="M${x + 42} ${y + 98} A20 20 0 0 1 ${x + 78} ${y + 98}" fill="none" stroke="${gauge === 'red' ? '#C23A2E' : '#1D7F52'}" stroke-width="6"/>` +
    `<line x1="${x + 60}" y1="${y + 92}" x2="${gauge === 'red' ? x + 76 : x + 48}" y2="${y + 76}" stroke="${C.ink}" stroke-width="3" stroke-linecap="round"/>` +
    circ(x + 20, y + 138, 10, C.dark) + circ(x + 100, y + 138, 10, C.dark);
}
const equipment = {
  'eq-vac-clogged': () => eq('Dust collector with a clogged filter: airflow gauge in the red, dust caked on the filter.',
    vacUnit(60, 110, 'red') + `<rect x="220" y="90" width="120" height="150" rx="10" fill="#B7AE9C" stroke="${C.ink}" stroke-width="3"/>` +
    [0, 1, 2, 3, 4, 5].map(i => `<line x1="${232 + i * 19}" y1="100" x2="${232 + i * 19}" y2="230" stroke="#968B76" stroke-width="5"/>`).join('') + dust(280, 120, 20, 10, 40, 5, .9) +
    `<text x="280" y="275" text-anchor="middle" font-family="Arial" font-size="15" fill="${C.ink}">filter</text>`),
  'eq-tank-dry': () => eq('Stationary masonry saw water tank: empty, pump running dry.',
    `<rect x="60" y="120" width="280" height="120" rx="10" fill="#59626B" stroke="${C.ink}" stroke-width="3"/><rect x="74" y="136" width="252" height="90" rx="6" fill="#3E464E"/>` +
    `<path d="M80 220 q40 -6 80 0 t80 0 t80 0" stroke="#8E969C" stroke-width="3" fill="none"/><rect x="250" y="160" width="46" height="40" rx="6" fill="#2F6DB5" stroke="${C.ink}" stroke-width="2.5"/>` +
    hose('M296 176 C 340 150, 330 90, 280 70', HOSEB, 6) + `<text x="200" y="110" text-anchor="middle" font-family="Arial Black,Arial" font-size="18" fill="${C.ink}">WATER</text>` + dust(300, 70, -40, -20, 26, 5, .85)),
  'eq-shroud-cracked': () => eq('Tuckpoint grinder shroud cracked and pulled off the guard; the vacuum hose is hanging loose.',
    `<rect x="60" y="130" width="170" height="54" rx="20" fill="#2F6DB5" stroke="${C.ink}" stroke-width="3"/><rect x="222" y="98" width="18" height="120" fill="#9AA2A9" stroke="${C.ink}" stroke-width="3"/>` +
    `<path d="M246 92 h40 v60 l-14 6 l10 10 l-10 6 v18 h-26 z" fill="#2E3740" stroke="${C.ink}" stroke-width="3"/><path d="M262 150 l18 14 l-14 4 l12 14" stroke="#F3EFE2" stroke-width="3" fill="none"/>` +
    hose('M300 240 C 330 210, 350 260, 380 230', '#3B3F44', 8) + dust(290, 140, 50, -40, 30, 6)),
  'eq-cab-door': () => eq('Skid steer enclosed cab with the door propped open by a block of wood.',
    `<rect x="90" y="60" width="180" height="180" rx="14" fill="#2E3740" stroke="${C.ink}" stroke-width="4"/><rect x="108" y="80" width="144" height="120" rx="6" fill="#7FA9C9"/>` +
    `<path d="M90 64 L20 92 L20 228 L90 236 Z" fill="#9CC3E0" stroke="${C.ink}" stroke-width="4" opacity=".92"/><rect x="2" y="200" width="36" height="34" fill="#C89B5C" stroke="${C.ink}" stroke-width="3"/>` +
    `<rect x="60" y="236" width="260" height="40" rx="8" fill="${C.yellow}" stroke="${C.ink}" stroke-width="3"/>` + dust(330, 150, -20, -40, 40, 6)),
  'eq-saw-wet-good': () => eq('Handheld saw with the water feed connected and spraying at the blade: visible dust is minimal.',
    `<line x1="70" y1="150" x2="200" y2="170" stroke="${C.ink}" stroke-width="12"/><rect x="40" y="120" width="90" height="56" rx="12" fill="${C.orange}" stroke="${C.ink}" stroke-width="3"/>` +
    `<circle cx="250" cy="180" r="64" fill="#C9CED3" stroke="${C.ink}" stroke-width="3"/><circle cx="250" cy="180" r="12" fill="${C.ink}"/><path d="M182 172 A68 68 0 0 1 318 160" fill="none" stroke="${C.orange}" stroke-width="18"/>` +
    hose('M220 112 C 180 70, 120 70, 60 40', HOSEB, 6) + spray(300, 230, 60, 10, 30) + `<rect x="0" y="240" width="400" height="60" fill="#A7AFB6"/><ellipse cx="300" cy="248" rx="80" ry="8" fill="${SLURRY}"/>`),
  'eq-grinder-shroud-good': () => eq('Surface grinder with an intact shroud, hose connected, collector gauge in the green.',
    `<rect x="40" y="120" width="140" height="48" rx="18" fill="#2F6DB5" stroke="${C.ink}" stroke-width="3"/><path d="M176 92 h56 v100 h-56 z" fill="#2E3740" stroke="${C.ink}" stroke-width="3"/>` +
    hose('M204 192 C 210 240, 250 250, 260 220', '#3B3F44', 8) + vacUnit(260, 140, 'ok').replace(/x="260"/, 'x="260"')),
  'eq-low-water': () => eq('Walk-behind saw with a kinked hose: a trickle of water and a dust plume behind the blade.',
    `<rect x="70" y="140" width="200" height="70" rx="10" fill="${C.yellow}" stroke="${C.ink}" stroke-width="3"/><rect x="240" y="150" width="80" height="62" rx="8" fill="#59626B" stroke="${C.ink}" stroke-width="3"/>` +
    circ(100, 214, 18, C.dark) + circ(240, 214, 18, C.dark) + hose('M260 150 C 250 110, 200 120, 210 90 C 216 70, 190 60, 150 50', HOSEB, 6) +
    `<path d="M206 96 l14 -10 l4 12 z" fill="#C23A2E"/>` + spray(320, 205, 16, 4, 4) + dust(320, 190, 50, -70, 34, 7)),
  'eq-cab-good': () => eq('Excavator cab: door shut, seals intact, filtered air intake, pressurization gauge reading positive.',
    `<rect x="90" y="50" width="200" height="190" rx="14" fill="#2E3740" stroke="${C.ink}" stroke-width="4"/><rect x="108" y="70" width="164" height="130" rx="6" fill="#7FA9C9"/>` +
    `<rect x="290" y="80" width="60" height="70" rx="8" fill="#59626B" stroke="${C.ink}" stroke-width="3"/>` + [0, 1, 2, 3].map(i => `<line x1="300" y1="${92 + i * 14}" x2="340" y2="${92 + i * 14}" stroke="#9AA2A9" stroke-width="4"/>`).join('') +
    `<circle cx="190" cy="220" r="12" fill="#fff" stroke="${C.ink}" stroke-width="3"/><path d="M182 224 A10 10 0 0 1 198 224" stroke="#1D7F52" stroke-width="4" fill="none"/>` +
    `<rect x="40" y="240" width="320" height="40" rx="8" fill="${C.yellow}" stroke="${C.ink}" stroke-width="3"/>`)
};

/* ================================================================== diagrams */
function particles() { // 1200×560: respirable vs hair vs sand at the same magnification
  const W = 1200, H = 560;
  let s = `<rect width="${W}" height="${H}" rx="22" fill="#F4F6F8"/>`;
  s += `<text x="60" y="64" font-family="Barlow Condensed,Arial Narrow,Arial" font-weight="800" font-size="34" fill="${C.ink}">Same magnification. About 1,000×.</text>`;
  // sand grain: huge circle partially off-frame
  s += `<circle cx="1080" cy="330" r="300" fill="#E3C98F" stroke="${C.ink}" stroke-width="4"/>`;
  for (let i = 0; i < 40; i++) s += `<circle cx="${r(900 + rnd() * 340)}" cy="${r(120 + rnd() * 420)}" r="${r(3 + rnd() * 6)}" fill="#C9AD6E" opacity=".7"/>`;
  s += `<text x="905" y="300" font-family="Public Sans,Arial" font-weight="800" font-size="26" fill="${C.ink}">Grain of beach sand</text><text x="905" y="332" font-family="Public Sans,Arial" font-size="21" fill="${C.ink}">about 500 µm and up</text>`;
  // human hair: a band ~70 µm wide
  s += `<path d="M120 150 C 300 120, 520 220, 760 160" fill="none" stroke="${C.ink}" stroke-width="76" stroke-linecap="round"/><path d="M120 150 C 300 120, 520 220, 760 160" fill="none" stroke="#6B4A2E" stroke-width="70" stroke-linecap="round"/>`;
  s += `<path d="M150 140 C 320 116, 520 206, 740 152" fill="none" stroke="#8C6A4C" stroke-width="10" opacity=".6"/>`;
  s += `<text x="130" y="248" font-family="Public Sans,Arial" font-weight="800" font-size="26" fill="${C.ink}">Human hair</text><text x="130" y="280" font-family="Public Sans,Arial" font-size="21" fill="${C.ink}">about 50 to 70 µm across</text>`;
  // respirable particles: tiny dots ≤10 µm
  const px = [[220, 400, 5], [260, 420, 3.5], [240, 440, 2.5], [300, 395, 4.5], [330, 430, 2], [280, 455, 3], [350, 410, 3.8], [205, 430, 2.2]];
  px.forEach(([x, y, rr]) => { s += `<circle cx="${x}" cy="${y}" r="${rr}" fill="${C.ink}"/>`; });
  s += `<circle cx="280" cy="425" r="74" fill="none" stroke="#C23A2E" stroke-width="4" stroke-dasharray="10 8"/>`;
  s += `<text x="380" y="408" font-family="Public Sans,Arial" font-weight="800" font-size="26" fill="#C23A2E">Respirable silica</text><text x="380" y="440" font-family="Public Sans,Arial" font-size="21" fill="${C.ink}">under 10 µm. Small enough to reach</text><text x="380" y="468" font-family="Public Sans,Arial" font-size="21" fill="${C.ink}">the deepest part of the lung.</text>`;
  s += `<text x="60" y="530" font-family="Public Sans,Arial" font-size="18" fill="#4F5D6A">Visible dust is the big stuff. The particles that cause silicosis are too small to see.</text>`;
  return svgDoc(W, H, DEFS, s, 'Size comparison at the same magnification: a grain of sand fills the frame, a human hair is a thick band, and respirable silica particles are tiny dots.');
}

function table1Path() { // 1200×640 decision path
  const W = 1200, H = 640;
  const node = (x, y, w, h, fill, title, sub) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="${fill}" stroke="${C.ink}" stroke-width="3"/>` +
    `<text x="${x + w / 2}" y="${y + (sub ? h / 2 - 4 : h / 2 + 9)}" text-anchor="middle" font-family="Barlow Condensed,Arial Narrow,Arial" font-weight="800" font-size="26" fill="${C.ink}">${title}</text>` +
    (sub ? `<text x="${x + w / 2}" y="${y + h / 2 + 24}" text-anchor="middle" font-family="Public Sans,Arial" font-size="17" fill="${C.ink}">${sub}</text>` : '');
  const arrow = (x1, y1, x2, y2, label) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.ink}" stroke-width="3.5" marker-end="url(#ah)"/>` +
    (label ? `<text x="${(x1 + x2) / 2 + 10}" y="${(y1 + y2) / 2 - 6}" font-family="Public Sans,Arial" font-weight="700" font-size="18" fill="${C.ink}">${label}</text>` : '');
  let s = `<rect width="${W}" height="${H}" rx="22" fill="#F4F6F8"/>`;
  s += node(30, 40, 340, 96, '#FFFFFF', '1 · Find the task', 'equipment or task row in Table 1');
  s += node(430, 40, 340, 96, '#FFFFFF', '2 · Read the controls', 'water, shroud + collector, cab');
  s += node(830, 40, 340, 96, '#FFFFFF', '3 · Fully and properly?', 'flow, airflow, filter, seals');
  s += node(830, 230, 340, 96, '#E1EEFF', '4 · Indoors or out?', 'some rows change indoors');
  s += node(430, 230, 340, 96, '#E1EEFF', '5 · Total Table 1 hours', 'all tasks, whole shift');
  s += node(30, 230, 340, 96, '#DFF3DF', '6 · Read the respirator', '≤ 4 hr or > 4 hr column');
  s += node(30, 430, 540, 130, '#DFF3DF', 'Controls working + right respirator', 'You comply without air sampling');
  s += node(630, 430, 540, 130, '#FBE1DE', 'Off the table', 'Task not listed, or controls not fully and properly');
  s += `<text x="900" y="540" text-anchor="middle" font-family="Public Sans,Arial" font-size="17" fill="${C.ink}">implemented → exposure assessment (Module 5)</text>`;
  s += arrow(370, 88, 426, 88) + arrow(770, 88, 826, 88) + arrow(1000, 136, 1000, 226) + arrow(830, 278, 774, 278) + arrow(430, 278, 374, 278);
  s += arrow(200, 326, 200, 426, '');
  s += `<path d="M1170 88 C 1196 88, 1196 300, 1100 426" fill="none" stroke="#C23A2E" stroke-width="3" stroke-dasharray="10 8" marker-end="url(#ahr)"/><text x="1150" y="210" text-anchor="end" font-family="Public Sans,Arial" font-weight="700" font-size="18" fill="#C23A2E">no</text>`;
  s += `<path d="M120 40 C 120 10, 700 6, 760 426" fill="none" stroke="#C23A2E" stroke-width="3" stroke-dasharray="10 8" opacity=".0"/>`;
  const defs = DEFS + `<marker id="ah" markerUnits="userSpaceOnUse" markerWidth="16" markerHeight="16" refX="14" refY="8" orient="auto"><path d="M0 0 L16 8 L0 16 Z" fill="${C.ink}"/></marker><marker id="ahX" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto"><path d="M0 0 L12 6 L0 12 Z" fill="${C.ink}"/></marker><marker id="ahr" markerUnits="userSpaceOnUse" markerWidth="16" markerHeight="16" refX="14" refY="8" orient="auto"><path d="M0 0 L16 8 L0 16 Z" fill="#C23A2E"/></marker><marker id="ahrX" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto"><path d="M0 0 L12 6 L0 12 Z" fill="#C23A2E"/></marker>`;
  return svgDoc(W, H, defs, s, 'Table 1 decision path: find the task, read the controls, check fully and properly, indoor or outdoor, total hours, then read the respirator column. Off the table means exposure assessment.');
}

function controlsDiagram() { // 1200×520: three panels — water feed, shroud + collector, enclosed cab
  const W = 1200, H = 520;
  let s = `<rect width="${W}" height="${H}" rx="22" fill="#F4F6F8"/>`;
  // panel 1: saw with water feed
  s += `<g transform="translate(20 70)">` + `<line x1="70" y1="150" x2="200" y2="170" stroke="${C.ink}" stroke-width="12"/><rect x="40" y="120" width="90" height="56" rx="12" fill="${C.orange}" stroke="${C.ink}" stroke-width="3"/>` +
    `<circle cx="250" cy="180" r="64" fill="#C9CED3" stroke="${C.ink}" stroke-width="3"/><circle cx="250" cy="180" r="12" fill="${C.ink}"/><path d="M182 172 A68 68 0 0 1 318 160" fill="none" stroke="${C.orange}" stroke-width="18"/>` +
    hose('M222 112 C 180 60, 120 60, 60 30', HOSEB, 6) + spray(300, 230, 60, 10, 26) + `<rect x="0" y="244" width="380" height="40" fill="#A7AFB6"/></g>`;
  // panel 2: grinder + shroud + collector
  s += `<g transform="translate(420 70)"><rect x="20" y="140" width="140" height="48" rx="18" fill="#2F6DB5" stroke="${C.ink}" stroke-width="3"/><path d="M156 108 h56 v100 h-56 z" fill="#2E3740" stroke="${C.ink}" stroke-width="3"/>` +
    hose('M184 208 C 190 270, 240 280, 250 240', '#3B3F44', 8) + vacUnit(240, 120, 'ok') + `</g>`;
  // panel 3: enclosed cab
  s += `<g transform="translate(820 60)"><rect x="60" y="30" width="200" height="190" rx="14" fill="#2E3740" stroke="${C.ink}" stroke-width="4"/><rect x="78" y="50" width="164" height="130" rx="6" fill="#7FA9C9"/>` +
    `<rect x="260" y="60" width="60" height="70" rx="8" fill="#59626B" stroke="${C.ink}" stroke-width="3"/>` + [0, 1, 2, 3].map(i => `<line x1="270" y1="${72 + i * 14}" x2="310" y2="${72 + i * 14}" stroke="#9AA2A9" stroke-width="4"/>`).join('') +
    `<rect x="10" y="220" width="320" height="40" rx="8" fill="${C.yellow}" stroke="${C.ink}" stroke-width="3"/></g>`;
  ['Water at the blade', 'Shroud + dust collector', 'Enclosed cab or booth'].forEach((t, i) => { s += `<text x="${200 + i * 400}" y="46" text-anchor="middle" font-family="Barlow Condensed,Arial Narrow,Arial" font-weight="800" font-size="30" fill="${C.ink}">${t}</text>`; });
  ['Flow that minimizes visible dust', '99%+ filter · rated airflow · filter cleaning', 'Sealed · positive pressure · filtered air'].forEach((t, i) => { s += `<text x="${200 + i * 400}" y="${H - 34}" text-anchor="middle" font-family="Public Sans,Arial" font-size="18" fill="#4F5D6A">${t}</text>`; });
  s += line(400, 70, 400, H - 70, '#D3DAE0', 3) + line(800, 70, 800, H - 70, '#D3DAE0', 3);
  return svgDoc(W, H, DEFS, s, 'The three Table 1 engineering controls: water delivered at the blade, a shroud with a dust collector, and an enclosed cab or booth.');
}

function floorPlan() { // 1200×700: Level 2 plan for "Set the zone"
  const W = 1200, H = 700;
  let s = `<rect width="${W}" height="${H}" rx="22" fill="#F4F6F8"/>`;
  s += `<rect x="60" y="60" width="1080" height="580" fill="#E3E8EC" stroke="${C.ink}" stroke-width="6"/>`;
  // grid dots + columns
  for (let x = 240; x < 1140; x += 300) for (let y = 200; y < 640; y += 220) s += `<rect x="${x - 10}" y="${y - 10}" width="20" height="20" fill="${C.steel}"/>`;
  // core (stairs / elevator)
  s += `<rect x="60" y="60" width="160" height="200" fill="#C2C7CB" stroke="${C.ink}" stroke-width="3"/><text x="140" y="168" text-anchor="middle" font-family="Public Sans,Arial" font-weight="700" font-size="20" fill="${C.ink}">Stair + elevator</text>`;
  // cutting area
  s += `<rect x="520" y="280" width="300" height="220" fill="#FBE1DE" stroke="#C23A2E" stroke-width="3" stroke-dasharray="12 8"/><text x="670" y="380" text-anchor="middle" font-family="Barlow Condensed,Arial Narrow,Arial" font-weight="800" font-size="30" fill="#C23A2E">SLAB CUTTING</text><text x="670" y="410" text-anchor="middle" font-family="Public Sans,Arial" font-size="18" fill="${C.ink}">handheld + walk-behind saws</text>`;
  // drywall area
  s += `<rect x="880" y="100" width="240" height="160" fill="#E2ECF8" stroke="#1F5FAE" stroke-width="3"/><text x="1000" y="186" text-anchor="middle" font-family="Public Sans,Arial" font-weight="700" font-size="20" fill="#1F5FAE">Drywall crew</text>`;
  // corridor / route
  s += `<path d="M220 160 L460 160 L460 600 L1140 600" fill="none" stroke="#6E7C88" stroke-width="10" stroke-dasharray="4 14" stroke-linecap="round"/><text x="300" y="148" font-family="Public Sans,Arial" font-size="18" fill="#4F5D6A">main route from the stairs</text>`;
  // window wall
  s += `<line x1="1140" y1="300" x2="1140" y2="560" stroke="#7FA9C9" stroke-width="10"/><text x="1120" y="440" text-anchor="end" font-family="Public Sans,Arial" font-size="16" fill="#4F5D6A">open window wall</text>`;
  s += `<text x="70" y="680" font-family="Public Sans,Arial" font-size="18" fill="#4F5D6A">Level 2 · north is up · not to scale</text>`;
  return svgDoc(W, H, DEFS, s, 'Level 2 floor plan: stair and elevator core at top left, a slab cutting area in the middle, the drywall crew at the top right, the main walking route from the stairs, and an open window wall on the east side.');
}

function walt() { // 1200×520 chapter art: Walt's timeline 1974 → today (no medical imagery)
  const W = 1200, H = 420;
  let s = `<rect width="${W}" height="${H}" rx="22" fill="#F4F1EA"/>`;
  s += line(80, 230, 1120, 230, C.ink, 5);
  const pts2 = [[120, '1974', 'Starts as a laborer', 'Dry cutting block'], [380, '1990s', 'Mason, then foreman', '"Just dust"'], [640, '2012', 'Retires at 60', 'A cough that won\'t quit'], [900, '2016', 'Diagnosis', 'Chronic silicosis'], [1100, 'Today', 'Oxygen, 24/7', 'Grandson\'s games']];
  pts2.forEach(([x, yr, a, b], i) => {
    s += `<circle cx="${x}" cy="230" r="16" fill="${i >= 3 ? '#C23A2E' : '#0074E4'}" stroke="${C.ink}" stroke-width="3"/>`;
    s += `<text x="${x}" y="${i % 2 ? 300 : 150}" text-anchor="middle" font-family="Barlow Condensed,Arial Narrow,Arial" font-weight="800" font-size="34" fill="${C.ink}">${yr}</text>`;
    s += `<text x="${x}" y="${i % 2 ? 332 : 182}" text-anchor="middle" font-family="Public Sans,Arial" font-weight="700" font-size="19" fill="${C.ink}">${a}</text>`;
    s += `<text x="${x}" y="${i % 2 ? 358 : 112}" text-anchor="middle" font-family="Public Sans,Arial" font-size="17" fill="#4F5D6A">${b}</text>`;
  });
  s += `<text x="${W / 2}" y="${H - 18}" text-anchor="middle" font-family="Public Sans,Arial" font-size="17" fill="#4F5D6A">38 years of exposure. Symptoms showed up after he retired.</text>`;
  return svgDoc(W, H, DEFS, s, 'Walt\'s timeline: starts dry-cutting block in 1974, mason and foreman in the 1990s, retires in 2012 with a cough, diagnosed with chronic silicosis in 2016, on oxygen today.');
}

/* ================================================================== run */
const JOBS = Object.assign({ 'scene-slab': slab, 'scene-entrance': entrance, 'dg-particles': particles, 'dg-table1-path': table1Path,
  'dg-controls': controlsDiagram, 'dg-floorplan': floorPlan, 'dg-walt-timeline': walt }, equipment);

if (require.main === module) {
  fs.mkdirSync(ART, { recursive: true }); fs.mkdirSync(OUT, { recursive: true });
  const want = process.argv.slice(2);
  const boxes = {};
  (async () => {
    const { chromium } = require('playwright');
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
    for (const [name, fn] of Object.entries(JOBS)) {
      if (want.length && !want.includes(name)) continue;
      const svg = fn();
      fs.writeFileSync(path.join(ART, name + '.svg'), svg);
      if (name.startsWith('scene-')) boxes[name] = pct();
      const vb = svg.match(/viewBox="0 0 (\d+) (\d+)"/);
      await page.setViewportSize({ width: +vb[1], height: +vb[2] });
      const dbg = name.startsWith('scene-') ? Object.entries(BOX).map(([k, [x0, y0, x1, y1]]) => `<div style="position:absolute;left:${x0}px;top:${y0}px;width:${x1 - x0}px;height:${y1 - y0}px;border:3px solid ${/ok|good/.test(k) ? '#0a0' : 'red'}"><span style="background:#000;color:#fff;font:12px Arial;padding:1px 3px">${k}</span></div>`).join('') : '';
      await page.setContent(`<html><body style="margin:0"><div style="position:relative">${svg}${dbg}</div></body></html>`);
      await page.screenshot({ path: path.join(OUT, name + '.png') });
      console.log('built', name, (svg.length / 1024).toFixed(1) + ' KB');
    }
    await browser.close();
    if (Object.keys(boxes).length) console.log(JSON.stringify(boxes, null, 1));
  })();
}
module.exports = JOBS;
