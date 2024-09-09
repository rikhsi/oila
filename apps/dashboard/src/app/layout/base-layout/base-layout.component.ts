import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { BaseHeaderComponent, BaseSiderComponent } from './components';
import { RouterOutlet } from '@angular/router';
import { BaseLayoutService } from './base-layout.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';
import { LogoComponent } from '@oila/ui/components';

@Component({
  selector: 'dash-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrl: './base-layout.component.less',
  standalone: true,
  imports: [
    NzLayoutModule,
    BaseHeaderComponent,
    BaseSiderComponent,
    LogoComponent,
    RouterOutlet,
    NgClass,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseLayoutComponent {
  isCollapsed = signal<boolean>(false);
  isEmpty = toSignal<boolean>(this.blService.isEmpty$);

  constructor(private blService: BaseLayoutService) {}
}
