import { Timestamp } from '@angular/fire/firestore';

/**
 * Event entity model.
 * Represents an event stored in Firestore.
 */
export interface Event {
  /** Firestore document ID */
  id: string;

  /** Event name/title */
  name: string;

  /** Event photo URL or base64 */
  photo: string;

  /** Event start date */
  startDate: Date;

  /** Event start time (HH:mm format) */
  startTime: string;

  /** City where event takes place */
  city: string;

  /** Country where event takes place */
  country: string;

  /** Full description/details */
  description: string;

  /** Event organizer name */
  organizer: string;

  /** Price in local currency (0 for free) */
  price: number;

  /** Last update timestamp */
  updatedAt?: Date;

  /** Creation timestamp */
  createdAt?: Date;
}

/**
 * Input model for creating/updating events.
 * Excludes auto-generated fields.
 */
export type EventInput = Omit<Event, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Firestore document data (with Timestamp objects).
 */
export interface EventFirestore {
  name: string;
  photo: string;
  startDate: Timestamp;
  startTime: string;
  city: string;
  country: string;
  description: string;
  organizer: string;
  price: number;
  updatedAt: Timestamp;
  createdAt: Timestamp;
}

/**
 * Query parameters for event list.
 */
export interface EventQueryParams {
  searchText?: string;
  tags?: string[];
  limit?: number;
  startAfter?: any;
}
