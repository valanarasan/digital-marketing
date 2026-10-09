import mixpanel from 'mixpanel-browser';

let initialized = false;
let clickListenerAttached = false;

export interface InitAnalyticsOptions {
  token?: string;
  apiHost?: string;
  debug?: boolean;
}

/**
 * Initializes Mixpanel and enables automatic pageview & click tracking.
 */
export function initAnalytics(options: InitAnalyticsOptions = {}): void {
  if (typeof window === 'undefined') return;
  if (initialized) return;

  const env = import.meta.env;
  const token = options.token ?? env.VITE_MIXPANEL_TOKEN ?? '';

  if (!token) {
    if (env.DEV) {
      console.warn('[Mixpanel] VITE_MIXPANEL_TOKEN is not set. Set it in .env to enable tracking.');
    }
    return;
  }

  // Must match the project's data residency: EU (default), US is https://api.mixpanel.com
  const apiHost = options.apiHost ?? env.VITE_MIXPANEL_API_HOST ?? 'https://api-eu.mixpanel.com';

  mixpanel.init(token, {
    api_host: apiHost,
    debug: options.debug ?? Boolean(env.DEV),
    // Page views and clicks are tracked by our own events below; disable
    // Mixpanel's built-in versions to avoid double-counting.
    track_pageview: false,
    autocapture: false,
    persistence: 'localStorage',
    // Respect the browser's Do Not Track setting.
    loaded: () => {
      trackPageView();
    },
  });

  initialized = true;

  // Setup click listeners for buttons and links
  setupAutoClickTracking();
}

/**
 * Attaches a global delegated click listener to capture button and link interactions across the entire app.
 */
export function setupAutoClickTracking(): () => void {
  if (typeof window === 'undefined' || clickListenerAttached) {
    return () => {};
  }

  const handleClick = (event: MouseEvent) => {
    try {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest<HTMLElement>(
        'button, a, [role="button"], input[type="button"], input[type="submit"]',
      );
      if (!clickable) return;

      const tagName = clickable.tagName.toLowerCase();
      const role = clickable.getAttribute('role');
      const isLink = tagName === 'a';
      const isButton = tagName === 'button' || role === 'button' || tagName === 'input';

      const label =
        clickable.getAttribute('data-track-name') ||
        clickable.getAttribute('aria-label') ||
        clickable.getAttribute('title') ||
        clickable.innerText?.trim().slice(0, 100) ||
        clickable.getAttribute('id') ||
        'unnamed_element';

      const properties: Record<string, unknown> = {
        element_tag: tagName,
        element_text: clickable.innerText?.trim().slice(0, 100) || undefined,
        element_id: clickable.id || undefined,
        aria_label: clickable.getAttribute('aria-label') || undefined,
        track_name: clickable.getAttribute('data-track-name') || undefined,
        page_path: window.location.pathname,
        page_title: document.title,
        url: window.location.origin + window.location.pathname,
      };

      if (isLink) {
        const href = clickable.getAttribute('href');
        properties.href = href || undefined;
        properties.is_external = href ? /^https?:\/\//i.test(href) : false;
        properties.link_type = href?.startsWith('mailto:')
          ? 'email'
          : href?.startsWith('tel:')
            ? 'phone'
            : 'url';
        track('Link Click', {
          link_label: label,
          ...properties,
        });
      } else if (isButton) {
        track('Button Click', {
          button_label: label,
          ...properties,
        });
      }
    } catch {
      // Avoid breaking any click handling if analytics tracking throws
    }
  };

  document.addEventListener('click', handleClick, { capture: true, passive: true });
  clickListenerAttached = true;

  return () => {
    document.removeEventListener('click', handleClick, { capture: true });
    clickListenerAttached = false;
  };
}

/**
 * Tracks a custom event in Mixpanel.
 */
export function track(eventName: string, properties?: Record<string, unknown>): void {
  if (!initialized) return;
  try {
    mixpanel.track(eventName, properties);
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('[Mixpanel track error]', error);
    }
  }
}

/**
 * Explicitly tracks a page view with optional custom properties.
 */
export function trackPageView(pageName?: string, properties?: Record<string, unknown>): void {
  if (!initialized) return;
  try {
    const pageTitle = pageName || document.title;
    const path = typeof window !== 'undefined' ? window.location.pathname : '';
    const url =
      typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '';

    mixpanel.track('Page View', {
      page_name: pageTitle,
      page_path: path,
      url,
      ...properties,
    });
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('[Mixpanel pageview error]', error);
    }
  }
}

/**
 * Explicitly tracks a button click.
 */
export function trackButtonClick(buttonName: string, properties?: Record<string, unknown>): void {
  track('Button Click', {
    button_label: buttonName,
    ...properties,
  });
}

/**
 * Identifies a user in Mixpanel.
 */
export function identifyUser(userId: string, traits?: Record<string, unknown>): void {
  if (!initialized) return;
  try {
    mixpanel.identify(userId);
    if (traits) {
      mixpanel.people.set(traits);
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('[Mixpanel identify error]', error);
    }
  }
}

/**
 * Resets the Mixpanel session (e.g. on logout).
 */
export function resetAnalytics(): void {
  if (!initialized) return;
  try {
    mixpanel.reset();
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('[Mixpanel reset error]', error);
    }
  }
}

/**
 * Helper to reset initialization state (primarily for unit testing).
 */
export function _resetInternalStateForTesting(): void {
  initialized = false;
  clickListenerAttached = false;
}
