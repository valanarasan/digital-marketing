import { gsap } from '../gsap';
import type { MotionScene } from '../types';

/**
 * Hero intro, once on load: the masthead rule draws, the lotus watermark traces
 * itself, the two lead lines rise out of their masks, "It creates momentum."
 * wipes in like ink, then the underline draws and the base columns settle.
 * The one-off glitch on "noise." (timed to land as the second line finishes
 * rising) and the light travelling along the underline live in CSS.
 */
export const heroScene: MotionScene = (root) => {
  const q = gsap.utils.selector(root);

  gsap
    .timeline({ defaults: { ease: 'power3.out' } })
    .from(
      q('[data-anim="rule"]'),
      {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.2,
        ease: 'power2.inOut',
      },
      0.1,
    )
    .from(q('[data-anim="mast"]'), { y: 14, opacity: 0, duration: 0.8, stagger: 0.08 }, 0.15)
    .fromTo(
      q('[data-anim="watermark"] path'),
      { strokeDashoffset: 1 },
      { strokeDashoffset: 0, duration: 3, ease: 'power2.inOut', stagger: 0.12 },
      0.3,
    )
    .from(q('[data-anim="line"]'), { yPercent: 110, opacity: 0, duration: 1, stagger: 0.15 }, 0.25)
    .fromTo(
      q('[data-anim="payoff"]'),
      { clipPath: 'inset(0% 100% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'power2.inOut' },
      0.75,
    )
    .fromTo(
      q('[data-anim="swoosh"]'),
      { strokeDashoffset: 1 },
      { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut' },
      1.5,
    )
    .from(q('[data-anim="base"]'), { y: 28, opacity: 0, duration: 0.8, stagger: 0.1 }, 1.2);
};
