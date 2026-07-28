import {
  Component,
  DestroyRef,
  inject,
  input,
  InputSignal,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Post } from '../../../data/interfaces/post.interface';
import { AvatarCircleComponent } from '../../../common-ui/avatar-circle/avatar-circle.component';
import { DatePipe } from '@angular/common';
import { SvgIconComponent } from '../../../common-ui/svg-icon/svg-icon.component';
import { PostInputComponent } from '../post-input/post-input.component';
import { CommentComponent } from './comment/comment.component';
import { PostService } from '../../../data/services/post.service';
import { CommentPost } from '../../../data/interfaces/comment.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-post',
  imports: [
    AvatarCircleComponent,
    DatePipe,
    SvgIconComponent,
    PostInputComponent,
    CommentComponent,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  private readonly _postService: PostService = inject(PostService);
  private readonly _destroyRef: DestroyRef = inject(DestroyRef);
  public readonly post: InputSignal<Post> = input.required<Post>();

  protected readonly comments: WritableSignal<CommentPost[]> = signal<CommentPost[]>([]);

  ngOnInit(): void {
    this.comments.set(this.post().comments);
  }

  protected onCreated(): void {
    this._postService
      .getCommentsByPostId(this.post().id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((comments: CommentPost[]): void => {
        this.comments.set(comments);
      });
  }
}
