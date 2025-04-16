import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.BASE_URL}/auth`;

  private userSubject = new BehaviorSubject<UserProfile | null>(null);
  private isFetched = false;

  constructor(private http: HttpClient) {}


  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  getUserInfos(): Observable<UserProfile> {
    if (this.isFetched && this.userSubject.value) {
      return of(this.userSubject.value);
    }

    return this.http.get<UserProfile>(`${this.apiUrl}/me`).pipe(
      tap((user) => {
        this.userSubject.next(user);
        this.isFetched = true;
      }),
      catchError((error) => {
        console.error('Erreur récupération utilisateur :', error);
        throw error;
      })
    );
  }
  updateUser(data: any): Observable<any> {
    return this.http.put<UserProfile>(`${this.apiUrl}/update-profile`, data).pipe(
      tap((updatedUser) => {
        this.userSubject.next({ ...updatedUser, password: '' });
        this.isFetched = true;
      }),
      catchError((error) => {
        console.error('Erreur lors de la mise à jour du profil :', error);
        throw error;
      })
    );
  }

  changePassword(userId: number, data: { old_password: string; new_password: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}/change-password`, data);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`);
  }

  clearUserCache(): void {
    this.userSubject.next(null);
    this.isFetched = false;
  }
}
