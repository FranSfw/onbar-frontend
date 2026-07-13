import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input';
import { ButtonComponent } from '../../../shared/components/button/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../../../shared/components/snackbar/snackbar.service';
import { AuthService } from '../../../core/services/auth';

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
    // Sincronizar ngModel con el FormGroup para usar sus validadores
    this.loginForm.patchValue({ email: this.email, password: this.password });

    if (this.loginForm.invalid) {
      if (this.loginForm.get('email')?.hasError('required') || this.loginForm.get('password')?.hasError('required')) {
        this.snackbarService.show('Por favor, completa todos los campos', 'warning');
      } else if (this.loginForm.get('email')?.hasError('email')) {
        this.snackbarService.show('Ingresa un correo electrónico válido', 'error');
      } else {
        this.snackbarService.show('Verifica los datos ingresados', 'error');
      }
      return;
    }

    this.snackbarService.show('Iniciando sesion con ' + this.email + '!', 'success');
  }

  async onGoogleLogin() {
    try {
      this.snackbarService.show('Iniciando sesión con Google...', 'info');
      const user = await this.authService.loginWithGoogle();
      this.snackbarService.show(`¡Bienvenido de vuelta, ${user.displayName || 'barista'}!`, 'success');
      this.router.navigate(['/']); // O a la ruta que corresponda tras loguearse
    } catch (error: any) {
      console.error('Error en la autenticación con Google:', error);
      this.snackbarService.show('Error al iniciar sesión con Google.', 'error');
    }
  }
  
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private snackbarService: SnackbarService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

}