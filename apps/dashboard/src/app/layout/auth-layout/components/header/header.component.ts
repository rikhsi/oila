import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { LogoComponent } from '@oila/ui';

@Component({
  selector: 'dash-header',
  standalone: true,
  imports: [
    NzLayoutModule,
    TranslocoDirective,
    NzButtonModule,
    LogoComponent,
    NzDropDownModule,
    RouterLink,
    RouterLinkActive,
    NzIconDirective,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  currentLang = toSignal<string>(this.translocoService.langChanges$);
  availableLangs = signal<string[]>(
    this.translocoService.getAvailableLangs() as string[]
  );
  onSelectLang = output<string>();

  constructor(private translocoService: TranslocoService) {}
}
