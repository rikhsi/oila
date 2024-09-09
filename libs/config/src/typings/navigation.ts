export type NavigationItemType = 'single' | 'multiple';

export type NavigationItem = {
  title: string;
  url?: string;
  type?: NavigationItemType;
  icon?: string;
  groupName?: string;
  permissions?: number[];
  children?: NavigationItem[];
};
