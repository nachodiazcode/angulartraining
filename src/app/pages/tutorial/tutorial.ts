import {
  CurrencyPipe,
  DecimalPipe,
  PercentPipe,
  UpperCasePipe,
} from '@angular/common';
import { httpResource } from '@angular/common/http';
import {
  Component,
  computed,
  inject,
  linkedSignal,
  signal,
  viewChild,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  form,
  FormField,
  max,
  min,
  minLength,
  required,
  validate,
} from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import {
  PokeballPicker,
  PokeballType,
} from '../../components/pokeball-picker/pokeball-picker';
import { AudiobookPlayer } from '../../components/audiobook-player/audiobook-player';
import { VscodeCodingVideo } from '../../components/vscode-coding-video/vscode-coding-video';
import {
  AUDIOBOOK_CHAPTERS,
  NarratorVoiceId,
} from './tutorial-audiobook.data';
import {
  StatsRadar,
  type RadarStat,
} from '../../components/stats-radar/stats-radar';
import { TypeGlowDirective } from '../../directives/type-glow';
import { STARTER_POKEMON } from '../../models/pokemon';
import { PokeIdPipe } from '../../pipes/poke-id-pipe';
import { HttpLogStore } from '../../services/http-log-store';
import { TeamStore } from '../../services/team-store';
import {
  LEVEL_META,
  StepId,
  TUTORIAL_STEPS,
  TutorialLevel,
} from './tutorial-steps';

interface PokeApiPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  sprites: {
    other: {
      'official-artwork': {
        front_default: string | null;
      };
    };
  };
}

interface BagItem {
  id: number;
  name: string;
  category: 'curacion' | 'captura' | 'especial';
  qty: number;
}

@Component({
  selector: 'app-tutorial-page',
  imports: [
    RouterLink,
    UpperCasePipe,
    DecimalPipe,
    PercentPipe,
    CurrencyPipe,
    PokeIdPipe,
    AudiobookPlayer,
    VscodeCodingVideo,
    PokeballPicker,
    StatsRadar,
    TypeGlowDirective,
    FormField,
  ],
  templateUrl: './tutorial.html',
})
export class TutorialPage {
  protected readonly teamStore = inject(TeamStore);
  protected readonly httpLogStore = inject(HttpLogStore);

  protected readonly levels: TutorialLevel[] = ['basico', 'intermedio', 'avanzado'];
  protected readonly levelMeta = LEVEL_META;
  protected readonly steps = TUTORIAL_STEPS;

  protected readonly activeStepId = signal<StepId>(1);
  protected readonly completedStepIds = signal<number[]>([]);
  protected readonly copiedKind = signal<'ts' | 'html' | null>(null);

  protected readonly audiobookPlayer = viewChild(AudiobookPlayer);
  protected readonly audiobookVoiceId = signal<NarratorVoiceId>(
    typeof localStorage !== 'undefined' &&
      localStorage.getItem('pokedex_2026_audiobook_voice') === 'dalia'
      ? 'dalia'
      : 'gonzalo'
  );
  protected readonly isAudiobookPlaying = signal(false);

  protected readonly activeStep = computed(
    () => this.steps.find((s) => s.id === this.activeStepId()) ?? this.steps[0]
  );

  protected readonly progressPercent = computed(() =>
    Math.round((this.completedStepIds().length / this.steps.length) * 100)
  );

  protected readonly isCurrentStepCompleted = computed(() =>
    this.completedStepIds().includes(this.activeStepId())
  );

  protected stepsByLevel(level: TutorialLevel) {
    return this.steps.filter((s) => s.level === level);
  }

  protected chapterDurationLabel(stepId: StepId): string {
    const chapter = AUDIOBOOK_CHAPTERS.find((c) => c.stepId === stepId);
    const sec = Math.round(chapter?.tracks[this.audiobookVoiceId()].durationSec ?? 0);
    const mins = Math.floor(sec / 60);
    const rem = sec % 60;
    return `${mins}:${String(rem).padStart(2, '0')}`;
  }

  protected onChapterAudioCompleted(stepId: StepId): void {
    this.completedStepIds.update((list) =>
      list.includes(stepId) ? list : [...list, stepId]
    );
  }

  protected toggleCurrentChapterAudio(): void {
    this.audiobookPlayer()?.togglePlay();
  }

  protected pauseCurrentChapterAudio(): void {
    this.audiobookPlayer()?.pausePlayback();
  }

  // =========================================================
  // LAB 1: @Component e Interpolación {{ }}
  // =========================================================
  protected readonly kantoStarters = [
    { id: 1, name: 'Bulbasaur', region: 'Kanto', weightKg: 6.9, role: 'Planta Semilla' },
    { id: 4, name: 'Charmander', region: 'Kanto', weightKg: 8.5, role: 'Lagartija Fuego' },
    { id: 7, name: 'Squirtle', region: 'Kanto', weightKg: 9.0, role: 'Tortuguita Agua' },
  ];
  protected lab1Index = 0;

  protected get currentKanto() {
    return this.kantoStarters[this.lab1Index];
  }

  protected artwork(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  // =========================================================
  // LAB 2: [prop], (evento) y #ref (Centro Pokémon)
  // =========================================================
  protected readonly centerHp = signal(45);
  protected readonly customCry = signal('¡Chaaar-mander!');

  protected healCenterPokemon(amount: number): void {
    this.centerHp.update((hp) => Math.min(100, hp + amount));
  }

  protected damageCenterPokemon(amount: number): void {
    this.centerHp.update((hp) => Math.max(0, hp - amount));
  }

  // =========================================================
  // LAB 3: Pipes nativos y @Pipe personalizado (PokeIdPipe)
  // =========================================================
  protected readonly pipeDigits = signal<3 | 4 | 5>(3);
  protected readonly pipeSpecimens = [
    { id: 25, name: 'pikachu', weightKg: 6.0, catchRate: 0.248, cardPrice: 45.5 },
    { id: 143, name: 'snorlax', weightKg: 460.0, catchRate: 0.033, cardPrice: 129.99 },
    { id: 151, name: 'mew', weightKg: 4.0, catchRate: 0.059, cardPrice: 499.0 },
  ];
  protected readonly selectedPipeIdx = signal(1);
  protected readonly activePipeSpecimen = computed(
    () => this.pipeSpecimens[this.selectedPipeIdx()]
  );

  // =========================================================
  // LAB 4: @if, @for (track / @empty), @switch múltiple y @let
  // =========================================================
  protected readonly bagFilter = signal<'all' | 'curacion' | 'captura' | 'especial' | 'vacio'>('all');
  private readonly allBagItems: BagItem[] = [
    { id: 1, name: 'Superpoción', category: 'curacion', qty: 5 },
    { id: 2, name: 'Ultra Ball', category: 'captura', qty: 12 },
    { id: 3, name: 'Caramelo Raro', category: 'especial', qty: 2 },
    { id: 4, name: 'Revivir Máximo', category: 'curacion', qty: 0 },
  ];

  protected readonly visibleBagItems = computed(() => {
    const f = this.bagFilter();
    if (f === 'vacio') return [];
    if (f === 'all') return this.allBagItems;
    return this.allBagItems.filter((item) => item.category === f);
  });

  // =========================================================
  // LAB 5: signal(), .set() y .update()
  // =========================================================
  protected readonly pikachuLevel = signal(12);
  protected readonly thunderStoneUsed = signal(false);

  protected readonly lab5State = computed(() => {
    const evolved = this.pikachuLevel() >= 16 || this.thunderStoneUsed();
    const id = evolved ? 26 : 25;
    return {
      id,
      name: evolved ? 'Raichu' : 'Pikachu',
      level: this.pikachuLevel(),
      evolved,
      sprite: this.artwork(id),
    };
  });

  protected resetLab5(): void {
    this.pikachuLevel.set(12);
    this.thunderStoneUsed.set(false);
  }

  // =========================================================
  // LAB 6: computed() y linkedSignal() (Normal vs Shiny)
  // =========================================================
  protected readonly shinyShowcase = [
    { id: 6, name: 'Charizard', baseAtk: 84 },
    { id: 130, name: 'Gyarados', baseAtk: 125 },
    { id: 197, name: 'Umbreon', baseAtk: 65 },
  ];
  protected readonly selectedShinyPokemonId = signal(6);

  // Se reinicia automáticamente a false al cambiar de Pokémon
  protected readonly isShinyMode = linkedSignal({
    source: this.selectedShinyPokemonId,
    computation: () => false,
  });

  protected readonly activeShinyPokemon = computed(() => {
    const found =
      this.shinyShowcase.find((p) => p.id === this.selectedShinyPokemonId()) ??
      this.shinyShowcase[0];
    const folder = this.isShinyMode() ? 'official-artwork/shiny' : 'official-artwork';
    return {
      ...found,
      boostedAtk: Math.round(found.baseAtk * 1.5),
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/${folder}/${found.id}.png`,
    };
  });

  // =========================================================
  // LAB 7: input(), output() y model()
  // =========================================================
  protected readonly targetLegendary = signal<'Mewtwo' | 'Articuno' | 'Zapdos'>('Mewtwo');
  protected readonly chosenBall = signal<PokeballType>('Ultra Ball');
  protected readonly lastThrowLog = signal('Aún no has lanzado ninguna Pokébola.');

  protected handleBallThrow(ball: PokeballType): void {
    const target = this.targetLegendary();
    this.lastThrowLog.set(
      ball === 'Master Ball'
        ? `¡Captura infalible! ${target} fue atrapado con ${ball}.`
        : `Lanzaste ${ball} contra ${target}... ¡1... 2... 3!`
    );
  }

  // =========================================================
  // LAB 8: Servicios Globales (TeamStore + inject + effect)
  // =========================================================
  protected readonly starterCatalog = STARTER_POKEMON;

  // =========================================================
  // LAB 9: httpResource() + HttpInterceptorFn real
  // =========================================================
  protected readonly quickApiPresets = ['bulbasaur', 'charizard', 'gengar', 'lucario', 'rayquaza'];
  protected readonly apiPokemonQuery = signal('charizard');

  protected readonly pokemonResource = httpResource<PokeApiPokemon>(() => {
    const query = this.apiPokemonQuery().trim().toLowerCase();
    return query ? `https://pokeapi.co/api/v2/pokemon/${query}` : undefined;
  });

  protected loadRandomPokemon(): void {
    const randomId = Math.floor(Math.random() * 1025) + 1;
    this.apiPokemonQuery.set(String(randomId));
  }

  // =========================================================
  // LAB 10: RxJS <-> Signals Interop (Debounce)
  // =========================================================
  protected readonly rawRxSearch = signal('');
  protected readonly keystrokeCount = signal(0);
  protected readonly emittedCount = signal(0);

  protected readonly debouncedRxSearch = toSignal(
    toObservable(this.rawRxSearch).pipe(
      debounceTime(350),
      distinctUntilChanged(),
      tap((term) => {
        if (term.trim().length > 0) {
          this.emittedCount.update((c) => c + 1);
        }
      })
    ),
    { initialValue: '' }
  );

  private readonly dexNames = [
    'Bulbasaur',
    'Charmander',
    'Charizard',
    'Squirtle',
    'Pikachu',
    'Raichu',
    'Gengar',
    'Gyarados',
    'Snorlax',
    'Dragonite',
    'Mewtwo',
    'Umbreon',
    'Lucario',
    'Rayquaza',
    'Garchomp',
  ];

  protected readonly debouncedMatches = computed(() => {
    const q = this.debouncedRxSearch().trim().toLowerCase();
    if (!q) return this.dexNames.slice(0, 6);
    return this.dexNames.filter((name) => name.toLowerCase().includes(q));
  });

  protected onRxSearchInput(val: string): void {
    this.keystrokeCount.update((c) => c + 1);
    this.rawRxSearch.set(val);
  }

  // =========================================================
  // LAB 11: Signal Forms Avanzados (Item Clause VGC)
  // =========================================================
  protected readonly competitiveItems = ['Restos', 'Banda Focus', 'Vidasfera', 'Pañuelo Elegido'];

  protected readonly vgcModel = signal({
    trainerName: 'Cynthia',
    slot1Pokemon: 'Garchomp',
    slot1Item: 'Vidasfera',
    slot2Pokemon: 'Lucario',
    slot2Item: 'Banda Focus',
    levelCap: 50,
  });

  protected readonly vgcForm = form(this.vgcModel, (path) => {
    required(path.trainerName, { message: 'Ingresa el nombre del competidor.' });
    minLength(path.trainerName, 3, { message: 'Mínimo 3 caracteres.' });
    min(path.levelCap, 50, { message: 'El nivel mínimo oficial es 50.' });
    max(path.levelCap, 100, { message: 'El nivel máximo es 100.' });

    // Validación cruzada reactiva entre Slot 1 y Slot 2 usando valueOf()
    validate(path.slot2Item, ({ value, valueOf }) =>
      value() === valueOf(path.slot1Item)
        ? {
            kind: 'itemClause',
            message: 'Item Clause VGC: dos Pokémon no pueden llevar el mismo objeto equipado.',
          }
        : undefined
    );
  });

  protected readonly tournamentRegistered = signal(false);

  // =========================================================
  // LAB 12: @defer + Directiva [appTypeGlow] + Vitest
  // =========================================================
  protected readonly rayquazaStats: RadarStat[] = [
    { label: 'HP', value: 105 },
    { label: 'Attack', value: 150 },
    { label: 'Defense', value: 90 },
    { label: 'Sp. Atk', value: 150 },
    { label: 'Sp. Def', value: 90 },
    { label: 'Speed', value: 95 },
  ];

  // =========================================================
  // Navegación del tutorial
  // =========================================================
  protected selectStep(id: StepId): void {
    this.activeStepId.set(id);
    this.copiedKind.set(null);
  }

  protected toggleCompleteCurrent(): void {
    const id = this.activeStepId();
    this.completedStepIds.update((list) =>
      list.includes(id) ? list.filter((item) => item !== id) : [...list, id]
    );
  }

  protected goPrev(): void {
    const current = this.activeStepId();
    if (current > 1) {
      this.selectStep((current - 1) as StepId);
    }
  }

  protected goNext(): void {
    const current = this.activeStepId();
    if (!this.completedStepIds().includes(current)) {
      this.completedStepIds.update((list) => [...list, current]);
    }
    if (current < 12) {
      this.selectStep((current + 1) as StepId);
    }
  }

  protected async copyCode(code: string, kind: 'ts' | 'html'): Promise<void> {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(code);
      this.copiedKind.set(kind);
      setTimeout(() => this.copiedKind.set(null), 1800);
    }
  }
}
