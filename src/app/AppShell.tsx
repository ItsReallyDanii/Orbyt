import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import MainCanvas from './MainCanvas';
import InspectorRegion from './InspectorRegion';

const AppShell: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[var(--color-canvas-bg)] text-[var(--color-text-primary)]">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Topbar toggleTheme={toggleTheme} theme={theme} />
        <div className="flex flex-1 overflow-hidden">
          <MainCanvas selectedDate={selectedDate} onDateSelect={setSelectedDate} />
          <InspectorRegion selectedDate={selectedDate} onGoToToday={() => setSelectedDate(new Date())} />
        </div>
      </div>
    </div>
  );
};

export default AppShell;
