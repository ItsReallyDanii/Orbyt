# ORBYT CONTROL SPEC

## 1. Product Definition
**Orbyt** is a local-first radial planning and self-organization system where time is represented as nested circular layers that can be zoomed, drilled into, edited, and later reused as templates.
- **Short version:** A planner you can dial into.
- **More precise version:** A radial time-planning engine where the first schema is a chronological annual plan-disc.

## 2. What Orbyt Is Not
Orbyt is **not**:
- a generic calendar app
- a Notion clone
- a Google Calendar skin
- a task app with a circular decoration
- a normal dashboard with radial charts
- an AI self-help app
- a SaaS platform in the first build

## 3. First Build Target: Chronodisc
The first working surface is **Chronodisc**.
It is a chronological annual plan-disc that maps:
Year → Quarter → Month → Week → Day → Time block → Task / Event / Reminder / Note.
Chronodisc is **not** a decorative calendar visualization. It is the first proof that Orbyt can represent structured time through radial layers.

## 4. Locked Decisions
- **Project name:** Orbyt
- **First feature surface:** Chronodisc
- **Target platform:** Personal local web app
- **First user:** Daniel
- **Build start:** Fresh repo/project
- **Package manager:** npm unless manually changed
- **App stack:** React + TypeScript + Vite
- **Styling:** Tailwind + CSS variables
- **Renderer:** Pure SVG first
- **Storage:** Dexie + IndexedDB
- **Input:** Manual entry first
- **Theme:** Dark + light mode required
- **Data sync:** Not in first build
- **Google Calendar:** Future inactive adapter only
- **Duckbill:** Future inactive adapter only
- **AI check-ins:** Future template only
- **Auth/cloud:** Explicitly out of scope

## 5. Five Core Engines
1. **Time Geometry Engine:** Converts time into radial positions.
2. **Radial Renderer:** Draws the visual disc using pure SVG.
3. **Orbyt Data Store:** Persistent local data using Dexie + IndexedDB.
4. **Drilldown / Focus Engine:** Handles navigation between resolutions (e.g., Annual disc → daily 24-hour disc).
5. **Template Schema Engine:** Ensures the system can be reused for other templates beyond the initial Chronodisc.

## 6. Non-Goals
For this build, there will be:
- no auth
- no cloud sync
- no Google Calendar
- no Duckbill
- no AI assistant
- no notifications

## 7. The Architecture Rule
The code structure must follow:
**schema → rings → segments → entries → UI**

Never hardwire the system as:
~~date → UI~~

## 8. Short Build Sequence Overview
- **Layer 0** — Control Spec
- **Layer 1** — Fresh App Scaffold
- **Layer 2** — Time + Radial Geometry Engine
- **Layer 3** — Static Chronodisc Renderer
- **Layer 4** — Click Selection + Inspector
- **Layer 5A** — Dexie Local Data Store
- **Layer 5B** — Manual Entry UI + Disc Markers
- **Layer 6** — Daily 24-Hour Drilldown
- **Layer 7** — Theme + UI Polish
- **Layer 8** — Adapter Stubs
- **Layer 9** — Final Stabilization

## 9. Success Definition
Success is the delivery of a stable, local-first web application that fulfills all Layer 1-9 requirements, successfully implements the Chronodisc visual planner using pure SVG and the specified architecture, and avoids all excluded features (no auth, no sync, no integrations).
