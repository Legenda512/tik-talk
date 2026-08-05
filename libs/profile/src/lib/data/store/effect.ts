import { inject, Service } from '@angular/core';
import { ProfileService } from '../services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { profileActions } from './actions';
import { map, Observable, switchMap } from 'rxjs';
import { Pageable } from '@tt/shared';
import { Profile } from '@tt/interfaces/profile';

@Service()
export class ProfileEffects {
  private readonly _profileService: ProfileService = inject(ProfileService);
  private readonly _actions$ = inject(Actions);

  filterProfiles = createEffect(() => {
    return this._actions$.pipe(
      ofType(profileActions.filterEvents),
      switchMap(({ filters }): Observable<Pageable<Profile>> => {
        return this._profileService.filterProfiles(filters);
      }),
      map((response) => profileActions.profilesLoaded({ profiles: response.items })),
    );
  });
}
