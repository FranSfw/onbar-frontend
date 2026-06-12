import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../input/input';
import { SelectComponent } from '../select/select';

@Component({
  selector: 'app-add-step',
  standalone: true,
  imports: [CommonModule, FormsModule, InputComponent, SelectComponent],
  templateUrl: './add-step.html'
})
export class AddStepComponent {
  @Input() stepCategory: 'addIngredient' | 'addStep' = 'addStep';
  @Input() stepId: string = '';
  @Input() stepNumber: number = 1;
  @Input() unit: string = '';
  @Input() canDelete: boolean = true;
  @Input() appInputValue: string = '';

  @Output() stepChange = new EventEmitter<string>();
  @Output() ingredientChange = new EventEmitter<any>();
  @Output() removeStepRequest = new EventEmitter<{stepId: string, stepCategory: string}>();

  inputValue: string = ''; // Para la cantidad

  validateNumber(event: any) {
    const val = event.target.value.replace(/[^0-9]/g, '');
    this.inputValue = val;
    event.target.value = val;
    this.emitIngredientData();
  }

  onAppInputValueChange(val: any) {
    this.appInputValue = val;
    this.emitIngredientData();
  }

  onSelectValueChange(val: string) {
    this.unit = val;
    this.emitIngredientData();
  }

  private emitIngredientData() {
    this.ingredientChange.emit({
      quantity: this.inputValue,
      unit: this.unit,
      ingredient: this.appInputValue
    });
  }

  onStepInput(val: any) {
    this.appInputValue = val;
    this.stepChange.emit(this.appInputValue);
  }

  requestRemoveStep() {
    if (this.canDelete) {
      this.removeStepRequest.emit({ stepId: this.stepId, stepCategory: this.stepCategory });
    }
  }
}