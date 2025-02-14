import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'pokemon-ssr' title`, () => {
    expect(component.title).toBe('pokemon-ssr');
  });

  it('should render the navbar and router-outlet', () => {
    const navbar: HTMLElement | null = compiled.querySelector('app-navbar');
    const routerOutlet: HTMLElement | null =
      compiled.querySelector('router-outlet');
    console.log(navbar, routerOutlet);

    expect(navbar).not.toBeNull();
    expect(routerOutlet).not.toBeNull();
  });
});
