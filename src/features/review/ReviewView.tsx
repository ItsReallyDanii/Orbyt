import React from 'react';
import { useTodayEntries, useYearEntryCount, useDoneTaskCount } from '../../core/store';

const ReviewView: React.FC = () => {
  const todayEntries = useTodayEntries();
  const yearCount = useYearEntryCount();
  const doneCount = useDoneTaskCount();

  const today = new Date();
  const todayStr = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  const tasksDueToday = todayEntries.filter(e => e.kind === 'task');
  const eventsDueToday = todayEntries.filter(e => e.kind === 'event');

  const stat = (label: string, value: string | number, sub?: string) => (
    <div className="px-6 py-5 rounded-2xl bg-[var(--color-panel-bg)] border border-[var(--color-border)] shadow-sm">
      <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-1">{label}</p>
      <p className="text-3xl font-bold text-[var(--color-accent)]">{value}</p>
      {sub && <p className="text-xs text-[var(--color-text-secondary)] mt-1">{sub}</p>}
    </div>
  );

  return (
    <div className="flex-1 flex flex-col p-8 bg-[var(--color-canvas-bg)] overflow-y-auto">
      <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">Review</h1>
      <p className="text-sm text-[var(--color-text-secondary)] mb-8">{todayStr}</p>

      <div className="grid grid-cols-3 gap-4 max-w-2xl mb-10">
        {stat('Today', todayEntries.length, 'entries logged today')}
        {stat('This Year', yearCount, 'entries across all days')}
        {stat('Completed', doneCount, 'tasks marked done')}
      </div>

      <div className="max-w-2xl space-y-4">
        <h2 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-widest">Today's Tasks</h2>
        {tasksDueToday.length === 0 ? (
          <p className="text-sm text-[var(--color-text-secondary)]">No tasks logged for today.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {tasksDueToday.map(e => (
              <div key={e.id} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--color-panel-bg)] border border-[var(--color-border)]">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${e.status === 'done' ? 'bg-green-500' : 'bg-[var(--color-accent)]'}`} />
                <span className={`text-sm flex-1 ${e.status === 'done' ? 'line-through text-[var(--color-text-secondary)]' : 'text-[var(--color-text-primary)]'}`}>
                  {e.title}
                </span>
                <span className="text-xs text-[var(--color-text-secondary)]">{e.status}</span>
              </div>
            ))}
          </div>
        )}

        <h2 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-widest pt-4">Today's Events</h2>
        {eventsDueToday.length === 0 ? (
          <p className="text-sm text-[var(--color-text-secondary)]">No events logged for today.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {eventsDueToday.map(e => (
              <div key={e.id} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--color-panel-bg)] border border-[var(--color-border)]">
                <span className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0" />
                <span className="text-sm text-[var(--color-text-primary)] flex-1">{e.title}</span>
                {e.startTime && <span className="text-xs text-[var(--color-text-secondary)]">{e.startTime}{e.endTime ? `–${e.endTime}` : ''}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewView;
