import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dash-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent {

}
