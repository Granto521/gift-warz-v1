import  { useEffect, useState, useCallback } from 'react';
import { GameState } from '../types';

// Mock initial state for development
const initialState: GameState = {
  gameId: 'game-2',
  roundId: 'round-3',
  isActive: true,
  roundNumber: 3,
  fireScore: 750,
  iceScore: 580,
  roundEndTime: Date.now() + 5 * 60 * 1000,
  goalScore: 3000, // Higher goal score
  activities: [
    {
      id: 'a1',
      timestamp: Date.now() - 60000,
      type: 'joined',
      username: 'FlameWarrior',
      team: 'fire'
    },
    {
      id: 'a2',
      timestamp: Date.now() - 55000,
      type: 'joined',
      username: 'IceQueen',
      team: 'ice'
    },
    {
      id: 'a3',
      timestamp: Date.now() - 45000,
      type: 'comment',
      username: 'FlameWarrior',
      team: 'fire',
      message: 'Go team fire! 🔥'
    },
    {
      id: 'a4',
      timestamp: Date.now() - 30000,
      type: 'gift',
      username: 'IceQueen',
      team: 'ice',
      giftName: 'Ice Crown',
      giftValue: 200
    },
    {
      id: 'a5',
      timestamp: Date.now() - 15000,
      type: 'comment',
      username: 'NewViewer',
      team: null,
      message: 'How do I join a team?'
    }
  ],
  players: {
    'p1': { id: 'p1', username: 'FlameWarrior', team: 'fire', points: 300 },
    'p2': { id: 'p2', username: 'IceQueen', team: 'ice', points: 400 },
    'p3': { id: 'p3', username: 'FireFan123', team: 'fire', points: 150 },
    'p4': { id: 'p4', username: 'FrostKing', team: 'ice', points: 200 }
  },
  connected: true,
  tiktokUsername: 'tiktoklive'
};

// Mock function to generate new activities
const generateRandomActivity = (state: GameState) => {
  const types: Array<'joined' | 'comment' | 'gift'> = ['joined', 'comment', 'gift'];
  const type = types[Math.floor(Math.random() * types.length)];
  const team: 'fire' | 'ice' | null = Math.random() > 0.8 ? null : (Math.random() > 0.5 ? 'fire' : 'ice');
  const usernames = ['Viewer1', 'Viewer2', 'Viewer3', 'TikToker', 'FanGirl', 'GameBoy', 'StreamLover'];
  const username = usernames[Math.floor(Math.random() * usernames.length)];
  
  const activity = {
    id: `a${Date.now()}`,
    timestamp: Date.now(),
    type,
    username,
    team
  } as any;
  
  if (type === 'comment') {
    const comments = [
      'Let\'s go!', 
      'We can win this!', 
      'Team fire is the best!', 
      'Ice will dominate!',
      'Send more gifts!',
      'We need more points!'
    ];
    activity.message = comments[Math.floor(Math.random() * comments.length)];
  } else if (type === 'gift') {
    const gifts = ['Rose', 'Heart', 'Diamond', 'Crown', 'Star', 'Trophy'];
    const values = [50, 100, 200, 500, 1000];
    activity.giftName = gifts[Math.floor(Math.random() * gifts.length)];
    activity.giftValue = values[Math.floor(Math.random() * values.length)];
    
    // Update score
    if (team === 'fire') {
      state.fireScore += activity.giftValue;
    } else if (team === 'ice') {
      state.iceScore += activity.giftValue;
    }
  }
  
  return activity;
};

export function useSocket() {
  const [state, setState] = useState<GameState>(initialState);
  const [error, setError] = useState<string | null>(null);
  
  const startNewRound = useCallback(() => {
    setState(prev => ({
      ...prev,
      roundNumber: prev.roundNumber + 1,
      fireScore: 0,
      iceScore: 0,
      roundEndTime: Date.now() + 10 * 60 * 1000,
      activities: []
    }));
  }, []);
  
  // Check if a team has reached the goal score
  useEffect(() => {
    if (state.isActive && (state.fireScore >= state.goalScore || state.iceScore >= state.goalScore)) {
      // Play victory sound
      const audio = new Audio('/assets/round.ogg');
      audio.play().catch(err => console.error('Failed to play sound:', err));
      
      // Add a victory activity
      const winningTeam = state.fireScore >= state.goalScore ? 'fire' : 'ice';
      const victoryActivity = {
        id: `victory-${Date.now()}`,
        timestamp: Date.now(),
        type: 'system',
        message: `Team ${winningTeam} has won Round ${state.roundNumber}!`,
        team: winningTeam
      };
      
      // Add brief delay before starting next round
      setTimeout(() => {
        startNewRound();
      }, 3000);
      
      // Update state with victory message
      setState(prev => ({
        ...prev,
        activities: [victoryActivity, ...prev.activities]
      }));
    }
  }, [state.fireScore, state.iceScore, state.goalScore, state.isActive, state.roundNumber, startNewRound]);
  
  // Mock socket connection with simulated data
  useEffect(() => {
    // Simulate receiving activities
    const interval = setInterval(() => {
      setState(prev => {
        const newActivity = generateRandomActivity({...prev});
        const newActivities = [newActivity, ...prev.activities].slice(0, 20);
        
        return {
          ...prev,
          activities: newActivities,
          fireScore: newActivity.type === 'gift' && newActivity.team === 'fire' 
            ? prev.fireScore + newActivity.giftValue 
            : prev.fireScore,
          iceScore: newActivity.type === 'gift' && newActivity.team === 'ice' 
            ? prev.iceScore + newActivity.giftValue 
            : prev.iceScore
        };
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const startGame = useCallback((tiktokUsername: string, goalScore: number) => {
    setState(prev => ({
      ...prev,
      tiktokUsername,
      goalScore: goalScore || 3000, // Default to higher goal
      isActive: true,
      roundNumber: 1,
      fireScore: 0,
      iceScore: 0,
      roundEndTime: Date.now() + 10 * 60 * 1000,
      activities: []
    }));
  }, []);
  
  const resetGame = useCallback(() => {
    setState(prev => ({
      ...prev,
      isActive: false,
      roundNumber: 0,
      fireScore: 0,
      iceScore: 0,
      roundEndTime: null,
      activities: []
    }));
  }, []);
  
  return {
    state,
    startGame,
    resetGame,
    startNewRound,
    error
  };
}
 