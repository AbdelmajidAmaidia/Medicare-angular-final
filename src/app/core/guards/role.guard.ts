import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService, UserRole } from '../../services/auth.service';

const VALID_ROLES: UserRole[] = ['patient', 'doctor', 'lab', 'pharmacy', 'admin'];

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const allowedRoles: string[] = route.data['roles'] ?? [];

  // ✅ Obtenir l'utilisateur depuis le service
  const currentUser = authService.getCurrentUser();

  if (currentUser && allowedRoles.includes(currentUser.role)) {
    return true;
  }

  // Si connecté mais mauvais rôle → rediriger vers son propre tableau de bord
  if (currentUser && VALID_ROLES.includes(currentUser.role)) {
    router.navigate([`/dashboard/${currentUser.role}/home`]);
  } else {
    router.navigate(['/login']);
  }
  return false;
};