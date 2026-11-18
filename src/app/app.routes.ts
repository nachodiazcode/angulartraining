import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/pokedex/pokedex').then((m) => m.PokedexPage),
    title: 'Pokédex 2026 · Angular 22',
  },
  {
    path: 'tutorial',
    loadComponent: () => import('./pages/tutorial/tutorial').then((m) => m.TutorialPage),
    title: 'Tutorial Paso a Paso · Angular 22 con Pokémon',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
