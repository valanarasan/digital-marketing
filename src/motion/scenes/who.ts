import { gsap } from '../gsap';
import type { MotionScene } from '../types';

/** The statement lights up word by word as it scrolls through; the body copy follows. */
export const whoScene: MotionScene = (root) => {
  const q = gsap.utils.selector(root);
  const [statement] = q('[data-anim="statement"]');

  gsap.fromTo(
    q('[data-anim="word"]'),
    { opacity: 0.12, yPercent: 35 },
    {
      opacity: 1,
      yPercent: 0,
      ease: 'none',
      stagger: 0.05,
      scrollTrigger: { trigger: statement, start: 'top 85%', end: 'top 35%', scrub: 0.35 },
    },
  );

  q('[data-anim="fade"]').forEach((block) => {
    gsap.from(block, {
      y: 32,
      opacity: 0,
      ease: 'none',
      scrollTrigger: { trigger: block, start: 'top 95%', end: 'top 70%', scrub: 0.35 },
    });
  });
};
