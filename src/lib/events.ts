import type { PageId } from '@/types/content';

/**
 * Every Mixpanel event name the site sends. Naming: "<Area> <Object> <Past-tense verb>",
 * Title Case, so the Mixpanel event list groups by area (Header, Hero, Footer…).
 * Add new names here rather than inline, so they stay consistent.
 */
export const EVENTS = {
  // Page views — one event per page
  HOME_PAGE_VIEWED: 'Home Page Viewed',
  SOLUTIONS_PAGE_VIEWED: 'Solutions Page Viewed',
  ABOUT_PAGE_VIEWED: 'About Page Viewed',

  // Header & navigation
  HEADER_LOGO_CLICKED: 'Header Logo Clicked',
  HEADER_NAV_LINK_CLICKED: 'Header Nav Link Clicked',
  HEADER_CTA_CLICKED: 'Header CTA Clicked',
  MOBILE_MENU_TOGGLED: 'Mobile Menu Toggled',
  MOBILE_NAV_LINK_CLICKED: 'Mobile Nav Link Clicked',

  // Home page sections
  HERO_PRIMARY_CTA_CLICKED: 'Hero Primary CTA Clicked',
  HERO_SECONDARY_CTA_CLICKED: 'Hero Secondary CTA Clicked',
  GROWTH_BLOCKER_SELECTED: 'Growth Blocker Selected',
  GROWTH_WHEEL_SPUN: 'Growth Wheel Spun',
  GROWTH_LEVER_LINK_CLICKED: 'Growth Lever Link Clicked',
  SERVICE_LEVER_TOGGLED: 'Service Lever Toggled',
  SERVICES_LEARN_MORE_CLICKED: 'Services Learn More Clicked',
  PROCESS_CTA_CLICKED: 'Process CTA Clicked',

  // Solutions page
  SOLUTIONS_INDEX_LINK_CLICKED: 'Solutions Index Link Clicked',
  SOLUTION_CTA_CLICKED: 'Solution CTA Clicked',

  // Footer / contact
  FOOTER_WHATSAPP_CLICKED: 'Footer WhatsApp Clicked',
  FOOTER_SOCIAL_CLICKED: 'Footer Social Link Clicked',
  FOOTER_EMAIL_CLICKED: 'Footer Email Clicked',
  FOOTER_PHONE_CLICKED: 'Footer Phone Clicked',
  FOOTER_MAP_LINK_CLICKED: 'Footer Map Link Clicked',
  FOOTER_NAV_LINK_CLICKED: 'Footer Nav Link Clicked',
  FOOTER_LEGAL_LINK_CLICKED: 'Footer Legal Link Clicked',
} as const;

export type EventName = (typeof EVENTS)[keyof typeof EVENTS];

export const PAGE_VIEW_EVENTS: Record<PageId, EventName> = {
  home: EVENTS.HOME_PAGE_VIEWED,
  solutions: EVENTS.SOLUTIONS_PAGE_VIEWED,
  about: EVENTS.ABOUT_PAGE_VIEWED,
};

/** Attribute that marks an element so the global click listener sends its named event. */
export const TRACK_ATTR = 'data-track-event';
