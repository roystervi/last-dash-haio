"use client"

import { useEffect, useState } from 'react';
import { MainContent } from '@/components/dashboard/MainContent'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { useScreenSize } from '@/hooks/useScreenSize';
import { useAudioLevels } from '@/hooks/useAudioLevels';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const audioLevels = useAudioLevels();
  const screenSize = useScreenSize();

  useEffect(() => {
    setSidebarOpen(screenSize === 'desktop');
  }, [screenSize]);

  return (
    <main className="min-h-screen bg-background flex relative">
      {/* Mobile Overlay */}
      {(screenSize !== 'desktop') && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        audioLevels={audioLevels}
        screenSize={screenSize}
      />
      
      <div className="flex-1">
        <MainContent setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      </div>
    </main>
  )
}