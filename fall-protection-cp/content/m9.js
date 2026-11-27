/* ==========================================================================
   Module 9 — Capstone: one shift at Riverside (20 min · Storyline)
   One scored branching shift, ~10 decisions from the 6:30 huddle to the end
   of the day. Mistakes compound: a bad call opens a harder consequence node.
   Every choice carries score, area (m3–m8) and cite for the debrief scorecard.
   Max score: 100 (10 decisions × 10).
   ========================================================================== */
COURSE.addModule({
  id: 'm9', num: 9, title: 'Capstone: one shift at Riverside', minutes: 20,
  build: 'Storyline',
  tagline: 'Ten calls. One shift. Everything you’ve got.',
  hero: 'img_m9_hero',
  objectives: [
    'Apply hazard recognition, system selection, inspection, rescue and stop-work decisions in one continuous scenario.'
  ],
  citations: ['29 CFR 1926.32(f)', '29 CFR 1926.501(b)(1), (b)(2), (b)(4), (b)(14)', '29 CFR 1926.502(d)(15), (d)(16), (d)(19), (d)(20), (d)(21), (d)(23)', '29 CFR 1926.502(f), (h)', '29 CFR 1926.503', 'ANSI/ASSP Z359.2'],
  lessons: [

    /* ------------------------------------------------------------------ */
    { id: 'm9-l1', title: 'The shift', minutes: 14, blocks: [
      { type: 'hero', kicker: 'Module 9 · Capstone', title: 'One shift at Riverside',
        text: `Thursday. A deck pour on Level 3, roofers on the edge after lunch, a curtain wall sub on Level 2. You’re the competent person.`,
        media: 'img_m9_hero',
        narration: `This is it. One full shift at Riverside, from the six thirty huddle to the end of the day. A pour on Level 3, roofers on the edge after lunch, a curtain wall crew on Level 2. You're the competent person. Nobody's going to tell you which module a question comes from.`,
        sb: { visual: 'Wide photo: steel-and-concrete building at dawn, 4 stories.', search: 'building under construction sunrise steel frame', build: 'Rise: Banner; Storyline capstone block embedded below.' } },

      { type: 'text', heading: 'How this works',
        body: [`About ten calls. Each one is scored. A bad call doesn’t end the shift; it makes the next call harder, just like a real day.`,
               `At the end you get a scorecard with every decision, the reason, and the receipt.`],
        narration: `About ten calls. Each one scored. A bad call doesn't end the shift. It makes the next one harder, just like a real day. When you're done, you'll get a scorecard showing every decision you made, why it mattered, and the citation behind it.` },

      { type: 'charintro', characters: ['ray', 'tasha', 'dee', 'marco'] },

      { type: 'scenario', id: 'm9-capstone', title: 'Capstone: one shift at Riverside', scored: true,
        intro: `Thursday at Riverside. You are the competent person. Make the calls.`,
        start: 'd1',
        narration: `Six thirty a.m. Coffee's hot, the trucks are scheduled, and the crew's looking at you. Go.`,
        sb: { visual: 'Reuses scenes: scene-deck.svg (L3 deck), scene-shaft.svg (L2 openings), scene-roof.svg (roof). Time-of-day chip on each decision; score tally hidden until debrief.', search: 'construction site morning huddle; concrete deck pour; roofing crew', build: 'Storyline: one scene, ~16 slides. Number variable CapScore (+choice score). Text variables Area_m3..m8 for debrief. Consequence slides (d2x, d5x) reached only from bad/ok choices. Debrief slide lists each decision with score, area and citation (Storyline results + custom table).' },
        nodes: {
          d1: { speaker: 'tasha',
            text: `6:30 a.m. huddle. Today: Level 3 pour on the north bay, roofers start the perimeter after lunch, curtain wall sub on Level 2. You get two minutes. What do you use them for?`,
            choices: [
              { text: `Name the fall protection for each task out loud, name who runs the boom lift if we need a rescue, and have Dee repeat back her tie-off point.`, next: 'd2', tone: 'good', score: 10, area: 'm8', cite: '1926.503(a)',
                fb: `Specific assignments plus a teach-back. Two minutes that pay all day.` },
              { text: `Walk through the pour sequence and finish with “Be safe up there.”`, next: 'd2', tone: 'ok', score: 4, area: 'm8', cite: '1926.503(a)',
                fb: `The pour plan is useful. “Be safe” is not a fall protection plan.` },
              { text: `Skip it. We’re two weeks behind.`, next: 'd2', tone: 'bad', score: 0, area: 'm8', cite: '1926.503(a)',
                fb: `The huddle is the cheapest safety tool on the job. Skipping it costs you later.` }
            ] },

          d2: { speaker: 'tasha', art: 'assets/art/scene-deck.svg',
            text: `6:50 a.m. Level 3 deck. You have ten minutes before the pump sets up. Where do you walk first?`,
            choices: [
              { text: `The edges and openings that changed since yesterday: the north bay where forms were stripped, and the route the pump hose will take across the rail.`, next: 'd3', tone: 'good', score: 10, area: 'm3', cite: '1926.32(f)',
                fb: `Existing and predictable hazards. You looked where today’s work will change the site.` },
              { text: `The whole deck, same route as every day.`, next: 'd3', tone: 'ok', score: 5, area: 'm3', cite: '1926.32(f)',
                fb: `Better than nothing, but a fixed route walks past what changed.` },
              { text: `Skip it. You walked it yesterday afternoon.`, next: 'd2x', tone: 'bad', score: 0, area: 'm3', cite: '1926.32(f)',
                fb: `Decks change overnight. So do the people who pull rails.` }
            ] },
          d2x: { speaker: 'dee', art: 'assets/art/scene-deck.svg',
            text: `7:20 a.m. Nobody told you the pump operator pulled a cable rail section for the hose. Dee is dragging hose three feet from a 28-ft open edge.`,
            choices: [
              { text: `Stop the hose work now. Re-hang the cable with a hose gap gate before it restarts.`, next: 'd3', tone: 'ok', score: 6, area: 'm4', cite: '1926.501(b)(1)',
                fb: `Good recovery. The walk would have caught it before anybody was exposed.` },
              { text: `Tell Dee to be careful near the edge.`, next: 'd3', tone: 'bad', score: 0, area: 'm4', cite: '1926.501(b)(1)',
                fb: `Careful is not a system. The edge is still open.` }
            ] },

          d3: { speaker: 'ray', art: 'assets/art/scene-deck.svg',
            text: `7:30 a.m. The hose has to cross the north perimeter. Ray: “Drop the cable on that side and put a guy on the edge as a safety monitor. Done.”`,
            choices: [
              { text: `No. Monitoring alone isn’t allowed for deck work. Keep the edge guarded with a hose gap gate or rail under the hose.`, next: 'd4', tone: 'good', score: 10, area: 'm4', cite: '1926.501(b)(1); 1926.502(h)',
                fb: `Right. A monitor alone is only for low-slope roofing on roofs 50 ft wide or less, or inside a written fall protection plan.` },
              { text: `Drop the cable, run a warning line 6 ft back from the edge.`, next: 'd4', tone: 'ok', score: 3, area: 'm4', cite: '1926.502(f)',
                fb: `Warning lines belong to low-slope roofing. On a deck edge, keep the guardrail.` },
              { text: `Drop the cable and have everybody tie off to the rebar.`, next: 'd4', tone: 'bad', score: 0, area: 'm4', cite: '1926.502(d)(15)',
                fb: `Rebar at your feet isn’t a rated anchor, and it doubles the free fall.` }
            ] },

          d4: { speaker: 'dee', art: 'assets/art/scene-deck.svg',
            text: `8:15 a.m. Dee is setting edge form at the north bay, clipped with a 6-ft lanyard to an embedded anchor at her feet. It’s 14 ft to the slab below.`,
            choices: [
              { text: `Move her to the overhead beam clamp with an SRL. Needed clearance drops to about 8.5 ft against 14 available.`, next: 'd5', tone: 'good', score: 10, area: 'm5', cite: '1926.502(d)(16)',
                fb: `Foot-level with a 6-ft lanyard needs 17.5 ft: she’d hit. Overhead SRL fixes the free fall and the clearance.` },
              { text: `Leave the anchor but have her tie a knot in the lanyard to shorten it.`, next: 'd5', tone: 'bad', score: 0, area: 'm5', cite: '1926.502(d)(16)',
                fb: `Knots weaken webbing and defeat the energy absorber. Never modify a lanyard.` },
              { text: `It’s a rated anchor, so she’s fine.`, next: 'd5', tone: 'bad', score: 0, area: 'm5', cite: '1926.502(d)(16)',
                fb: `A rated anchor at her feet still gives an 11-ft free fall and a slab strike.` }
            ] },

          d5: { speaker: 'ray',
            text: `9:30 a.m. Ray’s harness: webbing faded and chalky, and the energy-absorber pack shows a torn warning label. Ray: “That harness is fine. It’s my lucky one.”`,
            choices: [
              { text: `Tag it out of service now and hand him a spare from the gang box. It goes back to the safety manager, not the truck.`, next: 'd6', tone: 'good', score: 10, area: 'm6', cite: '1926.502(d)(19); 1926.502(d)(21)',
                fb: `A deployed absorber means it already arrested a fall. Out of service until a competent person clears it, and absorbers don’t come back.` },
              { text: `Tell him to get a new one by the end of the week.`, next: 'd5x', tone: 'ok', score: 2, area: 'm6', cite: '1926.502(d)(21)',
                fb: `Defective gear comes out of service now, not Friday.` },
              { text: `Ray’s been doing this 28 years. His call.`, next: 'd5x', tone: 'bad', score: 0, area: 'm6', cite: '1926.502(d)(21)',
                fb: `Inspection isn’t a seniority question. It’s yours.` }
            ] },
          d5x: { speaker: 'ray', art: 'assets/art/scene-deck.svg',
            text: `10:40 a.m. Ray is guiding a crane load at the Level 3 edge, tied off with the harness whose absorber has already deployed once.`,
            choices: [
              { text: `Stop the pick. Swap his harness now, then restart.`, next: 'd6', tone: 'ok', score: 5, area: 'm6', cite: '1926.502(d)(19)',
                fb: `Recovered, at the cost of a stopped crane. Catch it at inspection next time.` },
              { text: `Let him finish the pick, then swap it.`, next: 'd6', tone: 'bad', score: 0, area: 'm6', cite: '1926.502(d)(19)',
                fb: `If he goes over in the next ten minutes, he’s hanging on a system with nothing left to give.` }
            ] },

          d6: { speaker: 'narrator', art: 'assets/art/scene-shaft.svg',
            text: `10:45 a.m. Level 2. A curtain wall sub’s worker leans out a window opening, sill 18 in off the floor, 14 ft to grade, no tie-off. Their foreman: “Not your guys, not your problem.”`,
            choices: [
              { text: `Get him back from the opening now. Bring their foreman and Marco in, and loan two SRLs and a beam clamp until theirs arrive.`, next: 'd7', tone: 'good', score: 10, area: 'm8', cite: '1926.501(b)(14); 1926.32(f)',
                fb: `Stop the exposure first, then fix it together.` },
              { text: `Tell Marco at lunch.`, next: 'd7', tone: 'ok', score: 2, area: 'm8', cite: '1926.32(f)',
                fb: `Two hours of exposure while you wait for lunch.` },
              { text: `Walk away. Their program, their problem.`, next: 'd7', tone: 'bad', score: 0, area: 'm8', cite: '1926.32(f)',
                fb: `Your crew walks past that opening, and it’s your site.` }
            ] },

          d7: { speaker: 'marco', art: 'assets/art/scene-roof.svg',
            text: `11:30 a.m. Roofers start the perimeter after lunch. Marco: “Rescue plan’s in the binder. Boom lift’s on the north lot.”`,
            choices: [
              { text: `Walk to the lift: charged, keys in the lockbox, operator named for this afternoon. Check the rescue kit at the roof hatch.`, next: 'd8a', tone: 'good', score: 10, area: 'm7', cite: '1926.502(d)(20)',
                fb: `Verified at the work area, today, with names. That’s a real plan.` },
              { text: `Confirm the plan is signed and in the binder.`, next: 'd8b', tone: 'ok', score: 2, area: 'm7', cite: '1926.502(d)(20)',
                fb: `A signed plan with a dead lift still fails.` },
              { text: `Skip it. Roofers have their own plan.`, next: 'd8b', tone: 'bad', score: 0, area: 'm7', cite: '1926.502(d)(20)',
                fb: `Did anybody check their plan works on this roof?` }
            ] },

          d8a: { speaker: 'narrator', art: 'assets/art/scene-roof.svg',
            text: `1:05 p.m. A roofer working between the warning line and the edge trips and goes over. His SRL catches him. He’s hanging 8 ft below the roof edge, conscious.`,
            choices: [
              { text: `Voice contact and relief straps. The named operator brings the lift. Someone calls 911 and meets EMS at the gate.`, next: 'd9', tone: 'good', score: 10, area: 'm7', cite: '1926.502(d)(20)',
                fb: `Basket beside him at minute 4. The 11:30 check paid off.` },
              { text: `Call 911 and wait for the fire department.`, next: 'd9', tone: 'bad', score: 0, area: 'm7', cite: '1926.502(d)(20)',
                fb: `911 is a phone call. You had a ready lift and didn’t use it.` }
            ] },
          d8b: { speaker: 'narrator', art: 'assets/art/scene-roof.svg',
            text: `1:05 p.m. A roofer goes over the edge and his SRL catches him. He’s hanging 8 ft below the roof edge. The lift battery is dead and nobody knows where the keys are.`,
            choices: [
              { text: `Voice contact and relief straps. Switch to the rescue kit at the roof hatch. 911 in parallel, runner at the gate.`, next: 'd9', tone: 'ok', score: 6, area: 'm7', cite: '1926.502(d)(20)',
                fb: `The backup worked. He was down at minute 13 instead of 7.` },
              { text: `Wait for the fire department.`, next: 'd9', tone: 'bad', score: 0, area: 'm7', cite: '1926.502(d)(20)',
                fb: `He hangs for 18 minutes. He goes to the hospital pale and barely responsive.` }
            ] },

          d9: { speaker: 'marco', art: 'assets/art/scene-roof.svg',
            text: `2:30 p.m. The roofer is with EMS. Marco: “He’s fine. We’re behind. Get them back on the edge.”`,
            choices: [
              { text: `Thirty minutes: the SRL that caught him goes out of service, we check the warning line where he tripped, and the crew hears what happened. Then they go back.`, next: 'd10', tone: 'good', score: 10, area: 'm8', cite: '1926.502(d)(19)',
                fb: `A short, specific pause with an end time. Marco can live with that, and the crew learns from it.` },
              { text: `Shut the roof down for the rest of the day.`, next: 'd10', tone: 'ok', score: 5, area: 'm8', cite: '1926.32(f)',
                fb: `Safe, but nothing was fixed that needed a whole afternoon. Marco will fight you next time.` },
              { text: `Send them back now with the same SRL. It worked, didn’t it?`, next: 'd10', tone: 'bad', score: 0, area: 'm6', cite: '1926.502(d)(19)',
                fb: `Equipment that arrested a fall is out of service until a competent person clears it.` }
            ] },

          d10: { speaker: 'tasha', art: 'assets/art/scene-shaft.svg',
            text: `3:30 p.m. Tomorrow the decking crew opens the next bay on Level 4, and the elevator shaft rail comes off for the rail installers. What do you do tonight?`,
            choices: [
              { text: `Plan it now: shaft opening protection during the rail install (gate plus PFAS for installers), leading-edge protection for the new bay, and brief both at tomorrow’s huddle.`, next: 'endgood', tone: 'good', score: 10, area: 'm3', cite: '1926.32(f); 1926.501(b)(2); 1926.501(b)(4)',
                fb: `Predictable hazards. You solved tomorrow’s exposures before they exist.` },
              { text: `Deal with it in the morning.`, next: 'endok', tone: 'ok', score: 3, area: 'm3', cite: '1926.32(f)',
                fb: `Morning is when the shaft rail comes off. You’ll be planning while it’s open.` },
              { text: `Elevator guys handle their own openings. Not your scope.`, next: 'endbad', tone: 'bad', score: 0, area: 'm3', cite: '1926.501(b)(4)',
                fb: `Your crew walks past that shaft all day.` }
            ] },

          endgood: { end: true, outcome: 'good', title: 'Shift over. Everybody went home.',
            text: `Tomorrow’s hazards are planned tonight. Check your scorecard: every call, the reason, and the receipt. Anything below 10 is the part of the job to practice next week.`, cite: '1926.32(f)' },
          endok: { end: true, outcome: 'ok', title: 'Shift over. Tomorrow starts behind.',
            text: `Everybody went home today. Tomorrow starts with an open shaft and no plan. Check your scorecard for the calls that cost points.`, cite: '1926.32(f)' },
          endbad: { end: true, outcome: 'bad', title: 'Shift over. Tomorrow is already exposed.',
            text: `Predictable hazards are half the definition of your job. Check your scorecard, then replay the shift.`, cite: '1926.32(f)' }
        } },

      { type: 'callout', variant: 'note', title: 'Reading your scorecard',
        body: `90 or more: you’re thinking like a competent person. 70–89: solid, with a gap or two. Under 70: replay it, then revisit the modules your scorecard flags.`,
        narration: `Here's how to read your scorecard. Ninety or better, you're thinking like a competent person. Seventy to eighty-nine, solid with a gap or two. Under seventy, replay it and go back to the modules it flags. No shame in that. That's what it's for.` },

      { type: 'continue', label: 'Before you go' }
    ] },

    /* ------------------------------------------------------------------ */
    { id: 'm9-l2', title: 'Before you go', minutes: 6, blocks: [
      { type: 'quote', speaker: 'ray', mood: 'proud',
        text: `Twenty-eight years and I still learned something. Don’t tell anybody.`,
        narration: `Ray wanted the last word. Of course he did.` },

      { type: 'commitment', id: 'm9-commitment', title: 'Your commitment card',
        prompt: `What is the one thing you will do differently on Monday?`,
        examples: [
          `Walk the edges that changed before every pour, not the same route as always.`,
          `No rail comes down on my deck unless I know and a replacement is up.`,
          `Run the rescue check at every morning huddle: lift, keys, kit, names.`,
          `Overhead anchors only. Clearance math before anyone ties off at their feet.`,
          `Say “hold up” instead of “be careful.”`
        ],
        narration: `One thing. Not ten. What's the one thing you'll do differently Monday? Write it in your own words. Save the card and put it where you'll see it: the truck visor, the hard hat, the phone lock screen.`,
        sb: { visual: 'Card preview in brand colors with learner text, name and date; download as PNG.', search: 'n/a', build: 'Storyline: text entry → variable Commitment; card layer shows variable; Rise alt: text entry block + downloadable template.' } },

      { type: 'text', heading: 'What’s next: the final exam',
        body: [`40 questions drawn from randomized pools, mostly Riverside scenarios. Pass with 80% and every one of the 8 critical items right. You get 3 attempts.`,
               `Miss a critical item and the course reopens the module behind it before your next try.`],
        narration: `Next is the final exam. Forty questions, mostly scenarios like the ones you've been doing. You need eighty percent and all eight critical items correct. Critical items are things like stop work, system selection, anchor strength, clearance, removal from service and the rescue plan. Three attempts. If you miss, the course sends you back to the module you need before the next try.` },

      { type: 'callout', variant: 'warning', title: 'The exam is not the finish line',
        body: `Passing earns a knowledge certificate. You are not a designated competent person until your safety manager signs the field verification on a live site and your employer grants you authority. <cite>1926.32(f)</cite>`,
        narration: `Important. Passing the exam gets you a certificate for the knowledge part. You are not the competent person until your safety manager watches you do it on a real site, signs the field verification, and your employer gives you the authority to fix what you find.` },

      { type: 'checklist', id: 'm9-fieldprep', title: 'Get ready for your field verification',
        items: [
          `Walk an active work area and point out existing and predictable fall hazards`,
          `Pick a compliant system for two real tasks and explain why`,
          `Inspect a harness, a lanyard or SRL, and an anchor; tag one item correctly`,
          `Calculate fall clearance for an actual tie-off point`,
          `Inspect a guardrail run and a hole cover against spec`,
          `Walk through the site rescue plan and confirm the equipment is on hand`,
          `Hold a stop-work conversation (role-play with the safety manager is fine)`,
          `Review a worker’s training certification record for completeness`
        ],
        narration: `These are the eight things your safety manager will watch you do. Tick off the ones you could do tomorrow. The ones you can't tick are the ones to practice this week.`,
        sb: { visual: 'Checklist styled like the field verification form.', search: 'safety manager clipboard site walk', build: 'Rise: Checklist; mirrors the field verification sign-off job aid.' } },

      { type: 'callout', variant: 'monday', title: 'Monday',
        body: `Do your commitment once before 10 a.m. Then book your field verification walk with the safety manager.`,
        narration: `Monday. Do the thing on your commitment card once before ten in the morning. Then call your safety manager and book your field verification walk. See you at the exam.` }
    ] }
  ]
});
