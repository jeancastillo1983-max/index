/* ==========================================================================
   Module 2 — Your authority and when the rule applies (12 min · Rise + Storyline)
   Objectives: define the silica competent person; when 1926.1153 applies
   (exception below 25 µg/m³ under any foreseeable conditions); PEL 50 and
   action level 25 µg/m³ (8-hr TWA), and why Table 1 means no air sampling.
   ========================================================================== */
COURSE.addModule({
  id: 'm2', num: 2, title: 'Your authority and when the rule applies', minutes: 12,
  build: 'Rise + Storyline',
  tagline: 'Seeing it is half the definition. Fixing it is the other half.',
  hero: 'img_m2_hero',
  objectives: [
    'Define the silica competent person: able to identify existing and foreseeable silica hazards and authorized to take prompt corrective measures.',
    'Explain when 1926.1153 applies, including the exception for exposures that stay below 25 µg/m³ under any foreseeable conditions.',
    'State the permissible exposure limit (50 µg/m³, 8-hour TWA) and the action level (25 µg/m³), and why Table 1 lets employers comply without air sampling.'
  ],
  citations: ['1926.1153(a)', '1926.1153(b)', '1926.1153(c)', '1926.1153(d)(1)', '1926.1153(g)(4)', '1926.32(f)'],
  jobAids: [{ title: 'Your authority in one page', file: 'jobaids/your-authority.html', pdf: 'jobaids/pdf/your-authority.pdf',
              desc: 'What you can stop, who you tell, and what you write down.' },
            { title: 'Crew talk and stop-work scripts', file: 'jobaids/crew-talk-scripts.html', pdf: 'jobaids/pdf/crew-talk-scripts.pdf',
              desc: 'What to say when you hold a cut, swap a respirator or keep another crew out of your dust.' }],
  lessons: [

    /* ------------------------------------------------------------------ */
    { id: 'm2-l1', title: 'What makes you the competent person', minutes: 4, blocks: [
      { type: 'hero', kicker: 'Module 2', title: 'Your authority and when the rule applies',
        text: `Two halves to the job: see it, and fix it. Then: which work is covered, and why Table 1 lets you skip the air sampling.`,
        media: 'img_m2_hero',
        narration: `Module 2. Two halves to this job: seeing it, and being allowed to fix it. Then we'll figure out which work the rule covers, and why Table 1 means you usually don't need an air pump on anybody.`,
        sb: { visual: 'Photo: supervisor talking to a seated crew.', search: 'construction foreman talking to crew', build: 'Rise: Banner block.' } },

      { type: 'mcq', id: 'm2-decide-cp',
        question: `Decide first. Marco says, "Ray's been cutting concrete 28 years. He's the competent person." What's missing?`,
        options: [
          { text: `Nothing. Experience is what makes a competent person.`, correct: false, fb: `Experience helps him see hazards. The definition also needs the authority to fix them, and the employer has to designate him.` },
          { text: `Ray also has to be able to identify existing and foreseeable silica hazards, and be authorized to take prompt corrective measures.`, correct: true, fb: `Right. Capable plus authorized. And Ray still calls it "just dust," which says something about the first half.` },
          { text: `A college degree in industrial hygiene.`, correct: false, fb: `That's closer to a qualified person or an IH. A competent person needs knowledge and authority, not a degree.` }
        ],
        explain: `Competent person = capable of identifying existing and foreseeable respirable crystalline silica hazards, and authorized to take prompt corrective measures to eliminate or minimize them.`,
        cite: '1926.1153(b)' },

      { type: 'tabs',
        items: [
          { title: 'Capable', body: [`You can identify <b>existing</b> hazards (the saw running dry right now) and <b>foreseeable</b> ones (the coring that starts next week, the other trade's grinding next door).`, `<cite>1926.1153(b)</cite>`] },
          { title: 'Authorized', body: [`You can take <b>prompt corrective measures</b>: stop a cut, pull a tool, move a crew, call for the vac. Prompt means now, not at Monday's meeting.`, `<cite>1926.1153(b)</cite> <cite>1926.32(f)</cite>`] },
          { title: 'Designated to inspect', body: [`The written exposure control plan names you to make <b>frequent and regular inspections</b> of job sites, materials and equipment, to make the plan real.`, `<cite>1926.1153(g)(4)</cite>`] }
        ],
        narration: `Three tabs, three parts of the job. Capable: you can see existing and foreseeable silica hazards. Authorized: you can take prompt corrective measures. And designated: the written plan names you to make frequent and regular inspections. Tap through each one.`,
        sb: { visual: 'Three tabs with icons: eye, wrench, list.', search: 'icons eye wrench clipboard', build: 'Rise: Tabs block.' } },

      { type: 'callout', variant: 'receipt', title: 'Receipt',
        body: `"Competent person means an individual who is capable of identifying existing and foreseeable respirable crystalline silica hazards in the workplace and who has authorization to take prompt corrective measures to eliminate or minimize them."`,
        cite: '1926.1153(b)',
        narration: `Here's the exact definition. Capable, and authorized. Both halves, every time.` },

      { type: 'continue', label: 'When does the rule apply?' }
    ] },

    /* ------------------------------------------------------------------ */
    { id: 'm2-l2', title: 'When the rule applies', minutes: 4, blocks: [
      { type: 'table', title: 'Two numbers to know',
        headers: ['Level', 'Concentration (8-hr TWA)', 'What it means on site'],
        rows: [
          ['Permissible exposure limit (PEL)', '<b>50 µg/m³</b>', 'Nobody can be exposed above this, averaged over 8 hours.'],
          ['Action level (AL)', '<b>25 µg/m³</b>', 'Half the PEL. If exposure stays below this under any foreseeable conditions, the standard doesn\'t apply to that work.']
        ],
        note: `µg/m³ = micrograms per cubic meter of air. 50 µg spread through a cubic meter is far too little to see. That's the point.`,
        narration: `Two numbers. The permissible exposure limit is fifty micrograms per cubic meter, averaged over eight hours. The action level is half that, twenty-five. A microgram is a millionth of a gram. You will never see the PEL in the air. That's why the rule works by controls, not by eyeballs.`,
        sb: { visual: 'Two-row table with big numbers.', search: 'n/a', build: 'Rise: Table block.' } },

      { type: 'text', heading: 'Covered, unless it stays below 25',
        body: [`The rule covers all occupational exposure to respirable crystalline silica in construction, <b>except</b> where exposure will remain below 25 µg/m³ under <b>any foreseeable conditions</b>. <cite>1926.1153(a)</cite>`,
               `"Any foreseeable conditions" means the windy day, the indoor job and the long shift too, not just the best case.`],
        narration: `The rule covers every construction exposure, with one exception: work where exposure stays below the action level under any foreseeable conditions. That word foreseeable matters. Not the best day. The windy day, the indoor job and the long shift too.` },

      { type: 'sort', id: 'm2-applies', title: 'Does the rule apply?',
        prompt: `Six Riverside tasks. Sort each one.`,
        buckets: [
          { id: 'yes', label: 'Covered', hint: 'Cutting, grinding, drilling, chipping silica materials' },
          { id: 'low', label: 'Likely below the action level', hint: 'Low-energy work, done the usual way' }
        ],
        items: [
          { text: 'Cutting CMU block with a stationary masonry saw', bucket: 'yes', fb: `Cutting block makes respirable dust. Table 1 row (i): masonry saw with water.` },
          { text: 'Core drilling the Level 2 slab for plumbing', bucket: 'yes', fb: `Drilling concrete. Table 1 row (vi) for rig-mounted core drills.` },
          { text: 'Tuckpointing the brick at the entrance', bucket: 'yes', fb: `One of the highest-exposure tasks there is. Table 1 row (xi).` },
          { text: 'Pouring the slab-on-grade from the truck chute', bucket: 'low', fb: `Wet concrete doesn't release respirable dust. OSHA lists pouring concrete as work likely below the action level.` },
          { text: 'Stripping concrete forms', bucket: 'low', fb: `OSHA lists removing concrete formwork as likely below the action level, as long as nobody grinds or chips the concrete.` },
          { text: 'Drilling anchor holes in the slab with a rotary hammer', bucket: 'yes', fb: `Drilling concrete. Table 1 row (vii): shroud and dust collector, and a HEPA vac to clean the hole.` }
        ],
        summary: `Rule of thumb: when you cut, grind, drill, chip, crush or abrade silica material, you're covered. Mixing a few bags of mortar outdoors or pouring wet concrete usually isn't, but "usually" isn't "always."`,
        narration: `Six tasks. Sort them. Covered, or likely below the action level. Think about whether you're breaking up dry material or not.`,
        sb: { visual: 'Two drop zones with icons; six task cards with small tool icons.', search: 'icons saw drill concrete truck', build: 'Storyline: freeform drag-and-drop, 2 drop targets, per-item feedback layers. Variable M2_SortScore.' } },

      { type: 'callout', variant: 'tip', title: 'Why Table 1 matters',
        body: [`If you <b>fully and properly</b> follow the Table 1 controls and respirators for a task, you don't have to air-sample that task. That's the deal.`,
               `If the task isn't on Table 1, or the controls aren't working, you're into exposure assessment: Module 5.`],
        cite: '1926.1153(c)(1); 1926.1153(d)',
        narration: `Here's why Table 1 is such a big deal. If you fully and properly follow its controls and respirators for a task, you don't have to measure that task. You comply by doing it right. Miss the controls, or work a task that isn't on the table, and you're into exposure assessment. That's Module 5.` },

      { type: 'continue', label: '"Not your call"' }
    ] },

    /* ------------------------------------------------------------------ */
    { id: 'm2-l3', title: 'Not your call', minutes: 4, blocks: [
      { type: 'scenario', id: 'm2-notyourcall', title: 'Not your call',
        intro: `You're Tasha. It's 7:15 on Level 2. You hear a saw and see a white cloud rolling toward the stair core.`,
        start: 'n1',
        nodes: {
          n1: { speaker: 'tasha',
            text: `One of Ray's laborers is dry-cutting a slab trench with a handheld saw. No water hose. Indoors. The drywall crew is 30 feet away. What do I do first?`,
            choices: [
              { text: `Walk over, get his attention and stop the cut.`, next: 'n2', tone: 'good', fb: `People first. The exposure stops while you sort out the rest.`, cite: '1926.1153(b)' },
              { text: `Text Ray to deal with his guy.`, next: 'n1b', tone: 'ok', fb: `Ray needs to know, but the saw is still running while you wait for a reply.` },
              { text: `Make a note for the weekly safety meeting.`, next: 'end_note', tone: 'bad', fb: `"Prompt" means now. A note doesn't take any dust out of the air.` }
            ] },
          n1b: { speaker: 'ray',
            text: `Ray texts back: "He's almost done. Two more cuts."`,
            choices: [
              { text: `Walk over and stop the cut anyway. Two more cuts is two more clouds.`, next: 'n2', tone: 'good', fb: `Right. Almost done is still exposed.` },
              { text: `Let him finish. It's only two cuts.`, next: 'end_note', tone: 'bad', fb: `You just showed the crew which rules bend.` }
            ] },
          n2: { speaker: 'marco',
            text: `Marco comes off the stairs. "What's the holdup? That trench has to be done for the plumber at nine. Not your call, Tasha."`,
            choices: [
              { text: `"It is my call. I'm the silica competent person here. I'm not stopping the trench. I'm stopping the dry cut. Ten minutes to get water on that saw."`, next: 'n3', tone: 'good', fb: `Calm, specific, and you said what you're stopping and for how long.`, cite: '1926.1153(b); 1926.1153(g)(4)' },
              { text: `"If OSHA walks in, it's on you."`, next: 'n2b', tone: 'ok', fb: `True, but it lands as a threat. Marco digs in.` },
              { text: `"You're the boss."`, next: 'end_backdown', tone: 'bad', fb: `You handed back the authority you were designated to use.` }
            ] },
          n2b: { speaker: 'marco',
            text: `"Don't threaten me with OSHA. It's one trench."`,
            choices: [
              { text: `"I'm not threatening you. I want ten minutes so the plumber gets the trench and nobody on this floor eats that cloud. Here's how."`, next: 'n3', tone: 'good', fb: `You reset the tone and went back to the fix.` },
              { text: `"Fine. I'll keep an eye on it."`, next: 'end_backdown', tone: 'bad', fb: `"Keeping an eye on it" isn't a corrective measure.` }
            ] },
          n3: { speaker: 'marco',
            text: `"Ten minutes. What's the fix?"`,
            choices: [
              { text: `"Hook the water feed to the saw, set the flow till the dust drops, fans to exhaust the area, and get him an APF 10 respirator because he's indoors. Drywall moves to the east bay till we're done."`, next: 'end_good', tone: 'good', fb: `Control, exhaust, respirator, access. That's Table 1 for a handheld saw indoors, plus keeping the other trade out of it.`, cite: '1926.1153(c)(1) Table 1 (ii); 1926.1153(c)(2)(i)' },
              { text: `"Give him an N95 and let him keep cutting dry."`, next: 'end_mask', tone: 'bad', fb: `A respirator without the Table 1 control isn't Table 1. The dry cut makes the whole floor dusty.` }
            ] },
          end_good: { end: true, outcome: 'good', title: 'Trench done at 8:40, with water',
            text: `Eleven minutes lost. The cut ran wet, the floor stayed clear, and the plumber had his trench before nine. Marco grunted, which from Marco is a thank-you. Next time Ray's crew hooks up the hose before you show up.`,
            cite: '1926.1153(b)' },
          end_mask: { end: true, outcome: 'bad', title: 'A mask on a dry cut',
            text: `The laborer had a mask. The drywall crew didn't. The whole floor got a coat of dust, and the saw was still off Table 1. Respirators are the last layer, not the first.`,
            cite: '1926.1153(c)(1)' },
          end_note: { end: true, outcome: 'bad', title: 'The note in your pocket',
            text: `The cutting finished at 8:30. Everybody on Level 2 breathed it, including the drywall crew who never knew. Your note was accurate. It just didn't protect anybody.`,
            cite: '1926.1153(b)' },
          end_backdown: { end: true, outcome: 'bad', title: 'Your designation is a sticker',
            text: `The trench got done. Dee watched you back down, and learned that the competent person folds when the super says so. Next time she won't bother hooking up the hose.`,
            cite: '1926.1153(b); 1926.32(f)' }
        },
        narration: `You're Tasha. Make the calls. Marco's going to push. Read the feedback on every choice, even the good ones.`,
        sb: { visual: 'Level 2 slab background; character cards for Tasha, Ray (text), Marco. Ending cards colored by outcome.', search: 'construction superintendent hard hat (Content Library)', build: 'Storyline: one slide per node, choice buttons, feedback layer, Next jumps per node map. Variable M2_Path records the ending.' } },

      { type: 'download', title: 'Your authority in one page',
        desc: `What you can stop, who you tell, and what you write down. Keep it in the truck.`,
        file: 'jobaids/your-authority.html', pdf: 'jobaids/pdf/your-authority.pdf',
        narration: `Here's your authority on one page. What you can stop, who you report to, and what you write down. Print it and keep it in the truck.` }
    ] }
  ],
  kc: { title: 'Knowledge check: Module 2', questions: [
    { question: `What two things make someone a silica competent person?`,
      options: [
        { text: `Ten years of experience and an OSHA 30 card`, correct: false, fb: `Neither is in the definition.` },
        { text: `Capable of identifying existing and foreseeable silica hazards, and authorized to take prompt corrective measures`, correct: true, fb: `Both halves.` },
        { text: `A respirator fit test and a medical exam`, correct: false, fb: `Those are for respirator users.` }
      ],
      explain: `Capable plus authorized. Either one alone isn't enough.`, cite: '1926.1153(b)' },
    { question: `What are the PEL and action level for respirable crystalline silica?`,
      options: [
        { text: `PEL 50 µg/m³ and action level 25 µg/m³, as 8-hour TWAs`, correct: true, fb: `Right.` },
        { text: `PEL 100 µg/m³ and action level 50 µg/m³`, correct: false, fb: `Those were close to the old construction limits. The 2016 rule cut them.` },
        { text: `PEL 25 µg/m³ and action level 10 µg/m³`, correct: false, fb: `25 is the action level.` }
      ],
      explain: `PEL 50, action level 25, both averaged over 8 hours.`, cite: '1926.1153(b); 1926.1153(d)(1)' },
    { question: `Why can a contractor fully following Table 1 skip air sampling for that task?`,
      options: [
        { text: `Because Table 1 tasks are exempt from the standard`, correct: false, fb: `They're covered. Table 1 is a way to comply.` },
        { text: `Because fully and properly implementing the Table 1 controls and respirators is a recognized way to comply without assessing exposure`, correct: true, fb: `Right. That's the deal Table 1 offers.` },
        { text: `Because the competent person can estimate exposure by eye`, correct: false, fb: `Nobody can see 50 µg/m³.` }
      ],
      explain: `Employers who fully and properly implement Table 1 for a task aren't required to assess exposure for that task.`, cite: '1926.1153(c)(1); 1926.1153(d)' }
  ] }
});
