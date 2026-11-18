import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  Pokemon,
  PokemonType,
  STARTER_POKEMON,
  TYPE_BADGE_CLASSES,
} from '../../models/pokemon';
import { PokeIdPipe } from '../../pipes/poke-id-pipe';
import { TeamStore } from '../../services/team-store';

@Component({
  selector: 'app-pokedex-page',
  imports: [RouterLink, PokeIdPipe],
  templateUrl: './pokedex.html',
})
export class PokedexPage {
  protected readonly teamStore = inject(TeamStore);

  protected readonly availableTypes: (PokemonType | 'all')[] = [
    'all',
    'grass',
    'fire',
    'water',
    'electric',
    'ghost',
    'fighting',
  ];
  protected readonly typeBadgeClasses = TYPE_BADGE_CLASSES;

  protected readonly pokemonList = signal<Pokemon[]>(STARTER_POKEMON);
  protected readonly searchQuery = signal('');
  protected readonly selectedType = signal<PokemonType | 'all'>('all');

  protected readonly filteredPokemon = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const type = this.selectedType();

    return this.pokemonList().filter((pokemon) => {
      const matchesName = pokemon.name.toLowerCase().includes(query);
      const matchesType = type === 'all' || pokemon.types.includes(type);
      return matchesName && matchesType;
    });
  });

  protected toggleCapture(pokemon: Pokemon): void {
    this.teamStore.togglePokemon({
      id: pokemon.id,
      name: pokemon.name,
      sprite: pokemon.sprite,
    });
  }

  protected resetFilters(): void {
    this.searchQuery.set('');
    this.selectedType.set('all');
  }
}
