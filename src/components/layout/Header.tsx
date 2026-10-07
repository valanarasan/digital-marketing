import { useEffect, useId, useState } from 'react';
import type { NavItem } from '@/types/content';
import { cx } from '@/lib/cx';
import { ButtonLink, Container, LotusMark } from '@/components/ui';
import styles from './Header.module.css';

export interface HeaderProps {
  nav: NavItem[];
  cta: NavItem;
}

/**
 * Brand, section links and the call to action. Below 720px the links fold into
 * a drawer that closes on Escape and on any link tap — including the section
 * you are already on.
 */
export function Header({ nav, cta }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const drawerId = useId();
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <a className={styles.logo} href="#top" aria-label="Hiranmaye Digital — home">
          <LotusMark className={styles.mark} />
          <span className={styles.word} aria-hidden="true">
            HIRANMAYE
            <small>DIGITAL</small>
          </span>
        </a>

        <nav className={styles.nav} aria-label="Primary">
          <ul role="list" className={styles.links}>
            {nav.map((item) => (
              <li key={item.href}>
                <a className={styles.link} href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <ButtonLink variant="pill" href={cta.href} className={styles.cta}>
            {cta.label}
          </ButtonLink>
          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={open}
            aria-controls={drawerId}
            onClick={() => setOpen((current) => !current)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </nav>
      </Container>

      <div id={drawerId} className={cx(styles.drawer, open && styles.drawerOpen)} inert={!open}>
        <ul role="list" className={styles.drawerLinks}>
          {[...nav, cta].map((item) => (
            <li key={item.label}>
              <a className={styles.drawerLink} href={item.href} onClick={close}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
