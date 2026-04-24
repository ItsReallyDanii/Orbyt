/**
 * NOT IMPLEMENTED — future adapter only.
 * 
 * This file serves as a placeholder for the future Duckbill integration.
 * No UI components, stores, or runtime code currently import or call these adapters.
 * 
 * All external data fetched via this adapter must be mapped into the local Orbyt Entry schema.
 */

import type { Entry } from "../../core/schema";

export interface DuckbillTask {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  status: "open" | "completed" | "canceled";
}

export interface DuckbillAdapter {
  /**
   * NOT IMPLEMENTED
   * Authenticate with Duckbill.
   */
  authenticate(): Promise<void>;

  /**
   * NOT IMPLEMENTED
   * Fetch tasks from Duckbill.
   */
  fetchTasks(): Promise<DuckbillTask[]>;

  /**
   * NOT IMPLEMENTED
   * Map a Duckbill Task to a local Orbyt Entry.
   */
  mapToOrbytEntry(task: DuckbillTask): Partial<Entry>;
}
