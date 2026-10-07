import { useId, useRef } from 'react';
import type { ReactNode } from 'react';
import type { NavItem, PageHeroContent } from '@/types/content';
import { resolveHref } from '@/lib/href';
import { useMotion } from '@/hooks';
import { pageHeroScene } from '@/motion/scenes';
import { BrandLogo, Container, Kicker } from '@/components/ui';
import styles from './PageHero.module.css';

export interface PageHeroProps {
  /** The site header sits inside the band, as it does in the home hero. */
  header: ReactNode;
  content: PageHeroContent;
  /** Id given to the title block — the skip link's target. */
  contentId: string;
  /** Optional in-page index, shown as chips under the title. */
  index?: NavItem[];
  indexLabel?: string;
}

/** The dark band that opens an inner page: kicker, a big title with a gold accent, and an optional index. */
export function PageHero({ header, content, contentId, index, indexLabel }: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const titleId = useId();
  useMotion(ref, pageHeroScene);

  return (
    <section ref={ref} className={styles.hero} aria-labelledby={titleId}>
      <div className={styles.watermark} data-anim="watermark" aria-hidden="true">
        <BrandLogo variant="mark" decorative />
      </div>

      {header}

      <Container className={styles.body}>
        <div id={contentId} tabIndex={-1} className={styles.head}>
          <div data-anim="hero-item">
            <Kicker className={styles.kicker}>{content.kicker}</Kicker>
          </div>
          <h1 id={titleId} className={styles.title} data-anim="hero-item">
            {content.title}
            {content.titleAccent ? (
              <>
                {' '}
                <span className={styles.accent}>{content.titleAccent}</span>
              </>
            ) : null}
          </h1>
          {content.intro ? (
            <p className={styles.intro} data-anim="hero-item">
              {content.intro}
            </p>
          ) : null}
        </div>

        {index ? (
          <nav className={styles.indexNav} aria-label={indexLabel} data-anim="hero-item">
            <ul role="list" className={styles.index}>
              {index.map((item) => (
                <li key={item.href}>
                  <a className={styles.indexLink} href={resolveHref(item.href)}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </Container>
    </section>
  );
}
