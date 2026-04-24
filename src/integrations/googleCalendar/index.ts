/**
 * NOT IMPLEMENTED — future adapter only.
 * 
 * This file serves as a placeholder for the future Google Calendar integration.
 * No UI components, stores, or runtime code currently import or call these adapters.
 * 
 * All external data fetched via this adapter must be mapped into the local Orbyt Entry schema.
 */

import type { Entry } from "../../core/schema";

export interface GoogleCalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
  };
  status: string;
}

export interface GoogleCalendarAdapter {
  /**
   * NOT IMPLEMENTED
   * Authenticate with Google Calendar.
   */
  authenticate(): Promise<void>;

  /**
   * NOT IMPLEMENTED
   * Fetch events from Google Calendar within a specific date range.
   */
  fetchEvents(startDate: Date, endDate: Date): Promise<GoogleCalendarEvent[]>;

  /**
   * NOT IMPLEMENTED
   * Map a Google Calendar Event to a local Orbyt Entry.
   */
  mapToOrbytEntry(event: GoogleCalendarEvent): Partial<Entry>;
}
