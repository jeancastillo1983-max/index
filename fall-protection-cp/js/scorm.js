/* ==========================================================================
   SCORM 1.2 runtime wrapper with a transparent localStorage fallback.
   FP.scorm.init() → finds the LMS API in the parent/opener chain.
   With no LMS (preview, artifact, file://) every call reads/writes local storage.
   ========================================================================== */
(function (root) {
  'use strict';
  var FP = root.FP;
  var API = null, initialized = false, startTime = Date.now(), finished = false;
  var SUSPEND_MAX = 3500;

  function findAPI(win) {
    var tries = 0;
    try {
      while (win && !win.API && win.parent && win.parent !== win && tries < 12) { tries++; win = win.parent; }
      return (win && win.API) ? win.API : null;
    } catch (e) { return null; }
  }
  function locateAPI() {
    var api = findAPI(root);
    if (!api) { try { if (root.opener) api = findAPI(root.opener); } catch (e) { api = null; } }
    if (!api) { try { if (root.top && root.top.opener) api = findAPI(root.top.opener); } catch (e) { api = null; } }
    return api;
  }

  /* ---- local fallback (one JSON object) ---- */
  var LKEY = 'scorm12';
  function lget() { return FP.store.get(LKEY, {}) || {}; }
  function lset(k, v) { var o = lget(); o[k] = v; FP.store.set(LKEY, o); }

  function pad(n, w) { n = String(n); while (n.length < w) n = '0' + n; return n; }
  function sessionTime() {
    var s = Math.max(0, Math.round((Date.now() - startTime) / 1000));
    var hh = Math.floor(s / 3600), mm = Math.floor((s % 3600) / 60), ss = s % 60;
    return pad(hh, 4) + ':' + pad(mm, 2) + ':' + pad(ss, 2) + '.00';
  }

  var scorm = {
    isLMS: false,
    init: function () {
      if (initialized) return scorm.isLMS;
      initialized = true;
      API = locateAPI();
      if (API) {
        try {
          var ok = String(API.LMSInitialize('')) === 'true';
          scorm.isLMS = ok;
          if (ok) {
            var st = scorm.get('cmi.core.lesson_status');
            if (!st || st === 'not attempted') scorm.set('cmi.core.lesson_status', 'incomplete');
            scorm.set('cmi.core.score.min', '0');
            scorm.set('cmi.core.score.max', '100');
            scorm.commit();
          }
        } catch (e) { scorm.isLMS = false; }
      }
      if (!scorm.isLMS) {
        var o = lget();
        if (!o['cmi.core.lesson_status']) lset('cmi.core.lesson_status', 'incomplete');
      }
      root.addEventListener('pagehide', scorm.finish);
      root.addEventListener('beforeunload', scorm.finish);
      return scorm.isLMS;
    },
    get: function (k) {
      if (scorm.isLMS) { try { return String(API.LMSGetValue(k) || ''); } catch (e) { return ''; } }
      var v = lget()[k]; return v == null ? '' : String(v);
    },
    set: function (k, v) {
      if (scorm.isLMS) { try { return String(API.LMSSetValue(k, String(v))) === 'true'; } catch (e) { return false; } }
      lset(k, String(v)); return true;
    },
    commit: function () {
      if (scorm.isLMS) { try { API.LMSCommit(''); } catch (e) { /* LMS refused */ } }
    },
    finish: function () {
      if (finished) return;
      finished = true;
      try {
        scorm.set('cmi.core.session_time', sessionTime());
        var st = scorm.get('cmi.core.lesson_status');
        scorm.set('cmi.core.exit', st === 'passed' ? '' : 'suspend');
        scorm.commit();
        if (scorm.isLMS) API.LMSFinish('');
      } catch (e) { /* ignore */ }
    },
    lastError: function () {
      if (!scorm.isLMS) return '0';
      try { var c = API.LMSGetLastError(); return c + ' ' + API.LMSGetErrorString(c); } catch (e) { return '?'; }
    },

    /* convenience */
    getLocation: function () { return scorm.get('cmi.core.lesson_location'); },
    setLocation: function (loc) { scorm.set('cmi.core.lesson_location', String(loc || '').slice(0, 255)); },
    getSuspend: function () {
      var s = scorm.get('cmi.suspend_data');
      if (!s) return null;
      try { return JSON.parse(s); } catch (e) { return null; }
    },
    setSuspend: function (obj) {
      var s = JSON.stringify(obj);
      if (s.length > SUSPEND_MAX) return false;
      scorm.set('cmi.suspend_data', s);
      return true;
    },
    getStatus: function () { return scorm.get('cmi.core.lesson_status'); },
    setStatus: function (s) { scorm.set('cmi.core.lesson_status', s); scorm.commit(); },
    setScore: function (raw) {
      scorm.set('cmi.core.score.min', '0');
      scorm.set('cmi.core.score.max', '100');
      scorm.set('cmi.core.score.raw', String(Math.round(raw)));
      scorm.commit();
    },
    studentName: function () {
      var n = scorm.get('cmi.core.student_name');
      if (!n) return '';
      if (n.indexOf(',') > -1) { var p = n.split(','); return (p[1] + ' ' + p[0]).replace(/\s+/g, ' ').trim(); }
      return n.trim();
    },
    suspendMax: SUSPEND_MAX
  };

  FP.scorm = scorm;
})(window);
