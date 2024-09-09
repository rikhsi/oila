import { Routes } from '@angular/router';
import { OPTION_PAGE } from '@oila/config';

export const optionRoutes: Routes = [
  {
    path: OPTION_PAGE.create,
    loadComponent: () =>
      import('./pages/option-form/option-form.component').then(
        (c) => c.OptionFormComponent
      ),
    data: { breadcrumb: { label: 'option_create', icon: 'plus-circle' } },
  },
  {
    path: `${OPTION_PAGE.edit}/:${OPTION_PAGE.optionId}`,
    loadComponent: () =>
      import('./pages/option-form/option-form.component').then(
        (c) => c.OptionFormComponent
      ),
    data: { breadcrumb: { label: 'option_edit', icon: 'edit' } },
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/option-list/option-list.component').then(
        (c) => c.OptionListComponent
      ),
  },
];
