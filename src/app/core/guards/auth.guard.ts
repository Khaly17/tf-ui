import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '../auth/token.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private tokenService: TokenService, private authService: AuthService) { }

  canActivate(): boolean {
    if (this.tokenService.isTokenValid()) {
      this.authService.authStatus.next(false)
      return true;
    } else {
      localStorage.removeItem('access_token');
      this.router.navigate(['/login']);
      return false;
    }
  }
}