import { Component, input, InputSignal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Profile } from '@tt/interfaces/profile';

@Component({
  selector: 'lib-profile-card',
  imports: [NgOptimizedImage],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  public profile: InputSignal<Profile> = input.required<Profile>();
  public priority: InputSignal<boolean> = input<boolean>(false);
}
