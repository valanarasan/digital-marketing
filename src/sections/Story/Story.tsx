import { useRef } from 'react';
import type { StoryContent } from '@/types/content';
import { useMotion } from '@/hooks';
import { riseScene } from '@/motion/scenes';
import { Container, Kicker } from '@/components/ui';
import styles from './Story.module.css';

export interface StoryProps {
  content: StoryContent;
}

/** Our story: the founding question, then how the agency answered it. */
export function Story({ content }: StoryProps) {
  const ref = useRef<HTMLElement>(null);
  useMotion(ref, riseScene);

  return (
    <section ref={ref} id="story" className={styles.story} aria-labelledby="story-title">
      <Container className={styles.layout}>
        <Kicker className={styles.kicker}>{content.kicker}</Kicker>
        <div>
          <h2 id="story-title" className={styles.question} data-anim="rise">
            {content.lead} <span className={styles.accent}>{content.question}</span>
          </h2>
          <div className={styles.paragraphs}>
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph} data-anim="rise">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
