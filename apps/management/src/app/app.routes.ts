import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'category',
    loadComponent: () =>
      import('./pages/category/category.component').then(
        (c) => c.CategoryComponent
      ),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./pages/settings/settings.routes').then((r) => r.settingsRoute),
  },
];
