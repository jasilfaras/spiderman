import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Dock } from './components/Dock';
import { DataCard, CardTheme } from './components/DataCard';
import { WelcomeScreen } from './components/WelcomeScreen';
import { DailyBugleNews } from './components/DailyBugleNews';

import SpideySenseApp from './apps/SpideySenseApp';
import { LiveFeedApp } from './apps/LiveFeedApp';
import { SpiderRadio } from './apps/SpiderRadio';

type AppId = 'terminal' | 'radar' | 'cameras' | 'bugle' | 'radio';

interface AppState {
  id: AppId;
  title: string;
  theme: CardTheme;
  isOpen: boolean;
  zIndex: number;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  
  const [apps, setApps] = useState<AppState[]>([
    { id: 'terminal', title: 'ABOUT OS', theme: 'punk', isOpen: false, zIndex: 1 },
    { id: 'radar', title: 'SPIDEY SENSE', theme: 'alchemax', isOpen: false, zIndex: 2 },
    { id: 'cameras', title: 'OSCORP CAMS', theme: 'alchemax', isOpen: false, zIndex: 3 },
    { id: 'bugle', title: 'BUGLE NEWS', theme: 'miles', isOpen: false, zIndex: 4 },
    { id: 'radio', title: 'SPIDER RADIO', theme: 'punk', isOpen: false, zIndex: 5 },
  ]);
  
  const [highestZ, setHighestZ] = useState(10);

  const toggleApp = (id: string) => {
    const app = apps.find(a => a.id === id);
    if (!app) return;

    const maxZ = Math.max(...apps.filter(a => a.isOpen).map(a => a.zIndex), 0);
    const isFocused = app.isOpen && app.zIndex === maxZ;

    if (isFocused) {
      closeApp(id);
    } else {
      setHighestZ(prev => prev + 1);
      setApps(prev => prev.map(a => 
        a.id === id 
          ? { ...a, isOpen: true, zIndex: highestZ + 1 }
          : a
      ));
    }
  };

  const closeApp = (id: string) => {
    setApps(prev => prev.map(app => 
      app.id === id 
        ? { ...app, isOpen: false }
        : app
    ));
  };

  const focusApp = (id: string) => {
    setHighestZ(prev => prev + 1);
    setApps(prev => prev.map(app => 
      app.id === id 
        ? { ...app, zIndex: highestZ + 1 }
        : app
    ));
  };

  return (
    <div className="w-screen h-screen overflow-hidden relative bg-transparent">
      <div className="absolute inset-0 halftone-light pointer-events-none opacity-20" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FF007F] rounded-full blur-[200px] opacity-10 pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#00FFFF] rounded-full blur-[150px] opacity-10 pointer-events-none -translate-x-1/3 translate-y-1/3" />
      
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-10"
        animate={{ x: [0, 5, -5, 0], y: [0, -5, 5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ backgroundImage: 'linear-gradient(#00FFFF 1px, transparent 1px), linear-gradient(90deg, #00FFFF 1px, transparent 1px)', backgroundSize: '100px 100px' }}
      />

      <AnimatePresence>
        {!isAuthenticated && (
          <WelcomeScreen 
            key="welcome"
            onComplete={(name) => {
              setUserName(name);
              setIsAuthenticated(true);
            }} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {apps.map((app) => (
          app.isOpen && (
            <DataCard
              key={app.id}
              id={app.id}
              title={app.title}
              theme={app.theme}
              onClose={() => closeApp(app.id)}
              onFocus={() => focusApp(app.id)}
              zIndex={app.zIndex}
              initialX={150 + Math.random() * 200}
              initialY={50 + Math.random() * 50}
              width={app.id === 'bugle' ? 550 : app.id === 'radio' ? 440 : 450}
              height={app.id === 'bugle' ? 700 : app.id === 'radio' ? 400 : 350}
            >
              <div className="flex-1 p-2 h-full w-full">
                {app.id === 'terminal' && (
                  <div className="font-oswald text-lg leading-relaxed h-full p-4 tracking-wide text-black bg-white/90 overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-4 border-b-2 border-black pb-2">ABOUT SYSTEM</h2>
                    <div className="space-y-2">
                      <p><span className="font-bold text-gray-500">USER:</span> <span className="bg-[#FFD700] px-2 text-black">{userName ? userName.toUpperCase() : 'GUEST'}</span></p>
                      <p><span className="font-bold text-gray-500">OS NAME:</span> SPIDER-MAN OS</p>
                      <p><span className="font-bold text-gray-500">VERSION:</span> 1.0.0</p>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="font-bold text-gray-500 border-b border-gray-300 mb-2">FEATURED APPS</h3>
                      <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                        <li>Spidey Sense Radar</li>
                        <li>Oscorp Cameras</li>
                        <li>Bugle News</li>
                        <li>Spider Radio</li>
                      </ul>
                    </div>
                  </div>
                )}
                {app.id === 'radar' && (
                  <div className="w-full h-full relative">
                    <SpideySenseApp />
                  </div>
                )}
                {app.id === 'cameras' && (
                  <div className="w-full h-full relative overflow-hidden">
                    <LiveFeedApp />
                  </div>
                )}
                {app.id === 'bugle' && (
                  <div className="w-full h-full">
                    <DailyBugleNews />
                  </div>
                )}
                {app.id === 'radio' && (
                  <div className="w-full h-full relative overflow-hidden">
                    <SpiderRadio />
                  </div>
                )}
              </div>
            </DataCard>
          )
        ))}
      </AnimatePresence>

      <Dock onOpenApp={toggleApp} />
    </div>
  );
}

export default App;
