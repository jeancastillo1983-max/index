/* ==========================================================================
   Module 0 — Start here: why silica, why you (5 min · Rise)
   Objectives: why respirable crystalline silica is a serious construction
   health hazard and why the competent person keeps controls working; how
   the course works, including the field sign-off before designation.
   ========================================================================== */
COURSE.addModule({
  id: 'm0', num: 0, title: 'Start here: why silica, why you', minutes: 5,
  build: 'Rise',
  tagline: 'You already know how to cut concrete. This is about the dust nobody sees.',
  hero: 'img_m0_hero',
  objectives: [
    'Explain why respirable crystalline silica is a serious construction health hazard and why the competent person is the one who keeps controls working.',
    'Describe how the course works, including the field sign-off required before designation.'
  ],
  citations: ['29 CFR 1926.1153(a)', '29 CFR 1926.1153(b)', 'OSHA, Respirable Crystalline Silica final rule (81 FR 16286, 2016)'],
  lessons: [

    /* ------------------------------------------------------------------ */
    { id: 'm0-l1', title: 'Why silica, why you', minutes: 3, blocks: [
      { type: 'hero', kicker: 'Module 0 · Start here', title: 'Why silica, why you',
        text: `A fall happens in a second. Silica takes twenty years. Five minutes to see why that makes it your job.`,
        media: 'img_m0_hero',
        narration: `Welcome back to Riverside. The steel's topped out and the building's closed in. Now we're cutting slab, coring for the plumbers, and laying block and brick at the entrance. That means dust. Let's talk about why that matters, and why it's you.`,
        sb: { visual: 'Full-bleed photo: steel and concrete medical building mid-construction.', search: 'concrete construction site building', build: 'Rise: Cover page + Banner block with image overlay.' } },

      { type: 'quote', speaker: 'ray', mood: 'pushback',
        text: `I've cut concrete dry for 28 years and I'm fine.`,
        narration: `That's Ray. Foreman. Twenty-eight years in. You may remember him from the fall protection course.` },
      { type: 'quote', speaker: 'tasha', mood: 'calm',
        text: `You might be. The guys who aren't fine aren't on site anymore.`,
        narration: `And that's me, Tasha. I'm the newly designated silica competent person on this job. Ray's not being stubborn for fun. He really does feel fine. That's exactly what makes silica hard.` },

      { type: 'stats',
        items: [
          { value: '2.3 million', label: 'U.S. workers exposed to respirable crystalline silica, about 2 million of them in construction', source: 'OSHA, Silica final rule fact sheet (2016)' },
          { value: '600+', label: 'lives a year the rule is expected to save once it\'s fully in effect', source: 'OSHA, Silica final rule (2016)' },
          { value: '900+', label: 'new silicosis cases a year the rule is expected to prevent', source: 'OSHA, Silica final rule (2016)' }
        ],
        note: `Those lives aren't saved by the rule on paper. They're saved by water on the blade and a working vac, every day, on jobs like this one.`,
        narration: `About two point three million workers breathe silica on the job, and about two million of them are in construction. OSHA expects the rule to save more than six hundred lives a year and prevent more than nine hundred new cases of silicosis. But only if the controls actually work on the day.`,
        sb: { visual: 'Three stat tiles, numbers count up.', search: 'construction dust statistics icons', build: 'Rise: three-column Statement or Image & Text; figures from OSHA\'s 2016 final rule materials (verified at build).' } },

      { type: 'text', heading: 'Why the competent person matters here',
        body: [`Table 1 controls only work when they're running right: water flowing, shroud on, filter clean, cab door shut.`,
               `Controls drift a little every day. The competent person is the one who can <b>spot the drift</b> and has the <b>authority to fix it</b>. <cite>1926.1153(b)</cite> <cite>1926.1153(g)(4)</cite>`],
        narration: `Here's the thing about every dust control on a job: it worked the day it showed up. Then the water tank runs dry. The filter cakes up. Somebody props the cab door open because it's hot. You're the person on site every day who can see that drift, and who's allowed to fix it. That's the definition in the standard: capable of identifying existing and foreseeable silica hazards, and authorized to take prompt corrective measures.` },

      { type: 'video', media: 'vid_m1_psa',
        caption: `A short message from the U.S. Department of Labor.`,
        watchFor: `Watch how ordinary the work looks. Nobody in it thinks they're in danger.`,
        narration: `This short public message comes from the Department of Labor. Notice how normal the work looks. That's the point.`,
        sb: { visual: 'Embedded YouTube video with poster.', search: 'n/a (web video)', build: 'Rise: Multimedia > Embed block (YouTube). Storyline: Web Object.' } },

      { type: 'continue', label: 'How this course works' }
    ] },

    /* ------------------------------------------------------------------ */
    { id: 'm0-l2', title: 'How this course works', minutes: 2, blocks: [
      { type: 'text', heading: 'Back at Riverside',
        body: [`Same job, same crew as the fall protection course. The building is closed in. This phase is <b>slab cutting, core drilling and masonry</b>.`,
               `The owner walkthrough is Friday. Marco is getting calls every day.`],
        narration: `If you took the fall protection course, you know this job. Riverside Medical Office. Four stories, steel and concrete. This phase is slab cutting, core drilling for the trades, CMU cores, and brick and tuckpointing at the main entrance. The owner walkthrough is Friday, and Marco is getting calls every day. Sound familiar?` },

      { type: 'charintro', characters: ['ray', 'tasha', 'dee', 'marco', 'walt'],
        narration: `Meet the crew. Ray, the foreman. Me, Tasha. Dee, our second-year apprentice who runs the saw and the grinder. Marco, the super. And Walt, a retired mason you'll meet in Module 1.` },

      { type: 'coursemap',
        narration: `Here's the map. Two hours, ten parts. You can stop between any of them and pick up where you left off. The heart of the course is Module 4, reading Table 1 the way you'll use it on site.` },

      { type: 'process', title: 'How you get designated',
        steps: [
          { title: 'Finish the modules', body: `Each one starts with a call you make before you see the rule. Short knowledge checks at the end, not graded.` },
          { title: 'Pass the final assessment', body: `25 questions, mostly Riverside scenarios. 80% to pass, and all 5 critical items right. 3 attempts.` },
          { title: 'Field verification', body: `Your safety manager watches you do the job on a live site and signs off. <b>You are not designated until that's signed.</b>` }
        ],
        narration: `Three steps. Finish the modules. Pass the final, eighty percent and every critical item right. Then your safety manager watches you do the job on a real site and signs off. The certificate from this course says knowledge component complete. It doesn't make you the competent person. Your employer does, after the field sign-off.` },

      { type: 'callout', variant: 'note', title: 'Follow the thread',
        body: `Ray says "it's just dust." Watch that line. It shows up in almost every module, and so does the moment someone could have said something.`,
        narration: `One more thing. Ray says it's just dust. Keep an eye on that. It runs through this whole course.` }
    ] }
  ]
});
