import { gsap } from '../gsap';
import type { MotionScene } from '../types';

/** The heading and lead rise in, then the client tiles follow one after another. */
export const clientsScene: MotionScene = (root) => {
  const q = gsap.utils.selector(root);

  gsap.from(q('[data-anim="head"] > *'), {
    y: 28,
    opacity: 0,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.1,
    scrollTrigger: { trigger: root, start: 'top 78%' },
  });

  gsap.from(q('[data-anim="client"]'), {
    y: 40,
    opacity: 0,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.08,
    scrollTrigger: { trigger: q('[data-anim="grid"]')[0], start: 'top 85%' },
  });
};
