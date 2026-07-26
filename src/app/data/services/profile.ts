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

  public readonly filtersProfiles: WritableSignal<Profile[]> = signal<Profile[]>([]);

  public getTestAccounts(): Observable<Profile[]> {
    return this._http.get<Profile[]>(`${this._baseApiUrl}account/test_accounts`);
  }

  public getMe(): Observable<Profile> {
    return this._http
      .get<Profile>(`${this._baseApiUrl}account/me`)
      .pipe(tap((response: Profile): void => this.myProfile.set(response)));
  }

  public getAccount(id: string): Observable<Profile> {
    return this._http.get<Profile>(`${this._baseApiUrl}account/${id}`);
  }

  public getSubscribersShortList(subAmount = 3): Observable<Profile[]> {
    return this._http
      .get<Pageable<Profile>>(`${this._baseApiUrl}account/subscribers/`)
      .pipe(map((response: Pageable<Profile>): Profile[] => response.items.slice(0, subAmount)));
  }

  public patchProfile(profile: Partial<Profile>): Observable<Profile> {
    return this._http
      .patch<Profile>(`${this._baseApiUrl}account/me`, profile)
      .pipe(tap((response: Profile): void => this.myProfile.set(response)));
  }

  public uploadAvatar(file: File): Observable<Object> {
    const formData = new FormData();
    formData.append('image', file);

    return this._http.post(`${this._baseApiUrl}account/upload_image`, formData);
  }

  public filterProfiles(params: Record<string, any>): Observable<Pageable<Profile>> {
    return this._http
      .get<Pageable<Profile>>(`${this._baseApiUrl}account/accounts`, {
        params,
      })
      .pipe(
        tap((response: Pageable<Profile>) => {
          this.filtersProfiles.set(response.items);
        }),
      );
  }
}
