export type TutorialLevel = 'basico' | 'intermedio' | 'avanzado';

export type StepId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface TutorialStep {
  id: StepId;
  level: TutorialLevel;
  shortTitle: string;
  badge: string;
  title: string;
  summary: string;
  analogy: string;
  keyPoints: string[];
  tsCode: string;
  htmlCode: string;
  challenge: string;
}

export const LEVEL_META: Record<
  TutorialLevel,
  { label: string; subtitle: string; dotClass: string; pillClass: string }
> = {
  basico: {
    label: 'Nivel 1 · Básico',
    subtitle: 'Pasos 1–4 · Desde cero absoluto',
    dotClass: 'bg-emerald-400',
    pillClass: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
  },
  intermedio: {
    label: 'Nivel 2 · Intermedio',
    subtitle: 'Pasos 5–8 · Signals, Componentes y Servicios',
    dotClass: 'bg-amber-400',
    pillClass: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
  },
  avanzado: {
    label: 'Nivel 3 · Avanzado',
    subtitle: 'Pasos 9–12 · HTTP, RxJS, Signal Forms y @defer',
    dotClass: 'bg-rose-400',
    pillClass: 'border-rose-500/40 bg-rose-500/10 text-rose-300',
  },
};

export const TUTORIAL_STEPS: TutorialStep[] = [
  // =========================================================================
  // NIVEL 1: BÁSICO (1 - 4)
  // =========================================================================
  {
    id: 1,
    level: 'basico',
    shortTitle: '1. @Component y {{ }}',
    badge: 'Nivel 1 · Básico · Paso 1 de 12',
    title: 'Anatomía de un @Component e Interpolación {{ }}',
    summary:
      'Toda pantalla o pieza visual en Angular es una clase TypeScript decorada con @Component. No necesitas NgModules: cada componente es independiente (standalone por defecto) y muestra sus datos en el HTML usando llaves dobles {{ }}.',
    analogy:
      'Si vienes de JS/React/Vue: @Component une en una sola pieza limpia la lógica (clase TS), la estructura (HTML) y los estilos encapsulados (CSS), mientras que {{ expresion }} equivale a {expresion} en JSX.',
    keyPoints: [
      'selector define la etiqueta HTML personalizada del componente (por ejemplo, <app-ficha-pokemon>).',
      'Las propiedades públicas o protected de la clase pueden leerse directamente dentro del HTML.',
      'En Angular 22 puedes escribir expresiones matemáticas, template strings y arrow functions directo en {{ }}.',
    ],
    tsCode: `import { Component } from '@angular/core';

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
    htmlCode: `<article class="card">
  <span>Región {{ region }} · Nº {{ numero }}</span>
  <h2>{{ nombre }}</h2>
  <p>Peso en gramos: {{ pesoKg * 1000 }} g</p>
</article>`,
    challenge:
      'Cambia el Pokémon inicial de Kanto en la tarjeta interactiva de abajo para observar cómo el mismo HTML renderiza distintas propiedades de la clase.',
  },
  {
    id: 2,
    level: 'basico',
    shortTitle: '2. [prop], (evento) y #ref',
    badge: 'Nivel 1 · Básico · Paso 2 de 12',
    title: 'Bindings del DOM: Propiedades [ ], Eventos ( ) y Referencias #ref',
    summary:
      'Para conectar atributos HTML dinámicos y acciones del usuario, Angular separa visualmente la dirección de los datos: corchetes [ ] van de TypeScript hacia el HTML, y paréntesis ( ) van del HTML hacia TypeScript.',
    analogy:
      'En lugar de mezclar props y callbacks con la misma sintaxis, Angular te deja ver de un vistazo qué entra al elemento ([disabled], [src]) y qué eventos salen de él ((click), (keydown.enter)).',
    keyPoints: [
      '[src]="url" o [disabled]="vida === 100" enlazan propiedades reales del elemento DOM.',
      '[style.width.%]="porcentaje" permite controlar estilos con unidades CSS sin concatenar strings.',
      '#apodoInput crea una referencia directa al <input> en la plantilla sin usar document.querySelector.',
    ],
    tsCode: `export class CentroPokemon {
  protected hp = 40; // de 100
  protected grito = '¡Pika Pika!';

  protected curar(): void {
    this.hp = Math.min(100, this.hp + 25);
  }

  protected recibirGolpe(): void {
    this.hp = Math.max(0, this.hp - 30);
  }
}`,
    htmlCode: `<!-- Barra de vida con [style.width.%] -->
<div class="barra" [style.width.%]="hp"></div>

<!-- Eventos (click) y propiedad [disabled] -->
<button (click)="curar()" [disabled]="hp === 100">
  Usar Poción (+25 PS)
</button>

<!-- Referencia local #gritoInput -->
<input #gritoInput (keydown.enter)="grito = gritoInput.value" />`,
    challenge:
      'Cura o daña al Pokémon en el Centro Pokémon de abajo: fíjate cómo [style.width.%] anima la barra de PS y [disabled] bloquea el botón al llegar a 100 PS.',
  },
  {
    id: 3,
    level: 'basico',
    shortTitle: '3. Pipes | y @Pipe propio',
    badge: 'Nivel 1 · Básico · Paso 3 de 12',
    title: 'Transformación visual con Pipes (|) nativos y personalizados',
    summary:
      'Los Pipes transforman cómo se ve un dato en pantalla (fechas, monedas, mayúsculas o formatos propios) directamente en el HTML con el operador |, manteniendo tus datos originales intactos.',
    analogy:
      'Piensa en el operador Unix |: el valor entra por la izquierda ({{ 25 | pokeId }}) y sale formateado (#025) como una función pura optimizada por Angular.',
    keyPoints: [
      'Angular incluye pipes listos para usar en @angular/common: UpperCasePipe, DecimalPipe, PercentPipe, CurrencyPipe.',
      'Con @Pipe({ name: "pokeId" }) creas transformadores reutilizables en toda la aplicación.',
      'Los pipes son puros por defecto: Angular solo vuelve a ejecutarlos si cambia su valor de entrada.',
    ],
    tsCode: `// Archivo real: src/app/pipes/poke-id-pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'pokeId' })
export class PokeIdPipe implements PipeTransform {
  transform(id: number, digits = 3): string {
    return \`#\${String(id).padStart(digits, '0')}\`;
  }
}`,
    htmlCode: `<!-- Nuestro @Pipe personalizado + Pipes nativos -->
<span>{{ 143 | pokeId }}</span>              <!-- #143 -->
<h4>{{ 'snorlax' | uppercase }}</h4>          <!-- SNORLAX -->
<p>Captura: {{ 0.119 | percent:'1.0-1' }}</p> <!-- 11.9% -->
<p>Precio: {{ 1200 | currency:'USD' }}</p>    <!-- $1,200.00 -->`,
    challenge:
      'Cambia la cantidad de dígitos de relleno en nuestro PokeIdPipe real de abajo y alterna entre Pokémon para ver los Pipes nativos y personalizados en acción.',
  },
  {
    id: 4,
    level: 'basico',
    shortTitle: '4. @if, @for, @switch, @let',
    badge: 'Nivel 1 · Básico · Paso 4 de 12',
    title: 'Control Flow moderno: @if, @for (track / @empty), @switch múltiple y @let',
    summary:
      'Angular tiene bloques de control integrados en el motor de plantillas (sin importar directivas). En Angular 22, @switch incluso permite agrupar múltiples @case consecutivos para compartir el mismo bloque.',
    analogy:
      'Reemplaza los antiguos *ngIf / *ngFor y los .map() anidados de JSX por bloques legibles que soportan @empty nativo cuando una lista queda vacía.',
    keyPoints: [
      'En @for (item of lista; track item.id), "track" es obligatorio para reciclar nodos DOM con máximo rendimiento.',
      '@empty se muestra automáticamente cuando el arreglo de @for tiene 0 elementos.',
      'Novedad Angular 22: @case ("pocion") @case ("revivir") { ... } agrupa varios casos sin duplicar HTML.',
    ],
    tsCode: `interface MochilaItem {
  id: number;
  nombre: string;
  categoria: 'curacion' | 'captura' | 'especial';
  cantidad: number;
}
// Filtramos por categoría o vaciamos la mochila para probar @empty`,
    htmlCode: `@for (item of itemsVisibles(); track item.id) {
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
    challenge:
      'Filtra los objetos de tu mochila abajo o pulsa "Vaciar filtro" para disparar el bloque @empty y ver el @switch con múltiples @case de Angular 22.',
  },

  // =========================================================================
  // NIVEL 2: INTERMEDIO (5 - 8)
  // =========================================================================
  {
    id: 5,
    level: 'intermedio',
    shortTitle: '5. signal(), set y update',
    badge: 'Nivel 2 · Intermedio · Paso 5 de 12',
    title: 'Reactividad Zoneless con signal(), .set() y .update()',
    summary:
      'Aquí empieza el corazón de Angular 2026: las aplicaciones son Zoneless y OnPush por defecto. Una Signal envuelve un valor y avisa con precisión quirúrgica qué vista depende de él.',
    analogy:
      'Como ref() en Vue o useState() en React, pero leer nivel() suscribe automáticamente al consumidor sin volver a ejecutar toda la clase del componente.',
    keyPoints: [
      'Siempre lee una signal invocándola como función: this.nivel() en TS y {{ nivel() }} en HTML.',
      'Usa .set(valor) para asignar un valor nuevo directo.',
      'Usa .update(prev => nuevo) para derivar el siguiente valor de forma inmutable (sumar, filtrar o agregar a un array).',
    ],
    tsCode: `import { Component, signal } from '@angular/core';

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
    htmlCode: `<h4>Nv. {{ nivel() }}</h4>

<button (click)="subirNivel()">Entrenar (+1)</button>
<button (click)="piedraTrueno.set(true)">Usar Piedra Trueno</button>`,
    challenge:
      'Entrena a Pikachu con .update() hasta nivel 16 o usa la Piedra Trueno con .set(true) para evolucionarlo a Raichu en vivo.',
  },
  {
    id: 6,
    level: 'intermedio',
    shortTitle: '6. computed y linkedSignal',
    badge: 'Nivel 2 · Intermedio · Paso 6 de 12',
    title: 'Estado derivado con computed() y reseteo reactivo con linkedSignal()',
    summary:
      'computed() calcula datos de solo lectura a partir de otras signals y memoriza el resultado. linkedSignal() va un paso más allá: crea una signal que el usuario SÍ puede editar, pero que se reinicia sola cuando cambia su signal origen.',
    analogy:
      'computed() es useMemo sin lista manual de dependencias; linkedSignal() elimina el clásico anti-patrón de usar useEffect para resetear un estado hijo cuando cambia una prop.',
    keyPoints: [
      'Nunca dupliques estado: si puede calcularse desde otras signals, usa computed(() => ...).',
      'Usa linkedSignal({ source, computation }) para selecciones temporales (pestaña activa, zoom o modo Shiny ✨).',
      'Ambos son perezosos: no gastan CPU si nadie los está leyendo.',
    ],
    tsCode: `import { computed, linkedSignal, signal } from '@angular/core';

readonly selectedId = signal(6); // 6 = Charizard

// Escribible con .set()/.update(), pero vuelve a false al cambiar selectedId
readonly isShiny = linkedSignal({
  source: this.selectedId,
  computation: () => false,
});

readonly spriteUrl = computed(() => {
  const folder = this.isShiny() ? 'official-artwork/shiny' : 'official-artwork';
  return \`https://.../pokemon/other/\${folder}/\${this.selectedId()}.png\`;
});`,
    htmlCode: `<button (click)="isShiny.update(v => !v)">
  {{ isShiny() ? '✨ Shiny activo' : 'Activar Shiny ✨' }}
</button>

<button (click)="selectedId.set(130)">Cambiar a Gyarados</button>
<img [src]="spriteUrl()" />`,
    challenge:
      'Activa el modo Shiny ✨ en Charizard y cambia a Gyarados o Umbreon: verás cómo linkedSignal() devuelve el interruptor a Normal sin efectos secundarios.',
  },
  {
    id: 7,
    level: 'intermedio',
    shortTitle: '7. input, output y model',
    badge: 'Nivel 2 · Intermedio · Paso 7 de 12',
    title: 'Componentes reutilizables con input(), output() y model()',
    summary:
      'Para escalar tu Pokédex divides la interfaz en componentes pequeños. En Angular 22 las entradas son Signals de solo lectura (input), los eventos usan output() y el enlace bidireccional limpio usa model().',
    analogy:
      'input.required<T>() son props tipadas reactivas; output<T>() es un emisor tipado; y model<T>() ofrece two-way binding [(prop)] limpio basado en Signals.',
    keyPoints: [
      'Prefiere input.required<T>() cuando el componente hijo no tenga sentido sin ese dato.',
      'Como input() devuelve una Signal, puedes conectarlo directo a computed() o linkedSignal() en el hijo.',
      'model() expone automáticamente tanto la entrada [selectedBall] como el evento (selectedBallChange), abreviado [(selectedBall)].',
    ],
    tsCode: `// src/app/components/pokeball-picker/pokeball-picker.ts
export class PokeballPicker {
  readonly pokemonName = input.required<string>();
  readonly selectedBall = model<PokeballType>('Poké Ball');
  readonly throwBall = output<PokeballType>();
}`,
    htmlCode: `<!-- Padre e Hijo sincronizados en tiempo real -->
<app-pokeball-picker
  [pokemonName]="targetLegendary()"
  [(selectedBall)]="chosenBall"
  (throwBall)="handleBallThrow($event)"
/>`,
    challenge:
      'Interactúa con el componente hijo real <app-pokeball-picker> abajo y comprueba cómo Padre e Hijo comparten chosenBall en ambas direcciones.',
  },
  {
    id: 8,
    level: 'intermedio',
    shortTitle: '8. Servicios, inject y effect',
    badge: 'Nivel 2 · Intermedio · Paso 8 de 12',
    title: 'Estado Global con Servicios (@Injectable), inject() y effect()',
    summary:
      'Cuando varias páginas necesitan compartir el mismo estado (como tu cinturón de 6 Pokémon en la barra superior, la Pokédex y este tutorial), creamos un Servicio singleton e inyectamos su instancia con inject().',
    analogy:
      'Un servicio con Signals en Angular equivale a un store de Zustand o Pinia integrado de fábrica, sin Providers envolventes ni librerías externas.',
    keyPoints: [
      'Usa readonly store = inject(TeamStore) en lugar del antiguo constructor(private store: TeamStore).',
      'Expón tus signals internas con .asReadonly() para que solo el servicio pueda mutarlas mediante métodos claros.',
      'Reserva effect(() => ...) únicamente para sincronizar con APIs externas fuera de Angular (localStorage, Canvas, logs).',
    ],
    tsCode: `// Archivo real: src/app/services/team-store.ts
@Injectable({ providedIn: 'root' })
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
    htmlCode: `<!-- Cualquier componente o página lo inyecta y lee -->
<p>Mi Equipo Global: {{ teamStore.count() }} / 6</p>

@for (poke of teamStore.team(); track poke.id) {
  <img [src]="poke.sprite" [alt]="poke.name" />
}`,
    challenge:
      'Agrega o quita Pokémon abajo y mira el contador "Mi Equipo" arriba a la derecha en la barra de navegación (¡incluso si recargas con F5 o vas a Pokédex, persiste en localStorage!).',
  },

  // =========================================================================
  // NIVEL 3: AVANZADO (9 - 12)
  // =========================================================================
  {
    id: 9,
    level: 'avanzado',
    shortTitle: '9. httpResource + Interceptor',
    badge: 'Nivel 3 · Avanzado · Paso 9 de 12',
    title: 'Datos reales con httpResource() e Interceptores HTTP Funcionales',
    summary:
      'httpResource() conecta PokéAPI directo al grafo de Signals con cancelación automática de peticiones obsoletas. Además, con HttpInterceptorFn interceptamos todas las llamadas en un solo lugar para medir tiempos, manejar tokens o auditar errores.',
    analogy:
      'Combina la experiencia declarativa de TanStack Query (httpResource) con middlewares estilo Axios/Express (withInterceptors) nativos.',
    keyPoints: [
      'Registra provideHttpClient(withInterceptors([pokeApiLoggerInterceptor])) en app.config.ts.',
      'Comprueba siempre @if (res.error()) antes de leer .value(), y usa @else if (res.hasValue()) como guarda de tipo.',
      'Un HttpInterceptorFn es una simple función que puede usar inject() para guardar métricas o cabeceras Auth.',
    ],
    tsCode: `// Interceptor funcional real: src/app/interceptors/poke-api-logger.ts
export const pokeApiLoggerInterceptor: HttpInterceptorFn = (req, next) => {
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
    htmlCode: `@if (pokemonResource.isLoading()) {
  <p>Cargando desde PokéAPI...</p>
} @else if (pokemonResource.error()) {
  <p>Error 404 capturado sin romper la vista.</p>
} @else if (pokemonResource.hasValue()) {
  <h4>{{ pokemonResource.value().name }}</h4>
}`,
    challenge:
      'Consulta distintos Pokémon reales (1–1025) o fuerza un 404 abajo y observa en vivo la consola de nuestro HttpInterceptorFn midiendo cada petición en milisegundos.',
  },
  {
    id: 10,
    level: 'avanzado',
    shortTitle: '10. RxJS ↔ Signals Interop',
    badge: 'Nivel 3 · Avanzado · Paso 10 de 12',
    title: 'Interoperabilidad RxJS ↔ Signals (toObservable, debounceTime, toSignal)',
    summary:
      'En Angular 22, Signals manejan el estado sincrónico y plantillas, mientras que RxJS brilla coordinando eventos en el tiempo (debounce de búsqueda, reintentos, WebSockets). @angular/core/rxjs-interop conecta ambos mundos en 3 líneas.',
    analogy:
      'Tienes lo mejor de la reactividad fina por estado (Signals) y la potencia de operadores temporales declarativos (RxJS) trabajando juntos sin suscripciones manuales ni fugas de memoria.',
    keyPoints: [
      'toObservable(miSignal) convierte los cambios de una Signal en un stream Observable de RxJS.',
      'Aplica operadores como debounceTime(350) y distinctUntilChanged() para no saturar un servidor en cada tecla.',
      'toSignal(observable$, { initialValue: "" }) reconvierte el stream en una Signal limpia y gestiona el unsubscribe automáticamente.',
    ],
    tsCode: `import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';

readonly rawSearch = signal('');

// Espera 350ms de silencio al teclear antes de actualizar debouncedSearch()
readonly debouncedSearch = toSignal(
  toObservable(this.rawSearch).pipe(
    debounceTime(350),
    distinctUntilChanged()
  ),
  { initialValue: '' }
);`,
    htmlCode: `<input
  [value]="rawSearch()"
  (input)="onTypeSearch($event)"
  placeholder="Escribe rápido el nombre de un Pokémon..."
/>
<p>Valor instantáneo: {{ rawSearch() }}</p>
<p>Valor tras debounce (350ms): {{ debouncedSearch() }}</p>`,
    challenge:
      'Escribe rápido en el buscador de abajo: verás cuántas pulsaciones de teclado ahorras frente a las búsquedas reales emitidas tras 350 ms.',
  },
  {
    id: 11,
    level: 'avanzado',
    shortTitle: '11. Signal Forms Competitivos',
    badge: 'Nivel 3 · Avanzado · Paso 11 de 12',
    title: 'Signal Forms Avanzados: Validación Cruzada (Item Clause VGC)',
    summary:
      'Con Signal Forms estables en Angular 22 puedes escribir reglas de negocio avanzadas que dependen de varios campos a la vez usando validate() y valueOf(), manteniendo tipado estricto de extremo a extremo.',
    analogy:
      'Adiós a los validadores imperativos sobre FormGroup con strings mágicos (form.get("campo")): aquí accedes a path.slot1Item con autocompletado completo de TypeScript.',
    keyPoints: [
      'validate(path.campo, ({ value, valueOf }) => ...) reevalúa la regla solo cuando cambia alguno de los campos leídos.',
      'Si la regla se cumple devuelves undefined; si falla devuelves { kind: "...", message: "..." }.',
      'El estado global trainerForm().valid() bloquea el envío automáticamente si cualquier regla falla.',
    ],
    tsCode: `readonly vgcModel = signal({
  trainerName: 'Cynthia',
  slot1Item: 'Restos',
  slot2Item: 'Banda Focus',
  levelCap: 50,
});

readonly vgcForm = form(this.vgcModel, (path) => {
  required(path.trainerName, { message: 'Nombre obligatorio.' });
  minLength(path.trainerName, 3, { message: 'Mínimo 3 caracteres.' });
  // Regla cruzada oficial VGC: dos Pokémon no pueden repetir objeto
  validate(path.slot2Item, ({ value, valueOf }) =>
    value() === valueOf(path.slot1Item)
      ? { kind: 'itemClause', message: 'Item Clause VGC: objeto repetido con el Slot 1.' }
      : undefined
  );
});`,
    htmlCode: `<select [formField]="vgcForm.slot1Item">...</select>
<select [formField]="vgcForm.slot2Item">...</select>

@for (err of vgcForm.slot2Item().errors(); track err.kind) {
  <p class="text-rose-400">{{ err.message }}</p>
}`,
    challenge:
      'Asigna el mismo objeto competitivo al Slot 1 y al Slot 2 en el registro de torneo abajo para disparar la validación cruzada con valueOf() en vivo.',
  },
  {
    id: 12,
    level: 'avanzado',
    shortTitle: '12. @defer, Directivas y Vitest',
    badge: 'Nivel 3 · Avanzado · Paso 12 de 12',
    title: 'Optimización con @defer, Directivas Host y Testing con Vitest 5',
    summary:
      'Para cerrar como profesional en Angular 22: @defer retrasa la descarga y renderizado de componentes pesados hasta que el usuario interactúe o haga scroll; las Directivas extienden elementos con host: {}; y Vitest ejecuta tus tests en milisegundos.',
    analogy:
      '@defer une React.lazy + Suspense + IntersectionObserver directamente en una sintaxis declarativa de HTML con bloques @placeholder y @loading.',
    keyPoints: [
      '@defer (on interaction) o @defer (on viewport) divide el bundle automáticamente sin configurar rutas.',
      'En Directivas (@Directive), usa la propiedad host: { ... } en lugar de los viejos decoradores @HostBinding / @HostListener.',
      'Ejecuta npx ng test --watch=false para correr pruebas unitarias ultrarrápidas con Vitest 5.',
    ],
    tsCode: `// Prueba unitaria real: src/app/pipes/poke-id-pipe.spec.ts
import { PokeIdPipe } from './poke-id-pipe';

describe('PokeIdPipe (Vitest)', () => {
  const pipe = new PokeIdPipe();

  it('formatea #025 para Pikachu', () => {
    expect(pipe.transform(25)).toBe('#025');
  });
});`,
    htmlCode: `<!-- Carga diferida real + Directiva [appTypeGlow] -->
<div appTypeGlow="dragon">Pasa el cursor aquí (Directiva Host)</div>

@defer (on interaction) {
  <app-stats-radar [pokemonName]="'Rayquaza'" [stats]="rayquazaStats" />
} @placeholder {
  <button>Clic para cargar y renderizar el Radar de Stats (@defer)</button>
} @loading (minimum 400ms) {
  <p>Descargando componente diferido...</p>
}`,
    challenge:
      'Pasa el mouse sobre las tarjetas con nuestra directiva [appTypeGlow] y haz clic en el bloque @placeholder para disparar @defer en tiempo real.',
  },
];
