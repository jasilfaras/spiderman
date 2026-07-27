import React from 'react';
import { useWindowManager, AppWindow } from '../contexts/WindowContext';
import { cn } from '../lib/utils';
import { Terminal } from 'lucide-react';

export const Taskbar = React.memo(function Taskbar() {
  const { windows } = useWindowManager();
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-8 bg-win95-gray shadow-[inset_0_1px_white] flex items-center justify-between px-1 z-[90] relative border-t border-white pointer-events-auto">
      
      <div className="flex items-center gap-1 h-full py-1">
        <button className="h-full flex items-center gap-1 font-bold text-[11px] px-2 win95-button mr-2">
          <Terminal size={14} className="text-black" />
          <span className="mt-[1px]">Start</span>
        </button>
        
        <div className="w-[2px] h-full shadow-[inset_1px_1px_white,inset_-1px_-1px_gray] mx-1" />

        {windows.map((app) => (
          <TaskButton key={app.id} app={app} />
        ))}
      </div>

      <div className="h-full py-1 flex items-center">
        <div className="h-full px-2 flex items-center shadow-win95-in border border-gray-600 bg-win95-gray">
          <span className="text-[11px] mt-[1px]">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

    </div>
  );
});

const TaskButton = React.memo(function TaskButton({ app }: { app: AppWindow }) {
  const { openWindow, toggleMinimize, focusWindow, windows } = useWindowManager();

  const maxZ = Math.max(...windows.map(w => w.zIndex), 0);
  const isFocused = app.isOpen && !app.isMinimized && app.zIndex === maxZ;

  const handleClick = () => {
    if (!app.isOpen) {
      openWindow(app.id);
    } else if (app.isMinimized) {
      toggleMinimize(app.id);
      focusWindow(app.id);
    } else {
      if (isFocused) {
        toggleMinimize(app.id);
      } else {
        focusWindow(app.id);
      }
    }
  };

  if (!app.isOpen) return null;

  return (
    <button
      onClick={handleClick}
      className={cn(
        "h-full flex items-center gap-1.5 px-2 min-w-[120px] max-w-[160px] text-[11px] font-bold border border-black transition-all",
        isFocused 
          ? "bg-win95-gray shadow-win95-in pt-[1px] pl-[1px] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-[length:100px_100px]" 
          : "win95-button"
      )}
    >
      <app.icon size={12} className={cn("shrink-0", isFocused ? "opacity-70" : "opacity-100")} />
      <span className="truncate mt-[1px]">{app.title}</span>
    </button>
  );
});
