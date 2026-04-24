import { getDaysInYear, getDateFromDayOfYear } from "./time";

export const CHRONODISC_RINGS = {
  quarter: { inner: 250, outer: 280 },
  month: { inner: 210, outer: 245 },
  week: { inner: 175, outer: 205 },
  day: { inner: 135, outer: 170 },
  center: { inner: 0, outer: 90 },
} as const;

export type Point = {
  x: number;
  y: number;
};

export type Segment = {
  id: string;
  label: string;
  startDate: string;
  endDate: string;
  startAngle: number;
  endAngle: number;
  innerRadius: number;
  outerRadius: number;
};

export function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
): Point {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

export function describeArc(
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string {
  const start = polarToCartesian(centerX, centerY, radius, endAngle);
  const end = polarToCartesian(centerX, centerY, radius, startAngle);

  const arcSweep = endAngle - startAngle;
  const largeArcFlag = Math.abs(arcSweep) <= 180 ? "0" : "1";

  return [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
}

export function describeRingSegment(
  centerX: number,
  centerY: number,
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number
): string {
  const outerStart = polarToCartesian(centerX, centerY, outerRadius, endAngle);
  const outerEnd = polarToCartesian(centerX, centerY, outerRadius, startAngle);
  const innerStart = polarToCartesian(centerX, centerY, innerRadius, startAngle);
  const innerEnd = polarToCartesian(centerX, centerY, innerRadius, endAngle);

  const arcSweep = endAngle - startAngle;
  const largeArcFlag = Math.abs(arcSweep) <= 180 ? "0" : "1";

  return [
    "M",
    outerStart.x,
    outerStart.y,
    "A",
    outerRadius,
    outerRadius,
    0,
    largeArcFlag,
    0,
    outerEnd.x,
    outerEnd.y,
    "L",
    innerStart.x,
    innerStart.y,
    "A",
    innerRadius,
    innerRadius,
    0,
    largeArcFlag,
    1,
    innerEnd.x,
    innerEnd.y,
    "Z",
  ].join(" ");
}

export function getRingRadii(level: "quarter" | "month" | "week" | "day" | "center"): { inner: number; outer: number } {
  return CHRONODISC_RINGS[level];
}

// Helper to format date strings consistently
function formatDate(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function getQuarterSegments(year: number): Array<Segment> {
  const daysInYear = getDaysInYear(year);
  const { inner: innerRadius, outer: outerRadius } = getRingRadii("quarter");
  const segments: Segment[] = [];
  
  const quarters = [
    { label: "Q1", startMonth: 0, endMonth: 2 },
    { label: "Q2", startMonth: 3, endMonth: 5 },
    { label: "Q3", startMonth: 6, endMonth: 8 },
    { label: "Q4", startMonth: 9, endMonth: 11 },
  ];

  let startDayOfYear = 1;

  for (let i = 0; i < quarters.length; i++) {
    const q = quarters[i];
    const startDate = new Date(year, q.startMonth, 1);
    const endDate = new Date(year, q.endMonth + 1, 0); // last day of quarter

    // Calculate days in quarter
    let daysInQuarter = 0;
    for (let m = q.startMonth; m <= q.endMonth; m++) {
      daysInQuarter += new Date(year, m + 1, 0).getDate();
    }
    
    const endDayOfYear = startDayOfYear + daysInQuarter - 1;

    const startAngle = ((startDayOfYear - 1) / daysInYear) * 360;
    const endAngle = (endDayOfYear / daysInYear) * 360;

    segments.push({
      id: `quarter-${year}-${i + 1}`,
      label: q.label,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      startAngle,
      endAngle,
      innerRadius,
      outerRadius
    });

    startDayOfYear += daysInQuarter;
  }

  return segments;
}

export function getMonthSegments(year: number): Array<Segment> {
  const daysInYear = getDaysInYear(year);
  const { inner: innerRadius, outer: outerRadius } = getRingRadii("month");
  const segments: Segment[] = [];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  let startDayOfYear = 1;

  for (let month = 0; month < 12; month++) {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0); // last day of month
    
    const daysInMonth = endDate.getDate();
    const endDayOfYear = startDayOfYear + daysInMonth - 1;

    const startAngle = ((startDayOfYear - 1) / daysInYear) * 360;
    const endAngle = (endDayOfYear / daysInYear) * 360;

    segments.push({
      id: `month-${year}-${month + 1}`,
      label: monthNames[month],
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      startAngle,
      endAngle,
      innerRadius,
      outerRadius
    });

    startDayOfYear += daysInMonth;
  }

  return segments;
}

export function getWeekSegments(year: number): Array<Segment> {
  const daysInYear = getDaysInYear(year);
  const { inner: innerRadius, outer: outerRadius } = getRingRadii("week");
  const segments: Segment[] = [];
  
  let currentDayOfYear = 1;
  let weekNumber = 1;

  while (currentDayOfYear <= daysInYear) {
    const startAngle = ((currentDayOfYear - 1) / daysInYear) * 360;
    
    let daysInThisWeek = 7;
    if (currentDayOfYear + 6 > daysInYear) {
      daysInThisWeek = daysInYear - currentDayOfYear + 1; // last partial week
    }
    
    const endDayOfYear = currentDayOfYear + daysInThisWeek - 1;
    const endAngle = (endDayOfYear / daysInYear) * 360;

    const startDate = getDateFromDayOfYear(year, currentDayOfYear);
    const endDate = getDateFromDayOfYear(year, endDayOfYear);

    segments.push({
      id: `week-${year}-${weekNumber}`,
      label: `W${weekNumber}`,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      startAngle,
      endAngle,
      innerRadius,
      outerRadius
    });

    currentDayOfYear += daysInThisWeek;
    weekNumber++;
  }

  return segments;
}

export function getDaySegments(year: number): Array<Segment> {
  const daysInYear = getDaysInYear(year);
  const { inner: innerRadius, outer: outerRadius } = getRingRadii("day");
  const segments: Segment[] = [];

  for (let dayOfYear = 1; dayOfYear <= daysInYear; dayOfYear++) {
    const startAngle = ((dayOfYear - 1) / daysInYear) * 360;
    const endAngle = (dayOfYear / daysInYear) * 360;

    const date = getDateFromDayOfYear(year, dayOfYear);

    segments.push({
      id: `day-${year}-${dayOfYear}`,
      label: String(date.getDate()),
      startDate: formatDate(date),
      endDate: formatDate(date),
      startAngle,
      endAngle,
      innerRadius,
      outerRadius
    });
  }

  return segments;
}
