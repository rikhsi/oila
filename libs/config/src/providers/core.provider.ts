import {
  APP_INITIALIZER,
  EnvironmentProviders,
  Provider,
  importProvidersFrom,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';
import { LANGUAGE, SELECT_ITEMS_CONFIG, SELECT_ITEM_TOKEN } from '../constants';
import { StorageService, TranslocoHttpService } from '../services';
import { iconFactory, jwtOptionsFactory, langFactory } from '../utils';
import {
  Routes,
  provideRouter,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { coreInterceptor, progressInterceptor } from '../providers';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { registerLocaleData } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { provideNzI18n, ru_RU } from 'ng-zorro-antd/i18n';
import ru from '@angular/common/locales/ru';
import { NzIconService } from 'ng-zorro-antd/icon';
import { NzNotificationService } from 'ng-zorro-antd/notification';

registerLocaleData(ru);

export function provideCore(
  routes: Routes
): (EnvironmentProviders | Provider)[] {
  return [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
      }),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
      })
    ),
    provideEnvironmentNgxMask(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([progressInterceptor, coreInterceptor])),
    importProvidersFrom(
      JwtModule.forRoot({
        jwtOptionsProvider: {
          provide: JWT_OPTIONS,
          useFactory: jwtOptionsFactory,
          deps: [StorageService],
        },
      })
    ),
    provideNzI18n(ru_RU),
    provideTransloco({
      config: {
        availableLangs: [LANGUAGE.uz, LANGUAGE.ru],
        defaultLang: LANGUAGE.uz,
        fallbackLang: LANGUAGE.uz,
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpService,
    }),
    {
      provide: APP_INITIALIZER,
      deps: [StorageService],
      useFactory: langFactory,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: iconFactory,
      multi: true,
      deps: [NzIconService],
    },
    { provide: SELECT_ITEM_TOKEN, useValue: SELECT_ITEMS_CONFIG },
    NzMessageService,
    NzNotificationService,
  ];
}
