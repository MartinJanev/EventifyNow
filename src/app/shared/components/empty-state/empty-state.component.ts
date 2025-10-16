import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Empty state component for when no data is available.
 * Displays icon, message, and optional action button.
 */
@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="empty-state" role="status">
      <div class="empty-icon">{{ icon }}</div>
      <h3 class="empty-title">{{ title }}</h3>
      <p class="empty-message">{{ message }}</p>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem 1rem;
      text-align: center;
      color: #6b7280;
    }

    .empty-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }

    .empty-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #374151;
      margin: 0 0 0.5rem 0;
    }

    .empty-message {
      font-size: 0.875rem;
      max-width: 400px;
      margin: 0 0 1.5rem 0;
      line-height: 1.5;
    }
  `],
})
export class EmptyStateComponent {
  /** Icon to display (emoji or text) */
  @Input() icon = '📭';

  /** Title text */
  @Input() title = 'No data found';

  /** Description message */
  @Input() message = 'There is nothing to display at the moment.';
}

