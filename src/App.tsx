import type { ReactNode } from 'react';
import { SkipLink, SmoothScroll } from '@/components/layout';
import { MAIN_CONTENT_ID } from '@/pages/ids';

export interface AppProps {
  /** The page to show. Every page shares this shell. */
  children: ReactNode;
}

export function App({ children }: AppProps) {
  return (
    <SmoothScroll>
      <SkipLink target={MAIN_CONTENT_ID} />
      {children}
    </SmoothScroll>
  );
}
