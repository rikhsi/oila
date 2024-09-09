import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { PermissionDirective } from 'libs/ui/src/directives';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { TranslocoDirective } from '@jsverse/transloco';
import { TableActionItem } from '../../models';


@Component({
  selector: 'ui-table-action',
  standalone: true,
  imports: [PermissionDirective, NzIconDirective, NzButtonModule, NzPopoverModule, TranslocoDirective],
  templateUrl: './table-action.component.html',
  styleUrl: './table-action.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableActionComponent<T> {
  actions = input<TableActionItem[]>([]);
  actionPermissions = computed<number[]>(() => this.actions().flatMap((v) => v.permissions));

  data = input<T>();

  edit = output<T>();
  remove = output<T>();
  open = output<T>();

  onEdit(): void {
    this.edit.emit(this.data());
  }

  onRemove(): void {
    this.remove.emit(this.data());
  }

  onOpen(): void {
    this.open.emit(this.data());
  }
}
