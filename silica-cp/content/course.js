/* ==========================================================================
   COURSE — Silica Competent Person: metadata, characters, story world and
   registration helpers. Every other content file calls COURSE.addModule /
   addMedia / addScene / setExam.  Spec: docs/SILICA-BUILD-SPEC.md
   ========================================================================== */
(function (root) {
  'use strict';
  var COURSE = {
    meta: {
      id: 'SCP-2026',
      title: 'Silica Competent Person',
      subtitle: 'The dust that hurts you is the dust you can\'t see. Your job is to keep the controls working.',
      org: 'Upchurch',
      version: '1.0 (Nov 2026)',
      minutes: 120,
      audience: 'Foremen and lead hands being designated as silica competent persons',
      standards: ['29 CFR 1926.1153 Respirable Crystalline Silica (construction), including Table 1', '29 CFR 1926.32(f)',
                  '29 CFR 1910.134 Respiratory Protection', '29 CFR 1910.1200 Hazard Communication', '29 CFR 1910.1020 Access to exposure and medical records',
                  'Course design: ANSI/ASSP Z490.1'],
      passRule: '80% overall, 100% on critical items, 3 attempts',
      certPrefix: 'SCP',
      certStandards: '29 CFR 1926.1153 · Table 1 · 1910.134',
      homeFacts: [['2 hours', 'self-paced, 10 parts'], ['5–25 min', 'per module, bookmarked'], ['80% + 100%', 'overall + 5 critical items'], ['Field sign-off', 'before designation']],
      commitmentFile: 'my-silica-commitment.png',
      verificationHero: 'img_m8_hero',
      certificate: 'Silica Competent Person: Knowledge Component Complete. This certificate confirms completion of online training only. The holder is not designated as a competent person until the employer\'s field verification is signed and the employer grants authority to take prompt corrective measures under 29 CFR 1926.1153(b) and (g)(4).',
      disclaimer: 'Riverside Medical Office and every character in this course are fictional composites. No real incident or company is named.',
      fieldItems: [
        ['Walks an active work area and identifies existing and foreseeable silica tasks, including other employers\' work', 'Module 3'],
        ['Checks Table 1 controls on two real tasks (water flow, shroud and dust collector, filter condition, airflow) and decides if they are fully and properly implemented', 'Module 4'],
        ['Confirms the required respirator for each task, including duration and indoor or outdoor work', 'Modules 4 & 6'],
        ['Checks that respirator users are medically cleared and fit tested', 'Module 6'],
        ['Checks housekeeping: no dry sweeping or compressed air; HEPA vacuum or wet methods in use', 'Module 6'],
        ['Reviews the site\'s written exposure control plan and confirms it matches the tasks being performed', 'Module 7'],
        ['Inspects an enclosed cab, if heavy equipment is on site', 'Module 4'],
        ['Demonstrates a corrective-action or stop-work conversation (role-play with the safety manager is acceptable)', 'Modules 2 & 8']
      ],
      blueprint: { slots: 25, critical: 5, kcMax: 7, areas: { m1: 2, m2: 3, m3: 3, m4: 7, m5: 3, m6: 4, m7: 3 } },
      storyboard: {
        totalTime: '120 minutes (orientation, 7 modules, capstone, final exam), self-paced, bookmarked between modules',
        variables: 'Variables are named by activity: M3_TasksFound, M3_Misses, M4_T1_Score, M4_ShiftHours, M4_RespReq, M4_FixCount, M5_Path, M6_Cleared, M7_GapsFound, M8_Score. Completion: a "Complete" trigger at the end slide (Rise: "Complete block above" Continue).',
        exam: 'Exam: Storyline quiz with question banks (one bank per exam slot, draw 1 of 3), results slide at 80%, plus a critical-items variable (all 5 must be correct) checked before "Pass" is reported. SCORM 1.2 reports one score and passed/failed.',
        storyline: 'One Storyline file per module (e.g. SCP_M4_Table1.story); each interaction is its own scene so it can be published as a separate Storyline block.'
      }
    },

    project: {
      name: 'Riverside Medical Office',
      summary: '4-story steel frame medical office building, now in the concrete, core drilling and masonry phase.',
      facts: [
        ['Frame', 'Structural steel, composite metal deck, cast-in-place slabs (same building as the fall protection course)'],
        ['This phase', 'Slab saw cutting and core drilling for MEP on Levels 1 to 3; CMU elevator and stair cores; brick veneer and tuckpointing at the main entrance'],
        ['Materials', 'Concrete slabs, CMU block, clay brick, mortar, fiber-cement panels on the canopy, quartz (engineered stone) countertops in the clinic'],
        ['Equipment', 'Handheld and walk-behind saws, core rig, rotary hammers, jackhammers, tuckpoint grinders, a stationary masonry saw, a skid steer'],
        ['Trades', 'GC self-performs concrete and masonry; drywall, electrical and plumbing subs working the same floors'],
        ['Schedule', 'Owner walkthrough Friday; clinic opening date fixed; the super is getting daily calls'],
        ['Rhythm', '6:30 a.m. huddle; cutting and coring start at 7:00']
      ]
    },

    characters: {
      ray:   { id: 'ray',   name: 'Ray',   role: 'Foreman, 28 years in',
               carries: 'Cut dry his whole career and feels fine. The "it\'s just dust" voice who comes around by the end.',
               hat: 'white', look: 'gray beard, sunglasses on hat brim' },
      tasha: { id: 'tasha', name: 'Tasha', role: 'Lead hand, newly designated silica competent person',
               carries: 'Your stand-in. Makes the calls, gets pushback, sometimes gets it wrong.',
               hat: 'white', look: 'orange CP sticker on hat, braids' },
      dee:   { id: 'dee',   name: 'Dee',   role: 'Second-year apprentice',
               carries: 'Runs the saw and the grinder. Does what the crew does. The person you protect.',
               hat: 'green', look: 'young, ear protection around neck' },
      marco: { id: 'marco', name: 'Marco', role: 'Superintendent',
               carries: 'Not a villain. Schedule, owner and money pressure. Responds to the right argument.',
               hat: 'white', look: 'collared shirt, radio, glasses' },
      walt:  { id: 'walt',  name: 'Walt',  role: 'Retired mason, 38 years on the tools',
               carries: 'Lives with silicosis. Tells his story in his own words.',
               hat: 'none', look: 'flat cap, cardigan, oxygen cannula' },
      gus:   { id: 'gus',   name: 'Gus',   role: 'Drywall foreman (another employer)',
               carries: '"That\'s the concrete sub\'s dust, not mine." Learns it\'s his crew breathing it.',
               hat: 'yellow', look: 'orange vest, stilts leaning nearby' },
      safety:{ id: 'safety', name: 'Jordan', role: 'Safety manager',
               carries: 'Signs your field verification.', hat: 'blue', look: 'tablet' },
      narrator: { id: 'narrator', name: 'Crew', role: 'Narrator', carries: '', hat: 'none', look: '' }
    },

    /* Module order is fixed; files register into these slots. */
    order: ['m0', 'm1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8'],
    outline: [
      { id: 'm0', num: 0, title: 'Start here: why silica, why you', minutes: 5, build: 'Rise' },
      { id: 'm1', num: 1, title: 'The dust you can\'t see', minutes: 10, build: 'Rise + Storyline' },
      { id: 'm2', num: 2, title: 'Your authority and when the rule applies', minutes: 12, build: 'Rise + Storyline' },
      { id: 'm3', num: 3, title: 'Finding silica on the site', minutes: 12, build: 'Storyline' },
      { id: 'm4', num: 4, title: 'Table 1 in the field', minutes: 25, build: 'Storyline' },
      { id: 'm5', num: 5, title: 'Off the table: exposure assessment', minutes: 10, build: 'Rise + Storyline' },
      { id: 'm6', num: 6, title: 'Respirators, housekeeping and access', minutes: 12, build: 'Storyline + Rise' },
      { id: 'm7', num: 7, title: 'The plan, the paperwork and the crew', minutes: 14, build: 'Rise + Storyline' },
      { id: 'm8', num: 8, title: 'Capstone: one shift at Riverside', minutes: 8, build: 'Storyline' },
      { id: 'exam', num: 'Exam', title: 'Final assessment', minutes: 12, build: 'LMS / Storyline quiz' }
    ],

    modules: [],
    media: {},
    scenes: {},
    exam: null,

    addModule: function (m) {
      var i = this.modules.findIndex(function (x) { return x.id === m.id; });
      if (i >= 0) this.modules[i] = m; else this.modules.push(m);
      var order = this.order;
      this.modules.sort(function (a, b) { return order.indexOf(a.id) - order.indexOf(b.id); });
      return m;
    },
    addMedia: function (map) { Object.assign(this.media, map); },
    addScene: function (id, scene) { scene.id = id; this.scenes[id] = scene; },
    audio: {},          // clipKey → [src, seconds]  (generated: content/audio.js)
    addAudio: function (map) { Object.assign(this.audio, map); },
    setExam: function (exam) { this.exam = exam; },
    getModule: function (id) { return this.modules.find(function (m) { return m.id === id; }) || null; }
  };
  root.COURSE = COURSE;
})(typeof window !== 'undefined' ? window : globalThis);
