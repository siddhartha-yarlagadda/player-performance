import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideRouter } from '@angular/router';

import { PlayerTableComponent } from './player-table.component';

describe('PlayerTableComponent', () => {
  let component: PlayerTableComponent;
  let fixture: ComponentFixture<PlayerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerTableComponent],
      providers: [provideRouter([])],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
