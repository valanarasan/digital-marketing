import { useRef } from 'react';
import type { QuoteContent } from '@/types/content';
import { useMotion } from '@/hooks';
import { riseScene } from '@/motion/scenes';
import { Container, FlowerStar } from '@/components/ui';
import styles from './Quote.module.css';

export interface QuoteProps {
  content: QuoteContent;
}

/** A single pull quote, set large on ink. */
export function Quote({ content }: QuoteProps) {
  const ref = useRef<HTMLElement>(null);
  useMotion(ref, riseScene);

  return (
    <section ref={ref} className={styles.quote} aria-label="Quote">
      <Container>
        <figure className={styles.figure} data-anim="rise">
          <FlowerStar className={styles.star} />
          <blockquote className={styles.text}>
            <p>“{content.text}”</p>
          </blockquote>
          <figcaption className={styles.cite}>— {content.cite}</figcaption>
        </figure>
      </Container>
    </section>
  );
}
