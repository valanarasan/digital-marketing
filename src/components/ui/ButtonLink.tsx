import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cx } from '@/lib/cx';
import { ArrowIcon } from './ArrowIcon';
import styles from './ButtonLink.module.css';

export interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  /** `solid` is the gold call to action; `pill` the quieter outlined header link. */
  variant?: 'solid' | 'pill';
  withArrow?: boolean;
}

export function ButtonLink({
  children,
  variant = 'solid',
  withArrow = variant === 'solid',
  className,
  ...rest
}: ButtonLinkProps) {
  return (
    <a className={cx(styles.button, styles[variant], className)} {...rest}>
      {children}
      {withArrow ? <ArrowIcon className={styles.arrow} /> : null}
    </a>
  );
}
