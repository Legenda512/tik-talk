import { Component, input, InputSignal } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interface';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-profile-card',
  imports: [NgOptimizedImage],
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.scss',
})
export class ProfileCard {
  public profile: InputSignal<Profile> = input.required<Profile>();
}
