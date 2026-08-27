import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  Service,
} from '@angular/core';
import {
  PreloadingStrategy,
  provideRouter,
  Route,
  withComponentInputBinding,
  withDebugTracing,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
  withInMemoryScrolling,
  withPreloading,
  withRouterConfig,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';
import { authTokenInterceptor } from '@tt/auth';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { mergeMap, Observable, of, timer } from 'rxjs';

@Service()
export class DelayedPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, loadFn: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {
      return of(null);
    }

    return timer(3000).pipe(mergeMap(() => loadFn()));
  }
}

const customImageLoader = (config: ImageLoaderConfig): string => {
  if (config.src.startsWith('http://') || config.src.startsWith('https://')) {
    return config.src;
  }

  if (config.src.startsWith('/assets/')) {
    return config.src;
  }

  return `https://icherniakov.ru/yt-course/${config.src}`;
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      // withPreloading(DelayedPreloadingStrategy) // меняем стратегию предзагрузки
      // withDebugTracing(), // для включения дебага
      // withEnabledBlockingInitialNavigation(), // для SEO - блокируем до начальной навигации
      // withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), // при возврате между роутерами, будет запоминаться позиция скролла на странице
      // withComponentInputBinding(), // забандить на инпуты компонета, пример на странице profile, где происходит байдинг на поле id
      // withHashLocation(), // работает только в своей отведенной "песочнице" http://localhost:4200/#/profile/me
      // withRouterConfig({
      //   paramsInheritanceStrategy: 'always', // включаем наследование параметров роута
      //   onSameUrlNavigation: 'reload', // что делать если попались одинаковые URL
      // }),
      //withViewTransitions(), // добавляет плавности в переключение между роутами
    ),
    provideHttpClient(withInterceptors([authTokenInterceptor])),
    {
      provide: IMAGE_LOADER,
      useValue: customImageLoader,
    },
    provideStore(),
    provideEffects(),
  ],
};
