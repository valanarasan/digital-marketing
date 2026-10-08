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
  /**
   * The studio's own Google Maps listing ("Hiranmaye Digital", 1053, 30th Main Rd, near Sri Hari
   * Kalyana Mantapa): the share link, and the listing's "Embed a map" URL, which shows the
   * business by name rather than a bare coordinate pin.
   */
  office: {
    mapsUrl: 'https://maps.app.goo.gl/poNpXCZ6Qi8po6iX7',
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.6726752097325!2d77.56002367507568!3d12.928747087382732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15ac9c535569%3A0x54116009ca048b2e!2sHiranmaye%20Digital!5e0!3m2!1sen!2sin!4v1787122241068!5m2!1sen!2sin',
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
