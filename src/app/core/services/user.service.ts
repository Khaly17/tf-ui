import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.BASE_URL}/auth`;

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

  getUserInfos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`);
  }

  updateUser(data:any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-profile`, data);
  }

  changePassword(userId: number, data: { old_password: string; new_password: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}/change-password`, data);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`);
  }
}
