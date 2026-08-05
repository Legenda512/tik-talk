import { Route, Routes } from '@angular/router';
import { canActivateAuth, LoginPageComponent } from '@tt/auth';
import {
  // ProfileEffects,
  // profileFeature,
  ProfilePageComponent,
  profileStore,
  SearchPageComponent,
  SettingsPageComponent,
} from '@tt/profile';
import { chatsRoutes } from '@tt/chats';
import { LayoutComponent } from '@tt/layout';

/*
// store NgRX
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
*/

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      { path: 'profile/:id', component: ProfilePageComponent },
      { path: 'settings', component: SettingsPageComponent },
      {
        path: 'search',
        component: SearchPageComponent,
        providers: [
          //store NgRX Signals
          profileStore,

          /*
          // store NgRX
          provideState(profileFeature),
          provideEffects(ProfileEffects)
          */
        ],
      },
      { path: 'chats', loadChildren: (): Route[] => chatsRoutes },
    ],
    canActivate: [canActivateAuth],
  },
  { path: 'login', component: LoginPageComponent },
];
