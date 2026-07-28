import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  Renderer2,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, fromEvent } from 'rxjs';
import { PostInputComponent } from '../post-input/post-input.component';
import { PostComponent } from '../post/post.component';
import { PostService } from '../../../data/services/post.service';
import { Post } from '../../../data/interfaces/post.interface';

@Component({
  selector: 'app-post-feed',
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
})
export class PostFeedComponent implements OnInit, AfterViewInit {
  private readonly _postService: PostService = inject(PostService);
  private readonly _hostElement: ElementRef = inject(ElementRef);
  private readonly _renderer2: Renderer2 = inject(Renderer2);
  private readonly _destroyRef: DestroyRef = inject(DestroyRef);

  protected readonly posts: WritableSignal<Post[]> = inject(PostService).posts;

  ngOnInit(): void {
    this._postService.getPosts().subscribe();
  }

  ngAfterViewInit(): void {
    this.resizeFeed();

    fromEvent(window, 'resize')
      .pipe(debounceTime(100), takeUntilDestroyed(this._destroyRef))
      .subscribe((): void => {
        this.resizeFeed();
      });
  }

  private resizeFeed(): void {
    const { top } = this._hostElement.nativeElement.getBoundingClientRect();
    const height: number = window.innerHeight - top - 24 - 24;
    this._renderer2.setStyle(this._hostElement.nativeElement, 'height', `${height}px`);
  }
}
