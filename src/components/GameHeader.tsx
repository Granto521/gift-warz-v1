import  { Flame, Snowflake, Zap } from 'lucide-react';

interface GameHeaderProps {
  connected: boolean;
}

export default function GameHeader({ connected }: GameHeaderProps) {
  return (
    <header className="mb-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative">
          <h1 className="text-3xl md:text-4xl font-bold relative z-10 overflow-hidden">
            <span className="animate-pulse-slow bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 bg-clip-text text-transparent pr-2">
              Gift Warz:
            </span>
            <span className="animate-pulse-slow bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
              Kingdom Clash
            </span>
          </h1>
          <div className="absolute left-0 top-0 w-full h-full flex justify-between opacity-40 z-0">
            <Flame className="w-8 h-8 text-orange-500" />
            <Snowflake className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        
        <div className="text-sm bg-gray-900/60 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-800">
          {connected ? (
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="flex items-center gap-1">
                Connected to: <span className="font-medium text-emerald-400">TikTok Live</span>
                <Zap className="w-4 h-4 text-yellow-400" />
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>
              <span className="text-red-400">Disconnected</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
 