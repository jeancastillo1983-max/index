/* Dev-only sample data: one of every interaction type (builder B harness). */
COURSE.addScene('devtest', {
  src: 'dev/placeholder-scene.svg', w: 1600, h: 900, title: 'Dev placeholder scene',
  hazards: [
    { id: 'edge', x: 72, y: 54, w: 8, h: 12, label: 'Unprotected deck edge', why: 'Rail stops short of the edge; 14 ft drop.', fix: 'Extend the cable rail and tension it.', cite: '1926.501(b)(1)', severity: 3 },
    { id: 'worker', x: 67, y: 42, w: 6, h: 18, label: 'Worker at the edge, no tie-off', why: 'Outside any protection.', fix: 'Stop the task; tie off to an overhead anchor.', cite: '1926.501(b)(1)', severity: 3 },
    { id: 'hole', x: 34, y: 55, w: 9, h: 5, label: 'Open floor hole', why: 'Plumbing penetration left open.', fix: 'Cover, secure and mark it.', cite: '1926.502(i)', severity: 2 },
    { id: 'rail', x: 5, y: 46, w: 52, h: 4, label: 'Top rail low', why: 'Top rail measured 36 in.', fix: 'Raise to 42 in ± 3 in.', cite: '1926.502(b)(1)', severity: 1 }
  ],
  decoys: [ { id: 'cover', x: 18, y: 54, w: 9, h: 5, label: 'Marked cover', why: 'Marked HOLE, secured, rated 2× load.' } ]
});

window.DEV_BLOCKS = [
  { type: 'scenario', id: 'dev-scn', title: 'Not your call', intro: 'Tasha finds a missing rail section. Marco wants the pour to start.', start: 'n1',
    nodes: {
      n1: { speaker: 'marco', text: 'We pour at seven. Leave the rail, nobody goes near that side.', choices: [
        { text: 'Hold the pour on that bay until the rail is back.', next: 'n2', tone: 'good', fb: 'You used your authority. Prompt corrective action is the job.', cite: '1926.32(f)', score: 2, area: 'Authority' },
        { text: 'Flag it with caution tape and start.', next: 'endBad', tone: 'bad', fb: 'Tape is not a guardrail.', cite: '1926.502(b)', score: 0, area: 'Authority' } ] },
      n2: { speaker: 'tasha', text: 'Marco pushes back: "Ten minutes, then." How do you answer?', choices: [
        { text: 'Ten minutes works. I will have two hands on it now.', next: 'endGood', tone: 'good', fb: 'Clear, fast and solvable.', score: 2, area: 'Crew talk' },
        { text: 'Say nothing and wait.', next: 'endOk', tone: 'ok', fb: 'Silence reads as maybe.', score: 1, area: 'Crew talk' } ] },
      endGood: { end: true, outcome: 'good', title: 'Rail back in eight minutes', text: 'Pour starts on time. Dee watched you do it.', cite: '1926.501(b)(1)' },
      endOk: { end: true, outcome: 'ok', title: 'It got fixed, slowly', text: 'The rail went back, but the crew saw you hesitate.' },
      endBad: { end: true, outcome: 'bad', title: 'Dee walks the tape line', text: 'Near miss at 9:40.', cite: '1926.502(b)' }
    } },
  { type: 'scenario', id: 'dev-clock', title: 'Dee is hanging', start: 'a', clock: { label: 'Time in harness', unit: 'min', limit: 15, warnAt: 6 }, scored: true,
    nodes: {
      a: { speaker: 'dee', text: 'Dee is suspended below the Level 3 edge. What first?', choices: [
        { text: 'Call 911 and wait.', next: 'b', tone: 'bad', time: 9, fb: 'The plan is failing: 911 is not a plan.', score: 0, area: 'Rescue', cite: '1926.502(d)(20)' },
        { text: 'Run the site rescue plan: lift to her, relief straps.', next: 'b', tone: 'good', time: 3, fb: 'Equipment staged, crew trained.', score: 3, area: 'Rescue', cite: 'ANSI/ASSP Z359.4' } ] },
      b: { speaker: 'tasha', text: 'She is talking, pale. Next?', choices: [
        { text: 'Get her to use relief straps and keep legs moving.', next: 'end', tone: 'good', time: 2, score: 2, area: 'Suspension', cite: 'OSHA SHIB 03-24-2004', fb: 'Buys time.' },
        { text: 'Tell her to stay still.', next: 'end', tone: 'bad', time: 2, score: 0, area: 'Suspension', fb: 'Stillness speeds pooling.' } ] },
      end: { end: true, outcome: 'ok', title: 'Dee is down', text: 'Debrief what the clock showed you.' }
    } },
  { type: 'hotspot', id: 'dev-hs', title: 'Walk the deck', intro: 'Tap every fall hazard you see.', scene: 'devtest', hazards: ['edge', 'worker', 'hole', 'rail'], timeLimit: 90, rank: true },
  { type: 'sort', id: 'dev-sort', title: 'Inspection call', prompt: 'Tag each item.', buckets: [{ id: 'in', label: 'In service' }, { id: 'out', label: 'Remove from service' }, { id: 'ask', label: 'Ask a qualified person', hint: 'Engineering call' }],
    items: [ { text: 'Harness with a cut in the dorsal webbing', bucket: 'out', fb: 'Cuts mean out. Tag it, bag it.' },
             { text: 'Lanyard with a deployed energy absorber', bucket: 'out', fb: 'It arrested a fall. Out until a competent person says otherwise.' },
             { text: 'Clean SRL that locks on a sharp tug', bucket: 'in', fb: 'Passes the pre-use check.', art: 'dev/placeholder-diagram.svg' },
             { text: 'Custom horizontal lifeline across the bay', bucket: 'ask', fb: 'Horizontal lifelines are designed by a qualified person.' } ] },
  { type: 'anchorjudge', id: 'dev-anchor', title: 'Anchor or not', buckets: [{ id: 'ok', label: 'Approve' }, { id: 'no', label: 'Reject' }],
    items: [ { text: 'Electrical conduit', bucket: 'no', fb: 'Never rated for 5,000 lb.' }, { text: 'Beam clamp on a W12 beam', bucket: 'ok', fb: 'Rated anchor on structural steel.' } ] },
  { type: 'sequence', id: 'dev-seq', title: 'Build the rescue plan', prompt: 'Put the steps in order.', items: ['Spot the fall and shout it', 'Talk to the worker', 'Bring the lift or rescue kit', 'Get them down', 'Medical check, even if they feel fine'], fb: 'Talk first, then reach them fast.' },
  { type: 'match', id: 'dev-match', title: 'Tag the guardrail', src: 'dev/placeholder-diagram.svg', alt: 'Guardrail diagram',
    targets: [{ id: 'top', x: 50, y: 34 }, { id: 'mid', x: 50, y: 58 }, { id: 'toe', x: 50, y: 78 }],
    tags: [{ text: '42 in ± 3 in', target: 'top', fb: 'Top rail height.' }, { text: 'Midway', target: 'mid', fb: 'Midrail halfway.' }, { text: '3½ in min', target: 'toe', fb: 'Toeboard height.' }] },
  { type: 'clearance', id: 'dev-clear', title: 'Does Dee clear the slab?', intro: 'Dee is clipped to a foot-level anchor at the Level 3 edge.', ask: 'total',
    setup: { connector: 'lanyard', L: 6, DD: 3.5, HS: 1, H: 5, A: 0, SM: 2, available: 14, label: 'Dee' },
    explain: 'A 6 ft lanyard at your feet means 11 ft of free fall and 17.5 ft of clearance. The slab is 14 ft down.',
    fixes: [ { label: 'Overhead beam anchor (7 ft)', set: { A: 7 }, text: 'Free fall drops to 4 ft.' }, { label: 'Overhead SRL', set: { connector: 'srl', A: 7 }, text: 'An SRL limits free fall to about 2 ft.' } ] },
  { type: 'clearance', id: 'dev-explore', mode: 'explore', title: 'Play with the numbers', setup: { connector: 'lanyard', L: 6, A: 5, available: 18 } },
  { type: 'swing', id: 'dev-swing', title: 'Swing fall', intro: 'Slide how far you work off to the side.', explain: 'Stay close to under the anchor.', cite: 'ANSI/ASSP Z359.6' },
  { type: 'checkreview', id: 'dev-cr', title: 'Find the errors in the log', columns: ['Item', 'Date', 'Result', 'Signed'], findCount: 2,
    rows: [ { cells: ['Harness #12', '11/03', 'Pass', 'T. Ortiz (CP)'] },
            { cells: ['Harness #14', '', 'Pass', 'T. Ortiz (CP)'], error: { text: 'No inspection date.', cite: 'ANSI/ASSP Z359.2' } },
            { cells: ['SRL #3', '11/03', 'Pass', 'D. Lane (apprentice)'], error: { text: 'Signed by someone who is not a competent person.', cite: 'ANSI/ASSP Z359.2' } } ] },
  { type: 'toolbox', id: 'dev-tb', title: 'Build Monday\'s talk',
    stories: [{ id: 's1', label: 'Luis\'s lanyard', text: 'Luis tied off at his feet on a 12 ft mezzanine and hit the slab anyway.' }, { id: 's2', label: 'Ray\'s near miss', text: 'A pulled post, a sagging cable, a grab at the column.' }],
    hazards: [{ id: 'h1', label: 'Level 3 deck edge', text: 'Cable rail comes down for deliveries on the east side.' }, { id: 'h2', label: 'Roof skylights', text: 'Two skylights over the atrium.' }],
    commitments: [{ id: 'c1', label: 'Rail back before you walk away', text: 'If you pull a rail, you put it back before you leave.' }, { id: 'c2', label: 'Tie off overhead', text: 'Anchor at or above your D-ring.' }] },
  { type: 'commitment', id: 'dev-cm', title: 'Your Monday commitment', prompt: 'What is the one thing you will do differently on Monday?', examples: ['Walk the deck edges before the 6:30 huddle', 'Ask for an overhead anchor instead of clipping at my feet'] }
];
