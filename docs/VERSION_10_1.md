# Orbyt v10.1 — Nested Chronological Drilldown

## What Changed

### New: Month Drilldown View

Orbyt now supports a focused monthly disc view. Clicking any **month ring segment** on the annual Chronodisc opens a dedicated `MonthDisc` for that month.

The MonthDisc renders:
- All days of the month as equal 360° arcs (clickable to select a date)
- Week subdivision arcs in a secondary inner ring
- Day-of-week labels (Sun, Mon, …) at the outer edge of each day segment
- Weekend days with a subtle visual distinction
- Entry markers on days that have entries
- A today accent line
- A dashed selected-date marker
- Center hub showing year, month name, and day count

### Navigation Architecture

The app now has three view modes: `'annual'`, `'month'`, `'daily'`.

| Action | Result |
|---|---|
| Click month ring on Chronodisc | Opens MonthDisc for that month |
| Click day in MonthDisc | Selects that date, updates Inspector |
| Click "Daily View" in Inspector | Opens 24-hour DailyDisc |
| Click "Annual" back button | Returns to annual Chronodisc |
| Topbar Annual | Returns to annual Chronodisc |
| Topbar Month | Opens focused MonthDisc for selectedDate's month (requires selectedDate) |
| Topbar Day | Opens DailyDisc (requires selectedDate) |

### Breadcrumb Trail

A breadcrumb appears at the top-left of the canvas in nested views:
- `← Annual → April` in month view
- `← Annual → April → Mon 24` in daily view
- The month name in daily breadcrumb is clickable to return to that month

### Topbar Buttons

- **Annual** — always active, always clickable
- **Month** — enabled when a selectedDate exists; shows tooltip with month name
- **Day** — enabled when a selectedDate exists; shows tooltip with selected date
- Disabled state: `opacity-40 cursor-not-allowed`, tooltip: "Select a day first"

### New Core Utilities

Two new exported geometry functions in `src/core/radial.ts`:
- `getMonthDaySegments(year, month)` — 360° day segments for a single month
- `getMonthWeekSegments(year, month)` — week arc subdivisions for a single month

---

## What Still Does Not Exist

- **Quarter drilldown** — clicking a quarter ring does nothing (future work)
- **Week drilldown** — no dedicated week view (future work)
- **Month/Week/Quarter zoom on the annual disc** — the annual Chronodisc still shows all 365 days at once; no zoom
- **Google Calendar integration** — stubs only, inactive
- **Duckbill integration** — stubs only, inactive
- **Cross-midnight timed event wrapping** in DailyDisc
- **Auth / cloud sync / OAuth** — none

---

## How to Manually Test Nested Navigation

1. **Start the app:** `npm run dev` → open http://localhost:5173
2. **Annual renders:** Confirm Chronodisc is visible with ring layers and today marker.
3. **Click a month ring** (e.g. hover over "Apr" ring segment, it brightens on hover, tooltip reads "Open April") → MonthDisc opens.
4. **MonthDisc inspection:** Confirm month name in center hub, correct number of days, week arcs visible.
5. **Click a day** inside MonthDisc → Inspector updates with that date.
6. **Add an entry** while a day is selected → confirm it saves (persists after refresh).
7. **Entry marker:** Confirm a colored dot appears on the correct day in MonthDisc.
8. **Back to Annual:** Click the `← Annual` button → Chronodisc renders again.
9. **Confirm entry marker in Annual too:** The entry should appear as a dot on the Chronodisc.
10. **Topbar Month:** With a selectedDate, click "Month" → MonthDisc for that date's month opens.
11. **Topbar Day:** With a selectedDate, click "Day" → DailyDisc opens.
12. **Topbar Annual:** Click "Annual" → annual Chronodisc.
13. **Breadcrumb:** In daily view, confirm the month name in the breadcrumb is clickable (returns to month view).
14. **No network requests:** DevTools → Network → confirm 0 external API calls.
