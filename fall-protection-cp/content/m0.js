/* ==========================================================================
   Module 0 — Start here: why you, why now (15 min · Rise)
   Objectives: why falls stay the top killer and why the CP is the last line
   of defense; how the course works, including the field sign-off.
   ========================================================================== */
COURSE.addModule({
  id: 'm0', num: 0, title: 'Start here: why you, why now', minutes: 15,
  build: 'Rise',
  tagline: 'You already know how to tie off. This is about what you stop seeing.',
  hero: 'img_m0_hero',
  objectives: [
    'Explain why falls remain the leading cause of construction deaths and why the competent person is the last line of defense.',
    'Describe how the course works, including the field sign-off required before designation.'
  ],
  citations: ['29 CFR 1926.32(f)', '29 CFR 1926.500(a)', 'BLS Census of Fatal Occupational Injuries 2024', 'OSHA Top 10 Most Frequently Cited Standards, FY2026 (preliminary)'],
  lessons: [

    /* ------------------------------------------------------------------ */
    { id: 'm0-l1', title: 'Why you', minutes: 6, blocks: [
      { type: 'hero', kicker: 'Module 0 · Start here', title: 'Why you, why now',
        text: `You've been named the person who sees it first and fixes it fastest. Fifteen minutes to see what that means.`,
        media: 'img_m0_hero',
        narration: `Welcome to Riverside. If you're here, somebody looked at your crew and decided you're the one who should be watching the edges. Let's talk about why that matters, and why it's you.`,
        sb: { visual: 'Full-bleed photo: steel frame building, worker tied off at height, morning light.', search: 'construction worker harness steel beam', build: 'Rise: Cover page + Banner block with image overlay.' } },

      { type: 'quote', speaker: 'ray', mood: 'pushback',
        text: `I've been doing this 28 years. What's a course going to tell me?`,
        narration: `That's Ray. Foreman. Twenty-eight years in. You'll be hearing a lot from Ray.` },
      { type: 'quote', speaker: 'tasha', mood: 'calm',
        text: `Probably nothing about tying off. A lot about what you stop seeing.`,
        narration: `And that's me, Tasha. Lead hand on the concrete crew, newly designated competent person on this job. Ray's not wrong that he knows the work. Neither are you. That's not what this course is about.` },

      { type: 'text', heading: 'What this course is really about',
        body: [`Most of you can rig a harness in the dark. Knowing how was never the problem.`,
               `This course is about three things: what you <b>notice</b>, what you <b>tolerate</b>, and what you <b>say</b> when the schedule is pushing.`],
        narration: `Most falls on our jobs don't happen because nobody knew the rule. They happen because everybody walked past the open edge for a week, and nobody said anything when the schedule got tight. Notice, tolerate, say. Keep those three words in your back pocket.` },

      { type: 'poll', id: 'm0-poll-exposed',
        question: `Be honest. How many times this year did you see someone working exposed at 6 feet or more?`,
        options: [
          { label: 'Never', pct: 7 },
          { label: '1 to 5 times', pct: 29 },
          { label: '6 to 20 times', pct: 38 },
          { label: 'More than I can count', pct: 26 }
        ],
        note: `Scripted peer results for this course. Most foremen who answer honestly land in the middle. Every one of those was a fall that didn't happen. That time.`,
        narration: `Pick the one that's true, not the one that sounds good. Nobody sees your answer but you.`,
        sb: { visual: 'Four large tap targets; bar chart animates in after choice.', search: 'construction foreman thinking', build: 'Storyline: freeform pick-one, no scoring. Results layer shows static bars (7/29/38/26). Variable Poll_M0 stores choice for the M9 debrief.' } },

      { type: 'stats',
        items: [
          { value: '389', label: 'construction workers killed by falls, slips and trips in one year', source: 'BLS Census of Fatal Occupational Injuries, 2024 (private construction industry)' },
          { value: '1 in 3', label: 'construction deaths are falls, slips or trips; 96% of those are falls to a lower level', source: 'BLS CFOI 2024' },
          { value: '#1', label: 'most-cited OSHA standard, 16 years running: Fall Protection, 1926.501', source: 'OSHA Top 10, FY2026 preliminary (Oct 2025 to Aug 2026)' }
        ],
        note: `Behind each number is a crew that went home one short. The good news: falls are the most preventable killer on site. The fixes are known and cheap.`,
        narration: `Three hundred eighty-nine. That's one year, just in construction. Over a third of everybody we lose on our sites, lost to falls, slips and trips, and almost all of those are falls to a lower level. And fall protection has been the number one OSHA citation sixteen years running. That isn't because nobody knows the rule. It's because somebody saw the hazard and let it ride.`,
        sb: { visual: 'Three stat tiles, numbers count up.', search: 'safety statistics icons', build: 'Rise: Statement block (note) or three-column Image & Text; numbers verified against BLS CFOI 2024 release (Dec 2025) and OSHA FY2026 preliminary list.' } },

      { type: 'text', heading: 'Why the competent person is the last line of defense',
        body: [`Guardrails get pulled for a pump hose. Covers get kicked aside. Anchors get picked because they're close.`,
               `Systems don't fail on their own. They drift, one small decision at a time. The competent person is the one on site every day with the eyes to catch the drift and the <b>authority to fix it</b> before somebody pays for it. <cite>1926.32(f)</cite>`],
        narration: `Here's the thing about every fall protection system on a job: it was fine the day it went in. Then someone pulls a cable for the pump hose. Someone kicks a cover aside to drop a sleeve. Someone ties off to whatever's closest. You're the person who's there every day, who can see that drift, and who's allowed to stop it. The safety manager visits. The engineer designs. You're the one standing on the deck.` },

      { type: 'callout', variant: 'field-check', title: 'Field check',
        body: `Think of the last time someone on your crew worked at an open edge. Who noticed? Did anyone say something? What happened next?`,
        input: true,
        narration: `Take a second with this one. Not the textbook answer. The last time you actually saw it on your site.` },

      { type: 'video', media: 'vid_m0',
        caption: `From the national fall prevention campaign.`,
        watchFor: `Watch for the three words the campaign keeps coming back to. They're also the three jobs you're taking on.`,
        narration: `This short video comes from the national campaign to stop construction falls. Watch for the three words they keep repeating: plan, provide, train. Those are about to be your job.`,
        sb: { visual: 'Embedded YouTube video with poster and caption.', search: 'n/a (web video)', build: 'Rise: Multimedia > Embed block (YouTube). Storyline alternative: Web Object.' } },

      { type: 'continue', label: 'Meet the job' }
    ] },

    /* ------------------------------------------------------------------ */
    { id: 'm0-l2', title: 'Your job, your crew', minutes: 5, blocks: [
      { type: 'text', heading: 'Welcome to Riverside Medical Office',
        body: [`One project runs through this whole course. The hazards on it build on each other, the same way they do on yours.`,
               `Four stories of steel and concrete. Two weeks behind. An owner who wants it done before flu season.`],
        narration: `Every module in this course happens on one job: Riverside Medical Office. Four stories, structural steel, metal deck and concrete. We're two weeks behind because steel showed up late, and the owner, a regional health system, wants the keys before flu season. Sound familiar? The hazards you'll find here build on each other, the same way they do on your job.` },

      { type: 'labeled', src: 'assets/art/riverside-elevation.svg',
        alt: 'Side elevation of Riverside Medical Office under construction: tower crane, four levels, roof with skylights, elevator core.',
        markers: [
          { x: 88, y: 51, title: 'Level 3 deck edge', body: `Perimeter cable rail, crane picks landing at the edge. Ray's "hundred times" shortcut happens here. <em>Modules 1, 3, 8</em>` },
          { x: 59, y: 19, title: 'Roof and skylights', body: `Low-slope TPO roof, 96 ft wide. Two atrium skylights. A 24-inch parapet on the east side only. <em>Modules 3, 4, 7</em>` },
          { x: 53, y: 50, title: 'Elevator shaft and stairs', body: `One shaft, two stair openings, MEP holes on every deck. <em>Module 3</em>` },
          { x: 36, y: 38, title: 'Level 4 metal deck', body: `Steel above you, deck under you. Where you'll pick anchors and do the clearance math. <em>Module 5</em>` },
          { x: 22, y: 12, title: 'Tower crane', body: `Every pick that lands at an edge pulls someone toward it.` }
        ],
        caption: `Tap each marker. You'll work every one of these spots before the course is done.`,
        narration: `Tap through the job. The deck edge where the crane lands bundles. The roof with its two skylights and a parapet that only runs along one side. The elevator shaft and stair openings. The fourth-floor deck, where you'll be picking anchors. You'll work every one of these spots before we're done.`,
        sb: { visual: 'Riverside elevation illustration (assets/art/riverside-elevation.svg) with 5 hotspot markers.', search: 'construction site building steel frame crane', build: 'Rise: Labeled Graphic block, 5 markers.' } },

      { type: 'table', title: 'The job at a glance',
        headers: ['', 'Riverside Medical Office'],
        rows: [
          ['Frame', 'Structural steel, composite metal deck, cast-in-place slabs'],
          ['Height', '4 stories, 14 ft floor to floor'],
          ['Roof', 'Low-slope TPO, 180 ft × 96 ft, 24 in parapet on the east side only, two skylights'],
          ['Openings', '1 elevator shaft, 2 stair openings, MEP penetrations on every deck'],
          ['Schedule', '2 weeks behind after a steel delivery slip'],
          ['Daily rhythm', '6:30 a.m. huddle, pours start at 7:00']
        ],
        note: `Riverside and everyone on it are fictional composites.`,
        narration: `Keep these numbers in mind. Fourteen feet floor to floor will matter a lot when we get to clearance. Ninety-six feet wide will matter on the roof.` },

      { type: 'charintro', characters: ['ray', 'tasha', 'dee', 'marco'],
        narration: `Meet the crew. Ray, our foreman, who's earned some shortcuts and will tell you so. Me, Tasha, the new competent person, who's going to make some calls and get some of them wrong. Dee, second-year apprentice, who watches everything we do. And Marco, our superintendent, who isn't a bad guy. He's just got the owner, the schedule and the money all landing on his desk.`,
        sb: { visual: 'Four character cards with illustrated avatars, name, role, one line.', search: 'construction worker portrait hard hat (Content Library photo characters)', build: 'Rise: Flashcard grid or Image & Text x4. Storyline: character states for each.' } },

      { type: 'quote', speaker: 'dee', mood: 'calm',
        text: `Honestly? I watch what Ray does. Ray's been doing this forever.`,
        narration: `Remember that line. Dee isn't learning the job from the safety manual. Dee is learning it from Ray. And from you.` },

      { type: 'callout', variant: 'note', title: 'Follow the thread',
        body: `Ray has a shortcut at the Level 3 deck edge that's "worked a hundred times." Watch it. It shows up in almost every module, and so does the moment someone could have said something.`,
        narration: `One more thing. Ray has a habit at the deck edge he says has worked a hundred times. Keep an eye on it. It runs through this whole course.` }
    ] },

    /* ------------------------------------------------------------------ */
    { id: 'm0-l3', title: 'How this course works', minutes: 4, blocks: [
      { type: 'mcq', id: 'm0-q-when',
        question: `Quick gut check before we explain anything. You pass the final exam on Friday. When can you act as the competent person at Riverside?`,
        options: [
          { text: 'Friday afternoon. The certificate makes it official.', correct: false, fb: `Close, but no. The certificate covers the online part only.` },
          { text: 'After the safety manager signs your field verification and your employer gives you the authority.', correct: true, fb: `Right. Knowledge, then proof on a real site, then authority.` },
          { text: 'After 30 days of working under another competent person.', correct: false, fb: `There's no waiting period in the rule. What matters is capability plus authority.` }
        ],
        explain: `OSHA's definition has two parts: you can identify existing and predictable hazards, and you're authorized to take prompt corrective measures. This course builds the first part. Your employer grants the second, after a field verification.`,
        cite: '1926.32(f)',
        narration: `Before I explain how this works, take a guess.`,
        sb: { build: 'Storyline: pick-one, feedback layers per option, unscored. Rise alternative: Knowledge Check block.' } },

      { type: 'coursemap',
        narration: `Here's the map. Ten modules and a final exam, about six hours total. Each one is fifteen to forty-five minutes, and the course bookmarks where you stop, so you can do a module in the truck at lunch and pick up the next one tomorrow.`,
        sb: { visual: 'Riverside project timeline: modules as phases of the job.', search: 'construction schedule timeline', build: 'Rise: Timeline block or Process block generated from module list; shape timeline.' } },

      { type: 'process', title: 'How every module works',
        steps: [
          { title: 'Decide first', body: `Most lessons open with a call you have to make. You'll get some wrong. That's on purpose: the miss is where the learning starts.` },
          { title: 'See the standard behind it', body: `After you decide, you see why. OSHA and ANSI citations show up as receipts, not lectures.` },
          { title: 'Take something Monday', body: `Every module ends with something you can use on site: a checklist, a pocket card, words for a hard conversation.` },
          { title: 'Prove it on a real site', body: `A safety manager watches you do it for real before you're designated. Then you're the one people call.` }
        ],
        narration: `Every module runs the same way. You decide first, before anybody tells you the answer. Then you see the standard behind it. Then you get something you can actually use Monday. And at the end, you prove it on a real site.`,
        sb: { build: 'Rise: Process block, 4 steps, icon per step.' } },

      { type: 'accordion',
        items: [
          { title: 'Time and bookmarking', body: `About 6 hours in 11 parts. Modules run 15 to 45 minutes. The course remembers where you stopped.` },
          { title: 'Knowledge checks', body: `3 to 5 practice questions at the end of Modules 1 through 8. Not graded. Feedback tells you why and cites the rule.` },
          { title: 'Final exam', body: `40 scenario questions from Riverside. You need 80% overall <b>and every one of the 8 critical items</b>, like stop work and anchor strength. 3 attempts. Miss one and the course sends you back to the module first.` },
          { title: 'Field verification', body: `Your safety manager watches you walk a live area, pick systems, inspect gear, run clearance math, check a rescue plan, and hold a stop-work conversation. Eight items. Pass or redo.` },
          { title: 'What the certificate means', body: `It says you finished the knowledge part. It does <b>not</b> make you the competent person. Your employer does that, after the field sign-off.` }
        ],
        narration: `Open these when you want the details. The one to read twice is the last one. The certificate you get at the end of this course does not make you the competent person. Your employer does, after your safety manager signs off on you in the field.` },

      { type: 'callout', variant: 'warning', title: 'The certificate is not the designation',
        body: `You become the competent person when two things are true: you can identify existing and predictable hazards, and your employer has given you authority to fix them promptly. This course builds the first. The field sign-off and your employer grant the second.`,
        cite: '1926.32(f)',
        narration: `I'll say it one more time because people get this wrong. Passing a course does not make you competent. Being able to spot the hazards, and having the authority to fix them, does.` },

      { type: 'callout', variant: 'monday', title: 'Before Monday',
        body: `Ask your safety manager two things: who signs your field verification, and what you'll be authorized to stop and spend once you're designated. Write the answers down.`,
        narration: `Before Monday, ask your safety manager two questions. Who signs your field verification? And what, exactly, will you be allowed to stop and spend money on once you're designated? Get it in writing if you can. You'll need it in Module 2.` }
    ] }
  ]
});
