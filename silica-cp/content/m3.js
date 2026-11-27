/* ==========================================================================
   Module 3 — Finding silica on the site (12 min · Storyline)
   Objectives: identify silica-containing materials and the tasks that make
   them respirable; recognize foreseeable exposures (work later in the
   schedule, and dust from other employers that reaches your crew).
   ========================================================================== */
COURSE.addModule({
  id: 'm3', num: 3, title: 'Finding silica on the site', minutes: 12,
  build: 'Storyline',
  tagline: 'The material is the fuel. The task is the spark.',
  hero: 'img_m3_hero',
  objectives: [
    'Identify silica-containing materials (concrete, block, brick, mortar, stone, tile, some fiber-cement and engineered stone) and the tasks that make them respirable.',
    'Recognize foreseeable exposures: work that will start later in the schedule, and dust created by other employers that reaches your crew.'
  ],
  citations: ['1926.1153(a)', '1926.1153(b)', '1926.1153(g)(1)', 'OSHA/NIOSH Hazard Alert: Worker exposure to silica during countertop manufacturing, finishing and installation (2015)'],
  lessons: [

    /* ------------------------------------------------------------------ */
    { id: 'm3-l1', title: 'Material plus task', minutes: 3, blocks: [
      { type: 'hero', kicker: 'Module 3', title: 'Finding silica on the site',
        text: `Silica sits quietly in the material until a tool breaks it up. Learn to see both halves, then walk two Riverside scenes.`,
        media: 'img_m3_hero',
        narration: `Module 3. Silica is in a lot of what we build with, and it sits there harmless until a tool breaks it up. You need to see both halves: the material and the task. Then we'll walk two scenes at Riverside.`,
        sb: { visual: 'Aerial photo of an active concrete site.', search: 'aerial construction site concrete', build: 'Rise: Banner block.' } },

      { type: 'table', title: 'Where the silica is',
        headers: ['Material', 'Silica', 'Riverside example'],
        rows: [
          ['Engineered stone (quartz)', '<b>Very high</b> (often over 90%)', 'Clinic countertops'],
          ['Sand, concrete, mortar, grout', '<b>High</b>', 'Every slab, the CMU cores, brick joints'],
          ['Brick, block, stone, tile', '<b>Varies, often high</b>', 'Entrance veneer, stair block'],
          ['Fiber-cement board', '<b>Some products</b>', 'Canopy panels'],
          ['Drywall, wood, steel, paint', 'Little or none', 'Not a silica task by itself']
        ],
        note: `Check the safety data sheet for the product. Section 3 lists crystalline silica (quartz) and its percentage.`,
        narration: `Here's where the silica is. Engineered stone, the quartz countertops, can be over ninety percent. Sand, concrete, mortar and grout are high. Brick, block, stone and tile vary but are often high. Some fiber-cement boards have it. Drywall, wood and steel, little or none. When in doubt, pull the safety data sheet. Section three lists crystalline silica and how much.`,
        sb: { visual: 'Table with color-coded silica column (red to gray).', search: 'n/a', build: 'Rise: Table block.' } },

      { type: 'cards', title: 'What makes it respirable?', mode: 'plain',
        cards: [
          { front: 'Cutting', back: 'Saws on concrete, block, brick, stone, tile, fiber-cement.' },
          { front: 'Grinding', back: 'Surface prep, tuckpointing, countertop edges, slab high spots.' },
          { front: 'Drilling and coring', back: 'Anchor holes, core holes, rock drilling.' },
          { front: 'Chipping and breaking', back: 'Jackhammers, chipping guns, hoe rams, demolition.' },
          { front: 'Cleaning up dry', back: 'Dry sweeping and compressed air put settled dust back in the air.' },
          { front: 'Abrasive blasting', back: 'Not on Table 1. Always needs an exposure assessment.' }
        ],
        narration: `What turns silica into breathing dust? Cutting, grinding, drilling, chipping, and cleaning up dry. Abrasive blasting too, and that one isn't on Table 1 at all. Flip each card.` },

      { type: 'continue', label: 'Walk Level 2' }
    ] },

    /* ------------------------------------------------------------------ */
    { id: 'm3-l2', title: 'Spot the silica task', minutes: 5, blocks: [
      { type: 'hotspot', id: 'm3-slab', scene: 'slab', title: 'Level 2 slab, 7:20 a.m.',
        intro: `Find the six silica problems on Level 2. Two things in this scene are done right. Leave them alone.`,
        hazards: ['dry-cut-saw', 'compressed-air', 'jackhammer-dry', 'core-drill-dry', 'dry-sweep', 'drywall-crew-exposed'],
        minFind: 5,
        narration: `This is Level 2 at twenty past seven. Find the six silica problems. Two things here are being done right, so look carefully before you tap.`,
        sb: { visual: 'Illustrated Level 2 interior: Dee kneeling with a dry-cut saw and big plume; air hose; jackhammer; core rig with hose loose; dry sweeping; drywall crew at back; good walk-behind wet saw; good HEPA drill.', search: 'Content Library: concrete floor interior background; worker kneeling with saw', build: 'Storyline: hotspots on one slide, one layer per hazard (why/fix/citation). Variable M3_TasksFound (0-6), M3_Misses. Decoys show "done right" layer. Continue when 5+ found or Reveal.' } },

      { type: 'hotspot', id: 'm3-entrance', scene: 'entrance', title: 'Main entrance, 10:40 a.m.',
        intro: `Outdoors this time. Find the six problems. Two things are fine.`,
        hazards: ['masonry-saw-dry', 'lunch-in-dust', 'cab-door-open', 'tuckpoint-no-shroud', 'beard-half-mask', 'quartz-dry-cut'],
        minFind: 5, rank: true,
        narration: `Now the main entrance, outdoors. Six problems, two things done right. When you've found them, rank the top three by how much they'd hurt someone.`,
        sb: { visual: 'Illustrated entrance: masonry saw with empty tank, crew at lunch downwind, skid steer with door propped, tuckpointer without shroud, bearded tuckpointer in half mask, quartz countertop dry cut; decoys: mason laying block, painter.', search: 'Content Library: brick building exterior; scaffold', build: 'Storyline: hotspots + ranking layer (drag top 3). Variables M3_TasksFound, M3_Rank.' } },

      { type: 'video', media: 'vid_m3_stone',
        caption: `Optional deep dive: engineered stone and silicosis.`,
        watchFor: `Watch for why quartz is so much worse than granite or marble, and what wet cutting does to the numbers.`,
        narration: `If you have quartz countertops on your jobs, this one's worth your time later. It's long, so bookmark it.`,
        sb: { visual: 'Embedded YouTube video.', search: 'n/a (web video)', build: 'Rise: Multimedia > Embed (optional).' } },

      { type: 'continue', label: 'Next week' }
    ] },

    /* ------------------------------------------------------------------ */
    { id: 'm3-l3', title: 'Foreseeable: next week and next door', minutes: 4, blocks: [
      { type: 'sort', id: 'm3-nextweek', title: '"Next week" twist',
        prompt: `Marco just sent the 2-week look-ahead. Which items bring new silica tasks to Riverside?`,
        buckets: [
          { id: 'new', label: 'New silica task', hint: 'plan controls now' },
          { id: 'no', label: 'Not a silica task' }
        ],
        items: [
          { text: 'Electrician chases conduit into the CMU stair walls', bucket: 'new', fb: `Chasing block is cutting and grinding. Needs water or a shroud and collector, and it's another employer's crew.` },
          { text: 'Fiber-cement canopy panels cut to fit on site', bucket: 'new', fb: `Fiber-cement often contains silica. Table 1 row (iii): small saw with dust collection, outdoors only.` },
          { text: 'Countertop installer field-cuts the quartz for the clinic sinks', bucket: 'new', fb: `Engineered stone. Ask for the cuts to be done in the shop. If not, wet methods only.` },
          { text: 'Flooring sub grinds slab high spots before tile', bucket: 'new', fb: `Floor grinding. Table 1 row (xiii): water, or dust collection with HEPA vac cleanup.` },
          { text: 'Painters prime the stairwell walls', bucket: 'no', fb: `Paint isn't silica. Unless they sand the block first.` },
          { text: 'Ceiling grid goes up on Level 3', bucket: 'no', fb: `Metal grid and tile hanging isn't a silica task. Drilling anchors into the deck above is.` }
        ],
        summary: `Foreseeable means you plan the controls before the task starts, and you put it in the written plan. The schedule tells you what's coming.`,
        narration: `The look-ahead just came in. Sort it. Which items bring new silica work to the site? Foreseeable hazards are half of the competent person definition.`,
        sb: { visual: 'Look-ahead schedule shown as a calendar strip; six cards.', search: 'construction schedule calendar', build: 'Storyline: drag-and-drop, 2 targets. Variable M3_NextWeek.' } },

      { type: 'scenario', id: 'm3-gus', title: 'Crew talk: "That\'s not my dust"',
        intro: `Gus runs the drywall crew. His people are hanging board on Level 2 while your crew cuts slab.`,
        start: 'n1',
        nodes: {
          n1: { speaker: 'gus',
            text: `"Your saw's covering my board in dust. But it's the concrete sub's dust, not mine. My guys don't need to do anything."`,
            choices: [
              { text: `"You're right that it's our dust to control. It's also your guys breathing it. Let's fix both: we'll wet-cut, and I'll set a barrier so your crew isn't in the zone while we cut."`, next: 'n2', tone: 'good', fb: `You owned your dust and protected his people without making it a fight.`, cite: '1926.1153(g)(1)(iv)' },
              { text: `"Not my problem if your guys stand there."`, next: 'end_bad', tone: 'bad', fb: `Restricting access, including exposures from other employers, belongs in your written plan.` },
              { text: `"Talk to Marco."`, next: 'n1b', tone: 'ok', fb: `Marco should know, but you're the one who can fix it now.` }
            ] },
          n1b: { speaker: 'gus',
            text: `"Marco's not answering. My guys have to hang 40 sheets today."`,
            choices: [
              { text: `"Then let's sort it ourselves. We cut the north trench by 9. Your crew starts in the east bay and moves over after we're done and vacuumed."`, next: 'n2', tone: 'good', fb: `Scheduling around each other is one of the best access controls there is.` },
              { text: `"Have them wear dust masks."`, next: 'end_bad', tone: 'bad', fb: `They aren't in a respiratory program for this, and a nuisance mask isn't a respirator.` }
            ] },
          n2: { speaker: 'gus',
            text: `"Fine. But next week your guys are going to be in our way when we sand the joint compound."`,
            choices: [
              { text: `"Fair. Let's put both in the look-ahead and pick times. If your compound has silica in it, that's on our plan too."`, next: 'end_good', tone: 'good', fb: `Foreseeable, both ways. Most joint compounds have little or no crystalline silica, but check the SDS.` },
              { text: `"That's different, that's just drywall dust."`, next: 'end_ok', tone: 'ok', fb: `Probably low silica, but "probably" is a guess. Check the SDS.` }
            ] },
          end_good: { end: true, outcome: 'good', title: 'Two foremen, one plan',
            text: `The trench got cut wet by 8:50, your crew vacuumed, and Gus's people moved in at 9:15. You both wrote the cutting window into the look-ahead. That's what restricting access looks like on a real job.`,
            cite: '1926.1153(g)(1)(iv)' },
          end_ok: { end: true, outcome: 'ok', title: 'Today fixed, next week guessed',
            text: `Today went fine. Next week you'll be guessing about joint compound. Pull the SDS and settle it before the sanding starts.`,
            cite: '1926.1153(g)(1)' },
          end_bad: { end: true, outcome: 'bad', title: 'Two crews, one cloud',
            text: `Gus's crew hung board in your cloud all morning. Nobody on his crew was trained on silica, fit tested or in a program. Your written plan has to say how you keep people out of your dust, including other employers' people.`,
            cite: '1926.1153(g)(1)(iv)' }
        },
        narration: `Crew talk. Gus says it's not his dust. Pick your words and see how they land.`,
        sb: { visual: 'Level 2 background, Gus character card (yellow hard hat, orange vest).', search: 'Content Library: construction worker yellow hard hat', build: 'Storyline dialogue sim: one slide per node, word choices as buttons, outcome layers.' } },

      { type: 'callout', variant: 'monday', title: 'Use it Monday',
        body: `Walk your floor with the 2-week look-ahead in your hand. Circle every cut, grind, drill or chip, yours and other trades'. Each circle needs a control in the plan before it starts.`,
        narration: `For Monday: walk your floor with the look-ahead in your hand and circle every cut, grind, drill or chip, yours and the other trades'. Every circle needs a control in the plan before it starts.` }
    ] }
  ],
  kc: { title: 'Knowledge check: Module 3', questions: [
    { question: `Which material on a commercial job usually has the highest crystalline silica content?`,
      options: [
        { text: `Drywall`, correct: false, fb: `Little or none.` },
        { text: `Engineered stone (quartz) countertops`, correct: true, fb: `Often over 90%.` },
        { text: `Structural steel`, correct: false, fb: `No silica.` }
      ],
      explain: `Engineered stone is often over 90% crystalline silica, far more than granite or concrete.`, cite: 'OSHA/NIOSH Hazard Alert (2015)' },
    { question: `The electrician will start chasing conduit into CMU walls next week. What makes this your concern now?`,
      options: [
        { text: `Nothing until it starts`, correct: false, fb: `Foreseeable hazards are part of the definition.` },
        { text: `It's a foreseeable silica hazard, and your plan should cover controls and access before it starts`, correct: true, fb: `Right.` },
        { text: `Only the electrician's employer has to think about it`, correct: false, fb: `Their crew controls their dust, but your crew is on the same floor.` }
      ],
      explain: `The competent person identifies existing and foreseeable hazards. The plan covers restricting access, including exposures from other employers.`, cite: '1926.1153(b); 1926.1153(g)(1)(iv)' },
    { question: `Where do you find whether a product contains crystalline silica?`,
      options: [
        { text: `The safety data sheet, Section 3`, correct: true, fb: `Composition and ingredients.` },
        { text: `The bill of lading`, correct: false, fb: `Shipping info only.` },
        { text: `The color of the material`, correct: false, fb: `Color tells you nothing.` }
      ],
      explain: `SDS Section 3 lists hazardous ingredients such as crystalline silica (quartz) and the percentage.`, cite: '1910.1200(g)' }
  ] }
});
