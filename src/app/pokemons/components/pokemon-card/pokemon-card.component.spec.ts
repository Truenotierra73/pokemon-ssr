import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { SimplePokemon } from '../../interfaces';

import { PokemonCardComponent } from './pokemon-card.component';

const pokemon: SimplePokemon = {
  id: '1',
  name: 'bulbasaur',
};

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;

    fixture.componentRef.setInput('pokemon', pokemon);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have SimplePokemon signal inputValue', () => {
    expect(component.pokemon()).toEqual(pokemon);
  });

  it('should render the pokemon name and image correctly', () => {
    const img: HTMLImageElement = compiled.querySelector('img')!;
    expect(img.hasAttribute('src')).toBeTrue();
    expect(img.getAttribute('src')).toBe(
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${component.pokemon().id}.png`,
    );
    expect(img.hasAttribute('alt')).toBeTrue();
    expect(img.getAttribute('alt')).toBe(component.pokemon().name);

    const h2: HTMLHeadingElement = compiled.querySelector('h2')!;
    expect(h2.textContent).toBe(component.pokemon().name);
  });

  it('should have the proper ng-reflect-router-link', () => {
    const divEl: HTMLDivElement = compiled.querySelector('div')!;

    expect(divEl.hasAttribute('ng-reflect-router-link')).toBeTrue();
    expect(divEl.getAttribute('ng-reflect-router-link')).toBe(
      '/pokemons,' + component.pokemon().name,
    );
  });
});
