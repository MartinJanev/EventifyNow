import { DocumentSnapshot } from '@angular/fire/firestore';

/**
 * Pagination state for cursor-based queries.
 */
export interface PaginationState {
  /** Last visible document for cursor */
  lastDoc: DocumentSnapshot | null;

  /** Whether more results exist */
  hasMore: boolean;

  /** Current page number (0-indexed) */
  page: number;
}

/**
 * Create initial pagination state.
 * @returns Fresh pagination state
 */
export function createPaginationState(): PaginationState {
  return {
    lastDoc: null,
    hasMore: true,
    page: 0,
  };
}

/**
 * Update pagination state after loading results.
 * @param currentState Current pagination state
 * @param docs Documents returned from query
 * @param limit Query limit used
 * @returns Updated pagination state
 */
export function updatePaginationState(
  currentState: PaginationState,
  docs: DocumentSnapshot[],
  limit: number
): PaginationState {
  return {
    lastDoc: docs.length > 0 ? docs[docs.length - 1] : currentState.lastDoc,
    hasMore: docs.length === limit,
    page: currentState.page + 1,
  };
}

/**
 * Reset pagination to initial state.
 * @returns Fresh pagination state
 */
export function resetPagination(): PaginationState {
  return createPaginationState();
}
