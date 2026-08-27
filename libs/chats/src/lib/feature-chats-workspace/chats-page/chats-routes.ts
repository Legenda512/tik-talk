import { Route } from '@angular/router';
import { ChatsPageComponent } from './chats-page.component';
import { ChatWorkspaceComponent } from '../chat-workspace/chat-workspace.component';

export const chatsRoutes: Route[] = [
  {
    path: '',
    component: ChatsPageComponent,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('../chat-workspace/chat-workspace.component').then(
            (c): typeof ChatWorkspaceComponent => c.ChatWorkspaceComponent,
          ),
      },
    ],
  },
];
