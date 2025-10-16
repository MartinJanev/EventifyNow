import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from '@angular/fire/firestore';
import { Event, EventFirestore } from '../models/event.model';
import { UserProfile, UserProfileFirestore } from '../models/user.model';

/**
 * Safely convert Firestore Timestamp to Date.
 */
export function timestampToDate(timestamp: Timestamp | null | undefined): Date {
  if (timestamp && timestamp.toDate) {
    return timestamp.toDate();
  }
  console.warn('Invalid timestamp, using current date as fallback');
  return new Date();
}

/**
 * Convert Date to Firestore Timestamp.
 */
export function dateToTimestamp(date: Date): Timestamp {
  return Timestamp.fromDate(date);
}

/**
 * Firestore converter for Event documents.
 */
export const eventConverter: FirestoreDataConverter<Event> = {
  toFirestore(event: any): DocumentData {
    const data: any = {
      name: event.name,
      photo: event.photo,
      startTime: event.startTime,
      city: event.city,
      country: event.country,
      description: event.description,
      organizer: event.organizer,
      price: event.price || 0,
    };

    if (event.startDate) {
      data.startDate = event.startDate instanceof Date ? dateToTimestamp(event.startDate) : event.startDate;
    }
    if (event.updatedAt) {
      data.updatedAt = event.updatedAt instanceof Date ? dateToTimestamp(event.updatedAt) : event.updatedAt;
    }
    if (event.createdAt) {
      data.createdAt = event.createdAt instanceof Date ? dateToTimestamp(event.createdAt) : event.createdAt;
    }

    return data;
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot<EventFirestore>,
    options?: SnapshotOptions
  ): Event {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      name: data.name || '',
      photo: data.photo || '',
      startDate: timestampToDate(data.startDate),
      startTime: data.startTime || '',
      city: data.city || '',
      country: data.country || '',
      description: data.description || '',
      organizer: data.organizer || '',
      price: data.price || 0,
      updatedAt: timestampToDate(data.updatedAt),
      createdAt: timestampToDate(data.createdAt),
    };
  },
};

/**
 * Firestore converter for UserProfile documents.
 */
export const userProfileConverter: FirestoreDataConverter<UserProfile> = {
  toFirestore(user: any): DocumentData {
    const data: any = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: user.role || 'user',
    };

    if (user.createdAt) {
      data.createdAt = user.createdAt instanceof Date ? dateToTimestamp(user.createdAt) : user.createdAt;
    }

    return data;
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot<UserProfileFirestore>,
    options?: SnapshotOptions
  ): UserProfile {
    const data = snapshot.data(options);
    return {
      uid: data.uid || snapshot.id,
      email: data.email || '',
      displayName: data.displayName,
      photoURL: data.photoURL,
      role: data.role || 'user',
      createdAt: timestampToDate(data.createdAt),
    };
  },
};

export default {
  eventConverter,
  userProfileConverter,
  timestampToDate,
  dateToTimestamp,
};
