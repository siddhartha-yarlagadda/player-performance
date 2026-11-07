import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { kmeans } from 'ml-kmeans';
import data from '../../assets/data.json';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import Chart from 'chart.js/auto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-player-clusters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './player-clusters.component.html',
  styleUrl: './player-clusters.component.scss',
})
export class PlayerClustersComponent implements OnInit, AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}
  result?: any;
  playerData: any = data;
  clusters: any[] = [];
  chart: any;
  cluster1?: any;
  cluster2?: any;
  cluster3?: any;
  cluster4?: any;
  cluster5?: any;

  attributes = [
    'Name',
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
    'Target',
  ];
  selectedAttribute1: string = 'PointsPerGame';
  selectedAttribute2: string = 'GamesPlayed';

  ngOnInit(): void {
    this.clusterPlayers();
  }

  ngAfterViewInit(): void {
    // The canvas only exists after the view renders, and only in the browser.
    this.visualizeClusters();
  }

  clusterPlayers() {
    // Prepare data for clustering (Points, Assists, Rebounds)
    const data: number[][] = this.playerData.map((player: any) => {
      return [
        player.PointsPerGame,
        player.FieldGoalsMade,
        player.FieldGoalsAttempt,
        player.FieldGoalPercent,
        player['3PointMade'],
        player['3PointAttempt'],
        player['3PointPercent'],
        player.FreeThrowMade,
        player.FreeThrowAttempt,
        player.FreeThrowPercent,
        player.OffensiveRebounds,
        player.DefensiveRebounds,
        player.Rebounds,
        player.Assists,
        player.Steals,
        player.Blocks,
        player.Turnovers,
      ].map((value: any) => Number(value));
    });

    // Perform KMeans clustering with K=2 (two clusters)
    const k = 5;
    const options = {
      maxIterations: 100, // Maximum number of iterations
      tolerance: 0.0001, // Convergence tolerance
    };
    const kmeansResult = kmeans(data, k, options);

    // Map clusters back to players
    this.clusters = this.playerData.map((player: any, index: number) => ({
      player,
      cluster: kmeansResult.clusters[index], // Assign cluster ID
    }));
    // this.cluster1 = this.clusters['0'];
    // console.log('this.cluster1', this.cluster1);

  }

  updateComparision() {
    this.clusterPlayers();
    this.visualizeClusters();
  }

  visualizeClusters() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Prepare the chart data
    if (this.chart) {
      this.chart.destroy();
    }

    const datasets: {
      label: string;
      data: any;
      backgroundColor: string;
      pointRadius: number;
    }[] = [];

    // Group players by their cluster
    const clusterGroups: { [key: number]: any[] } = {};
    this.clusters.forEach((cluster) => {
      const clusterId: number = cluster.cluster;
      if (!clusterGroups[clusterId]) {
        clusterGroups[clusterId] = [];
      }
      clusterGroups[clusterId].push({
        x: cluster.player[this.selectedAttribute1],
        y: cluster.player[this.selectedAttribute2],
        label: cluster.player.Name,
      });
    });


    // Create datasets for each cluster
    // Object.keys(clusterGroups).forEach((key) => {

    // });
    datasets.push({
      label: `Cluster ${1}`,
      data: clusterGroups[0],
      backgroundColor: this.getRandomColor(),
      pointRadius: 5,
    });
    datasets.push({
      label: `Cluster ${2}`,
      data: clusterGroups[1],
      backgroundColor: this.getRandomColor(),
      pointRadius: 5,
    });
    datasets.push({
      label: `Cluster ${3}`,
      data: clusterGroups[2],
      backgroundColor: this.getRandomColor(),
      pointRadius: 5,
    });
    datasets.push({
      label: `Cluster ${4}`,
      data: clusterGroups[3],
      backgroundColor: this.getRandomColor(),
      pointRadius: 5,
    });
    datasets.push({
      label: `Cluster ${5}`,
      data: clusterGroups[4],
      backgroundColor: this.getRandomColor(),
      pointRadius: 5,
    });

    // Create the chart
    this.chart = new Chart('clusterChart', {
      type: 'scatter',
      data: {
        datasets: datasets,
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: this.selectedAttribute1,
            },
          },
          y: {
            title: {
              display: true,
              text: this.selectedAttribute2,
            },
          },
        },
      },
    });
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
