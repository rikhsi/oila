import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { ERROR_ROUTE, ROOT_ROUTE } from '@oila/config';
import { AuthService } from '@oila/config';
import { doesUserHasPermission } from '@oila/config';

export const roleGuard: CanActivateChildFn = ({ data }) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isAllowed = doesUserHasPermission([authService.roleId], data?.roles);

  if (!isAllowed) {
    router.navigate([ROOT_ROUTE.error, ERROR_ROUTE.accessDenied]);
  }

  return isAllowed;
};
