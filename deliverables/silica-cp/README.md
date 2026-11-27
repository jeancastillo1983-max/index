# Silica Competent Person — deliverables

A 2-hour, 10-part course for foremen and lead hands being designated as silica competent persons under 29 CFR 1926.1153 (construction), including Table 1. Federal OSHA only; check for stricter state-plan rules. Everything here is generated from `silica-cp/content/*.js`, so a content fix rebuilds every format.

| File | What it is | Use it for |
|---|---|---|
| `Silica-CP_SCORM12.zip` | The interactive HTML5 course as a SCORM 1.2 package | Upload to any LMS. Reports one score and passed/failed. |
| `Silica-CP_Storyboard.docx` | Master storyboard: every screen with on-screen text, narration, interaction and branching logic, thumbnail, Content Library search term, citations, and the Rise 360 / Storyline 360 build note. Includes all 75 exam items with keys. | Rebuilding in Articulate, SME and legal review. |
| `powerpoint/SCP_M0…M8_*.pptx` | Facilitator / review decks, one per module | Instructor-led sessions. Answers, feedback, citations and narration are in the speaker notes. Also imports into Storyline (Insert › Import › PowerPoint). |
| `Silica-CP_Narration-MP3.zip` | Every narration clip as MP3, named by storyboard screen code, with an index CSV | Drop into Storyline 360 or Rise 360. Free neural voices (Kokoro, Apache-2.0), one per character, cast in `tools/voices-silica.json`. |
| `job-aids/*.pdf` | Six printable job aids | Table 1 pocket card · exposure control plan template (with a worked Riverside example) · daily silica inspection checklist · crew talk and stop-work scripts · your authority in one page · field verification sign-off. |

## Course at a glance

| # | Module | Min | Signature activity |
|---|---|---|---|
| 0 | Start here: why silica, why you | 5 | Course map, the crew, how decisions work |
| 1 | The dust you can't see | 10 | Walt's story (retired mason with silicosis), particle-size diagram, myth vs field truth |
| 2 | Your authority and when the rule applies | 12 | Scope sort, "not your call" crew-talk scenario |
| 3 | Finding silica on the site | 12 | Two spot-the-silica-task scenes (slab and entrance), next-week sort, Gus scenario |
| 4 | Table 1 in the field | 25 | Table 1 match (10 Riverside tasks), "fully and properly" pass-or-fix, 4-hour shift builder, vac scenario |
| 5 | Off the table: exposure assessment | 10 | Two-path scenario, read the sampling results |
| 6 | Respirators, housekeeping and access | 12 | Who can work (respirator call), the broom and the air hose, tag the floor plan |
| 7 | The plan, the paperwork and the crew | 14 | Find four gaps in a filled-in plan, build a daily checklist, "who's the CP?" training check, Ray's coughing fit |
| 8 | Capstone: one shift at Riverside | 8 | Scored 8-decision branching shift with debrief scorecard, commitment card |
| Exam | Final assessment | 12 | 25 questions from a 75-item pool; 80% and all 5 critical items; 3 attempts |

After the exam: a knowledge certificate, then the safety manager's field verification (8 observed items) before the employer designates the competent person.

## Media

Photos are licensed (public domain, CC0, CC BY/BY-SA, Pexels) and listed in `silica-cp/assets/CREDITS.md`. Scene art, diagrams, equipment drawings, avatars and video posters are original. Videos are embedded from the U.S. Department of Labor (OSHA) and CPWR YouTube channels, not redistributed.

## Rebuild

```
cd tools
export COURSE_ID=silica-cp
node validate.js && node build-pdfs.js && node render-art.js && python3 make-thumbs.py
NODE_PATH=./node_modules node build-storyboard.js && NODE_PATH=./node_modules node build-pptx.js
~/.cache/fpcp-tts/venv/bin/python build-audio.py && node package-audio.js && node build-scorm.js
node smoke-test.js && node exam-test.js pass      # exam test needs the course served on :8199
```

Without `COURSE_ID` the tools build the fall protection course, exactly as before.

## Before launch

- Have a qualified person (CIH or the company's safety manager) review the exam items and Table 1 rows against the current regulation text.
- Replace the fictional "Tasha R." in the worked plan example with your own process, and add your state-plan requirements if you work in a state-plan state.
