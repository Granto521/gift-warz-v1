import  { GameHistoryData, LeaderboardPlayer, TeamType } from './types';

// Mock data for development until real API is available
const MOCK_LEADERBOARD: Record<TeamType, LeaderboardPlayer[]> = {
  fire: [
    { id: '1', username: 'FireFan123', points: 1500, team: 'fire' },
    { id: '2', username: 'BurningBrightly', points: 1200, team: 'fire' },
    { id: '3', username: 'EmberEnthusiast', points: 900, team: 'fire' },
    { id: '4', username: 'FlameWarrior', points: 700, team: 'fire' },
    { id: '5', username: 'HeatSeeker', points: 500, team: 'fire' }
  ],
  ice: [
    { id: '6', username: 'FrostKing', points: 1400, team: 'ice' },
    { id: '7', username: 'SnowQueen', points: 1100, team: 'ice' },
    { id: '8', username: 'GlacierGuru', points: 800, team: 'ice' },
    { id: '9', username: 'CoolBreeze', points: 600, team: 'ice' },
    { id: '10', username: 'IcyVeins', points: 400, team: 'ice' }
  ]
};

const MOCK_GAME_HISTORY: GameHistoryData[] = [
  {
    gameId: 'game-1',
    startTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(),
    totalRounds: 5,
    fireWins: 3,
    iceWins: 2,
    rounds: [
      { roundId: 'r1', roundNumber: 1, fireScore: 1200, iceScore: 900, winner: 'fire' },
      { roundId: 'r2', roundNumber: 2, fireScore: 800, iceScore: 1100, winner: 'ice' },
      { roundId: 'r3', roundNumber: 3, fireScore: 1500, iceScore: 1300, winner: 'fire' },
      { roundId: 'r4', roundNumber: 4, fireScore: 900, iceScore: 1200, winner: 'ice' },
      { roundId: 'r5', roundNumber: 5, fireScore: 1700, iceScore: 1500, winner: 'fire' }
    ]
  },
  {
    gameId: 'game-2',
    startTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    endTime: null,
    totalRounds: 2,
    fireWins: 1,
    iceWins: 1,
    rounds: [
      { roundId: 'r6', roundNumber: 1, fireScore: 1100, iceScore: 900, winner: 'fire' },
      { roundId: 'r7', roundNumber: 2, fireScore: 800, iceScore: 1200, winner: 'ice' }
    ]
  }
];

const ACTIVE_GAME = {
  gameId: 'game-2'
};

// Simulated API fetch with mock data
export const fetchLeaderboard = async (gameId?: string, team?: string): Promise<LeaderboardPlayer[]> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Filter by team if provided
    if (team && team in MOCK_LEADERBOARD) {
      return [...MOCK_LEADERBOARD[team as TeamType]];
    }
    
    // Return all players sorted by points
    return [
      ...MOCK_LEADERBOARD.fire, 
      ...MOCK_LEADERBOARD.ice
    ].sort((a, b) => b.points - a.points);
    
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
};

export const fetchGameHistory = async (gameId?: string): Promise<GameHistoryData[]> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (gameId) {
      const game = MOCK_GAME_HISTORY.find(g => g.gameId === gameId);
      return game ? [game] : [];
    }
    
    return [...MOCK_GAME_HISTORY];
    
  } catch (error) {
    console.error('Error fetching game history:', error);
    return [];
  }
};

export const fetchActiveGame = async (): Promise<{ gameId: string } | null> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return { ...ACTIVE_GAME };
    
  } catch (error) {
    console.error('Error fetching active game:', error);
    return null;
  }
};
 