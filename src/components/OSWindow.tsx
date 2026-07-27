import React from 'react';
import { motion } from 'framer-motion';

interface OSWindowProps {
  id: string;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  initialX?: number;
  initialY?: number;
  width?: number;
  height?: number;
  zIndex: number;
  onFocus: () => void;
}

export const OSWindow: React.FC<OSWindowProps> = ({ 
  title, 
  onClose, 
  children, 
  initialX = 50, 
  initialY = 50, 
  width = 400,
  height = 300,
  zIndex,
  onFocus
}) => {
  return (
    <motion.div 
      drag 
      dragMomentum={false} 
      style={{ position: 'absolute', zIndex }}
      initial={{ x: initialX, y: initialY, scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      onPointerDown={onFocus}
      className="origin-center shadow-[4px_4px_0px_rgba(0,0,0,0.5)]"
    >
      <div className="window" style={{ width, minHeight: height }}>
        <div className="title-bar" onPointerDown={onFocus}>
          <div className="title-bar-text tracking-widest uppercase">{title}</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button>
            <button aria-label="Close" onClick={(e) => { e.stopPropagation(); onClose(); }}></button>
          </div>
        </div>
        <div className="window-body" style={{ margin: 0, padding: '8px', display: 'flex', flexDirection: 'column', height: 'calc(100% - 30px)' }} onPointerDown={onFocus}>
          {children}
        </div>
      </div>
    </motion.div>
  );
};
