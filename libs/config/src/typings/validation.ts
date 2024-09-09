import { AbstractControl } from '@angular/forms';
import { VALIDATION_ERROR } from '../constants';
import {
  DestroyRef,
  Directive,
  ElementRef,
  Injector,
  input,
  model,
} from '@angular/core';
import { NzValidateStatus } from 'ng-zorro-antd/core/types';
import { ValidationService } from '../services';
import { combineLatest, debounceTime, filter, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

export type ValidationErrorType = {
  [key in VALIDATION_ERROR]: (control?: AbstractControl) => string;
};

@Directive()
export class ValidationOverview {
  isFeedback = input<boolean>();
  message = model<string>();
  status = model<NzValidateStatus>('');
  control = input<AbstractControl>();
  controlName = this.elementRef.nativeElement.getAttribute('formControlName');

  constructor(
    private validationService: ValidationService,
    private injector: Injector,
    private destroyRef: DestroyRef,
    private elementRef: ElementRef<HTMLElement>
  ) {}

  protected listenValue(): void {
    toObservable(this.control, { injector: this.injector })
      .pipe(
        filter((control) => !!control),
        switchMap((control) =>
          combineLatest([control.valueChanges, control.statusChanges])
        ),
        debounceTime(100),
        tap(() => {
          this.message.set(
            this.validationService.validateField(this.control())
          );

          this.status.set(
            this.validationService.validateStatus(this.control())
          );
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
