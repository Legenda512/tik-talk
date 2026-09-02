import { PartialMatchRouteSnapshot, Router, Routes, UrlSegment, UrlTree } from '@angular/router';
import { canActivateAuth, canMatch, LoginPageComponent } from '@tt/auth';
import {
  ProfileEffects,
  profileFeature,
  ProfilePageComponent,
  // profileStore,
  SearchPageComponent,
  SettingsPageComponent,
} from '@tt/profile';
import { LayoutComponent } from '@tt/layout';

// store NgRX
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { ExperimentalComponent, FormExperimentalComponent } from '@tt/experimental';
import { ErrorPageComponent } from './error.component';
import { inject } from '@angular/core';
import { Aside1 } from './aside1/aside1';
import { Aside2 } from './aside2/aside2';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: (route: PartialMatchRouteSnapshot): UrlTree => {
          const router: Router = inject(Router);
          return router.createUrlTree(['profile/me']);
        },
        pathMatch: 'full',
      },
      {
        component: ErrorPageComponent,
        matcher: (segments: UrlSegment[]) => {
          if (segments.length === 2 && segments[0].path === 'profile') {
            const id: string = segments[1].path;
            if (id.startsWith('1')) {
              return {
                consumed: segments,
                posParams: {
                  id: segments[1],
                },
              };
            }
          }
          return null;
        },
      },
      {
        path: 'profile/:id',
        component: ProfilePageComponent,
        children: [
          {
            path: 'err',
            component: ErrorPageComponent,
          },
        ],
      },
      { path: 'settings', component: SettingsPageComponent },
      {
        path: 'search',
        component: SearchPageComponent,
        providers: [
          /*
          //store NgRX Signals
          profileStore,
          */

          // store NgRX
          provideState(profileFeature),
          provideEffects(ProfileEffects),
        ],
      },
      {
        path: 'chats',
        canMatch: [canMatch],
        loadChildren: () => import('@tt/chats').then((m) => m.chatsRoutes),
        data: { preload: true },
      },
      {
        path: 'first',
        outlet: 'aside',
        component: Aside1,
      },
      {
        path: 'second',
        outlet: 'aside',
        component: Aside2,
      },

      {
        path: 'first',
        outlet: 'pew',
        component: Aside1,
      },
      {
        path: 'second',
        outlet: 'pew',
        component: Aside2,
      },
    ],
    canActivate: [canActivateAuth],
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'experimental', component: FormExperimentalComponent },
  { path: 'experimental2', component: ExperimentalComponent },
  { path: `**`, component: ErrorPageComponent },
];
