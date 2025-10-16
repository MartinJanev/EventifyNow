import { Pipe, PipeTransform } from '@angular/core';

/**
 * Formats a date range into a readable string.
 * Example: "Oct 16, 10:00 AM — 12:00 PM"
 */
@Pipe({
  name: 'dateRange',
  standalone: true,
})
export class DateRangePipe implements PipeTransform {
  /**
   * Transform start and end dates into formatted range.
   * @param startDate Start date/time
   * @param endDate End date/time
   * @returns Formatted date range string
   */
  transform(startDate: Date | null | undefined, endDate: Date | null | undefined): string {
    if (!startDate || !endDate) {
      return 'Date TBD';
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check if same day
    const sameDay = this.isSameDay(start, end);

    const dateStr = this.formatDate(start);
    const startTime = this.formatTime(start);
    const endTime = this.formatTime(end);

    if (sameDay) {
      return `${dateStr}, ${startTime} — ${endTime}`;
    } else {
      const endDateStr = this.formatDate(end);
      return `${dateStr} ${startTime} — ${endDateStr} ${endTime}`;
    }
  }

  /**
   * Check if two dates are on the same day.
   */
  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  /**
   * Format date as "Oct 16, 2025"
   */
  private formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  /**
   * Format time as "10:00 AM"
   */
  private formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }
}

export default DateRangePipe;
