# Tasks

Phased build plan for the portfolio. See `spec.md` for full requirements. Each phase ends in a working build.

Legend: `[x]` done · `[ ]` to do

---

## Phase 0 — Setup

- [x] Initialise the git repository.
- [x] Create `package.json`. Install `astro@5`, `gsap`, `lenis`, `@fontsource-variable/archivo`, `@fontsource/jetbrains-mono`. Dev deps: `@astrojs/check`, `typescript`, `sharp`.
- [x] Install ffmpeg (`winget install --id Gyan.FFmpeg -e --source winget`).
- [x] Write `spec.md`, `tasks.md`, `README.md`.
- [x] Add `astro.config.mjs`, `tsconfig.json` (strict), `vercel.json`, and `.gitignore` (ignores `node_modules`, `dist`, `.astro`, `.vercel`, `projects/`, `resources/`, `template/`).

**Done when:** `npm run dev` serves a blank page with no errors.

## Phase 1 — Assets

- [x] Copy plates and slides into `src/assets/work/**` with slugged, space-free names.
- [x] Crop the portrait to 4:5 and save it as `src/assets/portrait.jpg`.
- [x] Write `scripts/encode-videos.sh`.
- [x] Encode both TOA videos to 720 × 1280 H.264 MP4 with poster frames in `public/video/`.

**Done when:** every committed asset is under 50 MB and the `.mov` plays in Chrome as MP4.

## Phase 2 — Content model

- [x] `src/data/site.ts`: name, short name, tagline, program, department, section, nav.
- [x] `src/data/categories.ts`: typed categories with plates, series, and videos. Copy is transcribed verbatim from `resources/details.pdf`.
- [x] Draft the DP100 description and mark it for review.

**Done when:** each page can render only from data, and TypeScript accepts every image import.

## Phase 3 — Design system and shell

- [x] `src/styles/global.css`: tokens (color, type, space), reset, grid, utility classes, focus styles, reduced-motion rules.
- [x] `src/layouts/Base.astro`: fonts, meta and OG tags, `<ClientRouter />`, Lenis + ScrollTrigger bootstrap, sheet grid background.
- [x] `Nav.astro`: corner nav, mobile menu, and an active state.
- [x] `TitleBlock.astro`: drawing-sheet footer.
- [x] `Cursor.astro`: CAD crosshair with coordinate readout and hover labels. Fine pointers only.
- [x] Page-transition curtain.

**Done when:** all routes share the shell, navigation works with the curtain, and keyboard focus is visible.

## Phase 4 — Landing page

- [x] `Preloader.astro`: sheet border draw, counter `000 → 100`, split reveal. Runs once per session and is skipped for reduced motion.
- [x] `Hero.astro`: three-line masked name reveal, plate stack with pointer parallax and fan-out on hover, word-by-word tagline.
- [x] Statement section with words that fill as the visitor scrolls.
- [x] `SubjectIndex.astro`: numbered rows, width-axis hover, cursor image trail, History marked in progress.
- [x] `Marquee.astro`: plate codes driven by scroll velocity.

**Done when:** the landing page reads well with motion off, and every interaction works with motion on.

## Phase 5 — Galleries (Graphics, Visual Communication)

- [x] `GalleryHeader.astro`: name, count, quote, intro.
- [x] `HorizontalGallery.astro`: pinned horizontal track on desktop, stacked on mobile and reduced motion. Progress hairline and arrow buttons.
- [x] `PlateLightbox.astro`: dialog with zoom/pan, metadata, prev/next, keyboard, focus trap, and `?plate=` deep link.
- [x] `/graphics` and `/visual-communication` pages.

**Done when:** all 17 plates open with correct copy, and both deep links and Esc work.

## Phase 6 — Theory of Architecture and History

- [x] `SeriesDeck.astro`: drag/swipe track, counter, progress, filmstrip, fullscreen, keyboard. Sheet frame for Proxemics.
- [x] `VideoFeature.astro`: vertical poster card with hover preview and a modal player with custom controls.
- [x] `/theory-of-architecture` page: 3 decks + 2 videos.
- [x] `/history-of-architecture` placeholder with the drafting animation.

**Done when:** decks page in order on mouse, touch, and keyboard, and both videos play with sound.

## Phase 7 — Polish and ship

- [x] Favicon (monogram) and OG image.
- [x] Run `npm run build` (includes `astro check`) with zero errors.
- [x] Automated QA in Edge (Chromium) at 360 / 768 / 1280 / 1920. No horizontal overflow and no console errors on any route.
- [ ] Manual QA in Firefox and Safari (iOS).
- [x] Reduced-motion audit. No preloader, pinning, or parallax, and all plates stay reachable in a plain grid.
- [ ] Lighthouse mobile ≥ 90 / 95 / 95 / 95. Local run (simulated slow 4G):
  - Home: 81 / 96 / 100 / 100.
  - Graphics: 88 / 100 / 100 / 100.
  - Theory: 76 / 100 / 100 / 100.
  - Performance is held back by large plate images and intro animations that hold the LCP text. Re-measure on the Vercel URL.
- [ ] Alexandra reviews the drafted DP100 copy.
- [ ] Create the GitHub repository and push `main`.
- [ ] Import into Vercel and verify the production URL (all routes and both videos).

## Later

- [ ] Add History of Architecture work. Set `status: 'published'` and add plates in `categories.ts`.
- [ ] Optionally add the remaining TOA work listed in the PDF: P2.1 Anthropod (convert HEIC to JPG first), Human Figure, Solids and Voids, Spatial Organization, Ugly Building Journal.
