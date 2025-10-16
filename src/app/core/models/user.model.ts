import { Timestamp } from '@angular/fire/firestore';

/**
 * User role enumeration.
 */
export type UserRole = 'admin' | 'user';

/**
 * Full user profile model.
 */
export interface UserProfile {
  /** Firebase Auth UID */
  uid: string;

  /** Email address */
  email: string;

  /** Display name (optional) */
  displayName?: string;

  /** Profile photo URL (optional) */
  photoURL?: string;

  /** User role for authorization */
  role: UserRole;

  /** Account creation timestamp */
  createdAt: Date;
}

/**
 * Lightweight user summary for display.
 */
export interface UserSummary {
  uid: string;
  displayName?: string;
  photoURL?: string;
  role?: UserRole;
}

/**
 * Firestore document data for user profile.
 */
export interface UserProfileFirestore {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: UserRole;
  createdAt: Timestamp;
}

/**
 * User's starred/favorited event.
 */
export interface UserStar {
  /** Reference to event ID */
  eventId: string;

  /** When the user starred it */
  starredAt: Date;
}

/**
 * Firestore document for user star.
 */
export interface UserStarFirestore {
  eventId: string;
  starredAt: Timestamp;
}

