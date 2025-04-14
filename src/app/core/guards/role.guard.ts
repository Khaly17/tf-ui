import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../auth/token.service';

export const RoleGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  const userRole = (tokenService.getUserRole() || '').toLowerCase(); 
  const allowedRoles = (route.data?.['roles'] as string[] || []).map(r => r.toLowerCase());

  if (allowedRoles.includes(userRole)) {
    return true;
  }

  router.navigate(['/notfound']);
  return false;
};
