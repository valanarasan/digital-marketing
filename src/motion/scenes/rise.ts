import { gsap } from '../gsap';
import type { MotionScene } from '../types';

/**
 * The quiet default for content sections: each `data-anim="rise"` block lifts
 * in as it scrolls into view, once.
 */
export const riseScene: MotionScene = (root) => {
  const q = gsap.utils.selector(root);

  q('[data-anim="rise"]').forEach((block) => {
    gsap.from(block, {
      y: 36,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: block, start: 'top 90%' },
    });
  });
};
