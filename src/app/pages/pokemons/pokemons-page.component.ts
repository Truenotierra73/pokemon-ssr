import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnDestroy,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';

import { toSignal } from '@angular/core/rxjs-interop';

import { map, tap } from 'rxjs';

import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { PokemonListSkeletonComponent } from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';

import { SimplePokemon } from '../../pokemons/interfaces';

import { PokemonsService } from '../../pokemons/services/pokemons.service';

@Component({
  selector: 'pokemons-page',
  imports: [
    PokemonListComponent,
    PokemonListSkeletonComponent,
    PokemonListComponent,
    RouterLink,
  ],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnInit, OnDestroy {
  private readonly pokemonsService: PokemonsService = inject(PokemonsService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);
  private readonly title: Title = inject(Title);

  public pokemons: WritableSignal<SimplePokemon[]> = signal<SimplePokemon[]>(
    [],
  );
  public currentPage: Signal<number | undefined> = toSignal<number>(
    this.route.params.pipe(
      map((params: Params) => params['page'] ?? '1'),
      map((page: string) => (isNaN(+page) ? 1 : +page)),
      map((page: number) => Math.max(1, page)),
    ),
  );
  // private readonly appRef: ApplicationRef = inject(ApplicationRef);

  // public isLoading: WritableSignal<boolean> = signal<boolean>(true);
  // private readonly $isStable = this.appRef.isStable.subscribe(isStable => console.log({ isStable }));

  private readonly loadOnPageChanged = effect(() => {
    this.loadPokemons();
  });

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 5000);
    // this.loadPokemons();
  }

  ngOnDestroy(): void {
    // if (this.$isStable) {
    //   this.$isStable.unsubscribe();
    // }
  }

  loadPokemons(page: number = 0): void {
    const pageToLoad = this.currentPage()! + page;

    if (pageToLoad === 0) return;

    this.pokemonsService
      .loadPage(pageToLoad)
      .pipe(
        tap(() => {
          // this.router.navigate([], { queryParams: { page: pageToLoad } });
          this.title.setTitle(`Pokémons SSR - Page ${pageToLoad}`);
        }),
      )
      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
      });
  }
}
