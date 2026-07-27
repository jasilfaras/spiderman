import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface WelcomeScreenProps {
  onComplete: (name: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setIsSubmitting(true);
      setTimeout(() => {
        onComplete(name);
      }, 1200);
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#0a0514] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        filter: "contrast(300%) brightness(200%) blur(20px) hue-rotate(90deg)",
        scale: 6,
        transition: { duration: 0.8, ease: "easeInOut" } 
      }}
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
        <svg width="100%" height="100%" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#00FFFF" strokeWidth="2" fill="none" opacity="0.3">
            <circle cx="400" cy="400" r="100" />
            <circle cx="400" cy="400" r="200" />
            <circle cx="400" cy="400" r="300" />
            <circle cx="400" cy="400" r="400" />
            <path d="M400,400 L400,0 M400,400 L800,400 M400,400 L400,800 M400,400 L0,400 M400,400 L117,117 M400,400 L683,117 M400,400 L683,683 M400,400 L117,683" />
          </g>
        </svg>
      </div>

      <motion.div 
        className="relative w-full max-w-3xl mx-4"
        initial={{ y: 200, opacity: 0, rotate: -10, scale: 0.8 }}
        animate={isSubmitting 
          ? { scale: [1, 1.2, 0.9, 1.5, 3], rotate: [ -2, 10, -15, 20, 0 ], y: [-50, 50, -100, 0, 0], filter: "hue-rotate(180deg) saturate(300%)" } 
          : { y: 0, opacity: 1, rotate: -3, scale: 1 }
        }
        transition={isSubmitting 
          ? { duration: 1, times: [0, 0.2, 0.4, 0.6, 1] } 
          : { type: 'spring', damping: 12, stiffness: 100 }
        }
      >
        {!isSubmitting && (
          <motion.div 
            className="absolute -top-12 -left-12 text-[#FFD700]"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </motion.div>
        )}
        {!isSubmitting && (
          <motion.div 
            className="absolute -bottom-16 -right-8 text-[#FF007F]"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
             <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          </motion.div>
        )}

        <div className="rounded-3xl overflow-hidden shadow-[20px_20px_0px_rgba(0,0,0,1)] bg-white relative">
          <div className="paper-texture rounded-3xl"></div>

          <div className="bg-[#b81d22] w-full pt-12 pb-8 flex flex-col items-center justify-center border-b-8 border-black">
            <h1 className="text-white text-8xl font-bangers tracking-wider" style={{ textShadow: '4px 4px 0px rgba(0,0,0,1)' }}>
              HELLO
            </h1>
            <h2 className="text-white text-4xl font-bold tracking-widest mt-2 uppercase font-oswald bg-black px-4 py-1 skew-x-[-10deg]">
              my name is
            </h2>
          </div>

          <div className="bg-[#fdf5e6] w-full h-80 relative halftone-heavy">
            <form onSubmit={handleSubmit} className="w-full h-full flex items-center justify-center p-8 relative z-20">
              <input 
                ref={inputRef}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-full text-center placeholder-black/20 tagger-input"
                placeholder="YOUR NAME"
                autoComplete="off"
                spellCheck="false"
                maxLength={15}
              />
            </form>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
