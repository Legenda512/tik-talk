import { createSelector } from '@ngrx/store';
import { profileFeature, ProfileState } from './reducer';
import { Profile } from '@tt/interfaces/profile';

export const selectFilteredProfiles = createSelector(
  profileFeature.selectProfiles,
  (profiles: Profile[]): Profile[] => profiles,
);

export const selectProfileFilters = createSelector(
  profileFeature.selectProfileFilters,
  (
    profileFilters: Record<string, string | number | boolean | null>,
  ): Record<string, string | number | boolean | null> => profileFilters,
);

export const selectProfilePageable = createSelector(
  profileFeature.selectProfileFeatureState,
  (state: ProfileState) => {
    return {
      page: state.page,
      size: state.size,
    };
  },
);
