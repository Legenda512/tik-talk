import {
  Component,
  inject,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  Renderer2,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { tap } from 'rxjs';
import { PostService } from '../../../data';
import { AvatarCircleComponent, SvgIconComponent } from '@tt/common-ui';
import { Profile } from '@tt/interfaces/profile';
import { GlobalStoreService } from '@tt/shared';

@Component({
  selector: 'app-post-input',
  imports: [AvatarCircleComponent, SvgIconComponent, FormsModule],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss',
  host: {
    '[class.comment]': 'isCommentInput()',
  },
})
export class PostInputComponent {
  private readonly _renderer2: Renderer2 = inject(Renderer2);
  private readonly _postService: PostService = inject(PostService);
  public readonly isCommentInput: InputSignal<boolean> = input<boolean>(false);
  public readonly postId: InputSignal<number> = input<number>(0);
  public readonly created: OutputEmitterRef<void> = output<void>();

  protected readonly profile: WritableSignal<Profile | null> = inject(GlobalStoreService).myProfile;
  protected postText: WritableSignal<string> = signal('');

  protected onTextAreaInput(event: Event): void {
    const textArea = event.target as HTMLTextAreaElement;
    this._renderer2.setStyle(textArea, 'height', 'auto');
    this._renderer2.setStyle(textArea, 'height', textArea.scrollHeight + 'px');
  }

  protected onCreatePost(): void {
    if (!this.postText()) {
      return;
    }
    const profile: Profile | null = this.profile();

    if (profile) {
      if (this.isCommentInput()) {
        this._postService
          .createComment({
            postId: this.postId(),
            text: this.postText(),
            authorId: profile.id,
          })
          .pipe(
            tap((): void => {
              this.postText.set('');
              this.created.emit();
            }),
          )
          .subscribe();
        return;
      }

      this._postService
        .createPost({
          content: this.postText(),
          authorId: profile.id,
        })
        .pipe(
          tap((): void => {
            this.postText.set('');
          }),
        )
        .subscribe();
    }
  }
}
