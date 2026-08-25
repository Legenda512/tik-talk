import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import { Message } from '../../data';
import { DatePipe } from '@angular/common';
import { AvatarCircleComponent } from '@tt/common-ui';

@Component({
  selector: 'lib-chat-workspace-message',
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
