import { inject, Service } from '@angular/core';
import { ProfileService } from '../services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { profileActions } from './actions';
import { map, Observable, switchMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectProfileFilters, selectProfilePageable } from './selectors';
import { Pageable } from '@tt/shared';
import { Profile } from '@tt/interfaces/profile';

@Service()
export class ProfileEffects {
  private readonly _profileService: ProfileService = inject(ProfileService);
  private readonly _actions$ = inject(Actions);
  private readonly _store = inject(Store);

  filterProfiles = createEffect(() => {
    return this._actions$.pipe(
      ofType(profileActions.filterEvents, profileActions.setPage),
      withLatestFrom(
        this._store.select(selectProfileFilters),
        this._store.select(selectProfilePageable),
      ),
      switchMap(([_, filters, pageable]): Observable<Pageable<Profile>> => {
        return this._profileService.filterProfiles({
          ...pageable,
          ...filters,
        });
      }),
      map((response: Pageable<Profile>) =>
        profileActions.profilesLoaded({ profiles: response.items }),
      ),
    );
  });
}
