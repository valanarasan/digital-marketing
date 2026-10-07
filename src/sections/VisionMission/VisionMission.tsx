import { useRef } from 'react';
import type { VisionMissionContent } from '@/types/content';
import { useMotion } from '@/hooks';
import { riseScene } from '@/motion/scenes';
import { Container } from '@/components/ui';
import styles from './VisionMission.module.css';

export interface VisionMissionProps {
  content: VisionMissionContent;
}

/** Vision and mission side by side: the vision short and set large, the mission in full. */
export function VisionMission({ content }: VisionMissionProps) {
  const ref = useRef<HTMLElement>(null);
  useMotion(ref, riseScene);

  return (
    <section ref={ref} id="vision" className={styles.section} aria-label="Vision and mission">
      <Container className={styles.grid}>
        <article className={styles.card} data-anim="rise">
          <h2 className={styles.label}>{content.vision.label}</h2>
          <p className={styles.vision}>{content.vision.text}</p>
        </article>
        <article className={styles.card} data-anim="rise">
          <h2 className={styles.label}>{content.mission.label}</h2>
          <p className={styles.mission}>{content.mission.text}</p>
        </article>
      </Container>
    </section>
  );
}
