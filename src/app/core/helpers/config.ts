/**
 * Application-wide configuration constants.
 * Rate limits and resource caps for Firebase operations.
 */

/** Number of events to load per page */
export const EVENTS_PAGE_SIZE = 12;

/** Debounce time for search input (milliseconds) */
export const SEARCH_DEBOUNCE_MS = 300;

/** Maximum number of results to fetch from Firestore */
export const MAX_QUERY_RESULTS = 120;

/** Number of retry attempts for failed reads */
export const RETRY_READS = 2;

/** Maximum concurrent write operations (serialize to avoid conflicts) */
export const MAX_CONCURRENT_WRITES = 1;

/** Toast notification duration (milliseconds) */
export const TOAST_DURATION_MS = 4000;

/** Error messages */
export const ERROR_MESSAGES = {
  NETWORK: 'Network error. Please check your connection.',
  PERMISSION: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  UNKNOWN: 'An unexpected error occurred. Please try again.',
  AUTH_REQUIRED: 'Please sign in to continue.',
} as const;
