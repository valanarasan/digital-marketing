import { useRef } from 'react';
import type { TrustContent } from '@/types/content';
import { useMotion } from '@/hooks';
import { trustScene } from '@/motion/scenes';
import { Container, FlowerStar, Marquee } from '@/components/ui';
import styles from './TrustStrip.module.css';

export interface TrustStripProps {
  content: TrustContent;
}

/**
 * Who the agency builds for: the ambition line, business stages on a big ticker,
 * sectors on a small reverse one, and the two closing notes from the brief.
 */
export function TrustStrip({ content }: TrustStripProps) {
  const ref = useRef<HTMLElement>(null);
  useMotion(ref, trustScene);

  return (
    <section ref={ref} className={styles.trust} aria-labelledby="trust-label">
      <Container className={styles.head}>
        <div>
          <h2 id="trust-label" className={styles.heading}>
            {content.heading}
          </h2>
          <p className={styles.label}>{content.label}</p>
        </div>
        <p className={styles.tag}>{content.tag}</p>
      </Container>
      <Marquee
        items={content.stages}
        separator={<span className={styles.arrow}>→</span>}
        trailing={<FlowerStar className={styles.star} />}
      />
      <Marquee
        className={styles.sectors}
        items={content.sectors}
        separator={<span className={styles.dot} />}
        size="small"
        reverse
      />
      <Container>
        <ul role="list" className={styles.notes}>
          {content.notes.map((note) => (
            <li key={note} className={styles.note}>
              {note}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
