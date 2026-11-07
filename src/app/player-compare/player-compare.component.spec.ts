import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCompareComponent } from './player-compare.component';

describe('PlayerCompareComponent', () => {
  let component: PlayerCompareComponent;
  let fixture: ComponentFixture<PlayerCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerCompareComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
