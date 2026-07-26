import { Component, effect, inject, Signal, viewChild } from '@angular/core';
import { ProfileHeader } from '../../common-ui/profile-header/profile-header';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../data/services/profile';
import { Profile } from '../../data/interfaces/profile.interface';
import { AvatarUpload } from './avatar-upload/avatar-upload';

@Component({
  selector: 'app-settings-page',
  imports: [ProfileHeader, ReactiveFormsModule, AvatarUpload],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss',
})
export class SettingsPage {
  private readonly _profileService: ProfileService = inject(ProfileService);
  private readonly _avatarUploader: Signal<AvatarUpload | undefined> = viewChild(AvatarUpload);

  protected readonly form = new FormGroup({
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

    const avatarUploader: AvatarUpload | undefined = this._avatarUploader();
    if (avatarUploader) {
      const avatar: File | null = avatarUploader.avatar();

      if (avatar) {
        this._profileService.uploadAvatar(avatar).subscribe();
      }
    }

    const formValue = this.form.getRawValue();

    const payload: Partial<Profile> = {
      firstName: formValue.firstName ?? '',
      lastName: formValue.lastName ?? '',
      description: formValue.description ?? '',
      stack: this.splitStack(formValue.stack),
    };

    this._profileService.patchProfile(payload).subscribe();
  }
}
