import { gsap } from '../gsap';
import type { MotionScene } from '../types';

/**
 * The heading rises word by word; the lever list arrives as a staircase (lower
 * rows lag behind and further right until they scroll into place); the gold
 * curve grows out of the corner.
 */
export const servicesScene: MotionScene = (root) => {
  const q = gsap.utils.selector(root);
  const [heading] = q('[data-anim="heading"]');

  gsap.from(q('[data-anim="word"]'), {
    yPercent: 110,
    opacity: 0,
    duration: 0.9,
    stagger: 0.08,
    ease: 'power3.out',
    scrollTrigger: { trigger: heading, start: 'top 85%', toggleActions: 'play none none reverse' },
  });

  gsap.matchMedia().add('(min-width: 901px)', () => {
    q('[data-anim="stair"]').forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0.22, xPercent: 22 },
        {
          opacity: 1,
          xPercent: 0,
          ease: 'none',
          scrollTrigger: { trigger: item, start: 'top bottom', end: 'top 58%', scrub: 0.35 },
        },
      );
    });
  });

  gsap.fromTo(
    q('[data-anim="curve"]'),
    { strokeDashoffset: 1, opacity: 0 },
    {
      strokeDashoffset: 0,
      opacity: 1,
      ease: 'none',
      scrollTrigger: { trigger: root, start: 'top 70%', end: 'bottom 85%', scrub: true },
    },
  );
};
