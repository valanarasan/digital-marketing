# Hiranmaye Digital site — technical documentation

For developers who build, change or deploy the site. For a non-technical overview, see
[SITE-OVERVIEW.md](SITE-OVERVIEW.md). The [README](../README.md) has the design rules and the
motion map.

## 1. What it is

A static marketing site: five pages, each its own HTML file with a real URL, built with Vite,
React 19 and TypeScript. There is no backend, database or CMS. Everything on the site is data in
`src/content/`, and the output is a folder of static files (`dist/`) that any web host can serve.

| Page | Path | Entry | Component |
| --- | --- | --- | --- |
| Home | `/` | `src/main.tsx` | `src/pages/HomePage.tsx` |
| Inside Hiranmaye | `/inside-hiranmaye/` | `src/entries/inside-hiranmaye.tsx` | `AboutPage.tsx` |
| Solutions | `/solutions/` | `src/entries/solutions.tsx` | `SolutionsPage.tsx` |
| Privacy Policy | `/privacy-policy/` | `src/entries/privacy-policy.tsx` | `PrivacyPage.tsx` |
| Terms & Conditions | `/terms-and-conditions/` | `src/entries/terms-and-conditions.tsx` | `TermsPage.tsx` |

## 2. Stack

| Concern | Choice |
| --- | --- |
| Build | Vite 8 (multi-page, Rolldown) |
| UI | React 19, TypeScript 5.9 |
| Styling | CSS Modules on design tokens (`src/styles/tokens.css`) |
| Motion | GSAP + ScrollTrigger, Lenis smooth scrolling |
| Fonts | Geist and Playfair Display, self-hosted through Fontsource (no Google Fonts request) |
| Tests | Vitest, Testing Library, jsdom |
| Lint / format | ESLint 10 (TypeScript, React hooks), Prettier |
| Node | 22 (`.nvmrc`) |

## 3. Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Typecheck, tests, then `build:site` |
| `npm run build:site` | Production build, prerender (see section 6) |
| `npm run preview` | Serve `dist/` locally |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm test` | Vitest once; `test:watch`, `test:coverage` also exist |
| `npm run format` | Prettier over `src/` |
| `npm run deploy` | Build and zip for manual upload (see section 9) |

## 4. Repository map

```
src/
  content/       every word and business detail (single source of truth)
  types/         the content shapes components depend on
  styles/        tokens.css (palette, type, rhythm), reset.css, global.css
  components/
    ui/          small reusable pieces: ButtonLink, ContactCta, Accordion, Marquee, SocialIcon…
    layout/      Header, Footer, SkipLink, SmoothScroll
  sections/      one folder per page section, each with its own CSS module
  motion/        gsap.ts (the only file that touches GSAP/Lenis) and scenes/
  hooks/         useMotion, useReducedMotion, useScrollSteps, useSingleSelect, useStickyOffset
  lib/           resolveHref, whatsappLink, cx, initials, levers helpers
  pages/         one composition root per page
  entries/       one entry per page except home (main.tsx)
  mount.tsx      the shell every page shares: fonts, global CSS, smooth scroll, skip link
  App.tsx        wraps each page: SmoothScroll + SkipLink; reveals the prerendered page
  prerender.tsx  build-time entry that renders each page to a string
public/          files served as-is: brand/, clients/, team/, favicon, og-image.png, humans.txt
brand/, photos/  source masters of the logo and team photos (not served)
scripts/         prerender.mjs, deploy.sh
deploy/          web.config for IIS hosting
.github/workflows/  deploy-pages.yml (GitHub Pages), deploy.yml (FTP to IIS host)
vite.config.ts   pages, base path, SEO plugin
```

Architecture rules the code follows:

- **Content is data.** Components get copy through typed props; nothing is hard-coded in JSX.
- **Styling and motion are separate.** Each component has a `.module.css`. Motion scenes find
  elements by `data-anim` attributes, never class names.
- **Components depend on abstractions.** Sections call `useMotion(ref, scene)`. Only
  `src/motion/gsap.ts` imports GSAP and Lenis, so tests mock one module (`src/test/setup.ts`).
- **Reduced motion wins.** With `prefers-reduced-motion: reduce` no scene runs and Lenis stays off.

## 5. Content and links

All copy lives in `src/content/`: `home.ts` (menu, hero, growth wheel, levers, process, footer),
`about.ts`, `solutions.ts`, `clients.ts`, `business.ts` (address, two phone numbers, email, socials, the
default enquiry message) and `legal.ts` (privacy policy and terms). Shapes are in
`src/types/content.ts`.

Links in content are written relative to the deploy base (`solutions/`, `''` for home) and
resolved by `resolveHref()` (`src/lib/href.ts`). That makes the same build work on `localhost`,
on GitHub Pages under `/<repo>/`, and on a custom domain. Anchors (`#contact`) and absolute URLs
pass through unchanged.

### Adding a page

1. Create `<name>/index.html` (copy an existing one: title, description, canonical, OG tags).
2. Create `src/entries/<name>.tsx` calling `mount(<YourPage />)` and `src/pages/YourPage.tsx`.
3. Add the page to `build.rolldownOptions.input` and `pagePaths` in `vite.config.ts`, and to
   `pages` in `src/prerender.tsx`.
4. Add its id to `PageId` in `src/types/content.ts`.

## 6. Build, prerender and SEO

`npm run build:site` runs three steps:

1. `vite build` — the client bundle in `dist/`.
2. `vite build --ssr src/prerender.tsx --outDir dist-ssr` — a Node bundle that renders each page.
3. `node scripts/prerender.mjs` — writes each page's server-rendered markup into
   `dist/**/index.html`, marked `<div id="root" data-prerendered>`.

Why: crawlers, link-preview bots and no-JS visitors get the real content. In the browser,
`createRoot` replaces the markup. Until then CSS hides `#root[data-prerendered]` (so entrance
animations never flash the finished layout), and `App` removes the attribute once the motion
scenes have set their start poses. A `<noscript>` rule keeps the page visible without JavaScript.

Component code that runs on render must not touch `window` or `document` unguarded, or the
prerender step fails.

The `seo` plugin in `vite.config.ts` also:

- replaces `__SITE_URL__` in every page head (canonical, `og:url`, `og:image`, Twitter tags),
- injects `ProfessionalService` JSON-LD on the home page, built from `business.ts`,
- emits `robots.txt` and `sitemap.xml`.

Each page's `<title>`, description and Open Graph text are written in that page's `index.html`.

### Performance

Total build output is about 1.8 MB (it was 4.3 MB before the work below).

- **Chunks** (`build.rolldownOptions.output.codeSplitting` in `vite.config.ts`): `react` (219 KB,
  68 KB gzipped), `motion` (GSAP and ScrollTrigger, 113 KB, 44 KB gzipped), and the site code
  (74 KB, 25 KB gzipped). Libraries rarely change, so a redeploy leaves them in the visitor's
  cache; only the site chunk is fetched again.
- **Lenis** (smooth scrolling) is loaded with a dynamic `import('lenis')` in `startSmoothScroll`
  (`src/motion/gsap.ts`), as its own 5 KB file after the page is up. Until it arrives, scrolling
  is the browser's own; if the component unmounts first, it is never started.
- **GSAP is not lazy-loaded.** The prerendered page stays hidden until the motion scenes have set
  their start poses, so deferring GSAP would not show the page sooner, and showing it earlier would
  flash the finished layout before the animations start.
- **Fonts:** the `fontPreload` plugin preloads the Geist and Playfair Display (italic) Latin
  woff2 files, whose fingerprinted names it reads from the bundle.
- **Images:** the three large client logos are WebP at 1200 px (800 px for the square one),
  about 110 KB together instead of 2.8 MB. The untouched PNG originals are in `photos/clients/`;
  make any new web copy from those. Below-the-fold images use `loading="lazy"` (client logos,
  team photos, the footer logo via `BrandLogo`'s `lazy` prop, the map iframe). React's prerender
  adds a preload for every non-lazy `<img>`, so an image far down the page should be lazy.
- **Server** (`deploy/web.config`): gzip for text, a one-year cache for the fingerprinted files in
  `/assets`, and a 30-day cache for `/brand`, `/clients` and `/team`. HTML is not cached, so a
  deploy shows straight away. IIS cannot serve pre-compressed Brotli without a module, so none is
  built. After changing `web.config`, check the site still loads: a rule the host locks gives a 500.
- The `vite.config.ts` import of `business.ts` uses the `.ts` extension, which Vite's native
  config loader requires.

## 7. Environment variables

| Variable | Used for | Default |
| --- | --- | --- |
| `VITE_BASE` | Base path the site is served from | `/` |
| `VITE_SITE_URL` | Public URL for canonical links, sitemap, structured data | `https://hiranmayedigital.com` |

Both are read at build time. For a custom domain set `VITE_BASE=/` and `VITE_SITE_URL` to the
domain (as repo variables; the workflows pass them through).

## 8. Key behaviours worth knowing

- **Growth wheel and services are independent.** Picking a problem on the wheel only changes
  the wheel. The services accordion follows scroll position (`createScrollSteps` in
  `src/motion/gsap.ts`) and clicking a lever opens it. The one bridge is the wheel's
  "Start with …" link, which glides to the matching lever (`ServicesHandle.showLever`).
- **Growth wheel motion** (`src/sections/GrowthCheck/`: `ProblemWheel.tsx`, geometry in
  `wheel.ts`). The wheel's turn is a CSS custom property (`--turn`) with a transition; the slice
  labels counter-rotate on the same curve so they stay upright. Three ways it moves
  (`WheelMotion`), each with its own duration in `ProblemWheel.module.css`:

  | Trigger | Motion | Rotation | Duration |
  | --- | --- | --- | --- |
  | Click a slice | `turn` | forward, never more than one rotation | 1.4 s |
  | Lotus "Spin the wheel" button | `spin` | at least one full turn, onto a different problem at random | 1.8 s |
  | Arrow keys / Home / End | `step` | the short way round | 0.6 s |

  The wheel is hidden until it scrolls into view, then spins in once: `growthScene` sets
  `data-intro` on it and the CSS runs the spin. With reduced motion the scene doesn't run and
  every turn is instant. Slices are a `radiogroup` of `radio`s (roving tab stop).
- **"Explore our capabilities"** glides to the first lever. Landing on the section's top edge
  would already be partway through the scroll steps and open a later lever.
- **Anchor scrolling** is timed (1.5 s, ease-in-out) through Lenis `anchors`
  (`ANCHOR_DURATION` in `src/motion/gsap.ts`). Section links add `#id` to the URL by design.
- **Contact popup** (`src/components/ui/ContactCta.tsx`): every "Let's talk growth" button
  (header, hero, process) opens a modal offering email, Instagram or WhatsApp. Email and WhatsApp
  are prefilled from `inquiry` in `business.ts`; Instagram cannot prefill, so the message is
  copied to the clipboard. A channel with no address in `business.ts` is left out. The button is
  still a link to `#contact` as a no-JS fallback. It stops the click reaching Lenis (otherwise the
  page scrolls behind the popup), traps Tab inside the dialog, focuses the dialog on open, and
  returns focus without scrolling.
- **Footer** `#contact` carries the contact details, map, socials and legal links. There is no
  visible designer credit (removed at the client's request, Oct 2026); the designer is named in
  `public/humans.txt` and the `author` meta tags only. The map is the Google Maps listing's own
  "Embed a map" URL (`business.office.embedUrl`), so it shows the business by name;
  `business.office.mapsUrl` is the "Open in Google Maps" share link.
- **Team** (`src/sections/Team/`, content `team` in `about.ts`): one "Leadership" group with the
  founder and the directors (`founder`, `directors`) as large feature cards, then the Advisors
  (`advisors`) as equal-height cards, four across on wide screens and two by two on tablets. Each
  card shows the name, role, a `focus` line and a short `summary` (about 45 words); "Read full
  profile" opens a modal dialog with the full `bio`, `credential`, `education`, `experience`,
  `tagline` and `linkedinUrl`. A long profile therefore never changes a card's height. The dialog
  uses the shared `useModal` hook (`src/hooks/useModal.ts`, also used by the contact popup) for
  focus, Escape, the Tab trap and focus return, and `data-lenis-prevent` so it scrolls natively.
  A `Person` may have a `photo` (`{ src, width, height }`, a file in `public/team/`); without one
  the card shows initials, and every field except `name` and `bio` is optional.
- **Team photos** are the client's own, upscaled 2× with EDSR where the original was small, and
  cropped to 4:5 (founder, 900 × 1125) or 5:4 (cards, 900 × 720) WebP. Masters and the method:
  `photos/team/README.md`.
- **Client logos** are the clients' own artwork, never recoloured or cropped. The three large
  PNGs are shipped as WebP (see Performance); the originals are in `photos/clients/`. KEJ is
  traced to `public/clients/kej.svg` because its file was too small to stay sharp (README).

## 9. Deployment

Production is **https://hiranmayedigital.com**, hosted on HostingRaja (IIS). Two workflows:

- **FTP to HostingRaja** (`.github/workflows/deploy.yml`): the production deploy, manual
  (`workflow_dispatch`). Typecheck, lint, tests, `npm run build:site` (site address defaults to
  `https://hiranmayedigital.com`, base `/`), adds `deploy/web.config`, then uploads over FTP.
  Needs the secrets `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`. `npm run deploy` makes a zip
  for manual upload.
- **GitHub Pages** (`.github/workflows/deploy-pages.yml`): an optional staging copy at
  `https://valanarasan.github.io/digital-marketing/`, run manually only (it no longer publishes on
  push, so there is no second public copy). It builds
  with `VITE_BASE=/<repo>/` and a `github.io` `VITE_SITE_URL`, so its canonical links point at the
  staging address. Repo setting: Pages → Source = GitHub Actions.

The production build serves `robots.txt` and `sitemap.xml` from the domain root. The GitHub Pages
staging copy is a project site (`/digital-marketing/`), so search engines ignore its `robots.txt`;
keep it for review, not as the public address.

## 10. Quality gates

- `npm test`: Vitest across `src/`; sections, pages, hooks, layout and lib are covered. GSAP and
  Lenis are mocked in `src/test/setup.ts` because jsdom has no layout.
- `npm run test:coverage` enforces 100% statements, branches, functions and lines
  (`vitest.config.ts`; each exclusion there has its reason in a comment). It passes. CI runs
  `npm test`, not the coverage gate, so run it yourself before pushing.
- ESLint and `tsc` must pass; CI runs both before every deploy.
- Accessibility: skip link, visible focus ring (`:focus-visible` in `global.css`), reduced-motion
  support, labelled landmarks. axe-core found no violations on the three main pages after the
  animations had played. Gold-on-sand text uses `--color-gold-deep` (4.9:1).

## 11. Common changes

| I want to… | Edit |
| --- | --- |
| Change copy | the matching file in `src/content/` |
| Change phone, email, address, socials | `src/content/business.ts` |
| Change the default enquiry message | `inquiry` in `business.ts` |
| Change colours or fonts | `src/styles/tokens.css` |
| Change anchor-scroll speed | `ANCHOR_DURATION` in `src/motion/gsap.ts` |
| Change the designer credit | `public/humans.txt` and the `author` meta tags (there is no visible credit; commit `4e711b1` shows how it was built) |
| Update the privacy policy or terms | `src/content/legal.ts` (and review the wording) |
| Change the share image | replace `public/og-image.png` (1200×630) |
| Add a client logo | file in `public/clients/`, entry in `src/content/clients.ts` |
| Add or change a team member, bio or role | `team` in `src/content/about.ts` |
| Add a team photo | prepare it as in `photos/team/README.md`, put it in `public/team/`, set `photo` on the person |
| Change the office map | `office.embedUrl` (Google Maps → Share → Embed a map) and `office.mapsUrl` in `business.ts` |
| Change the wheel's speed | `--spin-duration` per `data-motion` in `ProblemWheel.module.css` (`src/sections/GrowthCheck/`) |

## 12. Known gaps

- No contact form: every route ends at email, Instagram or WhatsApp. A form needs a form
  service (the site has no backend).
- No FAQ, testimonials or case studies yet.
- The Solutions page's per-solution "Let's talk growth" buttons still jump to the footer instead
  of opening the popup.
- LinkedIn and Facebook URLs in `business.ts` were inferred from the brand handles; confirm them.
- Resources & Insights is in the content brief but has no page; add it to `navItems` when it exists.
- Team: roles for Praveena Pradeep and Harshitha Girish are still to come.
- Privacy Policy and Terms are an unreviewed template; have them checked by a lawyer.
