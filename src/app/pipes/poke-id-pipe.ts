import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokeId',
})
export class PokeIdPipe implements PipeTransform {
  transform(id: number, digits = 3): string {
    return `#${String(id).padStart(digits, '0')}`;
  }
}
