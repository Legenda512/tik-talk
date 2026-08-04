import {
  Component,
  inject,
  output,
  OutputEmitterRef,
  Renderer2,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarCircleComponent, SvgIconComponent } from '@tt/common-ui';
import { ProfileService } from '@tt/profile';
import { Profile } from '@tt/interfaces/profile';

@Component({
  selector: 'app-messages-input',
  imports: [AvatarCircleComponent, FormsModule, SvgIconComponent],
  templateUrl: './messages-input.component.html',
  styleUrl: './messages-input.component.scss',
})
export class MessagesInputComponent {
  private readonly _renderer2: Renderer2 = inject(Renderer2);

  public readonly created: OutputEmitterRef<string> = output<string>();

  protected postText: WritableSignal<string> = signal('');
  protected readonly myProfile: WritableSignal<Profile | null> = inject(ProfileService).myProfile;

  protected onTextAreaInput(event: Event): void {
    const textArea = event.target as HTMLTextAreaElement;
    this._renderer2.setStyle(textArea, 'height', 'auto');
    this._renderer2.setStyle(textArea, 'height', textArea.scrollHeight + 'px');
  }

  protected onCreatePost(): void {
    if (!this.postText()) {
      return;
    }
    this.created.emit(this.postText());
    this.postText.set('');
  }
}
