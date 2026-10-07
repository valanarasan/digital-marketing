import { render, screen, within } from '@testing-library/react';
import { App } from '@/App';
import { solutions, team } from '@/content';
import { AboutPage } from './AboutPage';
import { SolutionsPage } from './SolutionsPage';

const currentLink = () =>
  within(screen.getByRole('navigation', { name: 'Primary' })).getByRole('link', {
    current: 'page',
  });

describe('AboutPage', () => {
  it('lays out Inside Hiranmaye in order, with its menu link marked current', () => {
    render(<AboutPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Inside Hiranmaye.');
    const ids = Array.from(screen.getByRole('main').querySelectorAll('section[id]')).map(
      (section) => section.id,
    );
    expect(ids).toEqual(['about', 'story', 'vision', 'team', 'clients']);
    expect(screen.getByRole('heading', { name: team.founder.name })).toBeInTheDocument();
    expect(screen.getByText('Jeeva')).toBeInTheDocument();
    expect(currentLink()).toHaveTextContent('Inside Hiranmaye');
    expect(document.getElementById('contact')?.tagName).toBe('FOOTER');
  });
});

describe('SolutionsPage', () => {
  it('indexes all thirteen solutions under the title and lists them in full', () => {
    render(<SolutionsPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'One Growth Partner. Multiple Growth Levers.',
    );
    const index = screen.getByRole('navigation', { name: 'Jump to a solution' });
    const links = within(index).getAllByRole('link');
    expect(links).toHaveLength(solutions.length);
    expect(links[0]).toHaveAttribute('href', `#${solutions[0].id}`);
    expect(screen.getAllByRole('article')).toHaveLength(solutions.length);
    expect(currentLink()).toHaveTextContent('Solutions');
  });

  it('shares the skip link shell with the other pages', () => {
    render(
      <App>
        <SolutionsPage />
      </App>,
    );
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute(
      'href',
      '#main-content',
    );
    expect(document.getElementById('main-content')).toContainElement(
      screen.getByRole('heading', { level: 1 }),
    );
  });
});
