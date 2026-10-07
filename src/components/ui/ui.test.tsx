import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from './Accordion';
import { ButtonLink } from './ButtonLink';
import { Container } from './Container';
import { FlowerStar } from './FlowerStar';
import { Kicker } from './Kicker';
import { LotusMark } from './LotusMark';
import { MapEmbed } from './MapEmbed';
import { Marquee } from './Marquee';
import { SocialIcon } from './SocialIcon';
import type { SocialIconName } from './SocialIcon';
import { TextLink } from './TextLink';
import { business } from '@/content';

describe('Accordion', () => {
  const items = [
    { id: 'one', title: 'First', content: <p>First panel</p> },
    { id: 'two', title: 'Second', content: <p>Second panel</p> },
  ];

  it('names each trigger by its title alone, and marks the open one expanded', () => {
    render(<Accordion items={items} openId="one" onToggle={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: 'Second' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('links each trigger to its panel, and makes closed panels inert', () => {
    render(<Accordion items={items} openId="one" onToggle={vi.fn()} />);
    const open = screen.getByRole('region', { name: 'First' });
    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('aria-controls', open.id);
    expect(open).not.toHaveAttribute('inert');
    expect(screen.getByText('Second panel').closest('[role="region"]')).toHaveAttribute('inert');
  });

  it('reports toggles to the caller', async () => {
    const onToggle = vi.fn();
    render(<Accordion items={items} openId={null} onToggle={onToggle} itemAnim="stair" />);
    await userEvent.click(screen.getByRole('button', { name: 'Second' }));
    expect(onToggle).toHaveBeenCalledWith('two');
    expect(document.querySelectorAll('[data-anim="stair"]')).toHaveLength(2);
  });
});

describe('ButtonLink', () => {
  it('renders a solid link with an arrow by default', () => {
    render(<ButtonLink href="#contact">Talk</ButtonLink>);
    const link = screen.getByRole('link', { name: 'Talk' });
    expect(link).toHaveAttribute('href', '#contact');
    expect(link.querySelector('svg')).not.toBeNull();
  });

  it('renders the pill variant without an arrow', () => {
    render(
      <ButtonLink href="#x" variant="pill">
        Pill
      </ButtonLink>,
    );
    expect(screen.getByRole('link', { name: 'Pill' }).querySelector('svg')).toBeNull();
  });
});

describe('small building blocks', () => {
  it('Container passes attributes through', () => {
    render(<Container data-testid="c">x</Container>);
    expect(screen.getByTestId('c')).toHaveTextContent('x');
  });

  it('Kicker renders its label', () => {
    render(<Kicker>Who we are</Kicker>);
    expect(screen.getByText('Who we are')).toBeInTheDocument();
  });

  it('TextLink renders an underlined link with an arrow', () => {
    render(<TextLink href="#services">Explore</TextLink>);
    expect(screen.getByRole('link', { name: 'Explore' }).querySelector('svg')).not.toBeNull();
  });

  it('FlowerStar draws four crossed petals', () => {
    const { container } = render(<FlowerStar />);
    expect(container.querySelectorAll('ellipse')).toHaveLength(4);
  });

  it('LotusMark is decorative, and normalises path length only when drawable', () => {
    const { container, rerender } = render(<LotusMark />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    expect(container.querySelector('path')).not.toHaveAttribute('pathLength');
    rerender(<LotusMark drawable />);
    expect(container.querySelectorAll('path[pathLength="1"]')).toHaveLength(5);
  });
});

describe('Marquee', () => {
  it('renders two hidden copies for the loop and one readable list', () => {
    const { container } = render(
      <Marquee items={['A', 'B']} separator={<i>sep</i>} trailing={<b>end</b>} />,
    );
    const groups = container.querySelectorAll('[aria-hidden="true"]');
    expect(groups).toHaveLength(2);
    expect(groups[0]).toHaveTextContent('AsepBend');
    expect(screen.getByText('A, B')).toHaveClass('sr-only');
  });

  it('uses the separator as the trailing mark by default', () => {
    const { container } = render(
      <Marquee items={['A', 'B']} separator={<i>·</i>} size="small" reverse />,
    );
    expect(container.querySelector('[aria-hidden="true"]')).toHaveTextContent('A·B·');
  });
});

describe('MapEmbed', () => {
  it('embeds a titled, lazy-loading map', () => {
    render(
      <MapEmbed
        src="https://maps.google.com/maps?q=1,2&output=embed"
        title="Office map"
        className="m"
      />,
    );
    const frame = screen.getByTitle('Office map');
    expect(frame.tagName).toBe('IFRAME');
    expect(frame).toHaveAttribute('src', 'https://maps.google.com/maps?q=1,2&output=embed');
    expect(frame).toHaveAttribute('loading', 'lazy');
    expect(frame.parentElement).toHaveClass('m');
  });
});

describe('SocialIcon', () => {
  const names: SocialIconName[] = [...business.socials.map((social) => social.network), 'whatsapp'];

  function renderIcon(name: SocialIconName, className = 'icon'): SVGSVGElement {
    const { container } = render(<SocialIcon name={name} className={className} />);
    return container.querySelector('svg')!;
  }

  it('covers every channel the footer links to', () => {
    expect([...names].sort()).toEqual(['facebook', 'instagram', 'linkedin', 'whatsapp', 'youtube']);
  });

  it.each(names)('draws %s on the shared 24x24 grid, decoratively', (name) => {
    const svg = renderIcon(name);
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('focusable', 'false');
    expect(svg).toHaveClass('icon');
    expect(svg.querySelectorAll('path').length).toBeGreaterThan(0);
  });

  it.each([
    ['whatsapp', '#25D366'],
    ['youtube', '#FF0000'],
    ['facebook', '#0866FF'],
  ] as const)('fills the %s glyph with its brand colour', (name, colour) => {
    const paths = renderIcon(name).querySelectorAll('path');
    expect(paths).toHaveLength(1);
    expect(paths[0]).toHaveAttribute('fill', colour);
  });

  it('knocks the i and the n out of the LinkedIn tile in white', () => {
    const paths = renderIcon('linkedin').querySelectorAll('path');
    expect(paths).toHaveLength(3);
    expect(paths[0]).toHaveAttribute('fill', '#0A66C2');
    expect(paths[1]).toHaveAttribute('fill', '#FFFFFF');
    expect(paths[2]).toHaveAttribute('fill', '#FFFFFF');
  });

  /** A fill pointing at a gradient id that does not exist renders as black. */
  it('points the Instagram fill at the gradient it defines, unique per icon', () => {
    const { container } = render(
      <>
        <SocialIcon name="instagram" />
        <SocialIcon name="instagram" />
      </>,
    );
    const [first, second] = container.querySelectorAll('svg');
    const firstId = first.querySelector('radialGradient')!.id;
    expect(first.querySelectorAll('stop')).toHaveLength(5);
    expect(first.querySelector('path')).toHaveAttribute('fill', `url(#${firstId})`);
    expect(second.querySelector('radialGradient')!.id).not.toBe(firstId);
  });

  it('omits the class attribute when no class is passed', () => {
    const { container } = render(<SocialIcon name="whatsapp" />);
    expect(container.querySelector('svg')).not.toHaveAttribute('class');
  });
});
