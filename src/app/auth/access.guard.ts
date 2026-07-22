import { Auth } from './auth';
import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

export const canActivateAuth = (): boolean | UrlTree => {
  const isLoggedIn: boolean = inject(Auth).isAuth;

  if (isLoggedIn) {
    return true;
  }

  return inject(Router).createUrlTree(['./login']);
};
