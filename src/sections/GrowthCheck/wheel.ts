/**
 * Geometry for the growth wheel. Angles are degrees, clockwise from 12 o'clock;
 * slice `i` is centred on `i * slice`. The pointer sits at 3 o'clock, so the
 * picked slice is the one turned to 90°.
 */
export const POINTER_ANGLE = 90;

/**
 * How the wheel moves to a slice:
 * - "spin": at least one full turn, like a prize wheel (the lotus button);
 * - "turn": forward to the slice, never more than one rotation (clicking a slice);
 * - "step": the short way round (arrow keys).
 */
export type WheelMotion = 'spin' | 'turn' | 'step';

const mod = (value: number, base: number) => ((value % base) + base) % base;

const point = (angle: number, radius: number) => {
  const rad = (angle * Math.PI) / 180;
  return {
    x: +(50 + radius * Math.sin(rad)).toFixed(2),
    y: +(50 - radius * Math.cos(rad)).toFixed(2),
  };
};

/** The wheel's resting turn: slice `index` at the pointer, or the pointer between slices when none is picked. */
export function restTurn(index: number, count: number): number {
  const slice = 360 / count;
  return mod(POINTER_ANGLE - (index < 0 ? slice / 2 : index * slice), 360);
}

/** The turn that brings slice `index` to the pointer, moving on from `turn`. */
export function turnTo(turn: number, index: number, count: number, motion: WheelMotion): number {
  const delta = mod(restTurn(index, count) - turn, 360);
  if (motion === 'spin') return turn + delta + 360;
  if (motion === 'turn') return turn + delta;
  return turn + (delta > 180 ? delta - 360 : delta);
}

/**
 * A slice as a CSS polygon, in percentages of the disc. The outer points sit
 * beyond the rim (the disc's round edge clips them), so three are enough.
 */
export function sliceClip(index: number, count: number): string {
  const slice = 360 / count;
  const centre = index * slice;
  const outer = [centre - slice / 2, centre, centre + slice / 2].map((angle) => point(angle, 75));
  return `polygon(50% 50%, ${outer.map(({ x, y }) => `${x}% ${y}%`).join(', ')})`;
}

/** Where a slice's label sits: on its centre line, `radius` percent of the disc out from the hub. */
export function labelSpot(index: number, count: number, radius: number) {
  const { x, y } = point(index * (360 / count), radius);
  return { left: `${x}%`, top: `${y}%` };
}

/** "Poor Website Conversion" → ["Poor Website", "Conversion"]: the last word gets its own line. */
export function splitLabel(label: string): [string, string] {
  const at = label.lastIndexOf(' ');
  return at < 0 ? ['', label] : [label.slice(0, at), label.slice(at + 1)];
}
