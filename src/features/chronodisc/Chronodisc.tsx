import React from 'react';
import { 
  getQuarterSegments, 
  getMonthSegments, 
  getWeekSegments, 
  getDaySegments, 
  describeRingSegment, 
  polarToCartesian, 
  getRingRadii 
} from '../../core/radial';
import { getAngleForDate, getDaysInYear, getDayOfYear, getDateFromDayOfYear } from '../../core/time';

interface ChronodiscProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

const Chronodisc: React.FC<ChronodiscProps> = ({ selectedDate, onDateSelect }) => {
  const today = new Date();
  // Using today's year for the disc itself
  const year = today.getFullYear();
  const daysInYear = getDaysInYear(year);
  
  const targetDate = selectedDate || today;
  const targetDayOfYear = getDayOfYear(targetDate);
  const yearProgress = Math.round((targetDayOfYear / daysInYear) * 100);
  
  const todayAngle = getAngleForDate(today, year);
  const selectedAngle = selectedDate ? getAngleForDate(selectedDate, year) : null;
  
  const quarterSegments = getQuarterSegments(year);
  const monthSegments = getMonthSegments(year);
  const weekSegments = getWeekSegments(year);
  const daySegments = getDaySegments(year);
  
  const centerRing = getRingRadii("center");

  const targetFormatted = targetDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  const renderLabels = (segments: any[], radiusOffset: number, fontSize: number, rotateText: boolean) => {
    return segments.map((seg, i) => {
      const middleAngle = seg.startAngle + (seg.endAngle - seg.startAngle) / 2;
      const radius = seg.innerRadius + (seg.outerRadius - seg.innerRadius) * radiusOffset;
      const point = polarToCartesian(0, 0, radius, middleAngle);
      
      let transform = "";
      if (rotateText) {
        let rotation = middleAngle;
        if (rotation > 90 && rotation < 270) {
          rotation += 180;
        }
        transform = `rotate(${rotation}, ${point.x}, ${point.y})`;
      }

      if (segments === daySegments && (seg.endAngle - seg.startAngle) < 1.5) {
        if (i % 5 !== 0) return null;
      }

      return (
        <text
          key={seg.id}
          x={point.x}
          y={point.y}
          transform={transform}
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-[var(--color-text-secondary)] select-none pointer-events-none"
          style={{ fontSize: `${fontSize}px`, fontWeight: 500 }}
        >
          {seg.label}
        </text>
      );
    });
  };

  return (
    <div className="flex items-center justify-center w-full h-full relative p-4">
      <svg 
        viewBox="-300 -300 600 600" 
        className="w-full h-full max-h-full max-w-full drop-shadow-sm"
      >
        <g id="chronodisc-rings">
          {/* Quarters */}
          {quarterSegments.map((seg, i) => (
            <path
              key={seg.id}
              d={describeRingSegment(0, 0, seg.innerRadius, seg.outerRadius, seg.startAngle, seg.endAngle)}
              className={`${i % 2 === 0 ? 'fill-[var(--color-panel-bg)]' : 'fill-[var(--color-canvas-bg)]'} stroke-[var(--color-border)] stroke-[0.5] hover:opacity-80 transition-opacity`}
            />
          ))}
          {/* Months */}
          {monthSegments.map((seg, i) => (
            <path
              key={seg.id}
              d={describeRingSegment(0, 0, seg.innerRadius, seg.outerRadius, seg.startAngle, seg.endAngle)}
              className={`${i % 2 !== 0 ? 'fill-[var(--color-panel-bg)]' : 'fill-[var(--color-canvas-bg)]'} stroke-[var(--color-border)] stroke-[0.5] hover:opacity-80 transition-opacity`}
            />
          ))}
          {/* Weeks */}
          {weekSegments.map((seg, i) => (
            <path
              key={seg.id}
              d={describeRingSegment(0, 0, seg.innerRadius, seg.outerRadius, seg.startAngle, seg.endAngle)}
              className={`${i % 2 === 0 ? 'fill-[var(--color-panel-bg)]' : 'fill-[var(--color-canvas-bg)]'} stroke-[var(--color-border)] stroke-[0.25]`}
            />
          ))}
          {/* Days */}
          {daySegments.map((seg, i) => {
            // Reconstruct the date from the segment to pass back on click
            // segment.id is "day-YYYY-DayOfYear"
            const parts = seg.id.split('-');
            const segDayOfYear = parseInt(parts[2], 10);
            const isSelected = selectedDate && getDayOfYear(selectedDate) === segDayOfYear && selectedDate.getFullYear() === year;
            
            return (
              <path
                key={seg.id}
                d={describeRingSegment(0, 0, seg.innerRadius, seg.outerRadius, seg.startAngle, seg.endAngle)}
                className={`
                  ${isSelected ? 'fill-[var(--color-accent)] opacity-20' : i % 2 !== 0 ? 'fill-[var(--color-panel-bg)]' : 'fill-[var(--color-canvas-bg)]'} 
                  ${isSelected ? 'stroke-[var(--color-accent)] stroke-[1]' : 'stroke-[var(--color-border)] stroke-[0.25]'}
                  hover:fill-[var(--color-accent)] hover:opacity-30 cursor-pointer transition-all
                `}
                onClick={() => {
                  const clickedDate = getDateFromDayOfYear(year, segDayOfYear);
                  onDateSelect(clickedDate);
                }}
              />
            );
          })}
        </g>

        <g id="chronodisc-labels">
          {renderLabels(quarterSegments, 0.5, 12, true)}
          {renderLabels(monthSegments, 0.5, 10, true)}
          {renderLabels(weekSegments, 0.5, 6, true)}
        </g>

        <g id="markers">
          {/* Selected Date Marker */}
          {selectedAngle !== null && (() => {
             const pOuter = polarToCartesian(0, 0, quarterSegments[0].outerRadius, selectedAngle);
             const pInner = polarToCartesian(0, 0, daySegments[0].innerRadius, selectedAngle);
             return (
               <line 
                 x1={pInner.x} y1={pInner.y} 
                 x2={pOuter.x} y2={pOuter.y} 
                 className="stroke-[var(--color-text-secondary)] stroke-[1.5] pointer-events-none" 
                 strokeDasharray="4 4"
               />
             );
          })()}

          {/* Today Marker */}
          {(() => {
             const pOuter = polarToCartesian(0, 0, quarterSegments[0].outerRadius + 10, todayAngle);
             const pInner = polarToCartesian(0, 0, daySegments[0].innerRadius - 5, todayAngle);
             return (
               <line 
                 x1={pInner.x} y1={pInner.y} 
                 x2={pOuter.x} y2={pOuter.y} 
                 className="stroke-[var(--color-accent)] stroke-[2] pointer-events-none" 
                 strokeLinecap="round"
               />
             );
          })()}
        </g>

        {/* Center Hub */}
        <g id="center-hub">
          <circle cx="0" cy="0" r={centerRing.outer} className="fill-[var(--color-panel-bg)] stroke-[var(--color-border)] stroke-1" />
          <circle cx="0" cy="0" r={centerRing.outer - 4} className="fill-none stroke-[var(--color-border)] stroke-[0.5]" strokeDasharray="2 2" />
          
          <text x="0" y="-30" textAnchor="middle" className="fill-[var(--color-text-secondary)] text-[10px] uppercase tracking-widest font-semibold">Orbyt {year}</text>
          <text x="0" y="-5" textAnchor="middle" className="fill-[var(--color-text-primary)] text-[14px] font-medium">{targetFormatted}</text>
          <text x="0" y="20" textAnchor="middle" className="fill-[var(--color-accent)] text-[22px] font-bold">{yearProgress}%</text>
          <text x="0" y="35" textAnchor="middle" className="fill-[var(--color-text-secondary)] text-[8px] uppercase tracking-wider">Year Progress</text>
        </g>
      </svg>
    </div>
  );
};

export default Chronodisc;
