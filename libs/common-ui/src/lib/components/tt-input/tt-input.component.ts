import {
  Component,
  forwardRef,
  input,
  InputSignal,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'lib-tt-input',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './tt-input.component.html',
  styleUrl: './tt-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TtInputComponent),
    },
  ],
})
export class TtInputComponent implements ControlValueAccessor {
  public readonly type: InputSignal<'text' | 'password'> = input.required<'text' | 'password'>();

  public readonly placeholder: InputSignal<string> = input.required<string>();

  public onChange: any;

  public onTouched: any;

  public value: string | null = null;

  disabled: WritableSignal<boolean> = signal<boolean>(false);

  public writeValue(value: string | null): void {
    this.value = value;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  protected onModelChange(value: string | null): void {
    this.onChange(value);
  }
}
