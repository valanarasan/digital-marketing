import { act, render, renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { renderToString } from 'react-dom/server';
import { createScrollSteps, runScene } from '@/motion/gsap';
import type { ScrollSteps } from '@/motion/gsap';
import { setMatchMedia } from '@/test/setup';
import { useMotion } from './useMotion';
import { useReducedMotion } from './useReducedMotion';
import { useScrollSteps } from './useScrollSteps';
import { useSingleSelect } from './useSingleSelect';
import { useStickyOffset } from './useStickyOffset';

describe('useReducedMotion', () => {
  it('is false when the user has not asked for less motion', () => {
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it('is true when the media query matches, and unsubscribes on unmount', () => {
    setMatchMedia(true);
    const { result, unmount } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
    const subscribed = vi
      .mocked(window.matchMedia)
      .mock.results.map((entry) => entry.value as MediaQueryList)
      .find((mql) => vi.mocked(mql.addEventListener).mock.calls.length > 0);
    unmount();
    expect(subscribed?.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });

  it('treats a missing matchMedia as "motion allowed"', () => {
    vi.stubGlobal('matchMedia', undefined);
    const { result, unmount } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
    unmount();
  });

  it('assumes motion is allowed when rendered on a server', () => {
    function Probe() {
      return <span>{String(useReducedMotion())}</span>;
    }
    expect(renderToString(<Probe />)).toContain('false');
  });
});

describe('useSingleSelect', () => {
  it('starts from the initial value', () => {
    const { result } = renderHook(() => useSingleSelect('a'));
    expect(result.current.selected).toBe('a');
    expect(result.current.isSelected('a')).toBe(true);
  });

  it('defaults to nothing selected', () => {
    const { result } = renderHook(() => useSingleSelect());
    expect(result.current.selected).toBeNull();
  });

  it('toggles an id on and off, and switches between ids', () => {
    const { result } = renderHook(() => useSingleSelect<string>(null));
    act(() => result.current.toggle('a'));
    expect(result.current.selected).toBe('a');
    act(() => result.current.toggle('b'));
    expect(result.current.selected).toBe('b');
    act(() => result.current.toggle('b'));
    expect(result.current.selected).toBeNull();
  });

  it('selects outright', () => {
    const { result } = renderHook(() => useSingleSelect<string>('a'));
    act(() => result.current.select('c'));
    expect(result.current.selected).toBe('c');
    act(() => result.current.select(null));
    expect(result.current.selected).toBeNull();
  });
});

function StickyProbe({ onTop }: { onTop: (top: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  onTop(useStickyOffset(ref));
  return <div ref={ref} />;
}

function NoRefProbe({ onTop }: { onTop: (top: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  onTop(useStickyOffset(ref));
  return null;
}

describe('useStickyOffset', () => {
  const setHeight = (height: number) =>
    vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(height);

  it('offsets a sticky element taller than the viewport', () => {
    setHeight(1000);
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      position: 'sticky',
    } as CSSStyleDeclaration);
    window.innerHeight = 800;
    const seen: number[] = [];
    render(<StickyProbe onTop={(top) => seen.push(top)} />);
    expect(seen.at(-1)).toBe(-200);
  });

  it('never goes positive when the element fits', () => {
    setHeight(500);
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      position: 'sticky',
    } as CSSStyleDeclaration);
    window.innerHeight = 800;
    const seen: number[] = [];
    render(<StickyProbe onTop={(top) => seen.push(top)} />);
    expect(seen.at(-1)).toBe(0);
  });

  it('is zero when the element is not sticky, and recomputes on resize', () => {
    setHeight(1000);
    const style = vi
      .spyOn(window, 'getComputedStyle')
      .mockReturnValue({ position: 'relative' } as CSSStyleDeclaration);
    window.innerHeight = 800;
    const seen: number[] = [];
    const { unmount } = render(<StickyProbe onTop={(top) => seen.push(top)} />);
    expect(seen.at(-1)).toBe(0);

    style.mockReturnValue({ position: 'sticky' } as CSSStyleDeclaration);
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });
    expect(seen.at(-1)).toBe(-200);

    const remove = vi.spyOn(window, 'removeEventListener');
    unmount();
    expect(remove).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  it('does nothing without an element', () => {
    const seen: number[] = [];
    render(<NoRefProbe onTop={(top) => seen.push(top)} />);
    expect(seen.at(-1)).toBe(0);
  });
});

function MotionProbe({ scene, withRoot = true }: { scene: () => void; withRoot?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useMotion(ref, scene);
  return withRoot ? <div ref={ref} data-testid="root" /> : null;
}

describe('useMotion', () => {
  it('runs the scene on the root and reverts it on unmount', () => {
    const revert = vi.fn();
    vi.mocked(runScene).mockReturnValue(revert);
    const scene = vi.fn();
    const { getByTestId, unmount } = render(<MotionProbe scene={scene} />);
    expect(runScene).toHaveBeenCalledWith(getByTestId('root'), scene);
    unmount();
    expect(revert).toHaveBeenCalled();
  });

  it('skips the scene for reduced motion', () => {
    setMatchMedia(true);
    render(<MotionProbe scene={vi.fn()} />);
    expect(runScene).not.toHaveBeenCalled();
  });

  it('skips the scene when there is no root element', () => {
    render(<MotionProbe scene={vi.fn()} withRoot={false} />);
    expect(runScene).not.toHaveBeenCalled();
  });
});

describe('useScrollSteps', () => {
  function StepsProbe({
    onStep,
    withList = true,
    expose,
  }: {
    onStep: (index: number) => void;
    withList?: boolean;
    expose: (go: (index: number) => void) => void;
  }) {
    const ref = useRef<HTMLUListElement>(null);
    expose(useScrollSteps(ref, 3, onStep));
    return withList ? <ul ref={ref} data-testid="list" /> : null;
  }

  it('reports each step as the list scrolls, can glide to one, and stops on unmount', () => {
    const onStep = vi.fn();
    let go: (index: number) => void = () => {};
    const { getByTestId, unmount } = render(
      <StepsProbe onStep={onStep} expose={(fn) => (go = fn)} />,
    );
    const [element, count, report] = vi.mocked(createScrollSteps).mock.calls[0];
    expect(element).toBe(getByTestId('list'));
    expect(count).toBe(3);
    report(1);
    expect(onStep).toHaveBeenCalledWith(1);
    go(2);
    const steps = vi.mocked(createScrollSteps).mock.results[0].value as ScrollSteps;
    expect(steps.scrollToStep).toHaveBeenCalledWith(2);
    unmount();
    expect(steps.destroy).toHaveBeenCalled();
  });

  it('does nothing without a list to watch', () => {
    let go: (index: number) => void = () => {};
    render(<StepsProbe onStep={vi.fn()} withList={false} expose={(fn) => (go = fn)} />);
    expect(createScrollSteps).not.toHaveBeenCalled();
    expect(() => go(1)).not.toThrow();
  });
});
