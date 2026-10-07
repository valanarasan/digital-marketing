import styles from './SkipLink.module.css';

export interface SkipLinkProps {
  target: string;
}

/** First focusable element: lets keyboard users jump past the header. */
export function SkipLink({ target }: SkipLinkProps) {
  return (
    <a className={styles.skip} href={`#${target}`}>
      Skip to content
    </a>
  );
}
