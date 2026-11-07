import { Component } from '@angular/core';
import data from '../../assets/data.json';
import { CommonModule } from '@angular/common';

interface Player {
  Name: string;
  GamesPlayed: number;
  MinutesPlayed: number;
  PointsPerGame: number;
  FieldGoalsMade: number;
  FieldGoalsAttempt: number;
  FieldGoalPercent: number;
  '3PointMade': number;
  '3PointAttempt': number;
  '3PointPercent': number;
  FreeThrowMade: number;
  FreeThrowAttempt: number;
  FreeThrowPercent: number;
  OffensiveRebounds: number;
  DefensiveRebounds: number;
  Rebounds: number;
  Assists: number;
  Steals: number;
  Blocks: number;
  Turnovers: number;
  Target: number;
}

@Component({
  selector: 'app-player-compare',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-compare.component.html',
  styleUrl: './player-compare.component.scss',
})
export class PlayerCompareComponent {
  player1?: any;
  player2?: any;
  players: Object[] | any = data;
  stats: any = [
    'GamesPlayed',
    'MinutesPlayed',
    'PointsPerGame',
    'FieldGoalsMade',
    'FieldGoalsAttempt',
    'FieldGoalPercent',
    '3PointMade',
    '3PointAttempt',
    '3PointPercent',
    'FreeThrowMade',
    'FreeThrowAttempt',
    'FreeThrowPercent',
    'OffensiveRebounds',
    'DefensiveRebounds',
    'Rebounds',
    'Assists',
    'Steals',
    'Blocks',
    'Turnovers',
  ];

  updateComparison(player1Index: number, player2Index: number): void {
    this.player1 = this.players[player1Index];
    this.player2 = this.players[player2Index];
  }

  handlePlayerSelect(event: Event, isPlayer1: boolean): void {
    const selectedIndex = +(event.target as HTMLSelectElement).value;
    if (isPlayer1) {
      this.updateComparison(
        selectedIndex,
        this.player2 ? this.players.indexOf(this.player2) : -1
      );
    } else {
      this.updateComparison(
        this.player1 ? this.players.indexOf(this.player1) : -1,
        selectedIndex
      );
    }
  }
}
