import { useLayoutEffect } from 'react';
import type { RefObject } from 'react';
import { runScene } from '@/motion/gsap';
import type { MotionScene } from '@/motion/types';
import { useReducedMotion } from './useReducedMotion';

/**
 * Runs a motion scene against a section's root element. Components depend on
 * the scene abstraction, not on GSAP; the scene is skipped entirely for users
 * who prefer reduced motion, so the static layout is always the true one.
 */
export function useMotion<T extends HTMLElement>(
  ref: RefObject<T | null>,
  scene: MotionScene,
): void {
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || reducedMotion) return;
    return runScene(root, scene);
  }, [ref, scene, reducedMotion]);
}
