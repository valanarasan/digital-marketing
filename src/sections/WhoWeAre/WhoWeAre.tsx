import { useRef } from 'react';
import type { WhoContent } from '@/types/content';
import { cx } from '@/lib/cx';
import { resolveHref } from '@/lib/href';
import { useMotion } from '@/hooks';
import { whoScene } from '@/motion/scenes';
import { Container, Kicker, LotusMark, TextLink } from '@/components/ui';
import styles from './WhoWeAre.module.css';

export interface WhoWeAreProps {
  content: WhoContent;
}

/** The fragmentation problem, stated large and lit word by word, beside a self-drawing lotus. */
export function WhoWeAre({ content }: WhoWeAreProps) {
  const ref = useRef<HTMLElement>(null);
  useMotion(ref, whoScene);

  const words = [
    ...content.statement.map((text) => ({ text, emphasised: false })),
    ...content.emphasis.map((text) => ({ text, emphasised: true })),
  ];

  return (
    <section ref={ref} id="about" className={styles.who} aria-labelledby="who-statement">
      <Container className={styles.grid}>
        <div className={styles.statementCell}>
          <Kicker className={styles.kicker}>{content.kicker}</Kicker>
          <h2 id="who-statement" className={styles.statement} data-anim="statement">
            {words.map((word, index) => (
              <span key={index}>
                <span
                  className={cx(styles.word, word.emphasised && styles.emphasis)}
                  data-anim="word"
                >
                  {word.text}
                </span>{' '}
              </span>
            ))}
          </h2>
        </div>

        <div className={styles.artCell} aria-hidden="true">
          <div className={styles.orb}>
            <LotusMark className={styles.lotus} weight={1.2} drawable />
          </div>
        </div>

        <div className={styles.problemCell} data-anim="fade">
          <p>{content.problem}</p>
        </div>

        <div className={styles.answerCell} data-anim="fade">
          <p className={styles.answerLead}>{content.answerLead}</p>
          <p>{content.answer}</p>
          {content.link ? (
            <TextLink className={styles.link} href={resolveHref(content.link.href)}>
              {content.link.label}
            </TextLink>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
