import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Anomaly = {
  id: string;
  x: number;
  y: number;
};

type Splat = {
  id: string;
  x: number;
  y: number;
  rotation: number;
  text: string;
};

const BASE_DURATION = 1500;
const MIN_DURATION = 600;
const DURATION_DECAY = 100;

export default function SpideySenseApp() {
  const [score, setScore] = useState(0);
  const [anomaly, setAnomaly] = useState<Anomaly | null>(null);
  const [splats, setSplats] = useState<Splat[]>([]);
  const [isTingling, setIsTingling] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const waitTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const startWaitingForSpawn = useCallback((currentScore: number) => {
    const waitTime = 500 + Math.random() * 1500;
    waitTimeoutRef.current = setTimeout(() => {
      const x = 15 + Math.random() * 70;
      const y = 15 + Math.random() * 70;
      setAnomaly({ id: Date.now().toString(), x, y });
      setIsTingling(true);
      
      const duration = Math.max(MIN_DURATION, BASE_DURATION - currentScore * DURATION_DECAY);
      timeoutRef.current = setTimeout(() => {
        setAnomaly(null);
        setIsTingling(false);
        setScore(0); // Reset streak
        startWaitingForSpawn(0);
      }, duration);
    }, waitTime);
  }, []);

  const startGame = () => {
    setScore(0);
    setGameActive(true);
    startWaitingForSpawn(0);
  };

  const toggleHelp = () => {
    if (!showHelp) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (waitTimeoutRef.current) clearTimeout(waitTimeoutRef.current);
      setAnomaly(null);
      setIsTingling(false);
      setShowHelp(true);
    } else {
      setShowHelp(false);
      if (gameActive) {
        startWaitingForSpawn(score);
      }
    }
  };

  const handleAnomalyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!anomaly) return;
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (waitTimeoutRef.current) clearTimeout(waitTimeoutRef.current);
    
    const newScore = score + 1;
    setScore(newScore);
    setAnomaly(null);
    setIsTingling(false);
    
    const texts = ["THWIP!", "GOTCHA!", "BAM!", "CAUGHT!", "SNIKT? NO!"];
    const text = texts[Math.floor(Math.random() * texts.length)];
    const newSplat: Splat = {
      id: Date.now().toString(),
      x: anomaly.x,
      y: anomaly.y,
      rotation: -20 + Math.random() * 40,
      text
    };
    setSplats(prev => [...prev, newSplat]);
    
    setTimeout(() => {
      setSplats(prev => prev.filter(s => s.id !== newSplat.id));
    }, 1000);
    
    startWaitingForSpawn(newScore);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (waitTimeoutRef.current) clearTimeout(waitTimeoutRef.current);
    };
  }, []);

  return (
    <div className="w-full h-full relative flex flex-col font-oswald">
      
      <div className="absolute inset-0 overflow-hidden bg-[#2D0A4E]">
        <div className="absolute inset-0 halftone-heavy opacity-40 pointer-events-none" />
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M50,50 L10,10 M50,50 L90,10 M50,50 L90,90 M50,50 L10,90 M50,50 L50,0 M50,50 L100,50 M50,50 L50,100 M50,50 L0,50" stroke="#00FFFF" strokeWidth="0.5" />
          <path d="M30,30 L50,20 L70,30 L80,50 L70,70 L50,80 L30,70 L20,50 Z" stroke="#FF007F" strokeWidth="0.5" fill="none" className="animate-pulse" />
          <path d="M10,10 L50,0 L90,10 L100,50 L90,90 L50,100 L10,90 L0,50 Z" stroke="#00FFFF" strokeWidth="0.5" fill="none" />
        </svg>

        <AnimatePresence>
          {isTingling && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none z-40 mix-blend-screen"
            >
              <div className="absolute top-0 left-0 w-full h-6 bg-[#FFD700] skew-y-2 opacity-80" />
              <div className="absolute bottom-0 left-0 w-full h-6 bg-[#FF007F] -skew-y-2 opacity-80" />
              <div className="absolute top-0 left-0 w-6 h-full bg-[#00FFFF] -skew-x-3 opacity-80" />
              <div className="absolute top-0 right-0 w-6 h-full bg-[#FF007F] skew-x-3 opacity-80" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-0 right-0 z-50 pointer-events-none">
          <div className="bg-[#111] border-t-2 border-l-2 border-[#00FFFF] text-[#00FFFF] font-bangers text-2xl px-4 py-1 shadow-[4px_4px_0px_#FF007F]">
            ANOMALIES: {score}
          </div>
        </div>
        
        {!gameActive && !showHelp && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <button 
              onClick={startGame}
              className="paper-cutout bg-[#FF007F] text-white font-bangers text-4xl px-8 py-4 border-4 border-black shadow-[6px_6px_0px_#00FFFF] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_#00FFFF] transition-all"
            >
              START SCAN
            </button>
          </div>
        )}

        <AnimatePresence>
          {anomaly && (
            <motion.div
              key={anomaly.id}
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1,
                x: ["-50%", "-45%", "-55%", "-50%"],
                y: ["-50%", "-40%", "-60%", "-50%"],
                rotate: [0, -10, 15, 0] 
              }}
              exit={{ scale: 0 }}
              transition={{ 
                scale: { duration: 0.1 },
                x: { duration: 0.15, repeat: Infinity, repeatType: 'reverse' },
                y: { duration: 0.12, repeat: Infinity, repeatType: 'reverse' },
                rotate: { duration: 0.2, repeat: Infinity, repeatType: 'reverse' }
              }}
              className="absolute w-16 h-16 cursor-crosshair z-30 flex items-center justify-center"
              style={{ left: `${anomaly.x}%`, top: `${anomaly.y}%`, x: '-50%', y: '-50%' }}
              onClick={handleAnomalyClick}
            >
              <div className="absolute inset-0 bg-[#00FFFF] mix-blend-screen opacity-90" style={{ clipPath: 'polygon(20% 0%, 80% 10%, 100% 70%, 60% 100%, 0% 80%)' }} />
              <div className="absolute inset-0 bg-[#FF007F] mix-blend-screen opacity-90 translate-x-2 -translate-y-1" style={{ clipPath: 'polygon(10% 20%, 90% 0%, 80% 90%, 40% 100%, 0% 60%)' }} />
              <div className="absolute inset-0 bg-white scale-75" style={{ clipPath: 'polygon(25% 15%, 75% 25%, 85% 65%, 55% 85%, 15% 75%)' }} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {splats.map(splat => (
            <motion.div
              key={splat.id}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [0, 1.2, 1], opacity: [1, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, times: [0, 0.2, 1] }}
              className="absolute pointer-events-none z-50 flex items-center justify-center"
              style={{ left: `${splat.x}%`, top: `${splat.y}%`, x: '-50%', y: '-50%', rotate: splat.rotation }}
            >
              <div className="relative bg-[#FFD700] text-black font-bangers text-4xl px-4 py-2 border-4 border-black whitespace-nowrap shadow-[4px_4px_0px_#FF007F]">
                {splat.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showHelp && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-2 z-[70] bg-[#111] border-4 border-[#FFD700] p-4 flex flex-col justify-start items-center shadow-[8px_8px_0px_#FF007F] overflow-y-auto"
          >
            <div className="font-oswald text-white text-base space-y-2 max-w-[95%] text-center leading-snug">
              <p>Welcome to the <strong className="text-[#00FFFF]">Multiverse Anomaly Scanner</strong>!</p>
              <p className="text-[#FF007F]">Test your reflexes in this fast-paced reaction challenge.</p>
              <p><strong>HOW TO PLAY:</strong> Click the flashing neon anomalies before they escape. The game speeds up as your score gets higher. If you miss, your streak resets to zero!</p>
              <p className="text-sm pt-2 mt-2 border-t border-[#FFD700]/30 text-[#FFD700]">Click the ? button again to close this popup and resume gameplay.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute -top-[76px] right-[52px] z-[80]">
        <button 
          onClick={toggleHelp}
          className="w-8 h-8 bg-[#FF007F] text-white border-2 border-black font-bangers text-xl flex items-center justify-center shadow-[2px_2px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
        >
          ?
        </button>
      </div>
    </div>
  );
}
