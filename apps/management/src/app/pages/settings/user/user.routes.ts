import { Route } from '@angular/router';

export const userRoute: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./user-list/user-list.component').then(
        (c) => c.UserListComponent
      ),
  },
  {
    path: ':userId',
    loadComponent: () =>
      import('./user-detail/user-detail.component').then(
        (c) => c.UserDetailComponent
      ),
  },
];
