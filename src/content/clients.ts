import type { Client, ClientsContent } from '@/types/content';

/** Copy carried over from the first site's clients section. */
export const clientsIntro: ClientsContent = {
  kicker: 'Our clients',
  heading: 'Businesses that',
  headingAccent: 'trusted us early.',
  lead: 'Across automotive, energy, hospitality, real estate and social impact — different markets, the same growth engine.',
};

/**
 * The artwork is each client's own file, never recoloured or cropped. The three large PNGs
 * (about 0.9 MB each) are shipped as WebP at 1200 px (800 px for the square one), roughly 3x the
 * size they are shown, to keep the page light; the untouched originals are kept in
 * photos/clients/. The exception is KEJ: its PNG was small and pixel-doubled, so it is a vector
 * trace of that file (same shapes, same proportions) and stays sharp at any size. `tile` is the
 * colour each file is drawn on (#fefefe for the three with a faintly off-white canvas); KEJ is
 * white lettering on transparency, so it sits on the site's ink.
 */
export const clients: Client[] = [
  {
    id: 'moto-car-spa',
    name: 'Moto Car Spa',
    sector: 'Automotive care',
    logo: 'clients/moto-car-spa.webp',
    width: 1200,
    height: 600,
    tile: '#fefefe',
  },
  {
    id: 'kej',
    name: 'KEJ — Key Emerging Journey',
    sector: 'Coaching and development',
    logo: 'clients/kej.svg',
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
    logo: 'clients/natures-soul-resort.webp',
    width: 1200,
    height: 600,
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
    logo: 'clients/stern-promoters.webp',
    width: 800,
    height: 800,
    tile: '#fefefe',
  },
];
