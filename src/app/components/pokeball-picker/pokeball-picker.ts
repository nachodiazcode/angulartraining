import { Component, input, model, output } from '@angular/core';

export type PokeballType = 'Poké Ball' | 'Super Ball' | 'Ultra Ball' | 'Master Ball';

@Component({
  selector: 'app-pokeball-picker',
  template: `
    <div class="rounded-xl border border-slate-700 bg-slate-900 p-4">
      <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">
        Componente Hijo (&lt;app-pokeball-picker&gt;)
      </p>
      <p class="mt-1 text-sm text-slate-200">
        Objetivo recibido por <code class="text-emerald-400">input.required()</code>:
        <strong class="text-white">{{ pokemonName() }}</strong>
      </p>

      <!-- Selección sincronizada bidireccionalmente con model() -->
      <div class="mt-3 flex flex-wrap gap-2">
        @for (ball of balls; track ball) {
          <button
            type="button"
            (click)="selectedBall.set(ball)"
            [class]="
              selectedBall() === ball
                ? 'rounded-lg bg-amber-400 px-3 py-1.5 text-xs font-bold text-slate-950 cursor-pointer'
                : 'rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-300 hover:border-slate-500 cursor-pointer'
            "
          >
            {{ ball }}
          </button>
        }
      </div>

      <!-- Emite un evento al componente padre con output() -->
      <button
        type="button"
        (click)="throwBall.emit(selectedBall())"
        class="mt-4 w-full rounded-xl bg-red-500 py-2 text-sm font-semibold text-white hover:bg-red-600 cursor-pointer"
      >
        Lanzar {{ selectedBall() }} a {{ pokemonName() }}
      </button>
    </div>
  `,
})
export class PokeballPicker {
  protected readonly balls: PokeballType[] = [
    'Poké Ball',
    'Super Ball',
    'Ultra Ball',
    'Master Ball',
  ];

  // 1. Entrada obligatoria (Padre -> Hijo)
  readonly pokemonName = input.required<string>();

  // 2. Sincronización bidireccional (Padre <-> Hijo) con [(selectedBall)]
  readonly selectedBall = model<PokeballType>('Poké Ball');

  // 3. Evento de salida (Hijo -> Padre) con (throwBall)
  readonly throwBall = output<PokeballType>();
}
