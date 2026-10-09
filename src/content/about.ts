import type {
  NavItem,
  PageHeroContent,
  PartnersContent,
  QuoteContent,
  StoryContent,
  TeamContent,
  VisionMissionContent,
} from '@/types/content';

/**
 * Inside Hiranmaye (the About page), from "final_website_content.pdf", Page 2 and
 * Our Team, plus the profiles the client supplied later. The LinkedIn "About" and
 * headline options in the brief are for LinkedIn, not the site.
 */

export const aboutHero: PageHeroContent = {
  kicker: 'About us',
  title: 'Inside',
  titleAccent: 'Hiranmaye.',
  intro: 'We build brands that are easier to discover, harder to ignore and engineered to grow!',
};

/** Chips under the title, jumping to each part of the page. */
export const aboutIndexLabel = 'On this page';
export const aboutIndex: NavItem[] = [
  { label: 'Who we are', href: '#about' },
  { label: 'Our story', href: '#story' },
  { label: 'Why us', href: '#why-us' },
  { label: 'Vision & Mission', href: '#vision' },
  { label: 'Our Team', href: '#team' },
  { label: 'Clients & Partners', href: '#clients' },
];

export const story: StoryContent = {
  kicker: 'Our story',
  lead: 'We started with a question:',
  question: 'why is so much marketing so busy, and so little of it actually connected to growth?',
  paragraphs: [
    'HIRANMAYE DIGITAL was founded with a simple yet powerful vision: to bridge the gap between marketing activities and real business outcomes.',
    'Many businesses invest heavily in digital marketing without seeing meaningful returns because they lack a clear strategy. We recognized the need for a more consultative, transparent, and results-oriented approach.',
    'From this vision, HIRANMAYE DIGITAL was established as a business growth partner that combines strategic planning, creative execution, advanced analytics, AI-powered marketing, and continuous optimization to deliver measurable success.',
    'Today, we continue to help businesses navigate the ever-changing digital landscape with confidence, clarity, and purpose.',
  ],
};

/** "The best marketing doesn’t feel like marketing." — placed here, as the brief asks, outside "Why us?". */
export const quote: QuoteContent = {
  text: 'The best marketing doesn’t feel like marketing.',
  cite: 'Tom Fishburne',
};

/** The brief reads "To Scale Up our Client's Revenue & Sales !!"; set here in sentence case. */
export const visionMission: VisionMissionContent = {
  vision: { label: 'Vision', text: 'To scale up our clients’ revenue & sales!' },
  mission: {
    label: 'Mission',
    text: 'To help businesses achieve sustainable revenue and sales growth through strategic digital marketing, creative solutions, technology, and measurable performance.',
  },
};

/**
 * Short bios (8 Oct 2026), condensed from the brief and the profiles the client supplied —
 * every fact is theirs, nothing added. Roles appear only where given; a profile without a
 * bio shows the name alone. Photos are the client's own, upscaled 2× (EDSR) and cropped to
 * the frame — the founder 4:5, everyone else 5:4 (see photos/team/README.md). Without one,
 * the initials stand in.
 */
export const team: TeamContent = {
  kicker: 'Inside Hiranmaye',
  heading: 'Our Team',
  founderLabel: 'Meet the Founder',
  founder: {
    id: 'vijayalakshmi-girish',
    name: 'Vijayalakshmi Girish',
    role: 'Founder Director',
    photo: { src: 'team/vijayalakshmi-girish.webp', width: 900, height: 1125 },
    bio: [
      'Vijayalakshmi leads strategy, planning, finance and sales at Hiranmaye Digital. She brings 17 years in the IT industry and is Managing Director of Gavin Technologies Pvt Ltd.',
      'She also launched Hiranmaye E-Mart, a clothing store started during the pandemic, and has handled the accounts of both businesses. That discipline shapes how we work: every rupee of marketing spend should have a reason and a return.',
    ],
  },
  teamLabel: 'Team',
  team: [
    {
      id: 'praveena-pradeep',
      name: 'Praveena Pradeep',
      photo: { src: 'team/praveena-pradeep.webp', width: 900, height: 720 },
      bio: [
        'Praveena helps businesses build their brands and strengthen their digital presence, across strategy, social media, content, branding and campaign planning. She starts with the business, its customers and its goals, and makes marketing that feels genuine, communicates clearly and serves a purpose.',
      ],
    },
    {
      id: 'harshitha-girish',
      name: 'Harshitha Girish',
      photo: { src: 'team/harshitha-girish.webp', width: 900, height: 720 },
      bio: [
        'Harshitha is a marketing and business professional and an Associate Partner at Restless Dreamers, where she leads curriculum, sales strategy and student training. She has worked with The LIT School, Snapchat and Under25 across customer acquisition, marketing strategy, content and creator-led businesses. She holds a BBA in Marketing from Christ (Deemed to be) University and is pursuing an MSc in International Business at the University of Birmingham.',
      ],
    },
  ],
  boardLabel: 'Board Members',
  board: [
    {
      id: 'abhishek-mishra',
      name: 'Abhishek Mishra',
      role: 'Board Member',
      photo: { src: 'team/abhishek-mishra.webp', width: 900, height: 720 },
      bio: [
        'Abhishek is a senior HR and talent leader with nearly 21 years across talent management, leadership development, HR business partnering, consulting and executive coaching. He advises leadership teams on people, talent and organisational change, including in Global Capability Centres (GCCs).',
      ],
    },
  ],
  advisorLabel: 'Advisor',
  advisors: [
    {
      id: 'saji-philip',
      name: 'Saji Philip',
      role: 'Independent External Advisor',
      photo: { src: 'team/saji-philip.webp', width: 900, height: 720 },
      bio: [
        'Saji is a global Solar and Battery Energy Storage Systems (BESS) leader with over 25 years across energy, infrastructure, global trade, project development and go-to-market strategy. His work across RedAmber, Yellow Gold Energy and SAEL Energy Solutions spans the clean-energy value chain, with markets in the Middle East, Europe, South Asia and Africa. He brings Hiranmaye Digital a global, commercial view of growth.',
      ],
    },
  ],
  moreLabel: 'Read full profile',
};

export const partners: PartnersContent = {
  label: 'Our Partners',
  names: ['Jeeva'],
};
