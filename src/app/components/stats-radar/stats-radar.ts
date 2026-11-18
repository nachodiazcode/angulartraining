import { Component, computed, input } from '@angular/core';

export interface RadarStat {
  label: string;
  value: number;
}

@Component({
  selector: 'app-stats-radar',
  template: `
    <div class="rounded-xl border border-emerald-500/40 bg-slate-900 p-4">
      <div class="flex items-center justify-between">
        <h5 class="text-sm font-bold text-white">
          Análisis Base de {{ pokemonName() }}
        </h5>
        <span class="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-300">
          BST Total: {{ totalStats() }}
        </span>
      </div>

      <div class="mt-3 space-y-2">
        @for (stat of stats(); track stat.label) {
          <div class="flex items-center gap-3 text-xs">
            <span class="w-16 font-mono text-slate-400">{{ stat.label }}</span>
            <span class="w-8 text-right font-bold text-white">{{ stat.value }}</span>
            <div class="h-2 flex-1 overflow-hidden rounded-full bg-slate-800">
              <div
                class="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400"
                [style.width.%]="(stat.value / 160) * 100"
              ></div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class StatsRadar {
  readonly pokemonName = input.required<string>();
  readonly stats = input.required<RadarStat[]>();

  protected readonly totalStats = computed(() =>
    this.stats().reduce((acc, item) => acc + item.value, 0)
  );
}
