import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegistrationForm } from '@dash/typings';
import {
  passwordStrengthValidator,
  confirmPasswordValidator,
} from '@oila/config/utils';

@Injectable()
export class RegistrationService {
  readonly registerForm = new FormGroup<RegistrationForm>(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        passwordStrengthValidator(),
      ]),
      confirmationPassword: new FormControl('', [Validators.required]),
    },
    { validators: confirmPasswordValidator('password', 'confirmationPassword') }
  );
}
