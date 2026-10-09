import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import mixpanel from 'mixpanel-browser';
import {
  initAnalytics,
  track,
  trackPageView,
  trackButtonClick,
  identifyUser,
  resetAnalytics,
  setupAutoClickTracking,
  _resetInternalStateForTesting,
} from './analytics';

vi.mock('mixpanel-browser', () => {
  return {
    default: {
      init: vi.fn(),
      track: vi.fn(),
      track_pageview: vi.fn(),
      identify: vi.fn(),
      reset: vi.fn(),
      people: {
        set: vi.fn(),
      },
    },
  };
});

describe('analytics', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    _resetInternalStateForTesting();
    document.body.innerHTML = '';
  });

  afterEach(() => {
    _resetInternalStateForTesting();
  });

  it('does not initialize mixpanel if token is missing', () => {
    initAnalytics({ token: '' });
    expect(mixpanel.init).not.toHaveBeenCalled();
  });

  it('initializes mixpanel when token is provided', () => {
    initAnalytics({ token: 'test-token', debug: true });
    expect(mixpanel.init).toHaveBeenCalledWith(
      'test-token',
      expect.objectContaining({
        api_host: 'https://api-eu.mixpanel.com',
        debug: true,
        track_pageview: false,
        autocapture: false,
        persistence: 'localStorage',
      }),
    );
  });

  it('is idempotent on duplicate init calls', () => {
    initAnalytics({ token: 'test-token' });
    initAnalytics({ token: 'test-token' });
    expect(mixpanel.init).toHaveBeenCalledTimes(1);
  });

  it('tracks custom events after init', () => {
    initAnalytics({ token: 'test-token' });
    track('Custom Event', { score: 10 });
    expect(mixpanel.track).toHaveBeenCalledWith('Custom Event', { score: 10 });
  });

  it('tracks page views', () => {
    initAnalytics({ token: 'test-token' });
    trackPageView('Home Page', { custom: 123 });
    expect(mixpanel.track).toHaveBeenCalledWith(
      'Page View',
      expect.objectContaining({
        page_name: 'Home Page',
        custom: 123,
      }),
    );
  });

  it('tracks button clicks explicitly', () => {
    initAnalytics({ token: 'test-token' });
    trackButtonClick('CTA Contact', { position: 'hero' });
    expect(mixpanel.track).toHaveBeenCalledWith('Button Click', {
      button_label: 'CTA Contact',
      position: 'hero',
    });
  });

  it('identifies users and sets traits', () => {
    initAnalytics({ token: 'test-token' });
    identifyUser('user-123', { email: 'user@example.com' });
    expect(mixpanel.identify).toHaveBeenCalledWith('user-123');
    expect(mixpanel.people.set).toHaveBeenCalledWith({ email: 'user@example.com' });
  });

  it('resets user analytics', () => {
    initAnalytics({ token: 'test-token' });
    resetAnalytics();
    expect(mixpanel.reset).toHaveBeenCalled();
  });

  describe('auto click tracking', () => {
    it('captures button clicks across the document', () => {
      initAnalytics({ token: 'test-token' });
      const cleanup = setupAutoClickTracking();

      const button = document.createElement('button');
      button.id = 'submit-btn';
      button.innerText = 'Submit Form';
      document.body.appendChild(button);

      button.click();

      expect(mixpanel.track).toHaveBeenCalledWith(
        'Button Click',
        expect.objectContaining({
          button_label: 'Submit Form',
          element_tag: 'button',
          element_id: 'submit-btn',
        }),
      );

      cleanup();
    });

    it('captures link clicks across the document', () => {
      initAnalytics({ token: 'test-token' });
      const cleanup = setupAutoClickTracking();

      const link = document.createElement('a');
      link.href = 'https://example.com/learn-more';
      link.innerText = 'Learn More';
      document.body.appendChild(link);

      link.click();

      expect(mixpanel.track).toHaveBeenCalledWith(
        'Link Click',
        expect.objectContaining({
          link_label: 'Learn More',
          element_tag: 'a',
          href: 'https://example.com/learn-more',
          is_external: true,
        }),
      );

      cleanup();
    });

    it('uses data-track-name when present', () => {
      initAnalytics({ token: 'test-token' });
      const cleanup = setupAutoClickTracking();

      const button = document.createElement('button');
      button.setAttribute('data-track-name', 'Header WhatsApp Button');
      button.innerText = 'Chat';
      document.body.appendChild(button);

      button.click();

      expect(mixpanel.track).toHaveBeenCalledWith(
        'Button Click',
        expect.objectContaining({
          button_label: 'Header WhatsApp Button',
          track_name: 'Header WhatsApp Button',
        }),
      );

      cleanup();
    });
  });
});
