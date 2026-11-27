/* ==========================================================================
   Hotspot scene registry. Regions are % of the 1600×900 scene (x,y = top-left,
   w,h = size), generated with the art by tools/scene-gen/silica.js.
   Ids are fixed: the exam references them. Voice: Tasha, newly designated
   silica competent person. "why" = why it matters, "fix" = what you do now.
   ========================================================================== */

COURSE.addScene('slab', {
  src: 'assets/art/scene-slab.svg', w: 1600, h: 900,
  title: 'Level 2 slab, 7:20 a.m.',
  alt: 'Riverside Level 2, inside the building: Dee kneeling and cutting the slab with a handheld saw, a laborer blowing dust with an air hose, a jackhammer at a trench, a core rig, a walk-behind saw with water, a worker sweeping, a drywall crew at the back wall, and a worker drilling into block with a vacuum attached.',
  hazards: [
    { id: 'dry-cut-saw', x: 12.5, y: 62.2, w: 27.5, h: 35.6, severity: 3,
      label: 'Dee dry-cutting the slab with a handheld saw, indoors',
      why: 'A handheld saw on concrete is a Table 1 task, but only with water delivered to the blade. Dry, indoors, that plume is the dust that ends up in her lungs.',
      fix: 'Stop the cut. Hook up the water feed and set the flow to knock down visible dust. Indoors she also needs an APF 10 respirator, at any duration, and you need exhaust moving the air.',
      cite: '1926.1153(c)(1) Table 1 (ii); 1926.1153(c)(2)(i)' },
    { id: 'compressed-air', x: 29.4, y: 44.4, w: 14.4, h: 22.2, severity: 2,
      label: 'Blowing down the floor with compressed air',
      why: 'Compressed air turns settled dust back into breathing dust, for everyone on the floor.',
      fix: 'Put the air hose away. HEPA vacuum or wet clean. Compressed air is only allowed with a system that captures the dust cloud, or when nothing else is feasible.',
      cite: '1926.1153(f)(2)' },
    { id: 'jackhammer-dry', x: 43.8, y: 47.8, w: 10, h: 21.1, severity: 2,
      label: 'Jackhammer indoors with no water or shroud',
      why: 'Chipping concrete with no control means the task is off Table 1. Indoors, even a controlled jackhammer needs an APF 10 respirator.',
      fix: 'Add a water spray at the point of impact, or a shroud with a dust collector. Get him in an APF 10 respirator and set up exhaust.',
      cite: '1926.1153(c)(1) Table 1 (x)' },
    { id: 'core-drill-dry', x: 66.3, y: 44.4, w: 15, h: 25.6, severity: 2,
      label: 'Core rig running with the water hose disconnected',
      why: 'Rig-mounted core drills are on Table 1 with water delivered to the bit. The hose is lying on the floor, so the control is not implemented.',
      fix: 'Shut it down, reconnect the water and confirm slurry at the bit before restarting.',
      cite: '1926.1153(c)(1) Table 1 (vi)' },
    { id: 'dry-sweep', x: 76.3, y: 71.1, w: 17.5, h: 27.8, severity: 2,
      label: 'Dry sweeping concrete dust',
      why: 'A push broom puts the fine dust right back in the air. Dry sweeping is not allowed where it could add to exposure unless wet sweeping or HEPA vacuuming is not feasible.',
      fix: 'Swap the broom for a HEPA vac, or mist the floor and wet sweep.',
      cite: '1926.1153(f)(1)' },
    { id: 'drywall-crew-exposed', x: 84.4, y: 30, w: 15.6, h: 25.6, severity: 2,
      label: 'Drywall crew working in the cutting area with no barrier',
      why: 'Another employer\'s crew is breathing your dust. The written plan has to say how you restrict access, including exposures between employers.',
      fix: 'Set a barrier and signs around the cutting, schedule the cutting around them, or move them until it\'s done. Talk to their foreman.',
      cite: '1926.1153(g)(1)(iv)' }
  ],
  decoys: [
    { id: 'walkbehind-wet-good', x: 52.5, y: 65.6, w: 20, h: 24.4, label: 'Walk-behind saw with water',
      why: 'Water hose connected, spray at the blade, slurry on the floor, very little visible dust. That\'s Table 1 working. Indoors he still needs APF 10.' },
    { id: 'hepa-drill-good', x: 8.8, y: 37.8, w: 10.6, h: 25.6, label: 'Rotary hammer with a shroud and HEPA vac',
      why: 'Shroud on the bit, hose to a HEPA dust collector. Handheld drills with that setup need no respirator under Table 1.' }
  ]
});

COURSE.addScene('entrance', {
  src: 'assets/art/scene-entrance.svg', w: 1600, h: 900,
  title: 'Main entrance, 10:40 a.m.',
  alt: 'Riverside main entrance, outdoors: a stationary masonry saw throwing a dust plume, two workers eating lunch on block pallets beside it, a skid steer breaking out a curb with its cab door propped open, a mason laying block, two tuckpointers on a scaffold (one with no shroud, one with a beard under a half mask), a worker grinding a quartz countertop on sawhorses, and a painter on the canopy column.',
  hazards: [
    { id: 'masonry-saw-dry', x: 9.4, y: 50, w: 18.8, h: 34.4, severity: 3,
      label: 'Masonry saw cutting block with an empty water tank',
      why: 'The stationary masonry saw is on Table 1 only with integrated water delivery. With the tank dry, the control isn\'t there, and neither is the "no respirator" column.',
      fix: 'Stop, fill the tank, check the pump and water at the blade, then cut.',
      cite: '1926.1153(c)(1) Table 1 (i)' },
    { id: 'lunch-in-dust', x: 28.1, y: 75.6, w: 15, h: 22.2, severity: 1,
      label: 'Crew eating lunch downwind of the saw',
      why: 'They aren\'t cutting, but they\'re breathing it, and eating with dusty hands.',
      fix: 'Move breaks upwind and away from cutting. Restrict the area around the saw to the people running it.',
      cite: '1926.1153(g)(1)(iv)' },
    { id: 'cab-door-open', x: 35, y: 55.6, w: 18.8, h: 24.4, severity: 2,
      label: 'Skid steer breaking concrete with the cab door propped open',
      why: 'Demolition with heavy equipment is controlled by an enclosed cab. A propped door means no positive pressure and no filtered air.',
      fix: 'Close the door, check the seals and the filter, and use water on the work when anyone is on foot nearby.',
      cite: '1926.1153(c)(1) Table 1 (xvii); 1926.1153(c)(2)(iii)' },
    { id: 'tuckpoint-no-shroud', x: 68.8, y: 16.7, w: 11.9, h: 21.7, severity: 3,
      label: 'Tuckpointing with no shroud or dust collector',
      why: 'Mortar removal is one of the dustiest tasks on the table. Even fully controlled, it needs APF 10 for 4 hours or less and APF 25 over 4 hours.',
      fix: 'Stop. Shroud plus a dust collector with the right airflow and a 99% filter, then the right respirator for the hours.',
      cite: '1926.1153(c)(1) Table 1 (xi)' },
    { id: 'beard-half-mask', x: 83.8, y: 16.7, w: 8.8, h: 21.7, severity: 2,
      label: 'Full beard under a tight-fitting half mask',
      why: 'His controls look right, and tuckpointing still requires a respirator. A beard under the seal means the mask leaks around his face.',
      fix: 'He shaves where the seal sits or switches to a loose-fitting PAPR. Until then, he doesn\'t grind.',
      cite: '1910.134(g)(1)(i)(A); 1926.1153(e)' },
    { id: 'quartz-dry-cut', x: 67.5, y: 66.7, w: 25, h: 28.9, severity: 3,
      label: 'Cutting quartz countertop dry with a grinder',
      why: 'Engineered stone can be over 90% silica. Dry cutting it is the work driving new, severe silicosis cases.',
      fix: 'Stop. Cut it in the fab shop, or use a wet-cutting tool. A grinder with water, or a shroud and collector, follows the grinder row of Table 1.',
      cite: '1926.1153(c)(1) Table 1 (xii)' }
  ],
  decoys: [
    { id: 'laying-block-ok', x: 53.8, y: 47.8, w: 16.9, h: 16.7, label: 'Mason laying block',
      why: 'Setting block in mortar doesn\'t make respirable dust. Cutting, grinding and drilling do. Keep an eye on him when he starts cutting.' },
    { id: 'painter-ok', x: 1.9, y: 41.1, w: 8.1, h: 27.8, label: 'Painter on the canopy column',
      why: 'Rolling paint isn\'t a silica task. If he were grinding the concrete column first, it would be.' }
  ]
});
