"use client"

import { Volume2, Menu, SkipBack, SkipForward, Pause, Music, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useRef, useEffect } from 'react';

interface MusicPlayerProps {
  className?: string;
}

export const MusicPlayer = ({ className }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // Mock duration
  const [volume, setVolume] = useState(0.5);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(parseFloat(e.target.value));
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Mock progress for demo
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(prev => prev < duration ? prev + 1 : 0);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, duration]);

  return (
    <div className={cn("border-2 border-primary/30 bg-card rounded-xl p-1.5 sm:p-3 flex flex-col min-h-[250px] relative", className)}>
      <div className="flex items-center gap-1.5 sm:gap-2.5 mb-2 relative">
        <div className="w-7 h-7 sm:w-9 sm:h-9 bg-green-500 rounded-lg flex items-center justify-center">
          <Volume2 className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-white" />
        </div>
        <div className="flex-1 flex justify-center items-center gap-1">
          <button className="w-7 h-7 sm:w-9 sm:h-9 bg-background border border-border rounded-none flex items-center justify-center hover:bg-accent hover:border-accent transition-colors cursor-pointer">
            <ChevronLeft className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-foreground" />
          </button>
          <button className="w-7 h-7 sm:w-9 sm:h-9 bg-background border border-border rounded-none flex items-center justify-center hover:bg-accent hover:border-accent transition-colors cursor-pointer">
            <ChevronRight className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-foreground" />
          </button>
        </div>
        <Menu 
          className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" 
          onClick={toggleMenu}
        />
      </div>
      
      <div className="mb-2">
        <p className="text-xs sm:text-sm font-medium mb-0.5 text-foreground leading-tight">Rainy day relaxing sound</p>
        <p className="text-xs text-muted-foreground leading-tight">Currently playing</p>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex-1 w-full min-h-18 sm:min-h-30 bg-gradient-to-br from-green-600 to-green-800 rounded-lg mb-2 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-14 flex justify-center items-end gap-0.5 p-1.5">
            {[0,1,2,3,4,5].map(i => (
              <div key={i} className="bg-white/30 rounded w-0.5" style={{height: `${Math.random()*80 + 20}%`}} />
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-1 mb-1.5">
          <span className="text-xs text-muted-foreground">{formatTime(currentTime)}</span>
          <input
            type="range"
            value={currentTime}
            min={0}
            max={duration || 0}
            onChange={handleProgressChange}
            className="flex-1 h-1 bg-muted rounded-full appearance-none cursor-pointer"
          />
          <span className="text-xs text-muted-foreground">{formatTime(duration)}</span>
        </div>

        <div className="flex items-center justify-between gap-0.5 sm:gap-2 mt-auto mb-1.5">
          <div className="flex items-center gap-0.5 sm:gap-1.5 flex-1 min-w-0">
            <SkipBack className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer flex-shrink-0" />
            <button onClick={togglePlayPause} className="w-5 h-5 sm:w-7 sm:h-7 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors flex-shrink-0">
              {isPlaying ? <Pause className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-primary-foreground" /> : <Music className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-primary-foreground" />}
            </button>
            <SkipForward className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer flex-shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
};