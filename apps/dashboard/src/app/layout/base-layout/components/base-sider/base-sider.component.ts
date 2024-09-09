import { NgTemplateOutlet } from '@angular/common';
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NAVIGATION } from '@dash/constants';
import { TranslocoDirective } from '@jsverse/transloco';
import { NavigationItem } from '@oila/config';
import { PermissionDirective } from '@oila/ui';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'dash-base-sider',
  standalone: true,
  imports: [
    NzMenuModule,
    NzIconDirective,
    NgTemplateOutlet,
    TranslocoDirective,
    PermissionDirective,
    RouterLink,
  ],
  templateUrl: './base-sider.component.html',
  styleUrl: './base-sider.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseSiderComponent {
  navigation: NavigationItem[] = NAVIGATION;
  isCollapsed = input<boolean>();
}
