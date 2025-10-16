import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Tag chip component for displaying and filtering by tags.
 * Can be used as display-only or interactive filter.
 */
@Component({
  selector: 'app-tag-chip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      *ngIf="clickable; else staticChip"
      class="tag-chip"
      [class.active]="active"
      (click)="handleClick()"
      type="button"
      [attr.aria-pressed]="active"
    >
      {{ label }}
      <span *ngIf="active" class="remove-icon" aria-hidden="true">×</span>
    </button>

    <ng-template #staticChip>
      <span class="tag-chip static">{{ label }}</span>
    </ng-template>
  `,
  styles: [`
    .tag-chip {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.375rem 0.75rem;
      background: #e5e7eb;
      color: #374151;
      border: none;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .tag-chip:hover {
      background: #d1d5db;
    }

    .tag-chip.active {
      background: #3b82f6;
      color: white;
    }

    .tag-chip.static {
      cursor: default;
      pointer-events: none;
    }

    .remove-icon {
      font-size: 1.25rem;
      line-height: 1;
    }
  `],
})
export class TagChipComponent {
  /** Tag label text */
  @Input() label = '';

  /** Whether chip is interactive */
  @Input() clickable = false;

  /** Active/selected state */
  @Input() active = false;

  /** Emitted when chip is clicked */
  @Output() chipClick = new EventEmitter<string>();

  /**
   * Handle chip click event.
   */
  handleClick(): void {
    this.chipClick.emit(this.label);
  }
}
