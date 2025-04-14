import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class TokenService {
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getDecodedToken(): any {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  }

  isTokenValid(): boolean {
    const decoded = this.getDecodedToken();
    if (!decoded || !decoded.exp) return false;

    const now = Math.floor(Date.now() / 1000); 
    return decoded.exp > now;
  }

  getUserRole(): string | null {
    const decoded = this.getDecodedToken();
    return decoded?.role || null;
  }
  

  getUsername(): string | null {
    const decoded = this.getDecodedToken();
    
    return decoded?.username || decoded?.name || null;
  }
    getUserId(): number | null {
        const decoded = this.getDecodedToken();
        return decoded?.sub || null;
    }
    getIsChangedPassword(): boolean {
        const decoded = this.getDecodedToken();
        return decoded?.is_password_changed || false;
    }

    getUser_data(){
      const decoded = this.getDecodedToken();
      return decoded?.user_data || null;
    }
}
