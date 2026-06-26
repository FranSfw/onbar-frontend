import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() width: string = 'w-full';
  @Input() type: string = 'text';
  @Input() id: string = '';
  @Input() name: string = '';

  value: string | number = '';
  showPassword = false;

  // Funciones que Angular llama para manejar el valor
  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(val: any): void { this.value = val; }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouch = fn; }

  onInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.onChange(val);
    this.onTouch();
  }

  togglePasswordVisibility() { this.showPassword = !this.showPassword; }
  getInputType() { return this.type === 'password' && this.showPassword ? 'text' : this.type; }
  getIconClass() { return this.showPassword ? 'ph-eye-slash' : 'ph-eye'; }
}