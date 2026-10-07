import { fireEvent, render, screen, within } from '@testing-library/react';
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
    render(<Header nav={navItems} cta={navCta} current="home" />);
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
    render(<Header nav={navItems} cta={navCta} current="home" />);
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
    render(<Header nav={navItems} cta={navCta} current="home" />);
    const button = screen.getByRole('button', { name: 'Menu' });
    await userEvent.click(button);
    fireEvent.keyDown(window, { key: 'ArrowDown' });
    expect(button).toHaveAttribute('aria-expanded', 'true');
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('marks the current page and resolves page links against the deploy base', () => {
    render(<Header nav={navItems} cta={navCta} current="solutions" />);
    const primary = screen.getByRole('navigation', { name: 'Primary' });
    const solutions = within(primary).getByRole('link', { name: 'Solutions' });
    expect(solutions).toHaveAttribute('aria-current', 'page');
    expect(solutions).toHaveAttribute('href', '/solutions/');
    const home = within(primary).getByRole('link', { name: 'Home' });
    expect(home).not.toHaveAttribute('aria-current');
    expect(home).toHaveAttribute('href', '/');
    expect(within(primary).getByRole('link', { name: 'Let’s Connect' })).toHaveAttribute(
      'href',
      '#contact',
    );
    const logoLink = screen.getByRole('link', { name: 'Hiranmaye Digital — home' });
    expect(logoLink).toHaveAttribute('href', '/');
    expect(logoLink.querySelector('img')).toHaveAttribute('src', '/brand/logo-name.svg');
  });

  it('closes the drawer when any drawer link is tapped', async () => {
    render(<Header nav={navItems} cta={navCta} current="home" />);
    const button = screen.getByRole('button', { name: 'Menu' });
    await userEvent.click(button);
    const drawer = document.getElementById(
      button.getAttribute('aria-controls') ?? '',
    ) as HTMLElement;
    const link = drawer.querySelector('a[href="#contact"]') as HTMLElement;
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

  it('leads every social link with its platform mark, WhatsApp included', () => {
    render(<Footer content={footer} business={business} nav={footerNav} />);
    const list = screen.getByRole('list', { name: 'Social channels' });
    const links = within(list).getAllByRole('link');
    expect(links.map((link) => link.textContent)).toEqual([
      ...business.socials.map((social) => social.label),
      'WhatsApp',
    ]);
    for (const link of links) {
      expect(link.firstElementChild?.tagName.toLowerCase()).toBe('svg');
      expect(link.firstElementChild).toHaveAttribute('aria-hidden', 'true');
    }
    expect(within(list).getByRole('link', { name: 'WhatsApp' })).toHaveAttribute(
      'href',
      `https://wa.me/${business.phoneDigits}`,
    );
  });

  it('shows the office on a map and links to the Google Maps listing', () => {
    render(<Footer content={footer} business={business} nav={footerNav} />);
    const map = screen.getByTitle(footer.mapTitle);
    expect(map).toHaveAttribute('src', expect.stringContaining('q=12.9287471,77.5625986'));
    expect(screen.getByRole('link', { name: footer.mapLink })).toHaveAttribute(
      'href',
      business.office.mapsUrl,
    );
  });

  it('carries the About us block from the brief', () => {
    render(<Footer content={footer} business={business} nav={footerNav} />);
    expect(screen.getByRole('heading', { name: footer.about.kicker })).toBeInTheDocument();
    expect(screen.getByText(footer.about.promise)).toBeInTheDocument();
    expect(screen.getByText(footer.about.body)).toBeInTheDocument();
  });

  it('resolves page links in the footer menu', () => {
    render(<Footer content={footer} business={business} nav={footerNav} />);
    const nav = screen.getByRole('navigation', { name: 'Footer' });
    expect(within(nav).getByRole('link', { name: 'Inside Hiranmaye' })).toHaveAttribute(
      'href',
      '/inside-hiranmaye/',
    );
  });

  it('shows the current year and the footer navigation', () => {
    render(<Footer content={footer} business={business} nav={footerNav} />);
    expect(screen.getByText(new RegExp(`© ${new Date().getFullYear()}`))).toBeInTheDocument();
    const nav = screen.getByRole('navigation', { name: 'Footer' });
    expect(nav.querySelectorAll('a')).toHaveLength(footerNav.length);
  });

  it('closes with the full original logo, tagline and all', () => {
    render(<Footer content={footer} business={business} nav={footerNav} />);
    expect(
      screen.getByRole('img', { name: 'Hiranmaye Digital — Strategy drives growth' }),
    ).toHaveAttribute('src', '/brand/logo.svg');
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
