import { inject, Service, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Profile } from '../interfaces/profile.interface';
import { Pageable } from '../interfaces/pageable.interface';

@Service()
export class ProfileService {
  private readonly _http: HttpClient = inject(HttpClient);

  private readonly _baseApiUrl: string = 'https://icherniakov.ru/yt-course/';

  public readonly myProfile: WritableSignal<Profile | null> = signal<Profile | null>(null);

  getTestAccounts(): Observable<Profile[]> {
    return this._http.get<Profile[]>(`${this._baseApiUrl}account/test_accounts`);
  }

  getMe(): Observable<Profile> {
    return this._http
      .get<Profile>(`${this._baseApiUrl}account/me`)
      .pipe(tap((response: Profile): void => this.myProfile.set(response)));
  }

  getSubscribersShortList(): Observable<Profile[]> {
    return this._http
      .get<Pageable<Profile>>(`${this._baseApiUrl}account/subscribers/`)
      .pipe(map((response: Pageable<Profile>): Profile[] => response.items.slice(0, 3)));
  }
}
