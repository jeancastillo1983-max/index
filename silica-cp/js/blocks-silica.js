/* ==========================================================================
   Silica interactions (Storyline-style) — added for the Silica CP course.
   table1 · Table 1 match: for each task card (equipment, hours, indoor/outdoor)
            pick the engineering control, then the respirator. Decide first,
            then see the rule with its receipt.
   shift  · The 4-hour trap: predict the respirator for a worker's whole shift,
            then build the shift task by task and watch the requirement change.
   Renderer signature: FP.register(type, function (block, ctx) → HTMLElement)
   ========================================================================== */
(function (root) {
  'use strict';
  var FP = root.FP;
  if (!FP) return;
  var h = FP.h;

  var RESP = { none: 'None', apf10: 'APF 10', apf25: 'APF 25' };
  var RESP_HINT = { none: 'no respirator required by Table 1', apf10: 'half mask or N95 filtering facepiece', apf25: 'loose-fitting PAPR (hood or helmet)' };
  var RANK = { none: 0, apf10: 1, apf25: 2 };

  function safeCtx(ctx) {
    ctx = ctx || {};
    return {
      complete: function (r) { try { if (ctx.complete) ctx.complete(r); } catch (e) { if (root.console) console.error(e); } },
      isComplete: function () { try { return ctx.isComplete ? !!ctx.isComplete() : false; } catch (e) { return false; } }
    };
  }
  function cite(c) { if (!c) return null; var l = Array.isArray(c) ? c : [c]; return h('span', { class: 'ix-cites' }, l.map(function (x) { return h('cite', { html: x }); })); }
  function btn(label, cls, onClick, attrs) { return h('button', Object.assign({ type: 'button', class: 'ix-btn ' + (cls || ''), html: label, on: onClick ? { click: onClick } : null }, attrs || {})); }
  function feedback(tone, label, body, c) {
    return h('div', { class: 'ix-fb is-' + (tone || 'note'), role: 'status' }, label ? h('p', { class: 'ix-fb-label', text: label }) : null,
      body ? h('div', { class: 'ix-fb-body', html: FP.paras(body) }) : null, cite(c));
  }
  function shell(b, ctx, type, kicker) {
    var C = safeCtx(ctx), titleId = FP.uid('ix-t');
    var doneChip = h('span', { class: 'ix-done-chip', hidden: !C.isComplete() }, 'Completed');
    var body = h('div', { class: 'ix-body' }), live = h('div', { class: 'ix-sr', 'aria-live': 'polite' });
    var el = h('section', { class: 'ix ix--' + type, 'aria-labelledby': titleId, 'data-block': b.id || '' },
      h('header', { class: 'ix-head' },
        h('div', { class: 'ix-head-row' }, h('p', { class: 'ix-kicker' }, h('span', { class: 'ix-kicker-mark', 'aria-hidden': 'true' }), b.kicker || kicker), doneChip),
        h('h3', { class: 'ix-title', id: titleId, html: b.title || kicker }),
        b.intro ? h('div', { class: 'ix-intro', html: FP.paras(b.intro) }) : null), body, live);
    return { root: el, body: body, live: live, done: function (r) { doneChip.hidden = false; C.complete(r || {}); } };
  }
  function say(S, msg) { S.live.textContent = ''; setTimeout(function () { S.live.textContent = FP.strip(msg); }, 30); }

  /* ================================================================ TABLE 1 MATCH */
  FP.register('table1', function (b, ctx) {
    var S = shell(b, ctx, 'table1', 'Table 1 match');
    var controls = {}; (b.controls || []).forEach(function (c) { controls[c.id] = c; });
    var st;
    var stage = h('div', { class: 't1-stage' });
    var dots = h('ol', { class: 't1-dots', 'aria-label': 'Progress' });
    var score = h('p', { class: 't1-score', 'aria-live': 'polite' });
    S.body.appendChild(h('div', { class: 't1-top' }, dots, score));
    S.body.appendChild(stage);

    function start() { st = { i: 0, results: [] }; renderDots(); show(); }
    function renderDots() {
      dots.innerHTML = '';
      b.tasks.forEach(function (t, i) {
        var r = st.results[i];
        dots.appendChild(h('li', { class: 't1-dot' + (i === st.i ? ' is-current' : '') + (r ? (r.both ? ' is-good' : r.any ? ' is-ok' : ' is-bad') : ''), 'aria-label': 'Task ' + (i + 1) + (r ? (r.both ? ', both right' : ', reviewed') : '') }, String(i + 1)));
      });
      var right = st.results.filter(function (r) { return r && r.both; }).length;
      score.textContent = st.results.length ? right + ' of ' + st.results.length + ' fully right' : b.tasks.length + ' tasks';
    }
    function optionsFor(t) {
      var ids = [t.control].concat(t.decoys || []);
      if (ids.length < 3) Object.keys(controls).forEach(function (k) { if (ids.length < 3 && ids.indexOf(k) < 0) ids.push(k); });
      return FP.shuffle(ids);
    }
    function show() {
      var t = b.tasks[st.i];
      stage.innerHTML = '';
      var pickC = null, pickR = null;
      var card = h('div', { class: 't1-card' },
        t.art ? h('img', { class: 't1-art', src: t.art, alt: t.alt || '' }) : null,
        h('div', { class: 't1-task' },
          h('p', { class: 't1-count', text: 'Task ' + (st.i + 1) + ' of ' + b.tasks.length }),
          h('h4', { class: 't1-name', html: t.task }),
          h('div', { class: 't1-tags' },
            h('span', { class: 't1-tag' }, FP.icon ? FP.icon('clock', 16) : null, t.hours + ' hr this shift'),
            h('span', { class: 't1-tag ' + (t.indoor ? 'is-in' : 'is-out') }, t.indoor ? 'Indoors' : 'Outdoors'),
            t.who ? h('span', { class: 't1-tag' }, t.who) : null),
          t.note ? h('p', { class: 't1-note', html: t.note }) : null));
      stage.appendChild(card);
      var cWrap = h('div', { class: 't1-opts', role: 'group', 'aria-label': 'Engineering control' });
      var rWrap = h('div', { class: 't1-opts t1-resp', role: 'group', 'aria-label': 'Respirator' });
      var check = btn('Check', 'is-primary', function () { grade(); }, { disabled: true });
      var out = h('div', { class: 't1-out' });
      function chips(wrap, list, labelOf, hintOf, onPick) {
        var els = [];
        list.forEach(function (id) {
          var c = h('button', { type: 'button', class: 'ix-chip t1-chip', 'aria-pressed': 'false', on: { click: function () {
            els.forEach(function (e) { e.classList.remove('is-selected'); e.setAttribute('aria-pressed', 'false'); });
            c.classList.add('is-selected'); c.setAttribute('aria-pressed', 'true'); onPick(id);
          } } }, h('span', { class: 't1-chip-l', html: labelOf(id) }), hintOf(id) ? h('span', { class: 't1-chip-h', html: hintOf(id) }) : null);
          c.dataset.id = id; els.push(c); wrap.appendChild(c);
        });
        return els;
      }
      var cEls = chips(cWrap, optionsFor(t), function (id) { return (controls[id] || {}).label || id; }, function (id) { return (controls[id] || {}).short || ''; },
        function (id) { pickC = id; check.disabled = !(pickC && pickR); });
      var rEls = chips(rWrap, ['none', 'apf10', 'apf25'], function (id) { return RESP[id]; }, function (id) { return RESP_HINT[id]; },
        function (id) { pickR = id; check.disabled = !(pickC && pickR); });
      stage.appendChild(h('div', { class: 't1-step' }, h('p', { class: 't1-q' }, h('b', null, '1 · '), 'Which control does Table 1 require?'), cWrap));
      stage.appendChild(h('div', { class: 't1-step' }, h('p', { class: 't1-q' }, h('b', null, '2 · '), 'Which respirator, for these hours and this location?'), rWrap));
      stage.appendChild(h('div', { class: 'ix-actions' }, check));
      stage.appendChild(out);

      function grade() {
        check.disabled = true;
        var okC = pickC === t.control, okR = pickR === t.resp;
        cEls.concat(rEls).forEach(function (e) { e.disabled = true; });
        cEls.forEach(function (e) { if (e.dataset.id === t.control) e.classList.add('is-good'); else if (e.dataset.id === pickC) e.classList.add('is-bad'); });
        rEls.forEach(function (e) { if (e.dataset.id === t.resp) e.classList.add('is-good'); else if (e.dataset.id === pickR) e.classList.add('is-bad'); });
        st.results[st.i] = { both: okC && okR, any: okC || okR };
        var label = okC && okR ? 'Both right' : okC ? 'Control right, respirator wrong' : okR ? 'Respirator right, control wrong' : 'Not this time';
        out.appendChild(feedback(okC && okR ? 'good' : (okC || okR) ? 'ok' : 'bad', label,
          [(controls[t.control] ? '<b>Control:</b> ' + controls[t.control].label + '. ' : '') + '<b>Respirator:</b> ' + RESP[t.resp] + '.', t.fb], t.cite));
        say(S, label + '. ' + FP.strip(t.fb));
        var last = st.i === b.tasks.length - 1;
        out.appendChild(h('div', { class: 'ix-actions' }, btn(last ? 'See my results' : 'Next task', 'is-primary', function () { if (last) finish(); else { st.i++; renderDots(); show(); } })));
        renderDots();
      }
    }
    function finish() {
      stage.innerHTML = '';
      var right = st.results.filter(function (r) { return r.both; }).length;
      var tone = right === b.tasks.length ? 'good' : right >= Math.ceil(b.tasks.length * 0.7) ? 'ok' : 'bad';
      stage.appendChild(feedback(tone, right + ' of ' + b.tasks.length + ' tasks fully right', b.summary || ''));
      var tbl = h('table', { class: 'ix-table t1-summary' },
        h('thead', null, h('tr', null, ['Task', 'Hours', 'Where', 'Control', 'Respirator', ''].map(function (x) { return h('th', { scope: 'col', text: x }); }))),
        h('tbody', null, b.tasks.map(function (t, i) {
          var r = st.results[i];
          return h('tr', { class: r.both ? 'is-good' : 'is-missed' }, h('td', { html: t.task }), h('td', { text: String(t.hours) }), h('td', { text: t.indoor ? 'In' : 'Out' }),
            h('td', { html: (controls[t.control] || {}).label || t.control }), h('td', { text: RESP[t.resp] }), h('td', { text: r.both ? '✓' : '↺' }));
        })));
      stage.appendChild(h('div', { class: 'ix-table-wrap' }, tbl));
      stage.appendChild(h('div', { class: 'ix-actions' }, btn('Run the drill again', 'is-ghost', start)));
      renderDots();
      S.done({ correct: right, total: b.tasks.length });
    }
    start();
    return S.root;
  });

  /* ================================================================ SHIFT (4-hour trap) */
  FP.register('shift', function (b, ctx) {
    var S = shell(b, ctx, 'shift', 'The 4-hour trap');
    var tasks = b.tasks || [];
    var on = {}; (b.preset || []).forEach(function (id) { on[id] = true; });
    var predicted = null;
    var predictWrap = h('div', { class: 'sh-predict' });
    var board = h('div', { class: 'sh-board', hidden: true });
    S.body.appendChild(predictWrap); S.body.appendChild(board);

    function totals() {
      var hrs = 0, list = tasks.filter(function (t) { return on[t.id]; });
      list.forEach(function (t) { hrs += +t.hours; });
      var col = hrs > 4 ? 'gt4' : 'le4', need = 'none';
      list.forEach(function (t) { var r = (t.resp || {})[col] || 'none'; if (RANK[r] > RANK[need]) need = r; });
      return { hrs: hrs, col: col, need: need, list: list };
    }
    // step 1: decide first
    var preset = tasks.filter(function (t) { return on[t.id]; });
    predictWrap.appendChild(h('div', { class: 'sh-story' },
      b.speaker ? h('span', { class: 'sh-av' }, FP.avatar(b.speaker, 56)) : null,
      h('div', null, h('p', { class: 'sh-q', html: b.question || 'What respirator does she need?' }),
        h('ul', { class: 'sh-preset' }, preset.map(function (t) { return h('li', null, h('b', null, t.hours + ' hr'), ' · ', h('span', { html: t.label })); })))));
    var choices = h('div', { class: 't1-opts t1-resp', role: 'group', 'aria-label': 'Your prediction' });
    ['none', 'apf10', 'apf25'].forEach(function (id) {
      choices.appendChild(h('button', { type: 'button', class: 'ix-chip t1-chip', on: { click: function () { predicted = id; reveal(); } } },
        h('span', { class: 't1-chip-l', text: RESP[id] }), h('span', { class: 't1-chip-h', text: RESP_HINT[id] })));
    });
    predictWrap.appendChild(choices);

    var bar = h('div', { class: 'sh-bar', role: 'img' });
    var marks = h('div', { class: 'sh-marks' }, [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function (n) { return h('span', { class: 'sh-mark' + (n === 4 ? ' is-four' : ''), style: { left: (n / 8 * 100) + '%' } }, n === 4 ? '4 hr' : String(n)); }));
    var readout = h('div', { class: 'sh-readout', 'aria-live': 'polite' });
    var toggles = h('div', { class: 'sh-toggles' });
    var verdict = h('div');
    board.appendChild(h('div', { class: 'sh-track' }, bar, marks));
    board.appendChild(readout);
    board.appendChild(h('p', { class: 'ix-help', text: 'Now play with the shift. Tap tasks on and off and watch the requirement change.' }));
    board.appendChild(toggles);
    board.appendChild(verdict);

    var PAL = ['#0074E4', '#F26B1D', '#008200', '#A86A00', '#6E5A8F', '#1F5FAE'];
    function draw() {
      var T = totals();
      bar.innerHTML = '';
      var x = 0;
      T.list.forEach(function (t) {
        var w = Math.min(+t.hours, 8 - x); if (w <= 0) return;
        var i = tasks.indexOf(t);
        bar.appendChild(h('span', { class: 'sh-seg', style: { left: (x / 8 * 100) + '%', width: (w / 8 * 100) + '%', background: PAL[i % PAL.length] }, title: FP.strip(t.label) }, h('span', { class: 'sh-seg-l', text: t.short || FP.strip(t.label) })));
        x += w;
      });
      bar.setAttribute('aria-label', 'Shift bar: ' + T.hrs + ' hours of Table 1 tasks');
      readout.innerHTML = '';
      readout.appendChild(h('div', { class: 'sh-stat' }, h('span', null, 'Table 1 time'), h('b', { text: T.hrs + ' hr' })));
      readout.appendChild(h('div', { class: 'sh-stat' }, h('span', null, 'Column to read'), h('b', { text: T.hrs > 4 ? '> 4 hours' : '≤ 4 hours' })));
      readout.appendChild(h('div', { class: 'sh-stat is-need is-' + T.need }, h('span', null, 'Respirator'), h('b', { text: RESP[T.need] })));
      toggles.innerHTML = '';
      tasks.forEach(function (t, i) {
        var r = t.resp || {};
        toggles.appendChild(h('button', { type: 'button', class: 'ix-chip sh-toggle' + (on[t.id] ? ' is-selected' : ''), 'aria-pressed': on[t.id] ? 'true' : 'false',
          on: { click: function () { on[t.id] = !on[t.id]; draw(); } } },
          h('span', { class: 'sh-sw', style: { background: PAL[i % PAL.length] } }),
          h('span', { class: 't1-chip-l', html: t.label + ' · ' + t.hours + ' hr' }),
          h('span', { class: 't1-chip-h', text: '≤4 hr: ' + RESP[r.le4 || 'none'] + ' · >4 hr: ' + RESP[r.gt4 || 'none'] })));
      });
    }
    function reveal() {
      predictWrap.querySelectorAll('button').forEach(function (x) { x.disabled = true; if (x.textContent.indexOf(RESP[predicted]) === 0) x.classList.add('is-selected'); });
      board.hidden = false;
      on = {}; (b.preset || []).forEach(function (id) { on[id] = true; });
      draw();
      var T = totals(), right = predicted === T.need;
      verdict.innerHTML = '';
      verdict.appendChild(feedback(right ? 'good' : 'bad', right ? 'Right: ' + RESP[T.need] : 'She needs ' + RESP[T.need] + ', not ' + RESP[predicted], b.explain, b.cite));
      say(S, (right ? 'Right. ' : 'Not quite. ') + FP.strip(b.explain));
      S.done({ correct: right ? 1 : 0, total: 1 });
    }
    return S.root;
  });
})(typeof window !== 'undefined' ? window : globalThis);
