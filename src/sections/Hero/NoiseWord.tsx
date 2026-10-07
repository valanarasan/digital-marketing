import type { CSSProperties } from 'react';
import { cx } from '@/lib/cx';
import styles from './NoiseWord.module.css';

export interface NoiseWordProps {
  word: string;
  className?: string;
}

// Out-of-step durations and offsets so no two letters twitch together.
const DURATIONS = [0.5, 0.42, 0.58, 0.36, 0.47, 0.53];
const OFFSETS = [0, 0.1, 0.25, 0.05, 0.3, 0.15];

/**
 * The word "noise." rendered restless: each letter jitters on its own clock.
 * Screen readers get the plain word; the twitching letters are decoration.
 */
export function NoiseWord({ word, className }: NoiseWordProps) {
  return (
    <span className={cx(styles.noise, className)}>
      <span className="sr-only">{word}</span>
      <span aria-hidden="true">
        {Array.from(word).map((letter, index) => {
          const style: CSSProperties = {
            animationDuration: `${DURATIONS[index % DURATIONS.length]}s`,
            animationDelay: `-${OFFSETS[index % OFFSETS.length]}s`,
          };
          return (
            <span key={`${letter}-${index}`} className={styles.letter} style={style}>
              {letter}
            </span>
          );
        })}
      </span>
    </span>
  );
}
