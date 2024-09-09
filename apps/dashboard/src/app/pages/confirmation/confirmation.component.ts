import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {
  EMPTY,
  catchError,
  debounceTime,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs';
import { ConfirmationService } from './confirmation.service';
import moment from 'moment';
import { InputDefaultComponent } from '@oila/ui/components';
import { CapitalizePipe } from '@oila/ui/pipes';
import { MessageService, TimerService } from '@oila/config/services';
import { AUTH_QUERY } from '@oila/config/constants';
import { SellerAccountApiService } from '@oila/config/api/myoila.admin.api';

@Component({
  selector: 'dash-confirmation',
  standalone: true,
  imports: [
    InputDefaultComponent,
    NzButtonModule,
    ReactiveFormsModule,
    TranslocoModule,
    CapitalizePipe,
  ],
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TimerService, ConfirmationService],
})
export class ConfirmationComponent implements OnInit {
  email = toSignal<string>(
    this.route.queryParams.pipe(map((params) => params[AUTH_QUERY.email]))
  );

  secondsLeft = toSignal<string>(
    this.timerService.secondsLeft$.pipe(
      map((seconds) => moment(seconds).format('mm:ss'))
    )
  );

  sendAgainEnabled = toSignal<boolean>(
    this.timerService.secondsLeft$.pipe(map((seconds) => seconds > 0))
  );

  get codeControl(): FormControl<string> {
    return this.confirmationService.codeControl;
  }

  constructor(
    private destroyRef: DestroyRef,
    private route: ActivatedRoute,
    private timerService: TimerService,
    private confirmationService: ConfirmationService,
    private sellerAccountClient: SellerAccountApiService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.resendActivationCode();
    this.submit();
  }

  resendActivationCode(): void {
    this.timerService.resetTimer(60);

    this.sellerAccountClient
      .resendActivationCode(this.email())
      .pipe(
        tap(() => this.messageService.onNotifySuccess('code_send')),
        catchError(() => {
          this.messageService.onNotifyError('code_send_error');

          return EMPTY;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private submit(): void {
    this.codeControl.valueChanges
      .pipe(
        debounceTime(500),
        filter((value) => value.length === 6),
        tap(() => {
          this.codeControl.disable({ emitEvent: false });
          this.cdr.markForCheck();
        }),
        switchMap(() =>
          this.confirmationService.submit$(this.email()).pipe(
            tap(() =>
              this.messageService.onNotifySuccess('registration_success')
            ),
            catchError(() => {
              this.codeControl.enable({ emitEvent: false });
              this.cdr.markForCheck();

              this.messageService.onNotifyError('wrong_code', 10000);

              return EMPTY;
            })
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
