import { Component, computed, inject, Signal } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { NgOptimizedImage } from '@angular/common';
import { ProfileService } from '../../data';
import { ProfileHeaderComponent } from '../../ui';
import { PostFeedComponent } from '@tt/posts';
import { Profile } from '@tt/interfaces/profile';
import { SvgIconComponent } from '@tt/common-ui';

@Component({
  selector: 'lib-profile-page',
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
  private readonly _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly _router: Router = inject(Router);

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
    this._router.navigate(['/chats', 'new'], { queryParams: { userId } });
  }
}
