import { cx } from './cx';
import { resolveHref } from './href';
import { initials } from './initials';
import { findLever, leverForProblem } from './levers';
import { whatsappLink } from './whatsapp';
import { levers, problems } from '@/content';

describe('cx', () => {
  it('joins truthy class names and drops the rest', () => {
    expect(cx('a', false, 'b', null, undefined, 0, 'c')).toBe('a b c');
  });

  it('returns an empty string when nothing is truthy', () => {
    expect(cx(false, null)).toBe('');
  });
});

describe('whatsappLink', () => {
  it('strips everything but digits from the number', () => {
    expect(whatsappLink('+91 99006-68383')).toBe('https://wa.me/919900668383');
  });

  it('URL-encodes an opening message', () => {
    expect(whatsappLink('919900668383', 'Hi there & hello')).toBe(
      'https://wa.me/919900668383?text=Hi%20there%20%26%20hello',
    );
  });
});

describe('findLever', () => {
  it('returns the lever with the given id', () => {
    expect(findLever(levers, 'results').title).toBe('Get Results');
  });

  it('throws on an unknown id, because content is static', () => {
    expect(() => findLever([], 'found')).toThrow('Unknown growth lever: found');
  });
});

describe('leverForProblem', () => {
  it('maps every problem to a real lever', () => {
    for (const problem of problems) {
      expect(leverForProblem(problems, levers, problem.id)?.id).toBe(problem.lever);
    }
  });

  it('returns null when nothing is selected or the id is unknown', () => {
    expect(leverForProblem(problems, levers, null)).toBeNull();
    expect(leverForProblem(problems, levers, 'nope')).toBeNull();
  });
});

describe('resolveHref', () => {
  it('prefixes page paths with the deploy base', () => {
    expect(resolveHref('solutions/')).toBe('/solutions/');
    expect(resolveHref('', '/digital-marketing/')).toBe('/digital-marketing/');
    expect(resolveHref('/inside-hiranmaye/', '/digital-marketing/')).toBe(
      '/digital-marketing/inside-hiranmaye/',
    );
  });

  it('leaves anchors and absolute URLs alone', () => {
    expect(resolveHref('#contact', '/x/')).toBe('#contact');
    expect(resolveHref('https://wa.me/1', '/x/')).toBe('https://wa.me/1');
    expect(resolveHref('mailto:a@b.c', '/x/')).toBe('mailto:a@b.c');
  });
});

describe('initials', () => {
  it('takes the first and last initials', () => {
    expect(initials('Vijayalakshmi Girish')).toBe('VG');
    expect(initials('  abhishek kumar mishra ')).toBe('AM');
  });

  it('copes with a single name and with nothing', () => {
    expect(initials('Jeeva')).toBe('J');
    expect(initials('   ')).toBe('');
  });
});
