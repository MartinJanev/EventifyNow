import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { EventsDataService } from '../../../../core/services/events-data.service';
import { Event } from '../../../../core/models/event.model';
import { ToastService } from '../../../../core/services/toast.service';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

/**
 * Event details page component.
 * Displays full event information with actions.
 */
@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingSpinnerComponent],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private eventsService = inject(EventsDataService);
  private toastService = inject(ToastService);

  event$!: Observable<Event | undefined>;
  eventData: Event | undefined;
  loading = true;

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.event$ = this.eventsService.getEventById(id);

    this.event$.subscribe({
      next: (event) => {
        this.eventData = event;
        this.loading = false;
        window.scrollTo(0, 0);
      },
      error: (error) => {
        console.error('Error loading event:', error);
        this.loading = false;
      },
    });
  }

  attendEvent(): void {
    this.toastService.showSuccess('You have successfully registered for this event!');
  }
}
