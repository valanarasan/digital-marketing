import { Fragment, useRef } from 'react';
import type { StatementContent } from '@/types/content';
import { useMotion } from '@/hooks';
import { statementScene } from '@/motion/scenes';
import { Container } from '@/components/ui';
import styles from './Statement.module.css';

export interface StatementProps {
  content: StatementContent;
}

/** "Impressions are not growth…" — the vanity metrics get struck through, the payoff lands in gold. */
export function Statement({ content }: StatementProps) {
  const ref = useRef<HTMLElement>(null);
  useMotion(ref, statementScene);

  return (
    <section ref={ref} className={styles.statement} aria-label="What growth means">
      <div className={styles.rings} aria-hidden="true" />
      <Container className={styles.inner}>
        <svg className={styles.icon} viewBox="0 0 120 120" aria-hidden="true" focusable="false">
          <circle cx="60" cy="60" r="56" />
          <circle className={styles.spin} cx="60" cy="60" r="38" strokeDasharray="3 7" />
          <circle cx="60" cy="60" r="20" />
          <path className={styles.spin} d="M60 22a38 38 0 0 1 38 38" />
          <circle cx="60" cy="60" r="4" />
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
