/* ==========================================================================
   FP.diagram — programmatic SVG for interactions (builder B).
   clearance(setup)  side-section fall-clearance diagram with animated fall
   swing(opts)       swing-fall elevation with pendulum animation
   worker(opts)      worker figure (feet at 0,0; units = feet)
   timerRing(size)   circular soft timer
   All colors come from CSS classes (css/interactions.css) so both themes work.
   Does not touch FP.avatar / FP.icon (owned by js/art.js).
   ========================================================================== */
(function (root) {
  'use strict';
  var FP = root.FP;
  if (!FP) return;
  var NS = 'http://www.w3.org/2000/svg';

  function s(tag, attrs) {
    var el = document.createElementNS(NS, tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v === null || v === undefined || v === false) return;
      if (k === 'text') el.textContent = v; else el.setAttribute(k, v);
    });
    for (var i = 2; i < arguments.length; i++) {
      var c = arguments[i];
      if (c == null || c === false) continue;
      if (Array.isArray(c)) c.forEach(function (x) { if (x) el.appendChild(x); }); else el.appendChild(c);
    }
    return el;
  }
  function fmt(n) { n = Math.round(n * 10) / 10; return (n % 1 === 0 ? n.toFixed(0) : n.toFixed(1)); }
  var reduced = function () { try { return root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } };

  /* ---------- Worker figure, in feet, facing right; feet at (0,0), y up is negative ---------- */
  function worker(opts) {
    opts = opts || {};
    var H = opts.H == null ? 5 : opts.H;
    var nss = { 'vector-effect': 'non-scaling-stroke' };
    function a(o) { return Object.assign({}, nss, o); }
    var g = s('g', { class: 'dg-worker' + (opts.ghost ? ' is-ghost' : '') },
      s('rect', a({ class: 'dg-boot', x: -0.42, y: -0.22, width: 0.42, height: 0.22, rx: 0.05 })),
      s('rect', a({ class: 'dg-boot', x: 0.06, y: -0.22, width: 0.42, height: 0.22, rx: 0.05 })),
      s('rect', a({ class: 'dg-pants', x: -0.34, y: -2.95, width: 0.3, height: 2.76, rx: 0.06 })),
      s('rect', a({ class: 'dg-pants', x: 0.06, y: -2.95, width: 0.3, height: 2.76, rx: 0.06 })),
      s('rect', a({ class: 'dg-vest', x: -0.42, y: -5.05, width: 0.84, height: 2.25, rx: 0.16 })),
      s('path', a({ class: 'dg-strap', d: 'M-0.34 -4.95 L0.3 -3.05 M0.34 -4.95 L-0.3 -3.05 M-0.38 -3.1 L0.38 -3.1', fill: 'none' })),
      s('rect', a({ class: 'dg-arm', x: 0.18, y: -4.85, width: 0.26, height: 1.75, rx: 0.12, transform: 'rotate(-18 0.3 -4.8)' })),
      s('circle', a({ class: 'dg-skin', cx: 0.05, cy: -5.5, r: 0.36 })),
      s('path', a({ class: 'dg-hat', d: 'M-0.38 -5.58 Q0.04 -6.28 0.46 -5.58 Z' })),
      s('rect', a({ class: 'dg-hat', x: -0.42, y: -5.62, width: 0.98, height: 0.1, rx: 0.04 })),
      s('circle', a({ class: 'dg-dring', cx: -0.42, cy: -H, r: 0.13 }))
    );
    return g;
  }

  /* ---------- Clearance diagram ---------- */
  function clearance(setup, opts) {
    opts = opts || {};
    var r = FP.clearance(setup);
    var A = +setup.A || 0, H = setup.H == null ? 5 : +setup.H, avail = r.available;
    var srl = setup.connector === 'srl';
    var DD = setup.DD == null ? 3.5 : +setup.DD, HS = setup.HS == null ? 1 : +setup.HS, SM = setup.SM == null ? 2 : +setup.SM;
    var L = +setup.L || 0;
    var anchorH = srl ? Math.max(A, 7) : A;               // an SRL is drawn overhead
    var topFt = Math.max(anchorH + (anchorH >= 6 ? 1.6 : 0.6), H + 1.6) + 0.6;
    var botFt = Math.max(avail + 1.2, r.required + 0.8);
    var W = 640, HPX = 560, padT = 14, padB = 18;
    var sc = (HPX - padT - padB) / (topFt + botFt);
    function Y(ft) { return padT + (topFt + ft) * sc; } // ft below the walking surface (negative = above)
    var edgeX = 290, anchorX = edgeX - (anchorH >= 6 ? 1.4 : 2.4) * sc;
    var startX = edgeX - 0.9 * sc, endX = edgeX + 0.75 * sc;

    var svg = s('svg', { viewBox: '0 0 ' + W + ' ' + HPX, class: 'dg dg-clear', role: 'img',
      'aria-label': 'Fall clearance diagram: required ' + fmt(r.required) + ' ft, available ' + fmt(avail) + ' ft' });
    svg.appendChild(s('rect', { class: 'dg-sky', x: 0, y: 0, width: W, height: HPX }));
    // grid every 2 ft
    var grid = s('g', { class: 'dg-grid' });
    for (var f = -Math.floor(topFt); f <= botFt; f += 2) grid.appendChild(s('line', { x1: 0, x2: W, y1: Y(f), y2: Y(f) }));
    svg.appendChild(grid);

    // Lower slab
    var slabY = Y(avail);
    var dangerG = s('g', { class: 'dg-danger' + (r.hits ? ' is-on' : '') });
    if (r.required > avail) dangerG.appendChild(s('rect', { class: 'dg-overlap', x: edgeX - 10, y: slabY, width: 170, height: Math.max(2, Y(r.required) - slabY) }));
    svg.appendChild(dangerG);
    svg.appendChild(s('rect', { class: 'dg-slab', x: 0, y: slabY, width: W, height: 0.75 * sc }));
    svg.appendChild(s('text', { class: 'dg-label', x: 12, y: slabY + 0.75 * sc + 15, text: 'Slab below · ' + fmt(avail) + ' ft down' }));
    // Upper deck (walking surface)
    svg.appendChild(s('rect', { class: 'dg-deck', x: 0, y: Y(0), width: edgeX, height: 0.7 * sc }));
    svg.appendChild(s('rect', { class: 'dg-deck-edge', x: edgeX - 3, y: Y(0), width: 3, height: 0.7 * sc }));
    svg.appendChild(s('text', { class: 'dg-label', x: 12, y: Y(0) + 0.7 * sc + 15, text: setup.surfaceLabel || 'Walking surface' }));

    // Anchor structure
    var ax = anchorX, ay = Y(-anchorH);
    if (anchorH >= 6) {
      var bt = Y(-anchorH - 1.3), bb = Y(-anchorH - 0.35);
      svg.appendChild(s('g', { class: 'dg-beam' },
        s('rect', { x: 0, y: bt, width: edgeX + 0.6 * sc, height: 0.16 * sc }),
        s('rect', { x: 0, y: bb - 0.16 * sc, width: edgeX + 0.6 * sc, height: 0.16 * sc }),
        s('rect', { x: 0, y: bt, width: edgeX + 0.6 * sc, height: bb - bt, class: 'dg-beam-web' })));
      svg.appendChild(s('path', { class: 'dg-clamp', d: 'M' + (ax - 8) + ' ' + bb + ' L' + ax + ' ' + (ay - 4) + ' L' + (ax + 8) + ' ' + bb }));
    } else if (anchorH > 1) {
      svg.appendChild(s('rect', { class: 'dg-column', x: ax - 0.55 * sc, y: Y(-Math.max(anchorH + 2, H + 1.4)), width: 0.45 * sc, height: Y(0) - Y(-Math.max(anchorH + 2, H + 1.4)) }));
    } else {
      svg.appendChild(s('path', { class: 'dg-clamp', d: 'M' + (ax - 9) + ' ' + Y(0) + ' L' + ax + ' ' + (ay - 6) + ' L' + (ax + 9) + ' ' + Y(0) }));
    }
    if (srl) svg.appendChild(s('rect', { class: 'dg-srl', x: ax - 11, y: ay - 2, width: 22, height: 26, rx: 7 }));
    svg.appendChild(s('circle', { class: 'dg-anchor', cx: ax, cy: ay, r: 6 }));
    svg.appendChild(s('text', { class: 'dg-label dg-label-strong', x: ax + 12, y: ay - 8, text: (srl ? 'SRL · ' : 'Anchor · ') + (anchorH === 0 ? 'foot level' : fmt(anchorH) + ' ft up') }));

    // Required clearance line
    var reqY = Y(r.required);
    svg.appendChild(s('line', { class: 'dg-req', x1: edgeX - 20, x2: W - 8, y1: reqY, y2: reqY }));
    svg.appendChild(s('text', { class: 'dg-label dg-req-label', x: edgeX + 4, y: reqY + (r.required > avail ? 16 : -6), text: 'Needed ' + fmt(r.required) + ' ft' }));

    // Dimension stack (starts at the D-ring's starting height)
    var stackX = 486, segs = [
      { k: 'FF', v: r.freeFall, c: 'ff', t: 'Free fall' + (r.freeFallOk ? '' : ' ✕') },
      { k: 'DD', v: DD, c: 'dd', t: 'Decel' },
      { k: 'HS', v: HS, c: 'hs', t: 'Stretch' },
      { k: 'H', v: H, c: 'h', t: 'D-ring to feet' },
      { k: 'SM', v: SM, c: 'sm', t: 'Margin' }
    ];
    var stack = s('g', { class: 'dg-stack' });
    var yy = -H;
    segs.forEach(function (sg) {
      var y1 = Y(yy), y2 = Y(yy + sg.v);
      if (sg.v > 0) {
        stack.appendChild(s('rect', { class: 'dg-seg dg-seg-' + sg.c, x: stackX, y: y1, width: 16, height: Math.max(1, y2 - y1) }));
        stack.appendChild(s('text', { class: 'dg-seg-label', x: stackX + 24, y: (y1 + y2) / 2 + 4, text: sg.k + ' ' + fmt(sg.v) + ' · ' + sg.t }));
      }
      yy += sg.v;
    });
    stack.appendChild(s('line', { class: 'dg-tick', x1: stackX - 6, x2: stackX + 22, y1: Y(-H), y2: Y(-H) }));
    svg.appendChild(stack);

    // Lanyard / line + worker
    var line = s('path', { class: 'dg-line' + (srl ? ' is-srl' : ''), d: '' });
    svg.appendChild(line);
    var ghost = worker({ H: H, ghost: true });
    ghost.setAttribute('transform', 'translate(' + startX + ' ' + Y(0) + ') scale(' + sc + ')');
    if (opts.ghost !== false) svg.appendChild(ghost);
    var man = worker({ H: H });
    svg.appendChild(man);
    var flash = s('circle', { class: 'dg-impact', cx: endX, cy: slabY, r: 0 });
    svg.appendChild(flash);

    var finalFeet = Math.min(r.feet, avail);
    function place(x, feetFt) {
      man.setAttribute('transform', 'translate(' + x + ' ' + Y(feetFt) + ') scale(' + sc + ')');
      var dx = x - 0.42 * sc, dy = Y(feetFt - H);
      var d;
      if (dy > Y(0) && ax < edgeX && x > edgeX - 2) d = 'M' + ax + ' ' + ay + ' L' + (edgeX - 1) + ' ' + Y(0) + ' L' + dx + ' ' + dy;
      else if (feetFt <= 0.01 && !srl && anchorH < H) {
        // standing: slack lanyard hanging between anchor and D-ring
        var mx = (ax + dx) / 2, my = Math.max(ay, dy) + 0.9 * sc;
        d = 'M' + ax + ' ' + ay + ' Q' + mx + ' ' + my + ' ' + dx + ' ' + dy;
      } else d = 'M' + ax + ' ' + ay + ' L' + dx + ' ' + dy;
      line.setAttribute('d', d);
    }
    function reset() { place(startX, 0); flash.setAttribute('r', 0); svg.classList.remove('is-hit', 'is-clear', 'is-margin'); }
    function finish() {
      place(endX, finalFeet);
      svg.classList.add(r.contact ? 'is-hit' : (r.hits ? 'is-margin' : 'is-clear'));
      if (r.contact) flash.setAttribute('r', 22);
    }
    function play(done) {
      if (reduced()) { finish(); if (done) done(r); return; }
      var t0 = null, dur = 1500, ff = Math.min(r.freeFall, finalFeet), pFF = finalFeet > 0 ? Math.max(0.35, Math.min(0.7, ff / finalFeet)) : 0.5;
      function frame(ts) {
        if (t0 == null) t0 = ts;
        var t = Math.min(1, (ts - t0) / dur);
        var x = t < 0.18 ? startX + (endX - startX) * (t / 0.18) : endX;
        var drop = 0;
        if (t >= 0.18) {
          var u = (t - 0.18) / 0.82;
          if (u < pFF) drop = ff * Math.pow(u / pFF, 2);
          else { var v = (u - pFF) / (1 - pFF); drop = ff + (finalFeet - ff) * (1 - Math.pow(1 - v, 2.2)); }
        }
        place(x, drop);
        if (t < 1) root.requestAnimationFrame(frame); else { finish(); if (done) done(r); }
      }
      reset();
      root.requestAnimationFrame(frame);
    }
    reset();
    if (opts.final) finish();
    return { svg: svg, play: play, reset: reset, finish: finish, result: r };
  }

  /* ---------- Swing fall (elevation along the building face) ---------- */
  function swing(opts) {
    opts = opts || {};
    var v = opts.v == null ? 4 : +opts.v;      // anchor height above the D-ring (ft)
    var H = 5, maxD = opts.max == null ? 12 : +opts.max;
    var W = 640, HPX = 460, padL = 60;
    var R0 = Math.sqrt(maxD * maxD + v * v);
    var sc = Math.min((W - padL - 70) / (maxD + 2), (HPX - 40) / (R0 + H + 1.5));
    var px = padL + 1 * sc, py = 30;                  // anchor pixel position (ft origin)
    function X(ft) { return px + ft * sc; }
    function Yf(ft) { return py + ft * sc; }
    var deckY = v + H;                                 // feet level (ft below anchor)
    var svg = s('svg', { viewBox: '0 0 ' + W + ' ' + HPX, class: 'dg dg-swing', role: 'img', 'aria-label': 'Swing fall diagram' });
    svg.appendChild(s('rect', { class: 'dg-sky', x: 0, y: 0, width: W, height: HPX }));
    // building face: floor edge band + columns
    svg.appendChild(s('rect', { class: 'dg-face', x: 0, y: Yf(deckY), width: W, height: HPX - Yf(deckY) }));
    svg.appendChild(s('rect', { class: 'dg-deck', x: 0, y: Yf(deckY), width: W, height: 0.8 * sc }));
    var col = s('rect', { class: 'dg-column', x: 0, y: Yf(deckY) + 0.8 * sc, width: 0.9 * sc, height: HPX });
    svg.appendChild(col);
    svg.appendChild(s('text', { class: 'dg-label', x: 10, y: Yf(deckY) - 8, text: 'Roof / deck edge' }));
    // anchor post
    svg.appendChild(s('rect', { class: 'dg-column', x: X(-0.25), y: Yf(-0.6), width: 0.5 * sc, height: Yf(deckY) - Yf(-0.6) }));
    svg.appendChild(s('rect', { class: 'dg-srl', x: X(0) - 11, y: Yf(0) - 4, width: 22, height: 24, rx: 7 }));
    svg.appendChild(s('circle', { class: 'dg-anchor', cx: X(0), cy: Yf(0), r: 6 }));
    svg.appendChild(s('text', { class: 'dg-label dg-label-strong', x: X(0) + 14, y: Yf(0) - 8, text: 'Anchor + SRL' }));
    var arc = s('path', { class: 'dg-arc' });
    var line = s('line', { class: 'dg-line is-srl' });
    var straight = s('line', { class: 'dg-req' });
    var dropLabel = s('text', { class: 'dg-label dg-label-strong', x: 0, y: 0 });
    var impact = s('circle', { class: 'dg-impact', r: 0 });
    var ghost = worker({ H: H, ghost: true });
    var man = worker({ H: H });
    svg.appendChild(arc); svg.appendChild(straight); svg.appendChild(line); svg.appendChild(ghost); svg.appendChild(man); svg.appendChild(impact); svg.appendChild(dropLabel);

    var d = opts.d == null ? 6 : +opts.d, colFt = 0;
    function geom() {
      var R = Math.sqrt(d * d + v * v);
      var drop = FP.swingDrop(R, d);
      colFt = d * 0.45; // a column between the worker and the line below the anchor
      return { R: R, drop: drop, theta: Math.atan2(d, v) };
    }
    function posAt(theta, R) { return { x: Math.sin(theta) * R, y: Math.cos(theta) * R }; }
    function drawMan(theta, R) {
      var p = posAt(theta, R);
      man.setAttribute('transform', 'translate(' + (X(p.x) + 0.42 * sc) + ' ' + Yf(p.y + H) + ') scale(' + sc + ') rotate(' + (-theta * 57.3 * 0.5) + ' 0 -5)');
      line.setAttribute('x1', X(0)); line.setAttribute('y1', Yf(0)); line.setAttribute('x2', X(p.x)); line.setAttribute('y2', Yf(p.y));
    }
    function draw() {
      var g = geom();
      col.setAttribute('x', X(colFt) - 0.45 * sc);
      col.setAttribute('class', 'dg-column' + (d > 1.5 ? ' is-struck' : ''));
      var a0 = g.theta, p0 = posAt(a0, g.R), p1 = posAt(0, g.R);
      arc.setAttribute('d', 'M' + X(p0.x) + ' ' + Yf(p0.y) + ' A' + (g.R * sc) + ' ' + (g.R * sc) + ' 0 0 1 ' + X(p1.x) + ' ' + Yf(p1.y));
      straight.setAttribute('x1', X(p1.x) - 30); straight.setAttribute('x2', X(p1.x) + 30);
      straight.setAttribute('y1', Yf(v)); straight.setAttribute('y2', Yf(v));
      ghost.setAttribute('transform', 'translate(' + (X(d) + 0.42 * sc) + ' ' + Yf(deckY) + ') scale(' + sc + ')');
      dropLabel.setAttribute('x', X(p1.x) + 36); dropLabel.setAttribute('y', Yf((v + g.R) / 2) + 4);
      dropLabel.textContent = '+' + fmt(g.drop) + ' ft swing drop';
      drawMan(a0, g.R);
      impact.setAttribute('r', 0);
      return g;
    }
    function play(done) {
      var g = draw();
      var hitTheta = Math.asin(Math.min(1, colFt / g.R));   // angle where the arc meets the column
      var strikes = d > 1.5;
      if (reduced()) { drawMan(strikes ? hitTheta : 0, g.R); if (strikes) { var pp = posAt(hitTheta, g.R); impact.setAttribute('cx', X(pp.x)); impact.setAttribute('cy', Yf(pp.y + 2.5)); impact.setAttribute('r', 18); } if (done) done(g); return; }
      var t0 = null, dur = 1100;
      function frame(ts) {
        if (t0 == null) t0 = ts;
        var t = Math.min(1, (ts - t0) / dur);
        var th = g.theta * Math.cos(t * Math.PI / 2);       // swing toward vertical
        if (strikes && th <= hitTheta) { th = hitTheta; t = 1; }
        drawMan(th, g.R);
        if (t < 1) root.requestAnimationFrame(frame);
        else {
          if (strikes) { var p = posAt(hitTheta, g.R); impact.setAttribute('cx', X(p.x)); impact.setAttribute('cy', Yf(p.y + 2.5)); impact.setAttribute('r', 18); }
          if (done) done(g);
        }
      }
      root.requestAnimationFrame(frame);
    }
    function set(nd) { d = Math.max(0, Math.min(maxD, +nd)); return draw(); }
    draw();
    return { svg: svg, set: set, play: play, geom: geom };
  }

  /* ---------- Timer ring ---------- */
  function timerRing(size) {
    size = size || 44;
    var r = 18, c = 2 * Math.PI * r;
    var fg = s('circle', { class: 'dg-ring-fg', cx: 22, cy: 22, r: r, 'stroke-dasharray': c, 'stroke-dashoffset': 0, transform: 'rotate(-90 22 22)' });
    var svg = s('svg', { viewBox: '0 0 44 44', width: size, height: size, class: 'dg-ring', 'aria-hidden': 'true' },
      s('circle', { class: 'dg-ring-bg', cx: 22, cy: 22, r: r }), fg);
    return {
      el: svg,
      set: function (fraction, state) {
        fg.setAttribute('stroke-dashoffset', c * Math.max(0, Math.min(1, fraction)));
        svg.setAttribute('class', 'dg-ring' + (state ? ' is-' + state : ''));
      }
    };
  }

  FP.diagram = Object.assign(FP.diagram || {}, { svg: s, fmt: fmt, worker: worker, clearance: clearance, swing: swing, timerRing: timerRing });
})(typeof window !== 'undefined' ? window : globalThis);
