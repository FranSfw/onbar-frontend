import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-card-published',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-card-published.html'
})
export class ReviewCardPublishedComponent {
  @Input() review: any; // Interfaz que definiremos mejor después

  onImgError(event: Event) {
    (event.target as HTMLImageElement).src = '/assets/images/default_avatar.png';
  }
}