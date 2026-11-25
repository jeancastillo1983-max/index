/* ==========================================================================
   Module 7 — Rescue: the plan before the fall (30 min · Rise + Storyline)
   Objectives: why prompt rescue is required and the danger of suspension
   intolerance; write a site-specific rescue plan; verify it works before
   work starts.
   Facts verified (Nov 2026): OSHA SHIB 03-24-2004 (rev. 2011) — rescue as
   quickly as possible, not a standard; NIOSH: suspension trauma may develop in
   5–30 min in an unconscious/immobilized worker; ANSI/ASSP Z359.2 program
   guidance commonly cited as "reach the fallen worker within ~6 minutes".
   ========================================================================== */
COURSE.addModule({
  id: 'm7', num: 7, title: 'Rescue: the plan before the fall', minutes: 30,
  build: 'Rise + Storyline',
  tagline: 'The harness caught her. Now the clock starts.',
  hero: 'img_m7_hero',
  objectives: [
    'Explain why prompt rescue is required and the danger of suspension intolerance.',
    'Write a site-specific rescue plan: self-rescue, assisted rescue, and when to call emergency services.',
    'Verify the rescue plan works before work starts.'
  ],
  citations: ['29 CFR 1926.502(d)(20)', '29 CFR 1926.502(d)(19)', 'OSHA SHIB 03-24-2004 (Suspension Trauma/Orthostatic Intolerance, rev. 2011)', 'NIOSH suspension trauma research (5–30 min onset when immobile)', 'ANSI/ASSP Z359.2', 'ANSI/ASSP Z359.4'],
  jobAids: [
    { title: 'Site rescue plan template', file: 'jobaids/rescue-plan-template.html', pdf: 'jobaids/pdf/rescue-plan-template.pdf',
      desc: 'One-page rescue plan for any work area, plus a filled-in Riverside roof example.' }
  ],
  lessons: [

    /* ------------------------------------------------------------------ */
    { id: 'm7-l1', title: 'Dee is hanging', minutes: 9, blocks: [
      { type: 'hero', kicker: 'Module 7 · Rescue', title: 'The plan before the fall',
        text: `Everybody plans to stop the fall. Almost nobody plans what happens after the harness catches.`,
        media: 'img_m7_hero',
        narration: `Here's a question most crews never ask until it's too late. The harness worked. The SRL locked. Your worker is alive, hanging off the side of the building. Now what? Who goes, with what, and how fast?`,
        sb: { visual: 'Full-bleed photo: boom lift basket beside a building edge, worker in harness.', search: 'aerial lift construction rescue harness', build: 'Rise: Banner (image overlay) as lesson opener.' } },

      { type: 'quote', speaker: 'tasha', mood: 'serious',
        text: `I used to think the rescue plan was a page in the binder. Then I watched someone hang.`,
        narration: `I'll be straight with you. For years I thought the rescue plan was a page in the site binder that the safety guy filled out. Then I watched someone hang. That changes how you think about it.` },

      { type: 'text', heading: 'You run this one',
        body: [`Dee is on the Level 3 deck, east side, stripping edge forms. She's tied to an overhead SRL, the right way.`,
               `Make the calls. The clock runs on every choice, and it doesn't stop because you're thinking.`],
        narration: `You're Tasha in this one. Dee is tied off the right way, to an overhead self-retracting lifeline. The fall still happens. Every decision you make costs time, and the clock up top doesn't stop while you think. Go.` },

      { type: 'scenario', id: 'm7-clock', title: 'Clock scenario: Dee is hanging',
        intro: `Riverside, Level 3, east edge. Every choice costs time. Watch the clock.`,
        clock: { label: 'Time Dee has been hanging', unit: 'min', limit: 15, warnAt: 6 },
        start: 'n0',
        narration: `Six forty-five in the morning. Before anybody goes near the edge, you get one chance to check the rescue plan. Then the day happens.`,
        sb: { visual: 'Storyline scene: L3 east edge. Clock graphic top right (mm). Dee avatar hanging beside deck edge; lift, rescue kit, phone icons.', search: 'construction worker hanging harness illustration; boom lift', build: 'Storyline: number variable Clock (min) +time on each choice; Clock>=6 changes timer state to amber, >=15 red. Branch on variable LiftChecked (true/false) set at n0. Ends on separate layers with Replay.' },
        nodes: {
          n0: { speaker: 'ray',
            text: `6:45 a.m. Ray waves you off: “Rescue’s covered. Boom lift’s on the east side, keys are in the trailer. We’re fine.” The crew starts in ten minutes.`,
            choices: [
              { text: `Walk to the lift now. Keys there? Battery charged? Who can run it today?`, next: 'n0check', tone: 'good', time: 0,
                fb: `Two minutes before work beats ten minutes during a rescue. Ray rolls his eyes and walks with you.` },
              { text: `Trust Ray. He’s run that lift for years.`, next: 'fall_u', tone: 'bad', time: 0,
                fb: `Maybe he’s right. You’ll find out at the worst possible moment.` }
            ] },
          n0check: { speaker: 'tasha',
            text: `Battery reads 20%. You plug it in. The keys go in the lockbox on the lift, and you and Ray both know the code. Ray will run it; you ride the basket.`,
            choices: [
              { text: `Back to work.`, next: 'fall_c', tone: 'good', time: 0,
                fb: `That’s the whole trick: the plan only works if somebody checked it today.` }
            ] },
          fall_c: { speaker: 'dee',
            text: `10:12 a.m. A form panel kicks and Dee goes over the edge. The SRL locks. She’s hanging about 8 ft below the deck edge, conscious, breathing hard. The clock starts.`,
            choices: [
              { text: `Get eyes and voice on her. Tell her help is coming and to get her feet in her relief straps. Radio: “Fall, east side Level 3, rescue plan now.”`, next: 'n2c', tone: 'good', time: 1,
                fb: `Voice contact first. A talking worker you can see is a worker you can coach. Relief straps take pressure off her legs.` },
              { text: `Call 911 and wait for the fire department. They’re the pros.`, next: 'wait911', tone: 'bad', time: 1,
                fb: `Call 911, yes. But 911 is a phone call, not a rescue plan.` },
              { text: `Lean over the edge and try to grab her harness.`, next: 'hero', tone: 'bad', time: 1,
                fb: `You’re now the second person near an open edge with no tie-off.` }
            ] },
          fall_u: { speaker: 'dee',
            text: `10:12 a.m. A form panel kicks and Dee goes over the edge. The SRL locks. She’s hanging about 8 ft below the deck edge, conscious, breathing hard. The clock starts.`,
            choices: [
              { text: `Get eyes and voice on her. Tell her help is coming and to get her feet in her relief straps. Radio: “Fall, east side Level 3, rescue plan now.”`, next: 'n2u', tone: 'good', time: 1,
                fb: `Voice contact first. A talking worker you can see is a worker you can coach.` },
              { text: `Call 911 and wait for the fire department. They’re the pros.`, next: 'wait911', tone: 'bad', time: 1,
                fb: `Call 911, yes. But 911 is a phone call, not a rescue plan.` },
              { text: `Lean over the edge and try to grab her harness.`, next: 'hero', tone: 'bad', time: 1,
                fb: `You’re now the second person near an open edge with no tie-off.` }
            ] },
          wait911: { speaker: 'marco',
            text: `Marco’s on the phone with dispatch. They have to find the gate, the stairs, the right side of the building. Dee keeps asking how long.`,
            choices: [
              { text: `Keep waiting for the fire department.`, next: 'end911', tone: 'bad', time: 12,
                fb: `Twelve minutes of waiting. Dee has been hanging the whole time.` }
            ] },
          n2c: { speaker: 'dee',
            text: `Minute 1. Dee’s talking. One foot is in a relief strap. The plan says: boom lift from the east side, Ray operates, you ride. Who does what right now?`,
            choices: [
              { text: `Ray runs the lift. Marco calls 911 and sends someone to the gate to meet them. You keep talking to Dee.`, next: 'lift_c', tone: 'good', time: 3,
                fb: `Rescue and 911 run at the same time. Someone meets EMS at the gate so they don’t wander the site.` },
              { text: `Everybody stops until 911 is called, then start the lift.`, next: 'lift_c', tone: 'ok', time: 5,
                fb: `You got there, but you burned two minutes. Call 911 in parallel, never first-and-wait.` },
              { text: `Grab three guys and haul her up by the SRL line.`, next: 'haul', tone: 'bad', time: 3,
                fb: `Hand-hauling a person over a sharp deck edge is how lines get cut and rescuers get hurt.` }
            ] },
          haul: { speaker: 'ray',
            text: `You gain a foot. The line is sawing on the deck edge and Dee is crying out that the harness is crushing her. Ray: “This isn’t working.”`,
            choices: [
              { text: `Stop. Work the plan: Ray to the lift, Marco on 911.`, next: 'lift_c', tone: 'ok', time: 3,
                fb: `Good recovery. Improvised rescues waste the minutes the plan was built to save.` }
            ] },
          lift_c: { speaker: 'ray',
            text: `Lift’s charged, keys are in the lockbox. Ray puts the basket beside Dee. You’re in the basket, tied to its anchor. What’s next?`,
            choices: [
              { text: `Clip Dee’s harness to the basket anchor with a rescue lanyard first. Then release the SRL, bring her in and lower to grade.`, next: 'after_c', tone: 'good', time: 3,
                fb: `Connect before you disconnect. She is never attached to nothing, not even for a second.` },
              { text: `Unclip her SRL first so she can climb in faster.`, next: 'endunclip', tone: 'bad', time: 1,
                fb: `For a few seconds she was attached to nothing, 25 ft up.` }
            ] },
          after_c: { speaker: 'dee',
            text: `Dee’s on the ground. She says she’s fine and wants to finish her shift so nobody thinks she’s soft.`,
            choices: [
              { text: `EMS checks her out. The SRL comes out of service and gets tagged. You call the safety manager and write it up.`, next: 'endgood', tone: 'good', time: 1,
                fb: `Anyone who hung in a harness gets a medical evaluation. Gear that arrested a fall is out of service until a competent person says otherwise.`, cite: '1926.502(d)(19)' },
              { text: `If she says she’s fine, she’s fine. Water, a break, back at it.`, next: 'endfine', tone: 'bad', time: 1,
                fb: `“I’m fine” is adrenaline talking.` }
            ] },
          n2u: { speaker: 'dee',
            text: `Minute 1. Dee’s talking, one foot in a relief strap. You radio Ray to bring the boom lift around.`,
            choices: [
              { text: `Ray runs the lift. Marco calls 911 and sends someone to the gate. You keep talking to Dee.`, next: 'nokeys', tone: 'good', time: 3,
                fb: `Right roles. Now find out whether the plan was real.` },
              { text: `Grab three guys and haul her up by the SRL line.`, next: 'nokeys', tone: 'bad', time: 4,
                fb: `You gain a foot, the line saws on the edge, and you lose four minutes before you go for the lift.` }
            ] },
          nokeys: { speaker: 'ray',
            text: `Ray’s at the lift. No keys. They’re in the trailer, and the trailer is locked. The battery reads 20% anyway. It’s minute 5.`,
            choices: [
              { text: `Switch to the backup: the rescue kit in the Level 3 gang box. You and Ray rig it to the beam and lower Dee to Level 2.`, next: 'downlate', tone: 'ok', time: 6,
                fb: `The backup worked because somebody stocked it. Too close.` },
              { text: `Send someone running for the trailer key and wait for the lift.`, next: 'downlate', tone: 'bad', time: 9,
                fb: `Nine more minutes. Every one of them with Dee hanging.` }
            ] },
          downlate: { speaker: 'dee',
            text: `Dee is finally down. She’s pale, sweating, and says she feels sick and dizzy.`,
            choices: [
              { text: `EMS takes her. The SRL is tagged out of service. You call the safety manager and fix the plan today.`, next: 'endlate', tone: 'ok', time: 1,
                fb: `Right aftercare. But the plan failed at the one step nobody checked.`, cite: '1926.502(d)(20)' },
              { text: `Sit her in the trailer until she feels better.`, next: 'endlatebad', tone: 'bad', time: 1,
                fb: `Pale, sweating and dizzy after hanging is a medical emergency, not a break.` }
            ] },
          endgood: { end: true, outcome: 'good', title: 'Dee is down, checked and safe',
            text: `Voice contact in a minute, the lift beside her by minute 4, down by about 8. That happened because someone checked the lift before work, not because the day went well.`, cite: '1926.502(d)(20)' },
          endfine: { end: true, outcome: 'ok', title: 'Good rescue, bad finish',
            text: `The rescue was fast. Then you sent a worker who just hung in a harness back to work without a medical check, and the SRL that caught her went back into service. Both are on you now.`, cite: '1926.502(d)(19)' },
          endunclip: { end: true, outcome: 'bad', title: 'Attached to nothing',
            text: `She made it into the basket. For three seconds, 25 feet up, the only thing holding her was her grip. Connect to the rescue system before you disconnect from the arrest system. Every time.`, cite: 'ANSI/ASSP Z359.4' },
          endlate: { end: true, outcome: 'ok', title: 'She’s down. Too close.',
            text: `The plan said “boom lift.” Nobody checked that the lift could actually go. The backup saved the day. Five minutes at 6:45 would have saved most of the clock.`, cite: '1926.502(d)(20)' },
          endlatebad: { end: true, outcome: 'bad', title: 'The plan failed twice',
            text: `The lift wasn’t ready, and the aftercare wasn’t there. Dee spends the night in the hospital. Rescue isn’t done when the feet touch the ground.`, cite: 'OSHA SHIB 03-24-2004' },
          end911: { end: true, outcome: 'bad', title: '911 is not a plan',
            text: `The engine company arrives at minute 13 and still has to find a way up. Dee has been hanging for a quarter of an hour, pale and fading. Call 911, always. But your crew is the rescue.`, cite: '1926.502(d)(20)' },
          hero: { end: true, outcome: 'bad', title: 'Almost two falls',
            text: `Ray grabs your vest and yanks you back from the edge. Improvised rescues are how one fall becomes two. Replay and work the plan.`, cite: '1926.502(d)(20)' }
        } },

      { type: 'callout', variant: 'tip', title: 'What the best run had in common',
        body: [`Voice contact in the first minute. Rescue and 911 at the same time. Someone at the gate.`,
               `And one boring thing at 6:45: somebody checked the lift.`],
        narration: `Look at the run that went well. Nothing heroic. Voice contact right away, the rescue and the 911 call running at the same time, somebody at the gate for EMS. And one boring check before the shift started. That's what rescue really looks like.` },

      { type: 'continue', label: 'Why minutes matter' }
    ] },

    /* ------------------------------------------------------------------ */
    { id: 'm7-l2', title: 'Why minutes matter', minutes: 6, blocks: [
      { type: 'text', heading: 'The harness worked. Hanging is a new problem.',
        body: [`Leg straps press on big veins. If a worker can’t move their legs, blood pools there and less gets back to the heart and brain.`,
               `That’s suspension, or orthostatic, intolerance. Faint, then worse, and it can happen in minutes. <cite>OSHA SHIB 03-24-2004</cite>`],
        narration: `A harness that catches you is doing its job. Hanging in it is a different problem. The leg straps press on big veins. If you can't move your legs, blood pools down there and less of it makes it back to your heart and your brain. OSHA calls it orthostatic intolerance. You'll hear it called suspension trauma. Either way, it can take someone out in minutes.`,
        sb: { visual: 'Simple body outline in harness, leg straps highlighted, downward arrows at legs.', search: 'full body harness diagram', build: 'Rise: Text block + Image (diagram built in shapes).' } },

      { type: 'stats',
        items: [
          { value: '5–30 min', label: 'how fast suspension trauma may develop in a worker who is unconscious or can’t move', source: 'NIOSH research summary (CDC Stacks)' },
          { value: '≈6 min', label: 'common program target to reach a fallen worker by voice or touch', source: 'ANSI/ASSP Z359.2 managed-program guidance' },
          { value: 'Prompt', label: 'what the rule requires: rescue them, or make sure they can rescue themselves', source: '29 CFR 1926.502(d)(20)' }
        ],
        note: `Nobody gets a medal for a 40-minute rescue. Plan for minutes.`,
        narration: `Three numbers to carry. Five to thirty minutes: that's how fast it can turn serious for someone who's knocked out or can't move. About six minutes: that's the target most fall programs use to reach a worker by voice or by hand. And prompt: that's the word in the OSHA rule. Not eventually. Prompt.`,
        sb: { visual: 'Three stat tiles with a stopwatch icon.', search: 'stopwatch icon', build: 'Rise: three-column Statement/Image & Text; sources in captions.' } },

      { type: 'accordion',
        items: [
          { title: 'Signs to watch while they hang', body: `Pale or gray skin, sweating, dizziness, nausea, confusion, going quiet. If they stop answering, it just got urgent.` },
          { title: 'What the hanging worker does', body: `Stay calm. Deploy the trauma relief straps and stand in them. Keep pumping the legs. Keep talking to whoever is on the deck.` },
          { title: 'What you never do', body: `Go to the edge without a tie-off. Cut the line. Hand-haul them over a sharp edge. Unclip them from the arrest system before they’re clipped to the rescue system.` },
          { title: 'After they’re down', body: `Treat it as a medical emergency: EMS evaluation even if they say they’re fine, and follow EMS direction. The gear that caught them comes out of service. <cite>1926.502(d)(19)</cite>` }
        ],
        narration: `Open each of these. The signs to watch for while someone hangs. What the worker in the harness should be doing. What you never do, no matter how bad it looks. And what happens after they're down.`,
        sb: { visual: 'Accordion with icons: eye, person, stop hand, ambulance.', search: 'first aid icon', build: 'Rise: Accordion block (4 tabs).' } },

      { type: 'cards', title: 'Myth or field truth?', mode: 'myth',
        cards: [
          { front: `“The fire department will get them down.”`, back: `Maybe, eventually. Add the call, the drive, the gate, the stairs and their setup, all while your worker hangs. OSHA puts prompt rescue on the employer, not the 911 dispatcher.`, verdict: 'myth', cite: '1926.502(d)(20)' },
          { front: `“If the harness held, the hard part’s over.”`, back: `The harness bought time. Hanging motionless can turn deadly in minutes. The rescue is the second half of fall protection.`, verdict: 'myth', cite: 'OSHA SHIB 03-24-2004' },
          { front: `“Trauma relief straps buy time.”`, back: `True. Standing in them takes pressure off the leg straps and lets the legs pump blood. They buy minutes. They don’t replace a rescue.`, verdict: 'truth' },
          { front: `“Once they’re down and talking, they can finish the shift.”`, back: `Anyone who hung in a harness gets a medical evaluation, and the gear that caught them is out of service until a competent person clears it.`, verdict: 'myth', cite: '1926.502(d)(19)' }
        ],
        narration: `Flip each card. Decide first: myth or field truth? Then check yourself.`,
        sb: { visual: 'Flip cards, front: quote in hand-lettered style; back: verdict stamp MYTH / FIELD TRUTH.', search: 'firefighter ladder truck', build: 'Rise: Flashcard grid (4 cards), front text + back text with verdict label.' } },

      { type: 'reflect', id: 'm7-gut-rescue',
        prompt: `Gut check: if someone on your site were hanging right now, who would get them down, and with what?`,
        placeholder: `Name the person and the equipment. “Somebody would figure it out” doesn’t count.`,
        narration: `Gut check. Private, nobody grades it. If somebody on your site was hanging right now, this minute, who gets them down? With what? Be honest.` },

      { type: 'continue', label: 'Rescue options' }
    ] },

    /* ------------------------------------------------------------------ */
    { id: 'm7-l3', title: 'Rescue options and your plan', minutes: 8, blocks: [
      { type: 'quote', speaker: 'ray', mood: 'pushback',
        text: `Twenty-eight years and we’ve never needed a rescue plan.`,
        narration: `Ray says it like it's proof. Twenty-eight years, never needed a rescue plan.` },
      { type: 'quote', speaker: 'tasha', mood: 'calm',
        text: `Twenty-eight years and you’ve never needed one yet. That’s the whole point of having one.`,
        narration: `And I tell him what I'd tell you. Yet. You've never needed one yet. A rescue plan is like a fire extinguisher. Nobody wants to need it, and nobody wants to find out it's empty.` },

      { type: 'process', title: 'Your rescue options, fastest first',
        steps: [
          { title: 'Self-rescue', body: `A conscious, uninjured worker gets themselves to a safe surface: a nearby deck, a ladder you place, or an SRL with built-in descent. Only plan on it if the worker is trained and the setup allows it.` },
          { title: 'Assisted rescue from a lift', body: `A boom or scissor lift brings a basket to the worker. Fast and controlled, if the lift is on site, charged, keyed, can reach, and someone trained runs it.` },
          { title: 'Assisted rescue with a rescue kit', body: `A pre-rigged haul or lowering system at the anchor lets trained crew raise or lower the worker to a safe level. Great backup where a lift can’t reach. <cite>ANSI/ASSP Z359.4</cite>` },
          { title: 'Ladder rescue', body: `Only at low heights with a conscious worker who can help. Never ask a dizzy worker to climb down on their own.` },
          { title: 'Emergency services, every time, in parallel', body: `Call 911 the moment it happens and send someone to the gate. EMS treats the worker. Your crew gets them down.` }
        ],
        narration: `Here are your options, roughly fastest to slowest. Self-rescue, if the worker can do it. A lift, if it's ready. A rescue kit, as a backup where the lift can't reach. A ladder, only low and only with someone who can help. And 911, every single time, but running alongside your rescue, not instead of it.`,
        sb: { visual: 'Process steps with simple icons: person, boom lift, pulley, ladder, phone.', search: 'boom lift; rescue pulley system; ladder', build: 'Rise: Process block, 5 steps + summary.' } },

      { type: 'labeled', src: 'assets/art/m7-rescue-options.svg',
        alt: 'Cutaway of the Riverside building: a worker hangs below the Level 3 edge on an SRL; a boom lift approaches from the east lot; a rescue kit is rigged at an overhead beam; a crew member waits at the gate for EMS.',
        markers: [
          { x: 31, y: 44, title: 'The fallen worker', body: `Conscious, talking, standing in relief straps. Your first job is voice contact.` },
          { x: 47, y: 23, title: 'Overhead anchor + SRL', body: `The system that caught her. After the rescue it comes out of service. <cite>1926.502(d)(19)</cite>` },
          { x: 58, y: 30, title: 'Rescue kit at the anchor', body: `Pre-rigged lowering system in the gang box: the backup when the lift can’t reach.` },
          { x: 70, y: 62, title: 'Boom lift', body: `Primary plan. Checked today: charged, keys in the lockbox, operator named.` },
          { x: 90, y: 82, title: 'Gate runner', body: `One person meets EMS at the gate and walks them in. It saves minutes every time.` }
        ],
        narration: `Tap each marker. This is what a real rescue setup looks like on Riverside. The worker, the anchor that caught her, the backup kit, the lift, and the one person most crews forget: the runner at the gate.`,
        sb: { visual: 'Custom SVG cutaway (assets/art/m7-rescue-options.svg) with 5 numbered markers.', search: 'construction site boom lift building edge', build: 'Rise: Labeled graphic block, 5 markers. Storyline alt: markers with hover layers.' } },

      { type: 'callout', variant: 'warning', title: 'Connect before you disconnect',
        body: `The fallen worker is clipped to the rescue system first. Only then does the arrest system let go. Never a second attached to nothing.`,
        narration: `If you remember one rule from the rescue itself, make it this one. Connect before you disconnect. The worker gets clipped to the rescue system first. Only then do you release the system that caught them.` },

      { type: 'video', media: 'vid_m7',
        caption: `Rescue planning and suspension intolerance.`,
        watchFor: `Watch for how long the rescue takes once the equipment is already staged, and what slows it down when it isn’t.`,
        narration: `Watch this one for timing. Notice how fast a rescue goes when the gear is staged and the people know their jobs, and what eats the clock when they don't.`,
        sb: { visual: 'Embedded YouTube video with poster.', search: 'n/a (web video)', build: 'Rise: Multimedia > Embed. Storyline alt: Web Object.' } },

      { type: 'sequence', id: 'm7-build-plan', title: 'Build-a-plan: Riverside roof',
        prompt: `The roofers start on the 96-ft-wide TPO roof Monday. Put the rescue plan steps in the order they have to happen.`,
        items: [
          `Walk the roof and mark every spot where someone could end up hanging`,
          `Pick the primary rescue for each spot, and a backup`,
          `Stage the gear and check it: lift charged, keys in the lockbox, rescue kit inspected at the hatch`,
          `Assign names: lift operator, basket rider, 911 caller, gate runner`,
          `Run a drill at low height before roof work starts`,
          `On a fall: voice contact, relief straps, start the rescue and call 911 at the same time`,
          `After: medical evaluation, gear out of service, report, and fix the plan`
        ],
        fb: `Plan, stage, assign, drill, then respond. Most failed rescues skip the boring middle: checking the gear and naming the people.`,
        narration: `Your turn. The roofers start Monday on the Riverside roof. Put these rescue plan steps in the order they have to happen. Think about what has to be true before anyone walks out to the edge.`,
        sb: { visual: 'Seven step cards with drag handles over a faded roof plan.', search: 'roof plan drawing', build: 'Storyline: Sequence drag-and-drop (7 items), 2 attempts, feedback layer shows correct order. Rise alt: Sorting activity is not ordered—use Storyline block.' } },

      { type: 'continue', label: 'Prove it works' }
    ] },

    /* ------------------------------------------------------------------ */
    { id: 'm7-l4', title: 'Prove it before work starts', minutes: 7, blocks: [
      { type: 'text', heading: 'A plan on paper is a hope',
        body: [`The binder said “boom lift.” It didn’t say the battery was at 20% and the keys were in a locked trailer.`,
               `A rescue plan is only real when it’s checked today, at this work area, with these people.`],
        narration: `In the clock scenario, the plan said boom lift. What it didn't say was that the battery was low and the keys were locked in the trailer. Paper doesn't fail you. The gap between the paper and the site does. Your job is to close that gap before anyone goes near the edge.` },

      { type: 'mcq', id: 'm7-binder',
        question: `Marco: “Rescue plan’s in the binder in the trailer. We’re good.” The roofers go out in 20 minutes. What do you check first?`,
        options: [
          { text: `That the lift named in the plan can reach the roof edge today, is charged, is keyed, and someone on shift can run it.`, correct: true, fb: `Yes. Equipment, access and people, checked at the work area today.` },
          { text: `That the plan has a signature and a date on it.`, correct: false, fb: `Nice to have. A signed plan with a dead lift still fails.` },
          { text: `That everybody has 911 in their phone.`, correct: false, fb: `911 is part of every plan, never the whole plan.` },
          { text: `Nothing. If it’s in the binder, it’s been approved.`, correct: false, fb: `Approved isn’t the same as ready.` }
        ],
        explain: `Verify the plan where the work is: equipment staged and working, path clear, people named and trained.`,
        cite: '1926.502(d)(20)',
        narration: `Quick one. Marco says the plan's in the binder. You've got twenty minutes. What do you check first?` },

      { type: 'checklist', id: 'm7-precheck', title: 'Pre-task rescue check (before anyone goes to the edge)',
        items: [
          `Rescue method named for this work area, plus a backup`,
          `Lift on site, can reach the spot, charged or fueled, keys where everyone knows`,
          `Lift operator and basket rider named and on shift today`,
          `Rescue kit inspected and staged at the work area`,
          `Trauma relief straps on every harness`,
          `Radio channel or phone with signal at the work area`,
          `Site address and gate posted; someone named to meet EMS`,
          `Path for the lift is clear today (no crane mats, deliveries or trenches)`,
          `Drill done for this work area, with this crew`
        ],
        narration: `This is the check I run before anyone walks out to an edge. Nine items. It takes about five minutes. Tick through it and think about whether your site would pass today.`,
        sb: { visual: 'Clipboard-style checklist with tick boxes.', search: 'clipboard checklist construction', build: 'Rise: Checklist (or Storyline checkboxes). Mirrors page 1 of the rescue plan job aid.' } },

      { type: 'callout', variant: 'field-check', title: 'Field check',
        body: `On your current job, where would a rescue be hardest? What’s in the way: reach, access, a locked gate, a lift that can’t get there?`,
        input: true,
        narration: `Think about your own site right now. Where would getting somebody down be hardest? Name the spot, and name what's in the way.` },

      { type: 'download', title: 'Site rescue plan template',
        desc: `One page per work area: rescue method, backup, gear, names, drill date. Page 2 is the Riverside roof plan filled in as an example.`,
        file: 'jobaids/rescue-plan-template.html', pdf: 'jobaids/pdf/rescue-plan-template.pdf',
        narration: `Here's the template I use. One page per work area. The second page is the Riverside roof plan, filled in, so you can see what good looks like.` },

      { type: 'callout', variant: 'monday', title: 'Monday',
        body: `Pick one work area where people are tied off. Run the nine-point rescue check before the crew goes out, and fix the first thing that fails.`,
        narration: `Here's your Monday. Pick one area where people are tied off. Run the nine-point check before they go out. Something will fail. Fix it. That's the job.` }
    ] }
  ],

  kc: { title: 'Knowledge check: rescue', questions: [
    { question: `Dee is hanging on her SRL, conscious and talking. What happens first?`,
      options: [
        { text: `Voice contact: tell her help is coming and to use her relief straps, then start the rescue plan.`, correct: true, fb: `Yes. Contact first, then the plan, with 911 in parallel.` },
        { text: `Call 911 and wait for the fire department.`, correct: false, fb: `Call 911, but don’t wait. Your crew is the rescue.` },
        { text: `Reach over the edge and pull her up by the line.`, correct: false, fb: `That’s how one fall becomes two.` }
      ],
      explain: `Prompt rescue is the employer’s job. 911 runs in parallel.`, cite: '1926.502(d)(20)' },
    { question: `Why is hanging in a harness dangerous even if the worker isn’t hurt by the fall?`,
      options: [
        { text: `Leg straps restrict blood flow; a motionless worker can lose consciousness within minutes.`, correct: true, fb: `Right. That’s suspension (orthostatic) intolerance.` },
        { text: `The harness can stretch until the worker slips out.`, correct: false, fb: `A properly fitted harness holds. The danger is circulation.` },
        { text: `It isn’t dangerous if the SRL locked properly.`, correct: false, fb: `The SRL stopped the fall. The clock still runs.` }
      ],
      explain: `Pooled blood in the legs means less returns to the heart and brain.`, cite: 'OSHA SHIB 03-24-2004' },
    { question: `During a lift rescue, the worker is beside the basket. What is the correct order?`,
      options: [
        { text: `Connect the worker to the basket anchor, then release the SRL.`, correct: true, fb: `Connect before you disconnect.` },
        { text: `Release the SRL, then connect the worker to the basket.`, correct: false, fb: `That leaves the worker attached to nothing.` },
        { text: `Order doesn’t matter if the worker is holding the rail.`, correct: false, fb: `It always matters.` }
      ],
      explain: `The worker must never be unattached during the transfer.`, cite: 'ANSI/ASSP Z359.4' },
    { question: `Which item shows a rescue plan was actually verified before work started? (Select all that apply.)`, multi: true,
      options: [
        { text: `The lift was charged and keyed at the work area this morning.`, correct: true, fb: `Yes.` },
        { text: `The operator and basket rider are named and on shift today.`, correct: true, fb: `Yes.` },
        { text: `The plan has been in the site binder since mobilization.`, correct: false, fb: `Age in a binder proves nothing.` },
        { text: `The crew ran a low-height drill for this work area.`, correct: true, fb: `Yes. A drill finds the gaps.` }
      ],
      explain: `Verified means equipment, access and people checked at the work area, ideally proven with a drill.`, cite: '1926.502(d)(20)' }
  ] }
});
