import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report-recipe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report-recipe.html'
})
export class ReportRecipeComponent {
  @Output() submitReport = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<void>();

  reason: string = '';
  comment: string = '';
  showSnackbar: boolean = false;

  close() {
    this.closeModal.emit();
  }

  submit() {
    if (!this.reason) return;
    this.showSnackbar = true;
    
    this.submitReport.emit({ reason: this.reason, comment: this.comment });
    
    setTimeout(() => {
      this.close();
    }, 3000);
  }

  hideSnackbar() {
    this.showSnackbar = false;
  }
}