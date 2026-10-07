import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import type { MotionScene } from './types';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/** Runs a scene in a context scoped to `root`; the returned cleanup reverts everything it made. */
export function runScene(root: HTMLElement, scene: MotionScene): () => void {
  const context = gsap.context(() => scene(root), root);
  return () => context.revert();
}

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger and the
 * scroll position never disagree. Anchor links (#about, #services…) glide too.
 */
export function startSmoothScroll(): () => void {
  const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 0.95, anchors: true });
  const tick = (time: number) => lenis.raf(time * 1000);

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  // Web fonts change line lengths, and with them every trigger position.
  void document.fonts?.ready.then(() => ScrollTrigger.refresh());

  return () => {
    gsap.ticker.remove(tick);
    lenis.destroy();
  };
}
