import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Auth } from './auth';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';

let isRefreshing: boolean = false;

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: Auth = inject(Auth);
  const token: string | null = authService.getToken;

  if (!token) return next(req);

  if (isRefreshing) {
    return refreshAndProceed(authService, req, next);
  }

  return next(addToken(req, token)).pipe(
    catchError((error) => {
      if (error.status === 403) {
        return refreshAndProceed(authService, req, next);
      }

      return throwError(error);
    }),
  );
};

const refreshAndProceed = (authService: Auth, req: HttpRequest<any>, next: HttpHandlerFn) => {
  if (!isRefreshing) {
    isRefreshing = true;

    return authService.refreshAuthToken().pipe(
      switchMap((token) => {
        isRefreshing = false;
        return next(addToken(req, token.access_token));
      }),
    );
  }

  return next(addToken(req, authService.getToken!));
};

const addToken = (req: HttpRequest<any>, token: string) => {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
};
