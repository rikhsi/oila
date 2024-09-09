import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecoverForm } from '@dash/typings';
import {
  exactLengthValidator,
  passwordStrengthValidator,
  confirmPasswordValidator,
} from '@oila/config/utils';

@Injectable()
export class RecoverService {
  readonly recoverForm = new FormGroup<RecoverForm>(
    {
      email: new FormControl<string>('', {
        validators: [Validators.required, Validators.email],
      }),
      code: new FormControl<string>('', [
        Validators.required,
        exactLengthValidator(6),
      ]),
      password: new FormControl<string>('', [
        Validators.required,
        passwordStrengthValidator(),
      ]),
      confirmationPassword: new FormControl('', [Validators.required]),
    },
    { validators: confirmPasswordValidator('password', 'confirmationPassword') }
  );
}
