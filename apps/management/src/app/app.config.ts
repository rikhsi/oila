import { ApplicationConfig } from '@angular/core';
import { appRoutes } from './app.routes';
import { provideCore } from '@oila/config';
import { environment } from '../environments/environment';
import { API_BASE_URL } from 'libs/config/src/api/myoila.core.api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideCore(appRoutes),
    { provide: API_BASE_URL, useValue: environment.apiUrl },
  ],
};
