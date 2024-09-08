import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'dash-base-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './base-layout.component.html',
  styleUrl: './base-layout.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseLayoutComponent {

}
