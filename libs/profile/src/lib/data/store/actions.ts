import { createActionGroup, props } from '@ngrx/store';
import { Profile } from '@tt/interfaces/profile';

export const profileActions = createActionGroup({
  source: 'profile',
  events: {
    'filter events': props<{ filters: Record<string, string | number | boolean | null> }>(),
    'profiles loaded': props<{ profiles: Profile[] }>(),
  },
});
