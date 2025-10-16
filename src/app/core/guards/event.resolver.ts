import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, EMPTY, Observable, map } from 'rxjs';
import { Event } from '../models/event.model';
import { EventsDataService } from '../services/events-data.service';
import { ToastService } from '../services/toast.service';

/**
 * Resolver that fetches event by ID from route params.
 * Redirects to /events if event not found (404).
 */
export const eventResolver: ResolveFn<Event | null> = (route): Observable<Event | null> => {
  const eventsService = inject(EventsDataService);
  const router = inject(Router);
  const toastService = inject(ToastService);

  const id = route.paramMap.get('id');

  if (!id) {
    toastService.error('Event ID is required');
    router.navigate(['/events']);
    return EMPTY;
  }

  return eventsService.getById(id).pipe(
    map((event) => event || null),
    catchError((error) => {
      console.error('Event resolver error:', error);
      toastService.error('Event not found');
      router.navigate(['/events']);
      return EMPTY;
    })
  );
};
