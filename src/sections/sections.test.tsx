import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { createScrollSteps, runScene } from '@/motion/gsap';
import type { ScrollSteps } from '@/motion/gsap';
import {
  clientsScene,
  heroScene,
  pageHeroScene,
  riseScene,
  processScene,
  servicesScene,
  statementScene,
  trustScene,
  whoScene,
} from '@/motion/scenes';
import {
  aboutHero,
  aboutIndex,
  clients,
  clientsIntro,
  partners,
  quote,
  solutions,
  solutionsPage,
  story,
  team,
  visionMission,
  whyUs,
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
import { Clients } from './Clients';
import { PageHero } from './PageHero';
import { Quote } from './Quote';
import { SolutionsList } from './SolutionsList';
import { Story } from './Story';
import { Team } from './Team';
import { VisionMission } from './VisionMission';
import { WhyUs } from './WhyUs';
import { Hero } from './Hero';
import { NoiseWord } from './Hero/NoiseWord';
import { ProblemIndex } from './Hero/ProblemIndex';
import { Process } from './Process';
import { StepIcon } from './Process/StepIcon';
import { Services } from './Services';
import type { ServicesHandle } from './Services';
import { Statement } from './Statement';
import { TrustStrip } from './TrustStrip';
import { WhoWeAre } from './WhoWeAre';

const sceneFor = (scene: unknown) =>
  vi.mocked(runScene).mock.calls.some(([, called]) => called === scene);

describe('Hero', () => {
  const renderHero = (selected: string | null = 'leads', onToggle = vi.fn(), onShow = vi.fn()) =>
    render(
      <Hero
        header={<div data-testid="header" />}
        content={hero}
        problems={problems}
        levers={levers}
        selectedProblem={selected}
        onToggleProblem={onToggle}
        onShowLever={onShow}
        contentId="main-content"
      />,
    );

  it('renders the full headline as one heading, with "noise." readable as a word', () => {
    renderHero();
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Marketing that doesn’t');
    expect(heading).toHaveTextContent('just create');
    expect(heading).toHaveTextContent(hero.payoff);
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

  it('hands the "Start with" link to the page instead of jumping to the anchor', async () => {
    const onShow = vi.fn();
    renderHero('brand', vi.fn(), onShow);
    await userEvent.click(screen.getByRole('link', { name: 'Get Noticed' }));
    expect(onShow).toHaveBeenCalledWith('noticed');
  });
});

describe('ProblemIndex', () => {
  const props = {
    question: hero.question,
    problems,
    levers,
    onToggle: vi.fn(),
    leverHref: '#services',
    onLeverClick: vi.fn(),
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

  it('takes over the lever link: no jump to the anchor, the page is told which lever', () => {
    const onLeverClick = vi.fn();
    render(<ProblemIndex {...props} selectedId="ad-costs" onLeverClick={onLeverClick} />);
    const link = screen.getByRole('link', { name: 'Get Results' });
    const click = new MouseEvent('click', { bubbles: true, cancelable: true });
    const outside = vi.fn();
    window.addEventListener('click', outside);
    link.dispatchEvent(click);
    window.removeEventListener('click', outside);
    expect(click.defaultPrevented).toBe(true);
    expect(outside).not.toHaveBeenCalled();
    expect(onLeverClick).toHaveBeenCalledWith('results');
  });
});

describe('NoiseWord', () => {
  it('sets each letter slightly off its line, cycling the offsets past six letters', () => {
    const { container } = render(<NoiseWord word="noiseful" />);
    const letters = container.querySelectorAll<HTMLElement>('[aria-hidden="true"] > span');
    expect(letters).toHaveLength(8);
    const rest = (letter: HTMLElement) =>
      ['--x', '--y', '--r'].map((name) => letter.style.getPropertyValue(name)).join(' ');
    expect(rest(letters[0])).toBe('-0.02em 0.03em -3deg');
    expect(rest(letters[6])).toBe(rest(letters[0]));
    expect(rest(letters[1])).not.toBe(rest(letters[0]));
  });
});

describe('Clients', () => {
  it('lists every client with its own logo file, named and captioned', () => {
    render(<Clients content={clientsIntro} clients={clients} />);
    expect(
      screen.getByRole('heading', {
        name: `${clientsIntro.heading} ${clientsIntro.headingAccent}`,
      }),
    ).toBeInTheDocument();
    const items = within(screen.getByRole('list')).getAllByRole('listitem');
    expect(items).toHaveLength(clients.length);
    clients.forEach((client, index) => {
      const logo = within(items[index]).getByRole('img', { name: `${client.name} logo` });
      expect(logo).toHaveAttribute('src', `/${client.logo}`);
      expect(logo).toHaveAttribute('width', String(client.width));
      expect(logo).toHaveAttribute('loading', 'lazy');
      expect(items[index]).toHaveTextContent(client.sector);
    });
    expect(sceneFor(clientsScene)).toBe(true);
  });

  it('paints each tile the colour its logo was drawn on', () => {
    render(<Clients content={clientsIntro} clients={clients} />);
    for (const client of clients) {
      const tile = screen.getByRole('img', { name: `${client.name} logo` }).parentElement!;
      expect(tile.style.backgroundColor).not.toBe('');
      expect(tile).toHaveStyle({ backgroundColor: client.tile });
    }
  });
});

describe('TrustStrip', () => {
  it('names the section and lists stages and sectors for assistive tech', () => {
    render(<TrustStrip content={trust} />);
    expect(screen.getByRole('heading', { name: trust.heading })).toBeInTheDocument();
    expect(screen.getByText(trust.label)).toBeInTheDocument();
    for (const note of trust.notes) expect(screen.getByText(note)).toBeInTheDocument();
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
    render(
      <Services
        content={services}
        levers={levers}
        openId="results"
        onToggle={vi.fn()}
        onStep={vi.fn()}
      />,
    );
    expect(screen.getByRole('link', { name: services.link.label })).toHaveAttribute(
      'href',
      '/solutions/',
    );
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
    render(
      <Services
        content={services}
        levers={levers}
        openId={null}
        onToggle={onToggle}
        onStep={vi.fn()}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Get Smarter' }));
    expect(onToggle).toHaveBeenCalledWith('smarter');
  });

  it('follows the scroll: each step through the list names the lever to open', () => {
    const onStep = vi.fn();
    render(
      <Services
        content={services}
        levers={levers}
        openId={null}
        onToggle={vi.fn()}
        onStep={onStep}
      />,
    );
    const [element, count, report] = vi.mocked(createScrollSteps).mock.calls[0];
    expect(element).toContainElement(screen.getByRole('button', { name: 'Get Found' }));
    expect(count).toBe(levers.length);
    report(2);
    expect(onStep).toHaveBeenCalledWith('chosen');
  });

  it('glides to a lever on request, through the scroll steps', () => {
    const ref = createRef<ServicesHandle>();
    render(
      <Services
        content={services}
        levers={levers}
        openId={null}
        onToggle={vi.fn()}
        onStep={vi.fn()}
        ref={ref}
      />,
    );
    ref.current!.showLever('results');
    const steps = vi.mocked(createScrollSteps).mock.results[0].value as ScrollSteps;
    expect(steps.scrollToStep).toHaveBeenCalledWith(3);
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

describe('Clients partners', () => {
  it('lists the partners under the logos when given, and leaves them out otherwise', () => {
    const { unmount } = render(
      <Clients content={clientsIntro} clients={clients} partners={partners} />,
    );
    expect(screen.getByRole('heading', { name: partners.label })).toBeInTheDocument();
    expect(screen.getByText('Jeeva')).toBeInTheDocument();
    unmount();
    render(<Clients content={clientsIntro} clients={clients} />);
    expect(screen.queryByText('Jeeva')).not.toBeInTheDocument();
  });
});

describe('WhyUs', () => {
  it('numbers the six principles under one heading', () => {
    render(<WhyUs content={whyUs} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Why us?');
    const points = within(screen.getByRole('list')).getAllByRole('listitem');
    expect(points).toHaveLength(6);
    whyUs.points.forEach((point, index) => {
      expect(within(points[index]).getByRole('heading', { level: 3 })).toHaveTextContent(
        point.title,
      );
      expect(points[index]).toHaveTextContent(point.body);
    });
    expect(sceneFor(riseScene)).toBe(true);
  });
});

describe('Quote', () => {
  it('sets the quotation with its source', () => {
    render(<Quote content={quote} />);
    expect(screen.getByText(`“${quote.text}”`)).toBeInTheDocument();
    expect(screen.getByText(`— ${quote.cite}`)).toBeInTheDocument();
  });
});

describe('PageHero', () => {
  it('shows the kicker, title with accent, intro and an index of in-page links', () => {
    render(
      <PageHero
        header={<div data-testid="header" />}
        content={aboutHero}
        contentId="main-content"
        index={aboutIndex}
        indexLabel="On this page"
      />,
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Inside Hiranmaye.');
    expect(screen.getByText(aboutHero.intro!)).toBeInTheDocument();
    const index = screen.getByRole('navigation', { name: 'On this page' });
    expect(within(index).getAllByRole('link')).toHaveLength(aboutIndex.length);
    expect(within(index).getByRole('link', { name: 'Our story' })).toHaveAttribute(
      'href',
      '#story',
    );
    expect(document.getElementById('main-content')).toHaveAttribute('tabindex', '-1');
    expect(sceneFor(pageHeroScene)).toBe(true);
  });

  it('copes with just a kicker and a title', () => {
    render(
      <PageHero
        header={null}
        content={{ kicker: 'Kicker', title: 'Plain title' }}
        contentId="main-content"
      />,
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Plain title');
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });
});

describe('Story', () => {
  it('asks the founding question and tells the story', () => {
    render(<Story content={story} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      `${story.lead} ${story.question}`,
    );
    for (const paragraph of story.paragraphs) {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    }
  });
});

describe('VisionMission', () => {
  it('names and states the vision and the mission', () => {
    render(<VisionMission content={visionMission} />);
    expect(screen.getByRole('heading', { name: 'Vision' })).toBeInTheDocument();
    expect(screen.getByText(visionMission.vision.text)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Mission' })).toBeInTheDocument();
    expect(screen.getByText(visionMission.mission.text)).toBeInTheDocument();
  });
});

describe('Team', () => {
  it('introduces the founder in full, then the team and the board', () => {
    render(<Team content={team} />);
    expect(screen.getByRole('heading', { level: 2, name: team.heading })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: team.founder.name })).toBeInTheDocument();
    for (const paragraph of team.founder.bio) {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    }
    for (const person of [...team.team, ...team.board]) {
      expect(screen.getByRole('heading', { name: person.name })).toBeInTheDocument();
    }
    expect(screen.getAllByText('Board Member')).toHaveLength(team.board.length);
  });

  it('opens a long profile with its first paragraph and keeps the rest behind a disclosure', async () => {
    render(<Team content={team} />);
    const praveena = team.team[0];
    const card = screen.getByRole('heading', { name: praveena.name }).closest('article')!;
    expect(card).toHaveTextContent(praveena.bio[0]);
    const summary = within(card).getByText(team.moreLabel);
    const details = summary.closest('details')!;
    expect(details).not.toHaveAttribute('open');
    await userEvent.click(summary);
    expect(details).toHaveAttribute('open');
    expect(within(details).getByText(praveena.bio[3])).toBeInTheDocument();
  });

  it('shows a name-only card while a profile is still to come', () => {
    render(<Team content={team} />);
    const card = screen.getByRole('heading', { name: 'Harshitha Girish' }).closest('article')!;
    expect(card.querySelectorAll('p')).toHaveLength(0);
    expect(within(card).queryByText(team.moreLabel)).not.toBeInTheDocument();
  });
});

describe('SolutionsList', () => {
  const renderList = () => render(<SolutionsList content={solutionsPage} solutions={solutions} />);
  const entry = (id: string) => document.getElementById(id) as HTMLElement;

  it('gives every solution its own anchor, number and heading', () => {
    renderList();
    expect(screen.getAllByRole('article')).toHaveLength(13);
    solutions.forEach((solution) => {
      expect(within(entry(solution.id)).getByRole('heading', { level: 2 })).toHaveTextContent(
        solution.name,
      );
    });
    expect(sceneFor(riseScene)).toBe(true);
  });

  it('renders each part an entry has: details, outcome and its own call to action', () => {
    renderList();
    const strategy = entry('digital-marketing-strategy');
    expect(within(strategy).getByText('What we solve')).toBeInTheDocument();
    expect(within(strategy).getByText('What we do')).toBeInTheDocument();
    expect(within(strategy).getByText(solutionsPage.outcomeLabel)).toBeInTheDocument();
    expect(
      within(strategy).getByRole('link', { name: 'Build your growth blueprint' }),
    ).toHaveAttribute('href', '#contact');
  });

  it('opens Performance Marketing with its quotation instead of a headline', () => {
    renderList();
    const performance = entry('performance-marketing');
    expect(within(performance).getByText('“A penny saved is a penny earned.”')).toBeInTheDocument();
    expect(within(performance).getByText('— Benjamin Franklin')).toBeInTheDocument();
  });

  it('splits SEO • AEO • GEO into its three promises', () => {
    renderList();
    const search = entry('seo-aeo-geo');
    for (const promise of ['Be ranked.', 'Be answered.', 'Be referenced.']) {
      expect(within(search).getByText(promise)).toBeInTheDocument();
    }
  });

  it('leaves out an outcome the brief left blank, and falls back to the default call to action', () => {
    renderList();
    expect(within(entry('content-marketing')).queryByText(solutionsPage.outcomeLabel)).toBeNull();
    const photoshoot = entry('product-photoshoot');
    expect(
      within(photoshoot).getByText('From shelf to screen. From glance to purchase.'),
    ).toBeInTheDocument();
    expect(
      within(photoshoot).getByRole('link', { name: solutionsPage.defaultCta }),
    ).toBeInTheDocument();
  });
});
