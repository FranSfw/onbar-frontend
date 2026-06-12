import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input';
import { ButtonComponent } from '../../../shared/components/button/button'; 

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, InputComponent, ButtonComponent],
  templateUrl: './sign-up.html'
})
export class SignUpComponent {
  firstName = '';
  lastName = '';
  username = '';
  email = '';
  password = '';

  onSignUp() {
    console.log('Registrando usuario:', this.username, this.email);
    // Aquí luego conectaremos Firebase Auth
  }

  onGoogleLogin() {
    console.log('Iniciando flujo de Google Auth');
  }
}