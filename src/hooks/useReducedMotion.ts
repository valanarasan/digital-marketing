import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

const subscribe = (onChange: () => void): (() => void) => {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {};
  const mql = window.matchMedia(QUERY);
  mql.addEventListener('change', onChange);
  return () => mql.removeEventListener('change', onChange);
};

const getSnapshot = (): boolean =>
  typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia(QUERY).matches;

/** Single responsibility: answer "should this UI animate?" and nothing else. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
