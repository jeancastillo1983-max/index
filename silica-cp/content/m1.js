/* ==========================================================================
   Module 1 — The dust you can't see (10 min · Rise + Storyline)
   Objectives: health effects of respirable crystalline silica (silicosis,
   lung cancer, COPD, kidney disease); why the hazard is the dust you can't
   see, and why effects show up years later.
   ========================================================================== */
COURSE.addModule({
  id: 'm1', num: 1, title: 'The dust you can\'t see', minutes: 10,
  build: 'Rise + Storyline',
  tagline: 'Walt felt fine for 38 years. That was the problem.',
  hero: 'img_m1_hero',
  objectives: [
    'Describe the health effects of respirable crystalline silica: silicosis, lung cancer, COPD and kidney disease.',
    'Explain why the hazard is respirable dust that can\'t be seen, and why effects show up years later.'
  ],
  citations: ['1926.1153(i)(1)', '1926.1153(b)', 'OSHA Silica final rule (2016)', 'NIOSH Hazard Review: Health Effects of Occupational Exposure to Respirable Crystalline Silica (2002)', 'IARC Monograph 100C (crystalline silica, Group 1)'],
  lessons: [

    /* ------------------------------------------------------------------ */
    { id: 'm1-l1', title: 'Walt, in his own words', minutes: 4, blocks: [
      { type: 'hero', kicker: 'Module 1', title: 'The dust you can\'t see',
        text: `Walt laid block and brick for 38 years. He retired. Then the cough came. Three short chapters. After each, decide what would have changed it.`,
        media: 'img_m1_hero',
        narration: `This module starts with a man named Walt. Mason, thirty-eight years on the tools, a foreman for a lot of them. He made it to retirement. That's where his story really starts. Three short chapters. After each one, you decide what would have changed it.`,
        sb: { visual: 'Dusk over a jobsite with cranes. No medical images anywhere in this module.', search: 'construction site sunset cranes', build: 'Rise: Banner block. Chapter cards use icons only.' } },

      { type: 'story', id: 'm1-walt', speaker: 'walt',
        chapters: [
          { title: '1 · The work', icon: 'hardhat',
            text: `I started in '74, cutting block for my uncle's crew. Dry saw on the tailgate. You'd come home white, blow your nose and it came out gray. We laughed about it. Everybody's truck smelled like a cut block.`,
            choice: { question: 'What would have changed this?',
              options: [
                { text: `Nothing. That's how the work was done back then.`, fb: `It was. And the men who did it are the ones carrying oxygen now. "How it was done" is not the same as "how it has to be done."` },
                { text: `Water on the saw, and the cutting done away from the rest of the crew.`, best: true, fb: `Yes. Water at the blade knocks the respirable dust down at the source. It was possible then. It's required now, under Table 1.` },
                { text: `A paper dust mask.`, fb: `A nuisance mask isn't a respirator. It catches the big dust you can see, and the small stuff goes around and through it.` }
              ] } },
          { title: '2 · The good years', icon: 'user',
            text: `By the '90s I was running my own crews. We tuckpointed half the old schools in the county. Grinders, no shroud, and you couldn't see the guy six feet from you. I felt great. Strong as an ox. I didn't cough until after I quit.`,
            choice: { question: 'What would have changed this?',
              options: [
                { text: `A shroud and a dust collector on every grinder, and the right respirator for the hours.`, best: true, fb: `That's it. Tuckpointing is one of the dustiest jobs there is. Even fully controlled, Table 1 still requires a respirator.` },
                { text: `He felt fine, so nothing needed to change.`, fb: `Feeling fine is the trap. Silicosis doesn't hurt while it's building. By the time you feel it, the damage is done and it doesn't heal.` },
                { text: `Shorter workdays.`, fb: `Less time helps a little. But hours of uncontrolled grinding, even part-time, still add up over a career.` }
              ] } },
          { title: '3 · After', icon: 'clock',
            text: `Retired at 60. Six months later I couldn't get up the stairs without stopping. Chronic silicosis, the doctor said. It doesn't get better. Now I've got the oxygen, 24 hours. I still go to my grandson's games. I just sit by the end of the bleachers, near the door.`,
            choice: { question: 'Who could have changed it?',
              options: [
                { text: `Walt. He should have known better.`, fb: `He did what every crew around him did. Blaming the guy on oxygen teaches nobody anything.` },
                { text: `Somebody on site with eyes on the controls and the authority to make them work. Today, that's the competent person.`, best: true, fb: `That's the job you're taking on. Not lecturing people about dust. Keeping the controls running, every shift.` },
                { text: `The doctor, by catching it sooner.`, fb: `Medical surveillance helps catch it earlier, and it's required now. But no exam prevents disease. Controls do.` }
              ] } }
        ],
        narration: `Walt will tell it in his own words. After each chapter, pick what would have changed it. There's a best answer, but read the feedback on the others too.`,
        sb: { visual: 'Three chapter cards with simple icons (hard hat, person, clock). Walt avatar: flat cap, cardigan, oxygen cannula. No medical imagery.', search: 'older man portrait cap (Content Library: casual male, 60s-70s)', build: 'Storyline: 3 slides, each with a pick-one choice and 3 feedback layers. Variable Walt_Best counts best answers. Rise alternative: Scenario block.' } },

      { type: 'quote', speaker: 'walt', mood: 'serious',
        text: `I never once saw the dust that got me.`,
        narration: `I never once saw the dust that got me. That's the line I want you to remember from Walt.` },

      { type: 'art', src: 'assets/art/dg-walt-timeline.svg',
        alt: 'Timeline: 1974 starts as a laborer dry cutting block; 1990s mason and foreman; 2012 retires at 60 with a cough; 2016 diagnosed with chronic silicosis; today on oxygen 24/7.',
        caption: `38 years of exposure. The disease showed up after the job was over.`,
        narration: `Look at the gap. Thirty-eight years of exposure, and the symptoms showed up after he retired. That's normal for chronic silicosis. Ten, twenty, thirty years. Long after the job is closed out and nobody remembers which crew was cutting dry.`,
        sb: { visual: 'Shape-built timeline, five dots; last two red.', search: 'n/a (shape diagram)', build: 'Rise: Timeline block or image. Storyline: shapes with entrance animations left to right.' } },

      { type: 'continue', label: 'See what you can\'t see' }
    ] },

    /* ------------------------------------------------------------------ */
    { id: 'm1-l2', title: 'Visible versus respirable', minutes: 3, blocks: [
      { type: 'mcq', id: 'm1-guess-size',
        question: `Decide first. Which dust from a concrete cut does the damage deep in the lungs?`,
        options: [
          { text: `The big cloud you can see`, correct: false, fb: `The cloud is real, but most of what you can see is too big to reach the deep lung. Your nose and throat catch a lot of it.` },
          { text: `The particles too small to see`, correct: true, fb: `Right. Respirable particles are under 10 microns. They float for a long time and go all the way down.` },
          { text: `Only the dust that lands on your clothes`, correct: false, fb: `Settled dust matters when it gets kicked back up, but the hazard is what's in the air you breathe.` }
        ],
        explain: `"Respirable" means small enough to reach the gas-exchange region of the lungs. That's why "I don't see any dust" doesn't mean safe.`,
        cite: '1926.1153(b)',
        narration: `Decide first. Then we'll look at it under the microscope.` },

      { type: 'art', src: 'assets/art/dg-particles.svg',
        alt: 'At the same magnification, a grain of beach sand fills a quarter of the frame, a human hair is a thick band, and respirable silica particles are tiny dots inside a red dashed circle.',
        caption: `Respirable particles are more than 100 times smaller than a grain of beach sand.`,
        narration: `Same magnification. A grain of beach sand is a boulder. A human hair is a log, fifty to seventy microns across. The respirable silica particles are those little dots, under ten microns. You can't see them in the air. They stay up for hours. And they're small enough to reach the deepest part of your lungs, where your body can't clear them out.`,
        sb: { visual: 'Shape-built size comparison: sand circle, hair band, dots in red dashed circle.', search: 'n/a (shape diagram)', build: 'Storyline: zoom-in motion path from a jobsite photo into the particle comparison; labels fade in one at a time.' } },

      { type: 'accordion',
        items: [
          { title: 'Silicosis', body: `Scar tissue builds where the particles lodge. It doesn't heal and it can keep getting worse after exposure stops. Chronic silicosis usually shows up 10 or more years after exposure starts; very high exposures can cause it in a few years.` },
          { title: 'Lung cancer', body: `Crystalline silica is a known human carcinogen. Smoking on top of it multiplies the risk.` },
          { title: 'COPD', body: `Chronic obstructive pulmonary disease, including bronchitis and emphysema. Shortness of breath that gets worse over time.` },
          { title: 'Kidney disease', body: `Silica exposure is linked to kidney disease, and to some autoimmune diseases. It's not just a lung problem.` },
          { title: 'Tuberculosis', body: `People with silicosis are at higher risk of TB, which is why the medical exam for silica includes a TB test.` }
        ],
        narration: `Here's what silica does. Silicosis, the scarring that doesn't heal. Lung cancer. COPD. Kidney disease. And a higher risk of tuberculosis once you have silicosis. The standard requires every one of these to be covered in your hazard communication. Tap through each one.`,
        sb: { visual: 'Icon per row (no medical imagery).', search: 'icons: lungs outline, kidney outline', build: 'Rise: Accordion block.' } },

      { type: 'video', media: 'vid_m1',
        caption: `OSHA's overview of silica hazards.`,
        watchFor: `Watch for the diseases they name, and for the tasks they show. You'll see the same tasks at Riverside.`,
        narration: `This is OSHA's short overview. Watch for the diseases and the tasks. You're going to see the same tasks on our job.`,
        sb: { visual: 'Embedded YouTube video with poster.', search: 'n/a (web video)', build: 'Rise: Multimedia > Embed block (YouTube).' } },

      { type: 'continue', label: 'Myth or field truth' }
    ] },

    /* ------------------------------------------------------------------ */
    { id: 'm1-l3', title: 'Myth or field truth', minutes: 3, blocks: [
      { type: 'cards', title: 'Myth or field truth?', mode: 'myth',
        cards: [
          { front: `"If you can't see dust, you're safe."`, verdict: 'myth',
            back: `The dangerous particles are the ones you can't see. Visible dust is a sign that respirable dust is there too, not the other way around.` },
          { front: `"A paper dust mask is enough."`, verdict: 'myth',
            back: `A nuisance mask isn't a respirator. Table 1 respirators are NIOSH-approved, fit tested, and used under a respiratory protection program.`, cite: '1926.1153(e); 1910.134' },
          { front: `"Silicosis only happens to miners and sandblasters."`, verdict: 'myth',
            back: `Most exposed workers are in construction. Cutting, grinding, drilling and chipping concrete, block, brick, stone and engineered stone all do it.` },
          { front: `"Water on the blade is one of the best controls there is."`, verdict: 'truth',
            back: `Water at the point of cut, at the right flow, knocks respirable dust down at the source. It's the control for most saws on Table 1.`, cite: '1926.1153(c)(1)' },
          { front: `"Once you have silicosis, getting out of the dust fixes it."`, verdict: 'myth',
            back: `Silicosis doesn't heal. It can keep progressing after exposure stops. That's why prevention is the whole game.` }
        ],
        narration: `Flip each card and decide: myth or field truth. Some of these you've heard on site. I sure have.`,
        sb: { visual: 'Five flip cards; front = quote on a dusty texture, back = verdict stamp.', search: 'dust texture background', build: 'Rise: Flashcard grid (front: statement; back: MYTH / FIELD TRUTH + explanation).' } },

      { type: 'reflect', id: 'm1-gut',
        prompt: `Gut check: when did you last cut, grind or drill concrete, block or stone with no water or vac? What was the reason?`,
        placeholder: `Only you see this.`,
        narration: `Gut check. Nobody sees this but you. When was the last time you cut, ground or drilled with no water and no vac? And what was the reason? Be honest. That reason is what you'll be fighting on site.` },

      { type: 'callout', variant: 'monday', title: 'Use it Monday',
        body: `At your next huddle, ask: "Where are we cutting, grinding or drilling today, and what's knocking the dust down?" If nobody has an answer for a task, that's your first fix.`,
        narration: `Something for Monday. At the huddle, ask one question: where are we cutting, grinding or drilling today, and what's knocking the dust down? If nobody has an answer, that's your first fix.` }
    ] }
  ],
  kc: { title: 'Knowledge check: Module 1', questions: [
    { question: `Which particles from a concrete cut do the most damage to the lungs?`,
      options: [
        { text: `The visible cloud`, correct: false, fb: `Visible dust is mostly too big to reach the deep lung.` },
        { text: `Respirable particles too small to see`, correct: true, fb: `Right.` },
        { text: `Chips and slurry on the floor`, correct: false, fb: `Those aren't airborne.` }
      ],
      explain: `Respirable particles reach the deepest part of the lung and can't be cleared.`, cite: '1926.1153(b)' },
    { question: `Ray says he's cut dry for 28 years and feels fine. What's the best answer?`,
      options: [
        { text: `He's probably right. If it were a problem he'd know by now.`, correct: false, fb: `Chronic silicosis often shows up 10 to 30 years after exposure starts, sometimes after retirement.` },
        { text: `Feeling fine proves nothing. Silicosis builds without symptoms and doesn't heal.`, correct: true, fb: `Right. That's why the controls matter now, not when he starts coughing.` },
        { text: `He should get a chest X-ray instead of using controls.`, correct: false, fb: `Medical surveillance catches disease; it doesn't prevent it.` }
      ],
      explain: `Delayed, silent, permanent. That's the case for controls today.`, cite: '1926.1153(i)(1)' },
    { question: `Which of these is NOT a health effect the standard's hazard communication must cover?`,
      options: [
        { text: `Lung cancer`, correct: false, fb: `It is.` },
        { text: `Kidney effects`, correct: false, fb: `It is.` },
        { text: `Hearing loss`, correct: true, fb: `Right. Noise is a different hazard. Silica's list is cancer, lung effects, immune system effects and kidney effects.` }
      ],
      explain: `Hazard communication for silica must include cancer, lung effects, immune system effects and kidney effects.`, cite: '1926.1153(i)(1)' }
  ] }
});
