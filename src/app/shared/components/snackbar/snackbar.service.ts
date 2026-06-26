import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface SnackbarData {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  private snackbarSubject = new Subject<SnackbarData | null>();
  snackbarState$ = this.snackbarSubject.asObservable();

  show(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') {
    this.snackbarSubject.next({ message, type });
    // Se oculta automáticamente tras 3 segundos
    setTimeout(() => this.snackbarSubject.next(null), 3000);
  }
}