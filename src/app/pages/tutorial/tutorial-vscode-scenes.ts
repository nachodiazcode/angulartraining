import { StepId } from './tutorial-steps';

export interface VscodeFileTab {
  id: 'ts' | 'html';
  filename: string;
  path: string;
  badgeColor: string;
  code: string;
}

export interface VscodeExplorerItem {
  name: string;
  depth: number;
  kind: 'folder' | 'ts' | 'html' | 'spec';
  activeTabId?: 'ts' | 'html';
  gitStatus?: 'M' | 'U';
}

export interface VscodeKeyframe {
  /** Progreso normalizado (0 a 1) dentro del capítulo */
  at: number;
  activeTab: 'ts' | 'html';
  /** Proporción escrita de cada archivo (0 a 1) en este punto */
  tsProgress: number;
  htmlProgress: number;
  /** Línea enfocada (1-based) dentro de la pestaña activa */
  focusLine: number;
  /** Burbuja tipo IntelliSense / Angular Language Service */
  hint?: string;
  /** Líneas visibles en la terminal integrada de VS Code */
  terminalLines: { text: string; tone?: 'cmd' | 'ok' | 'info' | 'warn' }[];
}

export interface VscodeScene {
  stepId: StepId;
  windowTitle: string;
  statusBranch: string;
  explorer: VscodeExplorerItem[];
  tabs: [VscodeFileTab, VscodeFileTab];
  keyframes: VscodeKeyframe[];
}

export const VSCODE_SCENES: VscodeScene[] = [
  {
    stepId: 1,
    windowTitle: 'ficha-inicial.ts — pokedex-2026 — Visual Studio Code',
    statusBranch: 'feat/mod-01-component',
    explorer: [
      { name: 'src/app', depth: 0, kind: 'folder' },
      { name: 'components', depth: 1, kind: 'folder' },
      { name: 'ficha-inicial.ts', depth: 2, kind: 'ts', activeTabId: 'ts', gitStatus: 'U' },
      { name: 'ficha-inicial.html', depth: 2, kind: 'html', activeTabId: 'html', gitStatus: 'U' },
    ],
    tabs: [
      {
        id: 'ts',
        filename: 'ficha-inicial.ts',
        path: 'src/app/components/ficha-inicial.ts',
        badgeColor: 'text-sky-400',
        code: `import { Component } from '@angular/core';

@Component({
  selector: 'app-ficha-inicial',
  templateUrl: './ficha-inicial.html',
  styleUrl: './ficha-inicial.css',
})
export class FichaInicial {
  protected nombre = 'Bulbasaur';
  protected numero = 1;
  protected region = 'Kanto';
  protected pesoKg = 6.9;
}`,
      },
      {
        id: 'html',
        filename: 'ficha-inicial.html',
        path: 'src/app/components/ficha-inicial.html',
        badgeColor: 'text-amber-400',
        code: `<article class="card">
  <span>Región {{ region }} · Nº {{ numero }}</span>
  <h2>{{ nombre }}</h2>
  <p>Peso en gramos: {{ pesoKg * 1000 }} g</p>
</article>`,
      },
    ],
    keyframes: [
      {
        at: 0.0,
        activeTab: 'ts',
        tsProgress: 0.25,
        htmlProgress: 0.0,
        focusLine: 3,
        hint: '@Component: standalone por defecto en Angular 22 (sin NgModules)',
        terminalLines: [
          { text: '$ npx ng generate component ficha-inicial', tone: 'cmd' },
          { text: 'CREATE src/app/components/ficha-inicial.ts', tone: 'ok' },
        ],
      },
      {
        at: 0.28,
        activeTab: 'ts',
        tsProgress: 0.72,
        htmlProgress: 0.0,
        focusLine: 9,
        hint: 'Propiedades protected de la clase quedan visibles directo en el HTML',
        terminalLines: [
          { text: '$ npx ng serve', tone: 'cmd' },
          { text: 'Watching for file changes...', tone: 'info' },
        ],
      },
      {
        at: 0.50,
        activeTab: 'ts',
        tsProgress: 1.0,
        htmlProgress: 0.0,
        focusLine: 12,
        hint: 'pesoKg = 6.9 tipado automáticamente como number',
        terminalLines: [
          { text: '$ npx ng serve', tone: 'cmd' },
          { text: '✔ Application bundle generation complete. [184 ms]', tone: 'ok' },
        ],
      },
      {
        at: 0.65,
        activeTab: 'html',
        tsProgress: 1.0,
        htmlProgress: 0.65,
        focusLine: 3,
        hint: 'Interpolación {{ nombre }} conecta TS → HTML en tiempo real',
        terminalLines: [
          { text: '$ npx ng serve', tone: 'cmd' },
          { text: 'HMR update: ficha-inicial.html', tone: 'info' },
        ],
      },
      {
        at: 0.85,
        activeTab: 'html',
        tsProgress: 1.0,
        htmlProgress: 1.0,
        focusLine: 4,
        hint: '{{ pesoKg * 1000 }} → renderiza "6900 g" al instante',
        terminalLines: [
          { text: '$ npx ng serve', tone: 'cmd' },
          { text: '✔ Compiled successfully · http://localhost:4200', tone: 'ok' },
        ],
      },
    ],
  },
  {
    stepId: 2,
    windowTitle: 'centro-pokemon.ts — pokedex-2026 — Visual Studio Code',
    statusBranch: 'feat/mod-02-dom-bindings',
    explorer: [
      { name: 'src/app', depth: 0, kind: 'folder' },
      { name: 'components', depth: 1, kind: 'folder' },
      { name: 'centro-pokemon.ts', depth: 2, kind: 'ts', activeTabId: 'ts', gitStatus: 'M' },
      { name: 'centro-pokemon.html', depth: 2, kind: 'html', activeTabId: 'html', gitStatus: 'M' },
    ],
    tabs: [
      {
        id: 'ts',
        filename: 'centro-pokemon.ts',
        path: 'src/app/components/centro-pokemon.ts',
        badgeColor: 'text-sky-400',
        code: `export class CentroPokemon {
  protected hp = 40; // de 100
  protected grito = '¡Pika Pika!';

  protected curar(): void {
    this.hp = Math.min(100, this.hp + 25);
  }

  protected recibirGolpe(): void {
    this.hp = Math.max(0, this.hp - 30);
  }
}`,
      },
      {
        id: 'html',
        filename: 'centro-pokemon.html',
        path: 'src/app/components/centro-pokemon.html',
        badgeColor: 'text-amber-400',
        code: `<!-- Barra de vida con [style.width.%] -->
<div class="barra" [style.width.%]="hp"></div>

<!-- Eventos (click) y propiedad [disabled] -->
<button (click)="curar()" [disabled]="hp === 100">
  Usar Poción (+25 PS)
</button>

<!-- Referencia local #gritoInput -->
<input #gritoInput (keydown.enter)="grito = gritoInput.value" />`,
      },
    ],
    keyframes: [
      {
        at: 0.0,
        activeTab: 'ts',
        tsProgress: 0.45,
        htmlProgress: 0.0,
        focusLine: 5,
        hint: 'Métodos curar() y recibirGolpe() mutan el estado desde eventos del DOM',
        terminalLines: [
          { text: '$ npx ng serve', tone: 'cmd' },
          { text: 'Editing centro-pokemon.ts...', tone: 'info' },
        ],
      },
      {
        at: 0.30,
        activeTab: 'ts',
        tsProgress: 1.0,
        htmlProgress: 0.0,
        focusLine: 10,
        terminalLines: [
          { text: '$ npx ng serve', tone: 'cmd' },
          { text: '✔ TypeScript check: 0 errors', tone: 'ok' },
        ],
      },
      {
        at: 0.45,
        activeTab: 'html',
        tsProgress: 1.0,
        htmlProgress: 0.38,
        focusLine: 2,
        hint: '[style.width.%]="hp" → enlaza propiedades TS → DOM con unidad % nativa',
        terminalLines: [
          { text: '$ npx ng serve', tone: 'cmd' },
          { text: 'Binding [style.width.%] = 40%', tone: 'info' },
        ],
      },
      {
        at: 0.70,
        activeTab: 'html',
        tsProgress: 1.0,
        htmlProgress: 0.72,
        focusLine: 5,
        hint: '(click)="curar()" → flujo DOM → TypeScript',
        terminalLines: [
          { text: '$ npx ng serve', tone: 'cmd' },
          { text: 'Event (click) → curar() → hp = 65', tone: 'ok' },
        ],
      },
      {
        at: 0.85,
        activeTab: 'html',
        tsProgress: 1.0,
        htmlProgress: 1.0,
        focusLine: 10,
        hint: '#gritoInput crea referencia directa al <input> sin querySelector',
        terminalLines: [
          { text: '$ npx ng serve', tone: 'cmd' },
          { text: '✔ Template compiled · Zero DOM queries needed', tone: 'ok' },
        ],
      },
    ],
  },
  {
    stepId: 3,
    windowTitle: 'poke-id-pipe.ts — pokedex-2026 — Visual Studio Code',
    statusBranch: 'feat/mod-03-pipes',
    explorer: [
      { name: 'src/app', depth: 0, kind: 'folder' },
      { name: 'pipes', depth: 1, kind: 'folder' },
      { name: 'poke-id-pipe.ts', depth: 2, kind: 'ts', activeTabId: 'ts', gitStatus: 'U' },
      { name: 'ficha-pipe.html', depth: 2, kind: 'html', activeTabId: 'html', gitStatus: 'M' },
    ],
    tabs: [
      {
        id: 'ts',
        filename: 'poke-id-pipe.ts',
        path: 'src/app/pipes/poke-id-pipe.ts',
        badgeColor: 'text-sky-400',
        code: `import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'pokeId' })
export class PokeIdPipe implements PipeTransform {
  transform(id: number, digits = 3): string {
    return \`#\${String(id).padStart(digits, '0')}\`;
  }
}`,
      },
      {
        id: 'html',
        filename: 'ficha-pipe.html',
        path: 'src/app/pages/ficha-pipe.html',
        badgeColor: 'text-amber-400',
        code: `<!-- Nuestro @Pipe personalizado + Pipes nativos -->
<span>{{ 25 | pokeId }}</span>               <!-- #025 -->
<h4>{{ 'snorlax' | uppercase }}</h4>          <!-- SNORLAX -->
<p>Captura: {{ 0.119 | percent:'1.0-1' }}</p> <!-- 11.9% -->
<p>Precio: {{ 1200 | currency:'USD' }}</p>    <!-- $1,200.00 -->`,
      },
    ],
    keyframes: [
      {
        at: 0.0,
        activeTab: 'ts',
        tsProgress: 0.45,
        htmlProgress: 0.0,
        focusLine: 3,
        hint: '@Pipe({ name: "pokeId" }) — puro por defecto (memoizado)',
        terminalLines: [
          { text: '$ npx ng generate pipe pipes/poke-id', tone: 'cmd' },
          { text: 'CREATE src/app/pipes/poke-id-pipe.ts', tone: 'ok' },
        ],
      },
      {
        at: 0.35,
        activeTab: 'ts',
        tsProgress: 1.0,
        htmlProgress: 0.0,
        focusLine: 6,
        hint: '25 sigue siendo number en TS; en vista sale "#025"',
        terminalLines: [
          { text: '$ npx ng test --watch=false', tone: 'cmd' },
          { text: '✓ PokeIdPipe: transform(25) === "#025"', tone: 'ok' },
        ],
      },
      {
        at: 0.55,
        activeTab: 'html',
        tsProgress: 1.0,
        htmlProgress: 0.55,
        focusLine: 3,
        hint: 'Pipes nativos de @angular/common: uppercase, percent, currency',
        terminalLines: [
          { text: '$ npx ng serve', tone: 'cmd' },
          { text: 'Rendering: #025 · SNORLAX · 11.9%', tone: 'info' },
        ],
      },
      {
        at: 0.80,
        activeTab: 'html',
        tsProgress: 1.0,
        htmlProgress: 1.0,
        focusLine: 5,
        hint: 'Solo se recalcula si cambia el valor de entrada',
        terminalLines: [
          { text: '$ npx ng serve', tone: 'cmd' },
          { text: '✔ Pure pipe memoized · 0 unnecessary runs', tone: 'ok' },
        ],
      },
    ],
  },
  {
    stepId: 4,
    windowTitle: 'mochila.html — pokedex-2026 — Visual Studio Code',
    statusBranch: 'feat/mod-04-control-flow',
    explorer: [
      { name: 'src/app', depth: 0, kind: 'folder' },
      { name: 'pages', depth: 1, kind: 'folder' },
      { name: 'mochila.ts', depth: 2, kind: 'ts', activeTabId: 'ts', gitStatus: 'M' },
      { name: 'mochila.html', depth: 2, kind: 'html', activeTabId: 'html', gitStatus: 'M' },
    ],
    tabs: [
      {
        id: 'ts',
        filename: 'mochila.ts',
        path: 'src/app/pages/mochila.ts',
        badgeColor: 'text-sky-400',
        code: `interface MochilaItem {
  id: number;
  nombre: string;
  categoria: 'curacion' | 'captura' | 'especial';
  cantidad: number;
}

readonly itemsVisibles = signal<MochilaItem[]>([
  { id: 1, nombre: 'Superpoción', categoria: 'curacion', cantidad: 5 },
  { id: 2, nombre: 'Ultra Ball', categoria: 'captura', cantidad: 12 },
]);`,
      },
      {
        id: 'html',
        filename: 'mochila.html',
        path: 'src/app/pages/mochila.html',
        badgeColor: 'text-amber-400',
        code: `@for (item of itemsVisibles(); track item.id) {
  @let agotado = item.cantidad === 0;

  @switch (item.categoria) {
    @case ('curacion')
    @case ('captura') {
      <span>Objeto estándar de tienda</span>
    }
    @default {
      <span>Objeto raro de liga</span>
    }
  }
} @empty {
  <p>¡Tu mochila está vacía!</p>
}`,
      },
    ],
    keyframes: [
      {
        at: 0.0,
        activeTab: 'ts',
        tsProgress: 1.0,
        htmlProgress: 0.0,
        focusLine: 8,
        hint: 'Sin *ngIf ni *ngFor: todo viene integrado en el compilador de Angular 22',
        terminalLines: [
          { text: '$ npx ng serve', tone: 'cmd' },
          { text: 'Built-in control flow ready', tone: 'info' },
        ],
      },
      {
        at: 0.30,
        activeTab: 'html',
        tsProgress: 1.0,
        htmlProgress: 0.30,
        focusLine: 1,
        hint: 'track item.id recicla nodos DOM sin destruir elementos',
        terminalLines: [
          { text: '$ npx ng serve', tone: 'cmd' },
          { text: '@for tracking by item.id', tone: 'info' },
        ],
      },
      {
        at: 0.55,
        activeTab: 'html',
        tsProgress: 1.0,
        htmlProgress: 0.72,
        focusLine: 6,
        hint: 'Novedad Angular 22: @case agrupados comparten bloque sin repetir HTML',
        terminalLines: [
          { text: '$ npx ng serve', tone: 'cmd' },
          { text: '@switch multi-case compiled cleanly', tone: 'ok' },
        ],
      },
      {
        at: 0.80,
        activeTab: 'html',
        tsProgress: 1.0,
        htmlProgress: 1.0,
        focusLine: 13,
        hint: '@empty se activa automático cuando la lista tiene 0 items',
        terminalLines: [
          { text: '$ npx ng serve', tone: 'cmd' },
          { text: '✔ Template compiled · Zero CommonModule imports', tone: 'ok' },
        ],
      },
    ],
  },
  {
    stepId: 5,
    windowTitle: 'entrenamiento.ts — pokedex-2026 — Visual Studio Code',
    statusBranch: 'feat/mod-05-signals-zoneless',
    explorer: [
      { name: 'src/app', depth: 0, kind: 'folder' },
      { name: 'pages', depth: 1, kind: 'folder' },
      { name: 'entrenamiento.ts', depth: 2, kind: 'ts', activeTabId: 'ts', gitStatus: 'M' },
      { name: 'entrenamiento.html', depth: 2, kind: 'html', activeTabId: 'html', gitStatus: 'M' },
    ],
    tabs: [
      {
        id: 'ts',
        filename: 'entrenamiento.ts',
        path: 'src/app/pages/entrenamiento.ts',
        badgeColor: 'text-sky-400',
        code: `import { Component, signal } from '@angular/core';

export class Entrenamiento {
  readonly nivel = signal(12);
  readonly piedraTrueno = signal(false);

  subirNivel(): void {
    this.nivel.update((actual) => actual + 1);
  }

  reiniciar(): void {
    this.nivel.set(12);
    this.piedraTrueno.set(false);
  }
}`,
      },
      {
        id: 'html',
        filename: 'entrenamiento.html',
        path: 'src/app/pages/entrenamiento.html',
        badgeColor: 'text-amber-400',
        code: `<h4>Pikachu · Nv. {{ nivel() }}</h4>

<button (click)="subirNivel()">
  Entrenar con .update() (+1)
</button>
<button (click)="piedraTrueno.set(true)">
  Usar Piedra Trueno con .set(true)
</button>`,
      },
    ],
    keyframes: [
      {
        at: 0.0,
        activeTab: 'ts',
        tsProgress: 0.40,
        htmlProgress: 0.0,
        focusLine: 4,
        hint: 'Zoneless por defecto: Angular sabe exactamente qué nodo actualizar',
        terminalLines: [
          { text: '$ npx ng serve', tone: 'cmd' },
          { text: 'Zone.js: NOT PRESENT (Zoneless mode active)', tone: 'ok' },
        ],
      },
      {
        at: 0.42,
        activeTab: 'ts',
        tsProgress: 0.80,
        htmlProgress: 0.0,
        focusLine: 8,
        hint: '.update(prev => next) para derivar del valor previo de forma inmutable',
        terminalLines: [
          { text: '$ npx ng serve', tone: 'cmd' },
          { text: 'nivel.update(12 => 13)', tone: 'info' },
        ],
      },
      {
        at: 0.65,
        activeTab: 'ts',
        tsProgress: 1.0,
        htmlProgress: 0.35,
        focusLine: 12,
        hint: '.set(nuevoValor) asigna un valor directo',
        terminalLines: [
          { text: '$ npx ng serve', tone: 'cmd' },
          { text: 'piedraTrueno.set(true) → Raichu!', tone: 'ok' },
        ],
      },
      {
        at: 0.80,
        activeTab: 'html',
        tsProgress: 1.0,
        htmlProgress: 1.0,
        focusLine: 1,
        hint: 'Siempre lee una signal llamándola como función: nivel()',
        terminalLines: [
          { text: '$ npx ng serve', tone: 'cmd' },
          { text: '✔ Fine-grained signal update: 0.2ms', tone: 'ok' },
        ],
      },
    ],
  },
  {
    stepId: 6,
    windowTitle: 'shiny-viewer.ts — pokedex-2026 — Visual Studio Code',
    statusBranch: 'feat/mod-06-linked-signal',
    explorer: [
      { name: 'src/app', depth: 0, kind: 'folder' },
      { name: 'pages', depth: 1, kind: 'folder' },
      { name: 'shiny-viewer.ts', depth: 2, kind: 'ts', activeTabId: 'ts', gitStatus: 'M' },
      { name: 'shiny-viewer.html', depth: 2, kind: 'html', activeTabId: 'html', gitStatus: 'M' },
    ],
    tabs: [
      {
        id: 'ts',
        filename: 'shiny-viewer.ts',
        path: 'src/app/pages/shiny-viewer.ts',
        badgeColor: 'text-sky-400',
        code: `import { computed, linkedSignal, signal } from '@angular/core';

readonly selectedId = signal(6); // 6 = Charizard

// Escribible, pero vuelve a false al cambiar selectedId
readonly isShiny = linkedSignal({
  source: this.selectedId,
  computation: () => false,
});

readonly spriteUrl = computed(() => {
  const folder = this.isShiny() ? 'official-artwork/shiny' : 'official-artwork';
  return \`https://.../pokemon/other/\${folder}/\${this.selectedId()}.png\`;
});`,
      },
      {
        id: 'html',
        filename: 'shiny-viewer.html',
        path: 'src/app/pages/shiny-viewer.html',
        badgeColor: 'text-amber-400',
        code: `<button (click)="isShiny.update(v => !v)">
  {{ isShiny() ? '✨ Shiny activo' : 'Activar Shiny ✨' }}
</button>

<button (click)="selectedId.set(130)">
  Cambiar a Gyarados
</button>
<img [src]="spriteUrl()" />`,
      },
    ],
    keyframes: [
      {
        at: 0.0,
        activeTab: 'ts',
        tsProgress: 0.45,
        htmlProgress: 0.0,
        focusLine: 3,
        hint: 'Nunca dupliques estado que pueda derivarse de otra Signal',
        terminalLines: [
          { text: '$ npx ng serve', tone: 'cmd' },
          { text: 'selectedId = 6 (Charizard)', tone: 'info' },
        ],
      },
      {
        at: 0.35,
        activeTab: 'ts',
        tsProgress: 0.78,
        htmlProgress: 0.0,
        focusLine: 6,
        hint: 'linkedSignal: se resetea sola a false cuando cambia selectedId()',
        terminalLines: [
          { text: '$ npx ng serve', tone: 'cmd' },
          { text: 'isShiny.set(true) → Charizard ✨', tone: 'info' },
        ],
      },
      {
        at: 0.62,
        activeTab: 'ts',
        tsProgress: 1.0,
        htmlProgress: 0.0,
        focusLine: 11,
        hint: 'computed() es perezoso y memoizado sin array manual de deps',
        terminalLines: [
          { text: '$ npx ng serve', tone: 'cmd' },
          { text: 'selectedId.set(130) → isShiny reset to false', tone: 'ok' },
        ],
      },
      {
        at: 0.80,
        activeTab: 'html',
        tsProgress: 1.0,
        htmlProgress: 1.0,
        focusLine: 5,
        hint: 'Al cambiar a Gyarados, la URL se recalcula limpia sin effects',
        terminalLines: [
          { text: '$ npx ng serve', tone: 'cmd' },
          { text: '✔ Zero stale state · Zero manual effects', tone: 'ok' },
        ],
      },
    ],
  },
  {
    stepId: 7,
    windowTitle: 'pokeball-picker.ts — pokedex-2026 — Visual Studio Code',
    statusBranch: 'feat/mod-07-component-io',
    explorer: [
      { name: 'src/app', depth: 0, kind: 'folder' },
      { name: 'components', depth: 1, kind: 'folder' },
      { name: 'pokeball-picker.ts', depth: 2, kind: 'ts', activeTabId: 'ts', gitStatus: 'U' },
      { name: 'tutorial.html', depth: 2, kind: 'html', activeTabId: 'html', gitStatus: 'M' },
    ],
    tabs: [
      {
        id: 'ts',
        filename: 'pokeball-picker.ts',
        path: 'src/app/components/pokeball-picker/pokeball-picker.ts',
        badgeColor: 'text-sky-400',
        code: `import { Component, input, model, output } from '@angular/core';

export class PokeballPicker {
  // 1. Entrada obligatoria (Signal de solo lectura)
  readonly pokemonName = input.required<string>();

  // 2. Enlace bidireccional limpio [(selectedBall)]
  readonly selectedBall = model<PokeballType>('Poké Ball');

  // 3. Emisor tipado (Hijo -> Padre)
  readonly throwBall = output<PokeballType>();
}`,
      },
      {
        id: 'html',
        filename: 'tutorial.html',
        path: 'src/app/pages/tutorial/tutorial.html',
        badgeColor: 'text-amber-400',
        code: `<!-- Padre e Hijo sincronizados en tiempo real -->
<app-pokeball-picker
  [pokemonName]="targetLegendary()"
  [(selectedBall)]="chosenBall"
  (throwBall)="handleBallThrow($event)"
/>`,
      },
    ],
    keyframes: [
      {
        at: 0.0,
        activeTab: 'ts',
        tsProgress: 0.45,
        htmlProgress: 0.0,
        focusLine: 5,
        hint: 'input.required<string>() garantiza tipo estricto en compile-time',
        terminalLines: [
          { text: '$ npx ng serve', tone: 'cmd' },
          { text: 'Checking <app-pokeball-picker> inputs...', tone: 'info' },
        ],
      },
      {
        at: 0.35,
        activeTab: 'ts',
        tsProgress: 0.80,
        htmlProgress: 0.0,
        focusLine: 8,
        hint: 'model() genera [selectedBall] + (selectedBallChange) automáticamente',
        terminalLines: [
          { text: '$ npx ng serve', tone: 'cmd' },
          { text: 'Two-way signal sync ready', tone: 'info' },
        ],
      },
      {
        at: 0.58,
        activeTab: 'ts',
        tsProgress: 1.0,
        htmlProgress: 0.0,
        focusLine: 11,
        hint: 'output<PokeballType>() reemplaza el antiguo @Output EventEmitter',
        terminalLines: [
          { text: '$ npx ng serve', tone: 'cmd' },
          { text: '✔ Component contract type-checked', tone: 'ok' },
        ],
      },
      {
        at: 0.78,
        activeTab: 'html',
        tsProgress: 1.0,
        htmlProgress: 1.0,
        focusLine: 4,
        hint: '[(selectedBall)]="chosenBall" sincroniza Padre ↔ Hijo al instante',
        terminalLines: [
          { text: '$ npx ng serve', tone: 'cmd' },
          { text: 'throwBall emitted: "Master Ball" -> Mewtwo!', tone: 'ok' },
        ],
      },
    ],
  },
  {
    stepId: 8,
    windowTitle: 'team-store.ts — pokedex-2026 — Visual Studio Code',
    statusBranch: 'feat/mod-08-services-inject',
    explorer: [
      { name: 'src/app', depth: 0, kind: 'folder' },
      { name: 'services', depth: 1, kind: 'folder' },
      { name: 'team-store.ts', depth: 2, kind: 'ts', activeTabId: 'ts', gitStatus: 'U' },
      { name: 'app.html', depth: 2, kind: 'html', activeTabId: 'html', gitStatus: 'M' },
    ],
    tabs: [
      {
        id: 'ts',
        filename: 'team-store.ts',
        path: 'src/app/services/team-store.ts',
        badgeColor: 'text-sky-400',
        code: `@Injectable({ providedIn: 'root' })
export class TeamStore {
  private readonly members = signal<TeamPokemon[]>(this.loadInitialTeam());

  readonly team = this.members.asReadonly();
  readonly count = computed(() => this.members().length);

  constructor() {
    effect(() => {
      localStorage.setItem('pokedex_2026_team', JSON.stringify(this.members()));
    });
  }
}`,
      },
      {
        id: 'html',
        filename: 'app.html',
        path: 'src/app/app.html',
        badgeColor: 'text-amber-400',
        code: `<!-- Inyectado en cualquier página con inject(TeamStore) -->
<span>Mi Equipo: {{ teamStore.count() }} / 6</span>

@for (poke of teamStore.team(); track poke.id) {
  <img [src]="poke.sprite" [alt]="poke.name" />
}`,
      },
    ],
    keyframes: [
      {
        at: 0.0,
        activeTab: 'ts',
        tsProgress: 0.42,
        htmlProgress: 0.0,
        focusLine: 1,
        hint: 'providedIn: "root" crea un singleton global sin Providers envolventes',
        terminalLines: [
          { text: '$ npx ng test src/app/services/team-store.spec.ts', tone: 'cmd' },
          { text: 'Running TeamStore specs...', tone: 'info' },
        ],
      },
      {
        at: 0.45,
        activeTab: 'ts',
        tsProgress: 0.72,
        htmlProgress: 0.0,
        focusLine: 5,
        hint: '.asReadonly() protege el estado: solo el servicio puede mutar members',
        terminalLines: [
          { text: '$ npx ng test src/app/services/team-store.spec.ts', tone: 'cmd' },
          { text: '✓ adds and removes Pokémon reactively up to 6 slots', tone: 'ok' },
        ],
      },
      {
        at: 0.72,
        activeTab: 'ts',
        tsProgress: 1.0,
        htmlProgress: 0.40,
        focusLine: 10,
        hint: 'effect() solo para sincronizar fuera de Angular (ej. localStorage)',
        terminalLines: [
          { text: '$ localStorage.getItem("pokedex_2026_team")', tone: 'cmd' },
          { text: '[{"id":25,"name":"Pikachu"}] persisted', tone: 'ok' },
        ],
      },
      {
        at: 0.86,
        activeTab: 'html',
        tsProgress: 1.0,
        htmlProgress: 1.0,
        focusLine: 2,
        hint: 'La barra superior y /tutorial reaccionan juntos al mismo TeamStore',
        terminalLines: [
          { text: '$ npx ng serve', tone: 'cmd' },
          { text: '✔ Global reactive store synced across routes', tone: 'ok' },
        ],
      },
    ],
  },
  {
    stepId: 9,
    windowTitle: 'poke-api-logger.ts — pokedex-2026 — Visual Studio Code',
    statusBranch: 'feat/mod-09-http-resource',
    explorer: [
      { name: 'src/app', depth: 0, kind: 'folder' },
      { name: 'interceptors', depth: 1, kind: 'folder' },
      { name: 'poke-api-logger.ts', depth: 2, kind: 'ts', activeTabId: 'ts', gitStatus: 'U' },
      { name: 'pokedex-api.html', depth: 2, kind: 'html', activeTabId: 'html', gitStatus: 'M' },
    ],
    tabs: [
      {
        id: 'ts',
        filename: 'poke-api-logger.ts',
        path: 'src/app/interceptors/poke-api-logger.ts',
        badgeColor: 'text-sky-400',
        code: `export const pokeApiLoggerInterceptor: HttpInterceptorFn = (req, next) => {
  const logStore = inject(HttpLogStore);
  const started = performance.now();

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        logStore.addLog({
          url: req.url,
          status: event.status,
          durationMs: Math.round(performance.now() - started),
        });
      }
    })
  );
};`,
      },
      {
        id: 'html',
        filename: 'pokedex-api.html',
        path: 'src/app/pages/tutorial/pokedex-api.html',
        badgeColor: 'text-amber-400',
        code: `@if (pokemonResource.isLoading()) {
  <p>Consultando PokéAPI con httpResource()...</p>
} @else if (pokemonResource.error()) {
  <p>Error 404 capturado sin romper la vista.</p>
} @else if (pokemonResource.hasValue()) {
  <h4>{{ pokemonResource.value().name }}</h4>
}`,
      },
    ],
    keyframes: [
      {
        at: 0.0,
        activeTab: 'ts',
        tsProgress: 0.38,
        htmlProgress: 0.0,
        focusLine: 2,
        hint: 'HttpInterceptorFn es una función pura que puede usar inject()',
        terminalLines: [
          { text: '$ curl -I https://pokeapi.co/api/v2/pokemon/charizard', tone: 'cmd' },
          { text: 'HTTP/2 200 OK', tone: 'ok' },
        ],
      },
      {
        at: 0.35,
        activeTab: 'ts',
        tsProgress: 0.85,
        htmlProgress: 0.0,
        focusLine: 9,
        hint: 'httpResource() cancela llamadas anteriores obsoletas automáticamente',
        terminalLines: [
          { text: '[Interceptor] GET .../pokemon/charizard', tone: 'info' },
          { text: '200 OK · 38ms', tone: 'ok' },
        ],
      },
      {
        at: 0.60,
        activeTab: 'html',
        tsProgress: 1.0,
        htmlProgress: 0.65,
        focusLine: 3,
        hint: 'Siempre valida error() antes de leer .value()',
        terminalLines: [
          { text: '[Interceptor] GET .../pokemon/missingno-404', tone: 'warn' },
          { text: '404 Not Found · handled safely in UI', tone: 'warn' },
        ],
      },
      {
        at: 0.82,
        activeTab: 'html',
        tsProgress: 1.0,
        htmlProgress: 1.0,
        focusLine: 5,
        hint: 'hasValue() actúa como type guard estricto para pokemonResource.value()',
        terminalLines: [
          { text: '[Interceptor] GET .../pokemon/rayquaza', tone: 'info' },
          { text: '✔ 200 OK · 41ms · Tipado completo', tone: 'ok' },
        ],
      },
    ],
  },
  {
    stepId: 10,
    windowTitle: 'rx-search.ts — pokedex-2026 — Visual Studio Code',
    statusBranch: 'feat/mod-10-rxjs-interop',
    explorer: [
      { name: 'src/app', depth: 0, kind: 'folder' },
      { name: 'pages', depth: 1, kind: 'folder' },
      { name: 'rx-search.ts', depth: 2, kind: 'ts', activeTabId: 'ts', gitStatus: 'M' },
      { name: 'rx-search.html', depth: 2, kind: 'html', activeTabId: 'html', gitStatus: 'M' },
    ],
    tabs: [
      {
        id: 'ts',
        filename: 'rx-search.ts',
        path: 'src/app/pages/rx-search.ts',
        badgeColor: 'text-sky-400',
        code: `import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';

readonly rawSearch = signal('');

// Espera 350ms de calma al teclear antes de emitir
readonly debouncedSearch = toSignal(
  toObservable(this.rawSearch).pipe(
    debounceTime(350),
    distinctUntilChanged()
  ),
  { initialValue: '' }
);`,
      },
      {
        id: 'html',
        filename: 'rx-search.html',
        path: 'src/app/pages/rx-search.html',
        badgeColor: 'text-amber-400',
        code: `<input
  [value]="rawSearch()"
  (input)="onTypeSearch($event)"
  placeholder="Teclea rápido un Pokémon..."
/>
<p>Teclas en Signal: {{ rawSearch() }}</p>
<p>Tras debounceTime(350): {{ debouncedSearch() }}</p>`,
      },
    ],
    keyframes: [
      {
        at: 0.0,
        activeTab: 'ts',
        tsProgress: 0.45,
        htmlProgress: 0.0,
        focusLine: 4,
        hint: 'Signals = estado síncrono · RxJS = coordinación en el tiempo',
        terminalLines: [
          { text: '$ npx ng serve', tone: 'cmd' },
          { text: 'User typing: "g" -> "ga" -> "gar" -> "garchomp"', tone: 'info' },
        ],
      },
      {
        at: 0.48,
        activeTab: 'ts',
        tsProgress: 0.85,
        htmlProgress: 0.0,
        focusLine: 9,
        hint: 'toObservable() + debounceTime(350) ahorra 7 de 8 peticiones al servidor',
        terminalLines: [
          { text: 'Keystrokes: 8 | Emitted HTTP calls: 1', tone: 'ok' },
        ],
      },
      {
        at: 0.75,
        activeTab: 'html',
        tsProgress: 1.0,
        htmlProgress: 1.0,
        focusLine: 7,
        hint: 'toSignal() se desuscribe automáticamente al destruir el componente',
        terminalLines: [
          { text: 'debouncedSearch() = "garchomp"', tone: 'ok' },
          { text: '✔ Zero memory leaks · Zero manual unsubscribe', tone: 'ok' },
        ],
      },
    ],
  },
  {
    stepId: 11,
    windowTitle: 'vgc-form.ts — pokedex-2026 — Visual Studio Code',
    statusBranch: 'feat/mod-11-signal-forms',
    explorer: [
      { name: 'src/app', depth: 0, kind: 'folder' },
      { name: 'pages', depth: 1, kind: 'folder' },
      { name: 'vgc-form.ts', depth: 2, kind: 'ts', activeTabId: 'ts', gitStatus: 'M' },
      { name: 'vgc-form.html', depth: 2, kind: 'html', activeTabId: 'html', gitStatus: 'M' },
    ],
    tabs: [
      {
        id: 'ts',
        filename: 'vgc-form.ts',
        path: 'src/app/pages/vgc-form.ts',
        badgeColor: 'text-sky-400',
        code: `readonly vgcModel = signal({
  trainerName: 'Cynthia',
  slot1Item: 'Vidasfera',
  slot2Item: 'Banda Focus',
  levelCap: 50,
});

readonly vgcForm = form(this.vgcModel, (path) => {
  required(path.trainerName, { message: 'Nombre obligatorio.' });
  minLength(path.trainerName, 3);
  validate(path.slot2Item, ({ value, valueOf }) =>
    value() === valueOf(path.slot1Item)
      ? { kind: 'itemClause', message: 'Item Clause VGC: objeto repetido.' }
      : undefined
  );
});`,
      },
      {
        id: 'html',
        filename: 'vgc-form.html',
        path: 'src/app/pages/vgc-form.html',
        badgeColor: 'text-amber-400',
        code: `<select [formField]="vgcForm.slot1Item">...</select>
<select [formField]="vgcForm.slot2Item">...</select>

@for (err of vgcForm.slot2Item().errors(); track err.kind) {
  <p class="text-rose-400">{{ err.message }}</p>
}`,
      },
    ],
    keyframes: [
      {
        at: 0.0,
        activeTab: 'ts',
        tsProgress: 0.45,
        htmlProgress: 0.0,
        focusLine: 8,
        hint: 'Signal Forms tipados sin strings mágicos de FormGroup.get()',
        terminalLines: [
          { text: '$ npx ng serve', tone: 'cmd' },
          { text: 'vgcModel: Cynthia · Slot 1: Vidasfera', tone: 'info' },
        ],
      },
      {
        at: 0.48,
        activeTab: 'ts',
        tsProgress: 1.0,
        htmlProgress: 0.0,
        focusLine: 11,
        hint: 'validate() + valueOf(path.slot1Item) reevalúa solo al cambiar esos campos',
        terminalLines: [
          { text: 'Rule check: slot2Item === slot1Item ("Vidasfera")', tone: 'warn' },
          { text: '✖ Validation failed: Item Clause VGC', tone: 'warn' },
        ],
      },
      {
        at: 0.78,
        activeTab: 'html',
        tsProgress: 1.0,
        htmlProgress: 1.0,
        focusLine: 4,
        hint: '[formField] enlaza el control nativo con errores reactivos',
        terminalLines: [
          { text: 'Slot 2 changed -> "Banda Focus"', tone: 'info' },
          { text: '✔ vgcForm().valid() === true · Ready to register!', tone: 'ok' },
        ],
      },
    ],
  },
  {
    stepId: 12,
    windowTitle: 'poke-id-pipe.spec.ts — pokedex-2026 — Visual Studio Code',
    statusBranch: 'feat/mod-12-defer-vitest',
    explorer: [
      { name: 'src/app', depth: 0, kind: 'folder' },
      { name: 'pipes', depth: 1, kind: 'folder' },
      { name: 'poke-id-pipe.spec.ts', depth: 2, kind: 'spec', activeTabId: 'ts', gitStatus: 'U' },
      { name: 'tutorial.html', depth: 2, kind: 'html', activeTabId: 'html', gitStatus: 'M' },
    ],
    tabs: [
      {
        id: 'ts',
        filename: 'poke-id-pipe.spec.ts',
        path: 'src/app/pipes/poke-id-pipe.spec.ts',
        badgeColor: 'text-emerald-400',
        code: `import { PokeIdPipe } from './poke-id-pipe';

describe('PokeIdPipe (Vitest)', () => {
  const pipe = new PokeIdPipe();

  it('formatea #025 para Pikachu', () => {
    expect(pipe.transform(25)).toBe('#025');
  });
});`,
      },
      {
        id: 'html',
        filename: 'tutorial.html',
        path: 'src/app/pages/tutorial/tutorial.html',
        badgeColor: 'text-amber-400',
        code: `<div appTypeGlow="dragon">Directiva Host</div>

@defer (on interaction) {
  <app-stats-radar [pokemonName]="'Rayquaza'" [stats]="rayquazaStats" />
} @placeholder {
  <button>Clic para cargar Radar (@defer)</button>
} @loading (minimum 450ms) {
  <p>Descargando chunk diferido...</p>
}`,
      },
    ],
    keyframes: [
      {
        at: 0.0,
        activeTab: 'html',
        tsProgress: 0.0,
        htmlProgress: 0.45,
        focusLine: 3,
        hint: '@defer divide stats-radar en un chunk lazy sin tocar rutas',
        terminalLines: [
          { text: '$ npm run build', tone: 'cmd' },
          { text: 'Lazy chunk: stats-radar -> 1.55 kB', tone: 'info' },
        ],
      },
      {
        at: 0.42,
        activeTab: 'html',
        tsProgress: 0.0,
        htmlProgress: 1.0,
        focusLine: 1,
        hint: 'Directiva [appTypeGlow] usa host: {} sin decoradores @HostListener',
        terminalLines: [
          { text: '$ npm run build', tone: 'cmd' },
          { text: '✔ Initial bundle clean · @defer chunk ready on demand', tone: 'ok' },
        ],
      },
      {
        at: 0.70,
        activeTab: 'ts',
        tsProgress: 1.0,
        htmlProgress: 1.0,
        focusLine: 7,
        hint: 'Vitest 5 corre pruebas unitarias de Angular en milisegundos',
        terminalLines: [
          { text: '$ npx ng test --watch=false', tone: 'cmd' },
          { text: '✓ PokeIdPipe (2 tests) 3ms · Test Files 4 passed (4)', tone: 'ok' },
        ],
      },
    ],
  },
];
