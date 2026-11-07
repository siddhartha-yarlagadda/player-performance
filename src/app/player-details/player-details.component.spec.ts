import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  ActivatedRoute,
  convertToParamMap,
  provideRouter,
} from '@angular/router';

import { PlayerDetailsComponent } from './player-details.component';

function routeFor(name: string) {
  return {
    provide: ActivatedRoute,
    useValue: { snapshot: { paramMap: convertToParamMap({ name }) } },
  };
}

describe('PlayerDetailsComponent', () => {
  let component: PlayerDetailsComponent;
  let fixture: ComponentFixture<PlayerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerDetailsComponent],
      providers: [provideRouter([]), routeFor('Brandon Ingram')],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a not-found message for an unknown player', async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [PlayerDetailsComponent],
      providers: [provideRouter([]), routeFor('No Such Player')],
    }).compileComponents();

    const notFound = TestBed.createComponent(PlayerDetailsComponent);
    notFound.detectChanges();

    expect(notFound.nativeElement.textContent).toContain(
      'No player named "No Such Player" was found.'
    );
  });
});
