// Fills each built page's empty #root with its server-rendered markup (see src/prerender.tsx).
// Run after `vite build` and `vite build --ssr src/prerender.tsx --outDir dist-ssr`.
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const { pages, renderPage } = await import(pathToFileURL(join('dist-ssr', 'prerender.js')).href);

for (const path of Object.keys(pages)) {
  const file = join('dist', path, 'index.html');
  const html = await readFile(file, 'utf8');
  const marker = '<div id="root"></div>';
  if (!html.includes(marker)) throw new Error(`${file}: empty #root not found`);
  await writeFile(
    file,
    html.replace(marker, `<div id="root" data-prerendered>${renderPage(path)}</div>`),
  );
  console.log(`prerendered /${path}`);
}
