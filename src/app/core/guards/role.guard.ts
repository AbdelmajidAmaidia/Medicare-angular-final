import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const allowedRoles: string[] = route.data['roles'] ?? [];

  // ✅ Obtenir l'utilisateur depuis le service
  const currentUser = authService.getCurrentUser();

  if (currentUser && allowedRoles.includes(currentUser.role)) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};