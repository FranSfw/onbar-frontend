import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.html'
})
export class InputComponent {
  @Input() width: string = 'w-full';
  @Input() type: string = 'text';
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() value: string | number = '';
  @Input() maxLength?: number;

  @Output() valueChange = new EventEmitter<string | number>();

  showPassword = false;

  // Emite el valor cada vez que el usuario escribe
  onInputChange(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.valueChange.emit(val);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  getInputType() {
    if (this.type === 'password') {
      return this.showPassword ? 'text' : 'password';
    }
    return this.type;
  }

  getIconClass() {
    return this.showPassword ? 'ph-eye-slash' : 'ph-eye';
  }
}