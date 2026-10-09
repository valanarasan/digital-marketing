import { useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent } from 'react';
import type { GrowthCheckContent, Lever, LeverId, Problem } from '@/types/content';
import { cx } from '@/lib/cx';
import { leverForProblem } from '@/lib/levers';
import { EVENTS } from '@/lib/events';
import { track } from '@/lib/analytics';
import { ArrowIcon, BrandLogo, Kicker } from '@/components/ui';
import { labelSpot, restTurn, sliceClip, splitLabel, turnTo } from './wheel';
import type { WheelMotion } from './wheel';
import styles from './ProblemWheel.module.css';

export interface ProblemWheelProps {
  content: GrowthCheckContent;
  /** Id for the question heading, which also names the section and the wheel. */
  headingId: string;
  problems: Problem[];
  levers: Lever[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  /** Where the answer's lever name links to (the services section). */
  leverHref: string;
  /** Takes over the lever link, so the page can scroll to that lever already open. */
  onLeverClick: (id: LeverId) => void;
}

/** Arrow keys walk the wheel like any radio group; Home and End jump to the ends. */
const KEY_STEPS: Record<string, (index: number, count: number) => number> = {
  ArrowRight: (index) => index + 1,
  ArrowDown: (index) => index + 1,
  ArrowLeft: (index) => index - 1,
  ArrowUp: (index) => index - 1,
  Home: () => 0,
  End: (_, count) => count - 1,
};

/**
 * "What's holding your growth back?" as a wheel. Each slice is a growth
 * blocker; picking one turns the wheel (within one rotation) until that slice
 * stops at the gold pointer, and the lever that answers it is named beside the
 * wheel. The lotus in the hub spins it properly — a full turn or more — onto a
 * blocker at random. The labels counter-turn as the wheel moves, so they always
 * read upright.
 */
export function ProblemWheel({
  content,
  headingId,
  problems,
  levers,
  selectedId,
  onSelect,
  leverHref,
  onLeverClick,
}: ProblemWheelProps) {
  const count = problems.length;
  const slices = useRef<Array<HTMLButtonElement | null>>([]);
  const indexOf = (id: string | null) => problems.findIndex((problem) => problem.id === id);

  const [wheel, setWheel] = useState(() => ({
    id: selectedId,
    turn: restTurn(indexOf(selectedId), count),
    motion: 'spin' as WheelMotion,
  }));

  // The page may change the pick on its own; turn to it then too.
  if (wheel.id !== selectedId) {
    const index = indexOf(selectedId);
    setWheel({
      id: selectedId,
      turn: index < 0 ? wheel.turn : turnTo(wheel.turn, index, count, 'turn'),
      motion: 'turn',
    });
  }

  const choose = (index: number, motion: WheelMotion) => {
    const { id } = problems[index];
    setWheel({ id, turn: turnTo(wheel.turn, index, count, motion), motion });
    track(motion === 'spin' ? EVENTS.GROWTH_WHEEL_SPUN : EVENTS.GROWTH_BLOCKER_SELECTED, {
      problem_id: id,
      problem_label: problems[index].label,
      method: motion === 'step' ? 'keyboard' : motion === 'spin' ? 'spin' : 'click',
    });
    onSelect(id);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!Object.hasOwn(KEY_STEPS, event.key)) return;
    event.preventDefault();
    const next = (KEY_STEPS[event.key](index, count) + count) % count;
    choose(next, 'step');
    slices.current[next]!.focus();
  };

  const selectedIndex = indexOf(selectedId);
  const tabbable = Math.max(selectedIndex, 0);

  /** The lotus: a real spin, at least one full turn, landing on a different blocker at random. */
  const spin = () => {
    const offset = 1 + Math.floor(Math.random() * (count - 1));
    choose((tabbable + offset) % count, 'spin');
  };
  const lever = leverForProblem(problems, levers, selectedId);

  return (
    <div className={styles.growth}>
      <div className={styles.copy} data-anim="rise">
        <Kicker className={styles.kicker}>{content.kicker}</Kicker>
        <h2 className={styles.question} id={headingId}>
          {content.heading} <span className={styles.accent}>{content.headingAccent}</span>
        </h2>
        <p className={styles.hint}>{content.hint}</p>
      </div>

      <div
        className={styles.wheel}
        data-anim="wheel"
        data-motion={wheel.motion}
        style={{ '--turn': `${wheel.turn}deg` } as CSSProperties}
      >
        <span className={styles.bezel} aria-hidden="true" />
        <div className={styles.disc} role="radiogroup" aria-labelledby={headingId}>
          {problems.map((problem, index) => {
            const checked = index === selectedIndex;
            const [head, tail] = splitLabel(problem.label);
            return [
              <button
                key={problem.id}
                ref={(node) => {
                  slices.current[index] = node;
                }}
                type="button"
                role="radio"
                aria-checked={checked}
                aria-label={problem.label}
                tabIndex={index === tabbable ? 0 : -1}
                className={cx(styles.slice, checked && styles.checked)}
                style={{ clipPath: sliceClip(index, count) }}
                onClick={() => choose(index, 'turn')}
                onKeyDown={(event) => onKeyDown(event, index)}
              />,
              <span
                key={`${problem.id}-label`}
                className={styles.label}
                style={labelSpot(index, count, 31)}
                aria-hidden="true"
              >
                <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
                <span className={styles.line}>{head}</span>
                <span className={styles.line}>{tail}</span>
              </span>,
            ];
          })}
          <svg
            className={styles.spokes}
            viewBox="-100 -100 200 200"
            aria-hidden="true"
            focusable="false"
          >
            {problems.map((problem, index) => (
              <g key={problem.id} transform={`rotate(${(index + 0.5) * (360 / count)})`}>
                <line x1="0" y1="-30" x2="0" y2="-100" />
                <circle cx="0" cy="-91" r="2.4" />
              </g>
            ))}
          </svg>
        </div>
        <button
          type="button"
          className={styles.hub}
          aria-label={content.spinLabel}
          title={content.spinLabel}
          onClick={spin}
        >
          <BrandLogo variant="mark" decorative />
        </button>
        <svg className={styles.pointer} viewBox="0 0 30 24" aria-hidden="true" focusable="false">
          <path d="M1 12 25.6 2.3Q29 1 29 4.6v14.8q0 3.6-3.4 2.3Z" />
        </svg>
      </div>

      <div className={styles.answer} aria-live="polite" data-anim="rise">
        {lever ? (
          <div key={selectedId} className={styles.reveal}>
            <p className={styles.blocker}>{content.blockerLabel}</p>
            <p className={styles.problem}>{problems[selectedIndex].label}</p>
            <p className={styles.start}>
              <span>{content.startLabel}</span>
              <a
                className={styles.lever}
                href={leverHref}
                onClick={(event) => {
                  // Keep the click from the smooth-scroll anchor handler too: the page scrolls to the lever.
                  event.preventDefault();
                  event.stopPropagation();
                  track(EVENTS.GROWTH_LEVER_LINK_CLICKED, {
                    lever_id: lever.id,
                    problem_id: selectedId,
                  });
                  onLeverClick(lever.id);
                }}
              >
                {lever.title}
                <ArrowIcon className={styles.arrow} />
              </a>
            </p>
            <ul role="list" className={styles.services} aria-label={`${lever.title} services`}>
              {lever.services.map((service) => (
                <li key={service} className={styles.service}>
                  {service}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
