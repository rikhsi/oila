import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { ROOT_ROUTE } from '../constants';
import { TokenResponseModel } from '../api/myoila.admin.api';
import { Observable, map, shareReplay } from 'rxjs';
import {
  ProfileApiService,
  ResponseDataOfUserResponseModel,
  UserResponseModel,
} from '../api/myoila.core.api';

@Injectable({ providedIn: 'root' })
export class AuthService {
  initialLink: string;

  private userRes$: Observable<ResponseDataOfUserResponseModel> =
    this.profileClient.getUserProfile();

  readonly user$: Observable<UserResponseModel> = this.userRes$.pipe(
    map(({ result }) => result),
    shareReplay(1)
  );

  constructor(
    private storageService: StorageService,
    private jwt: JwtHelperService,
    private router: Router,
    private storage: StorageService,
    private profileClient: ProfileApiService
  ) {}

  get isAuthenticated(): boolean {
    return !this.jwt.isTokenExpired(this.storageService.accessToken);
  }

  get roleId(): number {
    return +this.jwt.decodeToken()?.RoleId;
  }

  get permissions(): number[] {
    return this.jwt.decodeToken()?.Permissions;
  }

  signOut(): void {
    this.storageService.removeAccessToken();
    this.storageService.removeRefreshToken();

    this.router.navigate([ROOT_ROUTE.auth]);
  }

  signIn(result?: TokenResponseModel): void {
    if (result) {
      this.storage.accessToken = result.accessToken;
      this.storage.refreshToken = result.refreshToken;
    }

    this.router.navigate(['']);
  }
}
