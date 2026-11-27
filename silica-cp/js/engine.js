/* ==========================================================================
   Engine — course shell: top bar, outline rail, routing, lessons, gating,
   progress + bookmarking (SCORM 1.2), narration with captions, resources, credits.
   Routes (ASCII hashes): #home #m3 #m3-l2 #m3-kc #exam #certificate #verification
                          #resources #credits
   ========================================================================== */
(function (root) {
  'use strict';
  var FP = root.FP, h = FP.h;
  var CFG = root.FP_CONFIG || {};
  var COURSE = root.COURSE || { modules: [], order: [], outline: [], meta: {}, media: {}, characters: {} };
  var DOC = document.documentElement;

  /* Block types that must be finished before a continue gate opens (unless required:false). */
  var DEFAULT_REQUIRED = { dialogue: 1, poll: 1, mcq: 1, testout: 1, story: 1, scenario: 1, hotspot: 1, sort: 1,
    anchorjudge: 1, sequence: 1, match: 1, clearance: 1, swing: 1, checkreview: 1, toolbox: 1, commitment: 1 };

  /* ======================= State ======================= */
  var S = { l: '', d: {}, k: {}, b: {}, e: { a: 0, s: 0, p: 0, q: '', t: '', id: '', h: [] }, r: [], rv: {}, n: '' };

  function loadState() {
    var sus = FP.scorm.getSuspend();
    var local = FP.store.get('state', null);
    var src = sus || local;
    if (src) {
      S.l = src.l || '';
      (src.d ? String(src.d).split(',') : []).forEach(function (x) { if (x) S.d[x] = 1; });
      (src.k ? String(src.k).split(',') : []).forEach(function (x) { if (x) S.k[x] = 1; });
      if (src.b && typeof src.b === 'object') Object.keys(src.b).forEach(function (lid) { String(src.b[lid]).split('|').forEach(function (k) { if (k) S.b[k] = lid; }); });
      if (src.e) S.e = Object.assign(S.e, src.e);
      S.r = src.r ? String(src.r).split(',').filter(Boolean) : [];
      if (src.rv) Object.keys(src.rv).forEach(function (mid) { S.rv[mid] = String(src.rv[mid]).split(',').filter(Boolean); });
      S.n = src.n || '';
    }
    var loc = FP.scorm.getLocation();
    if (loc) S.l = loc;
  }
  function compact() {
    var b = {};
    Object.keys(S.b).forEach(function (k) { var lid = S.b[k]; if (S.d[lid]) return; (b[lid] = b[lid] || []).push(k); });
    Object.keys(b).forEach(function (lid) { b[lid] = b[lid].join('|'); });
    var rv = {}; Object.keys(S.rv).forEach(function (m) { rv[m] = S.rv[m].join(','); });
    var e = { a: S.e.a, s: S.e.s, p: S.e.p, q: S.e.q, t: S.e.t, id: S.e.id, h: (S.e.h || []).slice(-3) };
    return { v: 1, l: S.l, d: Object.keys(S.d).join(','), k: Object.keys(S.k).join(','), b: b, e: e, r: S.r.join(','), rv: rv, n: S.n };
  }
  function saveState() {
    var c = compact();
    FP.store.set('state', c);
    if (!FP.scorm.setSuspend(c)) { c.b = {}; FP.scorm.setSuspend(c); }
    FP.scorm.setLocation(S.l);
    FP.scorm.commit();
  }

  /* ======================= Model ======================= */
  function built() { return (COURSE.modules || []).filter(function (m) { return m && m.lessons && m.lessons.length; }); }
  function getMod(id) { return built().find(function (m) { return m.id === id; }) || null; }
  function outlineEntries() {
    var list = [];
    var order = COURSE.order || [];
    built().forEach(function (m) { if (order.indexOf(m.id) < 0) list.push({ mod: m, id: m.id }); });
    order.forEach(function (id) {
      var m = getMod(id);
      var o = (COURSE.outline || []).find(function (x) { return x.id === id; }) || { id: id, title: id };
      list.push(m ? { mod: m, id: id } : { mod: null, id: id, placeholder: o });
    });
    return list;
  }
  function hasKC(m) { return !!(m.kc && m.kc.questions && m.kc.questions.length); }
  function units(m) {
    var u = m.lessons.map(function (l, i) { return { kind: 'lesson', id: l.id, lesson: l, idx: i, title: l.title, minutes: l.minutes }; });
    if (hasKC(m)) u.push({ kind: 'kc', id: m.id + '-kc', title: (m.kc.title || 'Knowledge check'), minutes: null });
    return u;
  }
  function lessonDone(id) { return !!S.d[id]; }
  function kcDone(m) { return !!S.k[m.id]; }
  function unitDone(m, u) { return u.kind === 'kc' ? kcDone(m) : lessonDone(u.id); }
  function moduleDone(m) { return units(m).every(function (u) { return unitDone(m, u); }); }
  function moduleStarted(m) { return units(m).some(function (u) { return unitDone(m, u); }); }
  function review() { return !!CFG.reviewMode; }
  function sequential() { return CFG.sequential !== false && !review(); }
  function moduleUnlocked(m) {
    if (!sequential()) return true;
    var seq = outlineEntries().filter(function (e) { return e.mod; });
    var i = seq.findIndex(function (e) { return e.id === m.id; });
    for (var j = 0; j < i; j++) { if (!moduleDone(seq[j].mod)) return false; }
    return true;
  }
  function unitUnlocked(m, u) {
    if (!moduleUnlocked(m)) return false;
    if (!sequential()) return true;
    var us = units(m); var i = us.findIndex(function (x) { return x.id === u.id; });
    for (var j = 0; j < i; j++) { if (!unitDone(m, us[j])) return false; }
    return true;
  }
  function allModulesDone() { return built().every(moduleDone); }
  function examUnlocked() { return review() || (built().length > 0 && allModulesDone()); }
  function progress() {
    var total = 0, done = 0;
    built().forEach(function (m) { units(m).forEach(function (u) { total++; if (unitDone(m, u)) done++; }); });
    total += 1; if (S.e.p) done += 1;
    return total ? Math.round(done / total * 100) : 0;
  }
  function nextUnitAfter(m, u) {
    var us = units(m); var i = us.findIndex(function (x) { return x.id === u.id; });
    if (i < us.length - 1) return '#' + us[i + 1].id;
    var seq = outlineEntries().filter(function (e) { return e.mod; });
    var mi = seq.findIndex(function (e) { return e.id === m.id; });
    if (mi < seq.length - 1) return '#' + seq[mi + 1].id;
    return '#exam';
  }
  function resumeTarget() {
    if (S.l && /^#?m\w+-(l\d+|kc)$/.test(S.l)) return '#' + S.l.replace(/^#/, '');
    var seq = outlineEntries().filter(function (e) { return e.mod; });
    for (var i = 0; i < seq.length; i++) {
      var m = seq[i].mod, us = units(m);
      for (var j = 0; j < us.length; j++) if (!unitDone(m, us[j])) return '#' + us[j].id;
    }
    return '#exam';
  }

  function markLessonDone(lid, m) {
    if (S.d[lid]) return;
    S.d[lid] = 1;
    Object.keys(S.b).forEach(function (k) { if (S.b[k] === lid) delete S.b[k]; });
    saveState();
    if (m && moduleDone(m)) FP.toast('Module ' + m.num + ' complete. Nice work.');
    updateChrome();
  }
  function markKCDone(m) {
    if (S.k[m.id]) return;
    S.k[m.id] = 1;
    Object.keys(S.b).forEach(function (k) { if (S.b[k] === m.id + '-kc') delete S.b[k]; });
    saveState(); if (moduleDone(m)) FP.toast('Module ' + m.num + ' complete.'); updateChrome();
  }
  /* Test-out: mark lessons complete; returns the href of the first unit after them. */
  function skipLessons(m, ids) {
    if (!m || !ids || !ids.length) return null;
    ids.forEach(function (id) { if (m.lessons.some(function (l) { return l.id === id; })) { S.d[id] = 1; Object.keys(S.b).forEach(function (k) { if (S.b[k] === id) delete S.b[k]; }); } });
    saveState(); updateChrome();
    var us = units(m), last = -1;
    us.forEach(function (u, i) { if (ids.indexOf(u.id) > -1) last = i; });
    return last >= 0 ? nextUnitAfter(m, us[last]) : null;
  }

  /* Review-required flags (set by the exam after a failed attempt). */
  function flagReview(mods) {
    (mods || []).forEach(function (id) { if (S.r.indexOf(id) < 0 && getMod(id)) { S.r.push(id); S.rv[id] = []; } });
    saveState(); updateChrome();
  }
  function noteVisit(m, lid) {
    if (S.r.indexOf(m.id) < 0) return;
    var v = S.rv[m.id] = S.rv[m.id] || [];
    if (v.indexOf(lid) < 0) v.push(lid);
    var all = m.lessons.every(function (l) { return v.indexOf(l.id) > -1; });
    if (all) { S.r = S.r.filter(function (x) { return x !== m.id; }); delete S.rv[m.id]; FP.toast('Review complete for Module ' + m.num + '.'); }
    saveState();
  }

  /* ======================= Shell ======================= */
  var els = {};
  /* Brand logo as a light/dark pair; CSS shows the one that matches the theme. */
  FP.brandLogo = function (cls) {
    var b = CFG.brand || {};
    return h('span', { class: 'brand-logo ' + (cls || '') },
      h('img', { src: b.logo, alt: b.name || 'Logo', class: 'brand-logo-light' }),
      h('img', { src: b.logoDark || b.logo, alt: '', 'aria-hidden': 'true', class: 'brand-logo-dark' }));
  };
  function buildShell() {
    var app = document.getElementById('fp-app') || document.body.appendChild(h('div', { id: 'fp-app', class: 'fp-app' }));
    app.innerHTML = '';
    var brand = CFG.brand || {};
    els.menuBtn = h('button', { class: 'tb-btn tb-menu', 'aria-label': 'Open course outline', 'aria-expanded': 'false', on: { click: toggleRail } }, FP.icon('menu', 22));
    var mark = brand.logo ? FP.brandLogo('tb-logo') : h('span', { class: 'tb-mark', 'aria-hidden': 'true' });
    els.brand = h('a', { class: 'tb-brand' + (brand.logo ? ' has-logo' : ''), href: '#home', 'aria-label': (brand.name || 'Course') + ' home' }, mark,
      h('span', { class: 'tb-brand-text' }, brand.logo ? null : h('b', null, brand.name || 'UPCHURCH'), h('small', null, brand.tagline || 'Safety Training')));
    els.title = h('div', { class: 'tb-title' }, COURSE.meta.title || 'Course');
    els.progBar = h('span', { class: 'tb-prog-fill' });
    els.progPct = h('b', { class: 'tb-prog-pct' }, '0%');
    els.prog = h('div', { class: 'tb-prog', role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': '100', 'aria-label': 'Course progress' },
      h('span', { class: 'tb-prog-track' }, els.progBar), els.progPct);
    els.listenBtn = h('button', { class: 'tb-btn tb-listen', 'aria-label': 'Listen to this lesson', title: 'Listen to this lesson (narration with captions)', on: { click: toggleLessonListen } }, FP.icon('volume', 20), h('span', { class: 'tb-btn-label' }, 'Listen'));
    els.themeBtn = h('button', { class: 'tb-btn tb-theme', on: { click: cycleTheme } });
    var top = h('header', { class: 'topbar' }, els.menuBtn, els.brand, els.title, h('div', { class: 'tb-spacer' }), els.prog,
      CFG.narration !== false ? els.listenBtn : null, els.themeBtn);

    els.rail = h('nav', { class: 'rail', id: 'fp-rail', 'aria-label': 'Course outline' });
    els.scrim = h('div', { class: 'scrim', on: { click: closeRail } });
    els.main = h('main', { class: 'main', id: 'fp-main', tabindex: '-1' });
    els.caption = h('div', { class: 'captionbar', role: 'status', 'aria-live': 'polite', hidden: true },
      h('span', { class: 'cb-icon' }, FP.icon('volume', 18)), h('p', { class: 'cb-text' }),
      h('button', { class: 'cb-stop', 'aria-label': 'Stop narration', on: { click: function () { FP.stopSpeaking(); } } }, FP.icon('stop', 16), ' Stop'));
    els.toasts = h('div', { class: 'toasts', 'aria-live': 'polite' });
    app.appendChild(h('a', { class: 'skip', href: '#fp-main', on: { click: function (e) { e.preventDefault(); els.main.focus(); } } }, 'Skip to content'));
    app.appendChild(top);
    app.appendChild(h('div', { class: 'layout' }, els.rail, els.scrim, els.main));
    app.appendChild(els.caption);
    app.appendChild(els.toasts);
    applyTheme(FP.store.get('theme', 'system'));
  }

  function toggleRail() { DOC.classList.contains('rail-open') ? closeRail() : openRail(); }
  function openRail() { DOC.classList.add('rail-open'); els.menuBtn.setAttribute('aria-expanded', 'true'); }
  function closeRail() { DOC.classList.remove('rail-open'); els.menuBtn.setAttribute('aria-expanded', 'false'); }

  /* ---- theme: system → light → dark ---- */
  function applyTheme(t) {
    if (t === 'light' || t === 'dark') DOC.setAttribute('data-theme', t); else DOC.removeAttribute('data-theme');
    var icon = t === 'light' ? 'sun' : t === 'dark' ? 'moon' : 'monitor';
    var label = t === 'light' ? 'Light theme' : t === 'dark' ? 'Dark theme' : 'Theme follows your device';
    els.themeBtn.innerHTML = ''; els.themeBtn.appendChild(FP.icon(icon, 20));
    els.themeBtn.setAttribute('aria-label', label + ' (click to change)'); els.themeBtn.title = label;
  }
  function cycleTheme() {
    var t = FP.store.get('theme', 'system'); t = t === 'system' ? 'light' : t === 'light' ? 'dark' : 'system';
    FP.store.set('theme', t); applyTheme(t);
  }

  /* ---- rail ---- */
  var railOpenMods = {};
  function renderRail(activeId) {
    var r = els.rail; r.innerHTML = '';
    var pct = progress();
    r.appendChild(h('div', { class: 'rail-head' },
      h('p', { class: 'rail-kicker' }, 'Course outline'),
      h('p', { class: 'rail-title' }, COURSE.meta.title),
      h('p', { class: 'rail-meta' }, Math.round((COURSE.meta.minutes || 360) / 60) + ' hours · ' + pct + '% complete')));
    r.appendChild(h('a', { class: 'rail-link' + (activeId === 'home' ? ' is-active' : ''), href: '#home' }, FP.icon('home', 18), h('span', null, 'Course home')));

    var ol = h('ol', { class: 'rail-mods' });
    outlineEntries().forEach(function (e) {
      if (!e.mod) {
        var p = e.placeholder;
        ol.appendChild(h('li', { class: 'rm is-placeholder' }, h('div', { class: 'rm-row' },
          h('span', { class: 'rm-num' }, String(p.num != null ? p.num : '')),
          h('span', { class: 'rm-text' }, h('span', { class: 'rm-title' }, p.title), h('span', { class: 'rm-meta' }, (p.minutes || '') + ' min · in production')))));
        return;
      }
      var m = e.mod, done = moduleDone(m), unlocked = moduleUnlocked(m), flagged = S.r.indexOf(m.id) > -1;
      var isActiveMod = activeId && (activeId === m.id || activeId.indexOf(m.id + '-') === 0);
      if (railOpenMods[m.id] === undefined) railOpenMods[m.id] = !!isActiveMod;
      if (isActiveMod) railOpenMods[m.id] = true;
      var us = units(m), nDone = us.filter(function (u) { return unitDone(m, u); }).length;
      var state = done ? 'done' : !unlocked ? 'locked' : nDone ? 'progress' : 'open';
      var li = h('li', { class: 'rm is-' + state + (isActiveMod ? ' is-current' : '') + (railOpenMods[m.id] ? ' is-expanded' : '') });
      var statusIcon = done ? FP.icon('check', 16) : !unlocked ? FP.icon('lock', 15) : null;
      var ring = h('span', { class: 'rm-num', style: { '--p': Math.round(nDone / us.length * 100) } }, statusIcon || String(m.num));
      var btn = h('button', { class: 'rm-row', 'aria-expanded': String(!!railOpenMods[m.id]), on: { click: function () { railOpenMods[m.id] = !railOpenMods[m.id]; renderRail(activeId); } } },
        ring,
        h('span', { class: 'rm-text' },
          h('span', { class: 'rm-title' }, m.title),
          h('span', { class: 'rm-meta' }, (m.minutes || '') + ' min' + (flagged ? '' : nDone && !done ? ' · ' + nDone + '/' + us.length : ''),
            flagged ? h('span', { class: 'badge badge-review' }, 'Review required') : null)),
        h('span', { class: 'rm-caret' }, FP.icon('chevron-down', 16)));
      li.appendChild(btn);
      var lol = h('ol', { class: 'rail-lessons' });
      lol.appendChild(h('li', null, h('a', { href: '#' + m.id, class: 'rl rl-overview' + (activeId === m.id ? ' is-active' : '') }, h('span', { class: 'rl-ico' }, FP.icon('map', 14)), h('span', { class: 'rl-title' }, 'Module overview'))));
      us.forEach(function (u) {
        var ud = unitDone(m, u), uu = unitUnlocked(m, u);
        var visited = flagged && (S.rv[m.id] || []).indexOf(u.id) > -1;
        lol.appendChild(h('li', null, h('a', {
          href: '#' + u.id, class: 'rl' + (activeId === u.id ? ' is-active' : '') + (ud ? ' is-done' : '') + (!uu ? ' is-locked' : ''),
          'aria-current': activeId === u.id ? 'page' : null
        },
        h('span', { class: 'rl-ico' }, ud ? FP.icon(visited || !flagged ? 'check' : 'refresh', 14) : !uu ? FP.icon('lock', 13) : u.kind === 'kc' ? FP.icon('target', 14) : h('span', { class: 'rl-dot' })),
        h('span', { class: 'rl-title' }, u.title),
        u.minutes ? h('span', { class: 'rl-min' }, u.minutes + 'm') : null)));
      });
      li.appendChild(lol);
      ol.appendChild(li);
    });
    r.appendChild(ol);

    var ex = examUnlocked();
    r.appendChild(h('div', { class: 'rail-foot' },
      h('a', { class: 'rail-link rail-exam' + (activeId === 'exam' ? ' is-active' : '') + (!ex ? ' is-locked' : ''), href: '#exam' },
        FP.icon(S.e.p ? 'award' : ex ? 'flag' : 'lock', 18), h('span', null, 'Final assessment'), h('span', { class: 'rl-min' }, S.e.p ? 'Passed' : '25m')),
      S.e.p ? h('a', { class: 'rail-link' + (activeId === 'certificate' ? ' is-active' : ''), href: '#certificate' }, FP.icon('award', 18), h('span', null, 'Certificate')) : null,
      h('a', { class: 'rail-link' + (activeId === 'verification' ? ' is-active' : ''), href: '#verification' }, FP.icon('shield', 18), h('span', null, 'Field verification')),
      h('a', { class: 'rail-link' + (activeId === 'resources' ? ' is-active' : ''), href: '#resources' }, FP.icon('file', 18), h('span', null, 'Job aids & resources')),
      h('a', { class: 'rail-link' + (activeId === 'credits' ? ' is-active' : ''), href: '#credits' }, FP.icon('book', 18), h('span', null, 'Credits & sources'))));
  }

  function updateChrome() {
    var p = progress();
    els.progBar.style.width = p + '%'; els.progPct.textContent = p + '%';
    els.prog.setAttribute('aria-valuenow', String(p));
    renderRail(currentRoute);
  }

  /* ======================= Toasts ======================= */
  FP.toast = function (msg) {
    var t = h('div', { class: 'toast' }, FP.icon('check', 16), h('span', null, msg));
    els.toasts.appendChild(t);
    setTimeout(function () { t.classList.add('is-out'); }, 3200);
    setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 3700);
  };

  /* ======================= Narration (TTS + captions) ======================= */
  var synth = root.speechSynthesis || null;
  var speakToken = 0, captionTimer = null;
  function pickVoice() {
    if (!synth) return null;
    var vs = synth.getVoices() || [];
    return vs.find(function (v) { return /en-US/i.test(v.lang) && /natural|neural|google|samantha|aria|jenny/i.test(v.name); }) ||
      vs.find(function (v) { return /en-US/i.test(v.lang); }) || vs.find(function (v) { return /^en/i.test(v.lang); }) || null;
  }
  function sentences(text) {
    var t = FP.strip(text);
    return (t.match(/[^.!?]+[.!?]+["”’)]*|[^.!?]+$/g) || [t]).map(function (s) { return s.trim(); }).filter(Boolean);
  }
  /* Voices: recorded clips (content/audio.js, built by tools/build-audio.py) play in each
     character's voice; anything without a clip falls back to the browser's voice. Captions
     follow the clip, sentence by sentence, timed by length. */
  var curAudio = null;
  function speakerLabel(who) {
    if (!who || who === FP.NARRATOR) return '';
    var c = FP.char(who); return (c && c.name ? c.name : who) + ': ';
  }
  function playClip(seg, token, capText, next) {
    var clip = (COURSE.audio || {})[FP.clipKey(seg.who, seg.text)];
    var label = speakerLabel(seg.who);
    var parts = sentences(seg.text);
    if (clip && typeof root.Audio === 'function') {
      var a = new root.Audio(clip[0]);
      curAudio = a;
      var dur = clip[1] || Math.max(2, seg.text.length / 14);
      var total = parts.reduce(function (n, p) { return n + p.length; }, 0) || 1;
      var marks = [], acc = 0;
      parts.forEach(function (p) { marks.push(acc / total * dur); acc += p.length; });
      capText.textContent = label + parts[0];
      a.addEventListener('timeupdate', function () {
        if (token !== speakToken) return;
        for (var k = marks.length - 1; k >= 0; k--) if (a.currentTime >= marks[k]) { capText.textContent = label + parts[k]; break; }
      });
      var guard = setTimeout(function () { if (token === speakToken) next(); }, (dur + 4) * 1000);
      a.addEventListener('ended', function () { clearTimeout(guard); if (token === speakToken) next(); });
      a.addEventListener('error', function () { clearTimeout(guard); if (token === speakToken) ttsSeg(seg, token, capText, next); });
      var pr = a.play(); if (pr && pr.catch) pr.catch(function () { clearTimeout(guard); if (token === speakToken) ttsSeg(seg, token, capText, next); });
      return;
    }
    ttsSeg(seg, token, capText, next);
  }
  function ttsSeg(seg, token, capText, next) {
    var list = sentences(seg.text), i = 0, label = speakerLabel(seg.who);
    (function step() {
      if (token !== speakToken) return;
      if (i >= list.length) return next();
      var s = list[i++];
      capText.textContent = label + s;
      if (synth && typeof root.SpeechSynthesisUtterance === 'function') {
        var u = new root.SpeechSynthesisUtterance(s);
        var v = pickVoice(); if (v) u.voice = v;
        u.rate = 1.02; u.pitch = 1;
        var guard = setTimeout(step, Math.max(2500, s.length * 95)); // some engines never fire onend
        u.onend = function () { clearTimeout(guard); step(); };
        u.onerror = function () { clearTimeout(guard); step(); };
        synth.speak(u);
      } else {
        captionTimer = setTimeout(step, Math.max(1800, s.length * 62));
      }
    })();
  }
  /* Play a list of {who, text} segments in order (one voice per segment). */
  FP.speakSegments = function (segs, opts) {
    opts = opts || {};
    FP.stopSpeaking(true);
    var token = ++speakToken;
    var list = (segs || []).filter(function (x) { return x && x.text; });
    var i = 0;
    els.caption.hidden = false;
    DOC.classList.add('is-speaking');
    var capText = els.caption.querySelector('.cb-text');
    function done() { if (token !== speakToken) return; els.caption.hidden = true; DOC.classList.remove('is-speaking'); curAudio = null; if (opts.onend) opts.onend(); }
    function next() {
      if (token !== speakToken) return;
      if (i >= list.length) return done();
      playClip(list[i++], token, capText, next);
    }
    next();
  };
  FP.speak = function (text, opts) { FP.speakSegments([{ who: FP.NARRATOR, text: FP.speechText(text) }], opts); };
  /* Small play button for a card (story chapter, scenario node): plays its lines in character voices. */
  FP.voiceButton = function (getSegs, label) {
    if (CFG.narration === false) return null;
    var btn = h('button', { type: 'button', class: 'voice-btn', 'aria-label': label || 'Hear it' }, FP.icon('volume', 14), h('span', null, label || 'Hear it'));
    btn.addEventListener('click', function () {
      if (btn.classList.contains('is-on')) { FP.stopSpeaking(); return; }
      document.querySelectorAll('.voice-btn.is-on').forEach(function (x) { x.classList.remove('is-on'); });
      FP.speakSegments(typeof getSegs === 'function' ? getSegs() : getSegs, { onend: function () { btn.classList.remove('is-on'); } });
      btn.classList.add('is-on');
    });
    return btn;
  };
  FP.stopSpeaking = function (silent) {
    speakToken++;
    if (curAudio) { try { curAudio.pause(); } catch (e) { /* ignore */ } curAudio = null; }
    if (synth) { try { synth.cancel(); } catch (e) { /* ignore */ } }
    clearTimeout(captionTimer);
    if (els.caption) els.caption.hidden = true;
    DOC.classList.remove('is-speaking');
    document.querySelectorAll('.voice-btn.is-on').forEach(function (x) { x.classList.remove('is-on'); });
    if (!silent) lessonListening = false;
    if (els.listenBtn) els.listenBtn.classList.remove('is-on');
  };
  var lessonListening = false;
  function toggleLessonListen() {
    if (lessonListening) { lessonListening = false; FP.stopSpeaking(); return; }
    var blocks = Array.prototype.slice.call(els.main.querySelectorAll('.seg:not([hidden]) .blk[data-narration]'));
    if (!blocks.length) { FP.toast('No narration on this page.'); return; }
    lessonListening = true; els.listenBtn.classList.add('is-on');
    var i = 0;
    (function playNext() {
      if (!lessonListening || i >= blocks.length) { lessonListening = false; els.listenBtn.classList.remove('is-on'); return; }
      var b = blocks[i++];
      document.querySelectorAll('.is-narrating').forEach(function (n) { n.classList.remove('is-narrating'); });
      b.classList.add('is-narrating');
      b.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
      FP.speakSegments(b._fpScript || [{ who: FP.NARRATOR, text: b.getAttribute('data-narration') }], { onend: function () { b.classList.remove('is-narrating'); if (lessonListening) els.listenBtn.classList.add('is-on'); playNext(); } });
      els.listenBtn.classList.add('is-on');
    })();
  }

  /* ======================= Block rendering + gating ======================= */
  var CUR = null; // current lesson context
  function safeId(k) { return String(k).replace(/[^a-zA-Z0-9_-]/g, '_'); }
  function isRequired(b) { return b.required === true || (b.required !== false && !!DEFAULT_REQUIRED[b.type]); }

  function makeCtx(b, key, m, lesson) {
    return {
      module: m, lesson: lesson, block: b, key: key,
      complete: function (result) {
        var was = !!S.b[key];
        S.b[key] = lesson ? lesson.id : (m ? m.id : 'x');
        if (result !== undefined) FP.store.set('res:' + key, result);
        if (!was) saveState();
        refreshLesson();
      },
      isComplete: function () { return !!S.b[key] || (lesson && lessonDone(lesson.id)); },
      save: function (obj) { FP.store.set('blk:' + key, obj); },
      load: function () { return FP.store.get('blk:' + key, null); }
    };
  }

  function renderBlock(b, key, m, lesson, item) {
    var wrap = h('section', { class: 'blk blk--' + (b && b.type), id: 'b-' + safeId(key), 'data-key': key });
    var r = b && FP.renderer(b.type);
    if (!r) {
      item.missing = true;
      wrap.appendChild(h('div', { class: 'blk-missing' }, FP.icon('wrench', 18),
        h('span', null, 'This ' + (b && b.type ? '"' + b.type + '" ' : '') + 'activity is not available in this build.')));
      return wrap;
    }
    try {
      var el = r(b, makeCtx(b, key, m, lesson));
      if (el) wrap.appendChild(el); else { wrap.hidden = true; wrap.classList.add('is-empty'); }
    } catch (err) {
      item.missing = true;
      if (root.console) console.warn('[FP] block render failed', b.type, key, err);
      wrap.appendChild(h('div', { class: 'blk-missing' }, FP.icon('alert', 18), h('span', null, 'This activity could not load.')));
    }
    var script = FP.blockScript(b);
    if (script.length && CFG.narration !== false) {
      wrap._fpScript = script;
      wrap.setAttribute('data-narration', script.map(function (x) { return x.text; }).join(' '));
      wrap.insertBefore(h('button', { class: 'blk-listen', 'aria-label': 'Listen to narration', on: { click: function () {
        if (wrap.classList.contains('is-narrating')) { FP.stopSpeaking(); return; }
        document.querySelectorAll('.is-narrating').forEach(function (n) { n.classList.remove('is-narrating'); });
        wrap.classList.add('is-narrating');
        FP.speakSegments(script, { onend: function () { wrap.classList.remove('is-narrating'); } });
      } } }, FP.icon('volume', 15), h('span', null, 'Listen')), wrap.firstChild);
    }
    return wrap;
  }
  FP.renderBlock = function (b, host, m, lesson, key) {
    var item = { b: b, key: key || (b.id || FP.uid('adhoc')) };
    var el = renderBlock(b, item.key, m || null, lesson || null, item);
    if (host) host.appendChild(el);
    return el;
  };

  function renderLessonBody(m, lesson, host) {
    var blocks = lesson.blocks || [];
    var segs = [[]], gates = [], items = [];
    blocks.forEach(function (b, i) {
      var key = (b && b.id) || (lesson.id + '#' + i);
      if (b && b.type === 'continue') { gates.push({ b: b, key: key, seg: segs.length - 1 }); segs.push([]); }
      else { var it = { b: b, key: key, seg: segs.length - 1 }; segs[segs.length - 1].push(it); items.push(it); }
    });
    var segEls = segs.map(function (seg, si) {
      var el = h('div', { class: 'seg', 'data-seg': String(si) });
      seg.forEach(function (it) { el.appendChild(renderBlock(it.b, it.key, m, lesson, it)); });
      return el;
    });
    var gateEls = gates.map(function (g) {
      var btn = h('button', { class: 'btn btn-primary gate-btn', on: { click: function () {
        if (btn.disabled) return;
        S.b[g.key] = lesson.id; saveState(); refreshLesson();
        var nxt = segEls[g.seg + 1];
        if (nxt) setTimeout(function () { nxt.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }); }, 60);
      } } }, h('span', null, (g.b.label || 'Continue')), FP.icon('chevron-down', 18));
      var note = h('p', { class: 'gate-note' }, FP.icon('lock', 14), h('span', null, 'Finish the activity above to continue.'));
      return h('div', { class: 'gate', 'data-gate': g.key }, h('span', { class: 'gate-line' }), btn, note);
    });
    segEls.forEach(function (s, i) { host.appendChild(s); if (gateEls[i]) host.appendChild(gateEls[i]); });
    return { segs: segEls, gates: gates, gateEls: gateEls, items: items };
  }

  function refreshLesson() {
    if (!CUR || !CUR.lesson) { return; }
    var L = CUR.body, m = CUR.m, lesson = CUR.lesson;
    var done = lessonDone(lesson.id);
    function incompleteIn(segIdx) {
      return L.items.filter(function (it) { return it.seg <= segIdx && !it.missing && isRequired(it.b) && !S.b[it.key]; });
    }
    var revealUpTo = 0, blocked = false;
    L.gates.forEach(function (g, gi) {
      var gEl = L.gateEls[gi];
      if (blocked) { gEl.hidden = true; return; }
      gEl.hidden = false;
      var passed = done || !!S.b[g.key];
      var pending = incompleteIn(g.seg).length;
      var btn = gEl.querySelector('.gate-btn'), note = gEl.querySelector('.gate-note');
      gEl.classList.toggle('is-passed', passed);
      btn.disabled = !passed && pending > 0;
      btn.hidden = passed;
      note.hidden = passed || pending === 0;
      if (passed) revealUpTo = g.seg + 1; else blocked = true;
    });
    L.segs.forEach(function (s, i) { s.hidden = i > revealUpTo; });
    var allRevealed = revealUpTo >= L.segs.length - 1;
    var pendingAll = L.items.filter(function (it) { return !it.missing && isRequired(it.b) && !S.b[it.key]; }).length;
    var ready = done || (allRevealed && pendingAll === 0);
    CUR.ready = ready;
    if (CUR.footer) {
      CUR.footer.hidden = !allRevealed && !done;
      var nb = CUR.footer.querySelector('.next-btn'), msg = CUR.footer.querySelector('.foot-status');
      nb.disabled = !ready;
      msg.innerHTML = '';
      msg.appendChild(done ? h('span', { class: 'is-done' }, FP.icon('check', 16), ' Lesson complete')
        : ready ? h('span', null, 'You\'re ready for the next lesson.')
          : h('span', null, FP.icon('lock', 14), ' Finish the ' + pendingAll + ' activit' + (pendingAll === 1 ? 'y' : 'ies') + ' above to complete this lesson.'));
    }
    if (ready && !done && CUR.sentinelSeen) markLessonDone(lesson.id, m);
  }
  FP.refreshLesson = refreshLesson;

  /* ======================= Views ======================= */
  var currentRoute = 'home';
  function setView(node, id) {
    FP.stopSpeaking();
    CUR = null;
    els.main.innerHTML = '';
    els.main.appendChild(node);
    currentRoute = id;
    updateChrome();
    closeRail();
    root.scrollTo(0, 0);
    els.main.focus({ preventScroll: true });
  }

  function heroMedia(id) {
    var md = FP.media(id);
    if (md && md.type === 'image') return h('img', { class: 'band-img', src: md.src, alt: '', loading: 'eager' });
    return h('div', { class: 'band-art' }, FP.art.frame());
  }
  function band(opts) {
    return h('div', { class: 'band' + (opts.compact ? ' band--compact' : '') },
      heroMedia(opts.media),
      h('div', { class: 'band-shade' }),
      h('div', { class: 'band-inner' },
        opts.kicker ? h('p', { class: 'kicker kicker--band' }, opts.kicker) : null,
        h(opts.compact ? 'p' : 'h1', { class: 'band-title' + (opts.compact ? ' band-title--small' : '') }, opts.title),
        opts.sub ? h('p', { class: 'band-sub' }, opts.sub) : null,
        opts.extra || null),
      h('div', { class: 'band-stripe', 'aria-hidden': 'true' }));
  }

  /* ---- Home ---- */
  function viewHome() {
    var meta = COURSE.meta || {};
    var started = Object.keys(S.d).length > 0;
    var target = resumeTarget();
    var cta = h('div', { class: 'band-cta' },
      h('a', { class: 'btn btn-primary btn-lg', href: target }, started ? 'Resume where you left off' : 'Start the course', FP.icon('arrow-right', 18)),
      h('span', { class: 'band-cta-meta' }, progress() + '% complete'));
    var wrap = h('div', { class: 'view view-home' });
    wrap.appendChild(band({ media: 'img_course_hero', kicker: (meta.org || 'Upchurch') + ' · Competent person program', title: meta.title, sub: meta.subtitle, extra: cta }));
    var col = h('div', { class: 'col' });
    var facts = (meta && meta.homeFacts) || [['6 hours', 'self-paced, 11 parts'], ['15–45 min', 'per module, bookmarked'], ['80% + 100%', 'overall + critical items'], ['Field sign-off', 'before designation']];
    col.appendChild(h('div', { class: 'factrow' }, facts.map(function (f) { return h('div', { class: 'fact' }, h('b', null, f[0]), h('span', null, f[1])); })));

    col.appendChild(h('section', { class: 'home-sec' },
      h('p', { class: 'kicker' }, 'How this course works'),
      h('h2', { class: 'h2' }, 'You decide first. Then you see the standard behind the call.'),
      h('div', { class: 'howgrid' },
        how('target', 'Decide first', 'Most lessons open with a call you have to make on the Riverside job. Getting it wrong is part of the design.'),
        how('chat', 'Peer voice', 'Crew members narrate. OSHA citations show up as receipts in the feedback, not as headlines.'),
        how('wrench', 'Usable Monday', 'Every module ends with a job aid, checklist or script you can use on your next shift.'),
        how('shield', 'Field verification', 'Passing the exam is the knowledge half. Your safety manager signs the field half before you are designated.'))));

    var proj = COURSE.project || {};
    col.appendChild(h('section', { class: 'home-sec project' },
      h('p', { class: 'kicker' }, 'The job you will run all day'),
      h('h2', { class: 'h2' }, proj.name || 'Riverside Medical Office'),
      h('p', { class: 'lead' }, proj.summary || ''),
      h('div', { class: 'spec-sheet' }, (proj.facts || []).map(function (f) { return h('div', { class: 'spec-row' }, h('span', { class: 'spec-k' }, f[0]), h('span', { class: 'spec-v' }, f[1])); }))));

    var crewHost = h('section', { class: 'home-sec' }, h('p', { class: 'kicker' }, 'Your crew'), h('h2', { class: 'h2' }, 'Four people you will get to know'));
    FP.renderBlock({ type: 'charintro', characters: ['ray', 'tasha', 'dee', 'marco'] }, crewHost, null, null, 'home-crew');
    col.appendChild(crewHost);

    var mapHost = h('section', { class: 'home-sec' }, h('p', { class: 'kicker' }, 'Look-ahead schedule'), h('h2', { class: 'h2' }, 'Course map'));
    FP.renderBlock({ type: 'coursemap' }, mapHost, null, null, 'home-map');
    col.appendChild(mapHost);

    col.appendChild(h('p', { class: 'fineprint' }, meta.disclaimer || '', ' ', h('a', { href: '#credits' }, 'Credits & sources'), ' · Standards basis: ', (meta.standards || []).join('; '), '.'));
    wrap.appendChild(col);
    setView(wrap, 'home');
    function how(icon, t, d) { return h('div', { class: 'how' }, h('span', { class: 'how-ico' }, FP.icon(icon, 22)), h('h3', { class: 'h4' }, t), h('p', null, d)); }
  }

  /* ---- Module overview ---- */
  function viewModule(m) {
    var wrap = h('div', { class: 'view view-module' });
    var us = units(m);
    var target = us.find(function (u) { return !unitDone(m, u); }) || us[0];
    var locked = !moduleUnlocked(m);
    wrap.appendChild(band({ media: m.hero, kicker: 'Module ' + m.num + ' · ' + m.minutes + ' min · ' + (m.build || ''), title: m.title, sub: m.tagline,
      extra: h('div', { class: 'band-cta' }, locked ? h('span', { class: 'btn btn-ghost-light is-static' }, FP.icon('lock', 16), ' Finish the previous module to unlock')
        : h('a', { class: 'btn btn-primary btn-lg', href: '#' + target.id }, moduleStarted(m) ? (moduleDone(m) ? 'Review module' : 'Resume module') : 'Start module', FP.icon('arrow-right', 18))) }));
    var col = h('div', { class: 'col' });
    if (S.r.indexOf(m.id) > -1) col.appendChild(h('div', { class: 'notice notice--review' }, FP.icon('refresh', 18), h('div', null, h('b', null, 'Review required before your next exam attempt. '), 'Revisit every lesson in this module. Lessons you have revisited show a check.')));
    if (m.objectives && m.objectives.length) {
      col.appendChild(h('section', { class: 'mod-sec' }, h('p', { class: 'kicker' }, 'By the end you will be able to'),
        h('ol', { class: 'objectives' }, m.objectives.map(function (o) { return h('li', { html: o }); }))));
    }
    col.appendChild(h('section', { class: 'mod-sec' }, h('p', { class: 'kicker' }, 'Lessons'),
      h('ol', { class: 'lesson-list' }, us.map(function (u, i) {
        var d = unitDone(m, u), ok = unitUnlocked(m, u);
        return h('li', null, h(ok ? 'a' : 'div', { class: 'll' + (d ? ' is-done' : '') + (!ok ? ' is-locked' : ''), href: ok ? '#' + u.id : null },
          h('span', { class: 'll-num' }, d ? FP.icon('check', 16) : !ok ? FP.icon('lock', 14) : u.kind === 'kc' ? FP.icon('target', 16) : String(i + 1)),
          h('span', { class: 'll-title' }, u.title),
          h('span', { class: 'll-min' }, u.minutes ? u.minutes + ' min' : 'Practice')));
      }))));
    if (m.jobAids && m.jobAids.length) {
      var ja = h('section', { class: 'mod-sec' }, h('p', { class: 'kicker' }, 'Use it Monday'));
      m.jobAids.forEach(function (j, i) { FP.renderBlock(Object.assign({ type: 'download' }, j), ja, m, null, m.id + '-ja-' + i); });
      col.appendChild(ja);
    }
    if (m.citations && m.citations.length) {
      col.appendChild(h('section', { class: 'mod-sec' }, h('p', { class: 'kicker' }, 'Receipts in this module'),
        h('p', { class: 'cite-row' }, m.citations.map(function (c) { return h('cite', null, c); }))));
    }
    wrap.appendChild(col);
    setView(wrap, m.id);
  }

  /* ---- Lesson ---- */
  function lockedView(msg, id) {
    var wrap = h('div', { class: 'view view-locked' }, h('div', { class: 'col' },
      h('div', { class: 'locked-card' }, h('span', { class: 'locked-ico' }, FP.icon('lock', 28)),
        h('h1', { class: 'h2' }, 'Not unlocked yet'), h('p', null, msg),
        h('a', { class: 'btn btn-primary', href: resumeTarget() }, 'Go to where you left off', FP.icon('arrow-right', 18)))));
    setView(wrap, id);
  }

  function viewLesson(m, u) {
    if (!unitUnlocked(m, u)) return lockedView('Lessons open in order. Finish the lessons before this one, then come back.', u.id);
    var lesson = u.lesson;
    var us = units(m), idx = us.findIndex(function (x) { return x.id === u.id; });
    var wrap = h('div', { class: 'view view-lesson' });
    wrap.appendChild(band({ compact: true, media: m.hero, kicker: 'Module ' + m.num + ' · ' + m.title, title: lesson.title,
      extra: h('p', { class: 'band-meta' }, 'Lesson ' + (u.idx + 1) + ' of ' + m.lessons.length + (lesson.minutes ? ' · ' + lesson.minutes + ' min' : '')) }));
    var col = h('div', { class: 'col col--lesson' });
    var body = renderLessonBody(m, lesson, col);
    var prev = idx > 0 ? '#' + us[idx - 1].id : '#' + m.id;
    var next = nextUnitAfter(m, u);
    var sentinel = h('div', { class: 'sentinel', 'aria-hidden': 'true' });
    var footer = h('footer', { class: 'lesson-foot' },
      sentinel,
      h('p', { class: 'foot-status' }),
      h('div', { class: 'foot-nav' },
        h('a', { class: 'btn btn-quiet', href: prev }, FP.icon('arrow-left', 18), idx > 0 ? 'Previous' : 'Module overview'),
        h('button', { class: 'btn btn-primary next-btn', on: { click: function () { if (!CUR || !CUR.ready) return; markLessonDone(lesson.id, m); location.hash = next; } } },
          next === '#exam' ? 'Go to the final assessment' : /-kc$/.test(next) ? 'Knowledge check' : /-l\d+$/.test(next) ? 'Next lesson' : 'Next module', FP.icon('arrow-right', 18))));
    col.appendChild(footer);
    wrap.appendChild(col);
    S.l = u.id; noteVisit(m, u.id); saveState();
    setView(wrap, u.id);
    CUR = { m: m, lesson: lesson, body: body, footer: footer, sentinelSeen: false, ready: false };
    var cur = CUR;
    if ('IntersectionObserver' in root) {
      var io = new IntersectionObserver(function (ents) {
        ents.forEach(function (e) { if (e.isIntersecting && CUR === cur) { cur.sentinelSeen = true; refreshLesson(); } });
      }, { rootMargin: '0px 0px -40px 0px' });
      io.observe(sentinel);
    } else { cur.sentinelSeen = true; }
    refreshLesson();
  }

  /* ---- Knowledge check (practice) ---- */
  function viewKC(m, u) {
    if (!unitUnlocked(m, u)) return lockedView('The knowledge check opens after you finish this module\'s lessons.', u.id);
    var wrap = h('div', { class: 'view view-kc' });
    wrap.appendChild(band({ compact: true, media: m.hero, kicker: 'Module ' + m.num + ' · ' + m.title, title: m.kc.title || 'Knowledge check',
      extra: h('p', { class: 'band-meta' }, m.kc.questions.length + ' questions · practice, not graded · feedback with receipts') }));
    var col = h('div', { class: 'col col--lesson' });
    col.appendChild(h('p', { class: 'lead' }, 'Quick check before you move on. These don\'t count toward your score. Read the feedback: the same ideas show up on the final assessment.'));
    var answered = {};
    var fakeLesson = { id: u.id, title: 'Knowledge check', blocks: [] };
    var total = m.kc.questions.length;
    var status = h('p', { class: 'foot-status' });
    var nextBtn = h('a', { class: 'btn btn-primary', href: nextUnitAfter(m, u) }, nextUnitAfter(m, u) === '#exam' ? 'Go to the final assessment' : 'Next module', FP.icon('arrow-right', 18));
    function upd() {
      var n = Object.keys(answered).length;
      var ok = n >= total || kcDone(m);
      status.innerHTML = '';
      status.appendChild(ok ? h('span', { class: 'is-done' }, FP.icon('check', 16), ' Knowledge check complete') : h('span', null, n + ' of ' + total + ' answered'));
      nextBtn.classList.toggle('is-disabled', !ok);
      nextBtn.setAttribute('aria-disabled', String(!ok));
      if (ok) markKCDone(m);
    }
    m.kc.questions.forEach(function (q, i) {
      var key = m.id + '-kc-' + i;
      var b = Object.assign({ type: 'mcq', id: key, kicker: 'Question ' + (i + 1) + ' of ' + total }, q);
      var ctx = makeCtx(b, key, m, fakeLesson);
      var sec = h('section', { class: 'blk blk--mcq blk--kc' });
      if (FP.mcqWidget) {
        sec.appendChild(FP.mcqWidget(b, { module: m, lesson: fakeLesson, block: b, key: key, save: ctx.save, load: ctx.load, isComplete: function () { return kcDone(m) || !!S.b[key]; },
          complete: function () { answered[key] = 1; if (!kcDone(m)) { S.b[key] = u.id; saveState(); } upd(); } }));
      }
      if (S.b[key] || kcDone(m)) answered[key] = 1;
      col.appendChild(sec);
    });
    nextBtn.addEventListener('click', function (e) { if (nextBtn.classList.contains('is-disabled')) e.preventDefault(); });
    col.appendChild(h('footer', { class: 'lesson-foot' }, status, h('div', { class: 'foot-nav' },
      h('a', { class: 'btn btn-quiet', href: '#' + m.lessons[m.lessons.length - 1].id }, FP.icon('arrow-left', 18), 'Previous'), nextBtn)));
    wrap.appendChild(col);
    S.l = u.id; saveState();
    setView(wrap, u.id);
    upd();
  }

  /* ---- Resources ---- */
  function viewResources() {
    var wrap = h('div', { class: 'view view-resources' });
    wrap.appendChild(band({ compact: true, media: 'img_toolbox_talk', kicker: 'Use it Monday', title: 'Job aids & resources' }));
    var col = h('div', { class: 'col' });
    col.appendChild(h('p', { class: 'lead' }, 'Every job aid from the course in one place. Open one, print it, put it in the truck.'));
    var any = false;
    built().forEach(function (m) {
      var list = (m.jobAids || []).slice();
      m.lessons.forEach(function (l) { (l.blocks || []).forEach(function (b) { if (b.type === 'download' && !list.some(function (x) { return x.file === b.file; })) list.push(b); }); });
      if (!list.length) return;
      any = true;
      var sec = h('section', { class: 'mod-sec' }, h('p', { class: 'kicker' }, 'Module ' + m.num + ' · ' + m.title));
      list.forEach(function (j, i) { FP.renderBlock(Object.assign({}, j, { type: 'download' }), sec, m, null, 'res-' + m.id + '-' + i); });
      col.appendChild(sec);
    });
    var fv = h('section', { class: 'mod-sec' }, h('p', { class: 'kicker' }, 'Designation'));
    FP.renderBlock({ type: 'download', title: 'Field verification sign-off', desc: 'The one-page checklist your safety manager completes on a live site before you are designated.', file: 'jobaids/field-verification-signoff.html', pdf: 'jobaids/pdf/field-verification-signoff.pdf' }, fv, null, null, 'res-fv');
    col.appendChild(fv);
    if (!any) col.appendChild(h('p', { class: 'muted' }, 'Module job aids appear here as modules are published.'));
    wrap.appendChild(col);
    setView(wrap, 'resources');
  }

  /* ---- Credits ---- */
  function viewCredits() {
    var wrap = h('div', { class: 'view view-credits' });
    wrap.appendChild(band({ compact: true, media: null, kicker: 'Receipts for the receipts', title: 'Credits & sources' }));
    var col = h('div', { class: 'col' });
    var media = COURSE.media || {};
    var imgs = [], vids = [];
    Object.keys(media).forEach(function (k) { var x = media[k]; if (!x) return; (x.type === 'video' ? vids : imgs).push(Object.assign({ key: k }, x)); });
    col.appendChild(h('p', { class: 'lead' }, 'Photos and videos come from public-domain and openly licensed sources and are credited here. Illustrations, characters and the Riverside project are original to this course and fictional.'));
    if (imgs.length) {
      col.appendChild(h('h2', { class: 'h3' }, 'Photographs'));
      col.appendChild(h('ul', { class: 'credit-list' }, imgs.map(function (x) {
        return h('li', { class: 'credit' }, h('img', { src: x.src, alt: '', loading: 'lazy' }),
          h('div', null, h('p', { class: 'credit-title' }, x.alt || x.key), h('p', { class: 'credit-meta' }, x.credit || '', x.license ? ' · ' + x.license : ''),
            x.source ? h('a', { href: x.source, target: '_blank', rel: 'noopener' }, 'Source', FP.icon('external', 13)) : null));
      })));
    }
    if (vids.length) {
      col.appendChild(h('h2', { class: 'h3' }, 'Videos'));
      col.appendChild(h('ul', { class: 'credit-list' }, vids.map(function (x) {
        return h('li', { class: 'credit' }, x.poster ? h('img', { src: x.poster, alt: '', loading: 'lazy' }) : h('span', { class: 'credit-ph' }, FP.icon('play', 20)),
          h('div', null, h('p', { class: 'credit-title' }, x.title || x.key), h('p', { class: 'credit-meta' }, (x.channel || 'YouTube') + (x.duration ? ' · ' + x.duration : '')),
            x.url ? h('a', { href: x.url, target: '_blank', rel: 'noopener' }, 'Watch on YouTube', FP.icon('external', 13)) : null));
      })));
    }
    col.appendChild(h('h2', { class: 'h3' }, 'Standards basis'));
    col.appendChild(h('ul', { class: 'plain-list' }, (COURSE.meta.standards || []).map(function (s) { return h('li', null, s); })));
    col.appendChild(h('h2', { class: 'h3' }, 'Type'));
    col.appendChild(h('p', null, 'Barlow Condensed (Jeremy Tribby), Public Sans (USWDS) and JetBrains Mono, all under the SIL Open Font License.'));
    col.appendChild(h('p', { class: 'fineprint' }, COURSE.meta.disclaimer || ''));
    wrap.appendChild(col);
    setView(wrap, 'credits');
  }

  /* ======================= Router ======================= */
  function route() {
    var id = (location.hash || '#home').replace(/^#/, '') || 'home';
    if (id === 'home') return viewHome();
    if (id === 'resources') return viewResources();
    if (id === 'credits') return viewCredits();
    if (id === 'exam' || id === 'certificate' || id === 'verification') {
      var host = h('div', { class: 'view view-' + id });
      setView(host, id);
      if (FP.exam) {
        try { FP.exam[id === 'exam' ? 'renderExam' : id === 'certificate' ? 'renderCertificate' : 'renderVerification'](host); }
        catch (e) { if (root.console) console.warn('[FP] exam view failed', e); host.appendChild(h('div', { class: 'col' }, h('p', null, 'This view could not load.'))); }
      } else host.appendChild(h('div', { class: 'col' }, h('p', null, 'The assessment is not available in this build.')));
      return;
    }
    var mm = id.match(/^(m[a-z0-9]+?)(?:-(l\d+|kc))?$/);
    if (mm) {
      var m = getMod(mm[1]);
      if (m) {
        if (!mm[2]) return viewModule(m);
        var u = units(m).find(function (x) { return x.id === id; });
        if (u) return u.kind === 'kc' ? viewKC(m, u) : viewLesson(m, u);
      }
    }
    viewHome();
  }

  /* ======================= Public engine API ======================= */
  FP.engine = {
    state: S, save: saveState, go: function (hash) { location.hash = hash; },
    modules: built, getModule: getMod, units: units, moduleDone: moduleDone, lessonDone: lessonDone,
    examUnlocked: examUnlocked, allModulesDone: allModulesDone, flagReview: flagReview, progress: progress, skipLessons: skipLessons,
    refresh: function () { updateChrome(); }, rerender: route,
    reviewList: function () { return S.r.slice(); },
    learnerName: function () { return FP.scorm.studentName() || S.n || ''; },
    setLearnerName: function (n) { S.n = String(n || '').slice(0, 80); saveState(); },
    config: CFG
  };

  /* ======================= Boot ======================= */
  function boot() {
    FP.scorm.init();
    loadState();
    buildShell();
    updateChrome();
    route();
    root.addEventListener('hashchange', route);
    root.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeRail(); } });
    if (synth && synth.onvoiceschanged !== undefined) synth.onvoiceschanged = function () { /* voices load async */ };
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})(window);
