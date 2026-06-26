import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input';
import { ButtonComponent } from '../../../shared/components/button/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterModule, InputComponent, ButtonComponent, FormsModule],
  templateUrl: './forgot-password.html'
})
export class ForgotPasswordComponent {
  email: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  onForgotPassword() {
    if (!this.email) {
      this.errorMessage = 'Please enter a valid email address.';
      this.successMessage = '';
      return;
    }
    this.errorMessage = '';
    this.successMessage = 'If an account exists, a recovery link has been sent.';
    console.log('Solicitud de recuperación para:', this.email);
  }
}