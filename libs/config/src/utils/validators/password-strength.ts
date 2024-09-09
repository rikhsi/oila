import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasMinLength = value.length >= 6;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    const errors: ValidationErrors = {};

    if (!hasMinLength) {
      errors.minLength = true;
    }
    if (!hasUpperCase) {
      errors.upperCase = true;
    }
    if (!hasLowerCase) {
      errors.lowerCase = true;
    }
    if (!hasNumeric) {
      errors.numeric = true;
    }
    if (!hasSpecialChar) {
      errors.specialChar = true;
    }

    return Object.keys(errors).length > 0 ? { passwordStrength: errors } : null;
  };
}
