import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { TranslocoDirective } from '@jsverse/transloco';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'ui-drawer',
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.less',
  standalone: true,
  imports: [NzDrawerModule, TranslocoDirective, NzIconDirective, NzButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerComponent {
  isVisible = model<boolean>();
  showTitle = model<boolean>(true);
  
  width = input<number | string>(420);
  placement = input<NzDrawerPlacement>('right');
  title = input<string>();
  hideActions = input<boolean>(false);
  disabled = input<boolean>();

  onSubmit = output<void>();
  onReset = output<void>();
  onClose = output<void>();

  closeDrawer(): void {
    this.isVisible.set(false);
    this.onClose.emit();
  }
}
