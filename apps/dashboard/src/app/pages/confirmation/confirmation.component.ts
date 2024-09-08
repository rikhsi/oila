import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dash-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationComponent {

}
