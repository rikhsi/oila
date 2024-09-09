import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ProgressService } from '../services';
import { finalize } from 'rxjs';

export const progressInterceptor: HttpInterceptorFn = (req, next) => {
  const progress = inject(ProgressService);

  progress.status = true;

  return next(req).pipe(finalize(() => (progress.status = false)));
};
