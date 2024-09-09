import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { LoginService } from './login.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, catchError } from 'rxjs';
import { InputDefaultComponent } from '@oila/ui/components';
import { LoginForm } from '@dash/typings';
import { MessageService, ValidationService } from '@oila/config/services';
import { AUTH_ROUTE } from '@oila/config/constants';

@Component({
  selector: 'dash-login',
  standalone: true,
  imports: [
    InputDefaultComponent,
    NzIconModule,
    ReactiveFormsModule,
    NzButtonModule,
    TranslocoDirective,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LoginService],
})
export class LoginComponent {
  get loginForm(): FormGroup<LoginForm> {
    return this.loginService.loginForm;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private destroyRef: DestroyRef,
    private validationService: ValidationService,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService
  ) {}

  login(): void {
    if (this.loginForm.valid) {
      this.loginForm.disable();

      this.loginService
        .login$()
        .pipe(
          catchError(() => {
            this.messageService.onNotifyError('login.error', 5000);

            this.loginForm.enable();
            this.cdr.markForCheck();

            return EMPTY;
          }),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe({});
    } else {
      this.validationService.updateControlStatus(this.loginForm);
    }
  }

  register(): void {
    this.router.navigate([AUTH_ROUTE.registration], {
      relativeTo: this.route.parent,
    });
  }
}
