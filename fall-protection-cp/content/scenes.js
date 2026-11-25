/* ==========================================================================
   Hotspot scene registry (BUILD-SPEC §8). Regions are % of the 1600×900 scene:
   x,y = top-left corner, w,h = size. Hazard ids are fixed — the exam uses them.
   Voice: Tasha, newly designated competent person. "why" = why it matters,
   "fix" = what you do about it right now.
   ========================================================================== */

COURSE.addScene('deck', {
  src: 'assets/art/scene-deck.svg', w: 1600, h: 900,
  title: 'Level 3 deck pour, 7:40 a.m.',
  alt: 'Riverside Level 3 deck during a concrete pour: pump hose over the west edge, a crane-landed rebar bundle, Ray outside the cable rail, rebar mats, floor openings and covers, a stair opening with wood guardrail, and a decking crew at the next bay\'s leading edge.',
  hazards: [
    { id: 'pump-hose-rail-removed', x: 21, y: 37, w: 9, h: 17, severity: 3,
      label: 'Rail pulled for the pump hose, never put back',
      why: 'The cables came off so the boom could swing in. Now there\'s an open edge right where the hose crew walks backward dragging hose.',
      fix: 'Drop only the span you need, rig a short rail around the hose, or put the hose crew on PFAS. Cables go back before the pump leaves.',
      cite: '1926.501(b)(1); 1926.502(b)' },
    { id: 'ray-outside-rail', x: 10.5, y: 51, w: 7.5, h: 19.5, severity: 3,
      label: 'Ray outside the cable rail, guiding a load',
      why: 'He\'s on the wrong side of the only thing between him and a 28-foot drop. "Done it a hundred times" is how the hundred-and-first goes.',
      fix: 'Bring him inside the rail and guide with a tagline. If someone truly has to be outside, they\'re tied to a rated anchor first.',
      cite: '1926.501(b)(1); 1926.502(d)(15)' },
    { id: 'deck-edge-open', x: 0.5, y: 73, w: 14, h: 22, severity: 3,
      label: 'Open deck edge: cables down',
      why: 'Posts are standing but the cables are lying on the deck. From ten feet back it looks protected. It isn\'t.',
      fix: 'Stop work in that bay, re-hang top and mid cables, tension and flag them, then reopen it.',
      cite: '1926.501(b)(1); 1926.502(b)(1)' },
    { id: 'rebar-foot-tieoff', x: 25.2, y: 68.5, w: 7.8, h: 18, severity: 3,
      label: 'Tied off to rebar at his feet',
      why: 'Rebar isn\'t a rated anchor, and tying off at your feet adds your own height to the free fall: about 11 feet, not 6.',
      fix: 'Move him to an approved anchor at or above D-ring height, or a leading-edge SRL rated for foot-level tie-off.',
      cite: '1926.502(d)(15); 1926.502(d)(16)(iii)' },
    { id: 'floor-hole-open', x: 44, y: 83.5, w: 8.5, h: 7.8, severity: 3,
      label: 'Uncovered chase opening',
      why: 'A 3-by-2 hole in a rebar mat. Everybody out here is looking down at tie wire, not at the hole.',
      fix: 'Cover it now: holds twice the load, secured so it can\'t slide, marked HOLE or COVER. Or rail it.',
      cite: '1926.501(b)(4)(i); 1926.502(i)' },
    { id: 'cover-unmarked', x: 61.3, y: 66.5, w: 9.2, h: 7.8, severity: 2,
      label: 'Loose, unmarked cover',
      why: 'Plywood that\'s already slid off its hole. No cleats, no marking. Somebody will grab it for a pump pad by lunch.',
      fix: 'Reset it over the full opening, screw or cleat it down, paint HOLE or COVER on it.',
      cite: '1926.502(i)(3); 1926.502(i)(4)' },
    { id: 'leading-edge-unprotected', x: 64.5, y: 29, w: 21.5, h: 13.5, severity: 3,
      label: 'Decking crew at the leading edge, no protection',
      why: 'Fresh deck, open edge, 28 feet up. Decking is steel erection, so Subpart R sets their rules, but nobody gets to work exposed.',
      fix: 'Stop and ask for their plan: controlled decking zone limits, PFAS on SRLs, or nets. Bring in the erector\'s competent person.',
      cite: '1926.760(a)(1); 1926.760(c) (Subpart R)' }
  ],
  decoys: [
    { id: 'rail-good', x: 72.8, y: 50, w: 15.2, h: 15.5, label: 'Stair opening guardrail',
      why: 'Top rail, midrail and toeboard on every open side. That\'s what right looks like. Nothing to fix here.' },
    { id: 'cover-good', x: 81, y: 89.8, w: 9.4, h: 7.5, label: 'Marked, cleated cover',
      why: 'Marked HOLE, screwed down, bigger than the opening. Leave it alone and thank whoever set it.' }
  ]
});

COURSE.addScene('roof', {
  src: 'assets/art/scene-roof.svg', w: 1600, h: 900,
  title: 'Riverside roof, 10:15 a.m.',
  alt: 'Riverside low-slope TPO roof: a material hoist landing at the west edge, a warning line that runs too close to the edge at the front, two skylights (one screened), an open roof hatch, rooftop units, a low east parapet and roofers at work.',
  hazards: [
    { id: 'hoist-gap', x: 19, y: 32, w: 12.5, h: 17.4, severity: 3,
      label: 'Hoist landing: rail removed, worker reaching out',
      why: 'The rail came off to load the hoist and he\'s leaning past the edge to drag a roll in. Four stories down.',
      fix: 'Gate the landing (chain or swing gate) or put whoever works it on PFAS to a rated anchor.',
      cite: '1926.501(b)(3); 1926.501(b)(10)' },
    { id: 'worker-outside-line', x: 18.3, y: 49.5, w: 6, h: 18, severity: 3,
      label: 'Worker between the warning line and the edge',
      why: 'A warning line only works if you stay inside it. Out here he has nothing at all.',
      fix: 'Bring him in. Anyone who has to work between the line and the edge needs guardrail, nets, PFAS, or a safety monitor.',
      cite: '1926.501(b)(10); 1926.502(f)(3)' },
    { id: 'warning-line-close', x: 2, y: 68, w: 17, h: 31, severity: 2,
      label: 'Warning line set too close to the edge',
      why: 'Up front the line wanders in to about two feet from the edge. You can trip over it and still go off the roof.',
      fix: 'Reset it at least 6 feet from the edge, rope 34 to 39 inches high, flagged every 6 feet.',
      cite: '1926.502(f)(1)(i); 1926.502(f)(2)' },
    { id: 'skylight-open', x: 37, y: 58, w: 10.8, h: 12, severity: 3,
      label: 'Skylight with no screen or cover',
      why: 'Skylights are holes. The dome won\'t hold a man who backs into it while he unrolls membrane.',
      fix: 'Screen it, cover it, or rail it before anyone works nearby. Treat every skylight as a hole in the roof.',
      cite: '1926.501(b)(4)(i); 1926.502(i)' },
    { id: 'roof-hatch-open', x: 70.8, y: 69.8, w: 8.6, h: 16, severity: 2,
      label: 'Open roof hatch, no guardrail',
      why: 'Lid up, opening unguarded, and a guy carrying a box is backing toward it.',
      fix: 'Close it when not in use, or put a hatch rail or temporary guardrail around it.',
      cite: '1926.501(b)(4)(i)' },
    { id: 'parapet-low', x: 88.8, y: 45, w: 9, h: 19.5, severity: 3,
      label: 'Leaning over the 24-inch parapet',
      why: 'A 24-inch parapet hits you at the knee. It\'s a trip edge, not a guardrail. He\'s leaning past it.',
      fix: 'Treat the east side as an unprotected edge: guardrail to 42 inches, or PFAS. Look down from a tied-off spot.',
      cite: '1926.501(b)(10); 1926.502(b)(1)' }
  ],
  decoys: [
    { id: 'skylight-screened', x: 56.5, y: 49.8, w: 11.5, h: 10, label: 'Screened skylight',
      why: 'A steel screen over the dome, fastened down. That one is protected.' },
    { id: 'inside-line-ok', x: 51.5, y: 74.5, w: 7.5, h: 18.5, label: 'Roofer inside the warning line',
      why: 'He\'s welding seams well inside a properly set warning line. On a low-slope roof doing roofing work, that\'s compliant without a harness.' }
  ]
});

COURSE.addScene('shaft', {
  src: 'assets/art/scene-shaft.svg', w: 1600, h: 900,
  title: 'Level 2 interior, 1:30 p.m.',
  alt: 'Riverside Level 2 interior: a low-sill exterior wall opening, the elevator shaft door with its barricade knocked down, Stair 1 opening with only caution tape, Stair 2 opening with its near-side rail removed, floor covers, and a worker standing on a bucket.',
  hazards: [
    { id: 'elevator-shaft-open', x: 36.4, y: 24.5, w: 13.2, h: 31, severity: 3,
      label: 'Elevator shaft door open, barricade down',
      why: 'The barricade is lying on the floor and a cart is rolling toward a door that drops to the pit.',
      fix: 'Put the barricade back and fasten it so it can\'t be knocked down, 42-inch top rail, midrail. Then find out who moved it.',
      cite: '1926.501(b)(14); 1926.502(b)' },
    { id: 'stair-caution-tape', x: 11.5, y: 59, w: 24, h: 21.5, severity: 3,
      label: 'Stair 1 "protected" by caution tape',
      why: 'Tape is a sign, not a rail. It won\'t stop a guy carrying drywall who can\'t see his feet.',
      fix: 'Replace the tape with a real guardrail: 42-inch top rail that takes 200 pounds, midrail, toeboard.',
      cite: '1926.501(b)(4)(i); 1926.502(b)(3)' },
    { id: 'stair-open', x: 60, y: 66.5, w: 22, h: 11.5, severity: 3,
      label: 'Stair 2: near-side rail removed',
      why: 'Three sides railed, one side wide open, rails lying on the floor. That side faces the main walk path.',
      fix: 'Put the rail back now. If material has to go in that way, use a removable gate and close it behind you.',
      cite: '1926.501(b)(4)(i); 1926.502(b)' },
    { id: 'wall-opening-low', x: 6.4, y: 23, w: 18.5, h: 25, severity: 3,
      label: 'Wall opening with a 12-inch sill',
      why: 'The sill is lower than 39 inches and it\'s 14 feet to the ground outside. He\'s leaning out to measure it.',
      fix: 'Guardrail across the opening (top rail at 42 inches, midrail) until the window goes in, or PFAS.',
      cite: '1926.501(b)(14)' },
    { id: 'cover-displaced', x: 42, y: 85, w: 12.2, h: 9.5, severity: 3,
      label: 'Cover kicked off its hole',
      why: 'The cover is sitting next to the hole it\'s supposed to cover, and the next guy is carrying a box right at it.',
      fix: 'Reset it, fasten it down so it can\'t be kicked off, mark it COVER. Check the others while you\'re at it.',
      cite: '1926.502(i)(3); 1926.502(i)(4)' },
    { id: 'bucket-ladder', x: 90.8, y: 45, w: 5.8, h: 26.5, severity: 1,
      label: 'Standing on a bucket to reach the conduit',
      why: 'Not a Subpart M exposure at that height, but it\'s still a fall. Ladders and stepladders are Subpart X.',
      fix: 'Get him a stepladder or a rolling platform. Scope note: ladder rules live in Subpart X.',
      cite: '1926.1053 (Subpart X scope note)' }
  ],
  decoys: [
    { id: 'stair-rail-good', x: 62.5, y: 48.5, w: 20.5, h: 9.5, label: 'Stair 2: far-side rail',
      why: 'Top rail, midrail and toeboard, solid posts. This side is fine. The problem is the near side.' },
    { id: 'cover-secured', x: 72.4, y: 87.5, w: 10.9, h: 8, label: 'Secured, marked cover',
      why: 'Marked COVER, fastened at the corners, oversized. Good cover.' }
  ]
});

/* ---- "Tomorrow" variants: same views, next morning ---- */
COURSE.addScene('deck-tomorrow', {
  src: 'assets/art/scene-deck-tomorrow.svg', w: 1600, h: 900,
  title: 'Level 3 deck, the next morning',
  alt: 'The same Level 3 deck a day later: the slab is poured, the rail gap from the pump is still open, a crane is landing deck bundles where the cables were unhooked, the decking crew has moved to a new leading edge, a plumber has stripped a blockout and left the cover off.',
  hazards: [
    { id: 'dt-rail-not-replaced', x: 21, y: 37, w: 9, h: 17, severity: 3,
      label: 'The pump-hose gap is still open',
      why: 'The pump left yesterday. The cables didn\'t go back. Nobody "owns" a gap once the crew that made it leaves.',
      fix: 'Whoever opens the rail closes it. Make it part of the pour checklist and walk it before the crew leaves.',
      cite: '1926.501(b)(1)' },
    { id: 'dt-landing-zone-open', x: 3.5, y: 48, w: 17, h: 22, severity: 3,
      label: 'Cables unhooked for a crane landing',
      why: 'Today\'s delivery needed the edge open, so the cables came down and a worker is reaching for the load.',
      fix: 'Plan landings: a gated landing platform, or PFAS to a rated anchor for the people working the open edge.',
      cite: '1926.501(b)(1); 1926.502(d)(15)' },
    { id: 'dt-new-leading-edge', x: 66, y: 26, w: 22, h: 12, severity: 3,
      label: 'The leading edge moved',
      why: 'The decking crew is a bay further out. Yesterday\'s plan covered yesterday\'s edge.',
      fix: 'Re-check the decking crew\'s protection every time the edge moves. Ask, don\'t assume.',
      cite: '1926.760(a)(1); 1926.760(c)' },
    { id: 'dt-blockout-stripped', x: 64, y: 72.5, w: 11.3, h: 10.5, severity: 3,
      label: 'Blockout stripped, cover slid aside',
      why: 'The plumber pulled the form out of a sleeve, slid the cover over to work, and walked off for parts.',
      fix: 'Covers go back the moment you step away. Tell the trade foreman, then check every opening on the deck.',
      cite: '1926.501(b)(4)(i); 1926.502(i)(3)' },
    { id: 'dt-chase-still-open', x: 44, y: 83.5, w: 8.5, h: 7.8, severity: 3,
      label: 'Yesterday\'s chase is still open',
      why: 'Concrete got poured around it. Nobody covered it. Same hole, new day.',
      fix: 'Cover, secure, mark. Then ask why the daily walk didn\'t catch it.',
      cite: '1926.501(b)(4)(i)' }
  ],
  decoys: [
    { id: 'dt-rail-fixed', x: 0.5, y: 73, w: 14, h: 22, label: 'Front-left rail re-hung',
      why: 'Yesterday\'s open edge got fixed: both cables are back, tensioned and flagged.' },
    { id: 'dt-cover-good', x: 81, y: 89.8, w: 9.4, h: 7.5, label: 'Marked, cleated cover',
      why: 'Still marked and still fastened. Good.' }
  ]
});

COURSE.addScene('roof-tomorrow', {
  src: 'assets/art/scene-roof-tomorrow.svg', w: 1600, h: 900,
  title: 'Riverside roof, the next morning',
  alt: 'The same roof a day later: roofing has moved to the northwest corner past the old warning line, the skylight screen is off for flashing work, a crane is setting a new rooftop unit near the low east parapet, and the hatch is closed.',
  hazards: [
    { id: 'rt-line-not-moved', x: 21.5, y: 36, w: 12, h: 23, severity: 3,
      label: 'Work moved, warning line didn\'t',
      why: 'The crew is roofing the northwest corner. The warning line is still where yesterday\'s work was.',
      fix: 'Move the line with the work, at least 6 feet from every edge around the work area.',
      cite: '1926.502(f)(1)' },
    { id: 'rt-screen-removed', x: 56.5, y: 50, w: 12.5, h: 15, severity: 3,
      label: 'Skylight screen pulled for flashing',
      why: 'The flashing crew needs the screen off to work. Now it\'s an open hole and they\'re kneeling right at it.',
      fix: 'PFAS for the flashing crew while the screen is off, or a temporary cover. Screen goes back the same shift.',
      cite: '1926.501(b)(4)(i)' },
    { id: 'rt-rtu-landing', x: 86.5, y: 47, w: 11.5, h: 26, severity: 3,
      label: 'Setting a rooftop unit at the low parapet',
      why: 'The crane is landing a unit near the 24-inch parapet and the tagline guy is leaning over it.',
      fix: 'Plan the lift: guardrail or PFAS at that edge, tagline from a safe spot, nobody between the load and the edge.',
      cite: '1926.501(b)(10); 1926.502(b)(1)' },
    { id: 'rt-skylight-still-open', x: 37, y: 58, w: 10.8, h: 12, severity: 3,
      label: 'Yesterday\'s skylight is still unprotected',
      why: 'Nobody screened it. A hazard you saw yesterday and didn\'t fix is today\'s near miss.',
      fix: 'Screen or cover it today. Write it on the walk sheet until it\'s closed out.',
      cite: '1926.501(b)(4)(i)' }
  ],
  decoys: [
    { id: 'rt-hatch-closed', x: 70.8, y: 72, w: 8.6, h: 12, label: 'Hatch closed',
      why: 'Lid down, latched. That one got fixed.' }
  ]
});
