import { Fragment } from 'react';
import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';
import styles from './Marquee.module.css';

export interface MarqueeProps {
  items: string[];
  /** Rendered between items. */
  separator: ReactNode;
  /** Rendered after the last item, before the loop repeats. Defaults to the separator. */
  trailing?: ReactNode;
  size?: 'large' | 'small';
  /** Loop right-to-left (default) or left-to-right. */
  reverse?: boolean;
  className?: string;
}

/**
 * An endless ticker. The row is rendered twice and the track slides by exactly
 * one copy, so the loop is seamless. Both copies are hidden from assistive tech;
 * a single plain-text list stands in for them.
 */
export function Marquee({
  items,
  separator,
  trailing = separator,
  size = 'large',
  reverse = false,
  className,
}: MarqueeProps) {
  const lastIndex = items.length - 1;

  return (
    <div className={cx(styles.marquee, styles[size], reverse && styles.reverse, className)}>
      <div className={styles.drift} data-anim="drift">
        <div className={styles.track}>
          {[0, 1].map((copy) => (
            <div key={copy} className={styles.group} aria-hidden="true">
              {items.map((item, index) => (
                <Fragment key={item}>
                  <span>{item}</span>
                  {index < lastIndex ? separator : trailing}
                </Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className="sr-only">{items.join(', ')}</p>
    </div>
  );
}
