import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
} from '@angular/core';
import { Router } from '@angular/router';

import { SimplePokemon } from '../../interfaces';

@Component({
  selector: 'pokemon-card',
  imports: [NgOptimizedImage],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent {
  public pokemon: InputSignal<SimplePokemon> = input.required<SimplePokemon>();
  public readonly pokemonImage = computed(() => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon().id}.png`;
  });

  private readonly router: Router = inject(Router);

  protected navigate() {
    console.log('Navigating', this.pokemon().id);
    this.router.navigate(['pokemons', this.pokemon().id]);
  }
}
