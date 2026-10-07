import type { Solution, SolutionsContent } from '@/types/content';

/**
 * The Solutions page, from "final_website_content.pdf", Page 3 (Services).
 * Where the brief pairs two lines with " / ", the first is the headline and the
 * second the entry's call to action. The editor's notes under Podcast and Video
 * Production were guidance for the brief, not site copy, and are left out.
 */

export const solutionsPage: SolutionsContent = {
  hero: {
    kicker: 'Solutions',
    title: 'One Growth Partner.',
    titleAccent: 'Multiple Growth Levers.',
  },
  indexLabel: 'Jump to a solution',
  outcomeLabel: 'The outcome',
  defaultCta: 'Let’s talk growth',
  ctaHref: '#contact',
};

export const solutions: Solution[] = [
  {
    id: 'digital-marketing-strategy',
    name: 'Digital Marketing Strategy',
    headline: 'Before you spend more, know where you’re going.',
    paragraphs: [],
    details: [
      {
        label: 'What we solve',
        text: 'Scattered activity. Unclear priorities. Marketing decisions based on instinct.',
      },
      {
        label: 'What we do',
        text: 'We conduct market intelligence, audience analysis, competitive benchmarking, channel prioritisation and growth planning to create a commercially grounded digital roadmap.',
      },
    ],
    outcome: 'Less random activity. More deliberate momentum.',
    cta: 'Build your growth blueprint',
  },
  {
    id: 'social-media',
    name: 'Social Media',
    headline: 'Don’t just stay visible. Stay relevant.',
    paragraphs: [
      'Social media should not be a content dumping ground. We build platform-specific strategies that combine brand storytelling, audience engagement, cultural relevance and performance intelligence.',
    ],
    outcome: 'A social presence people recognise and a strategy the business can measure.',
    cta: 'Build a stronger social presence',
  },
  {
    id: 'website-design-development',
    name: 'Website Design & Development',
    headline: 'Your website should be your hardest-working sales asset.',
    paragraphs: [
      'We create high-performance digital experiences that bring together brand architecture, UX strategy, responsive design, website development, analytics, technical SEO, content strategy and conversion optimisation—building digital platforms that are fast, discoverable, measurable and designed to turn attention into action.',
    ],
    outcome:
      'A website that doesn’t merely look credible, it makes credibility commercially useful.',
  },
  {
    id: 'branding',
    name: 'Branding',
    headline: 'A logo is an asset. A brand is an advantage.',
    paragraphs: [
      'We develop brand identities that create distinction in crowded markets; from positioning and visual identity to messaging systems and creative direction.',
    ],
    outcome: 'A brand that is recognizable before it is explained.',
    cta: 'Build your brand advantage',
  },
  {
    id: 'content-marketing',
    name: 'Content Marketing',
    headline: 'Content without strategy is just more content.',
    paragraphs: [
      'We create search-intelligent, audience-relevant and commercially purposeful content designed to educate, influence and build authority.',
    ],
    cta: 'Turn expertise into influence',
  },
  {
    id: 'performance-marketing',
    name: 'Performance Marketing',
    quote: { text: 'A penny saved is a penny earned.', cite: 'Benjamin Franklin' },
    paragraphs: [
      'We plan, launch and optimise performance campaigns across the funnel—focusing on audience quality, acquisition efficiency, conversion performance and ROI.',
    ],
    outcome: 'Less wasted spend. More intelligent scale.',
  },
  {
    id: 'ai-powered-marketing',
    name: 'AI-Powered Marketing',
    headline: 'Use artificial intelligence to create an unfair efficiency advantage.',
    paragraphs: [
      'AI is not just heading for our industry. It will radically change the machinery we use in marketing.',
    ],
    outcome: 'AI doesn’t replace strategy. It gives a good strategy more leverage.',
    cta: 'Put AI to work for your business',
  },
  {
    id: 'seo-aeo-geo',
    name: 'SEO • AEO • GEO',
    headline: 'Timing matters! Search has changed. Your visibility strategy should too.',
    paragraphs: [],
    facets: [
      {
        name: 'SEO',
        promise: 'Be ranked.',
        body: 'Optimise for discoverability across traditional search ecosystems.',
      },
      {
        name: 'AEO',
        promise: 'Be answered.',
        body: 'Structure information so your brand can become the response to high-intent questions.',
      },
      {
        name: 'GEO',
        promise: 'Be referenced.',
        body: 'Strengthen your digital entity and content ecosystem so generative AI systems can better understand, contextualise and reference your business.',
      },
    ],
  },
  {
    id: 'meta-google-ads',
    name: 'Meta & Google Ads',
    headline: 'Reach people who are already moving toward a decision.',
    paragraphs: [
      'We build precision-led advertising systems across Meta and Google, balancing audience targeting, creative testing, conversion architecture and continuous optimisation.',
    ],
    cta: 'Launch smarter campaigns',
  },
  {
    id: 'business-consulting',
    name: 'Business Consulting',
    headline: 'Marketing problems are often business problems in disguise.',
    paragraphs: [
      'Sometimes the issue isn’t the campaign. It’s positioning. Pricing. Customer experience. Lead qualification. Sales alignment. Growth priorities.',
      'We help identify the structural friction preventing your business from moving forward—and build practical solutions around it.',
    ],
    cta: 'Get strategic clarity',
  },
  {
    id: 'outdoor-branding',
    name: 'Outdoor Branding',
    headline: 'The physical world still has the power to stop people in their tracks.',
    paragraphs: [
      'From storefronts and signage to large-format print, events and on-ground brand experiences, we translate your brand identity into physical spaces that command attention.',
    ],
    closer: 'From Screen to Street. From Attention to Recall.',
    cta: 'Take your brand into the real world',
  },
  {
    id: 'product-photoshoot',
    name: 'Product Photoshoot',
    headline: 'Images that sell before you do.',
    paragraphs: [
      'Studio, lifestyle and detail photography, planned around your brand and built for the places your customers actually see you: your website, marketplaces, social feeds and print.',
    ],
    closer: 'From shelf to screen. From glance to purchase.',
  },
  {
    id: 'podcast-video-production',
    name: 'Podcast and Video Production',
    headline: 'Your story, in every format people listen to and watch.',
    paragraphs: [
      'From podcast episodes to YouTube videos and short-form clips, we plan, produce and publish content that builds trust, gets found in search and keeps your brand in front of the right people. One idea, recorded once, then turned into episodes, videos, clips and posts.',
    ],
    details: [
      {
        label: 'Podcast',
        text: 'Concept and format, show name and cover art, recording support, editing and audio clean-up, publishing to major platforms, video and audio clips for social.',
      },
      {
        label: 'YouTube',
        text: 'Channel strategy, scripting, shooting and editing, thumbnails and titles, SEO optimisation, short-form cuts for Reels and Shorts.',
      },
    ],
    closer: 'From one conversation to many touchpoints. From content to conversion.',
  },
];
