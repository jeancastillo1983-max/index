// Riverside Level 3 deck pour (and the "tomorrow" variant)
'use strict';
const L = require('./lib');
const { C, poly, polyNS, line, rect, circ, path, worker, column, post, flag, cable, hole, plywood, svgDoc, scaleAt, r } = L;

const edgeX = y => 420 - (y - 400) * 0.9;      // left slab edge line
const W = 1600, H = 900;
const CLIP = `<clipPath id="deckclip"><polygon points="${edgeX(400)+4},400 1605,400 1605,905 ${edgeX(900)+4},905"/></clipPath>`;

function background() {
  let s = `<rect width="${W}" height="${H}" fill="url(#sky)"/>`;
  // distant skyline
  const sk = [[0, 300, 70, 120], [60, 260, 50, 160], [120, 320, 80, 100], [210, 280, 40, 140], [250, 330, 60, 90], [330, 290, 50, 130]];
  sk.forEach(([x, y, w, h]) => { s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#B6C8D8"/>`; });
  // hills/trees
  s += `<path d="M0 420 Q80 380 160 410 T340 400 L340 900 L0 900 Z" fill="#A8BCA0"/>`;
  // ground far below (left of the slab edge): street + sidewalk
  s += `<path d="M0 450 L440 410 L440 900 L0 900 Z" fill="${C.ground}"/>`;
  s += `<path d="M0 560 L440 470 L440 540 L0 660 Z" fill="#7D858C"/>`;          // street
  s += `<path d="M0 612 L440 506" stroke="#F3F1E6" stroke-width="3" stroke-dasharray="16 14"/>`;
  s += `<path d="M0 660 L440 540 L440 566 L0 694 Z" fill="#B9BDB8"/>`;          // sidewalk
  // tiny pump truck on the street (shows the height)
  s += `<g transform="translate(40 560) scale(.5)"><rect x="0" y="0" width="120" height="34" rx="4" fill="#E8E2D0" stroke="${C.ink}" stroke-width="3"/><rect x="100" y="-20" width="34" height="54" rx="4" fill="${C.orange}" stroke="${C.ink}" stroke-width="3"/><circle cx="24" cy="40" r="10" fill="${C.dark}"/><circle cx="110" cy="40" r="10" fill="${C.dark}"/></g>`;
  s += `<g transform="translate(190 520) scale(.42)"><rect x="0" y="0" width="90" height="34" rx="6" fill="#6F8FB0" stroke="${C.ink}" stroke-width="3"/><circle cx="20" cy="38" r="9" fill="${C.dark}"/><circle cx="72" cy="38" r="9" fill="${C.dark}"/></g>`;
  // facade of floors below (slab edges stepping down from the edge)
  for (let i = 1; i <= 2; i++) {
    const off = i * 26;
    s += `<path d="M${r(edgeX(400) - off * 0.4)} ${400 + off * 2.2} L${r(edgeX(900) - off * 0.4)} ${900 + off * 2.2}" stroke="#8E99A3" stroke-width="5" opacity=".55"/>`;
  }
  return s;
}

function backBay(tomorrow) {
  let s = '';
  // level 4 framing (overhead): beams + columns behind
  s += rect(250, 36, 1360, 26, C.steel) + `<line x1="250" y1="44" x2="1610" y2="44" stroke="${C.steelL}" stroke-width="3"/>`;
  s += rect(860, 220, 750, 16, C.steel);
  // CMU core (back left) with doorway
  s += rect(318, 214, 520, 186, C.cmu);
  for (let y = 226; y < 400; y += 16) s += `<line x1="318" y1="${y}" x2="838" y2="${y}" stroke="#949CA3" stroke-width="1.5"/>`;
  for (let y = 214, k = 0; y < 400; y += 16, k++) for (let x = 318 + (k % 2 ? 20 : 0); x < 838; x += 40) s += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + 16}" stroke="#949CA3" stroke-width="1.2"/>`;
  s += rect(560, 300, 64, 100, '#4E5964');
  // next bay: open framing beyond the leading edge
  const le = tomorrow ? 296 : 332;               // leading edge y (moves back tomorrow)
  s += polyNS([[860, 236], [1610, 236], [1610, le], [860, le]], '#55616D');           // void (floor far below)
  s += polyNS([[860, 236], [1610, 236], [1610, 262], [860, 262]], '#6B7884', 'opacity=".7"');
  for (let x = 880; x < 1610; x += 70) s += line(x, 236, x - 10, le, C.steel, 6);         // joists
  s += line(860, le - 2, 1610, le - 2, C.steel, 9);
  // metal deck sheets (corrugated) from le to 400
  s += polyNS([[860, le], [1610, le], [1610, 400], [860, 400]], '#C7CDD2', `stroke="${C.ink}" stroke-width="2.5"`);
  for (let x = 870; x < 1610; x += 14) s += `<line x1="${x}" y1="${le + 2}" x2="${x - 6}" y2="398" stroke="#A9B1B8" stroke-width="3"/>`;
  // leading edge line highlight
  s += line(860, le, 1610, le, C.ink, 3);
  // deck bundle sitting on the deck
  s += `<g>${rect(1460, le + 22, 110, 18, '#B7BEC4')}${rect(1464, le + 10, 104, 14, '#C7CDD2')}</g>`;
  // back columns
  s += column(870, 400, 62, 22) + column(1590, 400, 62, 22) + column(1230, 400, 62, 22);
  return { svg: s, le };
}

function slab(tomorrow) {
  let s = '';
  // slab edge thickness on the left
  const e = [[edgeX(400), 400], [edgeX(900), 900], [edgeX(900) - 18, 900], [edgeX(400) - 18, 406]];
  s += poly(e, '#D2D7DB');
  // deck surface
  s += poly([[edgeX(400), 400], [W + 5, 400], [W + 5, H + 5], [edgeX(900), H + 5]], C.concL);
  // fresh concrete pour area (back half) — tomorrow it's all cured
  if (!tomorrow) {
    s += polyNS([[edgeX(402), 402], [1150, 402], [1180, 560], [edgeX(560), 560]], C.wet);
    s += `<path d="M${edgeX(560)} 560 L1180 560" stroke="${C.ink}" stroke-width="2" stroke-dasharray="10 8"/>`;
    for (let i = 0; i < 18; i++) { const x = 340 + i * 46, y = 430 + (i % 4) * 30; s += `<path d="M${x} ${y} q12 -6 24 0" stroke="#8D969E" stroke-width="2" fill="none"/>`; }
  } else {
    s += polyNS([[edgeX(402), 402], [1600, 402], [1600, 560], [edgeX(560), 560]], C.concM, 'opacity=".55"');
  }
  // rebar mat (front half) — tomorrow it's poured over
  if (!tomorrow) {
    const top = 572;
    s += `<g clip-path="url(#deckclip)">`;
    for (let y = top; y < 900; y += 20) s += `<line x1="${edgeX(y) + 26}" y1="${y}" x2="1600" y2="${y}" stroke="${C.rebar}" stroke-width="2.2"/>`;
    for (let k = -14; k < 40; k++) {
      const xb = 260 + k * 46, xt = 600 + k * 30;
      s += `<line x1="${xt}" y1="${top}" x2="${xb}" y2="900" stroke="${C.rebar}" stroke-width="2.2"/>`;
    }
    s += `</g>`;

  }
  return s;
}

function railSegment(y1, y2, opts = {}) {
  // posts along the edge from y1 to y2 (inset 10px), top & mid cables unless opts.noCable
  let s = '';
  const ys = []; for (let y = y1; y <= y2 + 0.1; y += opts.step || 62) ys.push(y);
  const P = ys.map(y => ({ x: edgeX(y) + 26, y, h: 86 * scaleAt(y) }));
  if (!opts.noCable) {
    for (let i = 0; i < P.length - 1; i++) {
      const a = P[i], b = P[i + 1];
      s += cable(a.x, a.y - a.h, b.x, b.y - b.h, 5, true) + cable(a.x, a.y - a.h / 2, b.x, b.y - b.h / 2, 4);
    }
  }
  P.forEach((p, i) => { s += post(p.x, p.y, p.h); });
  return { svg: s, P };
}

function deckScene(tomorrow) {
  const defs = `<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9DDF0"/><stop offset="1" stop-color="#EAF1F7"/></linearGradient>
  <linearGradient id="leftmask" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.ground}" stop-opacity="0"/><stop offset="1" stop-color="${C.ground}" stop-opacity="0"/></linearGradient>`;
  let s = background();
  const bb = backBay(tomorrow);
  s += bb.svg;
  s += slab(tomorrow);

  // ---------- perimeter cable rail ----------
  // A) pump-hose section: posts present, cables removed (top-left)   y 404–520
  if (!tomorrow) {
    const a = railSegment(404, 404 + 56, { noCable: true, step: 56 });
    s += a.svg;
    // coiled cable on the deck by the post
    s += `<ellipse cx="${edgeX(450) + 70}" cy="452" rx="20" ry="7" fill="none" stroke="#1C2228" stroke-width="3"/><ellipse cx="${edgeX(450) + 72}" cy="450" rx="14" ry="5" fill="none" stroke="#1C2228" stroke-width="3"/>`;
  } else {
    // tomorrow: still not reinstalled (same gap), plus cones
    const a = railSegment(404, 404 + 56, { noCable: true, step: 56 }); s += a.svg;
    s += `<ellipse cx="${edgeX(450) + 70}" cy="452" rx="20" ry="7" fill="none" stroke="#1C2228" stroke-width="3"/>`;
  }
  // B) intact rail section with Ray outside (y 528–714)
  const b = railSegment(484, 652, { step: 56, noCable: !!tomorrow });
  s += b.svg;
  if (tomorrow) s += `<path d="M${edgeX(540) + 30} 470 Q${edgeX(600) + 120} 610 ${edgeX(640) + 150} 650" fill="none" stroke="#1C2228" stroke-width="4"/>`;
  // C) front-left: posts present, cables down on deck (y 776–900)
  if (!tomorrow) {
    const c = railSegment(708, 820, { step: 56, noCable: true }); s += c.svg;
    s += `<path d="M${edgeX(652) + 30} ${652 - 60} Q${edgeX(700) + 90} 720 ${edgeX(760) + 80} 760 Q${edgeX(800) + 120} 790 ${edgeX(820) + 210} 812" fill="none" stroke="#1C2228" stroke-width="4"/>`;
    s += `<path d="M${edgeX(652) + 30} ${652 - 30} Q${edgeX(720) + 110} 740 ${edgeX(780) + 120} 790 Q${edgeX(820) + 170} 820 ${edgeX(840) + 250} 836" fill="none" stroke="#1C2228" stroke-width="4"/>`;
    // connect B → C top post cable dangling
  } else {
    const c = railSegment(708, 820, { step: 56 }); s += c.svg;       // fixed tomorrow
  }
  // connect intact rail to section above/below with cables where intact
  if (tomorrow) {
    // tomorrow: rail dropped to make a landing zone at y 528–600? keep B intact; landing zone drawn at deck right
  }

  // ---------- pump boom & hose (today) ----------
  if (!tomorrow) {
    s += `<path d="M-30 120 L230 230" stroke="${C.ink}" stroke-width="30" stroke-linecap="round"/><path d="M-30 120 L230 230" stroke="#E8E2D0" stroke-width="24" stroke-linecap="round"/>`;
    s += `<path d="M230 230 L330 318" stroke="${C.ink}" stroke-width="22" stroke-linecap="round"/><path d="M230 230 L330 318" stroke="#E8E2D0" stroke-width="16" stroke-linecap="round"/>`;
    s += `<path d="M100 172 L230 230" stroke="${C.orange}" stroke-width="5"/>`;
    s += circ(230, 230, 11, C.dark);
    const hose = 'M330 318 C338 360 352 400 392 432 C430 460 470 478 520 486';
    s += `<path d="${hose}" fill="none" stroke="${C.ink}" stroke-width="17" stroke-linecap="round"/><path d="${hose}" fill="none" stroke="#2F3740" stroke-width="12" stroke-linecap="round"/>`;
  }

  // ---------- crane-landed rebar bundle + Ray outside the rail ----------
  if (!tomorrow) {
    s += line(110, 0, 110, 500, '#2F3740', 3);
    s += `<path d="M102 500 q8 16 16 0" fill="none" stroke="${C.ink}" stroke-width="5"/>`;
    s += line(110, 508, 56, 536, '#2F3740', 2.5) + line(110, 508, 166, 536, '#2F3740', 2.5);
    // bundle
    s += `<g>${rect(30, 534, 150, 26, '#8C4F27')}` + Array.from({ length: 9 }, (_, i) => `<line x1="34" y1="${538 + i * 2.6}" x2="176" y2="${538 + i * 2.6}" stroke="#6E3D1D" stroke-width="1.2"/>`).join('') + `</g>`;
    // tagline from bundle toward Ray
    s += `<path d="M170 560 Q190 584 214 580" fill="none" stroke="#E3C766" stroke-width="3"/>`;
    // Ray: outside the rail, on the slab edge, leaning out, no harness
    const ray = worker(edgeX(616) + 4, 616, 0.92, { dir: -1, pose: 'step', arms: 'reach', lean: -12, hat: C.white, shirt: '#7A6A55', beard: true, skin: C.skinC, vest: C.lime });
    s += ray.svg;
  } else {
    // tomorrow: material landing zone — rail section B dropped for a crane delivery of deck bundles
  }

  // ---------- columns on the deck ----------
  s += column(940, 590, 62, 28);
  s += column(1500, 640, 62, 28);

  // ---------- holes and covers ----------
  if (!tomorrow) {
    // floor-hole-open: uncovered chase opening in the rebar area (front-center)
    s += hole(730, 760, 104, 54, 0.32);
    s += `<path d="M720 760 l-8 -10 M836 758 l6 -10" stroke="${C.rebar}" stroke-width="2.4"/>`;
    // cover-unmarked: plywood shifted, not secured, not marked, exposing a corner
    s += hole(1000, 612, 96, 50, 0.3);
    s += plywood(1018, 604, 104, 52, 0.3);
    // cover-good: marked HOLE, cleated
    s += plywood(1318, 812, 124, 58, 0.3, { label: 'HOLE', fs: 22, cleats: true });
  } else {
    // tomorrow: blockout stripped → new hole; plumber took the cover off
    s += hole(730, 760, 104, 54, 0.32);                 // the chase is still there (now plumbing) — stays open
    s += hole(1040, 660, 70, 38, 0.3);                  // new sleeve blockout stripped
    s += plywood(1110, 700, 90, 44, 0.3, { label: 'HOLE', fs: 16, cleats: false });  // cover slid aside by the plumber
    s += plywood(1318, 812, 124, 58, 0.3, { label: 'HOLE', fs: 22, cleats: true });
  }

  // ---------- rail-good: wood guardrail around the stair opening (right) ----------
  {
    const x0 = 1190, y0 = 486, w = 210, d = 70, sk = 0.3;
    s += hole(x0, y0 + 30, w, d, sk);
    const corners = [[x0, y0 + 30], [x0 + w, y0 + 30], [x0 + w - d * sk, y0 + 30 + d], [x0 - d * sk, y0 + 30 + d]];
    const ph = 62;
    // back rail
    const railPair = (A, B) => `<path d="M${A[0]} ${A[1] - ph} L${B[0]} ${B[1] - ph}" stroke="${C.ink}" stroke-width="9"/><path d="M${A[0]} ${A[1] - ph} L${B[0]} ${B[1] - ph}" stroke="${C.wood}" stroke-width="6"/>`
      + `<path d="M${A[0]} ${A[1] - ph / 2} L${B[0]} ${B[1] - ph / 2}" stroke="${C.ink}" stroke-width="8"/><path d="M${A[0]} ${A[1] - ph / 2} L${B[0]} ${B[1] - ph / 2}" stroke="${C.wood}" stroke-width="5"/>`
      + `<path d="M${A[0]} ${A[1] - 4} L${B[0]} ${B[1] - 4}" stroke="${C.ink}" stroke-width="8"/><path d="M${A[0]} ${A[1] - 4} L${B[0]} ${B[1] - 4}" stroke="${C.yellow}" stroke-width="5"/>`;
    s += railPair(corners[0], corners[1]) + railPair(corners[0], corners[3]) + railPair(corners[1], corners[2]);
    corners.forEach(c => { s += `<rect x="${c[0] - 4}" y="${c[1] - ph - 2}" width="8" height="${ph + 2}" fill="${C.wood}" stroke="${C.ink}" stroke-width="2"/>`; });
    s += railPair(corners[3], corners[2]);
  }

  // ---------- pour crew (today) ----------
  if (!tomorrow) {
    s += worker(482, 492, 0.7, { dir: -1, arms: 'hold', hat: C.white, shirt: '#55708C', harness: false, skin: C.skinB }).svg;
    s += worker(640, 486, 0.7, { dir: 1, arms: 'hold', tool: 'rake', hat: C.yellow, shirt: '#8A5F4A', skin: C.skinD }).svg;
    s += worker(820, 494, 0.72, { dir: -1, arms: 'hold', tool: 'rake', hat: C.white, shirt: '#5E7FA3', skin: C.skinC }).svg;
  }

  // ---------- rebar-foot-tieoff: worker kneeling on rebar mat, lanyard to rebar at his feet ----------
  if (!tomorrow) {
    const k = worker(470, 760, 0.95, { dir: 1, pose: 'kneel', arms: 'kneel', hat: C.yellow, shirt: '#5C7A57', harness: true, skin: C.skinB });
    s += k.svg;
    // lanyard: D-ring → down to a rebar at foot level (shock pack in the middle)
    const [dx, dy] = k.dring; const ax = 418, ay = 772;
    s += `<path d="M${r(dx)} ${r(dy)} Q${r(dx - 40)} ${r(dy + 10)} ${r(dx - 34)} ${r(dy + 34)}" fill="none" stroke="${C.ink}" stroke-width="6"/><path d="M${r(dx)} ${r(dy)} Q${r(dx - 40)} ${r(dy + 10)} ${r(dx - 34)} ${r(dy + 34)}" fill="none" stroke="#2B6CB0" stroke-width="3.5"/>`;
    s += `<rect x="${r(dx - 46)}" y="${r(dy + 30)}" width="22" height="28" rx="5" fill="#2B6CB0" stroke="${C.ink}" stroke-width="2"/>`;
    s += `<path d="M${r(dx - 36)} ${r(dy + 58)} Q${r(ax + 4)} ${r(ay - 8)} ${ax} ${ay}" fill="none" stroke="${C.ink}" stroke-width="6"/><path d="M${r(dx - 36)} ${r(dy + 58)} Q${r(ax + 4)} ${r(ay - 8)} ${ax} ${ay}" fill="none" stroke="#2B6CB0" stroke-width="3.5"/>`;
    s += `<path d="M${ax - 8} ${ay - 2} q8 14 16 0" fill="none" stroke="#9AA3AB" stroke-width="5"/>`;   // snaphook on rebar
  }

  // ---------- leading edge crew on the metal deck (no fall protection) ----------
  if (!tomorrow) {
    s += worker(1080, 366, 0.6, { dir: 1, arms: 'carry', tool: 'deck', hat: C.white, shirt: '#6B6F8F', skin: C.skinA }).svg;
    s += worker(1300, 360, 0.6, { dir: -1, pose: 'kneel', arms: 'kneel', tool: 'drill', hat: C.yellow, shirt: '#7C5D49', skin: C.skinC }).svg;
  } else {
    s += worker(1120, 330, 0.56, { dir: 1, arms: 'carry', tool: 'deck', hat: C.white, shirt: '#6B6F8F', skin: C.skinA }).svg;
    s += worker(1360, 324, 0.56, { dir: -1, pose: 'kneel', arms: 'kneel', tool: 'drill', hat: C.yellow, shirt: '#7C5D49', skin: C.skinC }).svg;
  }

  // ---------- Tomorrow-only exposures ----------
  if (tomorrow) {
    // landing zone: rail section B cables unhooked for a crane delivery, bundle landing, worker reaching
    s += `<g>${line(150, 0, 150, 560, '#2F3740', 3)}${rect(60, 590, 190, 22, '#B7BEC4')}${rect(64, 576, 182, 16, '#C7CDD2')}${line(150, 560, 90, 576, '#2F3740', 2.5)}${line(150, 560, 220, 576, '#2F3740', 2.5)}</g>`;
    
    s += worker(edgeX(600) + 60, 600, 0.9, { dir: -1, pose: 'step', arms: 'reach', lean: -8, hat: '#3E9B4F', shirt: '#6A7F94', skin: C.skinC }).svg;
    // fresh concrete, cones
    s += `<path d="M560 520 l10 -30 l10 30 z" fill="${C.orange}" stroke="${C.ink}" stroke-width="2"/>`;
    // plumber at the stripped blockout walking away
    s += worker(980, 720, 0.86, { dir: -1, arms: 'carry', tool: 'box', hat: '#3B7DD8', shirt: '#4C6A84', skin: C.skinA }).svg;
  }
  return s;
}

module.exports = {
  deck: () => svgDoc(W, H, `<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9DDF0"/><stop offset="1" stop-color="#EAF1F7"/></linearGradient>${CLIP}`, deckScene(false), 'Riverside Level 3 deck pour'),
  deckTomorrow: () => svgDoc(W, H, `<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9DDF0"/><stop offset="1" stop-color="#EAF1F7"/></linearGradient>${CLIP}`, deckScene(true), 'Riverside Level 3 deck, the next morning'),
  edgeX
};
