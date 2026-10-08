/** Shapes for everything in src/content. Components depend on these, never on the raw data. */

/** The site's pages. Each has its own HTML entry (see vite.config.ts). */
export type PageId = 'home' | 'about' | 'solutions';

/**
 * A link. `href` is either an in-page anchor ("#contact"), an absolute URL, or a
 * page path relative to the deploy base ("" for home, "solutions/") — resolve it
 * with `resolveHref` before rendering.
 */
export interface NavItem {
  label: string;
  href: string;
  /** Set on links to a page, so the menu can mark the page you are on. */
  page?: PageId;
}

/** Platforms the site links to; each has a mark in SocialIcon. */
export type SocialNetwork = 'whatsapp' | 'linkedin' | 'instagram' | 'youtube' | 'facebook';

export interface SocialLink {
  network: SocialNetwork;
  label: string;
  href: string;
}

/** The office's public Google Maps listing. */
export interface OfficeLocation {
  /** Share link to the business listing on Google Maps. */
  mapsUrl: string;
  /** The listing's "Embed a map" URL (Google Maps → Share → Embed a map), used as the iframe src. */
  embedUrl: string;
}

export interface Business {
  name: string;
  email: string;
  phoneDisplay: string;
  /** Digits only, with country code — used for tel: and wa.me links. */
  phoneDigits: string;
  address: string;
  city: string;
  hours: string;
  office: OfficeLocation;
  socials: SocialLink[];
}

export type LeverId = 'found' | 'noticed' | 'chosen' | 'results' | 'smarter';

/** One of the five "Get …" growth levers and the services behind it. */
export interface Lever {
  id: LeverId;
  title: string;
  services: string[];
}

/** A growth blocker a visitor can pick in the hero, routed to the lever that fixes it. */
export interface Problem {
  id: string;
  label: string;
  lever: LeverId;
}

export type StepIconName = 'diagnose' | 'architect' | 'activate' | 'optimise' | 'compound';

export interface ProcessStep {
  id: StepIconName;
  name: string;
  headline: string;
  body: string;
}

export interface HeroContent {
  eyebrow: string;
  location: string;
  /** Two lines; the last word of the second line is rendered as visual "noise". */
  lead: [string, string];
  noiseWord: string;
  payoff: string;
  primaryCta: NavItem;
  secondaryCta: NavItem;
  scrollCue: string;
}

/** "What's holding your growth back?" — the growth wheel's section. */
export interface GrowthCheckContent {
  kicker: string;
  /** The question; its last words are set in the serif accent. */
  heading: string;
  headingAccent: string;
  /** One line under the question: how to use the wheel. */
  hint: string;
  /** "Your blocker" — over the picked problem. */
  blockerLabel: string;
  /** "Start with" — before the lever that answers it. */
  startLabel: string;
}

export interface TrustContent {
  heading: string;
  label: string;
  tag: string;
  stages: string[];
  sectors: string[];
  /** Closing lines under the tickers. */
  notes: string[];
}

/**
 * A client whose logo appears on the page. The logo is the client's own file,
 * served unaltered from public/.
 */
export interface Client {
  id: string;
  name: string;
  sector: string;
  /** Path under public/, without a leading slash (resolved against the deploy base). */
  logo: string;
  /** The file's pixel size, so the page reserves the right space before it loads. */
  width: number;
  height: number;
  /**
   * The tile colour behind the logo: the file's own background colour, sampled
   * from its edges, so artwork and tile meet without a visible seam. White
   * artwork on transparency gets the site's ink instead.
   */
  tile: string;
}

export interface ClientsContent {
  kicker: string;
  heading: string;
  /** The last words of the heading, set in the serif accent. */
  headingAccent: string;
  lead: string;
}

export interface WhoContent {
  kicker: string;
  /** Plain words, then the emphasised words that close the sentence. */
  statement: string[];
  emphasis: string[];
  problem: string;
  answerLead: string;
  answer: string;
}

export interface StatementContent {
  /** Each entry: [the struck word, the rest of the sentence]. */
  negations: Array<[string, string]>;
  intro: string;
  payoff: string;
}

export interface ServicesContent {
  kicker: string;
  headingLines: [string, string];
  /** The last word of the heading, rendered in the serif accent. */
  headingAccent: string;
  /** Onward link to the full Solutions page. */
  link: NavItem;
}

export interface ProcessContent {
  label: string;
  range: string;
  headingLead: string;
  headingAccent: string;
  cta: NavItem;
}

export interface FooterContent {
  prompt: string;
  promptSub: string;
  whatsappCta: string;
  /** "About us" in the footer: a one-line promise and the short description. */
  about: { kicker: string; promise: string; body: string };
  /** Accessible title of the embedded map, and the link to the full listing. */
  mapTitle: string;
  mapLink: string;
  legal: NavItem[];
}

/** "Why us?" — the principles behind the work. */
export interface WhyUsContent {
  kicker: string;
  heading: string;
  headingAccent: string;
  points: Array<{ title: string; body: string }>;
}

export interface QuoteContent {
  text: string;
  cite: string;
}

/** The dark title band that opens an inner page. */
export interface PageHeroContent {
  kicker: string;
  title: string;
  /** Words after the title, set in the gold serif accent. */
  titleAccent?: string;
  intro?: string;
}

export interface StoryContent {
  kicker: string;
  /** "We started with a question:" — the question that follows is set in the accent. */
  lead: string;
  question: string;
  paragraphs: string[];
}

export interface VisionMissionContent {
  vision: { label: string; text: string };
  mission: { label: string; text: string };
}

export interface Person {
  id: string;
  name: string;
  /** Only where the content gives one. */
  role?: string;
  /** Paragraphs; empty while a profile is still to come. */
  bio: string[];
}

export interface TeamContent {
  kicker: string;
  heading: string;
  founderLabel: string;
  founder: Person;
  teamLabel: string;
  team: Person[];
  boardLabel: string;
  board: Person[];
  /** Label for the disclosure that holds the rest of a long profile. */
  moreLabel: string;
}

export interface PartnersContent {
  label: string;
  names: string[];
}

/** One of the services on the Solutions page. Only `id`, `name` and `paragraphs` are always present. */
export interface Solution {
  /** Also the anchor on the Solutions page: solutions/#<id>. */
  id: string;
  name: string;
  headline?: string;
  /** Used instead of a headline when the service opens with a quotation. */
  quote?: QuoteContent;
  paragraphs: string[];
  /** Labelled detail pairs, e.g. "What we solve" / "What we do", or "Podcast" / "YouTube". */
  details?: Array<{ label: string; text: string }>;
  /** Named sub-services, e.g. SEO / AEO / GEO, each with a short promise. */
  facets?: Array<{ name: string; promise: string; body: string }>;
  outcome?: string;
  /** A closing line set in italics, for services whose content ends on a tagline. */
  closer?: string;
  /** The call to action that closes the entry ("Build your growth blueprint"). */
  cta?: string;
}

export interface SolutionsContent {
  hero: PageHeroContent;
  indexLabel: string;
  outcomeLabel: string;
  /** Call to action for entries the brief gives none. */
  defaultCta: string;
  /** Where every solution's call to action points. */
  ctaHref: string;
}
