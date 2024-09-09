import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ERROR_ROUTE, ROOT_ROUTE } from '@oila/config/constants';
import { AuthService } from '@oila/config/services';


export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isAuthenticated = authService.isAuthenticated;

  if (isAuthenticated) {
    router.navigate([ROOT_ROUTE.error, ERROR_ROUTE.notFound]);
  }

  return !isAuthenticated;
};
