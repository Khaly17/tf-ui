import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const API = environment.BASE_URL;

@Injectable({ providedIn: 'root' })
export class ItemNotificationService {
  private readonly token = localStorage.getItem('access_token');

  constructor(private http: HttpClient) {}

  // Objets liés à un utilisateur
  getItemsByUser(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${API}/items/user/${userId}`);
  }

  // Notifications d'un utilisateur
  getNotificationsByUser(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${API}/items/notifications/user/${userId}`);
  }
  createItem(item: any): Observable<any> {
    return this.http.post(`${API}/items/`, item);
  }
  // Changer le statut d’un objet
  updateItemStatus(itemId: string, updatedFields: any): Observable<any> {
    return this.http.put(`${API}/items/${itemId}`, updatedFields);
  }

  // Marquer une notification comme lue
  markNotificationAsRead(notificationId: string): Observable<any> {
    return this.http.put(`${API}/items/notifications/${notificationId}`, {
      status: 'read'
    });
  }
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${API}/categories/`);
  }
  searchWithOwner(uniqueNumber: string): Observable<any> {
    return this.http.get(`${API}/items/owner-by-number?q=${uniqueNumber}`);
  }
  
}  
