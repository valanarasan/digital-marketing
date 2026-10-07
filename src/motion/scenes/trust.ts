import { gsap } from '../gsap';
import type { MotionScene } from '../types';

/**
 * The marquees loop on their own (CSS). On top of that each row drifts with the
 * scroll — the big row left, the sector row right — so the band feels pushed
 * by the page rather than running beside it.
 */
export const trustScene: MotionScene = (root) => {
  const rows = gsap.utils.toArray<HTMLElement>('[data-anim="drift"]', root);

  rows.forEach((row, index) => {
    const leftward = index % 2 === 0;
    gsap.fromTo(
      row,
      { xPercent: leftward ? 4 : -12 },
      {
        xPercent: leftward ? -14 : 2,
        ease: 'none',
        scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });
};
