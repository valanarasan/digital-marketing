import type { Business } from '@/types/content';

/**
 * Real business details — the single source of truth for every contact link.
 * The LinkedIn and Facebook URLs are inferred from the brand handles and should
 * be confirmed with the client before launch.
 */
export const business: Business = {
  name: 'Hiranmaye Digital',
  email: 'hiranmayemarketing@gmail.com',
  phoneDisplay: '+91 99006 68383',
  phoneDigits: '919900668383',
  address:
    '1053, 30th Main Road, Siddanna Layout, Banashankari 2nd Stage, Bengaluru, Karnataka 560070',
  city: 'Bengaluru, India',
  hours: 'Mon–Fri 9:30–18:30 · Sat 10:00–17:00',
  /** The exact pin from the studio's Google Maps listing (same as the first site's contact page). */
  office: {
    latitude: 12.9287471,
    longitude: 77.5625986,
    mapsUrl: 'https://maps.app.goo.gl/9Rc3dKfoq2m8jQLC8',
  },
  socials: [
    {
      network: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/company/hiranmayedigital',
    },
    {
      network: 'instagram',
      label: 'Instagram',
      href: 'https://www.instagram.com/hiranmaye_digital',
    },
    { network: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@Hiranmaye_Digital' },
    { network: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/hiranmayedigital' },
  ],
};
