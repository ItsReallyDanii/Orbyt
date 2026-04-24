export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function getDaysInYear(year: number): number {
  return isLeapYear(year) ? 366 : 365;
}

export function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 1);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  // Math.round handles daylight saving time boundary shifts correctly for local time
  return Math.round(diff / oneDay) + 1;
}

export function getDateFromDayOfYear(year: number, dayOfYear: number): Date {
  // new Date(year, 0, x) handles day overflows properly (e.g., month 0 day 32 is Feb 1)
  return new Date(year, 0, dayOfYear);
}

export function getAngleForDate(date: Date, year?: number): number {
  const targetYear = year ?? date.getFullYear();
  const daysInYear = getDaysInYear(targetYear);
  
  const start = new Date(targetYear, 0, 1);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  
  // Use floating point days for precise angles within a day
  const dayOfYearWithFraction = (diff / oneDay) + 1;
  return ((dayOfYearWithFraction - 1) / daysInYear) * 360;
}

export function getDateFromAngle(angle: number, year: number): Date {
  const daysInYear = getDaysInYear(year);
  // Normalize angle to 0-360
  const normalizedAngle = ((angle % 360) + 360) % 360;
  
  const dayOfYearWithFraction = (normalizedAngle / 360) * daysInYear + 1;
  const dayOfYear = Math.floor(dayOfYearWithFraction);
  
  // Return the start of the date
  return getDateFromDayOfYear(year, dayOfYear);
}

// Lightweight sample checks (Mental validation per Playbook rules):
// - Jan 1 angle should be approximately 0 degrees:
//     getAngleForDate(new Date(2024, 0, 1)) -> ((1 - 1) / 366) * 360 = 0
// - Dec 31 angle should be near the final day segment:
//     getAngleForDate(new Date(2024, 11, 31)) -> ((366 - 1) / 366) * 360 = ~359.01
// - 2024 has 366 days:
//     getDaysInYear(2024) -> 366
// - March 15 produces a valid angle:
//     getDayOfYear(new Date(2024, 2, 15)) -> 75 -> getAngleForDate -> ~72.78 degrees

/** Shared date formatter — produces YYYY-MM-DD from a Date object. */
export function formatDateStr(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

