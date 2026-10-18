import { useEffect } from 'react';
import type { RefObject } from 'react';

/**
 * What a modal dialog owes the keyboard: focus moves into it when it opens, Escape closes it,
 * Tab stays inside it, and focus goes back (without scrolling the page) to what opened it.
 */
export function useModal(
  open: boolean,
  dialogRef: RefObject<HTMLElement | null>,
  onClose: () => void,
  triggerRef: RefObject<HTMLElement | null>,
): void {
  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    // Focus the dialog itself, so no control looks pre-selected until the visitor tabs to one.
    dialogRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      // Keep Tab inside the dialog: it is modal, so the page behind must not take focus.
      // The dialog is mounted while open and always holds a close button.
      const dialog = dialogRef.current!;
      const focusable = dialog.querySelectorAll<HTMLElement>('a[href], button');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (!dialog.contains(active)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && (active === first || active === dialog)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
    // onClose is a fresh closure each render; the dialog must not refocus on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
}
