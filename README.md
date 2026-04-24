# Orbyt

**Orbyt** is a local-first radial planning and self-organization system. It reimagines the traditional calendar as a series of concentric, temporal rings. The system focuses on visual density, giving you an at-a-glance understanding of how your tasks, events, and focus time are distributed across the year, month, or day.

## The Chronodisc
At the core of Orbyt is the **Chronodisc**—an interactive SVG-based annual radial dial. It represents time as a physical wheel. The outer ring is divided into quarters, then months, then weeks, and finally days on the inner ring. You can rotate and click into any day to see its specific contents and seamlessly drill down into a 24-hour circular dial for deep daily planning.

## Installation

1. Ensure you have Node.js installed.
2. Clone this repository.
3. Install dependencies:
   ```bash
   npm install
   ```

## How to Run

1. Start the local development server:
   ```bash
   npm run dev
   ```
2. Open your browser to `http://localhost:5173/`.
3. To build the project for production, run:
   ```bash
   npm run build
   ```

## Current Features
- **Annual Chronodisc**: A zoomable, clickable 365-day SVG radial dial.
- **Daily Drilldown**: A 24-hour radial view that visually plots tasks by their start and end times.
- **Local-First Persistence**: All data is stored instantly in your browser via Dexie/IndexedDB. Your data stays on your machine.
- **Inspector Region**: A side-panel interface to quickly create, edit, delete, and mark tasks or events.
- **Visual Markers**: Entries created in the Inspector immediately show up as color-coded dots on the Chronodisc.
- **Premium Themes**: Full support for light and dark modes with a carefully crafted, Apple-clean aesthetic.

## Current Non-Features
- **No Cloud Sync**: There is no user login or backend server syncing your data.
- **No Google Calendar / Duckbill**: While stubs exist in the codebase for future integrations, Orbyt currently does not fetch live data from any external APIs.
- **No Notifications/Alarms**: The app relies on your active interaction.

## Known Limitations
- The "Day" button in the top navigation bar requires a date to be selected first.
- **v10.1:** Month drilldown is now implemented — clicking a month ring opens a focused MonthDisc.
- The implemented drilldown path is: `Annual → Month (click ring) → Select Day → Daily View from Inspector/Topbar`.
- Quarter and Week zoom modes remain future work.
- The Daily Drilldown view does not elegantly wrap timed events that cross the midnight boundary.
- The app is desktop-first; touch interactions work but are not optimized.
