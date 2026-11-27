/* ==========================================================================
   FP core — shared runtime namespace. Loaded before every other course script.
   Builders A (shell/core blocks/exam) and B (interactions) depend on this API.
   ========================================================================== */
(function (root) {
  'use strict';

  var registry = {};

  /** Element builder: FP.h('div', {class:'x', on:{click:fn}, html:'<b>hi</b>'}, child, 'text') */
  function h(tag, attrs) {
    var el = (tag === 'svg' || (attrs && attrs.ns === 'svg'))
      ? document.createElementNS('http://www.w3.org/2000/svg', tag)
      : document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v === null || v === undefined || v === false || k === 'ns') return;
        if (k === 'class') el.setAttribute('class', v);
        else if (k === 'html') el.innerHTML = v;
        else if (k === 'text') el.textContent = v;
        else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
        else if (k === 'on') Object.keys(v).forEach(function (ev) { el.addEventListener(ev, v[ev]); });
        else if (v === true) el.setAttribute(k, '');
        else el.setAttribute(k, v);
      });
    }
    for (var i = 2; i < arguments.length; i++) append(el, arguments[i]);
    return el;
  }
  function append(el, c) {
    if (c === null || c === undefined || c === false) return;
    if (Array.isArray(c)) { c.forEach(function (x) { append(el, x); }); return; }
    el.appendChild(c instanceof Node ? c : document.createTextNode(String(c)));
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  var uidN = 0;
  function uid(p) { uidN += 1; return (p || 'fp') + '-' + uidN; }
  function strip(html) { return String(html == null ? '' : html).replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').trim(); }
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); }
  /** Body may be a string or an array of paragraph strings → HTML string of <p>s */
  function paras(body) {
    if (body == null) return '';
    var list = Array.isArray(body) ? body : String(body).split(/\n\n+/);
    return list.map(function (p) { return /^\s*<(ul|ol|table|div|p|h\d)/i.test(p) ? p : '<p>' + p + '</p>'; }).join('');
  }

  /* ---- Local (per-viewer) storage, always guarded ---- */
  var LS_PREFIX = (root.FP_CONFIG && root.FP_CONFIG.storagePrefix) || 'fpcp:';
  var store = {
    get: function (k, d) { try { var v = root.localStorage.getItem(LS_PREFIX + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { root.localStorage.setItem(LS_PREFIX + k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } },
    del: function (k) { try { root.localStorage.removeItem(LS_PREFIX + k); } catch (e) { /* ignore */ } }
  };

  var FP = {
    version: '1.0.0',
    h: h, append: append, shuffle: shuffle, uid: uid, strip: strip, esc: esc, paras: paras, store: store,

    register: function (type, render) { registry[type] = render; },
    renderer: function (type) { return registry[type] || null; },
    types: function () { return Object.keys(registry); },

    media: function (id) {
      var m = root.COURSE && root.COURSE.media;
      return (id && m && m[id]) ? m[id] : null;
    },
    char: function (id) {
      var c = root.COURSE && root.COURSE.characters;
      return (c && c[id]) || { id: id, name: id ? id.charAt(0).toUpperCase() + id.slice(1) : 'Crew', role: '' };
    },
    scene: function (id) {
      var s = root.COURSE && root.COURSE.scenes;
      return (s && s[id]) || null;
    },
    /* Overridden by art.js / engine.js; safe defaults so nothing crashes. */
    avatar: function (id, size) { return h('span', { class: 'fp-avatar-fallback', 'aria-hidden': 'true', style: { width: (size || 48) + 'px', height: (size || 48) + 'px' } }, (FP.char(id).name || '?').charAt(0)); },
    speak: function () {},
    stopSpeaking: function () {},
    toast: function (msg) { if (root.console) console.log('[toast]', msg); },

    /* Clearance math — the one formula every block, exam item and job aid uses (BUILD-SPEC §7). */
    clearance: function (s) {
      var L = +s.L || 0, DD = s.DD == null ? 3.5 : +s.DD, HS = s.HS == null ? 1 : +s.HS, H = s.H == null ? 5 : +s.H,
          A = +s.A || 0, SM = s.SM == null ? 2 : +s.SM, avail = +s.available || 0;
      var ff, feet;
      if (s.connector === 'srl') { ff = s.FFsrl == null ? 2 : +s.FFsrl; feet = ff + DD + HS; }
      else { ff = Math.max(0, L + H - A); feet = L + DD + HS + H - A; }
      var rc = feet + SM;
      return { freeFall: ff, freeFallOk: ff <= 6, feet: feet, required: rc, available: avail, hits: rc > avail, contact: feet >= avail, margin: avail - rc };
    },
    swingDrop: function (R, d) { R = +R; d = Math.min(+d, R); return R - Math.sqrt(R * R - d * d); },

    /* ---- Voices: which character says which text, and the key of its recorded clip ----
       Shared by the player (engine.js) and the audio build (tools/list-clips.js) so both agree. */
    NARRATOR: 'tasha',
    speechText: function (text) { return strip(Array.isArray(text) ? text.join(' ') : text).replace(/\s+/g, ' ').trim(); },
    clipKey: function (who, text) {
      var s = (who || 'tasha') + '|' + FP.speechText(text), h = 0x811c9dc5;
      for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
      return ('0000000' + h.toString(16)).slice(-8);
    },
    /* Mixed narration + speech (scenario cards): words inside quotation marks go to the speaker,
       everything else to the narrator. No quotation marks → all narrator. */
    splitSpeech: function (speaker, text) {
      var t = FP.speechText(text), out = [], re = /[“"]([^”"]+)[”"]/g, last = 0, m;
      if (!speaker || speaker === FP.NARRATOR) return t ? [{ who: FP.NARRATOR, text: t }] : [];
      while ((m = re.exec(t))) {
        var before = t.slice(last, m.index).replace(/^[\s,.:;—-]+|[\s,:;—-]+$/g, '').trim();
        if (before) out.push({ who: FP.NARRATOR, text: before });
        if (m[1].trim()) out.push({ who: speaker, text: m[1].trim() });
        last = re.lastIndex;
      }
      var rest = t.slice(last).replace(/^[\s,.:;—-]+/, '').trim();
      if (rest) out.push({ who: FP.NARRATOR, text: rest });
      return out;
    },
    /* What a block's Listen button plays, in order. */
    blockScript: function (b) {
      var segs = [], N = FP.NARRATOR;
      if (!b) return segs;
      if (b.type === 'quote' && b.text) segs.push({ who: b.speaker || N, text: FP.speechText(b.text) });
      if (b.narration) segs.push({ who: N, text: FP.speechText(b.narration) });
      if (b.type === 'dialogue' && b.lines) b.lines.forEach(function (l) { segs.push({ who: l.speaker || N, text: FP.speechText(l.text) }); });
      return segs.filter(function (x) { return x.text; });
    },
    chapterScript: function (b, ch) { return [{ who: b.speaker || FP.NARRATOR, text: FP.speechText(ch.text) }].filter(function (x) { return x.text; }); },
    nodeScript: function (n) { return n ? FP.splitSpeech(n.end ? (n.speaker || null) : n.speaker, n.text) : []; }
  };

  root.FP = FP;
  if (typeof module !== 'undefined' && module.exports) module.exports = FP;
})(typeof window !== 'undefined' ? window : globalThis);
