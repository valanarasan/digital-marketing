import { useRef } from 'react';
import type { Solution, SolutionsContent } from '@/types/content';
import { resolveHref } from '@/lib/href';
import { EVENTS } from '@/lib/events';
import { useMotion } from '@/hooks';
import { riseScene } from '@/motion/scenes';
import { Container, TextLink } from '@/components/ui';
import styles from './SolutionsList.module.css';

export interface SolutionsListProps {
  content: SolutionsContent;
  solutions: Solution[];
}

/** Everything one solution says, in the order the brief gives it. Only the parts an entry has are rendered. */
function SolutionBody({ solution, content }: { solution: Solution; content: SolutionsContent }) {
  return (
    <div className={styles.main}>
      {solution.headline ? <p className={styles.headline}>{solution.headline}</p> : null}
      {solution.quote ? (
        <figure className={styles.quote}>
          <blockquote className={styles.headline}>
            <p>“{solution.quote.text}”</p>
          </blockquote>
          <figcaption className={styles.cite}>— {solution.quote.cite}</figcaption>
        </figure>
      ) : null}

      {solution.paragraphs.map((paragraph) => (
        <p key={paragraph} className={styles.body}>
          {paragraph}
        </p>
      ))}

      {solution.details ? (
        <dl className={styles.details}>
          {solution.details.map((detail) => (
            <div key={detail.label} className={styles.detail}>
              <dt className={styles.detailLabel}>{detail.label}</dt>
              <dd className={styles.detailText}>{detail.text}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {solution.facets ? (
        <ul role="list" className={styles.facets}>
          {solution.facets.map((facet) => (
            <li key={facet.name} className={styles.facet}>
              <span className={styles.facetName}>{facet.name}</span>
              <p className={styles.facetPromise}>{facet.promise}</p>
              <p className={styles.facetBody}>{facet.body}</p>
            </li>
          ))}
        </ul>
      ) : null}

      {solution.outcome ? (
        <div className={styles.outcome}>
          <span className={styles.outcomeLabel}>{content.outcomeLabel}</span>
          <p className={styles.outcomeText}>{solution.outcome}</p>
        </div>
      ) : null}

      {solution.closer ? <p className={styles.closer}>{solution.closer}</p> : null}

      <TextLink
        className={styles.cta}
        href={resolveHref(content.ctaHref)}
        data-track-event={EVENTS.SOLUTION_CTA_CLICKED}
      >
        {solution.cta ?? content.defaultCta}
      </TextLink>
    </div>
  );
}

/** The thirteen solutions, one row each: number and name pinned on the left, the detail on the right. */
export function SolutionsList({ content, solutions }: SolutionsListProps) {
  const ref = useRef<HTMLElement>(null);
  useMotion(ref, riseScene);

  return (
    <section ref={ref} className={styles.solutions} aria-label="All solutions">
      <Container>
        {solutions.map((solution, index) => (
          <article
            key={solution.id}
            id={solution.id}
            className={styles.solution}
            aria-labelledby={`${solution.id}-title`}
            data-anim="rise"
          >
            <div className={styles.side}>
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h2 id={`${solution.id}-title`} className={styles.name}>
                {solution.name}
              </h2>
            </div>
            <SolutionBody solution={solution} content={content} />
          </article>
        ))}
      </Container>
    </section>
  );
}
