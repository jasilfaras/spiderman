import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Camera, Newspaper, Crosshair, Music } from 'lucide-react';

export interface AppWindow {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  icon: any;
}

interface WindowContextType {
  windows: AppWindow[];
  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  toggleMinimize: (id: string) => void;
  focusWindow: (id: string) => void;
}

const INITIAL_WINDOWS: AppWindow[] = [
  { id: 'radar', title: 'NET_RADAR.sys', isOpen: true, isMinimized: false, zIndex: 10, icon: Crosshair },
  { id: 'scanner', title: 'NEWS_SCANNER.exe', isOpen: true, isMinimized: false, zIndex: 20, icon: Newspaper },
  { id: 'music', title: 'OST_ARCHIVE.sys', isOpen: false, isMinimized: false, zIndex: 25, icon: Music },
  { id: 'livecam', title: 'LIVE_FEEDS.cam', isOpen: false, isMinimized: false, zIndex: 30, icon: Camera },
];

const WindowContext = createContext<WindowContextType | undefined>(undefined);

export const WindowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [windows, setWindows] = useState<AppWindow[]>(INITIAL_WINDOWS);
  const [maxZIndex, setMaxZIndex] = useState(30);

  const openWindow = useCallback((id: string) => {
    setMaxZIndex(prev => {
      const nextZ = prev + 1;
      setWindows(wins =>
        wins.map(w =>
          w.id === id ? { ...w, isOpen: true, isMinimized: false, zIndex: nextZ } : w
        )
      );
      return nextZ;
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows(wins => wins.map(w => (w.id === id ? { ...w, isOpen: false } : w)));
  }, []);

  const toggleMinimize = useCallback((id: string) => {
    setWindows(wins =>
      wins.map(w => (w.id === id ? { ...w, isMinimized: !w.isMinimized } : w))
    );
  }, []);

  const focusWindow = useCallback((id: string) => {
    setMaxZIndex(prev => {
      const nextZ = prev + 1;
      setWindows(wins => wins.map(w => (w.id === id ? { ...w, zIndex: nextZ } : w)));
      return nextZ;
    });
  }, []);

  return (
    <WindowContext.Provider
      value={{ windows, openWindow, closeWindow, toggleMinimize, focusWindow }}
    >
      {children}
    </WindowContext.Provider>
  );
};

export const useWindowManager = () => {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error('useWindowManager must be used within a WindowProvider');
  }
  return context;
};
