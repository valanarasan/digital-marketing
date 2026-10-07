import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

/**
 * `top` for a sticky section that may be taller than the viewport. A plain
 * `top: 0` would trap the bottom of a tall hero below the fold for as long as it
 * stays stuck; a negative offset lets it scroll until its bottom edge meets the
 * viewport's, then hold while the next section slides over it.
 */
export function useStickyOffset(ref: RefObject<HTMLElement | null>): number {
  const [top, setTop] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Only a sticky element needs the offset; on small screens the hero is
    // position: relative, where a negative top would shift it off the page.
    const update = () => {
      const sticky = window.getComputedStyle(element).position === 'sticky';
      setTop(sticky ? Math.min(0, window.innerHeight - element.offsetHeight) : 0);
    };
    update();

    const observer = new ResizeObserver(update);
    observer.observe(element);
    window.addEventListener('resize', update);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [ref]);

  return top;
}
