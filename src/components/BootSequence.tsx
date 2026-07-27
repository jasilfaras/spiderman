import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SPIDER_ASCII = `
         /\\              /\\
        /  \\    ||||    /  \\
       /    \\  /    \\  /    \\
      /      \\/      \\/      \\
     /        \\      /        \\
    /  /\\  /\\  \\    /  /\\  /\\  \\
   /  /  \\/  \\  \\  /  /  \\/  \\  \\
  /  /   ||   \\  \\/  /   ||   \\  \\
 /__/    ||    \\____/    ||    \\__\\
         ||              ||
         ||    ______    ||
         \\    /      \\    /
          \\  /  /\/\/\\  \\  /
           \\/  /    \\  \\/
              /      \\
`;

const LOGS = [
  '> INITIALIZING ALCHEMAX NEURAL KERNEL...',
  '> OVERRIDING ALCHEMAX MAINFRAME...',
  '> BYPASSING SECURITY PROTOCOLS...',
  '> WEBSLINGER CLI V.2.0.4 ONLINE.'
];

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLogIndex((prev) => {
        if (prev < LOGS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(onComplete, 1200);
          return prev;
        }
      });
    }, 800);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[999] bg-pitch-black flex flex-col items-center justify-center p-6 text-alchemax-red font-mono selection:bg-alchemax-red selection:text-black"
    >
      <div className="max-w-2xl w-full flex flex-col items-center gap-6 border border-alchemax-red p-8 shadow-glow-red bg-black">
        <pre className="text-[10px] sm:text-xs leading-none font-bold text-alchemax-red text-glow-red animate-pulse select-none overflow-hidden">
          {SPIDER_ASCII}
        </pre>

        <div className="text-center tracking-widest text-xs font-bold border-b border-alchemax-red/40 pb-2 w-full">
          ALCHEMAX CORP // SYSTEM OVERRIDE IN PROGRESS
        </div>

        <div className="w-full text-left font-mono text-xs flex flex-col gap-2 h-28 pt-2">
          {LOGS.slice(0, logIndex + 1).map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={i === logIndex ? "text-alchemax-cyan text-glow-cyan" : "text-white/70"}
            >
              {log}
            </motion.div>
          ))}
        </div>

        <div className="w-full bg-white/10 h-1 relative overflow-hidden">
          <motion.div 
            className="h-full bg-alchemax-red shadow-glow-red"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3.5, ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  );
};
