// Riverside Level 2 interior: elevator shaft, two stair openings, low-sill wall opening, covers
'use strict';
const { C, poly, polyNS, line, rect, circ, worker, post, plywood, hole, svgDoc, scaleAt, r } = require('./lib');
const W = 1600, H = 900;
const FLOOR = 430;     // back wall / floor line

function room() {
  let s = '';
  // underside of level 3 deck + beams
  s += `<rect width="${W}" height="${FLOOR}" fill="#C7CED4"/>`;
  s += polyNS([[0, 0], [W, 0], [W, 70], [0, 70]], '#AEB6BD');
  for (let x = -40; x < W; x += 26) s += `<line x1="${x}" y1="0" x2="${x + 10}" y2="70" stroke="#9AA3AB" stroke-width="3"/>`;
  s += rect(-5, 66, W + 10, 22, C.steel) + rect(-5, 150, W + 10, 14, '#5A6B7C');
  // conduit runs overhead
  s += line(0, 104, W, 112, '#8F98A0', 6) + line(0, 120, W, 128, '#A7AFB6', 5);
  // back exterior wall (sheathing) on the left
  s += rect(-5, 164, 500, FLOOR - 164, '#D8CDB5');
  for (let x = 40; x < 495; x += 64) s += line(x, 164, x, FLOOR, '#C2B497', 2);
  // wall opening with low sill (~12 in)
  s += rect(110, 216, 280, FLOOR - 18 - 216, '#BFD6EC');
  s += polyNS([[112, 300], [388, 280], [388, FLOOR - 20], [112, FLOOR - 20]], '#A9BDA3');
  s += polyNS([[112, 352], [388, 330], [388, 352], [112, 376]], '#80878E');
  [[140, 330], [200, 322], [300, 312]].forEach(([x, y]) => { s += `<circle cx="${x}" cy="${y}" r="12" fill="#6F8F62"/>`; });
  s += `<g transform="translate(230 360) scale(.32)"><rect width="90" height="34" rx="6" fill="#C8574A" stroke="${C.ink}" stroke-width="3"/><circle cx="20" cy="38" r="9" fill="${C.dark}"/><circle cx="72" cy="38" r="9" fill="${C.dark}"/></g>`;
  s += rect(104, FLOOR - 20, 292, 20, '#B9AE94');     // low sill
  s += rect(104, 210, 292, 10, '#B9AE94');
  // CMU elevator core (center)
  s += rect(500, 164, 420, FLOOR - 164, C.cmu);
  for (let y = 176; y < FLOOR; y += 16) s += `<line x1="500" y1="${y}" x2="920" y2="${y}" stroke="#949CA3" stroke-width="1.5"/>`;
  for (let y = 164, k = 0; y < FLOOR; y += 16, k++) for (let x = 500 + (k % 2 ? 20 : 0); x < 920; x += 40) s += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + 16}" stroke="#949CA3" stroke-width="1.2"/>`;
  // elevator shaft door opening — dark shaft, rails, no barricade
  s += rect(600, 236, 170, FLOOR - 236, '#1C232A');
  s += line(624, 240, 624, FLOOR, '#4A5560', 6) + line(746, 240, 746, FLOOR, '#4A5560', 6);
  s += polyNS([[604, FLOOR - 40], [766, FLOOR - 40], [766, FLOOR - 2], [604, FLOOR - 2]], '#0F1419');
  s += rect(592, 228, 186, 10, '#8C959D');
  // ELEV sign stencil
  s += `<text x="685" y="214" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-size="18" fill="#E8492A">ELEV 1</text>`;
  // right side: stud wall / stair core
  s += rect(920, 164, 690, FLOOR - 164, '#D7DCE0');
  for (let x = 950; x < W; x += 48) s += line(x, 164, x, FLOOR, '#C3C9CE', 3);
  // floor slab
  s += polyNS([[0, FLOOR], [W, FLOOR], [W, H], [0, H]], C.concL);
  s += line(0, FLOOR, W, FLOOR, C.ink, 3);
  for (let i = 1; i < 9; i++) { const y = FLOOR + i * i * 6.5; s += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="#AEB5BB" stroke-width="1.4"/>`; }
  // barricade rail knocked down, lying on the floor in front of the shaft door
  s += `<g>${poly([[586, 452], [790, 462], [788, 474], [584, 464]], '#F2B230')}${poly([[600, 470], [612, 470], [608, 494], [596, 494]], '#F2B230')}</g>`;
  // columns
  [[460, 430], [1000, 430]].forEach(([x, y]) => { s += rect(x - 14, 88, 28, y - 88, C.steel); });
  s += rect(1380 - 18, 88, 36, 820 - 88, C.steel);
  return s;
}

function stairOpening(x, y, w, d, sk) {
  // opening in the floor with a stair flight going down
  let s = poly([[x, y], [x + w, y], [x + w - d * sk, y + d], [x - d * sk, y + d]], '#2A333C');
  for (let i = 0; i < 7; i++) {
    const t = i / 7, yy = y + 6 + t * (d - 10), xs = x + 18 - t * d * sk, xe = x + w * 0.52 - t * d * sk;
    s += `<path d="M${r(xs)} ${r(yy)} L${r(xe)} ${r(yy)}" stroke="#7E878F" stroke-width="5"/>`;
  }
  s += polyNS([[x + w * 0.56, y + 4], [x + w - 6, y + 4], [x + w - 6 - (d - 8) * sk, y + d - 4], [x + w * 0.56 - (d - 8) * sk, y + d - 4]], '#151B21');
  return s;
}

function woodRail(A, B, ph, toe = true) {
  return `<path d="M${A[0]} ${A[1] - ph} L${B[0]} ${B[1] - ph}" stroke="${C.ink}" stroke-width="9"/><path d="M${A[0]} ${A[1] - ph} L${B[0]} ${B[1] - ph}" stroke="${C.wood}" stroke-width="6"/>`
    + `<path d="M${A[0]} ${A[1] - ph / 2} L${B[0]} ${B[1] - ph / 2}" stroke="${C.ink}" stroke-width="8"/><path d="M${A[0]} ${A[1] - ph / 2} L${B[0]} ${B[1] - ph / 2}" stroke="${C.wood}" stroke-width="5"/>`
    + (toe ? `<path d="M${A[0]} ${A[1] - 4} L${B[0]} ${B[1] - 4}" stroke="${C.ink}" stroke-width="8"/><path d="M${A[0]} ${A[1] - 4} L${B[0]} ${B[1] - 4}" stroke="${C.yellow}" stroke-width="5"/>` : '');
}
const woodPost = (c, ph) => `<rect x="${c[0] - 4}" y="${c[1] - ph - 2}" width="8" height="${ph + 2}" fill="${C.wood}" stroke="${C.ink}" stroke-width="2"/>`;

function shaftScene() {
  let s = room();
  // ---- Stair 1 (front-left): caution tape only ----
  {
    const x = 250, y = 610, w = 280, d = 96, sk = 0.3;
    s += stairOpening(x, y, w, d, sk);
    const c = [[x - 14, y - 6], [x + w + 14, y - 6], [x + w + 14 - (d + 12) * sk, y + d + 8], [x - 14 - (d + 12) * sk, y + d + 8]];
    const ph = 64;
    c.forEach(p => { s += `<rect x="${p[0] - 6}" y="${p[1] - ph}" width="12" height="${ph}" rx="3" fill="${C.orange}" stroke="${C.ink}" stroke-width="2"/><ellipse cx="${p[0]}" cy="${p[1]}" rx="14" ry="5" fill="${C.dark}"/>`; });
    for (let i = 0; i < 4; i++) {
      const A = c[i], B = c[(i + 1) % 4];
      s += `<path d="M${A[0]} ${A[1] - ph + 8} Q${(A[0] + B[0]) / 2} ${(A[1] + B[1]) / 2 - ph + 22} ${B[0]} ${B[1] - ph + 8}" fill="none" stroke="${C.ink}" stroke-width="7"/>`;
      s += `<path d="M${A[0]} ${A[1] - ph + 8} Q${(A[0] + B[0]) / 2} ${(A[1] + B[1]) / 2 - ph + 22} ${B[0]} ${B[1] - ph + 8}" fill="none" stroke="${C.yellow}" stroke-width="4.5" stroke-dasharray="14 6"/>`;
    }
  }
  // ---- Stair 2 (right): far + right sides railed (good), near side rail removed ----
  {
    const x = 1010, y = 520, w = 300, d = 100, sk = 0.3;
    s += stairOpening(x, y, w, d, sk);
    const c = [[x - 6, y - 2], [x + w + 6, y - 2], [x + w + 6 - (d + 6) * sk, y + d + 4], [x - 6 - (d + 6) * sk, y + d + 4]];
    const ph = 70;
    s += woodRail(c[0], c[1], ph) + woodRail(c[1], c[2], ph) + woodRail(c[0], c[3], ph);
    c.forEach(p => { s += woodPost(p, ph); });
    // removed near-side rail lying on the floor
    s += `<path d="M${c[3][0] + 30} ${c[3][1] + 46} L${c[2][0] - 10} ${c[2][1] + 30}" stroke="${C.ink}" stroke-width="9"/><path d="M${c[3][0] + 30} ${c[3][1] + 46} L${c[2][0] - 10} ${c[2][1] + 30}" stroke="${C.wood}" stroke-width="6"/>`;
    s += `<path d="M${c[3][0] + 60} ${c[3][1] + 62} L${c[2][0] + 20} ${c[2][1] + 52}" stroke="${C.ink}" stroke-width="8"/><path d="M${c[3][0] + 60} ${c[3][1] + 62} L${c[2][0] + 20} ${c[2][1] + 52}" stroke="${C.wood}" stroke-width="5"/>`;
  }
  // ---- covers ----
  s += hole(690, 770, 100, 52, 0.3);
  s += plywood(752, 790, 112, 56, 0.3);                                         // cover-displaced (kicked off)
  s += plywood(1180, 790, 150, 66, 0.3, { label: 'COVER', fs: 18, cleats: true }); // cover-secured
  // ---- workers ----
  // near the open shaft: worker pushing a cart toward the shaft door
  s += `<g>${rect(800, 500, 100, 40, '#6F8FB0')}${circ(812, 548, 8, C.dark)}${circ(888, 548, 8, C.dark)}${rect(806, 470, 60, 30, '#D9B77F')}</g>`;
  s += worker(930, 548, 0.78, { dir: -1, arms: 'hold', hat: C.white, shirt: '#6A5D8C', skin: C.skinC, lean: -8 }).svg;
  // bucket-ladder: worker on a 5-gal bucket reaching up to the conduit
  s += `<g>${poly([[1478, 580], [1522, 580], [1518, 640], [1482, 640]], C.orange)}<ellipse cx="1500" cy="580" rx="22" ry="6" fill="#D9601A" stroke="${C.ink}" stroke-width="2"/></g>`;
  s += worker(1500, 580, 0.86, { dir: -1, arms: 'reachup', tool: 'drill', hat: C.yellow, shirt: '#5C7A57', skin: C.skinB }).svg;
  // worker near the low-sill wall opening, measuring the opening
  s += worker(300, 470, 0.72, { dir: -1, arms: 'reach', hat: C.white, shirt: '#8A5F4A', skin: C.skinA, lean: -10 }).svg;
  // worker carrying a box toward the displaced cover
  s += worker(600, 860, 1.05, { dir: 1, arms: 'carry', tool: 'box', hat: '#3E9B4F', shirt: '#55708C', skin: C.skinD }).svg;
  return s;
}

module.exports = { shaft: () => svgDoc(W, H, '', shaftScene(), 'Riverside Level 2 interior, shaft and stair openings') };
