// Scene art helpers — flat illustration, BUILD-SPEC §8 palette.
'use strict';
const C = {
  ink: '#22303C', concL: '#B9C0C6', concD: '#8C959D', concM: '#A3ABB2', wet: '#7E878F', steel: '#4A5B6C', steelL: '#6A7C8E',
  sky: '#DCE8F2', skyT: '#C4D8EA', orange: '#F26B1D', yellow: '#FFC629', lime: '#C6E23A', wood: '#C89B5C', woodD: '#A57A40',
  rebar: '#9C5A2E', white: '#F7F8F6', jeans: '#3D5878', dark: '#2E3A46', void: '#3B4652', green: '#7FA36B', ground: '#9DAA94',
  tpo: '#E9EDEF', tpoD: '#D3D9DD', glass: '#9CC3E0', skinA: '#C68B5E', skinB: '#8D5A3B', skinC: '#E2B48C', skinD: '#6B4428', cmu: '#AAB1B7',
  lens: '#CDEFFC', glove: '#E9B949', gloveD: '#B8862A'
};
const r = n => Math.round(n * 10) / 10;
const pts = a => a.map(p => `${r(p[0])},${r(p[1])}`).join(' ');
const poly = (a, fill, extra = '') => `<polygon points="${pts(a)}" fill="${fill}" stroke="${C.ink}" stroke-width="2.5" stroke-linejoin="round" ${extra}/>`;
const polyNS = (a, fill, extra = '') => `<polygon points="${pts(a)}" fill="${fill}" ${extra}/>`;
const line = (x1, y1, x2, y2, stroke, w, extra = '') => `<line x1="${r(x1)}" y1="${r(y1)}" x2="${r(x2)}" y2="${r(y2)}" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" ${extra}/>`;
const rect = (x, y, w, h, fill, extra = '') => `<rect x="${r(x)}" y="${r(y)}" width="${r(w)}" height="${r(h)}" fill="${fill}" stroke="${C.ink}" stroke-width="2.5" stroke-linejoin="round" ${extra}/>`;
const circ = (cx, cy, rr, fill, extra = '') => `<circle cx="${r(cx)}" cy="${r(cy)}" r="${r(rr)}" fill="${fill}" stroke="${C.ink}" stroke-width="2.5" ${extra}/>`;
const path = (d, fill, extra = '') => `<path d="${d}" fill="${fill}" stroke="${C.ink}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" ${extra}/>`;
// outlined limb: dark under-stroke then colored stroke
const limb = (pp, color, w) => {
  const d = 'M' + pp.map(p => `${r(p[0])} ${r(p[1])}`).join(' L');
  return `<path d="${d}" fill="none" stroke="${C.ink}" stroke-width="${w + 5}" stroke-linecap="round" stroke-linejoin="round"/>` +
         `<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
};
const lerp = (a, b, t) => a + (b - a) * t;

/**
 * Worker figure. Feet at (x,y). s = scale (1 ≈ 150px tall). dir 1 faces right, -1 left.
 * opts: hat, shirt, pants, vest (bool or color), harness (bool), pose, skin, lean (deg), beard, sticker, tool
 * Every figure wears full PPE: hard hat, hi-vis vest, safety glasses, gloves and work boots.
 * (harness is opt-in: scenes leave it off where missing fall protection IS the training hazard.)
 * Returns { svg, dring:[x,y], hand:[x,y], hand2:[x,y] } in scene coordinates.
 */
function worker(x, y, s, o = {}) {
  const dir = o.dir || 1, hat = o.hat || C.white, shirt = o.shirt || '#5E7FA3', pants = o.pants || C.jeans;
  const skin = o.skin || C.skinA, vest = o.vest === false ? null : (o.vest || C.lime), pose = o.pose || 'stand';
  const lean = o.lean || 0;
  let p = [];
  // local coords: feet at 0,0 ; up is negative
  let hip = [0, -72], legs;
  // work boot: ankle shaft over the pant cuff, then the foot with a dark lug sole
  const shaft = (bx, by, bw, bh) => `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="3" fill="${C.dark}" stroke="${C.ink}" stroke-width="2"/>`;
  const foot = (fx, fy, fw, fh) => `<rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" rx="4" fill="${C.dark}" stroke="${C.ink}" stroke-width="2"/>`
    + `<path d="M${fx + 3} ${fy + fh} L${fx + fw - 3} ${fy + fh}" stroke="${C.ink}" stroke-width="3" stroke-linecap="round"/>`;
  if (pose === 'kneel') {
    hip = [0, -46];
    legs = limb([[-4, -46], [-12, -8], [-40, -6]], pants, 16) + limb([[4, -46], [26, -40], [28, 0]], pants, 16)
      + shaft(-44, -16, 12, 16) + `<rect x="-52" y="-12" width="18" height="11" rx="4" fill="${C.dark}" stroke="${C.ink}" stroke-width="2"/>`
      + shaft(18, -18, 20, 14) + foot(20, -8, 22, 10);
  } else if (pose === 'step') {
    legs = limb([[-4, -72], [-16, -36], [-26, 0]], pants, 16) + limb([[4, -72], [14, -36], [22, 0]], pants, 16)
      + shaft(-36, -18, 20, 14) + foot(-38, -8, 22, 10) + shaft(12, -18, 20, 14) + foot(14, -8, 22, 10);
  } else {
    legs = limb([[-6, -72], [-8, -36], [-10, 0]], pants, 16) + limb([[6, -72], [8, -36], [10, 0]], pants, 16)
      + shaft(-20, -18, 20, 14) + foot(-24, -8, 22, 10) + shaft(0, -18, 20, 14) + foot(2, -8, 22, 10);
  }
  const hy = hip[1];
  const sh = hy - 52; // shoulder y
  // arms by pose
  let armA, armB, hand = [24, hy - 10], hand2 = [-20, hy - 8];
  const ac = shirt;
  switch (o.arms || pose) {
    case 'reach': hand = [52, sh - 6]; hand2 = [40, sh + 16]; armA = limb([[10, sh + 4], [32, sh + 2], hand], ac, 12); armB = limb([[-6, sh + 6], [16, sh + 22], hand2], ac, 12); break;
    case 'reachup': hand = [30, sh - 52]; hand2 = [-10, sh - 50]; armA = limb([[10, sh + 4], [24, sh - 22], hand], ac, 12); armB = limb([[-8, sh + 4], [-12, sh - 24], hand2], ac, 12); break;
    case 'hold': hand = [34, hy - 6]; hand2 = [28, hy + 2]; armA = limb([[10, sh + 4], [24, sh + 26], hand], ac, 12); armB = limb([[-8, sh + 6], [6, sh + 34], hand2], ac, 12); break;
    case 'carry': hand = [30, sh + 10]; hand2 = [24, sh + 14]; armA = limb([[10, sh + 4], [16, sh + 26], hand], ac, 12); armB = limb([[-8, sh + 6], [2, sh + 30], hand2], ac, 12); break;
    case 'point': hand = [56, sh + 4]; hand2 = [-14, hy - 2]; armA = limb([[10, sh + 4], [34, sh + 4], hand], ac, 12); armB = limb([[-10, sh + 6], [-14, sh + 30], hand2], ac, 12); break;
    case 'kneel': hand = [40, -10]; hand2 = [30, -6]; armA = limb([[10, sh + 4], [26, sh + 26], hand], ac, 12); armB = limb([[-8, sh + 6], [10, sh + 30], hand2], ac, 12); break;
    default: hand = [16, hy + 2]; hand2 = [-16, hy + 2]; armA = limb([[12, sh + 4], [16, sh + 28], hand], ac, 12); armB = limb([[-12, sh + 4], [-16, sh + 28], hand2], ac, 12);
  }
  // torso
  const torso = `<path d="M-18 ${sh} Q-20 ${sh - 4} -12 ${sh - 6} L12 ${sh - 6} Q20 ${sh - 4} 18 ${sh} L16 ${hy} L-16 ${hy} Z" fill="${shirt}" stroke="${C.ink}" stroke-width="2.5" stroke-linejoin="round"/>`;
  const vestSvg = vest ? `<path d="M-17 ${sh + 2} L-10 ${sh - 5} L-4 ${sh + 14} L4 ${sh + 14} L10 ${sh - 5} L17 ${sh + 2} L16 ${hy - 2} L-16 ${hy - 2} Z" fill="${vest}" stroke="${C.ink}" stroke-width="2" stroke-linejoin="round"/>`
    + `<rect x="-16" y="${sh + 24}" width="32" height="5" fill="#E9EEF0" stroke="${C.ink}" stroke-width="1"/><rect x="-16" y="${sh + 36}" width="32" height="5" fill="#E9EEF0" stroke="${C.ink}" stroke-width="1"/>` : '';
  const harn = o.harness ? `<path d="M-11 ${sh - 4} L-9 ${hy + 4} M11 ${sh - 4} L9 ${hy + 4} M-12 ${sh + 18} L12 ${sh + 18} M-10 ${hy + 2} Q0 ${hy + 14} 10 ${hy + 2}" fill="none" stroke="${C.ink}" stroke-width="7" stroke-linecap="round"/>`
    + `<path d="M-11 ${sh - 4} L-9 ${hy + 4} M11 ${sh - 4} L9 ${hy + 4} M-12 ${sh + 18} L12 ${sh + 18} M-10 ${hy + 2} Q0 ${hy + 14} 10 ${hy + 2}" fill="none" stroke="${C.orange}" stroke-width="4" stroke-linecap="round"/>`
    + `<circle cx="${-14}" cy="${sh + 2}" r="4" fill="#C9CED3" stroke="${C.ink}" stroke-width="2"/>` : '';
  // head
  const hx = 0, hyy = sh - 20;
  const beard = o.beard ? `<path d="M-11 ${hyy + 2} Q0 ${hyy + 22} 11 ${hyy + 2} Q6 ${hyy + 10} 0 ${hyy + 10} Q-6 ${hyy + 10} -11 ${hyy + 2} Z" fill="#9AA0A4" stroke="${C.ink}" stroke-width="1.5"/>` : '';
  // safety glasses (profile): clear lens bar with a dark frame + temple arm, just under the hat brim
  const glasses = `<path d="M2 ${hyy} L-11 ${hyy - 2}" stroke="${C.ink}" stroke-width="2" stroke-linecap="round"/>`
    + `<rect x="1.5" y="${hyy - 2.5}" width="13.5" height="6" rx="2.2" fill="${C.lens}" stroke="${C.ink}" stroke-width="1.8"/>`;
  const head = `<circle cx="${hx}" cy="${hyy}" r="13" fill="${skin}" stroke="${C.ink}" stroke-width="2.5"/>` + beard + glasses
    + `<circle cx="${hx + 6.5}" cy="${hyy + 0.5}" r="1.7" fill="${C.ink}"/>`;
  const hatSvg = hat === 'none' ? `<path d="M-13 ${hyy - 4} Q0 ${hyy - 20} 13 ${hyy - 4} Z" fill="#33404D" stroke="${C.ink}" stroke-width="2"/>` :
    `<path d="M-15 ${hyy - 5} Q-14 ${hyy - 24} 0 ${hyy - 25} Q14 ${hyy - 24} 15 ${hyy - 5} Z" fill="${hat}" stroke="${C.ink}" stroke-width="2.5" stroke-linejoin="round"/>`
    + `<path d="M-17 ${hyy - 5} L24 ${hyy - 5}" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/><path d="M-17 ${hyy - 5} L24 ${hyy - 5}" stroke="${hat}" stroke-width="2.5" stroke-linecap="round"/>`
    + (o.sticker ? `<circle cx="-4" cy="${hyy - 14}" r="4" fill="${C.orange}" stroke="${C.ink}" stroke-width="1"/>` : '')
    + `<path d="M0 ${hyy - 25} L0 ${hyy - 6}" stroke="${C.ink}" stroke-width="1.2" opacity=".35"/>`;
  let tool = '';
  if (o.tool === 'rake') tool = limb([[hand[0] - 30, hand[1] - 30], [hand[0] + 40, hand[1] + 50]], '#8A6A3F', 5) + `<path d="M${hand[0] + 30} ${hand[1] + 52} l24 -10" stroke="${C.ink}" stroke-width="7" stroke-linecap="round"/>`;
  if (o.tool === 'drill') tool = `<rect x="${hand[0] - 6}" y="${hand[1] - 22}" width="12" height="22" rx="3" fill="${C.orange}" stroke="${C.ink}" stroke-width="2"/>`;
  if (o.tool === 'clipboard') tool = `<rect x="${hand[0] - 4}" y="${hand[1] - 20}" width="18" height="24" rx="2" fill="#F3EFE2" stroke="${C.ink}" stroke-width="2"/>`;
  if (o.tool === 'welder') tool = limb([[hand[0], hand[1]], [hand[0] + 26, hand[1] + 14]], '#3A3A3A', 6);
  if (o.tool === 'deck') tool = `<path d="M${hand[0] - 40} ${hand[1] - 6} l90 -6 l2 10 l-90 6 z" fill="#C7CDD2" stroke="${C.ink}" stroke-width="2"/>`;
  if (o.tool === 'box') tool = `<rect x="${hand[0] - 14}" y="${hand[1] - 26}" width="34" height="28" rx="2" fill="#D9B77F" stroke="${C.ink}" stroke-width="2"/>`;

  // work gloves on both hands (the far hand sits behind the torso, the near hand over any tool it grips)
  const glove = q => `<circle cx="${r(q[0])}" cy="${r(q[1])}" r="6.5" fill="${C.glove}" stroke="${C.ink}" stroke-width="2"/>`
    + `<path d="M${r(q[0] - 3.5)} ${r(q[1] - 1)} q3.5 -3 7 0" fill="none" stroke="${C.gloveD}" stroke-width="1.4" stroke-linecap="round"/>`;
  const body = `<g transform="rotate(${lean} 0 ${hy})">${armB}${glove(hand2)}${torso}${vestSvg}${harn}${head}${hatSvg}${armA}${tool}${glove(hand)}</g>`;
  const g = `<g transform="translate(${r(x)} ${r(y)}) scale(${r(s * dir * 100) / 100} ${r(s * 100) / 100})">${legs}${body}</g>`;
  // world coords of D-ring (back of harness between shoulders) and hands, rotated by lean
  const rot = (px, py) => { const a = lean * Math.PI / 180, dx = px, dy = py - hy; return [dx * Math.cos(a) - dy * Math.sin(a), hy + dx * Math.sin(a) + dy * Math.cos(a)]; };
  const W = q => [x + q[0] * s * dir, y + q[1] * s];
  return { svg: g, dring: W(rot(-14, sh + 2)), hand: W(rot(...hand)), hand2: W(rot(...hand2)), head: W(rot(0, hyy - 20)), hip: W(hip) };
}

// steel W column, front face
function column(x, yBase, yTop, w = 26) {
  return rect(x - w / 2, yTop, w, yBase - yTop, C.steel) + `<line x1="${x - w / 2 + 5}" y1="${yTop}" x2="${x - w / 2 + 5}" y2="${yBase}" stroke="${C.steelL}" stroke-width="3"/>`
    + `<line x1="${x + w / 2 - 5}" y1="${yTop}" x2="${x + w / 2 - 5}" y2="${yBase}" stroke="#3B4A59" stroke-width="3"/>`;
}
// flagged cable rail post
function post(x, y, h, color = C.steel) {
  return `<rect x="${r(x - 3.5)}" y="${r(y - h)}" width="7" height="${r(h)}" fill="${color}" stroke="${C.ink}" stroke-width="2"/>`
    + `<rect x="${r(x - 7)}" y="${r(y - 4)}" width="14" height="6" fill="${C.dark}" stroke="${C.ink}" stroke-width="1.5"/>`;
}
function flag(x, y, s = 1) { return `<path d="M${r(x)} ${r(y)} l${r(8 * s)} ${r(4 * s)} l${r(-8 * s)} ${r(5 * s)} z" fill="${C.orange}" stroke="${C.ink}" stroke-width="1"/>`; }
function cable(x1, y1, x2, y2, sag = 4, flagged = false) { const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 + sag; return `<path d="M${r(x1)} ${r(y1)} Q${r(mx)} ${r(my)} ${r(x2)} ${r(y2)}" fill="none" stroke="#1C2228" stroke-width="4"/>` + (flagged ? flag(mx, (y1 + y2) / 2 + sag / 2, 1.2) : ''); }
// a parallelogram "hole" on a receding floor; (x,y) top-left, w, h, skew
function hole(x, y, w, h, skew = 0.3) {
  const a = [[x, y], [x + w, y], [x + w - h * skew, y + h], [x - h * skew, y + h]];
  const inner = [[x + 4, y + 3], [x + w - 4, y + 3], [x + w - 4 - h * 0.25, y + h * 0.55], [x + 4 - h * 0.25, y + h * 0.55]];
  return poly(a, '#1E262E') + polyNS(inner, '#3C4855');
}
function plywood(x, y, w, h, skew = 0.3, opts = {}) {
  const a = [[x, y], [x + w, y], [x + w - h * skew, y + h], [x - h * skew, y + h]];
  let s = poly(a, C.wood) + `<path d="M${r(x + w * 0.3)} ${r(y + 2)} Q${r(x + w * 0.35 - h * skew * 0.5)} ${r(y + h / 2)} ${r(x + w * 0.28 - h * skew)} ${r(y + h - 2)} M${r(x + w * 0.7)} ${r(y + 2)} Q${r(x + w * 0.62 - h * skew * 0.5)} ${r(y + h / 2)} ${r(x + w * 0.68 - h * skew)} ${r(y + h - 2)}" fill="none" stroke="${C.woodD}" stroke-width="1.5" opacity=".8"/>`;
  if (opts.label) {
    const cx = x + w / 2 - h * skew / 2, cy = y + h / 2 + (opts.fs || 14) * 0.35;
    s += `<text x="${r(cx)}" y="${r(cy)}" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="${opts.fs || 14}" fill="#E8492A">${opts.label}</text>`;
  }
  if (opts.cleats) {
    [[0.12, 0.2], [0.88, 0.2], [0.12, 0.8], [0.88, 0.8]].forEach(([u, v]) => { const px = x + w * u - h * skew * v, py = y + h * v; s += `<circle cx="${r(px)}" cy="${r(py)}" r="2.6" fill="#59606A"/>`; });
  }
  return s;
}
function svgDoc(w, h, defs, body, title) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${title}">\n<title>${title}</title>\n<defs>${defs}</defs>\n${body}\n</svg>\n`;
}
const scaleAt = (y, y0 = 360, y1 = 900, s0 = 0.62, s1 = 1.15) => lerp(s0, s1, (y - y0) / (y1 - y0));

module.exports = { C, r, pts, poly, polyNS, line, rect, circ, path, limb, lerp, worker, column, post, flag, cable, hole, plywood, svgDoc, scaleAt };
