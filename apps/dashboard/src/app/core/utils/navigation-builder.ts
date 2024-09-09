import { NavigationItem } from '@oila/config';
import { routeBuilder } from '@oila/config';

export const buildNavigation = (
  items: NavigationItem[],
  parentUrl: string = ''
): NavigationItem[] => {
  return items.map((item) => {
    const fullUrl = routeBuilder(parentUrl, item.url || '');

    if (item.children) {
      return {
        ...item,
        url: fullUrl,
        children: buildNavigation(item.children, fullUrl),
      };
    }

    return {
      ...item,
      url: fullUrl,
    };
  });
};
