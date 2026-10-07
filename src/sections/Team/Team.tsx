import { useRef } from 'react';
import type { Person, TeamContent } from '@/types/content';
import { useMotion } from '@/hooks';
import { riseScene } from '@/motion/scenes';
import { Container, Kicker, Monogram } from '@/components/ui';
import styles from './Team.module.css';

export interface TeamProps {
  content: TeamContent;
}

/** One profile: monogram, name, role where given, and the bio — the first paragraph open, the rest behind a disclosure. */
function PersonCard({ person, moreLabel }: { person: Person; moreLabel: string }) {
  const [first, ...rest] = person.bio;

  return (
    <article className={styles.card} data-anim="rise">
      <div className={styles.cardHead}>
        <Monogram name={person.name} />
        <div>
          <h4 className={styles.name}>{person.name}</h4>
          {person.role ? <p className={styles.role}>{person.role}</p> : null}
        </div>
      </div>
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
    </article>
  );
}

/** Our Team: the founder in full, then the team and the board as cards. */
export function Team({ content }: TeamProps) {
  const ref = useRef<HTMLElement>(null);
  useMotion(ref, riseScene);
  const { founder } = content;

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
            <Monogram name={founder.name} className={styles.founderMark} />
            <h4 className={styles.founderName}>{founder.name}</h4>
            <p className={styles.role}>{founder.role}</p>
          </div>
          <div className={styles.founderBio}>
            {founder.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <h3 className={styles.groupTitle}>{content.teamLabel}</h3>
        <ul role="list" className={styles.people}>
          {content.team.map((person) => (
            <li key={person.id}>
              <PersonCard person={person} moreLabel={content.moreLabel} />
            </li>
          ))}
        </ul>

        <h3 className={styles.groupTitle}>{content.boardLabel}</h3>
        <ul role="list" className={styles.people}>
          {content.board.map((person) => (
            <li key={person.id}>
              <PersonCard person={person} moreLabel={content.moreLabel} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
