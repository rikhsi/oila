import { Route } from '@angular/router';
import {
  ConfirmationComponent,
  LoginComponent,
  RecoverComponent,
  RegistrationComponent,
} from '@dash/pages';
import { AuthLayoutComponent, BaseLayoutComponent } from '@dash/layout';
import { loadRemoteModule } from '@nx/angular/mf';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => LoginComponent,
      },
      {
        path: 'registration',
        loadComponent: () => RegistrationComponent,
      },
      {
        path: 'confirmation',
        loadComponent: () => ConfirmationComponent,
      },
      {
        path: 'recover',
        loadComponent: () => RecoverComponent,
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: 'management',
        loadChildren: () =>
          loadRemoteModule('management', './Routes').then(
            (m) => m.remoteRoutes
          ),
      },
      {
        path: 'seller',
        loadChildren: () =>
          loadRemoteModule('seller', './Routes').then((m) => m.remoteRoutes),
      },
    ],
  },
];
