import { ResolveFn, Route } from '@angular/router';
import { ChatsPageComponent } from './chats-page.component';
import { ChatWorkspaceComponent } from '../chat-workspace/chat-workspace.component';
import { canDeactivate } from '../../../../../auth/src/lib/auth/access.guard';
import { ProfileService } from '../../../../../profile/src/lib/data';
import { Profile } from '@tt/interfaces/profile';
import { inject } from '@angular/core';

// пример реалиазции резолвера - они очень важны для SSR, сначала получаются все данные и уже только потом резолвится страница
export const meResolver: ResolveFn<Profile[]> = () => {
  return inject(ProfileService).getTestAccounts();
};

export const chatsRoutes: Route[] = [
  {
    path: '',
    component: ChatsPageComponent,
    // Пример реализации гарда на роутинг для дочерних маршрутов
    // canActivateChild: [canActivateChild],
    canDeactivate: [canDeactivate],
    resolve: {
      me: meResolver,
    },
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('../chat-workspace/chat-workspace.component').then(
            (c): typeof ChatWorkspaceComponent => c.ChatWorkspaceComponent,
          ),
        canDeactivate: [canDeactivate],
        resolve: {
          me: meResolver,
        },
        runGuardsAndResolvers: 'pathParamsChange',
      },
    ],
  },
];
