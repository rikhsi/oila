import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import {
  TableActionComponent,
  TableFieldComponent,
  TableFooterComponent,
} from './components';
import { TranslocoDirective } from '@jsverse/transloco';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgClass } from '@angular/common';
import { TableActionItem, TableColumn } from './models';
import { ZorroFilterRequest } from 'libs/config/src/api/myoila.core.api';

@Component({
  selector: 'ui-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    TableFieldComponent,
    TableFooterComponent,
    TranslocoDirective,
    NzTableModule,
    NgClass,
    TableActionComponent,
  ],
})
export class TableComponent<T> {
  data = input<T[]>([]);
  columns = input<TableColumn[]>([]);
  total = input<number>(0);
  pageSizeOption = input<number[]>([10, 20, 40, 50]);
  pageSize = signal<number>(10);
  loading = input<boolean>(false);
  pageIndex = signal<number>(1);
  tableMeta = model<ZorroFilterRequest>();
  actions = input<TableActionItem[]>([]);
  dateType = input<string>('dd.MM.YYYY');

  edit = output<T>();
  remove = output<T>();
  open = output<T>();

  onQuearyParams(params: NzTableQueryParams) {
    this.tableMeta.set({
      pageIndex: params.pageIndex - 1,
      pageSize: params.pageSize,
      sort: null,
      filter: params.filter.map((filterItem) => ({
        key: filterItem.key,
        value: filterItem.value,
      })),
    });
  }
}
