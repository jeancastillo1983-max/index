# Silica Competent Person — build spec

Second course on the same pipeline as the fall protection course (`docs/BUILD-SPEC.md`). This file lists only what differs.

## Source and profile

- Course folder: `silica-cp/`. Content in `silica-cp/content/*.js` (course, media, scenes, m0–m8, exam, audio).
- Build tools select the course with `COURSE_ID=silica-cp` (profiles in `tools/courses.json`, read by `tools/profile.js` / `profile.py`). Outputs go to `deliverables/silica-cp/` and `dist/silica-cp/`.
- `js/config.js` sets `storagePrefix: 'scp:'` so progress never collides with the fall protection course on the same LMS host.
- Course-specific text the shared engine reads from `COURSE.meta`: `certPrefix`, `certStandards`, `commitmentFile`, `verificationHero`, `fieldItems`, `homeFacts`, `blueprint` (validator), `storyboard` (storyboard build guide text).

## New block types (`js/blocks-silica.js`, `css/silica.css`)

- `table1` — Table 1 stepper. `{ id, title, intro, controls: [{id, label, short}], tasks: [{ task, hours, indoor, who, art, alt, control, resp: 'none'|'apf10'|'apf25', decoys, fb, cite }], summary }`. Learner picks the control and the respirator for each task; summary table at the end.
- `shift` — 4-hour shift builder. `{ id, title, speaker, question, preset: [taskIds], tasks: [{ id, label, short, hours, resp: { le4, gt4 } }], explain, cite }`. Predict first, then toggle tasks; once the total passes 4 hours every task flips to its "> 4 hours" respirator (1926.1153(c)(3)).

Both have storyboard and deck renderers in `tools/build-storyboard.js` and `tools/build-pptx.js`.

## Exam blueprint

25 slots × 3 questions = 75 items; 25 drawn. Areas: M1 2 · M2 3 · M3 3 · M4 7 · M5 3 · M6 4 · M7 3. Critical (5): Table 1 control selection, respirator by duration and location, when an exposure assessment is required, no dry sweeping or compressed air, restrict access or stop work. Pass: 80% and all critical items; 3 attempts.

## Art

`node tools/scene-gen/silica.js [names]` draws the scenes (`scene-slab`, `scene-entrance`), diagrams (`dg-*`) and equipment drawings (`eq-*`) and prints hotspot boxes for `content/scenes.js`. `node tools/make-posters.js` draws branded video posters. Avatars for Walt and Gus are in `js/art.js`.

## Narration

`tools/voices-silica.json` casts Tasha (narrator), Ray, Marco, Dee, Gus, Walt, Jordan (safety) and a generic crew voice. Silica terms (µg/m³, APF, PEL, TWA, HEPA, PAPR, cfm, CMU) are spelled out for the voice in `tools/build-audio.py`.
