import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-ingredient',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './ingredient.html'
})
export class IngredientComponent {
  @Input() ingredients: any[] = [];

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.ingredients, event.previousIndex, event.currentIndex);
  }
}