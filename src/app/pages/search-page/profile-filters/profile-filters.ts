import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../../data/services/profile';
import { debounceTime, startWith, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile-filters',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './profile-filters.html',
  styleUrl: './profile-filters.scss',
})
export class ProfileFilters implements OnInit {
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _profileService: ProfileService = inject(ProfileService);
  private readonly _destroyRef: DestroyRef = inject(DestroyRef);

  protected readonly searchForm = this._formBuilder.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  });

  ngOnInit(): void {
    this.searchForm.valueChanges
      .pipe(
        startWith({}),
        debounceTime(300),
        switchMap((formValue) => {
          return this._profileService.filterProfiles(formValue);
        }),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe();
  }
}
