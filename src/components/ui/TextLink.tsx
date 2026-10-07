import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cx } from '@/lib/cx';
import { ArrowIcon } from './ArrowIcon';
import styles from './TextLink.module.css';

export interface TextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

/** Underlined secondary link with a nudging arrow. Inherits colour. */
export function TextLink({ children, className, ...rest }: TextLinkProps) {
  return (
    <a className={cx(styles.link, className)} {...rest}>
      {children}
      <ArrowIcon className={styles.arrow} />
    </a>
  );
}
