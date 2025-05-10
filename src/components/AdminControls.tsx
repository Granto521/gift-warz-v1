import  { useState } from 'react';
import { Settings, Play, RefreshCw, X, Edit, Target } from 'lucide-react';

interface AdminControlsProps {
  onStartGame: (tiktokUsername: string, goalScore: number) => void;
  onResetGame: () => void;
  onStartNewRound: () => void;
  isActive: boolean;
  connected: boolean;
}

export default function AdminControls({ 
  onStartGame, 
  onResetGame, 
  onStartNewRound, 
  isActive, 
  connected 
}: AdminControlsProps) {
  const [tiktokUsername, setTiktokUsername] = useState('');
  const [goalScore, setGoalScore] = useState<number>(3000); // Higher default goal
  const [showSettings, setShowSettings] = useState(false);
  
  const handleStartGame = () => {
    if (!tiktokUsername) return;
    onStartGame(tiktokUsername, goalScore);
    setShowSettings(false);
  };
  
  return (
    <div className="card">
      <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
        <Settings className="w-5 h-5 text-gray-400" />
        Game Controls
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          {!isActive ? (
            <button
              onClick={() => setShowSettings(true)}
              className="btn-gradient w-full flex items-center justify-center gap-2"
              disabled={!connected}
            >
              <Play className="w-5 h-5" />
              Start New Game
            </button>
          ) : (
            <>
              <button
                onClick={onStartNewRound}
                className="btn-neutral w-full flex items-center justify-center gap-2"
                disabled={!connected}
              >
                <RefreshCw className="w-5 h-5" />
                Start New Round Manually
              </button>
              
              <button
                onClick={onResetGame}
                className="btn-danger w-full flex items-center justify-center gap-2"
                disabled={!connected}
              >
                <X className="w-5 h-5" />
                Reset Game
              </button>
            </>
          )}
        </div>
        
        {showSettings && (
          <div className="space-y-3 bg-gray-800/40 backdrop-blur-sm p-3 rounded-lg">
            <div>
              <label className="block text-sm text-gray-300 mb-1 flex items-center gap-1">
                <Edit className="w-4 h-4 text-gray-400" />
                TikTok Username
              </label>
              <input
                type="text"
                value={tiktokUsername}
                onChange={(e) => setTiktokUsername(e.target.value)}
                placeholder="Enter TikTok username"
                className="w-full bg-gray-900/80 border border-gray-700 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-300 mb-1 flex items-center gap-1">
                <Target className="w-4 h-4 text-gray-400" />
                Goal Score
              </label>
              <input
                type="number"
                value={goalScore}
                onChange={(e) => setGoalScore(parseInt(e.target.value) || 3000)}
                min={1000}
                step={500}
                className="w-full bg-gray-900/80 border border-gray-700 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>
            
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowSettings(false)}
                className="py-1 px-3 bg-gray-700 hover:bg-gray-600 rounded font-medium text-sm flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
              
              <button
                onClick={handleStartGame}
                disabled={!tiktokUsername || !connected}
                className="py-1 px-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded font-medium text-sm disabled:opacity-50 flex items-center gap-1"
              >
                <Play className="w-4 h-4" />
                Start Game
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
 