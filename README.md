# Hiranmaye Digital — site v2

The launch home page for Hiranmaye Digital: the approved **Editorial hero** followed by the
**Midnight Gold** sections (trust strip, who we are, statement, services, process, footer).
A fresh repo, separate from the first site in `../Site`.

## Run it

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # typecheck → tests → production build in dist/
npm run preview      # serve dist/
```

Node 22 (see `.nvmrc`).

| Script | What it does |
| --- | --- |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint (TypeScript + React hooks rules) |
| `npm test` | Vitest, once |
| `npm run test:coverage` | Vitest with the 100% coverage gate |
| `npm run format` | Prettier over `src/` |

## Stack

Vite + React 19 + TypeScript · CSS Modules on design tokens · GSAP + ScrollTrigger for
scroll motion · Lenis smooth scrolling · Vitest + Testing Library · self-hosted Geist and
Playfair Display via Fontsource.

## Structure

```
src/
  content/      all copy and business details (single source of truth)
  types/        content shapes the components depend on
  styles/       tokens.css (palette, type, rhythm), reset, global
  components/
    ui/         small reusable pieces: Accordion, Marquee, ButtonLink, LotusMark…
    layout/     Header, Footer, SkipLink, SmoothScroll
  sections/     one folder per home-page section, each with its own CSS module
  motion/       GSAP setup (gsap.ts) and one scene per section (scenes/)
  hooks/        useMotion, useReducedMotion, useSingleSelect, useStickyOffset
  pages/        HomePage — composes content and sections, owns the shared state
```

Design rules the code follows:

- **Content is data.** Components receive copy through props typed in `src/types`; nothing is
  hard-coded in JSX. Editing `src/content/home.ts` changes the page.
- **Styling and motion are separate.** Every component has its own `.module.css`; motion scenes
  find their targets through `data-anim` attributes, never class names.
- **Components depend on abstractions.** Sections call `useMotion(ref, scene)`; only
  `src/motion/gsap.ts` knows about GSAP and Lenis, so tests mock one module.
- **Reduced motion is respected everywhere.** With `prefers-reduced-motion: reduce`, no scene
  runs, Lenis stays off and CSS loops stop; the static layout is the real one.

## Motion map

| Section | Motion |
| --- | --- |
| Hero | masthead rule draws, lotus watermark traces, headline rises, "momentum" wipes in, underline draws with a travelling light; "noise." jitters (CSS) |
| Hero (wide screens) | stays pinned while the next sections slide over it (`useStickyOffset`) |
| Trust strip | two marquees loop (CSS) and drift with the scroll |
| Who we are | statement lights up word by word; lotus draws itself on a loop (CSS) |
| Statement | impressions / followers / traffic struck through in turn |
| Services | heading rises; levers arrive as a staircase; gold curve grows |
| Process | section turns from sand to night; illustrations scale up and clip in |
| Footer | wordmark rises letter by letter |

The growth check in the hero is wired to the services accordion: picking a problem opens the
lever that answers it.

## Deploy (GitHub Pages)

The workflow is in `docs/github-pages-deploy.yml`. Move it into place once:

```bash
mkdir -p .github/workflows && git mv docs/github-pages-deploy.yml .github/workflows/deploy.yml
```

It runs typecheck, lint and the coverage gate, builds with `VITE_BASE=/<repo>/`, and
publishes `dist/`. Set the repo variable `VITE_BASE` to `/` once a
custom domain is attached. In the repo settings, Pages → Source: **GitHub Actions**.

## Before launch

- Confirm the LinkedIn and Facebook URLs in `src/content/business.ts` (inferred from the handles).
- Privacy Policy and Terms links in the footer point to `#` until those pages exist.
- Only the home page exists so far; the nav links scroll to its sections.
