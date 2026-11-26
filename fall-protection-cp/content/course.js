/* ==========================================================================
   COURSE — metadata, characters, story world and registration helpers.
   Every other content file calls COURSE.addModule / addMedia / addScene / setExam.
   ========================================================================== */
(function (root) {
  'use strict';
  var COURSE = {
    meta: {
      id: 'FPCP-2026',
      title: 'Fall Protection Competent Person',
      subtitle: 'What you notice. What you tolerate. What you say when the schedule is pushing.',
      org: 'Upchurch',
      version: '1.0 (Nov 2026)',
      minutes: 360,
      audience: 'Foremen and lead hands being designated as fall protection competent persons',
      standards: ['29 CFR 1926.32(f)', '29 CFR 1926 Subpart M (1926.500–503)', 'ANSI/ASSP Z359.2 and Z359 equipment standards',
                  'ANSI/ASSP A10.32', 'Course design: ANSI/ASSP Z490.1'],
      passRule: '80% overall, 100% on critical items, 3 attempts',
      certificate: 'Fall Protection Competent Person: Knowledge Component Complete. This certificate confirms completion of online training only. The holder is not designated as a competent person until the employer\'s field verification is signed and the employer grants authority to take prompt corrective measures under 29 CFR 1926.32(f).',
      disclaimer: 'Riverside Medical Office and every character in this course are fictional composites. No real incident or company is named.'
    },

    project: {
      name: 'Riverside Medical Office',
      summary: '4-story structural steel frame, composite metal deck with concrete slabs, low-slope TPO roof.',
      facts: [
        ['Frame', 'Structural steel, composite metal deck, cast-in-place slabs'],
        ['Height', '4 stories, 14 ft floor to floor'],
        ['Roof', 'Low-slope TPO, 180 ft × 96 ft, 24 in parapet on the east side only, two atrium skylights'],
        ['Openings', '1 elevator shaft, 2 stair openings, MEP penetrations on every deck'],
        ['Schedule', '2 weeks behind after a steel delivery slip'],
        ['Owner', 'Regional health system; wants turnover before flu season'],
        ['Rhythm', '6:30 a.m. huddle, pours start 7:00']
      ]
    },

    characters: {
      ray:   { id: 'ray',   name: 'Ray',   role: 'Foreman, 28 years in',
               carries: 'Knows everything, cuts corners he has "earned". The normalization-of-risk voice who comes around by the end.',
               hat: 'white', look: 'gray beard, sunglasses on hat brim' },
      tasha: { id: 'tasha', name: 'Tasha', role: 'Lead hand, newly designated competent person',
               carries: 'Your stand-in. Makes calls, gets pushback, sometimes gets it wrong.',
               hat: 'white', look: 'orange CP sticker on hat, braids' },
      dee:   { id: 'dee',   name: 'Dee',   role: 'Second-year apprentice',
               carries: 'Watches what the crew does, not what the rules say. The person you protect.',
               hat: 'green', look: 'young, ear protection around neck' },
      marco: { id: 'marco', name: 'Marco', role: 'Superintendent',
               carries: 'Not a villain. Schedule, owner and money pressure. Responds to the right argument.',
               hat: 'white', look: 'collared shirt, radio, glasses' },
      luis:  { id: 'luis',  name: 'Luis',  role: 'Survived a fall, 9 years ago',
               carries: 'Tied off and still hit the slab. Tells it in his own words.',
               hat: 'none', look: 'cap, cane leaning nearby' },
      safety:{ id: 'safety', name: 'Jordan', role: 'Safety manager',
               carries: 'Signs your field verification.', hat: 'blue', look: 'tablet' },
      narrator: { id: 'narrator', name: 'Crew', role: 'Narrator', carries: '', hat: 'none', look: '' }
    },

    /* Module order is fixed; files register into these slots. */
    order: ['m0', 'm1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9'],
    outline: [
      { id: 'm0', num: 0, title: 'Start here: why you, why now', minutes: 15, build: 'Rise' },
      { id: 'm1', num: 1, title: 'The fall that didn\'t have to happen', minutes: 30, build: 'Rise + Storyline' },
      { id: 'm2', num: 2, title: 'The competent person: your authority and your duty', minutes: 30, build: 'Rise + Storyline' },
      { id: 'm3', num: 3, title: 'Reading the site: where falls happen', minutes: 45, build: 'Storyline' },
      { id: 'm4', num: 4, title: 'Picking the right system', minutes: 45, build: 'Storyline' },
      { id: 'm5', num: 5, title: 'Anchors, connectors and clearance', minutes: 45, build: 'Storyline' },
      { id: 'm6', num: 6, title: 'Inspection: trust nothing you haven\'t checked', minutes: 40, build: 'Storyline + Rise' },
      { id: 'm7', num: 7, title: 'Rescue: the plan before the fall', minutes: 30, build: 'Rise + Storyline' },
      { id: 'm8', num: 8, title: 'Leading the crew: training, pressure and stop work', minutes: 35, build: 'Storyline' },
      { id: 'm9', num: 9, title: 'Capstone: one shift at Riverside', minutes: 20, build: 'Storyline' },
      { id: 'exam', num: 'Exam', title: 'Final assessment', minutes: 25, build: 'LMS / Storyline quiz' }
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
    setExam: function (exam) { this.exam = exam; },
    getModule: function (id) { return this.modules.find(function (m) { return m.id === id; }) || null; }
  };
  root.COURSE = COURSE;
})(typeof window !== 'undefined' ? window : globalThis);
