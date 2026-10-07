import { gsap } from '../gsap';
import type { MotionScene } from '../types';

/** Inner-page title band, once on load: the logo's lotus fades up and the copy rises in. */
export const pageHeroScene: MotionScene = (root) => {
  const q = gsap.utils.selector(root);

  gsap
    .timeline({ defaults: { ease: 'power3.out' } })
    .fromTo(
      q('[data-anim="watermark"] img'),
      { opacity: 0, scale: 0.94 },
      { opacity: 1, scale: 1, duration: 2.4, ease: 'power2.out' },
      0.1,
    )
    .from(q('[data-anim="hero-item"]'), { y: 32, opacity: 0, duration: 0.9, stagger: 0.1 }, 0.15);
};
