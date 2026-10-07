import type {
  NavItem,
  PageHeroContent,
  PartnersContent,
  QuoteContent,
  StoryContent,
  TeamContent,
  VisionMissionContent,
  WhoContent,
} from '@/types/content';
import { who } from './home';

/**
 * Inside Hiranmaye (the About page), from "final_website_content.pdf", Page 2 and
 * Our Team. The founder bio is the second, edited version in the brief; the
 * LinkedIn "About" and headline options there are for LinkedIn, not the site.
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
  { label: 'Vision & Mission', href: '#vision' },
  { label: 'Our Team', href: '#team' },
  { label: 'Clients & Partners', href: '#clients' },
];

/** "Who we are" opens the page as it does on home, minus the link back to this page. */
export const aboutWho: WhoContent = { ...who, link: undefined };

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

/** Roles appear only where the brief gives one; profiles without a bio show the name alone. */
export const team: TeamContent = {
  kicker: 'Inside Hiranmaye',
  heading: 'Our Team',
  founderLabel: 'Meet the Founder',
  founder: {
    id: 'vijayalakshmi-girish',
    name: 'Vijayalakshmi Girish',
    role: 'Founder Director',
    bio: [
      'Vijayalakshmi leads strategy, planning, finance and sales at Hiranmaye Digital. She brings 17 years in the IT industry and is Managing Director of Gavin Technologies Pvt Ltd, where she oversees operations, finance and people.',
      'Five years ago, alongside her IT company, she launched Hiranmaye E-Mart, a clothing store that began during the pandemic and continues to operate today. Running it taught her what it takes to grow a business through efficient operations, careful inventory management and personalised customer service.',
      'A graduate of Bangalore University, she has handled the accounts of both companies. That financial discipline shapes how Hiranmaye Digital works: every rupee of marketing spend should have a reason and a return.',
    ],
  },
  teamLabel: 'Team',
  team: [
    {
      id: 'praveena-pradeep',
      name: 'Praveena Pradeep',
      bio: [
        'Praveena works closely with businesses to build their brands and strengthen their presence in the digital space. Her work spans digital marketing strategy, social media, content, branding and campaign planning, with a strong focus on understanding what each business actually needs to grow.',
        'Her interest in marketing comes from working closely with different businesses and seeing the challenges they face when trying to reach the right audience. She believes that good marketing starts with understanding the business, its customers and its goals before deciding what to communicate and where.',
        'Over time, Praveena has worked on a range of digital marketing projects, from developing social media strategies and content plans to shaping brand communication and executing digital campaigns. She enjoys being involved in both the creative and strategic sides of the work and believes the best ideas come from combining the two.',
        'Her approach is straightforward: create marketing that feels genuine, communicates clearly and serves a purpose. For Praveena, success is not just about how a brand looks online, but about how effectively its marketing helps the business connect with people and move forward.',
      ],
    },
    { id: 'harshitha-girish', name: 'Harshitha Girish', bio: [] },
  ],
  boardLabel: 'Board Members',
  board: [
    { id: 'saji-philip', name: 'Saji Philip', role: 'Board Member', bio: [] },
    {
      id: 'abhishek-mishra',
      name: 'Abhishek Mishra',
      role: 'Board Member',
      bio: [
        'Abhishek is a senior HR and Talent leader with nearly 21 years of experience across Talent Management, Leadership Development, HR Business Partnering, Consulting, Executive Coaching, and Organisational Change.',
        'He works closely with leadership teams as an advisor, mentor, sounding board, and problem-solving partner, helping them navigate complex people, talent, and organisational challenges with greater clarity.',
        'His experience spans talent and leadership strategy, culture and change, capability building, organisational transitions, and the people dimensions of business growth, including Global Capability Centres (GCCs).',
        'Combining strong business understanding with deep people expertise and behavioural insight, Abhishek brings an independent and practical perspective to help leaders understand challenges clearly, explore possibilities, and make informed decisions.',
      ],
    },
    { id: 'veena-prasad', name: 'Veena Prasad', role: 'Board Member', bio: [] },
  ],
  moreLabel: 'Read full profile',
};

export const partners: PartnersContent = {
  label: 'Our Partners',
  names: ['Jeeva'],
};
