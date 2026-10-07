export interface LotusMarkProps {
  className?: string;
  /** Stroke weight relative to the 100×62 viewBox. */
  weight?: number;
  /**
   * Normalise every petal's length to 1 so the mark can be drawn on with
   * `stroke-dasharray: 1` / `stroke-dashoffset` (watermark and loop animations).
   */
  drawable?: boolean;
}

const PETALS = [
  // outer petals
  'M50 57C70 52 86 42 96 25c-6 25-22 35-46 32Z',
  'M50 57C30 52 14 42 4 25c6 25 22 35 46 32Z',
  // mid petals
  'M50 57c4-17 12-35 26-47 2 20-8 36-26 47Z',
  'M50 57c-4-17-12-35-26-47-2 20 8 36 26 47Z',
  // centre petal
  'M50 57c-7-15-7-37 0-52 7 15 7 37 0 52Z',
];

/**
 * The Hiranmaye lotus, drawn as five stroked petals so it stays crisp at any
 * size and inherits `currentColor` from whatever it sits in.
 */
export function LotusMark({ className, weight = 2.6, drawable = false }: LotusMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 62"
      fill="none"
      stroke="currentColor"
      strokeWidth={weight}
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      {PETALS.map((d) => (
        <path key={d} d={d} pathLength={drawable ? 1 : undefined} />
      ))}
    </svg>
  );
}
