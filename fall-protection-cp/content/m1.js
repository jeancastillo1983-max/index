/* ==========================================================================
   Module 1 — The fall that didn't have to happen (30 min · Rise + Storyline)
   Objectives: trace the chain of small decisions that led to a fall; name the
   four mindsets (normalization, "won't happen to me", production pressure,
   crew culture) in your own crew.
   ========================================================================== */
COURSE.addModule({
  id: 'm1', num: 1, title: 'The fall that didn\'t have to happen', minutes: 30,
  build: 'Rise + Storyline',
  tagline: 'Nobody decided to let Luis fall. A lot of people decided small things.',
  hero: 'img_m1_hero',
  objectives: [
    'Trace the chain of small decisions that led to a fall.',
    'Name the four mindsets (normalization, "won\'t happen to me", production pressure, crew culture) in your own crew.'
  ],
  citations: ['1926.501(b)(1)', '1926.502(d)(16)', '1926.502(d)(20)', '1926.502(b)', '1926.502(i)', 'BLS CFOI 2024'],
  lessons: [

    /* ------------------------------------------------------------------ */
    { id: 'm1-l1', title: 'Luis, in his own words', minutes: 10, blocks: [
      { type: 'hero', kicker: 'Module 1', title: 'The fall that didn\'t have to happen',
        text: `Luis was tied off. He hit the slab anyway. Five short chapters. After each one, you decide where you'd have stopped it.`,
        media: 'img_m1_hero',
        narration: `This module starts with a man named Luis. He was a good hand, careful, fifteen years in. He was tied off when he fell. He hit the slab anyway. He's going to tell you how, in five short pieces. After each one, I want you to decide: where would you have stopped this?`,
        sb: { visual: 'Quiet, empty jobsite at dawn. No injury imagery anywhere in this module.', search: 'empty construction site morning', build: 'Rise: Banner block. Chapter cards use icons only.' } },

      { type: 'story', id: 'm1-luis', speaker: 'luis',
        chapters: [
          { title: '1 · The job', icon: 'building',
            text: `Nine years ago. Warehouse retrofit, building a steel mezzanine. Twelve feet up. Last two weeks of the job and the GC was way behind. Everybody was hustling. I liked that job. Good crew.`,
            choice: { question: 'Where would you have stopped this?',
              options: [
                { text: `Nothing to stop yet. It's a normal job.`, fb: `It looks normal. That's the point. But "behind and hustling" is the first link. Pressure is when setups get skipped.` },
                { text: `Ask who planned fall protection for the open side of the mezzanine before anyone works it.`, best: true, fb: `Yes. Predictable hazard: that open side was going to be worked. The plan should exist before the work does.` },
                { text: `Get the crew overtime so they don't have to hustle.`, fb: `Might help the pace, but it doesn't close the edge. Hours aren't a fall protection system.` }
              ] } },
          { title: '2 · The anchor', icon: 'anchor',
            text: `The guardrail for the open side came late, so the foreman said tie off. Only anchor I found was an eye bolt set in the slab, right at my feet. Six-foot shock lanyard. I clipped in. I felt good about it. I was doing it right.`,
            choice: { question: 'Where would you have stopped this?',
              options: [
                { text: `Nowhere. He's tied off to an anchor with a shock-absorbing lanyard.`, fb: `That's what Luis thought. Tied off isn't the same as protected. Look at where the anchor is and how far down the floor is.` },
                { text: `The anchor height. A foot-level anchor with a 6-ft lanyard on a 12-ft mezzanine can't stop him before the slab.`, best: true, fb: `That's it. From a foot-level anchor he could free fall about 11 feet, and the system needs more than 15 feet below him. He only had 12.` },
                { text: `The lanyard brand. Some are better than others.`, fb: `Brand wasn't the problem. Any 6-ft lanyard rigged at his feet would have done the same thing.` }
              ] } },
          { title: '3 · The habit', icon: 'repeat',
            text: `Forklift brought the joists up to the edge. We'd lean out and grab the pallet as it came level. Everybody did it. We'd done it the whole job. Never a problem.`,
            choice: { question: 'Where would you have stopped this?',
              options: [
                { text: `Move the landing zone back from the edge and guide loads with a tag line.`, best: true, fb: `Right. Change the setup so nobody has to reach over the edge. "Never a problem" is just luck that hasn't run out.` },
                { text: `Tell them to be more careful when they lean out.`, fb: `They already think they're careful. Fix the work, not the attitude.` },
                { text: `It's fine. They were tied off.`, fb: `Being tied off made the reaching feel safe. That's how a habit gets worse.` }
              ] } },
          { title: '4 · The fall', icon: 'arrow-down',
            text: `One pallet came up crooked. I grabbed it, it shifted, I stepped back to get my balance and there was nothing there. The lanyard did its job. The absorber ripped out like it's supposed to. And my boots hit the slab anyway.`,
            choice: { question: 'What would have kept him off the slab?',
              options: [
                { text: `A shorter lanyard tied to the same anchor.`, fb: `Better, but still a foot-level anchor. Shorter helps; it doesn't fix the geometry.` },
                { text: `Guardrail on the open side before anyone worked it, or an overhead anchor or self-retracting lifeline if the rail wasn't there yet.`, best: true, fb: `Yes. Guardrail first, so nobody falls at all. If you must arrest, anchor high and keep the free fall short.` },
                { text: `Nothing. Sometimes accidents just happen.`, fb: `This one was predictable: the clearance math was wrong before he ever clipped in.` }
              ] } },
          { title: '5 · After', icon: 'clock',
            text: `Broken pelvis. Both heels. Fourteen months before I walked without a cane. Never went back to the iron. What gets me is, everybody saw me tied off and figured I was fine. Me too.`,
            choice: { question: 'Who could have stopped it?',
              options: [
                { text: `Luis. It was his fall.`, fb: `He made a reasonable call with what he knew. Blaming the guy on the slab teaches nobody anything.` },
                { text: `Anyone with eyes on the setup and the authority to change it. On that job, that should have been the competent person.`, best: true, fb: `That's the job you're taking on. Not watching for people who don't tie off. Watching for setups that look right and aren't.` },
                { text: `The lanyard manufacturer.`, fb: `The lanyard worked exactly as designed. It was rigged where it couldn't win.` }
              ] } }
        ],
        narration: `Luis will tell it in his own words. After each chapter, pick where you'd have stepped in. There's a best answer each time, but read the feedback on the others too.`,
        sb: { visual: 'Five chapter cards with simple icons (building, anchor, repeat arrows, down arrow, clock). Luis avatar. No injury images.', search: 'older worker portrait cap (Content Library: casual male, 40s-50s)', build: 'Storyline: 5 slides, each with a pick-one choice and 3 feedback layers. Variable Luis_Best counts best answers; summary layer at end. Rise alternative: Scenario block.' } },

      { type: 'quote', speaker: 'luis', mood: 'serious',
        text: `I wasn't careless. I was careful in the wrong way.`,
        narration: `I wasn't careless. I was careful in the wrong way. That's the line I want you to remember from Luis.` },

      { type: 'art', src: 'assets/art/m1-luis-mezzanine.svg',
        alt: 'Side-view diagram: a 12 ft mezzanine with an anchor at deck level. Stacked distances below the anchor (6 ft lanyard, 3.5 ft deceleration, 1 ft stretch, 5 ft to boots) reach 15.5 ft, past the slab at 12 ft.',
        caption: `The math nobody did. You'll run this for real in Module 5.`,
        narration: `Here's the math nobody did that day. Six feet of lanyard. Up to three and a half feet for the absorber to rip out. About a foot of harness stretch. And five feet from the D-ring on his back down to his boots. That's fifteen and a half feet below the anchor. The slab was twelve feet down. The system worked perfectly, and it still couldn't win.`,
        sb: { visual: 'Clearance diagram built with shapes and a figure icon; dimension stack animates down from the anchor one segment at a time.', search: 'n/a (custom diagram)', build: 'Storyline: 4 motion paths + text callouts on timeline cue points (synced to narration). Rise: Image block with caption.' } },

      { type: 'callout', variant: 'receipt', title: 'The receipt',
        body: `A personal fall arrest system has to be rigged so a worker can't free fall more than 6 feet <b>or contact any lower level</b>. Tied off isn't the test. Stopping before the floor is.`,
        cite: '1926.502(d)(16)(iii)',
        narration: `And here's the rule behind it. A fall arrest system has to be rigged so you can't free fall more than six feet, and so you can't hit the level below. Luis's system broke both.` },

      { type: 'video', media: 'vid_m1',
        caption: `Luis is a composite. The workers in this video are not.`,
        watchFor: `Listen for the moment each person realized the setup was wrong. It's almost always after, not before.`,
        narration: `Luis is a composite of a lot of real stories. The people in this next video are real. Listen for when each of them realized something was wrong. It's almost always after.`,
        sb: { visual: 'Embedded YouTube video: real fall survivor / prevention story.', search: 'n/a (web video)', build: 'Rise: Multimedia > Embed block. Storyline: Web Object.' } },

      { type: 'continue', label: 'Next: myths we all grew up with' }
    ] },

    /* ------------------------------------------------------------------ */
    { id: 'm1-l2', title: 'Myth or field truth', minutes: 6, blocks: [
      { type: 'text', heading: 'Call it before you flip it',
        body: `You've heard all of these on a jobsite. For each card, decide: myth or field truth? Then flip it.`,
        narration: `You've heard every one of these on a jobsite. Some of them you've probably said. Call each one before you flip it.` },

      { type: 'cards', mode: 'myth', title: 'Myth or field truth?',
        cards: [
          { front: `"Experienced guys don't fall."`, verdict: 'myth',
            back: `Experience makes you faster and more comfortable at the edge. Comfort is the problem. Luis had fifteen years in.` },
          { front: `"A short fall can't kill you."`, verdict: 'myth',
            back: `People die falling one story: off ladders, roofs and deck edges. How you land matters more than how high. A head strike on concrete from 8 feet can do it.` },
          { front: `"If I'm tied off, I'm safe."`, verdict: 'myth',
            back: `Tied off to what? With what? Over how much clearance? Luis was tied off.`, cite: '1926.502(d)(16)' },
          { front: `"A guardrail beats a harness."`, verdict: 'truth',
            back: `Guardrails protect everyone, all day, and nobody has to do anything right at the moment they slip. Passive protection first.`, cite: '1926.502(b)' },
          { front: `"Caution tape around a hole is fall protection."`, verdict: 'myth',
            back: `Tape is a warning, not a barrier. You need a rail that holds 200 lb, or a cover that's secured, rated for twice the load, and marked.`, cite: '1926.502(i)' },
          { front: `"Once the harness catches you, you're fine."`, verdict: 'myth',
            back: `Now you're hanging. Suspension can make a worker pass out within minutes. The plan to get them down has to exist before the fall.`, cite: '1926.502(d)(20)' }
        ],
        narration: `Flip them one at a time. Notice which ones you got wrong. Those are the ones your crew believes too.`,
        sb: { visual: 'Six flip cards. Front: quote in big condensed type. Back: verdict stamp (MYTH in red / FIELD TRUTH in green) plus 1-2 lines.', search: 'construction worker talking', build: 'Rise: Flashcards block (6 cards). Storyline: card states Normal/Flipped, verdict stamp graphic.' } },

      { type: 'mcq', id: 'm1-q-luis-core',
        question: `Back to Luis. He was tied off with a 6-ft shock-absorbing lanyard to an anchor at his feet, 12 feet above the slab. What was the core failure?`,
        options: [
          { text: `He didn't tie off correctly.`, correct: false, fb: `He clipped a rated lanyard to an anchor. The connection was fine. The setup wasn't.` },
          { text: `The system needed more clearance than the height he was working at.`, correct: true, fb: `Exactly. The system needed over 15 feet below the anchor and he had 12.` },
          { text: `The shock absorber failed.`, correct: false, fb: `It deployed exactly as designed. That's part of why he dropped so far.` }
        ],
        explain: `Foot-level anchor plus a 6-ft lanyard means a long free fall, then deceleration, harness stretch and his own height below the D-ring. The total ran past the slab.`,
        cite: '1926.502(d)(16)(iii)',
        sb: { build: 'Storyline pick-one, 3 feedback layers. Unscored practice.' } },

      { type: 'callout', variant: 'field-check', title: 'Field check',
        body: `Which of those six cards would get the biggest argument on your crew? Who on your site would argue it?`,
        input: true,
        narration: `Think about your own crew. Which card would start the biggest argument at your tailgate? And who would be the one arguing?` }
    ] },

    /* ------------------------------------------------------------------ */
    { id: 'm1-l3', title: 'A hundred times', minutes: 8, blocks: [
      { type: 'text', heading: 'Riverside, Level 3, 9:40 a.m.',
        body: `The crane is landing bundles of deck sheets at the east edge. The perimeter cable is up. Ray isn't behind it.`,
        narration: `Back to Riverside. It's nine-forty on Level 3. The crane is landing bundles of deck sheets at the east edge. The perimeter cable is up. Ray is on the wrong side of it.` },

      { type: 'art', src: 'assets/art/m1-hundred-times.svg',
        alt: 'Side view of the Level 3 deck edge: Ray stands outside the perimeter cable at the slab edge reaching for a crane-suspended bundle; Dee holds a tag line inside the cable; Tasha watches from the deck.',
        caption: `Ray, outside the cable. Dee, on the tag line. Tasha, deciding what to say.`,
        sb: { visual: 'Deck-edge illustration (assets/art/m1-hundred-times.svg).', search: 'crane lifting load construction site deck edge', build: 'Storyline: base slide image; Ray character state "reaching".' } },

      { type: 'dialogue', title: 'At the east edge',
        lines: [
          { speaker: 'ray', text: `Dee, keep tension on that tag line. I'll catch the corner.` },
          { speaker: 'tasha', text: `Ray. You're outside the cable.` },
          { speaker: 'ray', text: `Done this a hundred times. Bundle swings, I walk it in. Thirty seconds.` },
          { speaker: 'dee', text: `Want me to come out and get the other corner?` },
          { speaker: 'ray', text: `No. You stay inside the cable. You're new.` },
          { speaker: 'tasha', text: `(to myself) He just told the apprentice the rule. Then showed her the real one.` }
        ],
        narration: `Listen to what Ray tells Dee. Stay inside the cable, you're new. He knows the rule. He's just decided it's for other people.`,
        sb: { visual: 'Chat bubbles with avatars, one line per tap.', search: 'n/a', build: 'Storyline dialogue: Next button advances; character states (Ray: confident; Tasha: concerned).' } },

      { type: 'scenario', id: 'm1-hundred', title: 'What do you say?',
        intro: `Next pick is already in the air. You have about ten seconds.`,
        start: 'n1',
        nodes: {
          n1: { speaker: 'tasha', art: 'assets/art/m1-hundred-times.svg',
            text: `The next bundle is coming over. Ray is reaching for the hook line. What do I say?`,
            choices: [
              { text: `Nothing. He's the foreman with 28 years. Pick your battles.`, next: 'end_silent', tone: 'bad', fb: `Silence is a decision too. Dee just watched you make it.` },
              { text: `"Ray, back inside the cable. Now."`, next: 'n2', tone: 'ok', fb: `Clear and direct. Let's see how he takes it.` },
              { text: `Signal the operator to hold the load, then: "Ray, Dee is learning this job from you. Let's land these back from the edge."`, next: 'n3', tone: 'good', fb: `You stopped the hazard first, then made it about the crew, not about Ray.` }
            ] },
          n2: { speaker: 'ray',
            text: `"In a minute, Tasha. I've got it." The bundle is ten feet out and swinging.`,
            choices: [
              { text: `Let it go. He said a minute.`, next: 'end_minute', tone: 'bad', fb: `A minute outside the cable is the whole risk.` },
              { text: `Signal the operator to hold, and walk over: "Load's holding. Come inside and we'll move the landing spot."`, next: 'n3', tone: 'good', fb: `You stopped the load, which takes the pressure off, then gave him a way to fix it.` }
            ] },
          n3: { speaker: 'ray',
            text: `Ray steps back inside, annoyed. "So where do you want 'em? There's no room back there."`,
            choices: [
              { text: `"Set two 4x4 dunnage lines 8 feet back. Tag lines on both corners. Nobody reaches past the cable."`, next: 'end_good', tone: 'good', fb: `Specific, doable, and nobody has to cross the cable.`, cite: '1926.501(b)(1)' },
              { text: `"I don't know. Just don't go outside the cable."`, next: 'end_ok', tone: 'ok', fb: `Right goal, no plan. Ray will fill that gap with the old habit.` }
            ] },
          end_good: { end: true, outcome: 'good', title: 'Four minutes, and a new landing spot',
            text: `The pick took four extra minutes. Ray grumbled about "babysitting." Dee ran the second tag line, inside the cable, and asked you after lunch why Ray goes outside. That conversation is the real win.`,
            cite: '1926.501(b)(1)' },
          end_ok: { end: true, outcome: 'ok', title: 'Back inside, for today',
            text: `Ray stays inside for this pick. Tomorrow there's still no landing plan, so he's back on the edge by the third bundle. You fixed the moment, not the setup.` },
          end_minute: { end: true, outcome: 'bad', title: 'Nothing happened',
            text: `He walked the bundle in. Nothing happened. That's the problem: now it's a hundred and one. And Dee heard you ask, then let it go.` },
          end_silent: { end: true, outcome: 'bad', title: 'The lesson Dee learned',
            text: `Nothing happened today. Dee learned that the cable is for new people and that the competent person doesn't say anything to the foreman. Both of those lessons last longer than this pour.` }
        },
        narration: `Your call. The next pick is already coming. What do you say to Ray?`,
        sb: { visual: 'Deck-edge scene; character avatars per node; outcome banners.', search: 'construction crane load tag line', build: 'Storyline branching: 3 decision slides, 4 ending slides. Variable Ray_Thread (good/ok/bad) is read again in M8 to show "what Tasha could have said".' } },

      { type: 'callout', variant: 'note', title: 'This thread isn\'t over',
        body: `Ray's shortcut has worked 99 times. Keep watching it. It comes back in Modules 3, 4, 5, 6 and 8.`,
        narration: `Remember this spot. Ray's shortcut is going to keep showing up.` },

      { type: 'timeline', title: 'How a shortcut becomes "the way we do it"',
        items: [
          { label: 'Time 1', title: '"Just this once."', body: `It feels wrong. You're quick about it.` },
          { label: 'Time 10', title: '"I\'m careful."', body: `Nothing happened, so the risk feels smaller. It isn't.` },
          { label: 'Time 50', title: '"That\'s how we do it."', body: `Nobody remembers it was ever a shortcut.` },
          { label: 'Time 99', title: '"The new guy does it too."', body: `Now it's training. Dee is watching.` },
          { label: 'Time 100', title: '?', body: `The odds were the same every single time. Only the luck ran out.` }
        ],
        narration: `This is how it goes. The first time, it feels wrong. By the tenth, nothing's happened, so it feels safe. By the fiftieth, nobody remembers it was a shortcut. By the ninety-ninth, the apprentice is doing it. The odds never changed. Only the luck did. There's a name for this: normalization of deviance. Every time it works, we get more sure of it, and nothing about the edge has changed.`,
        sb: { build: 'Rise: Timeline block (5 entries).' } }
    ] },

    /* ------------------------------------------------------------------ */
    { id: 'm1-l4', title: 'Four mindsets in your crew', minutes: 6, blocks: [
      { type: 'text', heading: 'Same edge, four excuses',
        body: `Every unsafe setup comes with a sentence. Sort what you hear at Riverside into the mindset behind it.`,
        narration: `Every unsafe setup on a job comes with a sentence that makes it sound fine. Let's sort what people say at Riverside into the mindset behind it.` },

      { type: 'sort', id: 'm1-mindsets', title: 'Name the mindset',
        prompt: `Tap a line, then tap the mindset behind it.`,
        buckets: [
          { id: 'norm', label: 'Normalization', hint: `"We've always done it this way."` },
          { id: 'opt', label: 'Won\'t happen to me', hint: `"I'm careful."` },
          { id: 'prod', label: 'Production pressure', hint: `"We're behind."` },
          { id: 'cult', label: 'Crew culture & pride', hint: `"Harnesses are for rookies."` }
        ],
        items: [
          { text: `"That cable's been down a week. Nobody's gone over."`, bucket: 'norm', fb: `A week without a fall turned an open edge into normal.` },
          { text: `"We always land deck bundles right at the edge."`, bucket: 'norm', fb: `"Always" is the giveaway.` },
          { text: `"I've got good balance. I'm not some kid."`, bucket: 'opt', fb: `Skill doesn't change the drop. Luis had balance too.` },
          { text: `"I'm up there two minutes. Not worth the harness."`, bucket: 'opt', fb: `A fall takes under a second. Two minutes is plenty.` },
          { text: `"Pump's here at seven. Pull the rail, we'll put it back after."`, bucket: 'prod', fb: `The schedule is real. So is the open edge for the whole pour.` },
          { text: `"Owner walk is Thursday. Whatever it takes."`, bucket: 'prod', fb: `"Whatever it takes" usually means "whatever we skip."` },
          { text: `"Real hands don't need to clip in to set a box."`, bucket: 'cult', fb: `Pride makes protection look like weakness.` },
          { text: `"Dee, don't be the one slowing us down asking about tie-off."`, bucket: 'cult', fb: `This one teaches the apprentice to stay quiet. That's the dangerous part.` }
        ],
        sb: { visual: 'Eight speech-bubble cards; four labeled bins.', search: 'construction crew talking', build: 'Storyline drag-and-drop: 8 drag items, 4 drop targets, per-item feedback layer, Submit enables when all placed.' } },

      { type: 'tabs',
        items: [
          { title: 'Normalization', body: [`<b>Sounds like:</b> "We've done it this way for 20 years."`, `<b>What you do:</b> Ask "What's different today?" New crew, wet deck, wind, a rail that got moved. Then fix the setup, not the person.`] },
          { title: 'Won\'t happen to me', body: [`<b>Sounds like:</b> "I'm careful."`, `<b>What you do:</b> Don't argue skill. Talk physics: "Careful doesn't change how far it is to the slab." Luis was careful.`] },
          { title: 'Production pressure', body: [`<b>Sounds like:</b> "Just get it done, we're behind."`, `<b>What you do:</b> Bring the fix with the problem. "Ten minutes to reset the rail, or the pour stops for the day if someone goes over."`] },
          { title: 'Crew culture', body: [`<b>Sounds like:</b> "Harnesses are for rookies."`, `<b>What you do:</b> Make protecting the crew the pro move. The best hands are the ones the new guys copy. Ask them to set the example on purpose.`] }
        ],
        narration: `Naming the mindset is half of it. The other half is what you say back. Open each tab. You'll practice these for real in Module 8, with Marco and Ray pushing back.`,
        sb: { build: 'Rise: Tabs block (4 tabs). Each tab: "Sounds like" + "What you do".' } },

      { type: 'reflect', id: 'm1-gut-shortcut',
        prompt: `Gut check: What's one shortcut on your site that everybody accepts?`,
        placeholder: `Only you see this. Be specific: where, who, how often.`,
        narration: `Gut check. Only you will see this. What's one shortcut on your site that everybody just accepts? Be specific.`,
        sb: { build: 'Rise: Text entry is not native; use Storyline text-entry (variable GutCheck_M1) embedded, or a Rise Knowledge Check (open-ended, ungraded).' } },

      { type: 'callout', variant: 'monday', title: 'Monday',
        body: `Find one "we always do it this way" on your site. Don't fix it yet. Write down where it is, who does it, and which of the four mindsets is holding it in place. You'll fix it in Module 8.`,
        narration: `Here's your Monday job. Find one "we always do it this way." Don't fix it yet. Just write down where it is, who does it, and which of the four mindsets is keeping it there. We'll come back to it.` }
    ] }
  ],

  kc: { title: 'Knowledge check: Module 1', questions: [
    { question: `Ray says he's stepped outside the cable "a hundred times" without a problem. What does that history tell you about the risk on the 101st time?`,
      options: [
        { text: `It's lower. He's proven he can do it.`, correct: false, fb: `Past luck isn't proof. The edge and the drop are the same every time.` },
        { text: `Nothing good. The hazard is the same each time; the history just makes everyone stop seeing it.`, correct: true, fb: `That's normalization: success makes the risk invisible.` },
        { text: `It's fine as long as he's the only one doing it.`, correct: false, fb: `Dee is already watching him.` }
      ],
      explain: `Normalization of risk: each time a shortcut works, the crew becomes more confident even though the exposure hasn't changed.`, cite: '1926.501(b)(1)' },
    { question: `A worker is tied off with a 6-ft shock-absorbing lanyard to an anchor at foot level, 12 ft above a slab. Is the worker protected?`,
      options: [
        { text: `Yes. A rated lanyard and anchor are in use.`, correct: false, fb: `Rated parts can still be rigged so they can't stop you in time.` },
        { text: `No. The system needs about 15.5 ft below the anchor before the boots stop, plus a margin. The slab is at 12 ft.`, correct: true, fb: `Right. The worker would hit the lower level.` },
        { text: `Only if the lanyard is brand new.`, correct: false, fb: `New or old, the geometry is the problem.` }
      ],
      explain: `Lanyard 6 + deceleration 3.5 + harness stretch 1 + D-ring to boots 5 = 15.5 ft below a foot-level anchor. A PFAS must prevent contact with any lower level.`, cite: '1926.502(d)(16)(iii)' },
    { question: `Marco says, "Pull the rail for the pump hose, we'll put it back after the pour." Which mindset is that?`,
      options: [
        { text: `Production pressure`, correct: true, fb: `Yes. The schedule is driving the decision.` },
        { text: `Crew culture`, correct: false, fb: `Not this time. Nobody's talking pride. It's the clock.` },
        { text: `Optimism bias`, correct: false, fb: `Close, but the driver is the pump schedule, not "it won't happen to me."` }
      ],
      explain: `Production pressure: the schedule becomes the reason to accept an open edge. Answer it with a fix that costs minutes, not with a lecture.`, cite: '1926.501(b)(1)' },
    { question: `A hole in the Level 3 deck is surrounded by caution tape. What does that do for fall protection?`,
      options: [
        { text: `It meets the rule if the tape is at 42 inches.`, correct: false, fb: `Tape can't hold 200 pounds. Height isn't the issue.` },
        { text: `Nothing. It's a warning. The hole needs a secured, marked cover rated for twice the load, or a real guardrail.`, correct: true, fb: `Right. Tape doesn't stop anybody.` },
        { text: `It's fine for holes under 6 feet across.`, correct: false, fb: `Size doesn't make tape a barrier.` }
      ],
      explain: `Covers must support twice the weight of workers, equipment and materials, be secured and be marked HOLE or COVER. Guardrails must hold 200 lb.`, cite: '1926.502(i)' }
  ] }
});
