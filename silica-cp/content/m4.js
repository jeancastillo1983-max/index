/* ==========================================================================
   Module 4 — Table 1 in the field (25 min · Storyline)
   Objectives: read Table 1 (task, controls, respirator ≤4 / >4 hr); explain
   "fully and properly implemented"; apply the indoor/enclosed-area rules;
   add up task time across a shift; verify enclosed cab or booth requirements.
   Table 1 rows referenced by roman numeral as in 1926.1153(c)(1).
   ========================================================================== */
COURSE.addModule({
  id: 'm4', num: 4, title: 'Table 1 in the field', minutes: 25,
  build: 'Storyline',
  tagline: 'Table 1 is a deal: run the controls right and you don\'t have to measure. Run them wrong and the deal is off.',
  hero: 'img_m4_hero',
  objectives: [
    'Read Table 1 for a task: equipment or task, engineering and work practice controls, and the respirator required for 4 hours or less and more than 4 hours per shift.',
    'Explain what "fully and properly implemented" means: water at a flow rate that minimizes visible dust, shrouds and dust collectors with the manufacturer\'s airflow and a 99%+ filter with a filter-cleaning mechanism, and tools maintained to the manufacturer\'s instructions.',
    'Apply the indoor and enclosed-area rules, including exhaust to minimize the accumulation of visible airborne dust.',
    'Add up task time correctly: when an employee performs more than one Table 1 task in a shift, the total duration determines the respirator.',
    'Verify enclosed cab or booth requirements for heavy equipment operators.'
  ],
  citations: ['1926.1153(c)(1) and Table 1', '1926.1153(c)(2)', '1926.1153(c)(3)', '1926.1153(e)(1)'],
  jobAids: [{ title: 'Table 1 pocket card', file: 'jobaids/table1-pocket-card.html', pdf: 'jobaids/pdf/table1-pocket-card.pdf',
              desc: 'The Table 1 rows Riverside crews use most, with the respirator by hours and location.' }],
  lessons: [

    /* ------------------------------------------------------------------ */
    { id: 'm4-l1', title: 'How to read Table 1', minutes: 6, blocks: [
      { type: 'hero', kicker: 'Module 4', title: 'Table 1 in the field',
        text: `Table 1 is the tool you'll use every day. Read it the way you will on site: task, control, hours, indoors or out, respirator.`,
        media: 'img_m4_hero',
        narration: `Module 4. This is the big one. Table 1 is the tool you'll use every single day as a silica competent person. We're going to read it the way you will on site: task, control, hours, indoors or out, respirator.`,
        sb: { visual: 'Photo: slab crew at work.', search: 'concrete slab workers', build: 'Rise: Banner block.' } },

      { type: 'art', src: 'assets/art/dg-table1-path.svg',
        alt: 'Six-step path: find the task, read the controls, check fully and properly, indoors or out, total Table 1 hours, read the respirator. A dashed red arrow from step 3 leads to Off the table: exposure assessment.',
        caption: `Six steps, every time. A "no" at step 1 or 3 takes you off the table.`,
        narration: `Six steps, every time. Find the task's row. Read the controls. Check that they're fully and properly working. Indoors or out. Add up all the Table 1 hours for that worker's shift. Then read the respirator column. If the task isn't on the table, or the controls aren't working, you're off the table. That means an exposure assessment.`,
        sb: { visual: 'Shape-built flowchart, six numbered boxes + two outcomes.', search: 'n/a (shape diagram)', build: 'Rise: Process block (6 steps) or image; Storyline: build-on animation per step.' } },

      { type: 'labeled', src: 'assets/art/dg-controls.svg',
        alt: 'Three panels: a handheld saw with a water hose at the blade, a grinder with a shroud and hose to a HEPA dust collector, and an enclosed equipment cab with a filter unit.',
        markers: [
          { x: 17, y: 46, title: 'Water at the blade', body: `Integrated water delivery, at a flow rate that minimizes the release of visible dust. Not a guy with a hose nearby. <cite>1926.1153(c)(2)(ii)</cite>` },
          { x: 38, y: 40, title: 'Shroud', body: `Commercially available shroud matched to the tool, intact and attached.` },
          { x: 56, y: 52, title: 'Dust collector', body: `Provides the air flow the tool manufacturer recommends (or more), a filter that's 99% or more efficient, and a filter-cleaning mechanism (or cyclonic pre-separator for some tools).` },
          { x: 80, y: 40, title: 'Enclosed cab or booth', body: `Kept free of settled dust, working door seals and closing mechanisms, good gaskets, positive pressure with continuous fresh air, intake filtered at 95% (0.3 to 10 µm), heat and A/C. <cite>1926.1153(c)(2)(iii)</cite>` }
        ],
        narration: `The three controls you'll see on Table 1. Water delivered at the blade, bit or point of impact. A shroud with a dust collector that pulls the manufacturer's airflow through a ninety-nine percent filter with a way to clean that filter. And for heavy equipment, an enclosed cab or booth that's sealed, pressurized and filtered. Tap each marker for what fully and properly means.`,
        sb: { visual: 'Three-panel shape diagram of controls.', search: 'concrete saw water; grinder dust shroud; excavator cab', build: 'Rise: Labeled graphic (4 markers).' } },

      { type: 'text', heading: '"Fully and properly implemented"',
        body: [`The Table 1 deal only counts when the control is <b>working the way it's designed to</b>: right flow, right airflow, clean filter, tool maintained to the manufacturer's instructions.`,
               `A saw with a hose that's turned off is a dry saw. A vac with a caked filter is a noisy box. <cite>1926.1153(c)(1)</cite>`],
        narration: `Fully and properly. That's the phrase that matters. The control has to be working the way it's designed: the right water flow, the right airflow, a clean filter, the tool maintained to the manufacturer's instructions. A saw with the water off is a dry saw. A vac with a caked filter is just a noisy box. And a dry saw isn't on Table 1, no matter what's written in the plan.` },

      { type: 'callout', variant: 'warning', title: 'Indoors and enclosed areas',
        body: [`For tasks indoors or in enclosed areas, provide a means of <b>exhaust</b> as needed to minimize the build-up of visible airborne dust. <cite>1926.1153(c)(2)(i)</cite>`,
               `And read the indoor row: several tasks need a respirator indoors that they don't need outside.`],
        narration: `Indoors is different. You have to provide exhaust as needed so visible dust doesn't build up in the space. And read the indoor line on the table. Handheld saws, walk-behind saws and jackhammers all need a respirator indoors even for short tasks.` },

      { type: 'video', media: 'vid_t1_handheld_saw',
        caption: `OSHA's Table 1 video for handheld power saws.`,
        watchFor: `Watch the operator set the water flow until the visible dust drops. Then notice the indoor versus outdoor respirator difference.`,
        narration: `OSHA made a short video for each of the big Table 1 rows. This is the handheld saw. Watch the water flow get adjusted until the dust drops. That's fully and properly.`,
        sb: { visual: 'Embedded YouTube video.', search: 'n/a (web video)', build: 'Rise: Multimedia > Embed. Other rows (masonry saw, drills, jackhammer, tuckpointing, grinders) are linked in the resources tab.' } },

      { type: 'continue', label: 'Table 1 match' }
    ] },

    /* ------------------------------------------------------------------ */
    { id: 'm4-l2', title: 'Table 1 match', minutes: 9, blocks: [
      { type: 'table1', id: 'm4-table1', title: 'Table 1 match: ten Riverside tasks',
        intro: `For each task, pick the engineering control Table 1 requires, then the respirator for those hours and that location. Assume the control is fully and properly implemented.`,
        controls: [
          { id: 'water', label: 'Water delivered at the blade, bit or point of impact', short: 'integrated water, flow minimizes visible dust' },
          { id: 'shroud', label: 'Shroud with a dust collection system', short: 'rated airflow, 99%+ filter, filter cleaning' },
          { id: 'cab', label: 'Operate from an enclosed cab', short: 'sealed, pressurized, filtered; water when people are on foot nearby' },
          { id: 'resp', label: 'Respirator only, no engineering control', short: 'not a Table 1 option' },
          { id: 'none', label: 'No control required', short: 'only if exposure stays below 25 µg/m³' }
        ],
        tasks: [
          { task: 'Handheld saw cutting a trench in the slab', hours: 2, indoor: true, who: 'Dee', art: 'assets/art/eq-saw-wet-good.svg', alt: 'Handheld saw with water feed',
            control: 'water', resp: 'apf10', decoys: ['shroud', 'resp'],
            fb: `Handheld saws need water at the blade. Indoors, APF 10 at any duration. Outdoors it would be none for 4 hours or less.`, cite: '1926.1153(c)(1) Table 1 (ii)' },
          { task: 'Handheld saw cutting block for the site wall', hours: 5, indoor: false, who: 'Laborer', art: 'assets/art/eq-saw-wet-good.svg', alt: 'Handheld saw with water feed',
            control: 'water', resp: 'apf10', decoys: ['none', 'resp'],
            fb: `Outdoors, a handheld saw needs no respirator for 4 hours or less, and APF 10 for more than 4. Five hours tips it.`, cite: '1926.1153(c)(1) Table 1 (ii)' },
          { task: 'Walk-behind saw cutting control joints on Level 1', hours: 2, indoor: true, who: 'Ray\'s crew', art: 'assets/art/eq-low-water.svg', alt: 'Walk-behind saw',
            control: 'water', resp: 'apf10', decoys: ['cab', 'shroud'],
            fb: `Walk-behind saws: water. Outdoors, no respirator at any duration. Indoors, APF 10 at any duration.`, cite: '1926.1153(c)(1) Table 1 (iv)' },
          { task: 'Rig-mounted core drill coring the Level 2 slab', hours: 3, indoor: true, who: 'Plumbing sub', art: 'assets/art/eq-tank-dry.svg', alt: 'Water supply',
            control: 'water', resp: 'none', decoys: ['shroud', 'resp'],
            fb: `Rig-mounted core saws and drills: water delivered to the cutting surface. No respirator, indoors or out, any duration.`, cite: '1926.1153(c)(1) Table 1 (vi)' },
          { task: 'Rotary hammer drilling anchor holes overhead', hours: 5, indoor: true, who: 'Electrician', art: 'assets/art/eq-grinder-shroud-good.svg', alt: 'Shroud and dust collector',
            control: 'shroud', resp: 'none', decoys: ['water', 'resp'],
            fb: `Handheld and stand-mounted drills: shroud or cowling with a dust collector, and a HEPA vac (not compressed air) to clean the holes. No respirator at any duration.`, cite: '1926.1153(c)(1) Table 1 (vii)' },
          { task: 'Jackhammer breaking out a slab section inside', hours: 1, indoor: true, who: 'Laborer', art: 'assets/art/eq-low-water.svg', alt: 'Water spray',
            control: 'water', resp: 'apf10', decoys: ['cab', 'resp'],
            fb: `Jackhammers: water spray at the point of impact (or a shroud with a dust collector). Indoors, APF 10 at any duration. Outdoors, none for 4 hours or less.`, cite: '1926.1153(c)(1) Table 1 (x)' },
          { task: 'Tuckpoint grinder removing mortar at the entrance', hours: 6, indoor: false, who: 'Mason', art: 'assets/art/eq-grinder-shroud-good.svg', alt: 'Shrouded grinder with collector',
            control: 'shroud', resp: 'apf25', decoys: ['water', 'resp'],
            fb: `Tuckpointing: shroud and dust collector with at least 25 cfm per inch of wheel diameter. APF 10 for 4 hours or less, APF 25 for more than 4. Even outside.`, cite: '1926.1153(c)(1) Table 1 (xi)' },
          { task: 'Grinder smoothing slab high spots, shroud and vac', hours: 5, indoor: true, who: 'Dee', art: 'assets/art/eq-grinder-shroud-good.svg', alt: 'Shrouded grinder',
            control: 'shroud', resp: 'apf10', decoys: ['cab', 'resp'],
            fb: `Grinders other than mortar removal, with a shroud and collector: none outdoors, none indoors for 4 hours or less, APF 10 indoors over 4. (With integrated water, none at any duration.)`, cite: '1926.1153(c)(1) Table 1 (xii)' },
          { task: 'Walk-behind floor grinder prepping the lobby slab', hours: 6, indoor: true, who: 'Flooring sub', art: 'assets/art/eq-saw-wet-good.svg', alt: 'Water',
            control: 'water', resp: 'none', decoys: ['cab', 'resp'],
            fb: `Walk-behind milling machines and floor grinders: water, or a dust collector with HEPA vac cleanup. No respirator at any duration.`, cite: '1926.1153(c)(1) Table 1 (xiii)' },
          { task: 'Skid steer with a breaker demolishing the old curb', hours: 4, indoor: false, who: 'Operator', art: 'assets/art/eq-cab-good.svg', alt: 'Enclosed cab',
            control: 'cab', resp: 'none', decoys: ['water', 'resp'],
            fb: `Heavy equipment used to demolish or fracture silica material: operate from an enclosed cab, and apply water when anyone on foot is working near the task. No respirator required.`, cite: '1926.1153(c)(1) Table 1 (xvii)' }
        ],
        summary: `The patterns to remember: saws mostly use water; drills and many grinders use shrouds and collectors; indoors adds respirators for saws and jackhammers; tuckpointing always needs one; heavy equipment means a cab that actually seals.`,
        narration: `Ten tasks from Riverside. For each one, pick the control, then the respirator. Watch the hours and whether it's inside. You'll see your score as you go, and a summary table at the end.`,
        sb: { visual: 'Task card with tool art + chips for hours and location; two rows of choice buttons.', search: 'icons concrete saw drill jackhammer grinder skid steer', build: 'Storyline: 10 slides (one per task), two pick-one groups each (control, respirator), Submit → feedback layer with citation. Variables M4_T1_Score (0-10), M4_T1_Control, M4_T1_Resp. Summary slide with results table.' } },

      { type: 'download', title: 'Table 1 pocket card',
        desc: `The rows Riverside crews use most, with the respirator by hours and location. Folds to fit a vest pocket.`,
        file: 'jobaids/table1-pocket-card.html', pdf: 'jobaids/pdf/table1-pocket-card.pdf',
        narration: `This is the pocket card version. It's the rows we use most, with respirators by hours and location. Print it, fold it, keep it in your vest. The full Table 1 is on the back.` },

      { type: 'continue', label: 'Fully and properly?' }
    ] },

    /* ------------------------------------------------------------------ */
    { id: 'm4-l3', title: 'Fully and properly?', minutes: 5, blocks: [
      { type: 'sort', id: 'm4-fully', title: 'Fully and properly? Pass or fix',
        prompt: `Eight close-ups from Riverside this morning. Does each control meet Table 1 as it is right now?`,
        buckets: [
          { id: 'pass', label: 'Pass', hint: 'working as designed' },
          { id: 'fix', label: 'Fix it now', hint: 'stop and correct before work continues' }
        ],
        items: [
          { text: 'Dust collector gauge in the red, filter caked', art: 'assets/art/eq-vac-clogged.svg', bucket: 'fix', fb: `No airflow, no control. Clean or change the filter, confirm airflow, then restart.`, hint: 'Look at the gauge and the filter.' },
          { text: 'Masonry saw water tank empty, pump running dry', art: 'assets/art/eq-tank-dry.svg', bucket: 'fix', fb: `Integrated water delivery means water at the blade. Fill it before the next cut.` },
          { text: 'Tuckpoint shroud cracked off the guard, hose hanging', art: 'assets/art/eq-shroud-cracked.svg', bucket: 'fix', fb: `A shroud that isn't sealed to the work doesn't capture anything. Replace it.` },
          { text: 'Skid steer cab door propped open with a block', art: 'assets/art/eq-cab-door.svg', bucket: 'fix', fb: `A cab has to have working door seals and closing mechanisms and be under positive pressure. Door shut, or it's not a cab.`, hint: 'What does a cab need to stay pressurized?' },
          { text: 'Walk-behind saw hose kinked, water trickling, dust behind the blade', art: 'assets/art/eq-low-water.svg', bucket: 'fix', fb: `Water at a flow rate that minimizes visible dust. A trickle doesn't. Unkink, adjust, watch the dust drop.` },
          { text: 'Handheld saw with water spraying at the blade, slurry, no visible dust', art: 'assets/art/eq-saw-wet-good.svg', bucket: 'pass', fb: `That's what right looks like. Check it again after lunch.` },
          { text: 'Grinder shroud intact, hose on, collector gauge green', art: 'assets/art/eq-grinder-shroud-good.svg', bucket: 'pass', fb: `Shroud, airflow, filter: all there. Pass.` },
          { text: 'Excavator cab: door shut, seals good, filter unit on, pressure gauge positive', art: 'assets/art/eq-cab-good.svg', bucket: 'pass', fb: `Sealed, pressurized, filtered. Pass. Keep the floor free of settled dust too.` }
        ],
        summary: `If a control fails your look, the task is off Table 1 until it's fixed. That's the stop-and-fix call you're designated to make.`,
        narration: `Fully and properly? Eight close-ups. Pass, or fix it now. Look at the gauges, the hoses and the seals.`,
        sb: { visual: 'Eight equipment close-ups (shape-built), two drop zones.', search: 'concrete saw water hose; dust extractor filter; skid steer cab', build: 'Storyline: hotspot or drag-and-drop with 8 images, Pass/Fix targets, per-item feedback. Variable M4_FixCount.' } },

      { type: 'accordion',
        items: [
          { title: 'Enclosed cab or booth: the six checks', body: `<ul><li>Kept as free as practicable from settled dust</li><li>Door seals and closing mechanisms work</li><li>Gaskets and seals in good condition</li><li>Positive pressure from continuous fresh air</li><li>Intake air filtered 95% efficient in the 0.3 to 10 µm range (e.g. MERV 16)</li><li>Heating and cooling, so nobody props the door</li></ul><cite>1926.1153(c)(2)(iii)</cite>` },
          { title: 'Water: what "flow rate" means', body: `Enough water at the point of dust generation to minimize the release of visible dust. If you can see a plume, turn it up or fix the feed. <cite>1926.1153(c)(2)(ii)</cite>` },
          { title: 'Dust collectors: what to check', body: `Manufacturer's recommended airflow (or more), filter 99% or more efficient, filter-cleaning mechanism. Tuckpointing needs at least 25 cfm per inch of wheel. <cite>Table 1 (vii), (xi), (xii)</cite>` },
          { title: 'Maintained to the manufacturer', body: `Blades, shrouds, hoses and seals kept in the condition the manufacturer specifies. Worn tools make more dust.` }
        ],
        narration: `Here's what to check on each kind of control. The cab one is six items. The heat and A/C item exists for a reason: if the cab is miserable, the door gets propped.`,
        sb: { visual: 'Accordion with control icons.', search: 'icons cab water filter', build: 'Rise: Accordion block.' } },

      { type: 'video', media: 'vid_t1_tuckpoint',
        caption: `OSHA's Table 1 video for tuckpointing grinders.`,
        watchFor: `Watch the shroud, the hose and the vac, and notice the respirator even with all of it working.`,
        narration: `Tuckpointing is the one row where even perfect controls still need a respirator. Watch why.`,
        sb: { visual: 'Embedded YouTube video.', search: 'n/a (web video)', build: 'Rise: Multimedia > Embed.' } },

      { type: 'continue', label: 'The 4-hour trap' }
    ] },

    /* ------------------------------------------------------------------ */
    { id: 'm4-l4', title: 'The 4-hour trap and the vac', minutes: 5, blocks: [
      { type: 'shift', id: 'm4-shift', title: 'The 4-hour trap', speaker: 'dee',
        question: `Dee cuts block outside with a handheld saw for 2.5 hours, then grinds slab high spots inside with a shrouded grinder for 2 hours. What respirator does she need?`,
        preset: ['saw', 'grind'],
        tasks: [
          { id: 'saw', label: 'Handheld saw, block, outdoors', short: 'Saw (out)', hours: 2.5, resp: { le4: 'none', gt4: 'apf10' } },
          { id: 'grind', label: 'Shrouded grinder, slab, indoors', short: 'Grinder (in)', hours: 2, resp: { le4: 'none', gt4: 'apf10' } },
          { id: 'drill', label: 'Rotary hammer with shroud and vac', short: 'Drill', hours: 1, resp: { le4: 'none', gt4: 'none' } },
          { id: 'tuck', label: 'Tuckpoint grinder with shroud and vac', short: 'Tuckpoint', hours: 1, resp: { le4: 'apf10', gt4: 'apf25' } },
          { id: 'wb', label: 'Walk-behind saw, indoors', short: 'Walk-behind (in)', hours: 1, resp: { le4: 'apf10', gt4: 'apf10' } }
        ],
        explain: `Each task alone is under 4 hours and needs nothing. Together they're 4.5 hours of Table 1 work, so you read the "more than 4 hours" column for every task: APF 10 for both. Add a tuckpointing hour and she's at APF 25.`,
        cite: '1926.1153(c)(3)',
        narration: `The four-hour trap. Dee cuts for two and a half hours, then grinds for two. Decide first: what respirator does she need? Then play with the shift and see how adding one task changes the answer for all of them.`,
        sb: { visual: '8-hour shift bar with colored task segments and a red dashed line at 4 hours; three readout tiles (hours, column, respirator).', search: 'n/a (shape-built)', build: 'Storyline: prediction slide (3 buttons) → reveal slide. Toggle buttons set True/False variables per task; M4_ShiftHours = sum of on-task hours; M4_RespReq from triggers (if M4_ShiftHours > 4 use >4 column). Segment widths via states.' } },

      { type: 'callout', variant: 'receipt', title: 'Receipt: the duration rule',
        body: `When an employee does more than one Table 1 task in a shift and the <b>total</b> is more than 4 hours, the respirator for <b>each</b> task is the one in the "more than 4 hours" column. Under 4 hours total, use the "4 hours or less" column.`,
        cite: '1926.1153(c)(3)',
        narration: `Here's the rule. Add up all the Table 1 time for that worker's shift. Over four hours total, every task uses the more-than-four-hours column.` },

      { type: 'scenario', id: 'm4-vac', title: 'Crew talk: "Just for today"',
        intro: `10:30 a.m. The flooring sub is behind and Dee's grinding high spots so they can start tomorrow.`,
        start: 'n1',
        nodes: {
          n1: { speaker: 'marco',
            text: `Marco: "That vac keeps clogging and Dee stops every twenty minutes to knock the filter. Pull it, just for today. We have to hand Level 1 to flooring tomorrow."`,
            choices: [
              { text: `"If we pull the vac, the grinder's off Table 1 and Dee's breathing it. Let's fix the clogging instead. Give me fifteen minutes."`, next: 'n2', tone: 'good', fb: `You named the consequence and offered a fix, not a fight.`, cite: '1926.1153(c)(1)' },
              { text: `"Okay, but she wears an N95."`, next: 'end_n95', tone: 'bad', fb: `A respirator without the control isn't Table 1, and the dust covers everyone else on the floor.` },
              { text: `"Your call, Marco."`, next: 'end_bad', tone: 'bad', fb: `It's your call. That's what you were designated for.` }
            ] },
          n2: { speaker: 'marco',
            text: `"Fifteen minutes. What are you going to do, buy a new vac?"`,
            choices: [
              { text: `"Swap in the spare filter, check the auto-pulse is on, and empty the drum. A clogging filter usually means the drum's full or the pulse is off."`, next: 'n3', tone: 'good', fb: `Maintained to the manufacturer's instructions is part of fully and properly.` },
              { text: `"Have Dee bang the filter on the floor every ten minutes."`, next: 'end_ok', tone: 'ok', fb: `That knocks dust right back into the air she's breathing. Better than no vac, but not a fix.` }
            ] },
          n3: { speaker: 'marco',
            text: `Twenty minutes later the gauge is green and Dee hasn't stopped once. Marco: "Why didn't anybody check that before?"`,
            choices: [
              { text: `"Because nobody had it on a checklist. I'll add the vac drum and filter to the morning inspection."`, next: 'end_good', tone: 'good', fb: `Frequent and regular inspections of equipment are exactly your job.`, cite: '1926.1153(g)(4)' },
              { text: `"Not my job to check vacs."`, next: 'end_ok', tone: 'ok', fb: `It is. Equipment inspections are part of the competent person role.` }
            ] },
          end_good: { end: true, outcome: 'good', title: 'Level 1 handed over on time',
            text: `Dee finished by 2:30 with the collector running and no plume. The vac check went on the daily inspection, and Marco started calling it "Tasha's vac." Take that as a win.`,
            cite: '1926.1153(c)(1); 1926.1153(g)(4)' },
          end_ok: { end: true, outcome: 'ok', title: 'Running, barely',
            text: `The grinding got done, with a lot of filter banging. Dee went home with dust in her eyebrows. Next week the same vac clogs again, because nothing changed.`,
            cite: '1926.1153(c)(1)' },
          end_n95: { end: true, outcome: 'bad', title: 'A mask instead of a control',
            text: `Dee ground for four hours with a mask that wasn't fit tested. The drywall crew and the flooring sub's layout guy breathed it too. A dry grinder indoors isn't on Table 1, so the company is now on the hook for an exposure assessment it never did.`,
            cite: '1926.1153(c)(1); 1926.1153(d)' },
          end_bad: { end: true, outcome: 'bad', title: '"Just for today"',
            text: `Today became the whole week. "Just for today" is how a control disappears from a job. And the crew learned the vac is optional when the schedule's tight.`,
            cite: '1926.1153(c)(1)' }
        },
        narration: `Marco wants to pull the vac, just for today. Pick your words.`,
        sb: { visual: 'Level 1 interior; Dee grinding with shroud and vac; Marco with radio.', search: 'Content Library: superintendent radio; worker grinder', build: 'Storyline dialogue sim, 4 endings.' } },

      { type: 'callout', variant: 'monday', title: 'Use it Monday',
        body: `Before the first cut: water on, hose unkinked, collector gauge green, cab door shut. Ten seconds per tool. Make it part of the morning walk.`,
        narration: `Monday: before the first cut, check water, hose, gauge and cab door. Ten seconds per tool. That's the whole morning walk for Table 1.` }
    ] }
  ],
  kc: { title: 'Knowledge check: Module 4', questions: [
    { question: `Dee runs a handheld saw with water indoors for 1 hour. Which respirator does Table 1 require?`,
      options: [
        { text: `None, it's under 4 hours`, correct: false, fb: `That's the outdoor answer.` },
        { text: `APF 10`, correct: true, fb: `Indoors, handheld saws need APF 10 at any duration.` },
        { text: `APF 25`, correct: false, fb: `Too high for this row.` }
      ],
      explain: `Handheld power saws used indoors or in an enclosed area: APF 10 for 4 hours or less and for more than 4.`, cite: '1926.1153(c)(1) Table 1 (ii)' },
    { question: `A worker cuts with a handheld saw outdoors for 3 hours and then jackhammers outdoors for 2 hours. Which column do you read?`,
      options: [
        { text: `"4 hours or less" for each task, since each is under 4`, correct: false, fb: `That's the 4-hour trap.` },
        { text: `"More than 4 hours" for each task, since the total is 5`, correct: true, fb: `Right. Total Table 1 time sets the column.` },
        { text: `Whichever task was longest`, correct: false, fb: `Not how the rule works.` }
      ],
      explain: `Total duration of all Table 1 tasks in the shift decides the respirator column for each task.`, cite: '1926.1153(c)(3)' },
    { question: `A grinder's dust collector gauge is in the red and the filter is caked. What's the status of the task?`,
      options: [
        { text: `Still Table 1 compliant, since the collector is attached`, correct: false, fb: `Attached isn't working.` },
        { text: `Not fully and properly implemented until the airflow is restored`, correct: true, fb: `Right. Fix it before work continues.` },
        { text: `Compliant if the worker wears APF 25`, correct: false, fb: `A respirator doesn't replace a failed control.` }
      ],
      explain: `Table 1 compliance requires controls fully and properly implemented, including the manufacturer's airflow and a working filter.`, cite: '1926.1153(c)(1)' }
  ] }
});
