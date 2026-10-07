import { initials } from '@/lib/initials';
import { cx } from '@/lib/cx';
import styles from './Monogram.module.css';

export interface MonogramProps {
  name: string;
  className?: string;
}

/** Initials in a gold ring, standing in for a portrait until photos arrive. Decorative: the name is always printed beside it. */
export function Monogram({ name, className }: MonogramProps) {
  return (
    <span className={cx(styles.monogram, className)} aria-hidden="true">
      {initials(name)}
    </span>
  );
}
