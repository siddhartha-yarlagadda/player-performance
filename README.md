# Player Performance

An Angular dashboard for exploring and analysing basketball player statistics. It ships with a bundled dataset of 1,340 NBA rookie seasons and lets you sort, drill into, compare and cluster players.

## Features

- **Player table** (`/`): every player's per-game stats, sortable by any column.
- **Player details** (`/player/:name`): full stat line plus derived efficiency metrics:
  - **TS%**: True Shooting Percentage
  - **eFG%**: Effective Field Goal Percentage
  - **PER**: a simplified Player Efficiency Rating, normalised against a fixed league average
- **Compare** (`/compare`): side-by-side comparison of any two players.
- **Cluster** (`/cluster`): groups players into 5 clusters with k-means ([`ml-kmeans`](https://github.com/mljs/kmeans)) across 17 stats, shown as a scatter plot ([Chart.js](https://www.chartjs.org/)) on two attributes you pick.

## Tech stack

- [Angular 17](https://angular.dev/) (standalone components) with server-side rendering and prerendering via `@angular/ssr`
- [Tailwind CSS](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/) and [ml-kmeans](https://github.com/mljs/kmeans)
- Karma and Jasmine for unit tests

## Getting started

Prerequisites: Node.js 18.13+ or 20.9+ and npm.

```bash
git clone <this-repo-url>
cd player-performance
npm install
npm start
```

Then open http://localhost:4200/.

## Scripts

| Command | Description |
| --- | --- |
| `npm start` | Start the dev server with live reload |
| `npm run build` | Production build (browser and server bundles) to `dist/` |
| `npm run serve:ssr:player-performance` | Serve the production SSR build at http://localhost:4000 (run `npm run build` first) |
| `npm test` | Run the unit tests with Karma |

## Data

Player data lives in [`src/assets/data.json`](src/assets/data.json) and is bundled into the app at build time. Each record holds a player's rookie-season per-game averages:

| Field | Meaning |
| --- | --- |
| `Name` | Player name |
| `GamesPlayed`, `MinutesPlayed` | Games played, minutes per game |
| `PointsPerGame` | Points per game |
| `FieldGoalsMade` / `FieldGoalsAttempt` / `FieldGoalPercent` | Field goals |
| `3PointMade` / `3PointAttempt` / `3PointPercent` | Three-pointers |
| `FreeThrowMade` / `FreeThrowAttempt` / `FreeThrowPercent` | Free throws |
| `OffensiveRebounds`, `DefensiveRebounds`, `Rebounds` | Rebounds |
| `Assists`, `Steals`, `Blocks`, `Turnovers` | Other box-score stats |
| `Target` | `1` if the player's NBA career lasted at least 5 years, otherwise `0` |

**Source:** the NBA rookie career-longevity dataset (`nba_logreg.csv`, 1,340 players and 21 columns) from the data.world [Logistic Regression Exercise 1](https://data.world/exercises/logistic-regression-exercise-1). The columns have been renamed for readability. Check the source page for its license terms before you reuse the data.

To use your own data, replace `data.json` with an array of objects that have the same fields.

## License

[MIT](LICENSE)
