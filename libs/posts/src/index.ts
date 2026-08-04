import { CommentCreateDto, CommentPost, Post, PostCreateDto, PostService } from './lib/data';
import {
  CommentComponent,
  PostComponent,
  PostFeedComponent,
  PostInputComponent,
} from './lib/feature-posts-wall';

export { PostService, PostComponent, PostFeedComponent, CommentComponent, PostInputComponent };
export type { CommentCreateDto, CommentPost, PostCreateDto, Post };
