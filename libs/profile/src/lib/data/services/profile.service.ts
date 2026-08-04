import { inject, Service, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { GlobalStoreService, Pageable } from '@tt/shared';
import { Profile } from '@tt/interfaces/profile';

@Service()
export class ProfileService {
  private readonly _http: HttpClient = inject(HttpClient);
  private readonly _globalStoreService: GlobalStoreService = inject(GlobalStoreService);

  private readonly _baseApiUrl: string = 'https://icherniakov.ru/yt-course/';

  public readonly myProfile: WritableSignal<Profile | null> = signal<Profile | null>(null);

  public readonly filtersProfiles: WritableSignal<Profile[]> = signal<Profile[]>([]);

  public getTestAccounts(): Observable<Profile[]> {
    return this._http.get<Profile[]>(`${this._baseApiUrl}account/test_accounts`);
  }

  public getMe(): Observable<Profile> {
    return this._http.get<Profile>(`${this._baseApiUrl}account/me`).pipe(
      tap((response: Profile): void => {
        this.myProfile.set(response);
        this._globalStoreService.myProfile.set(response);
      }),
    );
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

  public uploadAvatar(file: File): Observable<object> {
    const formData = new FormData();
    formData.append('image', file);

    return this._http
      .post<{ avatarUrl: string }>(`${this._baseApiUrl}account/upload_image`, formData)
      .pipe(
        tap((response: { avatarUrl: string }) => {
          const current: Profile | null = this.myProfile();
          if (current) {
            this.myProfile.set({ ...current, avatarUrl: response.avatarUrl });
          }
        }),
      );
  }

  public filterProfiles(
    params: Record<string, string | number | boolean | null>,
  ): Observable<Pageable<Profile>> {
    const cleanedParams = Object.fromEntries(
      Object.entries(params).filter(([, value]) => value !== null && value !== ''),
    ) as Record<string, string | number | boolean>;

    return this._http
      .get<Pageable<Profile>>(`${this._baseApiUrl}account/accounts`, {
        params: cleanedParams,
      })
      .pipe(
        tap((response: Pageable<Profile>) => {
          this.filtersProfiles.set(response.items);
        }),
      );
  }
}
