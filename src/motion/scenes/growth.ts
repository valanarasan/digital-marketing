import { gsap, ScrollTrigger } from '../gsap';
import type { MotionScene } from '../types';

/**
 * Growth check: the question and the answer rise in; the wheel is held back
 * (data-intro="waiting", hidden in CSS) until it scrolls into view, then spins
 * in once (data-intro="play" runs the CSS spin). The CSS owns the spin because
 * the wheel's turn is a CSS transition that clicks keep driving afterwards.
 */
export const growthScene: MotionScene = (root) => {
  const q = gsap.utils.selector(root);
  const [wheel] = q('[data-anim="wheel"]');

  gsap.from(q('[data-anim="rise"]'), {
    y: 30,
    opacity: 0,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.12,
    scrollTrigger: { trigger: root, start: 'top 72%' },
  });

  wheel.setAttribute('data-intro', 'waiting');
  ScrollTrigger.create({
    trigger: wheel,
    start: 'top 82%',
    once: true,
    onEnter: () => wheel.setAttribute('data-intro', 'play'),
  });

  return () => wheel.removeAttribute('data-intro');
};
