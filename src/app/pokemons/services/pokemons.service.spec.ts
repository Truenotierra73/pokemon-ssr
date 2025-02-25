import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { catchError, map, throwError } from 'rxjs';

import { PokeAPIResponse, Pokemon, SimplePokemon } from '../interfaces';

import { PokemonsService } from './pokemons.service';

const pokeAPIResponse: PokeAPIResponse = {
  count: 1304,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  previous: null,
  results: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
  ],
};

const expectedPokemons: SimplePokemon[] = [
  {
    id: '1',
    name: 'bulbasaur',
  },
  {
    id: '2',
    name: 'ivysaur',
  },
];

const expectedPokemon: SimplePokemon = {
  id: '1',
  name: 'bulbasaur',
};

describe('PokemonsService', () => {
  let service: PokemonsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PokemonsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load a page of SimplePokemons', () => {
    service.loadPage(1).subscribe({
      next: (pokemons: SimplePokemon[]) => {
        expect(pokemons).toEqual(expectedPokemons);
      },
    });

    // At this point, the request is pending, and we can assert it was made
    // via the `HttpTestingController`:
    const req = httpTestingController.expectOne(
      'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0',
      'Obtener los pokémons',
    );
    // We can assert various properties of the request if desired.
    expect(req.request.method).toBe('GET');
    // Flushing the request causes it to complete, delivering the result.
    req.flush(pokeAPIResponse);
  });

  it('should load page 5 of SimplePokemons', () => {
    service.loadPage(5).subscribe({
      next: (pokemons: SimplePokemon[]) => {
        expect(pokemons).toEqual(expectedPokemons);
      },
    });

    const req = httpTestingController.expectOne(
      `https://pokeapi.co/api/v2/pokemon?limit=20&offset=80`,
      'Obtener los pokémons de la página 5',
    );

    expect(req.request.method).toBe('GET');

    req.flush(pokeAPIResponse);
  });

  it('should load a Pokémon by ID', () => {
    const ID: string = '1';

    // service
    //   .loadPokemon(ID)
    //   .pipe(
    //     map((pokemon: Pokemon) => {
    //       const simplePokemon: SimplePokemon = {
    //         id: pokemon.id.toString(),
    //         name: pokemon.name,
    //       };
    //
    //       return simplePokemon;
    //     }),
    //   )
    //   .subscribe({
    //     next: (pokemon: SimplePokemon) => {
    //       expect(pokemon).toEqual(expectedPokemon);
    //     },
    //   });

    service.loadPokemon(ID).subscribe({
      next: (pokemon: any) => {
        expect(pokemon).toEqual(expectedPokemon);
      },
    });

    const req = httpTestingController.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${ID}`,
      `Obtener el pokémon con ID ${ID}`,
    );

    expect(req.request.method).toBe('GET');

    req.flush(expectedPokemon);
  });

  it('should load a Pokémon by Name', () => {
    const name: string = 'bulbasaur';

    service.loadPokemon(name).subscribe({
      next: (pokemon: any) => {
        expect(pokemon).toEqual(expectedPokemon);
      },
    });

    const req = httpTestingController.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${name}`,
      `Obtener el pokémon con Name ${name}`,
    );

    expect(req.request.method).toBe('GET');

    req.flush(expectedPokemon);
  });

  it('should catch error if pokémon not found', () => {
    const name: string = 'yo-no-existo';

    service.loadPokemon(name).subscribe({
      error: (err: Error) => {
        expect(err.message).toContain('Not found');
      },
    });

    const req = httpTestingController.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${name}`,
    );

    expect(req.request.method).toBe('GET');

    req.flush('Not found', {
      status: 404,
      statusText: 'Not found pokémon',
    });
  });
});
