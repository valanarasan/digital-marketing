import { useId, useRef } from 'react';
import type { GrowthCheckContent, Lever, LeverId, Problem } from '@/types/content';
import { useMotion } from '@/hooks';
import { growthScene } from '@/motion/scenes';
import { Container } from '@/components/ui';
import { ProblemWheel } from './ProblemWheel';
import styles from './GrowthCheck.module.css';

export interface GrowthCheckProps {
  content: GrowthCheckContent;
  problems: Problem[];
  levers: Lever[];
  selectedProblem: string | null;
  onSelectProblem: (id: string) => void;
  /** The "Start with …" link: take the visitor to that lever in the services, open. */
  onShowLever: (id: LeverId) => void;
}

/**
 * "What's holding your growth back?" — the section straight after the hero.
 * The growth wheel sits on the left; the question and the lever that answers
 * the picked problem sit beside it. The wheel spins in once as it comes into view.
 */
export function GrowthCheck({
  content,
  problems,
  levers,
  selectedProblem,
  onSelectProblem,
  onShowLever,
}: GrowthCheckProps) {
  const ref = useRef<HTMLElement>(null);
  const headingId = useId();
  useMotion(ref, growthScene);

  return (
    <section ref={ref} id="growth-check" className={styles.section} aria-labelledby={headingId}>
      <Container>
        <ProblemWheel
          content={content}
          headingId={headingId}
          problems={problems}
          levers={levers}
          selectedId={selectedProblem}
          onSelect={onSelectProblem}
          leverHref="#services"
          onLeverClick={onShowLever}
        />
      </Container>
    </section>
  );
}
