import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegistrationForm } from '@dash/typings';
import { TranslocoDirective } from '@jsverse/transloco';
import { ROOT_ROUTE, AUTH_ROUTE } from '@oila/config';
import { ValidationService, MessageService } from '@oila/config';
import { InputDefaultComponent } from '@oila/ui';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { tap, catchError, Observable, EMPTY } from 'rxjs';
import { RegistrationService } from './registration.service';
import { SellerAccountApiService } from 'libs/config/src/api/myoila.admin.api';

@Component({
  selector: 'dash-registration',
  standalone: true,
  imports: [
    InputDefaultComponent,
    TranslocoDirective,
    ReactiveFormsModule,
    NzButtonModule,
    RouterLink,
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RegistrationService],
})
export class RegistrationComponent {
  get registerForm(): FormGroup<RegistrationForm> {
    return this.registrationService.registerForm;
  }

  constructor(
    private validationService: ValidationService,
    private router: Router,
    private destroyRef: DestroyRef,
    private registrationService: RegistrationService,
    private sellerAccoutClient: SellerAccountApiService,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService
  ) {}

  register(): void {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;

      this.registerForm.disable();

      this.sellerAccoutClient
        .registerSeller({ email, password })
        .pipe(
          tap(() => {
            this.router.navigate([ROOT_ROUTE.auth, AUTH_ROUTE.confirmation], {
              queryParams: { email },
            });
          }),
          catchError(({ status }: HttpErrorResponse) =>
            this.registerError(status)
          ),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe();
    } else {
      this.validationService.updateControlStatus(this.registerForm);
    }
  }

  private registerError(status: number): Observable<never> {
    switch (status) {
      case 409:
        this.messageService.onNotifyError('register.user_exists', 10000);

        break;

      default:
        this.messageService.onNotifyError('register.error', 5000);
        break;
    }

    this.registerForm.enable();
    this.cdr.markForCheck();

    return EMPTY;
  }
}
