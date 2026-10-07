import { cx } from '@/lib/cx';
import styles from './MapEmbed.module.css';

export interface MapEmbedProps {
  src: string;
  /** Names the map for screen readers; an iframe without a title is unlabelled. */
  title: string;
  className?: string;
}

/**
 * A live Google Maps iframe in a rounded square. It loads lazily, so the map
 * costs nothing until the visitor scrolls near it.
 */
export function MapEmbed({ src, title, className }: MapEmbedProps) {
  return (
    <div className={cx(styles.map, className)}>
      <iframe
        className={styles.frame}
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
