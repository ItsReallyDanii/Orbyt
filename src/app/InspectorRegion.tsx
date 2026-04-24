import React, { useState } from 'react';
import { getDayOfYear, getDaysInYear } from '../core/time';
import { 
  fetchEntriesByDate, 
  addEntry, 
  updateEntry,
  deleteEntry, 
  toggleEntryStatus,
  useCategories
} from '../core/store';
import type { Entry } from '../core/schema';

interface InspectorProps {
  selectedDate: Date | null;
  onGoToToday: () => void;
  viewMode: 'annual' | 'daily';
  onViewModeChange: (mode: 'annual' | 'daily') => void;
}

const formatDateStr = (date: Date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const InspectorRegion: React.FC<InspectorProps> = ({ selectedDate, onGoToToday, viewMode, onViewModeChange }) => {
  const categories = useCategories();
  const dateStr = selectedDate ? formatDateStr(selectedDate) : '';
  const entries = fetchEntriesByDate(dateStr);
  
  const [activeForm, setActiveForm] = useState<"task" | "event" | "reminder" | "note" | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newStartTime, setNewStartTime] = useState("");
  const [newEndTime, setNewEndTime] = useState("");

  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editStartTime, setEditStartTime] = useState("");
  const [editEndTime, setEditEndTime] = useState("");

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

  const tasks = entries.filter(e => e.kind === 'task');
  const events = entries.filter(e => e.kind === 'event');
  const reminders = entries.filter(e => e.kind === 'reminder');
  const notes = entries.filter(e => e.kind === 'note');

  const handleAddEntry = async (kind: "task" | "event" | "reminder" | "note") => {
    if (!newTitle.trim()) {
      setActiveForm(null);
      return;
    }
    
    // Auto-map category based on kind for simplicity
    let categoryId = categories[0]?.id || "";
    const matchedCat = categories.find(c => 
      (kind === "task" && c.name === "Work") ||
      (kind === "event" && c.name === "Events") ||
      (kind === "reminder" && c.name === "Reminders") ||
      (kind === "note" && c.name === "Personal")
    );
    if (matchedCat) categoryId = matchedCat.id;

    await addEntry({
      discId: `disc-${year}`,
      title: newTitle.trim(),
      kind,
      categoryId,
      startDate: dateStr,
      startTime: newStartTime || undefined,
      endTime: newEndTime || undefined,
      status: "open",
    });
    
    setNewTitle("");
    setNewStartTime("");
    setNewEndTime("");
    setActiveForm(null);
  };

  const renderSection = (title: string, kind: "task" | "event" | "reminder" | "note", items: Entry[]) => {
    return (
      <section>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-[var(--color-text-primary)] capitalize">{title}</h3>
          <button 
            onClick={() => {
              setActiveForm(kind);
              setNewTitle("");
              setNewStartTime("");
              setNewEndTime("");
            }}
            className="text-[var(--color-accent)] text-lg leading-none pb-1 px-2 hover:bg-[var(--color-canvas-bg)] rounded"
          >
            +
          </button>
        </div>
        
        {activeForm === kind && (
          <div className="mb-3 flex flex-col gap-2 p-3 bg-[var(--color-canvas-bg)] border border-[var(--color-border)] rounded">
            <input 
              autoFocus
              className="w-full bg-[var(--color-panel-bg)] border border-[var(--color-border)] rounded px-3 py-1.5 text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)]"
              placeholder={`New ${kind}...`}
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleAddEntry(kind);
                if (e.key === 'Escape') { setActiveForm(null); setNewTitle(""); }
              }}
            />
            <div className="flex gap-2">
              <input
                type="time"
                className="flex-1 bg-[var(--color-panel-bg)] border border-[var(--color-border)] rounded px-2 py-1 text-xs text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)]"
                value={newStartTime}
                onChange={e => setNewStartTime(e.target.value)}
              />
              <span className="text-[var(--color-text-secondary)] text-xs self-center">to</span>
              <input
                type="time"
                className="flex-1 bg-[var(--color-panel-bg)] border border-[var(--color-border)] rounded px-2 py-1 text-xs text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)]"
                value={newEndTime}
                onChange={e => setNewEndTime(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2 mt-1">
              <button 
                onClick={() => { setActiveForm(null); setNewTitle(""); }}
                className="px-3 py-1 bg-[var(--color-panel-bg)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-xs rounded hover:opacity-90"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleAddEntry(kind)}
                className="px-3 py-1 bg-[var(--color-accent)] text-white text-xs rounded hover:opacity-90"
              >
                Add
              </button>
            </div>
          </div>
        )}

        {items.length === 0 ? (
          <div className="p-3 border border-dashed border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-secondary)] text-center">
            No {title.toLowerCase()}
          </div>
        ) : (
          <ul className="space-y-2">
            {items.map(entry => {
              const isEditing = editingEntryId === entry.id;

              return (
              <li key={entry.id} className="flex flex-col gap-2 p-3 bg-[var(--color-canvas-bg)] border border-[var(--color-border)] rounded-lg group">
                <div className="flex items-start gap-3">
                  {kind === 'task' && !isEditing && (
                    <button 
                      onClick={() => toggleEntryStatus(entry.id, entry.status)}
                      className={`mt-0.5 w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center
                        ${entry.status === 'done' ? 'bg-[var(--color-accent)] border-[var(--color-accent)]' : 'border-[var(--color-border)] hover:border-[var(--color-accent)]'}
                      `}
                    >
                      {entry.status === 'done' && <div className="w-2 h-2 bg-white rounded-sm" />}
                    </button>
                  )}
                  
                  {isEditing ? (
                    <div className="flex-1 flex flex-col gap-2 w-full">
                      <input
                        autoFocus
                        className="w-full bg-[var(--color-panel-bg)] border border-[var(--color-border)] rounded px-2 py-1 text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)]"
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                        onKeyDown={async e => {
                          if (e.key === 'Enter') {
                            if (editTitle.trim()) {
                              await updateEntry(entry.id, { 
                                title: editTitle.trim(),
                                startTime: editStartTime || undefined,
                                endTime: editEndTime || undefined
                              });
                            }
                            setEditingEntryId(null);
                          }
                          if (e.key === 'Escape') {
                            setEditingEntryId(null);
                          }
                        }}
                      />
                      <div className="flex gap-2">
                        <input
                          type="time"
                          className="flex-1 bg-[var(--color-panel-bg)] border border-[var(--color-border)] rounded px-2 py-1 text-xs text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)]"
                          value={editStartTime}
                          onChange={e => setEditStartTime(e.target.value)}
                        />
                        <span className="text-[var(--color-text-secondary)] text-xs self-center">to</span>
                        <input
                          type="time"
                          className="flex-1 bg-[var(--color-panel-bg)] border border-[var(--color-border)] rounded px-2 py-1 text-xs text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)]"
                          value={editEndTime}
                          onChange={e => setEditEndTime(e.target.value)}
                        />
                      </div>
                      <div className="flex justify-end gap-2 mt-1">
                        <button 
                          onClick={() => setEditingEntryId(null)}
                          className="px-2 py-1 bg-[var(--color-panel-bg)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-xs rounded hover:opacity-90"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={async () => {
                            if (editTitle.trim()) {
                              await updateEntry(entry.id, { 
                                title: editTitle.trim(),
                                startTime: editStartTime || undefined,
                                endTime: editEndTime || undefined
                              });
                            }
                            setEditingEntryId(null);
                          }}
                          className="px-2 py-1 bg-[var(--color-accent)] text-white text-xs rounded hover:opacity-90"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 flex flex-col">
                        <div className={`text-sm ${entry.status === 'done' ? 'text-[var(--color-text-secondary)] line-through' : 'text-[var(--color-text-primary)]'}`}>
                          {entry.title}
                        </div>
                        {(entry.startTime || entry.endTime) && (
                          <div className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                            {entry.startTime} {entry.endTime ? `- ${entry.endTime}` : ''}
                          </div>
                        )}
                      </div>
                      
                      <button 
                        onClick={() => {
                          setEditingEntryId(entry.id);
                          setEditTitle(entry.title);
                          setEditStartTime(entry.startTime || "");
                          setEditEndTime(entry.endTime || "");
                        }}
                        className="opacity-0 group-hover:opacity-100 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-opacity px-1"
                        title="Edit"
                      >
                        ✎
                      </button>
                      <button 
                        onClick={() => deleteEntry(entry.id)}
                        className="opacity-0 group-hover:opacity-100 text-[var(--color-text-secondary)] hover:text-red-500 transition-opacity px-1"
                        title="Delete"
                      >
                        ✕
                      </button>
                    </>
                  )}
                </div>
              </li>
            )})}
          </ul>
        )}
      </section>
    );
  };

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

      <div className="flex gap-2 w-full mb-8">
        <button 
          onClick={onGoToToday}
          className="flex-1 px-4 py-2 bg-[var(--color-accent)] text-white rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Go to Today
        </button>
        {viewMode === 'annual' && (
          <button 
            onClick={() => onViewModeChange('daily')}
            className="flex-1 px-4 py-2 bg-[var(--color-panel-bg)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-md text-sm font-medium hover:bg-[var(--color-canvas-bg)] transition-colors"
          >
            Daily View
          </button>
        )}
      </div>

      <div className="space-y-6 pb-20">
        {renderSection("Tasks", "task", tasks)}
        {renderSection("Events", "event", events)}
        {renderSection("Reminders", "reminder", reminders)}
        {renderSection("Notes", "note", notes)}
      </div>
    </aside>
  );
};

export default InspectorRegion;
