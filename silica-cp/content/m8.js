/* ==========================================================================
   Module 8 — Capstone: one shift at Riverside (8 min · Storyline)
   One scored branching shift, 8 decisions from the 6:30 huddle to the end
   of the day. Bad calls open harder consequence nodes. Each choice carries
   score, area (m2–m7) and cite for the debrief scorecard.
   ========================================================================== */
COURSE.addModule({
  id: 'm8', num: 8, title: 'Capstone: one shift at Riverside', minutes: 8,
  build: 'Storyline',
  tagline: 'Eight calls. One shift. Everybody breathes easier by 3:30.',
  hero: 'img_m8_hero',
  objectives: [
    'Apply silica task recognition, Table 1 control selection, respirator choice, housekeeping, access and stop-work decisions in one continuous scenario.'
  ],
  citations: ['29 CFR 1926.1153(b), (c)(1)-(3), (d), (e), (f), (g)(1)(iv), (g)(4), (i)(2)', '29 CFR 1926.1153 Table 1', '29 CFR 1910.134'],
  lessons: [

    /* ------------------------------------------------------------------ */
    { id: 'm8-l1', title: 'The shift', minutes: 6, blocks: [
      { type: 'hero', kicker: 'Module 8 · Capstone', title: 'One shift at Riverside',
        text: `Tuesday. Slab cutting and coring on Level 1, CMU at the elevator core, tuckpointing at the entrance, and the drywall sub on Level 2. You're the competent person.`,
        media: 'img_m8_hero',
        narration: `This is it. One shift at Riverside. Slab cutting and coring on Level 1, block at the elevator core, tuckpointing at the entrance, and the drywall sub upstairs. You're the competent person. Nobody's going to tell you which module a question comes from.`,
        sb: { visual: 'Wide photo of an active site at morning.', search: 'construction crew morning site concrete', build: 'Rise: Banner; Storyline capstone block embedded below.' } },

      { type: 'text', heading: 'How this works',
        body: [`Eight calls. Each one is scored. A bad call doesn't end the shift; it makes the next call harder, the way a real day does.`,
               `At the end you get a scorecard with every decision, the reason, and the receipt.`],
        narration: `Eight calls, each one scored. A bad call doesn't end the shift. It makes the next one harder, just like a real day. At the end you get a scorecard with every decision, why it mattered, and the citation behind it.` },

      { type: 'charintro', characters: ['ray', 'tasha', 'dee', 'marco', 'gus'] },

      { type: 'scenario', id: 'm8-capstone', title: 'Capstone: one shift at Riverside', scored: true,
        intro: `Tuesday at Riverside. You are the silica competent person. Make the calls.`,
        start: 'd1',
        narration: `Six thirty. Coffee's hot, the saws are fueled, and the crew's looking at you. Go.`,
        sb: { visual: 'Reuses scene-slab.svg (Level 1) and scene-entrance.svg (entrance). Time chip on each decision; score tally hidden until debrief.', search: 'construction morning huddle; concrete saw cutting with water; brick tuckpointing', build: 'Storyline: one scene, ~12 slides. Number variable M8_Score (+choice score). Text variables Area_m2..m7 for debrief. Consequence slides (d2x, d4x, d6x) reached only from weak choices. Debrief slide lists each decision with score, area and citation.' },
        nodes: {
          d1: { speaker: 'tasha',
            text: `6:30 a.m. huddle. Today: slab cuts and six cores on Level 1, CMU cuts for the elevator core, tuckpointing at the entrance all day, drywall hanging on Level 2. You have two minutes. What do you use them for?`,
            choices: [
              { text: `Go task by task: the Table 1 control, the respirator for today's hours and location, and who to find if a control fails. Ask Gus to repeat back his saw setup.`, next: 'd2', tone: 'good', score: 10, area: 'm7', cite: '1926.1153(i)(2)',
                fb: `Specific controls, specific respirators, a name to find, and a teach-back. Two minutes that pay all day.` },
              { text: `Walk through the schedule and finish with "keep the dust down."`, next: 'd2', tone: 'ok', score: 4, area: 'm7', cite: '1926.1153(i)(2)',
                fb: `The schedule helps. "Keep the dust down" is not a control.` },
              { text: `Skip it. The owner walkthrough is Friday and we're behind.`, next: 'd2', tone: 'bad', score: 0, area: 'm7', cite: '1926.1153(i)(2)',
                fb: `The huddle is the cheapest control you have. Skipping it costs you later.` }
            ] },

          d2: { speaker: 'gus', art: 'assets/art/scene-slab.svg',
            text: `7:05 a.m. Level 1. Gus has the handheld saw ready for the slab cuts. The water tank is a quarter full and the hose has a kink. He says, "It'll last."`,
            choices: [
              { text: `Hold the cut. Fill the tank, straighten the hose, and check that water reaches the blade with no visible dust before he starts.`, next: 'd3', tone: 'good', score: 10, area: 'm4', cite: '1926.1153(c)(1); Table 1 (ii)',
                fb: `Fully and properly means the water actually reaches the cut at enough flow to keep dust down.` },
              { text: `Let him start, and tell him to fill it when it runs low.`, next: 'd2x', tone: 'ok', score: 3, area: 'm4', cite: '1926.1153(c)(1)',
                fb: `It'll run low mid-cut, and nobody stops mid-cut.` },
              { text: `He's done it a hundred times. Let him go.`, next: 'd2x', tone: 'bad', score: 0, area: 'm4', cite: '1926.1153(c)(1)',
                fb: `A control that isn't working isn't a Table 1 control.` }
            ] },
          d2x: { speaker: 'narrator', art: 'assets/art/scene-slab.svg',
            text: `7:40 a.m. The tank ran dry halfway through the third cut. Gus kept going to "just finish this one." There's a gray cloud drifting toward the plumbers. Indoors.`,
            choices: [
              { text: `Stop the saw now. Refill, check flow, HEPA vac the settled dust, then restart.`, next: 'd3', tone: 'ok', score: 5, area: 'm4', cite: '1926.1153(c)(1); (f)(1)',
                fb: `Good recovery. A check at 7:05 would have prevented it.` },
              { text: `Hand Gus an N95 and let him finish.`, next: 'd3', tone: 'bad', score: 0, area: 'm6', cite: '1926.1153(d)(3)(i)',
                fb: `A respirator doesn't replace the engineering control, and the plumbers are still breathing it.` }
            ] },

          d3: { speaker: 'ray', art: 'assets/art/scene-slab.svg',
            text: `8:30 a.m. Ray is jackhammering the Level 1 slab for a trench drain, indoors, with a water spray. He's been on it since 7 and has four more hours. He's wearing no respirator. "It's wet. I'm fine."`,
            choices: [
              { text: `"Wet is the control. Indoors, Table 1 still says APF 10 at any duration. Half mask on, and it's your fit-tested one."`, next: 'd4', tone: 'good', score: 10, area: 'm4', cite: 'Table 1 (x)',
                fb: `Indoor jackhammering needs APF 10 whether it's two hours or eight.` },
              { text: `"You're fine until 4 hours. Mask on after lunch."`, next: 'd4', tone: 'bad', score: 2, area: 'm4', cite: 'Table 1 (x)',
                fb: `That's the outdoor rule. Indoors it's APF 10 from the first minute.` },
              { text: `"Wet means no respirator."`, next: 'd4', tone: 'bad', score: 0, area: 'm4', cite: 'Table 1 (x)',
                fb: `Not indoors. Read the location column.` }
            ] },

          d4: { speaker: 'dee', art: 'assets/art/scene-entrance.svg',
            text: `9:45 a.m. The entrance. Dee is tuckpointing with a shrouded grinder and a vacuum. The vac gauge reads half its rated airflow, and dust is curling out from the shroud. She's in a PAPR.`,
            choices: [
              { text: `Stop the grinding. Swap or clean the filter and check the airflow against the 25 cfm per inch of blade it needs before she restarts.`, next: 'd5', tone: 'good', score: 10, area: 'm4', cite: 'Table 1 (xi)',
                fb: `The vac has to provide 25 cfm or more per inch of wheel. Half airflow is a failed control, PAPR or not.` },
              { text: `She has a PAPR. Let her finish the wall.`, next: 'd4x', tone: 'bad', score: 0, area: 'm4', cite: 'Table 1 (xi); 1926.1153(d)(3)(i)',
                fb: `The PAPR is the backup. The dust escaping the shroud reaches everyone near the entrance.` },
              { text: `Tell her to clean the filter at lunch.`, next: 'd4x', tone: 'ok', score: 3, area: 'm4', cite: 'Table 1 (xi)',
                fb: `Two more hours of a failed control.` }
            ] },
          d4x: { speaker: 'marco', art: 'assets/art/scene-entrance.svg',
            text: `11:00 a.m. Marco calls: the clinic's landscape crew is planting at the entrance, right under Dee's scaffold, in a haze of mortar dust. "Their super is asking who's in charge of this."`,
            choices: [
              { text: `Stop the grinding, fix the vac, and set a barrier and sign around the scaffold. Talk to their super about scheduling.`, next: 'd5', tone: 'ok', score: 5, area: 'm6', cite: '1926.1153(g)(1)(iv)',
                fb: `Recovered. Restricting access covers other employers too. A working vac would have kept it smaller.` },
              { text: `"Not our guys. They should've asked."`, next: 'd5', tone: 'bad', score: 0, area: 'm6', cite: '1926.1153(g)(1)(iv)',
                fb: `Your dust, their lungs. Access procedures cover exposures to other employers.` }
            ] },

          d5: { speaker: 'gus', art: 'assets/art/scene-entrance.svg',
            text: `11:30 a.m. The countertop installer is about to cut a quartz (engineered stone) backsplash with a dry grinder in the clinic lobby. "It's two cuts. Two minutes."`,
            choices: [
              { text: `No dry cuts. Use the wet saw outside, or a grinder with integrated water. Engineered stone can be over 90% silica.`, next: 'd6', tone: 'good', score: 10, area: 'm3', cite: 'Table 1 (xii); 1926.1153(c)(1)',
                fb: `Highest-silica material on the job, indoors, dry. That's the exposure that causes the fastest disease.` },
              { text: `OK, but have him wear an N95.`, next: 'd6', tone: 'bad', score: 0, area: 'm3', cite: '1926.1153(d)(3)(i)',
                fb: `Engineering controls come first. And everybody else in the lobby has no mask.` },
              { text: `Two minutes is fine. Short tasks don't count.`, next: 'd6', tone: 'bad', score: 0, area: 'm3', cite: '1926.1153(a)',
                fb: `The exception is for exposure below the action level under any foreseeable conditions. Dry-cutting quartz isn't that.` }
            ] },

          d6: { speaker: 'ray', art: 'assets/art/scene-slab.svg',
            text: `1:30 p.m. The cores are done. Level 1 is gray. Ray has a push broom and the air hose. The drywall sub is taping on the same floor.`,
            choices: [
              { text: `HEPA vac and wet sweep. No broom, no air. Two vacs, done by 2:30.`, next: 'd7', tone: 'good', score: 10, area: 'm6', cite: '1926.1153(f)(1)-(2)',
                fb: `Feasible alternatives exist, so dry sweeping and compressed air are out.` },
              { text: `Broom is OK, skip the air.`, next: 'd6x', tone: 'ok', score: 3, area: 'm6', cite: '1926.1153(f)(1)',
                fb: `Dry sweeping is out too when wet sweeping or a HEPA vac is feasible.` },
              { text: `Fine, the drywallers can step out for 10 minutes.`, next: 'd6x', tone: 'bad', score: 0, area: 'm6', cite: '1926.1153(f)(1)-(2)',
                fb: `The cloud lasts longer than 10 minutes and resettles on everything.` }
            ] },
          d6x: { speaker: 'narrator', art: 'assets/art/scene-slab.svg',
            text: `2:15 p.m. The drywall foreman is angry. His crew came back into a haze, and his taper is coughing. He wants to know what your plan says about other trades on the floor.`,
            choices: [
              { text: `Own it. HEPA vac the floor now, and agree on a schedule: dusty work and cleanup when his crew is off the floor, barrier and sign when they're not.`, next: 'd7', tone: 'ok', score: 5, area: 'm6', cite: '1926.1153(g)(1)(iv)',
                fb: `That's the access procedure the plan should have driven this morning.` },
              { text: `"It's just dust. It'll settle."`, next: 'd7', tone: 'bad', score: 0, area: 'm1', cite: '1926.1153(i)(1)',
                fb: `That's the sentence this course is about.` }
            ] },

          d7: { speaker: 'marco',
            text: `2:45 p.m. Marco: "Tomorrow we start grinding the Level 2 slab with a walk-behind floor grinder. It's not on the plan. Can we just start?"`,
            choices: [
              { text: `"Walk-behind floor grinders are Table 1 row (xiii): integrated water, or a dust collector with a filter-cleaning mechanism. Let's add the task to the plan tonight and make sure we have the right collector."`, next: 'd8', tone: 'good', score: 10, area: 'm7', cite: 'Table 1 (xiii); 1926.1153(g)(1)(i)',
                fb: `A new task goes in the plan with its control before it starts.` },
              { text: `"Sure, same controls as the saw."`, next: 'd8', tone: 'bad', score: 2, area: 'm7', cite: '1926.1153(g)(1)(i)',
                fb: `Different tool, different Table 1 row, different controls.` },
              { text: `"Not my job. That's the safety manager's plan."`, next: 'd8', tone: 'bad', score: 0, area: 'm2', cite: '1926.1153(g)(4)',
                fb: `You implement the plan through inspections. A task that isn't in it is your problem to raise.` }
            ] },

          d8: { speaker: 'ray', art: 'assets/art/scene-slab.svg',
            text: `3:30 p.m. Ray, coughing, waves it off: "It's just dust." You know he's due for his three-year medical exam.`,
            choices: [
              { text: `"It's not just dust. Your exam is due. Go this week, tell them about the cough, and I'll cover your Thursday."`, next: 'endgood', tone: 'good', score: 10, area: 'm7', cite: '1926.1153(h)(3)',
                fb: `Medical surveillance at least every three years for respirator users. Early is the whole point.` },
              { text: `Say nothing. It's his health.`, next: 'endok', tone: 'ok', score: 3, area: 'm7', cite: '1926.1153(h)',
                fb: `It is his call. A nudge from you is often what gets someone to the exam.` },
              { text: `"Yeah, we all cough."`, next: 'endbad', tone: 'bad', score: 0, area: 'm1', cite: '1926.1153(i)(1)',
                fb: `That's how Walt's story started.` }
            ] },

          endgood: { end: true, outcome: 'good', title: 'Shift over. Clean air, clear plan.',
            text: `Every control worked or got fixed before the cut. Tomorrow's new task is in the plan, and Ray booked his exam. Check your scorecard: every call, the reason, and the receipt.`, cite: '1926.1153(g)(4)' },
          endok: { end: true, outcome: 'ok', title: 'Shift over. Some dust got through.',
            text: `Most of the controls held. Check your scorecard for the calls that cost points; those are the ones to practice.`, cite: '1926.1153(g)(4)' },
          endbad: { end: true, outcome: 'bad', title: 'Shift over. "Just dust" won today.',
            text: `Too many controls ran half-working, and too many people breathed it. Check your scorecard, then replay the shift.`, cite: '1926.1153(g)(4)' }
        } },

      { type: 'callout', variant: 'note', title: 'Reading your scorecard',
        body: `70 or more of 80: you're thinking like a competent person. 55 to 69: solid, with a gap or two. Under 55: replay it, then revisit the modules your scorecard flags.`,
        narration: `Here's how to read your scorecard. Seventy or better out of eighty, you're thinking like a competent person. Fifty-five to sixty-nine, solid with a gap or two. Under fifty-five, replay it and go back to the modules it flags. That's what it's for.` },

      { type: 'continue', label: 'Before you go' }
    ] },

    /* ------------------------------------------------------------------ */
    { id: 'm8-l2', title: 'Before you go', minutes: 2, blocks: [
      { type: 'quote', speaker: 'ray', mood: 'calm',
        text: `Booked the exam. Don't make it a thing.`,
        narration: `Ray wanted the last word. Of course he did.` },

      { type: 'commitment', id: 'm8-commitment', title: 'Your commitment card',
        prompt: `What is the one thing you will do differently on Monday?`,
        examples: [
          `Check water flow at the blade before every cut, not after the dust shows up.`,
          `Read the respirator column for indoors, every time.`,
          `No broom, no air hose on my floors. HEPA vac and wet sweep.`,
          `Ask every new worker if they know who the silica competent person is.`,
          `Say "hold the cut" instead of "keep the dust down."`
        ],
        narration: `One thing. Not ten. What's the one thing you'll do differently Monday? Write it in your own words. Save the card and put it where you'll see it.`,
        sb: { visual: 'Card preview in brand colors with learner text, name and date; download as PNG.', search: 'n/a', build: 'Storyline: text entry → variable Commitment; card layer shows variable; Rise alt: text entry block + downloadable template.' } },

      { type: 'text', heading: 'What\'s next: the final exam',
        body: [`25 questions drawn from randomized pools, mostly Riverside scenarios. Pass with 80% and every one of the 5 critical items right. You get 3 attempts.`,
               `Miss a critical item and the course reopens the module behind it before your next try.`],
        narration: `Next is the final exam. Twenty-five questions, mostly scenarios like the ones you've been doing. You need eighty percent and all five critical items right. The critical items are Table 1 control selection, the respirator for the duration, when an exposure assessment is required, no dry sweeping or compressed air, and restricting access or stopping work. Three attempts. If you miss, the course sends you back to the module you need first.` },

      { type: 'callout', variant: 'warning', title: 'The exam is not the finish line',
        body: `Passing earns a knowledge certificate. You are not a designated competent person until your safety manager signs the field verification on a live site and your employer grants you authority to take prompt corrective measures. <cite>1926.1153(b), (g)(4)</cite>`,
        narration: `Important. Passing the exam gets you a certificate for the knowledge part. You're not the competent person until your safety manager watches you do it on a real site, signs the field verification, and your employer gives you the authority to fix what you find.` },

      { type: 'checklist', id: 'm8-fieldprep', title: 'Get ready for your field verification',
        items: [
          `Walk an active area and name every silica task, including other employers' work`,
          `Check Table 1 controls on two real tasks: water, shroud, vac, filter, airflow`,
          `Name the respirator for each task by hours and location`,
          `Confirm respirator users are medically cleared and fit tested`,
          `Check housekeeping: no dry sweeping or compressed air`,
          `Match the written plan to the tasks actually being done`,
          `Inspect an enclosed cab, if there's heavy equipment`,
          `Hold a corrective-action or stop-work conversation`
        ],
        narration: `These are the eight things your safety manager will watch you do. Tick the ones you could do tomorrow. The ones you can't tick are the ones to practice this week.`,
        sb: { visual: 'Checklist styled like the field verification form.', search: 'safety manager clipboard site walk', build: 'Rise: Checklist; mirrors the field verification sign-off job aid.' } },

      { type: 'download', title: 'Field verification sign-off', file: 'jobaids/field-verification-signoff.html',
        pdf: 'jobaids/pdf/field-verification-signoff.pdf',
        desc: 'The form your safety manager signs on site. Bring it to the walk.',
        narration: `Here's the sign-off form. Bring it to your field walk.` },

      { type: 'callout', variant: 'monday', title: 'Monday',
        body: `Do your commitment once before 10 a.m. Then book your field verification walk with the safety manager.`,
        narration: `Monday. Do the thing on your commitment card once before ten in the morning. Then book your field verification walk. See you at the exam.` }
    ] }
  ],
  jobAids: [{ title: 'Field verification sign-off', file: 'jobaids/field-verification-signoff.html', pdf: 'jobaids/pdf/field-verification-signoff.pdf',
              desc: 'Eight observed items, safety manager signature, and the employer\'s authority statement.' }]
});
