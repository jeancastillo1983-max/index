/* ==========================================================================
   Art: illustrated character avatars, stroke icon set, fallback backdrops.
   FP.avatar(id, size, mood) · FP.icon(name, size) · FP.art.frame()
   Avatars are flat illustrations (fictional composites), palette per BUILD-SPEC §8.
   ========================================================================== */
(function (root) {
  'use strict';
  var FP = root.FP;
  var INK = '#22303C';

  function svgFrom(str) {
    var t = document.createElement('template');
    t.innerHTML = str.trim();
    return t.content.firstChild;
  }

  /* ---------------- Avatars ---------------- */
  var LOOKS = {
    ray:   { bg: '#C9D6E2', skin: '#E7B793', hair: '#9C9C9C', hat: '#F4F6F7', shirt: '#5C6E80', vest: '#C6E23A' },
    tasha: { bg: '#FBD6BE', skin: '#8A5A3C', hair: '#2A1C14', hat: '#F4F6F7', shirt: '#2B3A4A', vest: '#C6E23A' },
    dee:   { bg: '#D7ECC0', skin: '#C98E62', hair: '#3A2A1E', hat: '#3DAA4F', shirt: '#F26B1D', vest: '#C6E23A' },
    marco: { bg: '#D9D5EC', skin: '#D9A27A', hair: '#3B2E25', hat: '#F4F6F7', shirt: '#A9C8E8', vest: '#C6E23A' },
    luis:  { bg: '#EADFCB', skin: '#B07A52', hair: '#5A4A3E', hat: '#2A3E5C', shirt: '#A23F35', vest: null },
    safety:{ bg: '#CFE3F5', skin: '#EAC29E', hair: '#6B4A2E', hat: '#2F6DB5', shirt: '#1F3A57', vest: '#F7893B' },
    narrator: { bg: '#DDE3E8', skin: '#C69472', hair: '#3A2A1E', hat: '#F26B1D', shirt: '#4A5B6C', vest: '#C6E23A' }
  };
  var MOODS = {
    calm:     { mouth: 'M53 76 Q60 80 67 76', bl: 'M48 57 L56 56.5', br: 'M64 56.5 L72 57' },
    proud:    { mouth: 'M53 76 Q61 80 68 74', bl: 'M48 56 L56 55', br: 'M64 56 L72 57.5' },
    pushback: { mouth: 'M54 77 L66 77', bl: 'M48 55.5 L56 58', br: 'M64 58 L72 55.5' },
    worried:  { mouth: 'M55 78 Q60 75 65 78', bl: 'M48 58 L56 55.5', br: 'M64 55.5 L72 58' },
    serious:  { mouth: 'M54 77 L66 77', bl: 'M48 57.5 L56 57.5', br: 'M64 57.5 L72 57.5' }
  };

  function hardHat(color, extra) {
    return '<path d="M37 55 C37 33 83 33 83 55 Z" fill="' + color + '" stroke="' + INK + '" stroke-width="2" stroke-linejoin="round"/>' +
      '<path d="M57 36 Q60 34 63 36 L63 54 L57 54 Z" fill="rgba(0,0,0,.08)"/>' +
      '<path d="M30 55 L90 55 Q93 60 88 60.5 L32 60.5 Q27 60 30 55 Z" fill="' + color + '" stroke="' + INK + '" stroke-width="2" stroke-linejoin="round"/>' +
      (extra || '');
  }

  function avatarSVG(id, mood) {
    var L = LOOKS[id] || LOOKS.narrator;
    var M = MOODS[mood] || MOODS[id === 'ray' ? 'proud' : 'calm'];
    var s = [];
    s.push('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img">');
    s.push('<defs><clipPath id="c"><circle cx="60" cy="60" r="60"/></clipPath></defs>');
    s.push('<g clip-path="url(#c)">');
    s.push('<rect width="120" height="120" fill="' + L.bg + '"/>');
    // back hair (braids for Tasha)
    if (id === 'tasha') {
      s.push('<g stroke="' + L.hair + '" stroke-width="5.5" stroke-linecap="round">' +
        '<path d="M42 60 L37 98"/><path d="M47 62 L44 101"/><path d="M78 60 L83 98"/><path d="M73 62 L76 101"/></g>');
    }
    // torso
    s.push('<path d="M10 122 C12 101 30 92 60 92 C90 92 108 101 110 122 Z" fill="' + L.shirt + '" stroke="' + INK + '" stroke-width="2"/>');
    if (id === 'luis') { // flannel lines
      s.push('<g stroke="rgba(0,0,0,.25)" stroke-width="2"><path d="M30 98 V122"/><path d="M46 93 V122"/><path d="M74 93 V122"/><path d="M90 98 V122"/><path d="M14 108 H106"/></g>');
    }
    if (id === 'marco') { // collar points
      s.push('<path d="M50 90 L60 101 L52 104 Z M70 90 L60 101 L68 104 Z" fill="#DCE8F4" stroke="' + INK + '" stroke-width="1.5"/>');
    }
    if (L.vest) {
      s.push('<path d="M26 98 L45 92 L51 122 L22 122 Z" fill="' + L.vest + '" stroke="' + INK + '" stroke-width="2" stroke-linejoin="round"/>');
      s.push('<path d="M94 98 L75 92 L69 122 L98 122 Z" fill="' + L.vest + '" stroke="' + INK + '" stroke-width="2" stroke-linejoin="round"/>');
      s.push('<path d="M25 110 L48 107 M95 110 L72 107" stroke="#EEF2F5" stroke-width="3.5"/>');
    }
    if (id === 'marco') { // radio
      s.push('<rect x="78" y="100" width="8" height="13" rx="1.5" fill="#1D252D"/><path d="M84 100 V93" stroke="#1D252D" stroke-width="2"/>');
    }
    if (id === 'dee') { // ear protection around the neck
      s.push('<path d="M43 92 Q60 104 77 92" fill="none" stroke="#2F6DB5" stroke-width="4"/>' +
        '<circle cx="42" cy="91" r="6" fill="#2F6DB5" stroke="' + INK + '" stroke-width="1.5"/><circle cx="78" cy="91" r="6" fill="#2F6DB5" stroke="' + INK + '" stroke-width="1.5"/>');
    }
    // neck + head
    s.push('<rect x="52" y="78" width="16" height="16" fill="' + L.skin + '" stroke="' + INK + '" stroke-width="2"/>');
    s.push('<circle cx="41" cy="65" r="4.5" fill="' + L.skin + '" stroke="' + INK + '" stroke-width="2"/><circle cx="79" cy="65" r="4.5" fill="' + L.skin + '" stroke="' + INK + '" stroke-width="2"/>');
    s.push('<ellipse cx="60" cy="63" rx="19" ry="22" fill="' + L.skin + '" stroke="' + INK + '" stroke-width="2"/>');
    // side hair / sideburns
    if (id === 'marco' || id === 'dee' || id === 'safety' || id === 'narrator') {
      s.push('<path d="M42 58 Q42 66 44 70 L46 60 Z M78 58 Q78 66 76 70 L74 60 Z" fill="' + L.hair + '"/>');
    }
    if (id === 'luis') s.push('<path d="M42 57 Q41 64 43 68 L45 58 Z M78 57 Q79 64 77 68 L75 58 Z" fill="#9A938C"/>');
    // beard (Ray)
    if (id === 'ray') {
      s.push('<path d="M41.5 64 C42 84 51 91 60 91 C69 91 78 84 78.5 64 C76 74 70 79 60 79 C50 79 44 74 41.5 64 Z" fill="' + L.hair + '" stroke="' + INK + '" stroke-width="1.5"/>');
      s.push('<path d="M51 74 Q60 69.5 69 74 Q60 76.5 51 74 Z" fill="#8A8A8A"/>');
    }
    if (id === 'luis') s.push('<path d="M51.5 73.5 Q60 69 68.5 73.5 Q60 76 51.5 73.5 Z" fill="#3B2A20"/>');
    // eyes / brows / nose / mouth
    s.push('<circle cx="53" cy="63.5" r="2.2" fill="' + INK + '"/><circle cx="67" cy="63.5" r="2.2" fill="' + INK + '"/>');
    s.push('<path d="' + M.bl + '" stroke="' + (id === 'ray' ? '#7E7E7E' : L.hair) + '" stroke-width="2.6" stroke-linecap="round"/>');
    s.push('<path d="' + M.br + '" stroke="' + (id === 'ray' ? '#7E7E7E' : L.hair) + '" stroke-width="2.6" stroke-linecap="round"/>');
    s.push('<path d="M60 64 Q58 70 61 71" fill="none" stroke="' + INK + '" stroke-width="1.6" stroke-linecap="round"/>');
    s.push('<path d="' + M.mouth + '" fill="none" stroke="' + (id === 'ray' ? '#5A3E32' : INK) + '" stroke-width="2.2" stroke-linecap="round"/>');
    if (id === 'marco') {
      s.push('<g fill="none" stroke="' + INK + '" stroke-width="1.8"><circle cx="53" cy="63.5" r="5.2"/><circle cx="67" cy="63.5" r="5.2"/><path d="M58.2 63 L61.8 63"/></g>');
    }
    if (id === 'tasha') s.push('<circle cx="41" cy="71" r="1.8" fill="#E8B84A"/><circle cx="79" cy="71" r="1.8" fill="#E8B84A"/>');
    // headwear
    if (id === 'luis') {
      s.push('<path d="M40 57 C40 37 80 37 80 57 Z" fill="' + L.hat + '" stroke="' + INK + '" stroke-width="2"/>' +
        '<path d="M58 55 L94 56.5 Q97 61 90 61.5 L58 59 Z" fill="' + L.hat + '" stroke="' + INK + '" stroke-width="2" stroke-linejoin="round"/>' +
        '<circle cx="60" cy="39" r="2" fill="' + INK + '"/>');
    } else {
      var extra = '';
      if (id === 'tasha') extra = '<rect x="63" y="42" width="12" height="8" rx="1.5" fill="#F26B1D" stroke="' + INK + '" stroke-width="1.2"/><path d="M66 46 h6" stroke="#fff" stroke-width="1.6"/>';
      if (id === 'ray') extra = '<rect x="44" y="45.5" width="12" height="6" rx="2.5" fill="#1D252D"/><rect x="64" y="45.5" width="12" height="6" rx="2.5" fill="#1D252D"/><path d="M56 48 h8" stroke="#1D252D" stroke-width="1.6"/>';
      if (id === 'dee') extra = '<circle cx="70" cy="46" r="3.2" fill="#FFC629" stroke="' + INK + '" stroke-width="1"/>';
      s.push(hardHat(L.hat, extra));
    }
    s.push('</g>');
    s.push('<circle cx="60" cy="60" r="59" fill="none" stroke="rgba(0,0,0,.12)" stroke-width="2"/>');
    s.push('</svg>');
    return s.join('');
  }

  FP.avatar = function (id, size, mood) {
    var el = svgFrom(avatarSVG(id, mood));
    var c = FP.char(id);
    size = size || 48;
    el.setAttribute('width', size); el.setAttribute('height', size);
    el.setAttribute('class', 'fp-avatar');
    el.setAttribute('aria-label', (c.name || id) + (c.role ? ', ' + c.role : ''));
    // unique clip id per instance
    var cid = FP.uid('clip');
    var cp = el.querySelector('clipPath'); if (cp) cp.setAttribute('id', cid);
    var g = el.querySelector('g[clip-path]'); if (g) g.setAttribute('clip-path', 'url(#' + cid + ')');
    return el;
  };
  FP.avatarSVG = avatarSVG;

  /* ---------------- Icons (24×24 stroke, currentColor) ---------------- */
  var ICONS = {
    hardhat: '<path d="M3 17h18v2H3zM5 17v-2a7 7 0 0 1 14 0v2"/><path d="M10 8.3V13M14 8.3V13"/>',
    harness: '<path d="M8 3l4 6 4-6"/><path d="M12 9v6"/><path d="M7 21l5-6 5 6"/><path d="M7.5 12.5h9"/><circle cx="12" cy="6.2" r="1.2"/>',
    anchor: '<circle cx="12" cy="6" r="3"/><path d="M12 9v12"/><path d="M5 14a7 7 0 0 0 14 0"/><path d="M8 12h8"/>',
    guardrail: '<path d="M3 7h18M3 13h18M3 19h18"/><path d="M5 7v12M12 7v12M19 7v12"/>',
    hole: '<path d="M3 10l9-5 9 5-9 5-9-5z"/><path d="M8 10.2l4 2.2 4-2.2"/><path d="M3 10v4l9 5 9-5v-4"/>',
    roof: '<path d="M2 12l10-7 10 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/>',
    ladder: '<path d="M7 3v18M17 3v18M7 7h10M7 12h10M7 17h10"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    alert: '<path d="M12 3.5l9.5 16.5h-19z"/><path d="M12 10v4.5M12 17.5v.01"/>',
    book: '<path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5z"/><path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19v-3"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5M4 20h16"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    play: '<path d="M7 4.5l12 7.5-12 7.5z"/>',
    pause: '<path d="M7 4.5h3.5v15H7zM13.5 4.5H17v15h-3.5z"/>',
    stop: '<rect x="6" y="6" width="12" height="12" rx="1"/>',
    volume: '<path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    lock: '<rect x="5.5" y="10.5" width="13" height="10" rx="1.5"/><path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3"/>',
    flag: '<path d="M5 21V4"/><path d="M5 4h12l-2.5 4.5L17 13H5"/>',
    eye: '<path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3.5 17.5l3 3 5.8-5.8a4 4 0 0 0 5.4-5.4l-2.4 2.4-2.6-.5-.5-2.6z"/>',
    chat: '<path d="M4 5h16v11H9.5L5 19.5V16H4z"/><path d="M8 9.5h8M8 12.5h5"/>',
    star: '<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.8z"/>',
    map: '<path d="M9 4.5L3.5 6.5v13l5.5-2 6 2 5.5-2v-13l-5.5 2z"/><path d="M9 4.5v13M15 6.5v13"/>',
    list: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4.5 6h.01M4.5 12h.01M4.5 18h.01" stroke-width="3"/>',
    'arrow-right': '<path d="M4 12h15M13 6l6 6-6 6"/>',
    'arrow-left': '<path d="M20 12H5M11 6l-6 6 6 6"/>',
    'chevron-down': '<path d="M6 9l6 6 6-6"/>',
    'chevron-right': '<path d="M9 6l6 6-6 6"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M5.2 18.8l1.4-1.4M17.4 6.6l1.4-1.4"/>',
    moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
    monitor: '<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8.5 20h7M12 16v4"/>',
    home: '<path d="M3.5 11L12 4l8.5 7"/><path d="M6 9.5V20h12V9.5"/>',
    award: '<circle cx="12" cy="9" r="5.5"/><path d="M8.5 13.5L7 21l5-2.5 5 2.5-1.5-7.5"/>',
    file: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14.3-4.3L4 8.5M4 4v4.5h4.5"/><path d="M4 13a8 8 0 0 0 14.3 4.3L20 15.5M20 20v-4.5h-4.5"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/>',
    shield: '<path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
    quote: '<path d="M9.5 7H6a1 1 0 0 0-1 1v4h4v4l-2 2M18.5 7H15a1 1 0 0 0-1 1v4h4v4l-2 2"/>'
  };

  FP.icon = function (name, size, cls) {
    var body = ICONS[name] || ICONS.star;
    var el = svgFrom('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + body + '</svg>');
    el.setAttribute('width', size || 20); el.setAttribute('height', size || 20);
    el.setAttribute('class', 'fp-icon' + (cls ? ' ' + cls : ''));
    return el;
  };
  FP.iconNames = Object.keys(ICONS);

  /* ---------------- Backdrops ---------------- */
  FP.art = FP.art || {};
  /** Structural steel frame elevation drawn in currentColor — fallback for hero bands. */
  FP.art.frame = function () {
    var p = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true" class="fp-frame-art">',
      '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="square">'];
    var floors = [400, 316, 232, 148, 64];
    var cols = [80, 300, 520, 740, 960, 1180];
    floors.forEach(function (y, i) { if (i === 4) p.push('<path d="M60 ' + y + ' H1200" stroke-width="5"/>'); else p.push('<path d="M60 ' + y + ' H1200" stroke-width="' + (i === 0 ? 6 : 4) + '"/>'); });
    cols.forEach(function (x) { p.push('<path d="M' + x + ' 400 V64" stroke-width="6"/>'); });
    // bracing in two bays
    p.push('<path d="M300 400 L520 316 M300 316 L520 400 M740 232 L960 148 M740 148 L960 232" stroke-width="2" opacity=".7"/>');
    // deck lines
    for (var x = 90; x < 1180; x += 22) p.push('<path d="M' + x + ' 64 v-8" stroke-width="1.5" opacity=".6"/>');
    // perimeter cable rail on top deck
    p.push('<path d="M60 22 H1200 M60 40 H1200" stroke-width="1.5" opacity=".8"/>');
    for (var c = 80; c <= 1180; c += 110) p.push('<path d="M' + c + ' 64 V18" stroke-width="2"/>');
    // crane
    p.push('<path d="M1080 64 V-200 M940 -150 H1200 M1080 -200 L940 -150 M1080 -200 L1200 -150" stroke-width="3"/>');
    p.push('<path d="M990 -150 V0" stroke-width="1.5"/><rect x="975" y="0" width="30" height="16" stroke-width="2"/>');
    p.push('</g></svg>');
    return svgFrom(p.join(''));
  };

})(window);
