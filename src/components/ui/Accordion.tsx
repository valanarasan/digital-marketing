import { useId } from 'react';
import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';
import styles from './Accordion.module.css';

export interface AccordionItem {
  id: string;
  title: ReactNode;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  openId: string | null;
  onToggle: (id: string) => void;
  /** Optional data-anim hook on each item, for motion scenes. */
  itemAnim?: string;
  className?: string;
}

/**
 * Single-open disclosure list. State lives with the caller (open/closed is a
 * prop), so the same component serves any section that needs it. The running
 * number is decorative and hidden from the button's accessible name.
 */
export function Accordion({ items, openId, onToggle, itemAnim, className }: AccordionProps) {
  const baseId = useId();

  return (
    <div className={cx(styles.accordion, className)}>
      {items.map((item, index) => {
        const open = item.id === openId;
        const buttonId = `${baseId}-button-${item.id}`;
        const panelId = `${baseId}-panel-${item.id}`;

        return (
          <div key={item.id} className={cx(styles.item, open && styles.open)} data-anim={itemAnim}>
            <h3 className={styles.heading}>
              <button
                type="button"
                id={buttonId}
                className={styles.trigger}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => onToggle(item.id)}
              >
                <span className={styles.index} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className={styles.title}>{item.title}</span>
                <span className={styles.plus} aria-hidden="true" />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={styles.panel}
              inert={!open}
            >
              <div className={styles.panelInner}>
                <div className={styles.panelBody}>{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
