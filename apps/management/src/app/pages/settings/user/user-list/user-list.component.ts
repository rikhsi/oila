import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mg-user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {

}
