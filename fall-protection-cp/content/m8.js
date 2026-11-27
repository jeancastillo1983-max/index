/* ==========================================================================
   Module 8 — Leading the crew: training, pressure and stop work (35 min · Storyline)
   Objectives: deliver and document training under 1926.503; stop unsafe work
   and hold the line under schedule pressure; run a five-minute toolbox talk.
   The "100 times" thread ends here (Ray's near miss).
   ========================================================================== */
COURSE.addModule({
  id: 'm8', num: 8, title: 'Leading the crew: training, pressure and stop work', minutes: 35,
  build: 'Storyline',
  tagline: 'Knowing the rule was never the hard part. Saying it out loud is.',
  hero: 'img_m8_hero',
  objectives: [
    'Deliver and document worker training under 1926.503, including written certification and retraining triggers.',
    'Stop unsafe work and hold the line under schedule pressure.',
    'Run a five-minute toolbox talk that changes behavior.'
  ],
  citations: ['29 CFR 1926.503(a)', '29 CFR 1926.503(b)', '29 CFR 1926.503(c)', '29 CFR 1926.32(f)', '29 CFR 1926.501(b)(1)', '29 CFR 1926.501(b)(14)', '29 CFR 1926.502(h)', 'ANSI/ASSP Z359.2', 'ANSI/ASSP Z490.1'],
  jobAids: [
    { title: 'Stop-work scripts', file: 'jobaids/stop-work-scripts.html', pdf: 'jobaids/pdf/stop-work-scripts.pdf',
      desc: 'The five-step script plus word-for-word answers to the schedule push, the pride push and “not your guys”.' },
    { title: 'Fall protection training certification record', file: 'jobaids/training-certification-record.html', pdf: 'jobaids/pdf/training-certification-record.pdf',
      desc: 'A compliant 1926.503(b) record with topic checklist and retraining log.' },
    { title: 'Five-minute toolbox talk template', file: 'jobaids/toolbox-talk-template.html', pdf: 'jobaids/pdf/toolbox-talk-template.pdf',
      desc: 'Story, hazard, commitment, questions, sign-in.' }
  ],
  lessons: [

    /* ------------------------------------------------------------------ */
    { id: 'm8-l1', title: 'Round 1: Marco and the schedule', minutes: 8, blocks: [
      { type: 'hero', kicker: 'Module 8 · Leading the crew', title: 'Training, pressure and stop work',
        text: `Three rounds. A superintendent with a schedule, a foreman with 28 years, and a sub who says it’s not your business.`,
        media: 'img_m8_hero',
        narration: `This module is the hard part. Not the rules. You know the rules by now. This is about what you say when the superintendent is staring at his watch, when the foreman with twenty-eight years in is staring at you, and when another company's crew tells you to mind your own business.`,
        sb: { visual: 'Photo: crew huddle around a tailgate, superintendent with radio.', search: 'construction crew meeting superintendent', build: 'Rise: Banner opener; Storyline dialogue sims embedded below.' } },

      { type: 'quote', speaker: 'marco', mood: 'pushback',
        text: `Concrete’s on the road. Truck two is ten minutes out. We lose this pour, we lose two days. Put the rail back after.`,
        narration: `Nine forty a.m. The pump operator pulled the north side cable rail to run the hose. Marco wants the pour to go now, rail or no rail.` },

      { type: 'scenario', id: 'm8-round-marco', title: 'Crew talk, round 1: the schedule push',
        intro: `Level 3, north bay. The perimeter cable is down for the pump hose. Three trucks are coming. Marco is not a villain. He’s got the owner on the phone every day.`,
        start: 'r1',
        narration: `Pick what Tasha says. Remember, Marco isn't the bad guy. He answers to an owner who calls him every morning. He'll listen to the right argument.`,
        sb: { visual: 'Dialogue sim: Marco (pushback pose) on deck with pump hose crossing open edge in background.', search: 'construction superintendent radio; concrete pump hose deck', build: 'Storyline: dialogue sim. Each response choice → Marco reaction layer (character state change), then outcome slide. Track variable R1_Result.' },
        nodes: {
          r1: { speaker: 'marco',
            text: `“We lose this pour, we lose two days. Put the rail back after.” Dee and two laborers are about to drag hose along the open edge.`,
            choices: [
              { text: `“Marco, if somebody goes over that edge we don’t lose two days, we lose this job for weeks. Give me 15 minutes and two guys: we re-hang the cable with a hose gap gate, and the pour goes.”`, next: 'r1b', tone: 'good',
                fb: `You talked schedule, not scripture, and you brought a fix with a time on it. That’s the argument Marco can say yes to.` },
              { text: `“That’s an OSHA violation, 1926.501. I’m not doing it.”`, next: 'r1law', tone: 'ok',
                fb: `You’re right on the rule. But a citation number is not an argument to a guy with three trucks on the road.` },
              { text: `“Okay. Everybody just stay back from the edge.”`, next: 'r1bad', tone: 'bad',
                fb: `“Stay back” isn’t protection. The hose goes where the hose goes, and so does Dee.` }
            ] },
          r1b: { speaker: 'marco',
            text: `Marco looks at the trucks, then at you. “Fifteen. Not sixteen. And who’s paying for a gate section?”`,
            choices: [
              { text: `“We’ve got two spare cable sections and a gate at the hoist landing. Ray and I will swing it now. I’ll call you when it’s up.”`, next: 'r1good', tone: 'good',
                fb: `Specific, fast, and you own the follow-up. Marco gets his pour.` },
              { text: `“That’s not my problem. Safety comes first.”`, next: 'r1meh', tone: 'ok',
                fb: `True, and it just cost you the goodwill you earned ten seconds ago.` }
            ] },
          r1law: { speaker: 'marco',
            text: `“Then tell OSHA to pour my concrete.” Marco gets on the radio to the safety manager. Everybody stands around while the trucks stack up.`,
            choices: [
              { text: `Get off the rulebook: “Marco, I don’t want to stop your pour. Give me 15 minutes to re-hang that cable with a hose gate and it goes.”`, next: 'r1good', tone: 'ok',
                fb: `Recovered. The fix with a time on it is what moved him, not the citation.` }
            ] },
          r1good: { end: true, outcome: 'good', title: 'Rail up in 12 minutes, pour goes',
            text: `The cable is back with a gate at the hose. Truck two waits four minutes. Marco says nothing, which from Marco is a thank-you. Next pour, he asks you where the hose should cross before the pump shows up.`, cite: '1926.501(b)(1)' },
          r1meh: { end: true, outcome: 'ok', title: 'Rail up, relationship down',
            text: `The rail goes back and the pour goes. But Marco now thinks “safety” means “no.” Next time he won’t call you first. He’ll work around you. Win the edge and the relationship.`, cite: '1926.32(f)' },
          r1bad: { end: true, outcome: 'bad', title: 'Two hours at an open edge',
            text: `The pour goes. Dee spends two hours dragging hose within a step of a 28-ft drop. Nothing happens, this time. You just taught the crew that the cable comes down whenever the schedule says so.`, cite: '1926.501(b)(1)' }
        } },

      { type: 'tabs',
        items: [
          { title: 'What moves Marco', body: `Schedule risk of a fall (the job stops for weeks). A fix with a time on it. The owner’s own safety requirements. You owning the follow-up.` },
          { title: 'What doesn’t', body: `Citation numbers read like a rulebook. “Safety first” with no fix. Lectures in front of the crew. Saying no without saying how.` },
          { title: 'Your authority', body: `As the competent person you’re authorized to take prompt corrective measures. That’s the second half of the definition, and the reason you got the job. <cite>1926.32(f)</cite>` }
        ],
        narration: `Here's what I learned about Marco. He moves for schedule risk, for a fix with a time on it, and for someone who'll own the follow-up. He doesn't move for citation numbers. And remember, the authority to fix it is part of the definition of your job.`,
        sb: { visual: 'Three tabs with icons: clock, x, badge.', search: 'superintendent schedule board', build: 'Rise: Tabs block.' } },

      { type: 'continue', label: 'Round 2' }
    ] },

    /* ------------------------------------------------------------------ */
    { id: 'm8-l2', title: 'Round 2: Ray and pride', minutes: 7, blocks: [
      { type: 'text', heading: 'The pride push',
        body: [`10:30 a.m. Ray is clipped to the perimeter guardrail cable while he plumbs a column. You saw it. So did Dee.`,
               `A guardrail is built to stop someone leaning on it, not to catch a falling body.`],
        narration: `Ten thirty. Ray is clipped to the guardrail cable while he plumbs a column. We talked about this in Module 5: guardrails aren't anchors. You saw it. So did Dee. And Dee does what Ray does.` },

      { type: 'quote', speaker: 'ray', mood: 'pushback',
        text: `I was tying off before you were born. You’re gonna tell me how to do my job?`,
        narration: `Ray says it loud enough for the whole deck to hear.` },

      { type: 'scenario', id: 'm8-round-ray', title: 'Crew talk, round 2: the pride push',
        intro: `How you say it decides whether Ray changes for the day, or for good.`,
        start: 'p1',
        narration: `Same rule, harder conversation. How you say it decides whether Ray fixes it while you're watching, or for good.`,
        sb: { visual: 'Dialogue sim: Ray (arms crossed) at column; Dee in background watching.', search: 'veteran construction worker arms crossed', build: 'Storyline: dialogue sim with Ray state changes (pushback → neutral → proud). Variable R2_Result.' },
        nodes: {
          p1: { speaker: 'ray',
            text: `“I was tying off before you were born. You’re gonna tell me how to do my job?” The crew stops to watch.`,
            choices: [
              { text: `Walk over, keep it low: “Ray, you’ve forgotten more than I know. That cable’s built for someone leaning on it, not a falling body. Dee copies everything you do. Help me show her where the beam clamp goes?”`, next: 'p2', tone: 'good',
                fb: `Private, respectful, specific, and you gave him a role. Pride turned into teaching.` },
              { text: `In front of the crew: “Ray, that’s a violation. Next time it’s a write-up.”`, next: 'ppublic', tone: 'bad',
                fb: `Now he can’t back down without losing face in front of his crew.` },
              { text: `Let it go. He’s earned some slack, and you need him on your side.`, next: 'plet', tone: 'bad',
                fb: `Slack for Ray is a lesson for Dee.` }
            ] },
          p2: { speaker: 'ray',
            text: `Ray grumbles, unclips, and walks Dee to the beam clamp. “Overhead, kid. Not the cable. Don’t tell her I said she was right.”`,
            choices: [
              { text: `Thank him later, privately, and tell him he’s the one the crew watches.`, next: 'pgood', tone: 'good',
                fb: `Recognition sticks better than correction.` }
            ] },
          pgood: { end: true, outcome: 'good', title: 'Ray teaches it',
            text: `Dee hears the rule from Ray, which counts for ten times more than hearing it from you. You kept the line and kept the foreman.`, cite: '1926.502(d)(23)' },
          ppublic: { end: true, outcome: 'bad', title: 'Compliance while you watch',
            text: `Ray unclips and moves, slowly, while everyone watches. An hour later you see him back on the cable. The crew learned the rule only matters when the CP is looking.`, cite: '1926.502(d)(23)' },
          plet: { end: true, outcome: 'bad', title: 'Dee learned it from Ray',
            text: `That afternoon, Dee clips her lanyard to the same cable. When you ask why, she says, “Ray does it.” Nobody told her otherwise.`, cite: '1926.502(d)(23)' }
        } },

      { type: 'callout', variant: 'tip', title: 'Respect is a tool, not a soft skill',
        body: `The best hands protect their crew. Frame the fix as something they’re good at, not something they did wrong. Do it privately, and give them the teaching role.`,
        narration: `Respect isn't a soft skill out here. It's a tool. The best hands on any crew protect their people. Give them that role, privately, and watch what happens.` },

      { type: 'continue', label: 'Round 3' }
    ] },

    /* ------------------------------------------------------------------ */
    { id: 'm8-l3', title: 'Round 3: “Not your guys”', minutes: 6, blocks: [
      { type: 'scenario', id: 'm8-round-sub', title: 'Crew talk, round 3: “Not your guys, not your problem.”',
        intro: `Level 2. A curtain wall sub’s worker is leaning out a window opening, sill 18 in off the floor, 14 ft to grade. No tie-off. Your crew walks past that opening all day.`,
        start: 's1',
        narration: `Level two. A curtain wall worker is leaning out of a window opening. The sill is eighteen inches off the floor and it's fourteen feet to the ground. No tie-off. His foreman sees you looking.`,
        sb: { visual: 'Dialogue sim: sub foreman (crew avatar) at window opening; worker leaning out.', search: 'curtain wall installation window opening', build: 'Storyline: dialogue sim; sub foreman uses generic crew character. Variable R3_Result.' },
        nodes: {
          s1: { speaker: 'narrator',
            text: `The sub’s foreman steps in front of you: “Not your guys, not your problem. We’ve got our own safety program.”`,
            choices: [
              { text: `“I hear you. But he’s exposed right now, on my deck, where my crew walks. Have him step back from the opening. Let’s get your foreman and Marco and fix it. I can loan you two SRLs and a beam clamp until yours show up.”`, next: 'sgood', tone: 'good',
                fb: `Stop the exposure first, then solve it with them, and offer the gear. Hard to argue with help.` },
              { text: `Walk away and mention it to Marco at lunch.`, next: 'slate', tone: 'bad',
                fb: `Three more hours of a man leaning out a 14-ft opening.` },
              { text: `“Then pack it up. You’re off my site.”`, next: 'sfight', tone: 'ok',
                fb: `You stopped it, but you turned a fix into a fight.` }
            ] },
          sgood: { end: true, outcome: 'good', title: 'Exposure stopped in two minutes',
            text: `The worker steps back. Their foreman takes the SRLs, a little embarrassed. Marco backs you: Riverside’s subcontract gives the GC’s competent person stop-work authority site-wide. (Check your own contracts.)`, cite: '1926.501(b)(14)' },
          slate: { end: true, outcome: 'bad', title: 'Lunch was three hours away',
            text: `By the time Marco hears about it, the sub has set four more panels the same way. Hazards don’t wait for lunch. If someone is exposed, the stop happens now.`, cite: '1926.32(f)' },
          sfight: { end: true, outcome: 'ok', title: 'Stopped, but now it’s a war',
            text: `Their foreman calls his PM, who calls Marco, who spends an hour on the phone. The opening gets protected, eventually. Next time, stop the exposure and offer the fix in the same breath.`, cite: '1926.501(b)(14)' }
        } },

      { type: 'process', title: 'The five-step stop-work script',
        steps: [
          { title: '1. Stop the exposure', body: `“Hold up. Step back from the edge.” Do this first, before any discussion.` },
          { title: '2. Say what you see', body: `Specific, not general: “That cable’s down and the hose is right at the edge.”` },
          { title: '3. Say why it matters to them', body: `Their crew, their schedule, their apprentice watching: “Dee copies you.”` },
          { title: '4. Offer the fix', body: `With a time on it: “Fifteen minutes, two guys, cable back with a gate.”` },
          { title: '5. Follow up', body: `Come back, check it, say thanks. That’s how next time gets easier.` }
        ],
        narration: `Every round you just played came down to the same five steps. Stop the exposure. Say what you see. Say why it matters to them. Offer the fix with a time on it. Follow up. The order matters. The exposure stops first.`,
        sb: { visual: 'Five numbered steps, hand-signal icons.', search: 'stop hand signal construction', build: 'Rise: Process block; mirrors stop-work scripts job aid.' } },

      { type: 'continue', label: 'The hundredth time' }
    ] },

    /* ------------------------------------------------------------------ */
    { id: 'm8-l4', title: 'The hundredth time', minutes: 7, blocks: [
      { type: 'text', heading: 'Ray’s shortcut',
        body: `Since Module 1 you’ve watched Ray step outside the cable rail at the Level 3 edge to guide crane loads by hand. It has worked a hundred times. Here’s the next morning’s huddle, in Ray’s words.`,
        narration: `Since Module 1, you've watched Ray step outside the cable at the Level 3 edge to guide crane loads by hand. A hundred times, nothing happened. This is the morning huddle after the hundred and first. Ray asked to tell it himself.` },

      { type: 'story', id: 'm8-ray-story', speaker: 'ray',
        chapters: [
          { title: 'Tuesday, 2:10 p.m.', icon: 'crane',
            text: `Crane’s landing deck bundles on Level 3. I step outside the cable like I always do. One hand on the bundle, one hand on the cable.` },
          { title: 'Somebody pulled a post', icon: 'post',
            text: `A delivery came at noon. Somebody pulled a rail post at the hoist landing to get a pallet jack through. Nobody told me. When I leaned, the cable just gave. Two feet of slack.`,
            choice: { question: `Where would you have stopped this?`,
              options: [
                { text: `At noon: no post comes out without the CP knowing and a replacement in place.`, best: true, fb: `Yes. The rail failed at noon. Ray just found out at 2:10.` },
                { text: `At 2:10, when Ray stepped outside the cable.`, fb: `Also yes, and a hundred times before that. Both stops were available.` },
                { text: `Nowhere. Near misses happen.`, fb: `Near misses happen when the drift goes unchallenged. This one was predictable.` }
              ] } },
          { title: 'The column', icon: 'column',
            text: `I caught the column with my left hand. Dee was ten feet away. She saw the whole thing. Nobody got hurt. I want to be real clear: nobody got hurt because of luck.` },
          { title: 'A hundred times', icon: 'count',
            text: `It worked a hundred times. It only had to not work once. I told myself I’d earned that shortcut. I didn’t earn it. I got lucky a hundred times.` },
          { title: 'What I’m doing now', icon: 'check',
            text: `Tag lines, from inside the rail. Every load. And Tasha tried to tell me back in the spring. I should’ve listened. So, kid, listen to her.` }
        ],
        narration: `Listen to Ray tell it. Chapter by chapter. When you get the question, decide where you would have stopped it.`,
        sb: { visual: 'Chapter cards with icons; illustration m8-near-miss.svg on chapter 3 (sagging cable, hand on column, no injury shown).', search: 'tower crane load landing deck', build: 'Rise: Process block narrated in Ray’s voice; chapter 2 choice as Storyline pick-one layer.' } },

      { type: 'art', src: 'assets/art/m8-near-miss.svg',
        alt: 'Level 3 deck edge: the perimeter cable sags where a post was pulled at the hoist landing; Ray holds a steel column with one hand; a crane bundle hangs above; Dee watches from inside the deck.',
        caption: `Tuesday, 2:10 p.m. One missing post, two feet of slack, one column within reach.` },

      { type: 'text', heading: 'Rewind to Module 1',
        body: `Back in the spring, Tasha saw Ray outside the rail. Here’s what she said then, and what she could have said.`,
        narration: `Now rewind to Module 1. Back in the spring, I saw Ray outside the rail. Here's what I actually said.` },

      { type: 'dialogue', title: 'What Tasha said (spring)',
        lines: [
          { speaker: 'tasha', text: `Ray, be careful out there.` },
          { speaker: 'ray', text: `Always am.` }
        ],
        narration: `Be careful out there. Always am. That's it. That was the whole conversation. It changed nothing.` },

      { type: 'dialogue', title: 'What Tasha could have said',
        lines: [
          { speaker: 'tasha', text: `Ray, hold up a sec. Come inside the rail.` },
          { speaker: 'ray', text: `I’ve done this a hundred times.` },
          { speaker: 'tasha', text: `I know. And Dee’s watching you do it. That cable is all that’s between you and 28 feet, and nobody checks if a post got pulled.` },
          { speaker: 'tasha', text: `Run it with a tag line from inside. I’ll get you one right now.` },
          { speaker: 'ray', text: `…Fine. Get me the tag line.` }
        ],
        narration: `Same moment, five lines. Stop the exposure. Respect what he knows. Make it about Dee. Offer the fix right now. It isn't magic, and Ray still grumbles. But he's inside the rail.`,
        sb: { visual: 'Side-by-side chat bubbles; first version greyed, second version full color.', search: 'two construction workers talking', build: 'Storyline: dialogue reveal, click to advance; compare layer shows both versions.' } },

      { type: 'reflect', id: 'm8-gut-said',
        prompt: `Gut check: what’s the “be careful out there” you said this year that should have been a stop?`,
        placeholder: `The moment, and what you’d say now.`,
        narration: `Gut check, private. Think of one time this year you said be careful, when you should have said hold up.` },

      { type: 'continue', label: 'Training that sticks' }
    ] },

    /* ------------------------------------------------------------------ */
    { id: 'm8-l5', title: 'Training that sticks', minutes: 7, blocks: [
      { type: 'text', heading: 'You’re the trainer now',
        body: [`Every worker who might be exposed to a fall gets trained to recognize the hazards and the procedures to minimize them, by a competent person. <cite>1926.503(a)</cite>`,
               `Then it gets written down. If it isn’t on the record, it didn’t happen.`],
        narration: `Here's the part of the job that nobody mentions when they hand you the sticker. You're the trainer now. Every worker who might be exposed to a fall needs training from a competent person. And it has to be written down.` },

      { type: 'accordion',
        items: [
          { title: 'What the training covers', body: `The fall hazards in their work area; how to erect, maintain, disassemble and inspect the systems they use; how guardrails, PFAS, nets, warning lines, monitors and CAZs work; their role in a fall protection plan; handling and storage of equipment; and the Subpart M standards. <cite>1926.503(a)(2)</cite>` },
          { title: 'What the certification record needs', body: `The worker’s name or other identity, the date(s) of training, and the signature of the person who did the training or the employer. Keep the latest one. <cite>1926.503(b)</cite>` },
          { title: 'When to retrain', body: `When the workplace changes and the old training no longer fits; when the systems or equipment change; or when a worker shows they don’t have the understanding or skill. <cite>1926.503(c)</cite>` }
        ],
        narration: `Three things to know cold. What the training covers. What the written record needs: name, date, signature. And the three triggers for retraining: the workplace changes, the equipment changes, or the worker shows you they didn't get it.`,
        sb: { visual: 'Accordion with icons: book, clipboard, refresh.', search: 'safety training construction classroom', build: 'Rise: Accordion (3).' } },

      { type: 'sort', id: 'm8-retrain', title: 'Retrain or not?',
        prompt: `Tap each situation, then tap where it belongs.`,
        buckets: [
          { id: 'retrain', label: 'Retrain before they go back up', hint: '1926.503(c)' },
          { id: 'no', label: 'Not a retraining trigger by itself' }
        ],
        items: [
          { text: `Roof work switches from guardrails to a warning line with a safety monitor.`, bucket: 'retrain', fb: `New system, new rules. Retrain. <cite>1926.503(c)(2)</cite>` },
          { text: `The crew gets leading-edge SRLs for the first time.`, bucket: 'retrain', fb: `New equipment type. Retrain. <cite>1926.503(c)(2)</cite>` },
          { text: `A worker is seen clipped to the guardrail cable.`, bucket: 'retrain', fb: `Inadequate use shows the training didn’t stick. Retrain. <cite>1926.503(c)(3)</cite>` },
          { text: `A worker can’t explain the clearance for her tie-off point.`, bucket: 'retrain', fb: `Missing understanding. Retrain. <cite>1926.503(c)(3)</cite>` },
          { text: `The deck crew moves from Level 2 to Level 3: same edges, same systems.`, bucket: 'no', fb: `Same hazards, same systems. Brief it at the huddle; formal retraining isn’t triggered.` },
          { text: `It’s been 11 months since training and nothing has changed.`, bucket: 'no', fb: `Subpart M has no calendar trigger. Your company policy may still require a refresher.` }
        ],
        narration: `Sort these. Which ones mean the worker gets retrained before they go back up, and which ones aren't a trigger on their own?`,
        sb: { visual: 'Six situation cards, two bins.', search: 'construction training', build: 'Storyline: drag-and-drop (freeform), correct/incorrect per item with feedback layer.' } },

      { type: 'checkreview', id: 'm8-record-review', title: 'Training record review',
        intro: `This is the fall protection certification log for the Riverside concrete crew. Four entries would not hold up. Find them.`,
        columns: ['Worker', 'Training date(s)', 'Topics', 'Trained by', 'Signature', 'Notes'],
        rows: [
          { cells: ['Dee R.', '03/04/2026', 'Riverside fall hazards, PFAS, guardrails, covers, rescue', 'Tasha G. (CP)', 'T. Greene', '—'] },
          { cells: ['Ray K.', '—', 'Subpart M refresher', 'Tasha G. (CP)', 'T. Greene', '—'],
            error: { text: `No training date. The record must show the date(s) of training.`, cite: '1926.503(b)(1)' } },
          { cells: ['New laborer (drywall sub)', '05/02/2026', 'Fall hazards, PFAS', 'Tasha G. (CP)', 'T. Greene', '—'],
            error: { text: `No name or other identity for the worker. “New laborer” could be anyone.`, cite: '1926.503(b)(1)' } },
          { cells: ['Sam O.', '03/04/2026', 'Riverside fall hazards, PFAS, guardrails, covers, rescue', 'Tasha G. (CP)', 'T. Greene', '—'] },
          { cells: ['Andre W.', '04/11/2026', 'Watched harness video', 'Self-study', '—', '—'],
            error: { text: `Not trained by a competent person, and nobody signed it.`, cite: '1926.503(a)(2), (b)(1)' } },
          { cells: ['Marisol P.', '02/15/2026', 'Riverside fall hazards, PFAS, nets, rescue', 'Jordan (Safety mgr)', 'J. Ortiz', '—'] },
          { cells: ['Kevin T.', '01/20/2025', 'Fall hazards, PFAS', 'Tasha G. (CP)', 'T. Greene', 'Clipped to guardrail cable 05/14/2026'],
            error: { text: `Observed misuse with no retraining recorded. He needs retraining before going back up.`, cite: '1926.503(c)(3)' } }
        ],
        findCount: 4,
        narration: `Here's the actual log for the concrete crew. Four of these entries wouldn't survive an inspector. Click the rows you'd send back.`,
        sb: { visual: 'Clipboard log table; flagged rows highlight red with sticky note feedback.', search: 'clipboard training log', build: 'Storyline: table built in shapes; each row a button with Selected state; Submit compares to correct set (4 rows) and reveals feedback layer per row.' } },

      { type: 'toolbox', id: 'm8-toolbox', title: 'Toolbox talk builder: five minutes that change behavior',
        stories: [
          { id: 'ray', label: `Ray’s hundredth time`, text: `Tuesday, Ray stepped outside the cable rail on Level 3 like he’d done a hundred times. Somebody had pulled a post at noon. The cable gave two feet and Ray caught the column. Nobody got hurt, and it was luck.` },
          { id: 'luis', label: `Luis’s lanyard`, text: `Luis was tied off, 6-foot lanyard, anchor at his feet, on a 12-foot mezzanine. He did everything he thought was right and still hit the slab, because the lanyard needed more room than the height he had.` },
          { id: 'dee', label: `Dee hanging`, text: `When Dee went over the edge, her SRL caught her. Then the clock started. The lift was ready because somebody checked it at 6:45. That check saved most of the rescue.` }
        ],
        hazards: [
          { id: 'posts', label: 'Pulled rail posts and open edges', text: `Guardrail gets pulled for a hose, a delivery or a pallet jack, and nobody puts it back. Any time a rail comes down, the CP knows and a replacement goes up before anyone works there.` },
          { id: 'holes', label: 'Holes and covers', text: `A cover that isn’t secured and marked HOLE or COVER is just a piece of plywood waiting to get kicked aside. If you move a cover, you put it back and fasten it.` },
          { id: 'anchors', label: 'Anchors and clearance', text: `Tie-off points at your feet double your free fall and can put you on the floor below. Overhead anchors and SRLs, and ask me for the clearance math if you’re not sure.` },
          { id: 'rescue', label: 'Rescue readiness', text: `If you hang, we have minutes. The lift, the keys, the rescue kit and the people get checked every morning before anybody goes to an edge.` }
        ],
        commitments: [
          { id: 'c1', label: 'No rail comes down without the CP', text: `Starting today: no guardrail post or cable comes down unless I know about it and a replacement is in place before anyone works there.` },
          { id: 'c2', label: 'Covers fastened and marked', text: `Starting today: every cover gets fastened and marked the moment it’s placed. If you see one that isn’t, fix it or call me.` },
          { id: 'c3', label: 'Overhead anchors only', text: `Starting today: overhead anchors or SRLs only. Nobody ties off at their feet without me checking the clearance.` },
          { id: 'c4', label: 'Rescue check at huddle', text: `Starting today: every morning huddle ends with the rescue check — lift, keys, kit, names.` }
        ],
        narration: `Last tool for this module. Five minutes, three parts: a story, a hazard, a commitment. Pick one of each and the builder writes the talk. Read it out loud once before you give it.`,
        sb: { visual: 'Three columns of choice chips; script appears on a clipboard with copy button.', search: 'toolbox talk construction crew', build: 'Storyline: three pick-one sets → text variables Story, Hazard, Commitment; script layer concatenates with references. Rise alt: download template.' } },

      { type: 'download', title: 'Stop-work scripts',
        desc: `Word-for-word answers to the schedule push, the pride push and “not your guys”.`,
        file: 'jobaids/stop-work-scripts.html', pdf: 'jobaids/pdf/stop-work-scripts.pdf' },
      { type: 'download', title: 'Training certification record',
        desc: `A compliant 1926.503(b) record with topic checklist and retraining log.`,
        file: 'jobaids/training-certification-record.html', pdf: 'jobaids/pdf/training-certification-record.pdf' },
      { type: 'download', title: 'Five-minute toolbox talk template',
        desc: `Story, hazard, commitment, questions, sign-in sheet.`,
        file: 'jobaids/toolbox-talk-template.html', pdf: 'jobaids/pdf/toolbox-talk-template.pdf' },

      { type: 'video', media: 'vid_m8',
        caption: `Leading a safety stand-down or toolbox talk.`,
        watchFor: `Watch how the leader opens. Is it a story or a rule? Which one would your crew remember?`,
        narration: `Watch how this talk opens. Story or rule? Ask yourself which one your crew would still remember on Friday.`,
        sb: { visual: 'Embedded YouTube video with poster.', search: 'n/a (web video)', build: 'Rise: Multimedia > Embed.' } },

      { type: 'callout', variant: 'monday', title: 'Monday',
        body: `Give one five-minute talk built from a real story on your site. Check your crew’s training records for name, date and signature. Fix the first gap you find.`,
        narration: `Monday. One five-minute talk, built from a real story on your site. Then pull your crew's training records and check them for name, date and signature. Fix the first gap.` }
    ] }
  ],

  kc: { title: 'Knowledge check: leading the crew', questions: [
    { question: `Marco wants the pour to go with the perimeter cable down for the pump hose. Which response is most likely to protect the edge and keep the pour?`,
      options: [
        { text: `“Give me 15 minutes and two guys to re-hang it with a hose gate, then the pour goes.”`, correct: true, fb: `A fix with a time on it is an argument Marco can say yes to.` },
        { text: `“It’s a violation of 1926.501. I’m not doing it.”`, correct: false, fb: `Right rule, weak argument. It stalls the job without solving it.` },
        { text: `“Fine, but keep everyone back from the edge.”`, correct: false, fb: `Staying back isn’t a system. The edge is still open.` }
      ],
      explain: `Stop the exposure, then offer a fix with a time on it. You have the authority to correct it.`, cite: '1926.32(f)' },
    { question: `Which entry makes a fall protection training certification record non-compliant?`,
      options: [
        { text: `It has the worker’s name and date, but no signature from the trainer or the employer.`, correct: true, fb: `Right. Name, date and signature are all required.` },
        { text: `It lists the CP as the trainer.`, correct: false, fb: `That’s correct practice. Training must be by a competent person.` },
        { text: `It is the most recent certification for that worker.`, correct: false, fb: `The latest certification is the one you keep.` }
      ],
      explain: `The written certification shows name or identity, date(s), and the trainer’s or employer’s signature.`, cite: '1926.503(b)' },
    { question: `Which of these is a retraining trigger? (Select all that apply.)`, multi: true,
      options: [
        { text: `The crew switches from guardrails to a warning line system on the roof.`, correct: true, fb: `Change in systems.` },
        { text: `A worker is seen tied off to a guardrail cable.`, correct: true, fb: `Inadequate use.` },
        { text: `The crew moves up a floor with the same systems.`, correct: false, fb: `Same hazards and systems: brief it, no retraining trigger.` },
        { text: `New leading-edge SRLs arrive.`, correct: true, fb: `Change in equipment.` }
      ],
      explain: `Retrain on workplace changes, system or equipment changes, or inadequate knowledge or use.`, cite: '1926.503(c)' },
    { question: `A sub’s worker is leaning out a wall opening with no tie-off. Their foreman says, “Not your guys.” What do you do first?`,
      options: [
        { text: `Get the worker back from the opening now, then bring their foreman and the super in to fix it.`, correct: true, fb: `Stop the exposure first, solve it second.` },
        { text: `Tell the super at the end of the day.`, correct: false, fb: `Hours of exposure while you wait.` },
        { text: `Nothing. Their safety program is their responsibility.`, correct: false, fb: `Your crew walks past that opening, and the hazard is on your site.` }
      ],
      explain: `The competent person acts promptly on hazards in the work area.`, cite: '1926.32(f); 1926.501(b)(14)' }
  ] }
});
