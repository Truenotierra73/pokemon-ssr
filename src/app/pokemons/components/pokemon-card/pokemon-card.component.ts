import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, InputSignal } from '@angular/core';

import { SimplePokemon } from '../../interfaces';

@Component({
  selector: 'pokemon-card',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonCardComponent {
  public pokemon: InputSignal<SimplePokemon> = input.required<SimplePokemon>();
  public readonly pokemonImage = computed(() => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon().id}.png`;
  });


}
