import { StrictMode } from 'react';
import type { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/geist';
import '@fontsource/playfair-display/500.css';
import '@fontsource/playfair-display/500-italic.css';
import './styles/global.css';
import { initAnalytics } from './lib/analytics';
import { App } from './App';

/** Renders one page into #root inside the shared shell: fonts, global styles, smooth scroll, skip link. */
export function mount(page: ReactNode) {
  initAnalytics();
  const root = document.getElementById('root');
  if (!root) throw new Error('Missing #root element');

  createRoot(root).render(
    <StrictMode>
      <App>{page}</App>
    </StrictMode>,
  );
}
