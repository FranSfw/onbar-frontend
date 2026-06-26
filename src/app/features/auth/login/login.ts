import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input';
import { ButtonComponent } from '../../../shared/components/button/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../../../shared/components/snackbar/snackbar.service';

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
    // Prueba rápida
    this.snackbarService.show('Iniciando sesion con ' + this.email + '!', 'success');
  }

  onGoogleLogin() {
    console.log('Flujo de Google Auth iniciado');
  }
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private snackbarService: SnackbarService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

}