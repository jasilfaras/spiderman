import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowManager } from '../contexts/WindowContext';
import { cn } from '../lib/utils';

interface WindowContainerProps {
  id: string;
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  initialX?: number;
  initialY?: number;
  className?: string;
  bodyClassName?: string;
  borderColor?: 'red' | 'cyan' | 'green';
}

export const WindowContainer = React.memo(function WindowContainer({
  id,
  children,
  width = 400,
  height = 'auto',
  initialX = 100,
  initialY = 100,
  className,
  bodyClassName,
  borderColor = 'red',
}: WindowContainerProps) {
  const { windows, closeWindow, focusWindow } = useWindowManager();
  const win = windows.find((w) => w.id === id);

  if (!win || !win.isOpen) return null;

  const isFocused = win.zIndex === Math.max(...windows.map((w) => w.zIndex));

  const borderClass = 
    borderColor === 'cyan' 
      ? 'border-alchemax-cyan shadow-glow-cyan' 
      : borderColor === 'green'
      ? 'border-alchemax-green shadow-glow-green'
      : 'border-alchemax-red shadow-glow-red';

  const headerBgClass = 
    borderColor === 'cyan'
      ? 'bg-alchemax-cyan text-black'
      : borderColor === 'green'
      ? 'bg-alchemax-green text-black'
      : 'bg-alchemax-red text-black';

  return (
    <AnimatePresence>
      {!win.isMinimized && (
        <motion.div
          layoutId={`window-${id}`}
          drag
          dragMomentum={false}
          onPointerDown={() => focusWindow(id)}
          initial={{ opacity: 0, scale: 0.95, x: initialX, y: initialY }}
          animate={{ opacity: 1, scale: 1, zIndex: win.zIndex }}
          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
          transition={{ type: 'spring', stiffness: 400, damping: 30, mass: 1 }}
          style={{ width, height }}
          className={cn(
            'absolute flex flex-col will-change-[transform,opacity] transform-gpu bg-pitch-black border select-none',
            borderClass,
            className
          )}
        >
          <div className={cn(
            "px-2 py-1 flex items-center justify-between text-xs font-mono font-bold cursor-grab active:cursor-grabbing border-b border-inherit",
            isFocused ? headerBgClass : "bg-white/10 text-white/70"
          )}>
            <div className="flex items-center gap-2 pointer-events-none uppercase tracking-wider">
              <span>// {win.title}</span>
            </div>
            
            <div className="flex items-center">
              <button 
                onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
                className="px-1 font-mono font-bold hover:bg-white hover:text-black transition-colors"
                title="Close"
              >
                [x]
              </button>
            </div>
          </div>

          <div className={cn('relative flex-1 bg-black text-white p-3 font-mono text-xs overflow-hidden', bodyClassName)}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
