import {
  Component,
  ChangeDetectionStrategy,
  model,
  computed,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { AuthService } from '@oila/config';
import { BreadCrumbComponent } from '@oila/ui';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'dash-base-header',
  standalone: true,
  imports: [
    NzIconDirective,
    NzButtonModule,
    TranslocoModule,
    BreadCrumbComponent,
  ],
  templateUrl: './base-header.component.html',
  styleUrl: './base-header.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseHeaderComponent {
  isCollapsed = model<boolean>(false);

  toggleIcon = computed<string>(() =>
    this.isCollapsed() ? 'menu-unfold' : 'menu-fold'
  );

  constructor(private authService: AuthService, private router: Router) {}

  toggleMenu(): void {
    this.isCollapsed.set(!this.isCollapsed());
  }

  logout(): void {
    this.authService.signOut();
  }
}
