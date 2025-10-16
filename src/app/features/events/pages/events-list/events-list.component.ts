import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { EventsDataService } from '../../../../core/services/events-data.service';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { SeedDataService } from '../../../../core/services/seed-data.service';
import { Event } from '../../../../core/models/event.model';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';

/**
 * Events list page component.
 * Displays paginated event cards with search and filter using reactive patterns.
 */
@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    EventCardComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent,
  ],
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css'],
})
export class EventsListComponent implements OnInit {
  private eventsService = inject(EventsDataService);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private seedDataService = inject(SeedDataService);
  private destroyRef = inject(DestroyRef);

  // Reactive state management
  private searchTextSubject = new BehaviorSubject<string>('');
  private cityTextSubject = new BehaviorSubject<string>('');

  events$ = this.eventsService.getEvents();
  loading = true;

  // Reactive filtered events
  filteredEvents$: Observable<Event[]> = combineLatest([
    this.events$,
    this.searchTextSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ),
    this.cityTextSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
  ]).pipe(
    map(([events, searchText, cityText]) => {
      return this.eventsService.filterEvents(events, searchText, cityText);
    })
  );

  // Two-way binding properties
  private _searchText = '';
  get searchText(): string {
    return this._searchText;
  }
  set searchText(value: string) {
    this._searchText = value;
    this.searchTextSubject.next(value);
  }

  private _cityText = '';
  get cityText(): string {
    return this._cityText;
  }
  set cityText(value: string) {
    this._cityText = value;
    this.cityTextSubject.next(value);
  }

  ngOnInit(): void {
    // Subscribe to events to handle loading state
    this.events$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: () => {
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading events:', error);
        this.toastService.showError('Error loading events');
        this.loading = false;
      },
    });
  }

  filterResults(): void {
    // Filtering is now automatic via reactive streams
    // This method is kept for compatibility with the template's search button
    this.searchTextSubject.next(this._searchText);
    this.cityTextSubject.next(this._cityText);
  }

  async deleteEvent(event: Event): Promise<void> {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${event.name}"?`
    );

    if (!confirmed) return;

    try {
      await this.eventsService.deleteEvent(event.id);
      this.toastService.showSuccess('Event deleted successfully!');
      // Firestore real-time updates will automatically refresh the list
    } catch (error) {
      console.error('Error deleting event:', error);
      this.toastService.showError('Failed to delete event. Please try again.');
    }
  }

  async logout(): Promise<void> {
    try {
      await this.authService.logout();
      this.toastService.showSuccess('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
      this.toastService.showError('Error logging out');
    }
  }

  // Manual seed data trigger for testing
  async seedDummyData(): Promise<void> {
    try {
      await this.seedDataService.seedEvents(true); // Force seed
      this.toastService.showSuccess('Dummy data seeded successfully! Events will appear shortly.');
    } catch (error) {
      console.error('Error seeding data:', error);
      this.toastService.showError('Failed to seed data. Check console for details.');
    }
  }

  // Delete all events from Firestore
  async deleteAllEvents(): Promise<void> {
    const confirmed = window.confirm(
      '⚠️ WARNING: This will delete ALL events from the database!\n\nAre you sure you want to continue?'
    );

    if (!confirmed) return;

    try {
      await this.seedDataService.deleteAllEvents();
      this.toastService.showSuccess('All events deleted successfully!');
    } catch (error) {
      console.error('Error deleting events:', error);
      this.toastService.showError('Failed to delete events. Check console for details.');
    }
  }
}
