import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  DestroyRef,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { ROOT_ROUTE, AUTH_ROUTE } from '@oila/config';
import { ValidationService, MessageService } from '@oila/config';
import { COLLAPSE } from '@oila/ui';
import { InputDefaultComponent } from '@oila/ui';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Observable, EMPTY, tap, catchError } from 'rxjs';
import { RecoverService } from './recover.service';
import { AccountApiService } from 'libs/config/src/api/myoila.admin.api';

@Component({
  selector: 'dash-recover',
  standalone: true,
  imports: [
    TranslocoDirective,
    NzButtonModule,
    InputDefaultComponent,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './recover.component.html',
  styleUrl: './recover.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RecoverService],
  animations: [COLLAPSE],
})
export class RecoverComponent {
  isCodeSent = signal(false);
  sumbitButtonText = computed<string>(() =>
    this.isCodeSent() ? 'submit' : 'send_code'
  );

  get recoverForm(): FormGroup<any> {
    return this.recoverService.recoverForm;
  }

  constructor(
    private accountClient: AccountApiService,
    private router: Router,
    private recoverService: RecoverService,
    private destroyRef: DestroyRef,
    private validationService: ValidationService,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService
  ) {}

  submit(): void {
    if (this.isCodeSent()) {
      this.resetPassword();
    } else {
      this.sendCode();
    }
  }

  private enableForm(): void {
    this.recoverForm.enable();
    this.cdr.markForCheck();
  }

  private resetPasswordError(status: number): Observable<never> {
    switch (status) {
      case 404:
        this.messageService.onNotifyError('code.user_not_found', 10000);
        break;

      default:
        this.messageService.onNotifyError('code.send_error', 10000);

        break;
    }

    this.enableForm();

    return EMPTY;
  }

  private sendCode(): void {
    const emailControl = this.recoverForm.get('email');

    if (emailControl.valid) {
      this.recoverForm.disable();

      this.accountClient
        .sendRequestToResetPassword(emailControl.value)
        .pipe(
          tap(() => this.isCodeSent.set(true)),
          tap(() => this.messageService.onNotifySuccess('code.send', 10000)),
          tap(() => this.recoverForm.markAsPristine()),
          tap(() => this.enableForm()),
          catchError(({ status }: HttpErrorResponse) =>
            this.resetPasswordError(status)
          ),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe();
    } else {
      this.validationService.updateControlStatus(this.recoverForm);
    }
  }

  private resetPassword(): void {
    const { code, email, password } = this.recoverForm.value;

    if (this.recoverForm.valid) {
      this.recoverForm.disable();

      this.accountClient
        .resetPassword({ code, email, password })
        .pipe(
          tap(() =>
            this.messageService.onNotifySuccess(
              'password.update_success',
              10000
            )
          ),
          tap(() => this.router.navigate([ROOT_ROUTE.auth, AUTH_ROUTE.login])),
          catchError(() => {
            this.messageService.onNotifyError('password.update_error', 30000);

            this.enableForm();

            return EMPTY;
          }),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe();
    } else {
      this.validationService.updateControlStatus(this.recoverForm);
    }
  }
}
