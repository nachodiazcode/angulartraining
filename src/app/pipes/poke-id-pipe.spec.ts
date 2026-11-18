import { PokeIdPipe } from './poke-id-pipe';

describe('PokeIdPipe', () => {
  const pipe = new PokeIdPipe();

  it('formats 25 as #025 by default', () => {
    expect(pipe.transform(25)).toBe('#025');
  });

  it('supports custom digit padding', () => {
    expect(pipe.transform(6, 4)).toBe('#0006');
  });
});
