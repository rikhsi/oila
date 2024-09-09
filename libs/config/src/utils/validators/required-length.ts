import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function exactLengthValidator(length: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return { required: true };
    }

    if (value?.length === length) {
      return null;
    }
    return {
      exactLength: { requiredLength: length, actualLength: value?.length },
    };
  };
}
