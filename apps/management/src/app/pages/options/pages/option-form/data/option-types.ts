import { CustomSelectItem } from '@oila/config';
import {
  EnumOptionType,
  EnumOptionViewType,
} from 'libs/config/src/api/myoila.admin.api';

export const optionTypes: CustomSelectItem[] = [
  {
    label: 'custom',
    value: EnumOptionType.Custom,
  },
  {
    label: 'selectable',
    value: EnumOptionType.Selectable,
  },
];

export const optionViewTypes: CustomSelectItem[] = [
  {
    label: 'button',
    value: EnumOptionViewType.Button,
  },
  {
    label: 'color',
    value: EnumOptionViewType.Color,
  },
];
