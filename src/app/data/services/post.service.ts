import { inject, Service, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post, PostCreateDto } from '../interfaces/post.interface';
import { map, Observable, switchMap, tap } from 'rxjs';
import { CommentPost, CommentCreateDto } from '../interfaces/comment.interface';

@Service()
export class PostService {
  private readonly _http: HttpClient = inject(HttpClient);
  private readonly _baseApiUrl: string = 'https://icherniakov.ru/yt-course/';
  public readonly posts: WritableSignal<Post[]> = signal<Post[]>([]);

  public createPost(payLoad: PostCreateDto): Observable<Post[]> {
    return this._http.post<Post>(`${this._baseApiUrl}post/`, payLoad).pipe(
      switchMap((): Observable<Post[]> => {
        return this.getPosts();
      }),
    );
  }

  public getPosts(): Observable<Post[]> {
    return this._http.get<Post[]>(`${this._baseApiUrl}post/`).pipe(
      tap((posts: Post[]): void => {
        this.posts.set(posts);
      }),
    );
  }

  public createComment(payLoad: CommentCreateDto): Observable<CommentPost> {
    return this._http.post<CommentPost>(`${this._baseApiUrl}comment/`, payLoad);
  }

  public getCommentsByPostId(postId: number): Observable<CommentPost[]> {
    return this._http
      .get<Post>(`${this._baseApiUrl}post/${postId}`)
      .pipe(map((post: Post): CommentPost[] => post.comments));
  }
}
