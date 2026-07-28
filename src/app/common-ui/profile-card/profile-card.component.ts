import { Component, input, InputSignal } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interface';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-profile-card',
  imports: [NgOptimizedImage],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  public profile: InputSignal<Profile> = input.required<Profile>();
  public priority: InputSignal<boolean> = input<boolean>(false);
}
