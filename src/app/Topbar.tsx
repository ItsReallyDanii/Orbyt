

interface TopbarProps {
  toggleTheme: () => void;
  theme: 'light' | 'dark';
}

const Topbar: React.FC<TopbarProps> = ({ toggleTheme, theme }) => {
  return (
    <header className="h-16 flex-shrink-0 border-b border-[var(--color-border)] bg-[var(--color-panel-bg)] flex items-center justify-between px-6 z-10 relative shadow-sm">
      <div className="flex items-center gap-8">
        <nav className="flex items-center gap-2 text-sm font-medium">
          <button className="px-4 py-2 rounded-xl bg-[var(--color-canvas-bg)] text-[var(--color-accent)] shadow-sm border border-[var(--color-border)]">Annual</button>
          <button className="px-4 py-2 rounded-xl hover:bg-[var(--color-canvas-bg)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Month</button>
          <button className="px-4 py-2 rounded-xl hover:bg-[var(--color-canvas-bg)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Day</button>
        </nav>
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
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
};

export default Topbar;
