import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-step',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './step.html'
})
export class StepComponent {
  @Input() steps: string[] = [];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.steps, event.previousIndex, event.currentIndex);
  }
}