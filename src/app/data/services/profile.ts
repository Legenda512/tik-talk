import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../interfaces/profile.interface';

@Service()
export class ProfileService {
  private readonly _http: HttpClient = inject(HttpClient);

  private readonly _baseApiUrl: string = 'https://icherniakov.ru/yt-course/';

  getTestAccounts(): Observable<Profile[]> {
    return this._http.get<Profile[]>(`${this._baseApiUrl}account/test_accounts`);
  }

  getMe(): Observable<Profile> {
    return this._http.get<Profile>(`${this._baseApiUrl}account/me`);
  }
}
