# Alexandra Andaya — Architecture Portfolio

> From the first stroke to endless possibilities, a journey of creativity, precision, and discovery.

A personal portfolio of first-year academic work by **Alexandra Ysabelle S. Andaya**, BS Architecture (ARIDBE · Section A59), Mapúa University.

The site is designed as a drawing set translated to the web. It uses a black and white sheet, very large light type, plate codes as typography, a CAD-style cursor, and a drawing title block as the footer. The only accent is a warm auburn taken from the portrait, and it appears only on interaction.

## Contents

| Route | Subject | Work |
|---|---|---|
| `/` | Landing | Name, tagline, portrait, subject index |
| `/graphics` | Graphics | 8 plates: EX100, PL100–PL600, MP100 |
| `/visual-communication` | Visual Communication | 9 plates: DP100, PL100–PL700, Major Plate |
| `/theory-of-architecture` | Theory of Architecture | 3 slide series (Anthropometry, Poster Report, Proxemics) + 2 videos (P1.1, P1.2) |
| `/history-of-architecture` | History of Architecture | In progress |

Click any plate to open its code, title, quote, and description. Slide series open as connected decks, not as single images.

## Stack

- [Astro 5](https://astro.build): static output, TypeScript strict, built-in image optimisation (AVIF/WebP).
- [GSAP](https://gsap.com) + ScrollTrigger: reveals, pinning, horizontal gallery.
- [Lenis](https://lenis.darkroom.engineering): smooth scrolling.
- Archivo Variable and JetBrains Mono, self-hosted with Fontsource.

There is no UI framework and no backend.

## Getting started

Requires Node 20.3 or later.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # type-check + static build into dist/
npm run preview   # serve the production build
```

## Project structure

```
src/
  assets/            portrait + all plates and slides (optimised at build)
  components/        Nav, Cursor, Preloader, Hero, SubjectIndex, Marquee,
                     HorizontalGallery, PlateLightbox, SeriesDeck, VideoFeature, TitleBlock…
  data/
    site.ts          name, tagline, program details, navigation
    categories.ts    every category, plate, series and video with its copy
  layouts/Base.astro shared shell (fonts, meta, smooth scroll, page transitions)
  pages/             one file per route
  scripts/           client-side behaviour (motion, gallery, lightbox, decks, video)
  styles/global.css  design tokens and base styles
public/video/        encoded TOA videos + poster frames
scripts/encode-videos.sh   ffmpeg commands used to produce public/video
```

## Adding or editing work

All copy and images are defined in `src/data/categories.ts`. Components never need to change.

**Add a plate**

1. Put the image in `src/assets/work/<category>/`, for example `10-pl800-new-plate.jpg`. Use no spaces in the name.
2. Import it at the top of `categories.ts` and add an entry to that category's `plates` array (`slug`, `code`, `title`, `quote`, `description`, `image`).

**Publish History of Architecture**

Set the category's `status` to `'published'` and give it a `plates` array. The landing index, nav, and page update automatically.

**Add a slide series**

Put the slides in `src/assets/work/toa/<series>/01.jpg, 02.jpg…` and add a `series` entry that lists them in order.

**Add a video**

Add an `encode` line to `scripts/encode-videos.sh`, run `bash scripts/encode-videos.sh`, and add a `videos` entry.

## Videos

The original TOA videos are too large for GitHub (202 MB) or don't play in Chrome (HEVC `.mov`). `scripts/encode-videos.sh` re-encodes them to H.264 MP4 at 720 × 1280 (both are vertical) with `faststart`, and extracts a poster frame:

| File | Size |
|---|---|
| `p1-1-paper-folding.mp4` | 15 MB |
| `p1-2-planes.mp4` | 26 MB |

Install ffmpeg on Windows with `winget install --id Gyan.FFmpeg -e --source winget`.

## Source folders (not committed)

`projects/`, `resources/`, and `template/` hold the raw originals, the details PDF, and design references. They are git-ignored. The site uses only the copies in `src/assets` and `public/video`.

## Deployment (Vercel)

1. Push this repository to GitHub.
2. In Vercel, select **Add New → Project** and import the repository. The Astro preset is detected automatically. The build command is `npm run build` and the output directory is `dist`.
3. Every push to `main` deploys to production. Pull requests get preview URLs.

## To review

- **DP100 — Still Life Drawing** has no entry in `details.pdf`, so its quote and description were drafted. Edit them in `src/data/categories.ts` if needed.
- Not yet included: P2.1 Anthropod (HEIC photos), Human Figure, and the other TOA activities listed in the PDF. See the "Later" section in `tasks.md`.

## Docs

- [`spec.md`](spec.md): full specification (design system, page behaviour, accessibility, performance).
- [`tasks.md`](tasks.md): phased build checklist.

---

© 2026 Alexandra Ysabelle S. Andaya. All drawings and plates are the author's academic work.
