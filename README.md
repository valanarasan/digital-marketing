# Hiranmaye Digital — site v2

The Hiranmaye Digital site: the approved **Editorial hero** and **Midnight Gold** sections,
with the copy from `final_website_content.pdf`. Three pages, each with its own URL:

| Page | URL | What's on it |
| --- | --- | --- |
| Home | `/` | hero and growth check, trust strip, clients, who we are, statement, services, process, why us |
| Inside Hiranmaye | `/inside-hiranmaye/` | who we are, our story, quote, vision & mission, team and board, clients & partners |
| Solutions | `/solutions/` | all thirteen solutions, indexed under the title |

Every page ends with the same footer (contact, About us, map, socials). A fresh repo, separate
from the first site in `../Site`.

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
  sections/     one folder per section, each with its own CSS module
  motion/       GSAP setup (gsap.ts) and the scenes (scenes/)
  hooks/        useMotion, useReducedMotion, useSingleSelect, useStickyOffset
  pages/        HomePage, AboutPage, SolutionsPage — compose content and sections
  main.tsx      home page entry; entries/ holds the other pages' entries
  mount.tsx     the shell every page shares: fonts, global styles, smooth scroll, skip link
index.html, inside-hiranmaye/index.html, solutions/index.html   one HTML file per page
```

Links in the content files are written relative to the deploy base (`solutions/`, `''` for
home) and resolved with `resolveHref`, so they work on `localhost`, on GitHub Pages under
`/<repo>/`, and on a custom domain.

Design rules the code follows:

- **Content is data.** Components receive copy through props typed in `src/types`; nothing is
  hard-coded in JSX. `src/content/home.ts`, `about.ts`, `solutions.ts`, `clients.ts` and
  `business.ts` hold every word on the site.
- **Styling and motion are separate.** Every component has its own `.module.css`; motion scenes
  find their targets through `data-anim` attributes, never class names.
- **Components depend on abstractions.** Sections call `useMotion(ref, scene)`; only
  `src/motion/gsap.ts` knows about GSAP and Lenis, so tests mock one module.
- **Client logos are the clients' own files.** `public/clients/` holds them byte for byte (only
  renamed); never recompress, recolour or crop them. Each tile is painted the colour the logo
  was drawn on (`tile` in `src/content/clients.ts`) so the file's edge never shows.
- **Reduced motion is respected everywhere.** With `prefers-reduced-motion: reduce`, no scene
  runs, Lenis stays off and CSS loops stop; the static layout is the real one.

## Motion map

| Section | Motion |
| --- | --- |
| Hero | masthead rule draws, lotus watermark traces, headline rises, "momentum" wipes in, underline draws with a travelling light; "noise." glitches once, then rests slightly out of line (CSS) |
| Hero (wide screens) | stays pinned while the next sections slide over it (`useStickyOffset`) |
| Trust strip | two marquees loop (CSS) and drift with the scroll |
| Clients | heading and lead rise in; the logo tiles follow one after another |
| Who we are | statement lights up word by word; lotus draws itself on a loop (CSS) |
| Statement | impressions / followers / traffic struck through in turn |
| Services | heading rises; levers arrive as a staircase; gold curve grows |
| Process | section turns from sand to night; illustrations scale up and clip in |
| Why us, Story, Vision & Mission, Team, Solutions | each block rises in once as it scrolls into view |
| Inner-page title band | lotus watermark traces itself; kicker, title and index rise in on load |
| Footer | wordmark rises letter by letter |

The growth check in the hero is wired to the services accordion: picking a problem opens the
lever that answers it.

## Deploy (GitHub Pages)

`.github/workflows/deploy.yml` runs on every push to `main`: typecheck, lint and the coverage
gate, then a build with `VITE_BASE=/<repo>/`, and publishes `dist/`. Set the repo variable
`VITE_BASE` to `/` once a custom domain is attached. In the repo settings, Pages → Source:
**GitHub Actions**.

## Before launch

- Confirm the LinkedIn and Facebook URLs in `src/content/business.ts` (inferred from the handles).
- Privacy Policy and Terms links in the footer point to `#` until those pages exist.
- Resources & Insights is in the content brief's menu but has no content yet, so it is not in
  the menu; add it to `navItems` in `src/content/home.ts` once the page exists.
- Team: photos (initials stand in for now), bios for Harshitha Girish, Saji Philip and Veena
  Prasad, and roles for Praveena Pradeep and Harshitha Girish are still to come.
- Content Marketing has no outcome line in the brief yet.
