import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dash-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

}
