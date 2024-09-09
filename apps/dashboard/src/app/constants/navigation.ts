import { buildNavigation } from '@dash/core/utils';
import {
  MANAGEMENT_ROUTE,
  MG_SETTINGS_ROUTE,
  ROOT_ROUTE,
} from '@oila/config';
import { NavigationItem } from '@oila/config';
import { routeBuilder } from '@oila/config';

export const NAVIGATION: NavigationItem[] = buildNavigation([
  {
    title: 'options',
    icon: 'deployment-unit',
    url: routeBuilder(ROOT_ROUTE.management, MANAGEMENT_ROUTE.options),
    permissions: [],
  },
  {
    title: 'categories',
    icon: 'database',
    url: routeBuilder(ROOT_ROUTE.management, MANAGEMENT_ROUTE.category),
    permissions: [],
  },
  {
    title: 'settings',
    icon: 'setting',
    type: 'multiple',
    url: routeBuilder(ROOT_ROUTE.management, MANAGEMENT_ROUTE.settings),
    children: [
      {
        title: 'Translation',
        url: MG_SETTINGS_ROUTE.translation,
      },
    ],
  },
]);
