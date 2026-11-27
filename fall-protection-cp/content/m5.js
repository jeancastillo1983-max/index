/* ==========================================================================
   Module 5 — Anchors, connectors and clearance (45 min)
   Build: Storyline (anchor sort, clearance calculator, swing fall) inside Rise.
   Clearance numbers follow BUILD-SPEC §7 and FP.clearance() exactly.
   ========================================================================== */
COURSE.addModule({
  id: 'm5', num: 5, title: 'Anchors, connectors and clearance', minutes: 45,
  build: 'Storyline',
  tagline: 'Tied off is not the same as protected.',
  hero: 'img_m5_hero',
  objectives: [
    'Select anchorages that hold 5,000 lb per worker attached, or are designed by a qualified person with a safety factor of 2.',
    'Calculate total fall clearance: free fall, deceleration (3.5 ft max), harness stretch, worker height and safety margin.',
    'Match connectors and SRLs to the job, including leading-edge SRLs and the risks of foot-level tie-off.',
    'Recognize swing fall and edge hazards and fix them before anyone ties off.'
  ],
  citations: ['1926.502(d)(15)', '1926.502(d)(16)', '1926.502(d)(5)', '1926.502(d)(6)', '1926.502(d)(23)',
    'ANSI/ASSP Z359.6', 'ANSI/ASSP Z359.12', 'ANSI/ASSP Z359.13', 'ANSI/ASSP Z359.14'],
  jobAids: [{
    title: 'Pocket clearance card', file: 'jobaids/pocket-clearance-card.html', pdf: 'jobaids/pdf/pocket-clearance-card.pdf',
    desc: 'Cut-out wallet cards: the clearance formula, Dee\'s worked example, a quick table for 6 ft lanyards, SRL and swing fall rules.'
  }],

  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'm5-l1', title: 'Dee is tied off. Is she safe?', minutes: 7,
      blocks: [
        { type: 'hero', kicker: 'Module 5 · Anchors, connectors and clearance', title: 'Tied off is not the same as protected',
          text: 'Level 3 deck, Riverside. 7:40 a.m. Dee is working the slab edge, clipped in. Everybody on the deck can see the lanyard. Nobody is doing the math.',
          media: 'img_m5_hero',
          narration: 'Level 3 deck at Riverside, twenty to eight. Dee is working the slab edge and she is clipped in. Everybody can see the lanyard. Nobody is doing the math.',
          sb: { visual: 'Full-bleed photo of a worker tied off at a deck edge; dark gradient for text.', search: 'construction worker harness lanyard deck edge', build: 'Rise banner block (image + text overlay).' } },

        { type: 'quote', speaker: 'dee', mood: 'proud',
          text: 'I\'m good. I\'m clipped to the deck anchor, the one with the tag. Ray said it\'s rated for five thousand.',
          narration: 'I\'m good. I\'m clipped to the deck anchor, the one with the tag. Ray said it\'s rated for five thousand.' },

        { type: 'text', heading: 'Here\'s her setup',
          body: ['A 6 ft shock-absorbing lanyard. A rated anchor cast into the deck, right at her boots. The slab below is 14 ft down.',
                 'Make the call before you read anything else.'],
          narration: 'Here is her setup. A six-foot shock-absorbing lanyard. A rated anchor cast into the deck, right at her boots. The slab below is fourteen feet down. Make the call before you read anything else.' },

        { type: 'mcq', id: 'm5-decide-dee',
          question: 'Dee falls off the edge right now. What happens?',
          options: [
            { text: 'The lanyard catches her well above the slab. Rated anchor, rated lanyard.', correct: false,
              fb: 'That\'s what most crews think. The anchor will hold. The problem is distance: with the anchor at her feet she free falls about 11 ft before the lanyard even starts to work.' },
            { text: 'She hits the slab below, even though everything she\'s wearing is rated.', correct: true,
              fb: 'Right. Her feet would need about 15.5 ft to stop. She only has 14. Everything held and she still hits. We\'ll run the numbers in lesson 3.' },
            { text: 'The anchor pulls out of the deck.', correct: false,
              fb: 'Not likely. A tagged deck anchor is built for the load. The anchor is the one thing in this picture that\'s fine.' }
          ],
          explain: 'A fall arrest system has to stop the fall before contact with the lower level and limit free fall to 6 ft.',
          cite: '1926.502(d)(16)(iii)',
          narration: 'Dee falls off the edge right now. What happens? Pick one.',
          sb: { visual: 'Static side view of Dee at the deck edge, anchor at boots, 14 ft dimension to the slab.', build: 'Storyline freeform pick-one, 3 feedback layers; no score. Rise alternative: Knowledge Check block (ungraded).' } },

        { type: 'art', src: 'assets/art/m5-clearance-dee.svg', alt: 'Side section of the Level 3 deck. A lanyard runs from a foot-level anchor to Dee after a fall; her feet reach the slab 14 ft below. The dimension stack shows 6 ft lanyard, 3.5 ft deceleration, 1 ft harness stretch, 5 ft to her feet and 2 ft margin, needing 17.5 ft.',
          caption: 'Rated anchor, rated lanyard, wrong setup. She needs 17.5 ft. She has 14.',
          narration: 'Rated anchor. Rated lanyard. Wrong setup. She needs seventeen and a half feet. She has fourteen.',
          sb: { visual: 'Clearance diagram built from shapes; dimension stack animates in top to bottom.', build: 'Storyline: entrance animations on each dimension shape, 0.5 s stagger, synced to narration cue points.' } },

        { type: 'tabs', items: [
          { title: 'A: Anchorage', body: 'What you tie to. It has to hold 5,000 lb per worker attached, or be designed by a qualified person with a safety factor of 2.' },
          { title: 'B: Body support', body: 'A full-body harness. Body belts are not allowed for fall arrest. Fit it snug: back D-ring between the shoulder blades.' },
          { title: 'C: Connectors', body: 'Lanyards, SRLs, snaphooks, carabiners. Compatible with each other and with the anchor, locking gates only.' },
          { title: 'D: Distance', body: 'Clearance below, free fall, swing. This is the one crews skip, and it\'s the one that put Dee on the slab.' }
        ],
          narration: 'Every personal fall arrest system has four parts. A for anchorage. B for body support. C for connectors. And D for distance: clearance, free fall and swing. D is the one crews skip.',
          sb: { visual: 'Four tabs with icon per tab (anchor, harness, carabiner, ruler).', build: 'Rise Tabs block.' } },

        { type: 'callout', variant: 'field-check', title: 'Field check',
          body: 'Think about your last deck or roof. Did anyone tied off at foot level know how far down the next level was?',
          input: true,
          narration: 'Field check. Think about your last deck or roof. Did anyone tied off at foot level know how far down the next level was?' }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'm5-l2', title: 'Anchor or not', minutes: 9,
      blocks: [
        { type: 'text', heading: 'Two ways an anchor qualifies',
          body: ['<b>Way 1:</b> it holds 5,000 lb for every worker attached to it. No math needed, no engineer, just a known strength.',
                 '<b>Way 2:</b> a qualified person designs it, installs it or supervises its use as part of a complete system with a safety factor of at least 2.',
                 'If you can\'t prove either one, it\'s not an anchor. It\'s a guess.'],
          narration: 'An anchor qualifies one of two ways. Way one: it holds five thousand pounds for every worker attached. Way two: a qualified person designs it as part of a complete system with a safety factor of at least two. If you can\'t prove either one, it is not an anchor. It\'s a guess.' },

        { type: 'stats', items: [
          { value: '5,000 lb', label: 'per worker attached, when nobody engineered it', source: '1926.502(d)(15)' },
          { value: '2×', label: 'minimum safety factor when a qualified person designs the system', source: '1926.502(d)(15)(ii)' },
          { value: '1,800 lb', label: 'most force a harness system may put on a worker\'s body', source: '1926.502(d)(16)(ii)' }
        ],
          note: 'Why 5,000 when the body only sees 1,800? Edges, angles, two people on one anchor, a rusty clamp. The margin is for everything you can\'t see.',
          narration: 'Five thousand pounds per worker. Or a qualified person\'s design with a safety factor of two. And the body itself should never see more than eighteen hundred pounds. The margin covers edges, angles, and everything you can\'t see.' },

        { type: 'callout', variant: 'tip', title: '5,000 lb is a pickup truck',
          body: 'Ask yourself: would I hang a half-ton pickup from this? Conduit, sprinkler pipe and a rebar dowel all just failed that test.',
          narration: 'Quick gut test. Five thousand pounds is about a pickup truck. Would you hang a pickup from it? Conduit, sprinkler pipe and rebar just failed.' },

        { type: 'anchorjudge', id: 'm5-anchor-or-not', title: 'Anchor or not',
          prompt: 'Nine tie-off points around Riverside. For each one: approve it, reject it, or get a qualified person before anyone clips in.',
          buckets: [
            { id: 'approve', label: 'Approve', hint: 'Known 5,000 lb or engineered and tagged' },
            { id: 'reject', label: 'Reject', hint: 'Never an anchor' },
            { id: 'qp', label: 'Ask a qualified person', hint: 'Might work; needs a design or sign-off' }
          ],
          items: [
            { text: 'Beam clamp on a wide-flange beam, tagged, SRL hanging from it', art: 'assets/art/anchor-beam-clamp.svg', bucket: 'approve',
              fb: 'Approve. A rated beam clamp on structural steel, sized to the flange and installed per the manual. Check the tag and that the jaws are fully seated.' },
            { text: 'Cross-arm strap choked around a structural I-beam, wear pads on the edges', art: 'assets/art/anchor-beam-strap.svg', bucket: 'approve',
              fb: 'Approve. A rated anchor strap on a structural steel member, with the edges padded. No pads on a sharp flange edge? Then it\'s a reject.' },
            { text: 'Engineered roof anchor post, bolted through to the structure, tagged', art: 'assets/art/anchor-roof-stanchion.svg', bucket: 'approve',
              fb: 'Approve. Engineered, installed to the roof structure and tagged. Make sure its install record and inspection date are current.' },
            { text: 'Tagged anchor cast into the deck at foot level', art: 'assets/art/anchor-embedded-deck.svg', bucket: 'approve',
              fb: 'Approve the anchor. Then check the connector: at foot level a 6 ft lanyard free falls about 11 ft. This anchor needs an SRL-LE or a 12 ft free-fall lanyard and real clearance below.' },
            { text: 'EMT conduit running along the ceiling', art: 'assets/art/anchor-conduit.svg', bucket: 'reject',
              fb: 'Reject. Conduit is held up by light straps and carries live wire. It isn\'t built to hold a person, let alone 5,000 lb.' },
            { text: 'Top cable of the perimeter guardrail', art: 'assets/art/anchor-guardrail.svg', bucket: 'reject',
              fb: 'Reject. Guardrails are designed for 200 lb, not a fall arrest load. Never tie off to a guardrail. <cite>1926.502(d)(23)</cite>' },
            { text: 'Vertical rebar dowel, cap pulled off, lanyard wrapped around it', art: 'assets/art/anchor-rebar.svg', bucket: 'reject',
              fb: 'Reject. A dowel bends over under load, and wrapping the lanyard back on itself can cut or roll out the hook. And the cap is off: that\'s an impalement hazard too.' },
            { text: 'Fire sprinkler main overhead', art: 'assets/art/anchor-sprinkler-pipe.svg', bucket: 'reject',
              fb: 'Reject. Sprinkler pipe hangs on threaded rod. A fall would rip it down and flood the floor. Same answer for ductwork, cable tray and handrails.' },
            { text: 'Strap choked around the top chord of an open-web bar joist', art: 'assets/art/anchor-bar-joist.svg', bucket: 'qp',
              fb: 'Ask a qualified person. Some joists can take it at certain panel points, many can\'t. That\'s an engineering answer, not a field guess.' }
          ],
          narration: 'Nine tie-off points around Riverside. For each one, approve it, reject it, or get a qualified person before anyone clips in.',
          sb: { visual: 'Card per anchor using the illustrated anchor art; three drop zones.', search: 'fall protection anchor beam clamp',
                build: 'Storyline drag-and-drop (freeform). Drop targets: Approve / Reject / Ask QP. Each drag item has its own feedback layer. Variable m5_anchorScore counts correct. Mobile: tap item then tap target.' } },

        { type: 'dialogue', title: '10:15 a.m. — Ray at the deck edge', lines: [
          { speaker: 'ray', text: 'Relax. I\'m clipped.' },
          { speaker: 'tasha', text: 'To the guardrail cable.' },
          { speaker: 'ray', text: 'It\'s steel cable. It\'d hold a truck.' },
          { speaker: 'tasha', text: 'It\'s built for 200 lb pushing on it. Your fall puts thousands on it, and it\'ll pull the posts with you.' },
          { speaker: 'ray', text: 'So where am I supposed to clip? There\'s nothing out here.' }
        ],
          narration: 'Ten fifteen. Ray is at the deck edge, guiding a rebar bundle in, and he is clipped to the guardrail cable.',
          sb: { visual: 'Ray (photo character, pointing) and Tasha; speech bubbles reveal one at a time.', search: 'construction foreman pointing hard hat', build: 'Storyline: slide with 5 states on the bubble; Next button advances. Rise alternative: Scenario block.' } },

        { type: 'mcq', id: 'm5-ray-cable',
          question: 'What\'s your best answer to "There\'s nothing out here"?',
          options: [
            { text: '"Then you don\'t go out there."', correct: false,
              fb: 'True, and he\'ll ignore you. Ray needs a way to get the work done, not just a no.' },
            { text: '"Unclip from the cable. I\'ll get a beam clamp on the steel above you, or we guide the bundle from inside the rail with a tag line."', correct: true,
              fb: 'That\'s the move: stop the bad tie-off, then hand him a real anchor or take the edge out of the job with a tag line.' },
            { text: '"Fine, but double-wrap it so it can\'t slide."', correct: false,
              fb: 'Wrapping doesn\'t make a guardrail an anchor. It\'s still 200 lb of design under a much bigger load.' }
          ],
          explain: 'Guardrails are never an anchor, and the competent person\'s job is to replace the bad option with a workable one.',
          cite: '1926.502(d)(23)',
          narration: 'What is your best answer to "there\'s nothing out here"?' },

        { type: 'callout', variant: 'receipt', cite: '1926.502(d)(23)',
          body: 'Fall arrest systems are never attached to guardrail systems. Cable rail, pipe rail, wood rail: no exceptions.',
          narration: 'The receipt: fall arrest systems are never attached to guardrail systems.' }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'm5-l3', title: 'Clearance math', minutes: 13,
      blocks: [
        { type: 'text', heading: 'Five numbers decide whether a catch is a catch',
          body: 'Every one of them is in feet, and every one of them is measured down from the anchor. You can do this on the back of a glove.',
          narration: 'Five numbers decide whether a catch is really a catch. All in feet, measured down from the anchor. You can do this on the back of a glove.' },

        { type: 'process', title: 'The clearance stack (6 ft lanyard)', steps: [
          { title: 'L — lanyard length: 6 ft', body: 'How far the D-ring travels before the lanyard goes tight. Anchor at your feet? Add your D-ring height: that\'s the free fall.' },
          { title: 'DD — deceleration: 3.5 ft', body: 'The shock pack rips out to slow you down. OSHA caps it at 3.5 ft.' },
          { title: 'HS — harness stretch: 1 ft', body: 'Webbing stretches and the D-ring slides up your back. Call it 1 ft.' },
          { title: 'H — D-ring to boots: 5 ft', body: 'You hang from your back. Your feet are about 5 ft below the D-ring.' },
          { title: 'SM — safety margin: 2 ft', body: 'Room for error, bounce and stuff on the floor below. Never skip it.' },
          { title: 'Subtract the anchor height', body: 'Add L + DD + HS + H + SM, then subtract how high the anchor sits above your boots. That\'s the clearance you need below the deck.' }
        ],
          narration: 'Here is the stack. Lanyard length, six feet. Deceleration, three and a half. Harness stretch, one. D-ring to boots, five. Safety margin, two. Add them up, then subtract how high the anchor sits above your boots. That is the clearance you need below the deck.',
          sb: { visual: 'Vertical dimension stack that grows one segment per step next to a worker figure.', build: 'Rise Process block, or Storyline slide with 6 layers and Next/Back.' } },

        { type: 'clearance', id: 'm5-clear-dee', title: 'Does Dee hit the slab?',
          intro: 'Dee\'s setup on the Level 3 deck. Predict first, then run it. Then try the two fixes.',
          setup: { connector: 'lanyard', L: 6, DD: 3.5, HS: 1, H: 5, A: 0, SM: 2, available: 14, label: 'Dee · 6 ft lanyard · anchor at her boots · 14 ft to the slab' },
          ask: 'hits',
          fixes: [
            { label: 'Fix 1: beam clamp on the steel overhead (anchor 7 ft up)', set: { A: 7 },
              text: 'Free fall drops to 4 ft. Feet stop 8.5 ft down; with the 2 ft margin she needs 10.5 ft. She has 14. Clear.' },
            { label: 'Fix 2: overhead SRL', set: { connector: 'srl', A: 7, FFsrl: 2, DD: 3.5 },
              text: 'An overhead SRL locks within about 2 ft. Feet stop 6.5 ft down; she needs 8.5 ft. Lots of room.' }
          ],
          explain: 'Anchor at her feet: free fall = 6 + 5 − 0 = 11 ft (over the 6 ft limit). Feet stop 6 + 3.5 + 1 + 5 − 0 = 15.5 ft down. Add 2 ft margin: 17.5 ft needed, 14 ft available. She hits.',
          narration: 'Dee\'s setup. Predict first: does she hit the slab? Then run it, and try the two fixes.',
          sb: { visual: 'Side section: deck, anchor, figure, lanyard, slab 14 ft below; dimension stack grows during the fall animation.',
                build: 'Storyline: number variables L, DD, HS, H, A, SM, AVAIL; text variable Prediction. Calculate F = L+DD+HS+H−A and RC = F+SM with Adjust Variable triggers. Motion path on figure length = F × scale. Layer HIT if RC > AVAIL else CLEAR. Fix buttons set A=7 or switch SRL state and replay.' } },

        { type: 'callout', variant: 'warning', title: 'Two rules hiding in that math',
          body: 'Free fall can\'t be more than 6 ft. And the system has to stop you before you touch the level below. Dee broke both with gear that was all "rated."',
          cite: '1926.502(d)(16)(iii)',
          narration: 'Two rules hiding in that math. Free fall can\'t be more than six feet. And the system has to stop you before you touch the level below. Dee broke both with gear that was all rated.' },

        { type: 'video', media: 'vid_m5', caption: 'How the pros figure fall clearance.',
          watchFor: 'Watch for where they measure from, and how much the anchor height changes the answer.',
          narration: 'Watch how the pros figure fall clearance. Notice where they measure from, and how much the anchor height changes the answer.' },

        { type: 'quote', speaker: 'luis', mood: 'serious',
          text: 'I did everything they told me. Harness, lanyard, clipped to a ring in the floor. Twelve feet up. I still hit the concrete. Nobody ever told me the lanyard needs room.',
          narration: 'I did everything they told me. Harness, lanyard, clipped to a ring in the floor. Twelve feet up. I still hit the concrete. Nobody ever told me the lanyard needs room.' },

        { type: 'clearance', id: 'm5-clear-luis', title: 'Luis\'s lanyard, revisited',
          intro: 'Luis\'s setup nine years ago: 6 ft lanyard, anchor in the floor at his boots, a 12 ft mezzanine. Run it.',
          setup: { connector: 'lanyard', L: 6, DD: 3.5, HS: 1, H: 5, A: 0, SM: 2, available: 12, label: 'Luis · 6 ft lanyard · floor anchor · 12 ft mezzanine' },
          ask: 'hits',
          fixes: [
            { label: 'Overhead anchor 7 ft up', set: { A: 7 }, text: 'Needs 10.5 ft. He had 12. He walks away.' },
            { label: 'Overhead SRL', set: { connector: 'srl', A: 7, FFsrl: 2, DD: 3.5 }, text: 'Needs 8.5 ft. He walks away.' }
          ],
          explain: 'His feet needed 15.5 ft to stop. The slab was 12 ft down, so he hit it with most of a 12 ft fall still in him. The gear did its job. The setup didn\'t.',
          narration: 'Luis\'s setup, nine years ago. Six-foot lanyard, anchor in the floor, a twelve-foot mezzanine. Run it.',
          sb: { visual: 'Reuse the clearance slide with Luis\'s values; warehouse mezzanine background.', build: 'Same Storyline slide master as Dee; set variables on timeline start (AVAIL=12).' } },

        { type: 'table', title: 'Quick numbers: 6 ft shock-absorbing lanyard',
          headers: ['Anchor height above your boots', 'Free fall', 'Clearance needed below the deck'],
          rows: [
            ['At your feet (0 ft)', '11 ft (over the limit)', '17.5 ft'],
            ['At your D-ring (5 ft)', '6 ft', '12.5 ft'],
            ['Overhead (7 ft)', '4 ft', '10.5 ft'],
            ['Overhead SRL instead', '≈2 ft', '8.5 ft']
          ],
          note: 'Same formula every time: L + DD + HS + H − A + SM. These rows are on your pocket clearance card.',
          narration: 'Here are the quick numbers for a six-foot lanyard. Anchor at your feet, seventeen and a half feet needed. At your D-ring, twelve and a half. Overhead, ten and a half. Overhead SRL, eight and a half.' },

        { type: 'clearance', id: 'm5-clear-explore', title: 'Your turn: the Level 2 stair opening',
          intro: 'A finisher has to work at the edge of the Level 2 stair opening. Lanyard to a beam clamp at D-ring height. 18 ft to the floor below. How much clearance do they need?',
          setup: { connector: 'lanyard', L: 6, DD: 3.5, HS: 1, H: 5, A: 5, SM: 2, available: 18, label: 'Stair opening · anchor at D-ring height · 18 ft to the level below' },
          ask: 'total',
          fixes: [
            { label: 'What if the clamp slides down to their feet?', set: { A: 0 }, text: 'Now they need 17.5 ft and have 18. Six inches of margin is not a plan. Keep the anchor high.' },
            { label: 'Swap to an overhead SRL', set: { connector: 'srl', A: 7, FFsrl: 2, DD: 3.5 }, text: '8.5 ft needed. This is why SRLs win over openings.' }
          ],
          explain: '6 + 3.5 + 1 + 5 − 5 = 10.5 ft to the boots, plus 2 ft margin = 12.5 ft. They have 18. Clear.',
          narration: 'Your turn. A finisher works at the edge of the Level two stair opening, lanyard to a beam clamp at D-ring height, eighteen feet to the floor below. How much clearance do they need?',
          sb: { build: 'Storyline numeric entry field bound to variable Answer; tolerance ±0.5 ft. Correct/incorrect layers show the stack.' } }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'm5-l4', title: 'Connectors, SRLs and the leading edge', minutes: 8,
      blocks: [
        { type: 'testout', id: 'm5-testout-connectors', title: 'You probably already know this',
          text: 'Get all three right and this lesson is marked done. The leading-edge question at the bottom is still worth two minutes.',
          questions: [
            { question: 'Two lanyard snaphooks on one D-ring: OK?', options: [
              { text: 'Only if both hooks are locking and the D-ring and hooks are designed for it', correct: true },
              { text: 'Always fine if both hooks lock', correct: false },
              { text: 'Never allowed under any circumstances', correct: false } ] },
            { question: 'Which connector is allowed for fall arrest on a construction site today?', options: [
              { text: 'Locking (self-closing, self-locking) snaphook', correct: true },
              { text: 'Non-locking snaphook if it\'s sized to the D-ring', correct: false },
              { text: 'Any carabiner rated 5,000 lb', correct: false } ] },
            { question: 'A lanyard wrapped around a beam and hooked back onto its own webbing is...', options: [
              { text: 'Only OK with a tie-back lanyard made for it', correct: true },
              { text: 'Fine with any lanyard if the hook locks', correct: false },
              { text: 'Better than a beam clamp', correct: false } ] }
          ],
          skips: ['m5-l4'],
          narration: 'You probably already know this. Get all three right and you can move faster through connector basics.' },

        { type: 'cards', title: 'Myth or field truth: connectors', mode: 'myth', cards: [
          { front: '"Any snaphook on any D-ring is fine."', back: 'Myth. Hooks must be compatible in size and shape, or a twist can press the gate open and the hook rolls out. Locking hooks only.', verdict: 'myth', cite: '1926.502(d)(5)' },
          { front: '"Never clip a snaphook to webbing, another hook or a loaded D-ring."', back: 'Field truth, unless the hook is a locking type designed for that exact connection.', verdict: 'truth', cite: '1926.502(d)(6)' },
          { front: '"An SRL always needs less clearance than a lanyard."', back: 'Myth. Overhead, yes. At foot level over an edge, an SRL can free fall farther and drag across the edge. That\'s why SRL-LE exists.', verdict: 'myth', cite: 'ANSI/ASSP Z359.14' },
          { front: '"Tying off at your feet doubles your free fall."', back: 'Close to true. A 6 ft lanyard at your boots free falls about 11 ft before it catches. Your back D-ring starts 5 ft up.', verdict: 'truth', cite: '1926.502(d)(16)(iii)' },
          { front: '"A leading-edge SRL is a regular SRL with a sticker."', back: 'Myth. SRL-LE units are tested over a steel edge, often with an energy absorber at the harness end, and come with setback and clearance rules.', verdict: 'myth', cite: 'ANSI/ASSP Z359.14' },
          { front: '"Knot the lanyard to shorten it. Less free fall."', back: 'Myth. A knot can cut webbing strength by as much as half. Use an adjustable lanyard or a shorter one.', verdict: 'myth' }
        ],
          narration: 'Myth or field truth. Flip each card and decide before you read the back.',
          sb: { visual: 'Flashcards with orange "MYTH" / green "FIELD TRUTH" stamp on the back.', build: 'Rise Flashcard Grid block.' } },

        { type: 'tabs', items: [
          { title: 'Shock-absorbing lanyard', body: 'Cheap, simple, 6 ft. Needs the most clearance. Best with an anchor at or above the D-ring. Not for foot-level tie-off unless rated for 12 ft free fall.', media: 'img_connector_lanyard' },
          { title: 'Overhead SRL', body: 'Locks within about 2 ft. Lets the worker move. Smallest clearance. Mount it overhead and close to plumb above the work.', media: 'img_connector_srl' },
          { title: 'SRL-LE (leading edge)', body: 'For anchors at foot level near an edge, like decking or roof work. Tested over a steel edge. Follow the setback, the clearance chart and the edge rules in the manual.', media: 'img_connector_srl_le' }
        ],
          narration: 'Three connectors you will pick from at Riverside. The shock-absorbing lanyard. The overhead self-retracting lifeline. And the leading-edge SRL for foot-level anchors near an edge.',
          sb: { search: 'self retracting lifeline construction', build: 'Rise Tabs block with image per tab.' } },

        { type: 'callout', variant: 'warning', title: 'Foot-level tie-off: three questions first',
          body: ['Is the connector rated for foot-level use (SRL-LE or 12 ft free-fall lanyard)?', 'Is there clearance for the bigger fall?', 'Is the edge protected or the line rated for it?'],
          narration: 'Before anyone ties off at foot level, three questions. Is the connector rated for it? Is there clearance for the bigger fall? Is the edge protected, or the line rated for that edge?' },

        { type: 'mcq', id: 'm5-decking',
          question: 'Decking crew on Level 4, working the leading edge. The only anchors are embedded at deck level. What do you put them on?',
          options: [
            { text: 'Standard 6 ft shock-absorbing lanyards', correct: false, fb: 'At foot level that\'s an 11 ft free fall, over the limit, and the webbing runs over a sharp deck edge.' },
            { text: 'Leading-edge SRLs rated for foot-level, sharp-edge use, set up per the manufacturer\'s setback and clearance chart', correct: true, fb: 'Right tool. Then confirm the clearance chart for that unit and the setback from the anchor to the edge.' },
            { text: 'Standard overhead SRLs clipped to the deck anchors', correct: false, fb: 'A standard SRL isn\'t tested to lock over an edge from below. Use the SRL-LE built for it.' }
          ],
          explain: 'Foot-level anchors near an edge call for connectors designed and tested for that use.',
          cite: 'ANSI/ASSP Z359.14 (SRL-LE)',
          narration: 'Decking crew on Level four, working the leading edge. The only anchors are at deck level. What do you put them on?' }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'm5-l5', title: 'Swing falls and the walk back', minutes: 8,
      blocks: [
        { type: 'text', heading: 'Straight down is the good fall',
          body: 'Work off to the side of your anchor and a fall turns into a pendulum. You drop farther than the math says, and you swing into whatever is in the way: a column, a wall, the edge of the deck.',
          narration: 'Straight down is the good fall. Work off to the side of your anchor and a fall turns into a pendulum. You drop farther than the math says, and you swing into whatever is in the way.' },

        { type: 'swing', id: 'm5-swing', title: 'Walk away from the anchor',
          intro: 'Dee is on an overhead SRL. Slide her away from the point directly under the anchor and watch the swing and the extra drop.',
          R: 12, offsets: [0, 3, 6, 8, 10],
          narration: 'Dee is on an overhead SRL. Slide her away from the point under the anchor and watch the swing, and the extra drop.',
          sb: { visual: 'Anchor at top, SRL line to worker; slider moves worker horizontally; release plays a pendulum arc into a column.',
                build: 'Storyline slider (0–10 ft) bound to variable Offset; motion path chosen by Offset range (4 paths). Extra drop text = R − √(R² − d²). Column collision state when Offset ≥ 6.' } },

        { type: 'video', media: 'vid_m5_swing', caption: 'A swing fall in slow motion.',
          watchFor: 'Watch how far sideways the worker travels and what they would have hit.',
          narration: 'Watch a swing fall in slow motion. Notice how far sideways the worker travels.' },

        { type: 'accordion', items: [
          { title: 'Keep the anchor overhead', body: 'Plumb above the work is best. Move the anchor (beam trolley, second clamp) as the work moves instead of stretching the line.' },
          { title: 'Know your working zone', body: 'Most SRL manuals limit how far you can work off to the side. Check the manual and mark the zone if it matters.' },
          { title: 'Add the extra drop to your clearance', body: 'Swing adds height to the fall. If the clearance was tight straight down, it fails at an angle.' },
          { title: 'Clear the swing path', body: 'Columns, stacked material, a lift. If you\'d hit it on the swing, move it or move the anchor.' }
        ],
          narration: 'Four ways to fix a swing fall. Keep the anchor overhead. Know your working zone. Add the extra drop to your clearance. And clear the swing path.' },

        { type: 'reflect', id: 'm5-gut',
          prompt: 'Gut check: on your crew, who decides where people tie off? Is it a decision or a habit?',
          placeholder: 'One line. Only you see this.',
          narration: 'Gut check. On your crew, who decides where people tie off? Is it a decision, or a habit?' },

        { type: 'callout', variant: 'monday', title: 'Monday: three questions before anyone clips in',
          body: ['<b>What is it rated?</b> 5,000 lb per person, or a qualified person\'s design.', '<b>Where is it?</b> Overhead beats D-ring height. Feet means special gear.', '<b>How far down is the next thing?</b> Do the stack. Keep the card in your wallet.'],
          narration: 'Monday. Three questions before anyone clips in. What is it rated? Where is it? And how far down is the next thing? Do the stack. Keep the card in your wallet.' },

        { type: 'download', title: 'Pocket clearance card', desc: 'Cut-out wallet cards: formula, Dee\'s worked example, quick table for 6 ft lanyards, SRL and swing fall rules.',
          file: 'jobaids/pocket-clearance-card.html', pdf: 'jobaids/pdf/pocket-clearance-card.pdf',
          narration: 'Download your pocket clearance card.' }
      ]
    }
  ],

  kc: {
    title: 'Module 5 knowledge check',
    questions: [
      { id: 'm5-kc1', question: 'Nobody has engineered the anchor. What must it hold for each worker attached?',
        options: [
          { text: '1,800 lb', correct: false, fb: '1,800 lb is the most force allowed on the worker\'s body, not the anchor strength.' },
          { text: '3,600 lb', correct: false, fb: '3,600 lb is the proof test for snaphooks and D-rings.' },
          { text: '5,000 lb', correct: true, fb: 'Right: 5,000 lb per worker, or a qualified person\'s design with a safety factor of 2.' },
          { text: 'Twice the worker\'s weight', correct: false, fb: '"Twice" is for hole covers. Anchors are 5,000 lb or engineered.' }
        ],
        explain: 'Anchorages hold 5,000 lb per employee attached, or are designed by a qualified person with a safety factor of at least 2.',
        cite: '1926.502(d)(15)' },
      { id: 'm5-kc2', question: '6 ft shock-absorbing lanyard on a beam clamp at D-ring height (5 ft). Using DD 3.5, HS 1, H 5 and a 2 ft margin, how much clearance is needed below the deck?',
        options: [
          { text: '10.5 ft', correct: false, fb: '10.5 ft is the answer for an anchor 7 ft overhead.' },
          { text: '12.5 ft', correct: true, fb: '6 + 3.5 + 1 + 5 − 5 = 10.5 ft to the boots, plus 2 ft margin = 12.5 ft.' },
          { text: '17.5 ft', correct: false, fb: '17.5 ft is for an anchor at foot level.' },
          { text: '6 ft', correct: false, fb: '6 ft is the free fall limit, not the clearance.' }
        ],
        explain: 'Required clearance = L + DD + HS + H − A + SM = 6 + 3.5 + 1 + 5 − 5 + 2 = 12.5 ft.',
        cite: '1926.502(d)(16)' },
      { id: 'm5-kc3', question: 'Ray clips his lanyard to the top cable of the perimeter guardrail. What do you tell him?',
        options: [
          { text: 'Fine if the cable is tensioned and flagged', correct: false, fb: 'Tension and flags make it a good guardrail. It\'s still not an anchor.' },
          { text: 'Unclip. Guardrails are never a fall arrest anchor. Let\'s get you a real one.', correct: true, fb: 'Right. Then give him the workable option: beam clamp overhead or a tag line from inside the rail.' },
          { text: 'Fine for a short task under 10 minutes', correct: false, fb: 'Task length doesn\'t change the load a fall puts on the rail.' }
        ],
        explain: 'Personal fall arrest systems shall not be attached to guardrail systems.',
        cite: '1926.502(d)(23)' },
      { id: 'm5-kc4', question: 'Dee is on an overhead SRL but working 10 ft off to the side, next to a column. What\'s the best fix?',
        options: [
          { text: 'Move the anchor so it\'s back over the work', correct: true, fb: 'Right. Straight down is the short fall. Move the anchor with the work.' },
          { text: 'Switch to a 6 ft lanyard on the same anchor', correct: false, fb: 'Still a swing, and now more free fall and more clearance.' },
          { text: 'Tell her to hold the line tight', correct: false, fb: 'The SRL already keeps the line tight. The angle is the problem.' }
        ],
        explain: 'Working off to the side of an anchor creates a swing fall: extra drop and a strike hazard.',
        cite: 'ANSI/ASSP Z359.14; manufacturer instructions' }
    ]
  }
});
