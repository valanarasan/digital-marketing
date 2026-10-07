import { useRef } from 'react';
import type { Client, ClientsContent, PartnersContent } from '@/types/content';
import { useMotion } from '@/hooks';
import { clientsScene } from '@/motion/scenes';
import { Container, Kicker } from '@/components/ui';
import styles from './Clients.module.css';

export interface ClientsProps {
  content: ClientsContent;
  clients: Client[];
  /** Shown under the logos where the page calls for it (Inside Hiranmaye). */
  partners?: PartnersContent;
}

/**
 * "Businesses that trusted us early." Each client's own logo, shown whole and
 * untouched, on a tile painted the colour the artwork was drawn on, so the file's
 * edge never shows.
 */
export function Clients({ content, clients, partners }: ClientsProps) {
  const ref = useRef<HTMLElement>(null);
  useMotion(ref, clientsScene);

  return (
    <section ref={ref} id="clients" className={styles.clients} aria-labelledby="clients-title">
      <Container>
        <div className={styles.head} data-anim="head">
          <div>
            <Kicker className={styles.kicker}>{content.kicker}</Kicker>
            <h2 id="clients-title" className={styles.heading}>
              {content.heading} <span className={styles.accent}>{content.headingAccent}</span>
            </h2>
          </div>
          <p className={styles.lead}>{content.lead}</p>
        </div>

        <ul role="list" className={styles.grid} data-anim="grid">
          {clients.map((client) => (
            <li key={client.id} data-anim="client">
              <figure className={styles.figure}>
                <div className={styles.tile} style={{ backgroundColor: client.tile }}>
                  <img
                    className={styles.logo}
                    src={`${import.meta.env.BASE_URL}${client.logo}`}
                    alt={`${client.name} logo`}
                    width={client.width}
                    height={client.height}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <figcaption className={styles.caption}>
                  <span className={styles.name}>{client.name}</span>
                  <span className={styles.sector}>{client.sector}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        {partners ? (
          <div className={styles.partners}>
            <h3 className={styles.partnersLabel}>{partners.label}</h3>
            <ul role="list" className={styles.partnerList}>
              {partners.names.map((name) => (
                <li key={name} className={styles.partner}>
                  {name}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
