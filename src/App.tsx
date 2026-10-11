import { useLayoutEffect } from 'react';
import type { ReactNode } from 'react';
import { SkipLink, SmoothScroll } from '@/components/layout';
import { MAIN_CONTENT_ID } from '@/pages/ids';

export interface AppProps {
  /** The page to show. Every page shares this shell. */
  children: ReactNode;
}

export function App({ children }: AppProps) {
  // Runs after every child's layout effect, i.e. once the motion scenes have set their start poses.
  useLayoutEffect(() => {
    document.getElementById('root')?.removeAttribute('data-prerendered');
  }, []);

  return (
    <SmoothScroll>
      <SkipLink target={MAIN_CONTENT_ID} />
      {children}
    </SmoothScroll>
  );
}
