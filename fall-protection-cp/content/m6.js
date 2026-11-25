/* ==========================================================================
   Module 6 — Inspection: trust nothing you haven't checked (40 min)
   Build: Storyline (inspection call drag-drop, log review, crew talk) + Rise.
   ========================================================================== */
COURSE.addModule({
  id: 'm6', num: 6, title: 'Inspection: trust nothing you haven\'t checked', minutes: 40,
  build: 'Storyline + Rise',
  tagline: 'If you didn\'t look, you don\'t know.',
  hero: 'img_m6_hero',
  objectives: [
    'Perform a pre-use inspection of harnesses, lanyards, SRLs, connectors and anchors.',
    'Know when the competent person\'s periodic inspection is due and how it is documented under Z359.2.',
    'Remove from service any equipment that has arrested a fall or shows defects, and know who can return it.'
  ],
  citations: ['1926.502(d)(19)', '1926.502(d)(21)', 'ANSI/ASSP Z359.2', 'ANSI/ASSP Z359.11', 'ANSI/ASSP Z359.14', 'Manufacturer instructions'],
  jobAids: [{
    title: 'Pre-use inspection checklist + periodic log', file: 'jobaids/pre-use-inspection-checklist.html', pdf: 'jobaids/pdf/pre-use-inspection-checklist.pdf',
    desc: 'Page 1: the 60-second pre-use check with remove-if criteria. Page 2: the competent person\'s periodic inspection log.'
  }],

  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'm6-l1', title: 'A harness off the hook', minutes: 6,
      blocks: [
        { type: 'hero', kicker: 'Module 6 · Inspection', title: 'Trust nothing you haven\'t checked',
          text: 'Every harness in the gang box looks fine from six feet away. That\'s the problem.',
          media: 'img_m6_hero',
          narration: 'Every harness in the gang box looks fine from six feet away. That is the problem.',
          sb: { visual: 'Close-up photo of a harness being inspected, hands bending webbing.', search: 'fall protection harness inspection', build: 'Rise banner block.' } },

        { type: 'dialogue', title: '6:25 a.m. — the gang box', lines: [
          { speaker: 'dee', text: 'Mine\'s in the wash. Can I grab one of these?' },
          { speaker: 'ray', text: 'Take the blue one. I checked it last week. It\'s good.' },
          { speaker: 'dee', text: 'Cool.' }
        ],
          narration: 'Six twenty-five at the gang box. Dee needs a harness. Ray says take the blue one, he checked it last week.',
          sb: { visual: 'Gang box with three harnesses on hooks; Dee reaching; Ray holding coffee.', search: 'construction gang box tools', build: 'Storyline dialogue slide, 3 bubble states.' } },

        { type: 'mcq', id: 'm6-decide-gangbox',
          question: 'Dee is about to put on the blue harness. What should happen first?',
          options: [
            { text: 'Nothing. Ray checked it last week.', correct: false,
              fb: 'Last week isn\'t this morning. Something can happen to a harness in a day: dragged over rebar, left on a hot exhaust, used by someone who fell and didn\'t say.' },
            { text: 'Dee inspects it herself before she puts it on.', correct: true,
              fb: 'Right. Pre-use inspection is every use, by the person wearing it. Your job is to make sure she knows how and actually does it.' },
            { text: 'You inspect it for her, since you\'re the competent person.', correct: false,
              fb: 'Kind, but it trains her to wait for you. She inspects; you spot-check and coach.' }
          ],
          explain: 'Personal fall arrest systems are inspected before each use, and defective components are removed from service.',
          cite: '1926.502(d)(21)',
          narration: 'Dee is about to put on the blue harness. What should happen first?' },

        { type: 'text', heading: 'Two kinds of inspection. You own both.',
          body: ['<b>Pre-use:</b> every worker, every time, before it goes on. About a minute.',
                 '<b>Periodic:</b> you, the competent person, at least once a year and on paper. More often if the manufacturer or the site says so.',
                 'You don\'t do every pre-use check. You make sure it really happens.'],
          narration: 'There are two kinds of inspection, and you own both. Pre-use: every worker, every time, about a minute. Periodic: you, the competent person, at least yearly and on paper. You don\'t do every pre-use check. You make sure it really happens.' },

        { type: 'callout', variant: 'field-check', title: 'Field check',
          body: 'When did you last see someone on your crew actually bend their webbing and look before suiting up? Not glance. Look.',
          input: true,
          narration: 'Field check. When did you last see someone on your crew actually bend their webbing and look before suiting up?' }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'm6-l2', title: 'The 60-second pre-use check', minutes: 10,
      blocks: [
        { type: 'process', title: 'Head to toe, every time', steps: [
          { title: '1. Label and tag', body: 'Legible label: maker, date, standard, serial. Inspection tag current. No label means no proof. It comes out.' },
          { title: '2. Webbing, inch by inch', body: 'Bend it in a U to open up hidden cuts. Look for cuts, burns, fraying, chemical stains, stiff or faded spots.' },
          { title: '3. Stitching', body: 'Pulled, cut or broken threads. Many harnesses use contrasting thread so damage pops out.' },
          { title: '4. Hardware', body: 'D-rings, buckles, adjusters: cracks, bends, sharp edges, pitting, rust. Buckles must engage cleanly.' },
          { title: '5. Impact indicators', body: 'On the harness, lanyard or SRL hook. If it shows it was loaded, it\'s out until a competent person decides.' },
          { title: '6. Lanyard or SRL', body: 'Shock pack cover intact, no deployment. SRL: housing whole, line retracts fully, and a hard pull locks it.' },
          { title: '7. Connectors', body: 'Gates close and lock on their own. No bends, burrs or tape over the gate.' },
          { title: '8. The anchor', body: 'Still where it should be, tagged or engineered, not damaged, not moved since yesterday.' }
        ],
          narration: 'The sixty-second check, head to toe. Label and tag. Webbing, inch by inch, bent in a U. Stitching. Hardware. Impact indicators. The lanyard or SRL. Connectors. And the anchor itself.',
          sb: { visual: 'Each step pairs a close-up icon/illustration with the check; progress bar 1–8.', search: 'harness inspection close up webbing', build: 'Rise Process block (8 steps).' } },

        { type: 'image', media: 'img_harness', size: 'wide', caption: 'Bend the webbing into a U. Cuts and burns hide on the inside of a curve.' },

        { type: 'video', media: 'vid_m6', caption: 'A full harness and lanyard inspection, start to finish.',
          watchFor: 'Watch the hands: they bend every inch of webbing, they don\'t just look at it.',
          narration: 'Here is a full inspection, start to finish. Watch the hands. They bend every inch of webbing.' },

        { type: 'sort', id: 'm6-inspection-call', title: 'Inspection call',
          prompt: 'Twelve items from the Riverside gang box. Make the call on each: keep it in service, pull it, or get a qualified person.',
          buckets: [
            { id: 'in', label: 'In service', hint: 'Passes pre-use' },
            { id: 'out', label: 'Remove from service', hint: 'Tag it, pull it' },
            { id: 'qp', label: 'Ask a qualified person', hint: 'Design or compatibility question' }
          ],
          items: [
            { text: 'Harness: stitching tight, label legible, periodic tag 4 months old', art: 'assets/art/equip-good-harness.svg', bucket: 'in',
              fb: 'In service. Clean label, intact stitching, current tag. This is what good looks like.' },
            { text: 'Harness: a nick through the edge of a shoulder strap, fibers sticking out', art: 'assets/art/equip-cut-webbing.svg', bucket: 'out',
              fb: 'Remove. Any cut in load-bearing webbing takes it out. A nick at the edge is where tears start.' },
            { text: 'Harness: webbing faded pale and chalky; the strip under the keeper is still bright orange', art: 'assets/art/equip-uv-faded.svg', bucket: 'out',
              fb: 'Remove. That color difference is sunlight damage you can see. UV breaks the fibers down long before they look torn.' },
            { text: 'Harness: black melted spots near the back D-ring', art: 'assets/art/equip-burned-webbing.svg', bucket: 'out',
              fb: 'Remove. Weld spatter melts nylon and polyester. A hard, glassy spot is a weak spot.' },
            { text: 'Lanyard: shock pack cover intact, label legible, both hooks lock', art: 'assets/art/equip-good-lanyard.svg', bucket: 'in',
              fb: 'In service. Pack sealed, label readable, gates lock on their own.' },
            { text: 'Lanyard: shock pack torn open, tear-away stitching pulled out', art: 'assets/art/equip-deployed-absorber.svg', bucket: 'out',
              fb: 'Remove. That lanyard caught a fall. Its energy absorber is spent. <cite>1926.502(d)(19)</cite>' },
            { text: 'Lanyard: tied in a knot to shorten it', art: 'assets/art/equip-knot-lanyard.svg', bucket: 'out',
              fb: 'Remove and inspect. A knot can cut strength by as much as half and may have damaged the webbing. Get the right length lanyard.' },
            { text: 'Snaphook: gate bent outward, doesn\'t close on its own', art: 'assets/art/equip-bent-gate.svg', bucket: 'out',
              fb: 'Remove. A gate that doesn\'t close and lock can roll right off the D-ring.' },
            { text: 'SRL: impact indicator intact, line retracts fully, locks on a hard pull, tag current', art: 'assets/art/equip-good-srl.svg', bucket: 'in',
              fb: 'In service. That hard-pull test is the one most people skip. You didn\'t.' },
            { text: 'SRL: you yank the line hard and it keeps paying out', art: 'assets/art/equip-srl-no-lock.svg', bucket: 'out',
              fb: 'Remove. If it won\'t lock on your pull, it won\'t lock on a fall. SRLs go back to the maker or an authorized service center, not to the shop bench.' },
            { text: 'Leading-edge SRL from one maker on another maker\'s harness, joined with a third carabiner', art: 'assets/art/equip-mixed-brands.svg', bucket: 'qp',
              fb: 'Ask a qualified person. Mixing makers can be fine, but a leading-edge SRL has rules about how it connects. Check the manual or get a qualified person to approve the combo.' },
            { text: 'Horizontal lifeline the crew strung between two columns, knotted at one end', art: 'assets/art/equip-hll-kit.svg', bucket: 'qp',
              fb: 'Ask a qualified person, and nobody clips in until then. Horizontal lifelines are designed, installed and used under a qualified person with a safety factor of 2. <cite>1926.502(d)(8)</cite>' }
          ],
          narration: 'Inspection call. Twelve items from the Riverside gang box. Keep it in service, pull it, or get a qualified person.',
          sb: { visual: 'Equipment illustrations with close-up insets; three bins: green / red tag / blue QP.', search: 'damaged harness webbing',
                build: 'Storyline drag-and-drop, 12 drag items, 3 drop targets, "Submit" per item with item-level feedback layers. Track m6_callScore. Recommend later photo upgrade if real equipment photos become available.' } }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'm6-l3', title: 'Periodic inspection and the paper', minutes: 8,
      blocks: [
        { type: 'table', title: 'Who inspects what, and when',
          headers: ['Inspection', 'Who', 'When', 'On paper?'],
          rows: [
            ['Pre-use', 'The worker wearing it', 'Before every use', 'No form required. Make it something you can see happen.'],
            ['Periodic', 'A competent person (not the user)', 'At least once a year; more often if the maker or site conditions call for it', 'Yes: date, item and ID, result, inspector'],
            ['After a fall or impact', 'Competent person', 'Out of service immediately', 'Yes: removal, decision, and disposal or return'],
            ['SRL service', 'Manufacturer or authorized service center', 'Per the manual, and after any arrest', 'Service record or tag']
          ],
          note: 'Z359.2 sets the periodic interval at no more than one year. Harsh sites (welding, concrete, chemicals, sun) earn shorter intervals.',
          narration: 'Who inspects, and when. Pre-use: the worker, every time. Periodic: a competent person, at least yearly, on paper. After a fall: out of service right away. SRL service: back to the manufacturer per the manual.' },

        { type: 'accordion', items: [
          { title: 'Service life: who decides?', body: 'The manufacturer. Some harnesses carry a fixed service life, others say "until it fails inspection." Read the label and the manual, then put the date in your log.' },
          { title: 'What a good log entry has', body: 'Date, item type, serial or ID, maker\'s date, result (pass / removed), what you found, and a competent person\'s signature.' },
          { title: 'Why the paper matters', body: 'After an incident, the log is the first thing anyone asks for. "We checked it" with no record reads the same as "we didn\'t."' },
          { title: 'Hot, wet, dirty sites', body: 'Welding, concrete, solvents, roof work in summer: inspect more often. Write down why, so the next competent person knows.' }
        ],
          narration: 'A few things that trip people up. Service life is the manufacturer\'s call. A good log entry has date, item, serial, result and a competent person\'s signature. And after an incident, the log is the first thing anyone asks for.' },

        { type: 'checkreview', id: 'm6-log-review', title: 'Find what the last inspector missed',
          intro: 'This is the Riverside periodic inspection log from Monday. Four entries have a problem. Tap each row you would not sign off on.',
          columns: ['Date', 'Item / ID', 'Mfg date', 'Inspected by', 'Result', 'Notes'],
          rows: [
            { cells: ['11/02/2026', 'Harness H-07', '04/2022', 'Tasha (CP)', 'Pass', 'Label legible, stitching OK'] },
            { cells: ['11/02/2026', 'Harness H-11', '02/2015', 'Tasha (CP)', 'Pass', 'Maker\'s service life: 10 years'],
              error: { text: 'Made in 2015 with a 10-year service life. It aged out in 2025. Remove it, whatever it looks like.', cite: 'Manufacturer instructions; ANSI/ASSP Z359.2' } },
            { cells: ['', 'SRL S-02', '06/2023', 'Tasha (CP)', 'Pass', 'Retracts smooth, locks'],
              error: { text: 'No date. An undated inspection can\'t prove it was ever done, or when the next one is due.', cite: 'ANSI/ASSP Z359.2' } },
            { cells: ['11/02/2026', 'Lanyard L-14', '01/2024', 'Dee (apprentice)', 'Pass', '—'],
              error: { text: 'Periodic inspections are a competent person\'s job. Dee can pre-use inspect her own gear, not sign the periodic log.', cite: 'ANSI/ASSP Z359.2' } },
            { cells: ['11/02/2026', 'SRL S-05', '03/2024', 'Tasha (CP)', 'Pass', 'Impact indicator red; still retracts'],
              error: { text: 'A tripped impact indicator means it arrested a fall. Out of service and back to the maker, even if it still retracts.', cite: '1926.502(d)(19)' } },
            { cells: ['11/02/2026', 'Beam clamp BC-3', '09/2023', 'Tasha (CP)', 'Pass', 'Jaws seat fully, tag current'] },
            { cells: ['11/02/2026', 'Harness H-02', '07/2021', 'Tasha (CP)', 'Removed', 'Cut, left shoulder strap; tagged and destroyed'] },
            { cells: ['11/02/2026', 'Lanyard L-09', '05/2023', 'Tasha (CP)', 'Pass', 'Pack sealed, hooks lock'] }
          ],
          findCount: 4,
          narration: 'Here is the Riverside periodic inspection log from Monday. Four entries have a problem. Tap each row you would not sign off on.',
          sb: { visual: 'Clipboard-style table; flagged rows get a red margin mark.', build: 'Storyline: each row is a button with Selected state; Submit compares to 4 error rows (T/F variables Row2, Row3, Row4, Row5). Feedback layer lists each miss with reason. Rise alternative: Labeled graphic on a log image.' } },

        { type: 'callout', variant: 'receipt', cite: '1926.502(d)(21)',
          body: 'Inspect before each use for wear, damage and other deterioration; remove defective components from service. The periodic, written inspection by a competent person comes from ANSI/ASSP Z359.2 and the manufacturer.',
          narration: 'The receipt. OSHA says inspect before each use and pull anything defective. The yearly written inspection by a competent person comes from Z359.2 and the manufacturer.' }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'm6-l4', title: 'Removed means removed', minutes: 6,
      blocks: [
        { type: 'text', heading: 'A tag on a hook is not out of service',
          body: 'If a bad harness goes back in the gang box with a tag on it, somebody will wear it at 6:30 on a dark morning. Out of service means out of reach.',
          narration: 'A tag on a hook is not out of service. If a bad harness goes back in the gang box with a tag on it, somebody will wear it at six thirty on a dark morning. Out of service means out of reach.' },

        { type: 'mcq', id: 'm6-arrested',
          question: 'Dee\'s lanyard caught her when she slipped off a beam flange yesterday. She\'s fine. The lanyard looks fine too. Now what?',
          options: [
            { text: 'Back in service. It did its job and passes a visual check.', correct: false,
              fb: 'A lanyard that arrested a fall is spent even if it looks fine. The energy absorber did its one job.' },
            { text: 'Out of service until a competent person decides it\'s undamaged and fit for reuse, and most makers say destroy it.', correct: true,
              fb: 'Right. Anything that took a fall is out until a competent person decides, and the manufacturer usually decides for you: destroy it.' },
            { text: 'Keep using it, but only for positioning work.', correct: false,
              fb: 'Downgrading damaged gear to a "lighter" job is how it ends up back in fall arrest.' }
          ],
          explain: 'Components subjected to impact loading are immediately removed from service and not used again until a competent person determines they are undamaged and suitable for reuse.',
          cite: '1926.502(d)(19)',
          narration: 'Dee\'s lanyard caught her yesterday. She\'s fine. The lanyard looks fine too. Now what?' },

        { type: 'checklist', id: 'm6-tagout', title: 'The remove-from-service routine',
          items: [
            'Take it off the worker and out of the gang box, today.',
            'Tag it: DO NOT USE, the date, what\'s wrong, your name.',
            'Lock it up or put it in the red bin, away from good gear.',
            'Log it.',
            'Get the worker a replacement the same shift, so nobody is tempted.',
            'Destroy it (cut the webbing) or send it back to the maker, per the manual.',
            'Tell the crew what you found. That\'s the lesson that sticks.'
          ],
          narration: 'The remove-from-service routine. Off the worker. Tagged. Locked up. Logged. Replaced the same shift. Destroyed or returned. And tell the crew what you found.' },

        { type: 'cards', title: 'Myth or field truth: inspection', mode: 'myth', cards: [
          { front: '"It caught a fall, but it looks fine, so it\'s fine."', back: 'Myth. Impact-loaded gear is out until a competent person decides. Most makers say destroy.', verdict: 'myth', cite: '1926.502(d)(19)' },
          { front: '"It has a current inspection sticker, so I can skip the pre-use check."', back: 'Myth. The sticker is the yearly check. Pre-use is every time.', verdict: 'myth', cite: '1926.502(d)(21)' },
          { front: '"Every harness expires after five years."', back: 'Myth. The maker sets service life. Some list a fixed number, many say until it fails inspection. Read the label.', verdict: 'myth' },
          { front: '"Store harnesses in a bag in the gang box, not in the truck bed."', back: 'Field truth. Sun, heat, fuel and battery acid quietly kill webbing.', verdict: 'truth' },
          { front: '"SRLs can be opened up and fixed in the shop."', back: 'Myth. SRL repair goes to the manufacturer or an authorized service center.', verdict: 'myth', cite: 'Manufacturer instructions' }
        ],
          narration: 'Myth or field truth. Flip each card.',
          sb: { build: 'Rise Flashcard Grid.' } }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'm6-l5', title: 'Crew talk: Ray\'s lucky harness', minutes: 10,
      blocks: [
        { type: 'text', heading: 'The hard part isn\'t spotting it',
          body: 'You\'ll spot the bad harness in two seconds. The hard part is the next two minutes, when it\'s on a 28-year foreman in front of his crew.',
          narration: 'The hard part isn\'t spotting a bad harness. You\'ll do that in two seconds. The hard part is the next two minutes, when it\'s on a twenty-eight-year foreman in front of his crew.' },

        { type: 'scenario', id: 'm6-lucky-harness', title: '"That harness is fine. It\'s my lucky one."',
          intro: 'Three rounds. Your words decide how it lands.',
          start: 'n1',
          nodes: {
            n1: { speaker: 'ray',
              text: '6:32 a.m. Ray pulls his harness from his truck. The webbing is sun-bleached pink, there\'s a melted spot near the back D-ring, and the label is a gray smear. You start to say something. "That harness is fine. It\'s my lucky one."',
              choices: [
                { text: '"Lucky\'s good. Let\'s look at it together before we go up."', next: 'n2', tone: 'good',
                  fb: 'Asking to look together keeps it about the gear, not about Ray.' },
                { text: '"That\'s out of service. Take it off. Now."', next: 'n2b', tone: 'ok',
                  fb: 'Right call, in front of the whole huddle. Watch what that does to Ray.' },
                { text: 'Say nothing. He\'s been doing this 28 years.', next: 'endSilent', tone: 'bad',
                  fb: 'His years don\'t inspect his harness.' }
              ] },
            n2b: { speaker: 'ray',
              text: 'Ray, loud enough for the crew: "Who made you the harness police?"',
              choices: [
                { text: '"Marco did, on paper. I\'d rather do this with you than at you. Let\'s look at it together."', next: 'n2', tone: 'good',
                  fb: 'Recovered. You named your authority without hiding behind it.' },
                { text: '"I\'m the competent person. That\'s who."', next: 'endCold', tone: 'ok',
                  fb: 'True, and it ends the conversation instead of winning it.' }
              ] },
            n2: { speaker: 'ray',
              text: 'Ray holds it up. "See? Webbing\'s fine. Label\'s just paper." You find the melted spot: glazed hard. The label has no readable date, standard or serial.',
              choices: [
                { text: '"No label means I can\'t prove what it\'s rated for or how old it is. And that\'s a weld burn. New one in the trailer in your size. Swap now, I\'ll tag this one, you\'re up in five."', next: 'n3', tone: 'good',
                  fb: 'Facts, a fix and a five-minute cost. Hard to argue with.', cite: '1926.502(d)(21)' },
                { text: '"OSHA can fine you for wearing that."', next: 'n3b', tone: 'bad',
                  fb: 'You don\'t write tickets, and Ray knows it. Threats turn this into a contest.' },
                { text: '"OK, but get a new one by Friday."', next: 'endFriday', tone: 'bad',
                  fb: 'A deadline on a defect is permission to keep using it.' }
              ] },
            n3b: { speaker: 'ray',
              text: 'Ray laughs. "Write me a ticket, then." The huddle breaks up and he heads for the hoist.',
              choices: [
                { text: 'Catch him at the hoist: "Forget the ticket. Weld burn, no label. New one\'s in the trailer. Swap and I\'ll tag this one."', next: 'n3', tone: 'good',
                  fb: 'Recovered: you dropped the threat and gave him the facts and the fix.' },
                { text: 'Let it go for today.', next: 'endSilent', tone: 'bad',
                  fb: 'Today is the day he wears it.' }
              ] },
            n3: { speaker: 'ray',
              text: 'Ray goes quiet. "My kid bought me this when I made foreman. Twelve years." Dee is watching from the gang box.',
              choices: [
                { text: '"Then keep it. Hang it in your truck, not on you. Dee\'s going to wear what you wear."', next: 'endGood', tone: 'good',
                  fb: 'You respected what it means to him and still took it out of service.' },
                { text: 'Cut the straps right there so it can\'t come back.', next: 'endCut', tone: 'ok',
                  fb: 'It can\'t come back. Neither might Ray\'s trust.' },
                { text: '"Wear it till the new one shows up at lunch."', next: 'endLunch', tone: 'bad',
                  fb: 'Four hours on a defective harness, with your OK.' }
              ] },
            endGood: { end: true, outcome: 'good', title: 'Swapped, and Ray\'s still talking to you',
              text: 'Ray swaps it. Next morning Dee asks you to look at her harness before the huddle. That\'s the culture moving, and it cost you five minutes.',
              cite: '1926.502(d)(21)' },
            endCut: { end: true, outcome: 'ok', title: 'Right result, expensive delivery',
              text: 'The harness is gone and the crew is safer. Ray works the day in the new one and won\'t speak to you. Destroying bad gear is right; doing it as a show costs you the next conversation.' },
            endCold: { end: true, outcome: 'ok', title: 'You won the round',
              text: 'He swaps it, angry. You were right. Next time Ray spots a problem, he may not bring it to you.' },
            endFriday: { end: true, outcome: 'bad', title: 'You approved defective gear',
              text: 'Four more days on a burned, unlabeled harness. If he falls Wednesday, the record shows the competent person knew. Defective components come out of service. Not Friday.',
              cite: '1926.502(d)(21)' },
            endLunch: { end: true, outcome: 'bad', title: 'Four hours on your say-so',
              text: 'Nothing happened this morning. But Dee saw you allow it, and that\'s what she\'ll copy.',
              cite: '1926.502(d)(21)' },
            endSilent: { end: true, outcome: 'bad', title: 'Nothing happened. Today.',
              text: 'Dee noticed the harness and noticed you said nothing. Next month she\'s wearing one just like it.' }
          },
          narration: 'Three rounds with Ray. Your words decide how it lands.',
          sb: { visual: 'Ray and Tasha photo characters by the truck; harness close-up on node n2.', search: 'construction foreman pickup truck morning',
                build: 'Storyline dialogue sim: one slide per node, choices as buttons; tone drives Ray\'s expression state (calm/annoyed/quiet). Variable m6_rayRapport +1 good, −1 bad shown as a meter. Ends on result slides with Replay.' } },

        { type: 'reflect', id: 'm6-gut',
          prompt: 'Gut check: whose gear on your crew would you hesitate to call out? Why?',
          placeholder: 'One line. Only you see this.',
          narration: 'Gut check. Whose gear on your crew would you hesitate to call out? Why?' },

        { type: 'callout', variant: 'monday', title: 'Monday: watch one pre-use check',
          body: ['At the first huddle, ask one person to inspect their harness out loud while the crew watches. Then do yours.', 'Pull anything that fails. Replace it the same shift.', 'Check the dates in your periodic log. Anything over a year is overdue.'],
          narration: 'Monday. At the first huddle, ask one person to inspect their harness out loud while the crew watches. Then do yours. Pull anything that fails, and replace it the same shift.' },

        { type: 'download', title: 'Pre-use inspection checklist + periodic log', desc: 'Page 1: the 60-second check with remove-if criteria. Page 2: the competent person\'s periodic log.',
          file: 'jobaids/pre-use-inspection-checklist.html', pdf: 'jobaids/pdf/pre-use-inspection-checklist.pdf',
          narration: 'Download the pre-use checklist and periodic log.' }
      ]
    }
  ],

  kc: {
    title: 'Module 6 knowledge check',
    questions: [
      { id: 'm6-kc1', question: 'How often must a worker inspect their harness, lanyard or SRL?',
        options: [
          { text: 'Before each use', correct: true, fb: 'Right. Pre-use, every time.' },
          { text: 'Once a week', correct: false, fb: 'Weekly is for safety nets. PFAS is before each use.' },
          { text: 'Once a year', correct: false, fb: 'Yearly is the competent person\'s periodic inspection, on top of pre-use.' }
        ],
        explain: 'Personal fall arrest systems are inspected prior to each use for wear, damage and other deterioration.',
        cite: '1926.502(d)(21)' },
      { id: 'm6-kc2', question: 'An SRL\'s impact indicator is showing, but the SRL still retracts and locks. What do you do?',
        options: [
          { text: 'Keep it in service; the lock test passed', correct: false, fb: 'A tripped indicator means it took a fall load. The lock test doesn\'t clear that.' },
          { text: 'Remove it from service; it goes back to the maker or an authorized service center', correct: true, fb: 'Right. Impact-loaded components come out until a competent person decides, and SRLs go back to the maker.' },
          { text: 'Reset the indicator and log it', correct: false, fb: 'Resetting hides the evidence. Never.' }
        ],
        explain: 'Components subjected to impact loading are removed from service until a competent person determines they are undamaged and suitable for reuse.',
        cite: '1926.502(d)(19)' },
      { id: 'm6-kc3', question: 'Who may sign the periodic inspection log for the crew\'s harnesses?',
        options: [
          { text: 'Any worker who wears that harness', correct: false, fb: 'Workers do pre-use checks. The periodic inspection is a competent person\'s.' },
          { text: 'A competent person', correct: true, fb: 'Right. And it goes on paper with the date, item, result and signature.' },
          { text: 'The superintendent, because he\'s in charge', correct: false, fb: 'Authority alone isn\'t competence in inspection.' }
        ],
        explain: 'Periodic inspections, at intervals of no more than one year, are performed and documented by a competent person.',
        cite: 'ANSI/ASSP Z359.2' },
      { id: 'm6-kc4', question: 'Ray\'s harness has no readable label. Everything else looks OK. Your call?',
        options: [
          { text: 'In service; labels wear off', correct: false, fb: 'Without the label you can\'t prove the rating, the standard or the age.' },
          { text: 'Remove it from service and get him a replacement today', correct: true, fb: 'Right. No label, no proof. Replace it the same shift.' },
          { text: 'Write the info on it with a marker', correct: false, fb: 'Guessing the rating and age isn\'t inspecting.' }
        ],
        explain: 'A missing or illegible label fails pre-use inspection under most manufacturers\' instructions; defective components are removed from service.',
        cite: '1926.502(d)(21); manufacturer instructions' }
    ]
  }
});
