import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  collectionData,
  docData,
  query,
  orderBy,
  Timestamp,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventsDataService {
  private firestore = inject(Firestore);
  private eventsCollection = collection(this.firestore, 'events');

  /**
   * Convert Firestore Timestamp to JavaScript Date
   */
  private convertTimestamps(data: any): any {
    if (!data) return data;

    const converted = { ...data };

    // Convert startDate if it's a Timestamp
    if (converted.startDate?.toDate) {
      converted.startDate = converted.startDate.toDate();
    }

    // Convert createdAt if it's a Timestamp
    if (converted.createdAt?.toDate) {
      converted.createdAt = converted.createdAt.toDate();
    }

    // Convert updatedAt if it's a Timestamp
    if (converted.updatedAt?.toDate) {
      converted.updatedAt = converted.updatedAt.toDate();
    }

    return converted;
  }

  /**
   * Get all events from Firestore
   */
  getEvents(): Observable<Event[]> {
    const q = query(this.eventsCollection, orderBy('startDate', 'desc'));
    return (collectionData(q, { idField: 'id' }) as Observable<any[]>).pipe(
      map((events) => events.map((event) => this.convertTimestamps(event) as Event))
    );
  }

  /**
   * Get a single event by ID
   */
  getEventById(id: string): Observable<Event | undefined> {
    const eventDoc = doc(this.firestore, 'events', id);
    return (docData(eventDoc, { idField: 'id' }) as Observable<any>).pipe(
      map((event) => (event ? this.convertTimestamps(event) as Event : undefined))
    );
  }

  /**
   * Alias for getEventById (used by resolver)
   */
  getById(id: string): Observable<Event | undefined> {
    return this.getEventById(id);
  }

  /**
   * Add a new event to Firestore
   */
  async addEvent(event: Partial<Event>): Promise<void> {
    try {
      const eventData = {
        ...event,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };
      await addDoc(this.eventsCollection, eventData);
    } catch (error) {
      console.error('Error adding event:', error);
      throw error;
    }
  }

  /**
   * Update an existing event
   */
  async updateEvent(id: string, event: Partial<Event>): Promise<void> {
    try {
      const eventDoc = doc(this.firestore, 'events', id);
      await updateDoc(eventDoc, {
        ...event,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  }

  /**
   * Delete an event
   */
  async deleteEvent(id: string): Promise<void> {
    try {
      const eventDoc = doc(this.firestore, 'events', id);
      await deleteDoc(eventDoc);
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }

  /**
   * Filter events by search criteria
   */
  filterEvents(events: Event[], searchTerm: string, city?: string): Event[] {
    return events.filter((event) => {
      const matchesName = searchTerm
        ? event.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      const matchesCity = city
        ? event.city.toLowerCase().includes(city.toLowerCase())
        : true;
      return matchesName && matchesCity;
    });
  }
}
