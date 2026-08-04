import { Component, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DndDirective, SvgIconComponent } from '@tt/common-ui';

@Component({
  selector: 'app-avatar-upload',
  imports: [SvgIconComponent, DndDirective, FormsModule],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss',
})
export class AvatarUploadComponent {
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
    reader.onload = (event: ProgressEvent<FileReader>): void => {
      this.preview.set(event.target?.result?.toString() ?? '');
    };

    reader.readAsDataURL(file);
    this.avatar.set(file);
  }
}
