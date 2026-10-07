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
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/hiranmayedigital' },
    { label: 'Instagram', href: 'https://www.instagram.com/hiranmaye_digital' },
    { label: 'YouTube', href: 'https://www.youtube.com/@Hiranmaye_Digital' },
    { label: 'Facebook', href: 'https://www.facebook.com/hiranmayedigital' },
  ],
};
