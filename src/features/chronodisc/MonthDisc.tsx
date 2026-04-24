import React from 'react';
import { getMonthDaySegments, getMonthWeekSegments, describeRingSegment, polarToCartesian } from '../../core/radial';
import { formatDateStr } from '../../core/time';
import { useEntriesByDateRange, useCategories } from '../../core/store';
import { tailwindColors } from '../../core/colors';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const SHORT_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface MonthDiscProps {
  year: number;
  /** 0-indexed month (0 = January) */
  month: number;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

const MonthDisc: React.FC<MonthDiscProps> = ({ year, month, selectedDate, onDateSelect }) => {
  const monthName = MONTH_NAMES[month];
  const today = new Date();

  // Fetch all entries for this month
  const firstDayStr = formatDateStr(new Date(year, month, 1));
  const lastDayStr  = formatDateStr(new Date(year, month + 1, 0));
  const monthEntries = useEntriesByDateRange(firstDayStr, lastDayStr);
  const categories = useCategories();

  const daySegments  = getMonthDaySegments(year, month);
  const weekSegments = getMonthWeekSegments(year, month);
  const daysInMonth  = daySegments.length;

  // Map entries by calendar day number for marker rendering
  const entriesByDay = React.useMemo(() => {
    const map = new Map<number, typeof monthEntries>();
    monthEntries.forEach(entry => {
      const d = parseInt(entry.startDate.split('-')[2], 10);
      if (!map.has(d)) map.set(d, []);
      map.get(d)!.push(entry);
    });
    return map;
  }, [monthEntries]);

  // Hub geometry
  const hubRadius = 85;
  const outerBound = 260;

  return (
    <div className="flex items-center justify-center w-full h-full relative p-4">
      <svg
        viewBox="-320 -320 640 640"
        className="w-full h-full max-h-full max-w-full"
        style={{ filter: 'drop-shadow(0 20px 40px var(--color-shadow))' }}
      >
        {/* Week arcs (inner subdivision ring) */}
        <g id="month-weeks">
          {weekSegments.map((seg, i) => (
            <path
              key={seg.id}
              d={describeRingSegment(0, 0, seg.innerRadius, seg.outerRadius, seg.startAngle, seg.endAngle)}
              className={`${i % 2 === 0 ? 'fill-[var(--color-panel-bg)]' : 'fill-[var(--color-canvas-bg)]'} stroke-[var(--color-border)] stroke-[0.5]`}
            />
          ))}
          {/* Week labels */}
          {weekSegments.map(seg => {
            const mid = (seg.startAngle + seg.endAngle) / 2;
            const r = (seg.innerRadius + seg.outerRadius) / 2;
            const pt = polarToCartesian(0, 0, r, mid);
            return (
              <text
                key={`wl-${seg.id}`}
                x={pt.x} y={pt.y}
                textAnchor="middle"
                dominantBaseline="central"
                style={{ fontSize: '7px' }}
                className="fill-[var(--color-text-secondary)] select-none pointer-events-none"
              >
                {seg.label}
              </text>
            );
          })}
        </g>

        {/* Day segments */}
        <g id="month-days">
          {daySegments.map((seg, i) => {
            const day = i + 1;
            const date = new Date(year, month, day);
            const isToday = date.toDateString() === today.toDateString();
            const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
            const dayOfWeek = date.getDay(); // 0=Sun
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
            const dayEntries = entriesByDay.get(day) || [];
            const mid = (seg.startAngle + seg.endAngle) / 2;

            const dateLabel = `${monthName.slice(0, 3)} ${day} (${SHORT_DAYS[dayOfWeek]})`;

            return (
              <g key={seg.id}>
                <path
                  d={describeRingSegment(0, 0, seg.innerRadius, seg.outerRadius, seg.startAngle, seg.endAngle)}
                  className={[
                    isSelected
                      ? 'fill-[var(--color-accent)] opacity-30 stroke-[var(--color-accent)] stroke-[1]'
                      : isToday
                      ? 'fill-[var(--color-accent)] opacity-10 stroke-[var(--color-accent)] stroke-[0.5]'
                      : isWeekend
                      ? 'fill-[var(--color-border)] opacity-40 stroke-[var(--color-border)] stroke-[0.25]'
                      : i % 2 === 0
                      ? 'fill-[var(--color-panel-bg)] stroke-[var(--color-border)] stroke-[0.25]'
                      : 'fill-[var(--color-canvas-bg)] stroke-[var(--color-border)] stroke-[0.25]',
                    'hover:fill-[var(--color-accent)] hover:opacity-30 cursor-pointer transition-all',
                  ].join(' ')}
                  onClick={() => onDateSelect(new Date(year, month, day))}
                >
                  <title>Select {dateLabel}</title>
                </path>

                {/* Day number label */}
                {(() => {
                  const pt = polarToCartesian(0, 0, seg.innerRadius + (seg.outerRadius - seg.innerRadius) * 0.5, mid);
                  let rotation = mid;
                  if (rotation > 90 && rotation < 270) rotation += 180;
                  return (
                    <text
                      x={pt.x} y={pt.y}
                      transform={`rotate(${rotation}, ${pt.x}, ${pt.y})`}
                      textAnchor="middle"
                      dominantBaseline="central"
                      style={{ fontSize: '8px', fontWeight: 500 }}
                      className={`select-none pointer-events-none ${isSelected ? 'fill-[var(--color-accent)]' : 'fill-[var(--color-text-secondary)]'}`}
                    >
                      {day}
                    </text>
                  );
                })()}

                {/* Day-of-week label (abbreviated) at outer edge */}
                {daysInMonth <= 31 && (() => {
                  const pt2 = polarToCartesian(0, 0, seg.outerRadius + 14, mid);
                  let rotation = mid;
                  if (rotation > 90 && rotation < 270) rotation += 180;
                  return (
                    <text
                      x={pt2.x} y={pt2.y}
                      transform={`rotate(${rotation}, ${pt2.x}, ${pt2.y})`}
                      textAnchor="middle"
                      dominantBaseline="central"
                      style={{ fontSize: '6.5px' }}
                      className="fill-[var(--color-text-secondary)] select-none pointer-events-none opacity-70"
                    >
                      {SHORT_DAYS[dayOfWeek]}
                    </text>
                  );
                })()}

                {/* Entry markers */}
                {dayEntries.length > 0 && dayEntries.slice(0, 3).map((entry, idx) => {
                  const cat = categories.find(c => c.id === entry.categoryId);
                  const hexColor = tailwindColors[cat?.color || 'gray'] || tailwindColors.gray;
                  const rOffset = seg.outerRadius - 5 - idx * 5;
                  const pt = polarToCartesian(0, 0, rOffset, mid);
                  return (
                    <circle
                      key={entry.id}
                      cx={pt.x} cy={pt.y} r={2.5}
                      fill={hexColor}
                      className="pointer-events-none"
                    />
                  );
                })}
              </g>
            );
          })}
        </g>

        {/* Today accent marker line */}
        {(() => {
          const todayDate = new Date();
          if (todayDate.getFullYear() !== year || todayDate.getMonth() !== month) return null;
          const d = todayDate.getDate();
          const seg = daySegments[d - 1];
          if (!seg) return null;
          const mid = (seg.startAngle + seg.endAngle) / 2;
          const pOuter = polarToCartesian(0, 0, outerBound + 10, mid);
          const pInner = polarToCartesian(0, 0, seg.innerRadius - 5, mid);
          return (
            <line
              x1={pInner.x} y1={pInner.y}
              x2={pOuter.x} y2={pOuter.y}
              className="stroke-[var(--color-accent)] stroke-[2] pointer-events-none"
              strokeLinecap="round"
            />
          );
        })()}

        {/* Selected date marker */}
        {selectedDate && selectedDate.getFullYear() === year && selectedDate.getMonth() === month && (() => {
          const d = selectedDate.getDate();
          const seg = daySegments[d - 1];
          if (!seg) return null;
          const mid = (seg.startAngle + seg.endAngle) / 2;
          const pOuter = polarToCartesian(0, 0, outerBound, mid);
          const pInner = polarToCartesian(0, 0, seg.innerRadius, mid);
          return (
            <line
              x1={pInner.x} y1={pInner.y}
              x2={pOuter.x} y2={pOuter.y}
              className="stroke-[var(--color-text-secondary)] stroke-[1.5] pointer-events-none"
              strokeDasharray="4 4"
            />
          );
        })()}

        {/* Center Hub */}
        <g id="month-center-hub">
          <circle cx="0" cy="0" r={hubRadius}
            className="fill-[var(--color-panel-bg)] stroke-[var(--color-border)] stroke-[0.5]"
            style={{ filter: 'drop-shadow(0 4px 12px var(--color-shadow))' }}
          />
          <circle cx="0" cy="0" r={hubRadius - 6}
            className="fill-none stroke-[var(--color-border)] stroke-[0.5]"
            strokeDasharray="3 3"
          />
          <text x="0" y="-22" textAnchor="middle"
            style={{ fontSize: '9px' }}
            className="fill-[var(--color-text-secondary)] uppercase tracking-widest font-semibold"
          >
            {year}
          </text>
          <text x="0" y="2" textAnchor="middle"
            style={{ fontSize: '18px' }}
            className="fill-[var(--color-text-primary)] font-bold"
          >
            {monthName}
          </text>
          <text x="0" y="22" textAnchor="middle"
            style={{ fontSize: '9px' }}
            className="fill-[var(--color-text-secondary)] uppercase tracking-wider"
          >
            {daysInMonth} days
          </text>
        </g>
      </svg>
    </div>
  );
};

export default MonthDisc;
