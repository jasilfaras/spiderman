import React, { useState } from 'react';
import { WindowContainer } from '../components/WindowContainer';
import { MapPin } from 'lucide-react';
import { cn } from '../lib/utils';

const THREATS = [
  { id: 1, type: 'ARMED ROBBERY', probability: 94, x: 35, y: 40 },
  { id: 2, type: 'ALCHEMAX DRONE', probability: 88, x: 65, y: 25 },
  { id: 3, type: 'UNAUTHORIZED ACCESS', probability: 99, x: 50, y: 70 },
];

export const RadarApp = React.memo(function RadarApp() {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  return (
    <WindowContainer id="radar" width={400} height={400} initialX={60} initialY={60} borderColor="cyan" bodyClassName="p-0 bg-black flex flex-col">
      <div className="relative flex-1 bg-black border border-alchemax-cyan/30 flex items-center justify-center cursor-crosshair overflow-hidden">
        
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#00F0FF 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        
        <div className="absolute inset-6 border border-alchemax-cyan/40 pointer-events-none" />
        <div className="absolute inset-20 border border-alchemax-cyan/30 pointer-events-none" />
        <div className="absolute inset-32 border border-alchemax-cyan/20 pointer-events-none" />
        <div className="absolute w-full h-[1px] bg-alchemax-cyan/30 pointer-events-none" />
        <div className="absolute h-full w-[1px] bg-alchemax-cyan/30 pointer-events-none" />

        <div 
          className="absolute inset-0 pointer-events-none animate-radar-sweep will-change-transform transform-gpu"
          style={{
            background: 'conic-gradient(from 0deg, transparent 70%, rgba(0, 240, 255, 0.4) 100%)',
            transformOrigin: 'center'
          }}
        >
          <div className="absolute top-0 bottom-1/2 left-1/2 w-[1px] bg-alchemax-cyan shadow-glow-cyan -translate-x-1/2 origin-bottom transform-gpu" />
        </div>

        {THREATS.map((threat) => (
          <div
            key={threat.id}
            className="absolute w-4 h-4 -ml-2 -mt-2 flex items-center justify-center transform-gpu z-20"
            style={{ left: `${threat.x}%`, top: `${threat.y}%` }}
            onMouseEnter={() => setHoveredNode(threat.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div
              className={cn(
                "w-2.5 h-2.5 relative z-20 cursor-pointer animate-pulse",
                threat.probability > 90 ? "bg-alchemax-red shadow-glow-red" : "bg-alchemax-green shadow-glow-green"
              )}
            />
            
            {hoveredNode === threat.id && (
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-48 bg-black border border-alchemax-cyan text-alchemax-cyan p-2 z-50 pointer-events-none text-[10px]">
                <div className="flex items-center gap-1.5 mb-1 font-bold">
                  <MapPin size={12} className="text-alchemax-red" />
                  <span>{threat.type}</span>
                </div>
                <div className="flex justify-between items-center text-[9px] pt-1 border-t border-alchemax-cyan/30">
                  <span>CONFIRMATION: {threat.probability}%</span>
                  <span className="text-alchemax-red">ALERT: HIGH</span>
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="absolute w-1.5 h-1.5 bg-alchemax-cyan shadow-glow-cyan z-10 pointer-events-none" />
        
        <div className="absolute top-2 left-2 text-[9px] text-alchemax-cyan font-mono pointer-events-none">
          SYS.RADAR // ACTIVE<br/>
          TARGETS: {THREATS.length}
        </div>
      </div>
    </WindowContainer>
  );
});
