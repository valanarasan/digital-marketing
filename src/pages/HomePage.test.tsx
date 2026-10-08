import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '@/App';
import { createScrollSteps } from '@/motion/gsap';
import type { ScrollSteps } from '@/motion/gsap';
import { HomePage } from './HomePage';

const leverButton = (name: string) => screen.getByRole('button', { name });
const problemSlice = (name: string) => screen.getByRole('radio', { name });

describe('HomePage', () => {
  it('renders every section in order inside main, with the footer after it', () => {
    render(<HomePage />);
    const main = screen.getByRole('main');
    const ids = Array.from(main.querySelectorAll('section[id]')).map((section) => section.id);
    expect(ids).toEqual(['top', 'growth-check', 'services', 'process', 'clients']);
    expect(document.getElementById('contact')?.tagName).toBe('FOOTER');
  });

  it('starts with the first problem picked and its lever open', () => {
    render(<HomePage />);
    expect(problemSlice('Not Enough Leads')).toHaveAttribute('aria-checked', 'true');
    expect(leverButton('Get Found')).toHaveAttribute('aria-expanded', 'true');
  });

  it('opens the matching lever further down when a problem is picked', async () => {
    render(<HomePage />);
    await userEvent.click(problemSlice('Poor Website Conversion'));
    expect(problemSlice('Poor Website Conversion')).toHaveAttribute('aria-checked', 'true');
    expect(leverButton('Get Chosen')).toHaveAttribute('aria-expanded', 'true');
    expect(leverButton('Get Found')).toHaveAttribute('aria-expanded', 'false');
  });

  it('spinning to the picked problem again keeps it picked', async () => {
    render(<HomePage />);
    await userEvent.click(problemSlice('Not Enough Leads'));
    expect(problemSlice('Not Enough Leads')).toHaveAttribute('aria-checked', 'true');
    expect(leverButton('Get Found')).toHaveAttribute('aria-expanded', 'true');
  });

  it('opens each lever as scrolling reaches it', () => {
    render(<HomePage />);
    const [, , report] = vi.mocked(createScrollSteps).mock.calls[0];
    act(() => report(4));
    expect(leverButton('Get Smarter')).toHaveAttribute('aria-expanded', 'true');
    expect(leverButton('Get Found')).toHaveAttribute('aria-expanded', 'false');
  });

  it('glides from the growth wheel\'s "Start with" link to that lever', async () => {
    render(<HomePage />);
    await userEvent.click(problemSlice('High Ad Costs'));
    await userEvent.click(screen.getByRole('link', { name: 'Get Results' }));
    const steps = vi.mocked(createScrollSteps).mock.results[0].value as ScrollSteps;
    expect(steps.scrollToStep).toHaveBeenCalledWith(3);
  });

  it('lets the services accordion be driven on its own', async () => {
    render(<HomePage />);
    await userEvent.click(leverButton('Get Smarter'));
    expect(leverButton('Get Smarter')).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(leverButton('Get Smarter'));
    expect(leverButton('Get Smarter')).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('App', () => {
  it('puts the skip link first, pointing at the hero headline', () => {
    render(
      <App>
        <HomePage />
      </App>,
    );
    const skip = screen.getByRole('link', { name: 'Skip to content' });
    expect(skip).toHaveAttribute('href', '#main-content');
    expect(document.getElementById('main-content')).toContainElement(
      screen.getByRole('heading', { level: 1 }),
    );
  });
});
