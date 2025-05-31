import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authStatus = new BehaviorSubject<boolean>(false);
  authStatus$ = this.authStatus.asObservable();

  router = inject(Router)
  
  private baseUrl = `${environment.BASE_URL}/auth`;
  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.authStatus.next(this.tokenService.isTokenValid());
   }

  signup(email: string, password: string, fullName: string): Observable<any> {
    const payload = {
      email,
      password,
      fullName
    };
    return this.http.post(`${this.baseUrl}/signup`, payload);
  }

  login(identifier: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, {
      identifier,
      password
    });
    
  }

  updatePassword(phoneNumber: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/forget-password/${phoneNumber}`,{});
  }

  isAuthenticated(): boolean {
    return this.authStatus.value;
  }

  logout() {
    localStorage.clear();
    this.authStatus.next(false);
    this.router.navigate(['/login']);
  }
      

}

