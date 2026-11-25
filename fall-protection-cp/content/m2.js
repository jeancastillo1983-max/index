/* ==========================================================================
   Module 2 — The competent person: your authority and your duty
   (30 min · Rise + Storyline)
   Objectives: two-part OSHA test; competent vs qualified vs authorized
   (Z359.2); the CP's duties under Subpart M and Z359.2.
   ========================================================================== */
COURSE.addModule({
  id: 'm2', num: 2, title: 'The competent person: your authority and your duty', minutes: 30,
  build: 'Rise + Storyline',
  tagline: 'Seeing it is half the job. Being allowed to fix it is the other half.',
  hero: 'img_m2_hero',
  objectives: [
    'Define the competent person using the two-part OSHA test: can identify hazards and has authority to take prompt corrective action.',
    'Separate the roles of competent person, qualified person and authorized person under ANSI/ASSP Z359.2.',
    'List the competent person\'s duties under Subpart M and Z359.2: inspection, supervision, training, removal from service.'
  ],
  citations: ['1926.32(f)', '1926.32(m)', '1926.502(k)', '1926.502(d)(8)', '1926.502(d)(15)', '1926.502(d)(19)', '1926.502(h)', '1926.503(a)(2)', '1926.503(b)', 'ANSI/ASSP Z359.2'],
  jobAids: [
    { title: 'Competent vs. qualified: who signs what', file: 'jobaids/competent-vs-qualified.html',
      pdf: 'jobaids/pdf/competent-vs-qualified.pdf',
      desc: 'One page: the two-part test, the three roles, and 14 common fall protection decisions with who owns each one.' }
  ],
  lessons: [

    /* ------------------------------------------------------------------ */
    { id: 'm2-l1', title: 'Who\'s the competent person?', minutes: 8, blocks: [
      { type: 'hero', kicker: 'Module 2', title: 'Your authority and your duty',
        text: `Five people at Riverside. Only some of them are a competent person. Decide before we tell you the rule.`,
        media: 'img_m2_hero',
        narration: `Everybody on a jobsite thinks they know who the competent person is. Usually it's whoever's been there longest. Let's test that. Five people at Riverside. You decide who meets the definition, before I tell you what it is.`,
        sb: { visual: 'Foreman with clipboard on deck, crew behind.', search: 'construction supervisor clipboard site', build: 'Rise: Banner block.' } },

      { type: 'sort', id: 'm2-who-cp', title: 'Who\'s the competent person?',
        prompt: `Read each person. Do they meet OSHA's definition of a competent person for fall protection on this job?`,
        buckets: [
          { id: 'yes', label: 'Meets the definition' },
          { id: 'no', label: 'Missing a piece' }
        ],
        items: [
          { text: `<b>Tasha</b>, lead hand. Trained, spots existing and upcoming fall hazards, and is designated in writing with authority to stop work and order fixes.`, bucket: 'yes', fb: `Both parts: she can identify the hazards and she's authorized to fix them promptly.` },
          { text: `<b>Ray</b>, foreman. 28 years; can spot every hazard on the deck. As foreman he can stop his crew and order fixes. He lets the deck edge ride.`, bucket: 'yes', fb: `Surprise: Ray meets both parts. That's exactly why the deck edge is his problem too. Capability plus authority equals duty.` },
          { text: `<b>Dee</b>, apprentice. Will flag an open hole when she sees one. No authority over anyone's work; still learning what hazards are coming.`, bucket: 'no', fb: `Spotting an open hole is a start. She lacks the authority and the eye for predictable hazards. Yet.` },
          { text: `<b>Marco</b>, superintendent. Has authority over everything on site. Admits he couldn't inspect an SRL or run a clearance calc.`, bucket: 'no', fb: `All authority, not the capability. Authority without the eye isn't enough.` },
          { text: `<b>Priya</b>, the engineer who designed the roof's horizontal lifeline. Licensed PE, visits monthly, no say over the crew's daily work.`, bucket: 'no', fb: `Priya is a qualified person: she designs and certifies. She's not on site with authority to correct hazards day to day.` }
        ],
        narration: `Read each one carefully. One of these is going to surprise you.`,
        sb: { visual: 'Five character cards (Content Library photo characters) dragged into two columns.', search: 'construction workers diverse portraits hard hat; engineer with plans', build: 'Storyline drag-and-drop: 5 items, 2 targets; feedback layer per item; Ray card triggers "twist" layer.' } },

      { type: 'text', heading: 'The two-part test',
        body: [`A competent person is <b>capable of identifying existing and predictable hazards</b> and has <b>authorization to take prompt corrective measures</b> to eliminate them. <cite>1926.32(f)</cite>`,
               `Both parts. A card in your wallet isn't either one.`],
        narration: `Here it is. OSHA's definition has two parts. One: you're capable of identifying existing and predictable hazards. Two: you're authorized to take prompt corrective measures to eliminate them. You need both. Ray has both. That's why "I just let it ride" doesn't work for Ray. And it won't work for you.` },

      { type: 'tabs',
        items: [
          { title: 'Existing', body: [`What's wrong <b>right now</b>.`, `The stair opening with only caution tape. The cover that got kicked aside. Ray outside the cable.`] },
          { title: 'Predictable', body: [`What's going to be wrong <b>later today or tomorrow</b>.`, `The holes that open when the forms come off. The edge that moves when the next bay of deck goes down. The rail the pump crew will want to pull at 7:00.`] },
          { title: 'Prompt corrective measures', body: [`Fix it <b>now</b>, or stop the exposure until it's fixed.`, `Move people back, reset the rail, cover the hole, pick a better anchor. "I'll mention it at Thursday's meeting" isn't prompt.`] }
        ],
        narration: `"Predictable" is the word most people skip. Anybody can see an open hole. A competent person sees the hole that's going to open tomorrow, and has a cover ready.`,
        sb: { build: 'Rise: Tabs block (3 tabs).' } },

      { type: 'dialogue', title: 'Marco gets it, sort of',
        lines: [
          { speaker: 'marco', text: `So if I designate you, you can stop my pour?` },
          { speaker: 'tasha', text: `If there's a fall hazard I can't fix fast, I can stop the work that's exposed to it. That's the "prompt corrective measures" part.` },
          { speaker: 'marco', text: `And if I don't give you that?` },
          { speaker: 'tasha', text: `Then I'm not the competent person. I'm just the person who noticed.` }
        ],
        narration: `Then I'm not the competent person. I'm just the person who noticed. Remember that line when we get to the end of this module.`,
        sb: { build: 'Storyline dialogue sim, 4 lines, Next button; Marco state "skeptical" → "thinking".' } },

      { type: 'testout', id: 'm2-testout-roles', title: 'You probably already know this',
        text: `If you already know competent vs. qualified vs. authorized, answer these three. Get all three right and you'll skip the roles lesson.`,
        questions: [
          { question: `Who must design an anchorage that isn't a known 5,000-lb point?`,
            options: [
              { text: `A qualified person`, correct: true },
              { text: `The competent person`, correct: false },
              { text: `The foreman on that crew`, correct: false }
            ] },
          { question: `Who decides whether a lanyard that arrested a fall can go back in service?`,
            options: [
              { text: `The worker who was wearing it`, correct: false },
              { text: `A competent person, after inspection (and the manufacturer's instructions)`, correct: true },
              { text: `Anyone, if it looks fine`, correct: false }
            ] },
          { question: `Who writes a fall protection plan under 1926.502(k)?`,
            options: [
              { text: `The competent person`, correct: false },
              { text: `A qualified person`, correct: true },
              { text: `The superintendent`, correct: false }
            ] }
        ],
        skips: ['m2-l2'],
        narration: `If you've been doing this a while, you might already know the next part. Answer three questions. Get all three and you skip ahead.`,
        sb: { build: 'Storyline: 3-question pre-test; if Score = 100, trigger jumps past Lesson 2 and marks it complete (Rise: use Continue block + Storyline block that sets completion).' } },

      { type: 'continue', label: 'Next: competent, qualified, authorized' }
    ] },

    /* ------------------------------------------------------------------ */
    { id: 'm2-l2', title: 'Competent, qualified, authorized', minutes: 7, blocks: [
      { type: 'mcq', id: 'm2-q-hll',
        question: `Marco wants a horizontal lifeline across the roof using leftover wire rope from the yard. Tasha has rigged hundreds of lifelines. Can she approve it?`,
        options: [
          { text: `Yes. She's the competent person and she's done it a hundred times.`, correct: false, fb: `Experience doesn't cover this one. Horizontal lifelines need engineering.` },
          { text: `No. A horizontal lifeline has to be designed, installed and used under the supervision of a qualified person, with a safety factor of at least two.`, correct: true, fb: `Right. This is Priya's signature, not Tasha's.` },
          { text: `Yes, if the wire rope is rated for 5,000 lb.`, correct: false, fb: `Rope strength isn't the whole story. Sag, span and end loads multiply forces. It needs a design.` }
        ],
        explain: `Horizontal lifelines see forces far higher than the falling worker's weight. They must be designed by a qualified person.`,
        cite: '1926.502(d)(8)',
        narration: `Decide first. Marco's trying to save a few hundred bucks.`,
        sb: { build: 'Storyline pick-one with feedback layers.' } },

      { type: 'table', title: 'Three roles, three jobs (ANSI/ASSP Z359.2)',
        headers: ['Role', 'At Riverside', 'What they do', 'What they sign'],
        rows: [
          ['<b>Authorized person</b>', 'Dee and the crew', 'Uses the equipment. Inspects their own gear before each use. Reports problems.', 'Nothing. They flag and tag.'],
          ['<b>Competent person</b>', 'Tasha (and Ray, like it or not)', 'Identifies existing and predictable hazards. Inspects systems. Supervises. Trains. Removes gear from service. Stops exposed work.', 'Inspection records, training certifications, removal-from-service tags.'],
          ['<b>Qualified person</b>', 'Priya, PE', 'Designs and certifies anchorages and horizontal lifelines. Writes fall protection plans. Solves engineering problems.', 'Anchor designs, HLL designs, fall protection plans.'],
          ['Program administrator', 'Jordan, safety manager', 'Runs the managed program and signs your field verification.', 'Program, designations, field sign-off.']
        ],
        note: `Z359.2 also defines a competent rescuer. You'll meet that role in Module 7. <cite>1926.32(m)</cite> defines a qualified person for OSHA.`,
        narration: `Three roles, three jobs. Authorized people use the gear and inspect their own before every use. The competent person, that's you, sees the hazards, inspects, supervises, trains, pulls bad gear and stops exposed work. The qualified person is the engineer: designs, calculations, written plans. When you're not sure who owns a call, ask: does this need math or a stamp? That's qualified. Does it need eyes and authority today? That's you.`,
        sb: { visual: 'Role comparison built in shapes: three columns with icons (glove, hard hat with CP sticker, rolled plans).', search: 'engineer with blueprints construction site', build: 'Rise: Table block, or Storyline slide with three shape columns.' } },

      { type: 'accordion', title: 'Who signs what',
        items: [
          { title: 'An anchor that isn\'t a known 5,000-lb point', body: `Qualified person designs it with a safety factor of at least 2. You make sure the crew uses only approved anchors. <cite>1926.502(d)(15)</cite>` },
          { title: 'A horizontal lifeline', body: `Qualified person designs it. You inspect it and supervise its use. <cite>1926.502(d)(8)</cite>` },
          { title: 'A written fall protection plan', body: `Qualified person writes it, only for leading edge, precast or residential work where conventional protection is infeasible. A competent person implements and supervises it. <cite>1926.502(k)</cite>` },
          { title: 'Gear that arrested a fall', body: `Out of service immediately. Back in use only if a competent person determines it's undamaged, and only if the manufacturer allows it. Most say destroy it. <cite>1926.502(d)(19)</cite>` },
          { title: 'Training the crew', body: `A competent person trains. The certification record carries the trainer's or employer's signature. <cite>1926.503(a)(2)</cite> <cite>1926.503(b)</cite>` },
          { title: 'Safety monitor', body: `Has to be a competent person, on the same surface, in sight and earshot, with no other duties. <cite>1926.502(h)</cite>` }
        ],
        narration: `These are the calls that come up every week. Open the ones you've seen argued about on your jobs.`,
        sb: { build: 'Rise: Accordion block (6 items).' } },

      { type: 'download', title: 'Competent vs. qualified: who signs what',
        desc: `One page for your truck: the two-part test, three roles, and 14 common calls with who owns each.`,
        file: 'jobaids/competent-vs-qualified.html', pdf: 'jobaids/pdf/competent-vs-qualified.pdf',
        narration: `Grab this one-pager. Keep it in the truck. Next time someone asks "is that your call or the engineer's," it's on there.`,
        sb: { build: 'Rise: Attachment in a Text block (PDF).' } }
    ] },

    /* ------------------------------------------------------------------ */
    { id: 'm2-l3', title: 'Your four duties', minutes: 6, blocks: [
      { type: 'mcq', id: 'm2-q-duties', multi: true,
        question: `Select every duty that belongs to the competent person for fall protection at Riverside.`,
        options: [
          { text: `Inspecting fall protection systems and equipment`, correct: true, fb: `Yes. Daily eyes, plus the periodic inspections.` },
          { text: `Supervising setups and stopping exposed work`, correct: true, fb: `Yes. That's the authority part.` },
          { text: `Training workers on fall hazards and systems`, correct: true, fb: `Yes. Subpart M requires a competent person to train.` },
          { text: `Removing damaged or fall-arrested gear from service`, correct: true, fb: `Yes, and deciding whether it ever comes back.` },
          { text: `Calculating loads for a horizontal lifeline`, correct: false, fb: `That's the qualified person.` },
          { text: `Writing the site's fall protection plan`, correct: false, fb: `A qualified person writes it. You implement and supervise it.` }
        ],
        explain: `Inspection, supervision, training and removal from service. The engineering belongs to the qualified person.`,
        cite: '1926.503(a)(2); ANSI/ASSP Z359.2',
        sb: { build: 'Storyline pick-many, single feedback layer listing correct set.' } },

      { type: 'process', title: 'The four duties, Monday version',
        steps: [
          { title: 'Inspect', body: `Make sure every user checks gear before each use. You do the periodic inspections at the interval your program and the manufacturer set, at least yearly, and you sign the log. <cite>1926.502(d)(21)</cite>` },
          { title: 'Supervise', body: `Walk the work before it starts and again when conditions change. Look for the predictable: tomorrow's openings, the rail that will get pulled, the anchor nobody approved.` },
          { title: 'Train', body: `Workers exposed to falls must be trained by a competent person, and certified in writing. Retrain when the job, the gear or the worker's habits change. <cite>1926.503</cite>` },
          { title: 'Remove from service', body: `Defective or fall-arrested gear comes off the job immediately. Tag it, bag it, log it. You decide if it ever comes back. Usually it doesn't. <cite>1926.502(d)(19)</cite>` }
        ],
        narration: `Four duties. Inspect, supervise, train, remove from service. Each one comes with something you can do Monday. Click through them. Supervise is the one that slips first when the job gets behind, because it looks like you're not doing anything. You are.`,
        sb: { visual: 'Icon per step: magnifier, eye, chalkboard, red tag.', search: 'safety inspection harness tag', build: 'Rise: Process block, 4 steps.' } },

      { type: 'image', media: 'img_toolbox_talk', caption: `Training counts when it changes what the crew does at the edge, not when it fills a sign-in sheet.`, size: 'wide' },

      { type: 'callout', variant: 'field-check', title: 'Field check',
        body: `Which of the four do you already do without being asked? Which one slips first when you're behind?`,
        input: true,
        narration: `Be honest with yourself here. Which of these four do you already do without anybody asking? And which one is the first to go when the job gets behind?` },

      { type: 'continue', label: 'Next: "Not your call"' }
    ] },

    /* ------------------------------------------------------------------ */
    { id: 'm2-l4', title: 'Not your call', minutes: 9, blocks: [
      { type: 'text', heading: '6:52 a.m., Level 3 east edge',
        body: `Pump truck booming up. Pour at 7:00. Tasha walks the edge and finds 12 feet of perimeter cable down: the pump crew pulled two stanchions for the hose. Dee and two laborers are setting screed rails four feet from the open edge.`,
        narration: `Six fifty-two. The pump's booming up, pour's at seven. I walk the east edge and find twelve feet of cable lying on the deck. The pump crew pulled two stanchions to run the hose. And Dee and two laborers are setting screed rails four feet from the open edge. This is where it gets real.`,
        sb: { visual: 'Deck scene from M3 (scene-deck.svg) with the open rail section highlighted.', search: 'concrete pump truck boom deck pour', build: 'Storyline: reuse M3 deck scene background.' } },

      { type: 'scenario', id: 'm2-notyourcall', title: 'Not your call',
        intro: `You're Tasha. Make the calls. There's no timer, but the pump is running.`,
        start: 'n1',
        nodes: {
          n1: { speaker: 'tasha',
            text: `Twelve feet of cable down. Dee's crew is four feet from the edge. Pour in eight minutes. What do I do first?`,
            choices: [
              { text: `Move Dee's crew back from the edge, then find Marco.`, next: 'n2', tone: 'good', fb: `People first. Nobody's exposed while you sort out the rest.` },
              { text: `Radio Marco and ask what he wants to do.`, next: 'n2b', tone: 'ok', fb: `He needs to know, but the crew is still four feet from the edge while you wait.` },
              { text: `String caution tape across the gap and deal with it after the pour.`, next: 'end_tape', tone: 'bad', fb: `Tape is a warning, not protection.` }
            ] },
          n2: { speaker: 'marco',
            text: `Marco comes up the stairs. "The pump needs that gap. We pour at seven. Not your call, Tasha."`,
            choices: [
              { text: `"It is. I'm designated for fall protection here. I'm not stopping the pour. I'm stopping work near that edge until it's closed. Ten minutes."`, next: 'n3', tone: 'good', fb: `Calm, specific, and you named what you're stopping and for how long.`, cite: '1926.32(f)' },
              { text: `"If somebody goes over, OSHA is going to ask who saw it. That's me, and you."`, next: 'n3b', tone: 'ok', fb: `True, but it lands as a threat. Marco digs in.` },
              { text: `"You're the boss."`, next: 'end_backdown', tone: 'bad', fb: `You just handed back the authority you were designated to use.` }
            ] },
          n2b: { speaker: 'marco',
            text: `On the radio: "Pump needs the gap. Leave it, we're pouring at seven. Not your call."`,
            choices: [
              { text: `"Copy. I'm moving the crew back now, and I need you up here for two minutes. I've got a fix that keeps your pour on time."`, next: 'n2c', tone: 'good', fb: `Crew's safe, and you offered a fix instead of a fight.` },
              { text: `"Copy." And go back to your screed rails.`, next: 'end_backdown', tone: 'bad', fb: `The crew is still four feet from an open edge.` }
            ] },
          n2c: { speaker: 'marco',
            text: `Marco shows up, arms crossed. "Two minutes. Go."`,
            choices: [
              { text: `"I'm designated for fall protection on this job. Nobody works near that edge until it's closed. Here's how we close it without losing the pour."`, next: 'n3', tone: 'good', fb: `Authority plus a plan.`, cite: '1926.32(f)' },
              { text: `"Never mind. It's probably fine for one pour."`, next: 'end_backdown', tone: 'bad', fb: `You had him listening and let it go.` }
            ] },
          n3b: { speaker: 'marco',
            text: `"Don't threaten me with OSHA. You want to stop my pour over a cable?"`,
            choices: [
              { text: `"I'm not threatening you. I want ten minutes so nobody on your job goes over that edge. Here's the fix."`, next: 'n3', tone: 'good', fb: `You reset the tone and got back to the fix.` },
              { text: `"Fine. Pour. I'll keep an eye on it."`, next: 'end_backdown', tone: 'bad', fb: `"Keeping an eye on it" isn't a corrective measure.` }
            ] },
          n3: { speaker: 'marco',
            text: `"Ten minutes is ten minutes of pump time. What's the fix?"`,
            choices: [
              { text: `"Reset the cable. The boom can feed over the top rail. We land the end hose inside, and nobody works within reach of the edge."`, next: 'n4', tone: 'good', fb: `The pump crew pulled the rail out of habit. The boom never needed the gap.`, cite: '1926.501(b)(1)' },
              { text: `"Leave the gap and have the crew tie off to the rebar mat."`, next: 'end_rebar', tone: 'bad', fb: `Rebar isn't an approved anchor, and a foot-level tie-off means a long free fall.` },
              { text: `"Leave the gap and put Dee there as a safety monitor."`, next: 'end_monitor', tone: 'bad', fb: `Monitoring alone isn't allowed for this work, and Dee isn't a competent person.` }
            ] },
          n4: { speaker: 'ray',
            text: `7:06, cable's back, pour's on. At 10:30 the pump crew wants it down again for cleanup. Ray: "Just leave it down till we're done, Tasha."`,
            choices: [
              { text: `"It stays up. If it has to come down, nobody's within reach of that edge unless they're tied off overhead, and I'm standing there."`, next: 'end_good', tone: 'good', fb: `You held the line when the pressure came back. That's the hard part.`, cite: '1926.501(b)(1)' },
              { text: `"Fine, but string some tape across it."`, next: 'end_ok', tone: 'ok', fb: `You won the morning and gave it back at cleanup.` }
            ] },
          end_good: { end: true, outcome: 'good', title: 'Edge closed, pour done by 11:40',
            text: `The pump crew lost six minutes. Marco grumbled, then told the owner's rep the deck was "locked down." Next week he asked you to walk the Level 4 setup before the pump shows up. That's what authority looks like when you use it early.`,
            cite: '1926.32(f)' },
          end_ok: { end: true, outcome: 'ok', title: 'Good morning, shaky afternoon',
            text: `The cable stayed down through cleanup with tape across the gap. Nobody fell. A laborer leaned on the tape to hand down a hose section. You won the big argument and lost the small one, and the small ones are where people go over.`,
            cite: '1926.502(b)(3)' },
          end_tape: { end: true, outcome: 'bad', title: 'Tape across an open edge',
            text: `Caution tape can't hold 200 pounds. Dee's crew kept working four feet from the gap for the whole pour, and the tape was down by 8:15. You saw the hazard and protected nobody.`,
            cite: '1926.502(b)(3)' },
          end_backdown: { end: true, outcome: 'bad', title: 'Your designation is a sticker',
            text: `The pour went fine. Dee spent two hours four feet from an open edge and learned that the competent person backs down when the super says so. Next time, she won't bother calling you.`,
            cite: '1926.32(f)' },
          end_rebar: { end: true, outcome: 'bad', title: 'Tied off to the rebar',
            text: `Rebar isn't a 5,000-lb anchor, and a 6-ft lanyard clipped at foot level allows up to 11 feet of free fall: almost twice the limit. Fourteen feet to the slab below isn't enough. You traded an open edge for a fall nobody could survive cleanly.`,
            cite: '1926.502(d)(15), (d)(16)' },
          end_monitor: { end: true, outcome: 'bad', title: 'A monitor isn\'t a rail',
            text: `Safety monitoring alone is allowed only for roofing on low-slope roofs 50 feet wide or less, or under a written fall protection plan. The monitor must be a competent person with no other duties. Dee is none of that, and this is a concrete deck.`,
            cite: '1926.502(h); 1926.501(b)(10)' }
        },
        narration: `You're me now. Make the calls.`,
        sb: { visual: 'Deck scene background; Marco and Ray avatars per node; outcome screens with green/amber/red banner.', search: 'construction superintendent radio; concrete pump boom', build: 'Storyline branching: 7 decision slides, 6 endings. Variables: M2_Path (text), M2_Outcome. Each ending shows the citation receipt. Replay button resets to n1.' } },

      { type: 'accordion', title: 'What worked, and why',
        items: [
          { title: 'Move people first, argue second', body: `Get the crew away from the edge before the conversation. Then nobody is exposed while you talk.` },
          { title: 'Name your authority plainly', body: `"I'm designated for fall protection on this job." No apology, no threat.` },
          { title: 'Bring the fix with the problem', body: `Marco responds to schedule. "Ten minutes, the boom goes over the rail" beats "you can't do that."` },
          { title: 'Hold the line when the pressure comes back', body: `Cleanup, end of shift, Friday afternoon: that's when rails stay down. Your call doesn't expire at 7:06.` }
        ],
        narration: `Four things worked in that scenario. Move people first. Say your authority plainly. Bring a fix, not just a problem. And hold the line when the pressure comes back, because it always comes back.` },

      { type: 'quote', speaker: 'marco', mood: 'calm',
        text: `Don't tell me what I can't do. Tell me how we pour on time without anybody going over. I can work with that.`,
        narration: `Marco's not the bad guy. He's got the owner on the phone every morning. Give him something he can work with.` },

      { type: 'callout', variant: 'monday', title: 'Monday',
        body: `Ask for your designation in writing. It should say what you can stop, what you can order fixed, and what you can spend without calling anyone. If it doesn't, you're "just the person who noticed."`,
        narration: `Your Monday job: get your designation in writing. It should say what you can stop, what you can order fixed, and what you can spend without asking. If it doesn't, you're just the person who noticed.` }
    ] }
  ],

  kc: { title: 'Knowledge check: Module 2', questions: [
    { question: `Under 1926.32(f), what two things make someone a competent person?`,
      options: [
        { text: `A training certificate and five years of experience`, correct: false, fb: `Neither is in the definition.` },
        { text: `Capable of identifying existing and predictable hazards, and authorized to take prompt corrective measures`, correct: true, fb: `Both parts, every time.` },
        { text: `A designation letter and a signed exam`, correct: false, fb: `Paperwork helps prove it. It isn't the definition.` }
      ],
      explain: `Capability plus authorization. Either one alone isn't enough.`, cite: '1926.32(f)' },
    { question: `A worker's shock-absorbing lanyard arrested a short fall. The pack looks fine. What happens next?`,
      options: [
        { text: `The worker inspects it and keeps using it if it looks okay.`, correct: false, fb: `Users inspect before use, but arrested gear needs more than a user's look.` },
        { text: `It comes out of service immediately and stays out unless a competent person determines it's undamaged and the manufacturer allows reuse.`, correct: true, fb: `Right. Most manufacturers say destroy it.` },
        { text: `Send it to the engineer to recalculate its rating.`, correct: false, fb: `Not a qualified-person call.` }
      ],
      explain: `Components subjected to impact loading come out of service immediately.`, cite: '1926.502(d)(19)' },
    { question: `Who must design an anchorage that hasn't been rated for 5,000 lb per worker?`,
      options: [
        { text: `A qualified person, with a safety factor of at least two`, correct: true, fb: `Right.` },
        { text: `The competent person, using judgment`, correct: false, fb: `Judgment isn't a design.` },
        { text: `The worker using it`, correct: false, fb: `Never.` }
      ],
      explain: `Anchorages must hold 5,000 lb per worker or be designed, installed and used under a qualified person with SF ≥ 2.`, cite: '1926.502(d)(15)' },
    { question: `Marco says "Not your call" about an open edge with workers four feet away. What's the best first move?`,
      options: [
        { text: `Argue the rule with Marco until he agrees.`, correct: false, fb: `The crew is exposed the whole time you argue.` },
        { text: `Move the workers away from the edge, then explain your authority and offer a fix.`, correct: true, fb: `People first, then the conversation, then the fix.` },
        { text: `Document it and report it at the weekly meeting.`, correct: false, fb: `That's not prompt.` }
      ],
      explain: `Prompt corrective measures start with removing the exposure.`, cite: '1926.32(f)' }
  ] }
});
