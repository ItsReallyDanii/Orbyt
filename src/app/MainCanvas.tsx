import React from 'react';
import Chronodisc from '../features/chronodisc/Chronodisc';
import DailyDisc from '../features/daily/DailyDisc';

interface MainCanvasProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  viewMode: 'annual' | 'daily';
  onViewModeChange: (mode: 'annual' | 'daily') => void;
}

const MainCanvas: React.FC<MainCanvasProps> = ({ selectedDate, onDateSelect, viewMode, onViewModeChange }) => {
  return (
    <main className="flex-1 overflow-auto bg-[var(--color-canvas-bg)] flex items-center justify-center p-8 relative">
      {viewMode === 'daily' && (
        <button 
          onClick={() => onViewModeChange('annual')}
          className="absolute top-8 left-8 px-4 py-2 bg-[var(--color-panel-bg)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded shadow hover:bg-[var(--color-canvas-bg)]"
        >
          ← Back to Annual
        </button>
      )}
      <div className="w-full h-full max-w-5xl aspect-square flex items-center justify-center">
        {viewMode === 'annual' ? (
          <Chronodisc selectedDate={selectedDate} onDateSelect={onDateSelect} />
        ) : (
          <DailyDisc selectedDate={selectedDate || new Date()} />
        )}
      </div>
    </main>
  );
};

export default MainCanvas;
