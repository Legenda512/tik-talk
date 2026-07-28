import { Component, input, InputSignal } from '@angular/core';
import { CommentPost } from '../../../../data/interfaces/comment.interface';
import { AvatarCircleComponent } from '../../../../common-ui/avatar-circle/avatar-circle.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comment',
  imports: [AvatarCircleComponent, DatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  public readonly comment: InputSignal<CommentPost> = input.required<CommentPost>();
}
