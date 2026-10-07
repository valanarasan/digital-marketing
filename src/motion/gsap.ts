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

/** The running Lenis instance, so programmatic scrolls glide like everything else. */
let smooth: Lenis | null = null;

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger and the
 * scroll position never disagree. Anchor links (#about, #services…) glide too.
 */
export function startSmoothScroll(): () => void {
  const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 0.95, anchors: true });
  smooth = lenis;
  const tick = (time: number) => lenis.raf(time * 1000);

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  // Web fonts change line lengths, and with them every trigger position.
  void document.fonts?.ready.then(() => ScrollTrigger.refresh());

  return () => {
    gsap.ticker.remove(tick);
    lenis.destroy();
    smooth = null;
  };
}

/** Scrolls to a page offset — through Lenis when it runs, natively otherwise — then calls `done`. */
export function scrollToY(y: number, done: () => void): void {
  if (smooth) {
    smooth.scrollTo(y, { onComplete: done });
    return;
  }
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
  // `scrollend` is not everywhere yet; the timer is the fallback.
  const timer = window.setTimeout(finish, 1200);
  window.addEventListener('scrollend', finish, { once: true });
  function finish() {
    window.clearTimeout(timer);
    window.removeEventListener('scrollend', finish);
    done();
  }
}

/** Drives a list's "current step" from scroll, and can glide to a given step. */
export interface ScrollSteps {
  scrollToStep(index: number): void;
  destroy(): void;
}

/**
 * Splits the scroll through `element` into `count` equal steps and reports the
 * step under the reading line (from the element's top reaching 60% of the
 * viewport to its bottom passing 40%). Steps follow scroll progress, not the
 * element's live layout, so opening one item and closing another can never
 * feed back into which step is current.
 */
export function createScrollSteps(
  element: Element,
  count: number,
  onStep: (index: number) => void,
): ScrollSteps {
  let current = -1;
  let gliding = false;

  const trigger = ScrollTrigger.create({
    trigger: element,
    start: 'top 60%',
    end: 'bottom 40%',
    onUpdate(self) {
      if (gliding) return;
      const index = Math.min(count - 1, Math.floor(self.progress * count));
      if (index !== current) {
        current = index;
        onStep(index);
      }
    },
  });

  return {
    scrollToStep(index) {
      // Open the target at once and hold it while gliding past the steps before it.
      current = index;
      gliding = true;
      onStep(index);
      const y = trigger.start + ((index + 0.5) / count) * (trigger.end - trigger.start);
      scrollToY(y, () => {
        gliding = false;
      });
    },
    destroy() {
      trigger.kill();
    },
  };
}
