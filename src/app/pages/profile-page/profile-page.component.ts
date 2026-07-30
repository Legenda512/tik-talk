import { Component, computed, DestroyRef, inject, Signal } from '@angular/core';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Profile } from '../../data/interfaces/profile.interface';
import { NgOptimizedImage } from '@angular/common';
import { SvgIconComponent } from '../../common-ui/svg-icon/svg-icon.component';
import { PostFeedComponent } from './post-feed/post-feed.component';
import { ChatsService } from '../../data/services/chats.service';
import { Chat } from '../../data/interfaces/chats.interface';

@Component({
  selector: 'app-profile-page',
  imports: [
    ProfileHeaderComponent,
    SvgIconComponent,
    RouterLink,
    NgOptimizedImage,
    PostFeedComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  private readonly _profileService: ProfileService = inject(ProfileService);
  private readonly _chatsService: ChatsService = inject(ChatsService);
  private readonly _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly _router: Router = inject(Router);
  private readonly _destroyRef: DestroyRef = inject(DestroyRef);

  private readonly _params: Signal<Params> = toSignal(this._activatedRoute.params, {
    initialValue: {},
  });

  private readonly _myProfile$: Observable<Profile | null> = toObservable(
    this._profileService.myProfile,
  );

  protected readonly subscribers: Signal<Profile[]> = toSignal(
    this._profileService.getSubscribersShortList(5),
    { initialValue: [] },
  );

  protected readonly isVisibleSettings: Signal<boolean> = computed<boolean>(
    (): boolean =>
      this._params()['id'] === 'me' ||
      this._params()['id'] === this._profileService.myProfile()?.id,
  );

  protected readonly profile: Signal<Profile | null> = toSignal(
    toObservable(this._params).pipe(
      switchMap(({ id }: Params): Observable<Profile | null> => {
        if (id === 'me') {
          return this._myProfile$;
        }
        return this._profileService.getAccount(id);
      }),
    ),
    { initialValue: null },
  );

  protected sendMessage(userId: number): void {
    this._chatsService
      .createChat(userId)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((chat: Chat): void => {
        this._router.navigate(['/chats', chat.id]);
      });
  }
}
