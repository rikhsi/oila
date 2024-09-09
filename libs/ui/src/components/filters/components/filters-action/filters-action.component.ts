import { ChangeDetectionStrategy, Component, model, output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'ui-filters-action',
  templateUrl: './filters-action.component.html',
  styleUrl: './filters-action.component.less',
  standalone: true,
  imports: [NzIconDirective, NzButtonModule, NzBadgeModule, TranslocoDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersActionComponent {
  openDrawer = output<void>();
  isDot = model<boolean>();
}
