# Fall Protection Competent Person — deliverables

Version 1.0 (Nov 2026). Six hours, self-paced: orientation, nine modules, final exam. Everything here is generated
from one source (`fall-protection-cp/content/`), so a content change is made once and rebuilt into every format.

| File | What it is | Use it for |
|---|---|---|
| `FallProtection-CP_SCORM12.zip` | Complete HTML5 course, SCORM 1.2 (mastery 80) | Upload to the LMS as a SCORM 1.2 package. Reports `passed` + score on an exam pass; bookmarks with `lesson_location`/`suspend_data`. |
| `FallProtection-CP_Storyboard.docx` | Master storyboard, 160 pages, 261 screens | Every screen: on-screen text, narration script, interaction and branching logic, visual + thumbnail, Content Library search term, citations, and the Rise 360 / Storyline 360 build note. Includes the build guide, all 120 exam items with keys, field verification and media licenses. |
| `powerpoint/FPCP_M0…M9_*.pptx` | Facilitator / review decks, one per module (580 slides) | Instructor-led or review sessions. Branching scenarios are decision slides (choices point to slide numbers); answers, feedback, citations and narration are in the speaker notes. Also a starting point for Storyline (Insert › Import › PowerPoint). |
| `job-aids/*.pdf` | 10 print-ready job aids (Letter) | Competent vs. qualified; daily walk checklist; system selection guide; pocket clearance cards; pre-use inspection checklist + periodic log; rescue plan template (with filled Riverside example); stop-work scripts; training certification record; toolbox talk template; field verification sign-off. |

## What's in the course
- **Modules** (minutes): 0 Start here (15) · 1 The fall that didn't have to happen (30) · 2 Your authority and your duty (30) · 3 Reading the site (45) · 4 Picking the right system (45) · 5 Anchors, connectors and clearance (45) · 6 Inspection (40) · 7 Rescue (30) · 8 Leading the crew (35) · 9 Capstone shift (20) · Final exam (25).
- **Interactions**: spot-the-hazard on five illustrated Riverside scenes (with ranking and "tomorrow" predictions), branching scenarios (incl. a running rescue clock and a scored 10-decision capstone), clearance calculators with animated fall diagrams, swing-fall slider, drag-and-drop sorts with illustrated equipment and anchors, find-the-errors forms, toolbox-talk builder, commitment card, myth/field-truth cards, polls, private gut checks, test-outs for experienced learners.
- **Exam**: 40 questions drawn from 120 (3 per slot), 28 scenario-based, 8 critical items; pass = 80% and all critical items; 3 attempts; missed modules reopen for review; certificate with the approved wording; field verification view.
- **Media**: 30 photos (public domain U.S. government, CC, Pexels) and 22 verified YouTube videos (OSHA/DOL, Oregon OSHA, CPWR, 3M, FallTech, Ironworkers) — credits in the course (`#credits`) and `fall-protection-cp/assets/CREDITS.md`. Characters and scenes are original illustrations.
- **Narration**: every lesson block has a script; the player reads it aloud with captions (browser text-to-speech) until recorded audio replaces it.

## Rise 360 and Storyline 360
Rise 360 has no HTML import, so the storyboard is the build sheet: each screen's **Build** row names the Rise block
(Text, Quote, Flashcards, Process, Labeled graphic, Knowledge check, Attachment…) or the Storyline interaction, with
variables and triggers (e.g. clearance `RC = L + DD + HS + H − A + SM`, `M3_HazardsFound`, `M7_Clock`). The HTML5 build is
the working reference for how each interaction should behave. If you host it, individual lessons can also be linked
from Rise with a Multimedia › Embed block (`index.html#m5-l3` opens Module 5, Lesson 3).

## Before launch
1. **Branding**: Upchurch logo and colors are placeholders. Set `--brand-primary` / `--brand-accent` in `fall-protection-cp/css/tokens.css` and `brand.logo` in `js/config.js`, then rebuild.
2. **Qualified-person review** of all exam items and technical content (the storyboard lists every item with its key and citation).
3. **Statistics**: BLS CFOI 2024 and OSHA Top 10 FY2026 (preliminary) were verified at build; recheck each year.
4. **Videos**: YouTube links were verified at build; recheck availability before each rollout.
5. **LMS test**: run the SCORM zip in your LMS (or SCORM Cloud) end to end — bookmark, exam fail → review flags, pass → `passed`.
6. **Field verification**: the safety manager signs `job-aids/field-verification-signoff.pdf` before anyone is designated.

## Rebuild
See `.claude/skills/elearning-course-builder/SKILL.md` and `docs/BUILD-SPEC.md`. Short version:
`cd tools && npm install && npm run all`, plus `node smoke-test.js` and `node exam-test.js pass` for QA.
