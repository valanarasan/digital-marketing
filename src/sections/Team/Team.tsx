import { Fragment, useRef } from 'react';
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
function Portrait({ person, className }: { person: Person; className: string }) {
  const { photo } = person;
  return (
    <div className={cx(styles.portrait, className)}>
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

/** Our Team: the founder in full, then the team, the board and the advisors as cards. */
export function Team({ content }: TeamProps) {
  const ref = useRef<HTMLElement>(null);
  useMotion(ref, riseScene);
  const { founder } = content;
  const groups = [
    { label: content.teamLabel, people: content.team },
    { label: content.boardLabel, people: content.board },
    { label: content.advisorLabel, people: content.advisors },
  ];

  return (
    <section ref={ref} id="team" className={styles.team} aria-labelledby="team-title">
      <Container>
        <Kicker className={styles.kicker}>{content.kicker}</Kicker>
        <h2 id="team-title" className={styles.heading}>
          {content.heading}
        </h2>

        <div className={styles.founder} data-anim="rise">
          <div className={styles.founderSide}>
            <h3 className={styles.groupTitle}>{content.founderLabel}</h3>
            <Portrait person={founder} className={styles.founderPortrait} />
          </div>
          <div className={styles.founderText}>
            <h4 className={styles.founderName}>{founder.name}</h4>
            <p className={styles.role}>{founder.role}</p>
            <div className={styles.founderBio}>
              {founder.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        {groups.map((group) => (
          <Fragment key={group.label}>
            <h3 className={styles.groupTitle}>{group.label}</h3>
            <ul role="list" className={styles.people}>
              {group.people.map((person) => (
                <li key={person.id}>
                  <PersonCard person={person} moreLabel={content.moreLabel} />
                </li>
              ))}
            </ul>
          </Fragment>
        ))}
      </Container>
    </section>
  );
}
