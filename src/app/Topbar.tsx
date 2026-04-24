

interface TopbarProps {
  toggleTheme: () => void;
  theme: 'light' | 'dark';
}

const Topbar: React.FC<TopbarProps> = ({ toggleTheme, theme }) => {
  return (
    <header className="h-16 flex-shrink-0 border-b border-[var(--color-border)] bg-[var(--color-panel-bg)] flex items-center justify-between px-6">
      <div className="flex items-center gap-6">
        <div className="font-semibold text-lg">Orbyt</div>
        <nav className="flex items-center gap-4 text-sm font-medium">
          <button className="text-[var(--color-accent)]">Annual</button>
          <button className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Month</button>
          <button className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Day</button>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-[var(--color-canvas-bg)] border border-[var(--color-border)] rounded-full px-4 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] w-64"
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
