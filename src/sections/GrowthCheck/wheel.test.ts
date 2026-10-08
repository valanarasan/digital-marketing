import { labelSpot, restTurn, sliceClip, splitLabel, turnTo } from './wheel';

describe('growth wheel geometry', () => {
  it('rests a slice at the pointer, or the pointer on a spoke when none is picked', () => {
    expect(restTurn(0, 5)).toBe(90);
    expect(restTurn(3, 5)).toBe(234);
    expect(restTurn(-1, 5)).toBe(54);
  });

  it('spins forward at least one full turn', () => {
    expect(turnTo(90, 0, 5, 'spin')).toBe(450);
    expect(turnTo(90, 1, 5, 'spin')).toBe(738);
    expect(turnTo(-30, 0, 5, 'spin')).toBe(450);
  });

  it('steps the short way round', () => {
    expect(turnTo(90, 1, 5, 'step')).toBe(18);
    expect(turnTo(90, 4, 5, 'step')).toBe(162);
    expect(turnTo(450, 0, 5, 'step')).toBe(450);
  });

  it('cuts each slice from the centre, reaching past the rim', () => {
    expect(sliceClip(0, 4)).toBe('polygon(50% 50%, -3.03% -3.03%, 50% -25%, 103.03% -3.03%)');
  });

  it('places labels on the slice centre line', () => {
    expect(labelSpot(0, 4, 30)).toEqual({ left: '50%', top: '20%' });
    expect(labelSpot(1, 4, 30)).toEqual({ left: '80%', top: '50%' });
  });

  it('gives the last word of a label its own line', () => {
    expect(splitLabel('Poor Website Conversion')).toEqual(['Poor Website', 'Conversion']);
    expect(splitLabel('Leads')).toEqual(['', 'Leads']);
  });
});
