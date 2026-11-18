export type PokemonType =
  | 'grass'
  | 'poison'
  | 'fire'
  | 'water'
  | 'electric'
  | 'ghost'
  | 'fighting'
  | 'steel';

export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  hp: number;
  attack: number;
  sprite: string;
}

export const TYPE_BADGE_CLASSES: Record<PokemonType, string> = {
  grass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  poison: 'bg-purple-100 text-purple-800 border-purple-300',
  fire: 'bg-orange-100 text-orange-800 border-orange-300',
  water: 'bg-sky-100 text-sky-800 border-sky-300',
  electric: 'bg-amber-100 text-amber-800 border-amber-300',
  ghost: 'bg-indigo-100 text-indigo-800 border-indigo-300',
  fighting: 'bg-rose-100 text-rose-800 border-rose-300',
  steel: 'bg-slate-200 text-slate-800 border-slate-400',
};

const artworkUrl = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export const STARTER_POKEMON: Pokemon[] = [
  { id: 1, name: 'Bulbasaur', types: ['grass', 'poison'], hp: 45, attack: 49, sprite: artworkUrl(1) },
  { id: 4, name: 'Charmander', types: ['fire'], hp: 39, attack: 52, sprite: artworkUrl(4) },
  { id: 7, name: 'Squirtle', types: ['water'], hp: 44, attack: 48, sprite: artworkUrl(7) },
  { id: 25, name: 'Pikachu', types: ['electric'], hp: 35, attack: 55, sprite: artworkUrl(25) },
  { id: 94, name: 'Gengar', types: ['ghost', 'poison'], hp: 60, attack: 65, sprite: artworkUrl(94) },
  { id: 448, name: 'Lucario', types: ['fighting', 'steel'], hp: 70, attack: 110, sprite: artworkUrl(448) },
];
