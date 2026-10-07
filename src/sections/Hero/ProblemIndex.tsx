import { useId } from 'react';
import type { Lever, Problem } from '@/types/content';
import { cx } from '@/lib/cx';
import { leverForProblem } from '@/lib/levers';
import { ArrowIcon } from '@/components/ui';
import styles from './ProblemIndex.module.css';

export interface ProblemIndexProps {
  question: string;
  problems: Problem[];
  levers: Lever[];
  selectedId: string | null;
  onToggle: (id: string) => void;
  /** Where the answer's lever name links to (the services section). */
  leverHref: string;
}

/**
 * "What's holding your growth back?" as a numbered index. Picking a problem
 * names the growth lever that answers it and lists that lever's services.
 */
export function ProblemIndex({
  question,
  problems,
  levers,
  selectedId,
  onToggle,
  leverHref,
}: ProblemIndexProps) {
  const questionId = useId();
  const lever = leverForProblem(problems, levers, selectedId);

  return (
    <div className={styles.index}>
      <p className={styles.question} id={questionId}>
        {question}
      </p>
      <ul role="list" aria-labelledby={questionId}>
        {problems.map((problem, index) => {
          const selected = problem.id === selectedId;
          return (
            <li key={problem.id}>
              <button
                type="button"
                className={cx(styles.option, selected && styles.selected)}
                aria-pressed={selected}
                onClick={() => onToggle(problem.id)}
              >
                <span className={styles.number} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className={styles.label}>{problem.label}</span>
                <ArrowIcon className={styles.arrow} />
              </button>
            </li>
          );
        })}
      </ul>
      <p className={styles.answer} aria-live="polite">
        {lever ? (
          <>
            <span className={styles.muted}>Start with</span>
            <a className={styles.lever} href={leverHref}>
              {lever.title}
            </a>
            <span>{lever.services.join(' • ')}</span>
          </>
        ) : (
          <span className={styles.muted}>Pick one to see where we would start.</span>
        )}
      </p>
    </div>
  );
}
