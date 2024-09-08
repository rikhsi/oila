import { Route } from '@angular/router';

export const settingsRoute: Route[] = [
  {
    path: 'translation',
    loadChildren: () =>
      import('./translation/translation.routes').then(
        (r) => r.translationRoute
      ),
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.routes').then((r) => r.userRoute),
  }
];
