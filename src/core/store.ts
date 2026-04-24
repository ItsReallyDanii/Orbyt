import Dexie, { type Table } from 'dexie';
import { useLiveQuery } from 'dexie-react-hooks';
import type { Disc, Entry, Category, Page } from './schema';

export class OrbytDatabase extends Dexie {
  discs!: Table<Disc, string>;
  entries!: Table<Entry, string>;
  categories!: Table<Category, string>;
  pages!: Table<Page, string>;

  constructor() {
    super('OrbytDatabase');
    // version(1): original schema — discs, entries, categories
    this.version(1).stores({
      discs: 'id, year',
      entries: 'id, discId, categoryId, startDate, status',
      categories: 'id, name',
    });
    // version(2): add pages table for local Pages/Subnotes workspace
    this.version(2).stores({
      discs: 'id, year',
      entries: 'id, discId, categoryId, startDate, status',
      categories: 'id, name',
      pages: 'id, parentId, updatedAt',
    });
  }
}

export const db = new OrbytDatabase();

// Default Categories logic
export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'cat-work', name: 'Work', color: 'blue', visible: true },
  { id: 'cat-personal', name: 'Personal', color: 'green', visible: true },
  { id: 'cat-health', name: 'Health', color: 'teal', visible: true },
  { id: 'cat-events', name: 'Events', color: 'purple', visible: true },
  { id: 'cat-reminders', name: 'Reminders', color: 'yellow', visible: true },
];

export async function initializeDatabase() {
  const catCount = await db.categories.count();
  if (catCount === 0) {
    await db.categories.bulkAdd(DEFAULT_CATEGORIES);
  }
  
  const discCount = await db.discs.count();
  if (discCount === 0) {
    const currentYear = new Date().getFullYear();
    await db.discs.add({
      id: `disc-${currentYear}`,
      name: `Orbyt ${currentYear}`,
      year: currentYear,
      templateId: 'chronodisc',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
}

// Ensure DB is initialized
db.on('ready', function () {
  return initializeDatabase();
});

// Reusable local data helpers/hooks
export async function addEntry(entry: Omit<Entry, "id" | "createdAt" | "updatedAt">): Promise<string> {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  await db.entries.add({
    ...entry,
    id,
    createdAt: now,
    updatedAt: now,
    externalSource: entry.externalSource || 'manual',
    syncStatus: 'local'
  });
  return id;
}

export async function updateEntry(id: string, changes: Partial<Omit<Entry, "id" | "createdAt">>): Promise<void> {
  await db.entries.update(id, {
    ...changes,
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteEntry(id: string): Promise<void> {
  await db.entries.delete(id);
}

export function useEntriesByDate(dateStr: string) {
  // useLiveQuery is a React hook — this function must be called inside a React component only
  return useLiveQuery(
    () => db.entries.where('startDate').equals(dateStr).toArray(),
    [dateStr]
  ) ?? [];
}

export function useEntriesByDateRange(startDateStr: string, endDateStr: string) {
  // useLiveQuery is a React hook — this function must be called inside a React component only
  return useLiveQuery(
    () => db.entries.where('startDate').between(startDateStr, endDateStr, true, true).toArray(),
    [startDateStr, endDateStr]
  ) ?? [];
}

export function useCategories() {
  return useLiveQuery(() => db.categories.toArray()) ?? [];
}

export async function toggleEntryStatus(id: string, currentStatus: Entry["status"]): Promise<void> {
  const nextStatus = currentStatus === "open" ? "done" : "open";
  await updateEntry(id, { status: nextStatus });
}

// ─── Page helpers ───────────────────────────────────────────────────────────

export async function addPage(data: { title: string; body?: string; parentId?: string }): Promise<string> {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  await db.pages.add({
    id,
    title: data.title.trim() || 'Untitled',
    body: data.body ?? '',
    parentId: data.parentId,
    createdAt: now,
    updatedAt: now,
  });
  return id;
}

export async function updatePage(id: string, changes: Partial<Pick<Page, 'title' | 'body' | 'parentId'>>): Promise<void> {
  await db.pages.update(id, {
    ...changes,
    updatedAt: new Date().toISOString(),
  });
}

export async function deletePage(id: string): Promise<void> {
  // Also delete all subnotes of this page
  const children = await db.pages.where('parentId').equals(id).toArray();
  const childIds = children.map(c => c.id);
  await db.pages.bulkDelete([id, ...childIds]);
}

/** Returns all top-level pages (no parentId), sorted by updatedAt desc */
export function usePages() {
  return useLiveQuery(
    () => db.pages.filter(p => !p.parentId).sortBy('updatedAt').then(arr => arr.reverse()),
  ) ?? [];
}

/** Returns direct children (subnotes) of a given page, sorted by updatedAt desc */
export function useChildPages(parentId: string) {
  return useLiveQuery(
    () => db.pages.where('parentId').equals(parentId).sortBy('updatedAt').then(arr => arr.reverse()),
    [parentId],
  ) ?? [];
}

/** Returns all entries for today for Review panel */
export function useTodayEntries() {
  const today = new Date();
  const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  return useLiveQuery(() => db.entries.where('startDate').equals(dateStr).toArray(), [dateStr]) ?? [];
}

/** Returns total entry count for the year for Review panel */
export function useYearEntryCount() {
  const year = new Date().getFullYear();
  return useLiveQuery(
    () => db.entries.where('startDate').between(`${year}-01-01`, `${year}-12-31`, true, true).count(),
    [year],
  ) ?? 0;
}

/** Returns count of done tasks for Review panel */
export function useDoneTaskCount() {
  return useLiveQuery(() => db.entries.where('status').equals('done').count()) ?? 0;
}

