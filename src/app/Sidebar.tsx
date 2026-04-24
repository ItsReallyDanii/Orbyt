

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 flex-shrink-0 bg-[var(--color-panel-bg)] border-r border-[var(--color-border)] p-4 flex flex-col gap-2">
      <div className="font-bold text-xl mb-6 px-2 text-[var(--color-text-primary)]">Orbyt</div>
      <nav className="flex flex-col gap-1">
        <button className="text-left px-3 py-2 rounded-md bg-[var(--color-border)] font-medium">Planner</button>
        <button className="text-left px-3 py-2 rounded-md hover:bg-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Pages</button>
        <button className="text-left px-3 py-2 rounded-md hover:bg-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Templates</button>
        <button className="text-left px-3 py-2 rounded-md hover:bg-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Categories</button>
        <button className="text-left px-3 py-2 rounded-md hover:bg-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Review</button>
      </nav>
      <div className="mt-auto">
        <button className="w-full text-left px-3 py-2 rounded-md hover:bg-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Settings</button>
      </div>
    </aside>
  );
};

export default Sidebar;
