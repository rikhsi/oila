import { FilterItem } from '@oila/config';
import { TableActionItem, TableColumn } from '@oila/ui';

export const OPTION_COLUMNS: TableColumn[] = [
  {
    field: 'name.uz',
    label: 'name_uz',
  },
  {
    field: 'name.ru',
    label: 'name_ru',
  },
];
export const OPTION_FILTER: FilterItem[] = [
  {
    label: 'name',
    controlName: 'name_multilang',
  },
];
export const OPTION_ACTIONS: TableActionItem[] = [
  {
    permissions: [],
    actionType: 'open',
  },
];
