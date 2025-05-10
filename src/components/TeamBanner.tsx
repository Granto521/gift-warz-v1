import  { Flame, Snowflake } from 'lucide-react';
import { TeamType } from '../types';

interface TeamBannerProps {
  team: TeamType;
  score: number;
  goalScore: number;
  isWinning: boolean;
}

export default function TeamBanner({ team, score, goalScore, isWinning }: TeamBannerProps) {
  const progress = Math.min(100, (score / goalScore) * 100);
  const isFire = team === 'fire';
  const teamClass = isFire ? 'fire-effect' : 'ice-effect';
  const teamGradient = isFire 
    ? 'bg-gradient-to-r from-orange-500 to-red-600' 
    : 'bg-gradient-to-r from-blue-400 to-indigo-600';
  
  return (
    <div className={`card ${isWinning ? 'animate-glow' : ''} ${teamClass} relative overflow-hidden group`}>
      <div className={`flex items-center justify-between mb-3 ${isFire ? 'text-orange-500' : 'text-blue-400'}`}>
        <div className="flex items-center gap-2 text-xl font-bold">
          {isFire ? (
            <>
              <Flame className="w-7 h-7 animate-pulse-slow" />
              <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                Fire Team
              </span>
            </>
          ) : (
            <>
              <Snowflake className="w-7 h-7 animate-pulse-slow" />
              <span className="bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">
                Ice Team
              </span>
            </>
          )}
        </div>
        <div className="text-2xl font-bold backdrop-blur-sm bg-gray-900/40 rounded-lg px-3 py-1">
          {score}
        </div>
      </div>
      
      <div className="relative h-5 bg-gray-800/60 backdrop-blur-sm rounded-full overflow-hidden">
        <div 
          className={`absolute top-0 left-0 h-full ${teamGradient} transition-all duration-500 ease-out progress-bar-animate`} 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="mt-1 flex justify-between text-xs text-gray-400">
        <span>0</span>
        <span>{goalScore}</span>
      </div>

      {/* Background ornament */}
      <div className={`absolute -right-10 -bottom-10 opacity-5 transition-opacity duration-300 group-hover:opacity-10`}>
        {isFire ? (
          <Flame className="w-40 h-40" />
        ) : (
          <Snowflake className="w-40 h-40" />
        )}
      </div>
    </div>
  );
}
 