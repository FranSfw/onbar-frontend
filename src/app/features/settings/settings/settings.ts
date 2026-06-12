import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './settings.html'
})
export class SettingsComponent {
  privacyForm: FormGroup;
  emailForm: FormGroup;
  passwordForm: FormGroup;
  deleteForm: FormGroup;

  privacySubmitted = false;
  emailSubmitted = false;
  passwordSubmitted = false;
  deleteSubmitted = false;

  constructor(private fb: FormBuilder) {
    // 1. Formulario de Privacidad
    this.privacyForm = this.fb.group({
      privacy: ['', Validators.required] 
    });

    // 2. Formulario de Email
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    // 3. Formulario de Contraseña con validador personalizado
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });

    // 4. Formulario de Eliminación
    this.deleteForm = this.fb.group({
      password: ['', Validators.required]
    });
  }

  // Validador personalizado para asegurar que las contraseñas coincidan
  passwordMatchValidator(form: FormGroup) {
    const newPass = form.get('newPassword')?.value;
    const confirmPass = form.get('confirmPassword')?.value;
    return newPass === confirmPass ? null : { passwordMismatch: true };
  }

  onPrivacySubmit() {
    this.privacySubmitted = true;
    if (this.privacyForm.valid) console.log('Privacidad:', this.privacyForm.value);
  }

  onEmailSubmit() {
    this.emailSubmitted = true;
    if (this.emailForm.valid) console.log('Email:', this.emailForm.value);
  }

  onPasswordSubmit() {
    this.passwordSubmitted = true;
    if (this.passwordForm.valid) console.log('Password Actualizado');
  }

  onDeleteSubmit() {
    this.deleteSubmitted = true;
    if (this.deleteForm.valid) console.log('Cuenta Eliminada (Simulación)');
  }
}