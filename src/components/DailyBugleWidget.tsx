import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, Scan, AlertTriangle, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

export function DailyBugleWidget() {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<'none' | 'verified' | 'fake'>('none');

  const handleScan = () => {
    setIsScanning(true);
    setResult('none');
    setTimeout(() => {
      setIsScanning(false);
      setResult('fake'); // Simulating a fake news detection
    }, 2000);
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ opacity: 0, scale: 0.9, x: 100 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.8 }}
      className={cn(
        "absolute top-12 right-12 w-96 glass-panel rounded-xl overflow-hidden flex flex-col will-change-transform z-40 transition-shadow duration-300",
        result === 'fake' && "shadow-glow-red-intense border-spidey-red/50",
        result === 'verified' && "shadow-glow-blue border-electric-blue/50"
      )}
    >
      <div className="h-10 border-b border-white/10 bg-white/[0.02] flex items-center px-4 justify-between cursor-grab active:cursor-grabbing">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-pointer" />
        </div>
        <div className="flex items-center gap-2 text-white/50 text-xs font-mono">
          <Newspaper size={14} />
          <span>TRUTH_LENS.exe</span>
        </div>
        <div className="w-12"></div>
      </div>

      <div className="relative p-6 bg-obsidian/40 flex flex-col gap-4">
        
        <AnimatePresence>
          {isScanning && (
            <motion.div
              initial={{ top: 0, opacity: 0 }}
              animate={{ top: "100%", opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "linear", repeat: Infinity }}
              className="absolute left-0 right-0 h-1 bg-electric-blue shadow-[0_0_15px_2px_rgba(0,240,255,0.8)] z-50 pointer-events-none"
            />
          )}
        </AnimatePresence>

        <div className={cn(
          "relative p-4 rounded-lg bg-white/5 border border-white/5 transition-all duration-300",
          result === 'fake' && "animate-glitch [text-shadow:2px_0_red,-2px_0_cyan]"
        )}>
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-mono text-spidey-red font-bold">BREAKING NEWS</span>
            <span className="text-xs text-white/40 font-mono">10:42 AM</span>
          </div>
          <h3 className="text-lg font-bold leading-tight mb-2 tracking-tight">Spider-Man Attacks City Hall! Menace Caught on Tape.</h3>
          <p className="text-sm text-white/60 mb-5 leading-relaxed">Exclusive footage shows the masked vigilante allegedly destroying public property and attacking city officials during a peaceful assembly...</p>
          
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-white/40 font-mono tracking-widest">SOURCE: DAILY BUGLE</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleScan}
              disabled={isScanning}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-xs font-bold border border-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-electric-blue disabled:opacity-50 tracking-wide"
            >
              <Scan size={14} className={isScanning ? "animate-spin" : ""} />
              {isScanning ? 'ANALYZING...' : 'SCAN TRUTH'}
            </motion.button>
          </div>
        </div>

        <div className="h-16 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {result === 'fake' && (
              <motion.div
                key="fake"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="w-full flex items-start gap-3 p-3 rounded-md bg-spidey-red/10 border border-spidey-red/20 text-spidey-red"
              >
                <AlertTriangle className="shrink-0 mt-0.5 animate-pulse" size={16} />
                <div className="flex flex-col">
                  <span className="text-sm font-bold tracking-wide">MYSTERIO ILLUSION DETECTED</span>
                  <span className="text-xs opacity-80 mt-1">Deepfake signature match: 99.8%. Do not engage emotionally.</span>
                </div>
              </motion.div>
            )}
            {result === 'verified' && (
              <motion.div
                key="verified"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="w-full flex items-center gap-2 p-3 rounded-md bg-electric-blue/10 border border-electric-blue/20 text-electric-blue"
              >
                <ShieldCheck size={16} />
                <span className="text-sm font-bold tracking-wide">VERIFIED SECURE</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
