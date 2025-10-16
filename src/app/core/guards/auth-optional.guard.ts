import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthUserService } from '../services/auth-user.service';

/**
 * Guard that allows access regardless of auth state.
 * Provides user context in route data if authenticated.
 * Useful for pages that adapt based on auth status.
 */
export const authOptionalGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthUserService);

  return authService.currentUser$.pipe(
    map((user) => {
      // Always allow access, just attach user data
      route.data = { ...route.data, user };
      return true;
    })
  );
};

export default authOptionalGuard;
