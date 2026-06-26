import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input';
import { ButtonComponent } from '../../../shared/components/button/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth';
import { SnackbarService } from '../../../shared/components/snackbar/snackbar.service';

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

  signUpForm: FormGroup;

  firstName = '';
  lastName = '';
  username = '';
  email = '';
  password = '';

  async onSignUp() {
    if (this.signUpForm.invalid) {
      this.snackbar.show('Por favor, completa los campos correctamente', 'error');
      return;
    }

    const { email, password } = this.signUpForm.value;

    try {
      await this.authService.signUp(email, password);
      
      this.snackbar.show('Cuenta creada con éxito. Revisa tu correo.', 'success');

    } catch (err: any) {
      console.error('Error capturado:', err);
      
        const errorMessage = this.getFriendlyErrorMessage(err.code);
      this.snackbar.show(errorMessage, 'error');
    }
  }
  private getFriendlyErrorMessage(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use': return 'Este correo ya está registrado.';
      case 'auth/invalid-email': return 'El correo no es válido.';
      case 'auth/weak-password': return 'La contraseña es demasiado débil.';
      default: return 'Ocurrió un error al registrarse.';
    }
  }


  onGoogleLogin() {
    console.log('Iniciando autenticación externa con Google');
  }

  constructor(private fb: FormBuilder, private authService: AuthService, private snackbar: SnackbarService) {
  this.signUpForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required]],
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    // Mínimo 6 caracteres, al menos una letra y un número
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)]]
  });
}
}