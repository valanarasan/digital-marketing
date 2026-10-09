import { useRef } from 'react';
import type { Business, FooterContent, NavItem, SocialLink } from '@/types/content';
import { cx } from '@/lib/cx';
import { resolveHref } from '@/lib/href';
import { EVENTS } from '@/lib/events';
import { whatsappLink } from '@/lib/whatsapp';
import { useMotion } from '@/hooks';
import { footerScene } from '@/motion/scenes';
import { BrandLogo, Container, MapEmbed, SocialIcon } from '@/components/ui';
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
            <a
              className={styles.pill}
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-track-event={EVENTS.FOOTER_WHATSAPP_CLICKED}
            >
              {content.whatsappCta}
            </a>

            <div className={styles.about}>
              <h2 className={styles.aboutKicker}>{content.about.kicker}</h2>
              <p className={styles.aboutPromise}>{content.about.promise}</p>
              <p className={styles.aboutBody}>{content.about.body}</p>
            </div>
          </div>

          <div>
            <ul role="list" className={styles.socials} aria-label="Social channels">
              {socials.map((social) => (
                <li key={social.network}>
                  <a
                    className={cx(styles.underline, styles.social)}
                    href={social.href}
                    data-track-event={
                      social.network === 'whatsapp'
                        ? EVENTS.FOOTER_WHATSAPP_CLICKED
                        : EVENTS.FOOTER_SOCIAL_CLICKED
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SocialIcon name={social.network} className={styles.socialIcon} />
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              className={styles.mail}
              href={`mailto:${business.email}`}
              data-track-event={EVENTS.FOOTER_EMAIL_CLICKED}
            >
              {business.email}
            </a>

            <div className={styles.columns}>
              <address className={styles.address}>
                <a
                  className={styles.phone}
                  href={`tel:+${business.phoneDigits}`}
                  data-track-event={EVENTS.FOOTER_PHONE_CLICKED}
                >
                  {business.phoneDisplay}
                </a>
                <span>{business.address}</span>
                <span>{business.hours}</span>
                <a
                  className={cx(styles.underline, styles.mapLink)}
                  href={business.office.mapsUrl}
                  data-track-event={EVENTS.FOOTER_MAP_LINK_CLICKED}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content.mapLink}
                </a>
              </address>
              <MapEmbed
                className={styles.map}
                src={business.office.embedUrl}
                title={content.mapTitle}
              />
              <nav aria-label="Footer">
                <ul role="list" className={styles.nav}>
                  {nav.map((item) => (
                    <li key={item.href}>
                      <a
                        className={styles.underline}
                        href={resolveHref(item.href)}
                        data-track-event={EVENTS.FOOTER_NAV_LINK_CLICKED}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <div className={styles.brand} data-anim="brand">
          <BrandLogo variant="full" className={styles.brandLogo} />
        </div>

        <div className={styles.legal}>
          <span>
            © {year} {business.name}. All rights reserved.
          </span>
          <ul role="list" className={styles.legalLinks}>
            {content.legal.map((item) => (
              <li key={item.label}>
                <a href={item.href} data-track-event={EVENTS.FOOTER_LEGAL_LINK_CLICKED}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
