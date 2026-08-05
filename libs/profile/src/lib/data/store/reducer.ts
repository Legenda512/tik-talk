import { Profile } from '@tt/interfaces/profile';
import { createFeature, createReducer, on } from '@ngrx/store';
import { profileActions } from './actions';

export interface ProfileState {
  profiles: Profile[];
  profileFilters: Record<string, string | number | boolean | null>;
}

export const initialState: ProfileState = {
  profiles: [],
  profileFilters: {},
};

export const profileFeature = createFeature({
  name: 'profileFeature',
  reducer: createReducer(
    initialState,
    on(profileActions.profilesLoaded, (state: ProfileState, payload) => ({
      ...state,
      profiles: payload.profiles,
    })),
    on(profileActions.filterEvents, (state: ProfileState, payload) => ({
      ...state,
      profileFilters: payload.filters,
    })),
  ),
});
