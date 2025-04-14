import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, AsyncPipe, NgIf, NgFor } from '@angular/common';
import { BehaviorSubject, switchMap, catchError, map, of } from 'rxjs';
import { ItemNotificationService } from '../../core/services/item-notification.service';
import { TokenService } from '../../core/auth/token.service';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, AsyncPipe, NgIf, NgFor],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDashboardComponent {
  private userId$ = new BehaviorSubject<string | null>(null);
  private _objects$ = new BehaviorSubject<any[]>([]);
  objects$ = this._objects$.asObservable();

  notifications$ = this.userId$.pipe(
    switchMap(userId => {
      if (!userId) return of([]);
      return this.itemService.getNotificationsByUser(userId).pipe(
        map(notifs =>
          notifs
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .map(n => ({
              id: n.id,
              message: `${n.triggered_by?.first_name} ${n.triggered_by?.last_name} (${n.triggered_by?.phone}) a recherché l'objet "${n?.item?.name}" (${n?.item?.unique_number})`,
              date: new Date(n.created_at).toLocaleDateString()
            }))
        ),
        catchError(() => of([]))
      );
    })
  );
  
  

  loadingMap: { [key: string]: boolean } = {};

  constructor(
    private itemService: ItemNotificationService,
    private tokenService: TokenService,
    private auth: AuthService
  ) {
    const userId = this.tokenService.getUserId();
    if (userId) {
      this.userId$.next(userId.toString());
      this.auth.authStatus.next(true);

      this.itemService.getItemsByUser(userId.toString()).pipe(
        catchError(() => of([]))
      ).subscribe(items => {
        this._objects$.next(items);
      });
    }
  }

  changeStatus(obj: any) {
    const newStatus = obj.status === 'Perdu' ? 'Retrouvé' : 'Perdu';
    this.loadingMap[obj.id] = true;

    this.itemService.updateItemStatus(obj.id, { status: newStatus }).subscribe({
      next: () => {
        const updated = this._objects$.value.map(item =>
          item.id === obj.id ? { ...item, status: newStatus } : item
        );
        this._objects$.next(updated);
      },
      error: () => {
        alert("Erreur lors du changement de statut.");
      },
      complete: () => {
        this.loadingMap[obj.id] = false;
      }
    });
  }

  trackById(index: number, item: any): string {
    return item.id;
  }
}
