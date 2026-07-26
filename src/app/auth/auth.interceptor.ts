import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Auth } from './auth';
import { inject } from '@angular/core';
import { BehaviorSubject, catchError, filter, switchMap, tap, throwError } from 'rxjs';

const isRefreshing$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: Auth = inject(Auth);
  const token: string | null = authService.getToken;

  if (!token) return next(req);

  if (isRefreshing$.value) {
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
  if (!isRefreshing$.value) {
    isRefreshing$.next(true);

    return authService.refreshAuthToken().pipe(
      switchMap((token) => {
        return next(addToken(req, token.access_token)).pipe(tap(() => isRefreshing$.next(false)));
      }),
    );
  }

  if (req.url.includes('refresh')) {
    return next(addToken(req, authService.getToken!));
  }

  return isRefreshing$.pipe(
    filter((isRefreshing: boolean): boolean => !isRefreshing),
    switchMap(() => {
      return next(addToken(req, authService.getToken!));
    }),
  );
};

const addToken = (req: HttpRequest<any>, token: string) => {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
};
