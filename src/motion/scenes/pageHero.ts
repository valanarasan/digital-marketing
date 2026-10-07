import { gsap } from '../gsap';
import type { MotionScene } from '../types';

/** Inner-page title band, once on load: the lotus watermark traces itself and the copy rises in. */
export const pageHeroScene: MotionScene = (root) => {
  const q = gsap.utils.selector(root);

  gsap
    .timeline({ defaults: { ease: 'power3.out' } })
    .fromTo(
      q('[data-anim="watermark"] path'),
      { strokeDashoffset: 1 },
      { strokeDashoffset: 0, duration: 2.6, ease: 'power2.inOut', stagger: 0.12 },
      0.1,
    )
    .from(q('[data-anim="hero-item"]'), { y: 32, opacity: 0, duration: 0.9, stagger: 0.1 }, 0.15);
};
