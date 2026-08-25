import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, catchError, filter, Observable, switchMap, tap, throwError } from 'rxjs';
import { AuthService, TokenResponse } from '../data';

const isRefreshing$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

export const authTokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  if (req.url.includes('dadata.ru')) {
    return next(req);
  }

  const authService: AuthService = inject(AuthService);
  const token: string | null = authService.getToken;

  if (!token) return next(req);

  if (isRefreshing$.value) {
    return refreshAndProceed(authService, req, next);
  }

  return next(addToken(req, token)).pipe(
    catchError((error: HttpErrorResponse): Observable<HttpEvent<unknown>> => {
      if (error.status === 403) {
        return refreshAndProceed(authService, req, next);
      }

      return throwError((): HttpErrorResponse => error);
    }),
  );
};

const refreshAndProceed = (
  authService: AuthService,
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  if (!isRefreshing$.value) {
    isRefreshing$.next(true);

    return authService.refreshAuthToken().pipe(
      switchMap((token: TokenResponse): Observable<HttpEvent<unknown>> => {
        return next(addToken(req, token.access_token)).pipe(
          tap((): void => isRefreshing$.next(false)),
        );
      }),
    );
  }

  const token: string | null = authService.getToken;

  if (req.url.includes('refresh') && token) {
    return next(addToken(req, token));
  }

  return isRefreshing$.pipe(
    filter((isRefreshing: boolean): boolean => !isRefreshing),
    switchMap((): Observable<HttpEvent<unknown>> => {
      const currentToken: string | null = authService.getToken;
      return next(addToken(req, currentToken ?? ''));
    }),
  );
};

const addToken = (req: HttpRequest<unknown>, token: string): HttpRequest<unknown> => {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
};
