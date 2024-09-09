import {
  AfterContentInit,
  Directive,
  Inject,
  computed,
  contentChild,
  input,
} from '@angular/core';
import { SELECT_ITEM_TOKEN } from '@oila/config/constants';
import {
  CustomSelectItem,
  StaticOption,
  StaticOptionComponent,
} from '@oila/config/typings';

@Directive({
  selector: '[uiOptionStatic]',
  standalone: true,
})
export class OptionStaticDirective implements AfterContentInit {
  staticName = input<string>(null, {
    alias: 'uiOptionStatic',
  });

  selectedItems = computed<CustomSelectItem[]>(
    () => this.selectItemsConfig?.[this.staticName()] ?? []
  );

  component = contentChild<StaticOptionComponent>('optionStatic', {
    descendants: true,
  });

  constructor(
    @Inject(SELECT_ITEM_TOKEN) private selectItemsConfig: StaticOption
  ) {}

  ngAfterContentInit(): void {
    this.assignOptions();
  }

  private assignOptions(): void {
    if (this.component()?.options()) {
      this.component().options.set(this.selectedItems());
    }
  }
}
