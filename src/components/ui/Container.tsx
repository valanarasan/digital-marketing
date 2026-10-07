import type { HTMLAttributes } from 'react';
import { cx } from '@/lib/cx';
import styles from './Container.module.css';

/** The page column: full width up to the max, with the shared side gutter. */
export function Container({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx(styles.container, className)} {...rest} />;
}
