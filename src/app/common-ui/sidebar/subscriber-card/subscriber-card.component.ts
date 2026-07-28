import { Component, input, InputSignal } from '@angular/core';
import { Profile } from '../../../data/interfaces/profile.interface';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-subscriber-card',
  imports: [NgOptimizedImage],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss',
})
export class SubscriberCardComponent {
  public readonly profile: InputSignal<Profile> = input.required<Profile>();
}
