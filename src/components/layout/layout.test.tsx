import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { startSmoothScroll } from '@/motion/gsap';
import { setMatchMedia } from '@/test/setup';
import { business, footer, footerNav, navCta, navItems } from '@/content';
import { Footer } from './Footer';
import { Header } from './Header';
import { SkipLink } from './SkipLink';
import { SmoothScroll } from './SmoothScroll';

describe('Header', () => {
  it('lists the section links and the call to action', () => {
    render(<Header nav={navItems} cta={navCta} />);
    const primary = screen.getByRole('navigation', { name: 'Primary' });
    for (const item of navItems) {
      expect(primary).toContainElement(screen.getAllByRole('link', { name: item.label })[0]);
    }
    expect(screen.getAllByRole('link', { name: navCta.label })[0]).toHaveAttribute(
      'href',
      '#contact',
    );
  });

  it('opens and closes the drawer from the menu button', async () => {
    render(<Header nav={navItems} cta={navCta} />);
    const button = screen.getByRole('button', { name: 'Menu' });
    const drawer = document.getElementById(button.getAttribute('aria-controls') ?? '');
    expect(drawer).toHaveAttribute('inert');

    await userEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveTextContent('Close');
    expect(drawer).not.toHaveAttribute('inert');

    await userEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes the drawer on Escape but not on other keys', async () => {
    render(<Header nav={navItems} cta={navCta} />);
    const button = screen.getByRole('button', { name: 'Menu' });
    await userEvent.click(button);
    fireEvent.keyDown(window, { key: 'ArrowDown' });
    expect(button).toHaveAttribute('aria-expanded', 'true');
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes the drawer when any drawer link is tapped', async () => {
    render(<Header nav={navItems} cta={navCta} />);
    const button = screen.getByRole('button', { name: 'Menu' });
    await userEvent.click(button);
    const drawer = document.getElementById(
      button.getAttribute('aria-controls') ?? '',
    ) as HTMLElement;
    const link = drawer.querySelector('a[href="#about"]') as HTMLElement;
    await userEvent.click(link);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('Footer', () => {
  it('carries every contact route', () => {
    render(<Footer content={footer} business={business} nav={footerNav} />);
    expect(screen.getByRole('link', { name: business.email })).toHaveAttribute(
      'href',
      `mailto:${business.email}`,
    );
    expect(screen.getByRole('link', { name: business.phoneDisplay })).toHaveAttribute(
      'href',
      `tel:+${business.phoneDigits}`,
    );
    expect(screen.getByRole('link', { name: footer.whatsappCta })).toHaveAttribute(
      'href',
      `https://wa.me/${business.phoneDigits}`,
    );
    for (const social of business.socials) {
      expect(screen.getByRole('link', { name: social.label })).toHaveAttribute('href', social.href);
    }
    expect(screen.getByText(business.address)).toBeInTheDocument();
  });

  it('shows the current year and the footer navigation', () => {
    render(<Footer content={footer} business={business} nav={footerNav} />);
    expect(screen.getByText(new RegExp(`© ${new Date().getFullYear()}`))).toBeInTheDocument();
    const nav = screen.getByRole('navigation', { name: 'Footer' });
    expect(nav.querySelectorAll('a')).toHaveLength(footerNav.length);
  });

  it('splits the wordmark into animatable letters, hidden from assistive tech', () => {
    render(<Footer content={footer} business={business} nav={footerNav} />);
    const letters = document.querySelectorAll('[data-anim="letter"]');
    expect(letters).toHaveLength(footer.wordmark.length);
    expect(letters[0].closest('[aria-hidden="true"]')).not.toBeNull();
  });
});

describe('SkipLink', () => {
  it('targets the given id', () => {
    render(<SkipLink target="main-content" />);
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute(
      'href',
      '#main-content',
    );
  });
});

describe('SmoothScroll', () => {
  it('starts smooth scrolling and stops it on unmount', () => {
    const stop = vi.fn();
    vi.mocked(startSmoothScroll).mockReturnValue(stop);
    const { unmount } = render(
      <SmoothScroll>
        <p>page</p>
      </SmoothScroll>,
    );
    expect(screen.getByText('page')).toBeInTheDocument();
    expect(startSmoothScroll).toHaveBeenCalledTimes(1);
    unmount();
    expect(stop).toHaveBeenCalled();
  });

  it('leaves native scrolling alone for reduced motion', () => {
    setMatchMedia(true);
    render(<SmoothScroll>x</SmoothScroll>);
    expect(startSmoothScroll).not.toHaveBeenCalled();
  });
});
