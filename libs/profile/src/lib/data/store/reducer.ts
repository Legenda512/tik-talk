import { Profile } from '@tt/interfaces/profile';
import { createFeature, createReducer, on } from '@ngrx/store';
import { profileActions } from './actions';

export interface ProfileState {
  profiles: Profile[];
  profileFilters: Record<string, string | number | boolean | null>;
  page: number;
  size: number;
}

export const initialState: ProfileState = {
  profiles: [],
  profileFilters: {},
  page: 1,
  size: 10,
};

export const profileFeature = createFeature({
  name: 'profileFeature',
  reducer: createReducer(
    initialState,
    on(profileActions.profilesLoaded, (state: ProfileState, payload) => ({
      ...state,
      profiles: state.profiles.concat(payload.profiles),
    })),
    on(profileActions.filterEvents, (state: ProfileState, payload) => ({
      ...state,
      profiles: [],
      profileFilters: payload.filters,
      page: 1,
    })),
    on(profileActions.setPage, (state: ProfileState, payload) => {
      let page: number | undefined = payload.page;
      if (!page) {
        page = state.page + 1;
      }

      return {
        ...state,
        page,
      };
    }),
  ),
});
