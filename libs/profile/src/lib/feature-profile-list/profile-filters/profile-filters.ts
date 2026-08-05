import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  profileActions,
  // profileStore,
  SearchForm,
  selectProfileFilters,
} from '../../data';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-profile-filters',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './profile-filters.html',
  styleUrl: './profile-filters.scss',
})
export class ProfileFilters implements OnInit {
  private readonly _destroyRef: DestroyRef = inject(DestroyRef);
  //NgRX store
  private readonly _store = inject(Store);

  /*
  // NgRX signal store
  private readonly _store = inject(profileStore);
  */

  protected readonly searchForm: FormGroup<SearchForm> = new FormGroup<SearchForm>({
    firstName: new FormControl('', { nonNullable: true }),
    lastName: new FormControl('', { nonNullable: true }),
    stack: new FormControl('', { nonNullable: true }),
  });

  ngOnInit(): void {
    // NgRX store
    const activeFilters = this._store.selectSignal(selectProfileFilters);
    this.searchForm.patchValue(activeFilters(), { emitEvent: false });

    this.searchForm.valueChanges
      .pipe(
        startWith(this.searchForm.getRawValue()),
        debounceTime(300),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe((formValue) => {
        // NgRX store
        this._store.dispatch(profileActions.filterEvents({ filters: formValue }));

        /*// NgRx signals
        this._store.filterProfiles(formValue);*/
      });
  }
}
