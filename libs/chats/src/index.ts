import { Chat, ChatsService, LastMessageResponse, Message } from './lib/data';
import {
  ChatsBtnComponent,
  ChatsListComponent,
  ChatsPageComponent,
  chatsRoutes,
  ChatWorkspaceComponent,
  ChatWorkspaceHeaderComponent,
  ChatWorkspaceMessageComponent,
  ChatWorkspaceMessagesWrapperComponent,
} from './lib/feature-chats-workspace';
import { MessagesInputComponent } from './lib/ui';

export {
  ChatsService,
  ChatWorkspaceComponent,
  ChatWorkspaceHeaderComponent,
  ChatWorkspaceMessageComponent,
  ChatWorkspaceMessagesWrapperComponent,
  ChatsBtnComponent,
  ChatsListComponent,
  ChatsPageComponent,
  chatsRoutes,
  MessagesInputComponent,
};
export type { Chat, Message, LastMessageResponse };
