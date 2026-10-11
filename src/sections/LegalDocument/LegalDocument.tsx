import type { LegalDocumentContent } from '@/types/content';
import { Container } from '@/components/ui';
import styles from './LegalDocument.module.css';

export interface LegalDocumentProps {
  content: LegalDocumentContent;
}

/** The body of a legal page: numbered sections of plain paragraphs and lists, set for reading. */
export function LegalDocument({ content }: LegalDocumentProps) {
  return (
    <section className={styles.document} aria-label={content.hero.title}>
      <Container>
        <div className={styles.column}>
          <p className={styles.updated}>{content.updated}</p>
          {content.sections.map((section, index) => (
            <section key={section.heading} className={styles.section}>
              <h2 className={styles.heading}>
                <span className={styles.number} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {section.heading}
              </h2>
              {section.blocks.map((block, blockIndex) =>
                typeof block === 'string' ? (
                  <p key={blockIndex}>{block}</p>
                ) : (
                  <ul key={blockIndex} className={styles.list}>
                    {block.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ),
              )}
            </section>
          ))}
        </div>
      </Container>
    </section>
  );
}
