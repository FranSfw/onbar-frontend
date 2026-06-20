import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input';
import { ButtonComponent } from '../../../shared/components/button/button';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule, 
    InputComponent, 
    ButtonComponent
  ],
  templateUrl: './sign-up.html'
})
export class SignUpComponent {
  firstName = '';
  lastName = '';
  username = '';
  email = '';
  password = '';

  onSignUp() {
    console.log('Creando cuenta para:', this.username, this.email);
    // Aquí conectaremos la lógica de Firebase Auth más adelante
  }

  onGoogleLogin() {
    console.log('Iniciando autenticación externa con Google');
  }
}