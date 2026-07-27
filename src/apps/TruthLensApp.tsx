import React, { useState, useEffect } from 'react';
import { WindowContainer } from '../components/WindowContainer';
import { Fingerprint, Terminal } from 'lucide-react';

export const TruthLensApp = React.memo(function TruthLensApp() {
  const [scanning, setScanning] = useState(true);
  const [glitchText, setGlitchText] = useState('DECRYPTING...');

  useEffect(() => {
    const timer = setInterval(() => {
      const chars = '0101010101ABCDEF#$@!';
      let result = '';
      for (let i = 0; i < 14; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setGlitchText(result);
    }, 80);

    const stopTimer = setTimeout(() => {
      clearInterval(timer);
      setScanning(false);
      setGlitchText('SUBJECT: PETER PARKER');
    }, 3200);

    return () => {
      clearInterval(timer);
      clearTimeout(stopTimer);
    };
  }, []);

  return (
    <WindowContainer id="scanner" width={340} height={380} initialX={500} initialY={80} borderColor="red" bodyClassName="bg-black p-4 flex flex-col gap-4 font-mono text-xs">
      
      <div className="flex flex-col items-center justify-center p-4 border border-alchemax-red/40 bg-alchemax-red/5 relative">
        <div className="relative mb-2">
          <Fingerprint size={64} className="text-alchemax-red text-glow-red" strokeWidth={1.5} />
          {scanning && (
            <div className="absolute top-0 left-0 w-full h-[2px] bg-alchemax-red shadow-glow-red animate-pulse" />
          )}
        </div>
        <div className="text-[10px] text-alchemax-red font-bold tracking-widest uppercase">
          {scanning ? '/// SCANNING...' : '/// IDENTITY CONFIRMED'}
        </div>
      </div>

      <div className="border border-alchemax-red/30 bg-black p-3 text-white space-y-2">
        <div className="text-alchemax-red font-bold border-b border-alchemax-red/30 pb-1 flex items-center gap-1.5">
          <Terminal size={12} />
          <span>DECRYPTION ENGINE V4.0</span>
        </div>
        
        <div className="space-y-1 text-[11px]">
          <div className="flex justify-between">
            <span className="text-white/50">TARGET:</span>
            <span className={scanning ? "text-alchemax-cyan animate-pulse" : "text-alchemax-green font-bold"}>
              {glitchText}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/50">AFFILIATION:</span>
            <span className="text-white">SPIDER-LEAGUE</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/50">THREAT LEVEL:</span>
            <span className="text-alchemax-red font-bold">CLASS-S</span>
          </div>
        </div>
      </div>

      <div className="mt-auto text-[9px] text-white/40 flex justify-between border-t border-white/10 pt-2">
        <span>ENCRYPTION: 4096-BIT</span>
        <span className="text-alchemax-green">FIREWALL: BYPASSED</span>
      </div>

    </WindowContainer>
  );
});
