import type {
  FooterContent,
  HeroContent,
  Lever,
  NavItem,
  Problem,
  ProcessContent,
  ProcessStep,
  ServicesContent,
  StatementContent,
  TrustContent,
  WhoContent,
} from '@/types/content';

/** Home page copy, taken from "Hiranmaye Digital Latest.docx". */

export const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export const navCta: NavItem = { label: 'Let’s talk growth', href: '#contact' };

export const hero: HeroContent = {
  eyebrow: 'Strategy × Creativity × Technology',
  location: 'Bengaluru, India',
  lead: ['Marketing that doesn’t', 'just create'],
  noiseWord: 'noise.',
  payoff: 'It creates momentum.',
  subcopy:
    'HIRANMAYE DIGITAL helps ambitious businesses turn fragmented marketing into a cohesive growth engine. We combine strategic intelligence, creative firepower, AI-enabled systems and performance marketing to build brands that are easier to discover, harder to ignore and engineered to grow.',
  primaryCta: { label: 'Let’s talk growth', href: '#contact' },
  secondaryCta: { label: 'Explore our capabilities', href: '#services' },
  question: 'What’s holding your growth back?',
  scrollCue: 'Scroll to explore',
};

export const levers: Lever[] = [
  { id: 'found', title: 'Get Found', services: ['SEO', 'AEO', 'GEO', 'Content Strategy'] },
  {
    id: 'noticed',
    title: 'Get Noticed',
    services: ['Branding', 'Creative Design', 'Social Media', 'Outdoor Branding'],
  },
  {
    id: 'chosen',
    title: 'Get Chosen',
    services: ['Website Experience', 'Conversion Strategy', 'Content'],
  },
  {
    id: 'results',
    title: 'Get Results',
    services: ['Meta Ads', 'Google Ads', 'Performance Marketing'],
  },
  {
    id: 'smarter',
    title: 'Get Smarter',
    services: ['AI Marketing', 'Automation', 'Business Consulting'],
  },
];

export const problems: Problem[] = [
  { id: 'leads', label: 'Not Enough Leads', lever: 'found' },
  { id: 'brand', label: 'Weak Brand Presence', lever: 'noticed' },
  { id: 'conversion', label: 'Poor Website Conversion', lever: 'chosen' },
  { id: 'ad-costs', label: 'High Ad Costs', lever: 'results' },
  { id: 'strategy', label: 'No Clear Strategy', lever: 'smarter' },
];

export const trust: TrustContent = {
  label: 'Built for businesses at every stage of ambition.',
  tag: 'Stage × Sector',
  stages: ['Startups', 'Scale-ups', 'SMEs', 'Enterprises'],
  sectors: ['Manufacturing', 'Real Estate', 'Healthcare', 'Education', 'Professional Services'],
};

export const who: WhoContent = {
  kicker: 'Who we are',
  statement: [
    'Most',
    'businesses',
    'don’t',
    'have',
    'a',
    'marketing',
    'problem.',
    'They',
    'have',
    'a',
  ],
  emphasis: ['fragmentation', 'problem.'],
  problem:
    'Their website says one thing. Their advertising says another. Their social media is active but directionless. Their campaigns generate numbers, but nobody can confidently explain what those numbers mean for the business.',
  answerLead: 'HIRANMAYE DIGITAL exists to bring the pieces together.',
  answer:
    'We connect business objectives with brand strategy, digital infrastructure, creative communication, paid media, search visibility and intelligent automation, so marketing stops functioning as a series of isolated activities and starts operating as a coordinated growth system.',
};

export const statement: StatementContent = {
  intro: 'Because',
  negations: [
    ['impressions', 'are not growth.'],
    ['Followers', 'are not growth.'],
    ['Traffic', 'is not growth.'],
  ],
  payoff: 'What matters is what moves the business forward; that is growth.',
};

export const services: ServicesContent = {
  kicker: 'Our capabilities',
  headingLines: ['One Growth Partner.', 'Multiple Growth'],
  headingAccent: 'Levers.',
};

export const processIntro: ProcessContent = {
  label: '© How we work',
  range: 'Diagnose → Compound',
  headingLead: 'From “We Need Marketing” to',
  headingAccent: '“We Know What’s Working.”',
  cta: { label: 'Let’s talk growth', href: '#contact' },
};

export const processSteps: ProcessStep[] = [
  {
    id: 'diagnose',
    name: 'Diagnose',
    headline: 'We interrogate the business before we recommend the solution.',
    body: 'We examine your objectives, audience behaviour, market dynamics, competitive environment and existing digital ecosystem.',
  },
  {
    id: 'architect',
    name: 'Architect',
    headline: 'We turn insight into a commercially intelligent strategy.',
    body: 'Clear priorities. Clear positioning. Clear channels. Clear KPIs.',
  },
  {
    id: 'activate',
    name: 'Activate',
    headline: 'Strategy leaves the presentation deck and enters the market.',
    body: 'Campaigns, content, websites, advertising, automation and creative execution, activated with purpose.',
  },
  {
    id: 'optimise',
    name: 'Optimise',
    headline: 'We don’t fall in love with ideas. We follow the evidence.',
    body: 'We monitor performance, identify friction and continuously improve what matters.',
  },
  {
    id: 'compound',
    name: 'Compound',
    headline: 'What works gets stronger. What doesn’t gets smarter.',
    body: 'Successful systems are scaled to create momentum that compounds over time.',
  },
];

export const footer: FooterContent = {
  prompt: 'Let’s talk growth.',
  promptSub: 'Tell us where the business needs to go.',
  whatsappCta: 'Message us on WhatsApp',
  mapTitle: 'Map of the Hiranmaye Digital office in Banashankari 2nd Stage, Bengaluru',
  mapLink: 'Open in Google Maps',
  wordmark: 'Hiranmaye',
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms', href: '#' },
  ],
};

export const footerNav: NavItem[] = [{ label: 'Home', href: '#top' }, ...navItems];
