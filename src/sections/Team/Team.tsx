import { useId, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import type { Person, TeamContent } from '@/types/content';
import { cx } from '@/lib/cx';
import { useModal, useMotion } from '@/hooks';
import { riseScene } from '@/motion/scenes';
import { Container, Kicker, Monogram, SocialIcon } from '@/components/ui';
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

/** The card's short text: the supplied summary, or the first paragraph of the bio. */
const summaryOf = (person: Person) => person.summary ?? person.bio[0];

/** Opens a person's full profile in a dialog, so a long bio never changes the card's height. */
function ProfileButton({
  person,
  content,
  className,
}: {
  person: Person;
  content: TeamContent;
  className: string;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const close = () => setOpen(false);
  useModal(open, dialogRef, close, triggerRef);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={className}
        aria-haspopup="dialog"
        aria-label={`${content.moreLabel}: ${person.name}`}
        onClick={() => setOpen(true)}
      >
        {content.moreLabel}
      </button>
      {open
        ? createPortal(
            <div
              className={styles.backdrop}
              onClick={(event) => {
                if (event.target === event.currentTarget) close();
              }}
            >
              <div
                ref={dialogRef}
                className={styles.dialog}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                tabIndex={-1}
                data-lenis-prevent
              >
                <button
                  type="button"
                  className={styles.close}
                  aria-label={content.closeLabel}
                  onClick={close}
                >
                  ×
                </button>
                <div className={styles.dialogHead}>
                  <h2 id={titleId} className={styles.dialogName}>
                    {person.name}
                  </h2>
                  {person.linkedinUrl ? (
                    <a
                      className={styles.linkedin}
                      href={person.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${person.name} on ${content.linkedinLabel} (opens in a new tab)`}
                    >
                      <SocialIcon name="linkedin" className={styles.linkedinIcon} />
                    </a>
                  ) : null}
                </div>
                {person.role ? <p className={styles.role}>{person.role}</p> : null}
                {person.focus ? <p className={styles.dialogFocus}>{person.focus}</p> : null}
                <div className={styles.dialogBody}>
                  {person.bio.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {person.education ? (
                  <>
                    <h3 className={styles.dialogLabel}>{content.educationLabel}</h3>
                    <ul role="list" className={styles.facts}>
                      {person.education.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </>
                ) : null}
                {person.tagline ? <p className={styles.tagline}>{person.tagline}</p> : null}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

/** An advisor's card: portrait, name, role, focus and summary, with the full profile one click away. */
function PersonCard({ person, content }: { person: Person; content: TeamContent }) {
  const summary = summaryOf(person);

  return (
    <article className={styles.card} data-anim="rise">
      <Portrait person={person} className={styles.cardPortrait} />
      <div className={styles.cardBody}>
        <h4 className={styles.name}>{person.name}</h4>
        {person.role ? <p className={styles.role}>{person.role}</p> : null}
        {person.focus ? <p className={styles.focus}>{person.focus}</p> : null}
        {summary ? <p className={styles.bio}>{summary}</p> : null}
        {person.bio.length > 0 ? (
          <ProfileButton person={person} content={content} className={styles.summary} />
        ) : null}
      </div>
    </article>
  );
}

/** A leader's feature card: the portrait in its own proportions beside the name, role and summary. */
function Leader({ person, content }: { person: Person; content: TeamContent }) {
  const { photo } = person;
  const frame = photo ? { aspectRatio: `${photo.width} / ${photo.height}` } : undefined;

  return (
    <div className={styles.founder} data-anim="rise">
      <Portrait person={person} className={styles.founderPortrait} style={frame} />
      <div className={styles.founderText}>
        <h4 className={styles.founderName}>{person.name}</h4>
        <p className={styles.role}>{person.role}</p>
        {person.focus ? <p className={styles.focus}>{person.focus}</p> : null}
        <div className={styles.founderBio}>
          <p>{summaryOf(person)}</p>
        </div>
        <ProfileButton person={person} content={content} className={styles.summary} />
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
            <Leader key={person.id} person={person} content={content} />
          ))}
        </div>

        <h3 className={styles.groupTitle}>{content.advisorLabel}</h3>
        <ul role="list" className={styles.people}>
          {content.advisors.map((person) => (
            <li key={person.id}>
              <PersonCard person={person} content={content} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
