import { Routes } from '@angular/router';
import { EventsListComponent } from './pages/events-list/events-list.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import { EventEditComponent } from './pages/event-edit/event-edit.component';
import { authRequiredGuard } from '../../core/guards/auth-required.guard';
import { eventResolver } from '../../core/guards/event.resolver';

/**
 * Events feature routes.
 * Lazy-loaded from main app routing.
 */
export const eventsRoutes: Routes = [
  {
    path: '',
    component: EventsListComponent,
  },
  {
    path: 'new',
    component: EventEditComponent,
    canActivate: [authRequiredGuard],
  },
  {
    path: ':id',
    component: EventDetailsComponent,
    resolve: {
      event: eventResolver,
    },
  },
  {
    path: ':id/edit',
    component: EventEditComponent,
    canActivate: [authRequiredGuard],
    resolve: {
      event: eventResolver,
    },
  },
];

export default eventsRoutes;

