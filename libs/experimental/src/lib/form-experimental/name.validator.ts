import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { inject, Service } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Profile } from '@tt/interfaces/profile';

@Service()
export class NameValidator implements AsyncValidator {
  private readonly _http: HttpClient = inject(HttpClient);

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this._http.get<Profile[]>('https://icherniakov.ru/yt-course/account/test_accounts').pipe(
      delay(2000),
      map((users: Profile[]) => {
        return users.filter((user: Profile): boolean => user.firstName === control.value).length > 0
          ? null
          : {
              nameValid: {
                message: `Имя должно быть одним из списка : ${users.map((user: Profile): string => user.firstName).join(',')}`,
              },
            };
      }),
    );
  }
}
