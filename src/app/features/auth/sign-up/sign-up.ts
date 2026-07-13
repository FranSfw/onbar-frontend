import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input';
import { ButtonComponent } from '../../../shared/components/button/button';
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

  firstName = '';
  lastName = '';
  username = '';
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private snackbar: SnackbarService,
    private router: Router
  ) {}

  async onSignUp() {
    // 1. Validaciones de cliente
    if (!this.email || !this.password) {
      this.snackbar.show('Por favor llena todos los campos', 'warning');
      return;
    }

    if (this.password.length < 6) {
      this.snackbar.show('La contraseña debe tener al menos 6 caracteres', 'warning');
      return;
    }

    this.snackbar.show('Creando tu cuenta, barista...', 'info');

    // 2. Llamada a Firebase
    try {
      await this.authService.signUp(this.email, this.password, {
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.username
      });
      
      // Enviar correo de verificación
      await this.authService.sendVerificationEmail();
      
      this.snackbar.show('¡Cuenta creada con éxito! Revisa tu correo.', 'success');
      
      // 3. Redirigir al usuario (Idealmente a una pantalla de verificar correo o al dashboard)
      this.router.navigate(['/verify-email']); 
      
    } catch (error: any) {
      console.error('Error de registro:', error);
      const errorMessage = this.getFriendlyErrorMessage(error.code);
      this.snackbar.show(errorMessage, 'error');
    }
  }

  // Traductor de errores específico para el registro
  private getFriendlyErrorMessage(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use': return 'Este correo ya está registrado.';
      case 'auth/invalid-email': return 'El formato del correo no es válido.';
      case 'auth/weak-password': return 'La contraseña es demasiado débil (mín. 6 caracteres).';
      case 'auth/operation-not-allowed': return 'El registro con correo está deshabilitado en Firebase.';
      default: return 'Ocurrió un error al crear la cuenta.';
    }
  }

  async onGoogleLogin() {
    try {
      this.snackbar.show('Iniciando sesión con Google...', 'info');
      const user = await this.authService.loginWithGoogle();
      this.snackbar.show(`¡Bienvenido ${user.displayName || 'barista'}!`, 'success');
      this.router.navigate(['/verify-email']); 
    } catch (error: any) {
      console.error("Error en la autenticación con Google:", error);
      this.snackbar.show('Error al iniciar sesión con Google.', 'error');
    }
  }
}