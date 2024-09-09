import { JwtOptions } from '../typings';
import { StorageService } from '../services';

export function jwtOptionsFactory(storageService: StorageService): JwtOptions {
  return {
    tokenGetter: (): string => storageService.accessToken,
  };
}
