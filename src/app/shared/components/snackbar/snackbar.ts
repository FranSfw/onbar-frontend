import { Component, OnInit } from '@angular/core';
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

  constructor(private snackbarService: SnackbarService) {}

  ngOnInit() {
    this.snackbarService.snackbarState$.subscribe(data => this.data = data);
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