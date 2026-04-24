import React from 'react';
import Chronodisc from '../features/chronodisc/Chronodisc';

interface MainCanvasProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

const MainCanvas: React.FC<MainCanvasProps> = ({ selectedDate, onDateSelect }) => {
  return (
    <main className="flex-1 overflow-auto bg-[var(--color-canvas-bg)] flex items-center justify-center p-8">
      <div className="w-full h-full max-w-5xl aspect-square flex items-center justify-center">
        <Chronodisc selectedDate={selectedDate} onDateSelect={onDateSelect} />
      </div>
    </main>
  );
};

export default MainCanvas;
