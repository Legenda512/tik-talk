import { Component, inject, Signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, startWith, switchMap } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ChatsBtnComponent } from '../chats-btn/chats-btn.component';
import { ChatsService, LastMessageResponse } from '../../data';

@Component({
  selector: 'app-chats-list',
  imports: [ChatsBtnComponent, FormsModule, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss',
})
export class ChatsListComponent {
  private readonly _chatsService: ChatsService = inject(ChatsService);
  protected readonly filterControl: FormControl<string | null> = new FormControl<string | null>('');

  protected readonly chats: Signal<LastMessageResponse[]> = toSignal(
    this._chatsService.getMyChats().pipe(
      switchMap((chats: LastMessageResponse[]): Observable<LastMessageResponse[]> => {
        return this.filterControl.valueChanges.pipe(
          startWith(''),
          map((inputValue: string | null): LastMessageResponse[] => {
            return chats.filter((chat: LastMessageResponse): boolean => {
              return `${chat.userFrom.lastName} ${chat.userFrom.firstName}`
                .toLowerCase()
                .includes((inputValue ?? '').toLowerCase());
            });
          }),
        );
      }),
    ),
    { initialValue: [] },
  );
}
