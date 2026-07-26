import { Component, input, InputSignal } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interface';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-profile-header',
  imports: [NgOptimizedImage],
  templateUrl: './profile-header.html',
  styleUrl: './profile-header.scss',
})
export class ProfileHeader {
  public readonly profile: InputSignal<Profile> = input.required<Profile>();
}
