import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);

  return next(req).pipe(
    catchError((err: unknown) => {
      if (err instanceof HttpErrorResponse) {
        toast.show({
          type: 'danger',
          title: `HTTP ${err.status}`,
          message: err.error?.message || err.message || 'Request failed',
        });
      } else {
        toast.show({ type: 'danger', title: 'Error', message: 'Unexpected error' });
      }
      return throwError(() => err);
    })
  );
};