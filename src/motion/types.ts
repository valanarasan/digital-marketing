/**
 * A motion scene sets up a section's animations. It runs inside a GSAP context
 * scoped to `root`, so everything it creates is reverted when the section
 * unmounts. Scenes find their targets through `data-anim` attributes, never
 * through CSS-module class names, so styling and motion can change independently.
 */
export type MotionScene = (root: HTMLElement) => void;
