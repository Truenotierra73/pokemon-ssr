import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, map, Observable, throwError } from 'rxjs';

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
    return this.http
      .get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.log(`An error occurred: ${error.error}`);
    } else {
      console.error(
        `Backend returned error code: ${error.status}, body: ${error.error}`,
        error,
      );
    }

    return throwError(() => new Error(error.error ?? 'An error occurred'));
  }
}
