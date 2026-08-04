import { Component, input, InputSignal } from '@angular/core';
import { AvatarCircleComponent } from '@tt/common-ui';
import { Profile } from '@tt/interfaces/profile';

@Component({
  selector: 'app-profile-header',
  imports: [AvatarCircleComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
})
export class ProfileHeaderComponent {
  public readonly profile: InputSignal<Profile> = input.required<Profile>();
}
