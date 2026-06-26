import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarService, SnackbarData } from './snackbar.service';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './snackbar.html',
})
export class SnackbarComponent implements OnInit {
  data: SnackbarData | null = null;
  isFadingOut = false;

  constructor(private snackbarService: SnackbarService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.snackbarService.snackbarState$.subscribe(data => {
      if (data) {
        this.isFadingOut = false;
        this.data = data;
        this.cdr.detectChanges();
      } else if (this.data) {
        this.isFadingOut = true;
        this.cdr.detectChanges();
        
        setTimeout(() => {
          this.data = null;
          this.isFadingOut = false;
          this.cdr.detectChanges();
        }, 400); // Tiempo de la animación de salida
      }
    });
  }

  getBgColor() {
    switch (this.data?.type) {
      case 'success': return 'bg-green-600';
      case 'error': return 'bg-red-600';
      case 'warning': return 'bg-orange-500';
      default: return 'bg-blue-600';
    }
  }
}