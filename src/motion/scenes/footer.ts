import { gsap } from '../gsap';
import type { MotionScene } from '../types';

/** The full logo rises into place as the page runs out. */
export const footerScene: MotionScene = (root) => {
  const q = gsap.utils.selector(root);
  const [brand] = q('[data-anim="brand"]');

  gsap.from(q('[data-anim="brand"] img'), {
    yPercent: 24,
    opacity: 0,
    ease: 'none',
    scrollTrigger: { trigger: brand, start: 'top bottom', end: 'center bottom', scrub: 0.35 },
  });
};
