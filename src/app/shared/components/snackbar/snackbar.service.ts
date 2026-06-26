import { Injectable } from '@angular/core';
import { Subject, timer, of, merge, concat } from 'rxjs';
import { switchMap, delay, startWith } from 'rxjs/operators';

export interface SnackbarData {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  private requestSubject = new Subject<SnackbarData>();
  
  snackbarState$ = this.requestSubject.pipe(
    switchMap(data => concat(
      of(data),
      of(null).pipe(delay(3000))
    ))
  );

  show(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') {
    this.requestSubject.next({ message, type });
  }
}