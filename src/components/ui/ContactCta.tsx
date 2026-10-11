import { useEffect, useId, useRef, useState } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { business, inquiry } from '@/content';
import { EVENTS } from '@/lib/events';
import type { EventName } from '@/lib/events';
import { whatsappLink } from '@/lib/whatsapp';
import { ButtonLink } from './ButtonLink';
import { SocialIcon } from './SocialIcon';
import styles from './ContactCta.module.css';

export interface ContactCtaProps {
  label?: string;
  /** Custom button content; with it the trigger is a plain link carrying only `className`. */
  children?: ReactNode;
  variant?: 'solid' | 'pill';
  className?: string;
  /** Analytics event for the button itself; the choices inside send their own. */
  trackEvent: EventName;
  /** Called when the popup opens, e.g. to fold the mobile menu away behind it. */
  onOpen?: () => void;
}

/**
 * A call to action that asks how to get in touch — email, Instagram or WhatsApp —
 * instead of scrolling away. It stays a real link to the contact footer, so it
 * still works if the script has not loaded.
 */
export function ContactCta({
  label,
  children,
  variant,
  className,
  trackEvent,
  onOpen,
}: ContactCtaProps) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    dialogRef.current?.querySelector<HTMLElement>('a, button')?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      if (trigger?.isConnected) trigger.focus();
    };
  }, [open]);

  const show = (event: MouseEvent) => {
    event.preventDefault();
    onOpen?.();
    setOpen(true);
  };
  const close = () => setOpen(false);

  const instagram = business.socials.find((social) => social.network === 'instagram');
  const choices = [
    {
      key: 'email',
      label: 'Email',
      detail: business.email,
      href: `mailto:${business.email}?subject=${encodeURIComponent(inquiry.subject)}&body=${encodeURIComponent(inquiry.message)}`,
      event: EVENTS.CONTACT_EMAIL_CHOSEN,
      icon: <MailIcon className={styles.icon} />,
    },
    {
      key: 'instagram',
      label: 'Instagram',
      detail: 'Message copied — just paste it',
      href: instagram?.href ?? '',
      event: EVENTS.CONTACT_INSTAGRAM_CHOSEN,
      icon: <SocialIcon name="instagram" className={styles.icon} />,
    },
    {
      key: 'whatsapp',
      label: 'WhatsApp',
      detail: business.phoneDisplay,
      href: whatsappLink(business.phoneDigits, inquiry.message),
      event: EVENTS.CONTACT_WHATSAPP_CHOSEN,
      icon: <SocialIcon name="whatsapp" className={styles.icon} />,
    },
  ];

  return (
    <>
      {children ? (
        <a
          ref={triggerRef}
          href="#contact"
          className={className}
          aria-haspopup="dialog"
          data-track-event={trackEvent}
          onClick={show}
        >
          {children}
        </a>
      ) : (
        <ButtonLink
          ref={triggerRef}
          variant={variant}
          href="#contact"
          className={className}
          aria-haspopup="dialog"
          data-track-event={trackEvent}
          onClick={show}
        >
          {label}
        </ButtonLink>
      )}
      {open
        ? createPortal(
            <div className={styles.backdrop} onClick={close}>
              <div
                ref={dialogRef}
                className={styles.dialog}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                onClick={(event) => event.stopPropagation()}
              >
                <button type="button" className={styles.close} aria-label="Close" onClick={close}>
                  ×
                </button>
                <h2 id={titleId} className={styles.title}>
                  How would you like to reach us?
                </h2>
                <ul role="list" className={styles.choices}>
                  {choices.map((choice) => (
                    <li key={choice.key}>
                      <a
                        className={styles.choice}
                        href={choice.href}
                        data-track-event={choice.event}
                        {...(choice.key === 'email'
                          ? {}
                          : { target: '_blank', rel: 'noopener noreferrer' })}
                        onClick={() => {
                          // Instagram cannot take a prefilled message, so hand it over via the clipboard.
                          if (choice.key === 'instagram') {
                            void navigator.clipboard?.writeText(inquiry.message).catch(() => {});
                          }
                          close();
                        }}
                      >
                        {choice.icon}
                        <span className={styles.text}>
                          <span className={styles.name}>{choice.label}</span>
                          <span className={styles.detail}>{choice.detail}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
