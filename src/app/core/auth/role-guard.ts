import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, AppRole } from './auth.service';

export function roleGuard(required: AppRole[]): CanActivateFn {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (auth.user && required.some(r => auth.hasRole(r))) return true;

    router.navigateByUrl('/app');
    return false;
  };
}