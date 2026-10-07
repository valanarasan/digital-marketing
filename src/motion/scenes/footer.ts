import { gsap } from '../gsap';
import type { MotionScene } from '../types';

/** The giant wordmark rises letter by letter as the page runs out. */
export const footerScene: MotionScene = (root) => {
  const q = gsap.utils.selector(root);
  const [wordmark] = q('[data-anim="wordmark"]');

  gsap.from(q('[data-anim="letter"]'), {
    yPercent: 100,
    ease: 'none',
    stagger: 0.06,
    scrollTrigger: { trigger: wordmark, start: 'top bottom', end: 'bottom bottom', scrub: 0.35 },
  });
};
