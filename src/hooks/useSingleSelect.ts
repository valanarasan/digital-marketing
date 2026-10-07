import { useCallback, useState } from 'react';

export interface SingleSelect<T extends string> {
  selected: T | null;
  /** Select an id, or clear the selection when it is already selected. */
  toggle: (id: T) => void;
  /** Select an id outright (null clears). */
  select: (id: T | null) => void;
  isSelected: (id: T) => boolean;
}

/**
 * At most one item open/active at a time — the behaviour shared by the hero's
 * growth check and the services accordion.
 */
export function useSingleSelect<T extends string>(initial: T | null = null): SingleSelect<T> {
  const [selected, setSelected] = useState<T | null>(initial);

  const toggle = useCallback((id: T) => setSelected((current) => (current === id ? null : id)), []);
  const select = useCallback((id: T | null) => setSelected(id), []);
  const isSelected = useCallback((id: T) => selected === id, [selected]);

  return { selected, toggle, select, isSelected };
}
