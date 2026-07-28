import { Component, input, InputSignal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-avatar-circle',
  imports: [NgOptimizedImage],
  templateUrl: './avatar-circle.component.html',
  styleUrl: './avatar-circle.component.scss',
})
export class AvatarCircleComponent {
  public readonly avatarUrl: InputSignal<string | null> = input.required<string | null>();

  public readonly avatarAlt: InputSignal<string> = input.required<string>();
}
