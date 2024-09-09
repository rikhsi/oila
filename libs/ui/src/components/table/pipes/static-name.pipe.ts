import { Inject, Pipe, PipeTransform } from '@angular/core';
import { SELECT_ITEM_TOKEN } from '@oila/config/constants';
import { StaticOption } from '@oila/config/typings';

@Pipe({ name: 'staticName', standalone: true })
export class StaticNamePipe implements PipeTransform {
  constructor(
    @Inject(SELECT_ITEM_TOKEN) private selectItemsConfig: StaticOption
  ) {}

  transform<T>(value: T, staticName?: string): T {
    if (!!staticName) {
      const matchedConfig = this.selectItemsConfig[staticName];
      const matchedItem = matchedConfig.find((item) => item.value === value);

      return matchedItem?.label as T;
    }

    return value;
  }
}
