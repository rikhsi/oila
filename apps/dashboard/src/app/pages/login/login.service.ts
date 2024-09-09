import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginForm } from '@dash/typings';
import {
  AccountApiService,
  ResponseDataOfTokenResponseModel,
} from '@oila/config/api/myoila.admin.api';
import { AuthService, DeviceDetectorService } from '@oila/config/services';
import { filter, Observable, tap } from 'rxjs';

@Injectable()
export class LoginService {
  readonly loginForm = new FormGroup<LoginForm>({
    email: new FormControl<string>(null, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl<string>(null, [Validators.required]),
  });

  constructor(
    private deviceService: DeviceDetectorService,
    private loginApiService: AccountApiService,
    private authService: AuthService
  ) {}

  login$(): Observable<ResponseDataOfTokenResponseModel> {
    const { email, password } = this.loginForm.value;
    const deviceId = this.deviceService.getDeviceType();

    return this.loginApiService
      .login({
        deviceId,
        login: email,
        password,
      })
      .pipe(
        filter(({ result }) => !!result),
        tap(({ result }) => this.authService.signIn(result))
      );
  }
}
