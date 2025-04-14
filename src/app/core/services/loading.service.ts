import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

  show(): void {
    this.loadingSubject.next(true);
  }

  hide(): void {
    this.loadingSubject.next(false);
  }
  isLoading(): boolean {
    return this.loadingSubject.getValue();
  }
  
  onLoadingChange(callback: (loading: boolean) => void): () => void {
    const subscription = this.loading$.subscribe(callback);
    return () => subscription.unsubscribe();
  }
}
