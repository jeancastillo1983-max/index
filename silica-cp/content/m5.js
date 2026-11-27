/* ==========================================================================
   Module 5 — Off the table: exposure assessment (10 min · Rise + Storyline)
   Objectives: when alternative exposure control methods apply; performance
   vs scheduled monitoring option, reassessment, 5-working-day notification;
   hierarchy of controls when exposure exceeds the PEL.
   ========================================================================== */
COURSE.addModule({
  id: 'm5', num: 5, title: 'Off the table: exposure assessment', minutes: 10,
  build: 'Rise + Storyline',
  tagline: 'When the task isn\'t on Table 1, or the controls aren\'t working, you have to know the number.',
  hero: 'img_m5_hero',
  objectives: [
    'Recognize when the employer must use alternative exposure control methods: tasks not listed in Table 1, or Table 1 controls not fully and properly implemented.',
    'Describe the two exposure assessment options (performance option and scheduled monitoring option), when reassessment is required, and the 5-working-day employee notification.',
    'Explain the hierarchy of controls when exposure exceeds the PEL.'
  ],
  citations: ['1926.1153(d)(1)', '1926.1153(d)(2)', '1926.1153(d)(3)', '1926.1153(e)(1)'],
  lessons: [

    /* ------------------------------------------------------------------ */
    { id: 'm5-l1', title: 'When you\'re off the table', minutes: 5, blocks: [
      { type: 'hero', kicker: 'Module 5', title: 'Off the table: exposure assessment',
        text: `Table 1 is a shortcut. When you can't use it, the employer has to measure or otherwise know the exposure, and keep it under the PEL.`,
        media: 'img_m5_hero',
        narration: `Module 5. Table 1 is a shortcut. When the task isn't on it, or the controls aren't working, the shortcut's gone. Now the employer has to know the exposure, keep it under the PEL, and tell the crew.`,
        sb: { visual: 'Photo: steel frame building.', search: 'commercial building construction', build: 'Rise: Banner block.' } },

      { type: 'scenario', id: 'm5-twopath', title: 'Does Table 1 still cover it?',
        intro: `1:15 p.m. Tasha finds a laborer grinding the edge of a slab opening with a grinder that has no shroud. "Shroud broke this morning," he says. "Water's too messy up here."`,
        start: 'n1',
        nodes: {
          n1: { speaker: 'tasha',
            text: `No shroud, no water. Is this task still covered by Table 1?`,
            choices: [
              { text: `No. The Table 1 controls aren't fully and properly implemented, so Table 1 doesn't cover it.`, next: 'n2', tone: 'good', fb: `Right. The grinder row needs water or a shroud with a dust collector. Without them, you're off the table.`, cite: '1926.1153(c)(1)' },
              { text: `Yes, grinders are on Table 1.`, next: 'n1b', tone: 'bad', fb: `The tool is on the table. The way he's using it isn't.` }
            ] },
          n1b: { speaker: 'tasha',
            text: `Look again. Table 1 lists grinders with water or with a shroud and collector. What does that mean for a grinder with neither?`,
            choices: [
              { text: `It's off the table until a control is back on.`, next: 'n2', tone: 'good', fb: `Right.` }
            ] },
          n2: { speaker: 'tasha',
            text: `So what happens now?`,
            choices: [
              { text: `Stop the grinding, get a replacement shroud and collector (or water) on it, and put it back on Table 1.`, next: 'end_good', tone: 'good', fb: `Fastest way back to compliance: restore the control.`, cite: '1926.1153(c)(1); 1926.1153(b)' },
              { text: `Keep grinding, and call the safety manager to schedule air sampling.`, next: 'end_ok', tone: 'ok', fb: `If the company chooses to work off the table, it needs an exposure assessment and controls to keep it under the PEL. Sampling tomorrow doesn't protect him today.` },
              { text: `Give him an APF 25 respirator and keep going.`, next: 'end_bad', tone: 'bad', fb: `Respirators are the last layer. Engineering controls come first when exposure could be over the PEL.` }
            ] },
          end_good: { end: true, outcome: 'good', title: 'Back on the table in 30 minutes',
            text: `The spare shroud was in the gang box. Thirty minutes later he was grinding with a collector and no visible dust. You added "spare shrouds" to the gang box checklist.`,
            cite: '1926.1153(c)(1)' },
          end_ok: { end: true, outcome: 'ok', title: 'Measuring a problem you could fix',
            text: `The sampling showed 140 µg/m³, almost three times the PEL. The company had to notify him in writing, describe the corrective action, and fix the controls anyway. A shroud would have been cheaper.`,
            cite: '1926.1153(d)(2)(vi)' },
          end_bad: { end: true, outcome: 'bad', title: 'A respirator in place of a control',
            text: `He wore the PAPR, and the dust drifted to the plumbers next to him, who weren't wearing anything. Off-table work has to use engineering and work practice controls first.`,
            cite: '1926.1153(d)(3)(i)' }
        },
        narration: `Decide first. A grinder with no shroud and no water. Is it still on Table 1? And what happens next?`,
        sb: { visual: 'Close-up of grinder with no shroud; Tasha card.', search: 'angle grinder concrete dust', build: 'Storyline: two-path branch, 3 endings. Variable M5_Path.' } },

      { type: 'process', title: 'Off the table: what the employer must do',
        steps: [
          { title: 'Keep exposure at or below the PEL', body: `50 µg/m³ as an 8-hour TWA. <cite>1926.1153(d)(1)</cite>` },
          { title: 'Assess exposure', body: `For each employee who is or may reasonably be expected to be exposed at or above the action level. <cite>1926.1153(d)(2)(i)</cite>` },
          { title: 'Pick an option', body: `<b>Performance option:</b> any combination of air monitoring data or objective data that accurately characterizes exposure. <b>Scheduled monitoring option:</b> initial personal sampling, then repeat on a schedule set by the results. <cite>1926.1153(d)(2)(ii)-(iii)</cite>` },
          { title: 'Reassess when things change', body: `New production, process, controls, personnel or work practices that could create new or higher exposures at or above the action level. <cite>1926.1153(d)(2)(iv)</cite>` },
          { title: 'Tell the crew within 5 working days', body: `In writing to each affected employee, or posted where they can see it. Over the PEL? Describe the corrective action. <cite>1926.1153(d)(2)(vi)</cite>` }
        ],
        narration: `Off the table, the employer has five jobs. Keep exposure at or below the PEL. Assess the exposure. Pick an option: the performance option uses air monitoring or objective data, the scheduled option uses personal sampling on a schedule. Reassess when anything changes. And tell the crew in writing within five working days, with the corrective action if it's over the PEL.`,
        sb: { visual: 'Five-step process with icons.', search: 'icons gauge clipboard calendar', build: 'Rise: Process block.' } },

      { type: 'continue', label: 'Read the results' }
    ] },

    /* ------------------------------------------------------------------ */
    { id: 'm5-l2', title: 'Read the results', minutes: 5, blocks: [
      { type: 'table', title: 'Riverside personal sampling report, scheduled monitoring option (initial)',
        headers: ['Employee', 'Task (not on Table 1)', '8-hr TWA', 'vs. AL 25 / PEL 50'],
        rows: [
          ['A. Ruiz', 'Hand-chipping a CMU wall with a hammer and chisel', '<b>18 µg/m³</b>', 'Below the action level'],
          ['K. Lee', 'Dry-cutting fiber-cement trim indoors, saw with collector', '<b>38 µg/m³</b>', 'At or above AL, at or below PEL'],
          ['D. Mills', 'Grinding mortar off salvaged brick, no shroud', '<b>72 µg/m³</b>', 'Above the PEL']
        ],
        note: `Mock report for training. Sampling was analyzed by an accredited lab per Appendix A. Names are fictional.`,
        narration: `Here's a mock sampling report. Three people, three tasks that aren't on Table 1, three results. One below the action level, one between the action level and the PEL, one above the PEL. Let's decide what happens next for each.`,
        sb: { visual: 'Mock lab report built in shapes, results color coded.', search: 'n/a', build: 'Rise: Table block or image of mock report.' } },

      { type: 'sort', id: 'm5-results', title: 'What\'s the next step?',
        prompt: `Match each result to its required next step under the scheduled monitoring option.`,
        buckets: [
          { id: 'below', label: 'May stop monitoring', hint: 'below the action level' },
          { id: 'mid', label: 'Repeat within 6 months', hint: 'at or above AL, at or below PEL' },
          { id: 'above', label: 'Repeat within 3 months, fix controls, notify with corrective action', hint: 'above the PEL' }
        ],
        items: [
          { text: 'A. Ruiz, 18 µg/m³', bucket: 'below', fb: `Below the AL on initial monitoring: the employer may discontinue monitoring for him, unless something changes.` },
          { text: 'K. Lee, 38 µg/m³', bucket: 'mid', fb: `At or above the AL but at or below the PEL: repeat within 6 months.` },
          { text: 'D. Mills, 72 µg/m³', bucket: 'above', fb: `Above the PEL: repeat within 3 months, put engineering controls in, respirators meanwhile, and the written notice must describe the corrective action.` }
        ],
        summary: `Monitoring can stop after two consecutive results, at least 7 days apart, come in below the action level (or after an initial result below it). Every result goes to the employee in writing within 5 working days.`,
        narration: `Match each result to its next step. Below the action level, monitoring may stop. Between the action level and the PEL, repeat within six months. Over the PEL, repeat within three months, fix the controls, and the notice has to say what you're doing about it.`,
        sb: { visual: 'Three result cards, three drop zones.', search: 'n/a', build: 'Storyline: drag-and-drop, per-item feedback. Variable M5_Results.' } },

      { type: 'pyramid', title: 'Over the PEL: fix it in this order',
        levels: [
          { title: 'Elimination and substitution', body: `Pre-cut in the shop, use a lower-silica product, change the method.` },
          { title: 'Engineering controls', body: `Water, local exhaust, shrouds and collectors, enclosed cabs. Required first.` },
          { title: 'Work practices', body: `Positioning upwind, wet methods, limiting who's in the area, housekeeping.` },
          { title: 'Respirators', body: `When controls aren't feasible, aren't enough, or while they're being installed. <cite>1926.1153(e)(1)</cite>` }
        ],
        narration: `Over the PEL, you fix it in order. Get rid of the dust if you can. Engineering controls first. Then work practices. Respirators are the last layer: when controls aren't feasible, aren't enough, or while you're putting them in.`,
        sb: { visual: 'Inverted pyramid, four tiers.', search: 'hierarchy of controls', build: 'Rise: Labeled graphic or Process; Storyline tier-click reveal.' } },

      { type: 'cards', title: 'Myth or field truth?', mode: 'myth',
        cards: [
          { front: `"We can skip Table 1 if we just do air sampling once."`, verdict: 'myth',
            back: `Sampling once isn't an exposure assessment that covers changing conditions, and it doesn't remove the duty to keep exposure under the PEL with engineering controls first.`, cite: '1926.1153(d)(2); 1926.1153(d)(3)' },
          { front: `"Abrasive blasting is on Table 1."`, verdict: 'myth',
            back: `It isn't. Blasting always needs an exposure assessment, and it also falls under the abrasive blasting rules in 1926.57.`, cite: '1926.1153(d)(3)(ii)' },
          { front: `"Results go to the crew within 5 working days."`, verdict: 'truth',
            back: `In writing to each affected employee, or posted. Over the PEL, the notice includes the corrective action.`, cite: '1926.1153(d)(2)(vi)' }
        ],
        narration: `Three quick cards. Myth or field truth?` }
    ] }
  ],
  kc: { title: 'Knowledge check: Module 5', questions: [
    { question: `When must the employer use alternative exposure control methods instead of Table 1?`,
      options: [
        { text: `Only when an OSHA inspector asks`, correct: false, fb: `It's about the task, not the inspector.` },
        { text: `When the task isn't on Table 1, or the Table 1 controls aren't fully and properly implemented`, correct: true, fb: `Right.` },
        { text: `Whenever the task is done indoors`, correct: false, fb: `Many indoor tasks are on Table 1.` }
      ],
      explain: `Table 1 covers listed tasks only when its controls are fully and properly implemented. Otherwise, (d) applies: PEL, assessment, controls.`, cite: '1926.1153(c)(1); 1926.1153(d)' },
    { question: `Initial monitoring shows 38 µg/m³. Under the scheduled monitoring option, what's next?`,
      options: [
        { text: `Stop monitoring`, correct: false, fb: `That's for results below the action level.` },
        { text: `Repeat monitoring within 6 months`, correct: true, fb: `At or above the AL and at or below the PEL.` },
        { text: `Repeat monitoring within 3 months`, correct: false, fb: `That's for results above the PEL.` }
      ],
      explain: `At or above the AL but at or below the PEL: repeat within 6 months. Above the PEL: within 3 months.`, cite: '1926.1153(d)(2)(iii)' },
    { question: `How soon must employees be told their exposure assessment results?`,
      options: [
        { text: `Within 5 working days, in writing or by posting`, correct: true, fb: `Right.` },
        { text: `At the end of the project`, correct: false, fb: `Too late to matter.` },
        { text: `Only if they ask`, correct: false, fb: `It's automatic.` }
      ],
      explain: `Within 5 working days after the assessment, individually in writing or posted in an accessible place. Over the PEL, describe the corrective action.`, cite: '1926.1153(d)(2)(vi)' }
  ] }
});
