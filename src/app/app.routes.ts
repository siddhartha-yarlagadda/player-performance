import { Routes } from '@angular/router';
import { PlayerTableComponent } from './player-table/player-table.component';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { PlayerCompareComponent } from './player-compare/player-compare.component';
import { PlayerClustersComponent } from './player-clusters/player-clusters.component';

export const routes: Routes = [
  { path: '', component: PlayerTableComponent },
  { path: 'player/:name', component: PlayerDetailsComponent },
  { path: 'compare', component: PlayerCompareComponent },
  { path: 'cluster', component: PlayerClustersComponent },
];
