import { Component, input, InputSignal } from '@angular/core';
import { Profile } from '../../../../data/interfaces/profile.interface';
import { AvatarCircleComponent } from '../../../../common-ui/avatar-circle/avatar-circle.component';

@Component({
  selector: 'app-chat-workspace-header',
  imports: [AvatarCircleComponent],
  templateUrl: './chat-workspace-header.component.html',
  styleUrl: './chat-workspace-header.component.scss',
})
export class ChatWorkspaceHeaderComponent {
  public readonly profile: InputSignal<Profile> = input.required<Profile>();
}
