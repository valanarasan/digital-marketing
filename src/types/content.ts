/** Shapes for everything in src/content. Components depend on these, never on the raw data. */

export interface NavItem {
  label: string;
  href: string;
}

/** Platforms the site links to; each has a mark in SocialIcon. */
export type SocialNetwork = 'whatsapp' | 'linkedin' | 'instagram' | 'youtube' | 'facebook';

export interface SocialLink {
  network: SocialNetwork;
  label: string;
  href: string;
}

/** The office pin and its public Google Maps listing. */
export interface OfficeLocation {
  latitude: number;
  longitude: number;
  /** Share link to the business listing on Google Maps. */
  mapsUrl: string;
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
  subcopy: string;
  primaryCta: NavItem;
  secondaryCta: NavItem;
  question: string;
  scrollCue: string;
}

export interface TrustContent {
  label: string;
  tag: string;
  stages: string[];
  sectors: string[];
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
  /** Accessible title of the embedded map, and the link to the full listing. */
  mapTitle: string;
  mapLink: string;
  wordmark: string;
  legal: NavItem[];
}
