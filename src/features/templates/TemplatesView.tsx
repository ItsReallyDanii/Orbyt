import React from 'react';

const TemplatesView: React.FC = () => {
  const templates = [
    { icon: '📅', name: 'Chronodisc Annual', status: 'Active', desc: 'The default 365/366-day radial planner. One ring per time unit.' },
    { icon: '🌙', name: 'Daily 24h Disc', status: 'Active', desc: 'A 24-hour radial dial for focused daily planning.' },
    { icon: '📊', name: 'Sprint Board', status: 'Planned', desc: 'A 2-week radial sprint view for project work.' },
    { icon: '📆', name: 'Monthly Focus', status: 'Planned', desc: 'A dedicated month-level Chronodisc with task density heatmap.' },
    { icon: '🗓️', name: 'Quarter Roadmap', status: 'Planned', desc: 'A quarterly radial roadmap for goals and milestones.' },
  ];

  return (
    <div className="flex-1 flex flex-col p-8 bg-[var(--color-canvas-bg)] overflow-y-auto">
      <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Templates</h1>
      <p className="text-sm text-[var(--color-text-secondary)] mb-8 max-w-xl">
        Orbyt templates define the structure of a planning disc. Future versions will let you switch between templates per disc. Currently, all discs use Chronodisc Annual.
      </p>

      <div className="grid grid-cols-1 gap-3 max-w-lg">
        {templates.map(t => (
          <div
            key={t.name}
            className="flex items-start gap-4 px-5 py-4 rounded-2xl bg-[var(--color-panel-bg)] border border-[var(--color-border)] shadow-sm"
          >
            <span className="text-2xl">{t.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-sm font-semibold text-[var(--color-text-primary)]">{t.name}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  t.status === 'Active'
                    ? 'bg-green-500/15 text-green-500'
                    : 'bg-[var(--color-canvas-bg)] text-[var(--color-text-secondary)]'
                }`}>
                  {t.status}
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)]">{t.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatesView;
