import { useRef } from 'react';
import type { CSSProperties } from 'react';
import type { Person, TeamContent } from '@/types/content';
import { cx } from '@/lib/cx';
import { useMotion } from '@/hooks';
import { riseScene } from '@/motion/scenes';
import { Container, Kicker, Monogram } from '@/components/ui';
import styles from './Team.module.css';

export interface TeamProps {
  content: TeamContent;
}

/** The person's photo filling its frame, or their initials on a soft panel until one arrives. */
function Portrait({
  person,
  className,
  style,
}: {
  person: Person;
  className: string;
  style?: CSSProperties;
}) {
  const { photo } = person;
  return (
    <div className={cx(styles.portrait, className)} style={style}>
      {photo ? (
        <img
          src={`${import.meta.env.BASE_URL}${photo.src}`}
          alt={`Portrait of ${person.name}`}
          width={photo.width}
          height={photo.height}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <Monogram name={person.name} className={styles.portraitMark} />
      )}
    </div>
  );
}

/** One profile: portrait, name, role where given, and the bio — the first paragraph open, the rest behind a disclosure. */
function PersonCard({ person, moreLabel }: { person: Person; moreLabel: string }) {
  const [first, ...rest] = person.bio;

  return (
    <article className={styles.card} data-anim="rise">
      <Portrait person={person} className={styles.cardPortrait} />
      <div className={styles.cardBody}>
        <h4 className={styles.name}>{person.name}</h4>
        {person.role ? <p className={styles.role}>{person.role}</p> : null}
        {first ? <p className={styles.bio}>{first}</p> : null}
        {rest.length > 0 ? (
          <details className={styles.more}>
            <summary className={styles.summary}>{moreLabel}</summary>
            {rest.map((paragraph) => (
              <p key={paragraph} className={styles.bio}>
                {paragraph}
              </p>
            ))}
          </details>
        ) : null}
      </div>
    </article>
  );
}

/** A leader's feature card: the portrait in its own proportions beside the name, role and full bio. */
function Leader({ person }: { person: Person }) {
  const { photo } = person;
  const frame = photo ? { aspectRatio: `${photo.width} / ${photo.height}` } : undefined;

  return (
    <div className={styles.founder} data-anim="rise">
      <Portrait person={person} className={styles.founderPortrait} style={frame} />
      <div className={styles.founderText}>
        <h4 className={styles.founderName}>{person.name}</h4>
        <p className={styles.role}>{person.role}</p>
        <div className={styles.founderBio}>
          {person.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Our Team: the founder and the directors together as leadership, then the advisors as cards. */
export function Team({ content }: TeamProps) {
  const ref = useRef<HTMLElement>(null);
  useMotion(ref, riseScene);
  const leaders = [content.founder, ...content.directors];

  return (
    <section ref={ref} id="team" className={styles.team} aria-labelledby="team-title">
      <Container>
        <Kicker className={styles.kicker}>{content.kicker}</Kicker>
        <h2 id="team-title" className={styles.heading}>
          {content.heading}
        </h2>

        <h3 className={styles.groupTitle}>{content.leadershipLabel}</h3>
        <div className={styles.leaders}>
          {leaders.map((person) => (
            <Leader key={person.id} person={person} />
          ))}
        </div>

        <h3 className={styles.groupTitle}>{content.advisorLabel}</h3>
        <ul role="list" className={styles.people}>
          {content.advisors.map((person) => (
            <li key={person.id}>
              <PersonCard person={person} moreLabel={content.moreLabel} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
