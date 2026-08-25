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
import { DatePipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommentPost, Post, PostService } from '../../data';
import { CommentComponent, PostInputComponent } from '../ui';
import { AvatarCircleComponent, SvgIconComponent } from '@tt/common-ui';

@Component({
  selector: 'lib-post',
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
