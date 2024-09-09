import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../services';
import { API_BASE_URL, STANDARD_LANG } from '../constants';

export const coreInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(StorageService);
  const apiUrl = inject(API_BASE_URL);
  const token = storage.accessToken;
  const lang = storage.lang;

  if (!req.url.includes('assets')) {
    req = req.clone({
      url: `${apiUrl}${req.url}`,
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Accept-Language': STANDARD_LANG[lang],
      },
    });
  }

  return next(req);
};
