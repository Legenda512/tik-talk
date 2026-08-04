import { Component, input, InputSignal } from '@angular/core';
import { AvatarCircleComponent } from '@tt/common-ui';
import { Profile } from '@tt/interfaces/profile';

@Component({
  selector: 'app-chat-workspace-header',
  imports: [AvatarCircleComponent],
  templateUrl: './chat-workspace-header.component.html',
  styleUrl: './chat-workspace-header.component.scss',
})
export class ChatWorkspaceHeaderComponent {
  public readonly profile: InputSignal<Profile> = input.required<Profile>();
}
