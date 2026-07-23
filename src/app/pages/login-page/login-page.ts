import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../auth/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  private readonly _authService: Auth = inject(Auth);
  private readonly _router: Router = inject(Router);

  protected readonly isPasswordVisible: WritableSignal<boolean> = signal<boolean>(false);

  protected readonly form = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  protected onSubmit(): void {
    if (this.form.valid) {
      //@ts-ignore
      this._authService.login(this.form.getRawValue()).subscribe((): void => {
        this._router.navigate(['']);
      });
    }
  }
}
