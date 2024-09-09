import { Route } from '@angular/router';
import {
  ConfirmationComponent,
  ErrorComponent,
  LoginComponent,
  RecoverComponent,
  RegistrationComponent,
} from '@dash/pages';
import { AuthLayoutComponent, BaseLayoutComponent } from '@dash/layout';
import { loadRemoteModule } from '@nx/angular/mf';
import { AUTH_ROUTE, ERROR_ROUTE, ROOT_ROUTE } from '@oila/config';
import { authGuard, roleGuard, signInGuard } from './core/guards';
import { routeBuilder } from '@oila/config';
import { EnumRole } from 'libs/config/src/api/myoila.admin.api';

export const appRoutes: Route[] = [
  {
    path: ROOT_ROUTE.auth,
    component: AuthLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: AUTH_ROUTE.login,
        loadComponent: () => LoginComponent,
      },
      {
        path: AUTH_ROUTE.registration,
        loadComponent: () => RegistrationComponent,
      },
      {
        path: AUTH_ROUTE.confirmation,
        loadComponent: () => ConfirmationComponent,
      },
      {
        path: AUTH_ROUTE.recover,
        loadComponent: () => RecoverComponent,
      },
      {
        path: '**',
        redirectTo: AUTH_ROUTE.login,
      },
    ],
  },
  {
    path: '',
    component: BaseLayoutComponent,
    canActivate: [signInGuard],
    canActivateChild: [roleGuard],
    children: [
      {
        path: ROOT_ROUTE.management,
        data: {
          roles: [EnumRole.Admin, EnumRole.Moderator],
        },
        loadChildren: () =>
          loadRemoteModule('management', './Routes').then(
            (m) => m.remoteRoutes
          ),
      },
      {
        path: ROOT_ROUTE.seller,
        data: {
          roles: [EnumRole.Seller],
        },
        loadChildren: () =>
          loadRemoteModule('seller', './Routes').then((m) => m.remoteRoutes),
      },
      {
        path: `${ROOT_ROUTE.error}/:reference`,
        loadComponent: () => ErrorComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '',
      },
      {
        path: '**',
        redirectTo: routeBuilder(ROOT_ROUTE.error, ERROR_ROUTE.notFound),
      },
    ],
  },
];
