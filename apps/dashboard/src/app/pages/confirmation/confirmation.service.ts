import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '@oila/config';
import { exactLengthValidator } from '@oila/config';
import { ResponseDataOfTokenResponseModel, SellerAccountApiService } from 'libs/config/src/api/myoila.admin.api';
import { Observable, filter, tap } from 'rxjs';

@Injectable()
export class ConfirmationService {
  readonly codeControl = new FormControl<string>('', [
    Validators.required,
    exactLengthValidator(6),
  ]);

  constructor(
    private sellerAccountClient: SellerAccountApiService,
    private authService: AuthService
  ) {}

  submit$(email: string): Observable<ResponseDataOfTokenResponseModel> {
    const code = this.codeControl.value;

    return this.sellerAccountClient.activateAccount({ code, email }).pipe(
      filter(({ result }) => !!result),
      tap(({ result }) => this.authService.signIn(result))
    );
  }
}
