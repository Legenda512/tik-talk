import { Directive, output, OutputEmitterRef, signal, WritableSignal } from '@angular/core';

@Directive({
  selector: '[dnd]',
  host: {
    '[class.file-over]': 'fileOver()',
    '(dragover)': 'onDragOver($event)',
    '(dragleave)': 'onDragLeave($event)',
    '(drop)': 'onDrop($event)',
  },
})
export class Dnd {
  protected readonly fileOver: WritableSignal<boolean> = signal<boolean>(false);

  public readonly fileDropped: OutputEmitterRef<File | undefined> = output<File | undefined>();

  protected onDragOver(event: DragEvent): void {
    event.stopPropagation();
    event.preventDefault();

    this.fileOver.set(true);
  }

  protected onDragLeave(event: DragEvent): void {
    event.stopPropagation();
    event.preventDefault();

    this.fileOver.set(false);
  }

  protected onDrop(event: DragEvent): void {
    event.stopPropagation();
    event.preventDefault();

    this.fileOver.set(false);

    this.fileDropped.emit(event.dataTransfer?.files[0]);
  }
}
