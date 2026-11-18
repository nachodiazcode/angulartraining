import { TestBed } from '@angular/core/testing';
import { TeamStore } from './team-store';

describe('TeamStore', () => {
  let store: TeamStore;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    store = TestBed.inject(TeamStore);
  });

  it('adds and removes Pokémon reactively up to 6 slots', () => {
    store.togglePokemon({ id: 25, name: 'Pikachu', sprite: 'pikachu.png' });
    expect(store.count()).toBe(1);
    expect(store.hasPokemon(25)).toBe(true);

    store.togglePokemon({ id: 25, name: 'Pikachu', sprite: 'pikachu.png' });
    expect(store.count()).toBe(0);
  });
});
