import { Component, effect, inject, Signal, viewChild } from '@angular/core';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../data/services/profile.service';
import { Profile } from '../../data/interfaces/profile.interface';
import { AvatarUploadComponent } from './avatar-upload/avatar-upload.component';
import { forkJoin, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { SettingsForm } from '../../data/interfaces/settings-form.interface';

@Component({
  selector: 'app-settings-page',
  imports: [ProfileHeaderComponent, ReactiveFormsModule, AvatarUploadComponent],
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
    stack: new FormControl(''),
  });

  protected readonly profile: Profile | null = this._profileService.myProfile();

  constructor() {
    effect((): void => {
      const profile: Profile | null = this._profileService.myProfile();
      if (profile) {
        this.form.patchValue({
          ...profile,
          stack: this.mergeStack(profile.stack),
        });
      }
    });
  }

  protected splitStack(stack: string | null | string[]): string[] {
    if (!stack) {
      return [];
    }

    if (Array.isArray(stack)) {
      return stack;
    }

    return stack.split(',');
  }

  protected mergeStack(stack: string | null | string[]): string {
    if (!stack) {
      return '';
    }

    if (Array.isArray(stack)) {
      return stack.join(',');
    }

    return stack;
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
      stack: this.splitStack(formValue.stack),
    };

    const avatarRequest$: Observable<Object> | Observable<null> = avatar
      ? this._profileService.uploadAvatar(avatar)
      : of(null);
    const profileRequest$: Observable<Profile> = this._profileService.patchProfile(payload);

    forkJoin([avatarRequest$, profileRequest$]).subscribe({
      next: () => this._routerService.navigate(['/profile/me']),
      error: (error) => console.error('Failed to save profile', error),
    });
  }
}
