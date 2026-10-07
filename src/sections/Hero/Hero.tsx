import { useRef } from 'react';
import type { ReactNode } from 'react';
import type { HeroContent, Lever, Problem } from '@/types/content';
import { cx } from '@/lib/cx';
import { useMotion, useStickyOffset } from '@/hooks';
import { heroScene } from '@/motion/scenes';
import { ButtonLink, Container, LotusMark, TextLink } from '@/components/ui';
import { NoiseWord } from './NoiseWord';
import { ProblemIndex } from './ProblemIndex';
import { Swoosh } from './Swoosh';
import styles from './Hero.module.css';

export interface HeroProps {
  /** The site header sits inside the hero and scrolls away with it. */
  header: ReactNode;
  content: HeroContent;
  problems: Problem[];
  levers: Lever[];
  selectedProblem: string | null;
  onToggleProblem: (id: string) => void;
  /** Id given to the headline block — the skip link's target. */
  contentId: string;
}

/**
 * The Editorial hero: a magazine-cover layout on navy. "noise." glitches once and rests off-line,
 * "It creates momentum." sets large in gold italic over a travelling-light
 * underline, and the base row carries the calls to action and the growth check
 * (the brief keeps the hero to tagline and CTA; the description lives in the
 * footer's About us). On wide screens it stays pinned while the page slides over it.
 */
export function Hero({
  header,
  content,
  problems,
  levers,
  selectedProblem,
  onToggleProblem,
  contentId,
}: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const top = useStickyOffset(ref);
  useMotion(ref, heroScene);

  return (
    <section ref={ref} id="top" className={styles.hero} style={{ top }} aria-label="Introduction">
      <div className={styles.watermark} data-anim="watermark" aria-hidden="true">
        <LotusMark weight={0.3} drawable />
      </div>

      {header}

      <Container>
        <div className={styles.mast}>
          <span data-anim="mast">{content.eyebrow}</span>
          <span data-anim="mast">
            <LotusMark className={styles.mastMark} weight={4} />
          </span>
          <span data-anim="mast" className={styles.location}>
            {content.location}
          </span>
        </div>
        <div className={styles.rule} data-anim="rule" />
      </Container>

      <Container className={styles.head}>
        <div id={contentId} tabIndex={-1} className={styles.headInner}>
          <h1 className={styles.title}>
            <span className={styles.lead}>
              <span className={styles.mask}>
                <span className={styles.line} data-anim="line">
                  {content.lead[0]}
                </span>
              </span>
              <span className={styles.mask}>
                <span className={styles.line} data-anim="line">
                  {content.lead[1]} <NoiseWord word={content.noiseWord} />
                </span>
              </span>
            </span>
            <span className={styles.payoff}>
              <span className={styles.payoffInner} data-anim="payoff">
                {content.payoff}
              </span>
            </span>
          </h1>
          <Swoosh className={styles.swoosh} />
        </div>
      </Container>

      <Container>
        <div className={styles.base}>
          <div className={cx(styles.column, styles.actions)} data-anim="base">
            <ButtonLink href={content.primaryCta.href}>{content.primaryCta.label}</ButtonLink>
            <TextLink href={content.secondaryCta.href}>{content.secondaryCta.label}</TextLink>
            <p className={styles.cue} aria-hidden="true">
              <span className={styles.cueLine} />
              {content.scrollCue}
            </p>
          </div>
          <div className={styles.column} data-anim="base">
            <ProblemIndex
              question={content.question}
              problems={problems}
              levers={levers}
              selectedId={selectedProblem}
              onToggle={onToggleProblem}
              leverHref="#services"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
