

const Sidebar: React.FC = () => {
  return (
    <aside className="w-60 flex-shrink-0 bg-[var(--color-panel-bg)] border-r border-[var(--color-border)] p-5 flex flex-col gap-2">
      <div className="font-bold text-2xl tracking-tight mb-8 px-2 text-[var(--color-text-primary)] flex items-center gap-2">
        <div className="w-6 h-6 rounded-full border-4 border-[var(--color-accent)]" />
        Orbyt
      </div>
      <nav className="flex flex-col gap-1 text-sm font-medium">
        <button className="text-left px-3 py-2.5 rounded-lg bg-[var(--color-accent)] text-white shadow-sm transition-opacity hover:opacity-90">Planner</button>
        <button className="text-left px-3 py-2.5 rounded-lg hover:bg-[var(--color-canvas-bg)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Pages</button>
        <button className="text-left px-3 py-2.5 rounded-lg hover:bg-[var(--color-canvas-bg)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Templates</button>
        <button className="text-left px-3 py-2.5 rounded-lg hover:bg-[var(--color-canvas-bg)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Categories</button>
        <button className="text-left px-3 py-2.5 rounded-lg hover:bg-[var(--color-canvas-bg)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Review</button>
      </nav>
      <div className="mt-auto">
        <button className="w-full text-left px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-[var(--color-canvas-bg)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Settings</button>
      </div>
    </aside>
  );
};

export default Sidebar;
