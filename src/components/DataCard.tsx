import React from 'react';
import { motion } from 'framer-motion';

export type CardTheme = 'punk' | 'alchemax' | 'miles';

interface DataCardProps {
  id: string;
  title: string;
  theme: CardTheme;
  onClose: () => void;
  children: React.ReactNode;
  initialX?: number;
  initialY?: number;
  width?: number;
  height?: number;
  zIndex: number;
  onFocus: () => void;
}

export const DataCard: React.FC<DataCardProps> = ({ 
  title, 
  theme,
  onClose, 
  children, 
  initialX = 50, 
  initialY = 50, 
  width = 450,
  height = 350,
  zIndex,
  onFocus
}) => {
  
  const renderTitle = () => {
    if (theme === 'punk') {
      const words = title.split(' ');
      return (
        <div className="flex flex-wrap gap-1 mb-2 font-bangers text-3xl uppercase tracking-widest">
          {words.map((word, i) => (
            <span key={i} className="ransom-note-word shadow-[3px_3px_0px_rgba(0,0,0,1)]">
              {word}
            </span>
          ))}
        </div>
      );
    }
    
    if (theme === 'alchemax') {
      return (
        <div className="relative font-oswald text-2xl font-bold bg-[#00FFFF] text-black px-4 py-1 inline-block shadow-[4px_4px_0px_#FF007F] mb-4 uppercase tracking-widest skew-x-[-15deg] border-2 border-black">
          {title}
          <div className="absolute -top-4 -right-4 w-12 h-4 bg-[#FFD700] rotate-45 border-y border-black font-mono text-[8px] flex items-center justify-center overflow-hidden">
             CAUTION
          </div>
        </div>
      );
    }

    return (
      <div className="font-marker text-3xl text-white mb-2" style={{ textShadow: '2px 2px 0px #FF007F, -2px -2px 0px #00FFFF' }}>
        {title}
      </div>
    );
  };

  const getThemeClasses = () => {
    switch (theme) {
      case 'punk':
        return 'paper-cutout bg-[#FDF5E6] border-4 border-black text-black';
      case 'alchemax':
        return 'skew-y-2 bg-[#111] border-2 border-[#00FFFF] text-white shadow-[0_0_20px_rgba(0,255,255,0.3)]';
      default:
        return 'paper-cutout-alt bg-[#FF007F] border-4 border-black text-white';
    }
  };

  return (
    <motion.div 
      drag 
      dragMomentum={false} 
      whileDrag={{ scale: 1.05, rotate: theme === 'punk' ? 2 : -2, cursor: 'grabbing' }}
      style={{ position: 'absolute', zIndex }}
      initial={{ x: initialX, y: initialY, scale: 0.5, opacity: 0, rotate: theme === 'alchemax' ? -5 : 5 }}
      animate={{ scale: 1, opacity: 1, rotate: theme === 'alchemax' ? -2 : 2 }}
      exit={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
      onPointerDown={onFocus}
      className={`origin-center cursor-grab shadow-[15px_15px_0px_rgba(0,0,0,1)] ${getThemeClasses()}`}
    >
      <div 
        className="relative p-6 flex flex-col"
        style={{ width, height }}
      >
        {(theme === 'punk' || theme === 'miles') && <div className="absolute inset-0 halftone-heavy opacity-30 pointer-events-none mix-blend-multiply" />}
        {(theme === 'alchemax') && <div className="absolute inset-0 halftone-light pointer-events-none" />}
        
        <div className="relative z-10 flex justify-between items-start mb-4 pr-2 pt-2">
          {renderTitle()}
          
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-black text-white font-bangers text-xl hover:bg-[#FF007F] transition-colors border-2 border-white shadow-[2px_2px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            X
          </button>
        </div>

        <div className="relative z-10 flex-1 font-oswald text-lg">
          {children}
        </div>
      </div>
    </motion.div>
  );
};
