import { Component, computed, inject, Signal } from '@angular/core';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Profile } from '../../data/interfaces/profile.interface';
import { NgOptimizedImage } from '@angular/common';
import { SvgIconComponent } from '../../common-ui/svg-icon/svg-icon.component';
import { PostFeedComponent } from './post-feed/post-feed.component';

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
  private readonly _activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  protected readonly subscribers: Signal<Profile[]> = toSignal(
    this._profileService.getSubscribersShortList(5),
    { initialValue: [] },
  );

  private readonly _params: Signal<Params> = toSignal(this._activatedRoute.params, {
    initialValue: {},
  });

  protected readonly isVisibleSettings: Signal<boolean> = computed<boolean>(
    (): boolean => this._params()['id'] === 'me',
  );

  private readonly _myProfile$: Observable<Profile | null> = toObservable(
    this._profileService.myProfile,
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
}
