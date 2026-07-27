import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { cn } from '../lib/utils';

const THREATS = [
  { id: 1, type: 'Armed Robbery', probability: 94, x: 30, y: 40 },
  { id: 2, type: 'Suspicious Drone', probability: 88, x: 70, y: 20 },
  { id: 3, type: 'Oscorp Activity', probability: 99, x: 50, y: 75 },
];

export function RadarWidget() {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ opacity: 0, scale: 0.9, x: -100 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.8 }}
      className="absolute top-12 left-12 w-[360px] h-[360px] glass-panel rounded-full overflow-hidden border-2 border-white/5 flex items-center justify-center will-change-transform z-30 cursor-crosshair"
    >
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,240,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.2) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          backgroundPosition: 'center'
        }}
      />
      
      <div className="absolute inset-4 rounded-full border border-electric-blue/20" />
      <div className="absolute inset-16 rounded-full border border-electric-blue/20" />
      <div className="absolute inset-28 rounded-full border border-electric-blue/20" />
      <div className="absolute w-full h-[1px] bg-electric-blue/20" />
      <div className="absolute h-full w-[1px] bg-electric-blue/20" />

      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 4, ease: "linear", repeat: Infinity }}
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'conic-gradient(from 0deg, transparent 70%, rgba(0, 240, 255, 0.3) 100%)',
          transformOrigin: 'center'
        }}
      >
        <div className="absolute top-0 bottom-1/2 left-1/2 w-[2px] bg-electric-blue shadow-glow-blue -translate-x-1/2 origin-bottom" />
      </motion.div>

      {THREATS.map((threat) => (
        <motion.div
          key={threat.id}
          className="absolute w-6 h-6 -ml-3 -mt-3 flex items-center justify-center"
          style={{ left: `${threat.x}%`, top: `${threat.y}%` }}
          onMouseEnter={() => setHoveredNode(threat.id)}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className={cn(
              "w-3 h-3 rounded-full relative z-20 cursor-pointer",
              threat.probability > 90 ? "bg-spidey-red shadow-glow-red-intense" : "bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]"
            )}
          />
          
          <AnimatePresence>
            {hoveredNode === threat.id && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ type: "spring", stiffness: 500, damping: 40, mass: 0.5 }}
                className="absolute top-8 left-1/2 -translate-x-1/2 w-48 glass-panel bg-obsidian/95 border-white/10 rounded-md p-3 z-50 pointer-events-none shadow-lg"
              >
                <div className="flex items-center gap-2 mb-1">
                  <MapPin size={12} className={threat.probability > 90 ? "text-spidey-red" : "text-yellow-500"} />
                  <span className="text-xs font-mono font-bold tracking-wider">{threat.type}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-white/60 font-mono tracking-wide mt-2 pt-2 border-t border-white/10">
                  <span>MATCH: {threat.probability}%</span>
                  <span className="text-spidey-red/80">DISPATCHED: NO</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      <div className="absolute w-2 h-2 rounded-full bg-electric-blue shadow-glow-blue z-10" />
    </motion.div>
  );
}
