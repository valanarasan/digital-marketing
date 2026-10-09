import { useImperativeHandle, useRef } from 'react';
import type { Ref } from 'react';
import type { Lever, LeverId, ServicesContent } from '@/types/content';
import { resolveHref } from '@/lib/href';
import { EVENTS } from '@/lib/events';
import { track } from '@/lib/analytics';
import { useMotion, useScrollSteps } from '@/hooks';
import { servicesScene } from '@/motion/scenes';
import { Accordion, Container, Kicker, TextLink } from '@/components/ui';
import styles from './Services.module.css';

/** Lets the page send a visitor to a given lever (the hero's "Start with …" link). */
export interface ServicesHandle {
  showLever(id: LeverId): void;
}

export interface ServicesProps {
  content: ServicesContent;
  levers: Lever[];
  openId: LeverId | null;
  onToggle: (id: LeverId) => void;
  /** Called as scrolling brings each lever to the reading line; the page opens it. */
  onStep: (id: LeverId) => void;
  ref?: Ref<ServicesHandle>;
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

/**
 * "One Growth Partner. Multiple Growth Levers." — the five levers as a
 * single-open accordion that follows the scroll: each lever opens as it reaches
 * the reading line and the one before it closes. Clicking still opens any lever.
 */
export function Services({ content, levers, openId, onToggle, onStep, ref }: ServicesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  useMotion(sectionRef, servicesScene);

  const scrollToStep = useScrollSteps(listRef, levers.length, (index) => onStep(levers[index].id));
  useImperativeHandle(
    ref,
    () => ({
      showLever: (id) => scrollToStep(levers.findIndex((lever) => lever.id === id)),
    }),
    [scrollToStep, levers],
  );

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
    <section
      ref={sectionRef}
      id="services"
      className={styles.services}
      aria-labelledby="services-title"
    >
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
          <TextLink
            className={styles.more}
            href={resolveHref(content.link.href)}
            data-track-event={EVENTS.SERVICES_LEARN_MORE_CLICKED}
          >
            {content.link.label}
          </TextLink>
        </div>
        <div ref={listRef}>
          <Accordion
            items={items}
            openId={openId}
            onToggle={(id) => {
              track(EVENTS.SERVICE_LEVER_TOGGLED, {
                lever_id: id,
                action: id === openId ? 'closed' : 'opened',
              });
              onToggle(id as LeverId);
            }}
            itemAnim="stair"
          />
        </div>
      </Container>
    </section>
  );
}
