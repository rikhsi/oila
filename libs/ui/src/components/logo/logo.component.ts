import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { SHRINK_TEXT } from '../../animations';

@Component({
  selector: 'ui-logo',
  standalone: true,
  imports: [TranslocoPipe, NzButtonModule],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [SHRINK_TEXT]
})
export class LogoComponent {
  isCollapsed = input<boolean>(false);
  isInfo = input<boolean>();
  clicked = output<void>();
}
