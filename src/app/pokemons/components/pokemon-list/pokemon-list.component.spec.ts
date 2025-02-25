import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SimplePokemon } from '../../interfaces';

import { PokemonListComponent } from './pokemon-list.component';

const pokemons: SimplePokemon[] = [
  {
    id: '1',
    name: 'bulbasaur',
  },
  {
    id: '2',
    name: 'ivysaur',
  },
];

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;

    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render the pokemon list with 2 pokemon-card', () => {
    fixture.componentRef.setInput('pokemons', pokemons);
    fixture.detectChanges();

    const pokemonCardEl: NodeListOf<HTMLElement> =
      compiled.querySelectorAll('pokemon-card');

    expect(pokemonCardEl.length).toBe(component.pokemons().length);
  });

  it('should render "No hay pokémons"', () => {
    expect(compiled.querySelector('div')!.children[0].textContent!.trim()).toBe(
      'No hay pokémons',
    );
  });
});
