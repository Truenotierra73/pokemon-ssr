import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { PokeAPIResponse, Pokemon, SimplePokemon } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  private readonly http: HttpClient = inject(HttpClient);

  loadPage(page: number): Observable<SimplePokemon[]> {
    if (page !== 0) {
      --page;
    }

    page = Math.max(0, page);

    return this.http
      .get<PokeAPIResponse>(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page * 20}`,
      )
      .pipe(
        map((res) => {
          const simplePokemons: SimplePokemon[] = res.results.map((pokemon) => {
            return {
              id: pokemon.url.split('/').at(-2) ?? '',
              name: pokemon.name,
            };
          });

          return simplePokemons;
        }),
      );
  }

  loadPokemon(id: Pokemon['name']): Observable<Pokemon> {
    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }
}
