import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review-card.html'
})
export class ReviewCardComponent {
  @Input() recipeId: string = '';
  @Output() reviewSubmitted = new EventEmitter<any>();

  // Le agregamos el tipo "any | null" para que Angular permita usar el "?." en el HTML
  currentUser: any | null = { name: 'Barista Pro', username: 'baristapro', profilePhotoURL: '' };
  comment: string = '';
  selectedRating: number = 0;
  hoverRating: number = 0;

  toggleRating(star: number) {
    this.selectedRating = star;
  }

  createReview() {
    if (this.selectedRating === 0) {
      alert('Please select a rating!');
      return;
    }
    const newReview = {
      recipeId: this.recipeId,
      rating: this.selectedRating,
      comment: this.comment,
      date: new Date()
    };
    console.log('Review creada:', newReview);
    this.reviewSubmitted.emit(newReview);
    
    // Limpiamos el formulario
    this.comment = '';
    this.selectedRating = 0;
  }
}