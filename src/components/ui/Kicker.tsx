import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';
import styles from './Kicker.module.css';

export interface KickerProps {
  children: ReactNode;
  className?: string;
}

/** Small uppercase section label with a leading rule. Colour comes from the parent. */
export function Kicker({ children, className }: KickerProps) {
  return <p className={cx(styles.kicker, className)}>{children}</p>;
}
