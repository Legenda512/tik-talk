import {
  Component,
  inject,
  output,
  OutputEmitterRef,
  Renderer2,
  signal,
  WritableSignal,
} from '@angular/core';
import { AvatarCircleComponent } from '../avatar-circle/avatar-circle.component';
import { FormsModule } from '@angular/forms';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { ProfileService } from '../../data/services/profile.service';
import { Profile } from '../../data/interfaces/profile.interface';

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
