import React from 'react';
import { getDayOfYear, getDaysInYear } from '../core/time';

interface InspectorProps {
  selectedDate: Date | null;
  onGoToToday: () => void;
}

const InspectorRegion: React.FC<InspectorProps> = ({ selectedDate, onGoToToday }) => {
  if (!selectedDate) {
    return (
      <aside className="w-80 flex-shrink-0 bg-[var(--color-panel-bg)] border-l border-[var(--color-border)] p-6 overflow-y-auto flex flex-col items-center">
        <div className="text-[var(--color-text-secondary)] text-center mt-12 p-6 border border-dashed border-[var(--color-border)] rounded-lg w-full">
          Select a day to inspect.
        </div>
        <button 
          onClick={onGoToToday}
          className="mt-6 px-4 py-2 bg-[var(--color-accent)] text-white rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Go to Today
        </button>
      </aside>
    );
  }

  const year = selectedDate.getFullYear();
  const dayOfYear = getDayOfYear(selectedDate);
  const daysInYear = getDaysInYear(year);
  const weekNumber = Math.ceil(dayOfYear / 7);
  const month = selectedDate.toLocaleDateString('en-US', { month: 'long' });
  const quarter = Math.floor(selectedDate.getMonth() / 3) + 1;
  const dayOfWeek = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
  const formattedDate = selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <aside className="w-80 flex-shrink-0 bg-[var(--color-panel-bg)] border-l border-[var(--color-border)] p-6 overflow-y-auto">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-[var(--color-text-primary)]">{dayOfWeek}</h2>
        <p className="text-[var(--color-text-secondary)] text-sm mb-2">{formattedDate}</p>
        
        <div className="flex flex-wrap gap-2 text-xs text-[var(--color-text-secondary)] font-medium mt-3">
          <span className="px-2 py-1 bg-[var(--color-canvas-bg)] rounded-md border border-[var(--color-border)]">Day {dayOfYear} of {daysInYear}</span>
          <span className="px-2 py-1 bg-[var(--color-canvas-bg)] rounded-md border border-[var(--color-border)]">Week {weekNumber}</span>
          <span className="px-2 py-1 bg-[var(--color-canvas-bg)] rounded-md border border-[var(--color-border)]">Q{quarter}</span>
          <span className="px-2 py-1 bg-[var(--color-canvas-bg)] rounded-md border border-[var(--color-border)]">{month}</span>
        </div>
      </div>

      <button 
        onClick={onGoToToday}
        className="w-full mb-8 px-4 py-2 bg-[var(--color-accent)] text-white rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
      >
        Go to Today
      </button>

      <div className="space-y-6">
        <section>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-[var(--color-text-primary)]">Tasks</h3>
            <button className="text-[var(--color-accent)] text-sm">+</button>
          </div>
          <div className="p-3 border border-dashed border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-secondary)] text-center">
            No tasks yet
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-[var(--color-text-primary)]">Events</h3>
            <button className="text-[var(--color-accent)] text-sm">+</button>
          </div>
          <div className="p-3 border border-dashed border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-secondary)] text-center">
            No events
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-[var(--color-text-primary)]">Reminders</h3>
            <button className="text-[var(--color-accent)] text-sm">+</button>
          </div>
          <div className="p-3 border border-dashed border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-secondary)] text-center">
            No reminders
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-[var(--color-text-primary)]">Notes</h3>
            <button className="text-[var(--color-accent)] text-sm">+</button>
          </div>
          <div className="p-3 border border-dashed border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-secondary)] text-center">
            No notes for this day
          </div>
        </section>
      </div>
    </aside>
  );
};

export default InspectorRegion;
