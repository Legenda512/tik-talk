import { Component, forwardRef, inject, Signal, signal, WritableSignal } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { TtInputComponent } from '../tt-input/tt-input.component';
import { DadataService } from '../../data';
import { debounceTime, Observable, switchMap, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { DadataSuggestion } from '../../data/interfaces/dadata.interface';

@Component({
  selector: 'lib-address-input',
  imports: [TtInputComponent, ReactiveFormsModule],
  templateUrl: './address-input.component.html',
  styleUrl: './address-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AddressInputComponent),
    },
  ],
})
export class AddressInputComponent implements ControlValueAccessor {
  private readonly _dadataService: DadataService = inject(DadataService);

  protected readonly innerSearchControl: FormControl<string> = new FormControl<string>('', {
    nonNullable: true,
  });

  protected readonly isDropdownOpened: WritableSignal<boolean> = signal<boolean>(true);
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);

  protected readonly suggestions: Signal<DadataSuggestion[] | undefined> = toSignal(
    this.innerSearchControl.valueChanges.pipe(
      debounceTime(500),
      switchMap((value: string): Observable<DadataSuggestion[]> => {
        return this._dadataService.getSuggestion(value).pipe(
          tap((response: DadataSuggestion[]): void => {
            this.isDropdownOpened.set(response.length > 0);
          }),
        );
      }),
    ),
  );

  public onChange: (value: string | null) => void = (): void => {
    // noop
  };

  public onTouched: () => void = (): void => {
    // noop
  };

  public writeValue(city: string | null): void {
    this.innerSearchControl.patchValue(city ?? '', {
      emitEvent: false,
    });
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);

    if (isDisabled) {
      this.innerSearchControl.disable({ emitEvent: false });
    } else {
      this.innerSearchControl.enable({ emitEvent: false });
    }
  }

  public registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  protected onSuggestionPick(city: string): void {
    this.isDropdownOpened.set(false);
    this.innerSearchControl.patchValue(city, { emitEvent: false });
    this.onChange(city);
    this.onTouched();
  }
}
