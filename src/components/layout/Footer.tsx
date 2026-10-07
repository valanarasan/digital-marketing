import { useRef } from 'react';
import type { Business, FooterContent, NavItem, SocialLink } from '@/types/content';
import { cx } from '@/lib/cx';
import { mapEmbedUrl } from '@/lib/maps';
import { whatsappLink } from '@/lib/whatsapp';
import { useMotion } from '@/hooks';
import { footerScene } from '@/motion/scenes';
import { Container, MapEmbed, SocialIcon } from '@/components/ui';
import styles from './Footer.module.css';

export interface FooterProps {
  content: FooterContent;
  business: Business;
  nav: NavItem[];
}

export function Footer({ content, business, nav }: FooterProps) {
  const ref = useRef<HTMLElement>(null);
  useMotion(ref, footerScene);

  const whatsapp = whatsappLink(business.phoneDigits);
  const socials: SocialLink[] = [
    ...business.socials,
    { network: 'whatsapp', label: 'WhatsApp', href: whatsapp },
  ];
  const year = new Date().getFullYear();

  return (
    <footer ref={ref} id="contact" className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <div className={styles.ask}>
            <p className={styles.prompt}>{content.prompt}</p>
            <p>{content.promptSub}</p>
            <a className={styles.pill} href={whatsapp} target="_blank" rel="noopener noreferrer">
              {content.whatsappCta}
            </a>
          </div>

          <div>
            <ul role="list" className={styles.socials} aria-label="Social channels">
              {socials.map((social) => (
                <li key={social.network}>
                  <a
                    className={cx(styles.underline, styles.social)}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SocialIcon name={social.network} className={styles.socialIcon} />
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>

            <a className={styles.mail} href={`mailto:${business.email}`}>
              {business.email}
            </a>

            <div className={styles.columns}>
              <address className={styles.address}>
                <a className={styles.phone} href={`tel:+${business.phoneDigits}`}>
                  {business.phoneDisplay}
                </a>
                <span>{business.address}</span>
                <span>{business.hours}</span>
                <a
                  className={cx(styles.underline, styles.mapLink)}
                  href={business.office.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content.mapLink}
                </a>
              </address>
              <MapEmbed
                className={styles.map}
                src={mapEmbedUrl(business.office)}
                title={content.mapTitle}
              />
              <nav aria-label="Footer">
                <ul role="list" className={styles.nav}>
                  {nav.map((item) => (
                    <li key={item.href}>
                      <a className={styles.underline} href={item.href}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <p className={styles.wordmark} data-anim="wordmark" aria-hidden="true">
          {Array.from(content.wordmark).map((letter, index) => (
            <span key={`${letter}-${index}`} className={styles.letter} data-anim="letter">
              {letter}
            </span>
          ))}
        </p>

        <div className={styles.legal}>
          <span>
            © {year} {business.name}. All rights reserved.
          </span>
          <ul role="list" className={styles.legalLinks}>
            {content.legal.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
