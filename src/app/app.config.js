import { provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { IMAGE_LOADER } from '@angular/common';
const customImageLoader = (config) => {
    if (config.src.startsWith('http://') || config.src.startsWith('https://')) {
        return config.src;
    }
    if (config.src.startsWith('assets/')) {
        return config.src;
    }
    return `https://icherniakov.ru/yt-course/${config.src}`;
};
export const appConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes),
        provideHttpClient(),
        {
            provide: IMAGE_LOADER,
            useValue: customImageLoader,
        },
    ],
};
