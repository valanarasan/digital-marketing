import { renderToString } from 'react-dom/server';
import { App } from './App';
import { AboutPage } from './pages/AboutPage';
import { HomePage } from './pages/HomePage';
import { SolutionsPage } from './pages/SolutionsPage';

/**
 * Build-time entry: the static HTML each page ships with, so crawlers, link previews and
 * no-JS visitors get the real content. The client app (`mount.tsx`) replaces it on load.
 */
export const pages = {
  '': <HomePage />,
  'inside-hiranmaye': <AboutPage />,
  solutions: <SolutionsPage />,
};

export function renderPage(path: keyof typeof pages): string {
  return renderToString(<App>{pages[path]}</App>);
}
