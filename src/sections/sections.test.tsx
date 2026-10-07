import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { runScene } from '@/motion/gsap';
import {
  heroScene,
  processScene,
  servicesScene,
  statementScene,
  trustScene,
  whoScene,
} from '@/motion/scenes';
import {
  hero,
  levers,
  problems,
  processIntro,
  processSteps,
  services,
  statement,
  trust,
  who,
} from '@/content';
import { Hero } from './Hero';
import { NoiseWord } from './Hero/NoiseWord';
import { ProblemIndex } from './Hero/ProblemIndex';
import { Process } from './Process';
import { StepIcon } from './Process/StepIcon';
import { Services } from './Services';
import { Statement } from './Statement';
import { TrustStrip } from './TrustStrip';
import { WhoWeAre } from './WhoWeAre';

const sceneFor = (scene: unknown) =>
  vi.mocked(runScene).mock.calls.some(([, called]) => called === scene);

describe('Hero', () => {
  const renderHero = (selected: string | null = 'leads', onToggle = vi.fn()) =>
    render(
      <Hero
        header={<div data-testid="header" />}
        content={hero}
        problems={problems}
        levers={levers}
        selectedProblem={selected}
        onToggleProblem={onToggle}
        contentId="main-content"
      />,
    );

  it('renders the full headline as one heading, with "noise." readable as a word', () => {
    renderHero();
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Marketing that doesn’t');
    expect(heading).toHaveTextContent('just create');
    expect(heading).toHaveTextContent('It creates momentum.');
    expect(within(heading).getByText('noise.')).toHaveClass('sr-only');
  });

  it('places the header slot, the calls to action and the skip target', () => {
    renderHero();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: hero.primaryCta.label })).toHaveAttribute(
      'href',
      '#contact',
    );
    expect(screen.getByRole('link', { name: hero.secondaryCta.label })).toHaveAttribute(
      'href',
      '#services',
    );
    expect(document.getElementById('main-content')).toHaveAttribute('tabindex', '-1');
  });

  it('runs the hero scene', () => {
    renderHero();
    expect(sceneFor(heroScene)).toBe(true);
  });

  it('forwards problem picks', async () => {
    const onToggle = vi.fn();
    renderHero(null, onToggle);
    await userEvent.click(screen.getByRole('button', { name: /High Ad Costs/ }));
    expect(onToggle).toHaveBeenCalledWith('ad-costs');
  });
});

describe('ProblemIndex', () => {
  const props = {
    question: hero.question,
    problems,
    levers,
    onToggle: vi.fn(),
    leverHref: '#services',
  };

  it('lists the problems as toggle buttons under the question', () => {
    render(<ProblemIndex {...props} selectedId="brand" />);
    const list = screen.getByRole('list', { name: hero.question });
    expect(within(list).getAllByRole('button')).toHaveLength(problems.length);
    expect(screen.getByRole('button', { name: 'Weak Brand Presence' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: 'Not Enough Leads' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  it('names the lever and its services for the selected problem', () => {
    render(<ProblemIndex {...props} selectedId="brand" />);
    expect(screen.getByRole('link', { name: 'Get Noticed' })).toHaveAttribute('href', '#services');
    expect(
      screen.getByText('Branding • Creative Design • Social Media • Outdoor Branding'),
    ).toBeInTheDocument();
  });

  it('prompts for a pick when nothing is selected', () => {
    render(<ProblemIndex {...props} selectedId={null} />);
    expect(screen.getByText('Pick one to see where we would start.')).toBeInTheDocument();
  });
});

describe('NoiseWord', () => {
  it('gives each letter its own clock, cycling the timings past six letters', () => {
    const { container } = render(<NoiseWord word="noiseful" />);
    const letters = container.querySelectorAll<HTMLElement>('[aria-hidden="true"] > span');
    expect(letters).toHaveLength(8);
    expect(letters[0].style.animationDuration).toBe(letters[6].style.animationDuration);
    expect(letters[0].style.animationDuration).not.toBe(letters[1].style.animationDuration);
  });
});

describe('TrustStrip', () => {
  it('names the section and lists stages and sectors for assistive tech', () => {
    render(<TrustStrip content={trust} />);
    expect(screen.getByRole('heading', { name: trust.label })).toBeInTheDocument();
    expect(screen.getByText(trust.stages.join(', '))).toBeInTheDocument();
    expect(screen.getByText(trust.sectors.join(', '))).toBeInTheDocument();
    expect(sceneFor(trustScene)).toBe(true);
  });
});

describe('WhoWeAre', () => {
  it('renders the statement word by word with the closing words emphasised', () => {
    render(<WhoWeAre content={who} />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent(
      'Most businesses don’t have a marketing problem. They have a fragmentation problem.',
    );
    expect(heading.querySelectorAll('[data-anim="word"]')).toHaveLength(
      who.statement.length + who.emphasis.length,
    );
    expect(document.getElementById('about')).toBeInTheDocument();
    expect(screen.getByText(who.answerLead)).toBeInTheDocument();
    expect(sceneFor(whoScene)).toBe(true);
  });
});

describe('Statement', () => {
  it('reads as plain sentences, with the strike lines decorative', () => {
    const { container } = render(<Statement content={statement} />);
    expect(container.querySelector('p')).toHaveTextContent(
      'Because impressions are not growth. Followers are not growth. Traffic is not growth.',
    );
    expect(document.querySelectorAll('[data-anim="strike"][aria-hidden="true"]')).toHaveLength(3);
    expect(screen.getByText(statement.payoff)).toBeInTheDocument();
    expect(sceneFor(statementScene)).toBe(true);
  });
});

describe('Services', () => {
  it('shows each lever with its services and opens the chosen one', () => {
    render(<Services content={services} levers={levers} openId="results" onToggle={vi.fn()} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'One Growth Partner. Multiple Growth Levers.',
    );
    expect(screen.getByRole('button', { name: 'Get Results' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    const panel = screen.getByRole('region', { name: 'Get Results' });
    expect(within(panel).getByRole('list', { name: 'Get Results services' })).toHaveTextContent(
      'Meta AdsGoogle AdsPerformance Marketing',
    );
    expect(sceneFor(servicesScene)).toBe(true);
  });

  it('reports the lever id when a row is toggled', async () => {
    const onToggle = vi.fn();
    render(<Services content={services} levers={levers} openId={null} onToggle={onToggle} />);
    await userEvent.click(screen.getByRole('button', { name: 'Get Smarter' }));
    expect(onToggle).toHaveBeenCalledWith('smarter');
  });
});

describe('Process', () => {
  it('renders the five steps in order and the call-to-action card', () => {
    render(<Process intro={processIntro} steps={processSteps} />);
    const names = screen
      .getAllByRole('heading', { level: 3 })
      .map((heading) => heading.textContent);
    expect(names).toEqual(['01Diagnose', '02Architect', '03Activate', '04Optimise', '05Compound']);
    expect(screen.getByRole('link', { name: processIntro.cta.label })).toHaveAttribute(
      'href',
      '#contact',
    );
    expect(document.querySelectorAll('[data-anim="icon"]')).toHaveLength(5);
    expect(sceneFor(processScene)).toBe(true);
  });
});

describe('StepIcon', () => {
  it.each(['diagnose', 'architect', 'activate', 'optimise', 'compound'] as const)(
    'draws the %s illustration',
    (name) => {
      const { container } = render(<StepIcon name={name} />);
      expect(container.querySelector('svg')?.childElementCount).toBeGreaterThan(2);
    },
  );
});
