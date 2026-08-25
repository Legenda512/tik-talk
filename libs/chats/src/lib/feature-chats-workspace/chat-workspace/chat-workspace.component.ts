import { Component, inject, Signal } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter, Observable, of, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ChatWorkspaceHeaderComponent } from '../chat-workspace-header/chat-workspace-header.component';
import { ChatWorkspaceMessagesWrapperComponent } from '../chat-workspace-messages-wrapper/chat-workspace-messages-wrapper.component';
import { Chat, ChatsService } from '../../data';

@Component({
  selector: 'lib-chat-workspace',
  imports: [ChatWorkspaceHeaderComponent, ChatWorkspaceMessagesWrapperComponent],
  templateUrl: './chat-workspace.component.html',
  styleUrl: './chat-workspace.component.scss',
})
export class ChatWorkspaceComponent {
  private readonly _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly _router: Router = inject(Router);
  private readonly _chatsService: ChatsService = inject(ChatsService);

  protected readonly activeChat: Signal<Chat | null | undefined> = toSignal(
    this._activatedRoute.params.pipe(
      switchMap(({ id }: Params): Observable<null> | Observable<Chat> => {
        if (id === 'new') {
          return this._activatedRoute.queryParams.pipe(
            filter(({ userId }: Params) => userId),
            switchMap(({ userId }: Params): Observable<null> => {
              return this._chatsService.createChat(userId).pipe(
                switchMap((chat: Chat): Observable<null> => {
                  this._router.navigate(['chats', chat.id]);
                  return of(null);
                }),
              );
            }),
          );
        }

        return this._chatsService.getChatById(id);
      }),
    ),
  );
}
