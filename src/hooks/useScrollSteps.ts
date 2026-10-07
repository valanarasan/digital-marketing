import { useCallback, useEffectEvent, useLayoutEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { createScrollSteps } from '@/motion/gsap';
import type { ScrollSteps } from '@/motion/gsap';

/**
 * Lets scroll position pick the current item of a list: as the list passes the
 * reading line, `onStep` is called with each item's index in turn. Returns a
 * function that glides the page to a given item. Behaviour, not decoration, so
 * it runs with reduced motion too (the glide is then instant).
 */
export function useScrollSteps<T extends HTMLElement>(
  ref: RefObject<T | null>,
  count: number,
  onStep: (index: number) => void,
): (index: number) => void {
  const steps = useRef<ScrollSteps | null>(null);
  const handleStep = useEffectEvent(onStep);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const created = createScrollSteps(element, count, (index) => handleStep(index));
    steps.current = created;
    return () => {
      created.destroy();
      steps.current = null;
    };
  }, [ref, count]);

  return useCallback((index: number) => steps.current?.scrollToStep(index), []);
}
