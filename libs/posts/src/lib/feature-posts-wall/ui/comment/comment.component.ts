import { Component, input, InputSignal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommentPost } from '../../../data';
import { AvatarCircleComponent } from '@tt/common-ui';

@Component({
  selector: 'app-comment',
  imports: [AvatarCircleComponent, DatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  public readonly comment: InputSignal<CommentPost> = input.required<CommentPost>();
}
