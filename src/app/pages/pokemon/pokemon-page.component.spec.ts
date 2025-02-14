import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideRouter } from '@angular/router';

import { PokemonsService } from '../../pokemons/services/pokemons.service';

import PokemonPageComponent from './pokemon-page.component';

describe('PokemonPageComponent', () => {
  let component: PokemonPageComponent;
  let fixture: ComponentFixture<PokemonPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonPageComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        PokemonsService,
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create PokemonPageComponent', () => {
    expect(component).toBeTruthy();
  });
});
