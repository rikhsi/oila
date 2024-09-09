import { Routes } from '@angular/router';
import { CATEGORY_PAGE } from '@oila/config';

export const categoriesRoutes: Routes = [
  {
    path: CATEGORY_PAGE.create,
    loadComponent: () => import('./pages/category-form/category-form.component').then((c) => c.CategoryFormComponent),
  },

  {
    path: `${CATEGORY_PAGE.edit}/:${CATEGORY_PAGE.categoryId}`,
    loadComponent: () => import('./pages/category-form/category-form.component').then((c) => c.CategoryFormComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/categories-list/categories-list.component').then((c) => c.CategoriesListComponent),
  },
];
