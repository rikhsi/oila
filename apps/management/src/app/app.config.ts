import { ApplicationConfig } from '@angular/core';
import { appRoutes } from './app.routes';
import { provideCore } from '@oila/config/providers';
import { API_BASE_URL } from '@oila/config/constants';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideCore(appRoutes),
    { provide: API_BASE_URL, useValue: environment.apiUrl },
  ],
};
