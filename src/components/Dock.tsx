import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const SvgSpiderSense = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} overflow="visible" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M25 70 Q 50 20, 75 70" />
    <path d="M15 50 Q 50 -10, 85 50" />
    <path d="M5 30 Q 50 -40, 95 30" />
    <rect x="42" y="80" width="16" height="16" fill="currentColor" />
  </svg>
);

const SvgCamera = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} overflow="visible" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="square" strokeLinejoin="miter">
    <rect x="25" y="30" width="60" height="45" fill="none" />
    <circle cx="55" cy="52" r="12" fill="none" />
    <path d="M25 52 L5 40 M25 75 L15 95 M70 75 L60 95 M45 30 L60 10 M50 10 L70 10" />
  </svg>
);

const SvgMegaphone = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} overflow="visible" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="square" strokeLinejoin="miter">
    <polygon points="35,35 85,15 85,85 35,65" fill="none" />
    <rect x="15" y="40" width="20" height="20" fill="none" />
    <polygon points="45,69 40,95 55,90" fill="currentColor" />
    <path d="M90 35 L100 25 M95 50 L105 50 M90 65 L100 75" />
  </svg>
);

const SvgRadio = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} overflow="visible" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="square" strokeLinejoin="miter">
    <circle cx="50" cy="50" r="35" fill="none" />
    <circle cx="50" cy="50" r="10" fill="currentColor" />
    <path d="M50 15 L50 35 M50 65 L50 85 M15 50 L35 50 M65 50 L85 50" strokeWidth="6" />
    <path d="M25 25 L40 40 M75 75 L60 60 M75 25 L60 40 M25 75 L40 60" strokeWidth="6" />
  </svg>
);

const SvgInfo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} overflow="visible" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="square" strokeLinejoin="miter">
    <circle cx="50" cy="50" r="40" fill="none" />
    <circle cx="50" cy="25" r="5" fill="currentColor" />
    <path d="M40 45 L50 45 L50 75 L40 75 M60 75 L50 75" />
  </svg>
);

interface DockProps {
  onOpenApp: (appId: string) => void;
}

const apps = [
  { id: 'terminal', icon: SvgInfo, label: 'ABOUT_OS', shape: 'polygon(10% 0%, 100% 10%, 90% 100%, 0% 90%)', bg: 'bg-[#00FFFF]', overlay: 'halftone-heavy' },
  { id: 'radar', icon: SvgSpiderSense, label: 'SPIDEY_SENSE', shape: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', bg: 'bg-[#FF007F]', overlay: 'paper-texture' },
  { id: 'cameras', icon: SvgCamera, label: 'OSCORP_CAMS', shape: 'polygon(0% 15%, 15% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%)', bg: 'bg-[#FFD700]', overlay: 'none' },
  { id: 'bugle', icon: SvgMegaphone, label: 'BUGLE_NEWS', shape: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)', bg: 'bg-white', overlay: 'halftone-light' },
  { id: 'radio', icon: SvgRadio, label: 'SPIDER_RADIO', shape: 'polygon(5% 15%, 95% 5%, 100% 90%, 0% 100%)', bg: 'bg-[#FF9900]', overlay: 'halftone-heavy' },
];

export const Dock: React.FC<DockProps> = ({ onOpenApp }) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999]" style={{ filter: 'drop-shadow(10px 10px 0px #000)' }}>
      <div 
        className="absolute inset-0 bg-[#222]"
        style={{ 
          clipPath: 'polygon(2% 10%, 15% 0%, 45% 8%, 60% 0%, 85% 5%, 98% 12%, 100% 95%, 80% 100%, 55% 92%, 35% 100%, 15% 95%, 0% 98%)',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          backgroundBlendMode: 'overlay',
          opacity: 0.95
        }}
      />
      
      <div className="relative flex items-end gap-6 px-12 pt-6 pb-6">
        {apps.map((app, index) => (
          <DockItem 
            key={app.id} 
            app={app}
            onClick={() => onOpenApp(app.id)} 
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

const DockItem = ({ app, onClick, index }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = app.icon;

  return (
    <div 
      className="relative flex flex-col items-center group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: (index % 2 === 0 ? 5 : -5) }}
            exit={{ opacity: 0, scale: 0.8, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 600, damping: 12 }}
            className="absolute -top-20 bg-white text-black font-bangers text-2xl px-6 py-3 border-[4px] border-black whitespace-nowrap z-50 pointer-events-none"
            style={{ 
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 65%, 65% 65%, 50% 100%, 45% 65%, 0% 65%)',
              paddingBottom: '24px', // Space for the tail
              boxShadow: '4px 4px 0px rgba(0,0,0,1)'
            }}
          >
            {app.label}!
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="relative">
        <div 
          className="absolute inset-0 bg-black scale-110 translate-x-[2px] translate-y-[2px]" 
          style={{ clipPath: app.shape }} 
        />
        
        <motion.button
          onClick={onClick}
          className={`relative w-20 h-20 flex items-center justify-center ${app.bg} overflow-hidden cursor-pointer glitch-hover`}
          style={{ clipPath: app.shape, border: '1px solid white' }}
          whileHover={{ scale: 1.25, rotate: (index % 2 === 0 ? 6 : -6), y: -15 }}
          whileTap={{ scale: 0.9, y: 0 }}
          transition={{ type: 'spring', stiffness: 600, damping: 12 }}
        >
          <div className="absolute inset-1 border-[2px] border-white z-20 pointer-events-none" style={{ clipPath: app.shape }} />
          
          {app.overlay !== 'none' && (
            <div className={`absolute inset-0 ${app.overlay} opacity-40 pointer-events-none z-10`} />
          )}

          <Icon className="text-black w-10 h-10 relative z-30" />
        </motion.button>
      </div>
    </div>
  );
};
