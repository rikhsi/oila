import { FilterItem } from '@oila/config';
import { TableActionItem, TableColumn } from '@oila/ui';

export const TRANSLATION_COLUMN: TableColumn[] = [
  {
    field: 'key',
    label: 'key',
  },
  {
    field: 'project',
    label: 'project',
    staticConfigName: 'project',
    isTranslate: true,
  },
  {
    field: 'name.uz',
    label: 'name_uz',
  },
  {
    field: 'name.ru',
    label: 'name_ru',
  },
  {
    field: 'createdDate',
    fieldType: 'date',
    label: 'date',
    width: '200px',
  },
];

export const TRANSLATION_FILTER: FilterItem[] = [
  {
    label: 'key',
    controlName: 'key',
  },
  {
    label: 'name',
    controlName: 'name_multilang',
  },
];

export const TRANSLATION_ACTIONS: TableActionItem[] = [
  {
    permissions: [],
    actionType: 'open',
  },
];
