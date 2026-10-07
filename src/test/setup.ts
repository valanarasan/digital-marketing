import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

/**
 * GSAP and Lenis need real layout, which jsdom does not have. The motion layer
 * is mocked for every test: components are asserted on what they render and on
 * which scene they ask for, and the scenes themselves are checked in a browser.
 */
vi.mock('@/motion/gsap', () => ({
  gsap: {},
  ScrollTrigger: {},
  runScene: vi.fn(() => () => {}),
  startSmoothScroll: vi.fn(() => () => {}),
}));

class MockResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

vi.stubGlobal('ResizeObserver', MockResizeObserver);

/**
 * matchMedia defaults to "no match" — the motion-allowed case. Tests needing
 * the other side call this with `true`.
 */
export function setMatchMedia(matches: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
}

setMatchMedia(false);

afterEach(() => {
  cleanup();
  setMatchMedia(false);
});
