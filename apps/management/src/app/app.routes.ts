import { Route } from '@angular/router';
import { MANAGEMENT_ROUTE } from '@oila/config';

export const appRoutes: Route[] = [
  {
    path: MANAGEMENT_ROUTE.settings,
    loadChildren: () =>
      import('./pages/settings/settings.routes').then((r) => r.settingsRoute),
  },
  {
    path: MANAGEMENT_ROUTE.options,
    loadChildren: () =>
      import('./pages/options/options.routes').then((r) => r.optionRoutes),
    data: { breadcrumb: { label: 'options', icon: 'deployment-unit' } },
  },
  {
    path: MANAGEMENT_ROUTE.category,
    loadChildren: () =>
      import('./pages/categories/categories.routes').then(
        (r) => r.categoriesRoutes
      ),
  },
];
