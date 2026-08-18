import { Component, inject, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { LoginForm, AuthService } from '../../data';
import { SvgIconComponent, TtInputComponent } from '@tt/common-ui';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, NgOptimizedImage, SvgIconComponent, TtInputComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);
  private readonly _title: Title = inject(Title);
  private readonly _meta: Meta = inject(Meta);
  private readonly _platformId = inject(PLATFORM_ID);

  protected readonly isPasswordVisible: WritableSignal<boolean> = signal<boolean>(false);

  protected readonly form: FormGroup<LoginForm> = new FormGroup<LoginForm>({
    username: new FormControl('USERNAME', { nonNullable: true, validators: Validators.required }),
    password: new FormControl('', { nonNullable: true, validators: Validators.required }),
  });

  // пример работы с ssr
  constructor() {
    this._title.setTitle('Login');
    this._meta.addTag({ property: 'desc', content: 'example' });
  }

  protected onSubmit(): void {
    if (this.form.valid) {
      this._authService.login(this.form.getRawValue()).subscribe((): void => {
        this._router.navigate(['']);
      });
    }
  }
}
