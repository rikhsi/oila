export type FilterValue<T = any> = { [key in string]: T };

export type FilterItem<T = string> = {
  label: string;
  controlName?: string;
  controlNames?: string[];
  placeholder?: string;
  value?: T;
  counter?: number;
};
