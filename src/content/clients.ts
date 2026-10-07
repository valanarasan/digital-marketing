import type { Client, ClientsContent } from '@/types/content';

/** Copy carried over from the first site's clients section. */
export const clientsIntro: ClientsContent = {
  kicker: 'Our clients',
  heading: 'Businesses that',
  headingAccent: 'trusted us early.',
  lead: 'Across automotive, energy, hospitality, real estate and social impact — different markets, the same growth engine.',
};

/**
 * Each logo is the client's original file, byte for byte (only renamed for clean
 * URLs) — never recoloured, cropped or re-encoded. `tile` is the colour each file
 * is drawn on (#fefefe for the three with a faintly off-white canvas); KEJ is
 * white lettering on transparency, so it sits on the site's ink.
 */
export const clients: Client[] = [
  {
    id: 'moto-car-spa',
    name: 'Moto Car Spa',
    sector: 'Automotive care',
    logo: 'clients/moto-car-spa.png',
    width: 1774,
    height: 887,
    tile: '#fefefe',
  },
  {
    id: 'kej',
    name: 'KEJ — Key Emerging Journey',
    sector: 'Coaching and development',
    logo: 'clients/kej.png',
    width: 670,
    height: 338,
    tile: '#0a1424',
  },
  {
    id: 'yellow-gold-energy',
    name: 'Yellow Gold Energy',
    sector: 'Energy',
    logo: 'clients/yellow-gold-energy.jpg',
    width: 858,
    height: 500,
    tile: '#ffffff',
  },
  {
    id: 'natures-soul-resort',
    name: 'Nature’s Soul Resort',
    sector: 'Hospitality',
    logo: 'clients/natures-soul-resort.png',
    width: 1774,
    height: 887,
    tile: '#fefefe',
  },
  {
    id: 'sael',
    name: 'SAEL',
    sector: 'Social impact',
    logo: 'clients/sael.png',
    width: 447,
    height: 447,
    tile: '#ffffff',
  },
  {
    id: 'stern-promoters',
    name: 'Stern Promoters',
    sector: 'Real estate',
    logo: 'clients/stern-promoters.png',
    width: 1254,
    height: 1254,
    tile: '#fefefe',
  },
];
