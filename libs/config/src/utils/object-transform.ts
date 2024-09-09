import { CustomSelectItem, FilterValue } from '../typings';

export function filterByValue(formValue: FilterValue): FilterValue {
  const currentFilters: FilterValue = {};
  const clearedFilters = Object.entries(formValue).filter(
    ([, value]) => value !== undefined && value !== null && value !== ''
  );

  clearedFilters.forEach((item) => {
    currentFilters[item[0]] = item[1];
  });

  return currentFilters;
}

export function removeProperty(
  queryParams: FilterValue,
  skip: string[]
): FilterValue {
  const newQueryParams = { ...queryParams };

  skip.forEach((param) => {
    delete newQueryParams[param];
  });

  return newQueryParams;
}

export function parseQueryParam(value: string): string | boolean | number {
  if (!isNaN(Number(value)) && value.trim() !== '') {
    return Number(value);
  } else if (value.toLowerCase() === 'true') {
    return true;
  } else if (value.toLowerCase() === 'false') {
    return false;
  } else {
    return value;
  }
}

export function createSelectItem<T>(enumObj: T): CustomSelectItem[] {
  return Object.entries(enumObj)
    .filter(([key]) => isNaN(Number(key)))
    .map(([label, value]) => ({
      label,
      value: Number(value),
    }));
}
