import {
  afterRenderEffect,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  InputSignal,
  Signal,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, switchMap } from 'rxjs';
import { ChatWorkspaceMessageComponent } from './chat-workspace-message/chat-workspace-message.component';
import { MessagesInputComponent } from '../../../../common-ui/messages-input/messages-input.component';
import { ChatsService } from '../../../../data/services/chats.service';
import { Chat, Message } from '../../../../data/interfaces/chats.interface';

@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  imports: [ChatWorkspaceMessageComponent, MessagesInputComponent],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss',
})
export class ChatWorkspaceMessagesWrapperComponent {
  private readonly _chatsService: ChatsService = inject(ChatsService);
  private readonly _destroyRef: DestroyRef = inject(DestroyRef);

  private readonly _messagesWrapper: Signal<ElementRef<HTMLDivElement>> =
    viewChild.required<ElementRef<HTMLDivElement>>('messagesWrapper');

  protected readonly messages: WritableSignal<Message[]> = this._chatsService.activeChatMessages;

  public readonly chat: InputSignal<Chat> = input.required<Chat>();

  constructor() {
    afterRenderEffect((): void => {
      this.messages();
      const element: HTMLDivElement = this._messagesWrapper().nativeElement;
      element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' });
    });
  }

  protected onSendMessage(messageText: string): void {
    const chatId: number = this.chat().id;

    this._chatsService
      .sendMessage(chatId, messageText)
      .pipe(
        switchMap((): Observable<Chat> => {
          return this._chatsService.getChatById(chatId);
        }),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe();
  }
}
