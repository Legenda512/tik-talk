import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormRecord,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Address, Feature, MockService } from '../experimental/mock.service';
import { NameValidator } from './name.validator';

enum ReceiverType {
  PERSON = 'PERSON',
  LEGAL = 'LEGAL',
}

function getAddressForm(initialValue: Address = {}) {
  return new FormGroup({
    city: new FormControl<string>(initialValue.city ?? ''),
    street: new FormControl<string>(initialValue.street ?? ''),
    building: new FormControl<number | null>(initialValue.building ?? null),
    apartment: new FormControl<number | null>(initialValue.apartment ?? null),
  });
}

function validateStartWith(forbiddenLetter: string): ValidatorFn {
  return (control: AbstractControl) => {
    return control.value.startsWith(forbiddenLetter)
      ? { startsWith: { message: `${forbiddenLetter} - последняя буква алфавита` } }
      : null;
  };
}

function validateDateRange({
  fromControlName,
  toControlName,
}: {
  fromControlName: string;
  toControlName: string;
}) {
  return (control: AbstractControl) => {
    const fromControl = control.get(fromControlName);
    const toControl = control.get(toControlName);

    if (!fromControl || !toControl) {
      return null;
    }
    const fromDate = new Date(fromControl.value);
    const toDate = new Date(toControl.value);

    if (fromDate && toDate && fromDate > toDate) {
      fromControl.setErrors({
        dataRange: { message: 'Дата начала не можем быть позднее даты конца' },
      });
      toControl.setErrors({
        dataRange: { message: 'Дата начала не можем быть позднее даты конца' },
      });
      return { dataRange: { message: 'Дата начала не можем быть позднее даты конца' } };
    }

    return null;
  };
}

@Component({
  selector: 'tt-form-experimental',
  imports: [ReactiveFormsModule],
  templateUrl: './form-experimental.component.html',
  styleUrl: './form-experimental.component.scss',
})
export class FormExperimentalComponent implements OnInit {
  private readonly _destroyRef: DestroyRef = inject(DestroyRef);
  private readonly _mockService: MockService = inject(MockService);
  private readonly _nameValidator: NameValidator = inject(NameValidator);
  protected ReceiverType: typeof ReceiverType = ReceiverType;
  protected features: Feature[] = [];

  protected readonly form = new FormGroup({
    type: new FormControl<ReceiverType>(ReceiverType.PERSON),
    name: new FormControl<string>('', {
      validators: [Validators.required],
      asyncValidators: [this._nameValidator.validate.bind(this._nameValidator)],
      updateOn: 'blur',
    }),
    inn: new FormControl<string>(''),
    lastName: new FormControl<string>(''),
    addresses: new FormArray([getAddressForm()]),
    feature: new FormRecord({}),
    dateRange: new FormGroup(
      {
        from: new FormControl<string>(''),
        to: new FormControl<string>(''),
      },
      validateDateRange({ fromControlName: 'from', toControlName: 'to' }),
    ),
  });

  ngOnInit(): void {
    this._mockService
      .getAddresses()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((addresses: Address[]): void => {
        this.form.controls.addresses.clear();

        for (const address of addresses) {
          this.form.controls.addresses.push(getAddressForm(address));
        }
      });

    this._mockService
      .getFeatures()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((features: Feature[]): void => {
        this.features = features;

        for (const feature of features) {
          this.form.controls.feature.addControl(feature.code, new FormControl(feature.value));
        }
      });

    this.form.controls.type.valueChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((value: ReceiverType | null): void => {
        this.form.controls.inn.clearValidators();

        if (value === ReceiverType.LEGAL) {
          this.form.controls.inn.setValidators([Validators.required, Validators.minLength(10)]);
        }
      });
  }

  protected onSubmit(event: SubmitEvent): void {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      return;
    }
    console.log('value', this.form.value);
    console.log('rawvalue', this.form.getRawValue());
  }

  protected addAddress(): void {
    this.form.controls.addresses.push(getAddressForm());
  }

  protected deleteAddress(index: number): void {
    this.form.controls.addresses.removeAt(index, { emitEvent: false });
  }
}
