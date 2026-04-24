import React from 'react';
import { fetchEntriesByDate, useCategories } from '../../core/store';
import { describeRingSegment, polarToCartesian } from '../../core/radial';

const tailwindColors: Record<string, string> = {
  blue: '#3b82f6',
  green: '#22c55e',
  teal: '#14b8a6',
  purple: '#a855f7',
  yellow: '#eab308',
  gray: '#6b7280'
};

interface DailyDiscProps {
  selectedDate: Date;
}

const parseTime = (timeStr: string) => {
  if (!timeStr) return null;
  const [h, m] = timeStr.split(':').map(Number);
  return h + m / 60;
};

const getAngleForTime = (decimalHours: number) => {
  return decimalHours * (360 / 24);
};

const formatDateStr = (date: Date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const DailyDisc: React.FC<DailyDiscProps> = ({ selectedDate }) => {
  const dateStr = formatDateStr(selectedDate);
  const entries = fetchEntriesByDate(dateStr);
  const categories = useCategories();
  
  const timedEntries = entries.filter(e => e.startTime);
  const untimedEntries = entries.filter(e => !e.startTime);

  const innerRadius = 90;
  const outerRadius = 260;
  const hours = Array.from({ length: 24 }).map((_, i) => i);
  const formattedDate = selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="flex w-full h-full relative items-center justify-center">
      {/* 24-hour Circular Dial */}
      <div className="w-full h-full max-w-3xl aspect-square flex items-center justify-center relative">
        <svg 
          viewBox="-320 -320 640 640" 
          className="w-full h-full max-h-full max-w-full drop-shadow-sm"
        >
          <g id="daily-rings">
            {hours.map(h => {
              const startAngle = h * 15;
              const endAngle = (h + 1) * 15;
              return (
                <path
                  key={h}
                  d={describeRingSegment(0, 0, innerRadius, outerRadius, startAngle, endAngle)}
                  className={`${h % 2 === 0 ? 'fill-[var(--color-panel-bg)]' : 'fill-[var(--color-canvas-bg)]'} stroke-[var(--color-border)] stroke-[0.5]`}
                />
              );
            })}

            {/* Hour separators */}
            {hours.map(h => {
              const angle = h * 15;
              const pInner = polarToCartesian(0, 0, innerRadius, angle);
              const pOuter = polarToCartesian(0, 0, outerRadius, angle);
              return (
                <line
                  key={`line-${h}`}
                  x1={pInner.x} y1={pInner.y}
                  x2={pOuter.x} y2={pOuter.y}
                  className="stroke-[var(--color-border)] stroke-[1]"
                />
              );
            })}

            {/* Timed Entries */}
            {timedEntries.map(entry => {
              const startH = parseTime(entry.startTime!);
              let endH = entry.endTime ? parseTime(entry.endTime) : startH! + 1;
              if (endH! <= startH!) endH = startH! + 1; // Basic safety
              
              const startAngle = getAngleForTime(startH!);
              const endAngle = getAngleForTime(endH!);
              
              const cat = categories.find(c => c.id === entry.categoryId);
              const hexColor = tailwindColors[cat?.color || 'gray'] || tailwindColors.gray;
              
              // Draw blocks slightly indented from the edges
              return (
                <g key={entry.id}>
                  <path
                    d={describeRingSegment(0, 0, innerRadius + 10, outerRadius - 10, startAngle, endAngle)}
                    fill={hexColor}
                    className="opacity-70 stroke-[var(--color-canvas-bg)] stroke-[1.5]"
                  />
                  {/* Optional: Add title if arc is large enough, omitted for simplicity to prevent text overflow issues */}
                </g>
              );
            })}
          </g>

          {/* Labels */}
          <g id="daily-labels">
            {hours.map(h => {
              const angle = h * 15;
              const pt = polarToCartesian(0, 0, outerRadius + 20, angle);
              return (
                <text
                  key={`label-${h}`}
                  x={pt.x} y={pt.y}
                  textAnchor="middle" dominantBaseline="central"
                  className="fill-[var(--color-text-secondary)] font-medium text-[12px]"
                >
                  {h === 0 ? '00:00' : `${h}:00`}
                </text>
              );
            })}
          </g>

          {/* Center Hub */}
          <g id="center-hub">
            <circle cx="0" cy="0" r={innerRadius} className="fill-[var(--color-panel-bg)] stroke-[var(--color-border)] stroke-1" />
            <text x="0" y="-10" textAnchor="middle" className="fill-[var(--color-text-secondary)] text-[10px] uppercase tracking-widest font-semibold">Daily View</text>
            <text x="0" y="10" textAnchor="middle" className="fill-[var(--color-text-primary)] text-[14px] font-medium">{formattedDate}</text>
          </g>
        </svg>
      </div>

      {/* Adjacent Unscheduled Section */}
      <div className="absolute right-0 top-0 bottom-0 w-64 bg-[var(--color-panel-bg)] border border-[var(--color-border)] rounded-lg shadow-md p-4 overflow-y-auto m-8">
        <h3 className="font-semibold text-[var(--color-text-primary)] mb-4 pb-2 border-b border-[var(--color-border)]">Unscheduled</h3>
        {untimedEntries.length === 0 ? (
          <div className="text-sm text-[var(--color-text-secondary)] italic">
            No unscheduled items.
          </div>
        ) : (
          <ul className="space-y-3">
            {untimedEntries.map(entry => {
              const cat = categories.find(c => c.id === entry.categoryId);
              const hexColor = tailwindColors[cat?.color || 'gray'] || tailwindColors.gray;
              
              return (
                <li key={entry.id} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: hexColor }} />
                    <span className={`text-sm font-medium ${entry.status === 'done' ? 'line-through text-[var(--color-text-secondary)]' : 'text-[var(--color-text-primary)]'}`}>
                      {entry.title}
                    </span>
                  </div>
                  <span className="text-xs text-[var(--color-text-secondary)] capitalize ml-4">{entry.kind}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DailyDisc;
