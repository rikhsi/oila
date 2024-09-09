import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { TranslationPipe } from '../../pipes/translation.pipe';
import { TableActionComponent } from '../table-action/table-action.component';
import { StaticNamePipe } from '../../pipes/static-name.pipe';
import { TableColumn } from '../../models';

@Component({
  selector: 'ui-table-field',
  templateUrl: './table-field.component.html',
  styleUrl: './table-field.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DatePipe, TranslationPipe, TableActionComponent, StaticNamePipe],
})
export class TableFieldComponent<T> {
  column = input<TableColumn>();
  data = input<T>();
  dateType = input<string>('dd.MM.yyyy');

  transformedData = computed<T>(() => this.transformer());

  private transformer(): T {
    const field = this.column()?.field;
    const data = this.data();
    const keys = field.split('.');

    return keys.reduce((acc, key) => acc && acc?.[key], data);
  }
}
