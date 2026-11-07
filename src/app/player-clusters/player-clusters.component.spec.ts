import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerClustersComponent } from './player-clusters.component';

describe('PlayerClustersComponent', () => {
  let component: PlayerClustersComponent;
  let fixture: ComponentFixture<PlayerClustersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerClustersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerClustersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
