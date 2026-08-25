import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { LoginForm, AuthService } from '../../data';
import { SvgIconComponent, TtInputComponent } from '@tt/common-ui';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'lib-login-page',
  imports: [ReactiveFormsModule, NgOptimizedImage, SvgIconComponent, TtInputComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);
  private readonly _title: Title = inject(Title);
  private readonly _meta: Meta = inject(Meta);

  protected readonly isPasswordVisible: WritableSignal<boolean> = signal<boolean>(false);

  protected readonly form: FormGroup<LoginForm> = new FormGroup<LoginForm>({
    username: new FormControl('lastovkaalexei', {
      nonNullable: true,
      validators: Validators.required,
    }),
    password: new FormControl('n1zAPuU9hq', { nonNullable: true, validators: Validators.required }),
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
