import { ApplicationConfig } from '@angular/core';
import { appRoutes } from './app.routes';
import { API_BASE_URL, provideCore } from '@oila/config';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideCore(appRoutes),
    { provide: API_BASE_URL, useValue: environment.apiUrl },
  ],
};
