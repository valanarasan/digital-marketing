import type {
  NavItem,
  PageHeroContent,
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
  titleAccent: 'Hiranmaye...',
  intro: 'We build brands that are easier to discover, harder to ignore and engineered to grow!',
};

/** Chips under the title, jumping to each part of the page. */
export const aboutIndexLabel = 'On this page';
export const aboutIndex: NavItem[] = [
  { label: 'Who we are', href: '#about' },
  { label: 'Vision & Mission', href: '#vision' },
  { label: 'Our Team', href: '#team' },
  { label: 'Our story', href: '#story' },
  { label: 'Why us', href: '#why-us' },
  { label: 'Clients', href: '#clients' },
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

/** The pull quote that closes the page, between "Why us?" and the clients (client's choice, Oct 2026; was Tom Fishburne). */
export const quote: QuoteContent = {
  text: 'In the world of business, the people who are most successful are those who are doing what they love.',
  cite: 'Warren Buffett',
};

export const visionMission: VisionMissionContent = {
  vision: {
    label: 'Vision',
    text: 'To become a globally trusted growth partner, empowering businesses to unlock their full potential, achieve sustainable growth, and create lasting impact.',
  },
  mission: {
    label: 'Mission',
    text: 'To help businesses achieve sustainable revenue and sales growth through strategic digital marketing, creative solutions, technology, and measurable performance.',
  },
};

/**
 * The team, from the profiles the client supplied (Oct 2026). Each card shows a short summary;
 * the full profile (a short bio, education, tagline, LinkedIn) opens in a dialog. Photos are
 * the client's own, cropped to the frame, the founder 4:5, everyone else 5:4 (see
 * photos/team/README.md). Without one, the initials stand in.
 */
export const team: TeamContent = {
  kicker: 'Inside Hiranmaye',
  heading: 'Our Team',
  leadershipLabel: 'Leadership',
  founder: {
    id: 'vijayalakshmi-girish',
    name: 'Vijayalakshmi Girish',
    role: 'Founder Director',
    focus: 'Finance, Operations and Sales',
    photo: { src: 'team/vijayalakshmi-girish.webp', width: 900, height: 1125 },
    summary:
      'A resilient entrepreneur, visionary leader and business strategist with over 17 years of experience as Managing Director of Gavin Technologies, and now a Director of Hiranmaye E Mart. She is the driving force behind Hiranmaye Digital and is passionate about empowering women.',
    education: ['Bangalore University: Bachelor of Commerce (BCom), Business/Commerce, General'],
    bio: [
      'Vijayalakshmi is a resilient entrepreneur and business strategist who led Gavin Technologies as Managing Director and continues to lead Hiranmaye E Mart Pvt. Ltd. As the driving force behind Hiranmaye Digital, she envisions empowering businesses through strategic digital marketing and sustainable growth. She is also a Reiki Grand Master, deeply passionate about empowering women to discover their potential and become independent leaders.',
    ],
    tagline:
      'Resilient in Spirit. Visionary in Business. Relentless in Growth. Passionate About Empowering Women.',
    linkedinUrl: 'https://www.linkedin.com/in/vijayalakshmi-girish-b0239949/',
  },
  directors: [
    {
      id: 'praveena-pradeep',
      name: 'Praveena Pradeep',
      role: 'Director',
      focus: 'Technology and Operations',
      photo: { src: 'team/praveena-pradeep.webp', width: 900, height: 720 },
      summary:
        'A dynamic young leader with an MBA in Finance and Marketing and over five years in digital marketing. She combines technical expertise with strategic thinking to turn ideas into impactful business outcomes.',
      education: [
        'Bharathiar University, Coimbatore: Master of Business Administration, Marketing and Finance',
      ],
      bio: [
        'Praveena is a dynamic young leader with an MBA in Finance and Marketing from Bharathiar University, Coimbatore, and over five years of digital marketing experience across SEO, AEO, social media, Google and Meta Ads, content strategy and web analytics. She brings innovation, creativity and business acumen to her role as Director, and is passionate about challenging conventional thinking and turning ideas into impactful business outcomes.',
      ],
      tagline: 'Bold in vision. Strategic in action. Relentless in pursuit of excellence.',
      linkedinUrl: 'https://www.linkedin.com/in/praveena-pradeep/',
    },
  ],
  advisorLabel: 'Advisors',
  advisors: [
    {
      id: 'manjula-nagarajan',
      name: 'Dr. Manjula Nagarajan',
      role: 'Independent External Advisor',
      focus: 'Dean – Outreach, Thiagarajar School of Management',
      photo: { src: 'team/manjula-nagarajan.webp', width: 900, height: 720 },
      summary:
        'An academician, strategic marketing expert and business mentor with over two decades in management education and marketing strategy. She turns complex business concepts into practical, actionable strategies.',
      education: ['PhD; FDP, Indian Institute of Management, Ahmedabad'],
      bio: [
        'Dr. Manjula Nagarajan is an academician, strategic marketing expert, corporate trainer and business mentor with over two decades in management education and institutional leadership. As Dean – Outreach at Thiagarajar School of Management, Madurai, she specialises in marketing strategy, brand management, consumer behaviour and rural marketing. As our Independent External Advisor, she mentors the team through training and strategic guidance, helping us sharpen our value proposition and make informed decisions.',
      ],
      linkedinUrl: 'https://www.linkedin.com/in/dr-manjula-nagarajan-a48aa722/',
    },
    {
      id: 'saji-philip',
      name: 'Saji Philip',
      role: 'Independent External Advisor',
      focus: 'Global Solar and BESS Leader',
      photo: { src: 'team/saji-philip.webp', width: 900, height: 720 },
      summary:
        'A business leader and entrepreneur with over 25 years across leadership, strategic marketing and renewable energy. Founder Director & CEO of SAEL Energy Solutions, Managing Director & CEO of Yellow Gold Energy, and Director at RedAmber.',
      education: ['University of Madras: MBA, Marketing'],
      bio: [
        'Saji is a business leader and entrepreneur with over 25 years in leadership, strategic marketing and renewable energy. As Founder Director & CEO of SAEL Energy Solutions, Managing Director & CEO of Yellow Gold Energy and Director at RedAmber, he turns ideas into growth opportunities, builds strategic partnerships and spots risks early. At Hiranmaye Digital, his insights help sharpen strategic decisions and drive sustainable growth.',
      ],
      tagline: 'A visionary mind. A strategic mentor. A catalyst for growth.',
      linkedinUrl: 'https://www.linkedin.com/in/sajiphilipsael/',
    },
    {
      id: 'abhishek-mishra',
      name: 'Abhishek Mishra',
      role: 'Independent External Advisor',
      focus: 'HR and Talent Leadership',
      photo: { src: 'team/abhishek-mishra.webp', width: 900, height: 720 },
      summary:
        'A senior HR and talent leader with nearly 21 years in talent management, leadership development and organisational transformation. He guides Hiranmaye Digital in strategic planning, team development and professional training.',
      education: [
        'Audencia International MBA: Business Administration, Management and Operations',
        'Symbiosis Institute of Management Studies: Executive PGDM, Human Resources Development',
      ],
      bio: [
        'Abhishek is a senior HR and talent leader with nearly 21 years in talent management, leadership development and organisational transformation, and a Fractional CHRO and Principal Consultant at The Perennial Global. An exceptional speaker and mentor, he guides Hiranmaye Digital in strategic planning, team development and professional training, helping build high-performing, growth-oriented teams.',
      ],
      tagline: 'Empowering People. Strengthening Strategy. Enabling Growth.',
      linkedinUrl: 'https://www.linkedin.com/in/coachabhi/',
    },
    {
      id: 'harshitha-girish',
      name: 'Harshitha Girish',
      role: 'Independent External Advisor',
      focus: 'Marketing and Business Strategy',
      photo: { src: 'team/harshitha-girish.webp', width: 900, height: 720 },
      summary:
        'A marketing professional, business strategist, content writer and Bharatanatyam dancer. As Associate Partner at Restless Dreamers, she brings a fresh, global perspective to digital strategy, brand building and content.',
      education: [
        'University of Birmingham: MSc, International Business (pursuing, Sep 2026 – Sep 2027)',
        'Christ University, Bangalore: BBA, Marketing (Jan 2022 – Apr 2025)',
      ],
      bio: [
        'Harshitha is a marketing professional, business strategist, content writer and Bharatanatyam dancer, and Associate Partner at Restless Dreamers, with earlier experience at The LIT School, Snapchat and Under25. At Hiranmaye Digital she brings creativity, technology and strategic insight together, with expertise in AI-enabled tools, social media and content that helps businesses build future-ready marketing strategies.',
      ],
      tagline: 'Creativity in Expression. Strategy in Action. Innovation in Growth.',
      linkedinUrl: 'https://www.linkedin.com/in/harshitha-girish-547ab8319/',
    },
  ],
  moreLabel: 'Read full profile',
  educationLabel: 'Education',
  linkedinLabel: 'LinkedIn',
  closeLabel: 'Close',
};
