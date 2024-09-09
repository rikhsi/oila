import { Route } from '@angular/router';
import { MANAGEMENT_ROUTE } from '@oila/config/constants';

export const appRoutes: Route[] = [
  {
    path: MANAGEMENT_ROUTE.category,
    loadComponent: () =>
      import('./pages/category/category.component').then(
        (c) => c.CategoryComponent
      ),
  },
  {
    path: MANAGEMENT_ROUTE.settings,
    loadChildren: () =>
      import('./pages/settings/settings.routes').then((r) => r.settingsRoute),
  },
];
