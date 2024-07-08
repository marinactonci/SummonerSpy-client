export class Leaderboard {
  rank?: number;
  summonerName: string;
  points: number;
  stats: {
    wins: number;
    losses: number;
    winrate: number;
  }
}
