import { Component, input, InputSignal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AvatarCircleComponent } from '@tt/common-ui';
import { LastMessageResponse } from '../../data';

@Component({
  selector: 'lib-chats-btn[chats]',
  imports: [AvatarCircleComponent, DatePipe],
  templateUrl: './chats-btn.component.html',
  styleUrl: './chats-btn.component.scss',
})
export class ChatsBtnComponent {
  public readonly chat: InputSignal<LastMessageResponse> = input.required<LastMessageResponse>();
}
