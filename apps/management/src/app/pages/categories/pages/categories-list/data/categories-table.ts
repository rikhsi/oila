import { TableActionItem, TableColumn } from '@oila/ui';

export const CATEGORIES_COLUMNS: TableColumn[] = [
  {
    field: 'namme',
    label: 'name',
  },
  {
    field: 'parent',
    label: 'parent',
  },
];

export const CATEGORIES_FILTER = [
  {
    label: 'name',
    controlName: 'name',
  },
  {
    label: 'parent',
    controlName: 'parent',
  },
];

export const CATEGORIES_ACTIONS: TableActionItem[] = [
  {
    permissions: [],
    actionType: 'open',
  },
];
