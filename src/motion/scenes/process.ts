import { gsap } from '../gsap';
import type { MotionScene } from '../types';

/**
 * The section turns from sand to night as it arrives (its palette is a set of
 * custom properties, so every child follows), the orbit lines sweep in, and
 * each step's illustration scales up out of its card.
 */
export const processScene: MotionScene = (root) => {
  const q = gsap.utils.selector(root);

  gsap.to(root, {
    '--bg': '#070d18',
    '--fg': '#ffffff',
    '--line': 'rgba(255, 255, 255, 0.12)',
    '--muted': 'rgba(255, 255, 255, 0.74)',
    '--acc': '#e2b04a',
    '--tile': '#101c31',
    ease: 'none',
    scrollTrigger: { trigger: root, start: 'top 70%', end: 'top 30%', scrub: true },
  });

  q('[data-anim="orbit"]').forEach((orbit, index) => {
    gsap.from(orbit, {
      opacity: 0,
      scaleX: 0.15,
      filter: 'blur(14px)',
      ease: 'none',
      scrollTrigger: {
        trigger: root,
        start: `top ${92 - index * 8}%`,
        end: 'top 40%',
        scrub: true,
      },
    });
  });

  q('[data-anim="media"]').forEach((media) => {
    gsap.from(media, {
      scale: 0.6,
      ease: 'none',
      scrollTrigger: { trigger: media, start: 'top 98%', end: 'top 45%', scrub: 0.1 },
    });
  });

  q('[data-anim="icon"]').forEach((icon) => {
    gsap.fromTo(
      icon,
      { clipPath: 'inset(100% 0% 0% 0%)', y: 18 },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        y: 0,
        ease: 'none',
        scrollTrigger: { trigger: icon, start: 'top 92%', end: 'top 60%', scrub: 0.35 },
      },
    );
  });
};
