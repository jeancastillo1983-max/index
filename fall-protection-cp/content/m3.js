/* ==========================================================================
   Module 3 — Reading the site: where falls happen (45 min)
   Voice: Tasha (newly designated competent person), first person, peer to peer.
   ========================================================================== */
COURSE.addModule({
  id: "m3", num: 3, title: "Reading the site: where falls happen", minutes: 45,
  build: "Storyline",
  tagline: "You can't fix what you've stopped seeing.",
  hero: "img_m3_hero",
  objectives: [
    "Identify fall hazards at 6 feet or more covered by 1926.501: unprotected sides and edges, leading edges, holes, skylights, low-slope and steep roofs, wall openings, formwork and excavation edges.",
    "Recognize predictable hazards that don't exist yet: tomorrow's openings and changing deck edges.",
    "Recognize where other subparts apply instead (scaffolds, ladders and stairs, steel erection) and when to bring that rule set in."
  ],
  citations: ["1926.500(a)", "1926.500(b)", "1926.501(b)(1)–(15)", "1926.502(f)", "1926.502(i)", "Subpart L scope", "Subpart R scope (1926.760)", "Subpart X scope"],
  jobAids: [{ title: "Daily fall-hazard walk checklist", file: "jobaids/daily-walk-checklist.html", pdf: "jobaids/pdf/daily-walk-checklist.pdf",
              desc: "One page, front and back of a clipboard. Edges, holes, roofs, openings, changes since yesterday, and who you told." }],

  lessons: [
    /* ------------------------------------------------------------------ */
    { id: "m3-l1", title: "Decide first: the 7:40 walk", minutes: 10, blocks: [
      { type: "hero", kicker: "Module 3 · Reading the site", title: "Where falls happen",
        text: "Before I tell you anything, walk the deck with me. You've got the same 90 seconds I had.",
        media: "img_m3_hero",
        narration: "Module three. Before I tell you anything, walk the deck with me. You get the same ninety seconds I had this morning.",
        sb: { visual: "Full-bleed jobsite photo of a concrete deck pour, workers in PPE.", search: "construction concrete deck pour workers hard hats", build: "Rise banner block; Storyline not needed." } },

      { type: "quote", speaker: "tasha", mood: "calm",
        text: "Pour starts at seven. Marco wants the walk done by eight. I've got coffee in one hand and a clipboard in the other. Same as you on Monday.",
        narration: "Pour starts at seven. Marco wants the walk done by eight. I've got coffee in one hand and a clipboard in the other. Same as you on Monday." },

      { type: "hotspot", id: "m3-hs-deck", scene: "deck", title: "Spot the hazard: Level 3 deck pour",
        intro: "Tap every fall hazard you see. Some things look wrong and aren't. When you've found five, or time runs out, rank the three you'd fix first.",
        timeLimit: 90, minFind: 5, rank: true,
        hazards: ["pump-hose-rail-removed", "ray-outside-rail", "deck-edge-open", "rebar-foot-tieoff", "floor-hole-open", "cover-unmarked", "leading-edge-unprotected"],
        narration: "Tap every fall hazard you see. Some things look wrong and aren't. When you've found five, or time runs out, rank the three you'd fix first.",
        sb: { visual: "Illustrated scene assets/art/scene-deck.svg (1600×900). Regions from content/scenes.js 'deck'.", search: "n/a (custom illustration)",
              build: "Storyline: one slide, 7 hotspot shapes (opacity 0) + 2 decoy hotspots. Variable HazFound (number). Timer: 90 s countdown text using elapsed-time variable; soft limit, learner can continue. On each hotspot: state Found, layer with why/fix/cite. When HazFound ≥ 5 or timer ends: show Rank layer (drag-drop top 3 into slots). Feedback compares to severity order." } },

      { type: "callout", variant: "note", title: "What the walk is really testing",
        body: "Nobody misses a guy dangling off a beam. What gets people is the stuff that looks handled: posts with no cables, a cover that's slid, a tie-off to the wrong thing. Protected-looking isn't protected.",
        narration: "Nobody misses a guy dangling off a beam. What gets people is the stuff that looks handled. Posts with no cables. A cover that slid. A tie-off to the wrong thing. Protected-looking isn't protected." },

      { type: "dialogue", title: "Ray, outside the rail",
        lines: [
          { speaker: "tasha", text: "Ray. Come on back inside the cable." },
          { speaker: "ray", text: "I'm guiding the bundle. Operator can't see the edge from the cab." },
          { speaker: "tasha", text: "Then guide it with the tagline from in here." },
          { speaker: "ray", text: "Tasha. I've done this a hundred times." },
          { speaker: "tasha", text: "I know. That's what worries me." }
        ],
        narration: "Ray. Come on back inside the cable. I'm guiding the bundle, the operator can't see the edge from the cab. Then guide it with the tagline from in here. Tasha, I've done this a hundred times. I know. That's what worries me.",
        sb: { visual: "Character dialogue: Tasha and Ray avatars, chat bubbles.", search: "construction foreman older man hard hat; female construction worker hard hat", build: "Storyline dialogue slide, click-to-advance; or Rise 'Conversation' via scenario block." } },

      { type: "callout", variant: "receipt", title: "The receipt", cite: "1926.501(b)(1)",
        body: "Any unprotected side or edge 6 feet or more above a lower level needs guardrail, a safety net, or personal fall arrest. Ray's cable rail only counts if he's on the right side of it.",
        narration: "Any unprotected side or edge six feet or more above a lower level needs guardrail, a safety net, or personal fall arrest. Ray's cable rail only counts if he's on the right side of it." },

      { type: "callout", variant: "field-check", title: "Field check", input: true,
        body: "On your last job, what was the one thing that looked protected but wasn't? Jot it down. Nobody sees this but you.",
        narration: "On your last job, what was the one thing that looked protected but wasn't? Jot it down. Nobody sees this but you." },

      { type: "testout", id: "m3-testout-defs", title: "You probably already know this",
        text: "Next lesson covers the 6-foot trigger and what counts as a hole or an opening. Get all three right and you can skip it.",
        skips: ["m3-l2"],
        questions: [
          { question: "In construction, Subpart M fall protection kicks in at…", options: [
            { text: "4 feet", correct: false, fb: "4 feet is general industry (1910). Construction is 6." },
            { text: "6 feet", correct: true, fb: "Right. 6 feet to a lower level, under 1926.501(b)." },
            { text: "10 feet", correct: false, fb: "10 feet is the scaffold trigger in Subpart L, not Subpart M." }] },
          { question: "Under Subpart M, a 'hole' in a floor or roof is a gap or void at least…", options: [
            { text: "2 inches in its least dimension", correct: true, fb: "Right. 2 inches or more, 1926.500(b)." },
            { text: "12 inches across", correct: false, fb: "Much smaller than that: 2 inches in its least dimension." },
            { text: "Big enough for a person to fit through", correct: false, fb: "No. A 2-inch gap is a hole: it catches feet and drops tools." }] },
          { question: "A window opening on Level 2 has a 12-inch sill and a 14-foot drop outside. Does it need protection?", options: [
            { text: "Yes: the sill is below 39 inches and the drop is 6 feet or more", correct: true, fb: "Right. 1926.501(b)(14) wall openings." },
            { text: "No: it's a wall opening, not an edge", correct: false, fb: "Wall openings are covered when the bottom edge is under 39 inches and the drop is 6 feet or more." },
            { text: "Only if someone is working at the window", correct: false, fb: "Anyone working near it is exposed. The opening needs protection." }] }
        ],
        narration: "Next lesson covers the six-foot trigger and what counts as a hole or an opening. Get all three right and you can skip it.",
        sb: { build: "Storyline 3-question quiz; on pass, set variable Skip_M3L2 = True and mark lesson complete in Rise via Storyline completion; on fail, continue to lesson 2." } },

      { type: "continue", label: "Continue to lesson 2" }
    ]},

    /* ------------------------------------------------------------------ */
    { id: "m3-l2", title: "What counts: 6 feet, holes and openings", minutes: 8, blocks: [
      { type: "text", heading: "Six feet. To any lower level.",
        body: ["In construction, the number is 6 feet. Not to the ground. To any lower level: the deck below, a stair landing, the bottom of a pit, a pile of rebar.",
               "Measure from where your feet are to where you'd land. If it's 6 or more, Subpart M wants guardrail, nets, or personal fall arrest."],
        narration: "In construction the number is six feet. Not to the ground. To any lower level. The deck below, a stair landing, the bottom of a pit, a pile of rebar. Measure from where your feet are to where you'd land." },

      { type: "image", media: "img_hole_cover", size: "wide", caption: "A cover only counts if it holds twice the load, can't slide, and says HOLE or COVER.",
        sb: { visual: "Photo of a marked plywood hole cover on a deck.", search: "construction hole cover plywood marked" } },

      { type: "sort", id: "m3-sort-holes", title: "Hole, wall opening, or neither?",
        prompt: "Tap each item, then tap where it belongs. These are all on Riverside right now.",
        buckets: [
          { id: "hole", label: "Hole (floor or roof)", hint: "Gap 2 in or more, least dimension" },
          { id: "opening", label: "Wall opening", hint: "30 in high, 18 in wide or more" },
          { id: "neither", label: "Neither definition" }
        ],
        items: [
          { text: "3 ft × 2 ft chase opening in the Level 3 deck", bucket: "hole", fb: "A hole. Cover it, rail it, or PFAS for anyone near it." },
          { text: "Skylight curb on the roof, dome installed", bucket: "hole", fb: "Skylights are holes. The dome is not a cover." },
          { text: "Elevator shaft door, Level 2, no doors hung yet", bucket: "opening", fb: "A wall opening into the shaft. Barricade it." },
          { text: "Window rough opening, 12-inch sill, Level 2", bucket: "opening", fb: "Wall opening with a sill under 39 inches over a 14 ft drop. Protect it." },
          { text: "4-inch sleeve for a plumbing riser in the slab", bucket: "hole", fb: "2 inches or more is a hole. A 4-inch sleeve eats ankles and drops tools." },
          { text: "1-inch conduit stub-up in the slab", bucket: "neither", fb: "Under 2 inches: not a Subpart M hole. Still a trip hazard, so flag it." },
          { text: "Stair opening between Level 2 and 3", bucket: "hole", fb: "A floor hole until the stair and rails are complete." }
        ],
        narration: "Tap each item, then tap where it belongs. These are all on Riverside right now.",
        sb: { visual: "Seven text cards with small icons; three drop buckets.", build: "Storyline drag-and-drop (freeform), drag items to 3 drop targets; 'Snap to' on; per-item feedback layer; submit when all placed. Rise alternative: Sorting activity block." } },

      { type: "accordion", title: "The 15 places 1926.501(b) names",
        items: [
          { title: "(1) Unprotected sides and edges", body: "Deck edges, slab edges, mezzanines, floor perimeters. Guardrail, net, or PFAS." },
          { title: "(2) Leading edges", body: "The edge that moves as you build: deck, formwork. If conventional protection is infeasible, only a written plan by a qualified person." },
          { title: "(3) Hoist areas", body: "Where material comes up. If the rail comes off to land loads, PFAS or a gate." },
          { title: "(4) Holes, including skylights", body: "Cover, guardrail, or PFAS. Covers also keep tools from dropping through." },
          { title: "(5) Formwork and reinforcing steel", body: "On the face of forms or rebar: PFAS, nets, or positioning devices." },
          { title: "(6)–(8) Ramps, excavations, dangerous equipment", body: "Walkways 6 ft up get guardrail. Excavation edges 6 ft deep that are hard to see get barricades. Over dangerous equipment, protection at any height." },
          { title: "(9)–(13) Bricklaying, roofing, precast, residential", body: "Low-slope roofs: guardrail, net, PFAS, or warning line combos. Steep roofs: guardrail with toeboards, nets, or PFAS." },
          { title: "(14) Wall openings", body: "Bottom edge under 39 in and 6 ft or more to the outside: guardrail, net, or PFAS." },
          { title: "(15) Everything else", body: "Any walking or working surface 6 ft or more up that isn't named above is still covered." }
        ],
        narration: "Here are the fifteen places the standard names. You don't need them memorized. You need to know the list exists, and that number fifteen says: everything else six feet up is covered too.",
        sb: { visual: "Rise accordion with small icon per row.", build: "Rise accordion block." } },

      { type: "callout", variant: "tip", title: "Two definitions worth carrying",
        body: "Hole: a gap or void 2 inches or more in its least dimension, in a floor, roof or other walking surface. Opening: 30 inches or more high and 18 inches or more wide, in a wall or partition.",
        cite: "1926.500(b)",
        narration: "Two definitions worth carrying. A hole is two inches or more in its least dimension. An opening is thirty inches high and eighteen inches wide, in a wall." },

      { type: "continue" }
    ]},

    /* ------------------------------------------------------------------ */
    { id: "m3-l3", title: "Two more walks: roof and interior", minutes: 12, blocks: [
      { type: "text", heading: "Different floor, different blind spots",
        body: "On the roof, the edge is obvious and the holes aren't. Inside, it's the opposite: the edges are hidden behind walls and the holes are everywhere. Walk both.",
        narration: "On the roof the edge is obvious and the holes aren't. Inside it's the opposite. The edges hide behind walls and the holes are everywhere. Walk both." },

      { type: "hotspot", id: "m3-hs-roof", scene: "roof", title: "Spot the hazard: the roof at 10:15",
        intro: "Low-slope TPO roof, 96 feet wide. Roofers are running membrane. Tap every fall hazard. Watch for the ones that look fine.",
        timeLimit: 90, minFind: 4, rank: false,
        hazards: ["hoist-gap", "worker-outside-line", "warning-line-close", "skylight-open", "roof-hatch-open", "parapet-low"],
        narration: "Low-slope roof, ninety-six feet wide. Roofers are running membrane. Tap every fall hazard. Watch for the ones that look fine.",
        sb: { visual: "assets/art/scene-roof.svg; regions from scenes.js 'roof'.", build: "Storyline hotspot slide, same template as deck. 6 hazards + 2 decoys (skylight-screened, inside-line-ok). 90 s soft timer." } },

      { type: "cards", title: "Myth or field truth: roofs", mode: "myth",
        cards: [
          { front: "A skylight dome will hold you if you sit on it.", back: "Domes are made to keep rain out, not to catch a 200-pound man stepping backward. Treat every skylight as a hole.", verdict: "myth", cite: "1926.501(b)(4)" },
          { front: "Inside a properly set warning line, a roofer doesn't need a harness.", back: "On a low-slope roof doing roofing work, the area inside a warning line at least 6 ft from the edge is the protected work area.", verdict: "truth", cite: "1926.501(b)(10)" },
          { front: "A 24-inch parapet counts as a guardrail.", back: "Guardrail height is 42 inches, plus or minus 3. A 24-inch parapet is a knee-high trip edge.", verdict: "myth", cite: "1926.502(b)(1)" }
        ],
        narration: "Myth or field truth. Flip each card.",
        sb: { build: "Rise flashcard grid, 3 cards; front = claim, back = verdict + why + cite." } },

      { type: "image", media: "img_skylight", size: "inline", caption: "Screened, covered, or railed. Those are the only three ways a skylight is protected." },

      { type: "hotspot", id: "m3-hs-shaft", scene: "shaft", title: "Spot the hazard: Level 2 interior",
        intro: "Drywall is starting on Level 2. Six trades, one floor. Tap every fall hazard. One of them belongs to a different rule set. Tap it anyway.",
        timeLimit: 75, minFind: 4, rank: false,
        hazards: ["elevator-shaft-open", "stair-caution-tape", "stair-open", "wall-opening-low", "cover-displaced", "bucket-ladder"],
        narration: "Drywall is starting on Level 2. Six trades, one floor. Tap every fall hazard. One of them belongs to a different rule set. Tap it anyway.",
        sb: { visual: "assets/art/scene-shaft.svg; regions from scenes.js 'shaft'.", build: "Storyline hotspot slide; 6 hazards + 2 decoys (stair-rail-good, cover-secured); 75 s soft timer." } },

      { type: "quote", speaker: "dee", mood: "worried",
        text: "Nobody told me the tape meant 'don't go in.' I thought it meant 'wet paint.' I was carrying studs. I couldn't see my feet anyway.",
        narration: "Nobody told me the tape meant don't go in. I thought it meant wet paint. I was carrying studs. I couldn't see my feet anyway." },

      { type: "callout", variant: "warning", title: "Caution tape is a sign, not a rail",
        body: "Tape tells people something's there. It won't stop someone who's backing up, carrying a load, or new to the site. If it's a hole or an edge 6 feet up, it gets a rail, a cover, or PFAS.",
        cite: "1926.502(b)(3)",
        narration: "Caution tape is a sign, not a rail. It won't stop someone backing up, carrying a load, or new to the site." },

      { type: "callout", variant: "field-check", title: "Field check", input: true,
        body: "What's the hazard on your site that everybody walks past every day? Write it down. You're going to look at it differently Monday.",
        narration: "What's the hazard on your site that everybody walks past every day? Write it down." },

      { type: "continue" }
    ]},

    /* ------------------------------------------------------------------ */
    { id: "m3-l4", title: "Predictable: tomorrow's site", minutes: 8, blocks: [
      { type: "text", heading: "The word most people skip",
        body: ["OSHA's definition of a competent person says you identify existing <em>and predictable</em> hazards. Existing is today. Predictable is what the work is about to create.",
               "Decks move. Forms get stripped. Deliveries need the rail off. If you only walk what's there, you're always one day behind."],
        cite: "1926.32(f)",
        narration: "OSHA's definition of a competent person says you identify existing and predictable hazards. Existing is today. Predictable is what the work is about to create. If you only walk what's there, you're always one day behind." },

      { type: "callout", variant: "receipt", cite: "1926.32(f)", title: "The receipt",
        body: "A competent person can identify existing and predictable hazards, and has the authority to take prompt corrective measures to eliminate them.",
        narration: "A competent person can identify existing and predictable hazards and has the authority to fix them." },

      { type: "mcq", id: "m3-predict-deck", multi: true,
        question: "Tonight: the pour finishes at 2 p.m., the decking crew moves out a bay, plumbers start setting sleeves, and a crane lands deck bundles at 7 a.m. Which exposures should you expect on the Level 3 deck tomorrow? Select all that apply.",
        options: [
          { text: "The pump-hose gap in the rail is still open", correct: true, fb: "Probably. The crew that opened it is gone. Nobody owns it now." },
          { text: "A new leading edge one bay further out", correct: true, fb: "Yes. Yesterday's plan covered yesterday's edge." },
          { text: "New holes where blockouts get stripped", correct: true, fb: "Yes. Every stripped blockout is a new hole until it's covered." },
          { text: "Cables unhooked at the landing zone for the delivery", correct: true, fb: "Yes. Somebody will open the edge to land those bundles." },
          { text: "No new exposures: the pour is done", correct: false, fb: "The pour being done is exactly when the trades flood in." }
        ],
        explain: "Every one of those is predictable from tonight's schedule. That's the job: read the schedule like a hazard map.",
        cite: "1926.32(f)",
        narration: "Read tonight's schedule like a hazard map. Which exposures should you expect tomorrow?",
        sb: { build: "Storyline multiple-response question, try-once, feedback per option; Rise alternative: multiple-response knowledge check." } },

      { type: "hotspot", id: "m3-hs-deck-tomorrow", scene: "deck-tomorrow", title: "Check your prediction: next morning",
        intro: "Same deck, 6:45 the next morning. Tap what changed overnight. No timer this time.",
        minFind: 4, rank: false,
        hazards: ["dt-rail-not-replaced", "dt-landing-zone-open", "dt-new-leading-edge", "dt-blockout-stripped", "dt-chase-still-open"],
        narration: "Same deck, six forty-five the next morning. Tap what changed overnight.",
        sb: { visual: "assets/art/scene-deck-tomorrow.svg", build: "Storyline hotspot slide, no timer; 5 hazards + 2 decoys." } },

      { type: "art", src: "assets/art/scene-roof-tomorrow.svg", alt: "The Riverside roof the next morning: roofers working the northwest corner past the old warning line, a skylight with its screen off for flashing, a crane setting a rooftop unit by the low east parapet, the hatch closed.",
        caption: "The roof, next morning. Roofing moved to the northwest corner. Flashing crew is on the screened skylight. The mechanical sub is setting a new unit." },

      { type: "mcq", id: "m3-predict-roof", multi: true,
        question: "Looking at the roof this morning, which exposures did the schedule create? Select all that apply.",
        options: [
          { text: "Crew working past the old warning line", correct: true, fb: "The work moved. The line didn't." },
          { text: "Skylight screen pulled for the flashing crew", correct: true, fb: "Their job needs it off. Then they need PFAS or a temporary cover." },
          { text: "Tagline man leaning over the 24-inch parapet for the unit", correct: true, fb: "Every crane pick near an edge needs a fall plan." },
          { text: "The roof hatch", correct: false, fb: "Closed and latched today. Somebody fixed it. Say thanks." }
        ],
        explain: "Same rule as the deck: what changed since yesterday is where today's fall is.",
        cite: "1926.501(b)(4); 1926.501(b)(10)",
        narration: "Which exposures did the schedule create on the roof?" },

      { type: "callout", variant: "tip", title: "Three questions for every huddle",
        body: "What edge moves today? What opening gets made today? Who needs the rail off today? Ask them at 6:30 and you'll catch most of tomorrow's hazards before they're real.",
        narration: "Three questions for every huddle. What edge moves today? What opening gets made today? Who needs the rail off today?" },

      { type: "continue" }
    ]},

    /* ------------------------------------------------------------------ */
    { id: "m3-l5", title: "The daily walk and the right rule set", minutes: 7, blocks: [
      { type: "tabs", title: "When it's not Subpart M",
        items: [
          { title: "Scaffolds", body: "Scaffolds run under Subpart L. Fall protection there starts at 10 feet, and scaffolds have their own competent person. Spot it, then call in the scaffold competent person. That course is separate." },
          { title: "Ladders and stairs", body: "Ladders and stairways are Subpart X. A worker on a bucket or a stepladder is still at risk of a fall, but the fix comes from X: the right ladder, stair rails on stairs with 4 or more risers." },
          { title: "Steel erection", body: "Steel erection, including metal decking, runs under Subpart R: protection generally above 15 feet, with special rules for connectors and controlled decking zones up to 30 feet. Ask the erector for their plan." },
          { title: "Everything else", body: "Cranes and derricks, tunneling, power transmission work: other subparts again. Your job isn't to know every rule. It's to notice the exposure and bring in the right rule set." }
        ],
        narration: "Not every fall exposure belongs to Subpart M. Scaffolds are Subpart L. Ladders and stairs are Subpart X. Steel erection, including metal decking, is Subpart R. Your job is to notice the exposure and bring in the right rule set.",
        sb: { build: "Rise tabs block, 4 tabs.", search: "scaffold construction; ironworker steel erection" } },

      { type: "image", media: "img_ironworker", size: "inline", caption: "Decking and connecting are steel erection. Subpart R sets those rules." },

      { type: "checkreview", id: "m3-walk-review", title: "Yesterday's walk sheet: what got missed?",
        intro: "This is the daily walk sheet Kenny filled in yesterday afternoon, the same day you walked the deck and the roof. Tap the three lines where he signed off on something that wasn't OK.",
        columns: ["Item", "Location", "Kenny's call", "Note"],
        rows: [
          { cells: ["Perimeter cable rail", "L3 west", "OK", "Posts all in"], error: { text: "Posts in, cables down. The front-left bay was wide open. 'Posts in' isn't a rail.", cite: "1926.502(b)(1)" } },
          { cells: ["Perimeter cable rail", "L3 north / east", "OK", "Flagged, tensioned"] },
          { cells: ["Floor openings covered", "L3", "OK", "All covered"], error: { text: "The chase opening in the rebar mat had no cover at all, and the cover by the column had slid off.", cite: "1926.501(b)(4)(i); 1926.502(i)" } },
          { cells: ["Stair opening guardrail", "L3 stair 2", "OK", "TR, MR, toeboard"] },
          { cells: ["Warning line", "Roof west", "Needs reset", "Too close up front. Told roofing foreman 2:10 p.m."] },
          { cells: ["Skylights protected", "Roof", "N/A", "No work near skylights"], error: { text: "A roofer was unrolling membrane backward right next to the unscreened skylight. 'No work near' was wrong by noon.", cite: "1926.501(b)(4)(i)" } },
          { cells: ["Roof hatch", "Roof", "Open", "Reported to GC super"] },
          { cells: ["Elevator shaft barricade", "L2", "OK", "Fastened, 42 in"] }
        ],
        findCount: 3,
        narration: "This is the walk sheet Kenny filled in yesterday afternoon. Tap the three lines where he signed off on something that wasn't OK.",
        sb: { visual: "Clipboard-style form graphic with handwriting font for entries.", build: "Storyline: table built from shapes; each row is a button with Selected state; Submit checks the 3 error rows (variables Row1Sel...); feedback layer reveals all 3 with reasons." } },

      { type: "callout", variant: "note", title: "What Kenny got right",
        body: "Look at the warning line and the hatch: he wrote down what was wrong, who he told, and when. That's the habit. A walk sheet that's all 'OK' usually means nobody looked.",
        narration: "Look at the warning line and the hatch. He wrote down what was wrong, who he told, and when. That's the habit. A walk sheet that's all OK usually means nobody looked." },

      { type: "video", media: "vid_m3", caption: "Fall hazards on a building site.",
        watchFor: "Watch for the hazards that look handled: covers, rails and tie-offs that are there but wrong.",
        narration: "Watch for the hazards that look handled." },

      { type: "download", title: "Daily fall-hazard walk checklist", file: "jobaids/daily-walk-checklist.html", pdf: "jobaids/pdf/daily-walk-checklist.pdf",
        desc: "Edges, holes, roofs, openings, what changed since yesterday, and who you told. One page. Clipboard-ready.",
        sb: { build: "Rise: attachment in a text block or Rise 'Button' linking to the PDF in the LMS package." } },

      { type: "callout", variant: "monday", title: "Monday",
        body: "Walk one area you think is fine. Use the checklist. Write down one thing that looks protected and isn't, then fix it or tell someone who can, before 9 a.m.",
        narration: "Monday. Walk one area you think is fine. Use the checklist. Write down one thing that looks protected and isn't. Fix it or tell someone who can, before nine." }
    ]}
  ],

  kc: { title: "Knowledge check: reading the site", questions: [
    { id: "m3-kc1", question: "Which of these is a 'hole' under Subpart M?", options: [
      { text: "A 3-inch gap between deck sheets", correct: true, fb: "2 inches or more in its least dimension is a hole." },
      { text: "A 1-inch conduit sleeve", correct: false, fb: "Under 2 inches. Not a Subpart M hole." },
      { text: "A window opening 4 ft wide with a 12-inch sill", correct: false, fb: "That's a wall opening, a different definition with its own rule." }],
      explain: "Hole: gap or void 2 inches or more in its least dimension, in a floor, roof or other walking/working surface.", cite: "1926.500(b)" },
    { id: "m3-kc2", question: "A competent person is someone who can identify existing and ______ hazards, and has authority to correct them.", options: [
      { text: "predictable", correct: true, fb: "Right. Tomorrow's hazards are part of the job." },
      { text: "reported", correct: false, fb: "Not just the ones someone reported. You find them." },
      { text: "serious", correct: false, fb: "The definition says predictable, and it covers all of them." }],
      explain: "1926.32(f): existing and predictable hazards, plus authority to take prompt corrective measures.", cite: "1926.32(f)" },
    { id: "m3-kc3", question: "Your daily walk sheet from yesterday says 'perimeter cable OK.' This morning you see posts standing and the cables lying on the deck in one bay. What's your first move?", options: [
      { text: "Stop work in that bay until the cables are re-hung and tensioned", correct: true, fb: "Right. The paper doesn't protect anybody. The rail does." },
      { text: "Note it on today's sheet and keep walking", correct: false, fb: "Noting it is good. Leaving people exposed while you finish the walk isn't." },
      { text: "Flag the posts with caution tape", correct: false, fb: "Tape is a sign, not a rail." }],
      explain: "Open edge at 6 ft or more: guardrail, net or PFAS before anyone works there.", cite: "1926.501(b)(1)" },
    { id: "m3-kc4", question: "A crew is erecting a supported scaffold along the north wall. Which rule set governs their fall protection?", options: [
      { text: "Subpart L (scaffolds)", correct: true, fb: "Right. Subpart L, with protection at more than 10 feet and its own competent person." },
      { text: "Subpart M, same as the deck", correct: false, fb: "Scaffolds are excluded from Subpart M by 1926.500(a)." },
      { text: "Subpart X (ladders)", correct: false, fb: "X covers ladders and stairways, not scaffolds." }],
      explain: "1926.500(a) sends scaffolds to Subpart L, ladders and stairways to Subpart X, steel erection to Subpart R.", cite: "1926.500(a)(2); 1926.451(g)" }
  ]}
});
