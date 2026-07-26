import { Component, signal, WritableSignal } from '@angular/core';
import { SvgIcon } from '../../../common-ui/svg-icon/svg-icon';
import { Dnd } from '../../../common-ui/directives/dnd';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-avatar-upload',
  imports: [SvgIcon, Dnd, FormsModule],
  templateUrl: './avatar-upload.html',
  styleUrl: './avatar-upload.scss',
})
export class AvatarUpload {
  protected readonly preview: WritableSignal<string> = signal<string>(
    'assets/imgs/avatar-placeholder.png',
  );

  public readonly avatar: WritableSignal<File | null> = signal<File | null>(null);

  protected fileBrowserHandler(event: Event): void {
    const file: File | undefined = (event.target as HTMLInputElement)?.files?.[0];
    this.processFiles(file);
  }

  protected onFileDropped(file: File | undefined): void {
    this.processFiles(file);
  }

  private processFiles(file: File | undefined): void {
    if (!file || !file.type.match('image')) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (event): void => {
      this.preview.set(event.target?.result?.toString() ?? '');
    };

    reader.readAsDataURL(file);
    this.avatar.set(file);
  }
}
