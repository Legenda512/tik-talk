import { Component, inject, Signal } from '@angular/core';
import { ChatWorkspaceHeaderComponent } from './chat-workspace-header/chat-workspace-header.component';
import { ChatWorkspaceMessagesWrapperComponent } from './chat-workspace-messages-wrapper/chat-workspace-messages-wrapper.component';
import { ActivatedRoute, Params } from '@angular/router';
import { ChatsService } from '../../../data/services/chats.service';
import { Observable, switchMap } from 'rxjs';
import { Chat } from '../../../data/interfaces/chats.interface';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-chat-workspace',
  imports: [ChatWorkspaceHeaderComponent, ChatWorkspaceMessagesWrapperComponent],
  templateUrl: './chat-workspace.component.html',
  styleUrl: './chat-workspace.component.scss',
})
export class ChatWorkspaceComponent {
  private readonly _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly _chatsService: ChatsService = inject(ChatsService);

  protected readonly activeChat: Signal<Chat | undefined> = toSignal(
    this._activatedRoute.params.pipe(
      switchMap(({ id }: Params): Observable<Chat> => this._chatsService.getChatById(id)),
    ),
  );
}
