import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import data from '../../assets/data.json';

@Component({
  selector: 'app-player-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './player-details.component.html',
  styleUrl: './player-details.component.scss',
})
export class PlayerDetailsComponent implements OnInit {
  playerName?: string;
  playerData: any = data;
  playerObj?: any;
  tsp?: number | string;
  efgp?: number | string;
  positiveContributions?: number;
  negativeContributions?: number;
  averagePER: number = 23.04;
  per?: number | string;
  uPER?: number;

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.playerName = this.route.snapshot.paramMap.get('name') || '';
    this.playerObj = this.playerData.filter(
      (player: { Name: string | undefined }) => player.Name === this.playerName
    )[0];
    if (!this.playerObj) {
      return;
    }

    this.tsp =
      ((this.playerObj.GamesPlayed * this.playerObj.PointsPerGame) /
        (2 *
          (this.playerObj.GamesPlayed * this.playerObj.FieldGoalsAttempt +
            0.44 *
              (this.playerObj.GamesPlayed *
                this.playerObj.FreeThrowAttempt)))) *
      100;
    this.tsp = this.tsp.toFixed(2);

    this.efgp =
      ((this.playerObj.GamesPlayed * this.playerObj.FieldGoalsMade +
        0.5 * (this.playerObj.GamesPlayed * this.playerObj['3PointMade'])) /
        (this.playerObj.GamesPlayed * this.playerObj.FieldGoalsAttempt)) *
      100;
    this.efgp = this.efgp.toFixed(2);

    this.positiveContributions =
      (this.playerObj.PointsPerGame +
        0.7 * this.playerObj.FieldGoalsMade +
        0.4 * this.playerObj.FieldGoalsAttempt +
        0.5 * this.playerObj.OffensiveRebounds +
        0.7 * this.playerObj.DefensiveRebounds +
        2 * this.playerObj.Assists +
        2 * this.playerObj.Steals +
        2 * this.playerObj.Blocks) *
      this.playerObj.GamesPlayed;
    this.negativeContributions =
      (0.7 *
        (this.playerObj.FieldGoalsAttempt - this.playerObj.FieldGoalsMade) +
        0.4 * (this.playerObj.FreeThrowAttempt - this.playerObj.FreeThrowMade) +
        this.playerObj.Turnovers) *
      this.playerObj.GamesPlayed;
    this.uPER =
      (this.positiveContributions - this.negativeContributions) /
      (this.playerObj.GamesPlayed * this.playerObj.MinutesPlayed);
    this.per = (this.uPER / this.averagePER) * 15;
    this.per = this.per.toFixed(2);
  }
}
