import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenResponse } from './auth.interface';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Service()
export class Auth {
  private readonly _http: HttpClient = inject(HttpClient);
  private readonly _baseApiUrl: string = 'https://icherniakov.ru/yt-course/auth/';
  private readonly _cookieService: CookieService = inject(CookieService);
  private readonly _router: Router = inject(Router);

  private _token: string | null = null;
  private _refreshToken: string | null = null;

  public get getToken(): string | null {
    return this._token;
  }

  public get isAuth(): boolean {
    if (!this._token) {
      this._token = this._cookieService.get('token');
      this._refreshToken = this._cookieService.get('refreshToken');
    }
    return !!this._token;
  }

  public login(payload: { username: string; password: string }): Observable<TokenResponse> {
    const formData: FormData = new FormData();
    formData.append('username', payload.username);
    formData.append('password', payload.password);
    return this._http
      .post<TokenResponse>(`${this._baseApiUrl}token`, formData)
      .pipe(tap((value: TokenResponse) => this.saveToken(value)));
  }

  public refreshAuthToken(): Observable<TokenResponse> {
    return this._http
      .post<TokenResponse>(`${this._baseApiUrl}refresh`, {
        refresh_token: this._refreshToken,
      })
      .pipe(
        tap((value: TokenResponse) => this.saveToken(value)),
        catchError((error) => {
          this.logout();
          return throwError(error);
        }),
      );
  }

  private logout(): void {
    this._cookieService.deleteAll();
    this._refreshToken = null;
    this._token = null;
    this._router.navigate(['/login']);
  }

  private saveToken(tokenResponse: TokenResponse): void {
    this._token = tokenResponse.access_token;
    this._refreshToken = tokenResponse.refresh_token;

    this._cookieService.set('token', this._token);
    this._cookieService.set('refreshToken', this._refreshToken);
  }
}
