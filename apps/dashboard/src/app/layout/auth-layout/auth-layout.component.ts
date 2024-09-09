import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { FooterComponent, HeaderComponent } from './components';

@Component({
  selector: 'dash-auth-layout',
  standalone: true,
  imports: [RouterOutlet, TranslocoDirective, HeaderComponent, FooterComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLayoutComponent {
  currentLang = toSignal<string>(this.translocoService.langChanges$);
  availableLangs = signal<string[]>(this.translocoService.getAvailableLangs() as string[]);

  constructor(private translocoService: TranslocoService) {}

  onChangeLang(lang: string): void {
    this.translocoService.setActiveLang(lang);
  }
}
