import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { AUTH_QUERY, AUTH_ROUTE, ROOT_ROUTE } from '@oila/config';
import { ProfileApiService } from 'libs/config/src/api/myoila.core.api';
import { Observable, of, switchMap } from 'rxjs';

export const confirmationResolver: ResolveFn<Observable<boolean>> = ({
  queryParams,
}) => {
  const profileApiService = inject(ProfileApiService);
  const router = inject(Router);
  const email = queryParams[AUTH_QUERY.email];
  const redirectLink = [ROOT_ROUTE.auth, AUTH_ROUTE.login];

  if (!!email) {
    return profileApiService.userIsNotRegistered(email).pipe(
      switchMap((isNotRegistered) => {
        if (isNotRegistered) {
          router.navigate(redirectLink);
          return of(false);
        }
        return of(true);
      })
    );
  } else {
    router.navigate(redirectLink);
    return of(false);
  }
};
