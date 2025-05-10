import  { useState, useEffect } from 'react';
import { useSocket } from './hooks/useSocket';
import ScoreBoard from './components/ScoreBoard';
import ActivityFeed from './components/ActivityFeed';
import AdminControls from './components/AdminControls';
import GameHeader from './components/GameHeader';
import GameHistory from './components/GameHistory';
import Leaderboard from './components/Leaderboard';
import { Flame, Snowflake } from 'lucide-react';
import './index.css';

function App() {
  const { state, startGame, resetGame, startNewRound } = useSocket();
  const [winnerAnnouncement, setWinnerAnnouncement] = useState<string | null>(null);
  
  // Check if a team has reached the goal score
  useEffect(() => {
    if (state.isActive && (state.fireScore >= state.goalScore || state.iceScore >= state.goalScore)) {
      const winner = state.fireScore >= state.goalScore ? 'FIRE' : 'ICE';
      setWinnerAnnouncement(`TEAM ${winner} WINS ROUND ${state.roundNumber}!`);
      
      // Clear announcement after 3 seconds
      const timer = setTimeout(() => {
        setWinnerAnnouncement(null);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [state.fireScore, state.iceScore, state.goalScore, state.isActive, state.roundNumber]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Winner announcement overlay */}
      {winnerAnnouncement && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 animate-fadeIn">
          <div className={`text-center p-8 rounded-xl animate-scale ${
            winnerAnnouncement.includes('FIRE') 
              ? 'bg-gradient-to-br from-red-700 to-orange-700 shadow-[0_0_50px_rgba(239,68,68,0.5)]' 
              : 'bg-gradient-to-br from-blue-700 to-cyan-700 shadow-[0_0_50px_rgba(59,130,246,0.5)]'
          }`}>
            <div className="flex justify-center mb-6">
              {winnerAnnouncement.includes('FIRE') 
                ? <Flame className="w-24 h-24 text-orange-400 animate-pulse" />
                : <Snowflake className="w-24 h-24 text-blue-400 animate-pulse" />
              }
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">{winnerAnnouncement}</h1>
            <p className="text-lg md:text-xl opacity-90">Next round starting soon...</p>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4 py-6">
        <GameHeader connected={state.connected} tiktokUsername={state.tiktokUsername} />
        
        <main className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main game area - 2/3 width on large screens */}
          <div className="lg:col-span-2 space-y-6">
            <ScoreBoard gameState={state} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Leaderboard gameId={state.gameId} team="fire" />
              <Leaderboard gameId={state.gameId} team="ice" />
            </div>
            
            <GameHistory />
          </div>
          
          {/* Sidebar - 1/3 width on large screens */}
          <div className="space-y-6">
            <ActivityFeed activities={state.activities} />
            <AdminControls 
              onStartGame={startGame}
              onResetGame={resetGame}
              onStartNewRound={startNewRound}
              isActive={state.isActive}
              connected={state.connected}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
 