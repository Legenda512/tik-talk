import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import { Message } from '../../../../../data/interfaces/chats.interface';
import { AvatarCircleComponent } from '../../../../../common-ui/avatar-circle/avatar-circle.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat-workspace-message',
  imports: [AvatarCircleComponent, DatePipe],
  templateUrl: './chat-workspace-message.component.html',
  styleUrl: './chat-workspace-message.component.scss',
  host: {
    '[class.is-my-message]': 'isMyMessage()',
  },
})
export class ChatWorkspaceMessageComponent {
  public readonly message: InputSignal<Message> = input.required<Message>();

  protected readonly isMyMessage: Signal<boolean> = computed<boolean>((): boolean => {
    return this.message().isMyMessage ?? false;
  });
}
