import { useEffect, useId, useState } from 'react';
import type { NavItem, PageId } from '@/types/content';
import { cx } from '@/lib/cx';
import { resolveHref } from '@/lib/href';
import { EVENTS } from '@/lib/events';
import { track } from '@/lib/analytics';
import { BrandLogo, ButtonLink, Container } from '@/components/ui';
import styles from './Header.module.css';

export interface HeaderProps {
  nav: NavItem[];
  cta: NavItem;
  /** The page being shown; its menu link is marked as the current page. */
  current: PageId;
}

/**
 * Brand, page links and the call to action. On narrow screens the links fold
 * into a drawer that closes on Escape and on any link tap — including the page
 * you are already on.
 */
export function Header({ nav, cta, current }: HeaderProps) {
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

  const ariaCurrent = (item: NavItem) => (item.page === current ? 'page' : undefined);

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <a
          className={styles.logo}
          href={resolveHref('')}
          aria-label="Hiranmaye Digital — home"
          data-track-event={EVENTS.HEADER_LOGO_CLICKED}
        >
          <BrandLogo variant="name" className={styles.brand} decorative />
        </a>

        <nav className={styles.nav} aria-label="Primary">
          <ul role="list" className={styles.links}>
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  className={styles.link}
                  data-track-event={EVENTS.HEADER_NAV_LINK_CLICKED}
                  href={resolveHref(item.href)}
                  aria-current={ariaCurrent(item)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <ButtonLink
            variant="pill"
            href={resolveHref(cta.href)}
            className={styles.cta}
            data-track-event={EVENTS.HEADER_CTA_CLICKED}
          >
            {cta.label}
          </ButtonLink>
          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={open}
            aria-controls={drawerId}
            onClick={() => {
              track(EVENTS.MOBILE_MENU_TOGGLED, { menu_state: open ? 'closed' : 'opened' });
              setOpen((current) => !current);
            }}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </nav>
      </Container>

      <div id={drawerId} className={cx(styles.drawer, open && styles.drawerOpen)} inert={!open}>
        <ul role="list" className={styles.drawerLinks}>
          {[...nav, cta].map((item) => (
            <li key={item.label}>
              <a
                className={styles.drawerLink}
                data-track-event={EVENTS.MOBILE_NAV_LINK_CLICKED}
                href={resolveHref(item.href)}
                aria-current={ariaCurrent(item)}
                onClick={close}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
