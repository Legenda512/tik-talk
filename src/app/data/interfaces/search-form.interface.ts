import { FormControl } from '@angular/forms';

export interface SearchForm {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  stack: FormControl<string | null>;
}
