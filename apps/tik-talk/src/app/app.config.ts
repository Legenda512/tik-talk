import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';
import { authTokenInterceptor } from '@tt/auth';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

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
    provideRouter(routes),
    provideHttpClient(withInterceptors([authTokenInterceptor])),
    {
      provide: IMAGE_LOADER,
      useValue: customImageLoader,
    },
    provideStore(),
    provideEffects(),
  ],
};
