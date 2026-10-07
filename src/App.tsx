import { SkipLink, SmoothScroll } from '@/components/layout';
import { HomePage, MAIN_CONTENT_ID } from '@/pages/HomePage';

export function App() {
  return (
    <SmoothScroll>
      <SkipLink target={MAIN_CONTENT_ID} />
      <HomePage />
    </SmoothScroll>
  );
}
