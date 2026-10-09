import { useRef } from 'react';
import type { ProcessContent, ProcessStep } from '@/types/content';
import { cx } from '@/lib/cx';
import { EVENTS } from '@/lib/events';
import { useMotion } from '@/hooks';
import { processScene } from '@/motion/scenes';
import { ArrowIcon, Container, FlowerStar } from '@/components/ui';
import { StepIcon } from './StepIcon';
import styles from './Process.module.css';

export interface ProcessProps {
  intro: ProcessContent;
  steps: ProcessStep[];
}

/** Diagnose → Compound in a 3×2 grid; the sixth cell is the call to action. */
export function Process({ intro, steps }: ProcessProps) {
  const ref = useRef<HTMLElement>(null);
  useMotion(ref, processScene);

  return (
    <section ref={ref} id="process" className={styles.process} aria-labelledby="process-title">
      <Container>
        <div className={styles.head}>
          <span>{intro.label}</span>
          <span>{intro.range}</span>
        </div>

        <div className={styles.titleWrap}>
          <div className={styles.orbit} data-anim="orbit" aria-hidden="true" />
          <div
            className={cx(styles.orbit, styles.orbitSecond)}
            data-anim="orbit"
            aria-hidden="true"
          />
          <h2 id="process-title" className={styles.title}>
            {intro.headingLead} <span className={styles.accent}>{intro.headingAccent}</span>
          </h2>
        </div>

        <div className={styles.grid}>
          {steps.map((step, index) => (
            <article key={step.id} className={styles.step}>
              <h3 className={styles.stepName}>
                <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
                {step.name}
              </h3>
              <div className={styles.media} data-anim="media">
                <StepIcon name={step.id} className={styles.icon} data-anim="icon" />
              </div>
              <p className={styles.headline}>{step.headline}</p>
              <p className={styles.body}>{step.body}</p>
            </article>
          ))}
          <a
            className={styles.cta}
            href={intro.cta.href}
            data-track-event={EVENTS.PROCESS_CTA_CLICKED}
          >
            <FlowerStar className={styles.ctaStar} />
            <span className={styles.ctaLabel}>
              {intro.cta.label}
              <ArrowIcon className={styles.ctaArrow} />
            </span>
          </a>
        </div>
      </Container>
    </section>
  );
}
