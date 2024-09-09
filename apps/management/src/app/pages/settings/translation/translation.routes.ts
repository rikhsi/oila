import { Route } from '@angular/router';

export const translationRoute: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/translation-list/translation-list.component').then(
        (c) => c.TranslationListComponent
      ),
  }
];
