# Orbyt Technical QA Audit Playbook

## Purpose

This document is a structured QA / beta-tester audit guide for the Orbyt Chronodisc MVP.

Use it after the Layer 0-9 build is complete to inspect the application from a technical product, UX, and stability point of view.

This is not a feature-building prompt. The goal is to identify what works, what is broken, what is confusing, and what should be fixed before the next development pass.

---

## Recommended Model

Use **Claude Sonnet 4.6** for the first QA pass.

Use **Claude Opus 4.6** only for a deeper architecture/code-quality audit after the basic QA pass.

| Task | Recommended model |
|---|---|
| Manual product QA / beta tester review | Claude Sonnet 4.6 |
| UI/UX clarity review | Claude Sonnet 4.6 |
| Quick issue list / bug triage | Claude Sonnet 4.6 |
| Code architecture audit | Claude Opus 4.6 |
| Deep refactor planning | Claude Opus 4.6 |

Default: **Claude Sonnet 4.6**.

---

## QA Role Definition

Act as a strict technical QA auditor, product beta tester, and frontend workflow inspector.

Inspect Orbyt as it exists now. Do not imagine future features.

Classify findings as:

- **Bug** — intended behavior fails.
- **Known limitation** — documented non-feature or deferred scope.
- **UX confusion** — works technically but is unclear to a user.
- **Architecture concern** — code or state design may create future maintenance problems.
- **Future enhancement** — useful later, but not required for MVP correctness.

---

## Current MVP Scope

Orbyt currently supports:

- Local React + TypeScript + Vite app.
- Dark/light mode.
- Annual Chronodisc radial planner.
- Clickable day selection.
- Selected-day inspector.
- Dexie / IndexedDB local persistence.
- Manual tasks, events, reminders, and notes.
- Create/edit/delete entries.
- Task open/done toggle.
- Entry markers on Chronodisc.
- Daily 24-hour radial drilldown.
- Inactive Google Calendar and Duckbill adapter stubs.

---

## Known Non-Features

Do not mark these as bugs unless documentation claims they work:

- Month zoom mode.
- Week zoom mode.
- Quarter zoom mode.
- Topbar Month / Day navigation behavior.
- Real Google Calendar integration.
- Real Duckbill integration.
- OAuth or login.
- Cloud sync.
- Notifications.
- Pomodoro / live timer logic.
- Mobile-first layout.
- Category visibility controls.
- Recurring events.
- Cross-midnight timed event wrapping.

These can be listed as future enhancements or UX clarity issues, but not MVP failures.

---

## Audit Setup

Run from repo root:

```bash
npm install
npm run build
npm run dev
```

Open:

```txt
http://localhost:5173
```

Use browser DevTools during the audit.

Check:

- Console errors.
- Network requests.
- IndexedDB contents.
- Layout overflow.
- Interaction failures.
- Light/dark contrast.

---

## Audit Pass 1 — Build & Runtime

- [ ] `npm install` completes.
- [ ] `npm run build` completes.
- [ ] `npm run dev` launches app.
- [ ] App opens without white screen.
- [ ] Browser console has no recurring runtime errors.
- [ ] No unexpected external network requests occur.
- [ ] IndexedDB database appears as `OrbytDatabase`.
- [ ] Dexie tables exist for discs, entries, categories.

---

## Audit Pass 2 — Core Navigation

- [ ] App opens on annual Chronodisc.
- [ ] Sidebar renders cleanly.
- [ ] Topbar renders cleanly.
- [ ] Inspector renders cleanly.
- [ ] Dark/light toggle works.
- [ ] Annual Chronodisc is the visual center.
- [ ] Topbar Month / Day placeholders do not mislead too much.
- [ ] Daily View is reachable from selected-day Inspector.
- [ ] Back to Annual works from Daily View.

Treat unclear Topbar Month / Day affordance as **UX confusion**, not a functional bug.

---

## Audit Pass 3 — Chronodisc Interaction

- [ ] Clicking day segments selects a date.
- [ ] Selected segment is visually highlighted.
- [ ] Inspector updates to selected date.
- [ ] Center hub updates to selected date.
- [ ] Today marker is visible.
- [ ] Year progress percentage appears reasonable.
- [ ] Dense day segments remain clickable enough on desktop.
- [ ] Radial markers do not block day selection.
- [ ] SVG stays within visible bounds.
- [ ] Light/dark mode remains readable.

Common issues:

- Very small click targets.
- Day selected does not match expected date.
- Marker dots visually overcrowd.
- Labels overlap or disappear unexpectedly.
- Disc feels decorative instead of operational.

---

## Audit Pass 4 — Entry CRUD

For Task, Event, Reminder, and Note, test:

- [ ] Create entry.
- [ ] Entry appears in Inspector.
- [ ] Entry persists after refresh.
- [ ] Entry marker appears on Chronodisc.
- [ ] Edit title.
- [ ] Edit start/end time.
- [ ] Delete entry.
- [ ] Empty title is rejected or safely ignored.

Additional task checks:

- [ ] Task can toggle open/done.
- [ ] Done state persists after refresh.
- [ ] Done task visual styling is readable.

Common issues:

- Entry saves under wrong date.
- Entry marker appears on wrong segment.
- Edit mode loses existing data.
- Cancel accidentally saves changes.
- Long text wraps badly in narrow inspector.

---

## Audit Pass 5 — Daily 24-Hour Drilldown

- [ ] Select a day.
- [ ] Add timed entry with start and end time.
- [ ] Open Daily View.
- [ ] Timed entry appears as radial arc/block.
- [ ] Untimed entries appear in Unscheduled panel.
- [ ] Back to Annual works.
- [ ] Edited time updates the daily dial after save.
- [ ] Multiple entries render without crashing.
- [ ] Overlapping entries are understandable enough for MVP.

Known limitation:

- Cross-midnight entries are not handled yet.

Do not mark cross-midnight behavior as a blocker unless it crashes the app.

---

## Audit Pass 6 — Local-First / Integration Boundary

- [ ] App works without login.
- [ ] App works without cloud account.
- [ ] Entries persist locally after refresh.
- [ ] No Google API calls occur.
- [ ] No Duckbill API calls occur.
- [ ] No OAuth windows appear.
- [ ] `src/integrations/` files are inactive stubs only.
- [ ] Runtime UI/store files do not import integration adapters.
- [ ] README accurately states integrations are future-only.

---

## Audit Pass 7 — Accessibility & Usability

- [ ] Buttons have visible hover/focus behavior.
- [ ] Keyboard can reach important controls.
- [ ] Inputs can be used without mouse.
- [ ] Text contrast is readable in both themes.
- [ ] Important controls are not hidden only on hover if keyboard users need them.
- [ ] Theme toggle is understandable.
- [ ] Daily View / Back to Annual flow is discoverable.
- [ ] Inspector is not too cramped for normal use.

Likely issues:

- Hover-only edit/delete buttons may be less accessible.
- Icon-only controls may need labels or aria-labels.
- SVG day segments may need title/aria improvements.

---

## Audit Pass 8 — Architecture Spot Check

Inspect:

- `src/core/time.ts`
- `src/core/radial.ts`
- `src/core/schema.ts`
- `src/core/store.ts`
- `src/features/chronodisc/Chronodisc.tsx`
- `src/features/daily/DailyDisc.tsx`
- `src/app/InspectorRegion.tsx`

Check:

- [ ] Date/radial math remains in `src/core`.
- [ ] React components do not reinvent heavy geometry logic.
- [ ] No charting libraries are used.
- [ ] Dexie remains local-first.
- [ ] Integration stubs are not imported at runtime.
- [ ] Components are large but still understandable.
- [ ] Known hook naming issue is noted: `fetchEntriesByDate` behaves like a hook.

Architecture concerns to flag:

- Hooks named like normal fetch functions.
- Large Inspector component accumulating too much behavior.
- Chronodisc becoming too dense.
- Time parsing logic duplicated between Inspector and DailyDisc.

---

## Severity Scale

### BLOCKER

App cannot build, cannot run, or core data flow is broken.

### HIGH

Core MVP works, but a major promised flow is broken.

### MEDIUM

Usability or reliability issue that should be fixed soon.

### LOW

Polish, copy, accessibility enhancement, or documented limitation.

---

## Required Auditor Output Format

```txt
# Orbyt Technical QA Audit

## Overall Verdict
PASS / PASS WITH FIXES / HOLD

## Summary
- ...

## Tested Environment
- OS:
- Browser:
- Node version:
- Command(s) run:

## Critical Findings
| Severity | Type | Finding | Evidence | Recommended Fix |
|---|---|---|---|---|

## MVP Scope Accuracy
- What is correctly implemented:
- What is documented as limitation:
- What may confuse users:

## Manual QA Results
- Build/runtime:
- Chronodisc:
- Entry CRUD:
- Daily view:
- Local-first/integrations:
- Accessibility:

## Architecture Notes
- ...

## Recommended Fix Queue
### Must fix before next feature work
1. ...

### Should fix soon
1. ...

### Future enhancements
1. ...

## Next-Step Recommendation
Proceed / Fix first / Re-audit needed
```

---

## Prompt To Send To An LLM Auditor

```txt
You are acting as a strict technical QA auditor, product beta tester, and frontend workflow inspector.

Review the Orbyt repository and running local app.

Repository: https://github.com/ItsReallyDanii/Orbyt

Use docs/TECHNICAL_QA_AUDIT.md as your audit checklist and source of truth.

Important project context:
Orbyt is a local-first radial planning system. It is not a generic calendar app. The first MVP is Chronodisc: an annual radial planner with selected-day inspection, local Dexie entries, entry markers, and a daily 24-hour radial drilldown.

Do not request new features. Do not treat documented non-features as bugs.

Classify findings as:
- Bug
- Known limitation
- UX confusion
- Architecture concern
- Future enhancement

Return the audit in the Required Auditor Output Format from docs/TECHNICAL_QA_AUDIT.md.
```

---

## Final QA Rule

If Orbyt looks visually impressive but core flows fail, the verdict is **HOLD**.

If core flows work but UX has clear friction, the verdict is **PASS WITH FIXES**.

If core flows, local persistence, daily drilldown, and integration boundaries all work, the verdict is **PASS**.
