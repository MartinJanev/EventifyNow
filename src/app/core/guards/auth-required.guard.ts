import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthUserService } from '../services/auth-user.service';
import { ToastService } from '../services/toast.service';
import { ERROR_MESSAGES } from '../helpers/config';

/**
 * Guard that requires user authentication.
 * Redirects to home if user is not signed in.
 */
export const authRequiredGuard: CanActivateFn = () => {
  const authService = inject(AuthUserService);
  const router = inject(Router);
  const toastService = inject(ToastService);

  return authService.authState$.pipe(
    map((user) => {
      if (user) {
        return true;
      }

      toastService.error(ERROR_MESSAGES.AUTH_REQUIRED);
      return router.createUrlTree(['/']);
    })
  );
};

export default authRequiredGuard;
