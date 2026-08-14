import { Service } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Address {
  city?: string;
  street?: string;
  building?: number;
  apartment?: number;
}

export interface Feature {
  code: string;
  label: string;
  value: boolean;
}

@Service()
export class MockService {
  getAddresses(): Observable<Address[]> {
    return of([
      {
        city: 'Moscow',
        street: 'Tverskaya',
        building: 10,
        apartment: 15,
      },
      {
        city: 'Saint Petersburg',
        street: 'Nevsky Prospect',
        building: 25,
        apartment: 8,
      },
    ]);
  }

  getFeatures(): Observable<Feature[]> {
    return of([
      {
        code: 'lift',
        label: 'Подъем на этаж',
        value: true,
      },
      {
        code: 'strong-package',
        label: 'Усиленная упаковка',
        value: true,
      },
      {
        code: 'fast',
        label: 'Ускроенная доставка',
        value: false,
      },
    ]);
  }
}
