import type { CSSProperties } from 'react';
import { cx } from '@/lib/cx';
import styles from './NoiseWord.module.css';

export interface NoiseWordProps {
  word: string;
  className?: string;
}

/**
 * Where each letter comes to rest: a slight, irregular misalignment
 * (x and y in em, rotation in degrees). Cycled for words longer than six letters.
 */
const REST: Array<[number, number, number]> = [
  [-0.02, 0.03, -3],
  [0.02, -0.03, 2],
  [-0.01, 0.02, -2],
  [0.03, -0.01, 3],
  [-0.02, 0.035, -2.5],
  [0.02, -0.02, 1],
];

/**
 * The word "noise." set slightly out of line: as the headline lands it glitches
 * once (CSS, about 0.7s), then holds still in its misaligned rest. Screen readers
 * get the plain word; the letters are decoration.
 */
export function NoiseWord({ word, className }: NoiseWordProps) {
  return (
    <span className={cx(styles.noise, className)}>
      <span className="sr-only">{word}</span>
      <span aria-hidden="true">
        {Array.from(word).map((letter, index) => {
          const [x, y, r] = REST[index % REST.length];
          const style = { '--x': `${x}em`, '--y': `${y}em`, '--r': `${r}deg` } as CSSProperties;
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
