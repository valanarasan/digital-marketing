import { useRef } from 'react';
import type { WhyUsContent } from '@/types/content';
import { useMotion } from '@/hooks';
import { riseScene } from '@/motion/scenes';
import { Container, Kicker } from '@/components/ui';
import styles from './WhyUs.module.css';

export interface WhyUsProps {
  content: WhyUsContent;
}

/** "Why us?" — six working principles beside a pinned heading. */
export function WhyUs({ content }: WhyUsProps) {
  const ref = useRef<HTMLElement>(null);
  useMotion(ref, riseScene);

  return (
    <section ref={ref} id="why-us" className={styles.why} aria-labelledby="why-title">
      <Container className={styles.layout}>
        <div className={styles.intro}>
          <Kicker className={styles.kicker}>{content.kicker}</Kicker>
          <h2 id="why-title" className={styles.heading}>
            {content.heading} <span className={styles.accent}>{content.headingAccent}</span>
          </h2>
        </div>

        <ol role="list" className={styles.points}>
          {content.points.map((point, index) => (
            <li key={point.title} className={styles.point} data-anim="rise">
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className={styles.title}>{point.title}</h3>
              <p className={styles.body}>{point.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
