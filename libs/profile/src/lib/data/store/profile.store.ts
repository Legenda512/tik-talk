import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Profile } from '@tt/interfaces/profile';
import { inject } from '@angular/core';
import { ProfileService } from '../services';
import { RxMethod, rxMethod } from '@ngrx/signals/rxjs-interop';
import { Observable, pipe, switchMap, tap } from 'rxjs';
import { Pageable } from '@tt/shared';

export interface ProfileStateModel {
  profiles: Profile[];
  profileFilters: Record<string, string | number | boolean | null>;
}

const initialState: ProfileStateModel = {
  profiles: [],
  profileFilters: {},
};

export const profileStore = signalStore(
  withState(initialState),

  withMethods((state, profileService: ProfileService = inject(ProfileService)) => {
    const filterProfiles: RxMethod<Record<string, string | number | boolean | null>> = rxMethod<
      Record<string, string | number | boolean | null>
    >(
      pipe(
        switchMap(
          (
            filters: Record<string, string | number | boolean | null>,
          ): Observable<Pageable<Profile>> => {
            return profileService
              .filterProfiles(filters)
              .pipe(
                tap((result: Pageable<Profile>): void =>
                  patchState(state, { profiles: result.items }),
                ),
              );
          },
        ),
      ),
    );
    return {
      filterProfiles,
    };
  }),
);
