import { Fragment, useRef } from 'react';
import type { StatementContent } from '@/types/content';
import { useMotion } from '@/hooks';
import { statementScene } from '@/motion/scenes';
import { Container } from '@/components/ui';
import styles from './Statement.module.css';

export interface StatementProps {
  content: StatementContent;
}

/**
 * "Impressions are not growth…" — the vanity metrics get struck through, the payoff lands in gold.
 * Beside it, the breakout line: a gold line climbs out of a flat, wobbly one (the vanity numbers).
 */
export function Statement({ content }: StatementProps) {
  const ref = useRef<HTMLElement>(null);
  useMotion(ref, statementScene);

  return (
    <section ref={ref} className={styles.statement} aria-label="What growth means">
      <div className={styles.rings} aria-hidden="true" />
      <Container className={styles.inner}>
        <svg className={styles.icon} viewBox="0 0 120 120" aria-hidden="true" focusable="false">
          <path className={styles.axis} d="M14 14V104H108" />
          <path
            className={styles.axis}
            d="M14 80H12M14 56H12M14 32H12M38 104V106M62 104V106M86 104V106"
          />
          <path
            className={styles.noise}
            d="M18 88C26 82 32 93 41 87S57 92 66 86 84 92 104 86"
            strokeDasharray="2 4"
          />
          <path className={styles.rise} d="M18 98C40 96 52 84 64 68S88 34 102 24" pathLength={1} />
          <path className={styles.arrow} d="M91 23L103 23 99 34" />
          <circle className={styles.point} cx="64" cy="68" r="3.2" />
        </svg>
        <div>
          <p className={styles.small}>
            {content.intro}{' '}
            {content.negations.map(([word, rest]) => (
              <Fragment key={word}>
                <span className={styles.struck}>
                  {word}
                  <span className={styles.strikeLine} data-anim="strike" aria-hidden="true" />
                </span>{' '}
                {rest}{' '}
              </Fragment>
            ))}
          </p>
          <p className={styles.payoff} data-anim="payoff">
            {content.payoff}
          </p>
        </div>
      </Container>
    </section>
  );
}
