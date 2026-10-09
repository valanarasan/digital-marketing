import mixpanel from 'mixpanel-browser';

let initialized = false;
let clickListenerAttached = false;

export interface InitAnalyticsOptions {
  token?: string;
  debug?: boolean;
}

/**
 * Initializes Mixpanel and enables automatic pageview & click tracking.
 */
export function initAnalytics(options: InitAnalyticsOptions = {}): void {
  if (typeof window === 'undefined') return;
  if (initialized) return;

  const token =
    options.token ??
    (typeof import.meta !== 'undefined' && import.meta.env
      ? import.meta.env.VITE_MIXPANEL_TOKEN
      : undefined) ??
    '';

  if (!token) {
    if (typeof import.meta !== 'undefined' && import.meta.env?.DEV) {
      console.warn(
        '[Mixpanel] VITE_MIXPANEL_TOKEN is not set. Set it in .env to enable tracking.',
      );
    }
    return;
  }

  mixpanel.init(token, {
    debug: options.debug ?? (typeof import.meta !== 'undefined' && Boolean(import.meta.env?.DEV)),
    track_pageview: 'full-url',
    persistence: 'localStorage',
    ignore_dnt: true, // Prevents browser Do-Not-Track from silently discarding events
    batch_requests: false, // Flushes events immediately for real-time reporting
    record_sessions_percent: 100,
    record_heatmap_data: true,
  });

  initialized = true;

  // Track initial page view event explicitly so it immediately shows up in Mixpanel Events feed
  trackPageView();

  // Setup click listeners for all interactive elements
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
        element_classes: clickable.className ? String(clickable.className) : undefined,
        aria_label: clickable.getAttribute('aria-label') || undefined,
        track_name: clickable.getAttribute('data-track-name') || undefined,
        page_path: window.location.pathname,
        page_title: document.title,
        url: window.location.href,
      };

      if (isLink) {
        const href = clickable.getAttribute('href');
        properties.href = href || undefined;
        properties.is_external = href ? /^https?:\/\//i.test(href) : false;
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
    if (typeof import.meta !== 'undefined' && import.meta.env?.DEV) {
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
    const url = typeof window !== 'undefined' ? window.location.href : '';

    // Track custom "Page View" event for immediate display in Mixpanel Events stream
    mixpanel.track('Page View', {
      page_name: pageTitle,
      page_path: path,
      url,
      ...properties,
    });
  } catch (error) {
    if (typeof import.meta !== 'undefined' && import.meta.env?.DEV) {
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
    if (typeof import.meta !== 'undefined' && import.meta.env?.DEV) {
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
    if (typeof import.meta !== 'undefined' && import.meta.env?.DEV) {
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
