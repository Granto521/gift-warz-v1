import  { useEffect, useState } from 'react';
import { fetchLeaderboard } from '../api';
import { LeaderboardPlayer, TeamType } from '../types';
import { Flame, Snowflake, Award } from 'lucide-react';

interface LeaderboardProps {
  gameId?: string;
  team: TeamType;
}

export default function Leaderboard({ gameId, team }: LeaderboardProps) {
  const [players, setPlayers] = useState<LeaderboardPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await fetchLeaderboard(gameId, team);
        setPlayers(data);
        setError(null);
      } catch (err) {
        setError('Failed to load leaderboard');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getLeaderboard();
    // Refresh leaderboard data every 15 seconds
    const interval = setInterval(getLeaderboard, 15000);
    return () => clearInterval(interval);
  }, [gameId, team]);

  const TeamIcon = team === 'fire' ? Flame : Snowflake;
  const teamColor = team === 'fire' ? 'text-orange-500' : 'text-blue-400';
  const teamClass = team === 'fire' ? 'fire-effect' : 'ice-effect';
  const teamGradient = team === 'fire' 
    ? 'from-orange-500 to-red-600' 
    : 'from-blue-400 to-indigo-600';

  return (
    <div className={`card ${teamClass} h-full overflow-hidden`}>
      <div className={`flex items-center gap-2 font-bold mb-3 ${teamColor}`}>
        <TeamIcon className="w-5 h-5" />
        <h2 className={`text-lg bg-gradient-to-r ${teamGradient} bg-clip-text text-transparent`}>
          {team === 'fire' ? 'Fire' : 'Ice'} Team Leaders
        </h2>
      </div>

      {loading && (
        <div className="flex items-center justify-center h-[calc(100%-3rem)]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-400"></div>
        </div>
      )}
      
      {error && <p className="text-red-400 text-sm my-4 text-center">{error}</p>}

      {!loading && players.length === 0 && (
        <p className="text-gray-400 text-sm my-4 text-center">No players yet</p>
      )}

      {players.length > 0 && (
        <div className="space-y-2 max-h-[calc(100%-3rem)] overflow-auto pr-1">
          {players.map((player, index) => (
            <div 
              key={player.id} 
              className={`player-item flex items-center justify-between p-2 rounded ${
                index === 0 ? 'bg-gray-700/50 font-medium' : 'bg-gray-800/30'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                {index < 3 ? (
                  <Award className={`w-5 h-5 ${
                    index === 0 ? 'text-yellow-400' : 
                    index === 1 ? 'text-gray-400' : 'text-amber-800'
                  }`} />
                ) : (
                  <span className="text-gray-500 text-xs w-5 text-center">{index + 1}</span>
                )}
                
                <span className="truncate">{player.username}</span>
              </div>
              <span className={`font-medium ${teamColor} px-2 py-0.5 rounded-full bg-gray-900/30`}>
                {player.points}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
 