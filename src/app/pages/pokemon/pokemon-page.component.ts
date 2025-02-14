import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { tap } from 'rxjs';

import { Pokemon } from '../../pokemons/interfaces';

import { PokemonsService } from '../../pokemons/services/pokemons.service';

@Component({
  selector: 'pokemon-page',
  imports: [],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit {
  private readonly pokemonsService: PokemonsService = inject(PokemonsService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly title: Title = inject(Title);
  private readonly meta: Meta = inject(Meta);

  public pokemon: WritableSignal<Pokemon | null> = signal<Pokemon | null>(null);

  ngOnInit(): void {
    this.loadPokemon();
  }

  private loadPokemon() {
    const id: string | null = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    this.pokemonsService
      .loadPokemon(id)
      .pipe(
        tap(({ id, name }: Pokemon) => {
          const pageTitle = `#${id} - ${name.charAt(0).toUpperCase() + name.slice(1)}`;
          const pageDescription = `Página del Pokémon ${name}`;

          this.title.setTitle(pageTitle);
          this.meta.updateTag({
            name: 'description',
            content: pageDescription,
          });
          this.meta.updateTag({
            name: 'og:title',
            content: pageDescription,
          });
          this.meta.updateTag({
            name: 'og:description',
            content: pageDescription,
          });
          this.meta.updateTag({
            name: 'og:image',
            content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          });
        }),
      )
      .subscribe(this.pokemon.set);
  }
}
