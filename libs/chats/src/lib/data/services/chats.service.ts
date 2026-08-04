import { inject, Service, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map, Observable, tap } from 'rxjs';
import { Chat, LastMessageResponse, Message } from '../interfaces';
import { ProfileService } from '@tt/profile';
import { Profile } from '@tt/interfaces/profile';

@Service()
export class ChatsService {
  private readonly _http: HttpClient = inject(HttpClient);
  private readonly _myProfile: WritableSignal<Profile | null> = inject(ProfileService).myProfile;
  private readonly _baseUrl: string = 'https://icherniakov.ru/yt-course/';
  private readonly _chatUrl: string = `${this._baseUrl}chat/`;
  private readonly _messageUrl: string = `${this._baseUrl}message/`;

  public readonly activeChatMessages: WritableSignal<Message[]> = signal<Message[]>([]);

  public createChat(userId: number): Observable<Chat> {
    return this._http.post<Chat>(`${this._chatUrl}${userId}`, {});
  }

  public getMyChats(): Observable<LastMessageResponse[]> {
    return this._http.get<LastMessageResponse[]>(`${this._chatUrl}get_my_chats/`);
  }

  public getChatById(chatId: number): Observable<Chat> {
    return this._http.get<Chat>(`${this._chatUrl}${chatId}`).pipe(
      filter((): boolean => this._myProfile() !== null),
      map((chat: Chat): Chat => {
        const patchedMessages: Message[] = chat.messages.map((message: Message): Message => {
          return {
            ...message,
            user: chat.userFirst.id === message.userFromId ? chat.userFirst : chat.userSecond,
            isMyMessage: message.userFromId === this._myProfile()?.id,
          };
        });

        return {
          ...chat,
          companion: chat.userFirst.id === this._myProfile()?.id ? chat.userSecond : chat.userFirst,
          messages: patchedMessages,
        };
      }),
      tap((chat: Chat): void => {
        this.activeChatMessages.set(chat.messages);
      }),
    );
  }

  public sendMessage(chatId: number, message: string): Observable<object> {
    return this._http.post(
      `${this._messageUrl}send/${chatId}`,
      {},
      {
        params: {
          message,
        },
      },
    );
  }
}
