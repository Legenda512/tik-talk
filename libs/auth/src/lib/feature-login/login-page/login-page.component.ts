import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { LoginForm, AuthService } from '../../data';
import { SvgIconComponent } from '@tt/common-ui';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, NgOptimizedImage, SvgIconComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);

  protected readonly isPasswordVisible: WritableSignal<boolean> = signal<boolean>(false);

  protected readonly form: FormGroup<LoginForm> = new FormGroup<LoginForm>({
    username: new FormControl('', { nonNullable: true, validators: Validators.required }),
    password: new FormControl('', { nonNullable: true, validators: Validators.required }),
  });

  protected onSubmit(): void {
    if (this.form.valid) {
      this._authService.login(this.form.getRawValue()).subscribe((): void => {
        this._router.navigate(['']);
      });
    }
  }
}
