export interface FlowerStarProps {
  className?: string;
}

/** Eight-petal star — the brand's separator and the spinning mark on the CTA card. */
export function FlowerStar({ className }: FlowerStarProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {[0, 45, 90, 135].map((angle) => (
        <ellipse key={angle} cx="50" cy="50" rx="10" ry="49" transform={`rotate(${angle} 50 50)`} />
      ))}
    </svg>
  );
}
