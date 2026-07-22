import {inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Profile} from '../interfaces/profile.interface';

@Service()
export class ProfileService {
  private readonly http: HttpClient = inject(HttpClient);

  private readonly baseApiUrl: string = 'https://icherniakov.ru/yt-course/';

  getTestAccounts(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`)
  }
}
