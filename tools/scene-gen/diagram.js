'use strict';
const fs = require('fs');
const C = { ink: '#22303C', blue: '#1F5FAE', grid: '#DCE6F0', bg: '#F3F7FB', wood: '#C89B5C', woodD: '#A57A40', conc: '#B9C0C6', concD: '#8C959D', yellow: '#FFC629', orange: '#F26B1D', steel: '#4A5B6C' };
const W = 1200, H = 700;
let s = `<rect width="${W}" height="${H}" fill="${C.bg}"/>`;
for (let x = 0; x <= W; x += 25) s += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${C.grid}" stroke-width="${x % 100 ? 0.8 : 1.6}"/>`;
for (let y = 0; y <= H; y += 25) s += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${C.grid}" stroke-width="${y % 100 ? 0.8 : 1.6}"/>`;
const T = (x, y, t, o = {}) => `<text x="${x}" y="${y}" font-family="Barlow Condensed, Arial Narrow, Arial, sans-serif" font-weight="700" font-size="${o.fs || 20}" letter-spacing="1" fill="${o.fill || C.ink}" text-anchor="${o.a || 'start'}">${t}</text>`;
const arrowDefs = `<marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="${C.blue}"/></marker>
<marker id="ahO" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="24" markerHeight="24" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${C.orange}"/></marker>`;
const dim = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.blue}" stroke-width="2.5" marker-start="url(#ah)" marker-end="url(#ah)"/>`;
const ext = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.blue}" stroke-width="1.5" stroke-dasharray="6 5"/>`;
const leader = (x1, y1, x2, y2) => `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${C.blue}" stroke-width="2" fill="none"/><circle cx="${x1}" cy="${y1}" r="4" fill="${C.blue}"/>`;
const load = (x, y1, y2) => `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${C.orange}" stroke-width="7" marker-end="url(#ahO)"/>`;

// ---------- LEFT: guardrail elevation (scale 6.43 px per inch; surface y=520) ----------
const SY = 520, PX = 6.43;
const yIn = i => SY - i * PX;
s += T(60, 50, 'GUARDRAIL — ELEVATION', { fs: 26, fill: C.blue });
// slab
s += `<rect x="150" y="${SY}" width="420" height="56" fill="${C.conc}" stroke="${C.ink}" stroke-width="3"/>`;
s += `<rect x="150" y="${SY + 56}" width="420" height="14" fill="#7A848D" stroke="${C.ink}" stroke-width="2"/>`;
for (let x = 170; x < 570; x += 36) s += `<line x1="${x}" y1="${SY + 10}" x2="${x + 14}" y2="${SY + 46}" stroke="${C.concD}" stroke-width="2"/>`;
// posts (2x4 on edge), rails
[[180], [520]].forEach(([x]) => { s += `<rect x="${x - 9}" y="${yIn(42) - 6}" width="18" height="${42 * PX + 6}" fill="${C.wood}" stroke="${C.ink}" stroke-width="3"/>`; });
s += `<rect x="168" y="${yIn(42) - 8}" width="366" height="18" fill="${C.wood}" stroke="${C.ink}" stroke-width="3"/>`;            // top rail
s += `<line x1="175" y1="${yIn(42)}" x2="525" y2="${yIn(42)}" stroke="${C.woodD}" stroke-width="2"/>`;
s += `<rect x="168" y="${yIn(21) - 8}" width="366" height="16" fill="${C.wood}" stroke="${C.ink}" stroke-width="3"/>`;            // midrail
s += `<rect x="168" y="${yIn(3.5)}" width="366" height="${3.5 * PX}" fill="${C.yellow}" stroke="${C.ink}" stroke-width="3"/>`;   // toeboard
s += T(400, yIn(42) - 18, 'TOP RAIL', { a: 'middle' }) + T(350, yIn(21) - 16, 'MIDRAIL', { a: 'middle' }) + T(350, SY + 92, 'TOEBOARD', { a: 'middle', fs: 18 });
s += `<path d="M350 ${SY + 76} L350 ${SY - 8}" stroke="${C.ink}" stroke-width="1.5"/>`;
// dimension: top rail height (right side)
s += ext(534, yIn(42), 610, yIn(42)) + ext(570, SY, 610, SY) + dim(596, SY, 596, yIn(42));
// dimension: midrail height (left side)
s += ext(110, yIn(21), 168, yIn(21)) + ext(110, SY, 150, SY) + dim(124, SY, 124, yIn(21));
// toeboard leader
s += leader(240, SY - 10, 240, 640) + `<line x1="240" y1="640" x2="300" y2="640" stroke="${C.blue}" stroke-width="2"/>`;
// loads
s += load(250, 120, yIn(42) - 12) + T(262, 140, 'LOAD', { fill: C.orange, fs: 18 });
s += load(430, yIn(21) - 90, yIn(21) - 12) + T(442, yIn(21) - 70, 'LOAD', { fill: C.orange, fs: 18 });
// lower level hint
s += `<path d="M570 ${SY + 70} L570 690" stroke="${C.ink}" stroke-width="2" stroke-dasharray="4 6"/>` + T(560, 690, 'EDGE / DROP', { fs: 16, fill: '#6E7C88', a: 'end' });

// ---------- RIGHT: hole cover (isometric) ----------
s += T(690, 50, 'HOLE COVER', { fs: 26, fill: C.blue });
const iso = (x, y) => [800 + (x * 1.0 - y * 0.55) * 0.88, 380 + (x * 0.32 + y * 0.42) * 0.88];
const P = a => a.map(([x, y]) => iso(x, y).map(v => v.toFixed(1)).join(',')).join(' ');
// floor slab patch
s += `<polygon points="${P([[-80, -120], [380, -120], [380, 300], [-80, 300]])}" fill="${C.conc}" stroke="${C.ink}" stroke-width="2.5"/>`;
// hole outline (dashed) under cover
s += `<polygon points="${P([[40, -10], [250, -10], [250, 170], [40, 170]])}" fill="#2A333C" stroke="${C.ink}" stroke-width="2" opacity=".35"/>`;
// cover (bigger than hole)
s += `<polygon points="${P([[0, -50], [300, -50], [300, 210], [0, 210]])}" fill="${C.wood}" stroke="${C.ink}" stroke-width="3"/>`;
s += `<polygon points="${P([[0, 210], [300, 210], [300, 222], [0, 222]])}" fill="${C.woodD}" stroke="${C.ink}" stroke-width="2"/>`;
// hole outline ghost on top (dashed) to show overlap
s += `<polygon points="${P([[40, -10], [250, -10], [250, 170], [40, 170]])}" fill="none" stroke="${C.ink}" stroke-width="2" stroke-dasharray="8 6"/>`;
// stencil text
const [tx, ty] = iso(150, 80);
s += `<text x="${tx}" y="${ty + 10}" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="40" fill="#E8492A" text-anchor="middle" transform="rotate(17.7 ${tx} ${ty})">HOLE</text>`;
// cleats / screws at corners
[[18, -32], [282, -32], [282, 192], [18, 192]].forEach(([x, y]) => { const [cx, cy] = iso(x, y); s += `<circle cx="${cx}" cy="${cy}" r="6" fill="#4C545C" stroke="${C.ink}" stroke-width="1.5"/>`; });
// cleat blocks below edges (visible at the front edge)
[[60, 222], [240, 222]].forEach(([x, y]) => { const [cx, cy] = iso(x, y); s += `<rect x="${cx - 12}" y="${cy}" width="24" height="10" fill="${C.woodD}" stroke="${C.ink}" stroke-width="1.5"/>`; });
// load arrows on cover
const [lx, ly] = iso(220, 40);
s += load(lx, ly - 150, ly - 6) + load(lx + 40, ly - 140, ly + 8) + T(lx + 54, ly - 120, 'LOAD', { fill: C.orange, fs: 18 });
// leaders for tags
const [mx, my] = iso(150, 80); s += leader(mx - 40, my - 6, 760, 150);
const [sx, sy] = iso(18, 192); s += leader(sx, sy, 700, 600);
s += T(1180, 690, 'Dashed outline = the hole under the cover', { fs: 16, fill: '#6E7C88', a: 'end' });

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Guardrail elevation and hole cover diagram"><title>Guardrail elevation and hole cover diagram</title><defs>${arrowDefs}</defs>${s}</svg>\n`;
fs.writeFileSync(require('path').resolve(__dirname, '..', '..', 'fall-protection-cp', 'assets', 'art', 'm4-guardrail-diagram.svg'), svg);
console.log('targets (approx px):', { top: [650, (SY + yIn(42)) / 2], mid: [60, (SY + yIn(21)) / 2], toe: [340, 640], load200: [250, 110], load150: [430, yIn(21) - 100], mark: [760, 150], cover2x: [lx + 60, ly - 160], secure: [700, 600] });
