import { computed, effect, Injectable, signal } from '@angular/core';

export interface TeamPokemon {
  id: number;
  name: string;
  sprite: string;
}

const STORAGE_KEY = 'pokedex_2026_team';

@Injectable({
  providedIn: 'root',
})
export class TeamStore {
  private readonly members = signal<TeamPokemon[]>(this.loadInitialTeam());

  // Señales públicas de solo lectura
  readonly team = this.members.asReadonly();
  readonly count = computed(() => this.members().length);
  readonly isFull = computed(() => this.members().length >= 6);

  constructor() {
    // Sincroniza automáticamente con localStorage cada vez que cambia members()
    effect(() => {
      const current = this.members();
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
      }
    });
  }

  hasPokemon(id: number): boolean {
    return this.members().some((p) => p.id === id);
  }

  togglePokemon(pokemon: TeamPokemon): void {
    this.members.update((current) => {
      if (current.some((p) => p.id === pokemon.id)) {
        return current.filter((p) => p.id !== pokemon.id);
      }
      if (current.length >= 6) {
        return current;
      }
      return [...current, pokemon];
    });
  }

  clearTeam(): void {
    this.members.set([]);
  }

  private loadInitialTeam(): TeamPokemon[] {
    if (typeof localStorage === 'undefined') {
      return [];
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as TeamPokemon[]) : [];
    } catch {
      return [];
    }
  }
}
