import { cx } from './cx';
import { findLever, leverForProblem } from './levers';
import { mapEmbedUrl } from './maps';
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

describe('mapEmbedUrl', () => {
  const office = {
    latitude: 12.9287471,
    longitude: 77.5625986,
    mapsUrl: 'https://maps.app.goo.gl/x',
  };

  it('drops the pin on the exact coordinates at street zoom', () => {
    expect(mapEmbedUrl(office)).toBe(
      'https://maps.google.com/maps?q=12.9287471,77.5625986&z=16&hl=en&output=embed',
    );
  });

  it('takes another zoom level', () => {
    expect(mapEmbedUrl(office, 13)).toContain('&z=13&');
  });
});
