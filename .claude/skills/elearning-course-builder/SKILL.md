---
name: elearning-course-builder
description: Build or update a single-source e-learning course in this repo (HTML5/SCORM 1.2 player, Rise 360/Storyline 360 storyboard .docx, facilitator PowerPoint decks, job-aid PDFs, claude.ai preview). Use when asked to create a new safety/compliance course (e.g. the planned scaffold or ladder competent person courses), change course content, add a module, block type or exam item, or rebuild any deliverable from fall-protection-cp/content.
---

# E-learning course builder (single source → every format)

Everything is generated from plain-JS content files. Change content once, rebuild all outputs.

```
fall-protection-cp/content/*.js   ← the source of truth (modules, media, scenes, exam)
        │
        ├─ fall-protection-cp/index.html + js/ + css/   HTML5 player (Rise-style lessons, Storyline-style interactions, SCORM 1.2)
        ├─ tools/build-storyboard.js   → deliverables/FallProtection-CP_Storyboard.docx  (every screen: text, narration, logic, visuals, build notes)
        ├─ tools/build-pptx.js         → deliverables/powerpoint/*.pptx   (facilitator decks; branching = decision slides; notes = narration + answers)
        ├─ tools/build-pdfs.js         → deliverables/job-aids/*.pdf      (job aids printed from jobaids/*.html)
        ├─ tools/build-scorm.js        → deliverables/FallProtection-CP_SCORM12.zip (+ imsmanifest.xml)
        └─ tools/build-artifact.js     → dist/artifact/ (claude.ai preview: review mode, videos link out)
```

## Read first
- `docs/BUILD-SPEC.md` — the contract: file layout, block schema (§4), exam rules (§5), story world and characters (§6), technical facts and the clearance formula (§7), scene hazard ids (§8), media registry (§9), design tokens (§10).
- `fall-protection-cp/js/core.js` — `FP` runtime API (`register`, `h`, `media`, `char`, `scene`, `clearance`, `swingDrop`).

## Rebuild everything
```bash
cd tools && npm install          # pptxgenjs + docx (once per container)
cd .. && node tools/validate.js  # must print "OK — no errors"
node tools/build-pdfs.js         # job aids → PDF
node tools/render-art.js         # SVG art, avatars, scene reveals → dist/png (needed by deck + storyboard)
NODE_PATH=tools/node_modules node tools/build-storyboard.js
NODE_PATH=tools/node_modules node tools/build-pptx.js [m3 m5 …]
node tools/build-scorm.js
node tools/build-artifact.js     # then publish dist/artifact/index.html with root=dist/artifact and files from files.json
```

## Change content
1. Edit `fall-protection-cp/content/mN.js` (blocks per BUILD-SPEC §4; interactive blocks need a unique `id`; put `narration` on most blocks and `sb: {visual, search, build}` on interactive/visual ones).
2. `node tools/validate.js mN` until zero errors.
3. Preview: `npx http-server fall-protection-cp -p 8100 -s` then open `http://localhost:8100/#mN-l1` (set `reviewMode: true` in `js/config.js` to unlock everything while reviewing; set it back to `false` for the LMS build).
4. Rebuild the outputs above and commit the regenerated deliverables.

## New course from this template (e.g. Scaffold CP, Ladder CP)
1. Copy `fall-protection-cp/` to `<new-course>/` (keep js/, css/, tools contract), clear `content/m*.js`, `scenes.js`, `exam.js`, `media.js`.
2. Write a new `docs/BUILD-SPEC.md` section §6–§8 for the new story world, facts and scenes; update `content/course.js` (meta, characters, outline, order).
3. Point `tools/load-content.js` `ROOT` (or pass a path) at the new course folder; build as above.
4. Keep the instructional strategy: decide first then learn, peer voice, citations as receipts, ≤60 words per screen, every risk paired with a doable action, something usable Monday at the end of every module.

## Media rules
- Images: public domain (US gov), CC0, CC BY, CC BY-SA, Unsplash/Pexels only; record author, license and source in `content/media.js` and `assets/CREDITS.md`. Optimize to ≤1600 px, ≤350 KB.
- Videos: YouTube embeds from official/credible channels, verified with the oEmbed endpoint; poster stored in `assets/video/<id>.jpg`.
- No graphic injury images. Illustrations follow the flat style in BUILD-SPEC §8.

## Gotchas
- SCORM 1.2 `suspend_data` is limited to 4,096 chars: keep progress state compact; reflections/UI state stay in localStorage.
- SCORM 1.2 reports one score + passed/failed, so the 100%-on-critical-items rule is enforced inside the exam engine.
- Artifacts can't embed iframes or start downloads: the preview build sets `videoMode: 'link'`; job aids open as pages.
- Playwright pages opened with `setContent` can't load `file://` resources — write a temp HTML file and `goto` it (see `tools/render-art.js`).
- pptxgenjs: declare `pres.addSection()` before using `sectionTitle`; never `#` in hex colors.
