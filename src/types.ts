export  type TeamType = 'fire' | 'ice' | null;

export type ActivityType = 'joined' | 'comment' | 'gift' | 'system';

export interface Activity {
  id: string;
  timestamp: number;
  type: ActivityType;
  username?: string;
  team: TeamType;
  message?: string;
  giftName?: string;
  giftValue?: number;
}

export interface Player {
  id: string;
  username: string;
  team: TeamType;
  points: number;
}

export interface GameState {
  gameId: string;
  roundId: string;
  isActive: boolean;
  roundNumber: number;
  fireScore: number;
  iceScore: number;
  roundEndTime: number | null;
  goalScore: number;
  activities: Activity[];
  players: Record<string, Player>;
  connected: boolean;
  tiktokUsername: string;
}

export interface GameHistoryRound {
  roundId: string;
  roundNumber: number;
  startTime: string;
  endTime: string | null;
  fireScore: number;
  iceScore: number;
  winner: TeamType;
}

export interface GameHistoryData {
  gameId: string;
  startTime: string;
  endTime: string | null;
  totalRounds: number;
  fireWins: number;
  iceWins: number;
  rounds: GameHistoryRound[];
}

export interface LeaderboardPlayer {
  id: string;
  username: string;
  points: number;
}
 