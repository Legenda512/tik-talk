import { Component, effect, inject, Signal, viewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { forkJoin, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { AvatarUploadComponent, ProfileHeaderComponent } from '../../ui';
import { ProfileService, SettingsForm } from '../../data';
import { Profile } from '@tt/interfaces/profile';
import { StackInputComponent } from '@tt/common-ui';

@Component({
  selector: 'app-settings-page',
  imports: [
    ProfileHeaderComponent,
    ReactiveFormsModule,
    AvatarUploadComponent,
    StackInputComponent,
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
})
export class SettingsPageComponent {
  private readonly _profileService: ProfileService = inject(ProfileService);
  private readonly _routerService: Router = inject(Router);
  private readonly _avatarUploader: Signal<AvatarUploadComponent | undefined> =
    viewChild(AvatarUploadComponent);

  protected readonly form: FormGroup<SettingsForm> = new FormGroup<SettingsForm>({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    username: new FormControl({ value: '', disabled: true }, Validators.required),
    description: new FormControl(''),
    stack: new FormControl([]),
  });

  protected readonly profile: Profile | null = this._profileService.myProfile();

  constructor() {
    effect((): void => {
      const profile: Profile | null = this._profileService.myProfile();
      if (profile) {
        this.form.patchValue({
          ...profile,
        });
      }
    });
  }

  protected onSave(): void {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      return;
    }

    const avatarUploader: AvatarUploadComponent | undefined = this._avatarUploader();
    const avatar: File | null = avatarUploader?.avatar() ?? null;

    const formValue = this.form.getRawValue();
    const payload: Partial<Profile> = {
      firstName: formValue.firstName ?? '',
      lastName: formValue.lastName ?? '',
      description: formValue.description ?? '',
      stack: formValue.stack ?? [],
    };

    const avatarRequest$: Observable<object> | Observable<null> = avatar
      ? this._profileService.uploadAvatar(avatar)
      : of(null);
    const profileRequest$: Observable<Profile> = this._profileService.patchProfile(payload);

    forkJoin([avatarRequest$, profileRequest$]).subscribe({
      next: () => this._routerService.navigate(['/profile/me']),
      error: (error) => console.error('Failed to save profile', error),
    });
  }
}
