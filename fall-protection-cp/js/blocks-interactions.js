/* ==========================================================================
   Interaction blocks (builder B) — Storyline-style activities.
   scenario · hotspot · sort / anchorjudge · sequence · match · clearance ·
   swing · checkreview · toolbox · commitment
   Renderer signature: FP.register(type, function (block, ctx) → HTMLElement)
   ctx = { module, lesson, block, complete(result), isComplete(), save(o), load() }
   ========================================================================== */
(function (root) {
  'use strict';
  var FP = root.FP;
  if (!FP) return;
  var h = FP.h;

  /* ------------------------------------------------------------------ helpers */
  var KICKERS = {
    scenario: 'Decide', hotspot: 'Spot the hazard', sort: 'Sort it', anchorjudge: 'Anchor or not',
    sequence: 'Put it in order', match: 'Tag the diagram', clearance: 'Clearance math', swing: 'Swing fall',
    checkreview: 'Find what they missed', toolbox: 'Toolbox talk builder', commitment: 'Commitment card'
  };
  var TONE = { good: 'Strong call', ok: 'Partly right', bad: 'Risky call' };
  var OUTCOME = { good: 'Good outcome', ok: 'Mixed outcome', bad: 'Bad outcome' };
  var SEV = { 3: 'Could kill', 2: 'Serious injury', 1: 'Lower risk' };

  function safeCtx(ctx) {
    ctx = ctx || {};
    return {
      complete: function (r) { try { if (ctx.complete) ctx.complete(r); } catch (e) { if (root.console) console.error(e); } },
      isComplete: function () { try { return ctx.isComplete ? !!ctx.isComplete() : false; } catch (e) { return false; } }
    };
  }
  function cite(c) {
    if (!c) return null;
    var list = Array.isArray(c) ? c : [c];
    return h('span', { class: 'ix-cites' }, list.map(function (x) { return h('cite', { html: x }); }));
  }
  function btn(label, cls, onClick, attrs) {
    return h('button', Object.assign({ type: 'button', class: 'ix-btn ' + (cls || ''), html: label, on: onClick ? { click: onClick } : null }, attrs || {}));
  }
  function mediaImg(id, cls) {
    var m = FP.media(id);
    if (!m || !m.src) return null;
    return h('figure', { class: cls || 'ix-media' }, h('img', { src: m.src, alt: m.alt || '', loading: 'lazy' }),
      m.credit ? h('figcaption', { class: 'ix-credit', html: m.credit }) : null);
  }
  function artImg(src, alt, cls) { return src ? h('figure', { class: cls || 'ix-media' }, h('img', { src: src, alt: alt || '', loading: 'lazy' })) : null; }
  function speaker(id, size) {
    if (!id) return null;
    var c = FP.char(id), av;
    try { av = FP.avatar(id, size || 52); } catch (e) { av = null; }
    return h('div', { class: 'ix-speaker' }, h('span', { class: 'ix-speaker-av' }, av),
      h('span', { class: 'ix-speaker-id' }, h('b', { text: c.name }), c.role ? h('span', { text: c.role }) : null));
  }
  function announce(S, msg) { S.live.textContent = ''; setTimeout(function () { S.live.textContent = FP.strip(msg); }, 30); }
  function feedback(tone, label, body, citeVal) {
    return h('div', { class: 'ix-fb is-' + (tone || 'note'), role: 'status' },
      label ? h('p', { class: 'ix-fb-label', text: label }) : null,
      body ? h('div', { class: 'ix-fb-body', html: FP.paras(body) }) : null,
      cite(citeVal));
  }
  function focusEl(el) { if (!el) return; if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1'); try { el.focus({ preventScroll: false }); } catch (e) { el.focus(); } }
  function fmt(n) { return FP.diagram ? FP.diagram.fmt(n) : String(Math.round(n * 10) / 10); }
  function mmss(sec) { sec = Math.max(0, Math.round(sec)); return Math.floor(sec / 60) + ':' + ('0' + (sec % 60)).slice(-2); }

  /** Common chrome for every interaction. */
  function shell(b, ctx, type) {
    var C = safeCtx(ctx);
    var titleId = FP.uid('ix-t');
    var doneChip = h('span', { class: 'ix-done-chip', hidden: !C.isComplete() }, 'Completed');
    var body = h('div', { class: 'ix-body' });
    var live = h('div', { class: 'ix-sr', 'aria-live': 'polite' });
    var root = h('section', { class: 'ix ix--' + type, 'aria-labelledby': titleId, 'data-block': b.id || '' },
      h('header', { class: 'ix-head' },
        h('div', { class: 'ix-head-row' }, h('p', { class: 'ix-kicker' }, h('span', { class: 'ix-kicker-mark', 'aria-hidden': 'true' }), b.kicker || KICKERS[type] || 'Activity'), doneChip),
        b.title ? h('h3', { class: 'ix-title', id: titleId, html: b.title }) : h('span', { id: titleId, class: 'ix-sr', text: KICKERS[type] || 'Activity' }),
        (b.intro || b.prompt) ? h('div', { class: 'ix-intro', html: FP.paras(b.intro || b.prompt) }) : null),
      body, live);
    return {
      root: root, body: body, live: live, C: C,
      done: function (result) { doneChip.hidden = false; C.complete(result || {}); }
    };
  }

  /* ================================================================ SCENARIO */
  FP.register('scenario', function (b, ctx) {
    var S = shell(b, ctx, 'scenario');
    if (b.clock) S.root.classList.add('has-clock');
    if (b.scored) S.root.classList.add('is-scored');
    if (!b.kicker && b.clock) S.root.querySelector('.ix-kicker').lastChild.textContent = 'The clock is running';
    if (!b.kicker && b.scored) S.root.querySelector('.ix-kicker').lastChild.textContent = 'Capstone shift';
    var nodes = b.nodes || {};
    var st;
    var clock = null;
    if (b.clock) {
      var fill = h('span', { class: 'ix-clock-fill' });
      var val = h('b', { class: 'ix-clock-val' });
      clock = { wrap: h('div', { class: 'ix-clock', role: 'timer', 'aria-live': 'off' },
        h('span', { class: 'ix-clock-label', text: b.clock.label || 'Time' }), h('span', { class: 'ix-clock-bar' }, fill), val), fill: fill, val: val };
      S.body.appendChild(clock.wrap);
    }
    var trail = h('ol', { class: 'ix-trail', 'aria-label': 'Your decisions so far' });
    var stage = h('div', { class: 'ix-scn-stage' });
    S.body.appendChild(trail); S.body.appendChild(stage);

    function renderClock() {
      if (!clock) return;
      var c = b.clock, lim = c.limit || 15, t = st.time;
      clock.fill.style.width = Math.min(100, t / lim * 100) + '%';
      clock.val.textContent = fmt(t) + ' ' + (c.unit || 'min') + (t >= lim ? ' · past the limit' : '');
      clock.wrap.classList.toggle('is-warn', t >= (c.warnAt || lim * 0.5) && t < lim);
      clock.wrap.classList.toggle('is-over', t >= lim);
    }
    function renderTrail() {
      trail.innerHTML = '';
      st.path.forEach(function (p, i) { trail.appendChild(h('li', { class: 'ix-trail-dot is-' + (p.tone || 'ok'), title: FP.strip(p.text) }, String(i + 1))); });
    }
    function start() {
      st = { path: [], time: (b.clock && b.clock.start) || 0 };
      renderClock(); renderTrail(); go(b.start, true);
    }
    function go(key, first) {
      var n = nodes[key];
      stage.innerHTML = '';
      if (!n) { stage.appendChild(feedback('bad', 'Missing step', 'This branch is not built yet: ' + key)); return; }
      if (n.end) return renderEnd(n);
      var choicesWrap = h('div', { class: 'ix-choices', role: 'group', 'aria-label': 'Your options' });
      var fbWrap = h('div', { class: 'ix-scn-fb' });
      var heading = h('div', { class: 'ix-scn-text', html: FP.paras(n.text) });
      var card = h('div', { class: 'ix-scn-node' + (n.media || n.art ? ' has-media' : '') },
        n.media ? mediaImg(n.media, 'ix-scn-media') : (n.art ? artImg(n.art, n.alt, 'ix-scn-media') : null),
        h('div', { class: 'ix-scn-main' }, speaker(n.speaker), heading, choicesWrap, fbWrap));
      (n.choices || []).forEach(function (c, i) {
        var bt = h('button', { type: 'button', class: 'ix-choice', on: { click: function () { choose(n, key, c, bt, choicesWrap, fbWrap); } } },
          h('span', { class: 'ix-choice-key', 'aria-hidden': 'true', text: String.fromCharCode(65 + i) }), h('span', { class: 'ix-choice-text', html: c.text }));
        choicesWrap.appendChild(bt);
      });
      stage.appendChild(card);
      if (!first) focusEl(heading);
      announce(S, (n.speaker ? FP.char(n.speaker).name + ': ' : '') + n.text);
    }
    function choose(n, key, c, bt, wrap, fbWrap) {
      Array.prototype.forEach.call(wrap.children, function (x) { x.disabled = true; });
      bt.classList.add('is-picked', 'is-' + (c.tone || 'ok'));
      var best = Math.max.apply(null, (n.choices || []).map(function (x) { return +x.score || 0; }));
      st.path.push({ node: key, text: c.text, tone: c.tone || 'ok', score: +c.score || 0, best: best, area: c.area || '', cite: c.cite || '', fb: c.fb || '', time: +c.time || 0 });
      st.time += +c.time || 0;
      renderClock(); renderTrail();
      if (c.fb) {
        var label = TONE[c.tone] || 'Result';
        if (b.clock && c.time) label += ' · +' + fmt(c.time) + ' ' + (b.clock.unit || 'min');
        var next = btn('Continue', 'is-primary', function () { go(c.next); });
        var fbEl = feedback(c.tone || 'ok', label, c.fb, c.cite);
        fbEl.appendChild(h('div', { class: 'ix-actions' }, next));
        fbWrap.appendChild(fbEl);
        announce(S, label + '. ' + c.fb);
        focusEl(next);
      } else go(c.next);
    }
    function renderEnd(n) {
      var total = st.path.reduce(function (s, p) { return s + p.score; }, 0);
      var bestTotal = st.path.reduce(function (s, p) { return s + p.best; }, 0);
      var head = h('div', { class: 'ix-outcome is-' + n.outcome },
        h('p', { class: 'ix-outcome-label', text: OUTCOME[n.outcome] || 'Outcome' }),
        h('h4', { class: 'ix-outcome-title', html: n.title || '' }));
      var box = h('div', { class: 'ix-scn-end' }, head,
        n.speaker ? speaker(n.speaker) : null,
        h('div', { class: 'ix-scn-text', html: FP.paras(n.text) }), cite(n.cite));
      if (b.clock) box.appendChild(h('p', { class: 'ix-clock-summary' }, (b.clock.label || 'Time') + ': ', h('b', { text: fmt(st.time) + ' ' + (b.clock.unit || 'min') }),
        st.time > (b.clock.limit || 15) ? ' — past the ' + b.clock.limit + ' ' + (b.clock.unit || 'min') + ' limit.' : ' — inside the ' + (b.clock.limit || 15) + ' ' + (b.clock.unit || 'min') + ' limit.'));
      if (b.scored || st.path.some(function (p) { return p.cite || p.area; })) {
        var rows = st.path.map(function (p, i) {
          return h('tr', { class: 'is-' + p.tone }, h('td', { class: 'ix-num', text: String(i + 1) }), h('td', { html: p.text }),
            h('td', null, h('span', { class: 'ix-pill is-' + p.tone, text: TONE[p.tone] || p.tone })),
            b.scored ? h('td', { class: 'ix-num', text: p.score + '/' + p.best }) : null,
            h('td', null, p.area ? h('span', { class: 'ix-area', text: p.area }) : null, cite(p.cite)));
        });
        box.appendChild(h('div', { class: 'ix-debrief' },
          h('h5', { text: b.scored ? 'Debrief scorecard' : 'Your decisions' }),
          b.scored ? h('p', { class: 'ix-score' }, h('b', { text: total + ' / ' + bestTotal }), ' points on the path you took · ', h('b', { text: String(st.path.filter(function (p) { return p.tone === 'good'; }).length) }), ' of ' + st.path.length + ' strong calls') : null,
          h('div', { class: 'ix-table-wrap' }, h('table', { class: 'ix-table' },
            h('thead', null, h('tr', null, h('th', { text: '#' }), h('th', { text: 'Your call' }), h('th', { text: 'Rating' }), b.scored ? h('th', { text: 'Pts' }) : null, h('th', { text: 'Area · receipt' }))),
            h('tbody', null, rows)))));
      }
      box.appendChild(h('div', { class: 'ix-actions' }, btn('Replay this scenario', 'is-ghost', start)));
      stage.appendChild(box);
      focusEl(head);
      announce(S, (OUTCOME[n.outcome] || '') + '. ' + (n.title || ''));
      S.done({ outcome: n.outcome, score: total, best: bestTotal, time: st.time, path: st.path.map(function (p) { return p.node; }) });
    }
    start();
    return S.root;
  });

  /* ================================================================= HOTSPOT */
  FP.register('hotspot', function (b, ctx) {
    var S = shell(b, ctx, 'hotspot');
    var sc = b.scene ? FP.scene(b.scene) : null;
    var src = (sc && sc.src) || b.src;
    var w = (sc && sc.w) || b.w || 1600, hh = (sc && sc.h) || b.h || 900;
    var pool = (sc && sc.hazards) || [];
    var hazards;
    if (Array.isArray(b.hazards) && b.hazards.length && typeof b.hazards[0] === 'object') hazards = b.hazards;
    else if (Array.isArray(b.hazards) && b.hazards.length) hazards = b.hazards.map(function (id) { return pool.find(function (x) { return x.id === id; }); }).filter(Boolean);
    else hazards = pool.slice();
    hazards = hazards.map(function (z) {
      var o = Object.assign({}, z, (b.overrides && b.overrides[z.id]) || {});
      if (b.fb && b.fb[z.id]) o.why = b.fb[z.id];
      return o;
    });
    var decoys = (b.decoys && typeof b.decoys[0] === 'object') ? b.decoys : ((sc && sc.decoys) || []);
    if (!src || !hazards.length) { S.body.appendChild(feedback('note', 'Scene not available', 'This scene has not been built yet.')); return S.root; }

    var st;
    var found = h('b', { text: '0' });
    var counter = h('p', { class: 'ix-hs-count' }, 'Found ', found, ' of ' + hazards.length);
    var ring = (b.timeLimit && FP.diagram) ? FP.diagram.timerRing(40) : null;
    var timeTxt = h('span', { class: 'ix-hs-time' });
    var revealBtn = btn('Show me what I missed', 'is-ghost', reveal, { disabled: true });
    var listBtn = btn('List mode', 'is-ghost', toggleList, { 'aria-pressed': 'false', title: 'Answer from a list instead of clicking the picture' });
    var bar = h('div', { class: 'ix-hs-bar' }, counter, b.timeLimit ? h('div', { class: 'ix-hs-timer' }, ring && ring.el, timeTxt) : null, h('div', { class: 'ix-hs-tools' }, listBtn, revealBtn));
    var overlay = h('div', { class: 'ix-hs-overlay' });
    var img = h('img', { src: src, alt: (sc && sc.title) || b.title || 'Jobsite scene', draggable: 'false' });
    var stage = h('div', { class: 'ix-hs-stage', style: { aspectRatio: w + ' / ' + hh } }, img, overlay);
    var startCover = null;
    var card = h('div', { class: 'ix-hs-card', 'aria-live': 'polite' });
    var list = h('ol', { class: 'ix-hs-found' });
    var listPanel = h('div', { class: 'ix-hs-listmode', hidden: true });
    var after = h('div', { class: 'ix-hs-after' });
    S.body.appendChild(bar);
    S.body.appendChild(h('div', { class: 'ix-hs-frame' }, stage));
    S.body.appendChild(listPanel);
    S.body.appendChild(card);
    S.body.appendChild(list);
    S.body.appendChild(after);

    function hit(px, py, z, tol) {
      // minimum touch target ≈ 3.5% of the scene width, expressed in both axes
      var ww = Math.max(z.w, 3.5), hgt = Math.max(z.h, 3.5 * w / hh);
      var cx = z.x + z.w / 2, cy = z.y + z.h / 2;
      return Math.abs(px - cx) <= ww / 2 + tol && Math.abs(py - cy) <= hgt / 2 + tol;
    }
    function tick() {
      if (!st || st.finished) return;
      var el = (Date.now() - st.t0) / 1000;
      if (b.timeLimit) {
        var left = b.timeLimit - el;
        timeTxt.textContent = left > 0 ? mmss(left) + ' left' : 'Time · ' + mmss(el);
        if (ring) ring.set(Math.min(1, el / b.timeLimit), left <= 0 ? 'over' : (left < b.timeLimit * 0.25 ? 'warn' : ''));
        if (left <= 0 && !st.timeUp) { st.timeUp = true; revealBtn.disabled = false; announce(S, 'Time is up. Keep looking, or see what you missed.'); card.prepend(feedback('ok', 'Time\'s up', 'Real walks don\'t have a buzzer, so keep looking if you want. Or see what you missed.')); }
      } else if (el > 60) revealBtn.disabled = false;
      st.timer = root.setTimeout(tick, 500);
    }
    function start() {
      if (st && st.timer) root.clearTimeout(st.timer);
      st = { found: {}, order: [], misses: 0, t0: Date.now(), finished: false, revealed: false, timeUp: false };
      overlay.innerHTML = ''; card.innerHTML = ''; list.innerHTML = ''; after.innerHTML = ''; found.textContent = '0';
      revealBtn.disabled = true; stage.classList.remove('is-finished');
      if (b.timeLimit) {
        startCover = h('div', { class: 'ix-hs-start' }, h('p', { html: 'Walk this area like it\'s your first lap of the day. Target: <b>' + mmss(b.timeLimit) + '</b>.' }),
          btn('Start the walk', 'is-primary', function () { startCover.remove(); st.t0 = Date.now(); tick(); focusEl(stage); }));
        stage.appendChild(startCover);
      } else tick();
      renderListPanel();
    }
    function mark(z, missed) {
      var n = st.order.length;
      overlay.appendChild(h('span', { class: 'ix-hs-box' + (missed ? ' is-missed' : ''), style: { left: z.x + '%', top: z.y + '%', width: z.w + '%', height: z.h + '%' } }));
      var m = h('button', { type: 'button', class: 'ix-hs-mark' + (missed ? ' is-missed' : ''), style: { left: (z.x + z.w / 2) + '%', top: (z.y + z.h / 2) + '%' },
        'aria-label': (missed ? 'Missed: ' : 'Found: ') + z.label, on: { click: function (e) { e.stopPropagation(); showCard(z, missed); } } }, missed ? '!' : String(n));
      overlay.appendChild(m);
    }
    function showCard(z, missed) {
      card.innerHTML = '';
      card.appendChild(h('div', { class: 'ix-hs-detail' + (missed ? ' is-missed' : '') },
        h('div', { class: 'ix-hs-detail-head' }, h('span', { class: 'ix-sev ix-sev-' + (z.severity || 1), text: SEV[z.severity] || '' }),
          h('h4', { html: (missed ? 'Missed: ' : '') + z.label })),
        h('p', { html: '<b>Why it matters.</b> ' + (z.why || '') }),
        z.fix ? h('p', { html: '<b>Fix it.</b> ' + z.fix }) : null,
        cite(z.cite)));
    }
    function addFound(z, missed) {
      st.found[z.id] = missed ? 'missed' : 'found';
      st.order.push(z.id);
      mark(z, missed);
      if (!missed) {
        found.textContent = String(Object.keys(st.found).filter(function (k) { return st.found[k] === 'found'; }).length);
        list.appendChild(h('li', { class: 'ix-hs-li' }, h('b', { html: z.label }), ' ', cite(z.cite)));
        showCard(z, false);
        announce(S, 'Found: ' + z.label);
      }
      if (Object.keys(st.found).length === hazards.length) finishFind();
    }
    function onStageClick(e) {
      if (!st || st.finished || startCover && startCover.isConnected) return;
      var r = stage.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width * 100, py = (e.clientY - r.top) / r.height * 100;
      var z = hazards.find(function (x) { return !st.found[x.id] && hit(px, py, x, 0.6); }) || hazards.find(function (x) { return !st.found[x.id] && hit(px, py, x, 2); });
      if (z) return addFound(z, false);
      var already = hazards.find(function (x) { return st.found[x.id] && hit(px, py, x, 0.6); });
      if (already) return showCard(already, false);
      var dz = decoys.find(function (x) { return hit(px, py, x, 0.8); });
      if (dz) {
        card.innerHTML = '';
        card.appendChild(feedback('good', 'Not a hazard: ' + FP.strip(dz.label), dz.why));
        announce(S, 'Not a hazard. ' + dz.why);
        return;
      }
      st.misses += 1;
      var rp = h('span', { class: 'ix-hs-ripple', style: { left: px + '%', top: py + '%' } });
      overlay.appendChild(rp); root.setTimeout(function () { rp.remove(); }, 700);
      if (st.misses >= 3) revealBtn.disabled = false;
    }
    stage.addEventListener('click', onStageClick);
    function reveal() {
      if (st.finished) return;
      st.revealed = true;
      hazards.forEach(function (z) { if (!st.found[z.id]) addFound(z, true); });
      var missed = hazards.filter(function (z) { return st.found[z.id] === 'missed'; });
      if (missed.length) showCard(missed[0], true);
      if (!st.finished) finishFind();
    }
    function finishFind() {
      if (st.finished) return;
      st.finished = true; if (st.timer) root.clearTimeout(st.timer);
      stage.classList.add('is-finished'); revealBtn.disabled = true;
      var nFound = hazards.filter(function (z) { return st.found[z.id] === 'found'; }).length;
      var secs = Math.round((Date.now() - st.t0) / 1000);
      var summary = feedback(nFound === hazards.length ? 'good' : (nFound >= hazards.length * 0.6 ? 'ok' : 'bad'),
        nFound + ' of ' + hazards.length + ' found' + (b.timeLimit ? ' in ' + mmss(secs) : ''),
        nFound === hazards.length ? 'Clean walk. Tap any marker to review the receipts.' : 'Missed ones are marked <b>!</b> on the picture. Tap each one: the fix matters more than the find.');
      after.appendChild(summary);
      var result = { found: nFound, total: hazards.length, misses: st.misses, seconds: secs, revealed: st.revealed };
      if (b.rank && hazards.length >= 3) rankStep(result); else { after.appendChild(h('div', { class: 'ix-actions' }, btn('Walk it again', 'is-ghost', start))); S.done(result); }
    }
    function rankStep(result) {
      var slots = [null, null, null];
      var cands = FP.shuffle(hazards);
      var slotEls = h('ol', { class: 'ix-rank-slots' });
      var pool = h('div', { class: 'ix-rank-pool' });
      var checkBtn = btn('Check my ranking', 'is-primary', check, { disabled: true });
      var out = h('div');
      function draw() {
        slotEls.innerHTML = ''; pool.innerHTML = '';
        slots.forEach(function (z, i) {
          slotEls.appendChild(h('li', { class: 'ix-rank-slot' + (z ? ' is-filled' : '') },
            h('span', { class: 'ix-rank-n', text: String(i + 1) }),
            z ? h('button', { type: 'button', class: 'ix-chip is-placed', html: z.label + ' <span aria-hidden="true">×</span>', 'aria-label': 'Remove ' + FP.strip(z.label), on: { click: function () { slots[i] = null; draw(); } } }) : h('span', { class: 'ix-rank-empty', text: 'Tap a hazard below' })));
        });
        cands.forEach(function (z) {
          if (slots.indexOf(z) >= 0) return;
          pool.appendChild(h('button', { type: 'button', class: 'ix-chip', html: z.label, on: { click: function () { var i = slots.indexOf(null); if (i >= 0) { slots[i] = z; draw(); } } } }));
        });
        checkBtn.disabled = slots.indexOf(null) >= 0;
      }
      function check() {
        var top = hazards.map(function (z) { return z.severity || 1; }).sort(function (a, c) { return c - a; }).slice(0, 3);
        var picks = slots.map(function (z) { return z.severity || 1; });
        var ok = picks.slice().sort(function (a, c) { return c - a; }).join() === top.join();
        var ordered = picks[0] >= picks[1] && picks[1] >= picks[2];
        out.innerHTML = '';
        out.appendChild(feedback(ok && ordered ? 'good' : (ok ? 'ok' : 'bad'),
          ok && ordered ? 'That\'s how a competent person ranks it' : (ok ? 'Right three, order is off' : 'Fix the killers first'),
          '<ul class="ix-rank-review">' + slots.map(function (z, i) { return '<li><b>' + (i + 1) + '.</b> ' + z.label + ' — <span class="ix-sev ix-sev-' + (z.severity || 1) + '">' + (SEV[z.severity] || '') + '</span></li>'; }).join('') + '</ul>' +
          (ok ? '' : '<p>Rank by what can kill someone today: unprotected edges and open holes at height come before housekeeping.</p>')));
        out.appendChild(h('div', { class: 'ix-actions' }, btn('Walk it again', 'is-ghost', start)));
        checkBtn.disabled = true;
        result.rankCorrect = ok && ordered;
        S.done(result);
      }
      after.appendChild(h('div', { class: 'ix-rank' }, h('h4', { text: 'Now rank them: which three get fixed first?' }), slotEls, pool, h('div', { class: 'ix-actions' }, checkBtn), out));
      draw();
    }
    function renderListPanel() {
      listPanel.innerHTML = '';
      var items = FP.shuffle(hazards.map(function (z) { return { z: z, hz: true }; }).concat(decoys.map(function (z) { return { z: z, hz: false }; })));
      listPanel.appendChild(h('p', { class: 'ix-help', text: 'For each item in the scene, decide: hazard or acceptable?' }));
      items.forEach(function (it) {
        var res = h('span', { class: 'ix-lm-res' });
        var yes = btn('Hazard', 'is-small', function () { answer(true); }), no = btn('Acceptable', 'is-small', function () { answer(false); });
        function answer(said) {
          yes.disabled = no.disabled = true;
          var right = said === it.hz;
          res.className = 'ix-lm-res is-' + (right ? 'good' : 'bad');
          res.textContent = right ? 'Correct' : (it.hz ? 'It is a hazard' : 'This one is acceptable');
          if (it.hz && !st.found[it.z.id]) addFound(it.z, !right);
          else if (!it.hz) { card.innerHTML = ''; card.appendChild(feedback('good', 'Acceptable: ' + FP.strip(it.z.label), it.z.why)); }
        }
        listPanel.appendChild(h('div', { class: 'ix-lm-row' }, h('span', { class: 'ix-lm-label', html: it.z.label }), h('span', { class: 'ix-lm-btns' }, yes, no), res));
      });
    }
    function toggleList() {
      var on = listPanel.hidden;
      listPanel.hidden = !on; listBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
      if (on && startCover && startCover.isConnected) { startCover.remove(); st.t0 = Date.now(); tick(); }
    }
    start();
    return S.root;
  });

  /* ==================================================== SORT / ANCHORJUDGE */
  function renderSort(b, ctx, type) {
    var S = shell(b, ctx, type);
    var st;
    var tray = h('div', { class: 'ix-tray', role: 'list', 'aria-label': 'Items to sort' });
    var bucketsWrap = h('div', { class: 'ix-buckets', style: '--cols: ' + Math.min(b.buckets.length, 3) });
    var fbWrap = h('div', { class: 'ix-sort-fb', 'aria-live': 'polite' });
    var after = h('div');
    var help = h('p', { class: 'ix-help', text: 'Tap an item, then tap where it belongs. You can also drag.' });
    S.body.appendChild(help); S.body.appendChild(tray); S.body.appendChild(bucketsWrap); S.body.appendChild(fbWrap); S.body.appendChild(after);
    var bucketEls = {};
    b.buckets.forEach(function (bk) {
      var drop = h('div', { class: 'ix-bucket-items' });
      var el = h('button', { type: 'button', class: 'ix-bucket', 'data-id': bk.id, on: { click: function () { place(bk.id); } } },
        h('span', { class: 'ix-bucket-label', html: bk.label }), bk.hint ? h('span', { class: 'ix-bucket-hint', html: bk.hint }) : null);
      var wrap = h('div', { class: 'ix-bucket-wrap ix-bucket-' + bk.id }, el, drop);
      wrap.addEventListener('dragover', function (e) { e.preventDefault(); wrap.classList.add('is-over'); });
      wrap.addEventListener('dragleave', function () { wrap.classList.remove('is-over'); });
      wrap.addEventListener('drop', function (e) { e.preventDefault(); wrap.classList.remove('is-over'); var i = +e.dataTransfer.getData('text/plain'); if (!isNaN(i)) { select(i); place(bk.id); } });
      bucketEls[bk.id] = { wrap: wrap, drop: drop, btn: el };
      bucketsWrap.appendChild(wrap);
    });
    function start() {
      st = { sel: null, tries: {}, placed: {}, first: 0 };
      tray.innerHTML = ''; fbWrap.innerHTML = ''; after.innerHTML = '';
      Object.keys(bucketEls).forEach(function (k) { bucketEls[k].drop.innerHTML = ''; });
      st.items = FP.shuffle(b.items.map(function (it, i) { return Object.assign({ _i: i }, it); }));
      st.items.forEach(function (it) {
        var chip = h('button', { type: 'button', class: 'ix-chip ix-sort-item' + (it.art ? ' has-art' : ''), draggable: 'true', role: 'listitem', 'aria-pressed': 'false',
          on: { click: function () { select(it._i); }, dragstart: function (e) { e.dataTransfer.setData('text/plain', String(it._i)); chip.classList.add('is-drag'); }, dragend: function () { chip.classList.remove('is-drag'); } } },
          it.art ? h('img', { src: it.art, alt: '', class: 'ix-chip-art' }) : null, h('span', { html: it.text }));
        it.el = chip;
        tray.appendChild(chip);
      });
      armBuckets(false);
    }
    function armBuckets(on) { bucketsWrap.classList.toggle('is-armed', on); }
    function select(i) {
      st.items.forEach(function (it) { it.el.classList.toggle('is-selected', it._i === i); it.el.setAttribute('aria-pressed', it._i === i ? 'true' : 'false'); });
      st.sel = i; armBuckets(true);
    }
    function place(bucketId) {
      if (st.sel == null) { fbWrap.innerHTML = ''; fbWrap.appendChild(feedback('note', null, 'Pick an item first.')); return; }
      var it = st.items.find(function (x) { return x._i === st.sel; });
      if (!it || st.placed[it._i]) return;
      var right = it.bucket === bucketId;
      st.tries[it._i] = (st.tries[it._i] || 0) + 1;
      fbWrap.innerHTML = '';
      var bkLabel = FP.strip((b.buckets.find(function (x) { return x.id === it.bucket; }) || {}).label);
      if (right || st.tries[it._i] >= 2) {
        if (right && st.tries[it._i] === 1) st.first += 1;
        st.placed[it._i] = right ? 'good' : 'shown';
        it.el.remove();
        var placed = h('button', { type: 'button', class: 'ix-chip is-placed is-' + (right ? 'good' : 'shown'), html: (right ? '✓ ' : '↺ ') + it.text,
          on: { click: function () { fbWrap.innerHTML = ''; fbWrap.appendChild(feedback(right ? 'good' : 'ok', FP.strip(it.text), it.fb)); } } });
        bucketEls[it.bucket].drop.appendChild(placed);
        fbWrap.appendChild(feedback(right ? 'good' : 'ok', right ? 'Right: ' + bkLabel : 'It goes in: ' + bkLabel, it.fb));
        announce(S, (right ? 'Correct. ' : 'It goes in ' + bkLabel + '. ') + FP.strip(it.fb));
      } else {
        it.el.classList.remove('is-shake'); void it.el.offsetWidth; it.el.classList.add('is-shake');
        fbWrap.appendChild(feedback('bad', 'Not there', (it.hint || 'Look again. One more try.')));
        announce(S, 'Not there. One more try.');
      }
      st.sel = null; armBuckets(false);
      st.items.forEach(function (x) { x.el.classList.remove('is-selected'); });
      if (Object.keys(st.placed).length === b.items.length) {
        tray.appendChild(h('p', { class: 'ix-tray-empty', text: 'All sorted.' }));
        after.appendChild(feedback(st.first === b.items.length ? 'good' : 'ok', st.first + ' of ' + b.items.length + ' right on the first try',
          b.summary || 'Tap any sorted item to see its reason again.'));
        after.appendChild(h('div', { class: 'ix-actions' }, btn('Sort again', 'is-ghost', start)));
        S.done({ correct: st.first, total: b.items.length });
      }
    }
    start();
    return S.root;
  }
  FP.register('sort', function (b, ctx) { return renderSort(b, ctx, 'sort'); });
  FP.register('anchorjudge', function (b, ctx) { return renderSort(b, ctx, 'anchorjudge'); });

  /* ================================================================ SEQUENCE */
  FP.register('sequence', function (b, ctx) {
    var S = shell(b, ctx, 'sequence');
    var listEl = h('ol', { class: 'ix-seq' });
    var out = h('div', { 'aria-live': 'polite' });
    var checkBtn = btn('Check order', 'is-primary', check);
    var acts = h('div', { class: 'ix-actions' }, checkBtn);
    S.body.appendChild(h('p', { class: 'ix-help', text: 'Drag the steps, or use the arrows, then check.' }));
    S.body.appendChild(listEl); S.body.appendChild(acts); S.body.appendChild(out);
    var order, tries, dragging = null;
    function start() {
      tries = 0; out.innerHTML = '';
      var idx = b.items.map(function (_, i) { return i; });
      do { order = FP.shuffle(idx); } while (idx.length > 2 && order.join() === idx.join());
      checkBtn.disabled = false; acts.innerHTML = ''; acts.appendChild(checkBtn);
      draw();
    }
    function move(from, to) { if (to < 0 || to >= order.length) return; var x = order.splice(from, 1)[0]; order.splice(to, 0, x); draw(); clearMarks(); }
    function clearMarks() { Array.prototype.forEach.call(listEl.children, function (li) { li.classList.remove('is-good', 'is-bad'); }); }
    function draw(marks) {
      listEl.innerHTML = '';
      order.forEach(function (ix, pos) {
        var li = h('li', { class: 'ix-seq-row' + (marks ? (marks[pos] ? ' is-good' : ' is-bad') : ''), draggable: 'true', 'data-pos': pos },
          h('span', { class: 'ix-seq-grip', 'aria-hidden': 'true' }), h('span', { class: 'ix-seq-n', text: String(pos + 1) }),
          h('span', { class: 'ix-seq-text', html: b.items[ix] }),
          h('span', { class: 'ix-seq-btns' },
            h('button', { type: 'button', class: 'ix-icon-btn', 'aria-label': 'Move up', disabled: pos === 0, on: { click: function () { move(pos, pos - 1); focusRow(pos - 1, 0); } } }, '▲'),
            h('button', { type: 'button', class: 'ix-icon-btn', 'aria-label': 'Move down', disabled: pos === order.length - 1, on: { click: function () { move(pos, pos + 1); focusRow(pos + 1, 1); } } }, '▼')));
        li.addEventListener('dragstart', function (e) { dragging = pos; e.dataTransfer.setData('text/plain', String(pos)); li.classList.add('is-drag'); });
        li.addEventListener('dragend', function () { li.classList.remove('is-drag'); });
        li.addEventListener('dragover', function (e) { e.preventDefault(); });
        li.addEventListener('drop', function (e) { e.preventDefault(); if (dragging != null && dragging !== pos) move(dragging, pos); dragging = null; });
        listEl.appendChild(li);
      });
    }
    function focusRow(pos, which) { var li = listEl.children[pos]; if (li) { var bts = li.querySelectorAll('.ix-icon-btn'); var t = bts[which]; if (t && !t.disabled) t.focus(); else if (bts[1 - which]) bts[1 - which].focus(); } }
    function check() {
      tries += 1;
      var marks = order.map(function (ix, pos) { return ix === pos; });
      var n = marks.filter(Boolean).length;
      draw(marks);
      out.innerHTML = '';
      if (n === order.length) {
        out.appendChild(feedback('good', 'That\'s the order', b.fb));
        acts.innerHTML = ''; acts.appendChild(btn('Do it again', 'is-ghost', start));
        S.done({ correct: true, tries: tries });
      } else {
        out.appendChild(feedback('bad', n + ' of ' + order.length + ' in the right spot', 'Green rows are placed right. Move the red ones and check again, or see the right order.'));
        acts.innerHTML = '';
        acts.appendChild(checkBtn);
        acts.appendChild(btn('Show the right order', 'is-ghost', function () {
          order = b.items.map(function (_, i) { return i; }); draw(order.map(function () { return true; }));
          out.innerHTML = ''; out.appendChild(feedback('ok', 'Here\'s the right order', b.fb));
          acts.innerHTML = ''; acts.appendChild(btn('Try it again', 'is-ghost', start));
          S.done({ correct: false, tries: tries });
        }));
      }
    }
    start();
    return S.root;
  });

  /* =================================================================== MATCH */
  FP.register('match', function (b, ctx) {
    var S = shell(b, ctx, 'match');
    var stage = h('div', { class: 'ix-match-stage' }, h('img', { src: b.src, alt: b.alt || '', draggable: 'false' }));
    var tray = h('div', { class: 'ix-tray' });
    var fb = h('div', { 'aria-live': 'polite' });
    var after = h('div');
    S.body.appendChild(h('p', { class: 'ix-help', text: 'Tap a tag, then tap the spot it belongs on the diagram.' }));
    S.body.appendChild(h('div', { class: 'ix-match-frame' }, stage)); S.body.appendChild(tray); S.body.appendChild(fb); S.body.appendChild(after);
    var st, targetEls = {};
    b.targets.forEach(function (t, i) {
      var el = h('button', { type: 'button', class: 'ix-match-target', style: { left: t.x + '%', top: t.y + '%' }, 'aria-label': 'Spot ' + (i + 1) + (t.label ? ': ' + t.label : ''),
        on: { click: function () { drop(t.id); }, dragover: function (e) { e.preventDefault(); el.classList.add('is-over'); }, dragleave: function () { el.classList.remove('is-over'); },
          drop: function (e) { e.preventDefault(); el.classList.remove('is-over'); var i2 = +e.dataTransfer.getData('text/plain'); if (!isNaN(i2)) { st.sel = i2; drop(t.id); } } } },
        h('span', { class: 'ix-match-dot', text: String(i + 1) }), h('span', { class: 'ix-match-label' }));
      targetEls[t.id] = el; stage.appendChild(el);
    });
    function start() {
      st = { sel: null, tries: {}, done: 0, first: 0 };
      tray.innerHTML = ''; fb.innerHTML = ''; after.innerHTML = '';
      Object.keys(targetEls).forEach(function (k) { targetEls[k].classList.remove('is-filled', 'is-good', 'is-shown'); targetEls[k].querySelector('.ix-match-label').textContent = ''; });
      FP.shuffle(b.tags.map(function (t, i) { return { t: t, i: i }; })).forEach(function (o) {
        var chip = h('button', { type: 'button', class: 'ix-chip ix-tag', draggable: 'true', html: o.t.text, 'aria-pressed': 'false',
          on: { click: function () { st.sel = o.i; Array.prototype.forEach.call(tray.children, function (c) { c.classList.toggle('is-selected', c === chip); c.setAttribute('aria-pressed', c === chip); }); stage.classList.add('is-armed'); },
            dragstart: function (e) { e.dataTransfer.setData('text/plain', String(o.i)); } } });
        chip.dataset.i = o.i;
        tray.appendChild(chip);
      });
    }
    function drop(targetId) {
      if (st.sel == null) { fb.innerHTML = ''; fb.appendChild(feedback('note', null, 'Pick a tag first.')); return; }
      var tag = b.tags[st.sel], chip = tray.querySelector('[data-i="' + st.sel + '"]');
      if (!chip) return;
      st.tries[st.sel] = (st.tries[st.sel] || 0) + 1;
      var right = tag.target === targetId;
      fb.innerHTML = '';
      if (right || st.tries[st.sel] >= 2) {
        if (right && st.tries[st.sel] === 1) st.first += 1;
        var tEl = targetEls[tag.target];
        tEl.classList.add('is-filled', right ? 'is-good' : 'is-shown');
        var lab = tEl.querySelector('.ix-match-label');
        lab.innerHTML = (lab.innerHTML ? lab.innerHTML + '<br>' : '') + tag.text;
        chip.remove(); st.done += 1;
        fb.appendChild(feedback(right ? 'good' : 'ok', right ? 'Right spot' : 'It goes here (spot ' + (b.targets.findIndex(function (t) { return t.id === tag.target; }) + 1) + ')', tag.fb));
      } else {
        chip.classList.remove('is-shake'); void chip.offsetWidth; chip.classList.add('is-shake');
        fb.appendChild(feedback('bad', 'Not that spot', 'One more try.'));
      }
      announce(S, FP.strip(fb.textContent));
      st.sel = null; stage.classList.remove('is-armed');
      Array.prototype.forEach.call(tray.children, function (c) { c.classList.remove('is-selected'); });
      if (st.done === b.tags.length) {
        after.appendChild(feedback(st.first === b.tags.length ? 'good' : 'ok', st.first + ' of ' + b.tags.length + ' tagged right first try', b.fb || b.summary));
        after.appendChild(h('div', { class: 'ix-actions' }, btn('Tag it again', 'is-ghost', start)));
        S.done({ correct: st.first, total: b.tags.length });
      }
    }
    start();
    return S.root;
  });

  /* =============================================================== CLEARANCE */
  FP.register('clearance', function (b, ctx) {
    var S = shell(b, ctx, 'clearance');
    var base = Object.assign({ connector: 'lanyard', L: 6, DD: 3.5, HS: 1, H: 5, A: 0, SM: 2, available: 14 }, b.setup || {});
    var who = base.label || 'The worker';
    var explore = b.mode === 'explore';
    var figure = h('div', { class: 'ix-clear-fig' });
    var readout = h('div', { class: 'ix-clear-readout' });
    var chips = h('div', { class: 'ix-clear-chips' });
    var panel = h('div', { class: 'ix-clear-panel' });
    var out = h('div', { 'aria-live': 'polite' });
    S.body.appendChild(chips);
    S.body.appendChild(h('div', { class: 'ix-clear-grid' }, h('div', { class: 'ix-clear-figwrap' }, figure), h('div', { class: 'ix-clear-side' }, panel, readout)));
    S.body.appendChild(out);
    var cur, diag;

    function describe(s) {
      return [
        s.connector === 'srl' ? 'Overhead SRL' : fmt(s.L) + ' ft shock-absorbing lanyard',
        s.connector === 'srl' ? 'Anchor overhead' : (s.A === 0 ? 'Anchor at foot level' : 'Anchor ' + fmt(s.A) + ' ft above the surface'),
        fmt(s.available) + ' ft to the level below'
      ];
    }
    function drawChips(s) { chips.innerHTML = ''; describe(s).forEach(function (t) { chips.appendChild(h('span', { class: 'ix-pill', text: t })); }); }
    function drawDiagram(s, final) {
      figure.innerHTML = '';
      diag = FP.diagram.clearance(s, { final: final });
      figure.appendChild(diag.svg);
      return diag;
    }
    function drawReadout(r, s) {
      readout.innerHTML = '';
      var rows = [
        ['Free fall', fmt(r.freeFall) + ' ft', r.freeFallOk ? 'good' : 'bad', r.freeFallOk ? '≤ 6 ft' : 'over 6 ft'],
        ['Feet stop at', fmt(r.feet) + ' ft below', '', s.connector === 'srl' ? 'FF + DD + HS' : 'L + DD + HS + H − A'],
        ['Needed (with ' + fmt(s.SM == null ? 2 : s.SM) + ' ft margin)', fmt(r.required) + ' ft', r.hits ? 'bad' : 'good', ''],
        ['Available', fmt(r.available) + ' ft', '', '']
      ];
      readout.appendChild(h('table', { class: 'ix-readout' }, h('tbody', null, rows.map(function (x) {
        return h('tr', { class: x[2] ? 'is-' + x[2] : '' }, h('th', { scope: 'row', text: x[0] }), h('td', null, h('b', { text: x[1] }), x[3] ? h('span', { class: 'ix-readout-note', text: x[3] }) : null));
      }))));
      readout.appendChild(h('p', { class: 'ix-verdict is-' + (r.contact ? 'bad' : (r.hits ? 'ok' : 'good')), text: r.contact ? who + ' hits the level below.' : (r.hits ? 'No contact, but no margin left. Not acceptable.' : who + ' stops clear, with margin.') }));
    }

    function startPredict() {
      cur = Object.assign({}, base);
      drawChips(cur); drawDiagram(cur, false); readout.innerHTML = ''; out.innerHTML = '';
      figure.classList.add('is-predicting');   // decide first: hide the numbers until the fall runs
      var pick = null;
      var num = h('input', { type: 'number', inputmode: 'decimal', step: '0.5', min: '0', max: '60', id: FP.uid('ix-rc'), class: 'ix-input', placeholder: 'ft' });
      var runBtn = btn('Run the fall', 'is-primary', run, { disabled: true });
      var bHit = btn('Hits the level below', 'ix-predict', function () { choose('hits', bHit); }, { 'aria-pressed': 'false' });
      var bClr = btn('Stops clear', 'ix-predict', function () { choose('clears', bClr); }, { 'aria-pressed': 'false' });
      function choose(v, el) { pick = v; [bHit, bClr].forEach(function (x) { x.classList.toggle('is-selected', x === el); x.setAttribute('aria-pressed', x === el); }); update(); }
      function update() { runBtn.disabled = !(pick && (b.ask === 'hits' || num.value !== '')); }
      num.addEventListener('input', update);
      panel.innerHTML = '';
      panel.appendChild(h('div', { class: 'ix-step' }, h('p', { class: 'ix-step-n', text: 'Step 1 · Predict' }), h('p', { text: 'Before you run it: does ' + who + ' clear the level below?' }), h('div', { class: 'ix-predict-row' }, bHit, bClr)));
      if (b.ask !== 'hits') panel.appendChild(h('div', { class: 'ix-step' }, h('p', { class: 'ix-step-n', text: 'Step 2 · Do the math' }),
        h('label', { for: num.id, text: 'Required clearance below the walking surface' }), h('div', { class: 'ix-input-row' }, num, h('span', { text: 'ft' })),
        h('p', { class: 'ix-formula', html: base.connector === 'srl' ? 'FF + DD + HS + margin' : 'L + DD + HS + H − A + margin' })));
      panel.appendChild(h('div', { class: 'ix-actions' }, runBtn));
      function run() {
        runBtn.disabled = true;
        figure.classList.remove('is-predicting');
        var r = FP.clearance(cur);
        var guess = parseFloat(num.value);
        diag.play(function () {
          drawReadout(r, cur);
          var predOk = (pick === 'hits') === r.hits;
          var numOk = b.ask === 'hits' || Math.abs(guess - r.required) <= 0.5;
          out.innerHTML = '';
          out.appendChild(feedback(predOk && numOk ? 'good' : (predOk || numOk ? 'ok' : 'bad'),
            (predOk ? 'Your call was right' : 'Your call was wrong') + (b.ask === 'hits' ? '' : (numOk ? ' · math checks out' : ' · math is off (needed ' + fmt(r.required) + ' ft)')),
            b.explain || '', b.cite || '1926.502(d)(16)'));
          if (b.fixes && b.fixes.length) {
            var fx = h('div', { class: 'ix-fixes' }, h('p', { class: 'ix-step-n', text: 'Fix it · try each option' }));
            b.fixes.forEach(function (f) { fx.appendChild(btn(f.label, 'ix-fix', function () { runFix(f); })); });
            out.appendChild(fx);
          }
          out.appendChild(h('div', { class: 'ix-actions' }, btn('Start over', 'is-ghost', startPredict)));
          S.done({ predicted: pick, correct: predOk, numeric: isNaN(guess) ? null : guess, required: r.required, hits: r.hits });
        });
      }
    }
    function runFix(f) {
      cur = Object.assign({}, base, f.set || {});
      drawChips(cur); drawDiagram(cur, false);
      var r = FP.clearance(cur);
      diag.play(function () {
        drawReadout(r, cur);
        var note = out.querySelector('.ix-fixnote'); if (note) note.remove();
        var fbEl = feedback(r.hits ? 'bad' : 'good', FP.strip(f.label) + ': ' + (r.hits ? 'still hits' : 'clears, needs ' + fmt(r.required) + ' of ' + fmt(r.available) + ' ft'), f.text || '');
        fbEl.classList.add('ix-fixnote');
        out.insertBefore(fbEl, out.querySelector('.ix-fixes'));
      });
    }
    function startExplore() {
      cur = Object.assign({}, base);
      panel.innerHTML = '';
      function slider(key, label, min, max, step) {
        var id = FP.uid('ix-sl'), val = h('b', { text: fmt(cur[key]) + ' ft' });
        var inp = h('input', { type: 'range', id: id, min: min, max: max, step: step, value: cur[key], class: 'ix-range',
          on: { input: function () { cur[key] = +inp.value; val.textContent = fmt(cur[key]) + ' ft'; redraw(); } } });
        return h('div', { class: 'ix-slider' }, h('label', { for: id }, label + ' ', val), inp);
      }
      var conn = h('div', { class: 'ix-predict-row' });
      ['lanyard', 'srl'].forEach(function (c) {
        var el = btn(c === 'srl' ? 'Overhead SRL' : 'Lanyard', 'ix-predict' + (cur.connector === c ? ' is-selected' : ''), function () { cur.connector = c; Array.prototype.forEach.call(conn.children, function (x) { x.classList.toggle('is-selected', x === el); }); redraw(); });
        conn.appendChild(el);
      });
      panel.appendChild(h('div', { class: 'ix-step' }, h('p', { class: 'ix-step-n', text: 'Connector' }), conn));
      panel.appendChild(slider('A', 'Anchor height', 0, 8, 0.5));
      panel.appendChild(slider('L', 'Lanyard length', 3, 6, 0.5));
      panel.appendChild(slider('available', 'Clearance available', 6, 30, 0.5));
      var played = false;
      function redraw() { drawChips(cur); drawDiagram(cur, true); drawReadout(FP.clearance(cur), cur); if (!played) { played = true; S.done({ explored: true }); } }
      drawChips(cur); drawDiagram(cur, true); drawReadout(FP.clearance(cur), cur);
      panel.appendChild(h('div', { class: 'ix-actions' }, btn('Play the fall', 'is-primary', function () { diag.play(); })));
    }
    if (!FP.diagram) { S.body.appendChild(feedback('note', 'Diagram unavailable', 'art-diagrams.js did not load.')); return S.root; }
    if (explore) startExplore(); else startPredict();
    return S.root;
  });

  /* =================================================================== SWING */
  FP.register('swing', function (b, ctx) {
    var S = shell(b, ctx, 'swing');
    if (!FP.diagram) return S.root;
    var offs = (b.offsets && b.offsets.length) ? b.offsets : [0, 12];
    var range = [Math.min.apply(null, offs), Math.max.apply(null, offs)];
    var d0 = b.start != null ? b.start : (offs.length > 2 ? offs[Math.floor(offs.length / 2)] : 6);
    // v = anchor height above the D-ring; content may give the line length R instead (R² = v² + d²)
    var vv = b.v != null ? b.v : (b.R ? Math.sqrt(Math.max(1, b.R * b.R - d0 * d0)) : 4);
    var sw = FP.diagram.swing({ v: vv, max: range[1], d: d0 });
    var id = FP.uid('ix-sw');
    var val = h('b', { text: fmt(d0) + ' ft' });
    var stats = h('div', { class: 'ix-swing-stats', 'aria-live': 'polite' });
    var inp = h('input', { type: 'range', id: id, min: range[0], max: range[1], step: 0.5, value: d0, class: 'ix-range',
      on: { input: function () { val.textContent = fmt(+inp.value) + ' ft'; show(sw.set(+inp.value)); } } });
    var played = false;
    function show(g) {
      var mph = Math.sqrt(2 * 32.2 * g.drop) * 0.6818;
      stats.innerHTML = '';
      [['Line out', fmt(g.R) + ' ft'], ['Extra drop from the swing', fmt(g.drop) + ' ft'], ['Speed into the column', fmt(mph) + ' mph']].forEach(function (x, i) {
        stats.appendChild(h('div', { class: 'ix-stat' + (i > 0 && g.drop > 1 ? ' is-bad' : '') }, h('span', { text: x[0] }), h('b', { text: x[1] })));
      });
    }
    show(sw.geom());
    S.body.appendChild(h('div', { class: 'ix-clear-figwrap ix-swing-fig' }, sw.svg));
    S.body.appendChild(h('div', { class: 'ix-slider' }, h('label', { for: id }, 'How far you work off to the side of the anchor: ', val), inp));
    S.body.appendChild(stats);
    S.body.appendChild(h('div', { class: 'ix-actions' }, btn('Drop the worker', 'is-primary', function () {
      sw.play(function (g) { show(g); if (!played) { played = true; S.done({ offset: +inp.value, drop: g.drop }); } });
    })));
    if (b.explain) S.body.appendChild(feedback('note', 'What to take to the deck', b.explain, b.cite));
    return S.root;
  });

  /* ============================================================= CHECKREVIEW */
  FP.register('checkreview', function (b, ctx) {
    var S = shell(b, ctx, 'checkreview');
    var nErr = b.rows.filter(function (r) { return r.error; }).length;
    var target = b.findCount || nErr;
    var flagged = {};
    var count = h('b', { text: '0' });
    var checkBtn = btn('Check my flags', 'is-primary', check);
    var out = h('div', { 'aria-live': 'polite' });
    var tbody = h('tbody');
    var table = h('table', { class: 'ix-table ix-review-table' },
      h('thead', null, h('tr', null, h('th', { class: 'ix-flag-col', html: '<span class="ix-sr">Flag</span>' }), (b.columns || []).map(function (c) { return h('th', { html: c }); }))), tbody);
    S.body.appendChild(h('p', { class: 'ix-help' }, 'Tap every row the inspector got wrong. Find ', h('b', { text: String(target) }), '. Flagged: ', count));
    S.body.appendChild(h('div', { class: 'ix-table-wrap' }, table));
    S.body.appendChild(h('div', { class: 'ix-actions' }, checkBtn));
    S.body.appendChild(out);
    var rowEls = [];
    function build() {
      tbody.innerHTML = ''; rowEls = []; flagged = {}; count.textContent = '0'; out.innerHTML = ''; checkBtn.disabled = false;
      b.rows.forEach(function (r, i) {
        var box = h('span', { class: 'ix-flag', 'aria-hidden': 'true' });
        var tr = h('tr', { class: 'ix-review-row', tabindex: '0', role: 'button', 'aria-pressed': 'false',
          on: { click: function () { toggle(i); }, keydown: function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(i); } } } },
          h('td', { class: 'ix-flag-col' }, box), (r.cells || []).map(function (c) { return h('td', { html: c }); }));
        rowEls.push(tr); tbody.appendChild(tr);
      });
    }
    function toggle(i) {
      if (checkBtn.disabled) return;
      flagged[i] = !flagged[i];
      rowEls[i].classList.toggle('is-flagged', !!flagged[i]); rowEls[i].setAttribute('aria-pressed', flagged[i] ? 'true' : 'false');
      count.textContent = String(Object.keys(flagged).filter(function (k) { return flagged[k]; }).length);
    }
    function check() {
      checkBtn.disabled = true;
      var hits = 0, falseFlags = 0;
      var notes = h('ol', { class: 'ix-review-notes' });
      b.rows.forEach(function (r, i) {
        var tr = rowEls[i];
        if (r.error) {
          tr.classList.add(flagged[i] ? 'is-good' : 'is-missed');
          if (flagged[i]) hits++;
          notes.appendChild(h('li', { class: flagged[i] ? 'is-good' : 'is-missed' }, h('b', { text: flagged[i] ? 'Caught · ' : 'Missed · ' }), h('span', { html: r.error.text }), ' ', cite(r.error.cite)));
        } else if (flagged[i]) { tr.classList.add('is-false'); falseFlags++; }
      });
      out.innerHTML = '';
      out.appendChild(feedback(hits === nErr && !falseFlags ? 'good' : (hits >= target ? 'ok' : 'bad'),
        'You caught ' + hits + ' of ' + nErr + (falseFlags ? ' · ' + falseFlags + ' row' + (falseFlags > 1 ? 's were' : ' was') + ' actually fine' : ''),
        b.summary || ''));
      out.appendChild(notes);
      out.appendChild(h('div', { class: 'ix-actions' }, btn('Review it again', 'is-ghost', build)));
      S.done({ caught: hits, errors: nErr, falseFlags: falseFlags });
    }
    build();
    return S.root;
  });

  /* ================================================================= TOOLBOX */
  FP.register('toolbox', function (b, ctx) {
    var S = shell(b, ctx, 'toolbox');
    var pick = {};
    var groups = [['stories', 'Pick a story', 'story'], ['hazards', 'Pick a hazard on our site', 'hazard'], ['commitments', 'Pick the commitment you\'ll ask for', 'commitment']];
    var out = h('div', { class: 'ix-tb-out' });
    var makeBtn = btn('Build my talk', 'is-primary', make, { disabled: true });
    groups.forEach(function (g, gi) {
      var name = FP.uid('ix-tb');
      var opts = h('div', { class: 'ix-tb-opts', role: 'radiogroup', 'aria-label': g[1] });
      (b[g[0]] || []).forEach(function (o) {
        var id = FP.uid('ix-tbo');
        var inp = h('input', { type: 'radio', name: name, id: id, value: o.id, on: { change: function () { pick[g[2]] = o; makeBtn.disabled = !(pick.story && pick.hazard && pick.commitment); } } });
        opts.appendChild(h('label', { class: 'ix-tb-opt', for: id }, inp, h('span', null, h('b', { html: o.label }), o.text ? h('span', { class: 'ix-tb-opt-text', html: o.text }) : null)));
      });
      S.body.appendChild(h('fieldset', { class: 'ix-step ix-tb-group' }, h('legend', null, h('span', { class: 'ix-step-n', text: 'Step ' + (gi + 1) }), ' ', g[1]), opts));
    });
    S.body.appendChild(h('div', { class: 'ix-actions' }, makeBtn));
    S.body.appendChild(out);
    function make() {
      var st = pick.story, hz = pick.hazard, cm = pick.commitment;
      var parts = [
        ['0:00', 'Open', 'Phones down, hats on. Five minutes, then we go to work. Quick story first.'],
        ['0:30', 'The story', FP.strip(st.text || st.label)],
        ['2:00', 'Ask', 'Where on this job could that happen to one of us? (Wait. Let someone answer.)'],
        ['2:30', 'Our hazard', FP.strip(hz.text || hz.label)],
        ['3:30', 'The commitment', FP.strip(cm.text || cm.label) + ' I\'m asking every one of you for that today, and you can hold me to it too.'],
        ['4:30', 'Close', 'If you see it, stop it, and nobody gets grief for stopping work. Questions? Let\'s go.']
      ];
      var text = parts.map(function (p) { return p[0] + '  ' + p[1].toUpperCase() + '\n' + p[2]; }).join('\n\n');
      var pre = h('div', { class: 'ix-script', tabindex: '0', 'aria-label': 'Your toolbox talk script' },
        parts.map(function (p) { return h('div', { class: 'ix-script-row' }, h('span', { class: 'ix-script-t', text: p[0] }), h('div', null, h('b', { text: p[1] }), h('p', { text: p[2] }))); }));
      var copyMsg = h('span', { class: 'ix-copy-msg', 'aria-live': 'polite' });
      out.innerHTML = '';
      out.appendChild(h('h4', { class: 'ix-subhead', text: 'Your 5-minute toolbox talk' }));
      out.appendChild(pre);
      out.appendChild(h('div', { class: 'ix-actions' }, btn('Copy script', 'is-ghost', function () { copyText(text, pre, copyMsg); }), copyMsg));
      S.done({ story: st.id, hazard: hz.id, commitment: cm.id });
    }
    return S.root;
  });

  function copyText(text, selectEl, msgEl) {
    function fallback() {
      try { var r = document.createRange(); r.selectNodeContents(selectEl); var sel = root.getSelection(); sel.removeAllRanges(); sel.addRange(r); msgEl.textContent = 'Selected. Press Ctrl+C or Cmd+C to copy.'; } catch (e) { msgEl.textContent = 'Select the text to copy it.'; }
    }
    try {
      if (root.navigator && navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { msgEl.textContent = 'Copied.'; }, fallback);
      else fallback();
    } catch (e) { fallback(); }
  }

  /* ============================================================== COMMITMENT */
  FP.register('commitment', function (b, ctx) {
    var S = shell(b, ctx, 'commitment');
    var id = FP.uid('ix-cm'), nid = FP.uid('ix-cmn');
    var ta = h('textarea', { id: id, class: 'ix-textarea', rows: 3, maxlength: 180, placeholder: 'On Monday I will…' });
    var name = h('input', { id: nid, class: 'ix-input', type: 'text', maxlength: 40, placeholder: 'Optional', autocomplete: 'name' });
    var makeBtn = btn('Make my card', 'is-primary', make, { disabled: true });
    ta.addEventListener('input', function () { makeBtn.disabled = ta.value.trim().length < 8; });
    var ex = h('div', { class: 'ix-examples' });
    (b.examples || []).forEach(function (e) { ex.appendChild(h('button', { type: 'button', class: 'ix-chip is-small', html: e, on: { click: function () { ta.value = FP.strip(e); makeBtn.disabled = false; ta.focus(); } } })); });
    var out = h('div', { class: 'ix-cm-out' });
    S.body.appendChild(h('label', { for: id, class: 'ix-label', html: b.prompt }));
    S.body.appendChild(ta);
    if (b.examples && b.examples.length) S.body.appendChild(h('div', null, h('p', { class: 'ix-help', text: 'Need a start? Tap one and make it yours.' }), ex));
    S.body.appendChild(h('div', { class: 'ix-name-row' }, h('label', { for: nid, class: 'ix-label', text: 'Name on the card' }), name));
    S.body.appendChild(h('div', { class: 'ix-actions' }, makeBtn));
    S.body.appendChild(out);
    function wrapLines(c, text, maxW) {
      var words = text.split(/\s+/), lines = [], line = '';
      words.forEach(function (w) { var t = line ? line + ' ' + w : w; if (c.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t; });
      if (line) lines.push(line); return lines;
    }
    function make() {
      var text = ta.value.trim(), who = name.value.trim();
      var cv = h('canvas', { width: 1200, height: 675, class: 'ix-cm-canvas', role: 'img', 'aria-label': 'Commitment card: ' + text });
      var c = cv.getContext('2d');
      var brand = (root.FP_CONFIG && root.FP_CONFIG.brand && root.FP_CONFIG.brand.name) || 'UPCHURCH';
      var course = (root.COURSE && root.COURSE.meta && root.COURSE.meta.title) || 'Fall Protection Competent Person';
      // card is a self-contained image: fixed print colors
      c.fillStyle = '#FFFFFF'; c.fillRect(0, 0, 1200, 675);
      c.fillStyle = '#17324D'; c.fillRect(0, 0, 1200, 120);
      for (var x = -40; x < 1240; x += 40) { c.fillStyle = '#FFC629'; c.beginPath(); c.moveTo(x, 675); c.lineTo(x + 20, 675); c.lineTo(x + 40, 651); c.lineTo(x + 20, 651); c.fill(); c.fillStyle = '#1B1B1B'; c.beginPath(); c.moveTo(x + 20, 675); c.lineTo(x + 40, 675); c.lineTo(x + 60, 651); c.lineTo(x + 40, 651); c.fill(); }
      c.fillStyle = '#F26B1D'; c.fillRect(60, 42, 34, 34);
      c.fillStyle = '#FFFFFF'; c.font = '800 40px "Barlow Condensed", "Arial Narrow", Arial, sans-serif'; c.textBaseline = 'middle'; c.fillText(brand, 110, 60);
      c.font = '600 24px "Barlow Condensed", "Arial Narrow", Arial, sans-serif'; c.textAlign = 'right'; c.fillText(course.toUpperCase(), 1140, 60); c.textAlign = 'left';
      c.fillStyle = '#B4460A'; c.font = '700 30px "Barlow Condensed", "Arial Narrow", Arial, sans-serif'; c.textBaseline = 'alphabetic'; c.fillText('MY COMMITMENT · STARTING MONDAY', 60, 200);
      c.fillStyle = '#14202B'; c.font = '600 52px "Public Sans", "Segoe UI", Arial, sans-serif';
      var lines = wrapLines(c, '“' + text + '”', 1080).slice(0, 5);
      lines.forEach(function (ln, i) { c.fillText(ln, 60, 280 + i * 66); });
      c.fillStyle = '#4F5D6A'; c.font = '500 26px "Public Sans", "Segoe UI", Arial, sans-serif';
      var date = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
      c.fillText((who ? who + ' · ' : '') + date, 60, 610);
      var img = h('img', { class: 'ix-cm-img', alt: 'Your commitment card: ' + text });
      try { img.src = cv.toDataURL('image/png'); } catch (e) { img = cv; }
      var msg = h('span', { class: 'ix-copy-msg', 'aria-live': 'polite' });
      var cardText = 'My commitment (' + course + '): ' + text + (who ? ' — ' + who : '') + ', ' + date;
      var txt = h('p', { class: 'ix-cm-text', text: cardText });
      out.innerHTML = '';
      out.appendChild(h('figure', { class: 'ix-cm-fig' }, img));
      out.appendChild(h('div', { class: 'ix-actions' },
        btn('Save card', 'is-primary', function () {
          try {
            cv.toBlob(function (blob) {
              if (!blob) { msg.textContent = 'Saving is blocked here. Long-press or right-click the card to save it.'; return; }
              var a = h('a', { href: URL.createObjectURL(blob), download: 'my-fall-protection-commitment.png' });
              document.body.appendChild(a); a.click(); a.remove();
              msg.textContent = 'If nothing downloaded, long-press or right-click the card to save it.';
            });
          } catch (e) { msg.textContent = 'Saving is blocked here. Long-press or right-click the card to save it.'; }
        }),
        btn('Copy text', 'is-ghost', function () { copyText(cardText, txt, msg); }), msg));
      out.appendChild(txt);
      S.done({ text: text });
    }
    return S.root;
  });

})(typeof window !== 'undefined' ? window : globalThis);
