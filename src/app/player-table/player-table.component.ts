import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import data from '../../assets/data.json';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-player-table',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './player-table.component.html',
  styleUrl: './player-table.component.scss',
})
export class PlayerTableComponent {
  playerData: any = data;
  sortDirection: { [key: string]: boolean } = {};

  sort(column: string) {
    this.sortDirection[column] = !this.sortDirection[column]; // Toggle sort direction
    const direction = this.sortDirection[column] ? 1 : -1; // 1 for ascending, -1 for descending

    this.playerData.sort(
      (a: { [x: string]: number }, b: { [x: string]: number }) => {
        if (a[column] < b[column]) return -1 * direction;
        if (a[column] > b[column]) return 1 * direction;
        return 0;
      }
    );
  }
}
