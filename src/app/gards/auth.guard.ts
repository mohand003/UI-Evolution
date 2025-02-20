import { inject, Inject } from '@angular/core';
import { AuthService } from '../services/authng.service';
import { Router, CanActivateFn } from '@angular/router';
import { Token } from '@angular/compiler';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const token= localStorage.getItem('token')!;
  try {
    if (token &&  authService?.getUserData(token)) {
      return true;
    } else {
      router.navigate(['/login'])
      return false;
    }
  } catch (error) {
    router.navigate(['/login'])
    return false;
  }

};
