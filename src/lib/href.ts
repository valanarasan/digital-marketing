/**
 * Resolves a link from the content files. Page paths are written relative to the
 * deploy base ("" is home, "solutions/" a page) because the site is served from
 * /<repo>/ on GitHub Pages and from / on a custom domain. In-page anchors and
 * absolute URLs (https:, mailto:, tel:) pass through untouched.
 */
export function resolveHref(href: string, base: string = import.meta.env.BASE_URL): string {
  if (/^(#|[a-z][a-z0-9+.-]*:)/i.test(href)) return href;
  return `${base}${href.replace(/^\//, '')}`;
}
