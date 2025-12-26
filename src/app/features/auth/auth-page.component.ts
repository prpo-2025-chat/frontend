import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { EMPTY, catchError, finalize, tap } from 'rxjs';

import { UserApi } from '../../../api/users/user.api';
import { AuthStore } from '../../core/state/auth.store';
import { LoginRequest, RegisterRequest } from '../../../api/users/user.dto';
import { ToastService } from '../../core/ui/toast/toast.service';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export class AuthPageComponent {

  private readonly fb = inject(FormBuilder);
  private readonly userApi = inject(UserApi);
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  readonly user$ = this.authStore.user$;

  readonly loginForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  readonly registerForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(2)]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });

  loginPending = false;
  registerPending = false;
  errorMessage = '';

  logout() {
    this.authStore.clear();
    this.router.navigate(['/auth']);
    this.toast.info('Signed out');
  }

  submitLogin() {
    if (this.loginPending || this.loginForm.invalid) {
      return;
    }

    this.loginPending = true;
    this.errorMessage = '';
    const payload: LoginRequest = this.loginForm.getRawValue();

    this.userApi.login(payload).pipe(
      tap((user) => this.authStore.setUser(user)),
      tap(() => this.router.navigate(['/chats'])),
      catchError((err) => {
        this.errorMessage = err?.message || err?.error || 'Login failed';
        this.toast.error(this.errorMessage);
        return EMPTY;
      }),
      finalize(() => (this.loginPending = false))
    )
    .subscribe();
  }

  submitRegister() {
    if (this.registerPending || this.registerForm.invalid) {
      return;
    }

    this.registerPending = true;
    this.errorMessage = '';
    const payload: RegisterRequest = this.registerForm.getRawValue();

    this.userApi.register(payload).pipe(
      tap((user) => this.authStore.setUser(user)),
      tap(() => this.router.navigate(['/chats'])),
      catchError((err) => {
        this.errorMessage = err?.message || err?.error || 'Registration failed';
        this.toast.error(this.errorMessage);
        return EMPTY;
      }),
      finalize(() => (this.registerPending = false))
    )
    .subscribe();
  }
}
