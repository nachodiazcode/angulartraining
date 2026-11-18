import { computed, Directive, input, signal } from '@angular/core';

@Directive({
  selector: '[appTypeGlow]',
  host: {
    '(mouseenter)': 'hovered.set(true)',
    '(mouseleave)': 'hovered.set(false)',
    '[style.boxShadow]': 'boxShadow()',
    '[style.transition]': '"box-shadow 200ms ease, transform 200ms ease"',
    '[style.transform]': 'hovered() ? "translateY(-2px)" : "none"',
  },
})
export class TypeGlowDirective {
  readonly appTypeGlow = input<'dragon' | 'psychic' | 'electric'>('dragon');
  protected readonly hovered = signal(false);

  protected readonly boxShadow = computed(() => {
    if (!this.hovered()) return 'none';
    const colors = {
      dragon: '0 0 24px rgba(99, 102, 241, 0.45)',
      psychic: '0 0 24px rgba(236, 72, 153, 0.45)',
      electric: '0 0 24px rgba(251, 191, 36, 0.45)',
    };
    return colors[this.appTypeGlow()];
  });
}
