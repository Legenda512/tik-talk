import { Component, input, InputSignal } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interface';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-profile-header',
  imports: [NgOptimizedImage],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
})
export class ProfileHeaderComponent {
  public readonly profile: InputSignal<Profile> = input.required<Profile>();
}
