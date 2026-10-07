import { useRef } from 'react';
import type { Lever, LeverId, ServicesContent } from '@/types/content';
import { useMotion } from '@/hooks';
import { servicesScene } from '@/motion/scenes';
import { Accordion, Container, Kicker } from '@/components/ui';
import styles from './Services.module.css';

export interface ServicesProps {
  content: ServicesContent;
  levers: Lever[];
  openId: LeverId | null;
  onToggle: (id: LeverId) => void;
}

function MaskedWords({ text, className }: { text: string; className?: string }) {
  return text.split(' ').map((word, index) => (
    <span key={`${word}-${index}`}>
      <span className={styles.mask}>
        <span className={className ?? styles.word} data-anim="word">
          {word}
        </span>
      </span>{' '}
    </span>
  ));
}

/** "One growth partner. Multiple growth levers." — the five levers as a single-open accordion. */
export function Services({ content, levers, openId, onToggle }: ServicesProps) {
  const ref = useRef<HTMLElement>(null);
  useMotion(ref, servicesScene);

  const items = levers.map((lever) => ({
    id: lever.id,
    title: lever.title,
    content: (
      <ul role="list" className={styles.tags} aria-label={`${lever.title} services`}>
        {lever.services.map((service) => (
          <li key={service} className={styles.tag}>
            {service}
          </li>
        ))}
      </ul>
    ),
  }));

  return (
    <section ref={ref} id="services" className={styles.services} aria-labelledby="services-title">
      <svg className={styles.curve} viewBox="0 0 620 420" aria-hidden="true" focusable="false">
        <path d="M-20 210C200 222 410 290 470 440" pathLength={1} data-anim="curve" />
      </svg>
      <Container className={styles.layout}>
        <div>
          <Kicker className={styles.kicker}>{content.kicker}</Kicker>
          <h2 id="services-title" className={styles.heading} data-anim="heading">
            <span className={styles.line}>
              <MaskedWords text={content.headingLines[0]} />
            </span>
            <span className={styles.line}>
              <MaskedWords text={content.headingLines[1]} />
              <MaskedWords text={content.headingAccent} className={styles.accent} />
            </span>
          </h2>
        </div>
        <Accordion
          items={items}
          openId={openId}
          onToggle={(id) => onToggle(id as LeverId)}
          itemAnim="stair"
        />
      </Container>
    </section>
  );
}
