import Dexie, { type Table } from 'dexie';
import { useLiveQuery } from 'dexie-react-hooks';
import type { Disc, Entry, Category } from './schema';

export class OrbytDatabase extends Dexie {
  discs!: Table<Disc, string>;
  entries!: Table<Entry, string>;
  categories!: Table<Category, string>;

  constructor() {
    super('OrbytDatabase');
    this.version(1).stores({
      discs: 'id, year',
      entries: 'id, discId, categoryId, startDate, status',
      categories: 'id, name',
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

export function fetchEntriesByDate(dateStr: string) {
  // Using dexie-react-hooks wrapper
  return useLiveQuery(
    () => db.entries.where('startDate').equals(dateStr).toArray(),
    [dateStr]
  ) ?? [];
}

export function fetchEntriesByDateRange(startDateStr: string, endDateStr: string) {
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
