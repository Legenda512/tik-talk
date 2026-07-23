import { Component, input, InputSignal } from '@angular/core';
import { Profile } from '../../../data/interfaces/profile.interface';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-subscriber-card',
  imports: [NgOptimizedImage],
  templateUrl: './subscriber-card.html',
  styleUrl: './subscriber-card.scss',
})
export class SubscriberCard {
  public readonly profile: InputSignal<Profile> = input.required<Profile>();
}
