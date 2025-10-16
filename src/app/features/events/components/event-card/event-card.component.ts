import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Event } from '../../../../core/models/event.model';

/**
 * Event card component for displaying event summary.
 * Used in event list grids.
 */
@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css'],
})
export class EventCardComponent {
  /** Event data to display */
  @Input({ required: true }) event!: Event;

  /** Whether event is starred by current user */
  @Input() starred = false;

  /** Emitted when star button is clicked */
  @Output() starToggle = new EventEmitter<string>();

  /** Emitted when delete event is triggered */
  @Output() delete = new EventEmitter<Event>();

  /**
   * Handle star button click.
   */
  onStarClick(eventId: string, domEvent: MouseEvent): void {
    domEvent.preventDefault();
    domEvent.stopPropagation();
    this.starToggle.emit(eventId);
  }

  /**
   * Handle delete action.
   */
  onDelete(): void {
    this.delete.emit(this.event);
  }
}

export default EventCardComponent;
