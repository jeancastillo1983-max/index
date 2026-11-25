/* ==========================================================================
   Exam engine (BUILD-SPEC §5), certificate and field verification views.
   FP.exam.renderExam(host) · renderCertificate(host) · renderVerification(host)
   ========================================================================== */
(function (root) {
  'use strict';
  var FP = root.FP, h = FP.h, P = FP.paras;
  var CFG = root.FP_CONFIG || {};
  var LETTERS = 'ABCDEFGHIJ';
  var FIELD_ITEMS = [
    ['Walks an active work area and identifies existing and predictable fall hazards', 'Module 3'],
    ['Selects a compliant system for two real tasks and explains why', 'Module 4'],
    ['Inspects a harness, lanyard or SRL, and an anchor, and correctly tags one item', 'Modules 5 & 6'],
    ['Calculates fall clearance for an actual tie-off point', 'Module 5'],
    ['Inspects a guardrail run and a hole cover against spec', 'Modules 4 & 6'],
    ['Walks through the site rescue plan and confirms equipment is on hand', 'Module 7'],
    ['Demonstrates a stop-work conversation (role-play with the safety manager is acceptable)', 'Module 8'],
    ['Reviews a worker training certification record for completeness', 'Module 8']
  ];

  function C() { return root.COURSE || {}; }
  function E() { return FP.engine; }
  function ES() { return E().state.e; }
  function rules() { var r = (C().exam && C().exam.rules) || {}; return { pass: r.pass || 0.8, attempts: r.attempts || 3, count: r.count || 40, critical: r.criticalRequired !== false }; }
  function areaTitle(id) { var o = (C().outline || []).find(function (x) { return x.id === id; }); return o ? 'Module ' + o.num + ': ' + o.title : id; }
  function cite(c) { if (!c) return null; var l = Array.isArray(c) ? c : [c]; return h('p', { class: 'cite-row' }, h('span', { class: 'cite-label' }, 'Receipt'), l.map(function (x) { return h('cite', { html: x }); })); }
  function band(kicker, title, sub, media) {
    var md = FP.media(media);
    return h('div', { class: 'band band--compact' },
      md && md.type === 'image' ? h('img', { class: 'band-img', src: md.src, alt: '' }) : h('div', { class: 'band-art' }, FP.art.frame()),
      h('div', { class: 'band-shade' }),
      h('div', { class: 'band-inner' }, h('p', { class: 'kicker kicker--band' }, kicker), h('h1', { class: 'band-title band-title--small' }, title), sub ? h('p', { class: 'band-meta' }, sub) : null),
      h('div', { class: 'band-stripe', 'aria-hidden': 'true' }));
  }
  function card(icon, heading, body, actions, tone) {
    return h('div', { class: 'exam-card' + (tone ? ' tone-' + tone : '') }, h('span', { class: 'exam-card-ico' }, FP.icon(icon, 26)),
      h('div', null, h('h2', { class: 'h3' }, heading), body ? h('div', { class: 'prose' }, body) : null, actions ? h('div', { class: 'exam-actions' }, actions) : null));
  }

  /* ---------------- answer helpers ---------------- */
  function isCorrect(q, a) {
    if (a == null) return false;
    switch (q.type) {
      case 'mc': return q.options[a] && !!q.options[a].correct;
      case 'multi': return q.options.every(function (o, i) { return !!o.correct === !!(a && a[i]); });
      case 'numeric': {
        var v = parseFloat(String(a).replace(/[^0-9.\-]/g, ''));
        return !isNaN(v) && Math.abs(v - q.answer) <= (q.tolerance || 0) + 1e-9;
      }
      case 'sequence': return Array.isArray(a) && a.every(function (x, i) { return x === i; });
      case 'hotspot': {
        var want = q.correct || [];
        var got = Object.keys(a || {}).filter(function (k) { return a[k]; });
        return got.length === want.length && want.every(function (w) { return got.indexOf(w) > -1; });
      }
    }
    return false;
  }
  function correctText(q) {
    switch (q.type) {
      case 'mc': case 'multi': return q.options.filter(function (o) { return o.correct; }).map(function (o) { return FP.strip(o.text); }).join(' + ');
      case 'numeric': return q.answer + (q.unit ? ' ' + q.unit : '');
      case 'sequence': return q.items.map(function (x, i) { return (i + 1) + '. ' + FP.strip(x); }).join('  ');
      case 'hotspot': { var sc = FP.scene(q.scene); return (q.correct || []).map(function (id) { var z = sc && sc.hazards.find(function (x) { return x.id === id; }); return z ? FP.strip(z.label) : id; }).join(', ') || 'None of them'; }
    }
    return '';
  }
  function answerText(q, a) {
    if (a == null) return 'No answer';
    switch (q.type) {
      case 'mc': return q.options[a] ? FP.strip(q.options[a].text) : 'No answer';
      case 'multi': { var l = q.options.filter(function (o, i) { return a[i]; }).map(function (o) { return FP.strip(o.text); }); return l.length ? l.join(' + ') : 'No answer'; }
      case 'numeric': return String(a) + (q.unit ? ' ' + q.unit : '');
      case 'sequence': return a.map(function (x, i) { return (i + 1) + '. ' + FP.strip(q.items[x]); }).join('  ');
      case 'hotspot': { var sc = FP.scene(q.scene); var ids = Object.keys(a).filter(function (k) { return a[k]; }); return ids.map(function (id) { var z = sc && (sc.hazards.concat(sc.decoys || [])).find(function (x) { return x.id === id; }); return z ? FP.strip(z.label) : id; }).join(', ') || 'Nothing selected'; }
    }
    return '';
  }
  function isAnswered(q, a) {
    if (a == null) return false;
    if (q.type === 'multi' || q.type === 'hotspot') return Object.keys(a).some(function (k) { return a[k]; });
    if (q.type === 'numeric') return String(a).trim() !== '';
    return true;
  }

  /* ---------------- draw a paper ---------------- */
  function drawPaper() {
    var ex = C().exam; var last = String(ES().q || '');
    var picks = [];
    var qs = ex.slots.map(function (slot, si) {
      var n = (slot.pool || []).length;
      var prev = last.charAt(si) === '' ? -1 : parseInt(last.charAt(si), 36);
      var choices = []; for (var i = 0; i < n; i++) if (i !== prev || n === 1) choices.push(i);
      var idx = choices[Math.floor(Math.random() * choices.length)] || 0;
      picks.push(idx.toString(36));
      var q = slot.pool[idx];
      return { slot: slot, si: si, idx: idx, q: q, seqOrder: q.type === 'sequence' ? shuffledOrder(q.items.length) : null };
    });
    return { qs: FP.shuffle(qs), picks: picks.join(''), answers: {}, at: 0 };
  }
  function shuffledOrder(n) {
    var o = []; for (var i = 0; i < n; i++) o.push(i);
    var s = FP.shuffle(o);
    if (n > 1 && s.every(function (x, i) { return x === i; })) s.reverse();
    return s;
  }

  /* ---------------- main exam view ---------------- */
  var paper = null;
  function renderExam(host) {
    host.innerHTML = '';
    var ex = C().exam, R = rules(), st = ES(), eng = E();
    host.appendChild(band('Final assessment', 'Prove the knowledge half', R.count + ' questions · ' + Math.round(R.pass * 100) + '% to pass · all critical items · ' + R.attempts + ' attempts', 'img_exam_hero'));
    var col = h('div', { class: 'col' });
    host.appendChild(col);
    if (!ex || !ex.slots || !ex.slots.length) { col.appendChild(card('wrench', 'The assessment is not loaded in this build.', 'The question pools are still being written. Check back after the next publish.')); return; }
    if (paper) return takeView(col);
    if (st.p) {
      col.appendChild(card('award', 'You passed the final assessment.', h('p', null, 'Best score: ', h('b', null, st.s + '%'), '. Your certificate is ready. Remember: you are not designated until your safety manager signs the field verification.'),
        [h('a', { class: 'btn btn-primary', href: '#certificate' }, FP.icon('award', 18), 'View certificate'), h('a', { class: 'btn btn-quiet', href: '#verification' }, 'Field verification', FP.icon('arrow-right', 16))], 'good'));
      return;
    }
    if (st.a >= R.attempts) {
      col.appendChild(card('lock', 'All ' + R.attempts + ' attempts are used.', h('p', null, 'Talk with your safety manager about the next step. Your best score was ' + st.s + '%. The modules stay open for review.'), null, 'bad'));
      return;
    }
    if (!eng.examUnlocked()) {
      var left = eng.modules().filter(function (m) { return !eng.moduleDone(m); });
      col.appendChild(card('lock', 'Finish the modules first.', h('div', null, h('p', null, 'The final assessment opens after Module 9. Still to go:'),
        h('ul', { class: 'plain-list' }, left.map(function (m) { return h('li', null, h('a', { href: '#' + m.id }, 'Module ' + m.num + ': ' + m.title)); })))));
      return;
    }
    var rv = eng.reviewList();
    if (rv.length) {
      col.appendChild(card('refresh', 'Review required before your next attempt.', h('div', null,
        h('p', null, 'Your last attempt missed items tied to these modules. Revisit every lesson in each one and the assessment reopens.'),
        h('ul', { class: 'plain-list' }, rv.map(function (id) { var m = eng.getModule(id); return h('li', null, h('a', { href: '#' + id }, m ? 'Module ' + m.num + ': ' + m.title : id)); }))), null, 'ok'));
      return;
    }
    var nCrit = ex.slots.filter(function (s) { return s.critical; }).length;
    col.appendChild(h('div', { class: 'exam-intro' },
      h('p', { class: 'kicker' }, 'Attempt ' + (st.a + 1) + ' of ' + R.attempts),
      h('h2', { class: 'h2' }, 'Same job, same crew. Now it counts.'),
      h('p', { class: 'lead' }, 'Most questions put you back on the Riverside job. Answer the way you would on site.'),
      h('div', { class: 'rule-grid' },
        rule(R.count, 'questions, drawn from pools so retakes see different items'),
        rule(Math.ceil(R.count * R.pass) + '/' + R.count, 'to pass (' + Math.round(R.pass * 100) + '%)'),
        rule(nCrit + ' critical', 'marked with a stripe. Miss one and the attempt fails, even with a high score.'),
        rule('~25 min', 'no timer. You can move back and forth before you submit.')),
      h('div', { class: 'exam-formats' }, h('p', { class: 'kicker' }, 'You\'ll see'),
        h('p', null, 'Scenario multiple choice · select all that apply · spot it on a scene · a clearance number · put a rescue plan in order')),
      h('p', { class: 'muted' }, 'After you submit, every question shows the right answer, the reason, and the receipt. If an attempt fails, the course reopens the modules tied to what you missed before the next try.'),
      h('div', { class: 'exam-actions' }, h('button', { class: 'btn btn-primary btn-lg', on: { click: function () { paper = drawPaper(); renderExam(host); } } }, 'Start attempt ' + (st.a + 1), FP.icon('arrow-right', 18)))));
    if (st.h && st.h.length) {
      col.appendChild(h('div', { class: 'attempt-hist' }, h('p', { class: 'kicker' }, 'Previous attempts'),
        h('ul', { class: 'plain-list' }, st.h.map(function (x, i) { return h('li', null, 'Attempt ' + (i + 1) + ': ' + x.s + '%' + (x.c ? '' : ' · missed a critical item')); }))));
    }
    function rule(big, small) { return h('div', { class: 'rule' }, h('b', null, String(big)), h('span', null, small)); }

    function takeView(col2) {
      var total = paper.qs.length;
      var item = paper.qs[paper.at];
      var q = item.q;
      var bar = h('div', { class: 'exam-top' },
        h('p', { class: 'exam-count' }, 'Question ', h('b', null, String(paper.at + 1)), ' of ' + total),
        h('div', { class: 'exam-prog' }, h('span', { style: { width: ((paper.at + 1) / total * 100) + '%' } })),
        h('button', { class: 'btn btn-quiet btn-sm', on: { click: function () { pal.hidden = !pal.hidden; } } }, FP.icon('list', 16), 'All questions'));
      var pal = h('div', { class: 'exam-palette', hidden: true }, paper.qs.map(function (it, i) {
        var ans = isAnswered(it.q, paper.answers[i]);
        return h('button', { class: 'pal' + (ans ? ' is-ans' : '') + (i === paper.at ? ' is-cur' : '') + (it.slot.critical ? ' is-crit' : ''), 'aria-label': 'Question ' + (i + 1) + (ans ? ', answered' : ''), on: { click: function () { paper.at = i; renderExam(host); } } }, String(i + 1));
      }));
      var qcard = h('section', { class: 'exam-q' + (item.slot.critical ? ' is-critical' : '') });
      if (item.slot.critical) qcard.appendChild(h('p', { class: 'crit-badge' }, h('span', { class: 'crit-stripe', 'aria-hidden': 'true' }), 'Critical item'));
      qcard.appendChild(h('div', { class: 'exam-stem', html: P(q.stem) }));
      qcard.appendChild(answerUI(q, paper.at, item));
      var isLast = paper.at === total - 1;
      var nav = h('div', { class: 'exam-nav' },
        h('button', { class: 'btn btn-quiet', disabled: paper.at === 0, on: { click: function () { paper.at--; renderExam(host); } } }, FP.icon('arrow-left', 18), 'Previous'),
        isLast ? h('button', { class: 'btn btn-primary', on: { click: function () { submitView(col2); } } }, 'Review & submit', FP.icon('flag', 16))
          : h('button', { class: 'btn btn-primary', on: { click: function () { paper.at++; renderExam(host); } } }, 'Next', FP.icon('arrow-right', 18)));
      col2.appendChild(bar); col2.appendChild(pal); col2.appendChild(qcard); col2.appendChild(nav);
      col2.appendChild(h('p', { class: 'exam-leave muted' }, 'Leaving this page before you submit discards this attempt\'s answers but does not use up an attempt.'));
    }

    function submitView(col2) {
      var total = paper.qs.length;
      var n = paper.qs.filter(function (it, i) { return isAnswered(it.q, paper.answers[i]); }).length;
      col2.innerHTML = '';
      col2.appendChild(card('flag', 'Ready to submit?', h('p', null, 'You answered ' + n + ' of ' + total + '. ' + (n < total ? 'Unanswered questions count as wrong.' : 'Every question has an answer.')),
        [h('button', { class: 'btn btn-quiet', on: { click: function () { renderExam(host); } } }, FP.icon('arrow-left', 16), 'Back to the questions'),
          h('button', { class: 'btn btn-primary', on: { click: function () { grade(col2); } } }, 'Submit attempt', FP.icon('check', 16))]));
    }

    function grade(col2) {
      var R2 = rules();
      var res = paper.qs.map(function (it, i) { return { it: it, a: paper.answers[i], ok: isCorrect(it.q, paper.answers[i]) }; });
      var nRight = res.filter(function (r) { return r.ok; }).length;
      var score = Math.round(nRight / res.length * 100);
      var crit = res.filter(function (r) { return r.it.slot.critical; });
      var critOk = crit.every(function (r) { return r.ok; });
      var passed = nRight >= Math.ceil(res.length * R2.pass) && (!R2.critical || critOk);
      var s = ES();
      s.a = (s.a || 0) + 1; s.s = Math.max(s.s || 0, score); s.q = paper.picks;
      s.h = (s.h || []).concat([{ s: score, c: critOk ? 1 : 0 }]).slice(-3);
      var missedAreas = [];
      res.forEach(function (r) { if (!r.ok) { var a = r.it.q.module || r.it.slot.area; if (a && missedAreas.indexOf(a) < 0) missedAreas.push(a); } });
      if (passed) {
        s.p = 1; s.t = new Date().toISOString().slice(0, 10);
        s.id = 'FPCP-' + s.t.replace(/-/g, '') + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();
        FP.scorm.setScore(score); FP.scorm.setStatus('passed');
      } else {
        FP.scorm.setScore(score);
        if (s.a >= R2.attempts) FP.scorm.setStatus('failed');
        if (s.a < R2.attempts) E().flagReview(missedAreas);
      }
      E().save(); E().refresh();
      var p = paper; paper = null;
      col2.innerHTML = '';
      resultsView(col2, { res: res, nRight: nRight, score: score, crit: crit, critOk: critOk, passed: passed, missedAreas: missedAreas, attempts: s.a, R: R2, p: p });
      root.scrollTo(0, 0);
    }
  }

  /* ---------------- answer UIs ---------------- */
  function answerUI(q, qi, item) {
    var A = paper.answers;
    var box = h('div', { class: 'exam-answer' });
    if (q.type === 'mc' || q.type === 'multi') {
      var multi = q.type === 'multi';
      if (multi) box.appendChild(h('p', { class: 'hint' }, 'Select all that apply.'));
      var group = h('div', { class: 'mcq-opts', role: multi ? 'group' : 'radiogroup' });
      q.options.forEach(function (o, i) {
        var on = multi ? !!(A[qi] && A[qi][i]) : A[qi] === i;
        var bt = h('button', { class: 'opt' + (on ? ' is-picked' : ''), role: multi ? 'checkbox' : 'radio', 'aria-checked': String(on) }, h('span', { class: 'opt-key' }, LETTERS[i]), h('span', { class: 'opt-text', html: o.text }));
        bt.addEventListener('click', function () {
          if (multi) { A[qi] = A[qi] || {}; if (A[qi][i]) delete A[qi][i]; else A[qi][i] = 1; }
          else A[qi] = i;
          Array.prototype.forEach.call(group.children, function (x, j) { var p = multi ? !!(A[qi] && A[qi][j]) : A[qi] === j; x.classList.toggle('is-picked', p); x.setAttribute('aria-checked', String(p)); });
        });
        group.appendChild(bt);
      });
      box.appendChild(group);
    } else if (q.type === 'numeric') {
      var id = 'num-' + qi;
      var inp = h('input', { id: id, class: 'field field-num', type: 'text', inputmode: 'decimal', autocomplete: 'off', placeholder: '0' });
      inp.value = A[qi] != null ? A[qi] : '';
      inp.addEventListener('input', function () { A[qi] = inp.value; });
      box.appendChild(h('div', { class: 'num-row' }, h('label', { for: id }, 'Your answer'), inp, q.unit ? h('span', { class: 'num-unit' }, q.unit) : null));
      if (q.hint) box.appendChild(h('p', { class: 'hint', html: q.hint }));
    } else if (q.type === 'sequence') {
      if (!A[qi]) A[qi + '_o'] = A[qi + '_o'] || item.seqOrder.slice();
      var order = A[qi] || A[qi + '_o'];
      var list = h('ol', { class: 'seq-list' });
      var draw = function () {
        list.innerHTML = '';
        order.forEach(function (itemIdx, pos) {
          list.appendChild(h('li', { class: 'seq-item' },
            h('span', { class: 'seq-n' }, String(pos + 1)), h('span', { class: 'seq-t', html: q.items[itemIdx] }),
            h('span', { class: 'seq-btns' },
              h('button', { class: 'icon-btn', 'aria-label': 'Move up', disabled: pos === 0, on: { click: function () { move(pos, -1); } } }, FP.icon('arrow-left', 16, 'rot90')),
              h('button', { class: 'icon-btn', 'aria-label': 'Move down', disabled: pos === order.length - 1, on: { click: function () { move(pos, 1); } } }, FP.icon('arrow-right', 16, 'rot90')))));
        });
      };
      var move = function (pos, d) { var t = order[pos]; order[pos] = order[pos + d]; order[pos + d] = t; A[qi] = order; draw(); };
      box.appendChild(h('p', { class: 'hint' }, 'Put the steps in order. Use the arrows to move a step.'));
      box.appendChild(list);
      box.appendChild(h('button', { class: 'btn-link', on: { click: function () { A[qi] = order; FP.toast('Order saved.'); } } }, 'Keep this order'));
      draw();
    } else if (q.type === 'hotspot') {
      var sc = FP.scene(q.scene);
      if (!sc) { box.appendChild(h('p', { class: 'muted' }, 'Scene not available in this build.')); return box; }
      A[qi] = A[qi] || {};
      var regions = (q.regions ? sc.hazards.concat(sc.decoys || []).filter(function (r) { return q.regions.indexOf(r.id) > -1; }) : sc.hazards.concat(sc.decoys || []));
      regions = regions.slice().sort(function (a, b) { return (a.y + a.h / 2) - (b.y + b.h / 2) || (a.x - b.x); });
      var stage = h('div', { class: 'hs-stage exam-hs' }, h('img', { src: sc.src, alt: sc.title || 'Jobsite scene' }));
      var legend = h('ol', { class: 'hs-legend' });
      regions.forEach(function (r, i) {
        var on = !!A[qi][r.id];
        var mk = h('button', { class: 'lg-marker hs-pick' + (on ? ' is-active' : ''), style: { left: (r.x + r.w / 2) + '%', top: (r.y + r.h / 2) + '%' }, 'aria-pressed': String(on), 'aria-label': 'Spot ' + (i + 1) }, String(i + 1));
        var li = h('li', { class: on ? 'is-on' : '' }, h('b', null, (i + 1) + '.'), ' ', h('span', null, 'Area ' + (i + 1)));
        var toggle = function () { A[qi][r.id] = !A[qi][r.id]; var v = !!A[qi][r.id]; mk.classList.toggle('is-active', v); mk.setAttribute('aria-pressed', String(v)); li.classList.toggle('is-on', v); };
        mk.addEventListener('click', toggle);
        stage.appendChild(mk);
        void li;
      });
      box.appendChild(h('p', { class: 'hint' }, 'Select every numbered spot that matches the question. Select again to clear.'));
      box.appendChild(stage);
    }
    return box;
  }

  /* ---------------- results ---------------- */
  function resultsView(col, r) {
    var eng = E();
    col.appendChild(h('div', { class: 'result-hero ' + (r.passed ? 'is-pass' : 'is-fail') },
      h('div', { class: 'result-score' }, h('b', null, r.score + '%'), h('span', null, r.nRight + ' of ' + r.res.length)),
      h('div', null,
        h('p', { class: 'kicker' }, 'Attempt ' + r.attempts + ' of ' + r.R.attempts),
        h('h2', { class: 'h2' }, r.passed ? 'Passed. Knowledge half done.' : 'Not this time.'),
        h('p', null, (r.critOk ? 'All ' : '') + r.crit.filter(function (x) { return x.ok; }).length + ' of ' + r.crit.length + ' critical items correct.' +
          (!r.critOk ? ' A missed critical item fails the attempt regardless of score.' : '') + (r.score < r.R.pass * 100 ? ' You need ' + Math.round(r.R.pass * 100) + '% to pass.' : '')),
        r.passed ? h('div', { class: 'exam-actions' }, h('a', { class: 'btn btn-primary', href: '#certificate' }, FP.icon('award', 18), 'Get your certificate'), h('a', { class: 'btn btn-quiet', href: '#verification' }, 'Field verification next', FP.icon('arrow-right', 16)))
          : r.attempts < r.R.attempts ? h('div', null, h('p', null, 'Before attempt ' + (r.attempts + 1) + ', revisit:'), h('ul', { class: 'plain-list' }, r.missedAreas.map(function (a) { var m = eng.getModule(a); return h('li', null, m ? h('a', { href: '#' + a }, 'Module ' + m.num + ': ' + m.title) : areaTitle(a)); })))
            : h('p', null, 'That was your last attempt. Talk with your safety manager about next steps.'))));

    // area breakdown
    var areas = {};
    r.res.forEach(function (x) { var a = x.it.slot.area; areas[a] = areas[a] || { n: 0, ok: 0 }; areas[a].n++; if (x.ok) areas[a].ok++; });
    col.appendChild(h('div', { class: 'b-table' }, h('h3', { class: 'blk-title' }, 'By area'), h('div', { class: 'table-wrap' }, h('table', null,
      h('thead', null, h('tr', null, h('th', null, 'Area'), h('th', null, 'Correct'))),
      h('tbody', null, Object.keys(areas).sort().map(function (a) { return h('tr', null, h('th', { scope: 'row' }, areaTitle(a)), h('td', { class: areas[a].ok === areas[a].n ? 'is-good' : 'is-bad' }, areas[a].ok + ' / ' + areas[a].n)); }))))));

    // per-question review
    col.appendChild(h('h3', { class: 'blk-title' }, 'Every question, with the receipt'));
    var list = h('ol', { class: 'review-list' });
    r.res.forEach(function (x, i) {
      var q = x.it.q;
      var pid = FP.uid('rv');
      var panel = h('div', { class: 'rv-panel', id: pid, hidden: x.ok },
        h('p', null, h('b', null, 'Your answer: '), answerText(q, x.a)),
        h('p', null, h('b', null, 'Right answer: '), correctText(q)),
        h('div', { class: 'prose', html: P(q.explain) }), cite(q.cite));
      var head = h('button', { class: 'rv-head', 'aria-expanded': String(!x.ok), 'aria-controls': pid },
        h('span', { class: 'rv-ico ' + (x.ok ? 'is-ok' : 'is-bad') }, FP.icon(x.ok ? 'check' : 'x', 16)),
        h('span', { class: 'rv-n' }, String(i + 1)),
        h('span', { class: 'rv-stem' }, FP.strip(q.stem).slice(0, 140) + (FP.strip(q.stem).length > 140 ? '…' : '')),
        x.it.slot.critical ? h('span', { class: 'badge badge-crit' }, 'Critical') : null);
      head.addEventListener('click', function () { var o = head.getAttribute('aria-expanded') !== 'true'; head.setAttribute('aria-expanded', String(o)); panel.hidden = !o; });
      list.appendChild(h('li', { class: 'rv-item' + (x.ok ? '' : ' is-missed') }, head, panel));
    });
    col.appendChild(list);
  }

  /* ---------------- certificate ---------------- */
  function renderCertificate(host) {
    host.innerHTML = '';
    var st = ES(), eng = E(), meta = C().meta || {};
    host.appendChild(band('Knowledge component', 'Certificate', null, null));
    var col = h('div', { class: 'col' });
    host.appendChild(col);
    var sample = !st.p;
    if (sample && !CFG.reviewMode) {
      col.appendChild(card('award', 'Your certificate appears after you pass the final assessment.', h('p', null, 'Pass with ' + Math.round(rules().pass * 100) + '% overall and every critical item correct.'), [h('a', { class: 'btn btn-primary', href: '#exam' }, 'Go to the assessment', FP.icon('arrow-right', 16))]));
      return;
    }
    var name = eng.learnerName();
    if (!name && !sample) {
      var id = 'cert-name';
      var inp = h('input', { id: id, class: 'field', type: 'text', autocomplete: 'name', placeholder: 'First and last name' });
      col.appendChild(h('form', { class: 'name-form', on: { submit: function (e) { e.preventDefault(); if (inp.value.trim()) { eng.setLearnerName(inp.value.trim()); renderCertificate(host); } } } },
        h('label', { for: id }, 'Name as it should appear on the certificate'), h('div', { class: 'name-row' }, inp, h('button', { class: 'btn btn-primary', type: 'submit' }, 'Save'))));
    }
    var brand = CFG.brand || {};
    var date = st.t ? new Date(st.t + 'T12:00:00') : new Date();
    var dateStr = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    col.appendChild(h('div', { class: 'cert' + (sample ? ' is-sample' : '') },
      sample ? h('p', { class: 'cert-sample', 'aria-hidden': 'true' }, 'Sample') : null,
      h('div', { class: 'cert-top' }, h('span', { class: 'tb-mark' }), h('b', { class: 'cert-brand' }, brand.name || 'UPCHURCH'), h('span', { class: 'cert-tag' }, brand.tagline || 'Safety Training')),
      h('div', { class: 'cert-stripe', 'aria-hidden': 'true' }),
      h('p', { class: 'kicker' }, 'Certificate of completion'),
      h('p', { class: 'cert-name' }, sample ? 'Learner Name' : (name || '—')),
      h('p', { class: 'cert-course' }, meta.title || 'Fall Protection Competent Person'),
      h('p', { class: 'cert-words' }, meta.certificate || ''),
      h('div', { class: 'cert-meta' },
        h('div', null, h('span', null, 'Date'), h('b', null, dateStr)),
        h('div', null, h('span', null, 'Score'), h('b', null, sample ? '—' : st.s + '%')),
        h('div', null, h('span', null, 'Certificate ID'), h('b', { class: 'mono' }, sample ? 'FPCP-SAMPLE' : st.id)),
        h('div', null, h('span', null, 'Standards'), h('b', null, '29 CFR 1926.32(f) · Subpart M · ANSI/ASSP Z359.2')))));
    var acts = [h('a', { class: 'btn btn-primary', href: '#verification' }, FP.icon('shield', 18), 'Next: field verification')];
    if (CFG.allowPrint !== false && typeof root.print === 'function') acts.push(h('button', { class: 'btn btn-quiet', on: { click: function () { root.print(); } } }, FP.icon('file', 16), 'Print certificate'));
    col.appendChild(h('div', { class: 'exam-actions' }, acts));
  }

  /* ---------------- field verification ---------------- */
  function renderVerification(host) {
    host.innerHTML = '';
    host.appendChild(band('Designation', 'Field verification sign-off', 'Completed by your safety manager on a live site', 'img_m9_hero'));
    var col = h('div', { class: 'col' });
    host.appendChild(col);
    var st = FP.store.get('fieldprep', {}) || {};
    col.appendChild(h('p', { class: 'lead' }, 'The online course is the knowledge half. Your safety manager watches you do these eight things on a real site and marks each one observed, pass, or redo, with the date and a signature. You are designated only after this is signed and your employer gives you the authority to take prompt corrective measures.'));
    var tbl = h('table', { class: 'fv-table' },
      h('thead', null, h('tr', null, h('th', { scope: 'col' }, '#'), h('th', { scope: 'col' }, 'Task observed on site'), h('th', { scope: 'col' }, 'Practiced in'), h('th', { scope: 'col' }, 'I\'m ready'))),
      h('tbody', null, FIELD_ITEMS.map(function (it, i) {
        var id = 'fv-' + i;
        var cb = h('input', { type: 'checkbox', id: id });
        cb.checked = !!st[i];
        cb.addEventListener('change', function () { st[i] = cb.checked ? 1 : 0; FP.store.set('fieldprep', st); });
        return h('tr', null, h('td', { class: 'fv-n' }, String(i + 1)), h('th', { scope: 'row' }, h('label', { for: id }, it[0])), h('td', { class: 'fv-mod' }, it[1]), h('td', { class: 'fv-cb' }, cb));
      })));
    col.appendChild(h('div', { class: 'b-table' }, h('div', { class: 'table-wrap' }, tbl),
      h('p', { class: 'table-note' }, 'The "I\'m ready" column is a private self-check saved on this device. The real sign-off happens on paper or in your safety system.')));
    col.appendChild(h('div', { class: 'fv-sign' },
      h('div', null, h('span', null, 'Safety manager signature')), h('div', null, h('span', null, 'Date')),
      h('div', null, h('span', null, 'Candidate signature')), h('div', null, h('span', null, 'Site'))));
    FP.renderBlock({ type: 'download', title: 'Field verification sign-off (printable)', desc: 'One page. Each item marked observed, pass, or redo, with date and signature.', file: 'jobaids/field-verification-signoff.html', pdf: 'jobaids/pdf/field-verification-signoff.pdf' }, col, null, null, 'fv-dl');
  }

  FP.exam = { renderExam: renderExam, renderCertificate: renderCertificate, renderVerification: renderVerification, isCorrect: isCorrect, fieldItems: FIELD_ITEMS };
})(window);
