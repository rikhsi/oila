import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { TranslocoService } from '@jsverse/transloco';
import { NzValidateStatus } from 'ng-zorro-antd/core/types';
import { ControlType, ValidationErrorType } from '../typings';
import { VALIDATION_ERROR } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  #validationMessages: Partial<ValidationErrorType> = {
    [VALIDATION_ERROR.required]: () =>
      this.getTranslation(VALIDATION_ERROR.required),
    [VALIDATION_ERROR.email]: () => this.getTranslation(VALIDATION_ERROR.email),
    [VALIDATION_ERROR.empty]: () => ' ',
    [VALIDATION_ERROR.UserNotFound]: () =>
      this.getTranslation(VALIDATION_ERROR.UserNotFound),
    [VALIDATION_ERROR.UserNotActive]: () =>
      this.getTranslation(VALIDATION_ERROR.UserNotActive),
    [VALIDATION_ERROR.minlength]: (control: AbstractControl) =>
      this.getTranslation(VALIDATION_ERROR.minlength, control),
    [VALIDATION_ERROR.maxlength]: (control: AbstractControl) =>
      this.getTranslation(VALIDATION_ERROR.maxlength, control),
    [VALIDATION_ERROR.exactLength]: (control: AbstractControl) =>
      this.getTranslation(VALIDATION_ERROR.exactLength, control),
    [VALIDATION_ERROR.passwordMismatch]: () =>
      this.getTranslation(VALIDATION_ERROR.passwordMismatch),
    [VALIDATION_ERROR.passwordStrength]: () =>
      this.getTranslation(VALIDATION_ERROR.passwordStrength),
  };

  #validationStatusType: Partial<ValidationErrorType> = {
    [VALIDATION_ERROR.required]: () => 'error',
    [VALIDATION_ERROR.email]: () => 'error',
    [VALIDATION_ERROR.minlength]: () => 'warning',
    [VALIDATION_ERROR.maxlength]: () => 'warning',
    [VALIDATION_ERROR.UserNotFound]: () => 'error',
    [VALIDATION_ERROR.empty]: () => 'error',
    [VALIDATION_ERROR.exactLength]: () => 'warning',
    [VALIDATION_ERROR.UserNotActive]: () => 'error',
    [VALIDATION_ERROR.passwordMismatch]: () => 'error',
    [VALIDATION_ERROR.passwordStrength]: () => 'error',
  };

  constructor(private translocoService: TranslocoService) {}

  validateStatus(control: AbstractControl): NzValidateStatus {
    if (control?.valid && control?.dirty) return 'success';

    if (control?.errors && control?.dirty) {
      const controlKeys = Object.keys(control?.errors ? control?.errors : {});

      const messages = Object.values(VALIDATION_ERROR).reduce((arr, error) => {
        if (controlKeys.includes(VALIDATION_ERROR[error])) {
          arr.push(this.#validationStatusType[error]());
        }
        return arr;
      }, new Array<string>());

      return messages.join('. ') as NzValidateStatus;
    }

    return '';
  }

  validateField(control: AbstractControl, additionalMessage = ''): string {
    if (!control?.invalid || !control?.dirty) return '';

    const controlErrorKeys = Object.keys(
      control?.errors ? control?.errors : {}
    );

    const errorMessages = Object.values(VALIDATION_ERROR).reduce(
      (arr, error) => {
        if (controlErrorKeys.includes(VALIDATION_ERROR[error])) {
          arr.push(this.#validationMessages[error](control));
        }
        return arr;
      },
      new Array<string>()
    );
    errorMessages.push(additionalMessage);

    return errorMessages.join('. ');
  }

  updateControlStatus(control: ControlType): void {
    if (control instanceof FormGroup || control instanceof FormArray) {
      Object.values(control.controls).forEach((innerControl) => {
        this.updateControlStatus(innerControl);
      });
    } else {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    }
  }

  private getTranslation(key: string, control?: AbstractControl): string {
    const translation = this.translocoService.translate(`validation.${key}`);

    if (control) {
      return `${translation}:
        ${control.getError(key).requiredLength}`;
    }

    return translation;
  }
}
