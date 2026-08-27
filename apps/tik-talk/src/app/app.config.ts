import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  Service,
} from '@angular/core';
import { PreloadingStrategy, provideRouter, Route, withPreloading } from '@angular/router';

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
    provideRouter(routes, withPreloading(DelayedPreloadingStrategy)),
    provideHttpClient(withInterceptors([authTokenInterceptor])),
    {
      provide: IMAGE_LOADER,
      useValue: customImageLoader,
    },
    provideStore(),
    provideEffects(),
  ],
};
