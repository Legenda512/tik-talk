import { Component, forwardRef, signal, WritableSignal } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lib-stack-input',
  standalone: true,
  imports: [SvgIconComponent, FormsModule],
  templateUrl: './stack-input.component.html',
  styleUrl: './stack-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => StackInputComponent),
    },
  ],
  host: {
    '[class.disabled]': 'isDisabled()',
  },
})
export class StackInputComponent implements ControlValueAccessor {
  public value: WritableSignal<string[]> = signal<string[]>([]);
  public innerInput: string | null = null;
  public isDisabled: WritableSignal<boolean> = signal<boolean>(false);

  public onChange: (value: string[]) => void = () => {};
  public onTouched: () => void = () => {};

  public writeValue(stack: unknown): void {
    if (Array.isArray(stack)) {
      this.value.set(stack);
      return;
    }

    if (typeof stack === 'string' && stack.trim()) {
      this.value.set([stack.trim()]);
      return;
    }

    this.value.set([]);
  }

  public registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  protected onEnter(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    const tag = this.innerInput?.trim();

    if (!tag) {
      return;
    }

    const nextValue = [...this.value(), tag];
    this.value.set(nextValue);
    this.onChange(nextValue);
    this.onTouched();
    this.innerInput = '';
  }

  protected onTagDelete(index: number): void {
    const nextValue = this.value().filter((_, i) => i !== index);
    this.value.set(nextValue);
    this.onChange(nextValue);
    this.onTouched();
  }
}
