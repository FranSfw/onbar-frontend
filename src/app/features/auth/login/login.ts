import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input';
import { ButtonComponent } from '../../../shared/components/button/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, InputComponent, ButtonComponent],
  templateUrl: './login.html'
})
export class LoginComponent {
  email = '';
  password = '';

  onLogin() {
    console.log('Iniciando sesión con:', this.email);
  }

  onGoogleLogin() {
    console.log('Flujo de Google Auth iniciado');
  }
}