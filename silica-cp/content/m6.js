/* ==========================================================================
   Module 6 — Respirators, housekeeping and access (12 min · Storyline + Rise)
   Objectives: when respirators are required and respiratory protection
   program basics (APF 10 / APF 25); housekeeping (no dry sweeping or
   compressed air, with the exceptions); restricting access, including
   exposures from other employers.
   ========================================================================== */
COURSE.addModule({
  id: 'm6', num: 6, title: 'Respirators, housekeeping and access', minutes: 12,
  build: 'Storyline + Rise',
  tagline: 'The respirator is the last layer. The broom and the air hose are the first mistakes.',
  hero: 'img_m6_hero',
  objectives: [
    'Explain when respirators are required and the basics of the respiratory protection program: written program, medical evaluation, fit testing, and the APF 10 and APF 25 levels used in Table 1.',
    'Apply the housekeeping rules: no dry sweeping or dry brushing where it could contribute to exposure unless wet sweeping, HEPA vacuuming or other methods are not feasible, and no compressed air for cleaning clothing or surfaces unless used with a system that captures the dust cloud or no alternative is feasible.',
    'Restrict access to work areas to minimize the number of employees exposed, including exposures from other employers.'
  ],
  citations: ['1926.1153(e)', '1926.1153(f)', '1926.1153(g)(1)(iv)', '1910.134(c), (e), (f), (g)(1)', '1910.134(d)(3)(i)(A) Table 1 (APFs)'],
  lessons: [

    /* ------------------------------------------------------------------ */
    { id: 'm6-l1', title: 'Respirators: the last layer', minutes: 5, blocks: [
      { type: 'hero', kicker: 'Module 6', title: 'Respirators, housekeeping and access',
        text: `Who can wear what, how to clean up without making it worse, and how to keep everyone else out of your dust.`,
        media: 'img_m6_hero',
        narration: `Module 6. Three things that go wrong every day: the wrong respirator on the wrong face, the broom and the air hose, and other people wandering into your dust.`,
        sb: { visual: 'Riverside entrance illustration.', search: 'Content Library: brick building exterior with workers', build: 'Rise: Banner block.' } },

      { type: 'table', title: 'The two respirator levels in Table 1',
        headers: ['Table 1 says', 'Assigned protection factor', 'Examples that meet it'],
        rows: [
          ['APF 10', 'Reduces what you breathe to about one tenth', 'Half-mask elastomeric with N95 or P100 filters; N95 filtering facepiece (fit tested)'],
          ['APF 25', 'Reduces it to about one twenty-fifth', 'Loose-fitting PAPR (hood or helmet); full-facepiece respirators also exceed it']
        ],
        note: `A higher-APF respirator always satisfies a lower requirement. A "dust mask" that isn't NIOSH-approved meets neither.`,
        narration: `Table 1 uses two respirator levels. APF ten is a half mask or a fit-tested N95. APF twenty-five is usually a loose-fitting powered air-purifying respirator, a PAPR with a hood or helmet. Anything higher, like a full face, also works. A nuisance dust mask meets neither.`,
        sb: { visual: 'Two-row table with respirator icons.', search: 'half mask respirator; PAPR hood', build: 'Rise: Table block with images.' } },

      { type: 'accordion',
        items: [
          { title: 'When respirators are required', body: `Where Table 1 says so; for tasks not on Table 1 or not fully and properly controlled where exposure is over the PEL; while controls are being installed; where controls aren't feasible or aren't enough. <cite>1926.1153(e)(1)</cite>` },
          { title: 'Written program', body: `Respirator use has to be under a written respiratory protection program run by a program administrator. <cite>1926.1153(e)(2)</cite> <cite>1910.134(c)</cite>` },
          { title: 'Medical evaluation first', body: `Before fit testing or first use, a medical evaluation confirms the worker can wear a respirator. <cite>1910.134(e)</cite>` },
          { title: 'Fit test: before use, then every year', body: `Tight-fitting respirators (half masks, N95s, full faces) need a fit test before first use and at least annually, with the same make, model and size. <cite>1910.134(f)(2)</cite>` },
          { title: 'No facial hair in the seal', body: `Tight-fitting facepieces can't be worn with facial hair that comes between the seal and the face. Loose-fitting PAPRs are the usual answer for beards. <cite>1910.134(g)(1)(i)(A)</cite>` },
          { title: 'Seal check every time', body: `A user seal check each time a tight-fitting respirator goes on. Positive and negative pressure. <cite>1910.134(g)(1)(iii)</cite>` }
        ],
        narration: `Respirator basics, at awareness level. The program administrator runs the program, but you need to know enough to spot a problem. When respirators are required. The written program. Medical evaluation first. Fit test before use and every year. No facial hair in the seal. And a seal check every time it goes on.`,
        sb: { visual: 'Accordion with icons.', search: 'respirator fit test', build: 'Rise: Accordion block.' } },

      { type: 'sort', id: 'm6-respcall', title: 'Respirator call: who can work?',
        prompt: `The tuckpointing and indoor saw crews are lining up. Each needs a respirator under Table 1 today. Who can start?`,
        buckets: [
          { id: 'go', label: 'Can work' },
          { id: 'stop', label: 'Not yet', hint: 'fix it first' }
        ],
        items: [
          { text: 'Dee: half mask, fit tested 8 months ago, medical clearance on file, seal check done', bucket: 'go', fb: `Fit test within the year, medically cleared, seal check done. She's good.` },
          { text: 'Laborer: full beard, wearing a half mask', bucket: 'stop', fb: `The beard breaks the seal. Shave where the seal sits, or switch to a loose-fitting PAPR.` },
          { text: 'Mason: N95 from the truck, never fit tested', bucket: 'stop', fb: `A tight-fitting N95 used as a required respirator needs medical clearance and a fit test.` },
          { text: 'Ray: half mask, last fit test 14 months ago', bucket: 'stop', fb: `Fit tests are at least annual. Get him retested before he grinds.` },
          { text: 'Tuckpointer for 6 hours: loose-fitting PAPR, medically cleared, trained', bucket: 'go', fb: `APF 25, which tuckpointing over 4 hours needs. Loose-fitting PAPRs don't need a fit test.` }
        ],
        summary: `Your job isn't running the program. It's catching the respirator problems before the cutting starts.`,
        narration: `Five workers. Each one needs a respirator today. Who can start, and who has to fix something first?`,
        sb: { visual: 'Five character cards with respirator icons, beard/date details.', search: 'Content Library: worker half mask respirator; worker PAPR hood', build: 'Storyline: drag-and-drop (Can work / Not yet). Variable M6_Cleared.' } },

      { type: 'video', media: 'vid_m6_fit',
        caption: `OSHA's video on respirator fit testing.`,
        watchFor: `Watch the fit test exercises and what makes a test fail.`,
        narration: `Here's OSHA's video on fit testing. It's about twelve minutes. Watch at least the first part, on what fails a test.`,
        sb: { visual: 'Embedded YouTube video.', search: 'n/a (web video)', build: 'Rise: Multimedia > Embed.' } },

      { type: 'continue', label: 'Cleanup before the walkthrough' }
    ] },

    /* ------------------------------------------------------------------ */
    { id: 'm6-l2', title: 'Housekeeping', minutes: 3, blocks: [
      { type: 'scenario', id: 'm6-broom', title: 'Crew talk: the owner\'s walkthrough',
        intro: `Thursday, 3:30 p.m. The owner walks Level 2 at 7 tomorrow. The floor is covered in gray dust from the coring.`,
        start: 'n1',
        nodes: {
          n1: { speaker: 'ray',
            text: `Ray has a push broom in one hand and the air hose in the other. "Fifteen minutes and this floor's clean. Hit the walls with air, sweep it to the stairs."`,
            choices: [
              { text: `"Not with those. The broom and the air throw it all back up, and the plumbers are still working. HEPA vac and a wet sweep. I'll grab the second vac."`, next: 'n2', tone: 'good', fb: `You named the problem and the fix, and you pitched in.`, cite: '1926.1153(f)(1)-(2)' },
              { text: `"Fine, but put a mask on."`, next: 'end_bad', tone: 'bad', fb: `The cloud reaches everyone on the floor, not just Ray.` },
              { text: `"Just do the floor with the broom, skip the air."`, next: 'n1b', tone: 'ok', fb: `Half right. Dry sweeping is out too, where it could add to exposure.` }
            ] },
          n1b: { speaker: 'ray',
            text: `"It's a broom, Tasha. We've swept floors for a hundred years."`,
            choices: [
              { text: `"And a hundred years of masons ended up like Walt. Mist it first and sweep wet, or vac it. Same fifteen minutes."`, next: 'n2', tone: 'good', fb: `Wet sweeping or HEPA vacuuming are the default. Dry sweeping only when those aren't feasible.` }
            ] },
          n2: { speaker: 'ray',
            text: `Ray: "The vac's going to take forever on the walls."`,
            choices: [
              { text: `"Vac the floor and sills. Wipe the walls with a damp rag where the owner will see. Nobody's blowing anything down."`, next: 'end_good', tone: 'good', fb: `Compressed air only with a system that captures the dust cloud, or when there's no feasible alternative. Here there are alternatives.`, cite: '1926.1153(f)(2)' },
              { text: `"Fine, blow the walls down but nobody else is on the floor."`, next: 'end_ok', tone: 'ok', fb: `The plumbers are still there. And a vac is a feasible alternative.` }
            ] },
          end_good: { end: true, outcome: 'good', title: 'Clean floor, clean air',
            text: `Done by 4:20. The owner walked a clean floor the next morning. Ray admitted the vac "didn't suck," which was the joke he'd been saving all afternoon.`,
            cite: '1926.1153(f)' },
          end_ok: { end: true, outcome: 'ok', title: 'Mostly clean',
            text: `The floor looked great. The plumbers spent twenty minutes in the cloud from the walls, and the dust settled back on the sills overnight.`,
            cite: '1926.1153(f)(2)' },
          end_bad: { end: true, outcome: 'bad', title: 'A cloud before the walkthrough',
            text: `Ray had a mask. The plumbers and the electrician didn't. The dust hung in the air for an hour and resettled on everything. Dry sweeping and compressed air aren't allowed when there's a feasible alternative.`,
            cite: '1926.1153(f)(1)-(2)' }
        },
        narration: `Ray's cleaning up before the owner's walkthrough. Broom in one hand, air hose in the other. What do you say?`,
        sb: { visual: 'Level 2 with dust on the floor; Ray with broom and air hose.', search: 'Content Library: worker push broom; air hose', build: 'Storyline dialogue sim, 3 endings.' } },

      { type: 'callout', variant: 'receipt', title: 'The two housekeeping rules',
        body: [`<b>No dry sweeping or dry brushing</b> where it could contribute to exposure, unless wet sweeping, HEPA vacuuming or other methods that minimize exposure aren't feasible. <cite>1926.1153(f)(1)</cite>`,
               `<b>No compressed air</b> for cleaning clothing or surfaces where it could contribute to exposure, unless it's used with a ventilation system that captures the dust cloud, or no alternative method is feasible. <cite>1926.1153(f)(2)</cite>`],
        narration: `Two rules. No dry sweeping or brushing unless wet methods and HEPA vacs aren't feasible. No compressed air for cleaning clothes or surfaces unless something captures the dust cloud, or there's no other way. That includes blowing off your clothes at the end of the day.` },

      { type: 'continue', label: 'Set the zone' }
    ] },

    /* ------------------------------------------------------------------ */
    { id: 'm6-l3', title: 'Set the zone', minutes: 4, blocks: [
      { type: 'match', id: 'm6-zone', title: 'Set the zone on Level 2',
        src: 'assets/art/dg-floorplan.svg',
        alt: 'Level 2 floor plan with the stair core, a slab cutting area in the middle, a drywall crew area in the northeast, the main route from the stairs and an open window wall.',
        intro: `Slab cutting starts at 7:30. Place each item where it keeps the most people out of the dust.`,
        targets: [
          { id: 'barrier', x: 43.3, y: 55.7 },
          { id: 'sign', x: 38.3, y: 30 },
          { id: 'fan', x: 92.5, y: 61.4 },
          { id: 'vac', x: 70.8, y: 74 },
          { id: 'drywall', x: 83.3, y: 25.7 }
        ],
        tags: [
          { text: 'Barrier around the cutting area', target: 'barrier', fb: `Physical barrier (tape plus stanchions, or poly where dust travels) around the cut, with one controlled entry.` },
          { text: '"Silica work: authorized only" sign', target: 'sign', fb: `On the route from the stairs, before anyone reaches the zone.` },
          { text: 'Exhaust fan blowing out', target: 'fan', fb: `At the open window wall, pulling air from the cut out of the building. Indoors needs exhaust to minimize visible dust.` },
          { text: 'HEPA vac and cleanup station', target: 'vac', fb: `At the zone edge, so cleanup happens before anyone leaves.` },
          { text: 'Drywall crew: start at 9:15, after cleanup', target: 'drywall', fb: `Scheduling the other employer around the cutting is an access control too.` }
        ],
        narration: `Set the zone. Cutting starts at seven-thirty on Level 2. Drag the barrier, the sign, the exhaust fan, the vac station and the drywall crew's start time to where they'll keep the most people out of the dust.`,
        sb: { visual: 'Level 2 floor plan built in shapes; five draggable tags.', search: 'n/a (shape-built plan)', build: 'Storyline: drag-and-drop onto 5 drop targets on the plan; snap; per-tag feedback. Rise alternative: Labeled graphic showing the answer.' } },

      { type: 'text', heading: 'Restricting access is in the plan',
        body: [`The written exposure control plan has to describe how you <b>restrict access</b> to work areas, when needed, to cut down how many people are exposed and how much, <b>including exposures generated by other employers or sole proprietors</b>.`,
               `<cite>1926.1153(g)(1)(iv)</cite>`],
        narration: `Restricting access isn't just a good idea. The written plan has to describe how you do it, including dust from other employers. That's the line that answers Gus from Module 3.` },

      { type: 'callout', variant: 'monday', title: 'Use it Monday',
        body: `Before any indoor cutting: barrier, sign, exhaust, vac station, and a word with every other foreman on the floor. Five things, five minutes.`,
        narration: `For Monday: before any indoor cutting, five things. Barrier, sign, exhaust, vac station, and a word with every other foreman on the floor.` }
    ] }
  ],
  kc: { title: 'Knowledge check: Module 6', questions: [
    { question: `A worker with a full beard needs APF 10 for indoor saw cutting. What works?`,
      options: [
        { text: `A half mask, tightened extra`, correct: false, fb: `Facial hair under the seal still leaks.` },
        { text: `A loose-fitting PAPR, or shaving where the seal sits`, correct: true, fb: `Right.` },
        { text: `Two N95s`, correct: false, fb: `No.` }
      ],
      explain: `Tight-fitting facepieces can't be worn with facial hair in the seal.`, cite: '1910.134(g)(1)(i)(A)' },
    { question: `When is dry sweeping allowed where it could add to silica exposure?`,
      options: [
        { text: `Any time the floor is dry`, correct: false, fb: `That's when it's worst.` },
        { text: `Only when wet sweeping, HEPA vacuuming or other low-exposure methods aren't feasible`, correct: true, fb: `Right.` },
        { text: `When the sweeper wears a respirator`, correct: false, fb: `Others still breathe it.` }
      ],
      explain: `Dry sweeping and brushing are prohibited where they could contribute to exposure unless wet sweeping, HEPA vacuuming or other methods are not feasible.`, cite: '1926.1153(f)(1)' },
    { question: `How often must tight-fitting respirator users be fit tested?`,
      options: [
        { text: `Once, at hire`, correct: false, fb: `Not enough.` },
        { text: `Before first use and at least every 12 months`, correct: true, fb: `Right.` },
        { text: `Every 3 years with the medical exam`, correct: false, fb: `That's the silica medical exam schedule.` }
      ],
      explain: `Fit test before first use, whenever a different facepiece is used, and at least annually.`, cite: '1910.134(f)(2)' }
  ] }
});
