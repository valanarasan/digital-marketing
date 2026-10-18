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
 * the full profile (education, experience, bio, tagline, LinkedIn) opens in a dialog. Photos are
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
    experience: [
      'Managing Director, Gavin Technologies Pvt Ltd (2008–2013)',
      'Managing Director, Hiranmaye E Mart Pvt Ltd (2020–Present)',
    ],
    bio: [
      'Vijayalakshmi Girish is a resilient entrepreneur, visionary leader and business strategist with over 17 years of experience as Managing Director of Gavin Technologies and continued leadership as Director of Hiranmaye E Mart Pvt. Ltd. Her journey reflects a relentless never-give-up attitude, the courage to embrace challenges, and an unwavering commitment to growth and innovation.',
      'As the driving force behind Hiranmaye Digital, she envisions empowering businesses through strategic digital marketing, building impactful brands and creating sustainable growth opportunities. Beyond business, she is deeply passionate about empowering women, inspiring confidence and enabling them to discover their potential and become independent leaders.',
      'As a Reiki Grand Master, Vijayalakshmi embraces a journey of healing, spiritual growth and self-discovery. She believes in the power of inner balance, positive energy and self-belief to transform lives. Her vision is to empower women to overcome limitations, reconnect with their inner strength and lead lives filled with confidence, purpose and independence.',
      'Her mission goes beyond building successful businesses. It is about creating meaningful impact, empowering people and inspiring women to dream bigger and achieve more.',
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
      credential:
        'Digital Marketing Professional · SEO · AEO · Social Media · Google Ads & Meta Ads · Content Strategy · Web Analytics & Performance Optimization · CMS Management · Website Content Optimization',
      education: [
        'Bharathiar University, Coimbatore: Master of Business Administration, Marketing and Finance',
      ],
      bio: [
        'Praveena is a dynamic young leader with an MBA in Finance and Marketing from Bharathiar University, Coimbatore, and over five years of digital marketing experience. Combining strong technical expertise with strategic thinking and a visionary mindset, she brings innovation, creativity and business acumen to her role as Director.',
        'A dedicated and hardworking professional, Praveena is passionate about identifying opportunities, challenging conventional thinking and transforming ideas into impactful business outcomes. Her forward-looking vision and relentless drive contribute to Hiranmaye’s ambition to build distinctive brands and achieve sustainable growth.',
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
      credential:
        'Corporate trainer · Business consultant for MSMEs · Knowledge facilitator, Thiagarajar School of Management, Madurai, Tamil Nadu, India',
      education: ['PhD; FDP, Indian Institute of Management, Ahmedabad'],
      bio: [
        'Dr. Manjula Nagarajan is an accomplished academician, strategic marketing expert, inspiring speaker, corporate trainer and business mentor with over two decades of experience in management education, marketing strategy and institutional leadership. As Dean – Outreach at Thiagarajar School of Management, Madurai, she brings a wealth of knowledge and practical insights into business development and strategic management. Her association with the Indian Institute of Management Ahmedabad further strengthens her management expertise.',
        'With specialisation in marketing strategy, brand management, consumer behaviour, rural marketing and Business Model Canvas (BMC) training, Dr. Manjula excels at translating complex business concepts into practical, actionable strategies.',
        'As an Independent External Advisor to Hiranmaye, she plays a valuable role in mentoring our team through structured training, strategic guidance and knowledge sharing. Her insights help us strengthen our business fundamentals, identify our core value proposition, maintain focus on our primary business objectives and make informed decisions for sustainable growth.',
        'Her ability to inspire, challenge conventional thinking and bring clarity to business strategy makes her a trusted mentor in Hiranmaye’s growth journey. Her guidance empowers us to build a stronger foundation, sharpen our market positioning and pursue our long-term vision with confidence and purpose.',
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
      credential:
        'Energy Storage · Solar Projects · Distribution & Market Entry · RedAmber · Yellow Gold Energy · SAEL Energy Solutions · Serving global markets, from Dubai, United Arab Emirates',
      education: ['University of Madras: MBA, Marketing'],
      bio: [
        'A visionary business leader, accomplished entrepreneur and exceptional mentor, Saji Philip brings over 25 years of multidisciplinary experience in business leadership, strategic marketing, entrepreneurship and renewable energy.',
        'As Founder Director & CEO of SAEL Energy Solutions LLP, Managing Director & CEO of Yellow Gold Energy Pvt. Ltd. and Director at RedAmber General Trading LLC, he has built extensive expertise in business development, solar energy solutions, product distribution and global market expansion.',
        'His strengths lie in transforming business ideas into growth opportunities, building strategic partnerships and anticipating potential risks before they become challenges. With a rare combination of strategic foresight, commercial acumen and mentorship, he brings invaluable perspective to businesses navigating growth and transformation.',
        'At Hiranmaye Digital, his insights help strengthen strategic decision-making, unlock new opportunities and drive sustainable business growth.',
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
      credential:
        'Fractional CHRO · Principal Consultant, The Perennial Global · HR & Talent Leader (Europe & APAC) · Leadership & Capability Transformation · Organisational & Culture Enablement',
      education: [
        'Audencia International MBA: Business Administration, Management and Operations',
        'Symbiosis Institute of Management Studies: Executive PGDM, Human Resources Development',
      ],
      bio: [
        'With nearly 21 years of experience in HR, talent management, leadership development and organisational transformation, Abhishek Mishra brings deep expertise in building people capabilities that drive business growth.',
        'An exceptional speaker, mentor and strategic thinker, he guides Hiranmaye Digital in strategic planning, team development and professional training, helping strengthen organisational capabilities and align people strategies with business objectives. His pragmatic approach, behavioural insights and ability to simplify complex challenges make him a valuable advisor in building high-performing teams and fostering a growth-oriented organisation.',
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
        'Harshitha Girish is a dynamic marketing professional, business strategist, content writer, blogger and Bharatanatyam dancer, bringing together strategic thinking and creative expression. As Associate Partner at Restless Dreamers, she drives sales strategy, curriculum development and student training, with prior experience at The LIT School, Snapchat and Under25. She brings a fresh, global perspective to digital strategy, brand building, content creation and consumer engagement.',
        'At Hiranmaye Digital, Harshitha brings creativity, technology and strategic insight together to inspire innovative marketing and sustainable business growth.',
        'With a forward-thinking approach to marketing and business growth, she brings a unique blend of strategic vision and practical execution. Her expertise in AI-enabled tools, social media, content and evolving consumer behaviour enables her to identify new opportunities, strengthen brand positioning and drive meaningful customer engagement. She is passionate about helping businesses embrace innovation, build future-ready marketing strategies and achieve sustainable growth in an increasingly digital world.',
      ],
      tagline: 'Creativity in Expression. Strategy in Action. Innovation in Growth.',
      linkedinUrl: 'https://www.linkedin.com/in/harshitha-girish-547ab8319/',
    },
  ],
  moreLabel: 'Read full profile',
  educationLabel: 'Education',
  experienceLabel: 'Experience',
  linkedinLabel: 'View on LinkedIn',
  closeLabel: 'Close',
};
