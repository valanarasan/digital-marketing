import { gsap } from '../gsap';
import type { MotionScene } from '../types';

/** Impressions, followers, traffic — struck through one after another, then the payoff rises. */
export const statementScene: MotionScene = (root) => {
  const q = gsap.utils.selector(root);

  gsap.from(q('[data-anim="strike"]'), {
    scaleX: 0,
    transformOrigin: 'left center',
    ease: 'none',
    stagger: 0.4,
    scrollTrigger: { trigger: root, start: 'top 75%', end: 'top 30%', scrub: 0.35 },
  });

  gsap.from(q('[data-anim="payoff"]'), {
    y: 32,
    opacity: 0,
    ease: 'none',
    scrollTrigger: { trigger: root, start: 'top 80%', end: 'top 45%', scrub: 0.35 },
  });
};
