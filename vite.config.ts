import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import type { Plugin } from 'vite';
import { business } from './src/content/business.ts';

/**
 * The config runs in Node, but the project deliberately ships no @types/node —
 * it is a browser app, and those types would leak `process` into src/. This
 * reads the one variable the config needs without them.
 */
const nodeEnv =
  (globalThis as { process?: { env: Record<string, string | undefined> } }).process?.env ?? {};

/** One HTML entry per page, so each has a real URL: /, /inside-hiranmaye/, /solutions/. */
const page = (path: string) => decodeURIComponent(new URL(path, import.meta.url).pathname);

/**
 * Where the site is published. Canonical links, social previews, the sitemap and the structured
 * data all need absolute URLs; set VITE_SITE_URL once a custom domain is attached.
 */
const siteUrl = (nodeEnv.VITE_SITE_URL || 'https://hiranmayedigital.com').replace(/\/$/, '');

const pagePaths = [
  '',
  'inside-hiranmaye/',
  'solutions/',
  'privacy-policy/',
  'terms-and-conditions/',
];

/** The studio as a local business, from the same details the footer shows. */
const businessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: business.name,
  description:
    'Digital marketing agency in Bengaluru: strategy, creative, AI-enabled systems and performance marketing.',
  url: `${siteUrl}/`,
  logo: `${siteUrl}/apple-touch-icon.png`,
  image: `${siteUrl}/og-image.png`,
  email: business.email,
  telephone: [`+${business.phoneDigits}`, `+${business.phoneSecondaryDigits}`],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1053, 30th Main Road, Siddanna Layout, Banashankari 2nd Stage',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    postalCode: '560070',
    addressCountry: 'IN',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 12.928747, longitude: 77.560024 },
  hasMap: business.office.mapsUrl,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:30',
      closes: '18:30',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '10:00',
      closes: '17:00',
    },
  ],
  sameAs: business.socials.map((social) => social.href),
};

/** Search-engine plumbing: absolute URLs in the page heads, structured data, robots.txt, sitemap.xml. */
function seo(): Plugin {
  return {
    name: 'seo',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const tags =
          ctx.path === '/index.html'
            ? [
                {
                  tag: 'script',
                  attrs: { type: 'application/ld+json' },
                  children: JSON.stringify(businessJsonLd),
                  injectTo: 'head' as const,
                },
              ]
            : [];
        return { html: html.replaceAll('__SITE_URL__', siteUrl), tags };
      },
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      });
      const urls = pagePaths.map((path) => `  <url><loc>${siteUrl}/${path}</loc></url>`).join('\n');
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
    },
  };
}

const base = nodeEnv.VITE_BASE ?? '/';

/**
 * Preloads the two fonts every page needs above the fold (the body face and the italic serif), so
 * text does not wait for the CSS to discover them. The files are fingerprinted, so their URLs come
 * from the finished bundle.
 */
function fontPreload(): Plugin {
  return {
    name: 'font-preload',
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        if (!ctx.bundle) return [];
        return Object.keys(ctx.bundle)
          .filter((name) =>
            /(geist-latin-wght-normal|playfair-display-latin-500-italic).*\.woff2$/.test(name),
          )
          .map((name) => ({
            tag: 'link',
            attrs: {
              rel: 'preload',
              as: 'font',
              type: 'font/woff2',
              crossorigin: '',
              href: `${base}${name}`,
            },
            injectTo: 'head-prepend' as const,
          }));
      },
    },
  };
}

export default defineConfig({
  // GitHub Pages serves a project site from /<repo>/, a custom domain from /.
  // The deploy workflow sets VITE_BASE; local dev and custom domains use the root.
  base,
  plugins: [react(), seo(), fontPreload()],
  // Resolves the "@/…" alias from tsconfig.json.
  resolve: { tsconfigPaths: true },
  css: { devSourcemap: true },
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    // Every browser that can run the site supports modulepreload natively.
    modulePreload: { polyfill: false },
    rolldownOptions: {
      output: {
        // Libraries change far less often than the site, so they get their own files: a redeploy
        // leaves them in the visitor's cache, and the browser fetches them in parallel.
        codeSplitting: {
          groups: [
            { name: 'react', test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/ },
            { name: 'motion', test: /node_modules[\\/]gsap[\\/]/ },
          ],
        },
      },
      input: {
        home: page('./index.html'),
        'inside-hiranmaye': page('./inside-hiranmaye/index.html'),
        solutions: page('./solutions/index.html'),
        'privacy-policy': page('./privacy-policy/index.html'),
        'terms-and-conditions': page('./terms-and-conditions/index.html'),
      },
    },
  },
});
