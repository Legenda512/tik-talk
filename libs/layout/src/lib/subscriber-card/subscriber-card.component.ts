import { Component, input, InputSignal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Profile } from '@tt/interfaces/profile';

@Component({
  selector: 'app-subscriber-card',
  imports: [NgOptimizedImage],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss',
})
export class SubscriberCardComponent {
  public readonly profile: InputSignal<Profile> = input.required<Profile>();
}
