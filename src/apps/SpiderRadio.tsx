import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react';
import { cn } from '../lib/utils';

export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  src: string;
  duration: string;
}

export const SOUNDTRACK: AudioTrack[] = [
  { 
    id: "track-1", 
    title: "SUNFLOWER", 
    artist: "POST MALONE & SWAE LEE", 
    src: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/98/f0/d6/98f0d67e-f8bf-762d-cac7-1c6b3b6b35dd/mzaf_4543283896248560946.plus.aac.p.m4a", 
    duration: "0:30" 
  },
  { 
    id: "track-2", 
    title: "WHAT'S UP DANGER", 
    artist: "BLACKWAY & BLACK CAVIAR", 
    src: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/4a/6b/3b/4a6b3bb7-eebe-bd03-2897-810411089d55/mzaf_4386187771356652173.plus.aac.p.m4a", 
    duration: "0:30" 
  },
  { 
    id: "track-3", 
    title: "AM I DREAMING", 
    artist: "METRO BOOMIN", 
    src: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/10/83/4f/10834fcf-1bc6-46e9-1bbe-4e4dfaf997c3/mzaf_11588678333799017051.plus.aac.p.m4a", 
    duration: "0:30" 
  },
  { 
    id: "track-4", 
    title: "CALLING", 
    artist: "METRO BOOMIN", 
    src: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/4d/f0/8e/4df08eb8-2cc7-38fa-838c-fb77ab7e1ed3/mzaf_7343032356924795119.plus.aac.p.m4a", 
    duration: "0:30" 
  }
];

function useScrambleText(text: string, isActive: boolean) {
  const [displayText, setDisplayText] = useState(text);
  
  useEffect(() => {
    if (!isActive) return;
    
    let iteration = 0;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}|:<>?";
    let animationFrame: number;
    
    const animate = () => {
      setDisplayText(text.split("").map((_, index) => {
        if(index < iteration) {
          return text[index];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(""));
      
      if(iteration >= text.length){
        cancelAnimationFrame(animationFrame);
      } else {
        iteration += 1 / 3; 
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [text, isActive]);
  
  return displayText;
}

export const SpiderRadio = React.memo(function SpiderRadio() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isScrambling, setIsScrambling] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const track = SOUNDTRACK[currentTrackIndex];
  const scrambledTitle = useScrambleText(track.title, isScrambling);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(e => console.error("Playback blocked:", e));
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const changeTrack = (direction: 1 | -1) => {
    setIsScrambling(true);
    setTimeout(() => setIsScrambling(false), 800);
    setCurrentTrackIndex((prev) => (prev + direction + SOUNDTRACK.length) % SOUNDTRACK.length);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleEnded = () => {
    changeTrack(1);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(e => {
            console.error("Playback blocked:", e);
            setIsPlaying(false);
          });
        }
      }
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="bg-[#FDF5E6] flex flex-col p-4 font-bangers relative overflow-hidden h-full w-full">
      <div className="absolute inset-0 halftone-heavy opacity-20 pointer-events-none mix-blend-multiply" />
      
      <audio 
        ref={audioRef}
        src={track.src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        preload="metadata"
      />

      <div className="flex-1 flex items-center justify-between z-10 relative mt-2">
        
        <div className="relative w-28 h-28 flex-shrink-0 flex items-center justify-center -rotate-12 hover:rotate-0 transition-transform duration-500">
          <div className="absolute inset-0 rounded-full bg-black shadow-[4px_4px_0px_#FF007F]" />
          
          <motion.div 
            className="absolute inset-1 rounded-full bg-[#111] overflow-hidden border-2 border-white flex items-center justify-center"
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ 
              duration: 2, 
              repeat: isPlaying ? Infinity : 0, 
              ease: isPlaying ? "linear" : "easeOut",
            }}
          >
            <div className="absolute inset-0 halftone-heavy opacity-50 mix-blend-screen bg-black" />
            
            <div className="w-10 h-10 bg-[#00FFFF] rounded-full flex items-center justify-center border-4 border-black z-10">
              <div className="w-2 h-2 bg-black rounded-full" />
            </div>
            
            <div className="absolute inset-2 rounded-full border border-white/20" />
            <div className="absolute inset-4 rounded-full border border-white/20" />
            <div className="absolute inset-6 rounded-full border border-white/20" />
          </motion.div>
        </div>

        <div className="flex-1 ml-6 flex flex-col justify-center">
          <div className="bg-black text-white p-3 border-4 border-black shadow-[4px_4px_0px_#00FFFF] relative -rotate-2">
             <div className="absolute -top-3 -right-3 bg-[#FF007F] text-white px-2 py-0.5 border-2 border-black rotate-12 text-sm">
                FM MULTIVERSE
             </div>
             
             <div className="text-2xl truncate uppercase tracking-widest text-[#00FFFF]">
               {scrambledTitle}
             </div>
             <div className="text-sm font-oswald tracking-wide truncate text-white/80">
               {track.artist}
             </div>
          </div>
        </div>
      </div>

      <div className="h-10 w-full mt-6 flex items-end justify-between gap-[2px] z-10">
        {Array.from({ length: 40 }).map((_, i) => {
          const isActive = (i / 40) * 100 <= progress;
          const randomScale = isPlaying && isActive ? 0.4 + Math.random() * 0.6 : 0.2;
          
          return (
            <motion.div 
              key={i}
              className={cn(
                "flex-1 w-full bg-black border border-black",
                isActive ? "bg-[#FFD700]" : "bg-black/20"
              )}
              initial={{ scaleY: 0.2 }}
              animate={{ scaleY: isActive ? (isPlaying ? randomScale : 1) : 0.2 }}
              transition={{ type: "spring", bounce: 0, duration: 0.1 }}
              style={{ originY: 1 }}
            />
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between z-10">
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => changeTrack(-1)}
            className="w-8 h-8 bg-white border-2 border-black flex items-center justify-center hover:bg-[#00FFFF] hover:scale-110 active:scale-95 transition-all shadow-[2px_2px_0px_#000]"
          >
            <SkipBack className="fill-black" size={14} />
          </button>
          
          <button 
            onClick={togglePlay}
            className="w-12 h-12 bg-[#FF007F] text-white border-4 border-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-[4px_4px_0px_#000]"
          >
            {isPlaying ? <Pause className="fill-white" size={20} /> : <Play className="fill-white" size={20} />}
          </button>
          
          <button 
            onClick={() => changeTrack(1)}
            className="w-8 h-8 bg-white border-2 border-black flex items-center justify-center hover:bg-[#FFD700] hover:scale-110 active:scale-95 transition-all shadow-[2px_2px_0px_#000]"
          >
            <SkipForward className="fill-black" size={14} />
          </button>
        </div>
        
        <div className="flex items-center gap-2 group relative">
          <button onClick={() => setVolume(v => v > 0 ? 0 : 0.8)} className="p-1">
             {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          
          <div className="w-24 h-3 bg-black/20 border-2 border-black relative cursor-pointer" 
               onClick={(e) => {
                 const rect = e.currentTarget.getBoundingClientRect();
                 const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                 setVolume(x / rect.width);
               }}>
             <div className="absolute top-0 left-0 h-full bg-[#00FFFF] border-r-2 border-black pointer-events-none" style={{ width: `${volume * 100}%` }} />
             
             <motion.div 
                className="absolute top-1/2 pointer-events-none -translate-y-1/2 flex items-center justify-center"
                style={{ left: `${volume * 100}%`, x: '-50%' }}
                animate={{ scale: 0.5 + (volume * 0.8) }}
             >
               <svg width="24" height="24" viewBox="0 0 100 100" fill="#FF007F" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[1px_1px_0px_#000]">
                 <path d="M48.5 15.5C51.5 10.5 60.5 8.5 63.5 13.5C66.5 18.5 73.5 17.5 77.5 22.5C81.5 27.5 88.5 32.5 86.5 38.5C84.5 44.5 90.5 50.5 88.5 57.5C86.5 64.5 91.5 72.5 85.5 77.5C79.5 82.5 71.5 86.5 64.5 83.5C57.5 80.5 49.5 88.5 42.5 85.5C35.5 82.5 25.5 83.5 20.5 76.5C15.5 69.5 11.5 60.5 13.5 53.5C15.5 46.5 8.5 38.5 12.5 31.5C16.5 24.5 23.5 19.5 29.5 23.5C35.5 27.5 45.5 20.5 48.5 15.5Z" />
               </svg>
             </motion.div>
          </div>
        </div>
        
      </div>
    </div>
  );
});
