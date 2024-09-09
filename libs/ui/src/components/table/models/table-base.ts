export type TableFieldType = 'text' | 'date' | 'status';
export type TableActionType = 'edit' | 'remove' | 'open';

export type TableActionItem = {
  permissions: number[];
  actionType: TableActionType;
};

export type TableColumn = {
  label: string;
  field: string;
  fieldType?: TableFieldType;
  width?: string;
  isTranslate?: boolean;
  staticConfigName?: string;
};
