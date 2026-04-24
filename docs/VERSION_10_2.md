# Orbyt v10.2 — Functional Sidebar Navigation + Pages/Subnotes Workspace

## What Changed

### Functional Sidebar Navigation

The left sidebar is now fully interactive. Every button routes to a real section:

| Sidebar Button | Renders |
|---|---|
| ⊙ Planner | Existing Chronodisc / MonthDisc / DailyDisc flow (unchanged) |
| 📄 Pages | Local Pages/Subnotes workspace backed by Dexie |
| 🗂 Templates | Disc templates placeholder listing active + planned templates |
| 🏷 Categories | All local categories with color swatches |
| 📊 Review | Today's entries, year entry count, done task count, task/event lists |
| ⚙️ Settings | App info, local-first status, integration stub status |

Active section is highlighted with the accent color. Planner Annual/Month/Day nav buttons are hidden when outside the Planner section.

### Pages / Subnotes Workspace

A fully local, Dexie-backed notes workspace. Features:
- Create top-level pages
- Select and edit page title and body (auto-saves on blur)
- Create subnotes under any page (nested one level)
- Delete page or subnote (cascade — deleting a parent also removes all its subnotes)
- Pages persist after browser refresh via IndexedDB
- Body supports plain text with a hint: type `[[Page Title]]` to reference another page (display only, no graph yet)
- Page list sorted by most recently updated

### New Dexie Schema (version 2)

A safe `version(2)` migration was added to `OrbytDatabase` adding the `pages` table. Existing `version(1)` data (entries, categories, discs) is fully preserved during upgrade.

```
pages: id (primary), parentId (index), updatedAt (index)
```

### New Store Helpers

All added to `src/core/store.ts`:
- `addPage({ title, body?, parentId? })` — creates a page or subnote
- `updatePage(id, changes)` — updates title/body/parentId
- `deletePage(id)` — deletes page and cascades to all subnotes
- `usePages()` — React hook, all top-level pages sorted by updatedAt desc
- `useChildPages(parentId)` — React hook, subnotes of a page
- `useTodayEntries()` — React hook, for Review panel
- `useYearEntryCount()` — React hook, for Review panel
- `useDoneTaskCount()` — React hook, for Review panel

### New `SectionId` Type

Exported from `AppShell.tsx`:
```ts
type SectionId = 'planner' | 'pages' | 'templates' | 'categories' | 'review' | 'settings';
```

---

## What Still Does Not Exist

- **Page graph view** — `[[Page Title]]` inline references are display-only, no link traversal or graph visualization
- **Category editing** — renaming, recoloring, adding, or removing categories is still future work
- **Template switching** — all discs still use Chronodisc Annual; template selection is a future feature
- **Review filtering** — the Review panel shows all-time counts; date range filtering is future work
- **Quarter and Week drilldown** — planned but not implemented
- **Cross-midnight arc wrapping** in DailyDisc — known limitation

---

## How to Manually Test

1. `npm run dev` → http://localhost:5173
2. Click **Pages** in sidebar → Pages workspace opens, "No pages yet" shown
3. Click **+ New** → new page created, editor opens
4. Type a title, press Tab, type body text → click Save or blur
5. Click **+ Subnote** → subnote created under current page, indented in list
6. Refresh browser → page and subnote persist
7. Click **Categories** → all 5 default categories shown with color dots
8. Click **Review** → stat cards show counts, task/event lists for today
9. Click **Settings** → version info, local-first status, integration status
10. Click **Templates** → template list with Active/Planned badges
11. Click **Planner** → Chronodisc renders exactly as before, Annual/Month/Day nav visible
12. DevTools → Network → confirm zero external API calls
