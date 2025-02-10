import { ChangeDetectionStrategy, Component, Input, input, InputSignal } from '@angular/core';
import { SimplePokemon } from '../../interfaces';

import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'pokemon-list',
  imports: [
    PokemonCardComponent
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonListComponent {
  public pokemons: InputSignal<SimplePokemon[]> = input.required<SimplePokemon[]>();
}
