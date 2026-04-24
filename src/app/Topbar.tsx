import type { ViewMode } from './AppShell';

interface TopbarProps {
  toggleTheme: () => void;
  theme: 'light' | 'dark';
  viewMode: ViewMode;
  selectedDate: Date | null;
  onViewModeChange: (mode: ViewMode) => void;
  showPlannerNav: boolean;
}

const Topbar: React.FC<TopbarProps> = ({ toggleTheme, theme, viewMode, selectedDate, onViewModeChange, showPlannerNav }) => {
  const hasDate = selectedDate !== null;

  return (
    <header className="h-16 flex-shrink-0 border-b border-[var(--color-border)] bg-[var(--color-panel-bg)] flex items-center justify-between px-6 z-10 relative shadow-sm">
      <div className="flex items-center gap-8">
        {showPlannerNav && (
        <nav className="flex items-center gap-2 text-sm font-medium">
          {/* Annual — always active */}
          <button
            onClick={() => onViewModeChange('annual')}
            className={`px-4 py-2 rounded-xl transition-all ${
              viewMode === 'annual'
                ? 'bg-[var(--color-canvas-bg)] text-[var(--color-accent)] shadow-sm border border-[var(--color-border)]'
                : 'hover:bg-[var(--color-canvas-bg)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            Annual
          </button>

          {/* Month — enabled when a selectedDate exists */}
          <button
            onClick={() => hasDate && onViewModeChange('month')}
            disabled={!hasDate}
            title={hasDate ? `Open ${selectedDate!.toLocaleDateString('en-US', { month: 'long' })}` : 'Select a day first'}
            className={`px-4 py-2 rounded-xl transition-all ${
              viewMode === 'month'
                ? 'bg-[var(--color-canvas-bg)] text-[var(--color-accent)] shadow-sm border border-[var(--color-border)]'
                : hasDate
                ? 'hover:bg-[var(--color-canvas-bg)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] cursor-pointer'
                : 'text-[var(--color-text-secondary)] opacity-40 cursor-not-allowed'
            }`}
          >
            Month
          </button>

          {/* Day — enabled when a selectedDate exists */}
          <button
            onClick={() => hasDate && onViewModeChange('daily')}
            disabled={!hasDate}
            title={hasDate ? `Open daily view for ${selectedDate!.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : 'Select a day first'}
            className={`px-4 py-2 rounded-xl transition-all ${
              viewMode === 'daily'
                ? 'bg-[var(--color-canvas-bg)] text-[var(--color-accent)] shadow-sm border border-[var(--color-border)]'
                : hasDate
                ? 'hover:bg-[var(--color-canvas-bg)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] cursor-pointer'
                : 'text-[var(--color-text-secondary)] opacity-40 cursor-not-allowed'
            }`}
          >
            Day
          </button>
          </nav>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Orbyt..."
            className="bg-[var(--color-canvas-bg)] border border-[var(--color-border)] rounded-full px-5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent w-72 shadow-sm transition-all placeholder-[var(--color-text-secondary)]"
          />
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-[var(--color-border)] transition-colors"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
};

export default Topbar;
