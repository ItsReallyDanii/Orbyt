export type Disc = {
  id: string;
  name: string;
  year: number;
  templateId: "chronodisc" | string;
  createdAt: string;
  updatedAt: string;
};

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

export type Category = {
  id: string;
  name: string;
  color: string;
  visible: boolean;
};

export type RingSchema = {
  id: string;
  label: string;
  unit: "year" | "quarter" | "month" | "week" | "day" | "hour" | "custom";
  innerRadius: number;
  outerRadius: number;
  visible: boolean;
};

export type Page = {
  id: string;
  title: string;
  body: string;
  /** Optional parentId — if set, this is a subnote of another page */
  parentId?: string;
  createdAt: string;
  updatedAt: string;
};

