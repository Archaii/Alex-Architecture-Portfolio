# Specification — Alexandra Andaya · Architecture Portfolio

## 1. Purpose

A personal portfolio that presents the first-year academic work of **Alexandra Ysabelle S. Andaya** (BS Architecture, ARIDBE, Section A59, Mapúa University). The site must feel like an architect's drawing set translated to the web: precise, quiet, monochrome, and deliberate, with motion that rewards attention instead of decorating for its own sake.

**Tagline:** "From the first stroke to endless possibilities, a journey of creativity, precision, and discovery."

### Goals

1. Introduce Alexandra in one screen: name, tagline, portrait.
2. Present the work of each subject as a gallery that respects the plates (no heavy cropping, full detail on demand).
3. Present the connected Theory of Architecture series (slide decks) as sequences, not loose images.
4. Feel distinct from template or AI-generated portfolios. Use architectural vocabulary: sheets, title blocks, plate codes, dimension lines, a CAD-style cursor.
5. Be fast, accessible, and deployable to Vercel from GitHub with zero server code.

### Non-goals

- No CMS, blog, contact form, or analytics.
- No editing of the source plates (grades and scanner marks stay as submitted).
- No History of Architecture content yet (placeholder only).

## 2. Visual references

- `template/website template 1.png`: black hero, huge light grotesque name set over a fanned stack of photos, small uppercase nav corners.
- `template/website template 2.png`: horizontal gallery of portrait cards with captions, round arrow buttons, a large "08 / GALLERY" index under a hairline.
- `resources/my-picture.PNG`: warm, low-light scene. Black top, white cardigan, auburn hair, stone wall, matcha drink. The palette comes from this photo.

## 3. Design system

### 3.1 Color

| Token | Value | Source / use |
|---|---|---|
| `--ink` | `#0B0A09` | Page background. Warm near-black from the photo shadows. |
| `--paper` | `#F2EEE8` | Primary text. Warm white from the cardigan. |
| `--stone` | `#8C847A` | Secondary text, hairlines, captions. The adobe wall. |
| `--line` | `rgba(242,238,232,.14)` | Grid lines, dividers. |
| `--auburn` | `#8A4B32` | Accent. Hair color. **Only for interactive state:** hover underline, cursor ring, active counters, progress bars, page-transition curtain. |
| `--auburn-hi` | `#B4673F` | Accent on dark backgrounds where contrast is needed for small text. |

Rule: The site is black and white. Auburn appears only when the visitor does something.

### 3.2 Typography

- **Display:** Archivo Variable (weights 100–900, width axis 62–125). Set light (200–300), uppercase, tight leading (0.86), and very large (`clamp(3.5rem, 13vw, 14rem)`). The width axis is animated on hover and scroll as a signature interaction.
- **Technical:** JetBrains Mono, used for plate codes, counters, coordinates, labels, and the title block. Uppercase with +0.08em tracking at 11–13 px.
- **Body:** Archivo at 16–18 px, weight 350, width 100, line-height 1.55.
- Both fonts are self-hosted through `@fontsource`. There are no third-party font requests.

### 3.3 Space and grid

- 12-column grid, `--gutter: clamp(16px, 2vw, 28px)`, page margin `clamp(16px, 3vw, 40px)`.
- A hairline sheet grid (columns plus registration crosses at corners) sits behind content at very low opacity.
- Section dividers use dimension lines: a hairline with end ticks and a mono label (for example `|—— 08 PLATES ——|`).

### 3.4 Imagery

- Plates and photos are grayscale at rest (`filter: grayscale(1)`). They transition to full color on hover or focus, and always show in full color in the detail view. Touch screens have no hover, so a plate takes on color while it sits in the middle of the viewport.
- Portrait: cropped 4:5 from the source photo. Shown at a modest size because the source is 391 × 489.

### 3.5 Motion principles

- Easing: `cubic-bezier(.7,0,.2,1)` ("drafting") for reveals, `power3.out` for follow effects.
- Durations: 0.6–1.2 s for reveals, 0.25 s for hovers.
- Text reveals use line masks (overflow hidden, translate up), not fades.
- `prefers-reduced-motion: reduce` turns off the preloader, pinning, horizontal scroll hijack, parallax, cursor follower, marquee movement, and page curtains. Content stays fully reachable.

## 4. Information architecture

```
/                           Landing
/graphics                   Graphics · 8 plates
/visual-communication       Visual Communication · 9 plates
/theory-of-architecture     Theory of Architecture · 3 series + 2 videos
/history-of-architecture    History of Architecture · In progress
```

Navigation: fixed top bar. Left: "ALEXANDRA ANDAYA" (home). Right: GRAPHICS · VISCOM · THEORY · HISTORY (muted with a small "soon" tag). On mobile, a full-screen menu with large index rows.

Deep links:
- `/graphics?plate=pl300` opens that plate's detail panel.
- `/theory-of-architecture#anthropometry` scrolls to that series.

## 5. Pages

### 5.1 Landing `/`

1. **Preloader** (first visit per session only)
   - Hairlines draw a sheet border, then a title block in the bottom-right.
   - A mono counter runs `000 → 100` with the label `LOADING SHEET A-000`.
   - The sheet splits open to reveal the hero. Total time about 2 s.
2. **Hero** (after template 1)
   - Text set in three lines: `HELLO, I'M` / `ALEXANDRA` / `ANDAYA`.
   - Behind or within the type, a **plate stack**: the portrait on top of 3 plate thumbnails rotated at small angles.
     - The stack moves with the pointer (parallax, max 20 px).
     - On hover the plates fan outward and the portrait goes to color.
   - Bottom row: left `BS ARCHITECTURE — A59`, center the tagline (word-by-word reveal), right `©2026` and a scroll cue.
3. **CAD cursor** (fine pointer only)
   - Thin crosshair lines span the viewport. A small mono readout shows `X 0412 · Y 0198`.
   - Over links and plates the cursor becomes an auburn ring with a label (`VIEW`, `OPEN`, `PLAY`).
4. **Statement**
   - A large paragraph from the tagline and the program facts.
   - Words fill from stone to paper as the visitor scrolls (scrubbed). The unfilled state still passes AA contrast.
5. **Subject index**
   - Four rows: `01 GRAPHICS 08`, `02 VISUAL COMMUNICATION 09`, `03 THEORY OF ARCHITECTURE 05`, `04 HISTORY OF ARCHITECTURE — IN PROGRESS`.
   - Hover widens the row's type (width axis 100 → 125).
   - On hover, an **image trail** of that subject's plates follows the pointer.
   - The History row is muted and still links to its placeholder.
6. **Marquee**
   - A continuous strip of plate codes (`EX100 · PL100 · PL200 … MP100 · DP100 …`).
   - Speed and direction follow scroll velocity.
7. **Title-block footer** (shared by all pages)
   - A drawing-sheet title block with cells: PROJECT (Architecture Portfolio), NAME, PROGRAM, DEPARTMENT, SECTION, SHEET (page code, for example `A-101`), DATE.
   - Includes a back-to-top link.

### 5.2 Gallery pages (`/graphics`, `/visual-communication`)

1. **Header**
   - Category name in display type, count in display type (`08`), separated by a hairline (template 2).
   - Category quote (italic) and intro paragraph from `resources/details.pdf`.
2. **Horizontal gallery** (desktop, motion allowed)
   - The section pins. Vertical scroll drives a horizontal track of plate cards.
   - Each card shows the plate (grayscale at rest), mono code (`PL300`), title, and index `04 / 08`.
   - A progress hairline (auburn) and ←/→ round buttons step one card at a time.
3. **Fallback** (mobile under 900 px, or reduced motion): a vertical two-column or one-column stack with the same cards.
4. **Plate detail panel** (click or Enter on a card)
   - Full-screen dark panel.
   - Left: the plate at full resolution, fit to screen. Click toggles 2× zoom; pointer move pans.
   - Right: code, title, italic quote, description, counter.
   - Controls: prev/next, close. Keyboard: ←/→, Esc.
   - Focus is trapped, body scroll is locked, and the URL updates (`?plate=`).
   - Opening animation: the plate wipes in (clip-path reveal). It starts from the card's already-loaded image and swaps to the 2400 px WebP once that loads.

### 5.3 Theory of Architecture `/theory-of-architecture`

1. Header: name, count, quote, and intro paragraph, then a small table of contents. The works are shown in course order: P1.1, P1.2, Q1.2, Anthropometry, P2.2. Each one is numbered `01 / 05` on a dimension line.
2. **Series decks**, one each for Anthropometry (9), Poster Report (6), and Proxemics (5).
   - Two-part layout: on the left, title, code, quote, description, and counter `03 / 09`. On the right, the slide viewer.
   - The viewer is a horizontal track with drag/swipe, ←/→ buttons, keyboard arrows when focused, a progress bar, and a thumbnail filmstrip.
   - The fullscreen button uses the Fullscreen API on the viewer.
   - Proxemics slides (about 780 × 700) sit centered on a framed paper "sheet" so they don't upscale and blur.
3. **Videos**: P1.1 Paper Folding and P1.2 Group Video: Planes.
   - Both sources are vertical (9:16), so cards are tall frames beside their text.
   - The poster frame shows at rest. Hover plays muted and looped (desktop).
   - Click opens a modal player with sound and minimal controls (play/pause, scrub bar, time, mute, close).
   - Files: `/video/p1-1-paper-folding.mp4`, `/video/p1-2-planes.mp4` (H.264, 720 × 1280, faststart).

### 5.4 History of Architecture `/history-of-architecture`

- Display heading, a mono `STATUS: IN PROGRESS` label, and a short line: "Work for this subject is being drawn. Check back soon."
- Contains an empty sheet frame with a slow drafting-line animation.

## 6. Content model

All copy lives in `src/data/`. Pages render only from data, so new work is added without touching components.

```ts
type Plate = {
  slug: string;          // "pl300"
  code: string;          // "PL300"
  title: string;         // "Curves and Polygons"
  quote: string;
  description: string;
  image: ImageMetadata;  // astro:assets import
};

type Series = {
  slug: string; code: string; title: string; quote: string; description: string;
  slides: ImageMetadata[];
  frame?: 'sheet';       // render slides on a paper sheet (small sources)
};

type Video = {
  slug: string; code: string; title: string; quote: string; description: string;
  src: string; poster: string; aspect: '9/16' | '16/9';
};

type Category = {
  slug: string; number: string; name: string; short: string;
  quote: string; intro: string; status: 'published' | 'in-progress';
  plates?: Plate[]; series?: Series[]; videos?: Video[];
};
```

### 6.1 Copy source

All quotes and descriptions are transcribed verbatim from `resources/details.pdf`. One exception:

- **VisCom DP100 — Still Life Drawing** has no entry in the PDF. Drafted copy, to be reviewed by Alexandra:
  - Quote: "Learning to see before learning to draw."
  - Description: "A diagnostic study of a single object in graphite, observing form, reflected light, and cast shadow to build tonal range from the lightest highlight to the deepest black."

## 7. Assets

| Source | Destination | Treatment |
|---|---|---|
| `projects/graphics/*.jpg` | `src/assets/work/graphics/NN-slug.jpg` | Copied. Astro generates AVIF/WebP at 480–2400 px widths. |
| `projects/visual communication/*.jpg` | `src/assets/work/viscom/NN-slug.jpg` | Same |
| TOA slide folders | `src/assets/work/toa/{series}/NN.ext` | Same |
| `resources/my-picture.PNG` | `src/assets/portrait.jpg` | Cropped 391 × 489 (4:5) around the face |
| TOA videos (202 MB, 41 MB) | `public/video/*.mp4` + `*-poster.jpg` | `scripts/encode-videos.sh`. H.264, CRF 24, 720 × 1280, AAC 128k, faststart. The `.mov` is HEVC, which Chrome cannot play, so it is transcoded. |

The raw `projects/`, `resources/`, and `template/` folders are **git-ignored**. They stay on the local machine only.

## 8. Accessibility

- Semantic landmarks, one `h1` per page, logical heading order.
- All plates have `alt` text: `"{code} — {title}, {category} plate"`.
- Every interactive element is reachable by keyboard and has a visible auburn `:focus-visible` outline.
- Dialogs (plate panel, video modal) use `role="dialog"`, `aria-modal`, a labelled title, a focus trap, Esc to close, and return focus on close.
- Color contrast: paper on ink is about 17:1. Stone on ink is about 5.3:1 (AA for body text). Auburn is never used for small text on ink. `--auburn-hi` is used where needed.
- The custom cursor appears only for `(pointer: fine)`. The native cursor is restored when a dialog is open over a form control.
- Reduced motion is honored as described in §3.5.

## 9. Performance budget

- Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- First-load JS under 120 KB gzip (GSAP core + ScrollTrigger + Lenis + app code).
- Images are lazy-loaded except the hero and the first gallery card. Responsive `srcset` is used throughout.
- Videos use `preload="metadata"` and load only on interaction or when in view.
- The two fonts use Latin subsets only and `font-display: swap`.

## 10. Technology

- **Astro 5** with static output and TypeScript strict. Astro 5 is chosen over 7 because it supports Node 20, the local runtime.
- **GSAP 3** + ScrollTrigger for timelines, pinning, and scrub.
- **Lenis** for smooth scrolling, synced with ScrollTrigger.
- **Astro View Transitions** (`<ClientRouter />`) with a GSAP curtain for page changes. Scripts re-initialise on `astro:page-load`.
- **sharp** for image processing at build time.
- No UI framework. Components are `.astro` files with small TypeScript modules.

## 11. Deployment

1. Push the repo to GitHub (`main`).
2. Import it into Vercel. The framework preset (Astro) is auto-detected. Build is `npm run build` and output is `dist/`.
3. Every push to `main` deploys to production. Pull requests get preview URLs.
4. Repo size target: under 80 MB. No single file is over 50 MB.

## 12. Acceptance criteria

- All five routes build and render with no console errors.
- Graphics shows 8 plates and VisCom shows 9. Each opens a detail panel with the correct code, title, quote, and description.
- TOA shows 3 decks (9 / 6 / 5 slides) that page in order, plus 2 videos that play with sound in Chrome, Edge, Safari, and Firefox.
- The landing page shows the name, tagline, and portrait. The preloader runs once per session.
- History is listed as in progress everywhere it appears.
- With reduced motion on, every item is still viewable.
- No horizontal overflow at 360 px. Decks support touch swipe.
- The Vercel deployment serves every route and both videos.
