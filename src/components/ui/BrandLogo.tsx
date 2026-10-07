import { cx } from '@/lib/cx';
import { resolveHref } from '@/lib/href';

/**
 * The Hiranmaye Digital logo — the client's original artwork, traced to vector
 * (see brand/README.md). Three cuts of the same drawing, never redrawn:
 * - full: lotus, name and the "Strategy drives growth" tagline
 * - name: lotus and name, for small sizes where the tagline would not read
 * - mark: the lotus alone
 */
const LOGOS = {
  full: {
    src: 'brand/logo.svg',
    width: 911,
    height: 460,
    alt: 'Hiranmaye Digital — Strategy drives growth',
  },
  name: { src: 'brand/logo-name.svg', width: 907, height: 341, alt: 'Hiranmaye Digital' },
  mark: { src: 'brand/mark.svg', width: 329, height: 210, alt: 'Hiranmaye Digital lotus' },
} as const;

export type BrandLogoVariant = keyof typeof LOGOS;

export interface BrandLogoProps {
  variant: BrandLogoVariant;
  className?: string;
  /** Hide from assistive tech where the name is already given (a labelled link, a watermark). */
  decorative?: boolean;
}

export function BrandLogo({ variant, className, decorative = false }: BrandLogoProps) {
  const logo = LOGOS[variant];
  return (
    <img
      className={cx(className)}
      src={resolveHref(logo.src)}
      width={logo.width}
      height={logo.height}
      alt={decorative ? '' : logo.alt}
      decoding="async"
    />
  );
}
