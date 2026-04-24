import type { SectionId } from './AppShell';

interface SidebarProps {
  activeSection: SectionId;
  onSectionChange: (section: SectionId) => void;
}

const NAV_ITEMS: { id: SectionId; label: string; icon: string }[] = [
  { id: 'planner',    label: 'Planner',    icon: '⊙' },
  { id: 'pages',      label: 'Pages',      icon: '📄' },
  { id: 'templates',  label: 'Templates',  icon: '🗂' },
  { id: 'categories', label: 'Categories', icon: '🏷' },
  { id: 'review',     label: 'Review',     icon: '📊' },
];

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  return (
    <aside className="w-60 flex-shrink-0 bg-[var(--color-panel-bg)] border-r border-[var(--color-border)] p-5 flex flex-col gap-2">
      <div className="font-bold text-2xl tracking-tight mb-8 px-2 text-[var(--color-text-primary)] flex items-center gap-2">
        <div className="w-6 h-6 rounded-full border-4 border-[var(--color-accent)]" />
        Orbyt
      </div>

      <nav className="flex flex-col gap-1 text-sm font-medium">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`text-left px-3 py-2.5 rounded-lg flex items-center gap-2.5 transition-colors ${
              activeSection === item.id
                ? 'bg-[var(--color-accent)] text-white shadow-sm'
                : 'hover:bg-[var(--color-canvas-bg)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            <span className="text-base leading-none">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto">
        <button
          onClick={() => onSectionChange('settings')}
          className={`w-full text-left px-3 py-2.5 text-sm font-medium rounded-lg flex items-center gap-2.5 transition-colors ${
            activeSection === 'settings'
              ? 'bg-[var(--color-accent)] text-white shadow-sm'
              : 'hover:bg-[var(--color-canvas-bg)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
          }`}
        >
          <span className="text-base leading-none">⚙️</span>
          Settings
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
