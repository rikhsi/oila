import { Route } from '@angular/router';

export const translationRoute: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./translation-list/translation-list.component').then(
        (c) => c.TranslationListComponent
      ),
  },
  {
    path: ':translationId',
    loadComponent: () =>
      import('./translation-form/translation-form.component').then(
        (c) => c.TranslationFormComponent
      ),
  },
];
