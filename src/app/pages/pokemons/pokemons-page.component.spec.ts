import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideRouter } from '@angular/router';

import { PokemonsService } from '../../pokemons/services/pokemons.service';

import PokemonsPageComponent from './pokemons-page.component';

describe('PokemonsPageComponent', () => {
  let component: PokemonsPageComponent;
  let fixture: ComponentFixture<PokemonsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonsPageComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        PokemonsService,
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create PokemonsPageComponent', () => {
    expect(component).toBeTruthy();
  });
});
