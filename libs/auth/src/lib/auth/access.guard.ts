import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../data';
import { HasChanges } from '../../../../shared/src/lib/data';

export const canActivateAuth: () => boolean | UrlTree = (): boolean | UrlTree => {
  const isLoggedIn: boolean = inject(AuthService).isAuth;

  if (isLoggedIn) {
    return true;
  }

  return inject(Router).createUrlTree(['./login']);
};

// Главная разница между canActive и canMatch
// При ленивой загрузке canActive загрузит чанк, но не пустит.
// А canMatch не будет загружать чанк и не пустит!
// Пример реализации canActivateChild для активации дочерних маршрутов, используется в chatsRoutes
export const canActivateChild: (
  childRoute: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => boolean = (childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  console.log('childRoute', childRoute);
  console.log('state', state);

  return true;
};

// Пример реализации canMatch для активации маршрутов, используется в routes
export const canMatch: (route: Route, segments: UrlSegment[]) => boolean = (
  route: Route,
  segments: UrlSegment[],
): boolean => {
  console.log('route', route);
  console.log('segments', segments);

  return true;
};

// Пример реализации гарда acnDeactivate - например пользователь работал с формой, а потом
// делаем возврат в браузере назад, в этот момент мы можем прописать логику и уточнить у пользователя,
// что делать с несохраненными данными в форме
export const canDeactivate = (component: HasChanges) => {
  const allowGoAway = !component.hasChanges;

  if (!allowGoAway) {
    return confirm('Вы уверены, что хотите не сохранять форму');
  }

  return allowGoAway;
};
