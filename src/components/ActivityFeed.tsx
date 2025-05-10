import  { useState, useEffect, useRef } from 'react';
import { Activity, TeamType } from '../types';
import { Flame, Snowflake, MessageSquare, Gift, User, Bell } from 'lucide-react';

interface ActivityFeedProps {
  activities: Activity[];
}

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  const feedRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  
  useEffect(() => {
    if (autoScroll && feedRef.current) {
      feedRef.current.scrollTop = 0;
    }
  }, [activities, autoScroll]);
  
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'comment':
        return <MessageSquare className="w-4 h-4 text-gray-300" />;
      case 'gift':
        return <Gift className="w-4 h-4 text-pink-400" />;
      case 'joined':
      default:
        return <User className="w-4 h-4 text-gray-300" />;
    }
  };
  
  const getTeamIcon = (team: TeamType | null) => {
    if (team === 'fire') {
      return <Flame className="w-4 h-4 text-orange-500" />;
    }
    if (team === 'ice') {
      return <Snowflake className="w-4 h-4 text-blue-400" />;
    }
    return null;
  };
  
  const getTeamClass = (team: TeamType | null) => {
    if (team === 'fire') return 'text-orange-500';
    if (team === 'ice') return 'text-blue-400';
    return 'text-gray-300';
  };
  
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="card h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-gray-400" />
          <h2 className="text-lg font-bold">Activity Feed</h2>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-400">Auto-scroll</label>
          <button
            onClick={() => setAutoScroll(!autoScroll)}
            className={`w-12 h-6 rounded-full transition-colors relative ${
              autoScroll ? 'bg-blue-600' : 'bg-gray-700'
            }`}
          >
            <span
              className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                autoScroll ? 'translate-x-6' : ''
              }`}
            />
          </button>
        </div>
      </div>
      
      <div 
        ref={feedRef}
        className="flex-1 overflow-auto space-y-2 pr-1"
      >
        {activities.length === 0 ? (
          <p className="text-gray-400 text-sm text-center my-4">No activity yet</p>
        ) : (
          activities.map((activity) => (
            <div 
              key={activity.id} 
              className="activity-item flex items-start gap-2 p-3 rounded"
            >
              <div className="mt-1">{getActivityIcon(activity.type)}</div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-0.5">
                  <span className={`font-medium ${getTeamClass(activity.team)}`}>
                    {activity.username}
                  </span>
                  {getTeamIcon(activity.team)}
                </div>
                
                {activity.type === 'joined' && (
                  <p className="text-sm text-gray-300">
                    joined {activity.team ? `team ${activity.team}` : 'the game'}
                  </p>
                )}
                
                {activity.type === 'comment' && activity.message && (
                  <p className="text-sm text-gray-300 break-words">{activity.message}</p>
                )}
                
                {activity.type === 'gift' && (
                  <p className="text-sm text-gray-300">
                    sent {activity.giftName} 
                    {activity.giftValue && (
                      <span className="text-yellow-400 ml-1 font-medium">+{activity.giftValue} points</span>
                    )}
                  </p>
                )}
              </div>
              
              <div className="text-xs text-gray-500 whitespace-nowrap">
                {formatTimestamp(activity.timestamp)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
 