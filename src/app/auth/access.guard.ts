import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

export const canActivateAuth: () => boolean | UrlTree = (): boolean | UrlTree => {
  const isLoggedIn: boolean = inject(AuthService).isAuth;

  if (isLoggedIn) {
    return true;
  }

  return inject(Router).createUrlTree(['./login']);
};
