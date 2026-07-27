import React, { useState } from 'react';

import { Camera } from 'lucide-react';
import { cn } from '../lib/utils';

const FEEDS = [
  { id: 'CAM_01', name: 'BROOKLYN VISIONS // SECTOR 4', url: '/15010354-sd_960_540_15fps.mp4' },
  { id: 'CAM_02', name: 'OSCORP LABS // SECTOR 7', url: '/15640141_960_540_24fps.mp4' },
  { id: 'CAM_03', name: 'SUBWAY TUNNEL // SECTOR 2', url: '/2104637-hd_1280_720_30fps.mp4' }
];

const LiveClock = React.memo(function LiveClock() {
  const [time, setTime] = useState(new Date());
  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return <>{time.toLocaleTimeString([], { hour12: false })}</>;
});

export const LiveFeedApp = React.memo(function LiveFeedApp() {
  const [activeFeed, setActiveFeed] = useState(FEEDS[0]);

  return (
    <div className="w-full h-full flex flex-col bg-black p-2 gap-2 font-mono relative">
      
      <div className="relative flex-1 bg-[#050505] border border-cyan-900/40 overflow-hidden flex flex-col p-1 rounded-sm">
        <div className="flex justify-between items-center text-[10px] text-cyan-600 font-medium border-b border-cyan-900/40 pb-1 mb-1 px-1 z-20">
          <span className="tracking-widest opacity-80">{activeFeed.name}</span>
          <span className="text-cyan-500 flex items-center gap-1.5 tracking-wider text-[9px]">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_6px_rgba(239,68,68,0.6)]" /> 
            REC
          </span>
        </div>

        <div className="flex-1 relative bg-black rounded-sm overflow-hidden border border-white/5">
          <video 
            key={activeFeed.url} 
            src={activeFeed.url} 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover sepia-[.3] hue-rotate-[180deg] saturate-50 brightness-90 contrast-[1.1] will-change-transform transform-gpu z-0 opacity-90 mix-blend-screen"
          />
          
          <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[length:24px_24px]" />
          
          <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_0_60px_rgba(0,0,0,0.9)]" />
          
          <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px]" />
          
          <div className="absolute top-2 left-2 z-20 text-cyan-400/80 text-[9px] font-mono tracking-widest drop-shadow-md">
            SYS.TIME: <LiveClock />
          </div>
          
          <div className="absolute bottom-2 right-2 z-20 text-cyan-600/60 text-[8px] font-mono tracking-widest uppercase">
            ENCRYPTED_LINK_ESTABLISHED
          </div>
          
          <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center opacity-20">
             <div className="w-12 h-12 border border-cyan-400/30 rounded-full" />
             <div className="absolute w-1.5 h-1.5 bg-cyan-400/50 rounded-full" />
             <div className="absolute w-full h-[1px] bg-cyan-400/10" />
             <div className="absolute h-full w-[1px] bg-cyan-400/10" />
          </div>
        </div>
      </div>

      <div className="h-7 flex gap-1 z-20 mt-1">
        {FEEDS.map(feed => (
          <button
            key={feed.id}
            onClick={() => setActiveFeed(feed)}
            className={cn(
              "flex-1 text-[9px] font-mono tracking-widest flex items-center justify-center gap-1.5 transition-all duration-300 border-t-2 rounded-b-sm",
              activeFeed.id === feed.id 
                ? "bg-cyan-950/40 text-cyan-300 border-cyan-400 shadow-[inset_0_10px_20px_-10px_rgba(34,211,238,0.2)]" 
                : "bg-[#050505] text-cyan-800 border-transparent hover:bg-cyan-950/20 hover:text-cyan-500"
            )}
          >
            <Camera size={10} className={cn("transition-opacity", activeFeed.id === feed.id ? "opacity-100" : "opacity-40")} />
            <span>{feed.id}</span>
          </button>
        ))}
      </div>
    </div>
  );
});
