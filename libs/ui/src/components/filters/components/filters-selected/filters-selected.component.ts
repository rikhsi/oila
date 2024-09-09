import { ChangeDetectionStrategy, Component, model, output } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { FilterItem } from '@oila/config/typings';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'ui-filters-selected',
  templateUrl: './filters-selected.component.html',
  styleUrl: './filters-selected.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzIconDirective, TranslocoDirective, NzButtonModule, NzBadgeModule, NzToolTipModule],
})
export class FiltersSelectedComponent<T> {
  activeFilters = model<FilterItem<T>[]>([]);
  resetControl = output<string[]>();

  onReset(value: string[]): void {
    this.resetControl.emit(value);
  }
}
