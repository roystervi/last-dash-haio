"use client"

import { useEffect, useState } from 'react';
import { MainContent } from '@/components/dashboard/MainContent'
import { MCPDashboard } from '@/components/dashboard/MCPDashboard'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { useScreenSize } from '@/hooks/useScreenSize';
import { useAudioLevels } from '@/hooks/useAudioLevels';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'mcp' | 'analytics' | 'settings'>('dashboard');
  const audioLevels = useAudioLevels();
  const screenSize = useScreenSize();

  useEffect(() => {
    setSidebarOpen(screenSize === 'desktop');
  }, [screenSize]);

  const renderContent = () => {
    switch (currentView) {
      case 'mcp':
        return <MCPDashboard />;
      case 'analytics':
        return <div className="p-6"><h1 className="text-2xl font-bold">Analytics Coming Soon</h1></div>;
      case 'settings':
        return <div className="p-6"><h1 className="text-2xl font-bold">Settings Coming Soon</h1></div>;
      default:
        return <MainContent setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />;
    }
  };

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
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      
      <div className="flex-1">
        {renderContent()}
      </div>
    </main>
  )
}