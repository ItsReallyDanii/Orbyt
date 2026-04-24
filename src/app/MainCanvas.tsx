import React from 'react';
import Chronodisc from '../features/chronodisc/Chronodisc';
import MonthDisc from '../features/chronodisc/MonthDisc';
import DailyDisc from '../features/daily/DailyDisc';
import type { ViewMode } from './AppShell';

interface MainCanvasProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  viewMode: ViewMode;
  focusedMonth: number | null;
  onViewModeChange: (mode: ViewMode) => void;
  onMonthFocus: (month: number) => void;
  onGoToAnnual: () => void;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MainCanvas: React.FC<MainCanvasProps> = ({
  selectedDate,
  onDateSelect,
  viewMode,
  focusedMonth,
  onViewModeChange,
  onMonthFocus,
  onGoToAnnual,
}) => {
  const year = new Date().getFullYear();
  const isNested = viewMode === 'month' || viewMode === 'daily';

  return (
    <main className="flex-1 overflow-auto bg-[var(--color-canvas-bg)] flex items-center justify-center p-8 relative">

      {/* Back + Breadcrumb — shown for month and daily views */}
      {isNested && (
        <div className="absolute top-6 left-8 flex items-center gap-3 z-10">
          <button
            onClick={onGoToAnnual}
            className="px-4 py-2.5 bg-[var(--color-panel-bg)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-xl shadow-sm hover:bg-[var(--color-canvas-bg)] transition-all font-medium text-sm flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Annual
          </button>

          {/* Breadcrumb trail */}
          <div className="flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)]">
            <span className="text-[var(--color-text-secondary)]">→</span>
            {viewMode === 'month' && focusedMonth !== null && (
              <span className="font-medium text-[var(--color-text-primary)]">
                {MONTH_NAMES[focusedMonth]}
              </span>
            )}
            {viewMode === 'daily' && selectedDate && (
              <>
                {/* Show month crumb if we know it */}
                <button
                  onClick={() => onViewModeChange('month')}
                  className="hover:text-[var(--color-text-primary)] transition-colors"
                >
                  {selectedDate.toLocaleDateString('en-US', { month: 'long' })}
                </button>
                <span>→</span>
                <span className="font-medium text-[var(--color-text-primary)]">
                  {selectedDate.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
                </span>
              </>
            )}
          </div>
        </div>
      )}

      <div className="w-full h-full max-w-5xl aspect-square flex items-center justify-center">
        {viewMode === 'annual' && (
          <Chronodisc
            selectedDate={selectedDate}
            onDateSelect={onDateSelect}
            onMonthFocus={onMonthFocus}
          />
        )}
        {viewMode === 'month' && focusedMonth !== null && (
          <MonthDisc
            year={year}
            month={focusedMonth}
            selectedDate={selectedDate}
            onDateSelect={(date) => {
              onDateSelect(date);
            }}
          />
        )}
        {viewMode === 'daily' && (
          <DailyDisc selectedDate={selectedDate || new Date()} />
        )}
      </div>
    </main>
  );
};

export default MainCanvas;
