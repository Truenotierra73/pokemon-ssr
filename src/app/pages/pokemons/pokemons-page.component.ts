import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit, signal,
} from '@angular/core';

import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { PokemonListSkeletonComponent } from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';

import { SimplePokemon } from '../../pokemons/interfaces';

import { PokemonsService } from '../../pokemons/services/pokemons.service';

@Component({
  selector: 'app-pokemons-page',
  imports: [
    PokemonListComponent,
    PokemonListSkeletonComponent,
    PokemonListComponent
  ],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PokemonsPageComponent implements OnInit, OnDestroy {
  private readonly pokemonsService: PokemonsService = inject(PokemonsService);

  public pokemons = signal<SimplePokemon[]>([]);
  // private readonly appRef: ApplicationRef = inject(ApplicationRef);

  // public isLoading: WritableSignal<boolean> = signal<boolean>(true);
  // private readonly $isStable = this.appRef.isStable.subscribe(isStable => console.log({ isStable }));

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 5000);
    this.loadPokemons();
  }

  ngOnDestroy(): void {
    // if (this.$isStable) {
    //   this.$isStable.unsubscribe();
    // }
  }

  loadPokemons(page: number = 0): void {
    this.pokemonsService.loadPage(page).subscribe(pokemons => {
      this.pokemons.set(pokemons);
    });
  }
}
