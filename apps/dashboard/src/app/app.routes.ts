import { Route } from '@angular/router';
import {
  ConfirmationComponent,
  LoginComponent,
  RecoverComponent,
  RegistrationComponent,
} from '@dash/pages';
import { AuthLayoutComponent, BaseLayoutComponent } from '@dash/layout';
import { loadRemoteModule } from '@nx/angular/mf';
import { AUTH_ROUTE, ROOT_ROUTE } from '@oila/config/constants';

export const appRoutes: Route[] = [
  {
    path: ROOT_ROUTE.auth,
    component: AuthLayoutComponent,
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
    children: [
      {
        path: ROOT_ROUTE.management,
        loadChildren: () =>
          loadRemoteModule('management', './Routes').then(
            (m) => m.remoteRoutes
          ),
      },
      {
        path: ROOT_ROUTE.seller,
        loadChildren: () =>
          loadRemoteModule('seller', './Routes').then((m) => m.remoteRoutes),
      },
    ],
  },
];
