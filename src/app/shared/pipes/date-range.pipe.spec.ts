import { DateRangePipe } from './date-range.pipe';

/**
 * Unit tests for DateRangePipe.
 * Tests date range formatting logic.
 */
describe('DateRangePipe', () => {
  let pipe: DateRangePipe;

  beforeEach(() => {
    pipe = new DateRangePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return "Date TBD" for null dates', () => {
    expect(pipe.transform(null, null)).toBe('Date TBD');
    expect(pipe.transform(undefined, undefined)).toBe('Date TBD');
  });

  it('should format same-day event correctly', () => {
    const start = new Date('2025-10-16T10:00:00');
    const end = new Date('2025-10-16T12:00:00');
    const result = pipe.transform(start, end);

    expect(result).toContain('Oct 16');
    expect(result).toContain('10:00');
    expect(result).toContain('12:00');
    expect(result).toContain('—');
  });

  it('should format multi-day event correctly', () => {
    const start = new Date('2025-10-16T10:00:00');
    const end = new Date('2025-10-17T12:00:00');
    const result = pipe.transform(start, end);

    expect(result).toContain('Oct 16');
    expect(result).toContain('Oct 17');
    expect(result).toContain('—');
  });

  it('should handle edge case: midnight to midnight', () => {
    const start = new Date('2025-10-16T00:00:00');
    const end = new Date('2025-10-16T23:59:00');
    const result = pipe.transform(start, end);

    expect(result).toContain('Oct 16');
    expect(result).toContain('12:00 AM');
    expect(result).toContain('11:59 PM');
  });

  it('should format times with AM/PM correctly', () => {
    const start = new Date('2025-10-16T09:30:00');
    const end = new Date('2025-10-16T14:15:00');
    const result = pipe.transform(start, end);

    expect(result).toMatch(/9:30 AM/);
    expect(result).toMatch(/2:15 PM/);
  });
});

