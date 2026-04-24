# Orbyt Final Build Playbook  
## Radial Schema Time-Planning Engine + Chronodisc MVP

**Project:** Orbyt  
**First working surface:** Chronodisc  
**Target platform:** Personal local web app  
**Primary user:** Daniel first; other users later only if the foundation earns it  
**Build environment:** Fresh start  
**Data entry:** Manual entry first  
**Storage:** Local-first with Dexie + IndexedDB  
**Visual direction:** Clean Apple-style dashboard with dark/light mode  
**Future integrations:** Google Calendar and Duckbill as inactive external adapters only  

---

# 0. How To Use This Playbook

Use this as the **single source of truth** for building Orbyt with a coding agent.

The method is:

```txt
Full playbook = project constitution
Layer prompt = current authorized action
Agent summary = inspection report
ChatGPT = project manager / validator
```

## Assembly Workflow

1. Give the coding agent this full playbook once.
2. Tell the agent to execute **only the current layer**.
3. The agent must stop after that layer.
4. The agent must return the required `Layer completed` summary.
5. Paste the summary back into ChatGPT for validation.
6. Continue only after a **PASS** or **PASS WITH FIX**.

## Control Rule

Do not ask the agent to build the entire app at once.

This project must be built layer by layer because the architecture matters more than a fast demo.

---

# 1. One-Line Control Mantra

> **Orbyt is a radial schema engine first; Chronodisc is only the first usable disc.**

Use this whenever the project starts drifting.

---

# 2. Core Product Definition

## What Orbyt Is

**Orbyt is a local-first radial planning and self-organization system where time is represented as nested circular layers that can be zoomed, drilled into, edited, and later reused as templates.**

Short version:

> **A planner you can dial into.**

More precise version:

> **A radial time-planning engine where the first schema is a chronological annual plan-disc.**

---

# 3. What Orbyt Is Not

Orbyt is **not**:

- a generic calendar app
- a Notion clone
- a Google Calendar skin
- a task app with a circular decoration
- a normal dashboard with radial charts
- an AI self-help app
- a SaaS platform in the first build

Orbyt **is**:

- a radial planning engine
- a time geometry system
- a drilldown interface
- a local-first personal planner
- a reusable schema foundation
- a future template platform

---

# 4. Chronodisc Definition

The first working surface is called:

## Chronodisc

Chronodisc is a chronological annual plan-disc.

It maps:

```txt
Year
 └── Quarter
      └── Month
           └── Week
                └── Day
                     └── Time block
                          └── Task / Event / Reminder / Note
```

Chronodisc is **not** a decorative calendar visualization.

It is the first proof that Orbyt can represent structured time through radial layers.

---

# 5. Locked Decisions

| Decision | Locked Value |
|---|---|
| Project name | `Orbyt` |
| First feature surface | `Chronodisc` |
| Target platform | Personal local web app |
| First user | Daniel |
| Build start | Fresh repo/project |
| Package manager | `npm` unless manually changed |
| App stack | React + TypeScript + Vite |
| Styling | Tailwind + CSS variables |
| Renderer | Pure SVG first |
| Storage | Dexie + IndexedDB |
| Input | Manual entry first |
| Theme | Dark + light mode required |
| Data sync | Not in first build |
| Google Calendar | Future inactive adapter only |
| Duckbill | Future inactive adapter only |
| AI check-ins | Future template only |
| Auth/cloud | Explicitly out of scope |

---

# 6. Architecture Principle

The biggest failure mode is building:

```txt
calendar app → circular UI
```

Instead, build:

```txt
radial schema engine → Chronodisc time planner
```

The code structure must follow:

```txt
schema → rings → segments → entries → UI
```

Never hardwire the system as:

```txt
date → UI
```

That distinction protects future templates, such as project timeline discs, state discs, learning discs, or self-actualization discs.

---

# 7. Global Orbyt Build Rules

Include these rules in every coding-agent prompt.

```txt
Global Orbyt build rules:
1. Build only the requested layer.
2. Stop after the requested layer.
3. Do not add authentication.
4. Do not add cloud sync.
5. Do not add Google Calendar OAuth or API calls.
6. Do not add Duckbill API calls or live integration.
7. Do not add AI assistant or AI check-in features.
8. Do not add notifications.
9. Do not add mobile-first redesigns.
10. Do not add extra libraries without explicit approval.
11. Do not convert this into a generic calendar app.
12. Preserve the architecture:
    schema → rings → segments → entries → UI.
13. Use pure functions for geometry and math.
14. Keep time/radial math outside React components.
15. Use pure SVG for radial rendering.
16. Do not use D3, Recharts, Chart.js, or a charting library.
17. Keep UI clean, desktop-first, readable, and dark/light compatible.
18. If ambiguity affects architecture, stop and ask.
19. If ambiguity is harmless, make the smallest conservative assumption and document it.
20. End with the required Layer completed summary.
```

---

# 8. Required Agent Response Format

Every coding-agent response must end with exactly:

```txt
Layer completed:
- Layer:
- Files created/changed:
- What works:
- What is intentionally not included:
- How to run:
- Validation performed:
- Known issues:
```

No long essay. No hidden “also I added…” surprises.

---

# 9. ChatGPT Validation Format

After each agent response, paste the summary back to ChatGPT using this format:

```txt
Agent output:
[Paste Layer completed summary]

My observation:
[Paste anything that looked weird, broken, ugly, confusing, or suspicious.]
```

ChatGPT should respond with:

```txt
Verdict: PASS / PASS WITH FIX / HOLD

Why:
- ...

Fix needed before next layer:
- ...

Next layer allowed:
YES / NO
```

---

# 10. Five Core Engines

## Engine 1 — Time Geometry Engine

Responsible for converting time into radial positions.

It answers:

```txt
Where does January sit?
Where does week 20 sit?
Where does May 17 sit?
How large is this segment?
What angle does this event occupy?
What ring does this object belong to?
```

Core outputs:

```ts
angleStart
angleEnd
ringInnerRadius
ringOuterRadius
labelRotation
segmentCenter
```

**Constraint:** All time → angle and time → ring logic lives in `src/core`, not inside React components.

---

## Engine 2 — Radial Renderer

Responsible for drawing the visual disc.

It renders:

- rings
- arcs
- labels
- separators
- selected segments
- hover states
- today marker
- entry markers
- center hub
- progress arcs

Use **pure SVG** first.

---

## Engine 3 — Orbyt Data Store

Responsible for persistent local data.

It stores:

- discs
- entries
- categories
- preferences
- selected state if needed

Storage:

```txt
Dexie + IndexedDB
```

No localStorage fallback unless explicitly approved later.

---

## Engine 4 — Drilldown / Focus Engine

Responsible for navigation between resolutions.

Examples:

```txt
Annual disc → selected day inspector
Annual disc → daily 24-hour disc
Daily disc → time block detail
```

---

## Engine 5 — Template Schema Engine

Responsible for keeping Orbyt reusable later.

First template:

```txt
Chronological Annual Planner
```

Future templates:

```txt
Project Timeline Disc
Self-Actualization State Disc
Business Operations Disc
Workout Cycle Disc
Learning Curriculum Disc
Content Calendar Disc
```

These are not part of the first build.

---

# 11. Recommended File Structure

Start practical, not over-fragmented.

```txt
orbyt/
  package.json
  index.html
  vite.config.ts
  tailwind.config.ts
  postcss.config.js
  tsconfig.json

  src/
    main.tsx
    App.tsx
    index.css

    app/
      AppShell.tsx
      Sidebar.tsx
      Topbar.tsx
      MainCanvas.tsx
      InspectorRegion.tsx

    core/
      time.ts
      radial.ts
      store.ts
      schema.ts

    features/
      chronodisc/
        Chronodisc.tsx
      inspector/
        Inspector.tsx
      daily/
        DailyDisc.tsx

    integrations/
      googleCalendar/
        googleCalendarAdapter.ts
        googleCalendarTypes.ts
      duckbill/
        duckbillAdapter.ts
        duckbillTypes.ts

    components/
      ui/
        Button.tsx
        Card.tsx
        Input.tsx
        Select.tsx
        Toggle.tsx

  docs/
    ORBYT_CONTROL_SPEC.md
    INTEGRATION_BOUNDARIES.md
    MANUAL_QA_CHECKLIST.md
```

If files become too large, split them during Layer 7 or Layer 9 only.

Do not over-fragment on Layer 1.

---

# 12. Core Data Model

## Disc

```ts
export type Disc = {
  id: string;
  name: string;
  year: number;
  templateId: "chronodisc" | string;
  createdAt: string;
  updatedAt: string;
};
```

## Entry

```ts
export type Entry = {
  id: string;
  discId: string;
  title: string;
  description?: string;

  kind: "task" | "event" | "reminder" | "note";
  categoryId: string;

  startDate: string; // YYYY-MM-DD
  endDate?: string;

  startTime?: string; // HH:MM
  endTime?: string;

  status: "open" | "done" | "missed" | "skipped";

  externalSource?: "manual" | "google_calendar" | "duckbill";
  externalId?: string;
  syncStatus?: "local" | "synced" | "conflict" | "unsupported";

  createdAt: string;
  updatedAt: string;
};
```

## Category

```ts
export type Category = {
  id: string;
  name: string;
  color: string;
  visible: boolean;
};
```

## Ring Schema

Full dynamic template rings can come later, but keep the type available:

```ts
export type RingSchema = {
  id: string;
  label: string;
  unit: "year" | "quarter" | "month" | "week" | "day" | "hour" | "custom";
  innerRadius: number;
  outerRadius: number;
  visible: boolean;
};
```

For Chronodisc MVP, fixed ring radii are acceptable.

---

# 13. Radial Geometry Requirements

Layer 2 must implement these exact helpers.

## Required Ring Radii

Use this default layout unless explicitly changed:

```ts
export const CHRONODISC_RINGS = {
  quarter: { inner: 250, outer: 280 },
  month: { inner: 210, outer: 245 },
  week: { inner: 175, outer: 205 },
  day: { inner: 135, outer: 170 },
  center: { inner: 0, outer: 90 },
} as const;
```

## Required Math

- Year = 360 degrees
- January 1 starts near 0 degrees
- 0 degrees points upward on the SVG
- Angles progress clockwise
- Day angle = `(dayOfYear - 1) / daysInYear * 360`
- Day segment size = `360 / daysInYear`
- Leap years must be supported

## Required Functions

```ts
isLeapYear(year: number): boolean
getDaysInYear(year: number): number
getDayOfYear(date: Date): number
getDateFromDayOfYear(year: number, dayOfYear: number): Date
getAngleForDate(date: Date, year?: number): number
getDateFromAngle(angle: number, year: number): Date
polarToCartesian(cx: number, cy: number, radius: number, angleDeg: number): { x: number; y: number }
describeArc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number): string
describeRingSegment(cx: number, cy: number, innerRadius: number, outerRadius: number, startAngle: number, endAngle: number): string
getRingRadii(level: "quarter" | "month" | "week" | "day" | "center"): { inner: number; outer: number }
getMonthSegments(year: number): Array<Segment>
getWeekSegments(year: number): Array<Segment>
getDaySegments(year: number): Array<Segment>
```

## Segment Type

```ts
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
```

## Required SVG Math Reference

Use this logic. Do not invent a charting-library replacement.

```ts
export type Point = {
  x: number;
  y: number;
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
```

---

# 14. Visual Product Requirements

The UI should feel:

```txt
Apple-clean
desktop-first
soft depth
high readability
controlled density
dark/light compatible
```

The center disc should feel like:

```txt
instrument panel
time wheel
mechanical dial
radial planner
not a decoration
```

Avoid:

- cyberpunk clutter
- generic SaaS bloat
- overfilled dashboards
- novelty UI with poor readability
- heavy animations before core behavior works
- list/calendar-grid views that compete with the radial disc

## Apple-Clean Micro-Checklist

- limited color palette
- consistent type scale
- generous but controlled spacing
- subtle borders/shadows
- strong hierarchy
- sparse accent colors
- hover/focus states
- reduced-motion compatibility
- readable dark/light contrast
- Chronodisc visually centered and prioritized

---

# 15. Main UI Layout

```txt
┌────────────────────────────────────────────────────────────┐
│ Top Bar                                                    │
├──────────┬──────────────────────────────┬──────────────────┤
│ Sidebar  │ Radial Disc Canvas           │ Inspector Panel  │
│          │                              │                  │
│          │                              │                  │
└──────────┴──────────────────────────────┴──────────────────┘
```

## Left Sidebar

Initial items:

```txt
Planner
Pages
Templates
Categories
Review
Settings
```

## Top Bar

Initial items:

```txt
Orbyt
Annual
Month
Day
Search
Theme toggle
```

**Important:** Month and Day must remain radial/focus modes, not generic grid/list calendar pages.

## Center Canvas

Must include:

```txt
Chronodisc
Today marker
Selected date indicator
Center hub
Year progress
```

## Right Inspector Panel

For selected day:

```txt
Selected date
Day of year
Week number
Month
Quarter
Tasks
Events
Reminders
Notes
```

---

# 16. Build Sequence

```txt
Layer 0  — Control Spec
Layer 1  — Fresh App Scaffold
Layer 2  — Time + Radial Geometry Engine
Layer 3  — Static Chronodisc Renderer
Layer 4  — Click Selection + Inspector
Layer 5A — Dexie Local Data Store
Layer 5B — Manual Entry UI + Disc Markers
Layer 6  — Daily 24-Hour Drilldown
Layer 7  — Theme + UI Polish
Layer 8  — Adapter Stubs
Layer 9  — Final Stabilization
```

---

# 17. Layer 0 — Control Spec

## Goal

Create a project control document inside the repo so future agents cannot misinterpret Orbyt as a generic calendar app.

## Expected Result

```txt
docs/ORBYT_CONTROL_SPEC.md
```

## Prompt

```txt
Follow ALL Global Orbyt build rules.

Build ONLY Layer 0: Control Spec.

Create:

docs/ORBYT_CONTROL_SPEC.md

The file must include:
1. Product definition.
2. What Orbyt is not.
3. First build target: Chronodisc.
4. Locked decisions.
5. Five core engines:
   - Time Geometry Engine
   - Radial Renderer
   - Orbyt Data Store
   - Drilldown / Focus Engine
   - Template Schema Engine
6. Non-goals:
   - no auth
   - no cloud sync
   - no Google Calendar
   - no Duckbill
   - no AI assistant
   - no notifications
7. The architecture rule:
   schema → rings → segments → entries → UI
   not:
   date → UI
8. Short build sequence overview.
9. Success definition.

Do not create app code.

End with the required Layer completed summary.
```

## Validation Checklist

```txt
[ ] docs/ORBYT_CONTROL_SPEC.md exists.
[ ] It says Orbyt is not a generic calendar app.
[ ] It defines Chronodisc.
[ ] It lists the five engines.
[ ] It states the schema → rings rule.
[ ] It includes all hard exclusions.
[ ] No app code was added.
```

---

# 18. Layer 1 — Fresh App Scaffold

## Goal

Create the table frame. No radial logic yet.

## Expected Result

A running React + TypeScript + Vite app with clean 4-region layout and theme toggle.

## Prompt

```txt
Follow ALL Global Orbyt build rules.

Build ONLY Layer 1: Fresh React + TypeScript + Vite + Tailwind app scaffold.

Requirements:
1. Create app shell with:
   - left sidebar
   - top bar
   - main canvas region
   - right inspector region
2. Use app name Orbyt.
3. Add sidebar placeholders:
   - Planner
   - Pages
   - Templates
   - Categories
   - Review
   - Settings
4. Add top bar:
   - Orbyt
   - Annual
   - Month
   - Day
   - Search
   - Theme toggle
5. Main canvas placeholder:
   "Chronodisc will render here."
6. Inspector placeholder:
   "Select a day to inspect."
7. Add dark/light mode with CSS variables or Tailwind class strategy.
8. Keep UI clean, Apple-style, desktop-first, and readable.

Hard rules:
- No radial geometry.
- No tasks or entries.
- No persistence.
- No integrations.
- No auth.
- No AI features.

Run install/build checks if available.

End with the required Layer completed summary.
```

## Validation Checklist

```txt
[ ] App runs locally.
[ ] Layout has sidebar/topbar/main/inspector.
[ ] Theme toggle works.
[ ] Placeholders are correct.
[ ] No radial code added.
[ ] No storage/integration/auth/AI added.
```

---

# 19. Layer 2 — Time + Radial Geometry Engine

## Goal

Create pure, testable math for turning dates into radial positions.

## Expected Result

`src/core/time.ts` and `src/core/radial.ts` with required helpers.

No UI.

## Prompt

```txt
Follow ALL Global Orbyt build rules.

Build ONLY Layer 2: Time + Radial Geometry Engine.

Create pure TypeScript utilities in:
- src/core/time.ts
- src/core/radial.ts

Implement the required functions from the playbook:
- isLeapYear
- getDaysInYear
- getDayOfYear
- getDateFromDayOfYear
- getAngleForDate
- getDateFromAngle
- polarToCartesian
- describeArc
- describeRingSegment
- getRingRadii
- getMonthSegments
- getWeekSegments
- getDaySegments

Use the exact SVG arc math reference from the playbook.
Use CHRONODISC_RINGS from the playbook.
Support leap years.
0 degrees points upward.
Angles progress clockwise.

Add lightweight sample checks or comments for:
- Jan 1 angle should be approximately 0 degrees.
- Dec 31 angle should be near the final day segment.
- 2024 has 366 days.
- March 15 produces a valid angle.

Hard rules:
- No React components.
- No rendering.
- No storage.
- No charting libraries.
- No date/angle math outside core utilities.

End with the required Layer completed summary.
```

## Validation Checklist

```txt
[ ] src/core/time.ts exists.
[ ] src/core/radial.ts exists.
[ ] Required functions exist.
[ ] SVG helpers use large-arc-flag correctly.
[ ] Leap years are handled.
[ ] No React components added.
[ ] No chart libraries added.
[ ] Geometry is importable by future components.
```

---

# 20. Layer 3 — Static Chronodisc Renderer

## Goal

Render the first visual proof: a clean annual radial disc.

## Expected Result

SVG Chronodisc appears in the main canvas.

## Prompt

```txt
Follow ALL Global Orbyt build rules.

Build ONLY Layer 3: Static Chronodisc Renderer.

Create:

src/features/chronodisc/Chronodisc.tsx

Requirements:
1. Render an SVG annual Chronodisc for the current year.
2. Use geometry from src/core/time.ts and src/core/radial.ts.
3. Render visible rings for:
   - quarters
   - months
   - weeks
   - days
4. Include a center hub showing:
   - Orbyt
   - current year
   - today
   - year progress percentage
5. Include a today marker.
6. Include a placeholder selected-date marker.
7. Replace the main canvas placeholder with the Chronodisc.
8. Keep it readable in dark/light mode.
9. Treat the disc as an instrument panel, not a decorative chart.

Hard rules:
- No click interactivity yet.
- No entries.
- No storage.
- No daily view.
- No charting libraries.
- No date/angle math inside React components.

End with the required Layer completed summary.
```

## Validation Checklist

```txt
[ ] Chronodisc renders.
[ ] Rings are visually distinct.
[ ] Center hub exists.
[ ] Today marker exists.
[ ] Year progress exists.
[ ] Dark/light mode remains readable.
[ ] No entries/storage/interactivity yet.
[ ] No generic calendar view added.
[ ] React consumes core geometry utilities.
```

---

# 21. Layer 4 — Click Selection + Inspector

## Goal

Make the disc interactive.

Click a day → update center hub and right inspector.

## Expected Result

Selected date state works.

## Prompt

```txt
Follow ALL Global Orbyt build rules.

Build ONLY Layer 4: Click Selection + Inspector.

Requirements:
1. Add selectedDate state in a clean location.
2. Clicking a day segment selects that date.
3. Highlight selected segment.
4. Center hub updates with selected date.
5. Right inspector shows:
   - selected date
   - day of year
   - week number
   - month
   - quarter
   - placeholder sections for Tasks, Events, Reminders, Notes
6. Add "Go to Today" button.
7. Use core utilities for angle/date logic.
8. Keep the radial disc as the primary surface.

Hard rules:
- No entry creation.
- No Dexie yet.
- No storage.
- No daily view.
- No integrations.
- No generic grid/list calendar.

End with the required Layer completed summary.
```

## Validation Checklist

```txt
[ ] Clicking a day selects it.
[ ] Selected segment is highlighted.
[ ] Inspector updates.
[ ] Center hub updates.
[ ] Today button works.
[ ] No storage added.
[ ] No generic calendar view added.
[ ] Selection uses core geometry utilities.
```

---

# 22. Layer 5A — Dexie Local Data Store

## Goal

Add local persistence without touching the UI too much.

## Expected Result

Dexie database, schemas, categories, and CRUD helpers exist.

## Prompt

```txt
Follow ALL Global Orbyt build rules.

Build ONLY Layer 5A: Dexie Local Data Store.

Requirements:
1. Install and configure Dexie.
2. Create or update:
   - src/core/store.ts
   - src/core/schema.ts if needed
3. Implement local tables for:
   - discs
   - entries
   - categories
4. Implement Entry, Category, and Disc types from the playbook.
5. Add default categories:
   - Work
   - Personal
   - Health
   - Events
   - Reminders
6. Create reusable local data helpers/hooks for:
   - addEntry
   - updateEntry
   - deleteEntry
   - fetchEntriesByDate
   - fetchEntriesByDateRange
   - toggleEntryStatus
7. Ensure externalSource fields exist but remain manual/local only.

Hard rules:
- No entry UI yet beyond minimal wiring if unavoidable.
- No disc markers yet.
- No Google Calendar.
- No Duckbill.
- No API calls.
- No localStorage fallback.
- No auth/cloud.

End with the required Layer completed summary.
```

## Validation Checklist

```txt
[ ] Dexie is installed/configured.
[ ] Store file exists.
[ ] Types exist.
[ ] Default categories exist.
[ ] CRUD helpers/hooks exist.
[ ] No UI overbuild.
[ ] No external integration code.
[ ] No localStorage fallback.
```

---

# 23. Layer 5B — Manual Entry UI + Disc Markers

## Goal

Make Orbyt usable.

Create/edit/delete/complete entries and render markers on the disc.

## Expected Result

Manual entries persist and appear on Chronodisc.

## Prompt

```txt
Follow ALL Global Orbyt build rules.

Build ONLY Layer 5B: Manual Entry UI + Disc Markers.

Requirements:
1. In the selected-day inspector, add UI to:
   - create task/event/reminder/note
   - edit entry
   - delete entry
   - mark task done/open
2. Connect UI to Dexie helpers from Layer 5A.
3. Entries must persist after browser refresh.
4. Render small category-colored markers on the Chronodisc for dates with entries.
5. Add category visibility toggles only if straightforward.
6. Keep the radial disc as the primary planning surface.
7. Keep forms simple and readable.

Hard rules:
- No Google Calendar.
- No Duckbill.
- No API calls.
- No daily drilldown yet.
- No notifications.
- No generic calendar/grid/list replacement.

End with the required Layer completed summary.
```

## Validation Checklist

```txt
[ ] Can create entries.
[ ] Can edit entries.
[ ] Can delete entries.
[ ] Can mark task done/open.
[ ] Entries persist after refresh.
[ ] Markers appear on correct dates.
[ ] Category colors are visible.
[ ] No external integration code.
[ ] No generic calendar replacement.
```

---

# 24. Layer 6 — Daily 24-Hour Drilldown

## Goal

Make “dialing in” real.

Selected day opens a 24-hour radial daily schedule.

## Expected Result

Daily radial view with timed entries as arcs/blocks.

## Prompt

```txt
Follow ALL Global Orbyt build rules.

Build ONLY Layer 6: Daily 24-Hour Drilldown.

Create:

src/features/daily/DailyDisc.tsx

Requirements:
1. Add "Open Daily View" from inspector or center hub.
2. Show a 24-hour circular dial for selected date.
3. Render timed entries with startTime/endTime as colored arcs or blocks.
4. Show untimed entries in an adjacent "Unscheduled" section.
5. Add clear "Back to Annual" navigation.
6. Keep visual language consistent with Chronodisc.
7. Keep daily view radial-first, not list-first.
8. Use core radial helpers where possible.

Hard rules:
- No notifications.
- No live Pomodoro/timer logic.
- No Google Calendar.
- No Duckbill.
- No AI features.
- No cloud.
- No list-only daily calendar.

End with the required Layer completed summary.
```

## Validation Checklist

```txt
[ ] Daily view opens from selected date.
[ ] 24-hour radial dial renders.
[ ] Timed entries appear in correct positions.
[ ] Untimed entries are accessible.
[ ] Back to Annual works.
[ ] No notifications/sync/auth/AI added.
[ ] Daily view is radial-first.
```

---

# 25. Layer 7 — Theme + UI Polish

## Goal

Make the app feel premium and coherent without changing architecture.

## Expected Result

Cleaner Apple-style UI, better hierarchy, better dark/light mode.

## Prompt

```txt
Follow ALL Global Orbyt build rules.

Build ONLY Layer 7: Theme + UI Polish.

Requirements:
1. Improve spacing, alignment, typography, and hierarchy.
2. Make Chronodisc the clear visual centerpiece.
3. Refine dark/light contrast and colors.
4. Improve forms, buttons, cards, and inspector readability.
5. Add subtle hover/focus transitions only where useful.
6. Respect reduced-motion preferences where reasonable.
7. Keep all existing functionality working.
8. Split large components only if it improves readability.
9. Do not change data model.
10. Do not change geometry math unless fixing a clear bug.

Hard rules:
- No new product features.
- No integrations.
- No auth/cloud.
- No AI.
- No new views.
- No generic calendar UI.

End with the required Layer completed summary.
```

## Validation Checklist

```txt
[ ] UI looks cleaner and more coherent.
[ ] Dark/light mode works well.
[ ] Chronodisc remains centerpiece.
[ ] Existing flows still work.
[ ] No architecture changes.
[ ] No random new features.
```

---

# 26. Layer 8 — Adapter Stubs

## Goal

Prepare future integration boundaries without building integrations.

## Expected Result

Inactive Google Calendar and Duckbill stubs exist but are not used by app runtime.

## Prompt

```txt
Follow ALL Global Orbyt build rules.

Build ONLY Layer 8: Adapter Stubs.

Requirements:
1. Create:
   - src/integrations/googleCalendar/
   - src/integrations/duckbill/
2. Add placeholder TypeScript types and adapter interfaces.
3. Add comments:
   "NOT IMPLEMENTED — future adapter only."
4. Confirm Entry supports:
   - externalSource
   - externalId
   - syncStatus
5. Add:
   docs/INTEGRATION_BOUNDARIES.md
6. Explain that integrations must map into the local Orbyt Entry schema later.
7. Ensure no UI components, stores, or runtime code import or call these adapters yet.

Hard rules:
- No OAuth packages.
- No API calls.
- No login.
- No environment variables for integrations.
- No cloud sync.
- No behavior changes to local app.

End with the required Layer completed summary.
```

## Validation Checklist

```txt
[ ] Google Calendar stub exists.
[ ] Duckbill stub exists.
[ ] Docs explain future boundaries.
[ ] No real API calls.
[ ] No runtime imports from integrations.
[ ] Local entries still work.
[ ] App behavior unchanged.
```

---

# 27. Layer 9 — Final Stabilization

## Goal

Make the repo stable, honest, and easy to continue later.

## Expected Result

Clean build, clear README, QA checklist, known limitations.

## Prompt

```txt
Follow ALL Global Orbyt build rules.

Build ONLY Layer 9: Final Stabilization.

Requirements:
1. Ensure npm run build succeeds.
2. Remove obvious dead code if low-risk.
3. Update README.md with:
   - what Orbyt is
   - what Chronodisc is
   - how to install
   - how to run
   - current features
   - current non-features
   - known limitations
4. Add:
   docs/MANUAL_QA_CHECKLIST.md
5. Confirm local-first behavior.
6. Confirm integrations are inactive stubs only.
7. Confirm no misleading production/SaaS claims.
8. Keep radial architecture intact.

Hard rules:
- No major new features.
- No UI rewrite.
- No auth/cloud/OAuth.
- No real integrations.
- No AI features.

End with the required Layer completed summary.
```

## Validation Checklist

```txt
[ ] Build passes.
[ ] README is clear.
[ ] QA checklist exists.
[ ] Local-first behavior works.
[ ] Future integrations are not overclaimed.
[ ] Architecture is intact.
[ ] No new features added.
```

---

# 28. Minimal Manual QA Script

Run after Layer 5B and beyond.

```txt
1. Start app.
2. Toggle dark/light mode.
3. Confirm Chronodisc renders.
4. Click today.
5. Click a different date.
6. Confirm inspector updates.
7. Add a task.
8. Add an event with time.
9. Add a note.
10. Refresh page.
11. Confirm entries persist.
12. Confirm markers still appear on disc.
13. Edit entry.
14. Delete entry.
15. Mark task complete.
16. Open daily view.
17. Confirm timed entry appears on daily dial.
18. Return to annual view.
```

---

# 29. Emergency Drift Flags

Stop immediately if the coding agent:

```txt
[ ] Adds authentication.
[ ] Adds cloud sync.
[ ] Adds Google Calendar OAuth/API calls.
[ ] Adds Duckbill API calls.
[ ] Adds AI assistant/check-ins.
[ ] Adds notifications.
[ ] Replaces SVG with a charting library.
[ ] Hardcodes date math inside React components.
[ ] Removes schema/ring abstraction.
[ ] Turns app into a normal calendar layout.
[ ] Creates huge unreviewable files.
[ ] Changes stack without asking.
[ ] Adds a mobile-first redesign.
[ ] Adds analytics dashboards.
```

---

# 30. Feature Boundary Map

## In First Build

```txt
Chronodisc annual radial planner
Clickable days
Selected-day inspector
Manual tasks/events/reminders/notes
Dexie local persistence
Category colors
Dark/light mode
Daily 24-hour radial drilldown
Inactive future adapter stubs
```

## Not In First Build

```txt
Accounts
Cloud sync
Google Calendar OAuth/live sync
Duckbill live integration
AI daily check-ins
Self-actualization scoring
Notifications
Mobile-first redesign
Team sharing
Template marketplace
Analytics dashboards
Recurring events
Complex import/export
```

---

# 31. Future Concept Parking Lot

These are valid Orbyt concepts but must not contaminate the first build.

## Google Calendar Sync

Future role:

```txt
External event import/export adapter
```

It must map into local Orbyt entries.

## Duckbill Integration

Future role:

```txt
External adapter layer
```

Likely placement:

```txt
src/integrations/duckbill/
```

## Self-Actualization Disc

Future role:

```txt
Template schema using threshold nodes and dependency chains
```

Logic idea:

```txt
A node is stable only if its own score is above threshold
and every dependency below it is also above required threshold.
```

Example:

```txt
Physiological >= 90%
Safety >= 70%
Belonging >= 60%
Esteem >= 50%
Then self-actualization is available/scorable.
```

Later this becomes:

```txt
Orbyt State Disc
```

Not part of Chronodisc.

---

# 32. Success Definition

The first Orbyt build succeeds if:

```txt
[ ] It runs locally.
[ ] It looks clean.
[ ] It has dark/light mode.
[ ] It renders an annual radial Chronodisc.
[ ] A day can be selected.
[ ] The inspector updates.
[ ] Manual entries can be created.
[ ] Entries persist locally.
[ ] Entries appear on the disc.
[ ] A daily radial drilldown exists.
[ ] Future adapters are stubbed safely and inactive.
[ ] The architecture still supports future templates.
```

The first build fails if:

```txt
[ ] It is just a normal calendar with a circular decoration.
[ ] The radial logic is hardcoded and unmaintainable.
[ ] It requires accounts or cloud.
[ ] It overbuilds integrations before the core works.
[ ] The UI is pretty but not usable.
[ ] The project cannot be continued layer by layer.
```

---

# 33. First Antigravity Instruction

Use this as the first message when starting in Antigravity with the playbook attached or pasted.

```txt
Read the full Orbyt Final Build Playbook as the source of truth.

Execute ONLY Layer 0 — Control Spec.

Follow ALL Global Orbyt build rules exactly.
Do not scaffold the app yet.
Do not write application code.
Do not proceed to Layer 1.

End with the required Layer completed summary.
```

---

# 34. Layer Execution Template

Use this after Layer 0.

```txt
Read the Orbyt Final Build Playbook and docs/ORBYT_CONTROL_SPEC.md as source of truth.

Execute ONLY Layer [X] — [Layer Name].

Follow ALL Global Orbyt build rules exactly.
Do not proceed to the next layer.
Do not add unrequested features.

End with the required Layer completed summary.
```

---

# 35. Final Operating Rule

If an agent’s output looks impressive but violates the architecture, it is a **HOLD**, not a PASS.

Pretty does not count unless the radial engine remains intact.
