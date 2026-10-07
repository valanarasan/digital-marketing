import { cx } from '@/lib/cx';
import styles from './Swoosh.module.css';

const PATH = 'M20 40C200 12 420 56 640 30S860 16 884 22';

export interface SwooshProps {
  className?: string;
}

/**
 * The underline beneath "momentum": a drawn gold stroke with a point of light
 * that keeps travelling along it. Purely decorative.
 */
export function Swoosh({ className }: SwooshProps) {
  return (
    <div className={cx(styles.swoosh, className)} aria-hidden="true">
      <svg className={styles.base} viewBox="0 0 900 60" focusable="false">
        <path d={PATH} pathLength={1} data-anim="swoosh" />
      </svg>
      <svg className={styles.comet} viewBox="0 0 900 60" focusable="false">
        <path d={PATH} pathLength={1} />
      </svg>
    </div>
  );
}
