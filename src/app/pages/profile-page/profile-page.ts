import { Component, inject } from '@angular/core';
import { ProfileHeader } from '../../common-ui/profile-header/profile-header';
import { ProfileService } from '../../data/services/profile';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { Profile } from '../../data/interfaces/profile.interface';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { SvgIcon } from '../../common-ui/svg-icon/svg-icon';
import { PostFeed } from './post-feed/post-feed';

@Component({
  selector: 'app-profile-page',
  imports: [ProfileHeader, AsyncPipe, SvgIcon, RouterLink, NgOptimizedImage, PostFeed],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage {
  private readonly _profileService: ProfileService = inject(ProfileService);
  private readonly _activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  private readonly _myProfile$: Observable<Profile | null> = toObservable(
    this._profileService.myProfile,
  );

  protected readonly subscribers$: Observable<Profile[]> =
    this._profileService.getSubscribersShortList(5);

  protected readonly profile$: Observable<Profile | null> = this._activatedRoute.params.pipe(
    switchMap(({ id }: Params): Observable<Profile | null> => {
      if (id === 'me') {
        return this._myProfile$;
      }

      return this._profileService.getAccount(id);
    }),
  );
}
