# Integration Boundaries

This document defines the strict architectural boundaries for external data integrations (e.g., Google Calendar, Duckbill) within the Orbyt application.

## 1. Local-First Architecture
Orbyt is fundamentally a **local-first** application. The primary source of truth for all data is the local IndexedDB database, managed via Dexie (see `src/core/store.ts` and `src/core/schema.ts`).

## 2. Inbound Data Mapping
Any external adapter must act purely as a data source that syncs *into* the local Orbyt `Entry` schema. 
- Adapters (e.g., `src/integrations/googleCalendar`, `src/integrations/duckbill`) are strictly isolated.
- They must not dictate UI logic or mutate application state directly.
- External items are mapped to Orbyt's `Entry` type before being persisted locally.

## 3. Schema Support
The core `Entry` schema contains fields specifically designed to trace the origin of integrated data:
- `externalSource`: Identifies the origin system (e.g., `"google_calendar"`, `"duckbill"`).
- `externalId`: The unique identifier from the source system.
- `syncStatus`: Tracks the synchronization state (`"local"`, `"synced"`, `"conflict"`, `"unsupported"`).

## 4. Current State
As of the MVP, all adapters are **inactive stubs**. 
- There are no live API calls, OAuth flows, or cloud synchronization behaviors implemented.
- These stubs exist solely to define the types and interfaces for future development.
- UI components, stores, and runtime code MUST NOT import or execute these adapters.
