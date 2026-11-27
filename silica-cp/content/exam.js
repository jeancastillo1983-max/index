/* ==========================================================================
   Final exam — 25 slots × 3 interchangeable questions (75 items).
   Blueprint (SILICA-BUILD-SPEC §5):
     M1 2 · M2 3 · M3 3 · M4 7 · M5 3 · M6 4 · M7 3 = 25
     Scenario slots 18 · Critical slots 5:
       s08 Table 1 control selection · s09 respirator by duration and location ·
       s16 when an exposure assessment is required · s19 no dry sweeping or
       compressed air · s23 restrict access or stop work.
   Option shorthand: a leading "+" marks a correct option (stripped at load).
   ========================================================================== */
(function (C) {
  'use strict';

  function opts(list) {
    return list.map(function (t) { var ok = t.charAt(0) === '+'; return { text: ok ? t.slice(1) : t, correct: ok }; });
  }
  function balance(id, options) {
    var h = 0;
    for (var i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 9973;
    var target = h % options.length;
    var cur = options.findIndex(function (o) { return o.correct; });
    if (cur < 0 || cur === target) return options;
    if (options.every(function (o) { return /^\d/.test(o.text); })) return options;
    var out = options.slice();
    var t = out[target]; out[target] = out[cur]; out[cur] = t;
    return out;
  }
  function mc(id, module, stem, list, explain, cite) {
    return { id: id, type: 'mc', module: module, stem: stem, options: balance(id, opts(list)), explain: explain, cite: cite };
  }
  function multi(id, module, stem, list, explain, cite) {
    return { id: id, type: 'multi', module: module, stem: stem, options: opts(list), explain: explain, cite: cite };
  }
  function seq(id, module, stem, items, explain, cite) {
    return { id: id, type: 'sequence', module: module, stem: stem, items: items, explain: explain, cite: cite };
  }
  function hot(id, module, scene, stem, correct, explain, cite) {
    return { id: id, type: 'hotspot', module: module, scene: scene, stem: stem, correct: correct, explain: explain, cite: cite };
  }

  var slots = [

    /* =====================================================================
       MODULE 1 — Why silica matters (2 slots, 1 scenario)
       ===================================================================== */
    { id: 's01', area: 'm1', critical: false, scenario: false, tag: 'health effects', pool: [
      mc('s01a', 'm1', 'Which disease is caused only by breathing crystalline silica dust?',
        ['Asthma', '+Silicosis', 'Mesothelioma', 'Hearing loss'],
        'Silicosis is scarring of the lungs caused by respirable crystalline silica. It cannot be cured. Silica also causes lung cancer, COPD and kidney disease.',
        '1926.1153(i)(1); 1910.1200'),
      multi('s01b', 'm1', 'Select every disease linked to respirable crystalline silica exposure.',
        ['+Silicosis', '+Lung cancer', '+COPD', '+Kidney disease', 'Skin cancer'],
        'Silicosis, lung cancer, COPD and kidney disease are all linked to silica. Hazard communication and training must cover cancer, lung effects, immune system effects and kidney effects.',
        '1926.1153(i)(1)'),
      mc('s01c', 'm1', 'Why is silica dust you cannot see still a problem?',
        ['It is not; visible dust is the only dust that matters',
         '+The respirable particles that reach deep in the lungs are too small to see',
         'Invisible dust is all non-crystalline and harmless',
         'Only dust larger than a grain of sand can be breathed in'],
        'Respirable particles are a small fraction of the width of a hair. A haze you can barely see can carry enough to exceed the limit.',
        '1926.1153(b) "respirable crystalline silica"')
    ] },

    { id: 's02', area: 'm1', critical: false, scenario: true, tag: 'just dust', pool: [
      mc('s02a', 'm1', 'Ray, 56, has cut block dry his whole career. He says: "I feel fine, so the dust didn\'t hurt me." What is the best answer?',
        ['He is right. If he had silicosis he would know by now.',
         '+Silicosis can take 10 or more years to show symptoms, and the damage is permanent. Feeling fine is not proof.',
         'Only workers under 40 are at risk',
         'He is fine as long as he quits smoking'],
        'Chronic silicosis usually appears 10 or more years after exposure. By the time someone is short of breath, the scarring cannot be reversed.',
        '1926.1153(i)(1)'),
      mc('s02b', 'm1', 'A laborer asks why the silica rule matters if "masons have always breathed this stuff." Which fact answers best?',
        ['The rule mostly protects office workers',
         '+OSHA estimated the rule would save more than 600 lives and prevent more than 900 new silicosis cases a year',
         'Silica is only dangerous in mines',
         'The rule only applies to jobs over $1 million'],
        'About 2.3 million U.S. workers are exposed, about 2 million of them in construction. OSHA expected the rule to save 600+ lives and prevent 900+ silicosis cases a year.',
        'OSHA, Silica final rule (2016)'),
      mc('s02c', 'm1', 'Walt, a retired mason, got silicosis after 30 years of dry cutting. What is the main lesson for a competent person?',
        ['Silicosis only happens to old workers, so focus on the veterans',
         'There is nothing anyone could have done',
         '+The disease shows up decades later, so the controls have to work every day now',
         'Respirators alone would have prevented it'],
        'You never see the damage at the time. Controls that work on every cut, every day, are the only prevention.',
        '1926.1153(c), (d)(3)(i)')
    ] },

    /* =====================================================================
       MODULE 2 — The competent person: authority and duty (3 slots, 2 scenario)
       ===================================================================== */
    { id: 's03', area: 'm2', critical: false, scenario: false, tag: 'definition', pool: [
      mc('s03a', 'm2', 'Under the silica standard, what makes someone a competent person?',
        ['A silica card and five years in the trade',
         '+Capable of identifying existing and foreseeable silica hazards, and authorized to take prompt corrective measures to eliminate or minimize them',
         'A degree in industrial hygiene',
         'Being the most senior person on the crew'],
        'Two halves: the knowledge to identify silica hazards, and the employer\'s authority to fix them promptly. The CP also needs the knowledge to implement the written exposure control plan.',
        '1926.1153(b)'),
      mc('s03b', 'm2', 'What is the one duty the silica standard names for the competent person?',
        ['Collecting air samples',
         'Running medical exams',
         '+Frequent and regular inspections of job sites, materials and equipment to implement the written exposure control plan',
         'Writing the respiratory protection program'],
        'The plan must designate a competent person to make frequent and regular inspections of job sites, materials and equipment to implement it.',
        '1926.1153(g)(4)'),
      mc('s03c', 'm2', 'Ray can spot every silica hazard on the job, but the company has never given him authority to stop work or order a fix. Is he the competent person?',
        ['Yes, knowledge is enough',
         '+No. Without authority to take prompt corrective measures, he does not meet the definition',
         'Yes, if he has 20 or more years in',
         'Only if OSHA certifies him'],
        'Authority is half of the definition. The employer grants it; experience alone does not.',
        '1926.1153(b)')
    ] },

    { id: 's04', area: 'm2', critical: false, scenario: true, tag: 'authority', pool: [
      mc('s04a', 'm2', 'Marco, the super, tells the CP to let a crew keep dry cutting for "one more hour" to hit the schedule. What does the CP do?',
        ['Let them finish; the super has the final word',
         '+Stop the dry cutting now, get the water or vac working, and explain to Marco how to keep the schedule with the control in place',
         'Write it up for Monday\'s safety meeting',
         'Hand out N95s and let them finish'],
        'Prompt corrective measures means while people are exposed. Bring the super the fastest compliant fix, not a delay.',
        '1926.1153(b), (c)(1)'),
      mc('s04b', 'm2', 'A drywall sub\'s foreman says the CP has no say over his crew because "we\'re not your company." His crew is working next to your dry jackhammering. Who fixes it?',
        ['Nobody; it is his crew',
         'His crew should leave the floor without telling anyone',
         '+You control your own task\'s dust now and restrict access, then coordinate with him and the super',
         'OSHA will sort it out'],
        'The exposure comes from your task. Your plan\'s access procedures cover exposures to other employers\' workers too.',
        '1926.1153(g)(1)(iv)'),
      mc('s04c', 'm2', 'The CP finds a broken vac shroud and fixes it on the spot. What else should the CP do?',
        ['Nothing; it is fixed',
         '+Note what was found and fixed during the inspection, and tell the supervisor if it keeps happening',
         'Fire the operator',
         'Call OSHA'],
        'An inspection with no record looks like no inspection. Writing down the fix proves the plan is being implemented.',
        '1926.1153(g)(4)')
    ] },

    { id: 's05', area: 'm2', critical: false, scenario: true, tag: 'scope', pool: [
      mc('s05a', 'm2', 'Which work is covered by the construction silica standard?',
        ['Only work on jobs with more than 50 workers',
         '+All occupational exposures to respirable crystalline silica in construction, unless exposures stay below the action level under any foreseeable conditions',
         'Only demolition',
         'Only work with a stationary masonry saw'],
        'The standard covers all construction exposures except where exposure will remain below 25 µg/m³ as an 8-hour TWA under any foreseeable conditions.',
        '1926.1153(a)'),
      mc('s05b', 'm2', 'Mixing a few bags of mortar by hand outdoors for 15 minutes. Most likely status under the standard?',
        ['Always covered at full scope',
         '+Often below the action level under any foreseeable conditions, but the employer must be able to support that',
         'Never covered because mortar has no silica',
         'Covered only if indoors'],
        'Short, low-dust tasks may fall under the exception, but only when exposure will be below the action level under any foreseeable conditions.',
        '1926.1153(a)'),
      mc('s05c', 'm2', 'What is the permissible exposure limit for respirable crystalline silica?',
        ['25 µg/m³ as an 8-hour TWA',
         '+50 µg/m³ as an 8-hour TWA',
         '100 µg/m³ as a 15-minute limit',
         '5 mg/m³ as an 8-hour TWA'],
        'PEL: 50 µg/m³, 8-hour time-weighted average. The action level is 25 µg/m³.',
        '1926.1153(b), (d)(1)')
    ] },

    /* =====================================================================
       MODULE 3 — Spot the silica task (3 slots, all scenario)
       ===================================================================== */
    { id: 's06', area: 'm3', critical: false, scenario: true, tag: 'hotspot slab', pool: [
      hot('s06a', 'm3', 'slab',
        'Level 1 slab. Select every task producing uncontrolled silica dust.',
        ['dry-cut-saw', 'jackhammer-dry', 'core-drill-dry'],
        'The dry handheld saw, the dry jackhammer and the dry core drill. The walk-behind saw with water and the rotary hammer with a shroud and HEPA vac are controlled.',
        '1926.1153(c)(1); Table 1'),
      hot('s06b', 'm3', 'slab',
        'Level 1 slab. Select every housekeeping or access problem.',
        ['compressed-air', 'dry-sweep', 'drywall-crew-exposed'],
        'Blowing dust with compressed air, dry sweeping, and the drywall crew working inside the dust with no barrier.',
        '1926.1153(f)(1)-(2); (g)(1)(iv)'),
      hot('s06c', 'm3', 'slab',
        'Level 1 slab. Select every person or task that needs the CP\'s attention right now.',
        ['dry-cut-saw', 'compressed-air', 'jackhammer-dry', 'core-drill-dry', 'dry-sweep', 'drywall-crew-exposed'],
        'All six: three uncontrolled tasks, two housekeeping violations and an exposed crew from another employer. Only the wet walk-behind saw and the shrouded rotary hammer are fine.',
        '1926.1153(c), (f), (g)(1)(iv)')
    ] },

    { id: 's07', area: 'm3', critical: false, scenario: true, tag: 'hotspot entrance', pool: [
      hot('s07a', 'm3', 'entrance',
        'Main entrance. Select every uncontrolled silica task.',
        ['masonry-saw-dry', 'tuckpoint-no-shroud', 'quartz-dry-cut'],
        'The dry stationary masonry saw, tuckpointing with no shroud, and dry cutting of quartz. Laying block and painting do not generate respirable silica.',
        'Table 1 (i), (xi), (xii)'),
      hot('s07b', 'm3', 'entrance',
        'Main entrance. Select every respirator, cab or exposure problem not caused by a tool.',
        ['lunch-in-dust', 'cab-door-open', 'beard-half-mask'],
        'Eating in the dust zone, the skid steer cab door propped open, and the bearded worker in a tight-fitting half mask.',
        '1926.1153(c)(2)(iii); 1910.134(g)(1)(i)(A)'),
      hot('s07c', 'm3', 'entrance',
        'Main entrance. Select the highest-silica material being cut dry.',
        ['quartz-dry-cut'],
        'Engineered stone (quartz) can be more than 90% crystalline silica, far more than concrete or brick.',
        '1926.1153(c)(1)')
    ] },

    { id: 's20', area: 'm3', critical: false, scenario: true, tag: 'foreseeable', pool: [
      mc('s20a', 'm3', 'Next week\'s schedule adds core drilling on Level 2 and tuckpointing at the entrance. When should the CP plan the controls?',
        ['When the crews show up',
         '+Now: foreseeable tasks need a Table 1 row or an assessment, plus the equipment, before work starts',
         'After the first day of work',
         'Only if someone complains'],
        'A competent person identifies existing and foreseeable silica hazards. Next week\'s work is foreseeable.',
        '1926.1153(b)'),
      multi('s20b', 'm3', 'Select every material likely to contain crystalline silica.',
        ['+Concrete', '+Brick and CMU', '+Mortar', '+Engineered stone', 'Gypsum drywall (no silica fillers)'],
        'Concrete, brick, block, mortar and engineered stone all contain crystalline silica. Check the SDS for products like joint compound and drywall.',
        '1926.1153(a); 1910.1200'),
      mc('s20c', 'm3', 'The CP is unsure whether a new patching compound contains silica. Where should the CP look first?',
        ['Ask the supplier\'s driver',
         '+The safety data sheet (SDS)',
         'Smell it',
         'Assume it is fine'],
        'The SDS lists hazardous ingredients, including crystalline silica, under hazard communication.',
        '1910.1200(g)')
    ] },

    /* =====================================================================
       MODULE 4 — Table 1 in the field (7 slots, 6 scenario, 2 critical)
       ===================================================================== */
    { id: 's08', area: 'm4', critical: true, scenario: true, tag: 'Table 1 control selection', pool: [
      mc('s08a', 'm4', 'Gus will cut CMU outdoors with a handheld power saw for about 2 hours. Which Table 1 control is required?',
        ['A dust mask and good ventilation',
         '+Integrated water delivery that continuously feeds water to the blade, operated per the manufacturer to minimize dust',
         'A shroud with no vacuum',
         'Cutting upwind'],
        'Table 1 (ii), handheld power saws: use a saw with integrated water delivery that continuously feeds water to the blade. Outdoors, no respirator up to 4 hours.',
        'Table 1 (ii)'),
      mc('s08b', 'm4', 'Dee will drill anchor holes in concrete with a rotary hammer. Which Table 1 control is required?',
        ['Water spray only',
         'Nothing, because each hole takes seconds',
         '+A shroud around the bit with a dust collector (filter 99% or better, filter-cleaning mechanism), and a HEPA vac to clean the holes, not compressed air',
         'An N95 respirator'],
        'Table 1 (vii), handheld drills: commercially available shroud or cowling with dust collection system, and a HEPA vacuum for cleaning holes. No respirator required at any duration.',
        'Table 1 (vii)'),
      mc('s08c', 'm4', 'Ray is removing mortar by tuckpointing for 3 hours. Which Table 1 control is required?',
        ['Water spray from a garden hose',
         '+A shroud with a dust collector providing 25 cfm or more of airflow per inch of wheel, with a 99% filter and filter-cleaning mechanism',
         'Any shop vacuum',
         'An open-face grinder with a fan blowing the dust away'],
        'Table 1 (xi), tuckpointing grinders: shroud plus dust collector at 25 cfm per inch of wheel diameter, 99% filter, cyclonic pre-separator or filter-cleaning mechanism. Plus APF 10 up to 4 hours.',
        'Table 1 (xi)')
    ] },

    { id: 's09', area: 'm4', critical: true, scenario: true, tag: 'respirator by duration', pool: [
      mc('s09a', 'm4', 'Ray will jackhammer the Level 1 slab indoors for 3 hours, with water delivery. What respirator does Table 1 require?',
        ['None, because it is under 4 hours',
         '+APF 10, because indoors requires APF 10 at any duration',
         'APF 25',
         'None, because water is used'],
        'Table 1 (x), jackhammers: outdoors none up to 4 hours and APF 10 over 4 hours; indoors or in an enclosed area APF 10 at any duration.',
        'Table 1 (x)'),
      mc('s09b', 'm4', 'Dee will tuckpoint for 6 hours with a fully working shroud and vac. What respirator does Table 1 require?',
        ['None', 'APF 10', '+APF 25', 'An N95 at the end of the shift'],
        'Table 1 (xi): APF 10 up to 4 hours, APF 25 over 4 hours. A loose-fitting PAPR is a common APF 25 choice.',
        'Table 1 (xi)'),
      mc('s09c', 'm4', 'Gus cuts with a handheld saw with water outdoors: 2 hours in the morning, then 3 more hours after lunch. What does Table 1 require?',
        ['None, because each period is under 4 hours',
         '+APF 10 for the whole shift, because total time on the task exceeds 4 hours',
         'APF 25',
         'APF 10 for the afternoon only'],
        'Total duration counts. When a worker performs Table 1 tasks for a combined total of more than 4 hours, use the "more than 4 hours" column for each task.',
        'Table 1 (ii); 1926.1153(c)(3)')
    ] },

    { id: 's10', area: 'm4', critical: false, scenario: true, tag: 'fully and properly', pool: [
      mc('s10a', 'm4', 'The saw has integrated water, but the tank is nearly empty and a gray plume is coming off the blade. Is Table 1 being followed?',
        ['Yes, the saw has water delivery',
         '+No. The control must be fully and properly implemented: water flow must be enough to minimize visible dust',
         'Yes, as long as the operator wears a respirator',
         'Only if the plume reaches other workers'],
        'Water flow rate must be sufficient to minimize release of visible dust. A visible plume means the control is not working.',
        '1926.1153(c)(1), (c)(2)(ii)'),
      mc('s10b', 'm4', 'The rotary hammer has a shroud, but the vacuum filter is clogged and suction is weak. What is the call?',
        ['Keep drilling; a shroud is installed',
         '+Stop, clean or replace the filter and restore airflow, then restart',
         'Switch to compressed air to clean the holes',
         'Let them finish and clean the filter tomorrow'],
        'A dust collector with a clogged filter is not providing the required capture. Fix the control before work resumes.',
        'Table 1 (vii); 1926.1153(c)(1)'),
      multi('s10c', 'm4', 'Select every sign a Table 1 control is NOT fully and properly implemented.',
        ['+Visible dust from a water-fed saw', '+Cracked shroud on a grinder', '+Vacuum airflow below the required rate', 'A slurry puddle under a wet saw', '+Enclosed cab door propped open'],
        'Visible dust, damaged shrouds, low airflow and open cab doors all mean the control is not working as designed. Slurry under a wet saw is normal; clean it up before it dries.',
        '1926.1153(c)(1)-(2)')
    ] },

    { id: 's11', area: 'm4', critical: false, scenario: true, tag: 'indoors', pool: [
      mc('s11a', 'm4', 'Table 1 tasks done indoors or in an enclosed area also require what?',
        ['Nothing more',
         '+Adequate exhaust to minimize the accumulation of visible airborne dust',
         'A second worker as a dust watch',
         'Working only at night'],
        'When performing Table 1 tasks indoors or in an enclosed area, provide a means of exhaust as needed to minimize accumulation of visible airborne dust.',
        '1926.1153(c)(2)(i)'),
      mc('s11b', 'm4', 'A walk-behind saw with water cuts the Level 1 slab, inside the building shell, for 3 hours. Respirator?',
        ['None', '+APF 10', 'APF 25', 'An N95 only for the operator\'s helper'],
        'Table 1 (iv), walk-behind saws: outdoors none; indoors or in an enclosed area APF 10 at any duration.',
        'Table 1 (iv)'),
      mc('s11c', 'm4', 'The CMU saw is moved from the open lot into the half-enclosed stairwell. What changes?',
        ['Nothing, it is the same saw',
         '+Check whether the respirator column changes for indoors or enclosed areas, and add exhaust as needed',
         'Switch to dry cutting to avoid slurry',
         'Only the noise level'],
        'Location changes the row\'s respirator requirement for several tasks and triggers the indoor exhaust requirement.',
        '1926.1153(c)(2)(i); Table 1')
    ] },

    { id: 's12', area: 'm4', critical: false, scenario: true, tag: 'enclosed cab', pool: [
      multi('s12a', 'm4', 'For an enclosed cab to count as a Table 1 control, which conditions must be met?',
        ['+Maintained as free as practicable from settled dust', '+Door seals and closing mechanisms working properly', '+Positive pressure with filtered air (95% efficiency, 0.3–10 µm)', '+Heating and cooling capabilities', 'A radio in the cab'],
        'Enclosed cabs must be kept free of settled dust, have working door seals and gaskets, positive pressure with filtered air, intake filtration of 95% for 0.3–10 µm particles, and heating and cooling.',
        '1926.1153(c)(2)(iii)'),
      mc('s12b', 'm4', 'The skid steer operator props the cab door open because the AC is broken. Breaking up concrete outside. What is the call?',
        ['Fine, the operator is outdoors',
         '+The cab no longer meets the enclosed-cab requirements; fix it or use another control before work continues',
         'Give the operator a dust mask and continue',
         'Spray water on the operator'],
        'A cab with the door open has no positive pressure, and heating/cooling is one of the required conditions. Fix the cab or change the control.',
        '1926.1153(c)(2)(iii); Table 1 (xvii)'),
      mc('s12c', 'm4', 'A heavy equipment operator demolishing a CMU wall needs which Table 1 controls?',
        ['None; equipment work is exempt',
         '+Operate from an enclosed cab and use water as needed to minimize dust for nearby workers',
         'A respirator only',
         'Work only on calm days'],
        'Table 1 (xvii): operate from within an enclosed cab, and apply water and/or dust suppressants as necessary to minimize dust emissions.',
        'Table 1 (xvii)')
    ] },

    { id: 's13', area: 'm4', critical: false, scenario: false, tag: 'off the table', pool: [
      mc('s13a', 'm4', 'A task is not listed in Table 1. What must the employer do?',
        ['Nothing; unlisted tasks are exempt',
         '+Assess exposure (performance or scheduled monitoring) and control it to the PEL',
         'Use the nearest Table 1 row',
         'Give everyone an N95'],
        'If the task is not on Table 1, or the employer does not fully and properly implement the Table 1 controls, the employer follows the alternative exposure control methods in paragraph (d).',
        '1926.1153(c), (d)'),
      mc('s13b', 'm4', 'What does "fully and properly implement" Table 1 get the employer?',
        ['Nothing extra',
         '+No exposure assessment is required for that task',
         'Exemption from training',
         'Exemption from the written plan'],
        'Employees performing Table 1 tasks with the specified controls fully and properly implemented are not subject to the PEL or exposure assessment for those tasks. The plan, training and housekeeping still apply.',
        '1926.1153(c)(1)'),
      seq('s13c', 'm4', 'Put the CP\'s Table 1 check in order.',
        ['Identify the task and equipment', 'Find the matching Table 1 row', 'Check the control is fully and properly implemented', 'Read the respirator column for location and total hours'],
        'Task, row, control working, then respirator. If no row fits, it goes to exposure assessment.',
        '1926.1153(c)')
    ] },

    { id: 's14', area: 'm4', critical: false, scenario: true, tag: 'mixed tasks', pool: [
      mc('s14a', 'm4', 'Dee drills anchors with a shrouded rotary hammer for 3 hours, then grinds with a shrouded grinder (not mortar removal) indoors for 2 hours. Which respirator column applies to the grinding?',
        ['Up to 4 hours, because grinding is only 2 hours',
         '+More than 4 hours, because her combined Table 1 time is 5 hours',
         'Neither; drills need no respirator',
         'Only the drilling column'],
        'When an employee performs more than one Table 1 task during a shift and the total exceeds 4 hours, the required respiratory protection for each task is the "more than 4 hours" column.',
        '1926.1153(c)(3)'),
      mc('s14b', 'm4', 'Which Table 1 rows require no respirator at any duration when controls are fully implemented?',
        ['Tuckpointing', '+Handheld drills with a shroud and dust collector', 'Jackhammers indoors', 'Handheld saws indoors'],
        'Drills with a shroud and dust collection, stationary masonry saws with water, and rig-mounted core drills with water need no respirator at any duration.',
        'Table 1 (i), (vi), (vii)'),
      mc('s14c', 'm4', 'Fiber-cement board 8 inches thick or less, cut outdoors with a handheld saw with dust collection. Respirator?',
        ['APF 10 over 4 hours', '+None at any duration', 'APF 25', 'APF 10 always'],
        'Table 1 (iii), handheld saws for fiber-cement board (blade diameter 8 in or less): outdoors only, dust collection system, no respirator at any duration.',
        'Table 1 (iii)')
    ] },

    /* =====================================================================
       MODULE 5 — Off the table: exposure assessment (3 slots, 2 scenario, 1 critical)
       ===================================================================== */
    { id: 's16', area: 'm5', critical: true, scenario: true, tag: 'when assessment is required', pool: [
      mc('s16a', 'm5', 'The tuckpointing crew\'s vacuum only provides 15 cfm per inch of wheel, and the company decides to keep using it. What is required?',
        ['Nothing; the shroud is still there',
         '+Because Table 1 is not fully implemented, assess exposure and meet the PEL under the alternative method',
         'Switch the respirator to an N95',
         'Use the Table 1 respirator column anyway'],
        'If the Table 1 control is not fully and properly implemented, the employer must follow paragraph (d): assess exposure and limit it to the PEL.',
        '1926.1153(c)(1), (d)'),
      mc('s16b', 'm5', 'Riverside will use a scabbler on the slab, which is not listed in Table 1. When must exposure be assessed?',
        ['Only if a worker complains',
         '+For each employee who is or may reasonably be expected to be exposed at or above the action level',
         'Only after an OSHA inspection',
         'Never; unlisted tools are exempt'],
        'Under the alternative method, the employer assesses the exposure of each employee who is or may reasonably be expected to be exposed at or above the action level.',
        '1926.1153(d)(2)(i)'),
      mc('s16c', 'm5', 'Monitoring results were below the action level. Then the crew switches to a larger blade and works inside an enclosed stairwell. What now?',
        ['Nothing; the last results still apply',
         '+Reassess, because a change in equipment or conditions may reasonably be expected to change exposure',
         'Wait for the next annual sample',
         'Ask OSHA'],
        'Reassess whenever there is a change in production, process, control equipment, personnel or work practices that may reasonably be expected to result in new or additional exposures.',
        '1926.1153(d)(2)(iv)')
    ] },

    { id: 's17', area: 'm5', critical: false, scenario: true, tag: 'monitoring results', pool: [
      mc('s17a', 'm5', 'Scheduled monitoring shows exposure between the action level and the PEL. When is the next sample due?',
        ['Within 3 months', '+Within 6 months', 'Within 1 year', 'Not required'],
        'At or above the action level but at or below the PEL: repeat within 6 months. Above the PEL: repeat within 3 months.',
        '1926.1153(d)(2)(iii)(C)-(D)'),
      mc('s17b', 'm5', 'Two consecutive samples, at least 7 days apart, are below the action level. What can the employer do?',
        ['Must keep sampling every 3 months',
         '+Discontinue monitoring for those employees unless something changes',
         'Stop all controls',
         'Must sample monthly'],
        'If two consecutive measurements taken 7 or more days apart are below the action level, monitoring may be discontinued for those employees, with reassessment if conditions change.',
        '1926.1153(d)(2)(iii)(E)'),
      mc('s17c', 'm5', 'How quickly must the employer tell workers their monitoring results?',
        ['30 days', '+Within 5 working days of completing the assessment', 'At the end of the job', 'Only if they ask'],
        'Employees must be notified individually in writing or by posting within 5 working days. Results above the PEL must also describe the corrective action.',
        '1926.1153(d)(2)(vi)')
    ] },

    { id: 's18', area: 'm5', critical: false, scenario: false, tag: 'hierarchy', pool: [
      mc('s18a', 'm5', 'Under the alternative method, how must exposure be reduced to the PEL?',
        ['Respirators first, then engineering controls if needed',
         '+Engineering and work practice controls first, with respirators to supplement when they are not enough',
         'Administrative controls only',
         'Any method the crew prefers'],
        'Use engineering and work practice controls to reduce exposure to or below the PEL unless infeasible; where they are not sufficient, use them as far as feasible and supplement with respirators.',
        '1926.1153(d)(3)(i), (e)(1)'),
      mc('s18b', 'm5', 'What are the two exposure assessment options under paragraph (d)?',
        ['Guessing and estimating',
         '+The performance option and the scheduled monitoring option',
         'Annual and biennial monitoring',
         'Personal and area dust counts'],
        'Performance option (any combination of air monitoring data or objective data sufficient to characterize exposure) or scheduled monitoring option (initial and periodic sampling).',
        '1926.1153(d)(2)(ii)-(iii)'),
      seq('s18c', 'm5', 'Order the controls from most to least effective.',
        ['Eliminate or substitute (for example, a less dusty method)', 'Engineering controls (water, local exhaust)', 'Work practices and administrative controls (scheduling, access)', 'Respirators'],
        'Respirators are the last layer, used when the controls above them cannot do the job alone.',
        '1926.1153(d)(3)(i), (e)')
    ] },

    /* =====================================================================
       MODULE 6 — Respirators, housekeeping and access (4 slots, 3 scenario, 1 critical)
       ===================================================================== */
    { id: 's19', area: 'm6', critical: true, scenario: true, tag: 'no dry sweeping or compressed air', pool: [
      mc('s19a', 'm6', 'Ray wants to blow the dust off the window sills with the air hose before the owner walkthrough. A HEPA vac is on site. What is the call?',
        ['Fine, if he wears a respirator',
         '+No. Compressed air is not allowed for cleaning when it could contribute to exposure, unless used with a capture system or no alternative is feasible. Use the HEPA vac.',
         'Fine, if he does it after hours',
         'Fine, if he blows it outside'],
        'Compressed air is prohibited for cleaning clothing or surfaces where it could contribute to exposure unless it is used with a ventilation system that captures the dust cloud or no alternative method is feasible.',
        '1926.1153(f)(2)'),
      mc('s19b', 'm6', 'The floor is covered in core-drilling dust. Which cleanup method is the default?',
        ['A push broom', 'A leaf blower', '+A HEPA vacuum or wet sweeping', 'Compressed air'],
        'Dry sweeping or dry brushing is not allowed where it could contribute to exposure unless wet sweeping, HEPA-filtered vacuuming or other methods that minimize exposure are not feasible.',
        '1926.1153(f)(1)'),
      mc('s19c', 'm6', 'A laborer brushes dust off his jacket with compressed air at the end of the shift. What is the issue?',
        ['None, it is his own clothing',
         '+Compressed air may not be used to clean clothing where it could contribute to exposure unless captured or no alternative is feasible',
         'He should use a fan instead',
         'He should do it inside the trailer'],
        'The prohibition covers clothing and surfaces. Use a HEPA vac, or a capture booth designed for clothes.',
        '1926.1153(f)(2)')
    ] },

    { id: 's21', area: 'm6', critical: false, scenario: true, tag: 'respirator fit', pool: [
      mc('s21a', 'm6', 'A worker with a full beard needs APF 10 for indoor saw cutting. Which option works?',
        ['A half mask, tightened extra',
         '+A loose-fitting PAPR, or shave where the face seal sits',
         'Two N95s',
         'Skip the respirator for short cuts'],
        'Tight-fitting respirators cannot be worn with facial hair where the seal meets the face.',
        '1910.134(g)(1)(i)(A)'),
      mc('s21b', 'm6', 'Before a worker uses a required tight-fitting respirator, what must happen?',
        ['Nothing besides handing it out',
         '+Medical evaluation, fit test, and training under a written respiratory protection program',
         'A signed waiver',
         'A one-time video'],
        'Where respirators are required, the employer runs a respiratory protection program under 1910.134, including medical evaluation, fit testing and training.',
        '1926.1153(e)(2); 1910.134(c), (e), (f)'),
      mc('s21c', 'm6', 'Ray\'s last fit test was 14 months ago. Can he use his half mask today for required APF 10 work?',
        ['Yes, the mask has not changed',
         '+No. Fit tests are required at least every 12 months',
         'Yes, if he does a seal check',
         'Only for under 4 hours'],
        'Fit test before first use, when a different facepiece is used, and at least annually.',
        '1910.134(f)(2)')
    ] },

    { id: 's22', area: 'm6', critical: false, scenario: false, tag: 'APF', pool: [
      mc('s22a', 'm6', 'Which respirator meets APF 10?',
        ['A surgical mask', '+A half-mask air-purifying respirator, including a properly fitted N95', 'A bandana', 'A face shield'],
        'Half-mask air-purifying respirators, including filtering facepieces like the N95, have an APF of 10 when fit tested and used in a program.',
        '1910.134(d)(3)(i)(A)'),
      mc('s22b', 'm6', 'Which respirator meets APF 25 for long tuckpointing shifts?',
        ['An N95', 'A half mask with P100 cartridges', '+A loose-fitting powered air-purifying respirator (PAPR)', 'A dust mask'],
        'A loose-fitting PAPR (hood or helmet) has an APF of 25. Half masks are APF 10.',
        '1910.134(d)(3)(i)(A)'),
      mc('s22c', 'm6', 'What does an APF of 10 mean?',
        ['It filters 10% of dust',
         '+It is expected to reduce the concentration inside the facepiece to one-tenth of outside, when properly worn in a program',
         'It works for 10 hours',
         'It is rated for 10 µg/m³'],
        'APF is the workplace level of protection a properly functioning respirator is expected to provide.',
        '1910.134(b)')
    ] },

    { id: 's24', area: 'm6', critical: false, scenario: true, tag: 'access', pool: [
      mc('s24a', 'm6', 'Indoor cutting on Level 2 will raise dust near where the electricians work. Which step reduces the number of people exposed?',
        ['Ask the electricians to hold their breath',
         '+Barrier and sign the cutting area, schedule cutting when the electricians are off the floor, and tell their foreman',
         'Turn off the lights',
         'Cut faster'],
        'Restricting access, including exposures to other employers\' workers, is part of the written plan.',
        '1926.1153(g)(1)(iv)'),
      mc('s24b', 'm6', 'A crew eats lunch next to an active masonry saw. What should the CP do?',
        ['Nothing; lunch is personal time',
         '+Move them to a clean area away from the dust and set up access limits around the saw',
         'Give them N95s for lunch',
         'Shut the saw down for the day'],
        'Keep people who do not need to be in the dust out of it, and do not eat or drink where dust settles.',
        '1926.1153(g)(1)(iv)'),
      multi('s24c', 'm6', 'Select every way to restrict access to a silica work area.',
        ['+Barriers or caution tape', '+Signs at entry points', '+Scheduling dusty work when others are away', '+Coordinating with other employers\' foremen', 'A note in the trailer nobody reads'],
        'Physical barriers, signs, scheduling and coordination with other trades all reduce the number of people exposed.',
        '1926.1153(g)(1)(iv)')
    ] },

    /* =====================================================================
       MODULE 7 — The plan, the paperwork and the crew (3 slots, 1 scenario, 1 critical)
       ===================================================================== */
    { id: 's23', area: 'm7', critical: true, scenario: true, tag: 'restrict access or stop work', pool: [
      mc('s23a', 'm7', 'During the daily walk, the CP finds the plumbers working in the cloud from a jackhammer whose water line has failed. What comes first?',
        ['Write it on the inspection form and keep walking',
         '+Stop the jackhammering, get the plumbers out of the dust, fix the water, then document the inspection',
         'Tell the plumbers to wear masks',
         'Report it at the weekly meeting'],
        'Inspections exist to implement the plan. A failed control with others exposed needs prompt corrective action: stop the source and restrict access.',
        '1926.1153(b), (g)(1)(iv), (g)(4)'),
      mc('s23b', 'm7', 'A countertop sub starts dry-cutting quartz in the clinic lobby where the painters are working. The sub\'s foreman says it is his crew. What does the CP do?',
        ['Let it go; another employer',
         '+Stop the exposure now by halting the dry cutting near others and restricting the area, then sort out the control with the sub\'s foreman and the super',
         'Send an email to the sub\'s office',
         'Move the painters and let the dry cutting continue'],
        'The plan must restrict access to minimize exposures, including those generated by other employers. Dry cutting engineered stone indoors is a serious exposure for everyone in the room.',
        '1926.1153(g)(1)(iv)'),
      mc('s23c', 'm7', 'The vac on the tuckpointing grinder dies at 10 a.m. The super wants the wall finished by noon. What is the call?',
        ['Finish the wall; the PAPR covers it',
         '+Stop grinding until the vac is fixed or replaced, keep others away from the scaffold, then restart',
         'Finish but wet the wall first',
         'Switch to compressed air to clear the joints'],
        'Without the dust collector the Table 1 control is not implemented, and others near the entrance are exposed. Stop, restrict, fix.',
        'Table 1 (xi); 1926.1153(g)(1)(iv)')
    ] },

    { id: 's25', area: 'm7', critical: false, scenario: false, tag: 'written plan', pool: [
      multi('s25a', 'm7', 'Select every element the written exposure control plan must contain.',
        ['+Tasks involving silica exposure', '+Engineering controls, work practices and respirators for each task', '+Housekeeping measures', '+Procedures to restrict access', 'Each worker\'s medical results'],
        'Four required elements: tasks, controls for each task, housekeeping and access restrictions. Medical results are confidential.',
        '1926.1153(g)(1)'),
      mc('s25b', 'm7', 'How often must the written exposure control plan be reviewed?',
        ['Every 5 years', '+At least annually, updated as needed', 'Only when OSHA asks', 'Every 3 years'],
        'Review at least annually for effectiveness and update as needed. It must be readily available to employees, their representatives, OSHA and NIOSH.',
        '1926.1153(g)(2)-(3)'),
      mc('s25c', 'm7', 'The plan lists "Site supervisor (TBD)" as the competent person. What is wrong?',
        ['Nothing',
         '+The plan must designate a competent person, and workers must be able to name that person',
         'It should list OSHA instead',
         'It should list the owner'],
        'The plan designates a competent person to make frequent and regular inspections, and training must cover the CP\'s identity.',
        '1926.1153(g)(4), (i)(2)(i)(E)')
    ] },

    { id: 's26', area: 'm7', critical: false, scenario: false, tag: 'medical and training', pool: [
      mc('s26a', 'm7', 'Who must be offered medical surveillance?',
        ['Every worker on site',
         '+Workers required by the standard to use a respirator for 30 or more days a year',
         'Only workers over 50',
         'Only workers with symptoms'],
        'Medical surveillance is required for employees required to use a respirator 30 or more days per year, with an initial exam within 30 days and then at least every 3 years.',
        '1926.1153(h)(1)-(3)'),
      mc('s26b', 'm7', 'What does the employer receive from the medical exam?',
        ['The worker\'s full medical file',
         '+A written medical opinion limited to the exam date, compliance, and any respirator limits',
         'The chest X-ray',
         'Nothing at all'],
        'The worker gets the full results; the employer receives a limited written opinion. Recommended exposure limits go to the employer only with the worker\'s written authorization.',
        '1926.1153(h)(6)'),
      multi('s26c', 'm7', 'Select every topic exposed workers must be able to demonstrate knowledge of.',
        ['+Health hazards of silica', '+Their specific silica tasks', '+The controls that protect them', '+The identity of the competent person', '+The purpose of medical surveillance', 'The lab\'s analysis method'],
        'Training covers the health hazards, specific tasks, protective measures, the standard, the CP\'s identity, and the medical surveillance program.',
        '1926.1153(i)(2)(i)')
    ] }
  ];

  C.setExam({
    title: 'Final assessment',
    minutes: 12,
    rules: { pass: 0.8, attempts: 3, criticalRequired: true, count: 25 },
    intro: [
      '25 questions drawn at random from the pools, mostly Riverside scenarios. There is no clock.',
      'To pass you need 80% (20 of 25) and all 5 critical items correct. Critical items cover Table 1 control selection, the respirator by duration and location, when an exposure assessment is required, no dry sweeping or compressed air, and restricting access or stopping work.',
      'You have 3 attempts. If you miss, the course reopens the modules tied to what you missed. Review them before your next try.'
    ],
    certificate: C.meta ? C.meta.certificate : '',
    slots: slots
  });
})(COURSE);
