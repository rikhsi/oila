import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@oila/config/services';
import { redirectByRole } from '@oila/config/utils';

export const signInGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const isAuthenticated = authService.isAuthenticated;
  const router = inject(Router);

  if (!isAuthenticated) {
    authService.signOut();

    return false;
  }

  if (state.url.length === 1) {
    router.navigate(redirectByRole(authService.roleId));
  }

  return true;
};
