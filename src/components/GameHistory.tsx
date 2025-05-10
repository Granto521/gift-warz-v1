import  { useEffect, useState } from 'react';
import { GameHistoryData, GameHistoryRound } from '../types';
import { fetchGameHistory } from '../api';
import { Flame, Snowflake, Trophy, Clock, ArrowDown } from 'lucide-react';

export default function GameHistory() {
  const [games, setGames] = useState<GameHistoryData[]>([]);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getGameHistory = async () => {
      try {
        setLoading(true);
        const data = await fetchGameHistory();
        setGames(data);
        if (data.length > 0 && !selectedGame) {
          setSelectedGame(data[0].gameId);
        }
        setError(null);
      } catch (err) {
        setError('Failed to load game history');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getGameHistory();
    // Refresh game history every 30 seconds
    const interval = setInterval(getGameHistory, 30000);
    return () => clearInterval(interval);
  }, [selectedGame]);

  const selectedGameData = games.find(game => game.gameId === selectedGame);

  const getTeamColor = (team: 'fire' | 'ice' | null) => {
    if (team === 'fire') return 'text-orange-500';
    if (team === 'ice') return 'text-blue-400';
    return 'text-gray-400';
  };

  if (loading) {
    return (
      <div className="card h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card h-full">
        <h2 className="text-lg font-bold mb-3">Game History</h2>
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="card h-full">
        <h2 className="text-lg font-bold mb-3">Game History</h2>
        <p className="text-gray-400">No games played yet</p>
      </div>
    );
  }

  return (
    <div className="card h-full overflow-hidden">
      <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
        <Clock className="w-5 h-5 text-gray-400" />
        Game History
      </h2>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-grow">
          <label className="block text-sm text-gray-400 mb-1 flex items-center gap-1">
            <ArrowDown className="w-4 h-4" />
            Select Game
          </label>
          <div className="relative">
            <select 
              value={selectedGame || ''} 
              onChange={e => setSelectedGame(e.target.value)}
              className="w-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded p-2 text-sm appearance-none"
            >
              {games.map(game => (
                <option key={game.gameId} value={game.gameId}>
                  {new Date(game.startTime).toLocaleString()} - 
                  {game.fireWins > game.iceWins ? ' Fire Wins' : 
                   game.iceWins > game.fireWins ? ' Ice Wins' : 
                   ' Tie'}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <ArrowDown className="w-4 h-4" />
            </div>
          </div>
        </div>
        
        {selectedGameData && (
          <div className="flex flex-col sm:flex-row gap-4 text-center">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded p-3 flex-1 card fire-effect">
              <div className="flex items-center justify-center gap-1 text-orange-500 mb-1">
                <Flame className="w-4 h-4" />
                <span className="text-sm font-medium">Fire Wins</span>
              </div>
              <div className="text-xl font-bold">{selectedGameData.fireWins}</div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded p-3 flex-1 card ice-effect">
              <div className="flex items-center justify-center gap-1 text-blue-400 mb-1">
                <Snowflake className="w-4 h-4" />
                <span className="text-sm font-medium">Ice Wins</span>
              </div>
              <div className="text-xl font-bold">{selectedGameData.iceWins}</div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded p-3 flex-1 card">
              <div className="text-sm font-medium text-gray-300 mb-1 flex items-center justify-center gap-1">
                <Trophy className="w-4 h-4 text-yellow-400" />
                Total Rounds
              </div>
              <div className="text-xl font-bold">{selectedGameData.totalRounds}</div>
            </div>
          </div>
        )}
      </div>
      
      {selectedGameData && selectedGameData.rounds.length > 0 ? (
        <div className="overflow-auto max-h-[calc(100%-12rem)] scrollbar-thin">
          <table className="w-full text-sm border-separate border-spacing-y-1">
            <thead className="bg-gray-800/70 backdrop-blur-sm sticky top-0 z-10">
              <tr>
                <th className="p-2 text-left rounded-l-lg">Round</th>
                <th className="p-2 text-right">
                  <span className="flex items-center justify-end gap-1">
                    <Flame className="w-3 h-3 text-orange-500" />
                    <span>Fire</span>
                  </span>
                </th>
                <th className="p-2 text-right">
                  <span className="flex items-center justify-end gap-1">
                    <Snowflake className="w-3 h-3 text-blue-400" />
                    <span>Ice</span>
                  </span>
                </th>
                <th className="p-2 text-right rounded-r-lg">Winner</th>
              </tr>
            </thead>
            <tbody>
              {selectedGameData.rounds.map((round: GameHistoryRound) => (
                <tr key={round.roundId} className="round-data-row">
                  <td className="p-2 bg-gray-800/30 backdrop-blur-sm rounded-l-lg">
                    {round.roundNumber}
                  </td>
                  <td className="p-2 bg-gray-800/30 backdrop-blur-sm text-right font-medium text-orange-500">
                    {round.fireScore}
                  </td>
                  <td className="p-2 bg-gray-800/30 backdrop-blur-sm text-right font-medium text-blue-400">
                    {round.iceScore}
                  </td>
                  <td className="p-2 bg-gray-800/30 backdrop-blur-sm text-right rounded-r-lg">
                    {round.winner && (
                      <div className="flex items-center justify-end gap-1">
                        <Trophy className="w-3 h-3 text-yellow-400" />
                        <span className={`${getTeamColor(round.winner)} font-medium`}>
                          {round.winner.charAt(0).toUpperCase() + round.winner.slice(1)}
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-gray-800/30 backdrop-blur-sm p-4 rounded-lg text-center">
          <p className="text-gray-400">No rounds played in this game yet</p>
        </div>
      )}
    </div>
  );
}
 