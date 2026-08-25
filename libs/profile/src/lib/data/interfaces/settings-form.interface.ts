import { FormControl } from '@angular/forms';

export interface SettingsForm {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  username: FormControl<string | null>;
  description: FormControl<string | null>;
  stack: FormControl<string[] | null>;
  city: FormControl<string | null>;
}
