import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../../data/services/profile.service';
import { debounceTime, startWith, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SearchForm } from '../../../data/interfaces/search-form.interface';

@Component({
  selector: 'app-profile-filters',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './profile-filters.html',
  styleUrl: './profile-filters.scss',
})
export class ProfileFilters implements OnInit {
  private readonly _profileService: ProfileService = inject(ProfileService);
  private readonly _destroyRef: DestroyRef = inject(DestroyRef);

  protected readonly searchForm: FormGroup<SearchForm> = new FormGroup<SearchForm>({
    firstName: new FormControl('', { nonNullable: true }),
    lastName: new FormControl('', { nonNullable: true }),
    stack: new FormControl('', { nonNullable: true }),
  });

  ngOnInit(): void {
    this.searchForm.valueChanges
      .pipe(
        startWith(this.searchForm.getRawValue()),
        debounceTime(300),
        switchMap((formValue) => {
          return this._profileService.filterProfiles(formValue);
        }),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe();
  }
}
