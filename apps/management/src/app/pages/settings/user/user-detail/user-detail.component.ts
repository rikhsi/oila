import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mg-user-detail',
  standalone: true,
  imports: [],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailComponent {

}
