# Manual QA Checklist

This checklist is used to verify the core functionality of the Orbyt MVP before marking a build as stable.

## 1. Application Launch & UI
- [ ] Application starts without console errors.
- [ ] Dark mode and light mode toggle correctly via the top right theme button.
- [ ] Typography, spacing, and styling remain clean and legible in both modes.
- [ ] Main canvas correctly renders the annual Chronodisc view by default.

## 2. Chronodisc Interaction
- [ ] Hovering over ring segments highlights them smoothly.
- [ ] Clicking a day segment updates the Inspector Region with the selected date.
- [ ] The "Today" marker clearly identifies the current date.
- [ ] Year progress percentage in the center hub is mathematically sound (e.g. ~50% in early July).

## 3. Data Persistence (Local-First)
- [ ] Creating a new Task, Event, Reminder, or Note successfully saves to Dexie/IndexedDB.
- [ ] Deleting an entry successfully removes it.
- [ ] Toggling a task status visually updates the item and saves state.
- [ ] Refreshing the browser preserves all created entries (persisted locally).
- [ ] Editing an entry title and times (start/end) successfully saves the changes.
- [ ] Creating entries automatically creates visual colored markers on the Chronodisc day segments.

## 4. Daily Drilldown View
- [ ] Clicking "Daily View" from the Inspector switches the canvas to the 24-hour radial dial.
- [ ] Timed entries accurately map to their hours on the clock ring.
- [ ] Untimed entries appear in the "Unscheduled" side panel.
- [ ] Clicking "← Back to Annual" successfully returns to the Chronodisc.

## 5. Security & Isolation
- [ ] No network requests are made to external SaaS APIs (Google Calendar, Duckbill).
- [ ] Integration folders (`src/integrations/`) contain only inactive stub interfaces.
- [ ] No OAuth windows or login flows are present.
