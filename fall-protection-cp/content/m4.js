/* ==========================================================================
   Module 4 — Picking the right system (45 min)
   Voice: Tasha, first person. Decide first, then the standard behind it.
   ========================================================================== */
COURSE.addModule({
  id: "m4", num: 4, title: "Picking the right system", minutes: 45,
  build: "Storyline",
  tagline: "The best fall protection is the one nobody has to remember to use.",
  hero: "img_m4_hero",
  objectives: [
    "Apply the hierarchy: eliminate, guard (passive), restrain, arrest, administrative.",
    "Select a compliant system for a task and explain why: guardrails, covers, safety nets, personal fall arrest, travel restraint, positioning, warning lines, safety monitoring and controlled access zones.",
    "State the key specs: guardrail top rail 42 in ± 3 in with a 200 lb load, covers that hold twice the load and are secured and marked, safety nets within 30 ft.",
    "Explain when a written fall protection plan is allowed and who must prepare it."
  ],
  citations: ["1926.502(b)", "1926.502(c)", "1926.502(e)", "1926.502(f)", "1926.502(g)", "1926.502(h)", "1926.502(i)", "1926.502(j)", "1926.502(k)", "1926.501(b)(10)", "ANSI/ASSP A10.32", "ANSI/ASSP Z359.2 hierarchy"],
  jobAids: [{ title: "System selection guide", file: "jobaids/system-selection-guide.html", pdf: "jobaids/pdf/system-selection-guide.pdf",
              desc: "The hierarchy as a decision flow, plus the numbers for guardrails, covers, nets, warning lines and monitors." }],

  lessons: [
    /* ------------------------------------------------------------------ */
    { id: "m4-l1", title: "Decide first: rail or tie-off?", minutes: 9, blocks: [
      { type: "hero", kicker: "Module 4 · Picking the right system", title: "Rail or tie-off?",
        text: "Marco has a request about the east edge. Make the call before I explain anything.",
        media: "img_m4_hero",
        narration: "Module four. Marco has a request about the east edge. Make the call before I explain anything.",
        sb: { visual: "Photo: building perimeter with guardrail, curtain wall going in.", search: "construction perimeter guardrail building edge" } },

      { type: "scenario", id: "m4-sc-eastedge", title: "The east edge",
        intro: "Thursday the curtain wall crew starts on the east side, Levels 2 through 4, for about three weeks. The perimeter cable is in their way.",
        start: "ask",
        nodes: {
          ask: { speaker: "marco", text: "Curtain wall starts Thursday. Can we pull the cable on the east side and just tie those guys off? Rail's in their way and we can't lose another day.",
            choices: [
              { text: "Keep the rail. They drop one span at a time, tie off while it's open, and put it back before they move.", next: "push", tone: "good", fb: "Passive protection stays up for everyone else on the floor." },
              { text: "Pull it. Everyone on the curtain wall crew wears PFAS tied to the beam above.", next: "end_pfas", tone: "ok", fb: "Compliant for the people clipped in. What about everyone else?" },
              { text: "Pull it and post a safety monitor on the edge.", next: "end_monitor", tone: "bad", fb: "Monitoring alone isn't an option on a deck edge." }
            ] },
          push: { speaker: "marco", text: "That's going to slow them down. Dropping and resetting a span every time?",
            choices: [
              { text: "About ten minutes a span. A fall on this edge stops the whole job for a week, maybe more.", next: "end_good", tone: "good", fb: "You answered with his number: schedule." },
              { text: "Fine. Pull it, but tell them to be careful.", next: "end_pfas", tone: "bad", fb: "You had the right call and gave it away." }
            ] },
          end_good: { end: true, outcome: "good", title: "Rail stays up",
            text: "The crew grumbles for a day, then gets fast at it. Two weeks later Dee is hanging drywall ten feet from that edge, backing up with a sheet, and never knows she was protected. That's the point.",
            cite: "1926.501(b)(1); 1926.502(b)" },
          end_pfas: { end: true, outcome: "ok", title: "Compliant for some, exposed for most",
            text: "The curtain wall crew clips in. But the drywallers, the electrician and Dee all walk near that edge too, and none of them are tied off. You traded a system that protects everyone for one that only protects the people who remember to use it.",
            cite: "1926.501(b)(1)" },
          end_monitor: { end: true, outcome: "bad", title: "Not a legal option",
            text: "A safety monitor alone is only allowed for roofing work on low-slope roofs 50 feet wide or less, or inside a written fall protection plan for leading edge, precast or residential work. A curtain wall edge on a deck is neither.",
            cite: "1926.501(b)(10); 1926.502(h); 1926.502(k)" }
        },
        narration: "Thursday the curtain wall crew starts on the east side. The cable is in their way. Marco wants to pull it and tie them off. Make the call.",
        sb: { visual: "Marco and Tasha on the Level 3 deck, east edge, cable rail behind them.", search: "construction superintendent radio; construction perimeter cable",
              build: "Storyline branching: slide per node, 3 choices on 'ask', 2 on 'push'. Variable Path (text). End slides show outcome banner color by tone. Replay button resets to 'ask'." } },

      { type: "pyramid", title: "The hierarchy: work down only when you have to",
        levels: [
          { title: "Eliminate", body: "Do the work from the ground or a lift. Build it at grade and fly it. No edge, no fall." },
          { title: "Guard (passive)", body: "Guardrails, covers, nets. They protect everybody, every minute, without anyone doing anything." },
          { title: "Restrain", body: "Travel restraint: a lanyard short enough that you can't reach the edge. You can't fall if you can't get there." },
          { title: "Arrest", body: "PFAS stops a fall that's already happening. It needs a rated anchor, the right clearance, inspection and a rescue plan." },
          { title: "Administrative", body: "Warning lines, monitors, controlled access zones, training. They depend on people paying attention." }
        ],
        narration: "Here's the hierarchy. Eliminate first. Then guard, which is passive: rails, covers, nets. Then restrain. Then arrest. Then administrative controls, which depend on people paying attention. Work down the list only when you have to.",
        sb: { visual: "Inverted pyramid built in shapes, most effective at top, steel-navy to orange gradient.", build: "Rise process or labeled graphic; Storyline: 5 shape layers revealed on click." } },

      { type: "quote", speaker: "dee", mood: "calm",
        text: "Honestly? I unclip to move all the time. Everybody does. A rail doesn't care if I forget.",
        narration: "Honestly? I unclip to move all the time. Everybody does. A rail doesn't care if I forget." },

      { type: "callout", variant: "note", title: "Why passive beats personal",
        body: "A harness only works if someone puts it on right, picks a real anchor, has the clearance, and stays clipped. A guardrail works for the apprentice, the electrician and the guy who's late and in a hurry.",
        narration: "A harness only works if someone puts it on right, picks a real anchor, has the clearance and stays clipped. A guardrail works for everybody." },

      { type: "continue" }
    ]},

    /* ------------------------------------------------------------------ */
    { id: "m4-l2", title: "Six tasks at Riverside", minutes: 14, blocks: [
      { type: "text", heading: "Six tasks. Pick the system.",
        body: "Each one is real Riverside work this week. Pick what you'd put in place. You'll see how it plays out.",
        narration: "Six tasks, all real Riverside work this week. Pick what you'd put in place, and you'll see how it plays out." },

      { type: "scenario", id: "m4-task1", title: "Task 1 · The chase opening",
        start: "q",
        nodes: {
          q: { speaker: "tasha", media: "img_hole_cover", text: "A 3 × 2 ft chase opening on Level 3, right next to the pump line. The plumbers won't need it for two weeks. What goes on it?",
            choices: [
              { text: "A plywood cover that holds twice the load, cleated so it can't slide, painted COVER", next: "good", tone: "good", fb: "Passive, cheap, done in ten minutes." },
              { text: "Two cones and a loop of caution tape", next: "bad", tone: "bad", fb: "Tape is a sign, not protection." },
              { text: "Tell anyone working near it to tie off", next: "ok", tone: "ok", fb: "You just turned a passive fix into a personal one." }
            ] },
          good: { end: true, outcome: "good", title: "Ten minutes, two weeks of protection", text: "Nobody thinks about that hole again until the plumbers pull the cover and put it back. Good covers make problems disappear.", cite: "1926.502(i)(2)–(4)" },
          bad: { end: true, outcome: "bad", title: "9:40 a.m.", text: "A laborer backs up dragging hose and steps right through the tape. He catches himself on the rebar with one leg in the hole. Bruised, shaken, and the pour stops for 30 minutes.", cite: "1926.501(b)(4)(i)" },
          ok: { end: true, outcome: "ok", title: "Who's tied off to what?", text: "Two people clip to rebar, which isn't a rated anchor. The rest don't bother. A cover would have protected all of them without anyone doing anything.", cite: "1926.501(b)(4)(i); 1926.502(d)(15)" }
        },
        narration: "Task one. A three by two chase opening next to the pump line. What goes on it?",
        sb: { build: "Storyline branching, 1 decision, 3 outcome layers. Reuse template for tasks 1–6." } },

      { type: "scenario", id: "m4-task2", title: "Task 2 · Running membrane on the roof",
        start: "q",
        nodes: {
          q: { speaker: "tasha", media: "img_roof_work", text: "Six roofers running TPO on the main roof. It's low-slope, 180 by 96 feet. They'll be near every edge at some point this week. What's the setup?",
            choices: [
              { text: "Warning line at least 6 ft from the edges. Anyone working between the line and the edge uses PFAS or a dedicated safety monitor.", next: "good", tone: "good", fb: "The standard combo for low-slope roofing." },
              { text: "A safety monitor watching the whole crew. No line needed.", next: "bad", tone: "bad", fb: "Check the roof width." },
              { text: "Everybody in harnesses on temporary roof anchors, all day", next: "ok", tone: "ok", fb: "Compliant if the anchors are rated. Practical? Watch." }
            ] },
          good: { end: true, outcome: "good", title: "The field is protected", text: "Most of the roof is inside the line, so most of the work needs nothing extra. Edge work gets PFAS or a monitor whose only job is watching.", cite: "1926.501(b)(10); 1926.502(f)" },
          bad: { end: true, outcome: "bad", title: "Too wide for monitoring alone", text: "A safety monitor by itself is only allowed on low-slope roofs 50 feet wide or less. This roof is 96. You need a warning line plus PFAS, nets, guardrail or a monitor for the edge work.", cite: "1926.501(b)(10)" },
          ok: { end: true, outcome: "ok", title: "Legal, tangled, and abandoned by lunch", text: "Six lifelines dragging across fresh seams. By noon half the crew has unclipped to move rolls. A warning line protects the field without anyone clipping in.", cite: "1926.501(b)(10)" }
        },
        narration: "Task two. Six roofers on a low-slope roof, one hundred eighty by ninety-six feet. What's the setup?" },

      { type: "scenario", id: "m4-task3", title: "Task 3 · Tying rebar up the core wall",
        start: "q",
        nodes: {
          q: { speaker: "tasha", media: "img_rebar", text: "An ironworker is tying rebar on the elevator core wall, 12 feet up the face of the mat. What protects him?",
            choices: [
              { text: "A positioning device: two hooks on the mat, set so he can't free fall more than 2 feet", next: "good", tone: "good", fb: "Right system for working on the face of rebar." },
              { text: "A 6-ft shock-absorbing lanyard clipped to the mat at his feet", next: "bad", tone: "bad", fb: "Do the math on that free fall." },
              { text: "Nothing. He climbs the mat and holds on.", next: "worse", tone: "bad", fb: "Holding on is not a system." }
            ] },
          good: { end: true, outcome: "good", title: "Hands free, can't fall far", text: "Positioning lets him lean back and use both hands. Free fall is limited to 2 feet, anchored to something that holds twice the impact load or 3,000 pounds.", cite: "1926.501(b)(5); 1926.502(e)" },
          bad: { end: true, outcome: "bad", title: "He hits the deck", text: "Clipped at his feet, he'd free fall about 11 feet before the lanyard even starts working. At 12 feet up, he reaches the deck first.", cite: "1926.502(d)(16)(iii)" },
          worse: { end: true, outcome: "bad", title: "Grip is not protection", text: "Formwork and rebar faces at 6 feet or more need PFAS, nets or positioning devices. A tired hand at 3 p.m. is how this goes wrong.", cite: "1926.501(b)(5)" }
        },
        narration: "Task three. An ironworker tying rebar twelve feet up the face of the core wall. What protects him?" },

      { type: "scenario", id: "m4-task4", title: "Task 4 · Flashing the skylight",
        start: "q",
        nodes: {
          q: { speaker: "tasha", media: "img_skylight", text: "The flashing crew needs the screen off the east skylight for about three hours. What do you set up?",
            choices: [
              { text: "PFAS to a rated roof anchor for the two people at the curb, and the screen goes back the same shift", next: "good", tone: "good", fb: "Protection follows the exposure." },
              { text: "Pull the screen. They know it's there.", next: "bad", tone: "bad", fb: "Knowing a hole is there doesn't stop you falling in it." },
              { text: "Lay a sheet of plywood loosely on top when they take breaks", next: "ok", tone: "ok", fb: "Half a cover." }
            ] },
          good: { end: true, outcome: "good", title: "Three hours, zero exposure", text: "The crew is clipped while the hole is open, and the screen goes back before anyone else walks the roof.", cite: "1926.501(b)(4)(i); 1926.502(d)" },
          bad: { end: true, outcome: "bad", title: "Kneeling at an open hole", text: "They spend three hours kneeling at the edge of a 40-foot drop to the atrium floor. One backward step to reach a tool is all it takes.", cite: "1926.501(b)(4)(i)" },
          ok: { end: true, outcome: "ok", title: "Not secured, not marked", text: "Loose plywood slides, gets borrowed, and isn't marked. A cover has to hold twice the load, stay put, and say COVER or HOLE.", cite: "1926.502(i)(3)–(4)" }
        },
        narration: "Task four. The flashing crew needs the skylight screen off for three hours." },

      { type: "scenario", id: "m4-task5", title: "Task 5 · Window openings on Level 2",
        start: "q",
        nodes: {
          q: { speaker: "tasha", media: "img_guardrail", text: "Level 2 has 22 window openings with 12-inch sills. Glass arrives in three weeks. Framers and electricians are working inside all month. What goes across the openings?",
            choices: [
              { text: "Guardrail across each opening: top rail at 42 in, midrail. Glaziers remove one at a time and tie off while it's open.", next: "good", tone: "good", fb: "Protects the whole floor until the glass is in." },
              { text: "Caution tape across each opening", next: "bad", tone: "bad", fb: "Tape again." },
              { text: "Nothing. Interior trades don't work at the windows.", next: "bad2", tone: "bad", fb: "Everyone walks past windows." }
            ] },
          good: { end: true, outcome: "good", title: "The floor is safe to work", text: "Twenty-two rails cost a day of carpenter time. Every trade on that floor is protected for a month.", cite: "1926.501(b)(14); 1926.502(b)" },
          bad: { end: true, outcome: "bad", title: "Tape won't hold a man", text: "An electrician pulling wire backs into the tape and it gives. Wall openings with a sill under 39 inches need guardrail, nets or PFAS.", cite: "1926.501(b)(14)" },
          bad2: { end: true, outcome: "bad", title: "Somebody always goes to the window", text: "To look, to pass material out, to cut a stud. A sill under 39 inches over a 14-foot drop is a trip edge.", cite: "1926.501(b)(14)" }
        },
        narration: "Task five. Twenty-two window openings with twelve-inch sills. What goes across them?" },

      { type: "scenario", id: "m4-task6", title: "Task 6 · The atrium skylight frame",
        start: "q",
        nodes: {
          q: { speaker: "tasha", media: "img_aerial_lift", text: "The atrium skylight frame needs bolting, 40 feet above the lobby slab. You could reach it from the roof edge or from below. What's your plan?",
            choices: [
              { text: "Work it from below with a boom lift. Operators wear harnesses with restraint lanyards per the lift manual.", next: "good", tone: "good", fb: "Eliminate the edge exposure entirely." },
              { text: "Lean out from the roof edge, tied off to the atrium guardrail", next: "bad", tone: "bad", fb: "Guardrails aren't anchors." },
              { text: "Hang a safety net under the frame and work from the roof", next: "ok", tone: "ok", fb: "Passive and legal. Check the distance." }
            ] },
          good: { end: true, outcome: "good", title: "No edge, no fall", text: "Nobody works at the roof edge at all. That's the top of the hierarchy: eliminate the exposure. The lift brings its own rules, which the operator follows.", cite: "ANSI/ASSP Z359.2 hierarchy; A10.32" },
          bad: { end: true, outcome: "bad", title: "The rail goes with him", text: "Guardrails are built for 200 pounds of push, not the force of a falling worker. Never anchor PFAS to a guardrail.", cite: "1926.502(d)(23)" },
          ok: { end: true, outcome: "ok", title: "Works, if it's close enough", text: "A net is passive and protects everyone above it, as long as it's hung as close under the work as practical and never more than 30 feet below. Here, the lift was simpler.", cite: "1926.502(c)(1)" }
        },
        narration: "Task six. The atrium skylight frame, forty feet above the lobby. What's your plan?" },

      { type: "callout", variant: "tip", title: "The pattern",
        body: "Look back at your six calls. Every good answer either removed the edge or protected everyone near it without them doing anything. PFAS showed up only where the work itself had to be at an open edge.",
        narration: "Look back at your six calls. Every good answer either removed the edge or protected everyone near it without them doing anything." },

      { type: "continue" }
    ]},

    /* ------------------------------------------------------------------ */
    { id: "m4-l3", title: "Ray wants a safety monitor", minutes: 8, blocks: [
      { type: "scenario", id: "m4-sc-monitor", title: "The hundred-times thread: Ray's shortcut",
        intro: "Level 3 deck, Tuesday. Twelve bundles of deck sheets to land before lunch.",
        start: "ask",
        nodes: {
          ask: { speaker: "ray", text: "Let's drop the cable on the east side. Crane sets bundles right on the edge, way faster. I'll stand there and watch the guys. Safety monitor. That's legal.",
            choices: [
              { text: "Not on a deck. Monitoring alone is for low-slope roofing on roofs 50 feet wide or less, or inside a written plan. This is neither.", next: "ray2", tone: "good", fb: "Right on the rule. Now solve his problem." },
              { text: "OK, but you can't do anything else while you're watching.", next: "end_bad", tone: "bad", fb: "Still not legal here, and Ray won't just watch." },
              { text: "Ask Marco. It's his schedule.", next: "end_passed", tone: "ok", fb: "It's your call. That's what competent person means." }
            ] },
          ray2: { speaker: "ray", text: "So we're slow. Twelve bundles, Tasha.",
            choices: [
              { text: "Gated landing: drop one span, the two guys at the edge on SRLs to the beam above, cable back after each pick.", next: "end_good", tone: "good", fb: "Keeps the speed, protects the edge." },
              { text: "Then no landings on that side. Use the north hoist.", next: "end_ok", tone: "ok", fb: "Safe, but you haven't solved his problem." }
            ] },
          end_good: { end: true, outcome: "good", title: "Faster than Ray expected",
            text: "Rigging the SRLs takes fifteen minutes. The crane lands all twelve bundles before 11:30. Ray doesn't say thanks, but he uses the same setup on Thursday without being asked.",
            cite: "1926.501(b)(1); 1926.502(d)" },
          end_ok: { end: true, outcome: "ok", title: "Safe, slow, and overruled",
            text: "Nobody's exposed today. But the north hoist adds two hours and Marco overrules you by Thursday. When you say no, bring a yes with it.",
            cite: "1926.501(b)(1)" },
          end_bad: { end: true, outcome: "bad", title: "Watching, and rigging, and signaling",
            text: "Ten minutes in, Ray is signaling the crane, unhooking slings and watching nobody. A monitor has to have no other duties, and on a deck it isn't an option anyway.",
            cite: "1926.502(h)(1)(iv); 1926.501(b)(10)" },
          end_passed: { end: true, outcome: "ok", title: "Marco says 'Whatever Ray thinks'",
            text: "You handed your authority to someone who didn't ask for it. Ray drops the cable and stands at the edge watching the crane, not the crew. The competent person makes the call.",
            cite: "1926.32(f)" }
        },
        narration: "Level 3 deck, Tuesday. Twelve bundles to land before lunch. Ray wants to drop the cable and act as a safety monitor.",
        sb: { visual: "Ray, arms crossed, at the Level 3 east edge; crane in background.", build: "Storyline branching, 2 levels. Track variable RayTrust (number) for M8 callback." } },

      { type: "cards", title: "Myth or field truth: safety monitors", mode: "myth",
        cards: [
          { front: "Any competent person can be a safety monitor anywhere.", back: "Monitoring is allowed for low-slope roofing (alone only if the roof is 50 ft wide or less) and inside a written fall protection plan. Nowhere else.", verdict: "myth", cite: "1926.501(b)(10); 1926.502(k)" },
          { front: "A monitor has to be on the same surface, within sight, close enough to talk.", back: "And no other duties that pull their attention. One job: watching.", verdict: "truth", cite: "1926.502(h)(1)" },
          { front: "Mechanical equipment can run in a monitored area.", back: "Not on low-slope roofs: mechanical equipment can't be used or stored where a safety monitor is the only protection.", verdict: "myth", cite: "1926.502(h)(3)" }
        ],
        narration: "Myth or field truth on safety monitors. Flip each card." },

      { type: "text", heading: "The written fall protection plan",
        body: ["A written plan is the exception, not a shortcut. It's only for leading edge work, precast concrete erection and residential construction, and only when you can show conventional protection is infeasible or creates a greater hazard.",
               "A qualified person writes it for this site. A competent person runs it."],
        narration: "A written fall protection plan is the exception, not a shortcut. Only leading edge, precast and residential work, and only when conventional protection is infeasible or more dangerous. A qualified person writes it for this site. A competent person runs it." },

      { type: "accordion", title: "What the plan has to have",
        items: [
          { title: "Written by a qualified person, for this site", body: "Not a generic company form. Specific to Riverside, kept up to date, and any change approved by a qualified person." },
          { title: "Kept on site", body: "A copy at the job, where the competent person can show it to anyone who asks." },
          { title: "Why conventional protection won't work", body: "The plan has to document why guardrails, nets and PFAS are infeasible or create a greater hazard, and what's being done instead." },
          { title: "Each location, marked as a controlled access zone", body: "Every place conventional protection isn't used gets a CAZ, with a control line and only designated workers inside." },
          { title: "Named people and a monitor", body: "Each worker allowed in the CAZ is named. A safety monitor is used where no other measure is in place." },
          { title: "Fix it after any incident", body: "If someone falls or nearly falls, it's investigated and the plan is changed to stop it happening again." }
        ],
        cite: "1926.502(k)",
        narration: "What the plan has to have.",
        sb: { build: "Rise accordion, 6 rows." } },

      { type: "mcq", id: "m4-plan-when",
        question: "Ray says, 'Write us a fall protection plan for the deck landings and we can skip the rail.' Can you?",
        options: [
          { text: "No. Plans are only for leading edge, precast and residential work where conventional protection is infeasible. A landing edge isn't any of those.", correct: true, fb: "Right. And the rail is clearly feasible: it's already up." },
          { text: "Yes, if the competent person writes it", correct: false, fb: "Two problems: a qualified person writes plans, and this work doesn't qualify." },
          { text: "Yes, as long as it names a safety monitor", correct: false, fb: "A monitor doesn't make a plan legal for this work." }
        ],
        explain: "1926.502(k) applies only to leading edge, precast and residential work, and only when conventional systems are infeasible or a greater hazard.",
        cite: "1926.502(k); 1926.501(b)(2)" },

      { type: "continue" }
    ]},

    /* ------------------------------------------------------------------ */
    { id: "m4-l4", title: "Know the numbers", minutes: 9, blocks: [
      { type: "text", heading: "Specs you check with a tape, not a feeling",
        body: "When you inspect a rail or a cover, you're measuring. Drag each spec onto the part of the drawing it belongs to.",
        narration: "When you inspect a rail or a cover, you're measuring. Drag each spec onto the part of the drawing it belongs to." },

      { type: "match", id: "m4-match-specs", title: "Guardrail and cover inspection",
        src: "assets/art/m4-guardrail-diagram.svg",
        alt: "Elevation of a wood guardrail with top rail, midrail, toeboard, posts and load arrows, beside an isometric hole cover with corner fasteners, a HOLE stencil and load arrows.",
        targets: [
          { id: "t-top", x: 54.5, y: 55 },
          { id: "t-mid", x: 6.5, y: 64.5 },
          { id: "t-toe", x: 30, y: 91.4 },
          { id: "t-load200", x: 14, y: 17 },
          { id: "t-load150", x: 31, y: 41 },
          { id: "t-mark", x: 63.3, y: 21.4 },
          { id: "t-cover2x", x: 83, y: 38.5 },
          { id: "t-secure", x: 58.3, y: 85.7 }
        ],
        tags: [
          { text: "42 in ± 3 in", target: "t-top", fb: "Top rail height: 39 to 45 inches above the walking surface. 1926.502(b)(1)." },
          { text: "Midway (≈ 21 in)", target: "t-mid", fb: "Midrail halfway between the top rail and the surface. 1926.502(b)(2)(i)." },
          { text: "≥ 3½ in high", target: "t-toe", fb: "Toeboards at least 3½ inches tall, no more than ¼-inch gap below. 1926.502(j)(3)." },
          { text: "200 lb, outward or down", target: "t-load200", fb: "Top rail withstands 200 lb within 2 in of the top edge, and doesn't deflect below 39 in. 1926.502(b)(3)–(4)." },
          { text: "150 lb", target: "t-load150", fb: "Midrails withstand at least 150 lb. 1926.502(b)(5)." },
          { text: "Marked HOLE or COVER", target: "t-mark", fb: "Color-coded or marked with the word HOLE or COVER. 1926.502(i)(4)." },
          { text: "2× the load", target: "t-cover2x", fb: "Holds at least twice the weight of workers, equipment and materials on it. 1926.502(i)(2)." },
          { text: "Secured, can't shift", target: "t-secure", fb: "Fastened so wind, equipment or people can't displace it. 1926.502(i)(3)." }
        ],
        narration: "Drag each spec onto the part of the drawing it belongs to.",
        sb: { visual: "assets/art/m4-guardrail-diagram.svg, blueprint style.", build: "Storyline drag-and-drop: 8 drag items (rounded tags), 8 drop targets (invisible circles at listed %). Snap to center; one item per target; Submit; per-tag feedback layer with citation." } },

      { type: "table", title: "The numbers, in one place",
        headers: ["System", "What you check", "Receipt"],
        rows: [
          ["Guardrail", "Top rail 42 in ± 3; 200 lb; midrail ~21 in, 150 lb; toeboard ≥ 3½ in; no banding as rails; wire rope flagged every 6 ft or less", "1926.502(b), (j)"],
          ["Cover", "2× the load; secured; marked HOLE or COVER; roadway covers 2× axle load", "1926.502(i)"],
          ["Safety net", "As close under the work as practical; never more than 30 ft below; inspected at least weekly", "1926.502(c)"],
          ["Warning line", "At least 6 ft from the edge; rope 34–39 in high; flagged every 6 ft or less", "1926.502(f)"],
          ["Safety monitor", "Competent person; same surface; within sight and voice; no other duties", "1926.502(h)"],
          ["Positioning", "Free fall 2 ft max; anchor 2× impact load or 3,000 lb", "1926.502(e)"],
          ["PFAS", "Anchor 5,000 lb (or SF 2 by a qualified person); free fall 6 ft max; stop within 3½ ft", "1926.502(d)"]
        ],
        note: "Module 5 goes deep on PFAS anchors and clearance.",
        narration: "Here are the numbers in one place. You'll find the same table on the system selection guide.",
        sb: { build: "Rise table block (or text block with table)." } },

      { type: "sort", id: "m4-sort-pass", title: "Pass or fail?",
        prompt: "You're walking Riverside with a tape measure. Tap each finding, then tap Pass or Fail.",
        buckets: [ { id: "pass", label: "Passes spec" }, { id: "fail", label: "Fails spec" } ],
        items: [
          { text: "Top rail measured at 44 in", bucket: "pass", fb: "Inside 39 to 45. Pass." },
          { text: "Top rail measured at 37 in", bucket: "fail", fb: "Below 39 in. Raise it." },
          { text: "Steel banding strung as a midrail", bucket: "fail", fb: "Banding is never a top rail or midrail. 1926.502(b)(9)." },
          { text: "Plywood cover, marked COVER, screwed at the corners, oversized", bucket: "pass", fb: "Marked, secured, bigger than the hole. Pass." },
          { text: "Safety net 35 ft below the work", bucket: "fail", fb: "Never more than 30 ft below. 1926.502(c)(1)." },
          { text: "Warning line 4 ft from the roof edge", bucket: "fail", fb: "At least 6 ft. 1926.502(f)(1)(i)." },
          { text: "Wire rope top rail with flags every 5 ft", bucket: "pass", fb: "Flagged at 6 ft or less. Pass." },
          { text: "Toeboard 2 in tall", bucket: "fail", fb: "At least 3½ in. 1926.502(j)(3)." }
        ],
        narration: "You're walking Riverside with a tape measure. Pass or fail?",
        sb: { build: "Storyline drag-and-drop to 2 targets, or Rise sorting activity." } },

      { type: "image", media: "img_safety_net", size: "inline", caption: "Nets protect everyone above them without anyone clipping in. Hang them close: never more than 30 feet below the work." },

      { type: "continue" }
    ]},

    /* ------------------------------------------------------------------ */
    { id: "m4-l5", title: "Your call, Monday", minutes: 5, blocks: [
      { type: "video", media: "vid_m4", caption: "Guardrails, covers and choosing protection.",
        watchFor: "Watch for how often a passive system would have prevented the fall outright.",
        narration: "Watch for how often a passive system would have prevented the fall outright." },

      { type: "reflect", id: "m4-gut", prompt: "Gut check: where on your site are people tying off where a guardrail or cover would work better? Be honest. This is private.",
        placeholder: "e.g. Level 2 slab edge where we pulled the cable for deliveries…",
        narration: "Gut check. Where on your site are people tying off where a guardrail or cover would work better? This is private." },

      { type: "download", title: "System selection guide", file: "jobaids/system-selection-guide.html", pdf: "jobaids/pdf/system-selection-guide.pdf",
        desc: "The hierarchy as a decision flow, the specs for every system, and when a written plan is allowed." },

      { type: "callout", variant: "monday", title: "Monday",
        body: "Find one place where people are relying on PFAS or tape. Ask: can we eliminate it, rail it or cover it? If yes, do it this week. If no, write down why.",
        narration: "Monday. Find one place where people are relying on PFAS or tape. Ask: can we eliminate it, rail it or cover it? If yes, do it this week." }
    ]}
  ],

  kc: { title: "Knowledge check: picking the right system", questions: [
    { id: "m4-kc1", question: "Curtain wall work on an edge that already has perimeter cable rail. Which approach is highest on the hierarchy?", options: [
      { text: "Keep the rail; drop one span at a time with the crew tied off while it's open", correct: true, fb: "Passive protection stays up for everyone else." },
      { text: "Remove the rail and tie the crew off", correct: false, fb: "Compliant for the crew, but everyone else loses protection." },
      { text: "Remove the rail and post a safety monitor", correct: false, fb: "Not allowed on a deck edge." }],
      explain: "Eliminate, then guard (passive), then restrain, then arrest, then administrative.", cite: "ANSI/ASSP Z359.2; 1926.501(b)(1)" },
    { id: "m4-kc2", question: "When can a safety monitoring system be used by itself, with no warning line?", options: [
      { text: "Roofing work on a low-slope roof 50 feet wide or less", correct: true, fb: "Right. The only stand-alone use outside a written plan." },
      { text: "Any deck edge, if the monitor is a competent person", correct: false, fb: "Not on decks." },
      { text: "Any roof, if the crew is small", correct: false, fb: "Roof width and type of work matter, not crew size." }],
      explain: "1926.501(b)(10): on low-slope roofs 50 ft wide or less, a safety monitoring system alone is permitted for roofing work.", cite: "1926.501(b)(10)" },
    { id: "m4-kc3", question: "A guardrail top rail must be…", options: [
      { text: "42 inches, plus or minus 3, and hold 200 pounds", correct: true, fb: "Right: 39 to 45 inches, 200 lb outward or downward." },
      { text: "36 inches and hold 150 pounds", correct: false, fb: "150 lb is the midrail. Top rail is 42 ± 3 in and 200 lb." },
      { text: "Any height, as long as there's a toeboard", correct: false, fb: "Height is specified: 42 ± 3 in." }],
      explain: "Top rail 42 in ± 3 in above the walking surface; withstands 200 lb within 2 in of the top edge.", cite: "1926.502(b)(1), (b)(3)" },
    { id: "m4-kc4", question: "Who writes a site-specific fall protection plan, and who implements it?", options: [
      { text: "A qualified person writes it; a competent person supervises it on site", correct: true, fb: "Right, and only for leading edge, precast or residential work." },
      { text: "The competent person writes and implements it", correct: false, fb: "Writing it takes a qualified person." },
      { text: "The superintendent writes it; the safety monitor runs it", correct: false, fb: "Qualified person writes; competent person implements." }],
      explain: "1926.502(k)(1) and (k)(4): prepared by a qualified person, implemented under the supervision of a competent person.", cite: "1926.502(k)" },
    { id: "m4-kc5", question: "A hole cover on the Level 3 deck must…", options: [
      { text: "Hold twice the load, be secured against moving, and be marked HOLE or COVER", correct: true, fb: "All three." },
      { text: "Be painted orange", correct: false, fb: "Color-coding is one option for marking, but it also has to hold 2× and be secured." },
      { text: "Cover the hole, any material", correct: false, fb: "It has to meet load, securing and marking rules." }],
      explain: "1926.502(i)(2)–(4).", cite: "1926.502(i)" }
  ]}
});
