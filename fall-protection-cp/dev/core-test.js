/* DEV ONLY — exercises every core block. Not shipped. */
COURSE.addMedia({
  dev_img: { type: 'image', src: 'dev/scene.svg', alt: 'Test scene', credit: 'Dev placeholder', license: 'n/a' },
  dev_vid: { type: 'video', youtube: 'dQw4w9WgXcQ', title: 'Test video title', channel: 'Test channel', duration: '3:32', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', why: 'how the anchor is placed' }
});
COURSE.addScene('devscene', { src: 'dev/scene.svg', w: 1600, h: 900, title: 'Dev scene',
  hazards: [
    { id: 'edge', x: 40, y: 30, w: 8, h: 15, label: 'Open edge', why: 'w', fix: 'f', cite: '1926.501(b)(1)', severity: 3 },
    { id: 'worker', x: 58, y: 28, w: 7, h: 14, label: 'Worker outside rail', why: 'w', fix: 'f', cite: '1926.501(b)(1)', severity: 3 }
  ],
  decoys: [{ id: 'col', x: 85, y: 25, w: 6, h: 45, label: 'Column', why: 'fine' }] });

COURSE.addModule({
  id: 'mtest', num: 'T', title: 'Core block test module', minutes: 20, build: 'Rise', tagline: 'Every core block in one place.',
  hero: 'dev_img',
  objectives: ['See every block render.', 'Check <b>gating</b> and completion.'],
  citations: ['1926.32(f)', '1926.502(d)(16)'],
  jobAids: [{ title: 'Pocket clearance card', file: 'jobaids/pocket-clearance-card.html', pdf: 'jobaids/pdf/pocket-clearance-card.pdf', desc: 'Front and back, cut to wallet size.' }],
  lessons: [
    { id: 'mtest-l1', title: 'Story blocks', minutes: 5, blocks: [
      { type: 'hero', kicker: 'Lesson opener', title: 'The deck edge at 6:40 a.m.', text: 'Ray is already outside the cable rail. The bundle is swinging in. What do you notice first?', narration: 'Ray is already outside the cable rail. The bundle is swinging in. What do you notice first?' },
      { type: 'text', heading: 'Why this matters', body: ['Most of you already know how to tie off. This course is about <b>what you stop seeing</b>.', 'Citations show up as receipts: <cite>1926.501(b)(1)</cite>. <span class="hl">Highlight</span> works too.'], narration: 'Most of you already know how to tie off.' },
      { type: 'quote', speaker: 'ray', mood: 'proud', text: 'I\'ve been doing this 28 years. What\'s a course going to tell me?' },
      { type: 'quote', speaker: 'marco', mood: 'pushback', text: 'We\'re two weeks behind. Not your call.' },
      { id: 'mtest-dl', type: 'dialogue', title: 'At the huddle', lines: [
        { speaker: 'marco', text: 'Pour starts at seven. Where are we?' },
        { speaker: 'tasha', text: 'Rail on the east side is down for the pump hose.' },
        { speaker: 'ray', text: 'I\'ll watch the edge. Done it a hundred times.' },
        { speaker: 'dee', text: 'Should I clip somewhere?' }] },
      { type: 'continue' },
      { type: 'image', media: 'dev_img', caption: 'Level 3 deck, east side.' },
      { type: 'image', media: 'missing_id' },
      { type: 'video', media: 'dev_vid', caption: 'Optional video.' },
      { type: 'callout', variant: 'field-check', title: 'Field check', body: 'When did you last see a rail down for a delivery?', input: true },
      { type: 'callout', variant: 'receipt', body: 'Free fall is limited to 6 feet.', cite: '1926.502(d)(16)(iii)' },
      { type: 'callout', variant: 'warning', body: 'A guardrail is not an anchor.', cite: '1926.502(d)(23)' },
      { type: 'callout', variant: 'tip', body: 'Walk the edge before the pour.' },
      { type: 'callout', variant: 'skip', body: 'Skip ahead if you know this.' },
      { type: 'callout', variant: 'note', body: 'A note.' },
      { type: 'callout', variant: 'monday', title: 'Monday move', body: 'Print the clearance card.' },
      { type: 'stats', items: [{ value: '421', label: 'construction workers died in falls (sample)', source: 'BLS CFOI (sample)' }, { value: '#1', label: 'most-cited OSHA standard', source: 'OSHA Top 10' }, { value: '6 ft', label: 'trigger height in construction', source: '1926.501(b)(1)' }], note: 'Numbers verified at build.' }
    ] },
    { id: 'mtest-l2', title: 'Explore blocks', minutes: 5, blocks: [
      { type: 'cards', title: 'Myth or field truth', mode: 'myth', cards: [
        { front: 'Experienced guys don\'t fall.', back: 'Experience changes what you notice, not gravity.', verdict: 'myth' },
        { front: 'If I\'m tied off, I\'m safe.', back: 'Not if the clearance is too short.', verdict: 'myth', cite: '1926.502(d)(16)' },
        { front: 'Six feet triggers protection.', back: 'In construction, yes.', verdict: 'truth', cite: '1926.501(b)(1)' }] },
      { type: 'cards', mode: 'plain', cards: [{ front: 'Competent', back: 'Identifies hazards and has authority.' }, { front: 'Qualified', back: 'Degree or extensive experience.' }] },
      { type: 'accordion', items: [{ title: 'Guardrails', body: '42 in ± 3 in.' }, { title: 'Covers', body: 'Twice the load.' }] },
      { type: 'tabs', items: [{ title: 'Competent', body: 'Can identify and fix.' }, { title: 'Qualified', body: 'Can design.', media: 'dev_img' }, { title: 'Authorized', body: 'Uses the gear.' }] },
      { type: 'process', title: 'Rescue in five', steps: [{ title: 'Call it', body: 'Shout and radio.' }, { title: 'Reach', body: 'Lift or ladder.' }, { title: 'Relieve', body: 'Trauma straps.' }] },
      { type: 'timeline', items: [{ label: '6:30 a.m.', title: 'Huddle', body: 'Plan the pour.' }, { label: '6:40 a.m.', title: 'Rail down', body: 'For the hose.' }] },
      { type: 'labeled', src: 'dev/scene.svg', alt: 'Deck', markers: [{ x: 40, y: 36, title: 'Open edge', body: 'Rail removed.' }, { x: 61, y: 35, title: 'Ray', body: 'Outside the rail.' }] },
      { type: 'table', title: 'Who signs what', headers: ['Role', 'Can', 'Cannot'], rows: [['Competent', 'Inspect, remove from service', 'Design anchors'], ['Qualified', 'Design', '—']], note: 'Z359.2 roles.' },
      { type: 'pyramid', title: 'Hierarchy', levels: [{ title: 'Eliminate', body: 'Work from the ground.' }, { title: 'Guard', body: 'Guardrails, covers.' }, { title: 'Restrain', body: 'Travel restraint.' }, { title: 'Arrest', body: 'PFAS, nets.' }, { title: 'Administrative', body: 'Monitors, warning lines.' }] },
      { id: 'mtest-poll', type: 'poll', question: 'How many times this year did you see someone exposed at 6 ft or more?', options: [{ label: 'Never', pct: 4 }, { label: '1–5', pct: 31 }, { label: '6–20', pct: 42 }, { label: 'More than 20', pct: 23 }] },
      { id: 'mtest-rf', type: 'reflect', prompt: 'What\'s one shortcut on your site everybody accepts?' }
    ] },
    { id: 'mtest-l3', title: 'Decision blocks', minutes: 5, blocks: [
      { id: 'mtest-mcq1', type: 'mcq', question: 'Ray wants to clip to the guardrail cable. Your call?', options: [{ text: 'Fine if it\'s tight', correct: false, fb: 'Rails aren\'t designed for fall arrest loads.' }, { text: 'No, find a rated anchor', correct: true, fb: 'Right.' }], explain: 'Guardrails are not anchors.', cite: '1926.502(d)(23)' },
      { id: 'mtest-mcq2', type: 'mcq', multi: true, question: 'Which are covers rules?', options: [{ text: 'Twice the load', correct: true }, { text: 'Marked HOLE or COVER', correct: true }, { text: 'Painted orange', correct: false }], explain: 'Load, secured, marked.', cite: '1926.502(i)' },
      { type: 'continue', label: 'Keep going' },
      { id: 'mtest-to', type: 'testout', title: 'Know the trigger heights?', text: 'Two questions. Get both and skip the next lesson.', skips: ['mtest-l4'], questions: [
        { question: 'Trigger height in construction?', options: [{ text: '4 ft' }, { text: '6 ft', correct: true }] },
        { question: 'Max free fall?', options: [{ text: '6 ft', correct: true }, { text: '12 ft' }] }] },
      { id: 'mtest-story', type: 'story', speaker: 'luis', chapters: [
        { title: 'The mezzanine', text: 'Twelve feet up. I was tied off.', choice: { question: 'Where would you have stopped this?', options: [{ text: 'Check clearance', best: true, fb: 'Yes.' }, { text: 'Wear a better harness', fb: 'Harness wasn\'t the issue.' }] } },
        { title: 'The fall', text: 'The lanyard did its job. The slab was too close.' }] },
      { type: 'charintro', characters: ['ray', 'tasha', 'dee', 'marco', 'luis', 'safety'] },
      { type: 'coursemap' },
      { id: 'mtest-cl', type: 'checklist', title: 'Before the pour', items: ['Rail up on all sides', 'Covers marked', 'Anchors identified'] },
      { type: 'download', title: 'Pocket clearance card', desc: 'Front and back.', file: 'jobaids/pocket-clearance-card.html', pdf: 'jobaids/pdf/pocket-clearance-card.pdf' },
      { type: 'scenario', id: 'mtest-sc', start: 'a', nodes: { a: { text: 'x', choices: [{ text: 'y', next: 'e' }] }, e: { end: true, outcome: 'good', title: 't', text: 't' } } }
    ] },
    { id: 'mtest-l4', title: 'Skippable basics', minutes: 5, blocks: [{ type: 'text', body: 'Basics.' }] }
  ],
  kc: { title: 'Knowledge check', questions: [
    { question: 'Who can return gear that arrested a fall?', options: [{ text: 'Anyone', fb: 'No.' }, { text: 'A competent person after inspection', correct: true, fb: 'Yes.' }], explain: 'Removed until a competent person says otherwise.', cite: '1926.502(d)(19)' },
    { question: 'Guardrail top rail height?', options: [{ text: '42 in ± 3 in', correct: true }, { text: '36 in' }], explain: '39–45 in.', cite: '1926.502(b)(1)' },
    { question: 'Pick the anchors', multi: true, options: [{ text: 'Rated beam clamp', correct: true }, { text: 'Conduit' }, { text: 'Engineered embed', correct: true }], explain: '5,000 lb or engineered.', cite: '1926.502(d)(15)' }] }
});

if (!COURSE.exam) {
  var mk = function (stem, area, critical, pool) { return { id: 'd' + Math.random().toString(36).slice(2, 6), area: area, critical: critical, tag: '', pool: pool }; };
  COURSE.setExam({ rules: { pass: 0.8, attempts: 3, criticalRequired: true, count: 5 }, slots: [
    mk('', 'mtest', true, [
      { type: 'mc', stem: 'Marco says <b>"Not your call."</b> Tasha should:', options: [{ text: 'Back down' }, { text: 'Stop the work and explain the hazard', correct: true }], explain: 'Authority to take prompt corrective measures.', cite: '1926.32(f)', module: 'mtest' },
      { type: 'mc', stem: 'Stop work variant B', options: [{ text: 'A' }, { text: 'B', correct: true }], explain: 'e', cite: '1926.32(f)', module: 'mtest' }]),
    mk('', 'mtest', false, [{ type: 'multi', stem: 'Which are hole cover requirements?', options: [{ text: 'Twice the load', correct: true }, { text: 'Secured', correct: true }, { text: 'Painted red' }], explain: 'e', cite: '1926.502(i)', module: 'mtest' }]),
    mk('', 'mtest', true, [{ type: 'numeric', stem: 'Dee: 6 ft lanyard, foot-level anchor. Required clearance below the deck?', answer: 17.5, tolerance: 0.25, unit: 'ft', explain: '6 + 3.5 + 1 + 5 − 0 + 2 = 17.5', cite: '1926.502(d)(16)', module: 'mtest' }]),
    mk('', 'mtest', false, [{ type: 'sequence', stem: 'Order the rescue steps.', items: ['Call it', 'Reach the worker', 'Relieve suspension', 'Lower and assess'], explain: 'e', cite: '1926.502(d)(20)', module: 'mtest' }]),
    mk('', 'mtest', false, [{ type: 'hotspot', stem: 'Select every fall hazard.', scene: 'devscene', correct: ['edge', 'worker'], explain: 'e', cite: '1926.501(b)(1)', module: 'mtest' }])
  ] });
}
