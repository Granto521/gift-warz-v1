import  { Flame, Snowflake } from 'lucide-react';
import { GameState, TeamType } from '../types';

interface ScoreBoardProps {
  gameState: GameState;
}

interface TeamBannerProps {
  team: TeamType;
  score: number;
  goalScore: number;
  isWinning: boolean;
  roundNumber: number;
}

const TeamBanner = ({ team, score, goalScore, isWinning, roundNumber }: TeamBannerProps) => {
  const progressPercent = Math.min(100, (score / goalScore) * 100);
  
  return (
    <div 
      className={`
        relative rounded-xl p-4 md:p-6 overflow-hidden transition-all duration-500 
        ${team === 'fire' ? 'bg-gradient-to-r from-orange-800 to-red-800' : 'bg-gradient-to-r from-blue-800 to-cyan-800'}
        ${isWinning ? 'scale-102 shadow-lg border' : 'scale-100'}
        ${team === 'fire' ? 'border-orange-400' : 'border-blue-400'}
        ${isWinning ? 'border-opacity-50' : 'border-opacity-0'}
      `}
    >
      {/* Progress bar */}
      <div 
        className={`absolute left-0 bottom-0 h-1.5 ${team === 'fire' ? 'bg-orange-400' : 'bg-blue-400'} transition-all duration-300`}
        style={{ width: `${progressPercent}%` }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {team === 'fire' ? (
              <Flame className="w-7 h-7 text-orange-400" />
            ) : (
              <Snowflake className="w-7 h-7 text-blue-400" />
            )}
            <h3 className="text-xl md:text-2xl font-bold">
              Team {team === 'fire' ? 'Fire' : 'Ice'}
            </h3>
          </div>
          
          <div className="text-xs font-medium bg-black/30 rounded-full px-2 py-0.5">
            Round {roundNumber}
          </div>
        </div>
        
        <div className="flex justify-between items-end">
          <div>
            <div className="text-sm md:text-base text-gray-300 mb-1">Current Score</div>
            <div className="text-3xl md:text-5xl font-bold">
              {score.toLocaleString()}
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm md:text-base text-gray-300 mb-1">Goal</div>
            <div className="text-xl md:text-2xl font-semibold">
              {goalScore.toLocaleString()}
            </div>
          </div>
        </div>
        
        {/* Threshold markers */}
        <div className="grid grid-cols-4 gap-1 mt-4">
          {[25, 50, 75, 100].map(threshold => (
            <div 
              key={threshold}
              className={`h-1 rounded-full ${
                progressPercent >= threshold 
                  ? team === 'fire' ? 'bg-orange-400' : 'bg-blue-400' 
                  : 'bg-gray-700'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function ScoreBoard({ gameState }: ScoreBoardProps) {
  const { 
    fireScore, 
    iceScore, 
    goalScore,
    roundNumber,
  } = gameState;
  
  const fireIsWinning = fireScore > iceScore;
  const iceIsWinning = iceScore > fireScore;
  
  // Calculate the percentage to display in the middle
  const totalPoints = fireScore + iceScore;
  const firePercent = totalPoints > 0 ? Math.round((fireScore / totalPoints) * 100) : 50;
  const icePercent = totalPoints > 0 ? 100 - firePercent : 50;
  
  // Check if a team has reached the goal (auto-start next round is handled in useSocket)
  const reachedGoal = fireScore >= goalScore || iceScore >= goalScore;
  
  return (
    <div className="card">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <TeamBanner 
          team="fire" 
          score={fireScore} 
          goalScore={goalScore}
          isWinning={fireIsWinning}
          roundNumber={roundNumber}
        />
        
        <TeamBanner 
          team="ice" 
          score={iceScore} 
          goalScore={goalScore}
          isWinning={iceIsWinning}
          roundNumber={roundNumber}
        />
      </div>
      
      {/* Battle progress bar */}
      <div className="relative h-8 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-600 to-red-600 transition-all duration-700"
          style={{ width: `${firePercent}%` }}
        ></div>
        <div 
          className="absolute right-0 top-0 h-full bg-gradient-to-l from-blue-600 to-cyan-600 transition-all duration-700"
          style={{ width: `${icePercent}%` }}
        ></div>
        
        {/* Divider in the middle */}
        <div className="absolute left-1/2 top-0 h-full w-1 bg-white/20 transform -translate-x-1/2 z-10"></div>
        
        {/* Percentages */}
        <div className="absolute inset-0 flex justify-between items-center px-3 z-20">
          <span className="text-xs font-bold text-white bg-black/30 rounded-full px-2 py-0.5">
            {firePercent}%
          </span>
          <span className="text-xs font-bold text-white bg-black/30 rounded-full px-2 py-0.5">
            {icePercent}%
          </span>
        </div>
      </div>
      
      {/* Auto-next round message */}
      {reachedGoal && (
        <div className="mt-3 text-center bg-purple-900/50 rounded-lg p-2 animate-pulse">
          <p className="text-purple-300 text-sm">
            {fireScore >= goalScore ? 'Team Fire' : 'Team Ice'} reached the goal! Next round starts automatically...
          </p>
        </div>
      )}
    </div>
  );
}
 