import  { TeamType } from './types';

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

export const getTeamColor = (team: TeamType, variant: 'light' | 'dark' | 'bg' = 'light'): string => {
  if (team === 'fire') {
    return variant === 'light' ? 'text-fire-500' : 
           variant === 'dark' ? 'text-fire-700' : 
           'bg-fire-pattern';
  } else {
    return variant === 'light' ? 'text-ice-500' : 
           variant === 'dark' ? 'text-ice-700' : 
           'bg-ice-pattern';
  }
};

export const formatTimeLeft = (endTime: number | null): string => {
  if (!endTime) return '00:00';
  
  const timeLeft = Math.max(0, endTime - Date.now());
  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);
  
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const getWinnerTeam = (fireScore: number, iceScore: number): TeamType | null => {
  if (fireScore > iceScore) return 'fire';
  if (iceScore > fireScore) return 'ice';
  return null;
};
 