/* ==========================================================================
   Core block renderers (BUILD-SPEC §4, builder A).
   Each renderer: (block, ctx) → HTMLElement | null. Interactive ones call ctx.complete().
   ========================================================================== */
(function (root) {
  'use strict';
  var FP = root.FP, h = FP.h, P = FP.paras;
  var CFG = root.FP_CONFIG || {};
  function reg(t, fn) { FP.register(t, fn); }
  function html(tag, cls, s) { return h(tag, { class: cls, html: s == null ? '' : String(s) }); }
  function kick(t) { return t ? h('p', { class: 'kicker' }, t) : null; }
  function title(t, lvl) { return t ? h(lvl || 'h3', { class: 'blk-title', html: t }) : null; }
  function cite(c) {
    if (!c) return null;
    var list = Array.isArray(c) ? c : [c];
    return h('p', { class: 'cite-row' }, h('span', { class: 'cite-label' }, 'Receipt'), list.map(function (x) { return h('cite', { html: x }); }));
  }
  var LETTERS = 'ABCDEFGHIJ';

  /* ---------- hero ---------- */
  reg('hero', function (b) {
    var md = FP.media(b.media);
    return h('div', { class: 'b-hero' + (md ? ' has-media' : '') },
      md && md.type === 'image' ? h('figure', { class: 'b-hero-media' }, h('img', { src: md.src, alt: md.alt || '', loading: 'lazy' }),
        md.credit ? h('figcaption', { class: 'credit-line' }, md.credit) : null) : null,
      h('div', { class: 'b-hero-copy' }, kick(b.kicker), h('h2', { class: 'b-hero-title', html: b.title }), b.text ? html('div', 'b-hero-text', P(b.text)) : null));
  });

  /* ---------- text ---------- */
  reg('text', function (b) {
    return h('div', { class: 'b-text' }, b.heading ? h('h3', { class: 'blk-title', html: b.heading }) : null, html('div', 'prose', P(b.body)));
  });

  /* ---------- quote ---------- */
  reg('quote', function (b) {
    var c = FP.char(b.speaker);
    return h('figure', { class: 'b-quote mood-' + (b.mood || 'calm') + ' who-' + b.speaker },
      h('div', { class: 'q-who' }, FP.avatar(b.speaker, 72, b.mood),
        h('figcaption', null, h('b', null, c.name), h('span', null, c.role || ''))),
      h('blockquote', { class: 'q-bubble' }, html('p', 'q-text', b.text)));
  });

  /* ---------- dialogue ---------- */
  reg('dialogue', function (b, ctx) {
    var lines = b.lines || [];
    var shown = ctx.isComplete() ? lines.length : 1;
    var ol = h('ol', { class: 'dl-lines', 'aria-live': 'polite' });
    var nextBtn = h('button', { class: 'btn btn-secondary dl-next' }, 'Next', FP.icon('arrow-right', 16));
    var allBtn = h('button', { class: 'btn-link dl-all' }, 'Show the whole conversation');
    function line(l) {
      var c = FP.char(l.speaker), right = l.speaker === 'tasha';
      return h('li', { class: 'dl-line' + (right ? ' is-right' : '') + ' who-' + l.speaker },
        FP.avatar(l.speaker, 44, l.mood),
        h('div', { class: 'dl-bubble' }, h('p', { class: 'dl-name' }, c.name), html('p', 'dl-text', l.text)));
    }
    function draw() {
      ol.innerHTML = '';
      lines.slice(0, shown).forEach(function (l, i) { var li = line(l); if (i === shown - 1 && shown > 1) li.classList.add('is-new'); ol.appendChild(li); });
      var done = shown >= lines.length;
      nextBtn.hidden = done; allBtn.hidden = done;
      if (done) ctx.complete();
    }
    nextBtn.addEventListener('click', function () { shown = Math.min(lines.length, shown + 1); draw(); });
    allBtn.addEventListener('click', function () { shown = lines.length; draw(); });
    draw();
    return h('div', { class: 'b-dialogue' }, title(b.title), ol, h('div', { class: 'dl-ctrl' }, nextBtn, allBtn));
  });

  /* ---------- image / art ---------- */
  reg('image', function (b) {
    var md = FP.media(b.media);
    if (!md || md.type !== 'image') return null;
    return h('figure', { class: 'b-image size-' + (b.size || 'wide') },
      h('img', { src: md.src, alt: md.alt || '', loading: 'lazy' }),
      h('figcaption', null, b.caption ? html('span', 'cap', b.caption) : null, md.credit ? h('span', { class: 'credit-line' }, md.credit + (md.license ? ' · ' + md.license : '')) : null));
  });
  reg('art', function (b) {
    return h('figure', { class: 'b-art size-' + (b.size || 'wide') },
      h('img', { src: b.src, alt: b.alt || '', loading: 'lazy' }),
      b.caption ? h('figcaption', null, html('span', 'cap', b.caption)) : null);
  });

  /* ---------- video ---------- */
  reg('video', function (b) {
    var md = FP.media(b.media);
    if (!md || md.type !== 'video' || !md.youtube) return null;
    var url = md.url || ('https://www.youtube.com/watch?v=' + md.youtube);
    var poster = md.poster ? h('img', { class: 'vid-poster', src: md.poster, alt: '', loading: 'lazy' }) : h('div', { class: 'vid-poster vid-poster--blank' }, FP.art.frame());
    var play = h('span', { class: 'vid-play', 'aria-hidden': 'true' }, FP.icon('play', 30));
    var label = 'Play video: ' + (md.title || 'video');
    var frame;
    if (CFG.videoMode === 'link') {
      frame = h('a', { class: 'vid-frame', href: url, target: '_blank', rel: 'noopener', 'aria-label': label + ' (opens YouTube in a new tab)' }, poster, play,
        h('span', { class: 'vid-chip' }, FP.icon('external', 14), ' Opens on YouTube'));
    } else {
      frame = h('button', { class: 'vid-frame', 'aria-label': label }, poster, play);
      frame.addEventListener('click', function () {
        var ifr = h('iframe', { src: 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(md.youtube) + '?autoplay=1&rel=0&modestbranding=1' + (md.start ? '&start=' + (+md.start) : ''),
          title: md.title || 'Video', allow: 'autoplay; encrypted-media; picture-in-picture; fullscreen', allowfullscreen: true, loading: 'lazy', referrerpolicy: 'strict-origin-when-cross-origin' });
        var holder = h('div', { class: 'vid-frame is-playing' }, ifr);
        frame.replaceWith(holder);
      });
    }
    return h('figure', { class: 'b-video' }, frame,
      h('figcaption', { class: 'vid-cap' },
        h('p', { class: 'vid-title', html: md.title || '' }),
        h('p', { class: 'vid-meta' }, [md.channel, md.duration, 'YouTube'].filter(Boolean).join(' · '), ' ',
          h('a', { href: url, target: '_blank', rel: 'noopener' }, 'Open on YouTube', FP.icon('external', 12))),
        (b.watchFor || md.why) ? h('p', { class: 'vid-watch' }, h('b', null, 'Watch for: '), h('span', { html: String(b.watchFor || md.why).replace(/^\s*watch for:?\s*/i, '') })) : null,
        b.caption ? html('p', 'cap', b.caption) : null));
  });

  /* ---------- callout ---------- */
  var CV = {
    'field-check': ['eye', 'Field check'], receipt: ['file', 'The receipt'], warning: ['alert', 'Watch out'],
    tip: ['star', 'Pro tip'], skip: ['target', 'You probably already know this'], note: ['book', 'Note'], monday: ['wrench', 'Use it Monday']
  };
  reg('callout', function (b, ctx) {
    var v = CV[b.variant] || CV.note;
    var box = h('aside', { class: 'b-callout cv-' + (b.variant || 'note') },
      h('p', { class: 'cv-label' }, FP.icon(v[0], 18), h('span', null, v[1])),
      b.title ? h('h4', { class: 'cv-title', html: b.title }) : null,
      html('div', 'prose cv-body', P(b.body)),
      cite(b.cite));
    if (b.input) {
      var saved = ctx.load() || {};
      var id = 'in-' + String(ctx.key).replace(/[^a-z0-9_-]/gi, '_');
      var ta = h('textarea', { id: id, class: 'field', rows: '3', placeholder: b.placeholder || 'Jot it down. Only you can see this.' });
      ta.value = saved.text || '';
      var st = h('span', { class: 'saved-note' }, saved.text ? 'Saved on this device.' : 'Private. Saved only on this device.');
      ta.addEventListener('input', function () { ctx.save({ text: ta.value }); st.textContent = 'Saved on this device.'; });
      box.appendChild(h('div', { class: 'cv-input' }, h('label', { for: id, class: 'sr-only' }, 'Your answer'), ta, st));
    }
    return box;
  });

  /* ---------- stats ---------- */
  reg('stats', function (b) {
    return h('div', { class: 'b-stats' },
      h('div', { class: 'stats-grid n' + Math.min(4, (b.items || []).length) }, (b.items || []).map(function (s) {
        return h('div', { class: 'stat' }, h('p', { class: 'stat-v', html: s.value }), html('p', 'stat-l', s.label), s.source ? h('p', { class: 'stat-s', html: s.source }) : null);
      })),
      b.note ? html('p', 'stats-note', b.note) : null);
  });

  /* ---------- cards (flip; myth or field truth) ---------- */
  reg('cards', function (b, ctx) {
    var myth = b.mode === 'myth';
    var st = ctx.load() || { flipped: {}, calls: {} };
    var total = (b.cards || []).length;
    var count = h('p', { class: 'cards-count' });
    function upd() {
      var n = Object.keys(st.flipped).length;
      count.textContent = n + ' of ' + total + ' flipped';
      if (n >= total) ctx.complete();
    }
    var grid = h('div', { class: 'cards-grid' });
    (b.cards || []).forEach(function (c, i) {
      var card = h('div', { class: 'fcard' + (st.flipped[i] ? ' is-flipped' : '') });
      var verdict = c.verdict === 'myth' ? 'Myth' : 'Field truth';
      function flip(call) {
        st.flipped[i] = 1; if (call) st.calls[i] = call; ctx.save(st);
        card.classList.add('is-flipped'); drawBack(); upd();
        var b2 = card.querySelector('.fcard-back'); if (b2) b2.focus({ preventScroll: true });
      }
      var front = h('div', { class: 'fcard-face fcard-front' },
        h('p', { class: 'fcard-tag' }, myth ? 'Myth or field truth?' : 'Card ' + (i + 1)),
        html('p', 'fcard-text', c.front),
        myth ? h('div', { class: 'fcard-calls' },
          h('button', { class: 'btn btn-chip call-myth', on: { click: function () { flip('myth'); } } }, 'Myth'),
          h('button', { class: 'btn btn-chip call-truth', on: { click: function () { flip('truth'); } } }, 'Field truth'))
          : h('button', { class: 'btn btn-chip', on: { click: function () { flip(); } } }, 'Flip', FP.icon('refresh', 14)));
      var back = h('div', { class: 'fcard-face fcard-back', tabindex: '-1' });
      function drawBack() {
        back.innerHTML = '';
        if (myth && c.verdict) {
          var call = st.calls[i];
          var right = call ? call === c.verdict : null;
          back.appendChild(h('p', { class: 'fcard-verdict v-' + c.verdict }, verdict,
            right === null ? null : h('span', { class: 'fcard-you ' + (right ? 'is-right' : 'is-wrong') }, right ? 'You called it' : 'Not this time')));
        }
        back.appendChild(html('div', 'fcard-text', P(c.back)));
        if (c.cite) back.appendChild(cite(c.cite));
        back.appendChild(h('button', { class: 'btn-link fcard-again', on: { click: function () { card.classList.remove('is-flipped'); } } }, FP.icon('refresh', 13), ' Front'));
      }
      if (st.flipped[i]) drawBack();
      card.appendChild(h('div', { class: 'fcard-inner' }, front, back));
      grid.appendChild(card);
    });
    upd();
    return h('div', { class: 'b-cards mode-' + (myth ? 'myth' : 'plain') },
      title(b.title), myth ? h('p', { class: 'hint' }, 'Make your call on each card, then read the back.') : h('p', { class: 'hint' }, 'Select a card to flip it.'),
      grid, count);
  });

  /* ---------- accordion ---------- */
  reg('accordion', function (b, ctx) {
    var opened = {};
    var items = b.items || [];
    return h('div', { class: 'b-accordion' }, title(b.title), items.map(function (it, i) {
      var pid = FP.uid('acc');
      var panel = h('div', { class: 'acc-panel', id: pid, hidden: true, role: 'region' }, html('div', 'prose', P(it.body)));
      var btn = h('button', { class: 'acc-head', 'aria-expanded': 'false', 'aria-controls': pid },
        h('span', { class: 'acc-title', html: it.title }), h('span', { class: 'acc-ico' }, FP.icon('chevron-down', 18)));
      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') !== 'true';
        btn.setAttribute('aria-expanded', String(open)); panel.hidden = !open;
        if (open) { opened[i] = 1; if (Object.keys(opened).length >= items.length) ctx.complete(); }
      });
      return h('div', { class: 'acc-item' }, btn, panel);
    }));
  });

  /* ---------- tabs ---------- */
  reg('tabs', function (b, ctx) {
    var items = b.items || [];
    var seen = {};
    var list = h('div', { class: 'tab-list', role: 'tablist' });
    var panels = h('div', { class: 'tab-panels' });
    var btns = [];
    function select(i, focus) {
      btns.forEach(function (bt, j) { bt.setAttribute('aria-selected', String(i === j)); bt.tabIndex = i === j ? 0 : -1; });
      Array.prototype.forEach.call(panels.children, function (p, j) { p.hidden = i !== j; });
      seen[i] = 1; if (Object.keys(seen).length >= items.length) ctx.complete();
      if (focus) btns[i].focus();
    }
    items.forEach(function (it, i) {
      var id = FP.uid('tab');
      var bt = h('button', { class: 'tab', role: 'tab', id: id + '-t', 'aria-controls': id, html: it.title });
      bt.addEventListener('click', function () { select(i); });
      bt.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); select((i + 1) % items.length, true); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); select((i - 1 + items.length) % items.length, true); }
      });
      btns.push(bt); list.appendChild(bt);
      var md = FP.media(it.media);
      panels.appendChild(h('div', { class: 'tab-panel', role: 'tabpanel', id: id, 'aria-labelledby': id + '-t' },
        md && md.type === 'image' ? h('img', { class: 'tab-img', src: md.src, alt: md.alt || '', loading: 'lazy' }) : null,
        html('div', 'prose', P(it.body))));
    });
    select(0);
    return h('div', { class: 'b-tabs' }, title(b.title), list, panels);
  });

  /* ---------- process (one step at a time) ---------- */
  reg('process', function (b, ctx) {
    var steps = b.steps || [];
    var i = 0;
    var stage = h('div', { class: 'pr-stage', 'aria-live': 'polite' });
    var dots = h('div', { class: 'pr-dots' });
    var prev = h('button', { class: 'btn btn-quiet pr-prev', 'aria-label': 'Previous step' }, FP.icon('arrow-left', 18));
    var next = h('button', { class: 'btn btn-secondary pr-next' }, 'Next step', FP.icon('arrow-right', 16));
    function draw() {
      var s = steps[i]; var md = FP.media(s.media);
      stage.innerHTML = '';
      stage.appendChild(h('div', { class: 'pr-card' },
        h('p', { class: 'pr-num' }, h('b', null, String(i + 1)), h('span', null, 'of ' + steps.length)),
        h('h4', { class: 'pr-title', html: s.title }),
        md && md.type === 'image' ? h('img', { class: 'pr-img', src: md.src, alt: md.alt || '', loading: 'lazy' }) : null,
        html('div', 'prose', P(s.body))));
      dots.innerHTML = '';
      steps.forEach(function (_, j) { dots.appendChild(h('button', { class: 'pr-dot' + (j === i ? ' is-on' : '') + (j < i ? ' is-past' : ''), 'aria-label': 'Step ' + (j + 1), on: { click: function () { i = j; draw(); } } })); });
      prev.disabled = i === 0;
      next.hidden = i >= steps.length - 1;
      if (i >= steps.length - 1) ctx.complete();
    }
    prev.addEventListener('click', function () { if (i > 0) { i--; draw(); } });
    next.addEventListener('click', function () { if (i < steps.length - 1) { i++; draw(); } });
    draw();
    return h('div', { class: 'b-process' }, title(b.title), stage, h('div', { class: 'pr-nav' }, prev, dots, next));
  });

  /* ---------- timeline ---------- */
  reg('timeline', function (b) {
    return h('div', { class: 'b-timeline' }, title(b.title), h('ol', { class: 'tl' }, (b.items || []).map(function (it) {
      return h('li', { class: 'tl-item' }, h('p', { class: 'tl-label', html: it.label || '' }), h('div', { class: 'tl-body' }, h('h4', { class: 'tl-title', html: it.title || '' }), html('div', 'prose', P(it.body))));
    })));
  });

  /* ---------- labeled graphic ---------- */
  reg('labeled', function (b, ctx) {
    var md = FP.media(b.media);
    var src = b.src || (md && md.src);
    var seen = {};
    var markers = b.markers || [];
    var detail = h('div', { class: 'lg-detail', 'aria-live': 'polite' }, h('p', { class: 'hint' }, 'Select each numbered marker. ' + markers.length + ' to explore.'));
    var stage = h('div', { class: 'lg-stage' }, src ? h('img', { src: src, alt: b.alt || (md && md.alt) || '' }) : null);
    var btns = [];
    markers.forEach(function (mk, i) {
      var bt = h('button', { class: 'lg-marker', style: { left: mk.x + '%', top: mk.y + '%' }, 'aria-label': (i + 1) + '. ' + FP.strip(mk.title) }, String(i + 1));
      bt.addEventListener('click', function () {
        btns.forEach(function (x) { x.classList.remove('is-active'); });
        bt.classList.add('is-active', 'is-seen');
        seen[i] = 1;
        detail.innerHTML = '';
        detail.appendChild(h('div', { class: 'lg-card' }, h('p', { class: 'lg-num' }, String(i + 1)), h('div', null, h('h4', { class: 'lg-title', html: mk.title }), html('div', 'prose', P(mk.body)))));
        if (Object.keys(seen).length >= markers.length) ctx.complete();
      });
      btns.push(bt); stage.appendChild(bt);
    });
    return h('figure', { class: 'b-labeled' }, title(b.title), stage, detail, b.caption ? h('figcaption', { class: 'cap', html: b.caption }) : null);
  });

  /* ---------- table ---------- */
  reg('table', function (b) {
    return h('div', { class: 'b-table' }, title(b.title),
      h('div', { class: 'table-wrap' }, h('table', null,
        h('thead', null, h('tr', null, (b.headers || []).map(function (x) { return h('th', { scope: 'col', html: x }); }))),
        h('tbody', null, (b.rows || []).map(function (r) { return h('tr', null, r.map(function (c, j) { return h(j === 0 ? 'th' : 'td', { scope: j === 0 ? 'row' : null, html: c }); })); })))),
      b.note ? html('p', 'table-note', b.note) : null);
  });

  /* ---------- pyramid ---------- */
  reg('pyramid', function (b, ctx) {
    var lv = b.levels || [];
    var sel = 0, seen = {};
    var detail = h('div', { class: 'py-detail', 'aria-live': 'polite' });
    var stack = h('div', { class: 'py-stack' });
    var btns = lv.map(function (l, i) {
      var w = 46 + (54 * (i / Math.max(1, lv.length - 1)));
      var bt = h('button', { class: 'py-level', style: { width: w + '%' }, 'aria-label': (i + 1) + '. ' + FP.strip(l.title) },
        h('span', { class: 'py-n' }, String(i + 1)), h('span', { class: 'py-t', html: l.title }));
      bt.addEventListener('click', function () { sel = i; draw(); });
      stack.appendChild(bt); return bt;
    });
    function draw() {
      btns.forEach(function (bt, i) { bt.classList.toggle('is-on', i === sel); bt.setAttribute('aria-pressed', String(i === sel)); });
      seen[sel] = 1;
      var l = lv[sel];
      detail.innerHTML = '';
      detail.appendChild(h('h4', { class: 'py-dt', html: (sel + 1) + '. ' + l.title }));
      detail.appendChild(html('div', 'prose', P(l.body)));
      if (Object.keys(seen).length >= lv.length) ctx.complete();
    }
    draw();
    return h('div', { class: 'b-pyramid' }, title(b.title),
      h('div', { class: 'py-wrap' }, h('div', { class: 'py-col' }, h('p', { class: 'py-end' }, 'Most effective'), stack, h('p', { class: 'py-end' }, 'Least effective')), detail));
  });

  /* ---------- poll (static peer results) ---------- */
  reg('poll', function (b, ctx) {
    var st = ctx.load();
    var box = h('div', { class: 'b-poll' });
    var opts = h('div', { class: 'poll-opts' });
    var res = h('div', { class: 'poll-res', 'aria-live': 'polite' });
    function show(choice) {
      opts.hidden = true; res.innerHTML = '';
      (b.options || []).forEach(function (o, i) {
        var me = i === choice;
        res.appendChild(h('div', { class: 'poll-row' + (me ? ' is-me' : '') },
          h('div', { class: 'poll-lab' }, h('span', { html: o.label }), me ? h('span', { class: 'badge' }, 'You') : null, h('b', null, o.pct + '%')),
          h('div', { class: 'poll-track' }, h('span', { class: 'poll-fill', style: { width: '0%' }, 'data-w': o.pct + '%' }))));
      });
      res.appendChild(h('p', { class: 'poll-note', html: b.note || 'Peer results are scripted for this course from foremen\'s typical answers.' }));
      requestAnimationFrame(function () { requestAnimationFrame(function () { res.querySelectorAll('.poll-fill').forEach(function (f) { f.style.width = f.getAttribute('data-w'); }); }); });
    }
    (b.options || []).forEach(function (o, i) {
      opts.appendChild(h('button', { class: 'opt', on: { click: function () { ctx.save({ c: i }); show(i); ctx.complete({ choice: i }); } } }, h('span', { class: 'opt-dot' }), h('span', { html: o.label })));
    });
    box.appendChild(h('p', { class: 'kicker' }, FP.icon('list', 16), ' Quick poll'));
    box.appendChild(html('p', 'poll-q', b.question));
    box.appendChild(opts); box.appendChild(res);
    if (st && st.c != null) show(st.c);
    return box;
  });

  /* ---------- reflect (gut check) ---------- */
  reg('reflect', function (b, ctx) {
    var saved = ctx.load() || {};
    var id = 'rf-' + String(ctx.key).replace(/[^a-z0-9_-]/gi, '_');
    var ta = h('textarea', { id: id, class: 'field', rows: '3', placeholder: b.placeholder || 'One line is plenty.' });
    ta.value = saved.text || '';
    var st = h('span', { class: 'saved-note' }, saved.text ? 'Saved on this device.' : 'Private: not graded, not sent anywhere.');
    var btn = h('button', { class: 'btn btn-secondary' }, FP.icon('check', 16), 'Save');
    btn.addEventListener('click', function () { ctx.save({ text: ta.value }); st.textContent = 'Saved on this device.'; ctx.complete(); });
    ta.addEventListener('input', function () { ctx.save({ text: ta.value }); });
    return h('div', { class: 'b-reflect' },
      h('p', { class: 'kicker' }, FP.icon('chat', 16), ' Gut check · just for you'),
      h('label', { for: id, class: 'rf-prompt', html: b.prompt }),
      ta, h('div', { class: 'rf-actions' }, btn, st));
  });

  /* ---------- mcq (practice) ---------- */
  function mcqWidget(b, ctx, opts) {
    opts = opts || {};
    var multi = !!b.multi;
    var picked = {};
    var submitted = false;
    var box = h('div', { class: 'b-mcq' + (multi ? ' is-multi' : '') });
    var optsEl = h('div', { class: 'mcq-opts', role: multi ? 'group' : 'radiogroup', 'aria-label': FP.strip(b.question) });
    var fb = h('div', { class: 'mcq-fb', 'aria-live': 'polite', hidden: true });
    var submit = h('button', { class: 'btn btn-primary mcq-submit', disabled: true }, 'Submit');
    var retry = h('button', { class: 'btn btn-quiet mcq-retry', hidden: true }, FP.icon('refresh', 16), 'Try again');
    var btns = (b.options || []).map(function (o, i) {
      var bt = h('button', { class: 'opt', role: multi ? 'checkbox' : 'radio', 'aria-checked': 'false' },
        h('span', { class: 'opt-key' }, LETTERS[i]), h('span', { class: 'opt-text', html: o.text }));
      bt.addEventListener('click', function () {
        if (submitted) return;
        if (multi) { if (picked[i]) delete picked[i]; else picked[i] = 1; }
        else { picked = {}; picked[i] = 1; }
        btns.forEach(function (x, j) { x.classList.toggle('is-picked', !!picked[j]); x.setAttribute('aria-checked', String(!!picked[j])); });
        submit.disabled = !Object.keys(picked).length;
      });
      optsEl.appendChild(bt);
      return bt;
    });
    function grade() {
      submitted = true;
      var correctSet = (b.options || []).map(function (o) { return !!o.correct; });
      var allRight = correctSet.every(function (c, i) { return c === !!picked[i]; });
      var anyRight = correctSet.some(function (c, i) { return c && picked[i]; });
      btns.forEach(function (x, i) {
        var o = b.options[i];
        x.disabled = true;
        x.classList.toggle('is-correct', !!o.correct);
        x.classList.toggle('is-wrong', !o.correct && !!picked[i]);
        var old = x.querySelector('.opt-fb'); if (old) old.remove();
        if (o.fb && (picked[i] || o.correct)) x.appendChild(h('span', { class: 'opt-fb', html: o.fb }));
      });
      fb.hidden = false; fb.innerHTML = '';
      var cls = allRight ? 'good' : anyRight ? 'ok' : 'bad';
      fb.className = 'mcq-fb fb-' + cls;
      fb.appendChild(h('p', { class: 'fb-head' }, FP.icon(allRight ? 'check' : 'alert', 18), allRight ? 'Right call.' : anyRight ? 'Partly right.' : 'Not this time.'));
      if (b.explain) fb.appendChild(html('div', 'prose', P(b.explain)));
      if (b.cite) fb.appendChild(cite(b.cite));
      submit.hidden = true; retry.hidden = !!opts.noRetry;
      ctx.save({ picked: Object.keys(picked).map(Number) });
      ctx.complete({ correct: allRight });
      if (opts.onGrade) opts.onGrade(allRight);
    }
    submit.addEventListener('click', grade);
    retry.addEventListener('click', function () {
      submitted = false; picked = {}; fb.hidden = true; submit.hidden = false; submit.disabled = true; retry.hidden = true;
      btns.forEach(function (x) { x.disabled = false; x.classList.remove('is-picked', 'is-correct', 'is-wrong'); x.setAttribute('aria-checked', 'false'); var f = x.querySelector('.opt-fb'); if (f) f.remove(); });
    });
    box.appendChild(h('p', { class: 'kicker' }, FP.icon('target', 16), ' ' + (b.kicker || 'Your call')));
    box.appendChild(html('p', 'mcq-q', b.question || b.stem));
    if (multi) box.appendChild(h('p', { class: 'hint' }, 'Select all that apply.'));
    box.appendChild(optsEl);
    box.appendChild(h('div', { class: 'mcq-actions' }, submit, retry));
    box.appendChild(fb);
    var saved = ctx.load && ctx.load();
    if (saved && saved.picked && saved.picked.length && ctx.isComplete && ctx.isComplete()) {
      saved.picked.forEach(function (i) { picked[i] = 1; btns[i] && btns[i].classList.add('is-picked'); });
      grade();
    }
    return box;
  }
  reg('mcq', function (b, ctx) { return mcqWidget(b, ctx); });
  FP.mcqWidget = mcqWidget;

  /* ---------- testout ---------- */
  reg('testout', function (b, ctx) {
    var qs = b.questions || [];
    var box = h('div', { class: 'b-testout' });
    var body = h('div', { class: 'to-body', hidden: true });
    var result = h('div', { class: 'to-result', 'aria-live': 'polite' });
    var take = h('button', { class: 'btn btn-primary' }, 'Take the test-out', FP.icon('arrow-right', 16));
    var skip = h('button', { class: 'btn btn-quiet' }, 'No thanks, I\'ll take the lessons');
    var answers = {};
    take.addEventListener('click', function () { body.hidden = false; take.hidden = true; skip.hidden = true; body.querySelector('.opt') && body.querySelector('.opt').focus(); });
    skip.addEventListener('click', function () { take.hidden = true; skip.hidden = true; result.innerHTML = ''; result.appendChild(h('p', { class: 'muted' }, 'Got it. The lessons below cover it all.')); ctx.complete({ skipped: true }); });
    qs.forEach(function (q, qi) {
      var multi = !!q.multi || q.options.filter(function (o) { return o.correct; }).length > 1;
      var row = h('fieldset', { class: 'to-q' }, h('legend', { html: (qi + 1) + '. ' + q.question }));
      var picks = {};
      var obtns = q.options.map(function (o, i) {
        var bt = h('button', { class: 'opt opt--compact', type: 'button', role: multi ? 'checkbox' : 'radio', 'aria-checked': 'false' }, h('span', { class: 'opt-key' }, LETTERS[i]), h('span', { class: 'opt-text', html: o.text }));
        bt.addEventListener('click', function () {
          if (multi) { if (picks[i]) delete picks[i]; else picks[i] = 1; } else { picks = {}; picks[i] = 1; }
          answers[qi] = picks;
          obtns.forEach(function (x, j) { x.classList.toggle('is-picked', !!picks[j]); x.setAttribute('aria-checked', String(!!picks[j])); });
        });
        row.appendChild(bt); return bt;
      });
      row._btns = obtns;
      body.appendChild(row);
    });
    var check = h('button', { class: 'btn btn-primary' }, 'Check my answers');
    check.addEventListener('click', function () {
      var allRight = true, missed = [];
      qs.forEach(function (q, qi) {
        var p = answers[qi] || {};
        var ok = q.options.every(function (o, i) { return !!o.correct === !!p[i]; });
        if (!ok) { allRight = false; missed.push(qi + 1); }
        var row = body.children[qi];
        row.classList.toggle('is-right', ok); row.classList.toggle('is-wrong', !ok);
        row._btns.forEach(function (x, i) { x.disabled = true; x.classList.toggle('is-correct', !!q.options[i].correct); x.classList.toggle('is-wrong', !q.options[i].correct && !!p[i]); });
      });
      check.hidden = true;
      result.innerHTML = '';
      if (allRight) {
        var href = FP.engine && FP.engine.skipLessons ? FP.engine.skipLessons(ctx.module, b.skips || []) : null;
        result.appendChild(h('div', { class: 'to-pass' }, FP.icon('check', 20), h('div', null, h('p', null, h('b', null, 'You know this. '), 'The next ' + (b.skips || []).length + ' lesson' + ((b.skips || []).length === 1 ? ' is' : 's are') + ' marked complete. Skim them later if you want.'),
          href ? h('a', { class: 'btn btn-primary', href: href }, 'Skip ahead', FP.icon('arrow-right', 16)) : null)));
      } else {
        result.appendChild(h('p', { class: 'to-fail' }, 'You missed question' + (missed.length > 1 ? 's ' : ' ') + missed.join(', ') + '. No problem. The lessons below fill those gaps.'));
      }
      ctx.complete({ passed: allRight });
    });
    body.appendChild(check);
    box.appendChild(h('div', { class: 'to-head' }, h('span', { class: 'to-ico' }, FP.icon('target', 22)),
      h('div', null, h('p', { class: 'kicker' }, 'You probably already know this'), h('h3', { class: 'blk-title', html: b.title || 'Test out of the basics' }), b.text ? html('div', 'prose', P(b.text)) : null)));
    box.appendChild(h('div', { class: 'to-actions' }, take, skip));
    box.appendChild(body); box.appendChild(result);
    if (ctx.isComplete()) { take.hidden = true; skip.hidden = true; result.appendChild(h('p', { class: 'muted' }, FP.icon('check', 14), ' Done. You can take it again by reloading this lesson.')); }
    return box;
  });

  /* ---------- story (chapter cards with choices) ---------- */
  reg('story', function (b, ctx) {
    var ch = b.chapters || [];
    var st = ctx.load() || { at: 0, picks: {} };
    var c = FP.char(b.speaker);
    var stage = h('article', { class: 'st-chapter', 'aria-live': 'polite' });
    var dots = h('div', { class: 'st-dots' });
    var nav = h('div', { class: 'st-nav' });
    function draw() {
      var i = st.at, chap = ch[i];
      stage.innerHTML = '';
      stage.appendChild(h('p', { class: 'st-num' }, 'Chapter ' + (i + 1) + ' of ' + ch.length));
      stage.appendChild(h('h3', { class: 'st-title', html: chap.title }));
      stage.appendChild(html('div', 'prose st-text', P(chap.text)));
      var hasChoice = chap.choice && chap.choice.options && chap.choice.options.length;
      if (hasChoice) {
        var q = h('div', { class: 'st-choice' }, h('p', { class: 'st-q', html: chap.choice.question || 'Where would you have stopped this?' }));
        var fbEl = h('div', { class: 'st-fb', 'aria-live': 'polite' });
        chap.choice.options.forEach(function (o, oi) {
          var bt = h('button', { class: 'opt opt--compact' + (st.picks[i] === oi ? ' is-picked' : '') }, h('span', { class: 'opt-key' }, LETTERS[oi]), h('span', { class: 'opt-text', html: o.text }));
          bt.addEventListener('click', function () { st.picks[i] = oi; ctx.save(st); draw(); });
          q.appendChild(bt);
        });
        if (st.picks[i] != null) {
          var o = chap.choice.options[st.picks[i]];
          var best = chap.choice.options.filter(function (x) { return x.best; });
          fbEl.appendChild(h('div', { class: 'st-fbcard ' + (o.best ? 'is-best' : '') }, h('p', { class: 'fb-head' }, FP.icon(o.best ? 'check' : 'eye', 16), o.best ? 'That\'s where it could have stopped.' : 'That would have helped. Here\'s another angle.'),
            html('div', 'prose', P(o.fb || '')),
            (!o.best && best.length) ? h('p', { class: 'st-best' }, h('b', null, 'Strongest stop: '), h('span', { html: best[0].text })) : null));
          q.querySelectorAll('.opt').forEach(function (x) { x.disabled = true; });
        }
        q.appendChild(fbEl);
        stage.appendChild(q);
      }
      dots.innerHTML = '';
      ch.forEach(function (_, j) {
        var reached = j <= st.max;
        dots.appendChild(h('button', { class: 'st-dot' + (j === i ? ' is-on' : '') + (reached ? ' is-reached' : ''), disabled: !reached, 'aria-label': 'Chapter ' + (j + 1), on: { click: function () { st.at = j; ctx.save(st); draw(); } } }));
      });
      nav.innerHTML = '';
      var canNext = !hasChoice || st.picks[i] != null;
      if (i < ch.length - 1) {
        nav.appendChild(h('button', { class: 'btn btn-secondary', disabled: !canNext, on: { click: function () { st.at = i + 1; st.max = Math.max(st.max || 0, st.at); ctx.save(st); draw(); stage.scrollIntoView({ block: 'nearest' }); } } }, 'Next chapter', FP.icon('arrow-right', 16)));
      } else if (canNext) {
        nav.appendChild(h('p', { class: 'st-end' }, FP.icon('check', 16), ' End of ' + c.name + '\'s story'));
        ctx.complete();
      }
    }
    st.max = Math.max(st.max || 0, st.at || 0);
    draw();
    return h('div', { class: 'b-story' },
      h('div', { class: 'st-head' }, FP.avatar(b.speaker, 64, 'serious'),
        h('div', null, h('p', { class: 'kicker' }, 'In his own words'), h('p', { class: 'st-who' }, h('b', null, c.name), h('span', null, c.role || ''))), dots),
      stage, nav);
  });

  /* ---------- charintro ---------- */
  reg('charintro', function (b) {
    return h('div', { class: 'b-chars' }, (b.characters || []).map(function (id) {
      var c = FP.char(id);
      return h('div', { class: 'char-card' }, FP.avatar(id, 88), h('div', null, h('p', { class: 'char-name' }, c.name), h('p', { class: 'char-role' }, c.role || ''), c.carries ? h('p', { class: 'char-carries' }, c.carries) : null));
    }));
  });

  /* ---------- coursemap (look-ahead schedule) ---------- */
  reg('coursemap', function () {
    var C = root.COURSE || {};
    var outline = C.outline || [];
    var total = outline.reduce(function (s, o) { return s + (o.minutes || 0); }, 0) || 360;
    var eng = FP.engine;
    var start = 0;
    var ticks = h('div', { class: 'cm-ticks', 'aria-hidden': 'true' });
    for (var t = 0; t <= total; t += 60) ticks.appendChild(h('span', { style: { left: (t / total * 100) + '%' } }, t === 0 ? 'Start' : 'Hr ' + (t / 60)));
    var rows = outline.map(function (o) {
      var mod = C.getModule ? C.getModule(o.id) : null;
      var isExam = o.id === 'exam';
      var done = isExam ? !!(eng && eng.state.e.p) : !!(mod && eng && eng.moduleDone(mod));
      var href = isExam ? '#exam' : mod ? '#' + o.id : null;
      var left = start / total * 100, width = (o.minutes || 0) / total * 100;
      start += o.minutes || 0;
      var row = h(href ? 'a' : 'div', { class: 'cm-row' + (done ? ' is-done' : '') + (!mod && !isExam ? ' is-pending' : '') + (isExam ? ' is-exam' : ''), href: href },
        h('span', { class: 'cm-num' }, done ? FP.icon('check', 14) : String(o.num)),
        h('span', { class: 'cm-title' }, o.title),
        h('span', { class: 'cm-track' }, h('span', { class: 'cm-bar', style: { left: left + '%', width: width + '%' } })),
        h('span', { class: 'cm-min' }, o.minutes + 'm'));
      return row;
    });
    return h('div', { class: 'b-coursemap' }, h('div', { class: 'cm-head' }, h('span', null, 'Part'), h('span', null, 'Riverside look-ahead'), ticks), rows,
      h('p', { class: 'cm-foot' }, total + ' minutes · stop between modules anytime; the course remembers where you were.'));
  });

  /* ---------- checklist ---------- */
  reg('checklist', function (b, ctx) {
    var st = ctx.load() || {};
    var items = b.items || [];
    var count = h('p', { class: 'cl-count' });
    function upd() { var n = items.filter(function (_, i) { return st[i]; }).length; count.textContent = n + ' of ' + items.length + ' checked'; if (n === items.length) ctx.complete(); }
    var list = h('ul', { class: 'cl-list' }, items.map(function (it, i) {
      var id = 'cl-' + String(ctx.key).replace(/[^a-z0-9_-]/gi, '_') + '-' + i;
      var cb = h('input', { type: 'checkbox', id: id });
      cb.checked = !!st[i];
      cb.addEventListener('change', function () { if (cb.checked) st[i] = 1; else delete st[i]; ctx.save(st); upd(); });
      return h('li', null, cb, h('label', { for: id, html: it }));
    }));
    upd();
    return h('div', { class: 'b-checklist' }, title(b.title), list, count);
  });

  /* ---------- download (job aid) ---------- */
  reg('download', function (b) {
    return h('div', { class: 'b-download' },
      h('span', { class: 'dl-ico' }, FP.icon('file', 26)),
      h('div', { class: 'dl-copy' }, h('p', { class: 'dl-kicker' }, 'Job aid'), h('p', { class: 'dl-title', html: b.title }), b.desc ? html('p', 'dl-desc', b.desc) : null),
      h('div', { class: 'dl-actions' },
        h('a', { class: 'btn btn-secondary', href: b.file, target: '_blank', rel: 'noopener' }, 'Open', FP.icon('external', 15)),
        b.pdf ? h('a', { class: 'btn btn-quiet', href: b.pdf, target: '_blank', rel: 'noopener' }, FP.icon('download', 15), 'PDF') : null));
  });

  /* ---------- continue (handled by the engine's gating) ---------- */
  reg('continue', function () { return null; });

})(window);
