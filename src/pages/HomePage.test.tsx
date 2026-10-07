import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '@/App';
import { HomePage } from './HomePage';

const leverButton = (name: string) => screen.getByRole('button', { name });

describe('HomePage', () => {
  it('renders every section in order inside main, with the footer after it', () => {
    render(<HomePage />);
    const main = screen.getByRole('main');
    const ids = Array.from(main.querySelectorAll('section[id]')).map((section) => section.id);
    expect(ids).toEqual(['top', 'about', 'services', 'process']);
    expect(document.getElementById('contact')?.tagName).toBe('FOOTER');
  });

  it('starts with the first problem picked and its lever open', () => {
    render(<HomePage />);
    expect(leverButton('Not Enough Leads')).toHaveAttribute('aria-pressed', 'true');
    expect(leverButton('Get Found')).toHaveAttribute('aria-expanded', 'true');
  });

  it('opens the matching lever further down when a problem is picked', async () => {
    render(<HomePage />);
    await userEvent.click(leverButton('Poor Website Conversion'));
    expect(leverButton('Poor Website Conversion')).toHaveAttribute('aria-pressed', 'true');
    expect(leverButton('Get Chosen')).toHaveAttribute('aria-expanded', 'true');
    expect(leverButton('Get Found')).toHaveAttribute('aria-expanded', 'false');
  });

  it('un-picking a problem leaves the open lever alone', async () => {
    render(<HomePage />);
    await userEvent.click(leverButton('Not Enough Leads'));
    expect(leverButton('Not Enough Leads')).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByText('Pick one to see where we would start.')).toBeInTheDocument();
    expect(leverButton('Get Found')).toHaveAttribute('aria-expanded', 'true');
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
    render(<App />);
    const skip = screen.getByRole('link', { name: 'Skip to content' });
    expect(skip).toHaveAttribute('href', '#main-content');
    expect(document.getElementById('main-content')).toContainElement(
      screen.getByRole('heading', { level: 1 }),
    );
  });
});
