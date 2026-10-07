import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useReducedMotion } from '@/hooks';
import { startSmoothScroll } from '@/motion/gsap';

export interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * Smooth scrolling is a cross-cutting concern, so it lives in exactly one place
 * and is switched off wholesale for users who asked for less motion.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    return startSmoothScroll();
  }, [reducedMotion]);

  return <>{children}</>;
}
